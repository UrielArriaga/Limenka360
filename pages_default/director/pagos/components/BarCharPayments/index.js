import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { api } from "../../../../../services/api";

export default function BarChartPayments({ recharge }) {
  const today = dayjs();
  const startDateOfMonth = dayjs().startOf("month").toISOString();
  const endDateOfMonth = dayjs().date(dayjs().daysInMonth()).toISOString();

  const [data, setData] = useState([]);

  useEffect(() => {
    calculatePayments();
  }, [recharge]);

  const calculatePayments = async () => {
    let paid = 0;
    let pending = 0;
    let params = {
      where: { date: { $gte: startDateOfMonth, $lt: endDateOfMonth } },
      order: "date",
      all: "1",
      keys: "payment,ispaid,date",
    };
    let res = await api.get("/salespayments", { params });
    let arr = res.data.results;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ispaid) {
        paid += arr[i].payment;
      } else {
        pending += arr[i].payment;
      }
    }
    setData([{ value: today.format("MMMM"), Pagado: paid, Pendiente: pending }]);
  };

  return (
    <BarChart width={300} height={80} data={data} layout="vertical">
      <XAxis
        type="number"
        tickFormatter={value =>
          `${Number(value).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}`
        }
      />
      <YAxis type="category" dataKey="value" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Pagado" fill="#405189" />
      <Bar dataKey="Pendiente" fill="#8884d8" />
    </BarChart>
  );
}
