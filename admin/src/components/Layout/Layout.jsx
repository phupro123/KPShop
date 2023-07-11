import { Outlet } from "react-router-dom";
import AdminSidebar from "./Components/Sidebar/AdminSidebar";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

function Layout() {
  const isCollapsed = useSelector((state) => state.common.isCollapsed);

  return (
    <div className="min-h-fit-layout w-full">
      <AdminSidebar />
      <div className={twMerge("ml-72 items-center", isCollapsed && "ml-14")}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
