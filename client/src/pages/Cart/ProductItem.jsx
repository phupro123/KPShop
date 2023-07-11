import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils';
import { useDispatch } from 'react-redux';
import { removeItem, updateItem } from '../../redux/shopping-cart/cartItemsSlide';
import { CounterQuantity } from '../../components/Quantity';
import { AiFillDelete } from 'react-icons/ai';
import { useCallback } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import { lowerCase } from 'lodash';

function ProductItem({ product }) {
    const dispatch = useDispatch();

    const removeCartItem = useCallback(() => {
        dispatch(removeItem(product));
    }, [dispatch, removeItem, product]);

    const updateCartItem = useCallback(
        (quantity) => {
            dispatch(updateItem({ ...product, quantity }));
        },
        [dispatch, updateItem, product],
    );

    return (
        <div className="flex items-center text-base space-x-4">
            <div className="flex-none w-24">
                <Avatar src={product.img} alt={product.title} className="h-16 rounded-lg border-none w-fit mx-auto" />
            </div>
            <Link to={`/${lowerCase(product.category)}/${product.slug}`} className="font-semibold grow">
                {product.title}
            </Link>
            <div className="flex-none w-24">
                <p className="text-primary-500">{numberWithCommas(product.price * (1 - product.discount))}₫</p>
                <p className="line-through">{numberWithCommas(product.price)}₫</p>
            </div>
            <CounterQuantity value={product.quantity} onChange={updateCartItem} size="sm" />
            <div className="text-primary-500 font-semibold flex-none w-32 text-right">
                {numberWithCommas(product.price * (1 - product.discount) * product.quantity)}₫
            </div>
            <button className="text-primary-600" onClick={removeCartItem}>
                <AiFillDelete size={24} />
            </button>
        </div>
    );
}

export default ProductItem;
