import { MdLogout, MdPerson, MdOutlineListAlt } from 'react-icons/md';
import { _getSuccess, _logout } from '../../../redux/user/userApi';
import { BsPostcardHeart } from 'react-icons/bs';
import HeaderAccountDropdownItem from './HeaderAccountDropdownItem';

const dropdownOptions = [
    {
        href: '/account',
        title: 'Thông tin cá nhân',
        icon: <MdPerson size={24} />,
    },
    {
        href: '/history',
        title: 'Quản lý đơn hàng',
        icon: <MdOutlineListAlt size={24} />,
    },
    {
        href: '/favorite',
        title: 'Danh sách yêu thích',
        icon: <BsPostcardHeart size={24} />,
    },
    {
        href: '',
        title: 'Đăng xuất',
        icon: <MdLogout size={24} />,
    },
];

const HeaderAccountDropdown = ({ onCloseDropdown }) => {
    return (
        <div>
            {dropdownOptions.map((dropdownItem) => (
                <HeaderAccountDropdownItem
                    key={dropdownItem.title}
                    dropdownItem={dropdownItem}
                    onCloseDropdown={onCloseDropdown}
                />
            ))}
        </div>
    );
};

export default HeaderAccountDropdown;
