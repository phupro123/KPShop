import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { upperCase } from "lodash";
import WidgetItemSkeleton from "./WidgetItemSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { login } from "../../redux/user/userSlice";

const WidgetItem = ({ title, to, getData, icon }) => {
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);

  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { meta } =
        title === "user" ? await getData(axiosJWT) : await getData();

      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [getData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="group rounded-lg border-2 border-gray-100 p-6 shadow shadow-gray-50 text-slate-500">
      {isLoading ? (
        <WidgetItemSkeleton />
      ) : (
        <div className="flex flex-col justify-between space-y-1">
          <div className="flex items-center justify-between font-semibold text-red-700 group-hover:text-red-800">
            <div> {upperCase(title)}</div>
            {icon}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-end space-y-1">
              <div className="font-bold text-xl">{totalRows}</div>
              <Link to={to} className="hover:text-blue-600">
                View all
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetItem;
