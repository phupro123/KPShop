import { useState, useEffect, useRef } from 'react';
import Section from '../Section';
import { productHistory } from '../../helpers/localStorage';
import { AiOutlineClose } from 'react-icons/ai';
import Carousel from '../Carousel';
import { LoadingSkeleton } from '../Loading';

const ProductHistory = ({ isLoading }) => {
    const section = useRef();
    const [products, setProducts] = useState([]);
    const handleClick = () => {
        section.current.remove();
        productHistory.clearProductHistory();
    };

    useEffect(() => {
        const data = productHistory.getItems();
        setProducts(data);
    }, []);
    return (
        <Section styles="border border-solid border-gray-300 px-4 mt-6" ref={section}>
            <div className="flex justify-between items-center text-black w-full">
                {isLoading ? (
                    <>
                        <LoadingSkeleton className="h-7 w-64" />
                        <LoadingSkeleton className="h-7 w-7" />
                    </>
                ) : (
                    <>
                        <p className="text-xl font-semibold">Sản phẩm bạn đã xem</p>
                        <span onClick={handleClick} className="cursor-pointer text-xl">
                            <AiOutlineClose />
                        </span>
                    </>
                )}
            </div>
            <Carousel isLoading={isLoading} data={products} isBorder />
        </Section>
    );
};

export default ProductHistory;
