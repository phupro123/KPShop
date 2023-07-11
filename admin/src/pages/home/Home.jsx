import Chart from "./Chart/Chart";
import Widget from "./Widget";

const Home = () => {
  return (
    <div className="p-8 flex flex-col space-y-8">
      <Widget />
      <Chart />
    </div>
  );
};

export default Home;
