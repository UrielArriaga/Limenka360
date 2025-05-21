import { Modal } from "@material-ui/core";
import dayjs from "dayjs";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

export default function ModalEvent({ open, onClose, eventSelected }) {
  const options = [
    "Sí respondió",
    "No respondió",
    "No contesta",
    "Llamar más tarde",
  ];
  const tipo = eventSelected?.pendingstype?.name || "-";
  const isCall = tipo === "Llamada" || tipo === "Whatsapp";

  const [selectedResult, setSelectedResult] = useState(null);
  const [priority, setPriority] = useState("Media");
  const [pendingType, setPendingType] = useState("Whatsapp");
  const [customDate, setCustomDate] = useState("");
  const [addPending, setAddPending] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm();

  const handlePreset = (value) => {
    const now = dayjs();
    let newDate = now;
    if (value.includes("hora")) {
      const hours = parseInt(value);
      newDate = now.add(hours, "hour");
    } else if (value.includes("día")) {
      const days = parseInt(value);
      newDate = now.add(days, "day");
    }
    setCustomDate(newDate.format("YYYY-MM-DDTHH:mm"));
  };

  const onSubmit = (data) => {
    if (!selectedResult) {
      setError("selectedResult", {
        type: "manual",
        message: "Selecciona un resultado.",
      });
      return;
    }
    if (addPending) {
      if (!priority || !pendingType || !customDate || !data.pendingNotes) {
        setError("pending", {
          type: "manual",
          message: "Completa todos los campos del pendiente.",
        });
        return;
      }
    } else {
      clearErrors("pending");
    }

    const payload = {
      seguimiento: {
        resultado: selectedResult,
        comentario: data.trackingComment,
      },
      ...(addPending && {
        pendiente: {
          prioridad: priority,
          tipo: pendingType,
          fecha: customDate,
          notas: data.pendingNotes,
        },
      }),
    };
    alert(JSON.stringify(payload, null, 2));
    reset();
    onClose();
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <h1>{tipo}</h1>

        <div className="field">
          <label>Prospecto</label>
          <div className="prospect">
            <strong>{eventSelected?.prospect?.fullname}</strong>
            <span>{eventSelected?.prospect?.company || "Sin empresa"}</span>
          </div>
        </div>

        <div className="field">
          <label>Último Seguimiento</label>
          <div className="last-followup">
            {eventSelected?.last_followup || "Sin seguimiento previo"}
          </div>
        </div>

        {isCall && (
          <div className="field">
            <label>Resultado Seleccionado</label>
            <div className="options">
              {options.map((opt, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={selectedResult === opt ? "active" : ""}
                  onClick={() => {
                    setSelectedResult(opt);
                    clearErrors("selectedResult");
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.selectedResult && (
              <small style={{ color: "#ff6b6b" }}>
                {errors.selectedResult.message}
              </small>
            )}
          </div>
        )}

        <div className="field">
          <label>Comentario del seguimiento</label>
          <textarea
            {...register("trackingComment", {
              required: "Este campo es obligatorio.",
            })}
            placeholder="Escribe tu comentario para el seguimiento..."
          />
          {errors.trackingComment && (
            <small style={{ color: "#ff6b6b" }}>
              {errors.trackingComment.message}
            </small>
          )}
        </div>

        <div className="field checkbox">
          <label>
            <input
              type="checkbox"
              checked={addPending}
              onChange={() => setAddPending(!addPending)}
            />
            Agregar pendiente
          </label>
        </div>

        {addPending && (
          <div className="pending-fields">
            <div className="field">
              <label>Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div className="field">
              <label>Tipo de pendiente</label>
              <div className="options">
                {[
                  "Llamada",
                  "Whatsapp",
                  "Email",
                  "Reunión",
                  "Otro",
                  "Videollamada",
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={pendingType === type ? "active" : ""}
                    onClick={() => setPendingType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Fecha del pendiente</label>
              <div className="options">
                {["1 hora", "1 día", "3 días", "5 días"].map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => handlePreset(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="datetime-local"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Notas del pendiente</label>
              <textarea
                {...register("pendingNotes", {
                  required: addPending
                    ? "Este campo es obligatorio si se agrega un pendiente."
                    : false,
                })}
                placeholder="Escribe aquí las notas importantes del pendiente..."
              />
              {errors.pendingNotes && (
                <small style={{ color: "#ff6b6b" }}>
                  {errors.pendingNotes.message}
                </small>
              )}
            </div>
          </div>
        )}

        {errors.pending && (
          <small style={{ color: "#ff6b6b" }}>{errors.pending.message}</small>
        )}

        <div className="footer">
          <span>{dayjs().format("DD [de] MMM. [de] YYYY hh:mm A")}</span>
          <div className="actions">
            <button className="cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="save" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    min-width: 600px;
    font-family: "Inter", sans-serif;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 16px;
  }

  .field {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    label {
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 0.9rem;
      color: #222;
    }

    select,
    textarea,
    input[type="datetime-local"] {
      border: 1.5px solid #ccc;
      border-radius: 10px;
      padding: 10px;
      font-size: 0.9rem;
    }

    textarea {
      resize: none;
      min-height: 80px;
    }

    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;

      button {
        padding: 8px 12px;
        border-radius: 8px;
        border: 1.5px solid #ccc;
        background: #f5f5f5;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s ease;

        &.active {
          background-color: #2563eb;
          color: white;
          border-color: #2563eb;
        }
      }
    }
  }

  .checkbox {
    flex-direction: row;
    align-items: center;
    gap: 8px;

    label {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
    }
  }

  .prospect span {
    color: #666;
    font-size: 0.85rem;
  }

  .last-followup {
    background: #f4f6f8;
    border-radius: 10px;
    padding: 10px;
    font-size: 0.85rem;
  }

  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #555;

    .actions {
      display: flex;
      gap: 8px;

      button {
        padding: 8px 16px;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }

      .cancel {
        background: #f0f0f0;
        color: #333;
      }

      .save {
        background: #2563eb;
        color: white;
      }
    }
  }
`;
