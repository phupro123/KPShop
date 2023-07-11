import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";

const WidgetItemSkeleton = () => {
  return (
    <div className="flex flex-col justify-between space-y-1">
      <div className="flex items-center justify-between font-semibold text-red-700 group-hover:text-red-800">
        <LoadingSkeleton className="h-6 w-16" />
        <LoadingSkeleton className="h-6 w-6" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-end space-y-1">
          <LoadingSkeleton className="h-7 w-16" />
          <LoadingSkeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
};

export default WidgetItemSkeleton;
