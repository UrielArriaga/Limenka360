import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { Skeleton } from "@material-ui/lab";
import { formatNumber, validNullData } from "../../../../utils";
import dayjs from "dayjs";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { colors } from "../../../../styles/global.styles";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CardGoalManagerEmpty() {
  const router = useRouter();
  function isWhatPercentOf(numA, numB) {
    return (numA / numB) * 100;
  }

  return (
    <Card>
      <div className="top_card row-center">
        <div>
          <h4> {validNullData("Aún no tienes metas", "Sin Nombre")} </h4>
          <p className="subtitle">{validNullData("Aún no tienes metas", "Sin Nombre")}</p>
        </div>
      </div>

      <div className="amounts">
        <p>
          {formatNumber(0)} de {formatNumber(0)}
        </p>
      </div>

      <div className="graph">
        <div className="pie">
          <Pie
            data={{
              labels: [`Sin meta creada`],
              datasets: [
                {
                  label: "# of Votes",
                  data: [100],
                  backgroundColor: ["#fff", "#70b5c0"],
                  borderColor: ["#d50000", "#70b5c0"],
                  borderWidth: 3,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
      <IconButton onClick={() => router.push("/herramientas/metas")}>
        <Add style={{ background: colors.primaryColor, borderRadius: "50%", color: "#ffff" }} />
      </IconButton>
    </Card>
  );
}

const Card = styled.div`
  .animation {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
  }

  width: 100%;
  /* height: 200px; */
  background-color: #ffff;
  height: 100%;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffff;
  /* border: 1px solid red; */

  .graph {
    /* background-color: red; */
    /* height: 200px; */
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
