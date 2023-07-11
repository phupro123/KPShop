import RatingStarItem from './RatingStarItem';

const feeling = [
    { star: 1, title: 'Rất tệ' },
    { star: 2, title: 'Tệ' },
    { star: 3, title: 'Bình thường' },
    { star: 4, title: 'Tốt' },
    { star: 5, title: 'Rất tốt' },
];

const RatingStar = ({ indexStar, handleSetIndexStar }) => {
    return (
        <div className="grid grid-cols-5">
            {feeling.map((item) => (
                <RatingStarItem
                    key={item.star}
                    handleSetIndexStar={handleSetIndexStar}
                    data={item}
                    status={item.star <= indexStar}
                />
            ))}
        </div>
    );
};

export default RatingStar;
