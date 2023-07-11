import dayjs from "dayjs";

const getRangeDateList = () => {
  return [
    {
      name: "today",
      label: "Today",
    },
    {
      name: "yesterday",
      label: "Yesterday",
    },
    {
      name: "last_7_days",
      label: "Last 7 days",
    },
    {
      name: "last_30_days",
      label: "Last 30 days",
    },
    {
      name: "this_month",
      label: "This month",
    },
    {
      name: "last_month",
      label: "Last month",
    },
    {
      name: "custom_range",
      label: "Custom",
    },
  ];
};

const calculateRangeDate = (value) => {
  switch (value.name) {
    case "today": {
      return {
        start: dayjs().startOf("day").toDate(),
        end: dayjs().endOf("day").toDate(),
      };
    }
    case "yesterday": {
      return {
        start: dayjs().add(-1, "day").toDate(),
        end: dayjs().add(-1, "day").toDate(),
      };
    }
    case "last_7_days": {
      return {
        start: dayjs().add(-6, "day").toDate(),
        end: dayjs().toDate(),
      };
    }
    case "last_30_days": {
      return {
        start: dayjs().add(-29, "day").toDate(),
        end: dayjs().toDate(),
      };
    }
    case "this_month": {
      return {
        start: dayjs().startOf("month").toDate(),
        end: dayjs().toDate(),
      };
    }
    default: {
      return {
        start: dayjs().add(-1, "month").startOf("month").toDate(),
        end: dayjs().add(-1, "month").endOf("month").toDate(),
      };
    }
  }
};

export { getRangeDateList, calculateRangeDate };
