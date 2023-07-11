import { Link, useNavigate } from 'react-router-dom';
import HeaderSearch from './HeaderSearch';
import HeaderTheme from './HeaderAccount';
import HeaderMenu from './HeaderMenu';
import { useEffect } from 'react';
import { _getSuccess } from '../../../redux/user/userApi';
import { useDispatch } from 'react-redux';
import HeaderCart from './HeaderCart';
import logo from '../../../assets/logo.png';
import { Avatar } from '../../Avatar';
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        _getSuccess(dispatch, navigate);
    }, []);
    return (
        <div className="flex justify-center h-24 bg-[#1a94ff] text-base">
            <div className="w-[1200px] h-24 flex justify-between items-center space-x-4">
                <Link to="/">
                    <Avatar src={logo} alt="logo" className="w-28 h-12 border-none rounded-none" />
                </Link>
                <div className="w-[800px]">
                    <HeaderSearch />
                    <HeaderMenu />
                </div>
                <HeaderTheme />
                <Link to="/cart" className="hover:text-gray-200 flex text-white text-sm font-semibold">
                    <HeaderCart />
                </Link>
            </div>
        </div>
    );
}

export default Header;
