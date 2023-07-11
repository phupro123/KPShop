import _ from "lodash";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import HeaderLoginButton from "./HeaderLoginButton";
import HeaderUserDropdown from "./HeaderUserDropdown";
import { Avatar } from "../../Avatar";
import logo from '../../../assets/logo.png';

const Header = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  const headerRef = useRef(null);
  const currentUser = useSelector((state) => state.users?.current?.data);
  const { pathname } = useLocation();

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 10) {
      setIsScrollDown(true);
    } else {
      setIsScrollDown(false);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    setIsScrollDown(true);
    return () => {};
  }, [handleScroll, pathname]);

  return (
    <div
      className={twMerge(
        "sticky top-0 z-50 h-20 w-full",
        isScrollDown ? "bg-white shadow" : "bg-inherit"
      )}
      ref={headerRef}
    >
      <div className="flex h-full w-full justify-between px-8">
        <div className="flex items-center justify-start">
          <Link to="/" className="flex h-full flex-shrink-0 items-center">
            <Avatar src={logo}  className="w-28 rounded-md" />
          </Link>
        </div>
        <div className="flex h-full w-fit items-center">
          {currentUser?.username ? (
            <HeaderUserDropdown />
          ) : (
            <HeaderLoginButton />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
