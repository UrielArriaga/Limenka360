import React from "react";
import styled from "styled-components";

import { FiberManualRecord, RadioButtonCheckedOutlined } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { toUpperCaseChart } from "../../../utils";

const ItemUserStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  .colum_first {
    display: flex;
    align-items: center;

    .img {
      margin-right: 10px;
    }
  }
`;

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);
export default function ItemUser({ item }) {
  return (
    <ItemUserStyled>
      <div className="colum_first">
        <Avatar className="img" alt="" style={{ background: `#${generateRandomColor()}` }}>
          {item.name.charAt(0)}
        </Avatar>
        <div>
          <p>
            {toUpperCaseChart(item.name)} {toUpperCaseChart(item.lastname)}
          </p>
          <p style={{ fontSize: 11, marginTop: 2 }}>{item.email}</p>
        </div>
      </div>

      {/* {item.isonline ? (
        <RadioButtonCheckedOutlined style={{ color: "green" }} />
      ) : (
        <RadioButtonCheckedOutlined style={{ color: "red" }} />
      )} */}
    </ItemUserStyled>
  );
}
