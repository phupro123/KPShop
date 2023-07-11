import { debounce, isArray } from 'lodash';
import { memo, useCallback } from 'react';
import FilterWrapperContent from './FilterWrapperContent';

const FilterWrapper = ({ headerGroups, onChangeFilter, onToggleRef }) => {
    const onChangeFilterDebounce = useCallback(debounce(onChangeFilter, 500), []);
    const handleChangeColumnFilter = useCallback(
        (key, values) => {
            onChangeFilterDebounce?.((prev) => {
                const newColumnFilter = prev.filter((item) => {
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
        [onChangeFilterDebounce, onToggleRef],
    );

    return (
        <>
            {headerGroups
                .filter((header) => !header.meta.isHidden)
                .map((header) => (
                    <FilterWrapperContent key={header.id} header={header} onChangeFilters={handleChangeColumnFilter} />
                ))}
        </>
    );
};

export default memo(FilterWrapper);
