import { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function Tag(props) {
    const initProductDetail = useSelector((state) => state.products.productDetail.data);
    const { colors, RAM } = initProductDetail;
    const [tagRam, setTagRam] = useState(RAM ? RAM[0] : []);
    const [tagColor, setTagColor] = useState(colors ? colors[0] : []);

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-4 mb-4">
                {RAM?.map((tag, index) => {
                    const active = tag === tagRam;
                    const className = clsx(
                        'border border-gray-400 px-10 py-4 text-xl rounded',
                        active && 'text-blue-400 border-blue-400',
                    );
                    return (
                        <button className={className} key={index} onClick={() => setTagRam(tag)}>
                            {tag}
                        </button>
                    );
                })}
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
}

export default Tag;
