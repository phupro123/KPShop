import LoadingSkeleton from "../../../components/Loading/LoadingSkeleton";

const ChartByMonthSkeleton = () => {
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

      <LoadingSkeleton className="h-[280px] w-full" />

      <div className="flex flex-col items-center space-y-2 mt-2">
        <LoadingSkeleton className="h-6 w-32" />
        <LoadingSkeleton className="h-6 w-32" />
      </div>
    </>
  );
};

export default ChartByMonthSkeleton;
