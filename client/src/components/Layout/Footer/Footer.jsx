import { BsFacebook, BsYoutube } from 'react-icons/bs';

function Footer() {
    return (
        <footer className="flex flex-col text-[#333333] bg-white border-t border-solid border-[#e2e2e2]">
            <div id="recaptcha-container"></div>
            <div className="flex items-start justify-between w-[1200px] text-[14px] mx-auto">
                <ul>
                    <li>Tích điểm Quà tặng VIP</li>
                    <li>Lịch sử mua hàng</li>
                    <li>Cộng tác bán hàng cùng KPShop</li>
                    <li>Tìm hiểu về mua trả góp</li>
                    <li>Chính sách bảo hành</li>
                    <li>Xem thêm</li>
                </ul>
                <ul>
                    <li>Giới thiệu công ty </li>
                    <li>Tuyển dụng</li>
                    <li>Gửi góp ý, khiếu nại</li>
                    <li>Tìm siêu thị (3.203 shop)</li>
                    <li>Xem bản mobile</li>
                </ul>
                <ul>
                    <li>Tổng đài hỗ trợ (Miễn phí gọi)</li>
                    <li>Gọi mua: 1800.1060 (7:30 - 22:00)</li>
                    <li>Kỹ thuật: 1800.1763 (7:30 - 22:00)</li>
                    <li>Khiếu nại: 1800.1062 (8:00 - 21:30)</li>
                    <li>Bảo hành: 1800.1064 (8:00 - 21:00)</li>
                </ul>
                <div className="w-[234px]">
                    <div className="flex items-center space-x-2">
                        <BsFacebook />
                        <span>846k Đăng ký</span>
                        <BsYoutube />
                        <span>846k Đăng ký</span>
                    </div>
                    <img className="h-[24px]" src="/images/ct.png" />
                    <p>Website cùng tập đoàn</p>
                    <img className="h-[24px]" src="/images/vl.png" />
                </div>
            </div>
            <div className="bg-white h-[66px]">
                <p className="m-auto w-[1200px] text-[12px]">
                    © 2021. Công ty cổ phần KPShop. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007. GPMXH:
                    238/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 04/06/2021. Địa chỉ: 128 Trần Quang Khải, P.
                    Tân Định, Q.1, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email:
                    <a className="text-blue-700"> cskh@kpshop.com</a>. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Xem
                    chính sách sử dụng
                </p>
            </div>
        </footer>
    );
}

export default Footer;
