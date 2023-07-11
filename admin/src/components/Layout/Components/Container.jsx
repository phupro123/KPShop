import { useCallback, useEffect, useMemo, useRef } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Container = ({ children, excludeSidebarPaths = [] }) => {
  const { pathname } = useLocation();

  const containerRef = useRef(null);

  const isMatchExcludeSidebarPaths = useMemo(
    () => excludeSidebarPaths.some((path) => matchPath(path, pathname)),
    [pathname, excludeSidebarPaths]
  );
  const calculateMarginLeft = useCallback(() => {
    let marginLeft = 0;

    if (!containerRef.current) {
      return;
    }

    if (isCollapsed) {
      marginLeft += 58;
    } else {
      marginLeft += 290;
    }

    containerRef.current.style.marginLeft = `${marginLeft}px`;
  }, []);

  useEffect(() => {
    calculateMarginLeft();
  }, [calculateMarginLeft]);

  return (
    <>
      {!isMatchExcludeSidebarPaths}
      <div
        className={twMerge(
          "ml-14 flex min-h-fit-layout flex-col xs:ml-20 md:ml-72",
          isMatchExcludeSidebarPaths && "md:ml-0"
        )}
        ref={containerRef}
      >
        {children}
      </div>
    </>
  );
};

export default Container;
