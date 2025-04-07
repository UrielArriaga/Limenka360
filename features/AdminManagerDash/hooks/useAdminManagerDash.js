import { useEffect, useState } from "react";
import { getOrdersReportgeneral, OrdersAdminServices } from "../services";
import dayjs from "dayjs";
import usePagination from "@mui/material/usePagination/usePagination";

export function useAdminManagerDash() {
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));
  const [data, setData] = useState([]);
  const [counters, setCounters] = useState({
    all: 0,
    approve: 0,
    pending: 0,
    denied: 0,
  });
  const [isFechingCounter, setIsFechingCounter] = useState(false);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    setIsFechingCounter(true);
    try {
      let query = {};

      if (startDate && endDate) {
        query.createdAt = {
          $gte: formatDate(startDate),
          $lte: formatDate(endDate),
        };
      }
      let params = {
        where: JSON.stringify(query),
        limit: "100",
      };
      const response = await getOrdersReportgeneral(params);
      let counters = {};
      counters.all = response?.data?.totalorders;
      counters.pending = response?.data?.totalpendientes;
      counters.approve = response?.data?.totalaprobados;
      counters.denied = response?.data?.totalrechazados;
      setCounters(counters);
      setData(response.data.results);
      setIsFechingCounter(false);
    } catch (error) {
      setIsFechingCounter(false);
      console.error("Error fetching data:", error);
    }
  };

  const validateParamsCounters = status => {
    let query = {};
    if (status) query.orderstatus = { status: status };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: formatDate(startDate),
        $lte: formatDate(endDate),
      };
    }

    let params = {
      where: JSON.stringify(query),
      count: 1,
      subquery: 0,
      include: "orderstatus",
    };
    return params;
  };
  const formatDate = date => {
    if (!date) return null;
    return dayjs(date).toISOString();
  };

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(dayjs(date).format("YYYY-MM-DD"));
      handleOnChangeDate(date, "start");
    } else if (type === "finish") {
      setEndDate(dayjs(date).format("YYYY-MM-DD"));
      handleOnChangeDate(date, "finish");
    }
  };
  const handleOnChangeDate = (date, typeCalendar) => {
    if (typeCalendar === "start") {
      setStartDate(date.format("YYYY-MM-DD"));
    } else {
      setEndDate(date.format("YYYY-MM-DD"));
    }
  };

  return {
    startDate,
    endDate,
    data,
    counters,
    isFechingCounter,
    handleDateChange,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data,
      customColumns,
    },
    totalOrders,
  };
}
let actions = [];
const customColumns = {
  name: {
    columname: "Grupo",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            style={{
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </p>
        </div>
      );
    },
  },
};
let heads = [
  {
    headText: "Grupo",
    headNormalize: "name",
    orderby: null,
  },
  {
    headText: "Pendientes",
    headNormalize: "pendiente",
    orderby: null,
  },
  {
    headText: "Aprobados",
    headNormalize: "aprobado",
    orderby: null,
  },
  {
    headText: "Rechazados",
    headNormalize: "rechazado",
    orderby: null,
  },
];
