import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { _getSuccess, _logout } from '../../../redux/user/userApi';

const HeaderAccountDropdownItem = ({ dropdownItem, onCloseDropdown }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectedItem = useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            onCloseDropdown?.();

            if (dropdownItem.href) {
                navigate(dropdownItem.href);
                return;
            }
            _logout(dispatch, navigate);
        },
        [navigate, _logout, dispatch, onCloseDropdown],
    );

    return (
        <button
            className="text-gray-700 flex items-center space-x-4 px-4 py-3 hover:bg-gray-100 text-xm text-left p-0 w-full"
            onClick={handleSelectedItem}
        >
            <div>{dropdownItem.icon}</div>
            <div>{dropdownItem.title}</div>
        </button>
    );
};

export default HeaderAccountDropdownItem;
