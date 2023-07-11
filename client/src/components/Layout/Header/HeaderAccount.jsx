import { useCallback, useState } from 'react';
import Login from '../../Login/Login';
import { useSelector } from 'react-redux';
import { _getSuccess, _logout } from '../../../redux/user/userApi';
import { RxAvatar } from 'react-icons/rx';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Avatar } from '../../Avatar';
import { DropdownContainer } from '../../Dropdown';
import HeaderAccountDropdown from './HeaderAccountDropdown';

const HeaderAccount = () => {
    const currentUser = useSelector((state) => state.user?.currentUser);

    const [isShowDropdown, setIsShowDropdown] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleToggleShowModal = useCallback(() => {
        setIsOpenModal((pre) => !pre);
    }, [setIsOpenModal]);

    const handleCloseDropdown = useCallback(() => {
        setIsShowDropdown(false);
    }, []);

    return (
        <>
            {currentUser ? (
                <DropdownContainer
                    isShowDropdown={isShowDropdown}
                    onToggle={setIsShowDropdown}
                    classNameMenuContainer="p-0"
                    menu={<HeaderAccountDropdown onCloseDropdown={handleCloseDropdown} />}
                >
                    <div className="text-left text-white text-sm font-semibold flex items-center space-x-2">
                        <Avatar src={currentUser?.image} className="w-10 h-10" />
                        <div>
                            <span>Tài khoản</span>
                            <span className="flex justify-start items-center">
                                <div>{currentUser?.fullname || currentUser?.phone}</div>
                                <div className="translate-y-0.5">
                                    <IoMdArrowDropdown size={20} />
                                </div>
                            </span>
                        </div>
                    </div>
                </DropdownContainer>
            ) : (
                <span className="flex items-center text-white text-sm font-semibold hover:text-gray-100">
                    <RxAvatar size={30} />
                    <button className="ml-2" onClick={handleToggleShowModal}>
                        <h3 className="text-white">Đăng nhập/ Đăng ký</h3>
                        <div className="flex justify-start items-center space-x-2">
                            <span>Tài khoản</span>
                            <div className="translate-y-0.5">
                                <IoMdArrowDropdown size={20} />
                            </div>
                        </div>
                    </button>

                    {isOpenModal && <Login handleCloseModal={handleToggleShowModal} />}
                </span>
            )}
        </>
    );
};

export default HeaderAccount;
