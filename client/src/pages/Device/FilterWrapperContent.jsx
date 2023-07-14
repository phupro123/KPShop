import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import FilterOptions from './FilterOptions';
import { useSearchParams } from 'react-router-dom';
import FilterLabel from './FilterLabel';
import { flexRender } from '@tanstack/react-table';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { BiChevronDown } from 'react-icons/bi';

const FilterWrapperContent = ({ header, onChangeFilters }) => {
    const [searchParams] = useSearchParams();
    const containerRef = useRef(null);

    const filterBy = useMemo(() => {
        const originalFilterBy = header.meta?.filterBy ?? header.id;
        return (Array.isArray(originalFilterBy) ? _.first(originalFilterBy) : originalFilterBy) ?? '';
    }, [header]);

    const customFilterBy = useMemo(() => {
        return header.meta?.customFilterBy ?? filterBy;
    }, [filterBy, header.meta?.customFilterBy]);

    const filterChange = useMemo(() => header.meta?.filterChange ?? filterBy, [filterBy, header.meta?.filterChange]);

    const filterData = useMemo(() => {
        const formattedData = [...searchParams].map(([key, value]) => ({
            filterBy: _.camelCase(key),
            values: value,
        }));
        return formattedData.find((data) => data.filterBy === customFilterBy);
    }, [customFilterBy, searchParams]);

    const filterOptionLabelFactory = useMemo(
        () => header.meta?.filterOptionLabelFactory ?? ((option) => `${option}`),
        [header.meta?.filterOptionLabelFactory],
    );

    const [filterOptions, setFilterOptions] = useState([]);
    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
    const [queryParams, setQueryParams] = useState({
        filterBy,
        filterValue: '',
    });

    const filterType = useMemo(() => header.meta?.filterType, [header]);

    const label = useMemo(() => {
        const originalLabel = header.meta?.filterLabel ?? flexRender(header.header, header.getContext());
        return (
            <FilterLabel
                label={originalLabel}
                selectedFilters={selectedFilters}
                labelFactory={filterOptionLabelFactory}
                filterType={filterType}
            />
        );
    }, [filterOptionLabelFactory, filterType, header, header.header, header.meta?.filterLabel, selectedFilters]);

    const rawGetFilterOptions = useMemo(() => header.meta?.getFilterOptions, [header]);

    const formatFilterOptions = useCallback(
        (options) => {
            const originalFilterBy = header.meta?.filterBy;

            return _.unionBy(
                options
                    .map((option) => {
                        let filterValue = '';

                        if (Array.isArray(originalFilterBy)) {
                            filterValue = originalFilterBy.reduce((acc, filter) => `${acc} ${option[filter]}`, '');
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
                filterBy,
            );
        },
        [filterBy, header.meta?.filterBy],
    );

    const getFilterOptions = useCallback(
        (query) => {
            if (header.meta?.filterType === 'enum') {
                setFilterOptions(header.meta?.getFilterDataEnum);
                if (filterData) {
                    setSelectedFilters?.([filterData.values]);
                }
                return;
            }
            setIsLoading(true);
            rawGetFilterOptions?.(query)
                .then((options) => {
                    if ('data' in options) {
                        setFilterOptions(formatFilterOptions(options.data));
                        return;
                    }
                    if (Array.isArray(options)) {
                        setFilterOptions(formatFilterOptions(options));
                        if (filterData) {
                            const optionValue = options.find(
                                (option) => option[filterChange] === Number(filterData.values),
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
            header.meta?.filterType,
            header.meta?.getFilterDataEnum,
            rawGetFilterOptions,
        ],
    );

    const handleToggleDropdownMenu = () => {
        setIsShowDropdownMenu((prev) => !prev);
    };

    const handleChangeFilters = useCallback(
        (filters, customFilter) => {
            setSelectedFilters(filters);

            if (filterType === 'rangeNumber') {
                const [min, max] = filters.split('-');
                onChangeFilters?.(['min', 'max'], [min, max]);
                return;
            }

            onChangeFilters?.(customFilterBy, customFilter);
        },
        [customFilterBy, filterType, onChangeFilters],
    );

    const handleClearFilters = useCallback(() => {
        setSelectedFilters([]);
        handleToggleDropdownMenu();

        if (filterType === 'rangeNumber') {
            onChangeFilters?.(['min', 'max'], [0, 999999999]);
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
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!(filterOptions.length === 0)) {
            return;
        }
        getFilterOptions(header.meta?.filterQuery);
    }, [filterOptions.length, getFilterOptions, header.meta?.filterQuery]);

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
        <div className="relative mb-4 mr-4 h-10 rounded-lg last:mr-0" ref={containerRef}>
            <div
                className={twMerge(
                    'z-20 flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 pl-4 pr-2.5 duration-100 hover:border-gray-200 hover:bg-gray-100',
                    isShowDropdownMenu && 'border-gray-200 bg-gray-100',
                    !(selectedFilters.length === 0) &&
                        'border-blue-500 bg-blue-50 hover:border-blue-500 hover:bg-blue-50',
                )}
                role="button"
                tabIndex={0}
                onClick={handleToggleDropdownMenu}
            >
                <div>{label}</div>
                <BiChevronDown size={20} />
            </div>
            {isShowDropdownMenu && (
                <FilterOptions
                    isShowDropdownMenu={isShowDropdownMenu}
                    filterBy={filterBy}
                    customFilterBy={customFilterBy}
                    filterChange={header.meta?.filterChange}
                    filterType={filterType}
                    filterOptions={filterOptions}
                    maxSelection={header.meta?.maxSelection}
                    isLoading={isLoading}
                    selectedFilters={selectedFilters}
                    labelFactory={filterOptionLabelFactory}
                    onChangeFilters={handleChangeFilters}
                    onChangeFilterSearchValue={setFilterSearchValue}
                    onClearSelectedFilters={handleClearFilters}
                />
            )}
        </div>
    );
};

export default FilterWrapperContent;
