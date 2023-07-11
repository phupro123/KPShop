import { useState, useCallback } from 'react';
import { AiFillStar } from 'react-icons/ai';
import RatingModal from './RatingModal';
import Comment from './RatingComment';
import RatingTotal from './RatingTotal';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { LoadingSkeleton } from '../Loading';
import { Button } from '../Button';
import { _getAllRatingProduct } from '../../services/rating.service';

const images = [
    'https://cdn.tgdd.vn/comment/51982240/7230F870-6211-4567-A752-EAF2DCD900E0ITETG.jpeg',
    'https://cdn.tgdd.vn/comment/51690516/imageA70I9.jpg',
    'https://cdn.tgdd.vn/comment/51690511/imageJI9W2.jpg',
    'https://cdn.tgdd.vn/comment/51341098/IMG_UPLOAD_20220503_162905-20220503162907.jpg',
    'https://cdn.tgdd.vn/comment/51341098/IMG_UPLOAD_20220503_162905-20220503162907.jpg',
    'https://cdn.tgdd.vn/comment/51690511/imageJI9W2.jpg',
    'https://cdn.tgdd.vn/comment/51690516/imageA70I9.jpg',
    'https://cdn.tgdd.vn/comment/51982240/7230F870-6211-4567-A752-EAF2DCD900E0ITETG.jpeg',
];

const RatingProduct = ({ phoneData, getProductData }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [ratingProduct, setRatingProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showedProduct, setShowedProduct] = useState(2);

    const fetchRatingProductData = useCallback(async () => {
        setIsLoading(true);
        try {
            const dataRating = await _getAllRatingProduct(phoneData?._id);
            setRatingProduct(dataRating);
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình đánh giá sản phẩm. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    }, [toast, _getAllRatingProduct, phoneData]);

    useEffect(() => {
        fetchRatingProductData();
    }, [fetchRatingProductData]);

    const handleToggleModal = useCallback(() => {
        setIsOpenModal((pre) => !pre);
    }, [setIsOpenModal]);

    const handleShowMore = useCallback(() => {
        if (ratingProduct.length <= 2) {
            return;
        }
        if (showedProduct < ratingProduct.length) {
            setShowedProduct(ratingProduct.length);
            return;
        }
        setShowedProduct(2);
    }, [showedProduct, ratingProduct]);

    return (
        <div>
            <p className="text-2xl font-bold mb-4">Đánh giá {phoneData?.title}</p>
            <div className="border rounded-lg px-4 w-fit py-4">
                {isLoading ? (
                    <div className="flex items-center justify-between text-base space-x-4">
                        <div className="flex flex-col space-y-1">
                            <div className="flex space-x-4 items-center">
                                <LoadingSkeleton className="h-7 w-7" />
                                <div className="flex space-x-1">
                                    <LoadingSkeleton className="h-4 w-4" />
                                    <LoadingSkeleton className="h-4 w-4" />
                                    <LoadingSkeleton className="h-4 w-4" />
                                    <LoadingSkeleton className="h-4 w-4" />
                                    <LoadingSkeleton className="h-4 w-4" />
                                </div>
                                <LoadingSkeleton className="h-6 w-20" />
                            </div>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div className="flex space-x-2 items-center" key={index}>
                                    <LoadingSkeleton className="h-5 w-10" />
                                    <LoadingSkeleton className="h-5 w-full" />
                                    <LoadingSkeleton className="h-5 w-14" />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <LoadingSkeleton key={index} className="h-16 w-16 rounded-xl" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center text-base space-x-4">
                        <RatingTotal ratingProduct={ratingProduct} process />
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((image, index) => {
                                return (
                                    <div className="h-16 w-16 rounded-xl overflow-hidden" key={index}>
                                        <img src={image} alt="" className="h-full w-full object-cover" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <Comment
                    ratingProduct={ratingProduct}
                    showedProduct={showedProduct}
                    fetchRatingProductData={fetchRatingProductData}
                    isLoading={isLoading}
                />

                {isLoading ? (
                    <div className="flex space-x-4 w-full">
                        <LoadingSkeleton className="h-[52px] w-1/2 rounded-xl" />
                        <LoadingSkeleton className="h-[52px] w-1/2 rounded-xl" />
                    </div>
                ) : (
                    <div className="flex space-x-4 w-full text-white text-lg">
                        <Button className="w-1/2" onClick={handleToggleModal}>
                            <AiFillStar size={20} />
                            <span>Viết đánh giá</span>
                        </Button>
                        <Button className="w-1/2" onClick={handleShowMore}>
                            {showedProduct <= 2 ? 'Xem thêm đánh giá' : 'Thu nhỏ'}
                        </Button>
                    </div>
                )}
            </div>

            {isOpenModal && (
                <RatingModal
                    phoneData={phoneData}
                    ratingProduct={ratingProduct}
                    handleCloseModal={handleToggleModal}
                    fetchRatingProductData={fetchRatingProductData}
                    getProductData={getProductData}
                />
            )}
        </div>
    );
};

export default RatingProduct;
