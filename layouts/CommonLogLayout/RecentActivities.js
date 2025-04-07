import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

export default function RecentActivities({ open, handleOpen }) {
  return (
    <RecentActivitiesStyled open={open}>
      <div className="head">
        {!open ? (
          <ArrowBackIos className="icon" onClick={handleOpen} />
        ) : (
          <ArrowForwardIos className="icon" onClick={handleOpen} />
        )}
      </div>
    </RecentActivitiesStyled>
  );
}

const RecentActivitiesStyled = styled.div`
  background-color: #034d6f;
  height: 100vh;
  width: 100%;
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    color: white;

    .icon {
      font-size: 1.4em;
    }
  }
`;
