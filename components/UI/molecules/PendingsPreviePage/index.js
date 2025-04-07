import { PersonPinCircle, Today } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { formatDate } from "../../../../utils";

export default function PendingsPreviePage({ pendings }) {
  return (
    <PendingsPreviePageStyled>
      {pendings.length === 0 && (
        <div className="emptymessage">
          <p>No hay pendientes por el momento</p>
        </div>
      )}
      {pendings?.map((item, index) => {
        return (
          <div key={item.id} className="pendingcard">
            {console.log("pensid", pendings)}
            <div className="top">
              <div className="item">
                <PersonPinCircle className="icon" />
                <p className="date">{item?.place.length > 30 ? `${item?.place.slice(0, 30)}...` : item?.place}</p>
              </div>
              <div className="item">
                <Today className="icon" />
                <p className="date">
                  {" "}
                  <p className="date">{dayjs(item?.createdAt).format("MMMM D, YYYY")}</p>
                </p>
              </div>
            </div>

            <span className="span">Estado de pendiente</span>
            <p className={` ${item.isdone ? "ct_icon_complete" : "ct_icon_incomplete"}`}>
              {item.isdone ? "Completo" : "No completado"}
            </p>

            <span className="span">Asunto</span>
            <p>{item?.subject.length > 40 ? `${item?.subject.slice(0, 40)}...` : item?.subject}</p>
            <span className="span">Observación</span>
            <p>{item?.description.slice(0, 80)}</p>
            <span className="span">Fecha del pendiente</span>

            <p>{dayjs(item?.date_from).format("MMMM D, YYYY")}</p>
          </div>
        );
      })}
    </PendingsPreviePageStyled>
  );
}

const PendingsPreviePageStyled = styled.div`
  padding: 10px 20px;

  .pendingcard {
    box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
    background-color: #fff;
    padding: 10px;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    .item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .icon {
        color: #3f51b5;
        font-size: 16px;
      }
      .date {
        font-size: 12px;
        font-weight: bold;
        color: #0c203b;
      }
      .capitalize {
        text-transform: capitalize;
      }
    }
  }
  .span {
    font-weight: bold;
    letter-spacing: 0.03em;
    font-size: 11px;
  }

  .emptymessage {
    p {
      color: #9e9e9e;
      text-align: center;
    }
  }
`;
