import TableContentBodySkeletonItem from "./TableContentBodySkeletonItem";

const TableContentBodySkeleton = ({ headers }) => {
  return (
    <tr>
      {headers.map((header, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <td key={index} className="border-b border-gray-50 p-4">
          <TableContentBodySkeletonItem header={header} />
        </td>
      ))}
    </tr>
  );
};

export default TableContentBodySkeleton;
