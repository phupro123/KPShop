import { twMerge } from "tailwind-merge";
import { LoadingSkeleton } from "../Loading";

const Avatar = ({ alt, skeleton = false, src, className }) => {
  return (
    <div
      className={twMerge(
        "relative mx-auto h-12 w-12 cursor-pointer rounded-full bg-gray-100",
        className
      )}
    >
      {(skeleton || !src) && (
        <LoadingSkeleton
          className={twMerge("h-12 w-12 rounded-full", className)}
        />
      )}
      {!skeleton && src && (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "h-12 w-12 rounded-full border-2 border-gray-100 object-cover object-center",
            className
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
