import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

const RatingStarItem = ({ handleSetIndexStar, status, data }) => {
    return (
        <button
            className="flex flex-col items-center"
            onClick={() => {
                handleSetIndexStar(data?.star);
            }}
        >
            {status ? <AiFillStar color="orange" size={30} /> : <AiOutlineStar color="orange" size={30} />}
            <span className={twMerge(status && 'font-semibold text-[#ffa500]', 'text-sm')}>{data.title}</span>
        </button>
    );
};

export default RatingStarItem;
