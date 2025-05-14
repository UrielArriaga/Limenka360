import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
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
import dayjs from "dayjs";

export default function ModalMovePhase({
  open,
  toggleModal,
  onClose,
  prospectData = {
    fullname: "Nombre del prospecto",
  },
}) {
  const [showFormPending, setShowFormPending] = useState(false);
  const [pendingType, setPendingType] = useState(null);
  const [pendingDate, setPendingDate] = useState("");
  const { getCatalogBy } = useGlobalCommons();
  const common = useSelector(commonSelector);

  const addBusinessDays = (date, days) => {
    let currentDate = new Date(date);
    let addedDays = 0;

    while (addedDays < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++;
      }
    }

    return currentDate;
  };

  const formatDateForInput = (date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleQuickDate = (type) => {
    const now = dayjs().format();
    let newDate;

    switch (type) {
      case "1h":
        newDate = new Date(now.getTime() + 60 * 60 * 1000);
        break;
      case "1d":
        newDate = addBusinessDays(now, 1);
        break;
      case "3d":
        newDate = addBusinessDays(now, 3);
        break;
      case "5d":
        newDate = addBusinessDays(now, 5);
        break;
      default:
        newDate = now;
    }

    setPendingDate(formatDateForInput(newDate));
  };

  const quickDates = [
    { value: "1h", label: "1 hora", icon: <AccessTimeIcon /> },
    { value: "1d", label: "1 día", icon: <TodayIcon /> },
    { value: "3d", label: "3 días", icon: <DateRangeIcon /> },
    { value: "5d", label: "5 días", icon: <DateRangeIcon /> },
  ];

  const pendingTypes = [
    { value: "call", label: "Llamada", icon: <PhoneIcon /> },
    { value: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
    { value: "email", label: "Email", icon: <EmailIcon /> },
    { value: "meeting", label: "Reunión", icon: <GroupIcon /> },
    { value: "other", label: "Otro", icon: <EventIcon /> },
  ];

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <ModalBox>
        <div className="title">
          <h3>Mover de fase</h3>
        </div>

        <div className="inputs">
          <div className="input-field">
            <label>Accion de segumiento</label>
            <Select
              onMenuOpen={() => getCatalogBy("actions")}
              placeholder="Selecciona una opción"
              options={common.actions?.results}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              // menuPosition="fixed"
            />
          </div>
          <div className="input-field">
            <label>Descripción de seguimiento</label>
            <textarea rows={4} placeholder="Descripción del seguimiento" />
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
              toggleModal();
            }}
          >
            Cancelar
          </button>
          <button
            className="save"
            onClick={() => {
              toggleModal();
            }}
          >
            Guardar
          </button>
        </div>

        {/* <div className="content">
          <p className="title">Mover {prospectData?.fullname} a </p>

          <div className="inputContainer">
            <label htmlFor="">Seguimiento</label>
            <textarea type="text" />
          </div>
        </div>

        <div className="actions">
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </div> */}
      </ModalBox>
    </Modal>
  );
}

const ModalBox = styled(Box)`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 24px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #2a2f3a;
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 13px;
        color: #666;
      }

      textarea {
        border-radius: 6px;
        padding: 12px;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        color: #2a2f3a;
        resize: vertical;
        min-height: 80px;

        &:focus {
          outline: none;
          border-color: #39b8df;
        }

        &::placeholder {
          color: #999;
        }
      }
    }
  }

  .input-check {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #2a2f3a;
      cursor: pointer;
    }

    .checkbox {
      width: 16px;
      height: 16px;
      margin: 0;
    }
  }

  .addpending {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid #eee;

    .quick-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .quick-action-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 13px;
        color: #666;
        font-weight: 500;

        svg {
          font-size: 18px;
        }

        &:hover {
          background: #f5f5f5;
          border-color: #ccc;
        }

        &.active {
          background: #f0f9ff;
          color: #0288d1;
          border-color: #0288d1;

          svg {
            color: #0288d1;
          }
        }
      }
    }

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 13px;
        color: #666;
      }

      .quick-dates {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
        flex-wrap: wrap;

        .quick-date-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 13px;
          color: #666;
          font-weight: 500;

          svg {
            font-size: 16px;
            color: #666;
          }

          &:hover {
            background: #f5f5f5;
            border-color: #ccc;
          }

          &:active {
            background: #f0f9ff;
            color: #0288d1;
            border-color: #0288d1;

            svg {
              color: #0288d1;
            }
          }
        }
      }

      .date-input {
        position: relative;

        .date-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          font-size: 18px;
        }

        input[type="datetime-local"] {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          font-size: 14px;
          color: #2a2f3a;

          &:focus {
            outline: none;
            border-color: #39b8df;
          }
        }
      }

      textarea {
        border-radius: 6px;
        padding: 12px;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        color: #2a2f3a;
        resize: vertical;
        min-height: 80px;

        &:focus {
          outline: none;
          border-color: #39b8df;
        }

        &::placeholder {
          color: #999;
        }
      }
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;

    button {
      padding: 8px 24px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &.cancel {
        background-color: #f5f5f5;
        color: #666;
        border: 1px solid #e0e0e0;

        &:hover {
          background-color: #eee;
        }
      }

      &.save {
        background-color: #0288d1;
        color: white;

        &:hover {
          background-color: #0277bd;
        }
      }
    }
  }
`;
