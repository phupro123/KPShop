import { capitalize } from "lodash";
import { twMerge } from "tailwind-merge";

const classNamesByStatus = {
  actived: "border-green-500 bg-green-500 text-white font-semibold",
  disabled: "border-gray-500 bg-gray-500 text-white font-semibold",
};

const UserStatus = ({ status, abc, className }) => {
  console.log(abc);
  return (
    <div
      className={twMerge(
        "mx-auto w-fit rounded-full border-2 text-center px-3 py-1 text-xs",
        classNamesByStatus[status],
        className
      )}
    >
      {capitalize(status)}
    </div>
  );
};
export default UserStatus;
