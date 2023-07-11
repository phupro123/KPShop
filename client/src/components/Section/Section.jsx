import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingSkeleton from '../Loading/LoadingSkeleton';
const Section = ({ isLoading, title, src, styles = 'bg-transparent', children }, ref) => {
    return (
        <section className={twMerge(styles, 'flex flex-col space-y-4 py-8 rounded-xl')} ref={ref}>
            {isLoading ? (
                <>
                    {src && <LoadingSkeleton className="w-full h-[200px]" />}
                    {title && <LoadingSkeleton className="w-[400px] h-12 mx-auto" />}
                </>
            ) : (
                <>
                    {src && <img src={src} alt="" className="w-full cursor-pointer h-[200px] object-fit" />}
                    {title && <p className="uppercase text-5xl font-bold text-white text-center w-full">{title}</p>}
                </>
            )}
            <div className="flex flex-col space-y-4 justify-center items-center">{children}</div>
        </section>
    );
};

export default forwardRef(Section);
