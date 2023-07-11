import { useMemo } from 'react';

import { Checkbox } from '../../components/Form';
import { twMerge } from 'tailwind-merge';

const FilterOptionItem = ({
    option,
    filterBy,
    customFilterBy,
    filterChange,
    maxSelection,
    selectedFilters,
    labelFactory,
    onChange,
}) => {
    const value = useMemo(() => (typeof option === 'string' ? option : option[filterBy]), [option, filterBy]);
    const customValue = useMemo(
        () => (typeof option === 'string' ? option : option[filterChange || customFilterBy]),
        [option, filterChange, customFilterBy],
    );

    const handleChangeCheckbox = (e) => {
        const isChecked = e.target.checked;
        onChange(value, customValue, isChecked);
    };

    return (
        <label htmlFor={value} className={twMerge('flex items-center justify-start space-x-3 py-1')}>
            <Checkbox
                id={value}
                name={filterBy}
                type={maxSelection ? 'radio' : 'checkbox'}
                checked={selectedFilters.includes(value)}
                onChange={handleChangeCheckbox}
            />
            <span className="max-w-[180px] truncate text-sm">{labelFactory(value)}</span>
        </label>
    );
};

export default FilterOptionItem;
