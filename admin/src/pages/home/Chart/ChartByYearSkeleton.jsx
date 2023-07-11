import LoadingSkeleton from "../../../components/Loading/LoadingSkeleton";

const ChartByYearSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <LoadingSkeleton className="h-6 w-6" />
          <LoadingSkeleton className="h-6 w-10" />
        </div>
        <LoadingSkeleton className="h-7 w-[380px]" />
        <div className="flex items-center space-x-2">
          <LoadingSkeleton className="h-6 w-10" />
          <LoadingSkeleton className="h-6 w-6" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center space-y-2">
          <LoadingSkeleton className="h-72 w-full" />
          <LoadingSkeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <LoadingSkeleton className="h-72 w-full" />
          <LoadingSkeleton className="h-6 w-32" />
        </div>
      </div>
    </>
  );
};

export default ChartByYearSkeleton;
