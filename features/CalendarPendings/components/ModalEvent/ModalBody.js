import React, { useState } from "react";
import PendingFields from "./PendingFields";
import ResultOptions from "./ResultOptions";
import Select from "react-select";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { Controller } from "react-hook-form";

export default function ModalBody({
  eventSelected,
  isCall,
  options,
  selectedResult,
  setSelectedResult,
  clearErrors,
  errors,
  register,
  addPending,
  setAddPending,
  priority,
  setPriority,
  pendingType,
  setPendingType,
  customDate,
  setCustomDate,
  handlePreset,
  control,
}) {
  const common = useSelector(commonSelector);

  const { getCatalogBy } = useGlobalCommons();
  const [selectedAction, setSelectedAction] = useState(null);

  return (
    <>
      <div className="field">
        <div className="prospect">
          <strong>Datos de prospecto: </strong>
          <span>{eventSelected?.prospect?.fullname || "Sin nombre"}</span>
          {/* <strong>{eventSelected?.prospect?.fullname}</strong>
           */}
        </div>
      </div>

      <div className="field">
        <label>Último Seguimiento</label>
        <div className="last-followup">
          {eventSelected?.last_followup || "Sin seguimiento previo"}
        </div>
      </div>

      {isCall && (
        <ResultOptions
          options={options}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          clearErrors={clearErrors}
          errors={errors}
        />
      )}

      <div className="field">
        <label>Accion</label>
        <Controller
          name="action"
          control={control}
          rules={{ required: "Selecciona una acción." }}
          render={({ field }) => (
            <Select
              {...field}
              onMenuOpen={() => getCatalogBy("actions")}
              placeholder="Selecciona una opción"
              options={common.actions?.results}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              menuPosition="fixed"
            />
          )}
        />
        {errors.action && (
          <small style={{ color: "#ff6b6b" }}>{errors.action.message}</small>
        )}
      </div>

      <div className="field">
        <label>Comentario del seguimiento</label>
        <textarea
          {...register("observations", {
            required: "Este campo es obligatorio.",
          })}
          placeholder="Escribe tu comentario para el seguimiento..."
        />
        {errors.observations && (
          <small style={{ color: "#ff6b6b" }}>
            {errors.observations.message}
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
        <PendingFields
          priority={priority}
          setPriority={setPriority}
          pendingType={pendingType}
          setPendingType={setPendingType}
          customDate={customDate}
          setCustomDate={setCustomDate}
          handlePreset={handlePreset}
          register={register}
          errors={errors}
        />
      )}
    </>
  );
}
