import { twMerge } from "tailwind-merge";

const OptionOP = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        "min-w-full whitespace-nowrap px-4 py-1.5 duration-100 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default OptionOP;
