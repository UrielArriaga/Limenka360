import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { months } from "../../BD/databd";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Prospectos VS Oportunidades',
    },
  },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agost'];


export default function ProspectsLine() {
 const data = {
  labels,
  datasets: [
    {
      label: 'Prospectos',
      data: [60, 50, 80, 80, 50, 50, 40,80],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
    {
      label: 'Oportunidades',
      data: [60, 80, 90, 50, 10, 10, 10,90],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


  return <Line options={options} data={data} />;
}
