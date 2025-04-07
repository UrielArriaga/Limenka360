import { TrendingDown, TrendingUp } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import styled from "styled-components";
import { formatNumber } from "../../../../utils";
import CardManagerLoader from "../CardManagerLoader";

export default function CardPageExecutive({ itemleads, item, showLoading, isMoney }) {
  if (showLoading) return <CardManagerLoader item={item} isExecutive={true} />;

  return (
    <Card bg={item.colorbar} index={item.index}>
      <div className="content">
        <div className="top">
          {item.icon}
          <p className="title">{item.title}</p>
        </div>
        <div className="totals">
          {itemleads ? (
            <p className="total">
              {isMoney ? formatNumber(item?.total?.toFixed(2)) : `${item.total} / ${itemleads?.total}`}
            </p>
          ) : (
            <p className="total">{isMoney ? formatNumber(item?.total?.toFixed(2)) : `${item.total}`}</p>
          )}
        </div>

        <div className="percentajes">
          <p className="percentaje plus"></p>
          <span className="before">
            {isMoney ? formatNumber(item?.totalbefore?.toFixed(2)) : item?.totatotalbefore}
          </span>
          {item?.totalbefore != 0 && item?.total != 0 ? (
            <span className={`${item?.total > item?.totalbefore ? "up" : "down"}`}>
              {item?.total > item.totalbefore
                ? ((item?.totalbefore * 100) / item?.total).toFixed(2) || 0
                : (-(item?.total * 100) / item?.totalbefore || 0).toFixed(2) || 0}
            </span>
          ) : (
            <span className={`${item?.total > item?.totalbefore ? "up" : "down"}`}>0</span>
          )}

          <span className={`text ${item?.total > item?.totalbefore ? "up" : "down"}`}> % desde el mes pasado</span>
          {item?.total > item?.totalbefore ? (
            <TrendingUp className="trendingup trending" />
          ) : (
            <TrendingDown className="trendingdown trending" />
          )}
        </div>
      </div>
      <div className="bar"></div>
    </Card>
  );
}

const mixinBG = props => {
  switch (true) {
    case props.index == 0:
      return `
      background: #a8c0ff;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #3f2b96, #a8c0ff);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #3f2b96, #a8c0ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      `;
    case props.index == 1:
      return `
      background: #a8c0ff;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #3f2b96, #a8c0ff);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #3f2b96, #a8c0ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      `;

    case props.index == 2:
      return `
      background: #a8c0ff;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #3f2b96, #a8c0ff);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #3f2b96, #a8c0ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      `;

    case props.errorSintaxis === false && props.existInDB == true:
      return `
            color:#1976d2;
            font-weight:bold;
            text-decoration:underline;
          `;

    // default:
    //   return `border:1px solid red;`;
  }
};
const Card = styled.div`
  width: 100%;
  background-color: #ffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* border-bottom: 1px solid #eeeeee; */
      padding: 0px 10px;

      .icon {
        color: ${({ bg }) => (bg ? bg : "#000")};
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
  }
  .bar {
    height: 6px;
    width: 100%;
    background-color: ${({ bg }) => (bg ? bg : "#fafafa")};
    border-radius: 0px 0px 8px 8px;
  }
`;
