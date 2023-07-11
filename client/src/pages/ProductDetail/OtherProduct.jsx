import { useCallback, useEffect, useState } from 'react';
import Section from '../../components/Section';
import Carousel from '../../components/Carousel';
import { toast } from 'react-toastify';
import { getProducts } from '../../services/product.service';
import { LoadingSkeleton } from '../../components/Loading';

const OtherProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        try {
            const { data } = await getProducts({
                category: 'Phone',
            });

            setProductData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Section styles="border border-solid border-gray-300 px-4">
            <div className="flex justify-between items-center text-black w-full">
                {isLoading ? (
                    <LoadingSkeleton className="h-7 w-64" />
                ) : (
                    <p className="text-xl font-semibold">Xem thêm điện thoại khác</p>
                )}
            </div>
            <Carousel isLoading={isLoading} data={productData} isBorder />
        </Section>
    );
};

export default OtherProduct;
