import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { Skeleton, Box, TablePagination } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Graph() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: tooltipItems => {
            const index = tooltipItems[0].dataIndex;
            return data[index].product_name;
          },
        },
      },
    },
  };

  const labels = data?.map(producto =>
    producto.product_name.length > 10 ? producto.product_name.slice(0, 10) + "..." : producto.product_name
  );

  const salidas = data?.map(producto => producto.totalproducts);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Salidas",
        data: salidas,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        barThickness: 35,
      },
    ],
  };

  useEffect(() => {
    getSalidas();
  }, [page, limit]);

  const getSalidas = async () => {
    setLoading(true);
    try {
      let params = {
        limit: limit,
        count: 1,
        skip: page + 1,
      };

      const res = await api.get(`logisticdashboards/warehouseproductsbyrangedatentries`, { params });
      setLoading(false);
      setCount(res.data.count);
      setData(res.data.results);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height="300px" />
      ) : (
        <div>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5]}
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handlePage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
          <Box sx={{ width: "100%", height: "300px" }}>
            <Bar options={options} data={chartData} />
          </Box>
        </div>
      )}
    </div>
  );
}
