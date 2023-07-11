import numberWithCommas from "../../../utils/numberWithCommas";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCallback, useMemo, useState } from "react";
import { groupBy, sumBy } from "lodash";
import { format } from "date-fns";
import dayjs from "dayjs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ChartByMonthSkeleton from "./ChartByMonthSkeleton";

const ChartByMonth = ({ data, isLoading }) => {
  const [yearCurrent, setYearCurrent] = useState(dayjs().year());
  const [monthCurrent, setMonthCurrent] = useState(dayjs().month());

  const groups = useMemo(
    () =>
      groupBy(data, (entry) => {
        return format(new Date(entry.createdAt), "yyyy/MM/dd");
      }),
    [data]
  );

  const months = useMemo(
    () =>
      Object.entries(groups)
        .map((entry) => {
          const [key, values] = entry;
          const [year, month, date] = key.split("/");
          return {
            year: year,
            month: month,
            date: date,
            total: values.length,
            totalPrice: sumBy(values, "totalPrice"),
          };
        })
        .filter(
          (entry) =>
            Number(entry.year) === yearCurrent &&
            Number(entry.month) === monthCurrent
        ),
    [groups, yearCurrent, monthCurrent]
  );

  const dataChart = useMemo(
    () =>
      Array.from({
        length: dayjs(`${yearCurrent}/${monthCurrent}`).daysInMonth(),
      }).map((_, index) => {
        return {
          name: String(index + 1),
          "Tổng đơn hàng":
            months.find((item) => {
              return Number(item.date) === index + 1;
            })?.total || 0,
          "Tổng doanh thu":
            months.find((item) => Number(item.date) === index + 1)
              ?.totalPrice || 0,
        };
      }),
    [yearCurrent, monthCurrent, months]
  );

  const handleNextMonth = useCallback(() => {
    if (monthCurrent === 12) {
      setMonthCurrent(1);
      setYearCurrent((prev) => prev + 1);
      return;
    }
    setMonthCurrent((prev) => prev + 1);
  }, [monthCurrent]);

  const handlePreviousMonth = useCallback(() => {
    if (monthCurrent === 1) {
      setMonthCurrent(12);
      setYearCurrent((prev) => prev - 1);
      return;
    }
    setMonthCurrent((prev) => prev - 1);
  }, [monthCurrent]);

  return (
    <div className="rounded-lg border-2 border-gray-100 p-6 shadow shadow-gray-50 text-slate-600 font-semibold">
      {isLoading ? (
        <ChartByMonthSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <button
              className="flex items-center space-x-2"
              onClick={handlePreviousMonth}
            >
              <BsChevronLeft />
              <div>Trước</div>
            </button>
            <div className="font-bold text-xl">
              Thống kê đơn hàng trong tháng {monthCurrent}/{yearCurrent}
            </div>
            <button
              className="flex items-center space-x-2"
              onClick={handleNextMonth}
            >
              <div>Sau</div>
              <BsChevronRight />
            </button>
          </div>

          <ResponsiveContainer width="100%" aspect={4}>
            <AreaChart
              data={dataChart}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                  fontSize: "14px",
                }}
              />
              <YAxis
                style={{
                  fontSize: "14px",
                }}
                tickFormatter={(value) => {
                  return `${numberWithCommas(value)}`;
                }}
              />
              <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
              <Tooltip
                itemStyle={{ fontSize: "14px" }}
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
            <div>
              <span className="mr-2">Tổng đơn hàng:</span>
              {numberWithCommas(sumBy(dataChart, "Tổng đơn hàng"))}
            </div>
            <div>
              <span className="mr-2">Tổng doanh thu:</span>
              {numberWithCommas(sumBy(dataChart, "Tổng doanh thu"))}đ
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartByMonth;
