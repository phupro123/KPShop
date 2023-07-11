import { flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import DatePickerDropdown from "../../DatePicker/DatePickerDropdown";
import TableHeaderFilterDropdown from "./TableHeaderFilterDropdown";
import TableHeaderFilterLabel from "./TableHeaderFilterLabel";
import { useSearchParams } from "react-router-dom";

const TableHeaderFilter = ({ header, onChangeFilters }) => {
  const [searchParams] = useSearchParams();

  const headerColumnDef = header.column.columnDef;

  const filterBy = useMemo(() => {
    const originalFilterBy =
      headerColumnDef.meta?.filterBy ?? headerColumnDef.id;
    return (
      (Array.isArray(originalFilterBy)
        ? _.first(originalFilterBy)
        : originalFilterBy) ?? ""
    );
  }, [headerColumnDef]);

  const customFilterBy = useMemo(() => {
    return headerColumnDef.meta?.customFilterBy ?? filterBy;
  }, [filterBy, headerColumnDef.meta?.customFilterBy]);

  const filterChange = useMemo(
    () => headerColumnDef.meta?.filterChange ?? filterBy,
    [filterBy, headerColumnDef.meta?.filterChange]
  );

  const filterData = useMemo(() => {
    const formattedData = [...searchParams].map(([key, value]) => ({
      filterBy: _.camelCase(key),
      values: value,
    }));
    return formattedData.find((data) => data.filterBy === customFilterBy);
  }, [customFilterBy, searchParams]);

  const filterOptionLabelFactory = useMemo(
    () =>
      headerColumnDef.meta?.filterOptionLabelFactory ??
      ((option) => `${option}`),
    [headerColumnDef.meta?.filterOptionLabelFactory]
  );

  const [filterOptions, setFilterOptions] = useState([]);
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const [queryParams, setQueryParams] = useState({
    filterBy,
    filterValue: "",
  });

  const filterType = useMemo(
    () => headerColumnDef.meta?.filterType,
    [headerColumnDef]
  );

  const label = useMemo(() => {
    const originalLabel =
      headerColumnDef.meta?.filterLabel ??
      flexRender(headerColumnDef.header, header.getContext());
    return (
      <TableHeaderFilterLabel
        label={originalLabel}
        selectedFilters={selectedFilters}
        labelFactory={filterOptionLabelFactory}
        filterType={filterType}
      />
    );
  }, [
    filterOptionLabelFactory,
    filterType,
    header,
    headerColumnDef.header,
    headerColumnDef.meta?.filterLabel,
    selectedFilters,
  ]);

  const containerRef = useRef(null);

  const rawGetFilterOptions = useMemo(
    () => headerColumnDef.meta?.getFilterOptions,
    [headerColumnDef]
  );

  const formatFilterOptions = useCallback(
    (options) => {
      const originalFilterBy = headerColumnDef.meta?.filterBy;

      return _.unionBy(
        options
          .map((option) => {
            let filterValue = "";

            if (Array.isArray(originalFilterBy)) {
              filterValue = originalFilterBy.reduce(
                (acc, filter) => `${acc} ${option[filter]}`,
                ""
              );
            } else {
              filterValue = _.get(option, filterBy);
            }

            if (!filterValue) {
              return null;
            }

            return {
              ...option,
              [filterBy]: filterValue,
            };
          })
          .filter(Boolean),
        filterBy
      );
    },
    [filterBy, headerColumnDef.meta?.filterBy]
  );

  const getFilterOptions = useCallback(
    (query) => {
      if (headerColumnDef.meta?.filterType === "rangeDate") {
        return;
      }
      if (headerColumnDef.meta?.filterType === "enum") {
        setFilterOptions(headerColumnDef.meta?.getFilterDataEnum);
        if (filterData) {
          setSelectedFilters?.([filterData.values]);
        }
        return;
      }
      setIsLoading(true);
      rawGetFilterOptions?.(query)
        .then((options) => {
          if ("data" in options) {
            setFilterOptions(formatFilterOptions(options.data));
            return;
          }
          if (Array.isArray(options)) {
            setFilterOptions(formatFilterOptions(options));
            if (filterData) {
              const optionValue = options.find(
                (option) => option[filterChange] === Number(filterData.values)
              );
              setSelectedFilters?.([optionValue[filterBy]]);
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [
      filterData,
      filterBy,
      filterChange,
      formatFilterOptions,
      headerColumnDef.meta?.filterType,
      headerColumnDef.meta?.getFilterDataEnum,
      rawGetFilterOptions,
    ]
  );

  const handleToggleDropdownMenu = () => {
    setIsShowDropdownMenu((prev) => !prev);
  };

  const handleChangeFilters = useCallback(
    (filters, customFilter) => {
      setSelectedFilters(filters);
      setIsShowDropdownMenu(false);

      if (filterType === "rangeDate") {
        onChangeFilters?.(
          ["fromDate", "toDate"],
          [
            dayjs(filters[0]).format("YYYY-MM-DD"),
            dayjs(filters[1]).format("YYYY-MM-DD"),
          ]
        );
        return;
      }

      if (filterType === "rangeNumber") {
        const [min, max] = filters.split("-");
        onChangeFilters?.(["min", "max"], [min, max]);
        return;
      }

      onChangeFilters?.(customFilterBy, customFilter);
    },
    [customFilterBy, filterType, onChangeFilters]
  );

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
    handleToggleDropdownMenu();
    if (filterType === "rangeDate") {
      onChangeFilters?.(["fromDate", "toDate"], []);
      return;
    }

    if (filterType === "rangeNumber") {
      onChangeFilters?.(["min", "max"], [0, 999999999]);
      return;
    }
    onChangeFilters?.(customFilterBy, []);
  }, [customFilterBy, filterType, onChangeFilters]);

  useEffect(() => {
    if (containerRef.current == null) {
      return undefined;
    }
    const toggleButtonElement = containerRef.current;
    const handleClickOutside = (event) => {
      if (toggleButtonElement.contains(event.target)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      (!isShowDropdownMenu && filterData?.filterBy !== customFilterBy) ||
      !(filterOptions.length === 0)
    ) {
      return;
    }
    getFilterOptions();
  }, [
    filterData?.filterBy,
    customFilterBy,
    filterOptions.length,
    getFilterOptions,
    isShowDropdownMenu,
  ]);

  useEffect(() => {
    const newQueryParams = {
      filterBy,
      filterValue: filterSearchValue,
    };
    if (_.isEqual(newQueryParams, queryParams)) {
      return;
    }
    setQueryParams(newQueryParams);
    getFilterOptions(newQueryParams);
  }, [filterBy, filterSearchValue, getFilterOptions, queryParams]);

  return (
    <div
      className="relative mb-4 mr-4 h-10 rounded-lg last:mr-0"
      ref={containerRef}
    >
      <div
        className={twMerge(
          "z-20 flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 pl-4 pr-2.5 duration-100 hover:border-gray-200 hover:bg-gray-100",
          isShowDropdownMenu && "border-gray-200 bg-gray-100",
          !(selectedFilters.length === 0) &&
            "border-blue-500 bg-blue-50 hover:border-blue-500 hover:bg-blue-50"
        )}
        role="button"
        tabIndex={0}
        onClick={handleToggleDropdownMenu}
      >
        <div>{label}</div>
        <BiChevronDown size={20} />
      </div>
      {isShowDropdownMenu &&
        (filterType === "rangeDate" ? (
          <DatePickerDropdown
            containerRef={containerRef}
            contentWrapperWidth={
              Number(document.getElementById("content")?.offsetWidth) - 24
            }
            selectedRangeDate={selectedFilters}
            onChangeRangeDate={handleChangeFilters}
            isLoading={isLoading}
            isShowClearSelected
            onClearSelectedRangeDate={handleClearFilters}
          />
        ) : (
          <TableHeaderFilterDropdown
            isShowDropdownMenu={isShowDropdownMenu}
            filterBy={filterBy}
            customFilterBy={customFilterBy}
            filterChange={headerColumnDef.meta?.filterChange}
            filterType={filterType}
            filterOptions={filterOptions}
            maxSelection={headerColumnDef.meta?.maxSelection}
            isLoading={isLoading}
            selectedFilters={selectedFilters}
            labelFactory={filterOptionLabelFactory}
            onChangeFilters={handleChangeFilters}
            onChangeFilterSearchValue={setFilterSearchValue}
            onClearSelectedFilters={handleClearFilters}
          />
        ))}
    </div>
  );
};

export default TableHeaderFilter;
