import { numberWithCommas } from "~/utils";

function OrderDetail({ selectedOrder }) {
  const orderItems = selectedOrder?.order_items;

  const amountPaid = selectedOrder?.totalPrice;

  return (
    <div className="w-full">
      <div className="min-w-full text-base mx-auto border-2 rounded-xl px-6">
        <tbody className="text-center">
          {orderItems?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="pr-6">
                  <img
                    src={item.img}
                    className="h-14 object-contain mx-auto"
                    alt=""
                  />
                </td>
                <td className="text-gray-900 pr-6 text-left w-[250px] py-4">
                  <p className="whitespace-normal break-words">{item.title}</p>
                  <p className="font-medium">Hãng: {item.category}</p>
                </td>
                <td className="text-gray-900 pr-6">
                  <p className="text-red-500">
                    {numberWithCommas(item.price * (1 - item.discount))}₫
                  </p>
                  <p className="line-through">
                    {numberWithCommas(item.price)}₫
                  </p>
                </td>
                <td className="text-gray-900 pr-6">
                  <b className="">{item.quantity}</b>
                </td>
                <td className="text-gray-900">
                  <b className="text-red-500">
                    {numberWithCommas(
                      item.price * (1 - item.discount) * item.quantity
                    )}
                    ₫
                  </b>
                </td>
              </tr>
            );
          })}
        </tbody>
        <div className="text-left border-t mt-4">
          <p className="text-right my-4 font-bold">
            <span>Tổng tiền: </span>
            <span className="text-red-500">
              {numberWithCommas(amountPaid)}₫
            </span>
          </p>
        </div>
      </div>

      <div className=" text-left text-base my-4">
        <p className="font-bold">Địa chỉ và thông tin người đặt hàng</p>
        <ul>
          <li>
            <span className="font-bold">Anh: </span>
            {selectedOrder?.phone}
          </li>
          <li>
            <span className="font-bold">Địa chỉ nhận hàng: </span>
            {selectedOrder?.address}
          </li>
          <li>
            <span className="font-bold">Thời gian đặt hàng: </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderDetail;
