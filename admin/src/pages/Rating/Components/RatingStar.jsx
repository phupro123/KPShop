import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const starArray = [
  { star: 1 },
  { star: 2 },
  { star: 3 },
  { star: 4 },
  { star: 5 },
];

const RatingStar = ({ star }) => {
  return (
    <div className="flex justify-center items-center">
      {starArray.map((item) => (
        <div key={item.star}>
          {item.star <= star ? (
            <AiFillStar color="orange" size={15} />
          ) : (
            <AiOutlineStar color="orange" size={15} />
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingStar;
