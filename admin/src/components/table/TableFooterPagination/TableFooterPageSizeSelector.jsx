import { BiChevronDown } from "react-icons/bi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableFooterPageSizeSelector = ({ pageSize, onChangePageSize }) => {
  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <div className="flex cursor-pointer items-center space-x-1 rounded-lg bg-gray-100 py-2 pl-4 pr-3 text-sm font-semibold duration-100 hover:bg-gray-200">
      <span>{pageSizeOptions[0]}</span>
      <BiChevronDown size={18} />
    </div>
  );
};

export default TableFooterPageSizeSelector;
