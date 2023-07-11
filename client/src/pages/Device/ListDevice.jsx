import { useCallback, useEffect, useMemo, useState } from 'react';
import FilterDevice from './FilterDevice';
import ListDeviceSkeleton from './ListDeviceSkeleton';
import { isEmpty, uniq } from 'lodash';
import { toast } from 'react-toastify';
import { SortEnum } from '../../Constants/Enums';
import SortDevice from './SortDevice';
import { getProducts } from '../../services/product.service';
import { MdDevicesOther } from 'react-icons/md';
import ListProduct from './ListProduct';
import { twMerge } from 'tailwind-merge';

const ListDevice = ({ device }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [queryParams, setQueryParams] = useState();
    const [phoneData, setPhoneData] = useState([]);
    const [sortParams, setSortParams] = useState();

    const fetchData = useCallback(async () => {
        if (!queryParams) {
            return;
        }
        setIsLoading(true);

        try {
            const { data } = await getProducts({ ...queryParams, sort: sortParams || null });

            setPhoneData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [queryParams, toast, sortParams]);

    const handleSort = useCallback((sort) => {
        setSortParams(sort);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const children = useMemo(() => {
        if (isLoading) {
            return <ListDeviceSkeleton />;
        }
        if (isEmpty(phoneData)) {
            return (
                <div className="mx-auto p-32 flex flex-col items-center">
                    <MdDevicesOther size={120} className="text-gray-400" />
                    <div className="mt-2 text-gray-400">Không tồn tại sản phẩm phù hợp</div>
                </div>
            );
        }
        return <ListProduct products={phoneData} isBorder />;
    }, [isLoading, phoneData]);

    return (
        <div className="w-[1200px] mx-auto gap-6">
            <div className="flex flex-col">
                <div
                    className={twMerge(
                        'bg-white p-6 border shadow-xl rounded-xl h-full flex flex-col',
                        isEmpty(phoneData) && 'justify-center',
                    )}
                >
                    <FilterDevice products={phoneData} category={device} onChangeState={setQueryParams} />
                    <div className="text-base flex items-center space-x-4 mb-6">
                        <span className="font-bold text-slate-700">Sắp xếp: </span>
                        {uniq(Object.values(SortEnum)).map((item) => (
                            <SortDevice sortParams={sortParams} key={item.label} item={item} onSort={handleSort} />
                        ))}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ListDevice;
