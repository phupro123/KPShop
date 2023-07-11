import { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";

import TableRowActionDropdownMenu from "./TableRowActionDropdownMenu";

const TableRowActionDropdown = ({ id, items }) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const toggleButtonRef = useRef(null);

  const handleClickToggleButton = () => {
    setIsShowDropdownMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!toggleButtonRef.current) {
      return undefined;
    }
    const toggleButtonElement = toggleButtonRef.current;
    const handleClickOutside = (event) => {
      if (toggleButtonElement.contains(event.target)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={toggleButtonRef}>
      <div
        className="cursor-pointer rounded-lg bg-gray-100 p-2 duration-100 hover:bg-gray-200"
        role="button"
        tabIndex={0}
        onClick={handleClickToggleButton}
      >
        <HiMenu />
      </div>
      {isShowDropdownMenu && (
        <TableRowActionDropdownMenu
          parentRef={toggleButtonRef}
          id={id}
          items={items}
        />
      )}
    </div>
  );
};

export default TableRowActionDropdown;
