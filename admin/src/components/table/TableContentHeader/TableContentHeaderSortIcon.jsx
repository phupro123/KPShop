import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

const TableContentHeaderSortIcon = ({ isSorted, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center",
        className,
        isSorted === false ? "text-gray-300" : "opacity-100"
      )}
    >
      {isSorted === "asc" || isSorted === undefined || isSorted === false ? (
        <TbArrowNarrowUp size={18} />
      ) : (
        <TbArrowNarrowDown size={18} />
      )}
    </div>
  );
};

export default TableContentHeaderSortIcon;
