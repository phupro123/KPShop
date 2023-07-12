import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

const FilterLabel = ({ label, selectedFilters, labelFactory, filterType }) => {
    return (
        <div className="flex">
            <span className="line-clamp-1">
                <span className={twMerge(!!selectedFilters.length && 'mr-1 font-semibold')}>
                    {label}
                    {!!selectedFilters.length && ':'}
                </span>
            </span>

            {selectedFilters.length > 0 &&
                (filterType === 'rangeDate' ? (
                    <span>
                        {dayjs(selectedFilters[0])
                            .format('YYYY/MM/DD')
                            .concat(' - ', dayjs(selectedFilters[1]).format('YYYY/MM/DD'))}
                    </span>
                ) : (
                    <span>
                        {labelFactory(selectedFilters[0])}
                        {selectedFilters.length > 1 && (
                            <span className="ml-2 inline-flex items-center justify-center rounded-xl bg-gray-300 px-2 pt-0.5 text-sm font-semibold">
                                +{selectedFilters.length - 1}
                            </span>
                        )}
                    </span>
                ))}
        </div>
    );
};

export default FilterLabel;
