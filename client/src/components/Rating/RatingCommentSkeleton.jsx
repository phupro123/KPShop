import { LoadingSkeleton } from '../Loading';

const RatingCommentSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col space-y-2 border-b py-4">
                <LoadingSkeleton className="h-7 w-40" />
                <div className="flex space-x-1">
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                </div>
                <LoadingSkeleton className="h-6 w-full" />
                <LoadingSkeleton className="h-6 w-full" />
                <div className="flex space-x-2">
                    <LoadingSkeleton className="h-6 w-6" />
                    <LoadingSkeleton className="h-6 w-24" />
                    <LoadingSkeleton className="h-6 w-6" />
                </div>
            </div>
            <div className="flex flex-col space-y-2 border-b py-4">
                <LoadingSkeleton className="h-7 w-40" />
                <div className="flex space-x-1">
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                    <LoadingSkeleton className="h-4 w-4" />
                </div>
                <LoadingSkeleton className="h-6 w-full" />
                <LoadingSkeleton className="h-6 w-full" />
                <div className="flex space-x-2">
                    <LoadingSkeleton className="h-6 w-6" />
                    <LoadingSkeleton className="h-6 w-24" />
                    <LoadingSkeleton className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

export default RatingCommentSkeleton;
