import { Skeleton } from "@material-ui/lab";
import React from "react";
import styled from "styled-components";

export default function CardManagerLoader({ item, isExecutive }) {
  return (
    <Card bg={item.colorbar} isExecutive={isExecutive}>
      <div className="content">
        <div className="top">
          {item.icon}
          <div className="top-loader">
            <Skeleton variant="text" />
          </div>
        </div>

        <div className="totals">
          <Skeleton variant="text" />
        </div>
        <div className="percentajes">
          <Skeleton variant="text" />
        </div>
      </div>
      <div className="bar"></div>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 5px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* outline: 1px solid green; */

  .content {
    width: 100%;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      padding: 0px 10px;

      .icon {
        color: ${({ bg }) => (bg ? bg : "#000")};
        margin-right: 5px;
      }
    }

    .top-loader {
      width: 30%;
    }
    .title {
      color: #212121;
      font-weight: bold;
    }

    .totals {
      padding: 10px 10px;

      .total {
        font-weight: bold;
        font-size: 20px;
        letter-spacing: 2px;
      }
    }

    .percentajes {
      padding: 0px 10px;
      span {
        color: #757575;
        font-size: 12px;
      }
      .percentaje {
        color: #43bb88;
      }
    }
  }
  .bar {
    height: 4px;
    width: 100%;
    background-color: ${({ bg }) => (bg ? bg : "#fafafa")};
    border-radius: 0px 0px 8px 8px;
  }
`;
