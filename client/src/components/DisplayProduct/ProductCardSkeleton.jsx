import LoadingSkeleton from '../Loading/LoadingSkeleton';

function ProductCardSkeleton() {
    return (
        <div className="flex flex-col space-y-2 w-full">
            <LoadingSkeleton className="w-full h-48" />
            <LoadingSkeleton className="w-[160px] h-8" />
            <LoadingSkeleton className="w-full h-6" />
            <div className="flex items-center space-x-2">
                <LoadingSkeleton className="w-16 h-[26px]" />
                <LoadingSkeleton className="w-16 h-[26px]" />
            </div>
            <div className="flex items-center space-x-2 ">
                <LoadingSkeleton className="w-2/5 h-6" />
                <LoadingSkeleton className="w-2/5 h-6" />
                <LoadingSkeleton className="w-1/5 h-6" />
            </div>
            <div className="flex items-center space-x-2">
                <LoadingSkeleton className="w-6 h-6" />
                <LoadingSkeleton className="w-6 h-6" />
                <LoadingSkeleton className="w-6 h-6" />
            </div>
        </div>
    );
}

export default ProductCardSkeleton;
