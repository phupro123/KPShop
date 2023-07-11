import { Link, useParams } from 'react-router-dom';
import OtherProduct from './OtherProduct';
import { Parameter, PayInfo } from './RightBlock';
import { Article, Policy, SlickBlock } from './LeftBlock';
import { useDispatch } from 'react-redux';
import RatingProduct from '../../components/Rating';
import { BsChevronRight } from 'react-icons/bs';
import { ProductHistory } from '../../components/DisplayProduct';
import { lowerCase } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getProductBySlug } from '../../services/product.service';
import { LoadingSkeleton } from '../../components/Loading';

const ProductDetail = () => {
    const { productSlug } = useParams();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [phoneData, setPhoneData] = useState();

    const getProductData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getProductBySlug(productSlug);
            setPhoneData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast, dispatch, productSlug]);

    useEffect(() => {
        getProductData();
    }, [getProductData]);

    return (
        <div className="w-[1200px] mx-auto">
            {isLoading ? (
                <div className="flex items-center space-x-2 mt-6">
                    <LoadingSkeleton className="h-7 w-12" />
                    <LoadingSkeleton className="h-7 w-7" />
                    <LoadingSkeleton className="h-7 w-56" />
                </div>
            ) : (
                <div className="flex items-center text-gray-500 text-lg list-none m-auto mt-6">
                    <Link to={`/${lowerCase(phoneData?.category)}`}>{phoneData?.category}</Link>
                    <BsChevronRight />
                    <div>{phoneData?.title}</div>
                </div>
            )}

            <div className="flex flex-col space-y-6 py-6">
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <SlickBlock isLoading={isLoading} phoneData={phoneData} />
                        <Policy isLoading={isLoading} />
                        <Article isLoading={isLoading} info={phoneData?.info} />
                        <RatingProduct phoneData={phoneData} getProductData={getProductData} />
                    </div>
                    <div className="w-1/2">
                        <PayInfo isLoading={isLoading} phoneData={phoneData} />
                        <Parameter isLoading={isLoading} phoneData={phoneData} />
                    </div>
                </div>
                <OtherProduct />
                <ProductHistory isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ProductDetail;
