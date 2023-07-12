import { AiOutlineReload } from "react-icons/ai";

import UploadInputContentItem from "./UploadInputContentItem";

const UploadInputContent = ({
  images,
  onClearImage,
  isLoading,
  reviewedImages,
}) => {
  return (
    <div className="flex flex-wrap justify-start gap-4 rounded-lg">
      {Array.from(images).map((image, index) => {
        return (
          <UploadInputContentItem
            key={index}
            image={image}
            onClearImage={onClearImage}
          />
        );
      })}
      {isLoading &&
        Array.from(reviewedImages).map((image, index) => {
          return (
            <div
              key={index}
              className="relative h-14 xs:w-[calc(20%-12px)] sm:w-[calc(25%-12px)] rounded-lg"
            >
              <img
                src={image}
                alt="CStorage"
                className="h-full w-full rounded-lg object-cover object-center opacity-50"
              />
              <div className="absolute inset-0 m-auto h-4 w-4 animate-spin rounded-full border-2 border-t-gray-600" />
            </div>
          );
        })}
      <div className="flex h-14 grow items-center justify-center rounded-lg bg-gray-100">
        <AiOutlineReload size={22} />
      </div>
    </div>
  );
};
export default UploadInputContent;
