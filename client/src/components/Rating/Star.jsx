import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const feeling = [
    { star: 1, title: 'Rất tệ' },
    { star: 2, title: 'Tệ' },
    { star: 3, title: 'Bình thường' },
    { star: 4, title: 'Tốt' },
    { star: 5, title: 'Rất tốt' },
];

const Star = ({ star }) => {
    return (
        <div className="flex">
            {feeling.map((item) => (
                <div key={item.star}>
                    {item.star <= star ? (
                        <AiFillStar color="orange" size={16} />
                    ) : (
                        <AiOutlineStar color="orange" size={16} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Star;
