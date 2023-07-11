import Section from '../../components/Section';
import Carousel from '../../components/Carousel';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../services/product.service';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton';
import { toast } from 'react-toastify';

const slider = [
    'https://cdn.tgdd.vn/2022/07/banner/380-x-200-380x200.png',
    'https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-1-380x200-3.png',
    'https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-380x200-4.png',
    'https://cdn.tgdd.vn/2022/07/banner/380x200-380x200-3.png',
    'https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-1-380x200-2.png',
    'https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-2-380x200-3.png',
];

const PromoFirst = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [phoneData, setPhoneData] = useState([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        try {
            const { data } = await getProducts({ category: 'Phone' });

            setPhoneData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Section isLoading={isLoading} title="Đại tiệc Samsung" styles="bg-[#2c6f42] px-4">
            <Carousel isLoading={isLoading} data={slider} slidesPerView={3} spaceBetween={16} isProduct={false} />
            <Carousel isLoading={isLoading} data={phoneData} />
            {isLoading ? (
                <LoadingSkeleton className="h-[50px] w-[278px]" />
            ) : (
                <button className="outline-none text-base border bg-white px-16 py-3 rounded-xl">
                    <a href="./phone">Xem tất cả sản phẩm</a>
                </button>
            )}
        </Section>
    );
};

export default PromoFirst;
