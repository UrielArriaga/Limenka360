import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as TooltipChart,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, TooltipChart, Legend);

const GraficaResumen = ({ results }) => {
  const groupByName = results => {
    return results?.reduce((acc, item) => {
      const { name, aprobado, rechazado, pendiente } = item;
      if (!acc[name]) {
        acc[name] = { aprobado: 0, rechazado: 0, pendiente: 0 };
      }
      acc[name].aprobado += parseInt(aprobado);
      acc[name].rechazado += parseInt(rechazado);
      acc[name].pendiente += parseInt(pendiente);
      return acc;
    }, {});
  };

  const generateLabels = groupByName => {
    return Object.keys(groupByName).map(name => {
      const words = name.split(" ");
      if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
      } else {
        return words.map(word => word[0].toUpperCase()).join(" . ");
      }
    });
  };

  const buildData = groupByName => {
    return {
      labels: generateLabels(groupByName),
      datasets: [
        {
          label: "Aprobado",
          data: Object.values(groupByName).map(item => item?.aprobado),
          backgroundColor: "#4caf5094",
          borderColor: "#4caf5094",
          borderWidth: 1,
        },
        {
          label: "Rechazado",
          data: Object.values(groupByName).map(item => item?.rechazado),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Pendiente",
          data: Object.values(groupByName).map(item => item?.pendiente),
          backgroundColor: "#ffbf4b8a",
          borderColor: "#ffbf4b8a",
          borderWidth: 1,
        },
      ],
    };
  };

  const buildTooltip = fullNames => {
    return {
      callbacks: {
        title: function (tooltipItems) {
          const index = tooltipItems[0]?.dataIndex;
          return fullNames[index];
        },
      },
    };
  };

  const groupByNameResult = groupByName(results);

  const labels = generateLabels(groupByNameResult);
  const data = buildData(groupByNameResult);
  const fullNames = Object.keys(groupByNameResult);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "",
      },
      legend: {
        position: "top",
      },
      tooltip: buildTooltip(fullNames),
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Grupos",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad",
        },
      },
    },
  };

  return (
    <div className="Bar">
      <Bar options={options} data={data} width={100} height={25} />
    </div>
  );
};

export default GraficaResumen;
