import { Box, CircularProgress } from "@material-ui/core";
import { TrendingDown, TrendingUp } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { formatNumber } from "../../../../utils";
export default function CardByExecutivePage({ isMoney, item }) {
  const calculatePercentaje = (total, totalbefore) => {
    if (total === undefined || totalbefore === undefined) {
      return 0;
    }
    if (total === totalbefore) {
      return `${100} del mes anterior con ${totalbefore}`;
    }

    if (total > totalbefore) {
      return `${((item.totalbefore * 100) / item.total).toFixed(2)}% que el mes pasado con ${totalbefore}`;
    } else {
      return `${(-(item.total * 100) / item.totalbefore).toFixed(2)}% con una diferencia de ${totalbefore}`;
    }

    // let percentaje = 0;
    // if (total > totalbefore) {
    //   percentaje = ((item.totalbefore * 100) / item.total).toFixed(2);
    // } else {
    //   percentaje = (-(item.total * 100) / item.totalbefore).toFixed(2);
    // }

    // console.log(percentaje);
    // return percentaje === NaN ? 0 : percentaje;
  };

  if (item.isLoading) {
    return (
      <CardByExecutiveStyled>
        <div className="content">
          <div className="top">
            {item.icon}
            <p className="title">{item.title}</p>
          </div>
          <div className="totals">
            {/* <p className="total">{isMoney ? formatNumber(item.total) : item.total}</p> */}
            <Skeleton variant="text" />
          </div>

          <div className="percentajes">
            <Skeleton variant="text" />

            <div className="trendinicon">
              <CircularProgress className="loader" size={16} />
            </div>
          </div>
        </div>
      </CardByExecutiveStyled>
    );
  }
  return (
    <CardByExecutiveStyled isMoney={isMoney} className={`card ${isMoney && "ismoney"}`}>
      <div className="content">
        <div className="top">
          {item.icon}
          <p className="title">{item.title}</p>
        </div>
        <div className="totals">
          <p className="total">{isMoney ? formatNumber(item.total) : item.total}</p>
        </div>

        <div className="percentajes">
          <p>{calculatePercentaje(item.total, item.totalbefore)}</p>

          <div className="trendinicon">
            {item.total > item.totalbefore || item.total === item.totalbefore ? (
              <TrendingUp className="trendingup trending" />
            ) : (
              <TrendingDown className="trendingdown trending" />
            )}
          </div>
        </div>
      </div>
    </CardByExecutiveStyled>
  );
}
const CardByExecutiveStyled = styled.div`
  width: 100px;
  position: relative;
  width: calc(100% / 3 - 10px);
  min-height: 140px;
  background-color: ${({ isMoney }) => (isMoney ? "#1a237e" : "#ffff")};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ isMoney }) => (isMoney ? "#fff" : "#000")};

  .content {
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* border-bottom: 1px solid #eeeeee; */
      padding: 0px 10px;

      .icon {
        color: ${({ isMoney }) => (isMoney ? "#fff" : "#000")};
        margin-right: 5px;
      }
    }
    .title {
      /* color: #ffff; */
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
      p {
        font-size: 12px;
        color: ${({ isMoney }) => (isMoney ? "#c1c1c1" : "#757575")};

        /* color: #757575; */
      }
      padding: 0px 10px;
      span {
        margin-right: 10px;
      }
      .percentaje {
        color: #43bb88;
      }

      .before {
        color: #757575;
        font-weight: bold;
        font-size: 16px;
      }
      .loader {
        font-size: 10px;
      }
      .trendingup {
        color: #00e676;
      }
      .trendingdown {
        color: #d50000;
      }

      .up {
        color: #00e676;
        color: #757575;
      }
      .down {
        color: #d50000;
        color: #757575;
      }

      .text {
        color: #757575;
      }
    }

    .graph {
      height: 400px;
    }
  }

  .trendinicon {
    position: absolute;
    bottom: 5px;
    right: 10px;
  }
`;
