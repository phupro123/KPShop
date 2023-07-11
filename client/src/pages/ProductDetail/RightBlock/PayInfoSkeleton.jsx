import { LoadingSkeleton } from '../../../components/Loading';

const PayInfoSkeleton = () => {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                    <LoadingSkeleton className="h-6 w-24" />
                    <LoadingSkeleton className="h-6 w-20" />
                </div>
                <LoadingSkeleton className="h-9 w-[350px]" />
                <div className="flex space-x-4">
                    <LoadingSkeleton className="h-7 w-8" />
                    <LoadingSkeleton className="h-7 w-20" />
                    <LoadingSkeleton className="h-7 w-20" />
                </div>
            </div>
            <div className="flex items-center space-x-8">
                <LoadingSkeleton className="h-7 w-20" />
                <LoadingSkeleton className="h-8 w-48" />
                <LoadingSkeleton className="h-6 w-24" />
                <LoadingSkeleton className="h-6 w-11" />
            </div>
            <div className="flex items-center space-x-8">
                <LoadingSkeleton className="h-7 w-20" />
                <LoadingSkeleton className="h-10 w-44" />
            </div>
            <LoadingSkeleton className="h-[52px] w-full my-6 rounded-lg" />
            <div className="border border-gray-400">
                <div className="p-4 border-b border-gray-400">
                    <LoadingSkeleton className="h-7 w-20" />
                </div>
                <div className="p-4 flex flex-col space-y-2">
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="rounded-full h-7 w-7" />
                        <LoadingSkeleton className="h-7 w-full" />
                    </div>
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="rounded-full h-7 w-7" />
                        <LoadingSkeleton className="h-7 w-full" />
                    </div>
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="rounded-full h-7 w-7" />
                        <LoadingSkeleton className="h-7 w-full" />
                    </div>
                </div>
            </div>
            <div className="border border-gray-400">
                <div className="p-4 border-b border-gray-400">
                    <LoadingSkeleton className="h-7 w-20" />
                </div>
                <div className="p-4 flex flex-col space-y-2">
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="rounded-full h-7 w-7" />
                        <LoadingSkeleton className="h-7 w-full" />
                    </div>
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="rounded-full h-7 w-7" />
                        <LoadingSkeleton className="h-7 w-full" />
                    </div>
                    <div className="flex space-x-4">
                        <LoadingSkeleton className="rounded-full h-7 w-7" />
                        <LoadingSkeleton className="h-7 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayInfoSkeleton;
