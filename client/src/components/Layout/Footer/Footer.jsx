import FooterLinkItem from './FooterLinkItem';
import FooterSocialItems from './FooterSocialItems';
import { Avatar } from '../../Avatar';
import logo2 from '../../../assets/logo2.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="relative z-10 overflow-hidde border-t-2 border-gray-100 bg-white py-2" id="footer">
            <div className="w-[1200px] mx-auto">
                <div className="relative z-10 flex space-x-10">
                    <div className="flex flex-col justify-start mt-5 space-y-4 w-1/3">
                        <Link to="/" className="mx-auto">
                            <Avatar src={logo2} alt="logo" className="w-40 h-fit border-none rounded-none mx-0" />
                        </Link>
                        <div>
                            Hệ thống bán lẻ điện thoại di động, smartphone, máy tính bảng, tablet, laptop, chính hãng
                            mới, giá tốt.
                        </div>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 xs:grid-cols-2 mt-3 md:col-span-2 md:grid-cols-3 w-2/3">
                        <div className="flex flex-col">
                            <div className="mb-3 font-bold">Công ty</div>
                            <div className="flex flex-col ">
                                <FooterLinkItem to="/about">Về chúng tôi</FooterLinkItem>
                                <FooterLinkItem to="/blog">Blog</FooterLinkItem>
                                <FooterLinkItem to="/partner">Đối tác</FooterLinkItem>
                                <FooterLinkItem to="/contact">Liên hệ</FooterLinkItem>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-3 font-bold">Hỗ trợ</div>
                            <div className="flex flex-col ">
                                <FooterLinkItem to="/guides">Hướng dẫn</FooterLinkItem>
                                <FooterLinkItem to="/complaint">Góp ý khiếu nại</FooterLinkItem>
                                <FooterLinkItem to="/support">Tổng đài hỗ trợ</FooterLinkItem>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-3 font-bold">Chính sách</div>
                            <div className="flex flex-col ">
                                <FooterLinkItem to="/recruitment">Tuyển dụng</FooterLinkItem>
                                <FooterLinkItem to="/purchase">Mua trả góp</FooterLinkItem>
                                <FooterLinkItem to="/exchange">Chính sách đổi trả</FooterLinkItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 mt-2 items-center justify-between border-t-2 border-gray-100 py-4 md:flex">
                    <div className="text-center md:text-left">&copy; Reserved</div>
                    <FooterSocialItems className="mt-4 flex justify-center md:mt-0 md:justify-start" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
