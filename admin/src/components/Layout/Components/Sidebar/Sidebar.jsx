import { twMerge } from "tailwind-merge";
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../../redux/common/commonSlice";
import { BiChevronLeft } from "react-icons/bi";

const Sidebar = ({
  children,
  className,
  containerClassName,
  defaultOpeningGroups,
  id,
}) => {
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [openingGroupIds, setOpeningGroupIds] = useState(
    defaultOpeningGroups || []
  );

  const isCollapsed = useSelector((state) => state.common.isCollapsed);

  const containerCollapsedClassName = useMemo(() => {
    if (!isCollapsed) {
      return "";
    }
    return "w-14";
  }, [isCollapsed]);

  const dispatch = useDispatch();

  const handleClickCollapse = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const handleHoverSidebar = useCallback(() => {
    setIsHoveringSidebar(true);
  }, []);

  const handleLeaveSidebar = useCallback(() => {
    setIsHoveringSidebar(false);
  }, []);

  const handleOpenSidebarGroup = useCallback((id, isChildSelected = true) => {
    setOpeningGroupIds((prev) => {
      if (isChildSelected) {
        return [id];
      }

      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [id];
    });
  }, []);

  return (
    <div
      className={twMerge(
        "fixed bottom-0 left-0 top-0 z-40 border-r-2 border-gray-100 bg-gray-50 pt-20",
        className
      )}
      onMouseEnter={handleHoverSidebar}
      onMouseLeave={handleLeaveSidebar}
    >
      <div
        className={twMerge(
          "group/sidebar relative h-full w-72 bg-gray-50 duration-100",
          containerCollapsedClassName,
          className
        )}
      >
        <div
          className={twMerge(
            "overflow-overlay h-full w-full overflow-hidden px-4 py-5 hover:overflow-clip hover:overflow-y-auto",
            containerClassName,
            isCollapsed && "overflow-visible px-2 hover:overflow-visible"
          )}
        >
          {Children.map(children, (child) =>
            cloneElement(child, {
              ...child?.props,
              key: child?.props?.id,
              isOpen: openingGroupIds.includes(child?.props?.id),
              onOpen: handleOpenSidebarGroup,
            })
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "absolute -right-3.5 top-28 z-10 flex h-7 w-7 cursor-pointer select-none items-center justify-center rounded-full border-2 border-gray-100 bg-white opacity-0 shadow-lg hover:bg-gray-50",
          isHoveringSidebar && "opacity-100"
        )}
        role="button"
        tabIndex={0}
        onClick={handleClickCollapse}
      >
        <BiChevronLeft
          className={twMerge(
            "text-slate-500 duration-100",
            isCollapsed && "rotate-180"
          )}
          size={18}
        />
      </div>
    </div>
  );
};
export default Sidebar;
