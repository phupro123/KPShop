import Section from '../../components/Section';
import Carousel from '../../components/Carousel';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../services/product.service';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton';
import { toast } from 'react-toastify';

const PromoSecond = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tabletData, setTabletData] = useState([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        try {
            const { data } = await getProducts({ category: 'Tablet' });

            setTabletData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Section
            isLoading={isLoading}
            src="https://cdn.tgdd.vn/2022/11/banner/Tagline-hotsale-1200x120-1.png"
            title="Mừng xuân quý mão"
            styles="bg-[#ff102d] px-4"
        >
            <Carousel isLoading={isLoading} data={tabletData} />
            {isLoading ? (
                <LoadingSkeleton className="h-[50px] w-[278px]" />
            ) : (
                <button className="outline-none text-base border bg-white px-16 py-3 rounded-xl">
                    <a href="./tablet">Xem tất cả sản phẩm</a>
                </button>
            )}
        </Section>
    );
};

export default PromoSecond;
