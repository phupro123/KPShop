import _ from "lodash";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import LoadingSkeleton from "../../Loading/LoadingSkeleton";
import TableHeaderFilterDropdownOptionItem from "./TableHeaderFilterDropdownOptionItem";
import TableHeaderFilterDropdownSkeleton from "./TableHeaderFilterDropdownSkeleton";

const TableHeaderFilterDropdown = ({
  isShowDropdownMenu,
  filterBy,
  customFilterBy,
  filterChange,
  filterType,
  maxSelection = true,
  isLoading,
  filterOptions,
  selectedFilters,
  labelFactory,
  onChangeFilters,
  onChangeFilterSearchValue,
  onClearSelectedFilters,
}) => {
  const dropdownRef = useRef(null);

  const [filterSearchValue, setFilterSearchValue] = useState("");

  const handleGetNewSelectedFilter = useCallback(
    (value, checked, customValue) => {
      if (maxSelection) {
        return [customValue || value];
      }
      const newSelectedFilters = [...selectedFilters];
      if (checked) {
        newSelectedFilters.push(customValue || value);
      } else {
        const index = newSelectedFilters.indexOf(value);
        if (index > -1) {
          newSelectedFilters.splice(index, 1);
        }
      }
      return _.uniq(newSelectedFilters);
    },
    [maxSelection, selectedFilters]
  );

  const handleChangeSelectedFilter = useCallback(
    (value, customValue, checked) => {
      const newSelectedFilters = handleGetNewSelectedFilter(value, checked);
      const newCustomSelectedFilters = handleGetNewSelectedFilter(
        value,
        checked,
        customValue
      );

      onChangeFilters?.(newSelectedFilters, newCustomSelectedFilters);
    },
    [handleGetNewSelectedFilter, onChangeFilters]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeFilterSearchValueDebounced = useCallback(
    _.debounce(onChangeFilterSearchValue, 500),
    [onChangeFilterSearchValue]
  );

  const handleChangeFilterSearchValue = useCallback(
    (e) => {
      const { value } = e.target;
      onChangeFilterSearchValueDebounced(value);
      setFilterSearchValue(value);
    },
    [onChangeFilterSearchValueDebounced]
  );

  const setDropdownPosition = useCallback(() => {
    const dropdownElement = dropdownRef.current;
    if (!dropdownElement) {
      return;
    }

    const overflowHeight =
      window.innerHeight - dropdownElement.getBoundingClientRect().top - 8;

    if (overflowHeight < dropdownElement.offsetHeight) {
      dropdownElement.style.height = `${overflowHeight}px`;
    }
  }, []);

  useLayoutEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition, isShowDropdownMenu, isLoading]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 z-30 flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100"
    >
      {filterType !== "rangeDate" && (
        <div className="mb-2.5 h-10">
          <input
            id="filterValue"
            name="filterValue"
            placeholder="Search"
            className="h-10 border-b-2 border-gray-50 outline-none disabled:cursor-not-allowed disabled:bg-transparent"
            disabled={isLoading}
            value={filterSearchValue}
            onChange={handleChangeFilterSearchValue}
          />
        </div>
      )}
      <div className="relative overflow-y-scroll scrollbar-none">
        {!isLoading &&
          filterOptions?.map((option) => (
            <TableHeaderFilterDropdownOptionItem
              key={
                typeof option === "string"
                  ? option
                  : option.id || option[filterBy]
              }
              filterBy={filterBy}
              customFilterBy={customFilterBy}
              filterChange={filterChange}
              maxSelection={maxSelection}
              option={option}
              selectedFilters={selectedFilters}
              labelFactory={labelFactory}
              onChange={handleChangeSelectedFilter}
            />
          ))}
        {isLoading && (
          <TableHeaderFilterDropdownSkeleton maxSelection={maxSelection} />
        )}
      </div>
      <div className="mt-2.5 border-t-2 border-gray-100">
        {isLoading ? (
          <LoadingSkeleton className="my-3 h-4 w-full" />
        ) : (
          <button
            type="button"
            className="pb-2 pt-1.5 text-left font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            onClick={onClearSelectedFilters}
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default TableHeaderFilterDropdown;
