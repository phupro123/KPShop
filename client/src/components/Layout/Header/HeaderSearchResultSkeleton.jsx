import { LoadingSkeleton } from '../../Loading';

const HeaderSearchResultSkeleton = () => {
    return (
        <>
            <LoadingSkeleton className="w-full h-7" />
            <div className="flex items-center justify-between space-x-6">
                <LoadingSkeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col space-y-2 w-full">
                    <LoadingSkeleton className="w-60 h-7" />
                    <div className="flex space-x-4 items-end">
                        <LoadingSkeleton className="w-16 h-5" />
                        <LoadingSkeleton className="w-16 h-5" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-6">
                <LoadingSkeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col space-y-2 w-full">
                    <LoadingSkeleton className="w-60 h-7" />
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="w-16 h-5" />
                        <LoadingSkeleton className="w-16 h-5" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-6">
                <LoadingSkeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col space-y-2 w-full">
                    <LoadingSkeleton className="w-60 h-7" />
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="w-16 h-5" />
                        <LoadingSkeleton className="w-16 h-5" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-6">
                <LoadingSkeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col space-y-2 w-full">
                    <LoadingSkeleton className="w-60 h-7" />
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="w-16 h-5" />
                        <LoadingSkeleton className="w-16 h-5" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderSearchResultSkeleton;
