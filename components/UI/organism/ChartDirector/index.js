import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { formatNumber, toUpperCaseChart } from "../../../../utils";
import { useDispatch } from "react-redux";
import { setGroupGlobalGroup } from "../../../../redux/slices/dashboardDirector";

const renderCustomizedLabel = props => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

const CustomToolTip = props => {
  const { active, payload, label } = props;
  if (!active || !payload) {
    return null;
  }
  return (
    <div className="custom-tooltip">
      <p>
        <strong>{label}</strong>
      </p>
      {payload.map((item, i) => (
        <p key={i}>
          {item.name}: <strong>{item.value.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  );
};
export default function ChartDirector({ groups, isLoadingGroups }) {
  const [dataGroups, setDataGroups] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (groups) {
      let data = groups.map((item, index) => ({
        name: item.name,
        item: item,
        "monto de ventas": Number(item.totalAmount),
      }));
      setDataGroups(data);
    }
  }, [groups]);

  function demoOnClick(e) {
    if (e === null || e?.activePayload === null) {
      console.log(e);
    } else {
      dispatch(setGroupGlobalGroup(e.activePayload[0]?.payload));
    }
  }

  const formatString = item => {
    let palabras = toUpperCaseChart(item?.name);
    let array = palabras.split(" ");
    let resultado = "";
    let removeEmptyString = array.filter(function (x) {
      return x !== "";
    });
    let count = removeEmptyString.length;
    for (var i = 0; i < count; resultado += removeEmptyString[i][0] + ".", i++);
    return resultado;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload.map((itemPay, i) => (
            <div key={i}>
              <p className="label">{toUpperCaseChart(itemPay?.payload?.item?.name)}.</p>
              <p className="amount">Monto de Ventas: {formatNumber(itemPay?.payload?.["monto de ventas"])}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  if (isLoadingGroups) {
    return (
      <ChartDirectorStyled>
        <h3>Ventas por grupo</h3>
        <div className="divider" />

        <div className="loader">Obteniendo grupos...</div>
      </ChartDirectorStyled>
    );
  }

  return (
    <ChartDirectorStyled>
      <h3>Ventas por grupo</h3>
      <div className="divider" />
      <ResponsiveContainer width="100%" height="90%" responsive={true}>
        <BarChart
          onClick={demoOnClick}
          data={dataGroups}
          margin={{
            top: 10,
            left: 0,
          }}
          responsive={true}
        >
          {/* <CartesianGrid strokeDasharr ay="1 1" /> */}
          {/* <XAxis dataKey="name" /> */}
          <XAxis dataKey={name => formatString(name)} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip formatter={value => formatNumber(value)} /> */}
          <Legend />
          <Bar dataKey="monto de ventas" fill="#6eabce" minPointSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </ChartDirectorStyled>
  );
}

const ChartDirectorStyled = styled.div`
  padding: 14px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  min-height: 400px;
  height: 500px;
  padding-bottom: 50px;

  .custom-tooltip {
    border-radius: 10px;
    padding: 4px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    .amount {
      color: rgb(110, 171, 206);
      font-weight: 500;
    }
  }
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }
`;

// import React from "react";
// import styled from "styled-components";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [100, 122],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [100, 123],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

// export default function ChartDirector() {
//   return (
//     <ChartDirectorStyled>
//       {/* <div className="chart">
//         <Bar options={options} data={data} />
//       </div> */}
//     </ChartDirectorStyled>
//   );
// }

// const ChartDirectorStyled = styled.div`
//   border: 1px solid gray;
//   /* background-color: #fff; */
//   /* box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%); */
//   /* min-height: 400px; */
//   height: 400px;
//   .chart {
//     height: 60%;
//     width: 100%;
//   }
// `;
