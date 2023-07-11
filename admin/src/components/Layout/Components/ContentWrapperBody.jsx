import { twMerge } from "tailwind-merge";

const ContentWrapperBody = ({ isBlank, isBorder = true, children }) => {
  return (
    <div
      className={twMerge(
        !isBlank &&
          "rounded-lg border-2 border-gray-100 p-6 shadow shadow-gray-50",
        isBlank && isBorder && "border-t-2 border-gray-100"
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapperBody;
