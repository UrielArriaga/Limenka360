import { Popover } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

import useGlobalCommons from "../../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";

import { pendingTypes, quickDates } from "./contants";
import { Event } from "@material-ui/icons";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { userSelector } from "../../../../../redux/slices/userSlice";
import { api } from "../../../../../services/api";

export default function PopoverTracking({
  open,
  onClose,
  setOpenScheduleModal,
  anchorEl,
  prospect,
}) {
  const { getCatalogBy } = useGlobalCommons();
  const common = useSelector(commonSelector);
  const { id_user } = useSelector(userSelector);
  const [selectedAction, setSelectedAction] = useState(null);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [phase, setPhase] = useState(null);
  const [pendingPriority, setPendingPriority] = useState(1); // Valor por defecto: Media (1)

  const [showFormPending, setShowFormPending] = useState(false);
  const [pendingType, setPendingType] = useState(null);
  const [pendingDate, setPendingDate] = useState("");
  const [pendingNotes, setPendingNotes] = useState("");
  const pendingTypeIdMap = {
    recordatorio: "62dlUPgKjOpCoDH6wU0sG9rp",
    visita: "62dN6LUisuI0rTZm1p5l5Lcp",
    cita: "62dp9dPnCtgdfTodXAUuzr1N",
    llamada: "62dQiGAWr0P53bbpmnYtXmd5",
    tarea: "62dUf2tKTw0k9q0WrC5uvf8m",
    automatizacion: "62dUf2tKTw0k9q0WrC5uv3e3",
    whatsapp: "62dUf2tKTw0k9q0WrC5uv45e",
  };

  const handleQuickDate = (type) => {
    const now = dayjs();
    let newDate;

    switch (type) {
      case "1h":
        newDate = now.add(1, "hour");
        break;
      case "1d":
        newDate = skipWeekends(now.add(1, "day"));
        break;
      case "3d":
        newDate = skipWeekends(now.add(3, "day"));
        break;
      case "5d":
        newDate = skipWeekends(now.add(5, "day"));
        break;
      default:
        newDate = now;
    }

    setPendingDate(newDate.format("YYYY-MM-DDTHH:mm"));
  };
  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];
  const skipWeekends = (date) => {
    let adjustedDate = dayjs(date);
    const dayOfWeek = adjustedDate.day();

    if (dayOfWeek === 6) {
      adjustedDate = adjustedDate.add(2, "day");
    } else if (dayOfWeek === 0) {
      adjustedDate = adjustedDate.add(1, "day");
    }

    return adjustedDate;
  };

  const handleSave = async () => {
    const trackingData = {
      prospectId: prospect.id,
      status: "1",
      //oportunityId: prospect.oportunityId || "",
      actionId: selectedAction?.id,
      reason,
      observations: description,
      phaseId: prospect.phaseId || null,
      createdbyId: id_user,
      url: "",
      pendingdata:
        showFormPending && pendingDate && pendingType
          ? {
              date_from: dayjs(pendingDate).toISOString(),
              description: pendingNotes,
              subject: "",
              place: "",
              priority: pendingPriority.toString(),
              pendingstypeId: pendingType
                ? pendingTypeIdMap[pendingType.value]
                : null,

              zone: "",
              remember: true,
              remember_by: "correo",
              notify: true,
              notify_by: "correo",
            }
          : {},
    };

    try {
      const res = await api.post("trackings/trackingandpending", trackingData);
      console.log("Seguimiento y pendiente creados:", res.data);
      onClose();
    } catch (err) {
      console.error(
        "Error al crear seguimiento y pendiente:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <TrackingStyled
      open={open}
      anchorEl={anchorEl}
      onClose={() => onClose()}
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
            <label>Acción</label>
            <Select
              onMenuOpen={() => getCatalogBy("actions")}
              placeholder="Selecciona una opción"
              value={selectedAction}
              onChange={setSelectedAction}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <AddPendingStyled
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            initial="hidden"
            animate="visible"
            className="addpending"
          >
            {/* Nueva sección para la prioridad */}
            <div className="input-field">
              <label>Prioridad</label>
              <Select
                options={prioritys}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.priority}
                value={prioritys.find((p) => p.priority === pendingPriority)}
                onChange={(selected) => setPendingPriority(selected.priority)}
                placeholder="Selecciona prioridad"
              />
            </div>

            <div className="quick-actions">
              {pendingTypes.map((type) => (
                <button
                  key={type.value}
                  className={`quick-action-btn ${
                    pendingType?.value === type.value ? "active" : ""
                  }`}
                  onClick={() => setPendingType(type)}
                  type="button"
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
                <Event className="date-icon" />
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
                value={pendingNotes}
                onChange={(e) => setPendingNotes(e.target.value)}
                placeholder="Escribe aquí las notas importantes del pendiente..."
              />
            </div>
          </AddPendingStyled>
        )}

        <div className="actions">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="save" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </ScheduleModal>
    </TrackingStyled>
  );
}

const TrackingStyled = styled(Popover)``;

const ScheduleModal = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 500px;
  max-height: 500px;
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

    padding-bottom: 20px;

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

const AddPendingStyled = styled(motion.div)``;
