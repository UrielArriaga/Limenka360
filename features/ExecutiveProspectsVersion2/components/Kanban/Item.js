import {
  AddAlert,
  AttachMoney,
  CheckCircle,
  History,
  Schedule,
  WhatsApp,
} from "@material-ui/icons";
import React from "react";

import { Tooltip } from "@material-ui/core";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";

export default function Item({ task: prospect, index, actions }) {
  const cutString = (str = "", len = 40) => {
    if (str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  };

  return (
    <Draggable draggableId={prospect.id} index={index}>
      {(provided) => (
        <ItemProspect
          onClick={() => actions.onClickProspect(prospect)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="prospect-data">
            <div className="prospect-data__top">
              <h3 className="fullname">{prospect?.fullname}</h3>
              <span
                className="probability-badge"
                certainty={prospect?.certainty}
              >
                {prospect?.certainty}% certeza
              </span>
            </div>

            <div className="prospect-data__center">
              {/* <div className="product-info">                
              </div> */}
              <div className="amount-info">
                <span className="amount-label">Producto de interes:</span>
                <span className="amount-value">
                  {prospect?.product || "N/A"}
                </span>
              </div>
              <div className="last-tracking">
                Últ. seguimiento:{" "}
                <span>
                  {new Date(
                    prospect?.lastTracking?.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* <div className="prospect-data__bottom">
                <div className="createdAt">
                  <Schedule fontSize="small" />
                  {new Date(prospect.createdAt).toLocaleDateString()}
                </div>
                <div className="contact-methods">
                  <WhatsApp className="contact-icon whatsapp" />
                  <Phone className="contact-icon phone" />
                  <Email className="contact-icon email" />
                </div>
              </div> */}
          </div>

          <div className="prospect-actions">
            <Tooltip
              title="Convertir en oportunidad"
              arrow
              onClick={(e) => {
                console.log("adssa");
                actions.onClickNewOportunity(prospect);
                return;
                e.stopPropagation();
              }}
            >
              <AttachMoney className="iconaction history" />
            </Tooltip>

            <Tooltip
              title={`Enviar Whastapp `}
              placement="top"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <WhatsApp className="whats iconaction" />
            </Tooltip>

            <Tooltip title="Agendar seguimiento" arrow>
              <Schedule className="iconaction schedule" />
            </Tooltip>
            <Tooltip title="Agregar pendiente" arrow>
              <AddAlert className="iconaction close-deal" />
            </Tooltip>
          </div>
        </ItemProspect>
      )}
    </Draggable>
  );
}

const ItemProspect = styled.div`
  position: relative;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #39b8df;
  transition: all 0.3s ease;

  .prospect-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 12px;

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .fullname {
        font-size: 16px;
        font-weight: 600;
        color: #2a2f3a;
        margin: 0;
      }

      .probability-badge {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 12px;
        background-color: ${(props) => {
          const certainty = props.certainty;
          if (certainty >= 75) return "#4caf5050";
          if (certainty >= 50) return "#ff980050";
          return "#f4433650";
        }};
        color: ${(props) => {
          const certainty = props.certainty;
          if (certainty >= 75) return "#2e7d32";
          if (certainty >= 50) return "#ff6d00";
          return "#d32f2f";
        }};
      }
    }

    &__center {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .product-info,
      .amount-info {
        display: flex;
        gap: 8px;
        font-size: 13px;

        .product-label,
        .amount-label {
          color: #757575;
          font-weight: 500;
        }

        .product-value,
        .amount-value {
          color: #2a2f3a;
          font-weight: 600;
        }
      }

      .last-tracking {
        font-size: 12px;
        color: #757575;
        margin-top: 4px;

        span {
          font-weight: 600;
          color: #39b8df;
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #9e9e9e;

      .createdAt {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;

        svg {
          font-size: 14px;
        }
      }

      .contact-methods {
        display: flex;
        gap: 8px;

        .contact-icon {
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;

          &.whatsapp:hover {
            color: #25d366;
          }
          &.phone:hover {
            color: #39b8df;
          }
          &.email:hover {
            color: #d32f2f;
          }
        }
      }
    }
  }

  .prospect-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding-left: 15px;
    border-left: 1px solid #eee;
    margin-left: 15px;

    .iconaction {
      color: #9e9e9e;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s ease;

      &.history:hover {
        color: #7b1fa2;
      }
      &.schedule:hover {
        color: #39b8df;
      }
      &.close-deal:hover {
        color: #4caf50;
      }
    }
  }
`;
