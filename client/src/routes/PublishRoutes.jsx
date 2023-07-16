import Manage from '../pages/Manage';
import Order from '../pages/Order/Order';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart';
import Device from '../pages/Device';
import HomeBlankPage from '../components/Layout/HomeBlankPage';

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
        path: 'search',
        element: <Device device="search" title="Tìm kiếm  - KPshop.com" />,
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
        element: <Manage path="favorite" title="Danh sách yêu thích  - KPshop.com" />,
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
    {
        path: 'about',
        element: <HomeBlankPage path="about" title="Về chúng tôi" />,
    },
    {
        path: 'blog',
        element: <HomeBlankPage path="blog" title="Blog" />,
    },
    {
        path: 'partner',
        element: <HomeBlankPage path="partner" title="Đối tác" />,
    },
    {
        path: 'contact',
        element: <HomeBlankPage path="contact" title="Liên hệ" />,
    },
    {
        path: 'guides',
        element: <HomeBlankPage path="guides" title="Hướng dẫn" />,
    },
    {
        path: 'complaint',
        element: <HomeBlankPage path="complaint" title="Góp ý khiếu nại" />,
    },
    {
        path: 'support',
        element: <HomeBlankPage path="support" title="Tổng đài hỗ trợ" />,
    },
    {
        path: 'recruitment',
        element: <HomeBlankPage path="recruitment" title="Tuyển dụng" />,
    },
    {
        path: 'purchase',
        element: <HomeBlankPage path="purchase" title="Mua trả góp" />,
    },
    {
        path: 'exchange',
        element: <HomeBlankPage path="exchange" title="Chính sách đổi trả" />,
    },
];
