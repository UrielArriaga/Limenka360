import React from "react";
import { PENDINGSTYPES } from "../../config";

export default function PendingFields({
  priority,
  setPriority,
  pendingType,
  setPendingType,
  customDate,
  setCustomDate,
  handlePreset,
  register,
  errors,
}) {
  return (
    <div className="pending-fields">
      <div className="field">
        <label>Prioridad</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="0">Alta</option>
          <option value="1">Media</option>
          <option value="2">Baja</option>
        </select>
      </div>

      <div className="field">
        <label>Tipo de pendiente</label>
        <div className="options">
          {PENDINGSTYPES.map(({ id, name }) => (
            <button
              type="button"
              key={id}
              className={pendingType.name === name ? "active" : ""}
              onClick={() =>
                setPendingType({
                  id,
                  name,
                })
              }
            >
              {name}
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
            required: "Este campo es obligatorio si se agrega un pendiente.",
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
  );
}
