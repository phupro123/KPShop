import { debounce, isArray, keys } from 'lodash';
import { memo, useCallback } from 'react';
import FilterWrapperContent from './FilterWrapperContent';
import HeaderSearch from './HeaderSearch';

const FilterWrapper = ({ searchGroup, headerGroups, onChangeFilter, onToggleRef }) => {
    const onChangeFilterDebounce = useCallback(debounce(onChangeFilter, 500), []);
    const handleChangeColumnFilter = useCallback(
        (key, values, groupKey) => {
            onChangeFilterDebounce?.((prev) => {
                const fieldInGroup = keys(searchGroup?.find((item) => item.key === groupKey)?.field ?? {});

                const newColumnFilter = prev.filter((item) => {
                    if (groupKey) {
                        return !fieldInGroup.includes(item.filterBy);
                    }

                    if (isArray(key)) {
                        return !key.includes(item.filterBy);
                    }

                    return item.filterBy !== key;
                });

                if (values.length) {
                    onToggleRef();
                    if (isArray(key)) {
                        values.forEach((value, index) =>
                            newColumnFilter.push({ filterBy: key[index], values: [value] }),
                        );
                        return newColumnFilter;
                    }
                    newColumnFilter.push({ filterBy: key, values });
                }
                return newColumnFilter;
            });
        },
        [onChangeFilterDebounce, onToggleRef, searchGroup],
    );

    return (
        <div className="relative mb-2">
            <div className="flex flex-wrap items-center justify-start">
                {searchGroup?.map(({ key, field }) => (
                    <HeaderSearch key={key} field={field} groupKey={key} onChangeFilter={handleChangeColumnFilter} />
                ))}

                {headerGroups
                    .filter((header) => !header.meta.isHidden)
                    .map((header) => (
                        <FilterWrapperContent
                            key={header.id}
                            header={header}
                            onChangeFilters={handleChangeColumnFilter}
                        />
                    ))}
            </div>
        </div>
    );
};

export default memo(FilterWrapper);
