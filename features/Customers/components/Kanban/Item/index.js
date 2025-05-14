import { AddAlert, AttachMoney, Schedule, WhatsApp } from "@material-ui/icons";
import React, { forwardRef, useState } from "react";
import Select from "react-select";
import { Popover, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { Menu, MenuItem } from "@material-ui/core";

import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// import { commonSelector } from "../../../../redux/slices/commonSlice";
// import useGlobalCommons from "../../../../hooks/useGlobalCommons";
// import LimiBotAnimation from "../../../../componentx/LimiBotAnimation";

import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
} from "@material-ui/icons";
import { commonSelector } from "../../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../../hooks/useGlobalCommons";
import LimiBotAnimation from "../../../../../componentx/LimiBotAnimation";
import PopoverTracking from "./PopoverTracking";

const Item = forwardRef(({ task: prospect, index, actions }, externalRef) => {
  const { getCatalogBy } = useGlobalCommons();
  const common = useSelector(commonSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openSendWhatsapp, setOpenSendWhatsapp] = useState(false);

  const [scheduleAnchorEl, setScheduleAnchorEl] = useState(null);
  const [whatsappAnchorEl, setWhatsappAnchorEl] = useState(null);

  const [anchorIA, setAnchorIA] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePendingOption = (option) => {
    console.log("Agregar pendiente:", option);
    handleCloseMenu();
  };

  const cutString = (str = "", len = 40) => {
    if (str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  };

  const handleOpenScheduleModal = (event) => {
    event.stopPropagation();
    setScheduleAnchorEl(event.currentTarget);
    setOpenScheduleModal(true);
  };

  const handleOpenWhatsappModal = (event) => {
    event.stopPropagation();
    setWhatsappAnchorEl(event.currentTarget);
    setOpenSendWhatsapp(true);
  };

  // Segumiento con pendiente

  const [showFormPending, setShowFormPending] = useState(false);
  const [pendingType, setPendingType] = useState(null);
  const [pendingDate, setPendingDate] = useState("");

  const pendingTypes = [
    { value: "call", label: "Llamada", icon: <PhoneIcon /> },
    { value: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
    { value: "email", label: "Email", icon: <EmailIcon /> },
    { value: "meeting", label: "Reunión", icon: <GroupIcon /> },
    { value: "other", label: "Otro", icon: <EventIcon /> },
  ];

  const quickDates = [
    { value: "1h", label: "1 hora", icon: <AccessTimeIcon /> },
    { value: "1d", label: "1 día", icon: <TodayIcon /> },
    { value: "3d", label: "3 días", icon: <DateRangeIcon /> },
    { value: "5d", label: "5 días", icon: <DateRangeIcon /> },
  ];

  return (
    <Draggable draggableId={prospect.id} index={index}>
      {(provided) => (
        <ItemProspect
          ref={(node) => {
            provided.innerRef(node);

            if (externalRef) {
              if (typeof externalRef === "function") {
                externalRef(node);
              } else {
                externalRef.current = node;
              }
            }
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="prospect-data"
            onClick={() => actions.handleOnClickProspects(prospect)}
          >
            <div className="prospect-data__top">
              <h3 className="fullname">{prospect?.fullname}</h3>
              <span
                className="probability-badge"
                certainty={prospect?.certainty}
              >
                {prospect?.clienttype?.name || "N/A"}
              </span>
            </div>

            <div className="prospect-data__center">
              <div className="amount-info">
                <span className="amount-label">Producto de interes:</span>
                <span className="amount-value">
                  {prospect?.product || "N/A"}
                </span>
              </div>
              <div className="last-tracking">
                Últ. seguimiento:{" "}
                <span>
                  {cutString(prospect.lastTracking?.observations, 80)}
                  {/* {prospect.lastTrackig?.observations} */}
                  {/* <pre>{JSON.stringify(prospect?.lastTracking, null, 2)}</pre> */}
                </span>
              </div>
              <div className="last-tracking">
                Siguiente pendiente
                <span> {dayjs(dayjs().add(1, "day")).fromNow()}</span>
              </div>
            </div>

            <div className="prospect-data__bottom">
              <div className="datecontainer">
                <span className="createdAt">
                  <Schedule /> {dayjs(prospect.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>

              {/* <div className="datecontainer">
                <span className="createdAt">
                  <Schedule /> {dayjs(prospect.createdAt).format("DD/MM/YYYY")}
                </span>
              </div> */}

              <div className="datecontainer">
                <span className="createdAt">
                  <Schedule /> {dayjs(prospect.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>

          <div className="prospect-actions">
            <Tooltip
              title="Convertir en oportunidad"
              arrow
              onClick={(e) => {
                console.log("adssa");
                actions.onClickNewOportunity(prospect);
                e.stopPropagation();
                return;
              }}
            >
              <AttachMoney className="iconaction history" />
            </Tooltip>

            <Tooltip
              title={`Enviar Whastapp `}
              placement="top"
              onClick={(e) => {
                handleOpenWhatsappModal(e);
                e.stopPropagation();
              }}
            >
              <WhatsApp className="whats iconaction" />
            </Tooltip>

            <div
              className="no-open-modal"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenScheduleModal(e);
              }}
            >
              <Tooltip title="Agendar seguimiento" arrow>
                <Schedule className="iconaction schedule" />
              </Tooltip>
            </div>

            <div
              className="no-open-modal"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenMenu(e);
              }}
            >
              <Tooltip title="Agregar pendiente" arrow>
                <AddAlert className="iconaction close-deal" />
              </Tooltip>
            </div>
            <CustomMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <CustomMenuItem
                icon={Schedule}
                label="Recordar cotización (en 24 horas)"
                onClick={() => handlePendingOption("2d")}
              />
              <CustomMenuItem
                icon={Schedule}
                label="Seguimiento de negociación en (3 dias)"
                onClick={() => handlePendingOption("2d")}
              />

              <CustomMenuItem
                icon={Schedule}
                label="Perzonalizado"
                onClick={() => handlePendingOption("2d")}
              />
            </CustomMenu>
          </div>

          <PopoverTracking
            open={openScheduleModal}
            anchorEl={scheduleAnchorEl}
            onClose={() => setOpenScheduleModal(false)}
          />
          {/* <Popover
            open={openScheduleModal}
            anchorEl={scheduleAnchorEl}
            onClose={() => {
              setOpenScheduleModal(false);
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ScheduleModal>
              <div className="title">
                <h3>Agregar seguimiento</h3>
              </div>

              <div className="inputs">
                <div className="input-field">
                  <label>Accion</label>
                  <Select
                    onMenuOpen={() => getCatalogBy("actions")}
                    placeholder="Selecciona una opción"
                    options={common.actions?.results}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    menuPosition="fixed"
                  />
                </div>
                <div className="input-field">
                  <label>Descripción</label>
                  <textarea
                    rows={4}
                    placeholder="Descripción del seguimiento"
                  />
                </div>
              </div>

              <div className="input-check">
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={showFormPending}
                    onChange={(e) => setShowFormPending(e.target.checked)}
                  />
                  Agregar pendiente
                </label>
              </div>

              {showFormPending && (
                <div className="addpending">
                  <div className="quick-actions">
                    {pendingTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`quick-action-btn ${
                          pendingType?.value === type.value ? "active" : ""
                        }`}
                        onClick={() => setPendingType(type)}
                      >
                        {type.icon}
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="input-field">
                    <label>Fecha del pendiente</label>
                    <div className="quick-dates">
                      {quickDates.map((date) => (
                        <button
                          key={date.value}
                          className="quick-date-btn"
                          onClick={() => handleQuickDate(date.value)}
                          type="button"
                        >
                          {date.icon}
                          <span>{date.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="date-input">
                      <EventIcon className="date-icon" />
                      <input
                        type="datetime-local"
                        value={pendingDate}
                        onChange={(e) => setPendingDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Notas del pendiente</label>
                    <textarea
                      rows={3}
                      placeholder="Escribe aquí las notas importantes del pendiente..."
                    />
                  </div>
                </div>
              )}

              <div className="actions">
                <button
                  className="cancel"
                  onClick={() => {
                    setOpenScheduleModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="save"
                  onClick={() => {
                    setOpenScheduleModal(false);
                  }}
                >
                  Guardar
                </button>
              </div>
            </ScheduleModal>
          </Popover> */}

          <Popover
            open={openSendWhatsapp}
            anchorEl={whatsappAnchorEl}
            onClose={() => {
              setOpenSendWhatsapp(false);
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <WhatsappModal>
              <div className="title">
                <h3>Seguimiento / WhatsApp</h3>
              </div>

              <div className="inputs">
                <div className="input-field">
                  <label>Plantilla</label>
                  <Select
                    onMenuOpen={() => getCatalogBy("templateswp")}
                    placeholder="Selecciona una opción"
                    options={common.templateswp?.results}
                    getOptionLabel={(option) => option.description}
                    getOptionValue={(option) => option.id}
                    menuPosition="fixed"
                  />
                </div>
                <div className="input-field">
                  <label>Mensaje</label>
                  <textarea rows={4} placeholder="Mensaje de WhatsApp" />

                  <div className="flex-end">
                    <LimiBotAnimation height="30px" width="30px" />
                  </div>
                </div>
              </div>

              <div className="actions">
                <button
                  className="cancel"
                  onClick={() => {
                    setOpenScheduleModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="save"
                  onClick={() => {
                    setOpenScheduleModal(false);
                  }}
                >
                  Guardar
                </button>
              </div>
            </WhatsappModal>
          </Popover>
        </ItemProspect>
      )}
    </Draggable>
  );
});

export default Item;
const ScheduleModal = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 500px;
  border-radius: 10px;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #2a2f3a;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 12px;
        color: #757575;
      }

      input,
      textarea {
        border-radius: 8px;
        padding: 8px;
        border: 1px solid #eee;
        font-size: 14px;
        color: #2a2f3a;

        &:focus {
          outline: none;
          border-color: #39b8df;
        }
      }
    }
  }

  .actions {
    display: flex;

    justify-content: flex-end;
    gap: 8px;

    button {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &.cancel {
        background-color: #f44336;
        &:hover {
          background-color: #d32f2f;
        }
      }

      &.save {
        background-color: #39b8df;
        &:hover {
          background-color: #0288d1;
        }
      }
    }
  }
`;

const WhatsappModal = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 500px;
  border-radius: 10px;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #2a2f3a;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 12px;
        color: #757575;
      }

      input,
      textarea {
        border-radius: 8px;
        padding: 8px;
        border: 1px solid #eee;
        font-size: 14px;
        color: #2a2f3a;

        &:focus {
          outline: none;
          border-color: #39b8df;
        }
      }
    }
  }

  .actions {
    display: flex;

    justify-content: flex-end;
    gap: 8px;

    button {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &.cancel {
        background-color: #f44336;
        &:hover {
          background-color: #d32f2f;
        }
      }

      &.save {
        background-color: #39b8df;
        &:hover {
          background-color: #0288d1;
        }
      }
    }
  }
`;

const CustomMenu = styled(Menu)`
  .MuiPaper-root {
  }

  .MuiMenuItem-root {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 500;
    color: #2a2f3a;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f0f0f0;
      cursor: pointer;
    }

    &:active {
      background-color: #e0e0e0;
    }

    &:focus {
      background-color: #e0e0e0;
    }

    svg {
      font-size: 20px;
      color: #757575;
    }
  }
`;

const CustomMenuItem = ({ icon: Icon, label, onClick }) => (
  <MenuItemStyled onClick={onClick}>
    {Icon && <Icon />}
    {label}
  </MenuItemStyled>
);

const MenuItemStyled = styled(MenuItem)`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d6d6d6;
  }

  svg {
    font-size: 20px;
    color: #757575;
  }
`;

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

      &:hover {
        cursor: pointer;
      }
      .fullname {
        font-size: 16px;
        font-weight: 600;
        text-transform: capitalize;
        color: #2a2f3a;
        margin: 0;
      }

      .probability-badge {
        font-size: 12px;
        font-weight: 600;
        padding: 1px 8px;
        border-radius: 12px;
        background-color: rgb(124, 221, 224, 0.4);
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
