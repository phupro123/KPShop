import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

const SortDevice = ({ sortParams, item, onSort }) => {
    const handleSort = useCallback(() => {
        if (sortParams?.label === item.label) {
            onSort(null);
            return;
        }
        onSort(item);
    }, [sortParams, item, onSort]);

    return (
        <button
            className={twMerge(
                'py-2 px-5 border-2 rounded-full hover:text-blue-700 hover:border-2 hover:border-blue-500 text-sm h-10',
                sortParams?.label === item.label && 'text-blue-700 border-2 border-blue-500',
            )}
            onClick={handleSort}
        >
            {item.label}
        </button>
    );
};
export default SortDevice;
