import { CalendarToday } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
export default function CardProspect({ prospect }) {
  return (
    <CardProspectStyled className="prospect">
      <div className="top">
        <p className="fullname">{prospect.name} -</p>
        <p className="phone">{prospect.phone}</p>
      </div>
      <div className="middle">
        <p className="category">{prospect.category?.name}</p>
        <p className="lasttracking">
          {prospect.lastTracking?.observations} - <span>{dayjs(prospect.lastTrackingcreatedAt).fromNow()}</span>
        </p>
      </div>

      <div className="bottom">
        <div className="createdAt">
          <CalendarToday />
          <p>{dayjs(prospect.createdAt).format("DD/MM/YYYY")}</p>
        </div>
      </div>
    </CardProspectStyled>
  );
}

export const CardProspectStyled = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #bdbdbd;
  min-height: 100px;

  .top {
    margin-bottom: 4px;
    display: flex;
    align-items: center;

    .fullname {
      margin-right: 5px;
      color: #7b87f4;
      font-weight: bold;
      text-transform: capitalize;
    }

    .phone {
      /* color: #0017e5; */
      cursor: pointer;
    }
  }

  .middle {
    margin-bottom: 8px;
    .category {
      font-weight: bold;
      font-size: 14px;
      color: #282455;
    }

    .lasttracking {
      color: #9e9e9e;
      font-size: 13px;

      span {
        margin-left: 2px;
      }
    }
  }

  .bottom {
    display: flex;
    margin-bottom: 10px;
    .createdAt {
      display: flex;
      align-items: center;
      color: #000;
      font-size: 13px;
      svg {
        margin-right: 5px;
        color: #06197c;
      }
    }
  }

  .highligth {
    background-color: #b0bec5;
  }

  .options {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #757575;
    cursor: pointer;

    &:hover {
      color: #0017e5;
    }
  }
`;
