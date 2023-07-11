import { BsPhone } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { GiStabbedNote } from "react-icons/gi";
import { MdDevicesOther, MdOutlineFormatListBulleted } from "react-icons/md";
import { RiCoupon3Line, RiDiscussLine } from "react-icons/ri";
import { TbBrandDenodo } from "react-icons/tb";
import Sidebar from "./Sidebar";
import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";
import React from "react";
import { BiTable } from "react-icons/bi";

const AdminSidebar = () => {
  return (
    <Sidebar id="adminSidebar">
      <SidebarItem id="dashboard" to="/" icon={<BiTable />} text="Dashboard" />
      <SidebarGroup
        title="General"
        id="General"
        icon={<MdOutlineFormatListBulleted />}
      >
        <SidebarItem
          id="userManagement"
          to="/user-management"
          icon={<FiUsers />}
          text="User Management"
        />
        <SidebarItem
          id="orderManagement"
          to="/order-management"
          icon={<GiStabbedNote />}
          text="Order Management"
        />
        <SidebarItem
          id="ratingManagement"
          to="/rating-management"
          icon={<RiDiscussLine />}
          text="Rating Management"
        />
        <SidebarItem
          id="voucherManagement"
          to="/voucher-management"
          icon={<RiCoupon3Line />}
          text="Voucher Management"
        />
      </SidebarGroup>
      <SidebarGroup title="Product" id="product" icon={<MdDevicesOther />}>
        <SidebarItem
          id="brandManagement"
          to="/brand-management"
          icon={<TbBrandDenodo />}
          text="Brand Management"
        />
        <SidebarItem
          id="categoryManagement"
          to="/category-management"
          icon={<MdDevicesOther />}
          text="Category Management"
        />
        <SidebarItem
          id="productManagement"
          to="/product-management"
          icon={<BsPhone />}
          text="Product Management"
        />
      </SidebarGroup>
    </Sidebar>
  );
};

export default AdminSidebar;
