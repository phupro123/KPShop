import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../../utils';

function ItemOrder({ data }) {
    let sum = 0;

    return (
        <>
            <table className="w-full">
                <thead className="border-b text-center">
                    <tr>
                        <th className="text-gray-900 px-3 py-2 font-semibold">Hình ảnh</th>
                        <th className="text-gray-900 px-3 py-2 font-semibold">Tên</th>
                        <th className="text-gray-900 px-3 py-2 font-semibold">Giá</th>
                        <th className="text-gray-900 px-3 py-2 font-semibold">Số lượng</th>
                        <th className="text-gray-900 px-3 py-2 font-semibold">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data.order_items.map((item, index) => {
                        sum += item.price * (1 - item.discount) * item.quantity;
                        return (
                            <tr key={index} className="border-b">
                                <td className="text-gray-900 font-light px-3 py-2 flex justify-center">
                                    <img src={item.img} className="h-16 mr-4" alt="" />
                                </td>
                                <td className="text-gray-900 font-light px-3 py-2 text-left">
                                    <Link to={`/${item.category}/${item.slug}`} className="font-semibold">
                                        {item.title}
                                        <p className="font-normal">Hãng: {item.category}</p>
                                    </Link>
                                </td>
                                <td className="text-gray-900 px-3 py-2">
                                    <p className="text-primary-500">
                                        {numberWithCommas(item.price * (1 - item.discount))}₫
                                    </p>
                                    <p className="line-through">{numberWithCommas(item.price)}₫</p>
                                </td>
                                <td className="text-gray-900 font-light px-3 py-2">
                                    <b className="">{item.quantity}</b>
                                </td>
                                <td className="text-gray-900 px-3 py-2 font-semibold">
                                    <p className="text-primary-500">
                                        {numberWithCommas(item.price * (1 - item.discount) * item.quantity)}₫
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="text-right mt-3 font-bold">
                Tổng:
                <span className="text-primary-500"> {numberWithCommas(sum)}đ</span>
            </div>
        </>
    );
}

export default ItemOrder;
