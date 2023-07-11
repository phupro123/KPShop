import React from "react";
import { cloneElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

const SidebarItem = ({
  to,
  id,
  icon,
  isChild = false,
  text,
  textColor,
  className,
}) => {
  const [isActivated, setIsActivated] = useState(false);

  const isCollapsed = useSelector((state) => state.common.isCollapsed);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsActivated(pathname === to);
  }, [pathname, to]);

  return (
    <>
      <Link
        to={to}
        className={twMerge(
          "group relative my-1 flex items-center rounded-md py-3 font-[450] before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-sm before:bg-primary-800 hover:bg-gray-200 hover:text-primary-600 px-6",
          isActivated
            ? "bg-gray-200 text-primary-600 before:block"
            : "text-slate-700 before:hidden",
          isCollapsed &&
            !isChild &&
            "aspect-square items-center justify-center md:px-0",
          isChild && "md:py-2 md:pl-3 md:pr-4"
        )}
        data-tooltip-id={id}
        data-tooltip-content={text}
        data-tooltip-place="right"
        data-tooltip-position-strategy="fixed"
        data-tooltip-offset={16}
      >
        {cloneElement(icon, {
          className: twMerge(
            "flex-shrink-0 w-5 mr-4 hover:text-primary-600 ml-0.5",
            className,
            textColor,
            isCollapsed && !isChild && "mr-0"
          ),
          size: 20,
        })}
        {!(isCollapsed && !isChild) && (
          <div
            className={twMerge(
              "!line-clamp-1 inline-block",
              textColor,
              isCollapsed && "whitespace-nowrap",
              isChild && "w-full"
            )}
            id={id}
          >
            {text}
          </div>
        )}
      </Link>
      {isCollapsed && !isChild && <Tooltip id={id} />}
    </>
  );
};

export default SidebarItem;
