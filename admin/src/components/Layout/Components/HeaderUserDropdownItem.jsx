import { capitalize } from "lodash";
import { useCallback, useState } from "react";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserService } from "../../../services";

const HeaderUserDropdownItem = ({ onClick }) => {
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickLogout = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      UserService._logout(dispatch, navigate);
    } catch (error) {
      toast.error(error.response);
    }
  }, [dispatch, navigate]);

  return (
    <>
      <div
        className="group flex w-full cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <div className="mb-3 h-full w-full border-b-2 border-gray-100 pb-4 text-sm">
          <div className="font-semibold group-hover:text-primary-500">
            {capitalize(currentUser?.fullname)}
          </div>
          <div className="mt-1 break-all text-sm line-clamp-1 group-hover:text-primary-500">
            {currentUser.username}
          </div>
        </div>
      </div>
      <div
        className="mt-1 flex w-full items-center hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiSettings />
        <p className="ml-3 text-sm">
          <Link to="/" className="hover:text-red-600">
            Dashboard
          </Link>
        </p>
      </div>
      <div
        className="mt-2 flex w-full items-center hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiHelpCircle />
        <Link to="help" className="hover:text-red-600">
          <p className="ml-3 text-sm">Help & Contact</p>
        </Link>
      </div>
      <div
        className="mt-4 flex w-full items-center border-t-2 border-gray-100 pt-3 hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={handleClickLogout}
      >
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-slate-700 border-t-transparent" />
        ) : (
          <FiLogOut />
        )}
        <div className="ml-3 text-sm">Log Out</div>
      </div>
    </>
  );
};
export default HeaderUserDropdownItem;
