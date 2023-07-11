import { useCallback, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

const CounterQuantity = ({ value, size, onChange }) => {
    const [quantity, setQuantity] = useState(value);

    const handleIncreaseQuantity = useCallback(() => {
        setQuantity((pre) => pre + 1);
        onChange?.(quantity + 1);
    }, [onChange, quantity]);

    const handleDecreaseQuantity = useCallback(() => {
        if (quantity > 1) {
            setQuantity((pre) => pre - 1);
            onChange?.(quantity - 1);
        }
    }, [onChange, quantity]);

    return (
        <div className={twMerge(size === 'sm' ? 'text-sm' : 'text-lg', 'flex h-10')}>
            <span
                className={twMerge(
                    size === 'sm' ? 'p-3' : 'p-4',
                    quantity === 1 ? 'text-gray-100' : 'text-blue-400',
                    'cursor-pointer flex items-center border-2',
                )}
                onClick={handleDecreaseQuantity}
            >
                <BiMinus />
            </span>
            <input
                value={quantity}
                className={twMerge(size === 'sm' ? 'w-12' : 'w-20', 'text-center border-y-2')}
                disabled
            />
            <span
                className={twMerge(
                    size === 'sm' ? 'p-3' : 'p-4',
                    'cursor-pointer text-blue-400 flex items-center border-2',
                )}
                onClick={handleIncreaseQuantity}
            >
                <BiPlus />
            </span>
        </div>
    );
};

export default CounterQuantity;
