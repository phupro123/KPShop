import Section from '../../components/Section';
import Carousel from '../../components/Carousel';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../services/product.service';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton';
import { toast } from 'react-toastify';

function PromoThird() {
    const [isLoading, setIsLoading] = useState(true);
    const [laptopData, setLaptopData] = useState([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        try {
            const { data } = await getProducts({ category: 'Laptop' });

            setLaptopData(data);
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
            src="https://media.istockphoto.com/vectors/back-to-school-sale-horizontal-banner-first-day-of-school-vector-vector-id1158813066?k=6&m=1158813066&s=170667a&w=0&h=Iki3WgYaS0lNqp4jzLrssUNPyXx5T30tt3q6BAeD1k8="
            title="SIÊU SALE NGÀY TỰU TRƯỜNG"
            styles="bg-[#ffa600] px-4"
        >
            <Carousel isLoading={isLoading} data={laptopData} />
            {isLoading ? (
                <LoadingSkeleton className="h-[50px] w-[278px]" />
            ) : (
                <button className="outline-none text-base border bg-white px-16 py-3 rounded-xl">
                    <a href="./laptop">Xem tất cả sản phẩm</a>
                </button>
            )}
        </Section>
    );
}

export default PromoThird;
