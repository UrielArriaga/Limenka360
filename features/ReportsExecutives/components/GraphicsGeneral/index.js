
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { LinearProgress } from "@material-ui/core";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import {TableEmptyFake} from './styles'
import Chart from "chart.js/auto";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Graphics = ({ datalabels, type, graphicsData, options, title, isLoading, GraphicsDataD }) => {
  let colorsCopy = [
    "rgba(0, 93, 255 , 0.8)",
    "rgba(55, 255, 1, 0.8)",
    "rgba(236, 255, 1, 0.8)",
    "rgba(255, 151, 1 , 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(25, 159, 64, 0.8)",
    "rgba(120, 13, 64, 0.8)",
    "rgba(15, 15, 120, 0.8)",
    "rgba(190, 1, 5, 0.8)",
    "rgba(153, 1, 5, 0.8)",
  ];

  let optionsLine = { fill: true };
  let data = {
    labels: datalabels,
    label: title,
    datasets: [
      {
        options: options,
        label: title,
        data: graphicsData,
        backgroundColor: ["rgb(91,83,230)"],
        borderColor: ["rgb(91,83,230,0.2)"],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <TableEmptyFake>
        <div className="message_ctr">
          <img className="imgs" src="/load.png" />
        </div>
        <LinearProgress className="linear" color="primary" />
        <h3>Cargando...</h3>
      </TableEmptyFake>
    );
  }

  if (type === "pie" || type === "polar-area" || type === "doughnut") {
    data.datasets[0].backgroundColor = colorsCopy;
    delete data.datasets[0].borderColor;
  }
  return (
    <div className="sectionreports__table__container__content" style={{ padding: "14px" }}>
      {type === "bar" ? (
        <Bar data={data} options={options || optionsLine} />
      ) : type === "line" ? (
        <Line data={data} options={optionsLine} />
      ) : type === "pie" ? (
        <Pie data={data} options={options || optionsLine} />
      ) : type === "polar-area" ? (
        <PolarArea data={data} options={options || optionsLine} />
      ) : type === "doughnut" ? (
        <Doughnut data={data} options={options || optionsLine} />
      ) : null}
    </div>
  );
};

export default Graphics;
