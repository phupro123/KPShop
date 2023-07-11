import { useLayoutEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const LoadingOverlay = ({ className }) => {
    useLayoutEffect(() => {
        window.document.body.style.overflow = 'hidden';

        return () => {
            window.document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div
                className={twMerge(
                    'h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent',
                    className,
                )}
            />
        </div>
    );
};

export default LoadingOverlay;
