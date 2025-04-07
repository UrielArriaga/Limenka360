import { TrendingDown, TrendingUp } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { formatNumber, formatNumberAbrv } from "../../utils";
import Skeleton from "@material-ui/lab/Skeleton";
import { device } from "../../styles/global.styles";

export default function CardDashboard({ total = 0, item, showLoading, isMoney, isFetching }) {
  if (showLoading) return null;

  return (
    <Card bg={item.colorbar} rgb={item.colorrbga} index={item.index}>
      <div className="content">
        <div className="iconcontainer">
          <div className="icon">{item.icon}</div>
        </div>
        <div className="info">
          <p className="titlecard">{item.title}</p>

          {isFetching && <Skeleton variant="rect" height={20} />}
          {!isFetching && <p className="valuecard">{isMoney ? formatNumberAbrv(total) : formatNumber(total)}</p>}
        </div>
      </div>
      <div className="bar"></div>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  background-color: #ffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  @media ${device.md} {
    width: calc(100% / 4 - 20px);
  }

  /* margin-right: 30px; */
  /* padding: 10px; */

  .content {
    padding: 10px;
    display: flex;
    height: 100%;

    .iconcontainer {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 10px;

      .icon {
        border-radius: 10%;
        background-color: ${({ rgb }) => (rgb ? rgb : "#fafafa")};
        width: 30px;
        height: 30px;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          color: ${({ bg }) => (bg ? bg : "#fafafa")};
        }
      }
    }

    .info {
      /* display: flex; */
      /* flex-direction: column; */
      /* justify-content: space-between; */
      /* align-items: flex-start; */
      height: 100%;

      .titlecard {
        font-weight: bold;
        font-size: 13px;
        color: #767e87;
        font-size: 16px;
        margin-bottom: 10px;
      }

      .valuecard {
        font-weight: bold;
        color: #495057;
        font-size: 24px;
      }
    }

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
    border-radius: 0px 0px 2px 2px;
  }
`;
