import { isEmpty, reduce } from 'lodash';
import { useMemo } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Star from './Star';

const vote = [
    {
        star: 5,
    },
    {
        star: 4,
    },
    {
        star: 3,
    },
    {
        star: 2,
    },
    {
        star: 1,
    },
];

const RatingTotal = ({ ratingProduct, process = false }) => {
    const totalStar = useMemo(() => {
        if (isEmpty(ratingProduct)) return 0;
        const total = reduce(
            ratingProduct,
            (sum, n) => {
                return sum + Number(n.star);
            },
            0,
        );
        return total / ratingProduct?.length;
    }, [ratingProduct]);

    return (
        <div className="my-2">
            <div className="flex items-center space-x-4 text-xl">
                <div className="text-[#ffa500] font-bold">{totalStar.toFixed(1)}</div>
                <Star star={totalStar} />
                <div className="text-base">{ratingProduct?.length} đánh giá</div>
            </div>
            {process &&
                vote.map((item) => {
                    const precentItem = (
                        ratingProduct?.filter((rating) => Number(rating.star) === item.star).length /
                            ratingProduct?.length || 0
                    ).toFixed(1);
                    const style = { width: `${precentItem * 100}%` };
                    return (
                        <div className="flex items-center space-x-4 font-semibold" key={item.star}>
                            {item.star}
                            <AiFillStar />
                            <div className="bg-gray-200 h-1.5 w-[150px]">
                                <div className="bg-[#ffa500] h-full" style={style}></div>
                            </div>
                            <span className="text-blue-500">{precentItem * 100}%</span>
                        </div>
                    );
                })}
        </div>
    );
};

export default RatingTotal;
