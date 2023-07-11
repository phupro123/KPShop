import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingStar from './RatingStar';
import { isEmpty, reduce } from 'lodash';
import { updateRatingProductById } from '../../services/product.service';
import { toast } from 'react-toastify';
import { _newRating } from '../../services/rating.service';

const RatingModal = ({ phoneData, ratingProduct, handleCloseModal, fetchRatingProductData, getProductData }) => {
    const currentUser = useSelector((state) => state?.user?.currentUser);
    const dispatch = useDispatch();

    const [indexStar, setIndexStar] = useState(0);
    const [contentInput, setContentInput] = useState('');

    const totalStar = useMemo(() => {
        if (isEmpty(ratingProduct)) return 0;
        const total = reduce(
            ratingProduct,
            (sum, n) => {
                return sum + Number(n.star);
            },
            0,
        );
        return total;
    }, [ratingProduct]);

    const handleSetIndexStar = useCallback(
        (index) => {
            setIndexStar(index);
        },
        [setIndexStar],
    );

    const handleSubmit = useCallback(async () => {
        try {
            await _newRating({
                product_id: phoneData._id,
                product: phoneData,
                user_id: currentUser._id,
                user: currentUser,
                content: contentInput,
                star: indexStar,
            });
            await updateRatingProductById(
                phoneData._id,
                (totalStar + indexStar) / (ratingProduct.length + 1),
                ratingProduct.length + 1,
            );
            toast.success('Thêm bình luận thành công');
        } catch {
            toast.error('Đã có lỗi xảy ra trong quá trình cập nhật');
        } finally {
            handleCloseModal();
            fetchRatingProductData();
            getProductData();
        }
    }, [
        dispatch,
        indexStar,
        contentInput,
        totalStar,
        ratingProduct,
        handleCloseModal,
        fetchRatingProductData,
        getProductData,
        toast,
    ]);

    return (
        <>
            <div
                onClick={handleCloseModal}
                className="fixed inset-0 w-full h-full z-10 bg-gray-800 bg-opacity-80"
            ></div>
            <div className="fixed z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-xl border shadow-xl text-gray-800 text-base h-fit p-6">
                <p className="text-2xl font-bold mb-6">Đánh giá</p>
                <div className="flex flex-col space-y-6 items-center">
                    <div className="font-bold text-xl flex items-center">
                        <div className="w-28">
                            <img src={phoneData.img} alt="" />
                        </div>
                        <p>{phoneData.title}</p>
                    </div>

                    <RatingStar indexStar={indexStar} handleSetIndexStar={handleSetIndexStar} />

                    <textarea
                        className="w-full rounded-xl border p-4 border-solid focus:outline-none focus:border-blue-500"
                        value={contentInput}
                        cols="30"
                        rows="5"
                        onChange={(e) => {
                            setContentInput(e.target.value);
                        }}
                        placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm ..."
                    />

                    <button onClick={handleSubmit} className="bg-blue-500 rounded-xl text-white px-6 py-2 text-lg">
                        Gửi đánh giá ngay
                    </button>
                    <div>Để đánh giá được duyệt, quý khách vui lòng tham khảo Quy định duyệt đánh giá</div>
                </div>
            </div>
        </>
    );
};

export default RatingModal;
