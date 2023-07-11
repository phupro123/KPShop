import Manage from '../pages/Manage';
import Order from '../pages/Order/Order';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart';
import Device from '../pages/Device';

import Forget from '../pages/Home/Forget/Forget';
export const publishRoutes = [
    {
        index: true,
        element: <Home title="KPShop.com - Điện thoại, Laptop chính hãng" />,
    },
    {
        path: 'cart',
        element: <Cart title="Giỏ hàng - KPshop.com" />,
    },
    {
        path: 'phone',
        element: <Device device="phone" title="Sản phẩm - KPshop.com" />,
    },
    {
        path: 'tablet',
        element: <Device device="tablet" title="Sản phẩm  - KPshop.com" />,
    },
    {
        path: 'laptop',
        element: <Device device="laptop" title="Sản phẩm  - KPshop.com" />,
    },
    {
        path: 'account',
        element: <Manage path="account" title="Thông tin cá nhân - KPshop.com" />,
    },

    {
        path: 'history',
        element: <Manage path="history" title="Lịch sử đơn hàng  - KPshop.com" />,
    },
    {
        path: 'address',
        element: <Manage path="address" title="Số địa chỉ  - KPshop.com" />,
    },
    {
        path: 'favorite',
        element: <Manage path="favorite" title="Số địa chỉ  - KPshop.com" />,
    },
    {
        path: 'account/edit/password',
        element: <Manage path="password" title="Cập nhật mật khẩu - KPshop.com" />,
    },
    {
        path: 'account/edit/phone',
        element: <Manage path="phone" title="Cập nhật số điện thoại- KPshop.com" />,
    },
    {
        path: 'account/edit/mail',
        element: <Manage path="mail" title="Cập nhật Email- KPshop.com" />,
    },
    {
        path: 'order',
        element: <Order title="Xác nhận đơn hàng  - KPshop.com" />,
    },
    {
        path: 'order/:id',
        element: <Manage path="orderdetail" title="Chi tiết đơn hàng - KPshop.com" />,
    },
    {
        path: 'forget-password/:id',
        element: <Forget path="orderdetail" title="Quên mật khẩu - KPshop.com" />,
    },
];
