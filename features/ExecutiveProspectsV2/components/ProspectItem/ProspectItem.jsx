import { Tooltip } from "@material-ui/core";
import { Add, CalendarToday, Edit, WhatsApp } from "@material-ui/icons";
import dayjs from "dayjs";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function ProspectItem({ item, index, handleClickProspect }) {
  const cutString = (str = "", len = 40) => {
    if (str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  };
  return (
    // <Draggable key={item.id} draggableId={item.id} index={index}>
    //   {(provided, snapshot) => {
    //     return (
    <CardProspectStyled
      onClick={() => handleClickProspect(item)}
      className="prospect"
      // ref={provided.innerRef}
      // {...provided.draggableProps}
      // {...provided.dragHandleProps}
    >
      <div className="rowinfoactions">
        <div className="info">
          <div className="top">
            <p className="fullname">{item.fullname}</p>
            {/* <Tooltip title="Llamar" placement="top">
                    <p
                      onClick={e => {
                        e.stopPropagation();
                        alert("jiji");
                      }}
                      className="phone"
                    >
                      {item.phone}
                    </p>
                  </Tooltip> */}
          </div>
          <div className="middle">
            <p className="category">
              {item?.clientType?.name
                ? item?.clientType?.name
                : "Tipo de cliente no definido"}{" "}
              - {item?.category?.name ? item?.category?.name : "N/A"}
            </p>
            <p className="lasttracking">
              {cutString(item?.lastTracking?.observations)} -{" "}
              <span>{dayjs(item?.lastTrackingcreatedAt).fromNow()}</span>
            </p>
          </div>

          <div className="bottom">
            <div className="createdAt">
              <CalendarToday />
              <p>{dayjs(item?.createdAt).format("DD/MM/YYYY")}</p>
            </div>
          </div>

          <div className="bottomactions">
            <div className="item">
              <Add />
              Pendiente
            </div>
          </div>
        </div>

        <div className="actions">
          <Tooltip
            title={`Enviar Whastapp ${item?.phone}`}
            placement="top"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://wa.me/${item?.phone}`, "_blank");
            }}
          >
            <WhatsApp className="whats iconaction" />
          </Tooltip>

          <Tooltip title="Editar" placement="top">
            <Edit className="whats iconaction" />
          </Tooltip>
        </div>
      </div>
    </CardProspectStyled>
    // );
    // }}
    // </Draggable>
  );
}
export default ProspectItem;
export const CardProspectStyled = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 10px;
  /* border: 1px solid #bdbdbd; */
  background-color: #fff;
  min-height: 10px;
  margin-bottom: 10px;

  .rowinfoactions {
    display: flex;
    justify-content: space-between;

    .actions {
      display: flex;
      flex-direction: column;

      .iconaction {
        color: #bdbdbd;
        margin-bottom: 2px;
        font-size: 18px;
      }

      .whats {
        &:hover {
          color: #25d366;
          cursor: pointer;
        }
      }
    }
  }

  .top {
    margin-bottom: 4px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .fullname {
      margin-right: 5px;
      color: #7b87f4;
      font-weight: bold;
      text-transform: capitalize;
      font-size: 14px;
    }

    .phone {
      font-size: 12px;
      /* color: #0017e5; */
      cursor: pointer;
    }
  }

  .middle {
    margin-bottom: 8px;
    .category {
      font-weight: bold;
      font-size: 11px;
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
      font-size: 11px;
      svg {
        margin-right: 5px;
        color: #06197c;
        font-size: 12px;
      }
    }
  }

  .bottomactions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    .item {
      display: flex;
      align-items: center;
      color: #757575;
      font-size: 11px;
      cursor: pointer;
      svg {
        margin-right: 2px;
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
