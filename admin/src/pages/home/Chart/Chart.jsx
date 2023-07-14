import { useCallback, useEffect, useState } from "react";
import { OrderService } from "../../../services";
import ChartByMonth from "./ChartByMonth";
import ChartByYear from "./ChartByYear";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/user/userSlice";
import { createAxios } from "../../../api/createInstance";

const Chart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);
  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await OrderService.getOrders(axiosJWT);

      setData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <ChartByMonth data={data} isLoading={isLoading} />
      <ChartByYear data={data} isLoading={isLoading} />
    </>
  );
};

export default Chart;
