import { NavLink } from "react-router-dom";

const HeaderLoginButton = () => {
  return (
    <NavLink to="/login">
      <button
        type="button"
        className="my-4 justify-center rounded-full border-solid border-black bg-red-600 px-[30px] py-3 text-center text-[12px] font-semibold leading-6 text-white focus:bg-red-700 hover:cursor-pointer hover:bg-red-700 sm:text-base"
      >
        Login
      </button>
    </NavLink>
  );
};

export default HeaderLoginButton;
