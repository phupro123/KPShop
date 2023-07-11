import { FiUpload } from "react-icons/fi";

const EmptyUploadInput = ({ placeholder }) => {
  return (
    <div className="grid h-14 w-full grid-cols-6 gap-x-2">
      <div className="col-span-5 flex h-full items-center justify-center rounded-lg bg-gray-100 text-inherit">
        {placeholder}
      </div>
      <div className="col-span-1 flex h-full items-center justify-center rounded-lg bg-gray-100 text-inherit">
        <FiUpload size={24} />
      </div>
    </div>
  );
};
export default EmptyUploadInput;
