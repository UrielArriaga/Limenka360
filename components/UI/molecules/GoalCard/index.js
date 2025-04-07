import { Button, LinearProgress, withStyles } from "@material-ui/core";
import { Check, CheckCircle, Group, Person } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
import { formatNumber, validNullData } from "../../../../utils";

export default function GoalCard({ showNoData, item }) {
  const router = useRouter();
  //   const { showNodata, item } = props;

  const handleClickName = () => router.push("/herramientas/metas");

  const handleClickNewGoal = () => router.push("/herramientas/metas/nuevameta");

  if (item) {
    const { goal } = item;
    return (
      <ContainerCard>
        <div className="title">
          <p className="goalname" onClick={() => handleClickName()}>
            {validNullData(goal?.goalname?.name, "Sin Nombre")}{" "}
          </p>

          <div className="dates">
            <p className="goalfinish">{dayjs(goal?.finaldate).fromNow(true)} restantes</p>
          </div>
        </div>
        {item?.ejecutive ? (
          <div className="flex">
            <Person className="invidual" />
            <p className="name">
              {item.ejecutive?.name} {validNullData(item?.ejecutive?.lastname, "")}
            </p>
          </div>
        ) : (
          <div className="flex">
            <Group className="group" />
            <p className="name">{item.group?.name}</p>
          </div>
        )}

        <ProgressGoal item={item} />
      </ContainerCard>
    );
  }

  if (showNoData) {
    return (
      <ContainerCard>
        <div className="title">
          <p>Aún no tienes metas </p>
        </div>
        <div className="actions">
          <button onClick={() => handleClickNewGoal()}>Crear nueva meta</button>
        </div>
      </ContainerCard>
    );
  }
}

const ContainerCard = styled.div`
  background: #fff;
  border-radius: 30px 30px 0 0;
  padding: 15px 15px;
  position: relative;
  height: 110px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: #417afe;

  .title {
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: space-between;

    .goalname {
      font-size: 12px;
      @media ${device.xxl} {
        font-size: 14px;
      }
    }

    .goalfinish {
      font-size: 12px;

      @media ${device.xxl} {
        font-size: 14px;
      }
    }
    p {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .flex {
    display: flex;
    align-items: center;
    p {
      text-transform: capitalize;
      color: #fff;
      font-size: 12px;

      @media ${device.xxl} {
        font-size: 14px;
      }
    }
    svg {
      color: #fff;
    }
  }

  .actions {
    button {
      cursor: pointer;
      margin-top: 20px;
      margin-left: 2px;
      width: 100%;
      background-color: #fec541;
      font-weight: bold;
      color: #fff;
      padding: 5px 10px;
      border-width: 0px;
    }
  }
`;

function ProgressGoal({ item }) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#FEC541",
    },
  }))(LinearProgress);

  const { progress, finalgoal } = item;
  let total = (progress * 100) / finalgoal;

  return (
    <ContainerProgress>
      {progress > finalgoal ? (
        <div>
          <div className="flex">
            <div className="content">
              <BorderLinearProgress variant="determinate" value={100} />
            </div>
            <div className="percentaje">
              <p>100%</p>
            </div>
          </div>
          <p className="totals">
            {formatNumber(progress)} de {formatNumber(finalgoal)}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex">
            <div className="content">
              <BorderLinearProgress variant="determinate" value={total} />
            </div>
            <div className="percentaje">
              <p>{total.toFixed(2)}%</p>
            </div>
          </div>
          <p className="totals">
            {formatNumber(progress)} de {formatNumber(finalgoal)}
          </p>
        </div>
      )}
    </ContainerProgress>
  );
}

const ContainerProgress = styled.div`
  .totals {
    /* margin-top: 2px; */
    color: #fff;
    font-size: 10px;

    @media ${device.xxl} {
      font-size: 12px;
    }
  }

  .percentaje {
    font-weight: bold;
  }

  .flex {
    width: 100%;
    display: flex;
    align-items: center;

    .content {
      width: 100%;
      margin-right: 5px;
    }

    .success {
      color: green;
      background-color: #fff;
      border-radius: 50%;
      padding: 0;
      margin: 0;
    }
  }
`;
