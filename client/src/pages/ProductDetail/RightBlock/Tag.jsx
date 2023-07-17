import { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const Tag = () => {
    const initProductDetail = useSelector((state) => state.products.productDetail.data);
    const { colors, RAM } = initProductDetail;
    const [tagColor, setTagColor] = useState(colors ? colors[0] : []);

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-4 mb-4">
                <div className="border px-10 py-4 text-xl rounded text-blue-400 border-blue-400">{RAM}</div>
            </div>
            <div className="flex flex-wrap gap-4">
                {colors?.map((tag, index) => {
                    const active = tag === tagColor;
                    const className = clsx(
                        'border border-gray-400 px-10 py-4 text-xl rounded',
                        active && 'text-blue-400 border-blue-400',
                    );
                    return (
                        <button className={className} key={index} onClick={() => setTagColor(tag)}>
                            {tag}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Tag;
