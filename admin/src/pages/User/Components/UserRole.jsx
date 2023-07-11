import { twMerge } from "tailwind-merge";

const classNamesByRole = {
  Admin: "border-red-500 text-red-500",
  User: "border-blue-500 text-blue-500",
};

const UserRole = ({ role = "User", className }) => {
  return (
    <div
      className={twMerge(
        "mx-auto w-fit rounded-full border-2 text-center px-3 py-1 text-sm",
        classNamesByRole[role],
        className
      )}
    >
      {role}
    </div>
  );
};
export default UserRole;
