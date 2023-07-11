import numberWithCommas from '../../../utils/numberWithCommas';
import { Link } from 'react-router-dom';
import { Avatar } from '../../Avatar';
import { lowerCase } from 'lodash';

const HeaderSearchResultItem = ({ product }) => {
    return (
        <Link
            className="flex items-center justify-between space-x-6"
            to={`/${lowerCase(product.category)}/${product.slug}`}
        >
            <Avatar src={product.img} alt={product.title} className="rounded-lg" />
            <div className="flex flex-col space-y-2 w-full text-sm">
                <div className="text-lg font-semibold align-middle text-black">{product.title}</div>
                <div className="flex space-x-4">
                    <div className="text-primary-400">{numberWithCommas(product.price * (1 - product.discount))}đ</div>
                    <span className="line-through">{numberWithCommas(product.price)}đ</span>
                </div>
            </div>
        </Link>
    );
};

export default HeaderSearchResultItem;
