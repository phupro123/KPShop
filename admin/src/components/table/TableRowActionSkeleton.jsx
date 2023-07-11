import LoadingSkeleton from "../Loading/LoadingSkeleton";

const TableRowActionSkeleton = ({ numberOfActions = 2 }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {Array.from({ length: numberOfActions || 1 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LoadingSkeleton key={index} className="h-8 w-8" />
      ))}
    </div>
  );
};

export default TableRowActionSkeleton;
