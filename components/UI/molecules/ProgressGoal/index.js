import { LinearProgress, withStyles } from "@material-ui/core";
import React from "react";

export default function ProgressGoal({ item }) {
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
    <Container>
      {progress > finalgoal ? (
        <div className="row">
          <div className="progressbar">
            <BorderLinearProgress variant="determinate" value={100} />
          </div>
          <div className="percentaje">
            <p className="value">{100}%</p>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="progressbar">
            <BorderLinearProgress variant="determinate" value={total} />
          </div>
          <div className="percentaje">
            <p className="value">{total.toFixed(2)}%</p>
          </div>
        </div>
      )}
    </Container>
  );
}

import styled from "styled-components";

const Container = styled.div`
  .row {
    display: flex;
    align-items: center;

    .progressbar {
      width: 100%;
    }

    .percentaje {
      .value {
        margin-left: 10px;
      }
    }
  }
`;
