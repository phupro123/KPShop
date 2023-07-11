import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const TableRowActionDropdownMenu = ({ id, items, parentRef }) => {
  const menuRef = useRef(null);
  const dropdownContainer = window.document.querySelector(
    ".kpshop-dropdown-container"
  );

  const setDropdownPosition = useCallback(() => {
    const parentElement = parentRef.current;
    const menuElement = menuRef.current;
    if (!parentElement || !menuElement) return;
    const parentElementRect = parentElement.getBoundingClientRect();
    menuElement.style.top = `${
      parentElementRect.top + parentElementRect.height + 8
    }px`;
    menuElement.style.right = `${
      window.innerWidth - parentElementRect.right - 16
    }px`;
  }, [parentRef]);

  useEffect(() => {
    setDropdownPosition();

    window.addEventListener("scroll", setDropdownPosition);
    window.addEventListener("resize", setDropdownPosition);

    return () => {
      window.removeEventListener("scroll", setDropdownPosition);
      window.removeEventListener("resize", setDropdownPosition);
    };
  }, [setDropdownPosition]);

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-10 flex w-40 flex-col rounded-lg border-2 border-gray-100 bg-white py-3 text-slate-700 shadow-lg shadow-gray-100"
    >
      {items.map((item) => (
        <div
          key={item.key}
          className={twMerge(
            "flex items-center justify-start px-4 py-1.5 hover:bg-gray-100",
            item.className
          )}
          role="button"
          tabIndex={0}
          onClick={() => item.onClick(id)}
        >
          <div className="mr-3">{item.icon}</div>
          <div className="line-clamp-1 break-all">{item.label}</div>
        </div>
      ))}
    </div>,
    dropdownContainer
  );
};

export default TableRowActionDropdownMenu;
