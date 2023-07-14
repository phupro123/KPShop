import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { MdLocationOn, MdPerson, MdOutlineListAlt } from 'react-icons/md';
import { BsPostcardHeart } from 'react-icons/bs';
const sidebars = [
    {
        name: 'account',
        info: 'Thông tin cá nhân',
        Icon: MdPerson,
    },
    {
        name: 'history',
        info: 'Quản lý đơn hàng',
        Icon: MdOutlineListAlt,
    },
    {
        name: 'address',
        info: 'Số địa chỉ',
        Icon: MdLocationOn,
    },
    {
        name: 'favorite',
        info: 'Danh sách yêu thích',
        Icon: BsPostcardHeart,
    },
];
function Sidebar(props) {
    return (
        <div className="flex flex-col space-y-4 p-6 w-full">
            <p className="text-2xl font-semibold">Quản lý</p>
            {sidebars?.map((e, index) => {
                return (
                    <Link to={`/${e?.name}`} key={index}>
                        <div className={twMerge(props?.path === e?.name && 'text-blue-500', 'flex items-center')}>
                            <e.Icon className="h-8 w-8 mr-4" />
                            <span>{e?.info}</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Sidebar;
