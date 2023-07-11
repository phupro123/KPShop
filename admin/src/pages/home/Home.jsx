import { useEffect } from "react";
import Chart from "./Chart/Chart";
import Widget from "./Widget";

const Home = () => {
  useEffect(() => {
    window.document.title ="Dashboard - KPShop"
  }, []);
  return (
    <div className="p-8 flex flex-col space-y-8">
      <Widget />
      <Chart />
    </div>
  );
};

export default Home;
