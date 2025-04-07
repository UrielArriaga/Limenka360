import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Reporte por fases",
    },
  },
};

export const optionsLine = {
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Grafica limenka",
    },
  },
};

const labels = ["Cotizado", "Prospecto Nuevo"];

export const data = {
  labels,
  datasets: [
    {
      label: "Uriel Arriaga",
      data: [700, 2, 3],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.9)",
    },
    {
      label: "Monserat rovirosa",
      data: [1, 2, 3],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.9)",
    },
  ],
};

import React from "react";

export default function ChartBar({ dataGraph, type }) {
  const renderGraph = () => {
    switch (type) {
      // case "phases":

      //   break;

      case "sales":
        return <Line data={dataGraph} options={optionsLine} />;

      case "quotes":
        return <Line data={dataGraph} options={optionsLine} />;
      default:
        return <Bar className="bar_chart" options={options} data={dataGraph} />;
        break;
    }
  };
  return (
    <Container>
      {renderGraph()}

      {/* <Line options={options} data={dataGraph} /> 
      <Bar className="bar_chart" options={options} data={dataGraph} /> */}
    </Container>
  );
}

import styled from "styled-components";

const Container = styled.div`
  background-color: #ffff;
  min-height: 70vh;

  .bar_chart {
    min-height: 70vh;
  }
`;
