import { useCart } from '../../../hooks';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const HeaderCart = () => {
    const { totalQuantity } = useCart();
    return (
        <div className="relative">
            <div className="absolute top-2 left-0 translate-x-4 -translate-y-1/2 bg-yellow-300 w-4 h-4 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">{totalQuantity}</span>
            </div>
            <AiOutlineShoppingCart size={30} />
            <span className="ml-2 text-sm">Giỏ hàng</span>
        </div>
    );
};

export default HeaderCart;
