import React from "react";
import dayjs from "dayjs";
import { Phone } from "@material-ui/icons";
import styled from "styled-components";

export default function LastPendings({ pendingsData }) {
  console.log(pendingsData);
  return (
    <LastPendingsStyled>
      <h4>Ultimos pendientes</h4>

      {pendingsData.pendings.map((pending, index) => {
        return (
          <div
            key={pending.id}
            className={`item-pending  item-pending-${index}`}
          >
            <div className="col-1">
              <Phone />
            </div>

            <div className="col-2">
              <p>{pending.description}</p>
              <p>{pending?.pendingstype?.name}</p>

              <div className="date">
                <p>{dayjs(pending?.date_from).format("MMMM D, YYYY h:mm A	")}</p>
              </div>
            </div>
          </div>
        );
      })}
    </LastPendingsStyled>
  );
}

const LastPendingsStyled = styled.div`
  width: 90%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 10px;

  h4 {
    margin-bottom: 10px;
  }
  .item-pending {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f7f9f8;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .item-pending-0 {
    background-color: #39b8df;
    color: #fff;
  }

  .col-1 {
    margin-right: 10px;
  }

  .col-2 {
    width: 100%;
    .date {
      text-align: right;
      font-size: 12px;
    }
  }
`;
