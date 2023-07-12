import _ from 'lodash';
import { useCallback } from 'react';

import FilterOptionItem from './FilterOptionItem';
import { useRef } from 'react';
import FilterOptionsSkeleton from './FilterOptionsSkeleton';
import { useLayoutEffect } from 'react';

const FilterOptions = ({
    isShowDropdownMenu,
    filterBy,
    customFilterBy,
    filterChange,
    maxSelection = true,
    isLoading,
    filterOptions,
    selectedFilters,
    labelFactory,
    onChangeFilters,
    onClearSelectedFilters,
}) => {
    const dropdownRef = useRef(null);

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
        [maxSelection, selectedFilters],
    );

    const handleChangeSelectedFilter = useCallback(
        (value, customValue, checked) => {
            const newSelectedFilters = handleGetNewSelectedFilter(value, checked);
            const newCustomSelectedFilters = handleGetNewSelectedFilter(value, checked, customValue);

            onChangeFilters?.(newSelectedFilters, newCustomSelectedFilters);
        },
        [handleGetNewSelectedFilter, onChangeFilters],
    );

    const setDropdownPosition = useCallback(() => {
        const dropdownElement = dropdownRef.current;
        if (!dropdownElement) {
            return;
        }

        const overflowHeight = window.innerHeight - dropdownElement.getBoundingClientRect().top - 8;

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
            className="absolute top-12 z-30 flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100 pt-3 min-w-[200px]"
        >
            <div className="relative overflow-y-scroll scrollbar-hide">
                {!isLoading &&
                    filterOptions?.map((option) => (
                        <FilterOptionItem
                            key={typeof option === 'string' ? option : option.id || option[filterBy]}
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
                {isLoading && <FilterOptionsSkeleton maxSelection={maxSelection} />}
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

export default FilterOptions;
