import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import HeaderUserDropdownItem from "./HeaderUserDropdownItem";

const HeaderUserDropdown = ({ onClick }) => {
  const [isUserDropDownVisible, setUserDropDownVisible] = useState(false);

  const userTabRef = useRef(null);
  const currentUser = useSelector((state) => state.users?.current?.data);

  const handleClick = useCallback(() => {
    onClick?.();
    setUserDropDownVisible(false);
  }, [onClick]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userTabRef.current && !userTabRef.current.contains(event.target)) {
        setUserDropDownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userTabRef]);

  return (
    <div className="relative h-10 w-10 rounded-full shadow-md" ref={userTabRef}>
      <div
        role="button"
        tabIndex={0}
        className="h-full w-full overflow-hidden rounded-full"
        onClick={() => setUserDropDownVisible((prev) => !prev)}
      >
        <img
          className="h-full w-full rounded-full"
          src={currentUser?.image}
          alt=""
        />
      </div>
      {isUserDropDownVisible && (
        <div className="absolute right-0 top-12 w-48 rounded-lg border-2 border-gray-100 bg-white p-4 text-slate-700 shadow-lg shadow-gray-100 transition duration-100 ease-linear">
          <HeaderUserDropdownItem onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
export default HeaderUserDropdown;
