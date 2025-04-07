import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { Skeleton } from "@material-ui/lab";
import { formatNumber, validNullData } from "../../../../utils";
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CardGoalManager({ item }) {
  const { goal, progress, finalgoal } = item;

  let difference = dayjs(item?.goal?.finaldate).diff(dayjs(), "day");

  function isWhatPercentOf(numA, numB) {
    return (numA / numB) * 100;
  }

  function swithText(difference) {
    console.log(typeof difference);
    switch (difference) {
      case difference < 0:
        console.log("asdasdasdjoiuho qui");
        return "Tu Meta ha expirado";

      default:
        return `Dias restantes ${difference}`;
    }
  }

  function amountOrCount() {
    let amount = (
      <p onClick={() => console.log(goal.goalname.identifier)}>
        {formatNumber(progress)} de {formatNumber(finalgoal)}
      </p>
    );
    let count = (
      <p>
        {progress} / {finalgoal}
      </p>
    );
    let percentage = <p>%{progress / finalgoal}</p>;
    switch (goal.goalname.identifier) {
      case "amount":
        return amount;
      case "count":
        return count;
      case "percentage":
        return percentage;
      default:
        return count;
    }
  }

  return (
    <Card>
      <div className="top_card row-center">
        <div>
          <h4> {validNullData(goal?.alias, "Sin Nombre")} </h4>
          <p className="subtitle">{validNullData(goal?.goalname?.name, "Sin Nombre")}</p>
        </div>
        {difference < 0 && <p className="time_tofinish">Tu meta ha expirado</p>}
        {difference > 0 && <p className="time_tofinish">Dias restantes {difference}</p>}
        {difference == 0 && <p className="time_tofinish">Hoy expira tu meta </p>}
      </div>

      <div className="amounts">{amountOrCount()}</div>

      <div className="graph">
        <div className="pie">
          {progress >= finalgoal ? (
            <Pie
              data={{
                labels: [`Vendido 100%`],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [progress],
                    backgroundColor: ["#775ea6", "#70b5c0"],
                    borderColor: ["#775ea6", "#70b5c0"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          ) : (
            <Pie
              data={{
                labels: [
                  `Vendido ${isWhatPercentOf(progress, finalgoal).toFixed(1)}%`,
                  `Restante ${100 - isWhatPercentOf(progress, finalgoal).toFixed(1)}%`,
                ],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [isWhatPercentOf(progress, finalgoal), 100 - isWhatPercentOf(progress, finalgoal)],
                    backgroundColor: ["#775ea6", "#70b5c0"],
                    borderColor: ["#775ea6", "#70b5c0"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>

      {/* <div className="animation"></div> */}
    </Card>
  );
}

const Card = styled.div`
  .animation {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: red;
  }
  width: 100%;
  height: 100%;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffff;

  .graph {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pie {
    /* outline: 1px solid red; */
    /* outline: 1px solid red; */
  }

  .top_card {
    .subtitle {
      font-size: 13px;
      color: #212121;
    }
    .time_tofinish {
      color: #212121;
      font-size: 12px;
    }
  }

  .amounts {
    p {
      font-size: 13px;
      color: #212121;
    }
  }

  .row-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const data = {
  labels: ["Vendido 10%", "Restante 90%"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 10.1],
      backgroundColor: ["#775ea6", "#70b5c0        ", "#ffb1b7"],
      borderColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderWidth: 0,
    },
  ],
};
