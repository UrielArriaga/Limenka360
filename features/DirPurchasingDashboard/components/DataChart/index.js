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

export default function GraficaResumen({ countAmountProvider }) {
  const groupByProvider = results => {
    return results?.reduce((acc, item) => {
      const { provider, "to-pay": toPay, paid } = item; // Cambié to-pay por toPay
      if (!acc[provider]) {
        acc[provider] = { "to-pay": 0, paid: 0 };
      }
      acc[provider]["to-pay"] += parseFloat(toPay); // Usamos toPay aquí
      acc[provider].paid += parseFloat(paid);
      return acc;
    }, {});
  };

  const generateLabels = groupByProvider => {
    return Object?.keys(groupByProvider).map(provider => provider.slice(0, 6).toUpperCase());
  };

  const buildData = groupByProvider => {
    return {
      labels: generateLabels(groupByProvider),
      datasets: [
        {
          label: "A pagar",
          data: Object.values(groupByProvider).map(item => item["to-pay"]),
          backgroundColor: "#4caf5094",
          borderColor: "#4caf5094",
          borderWidth: 1,
        },
        {
          label: "Pagado",
          data: Object.values(groupByProvider).map(item => item.paid),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
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

  const groupByProviderResult = groupByProvider(countAmountProvider.data);
  const labels = generateLabels(groupByProviderResult);
  const data = buildData(groupByProviderResult);
  const fullNames = Object.keys(groupByProviderResult);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          text: "Proveedores",
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
    <div style={{ height: "100%", width: "100%" }}>
      <h2 className="title">Estadisticas Proveedores</h2>
      <div style={{ height: "100%", width: "100%" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

// export default GraficaResumen;
