import React from "react";
import styled from "styled-components";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import { URL_SPACE } from "../../../../services/api";
import { validateURL } from "../../../../utils";

export default function ResumeGroupDirector() {
  const { groupSelected } = useSelector(dashboardDirectorSelector);

  if (groupSelected === null) {
    return <ResumeGroupDirectorStyled></ResumeGroupDirectorStyled>;
  }

  return (
    <ResumeGroupDirectorStyled>
      <div className="top">
        <div className="row">
          <Avatar src={validateURL(groupSelected.logo)} />
          <h3>{groupSelected.name}</h3>
        </div>

        <div className="viewgroups">
          <Button>Ver grupos </Button>
        </div>
      </div>
    </ResumeGroupDirectorStyled>
  );
}

const ResumeGroupDirectorStyled = styled.div`
  border: 1px solid gray;
  min-height: 400px;

  .top {
    display: flex;
  }
  h3 {
    text-transform: capitalize;
  }

  .row {
    display: flex;
    align-items: center;
  }
`;
