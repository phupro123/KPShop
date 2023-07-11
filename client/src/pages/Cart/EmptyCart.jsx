import { Link } from 'react-router-dom';
import { BsCartCheckFill } from 'react-icons/bs';
function EmptyCart() {
    return (
        <div className="flex flex-col items-center space-y-6 bg-white text-base py-6">
            <div className="text-9xl text-primary-600">
                <BsCartCheckFill />
            </div>
            <p>Không có sản phẩm nào trong giỏ hàng</p>
            <Link to="/">
                <button className="bg-transparent text-blue-700 font-semibold py-4 px-60 border border-blue-500 rounded-xl uppercase">
                    Về trang chủ
                </button>
            </Link>
            <p>Khi cần trợ giúp vui lòng gọi 1800.1060 hoặc 028.3622.1060 (7h30 - 22h)</p>
        </div>
    );
}

export default EmptyCart;
