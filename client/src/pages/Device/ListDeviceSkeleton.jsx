import LoadingSkeleton from '../../components/Loading/LoadingSkeleton';

const ListDeviceSkeleton = () => {
    return (
        <div className="grid grid-cols-5 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-start space-y-2 rounded-md border-gray-200 border-2 p-4 shadow-sm h-[400px]"
                >
                    <LoadingSkeleton className="h-[180px] w-full rounded-md" />
                    <LoadingSkeleton className="rounded-3xl w-full h-8" />
                    <LoadingSkeleton className="w-full h-12" />
                    <div className="flex items-center space-x-2">
                        <LoadingSkeleton className="w-[65px] h-7" />
                        <LoadingSkeleton className="w-[65px] h-7" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <LoadingSkeleton className="w-2/5 h-6" />
                        <LoadingSkeleton className="w-2/5 h-6" />
                        <LoadingSkeleton className="w-1/5 h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <LoadingSkeleton className="w-6 h-6" />
                        <LoadingSkeleton className="w-6 h-6" />
                        <LoadingSkeleton className="w-9 h-6" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListDeviceSkeleton;
