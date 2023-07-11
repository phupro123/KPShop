import { twMerge } from "tailwind-merge";

const TableStatusColumn = ({ type, message, className }) => {
  const classNamesByStatus = {
    default: "border-gray-500 text-gray-500",
    success: "border-green-500 text-green-500",
    error: "border-red-600 text-red-600",
    warning: "border-orange-400 text-orange-400",
  };

  return (
    <div
      className={twMerge(
        "mx-auto h-full w-fit rounded-full border-2 px-2 py-1 text-center text-xs",
        classNamesByStatus[type],
        className
      )}
    >
      {message}
    </div>
  );
};
export default TableStatusColumn;
