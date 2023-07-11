import { useEffect } from 'react';
import EmptyCart from './EmptyCart';
import CartInfo from './CartInfo';
import { useSelector } from 'react-redux';

const Cart = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, []);

    const cartItems = useSelector((state) => state.cartItems.value);

    return cartItems.length ? (
        <div className="w-[1200px] mx-auto my-4">
            <CartInfo />
        </div>
    ) : (
        <EmptyCart />
    );
};

export default Cart;
