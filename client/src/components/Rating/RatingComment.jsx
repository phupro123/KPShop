import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillChatDotsFill, BsThreeDots } from 'react-icons/bs';
import Star from './Star';
import { toast } from 'react-toastify';
import RatingCommentSkeleton from './RatingCommentSkeleton';
import { _addDiscussRating } from '../../services/rating.service';
import { login } from '../../redux/user/userSlice';
import { createAxios } from '../../api/createInstance';

const Comment = ({ isLoading, showedProduct, ratingProduct, fetchRatingProductData }) => {
    const currentUser = useSelector((state) => state?.user?.currentUser);
    const dispath = useDispatch()
    const [discuss, setDiscuss] = useState();
    const [contentInput, setContentInput] = useState('');
    const [currentRating, setCurrentRating] = useState();
    const [isExpand, setIsExpand] = useState(false);
    let axiosJWT = createAxios(currentUser, dispath, login);
    const handleToggleShowDiscuss = (comment) => {
        setCurrentRating(comment);
        setDiscuss(comment?.discuss);
        setIsExpand((pre) => !pre);
    };

    const handleSubmitInfo = async () => {
        const newDiscuss = {
            _id: uuidv4(),
            currentUser,
            content: contentInput,
        };

        await _addDiscussRating(currentRating?._id, newDiscuss,axiosJWT,currentUser?._id);

        setDiscuss((state) => [...state, newDiscuss]);
        fetchRatingProductData();
        toast.success('Thành công');
        setContentInput('');
    };

    if (isLoading) {
        return <RatingCommentSkeleton />;
    }

    return (
        <div>
            {ratingProduct.slice(0, showedProduct)?.map((comment, index) => {
                return (
                    <div className="flex flex-col space-y-2 border-b py-4 text-base" key={index}>
                        <p className="font-bold text-lg">{comment.user.fullname}</p>
                        <span className="text-yellow-300">
                            <Star star={comment.star} />
                        </span>
                        <p>{comment.content}</p>
                        <div>
                            <span
                                className="text-blue-500 cursor-pointer select-none flex items-center space-x-4"
                                onClick={() => {
                                    handleToggleShowDiscuss(comment);
                                }}
                            >
                                <BsFillChatDotsFill />
                                <span>{comment?.discuss.length} Thảo luận</span>
                                <BsThreeDots />
                            </span>
                            {isExpand && comment._id === currentRating._id && (
                                <div>
                                    <input
                                        type="text"
                                        className="rounded-lg p-2 border mr-8 w-3/4 text-base mt-2"
                                        placeholder="Nhập thảo luận của bạn"
                                        value={contentInput}
                                        id={`inputDiscuss${index}`}
                                        onChange={(e) => {
                                            setContentInput(e.target.value);
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            document.getElementById(`inputDiscuss${index}`).value != ''
                                                ? handleSubmitInfo()
                                                : alert('Vui lòng nhập nội dung');
                                        }}
                                        className="bg-blue-500 px-6 py-2 rounded-lg text-white"
                                    >
                                        GỬI
                                    </button>
                                    <div className="max-h-[300px] overflow-y-scroll mt-2">
                                        {discuss?.map((item, index) => {
                                            return (
                                                <div
                                                    className="p-3 border rounded-lg mb-2 text-sm shadow-sm"
                                                    key={index}
                                                >
                                                    <p className="font-bold">{item.currentUser?.fullname}</p>
                                                    <p>{item.content}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Comment;
