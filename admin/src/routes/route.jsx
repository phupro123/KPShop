import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
import NotFound from "../pages/notfound/NotFound";
import Layout from "../components/Layout/Layout";
import ProductManagement from "../pages/Product/ProductManagement";
import UserManagement from "../pages/User/UserManagement";
import OrderManagement from "../pages/Order/OrderManagement";
import RatingManagement from "../pages/Rating/RatingManagement";
import VoucherManagement from "../pages/Voucher/VoucherManagement";
import BrandManagement from "../pages/Brand/BrandManagement";
import CategoryManagement from "../pages/Category/CategoryManagement";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/rating-management" element={<RatingManagement />} />
        <Route path="/voucher-management" element={<VoucherManagement />} />
        <Route path="/brand-management" element={<BrandManagement />} />
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
