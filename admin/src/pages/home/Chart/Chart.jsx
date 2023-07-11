import { useCallback, useEffect, useState } from "react";
import { OrderService } from "../../../services";
import ChartByMonth from "./ChartByMonth";
import ChartByYear from "./ChartByYear";

const Chart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await OrderService.getOrders();

      setData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data);

  return (
    <>
      <ChartByMonth data={data} isLoading={isLoading} />
      <ChartByYear data={data} isLoading={isLoading} />
    </>
  );
};

export default Chart;
