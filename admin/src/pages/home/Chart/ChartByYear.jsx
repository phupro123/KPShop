import { useCallback, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { groupBy, sumBy } from "lodash";
import { format } from "date-fns";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import numberWithCommas from "../../../utils/numberWithCommas";
import ChartByYearSkeleton from "./ChartByYearSkeleton";

const monthsInYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ChartByYear = ({ data, isLoading }) => {
  const [yearCurrent, setYearCurrent] = useState(2023);

  const groups = useMemo(
    () =>
      groupBy(data, (entry) => {
        return format(new Date(entry.createdAt), "yyyy/MMMM");
      }),
    [data]
  );

  const months = useMemo(
    () =>
      Object.entries(groups)
        .map((entry) => {
          const [key, values] = entry;
          const [year, month] = key.split("/");
          return {
            year: year,
            month: month,
            total: values.length,
            totalPrice: sumBy(values, "totalPrice"),
          };
        })
        .filter((entry) => Number(entry.year) === yearCurrent),
    [groups, yearCurrent]
  );

  const dataChart = useMemo(
    () =>
      monthsInYear.map((entry) => {
        return {
          name: entry,
          "Tổng đơn hàng":
            months.find((item) => item.month === entry)?.total || 0,
          "Tổng doanh thu":
            months.find((item) => item.month === entry)?.totalPrice || 0,
        };
      }),
    [months]
  );

  const handleNextYear = useCallback(
    () => setYearCurrent((prev) => prev + 1),
    []
  );

  const handlePreviousYear = useCallback(
    () => setYearCurrent((prev) => prev - 1),
    []
  );

  return (
    <div className="rounded-lg border-2 border-gray-100 p-6 shadow shadow-gray-50 text-slate-600 font-semibold">
      {isLoading ? (
        <ChartByYearSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <button
              className="flex items-center space-x-2"
              onClick={handlePreviousYear}
            >
              <BsChevronLeft />
              <div>Trước</div>
            </button>
            <div className="font-bold text-xl">
              Thống kê đơn hàng trong năm {yearCurrent}
            </div>
            <button
              className="flex items-center space-x-2"
              onClick={handleNextYear}
            >
              <div>Sau</div>
              <BsChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 -ml-[45px]">
            <div className="flex flex-col">
              <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart
                  syncId="order"
                  data={dataChart}
                  margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    style={{
                      fontSize: "12px",
                    }}
                  />
                  <YAxis
                    style={{
                      fontSize: "12px",
                    }}
                    tickFormatter={(value) => {
                      return `${numberWithCommas(value)}`;
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                  <Tooltip
                    itemStyle={{ fontSize: "12px" }}
                    formatter={(value) => `${numberWithCommas(value)} đơn hàng`}
                  />
                  <Area
                    type="monotone"
                    dataKey="Tổng đơn hàng"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#total)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="text-center">
                <span className="mr-2">Tổng đơn hàng:</span>
                {numberWithCommas(sumBy(dataChart, "Tổng đơn hàng"))}
              </div>
            </div>
            <div className="flex flex-col">
              <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart
                  syncId="order"
                  data={dataChart}
                  margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    style={{
                      fontSize: "12px",
                    }}
                  />
                  <YAxis
                    style={{
                      fontSize: "12px",
                    }}
                    tickFormatter={(value) => {
                      return `${numberWithCommas(value)}đ`;
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                  <Tooltip
                    itemStyle={{ fontSize: "12px" }}
                    formatter={(value) => `${numberWithCommas(value)}đ`}
                  />
                  <Area
                    type="monotone"
                    dataKey="Tổng doanh thu"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#total)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="text-center">
                <span className="mr-2">Tổng doanh thu:</span>
                {numberWithCommas(sumBy(dataChart, "Tổng doanh thu"))}đ
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartByYear;
