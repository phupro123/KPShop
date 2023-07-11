import { twMerge } from "tailwind-merge";

const classNamesByStatus = {
  "Đang xử lý": "border-orange-500 text-orange-500",
  "Chờ thanh toán": "border-blue-500 text-blue-500",
  "Đang vận chuyển": "border-gray-500 text-gray-500",
  "Đã giao": "border-green-500 text-green-500",
  "Đã hủy": "border-red-500 text-red-500",
};

const sizeStatus = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1",
  xl: "text-xl px-3 py-2",
};

const OrderStatus = ({ status = "Đang xử lý", size = "sm", className }) => {
  return (
    <div
      className={twMerge(
        "mx-auto w-fit rounded-full border-2 text-center",
        classNamesByStatus[status],
        sizeStatus[size],
        className
      )}
    >
      {status}
    </div>
  );
};
export default OrderStatus;
