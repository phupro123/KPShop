import { twMerge } from 'tailwind-merge';

const Button = ({ isLoading, children, className, disabled, color = 'blue', size = 'normal', ...anotherProps }) => {
    let colorClassNames = '';
    let sizeClassNames = '';
    let spinnerColorClassNames = '';

    switch (color) {
        case 'light':
            colorClassNames +=
                'bg-white hover:bg-gray-200 disabled:bg-gray-100 text-black disabled:text-gray-400 ring-gray-200 disabled:ring-gray-200';
            spinnerColorClassNames += 'border-gray-400';
            break;
        case 'blue':
            colorClassNames += 'bg-[#1a94ff] hover:bg-blue-500 text-white ring-gray-200 disabled:bg-gray-200';
            spinnerColorClassNames += 'border-gray-400';
            break;
        case 'orange':
            colorClassNames += 'bg-orange-600 hover:bg-orange-700 text-white ring-gray-200 disabled:ring-gray-200';
            spinnerColorClassNames += 'border-gray-400';
            break;
        case 'gray':
            colorClassNames += 'bg-gray-700 hover:bg-gray-800 text-white ring-gray-200 disabled:ring-gray-200';
            spinnerColorClassNames += 'border-gray-400';
            break;
        default:
            colorClassNames += `bg-primary-700 hover:bg-primary-800 text-white ring-primary-700 disabled:ring-gray-300 disabled:bg-gray-300 disabled:hover:bg-gray-300`;
            spinnerColorClassNames += disabled === true ? 'border-white' : 'border-gray-400';
    }

    switch (size) {
        case 'xs':
            sizeClassNames += 'px-2 py-1';
            break;

        case 'sm':
            sizeClassNames += 'px-4 py-2 rounded-md shadow-none drop-shadow-none';
            break;

        default:
            sizeClassNames += 'px-8 py-3';
    }

    return (
        <button
            type="button"
            className={twMerge(
                'rounded-xl',
                sizeClassNames,
                'duration-100s font-semibold outline-none ring-2 transition-colors',
                'flex',
                className,
                colorClassNames,
                'items-center justify-center',
            )}
            disabled={disabled}
            {...anotherProps}
        >
            {isLoading === true && (
                <div
                    className={twMerge(
                        'h-4 w-4 border-2',
                        spinnerColorClassNames,
                        'mr-3 animate-spin rounded-full border-t-transparent',
                    )}
                />
            )}
            {children}
        </button>
    );
};

export default Button;
