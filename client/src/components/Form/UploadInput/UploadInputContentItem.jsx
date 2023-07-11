import { useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";

const UploadInputContentItem = ({ image, onClearImage }) => {
  const handleClearImage = useCallback(
    (e) => {
      onClearImage(e, image);
    },
    [image, onClearImage]
  );

  return (
    <div className="group relative aspect-4/3 h-14 xs:w-[calc(20%-12px)] sm:w-[calc(25%-12px)] flex-none rounded-lg">
      <img
        src={image}
        alt="cstorage"
        className="h-full w-full rounded-lg object-cover object-center"
      />
      <div
        role="button"
        tabIndex={0}
        className="invisible absolute top-0 flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-red-500 opacity-70 group-hover:visible"
        onClick={handleClearImage}
      >
        <FiTrash2 size={22} />
      </div>
    </div>
  );
};
export default UploadInputContentItem;
