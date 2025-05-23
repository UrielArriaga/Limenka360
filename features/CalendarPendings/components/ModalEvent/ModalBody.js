import React, { useState } from "react";
import PendingFields from "./PendingFields";
import ResultOptions from "./ResultOptions";
import Select from "react-select";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { Controller } from "react-hook-form";
import { StyledModal } from "./styles";

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
  const [activeTab, setActiveTab] = useState("seguimiento");

  return (
    <>
      {/* Checkbox para mostrar tabs */}
      <div className="field checkbox">
        <label>
          <input
            type="checkbox"
            checked={addPending}
            onChange={() => {
              setAddPending(!addPending);
              if (!addPending) setActiveTab("seguimiento"); // reset tab
            }}
          />
          Agregar pendiente
        </label>
      </div>

      {/* Mostrar tabs si está activo "Agregar pendiente" */}
      {addPending ? (
        <div className="tabs">
          <div className="tab-buttons">
            <button
              onClick={() => setActiveTab("seguimiento")}
              className={activeTab === "seguimiento" ? "active" : ""}
            >
              Seguimiento
            </button>
            <button
              onClick={() => setActiveTab("pendiente")}
              className={activeTab === "pendiente" ? "active" : ""}
            >
              Pendiente
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "seguimiento" && (
              <>
                <div className="field">
                  <div className="prospect">
                    <strong>Datos de prospecto: </strong>
                    <span>
                      {eventSelected?.prospect?.fullname || "Sin nombre"}
                    </span>
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
                  <label>Acción</label>
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
                    <small style={{ color: "#ff6b6b" }}>
                      {errors.action.message}
                    </small>
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
              </>
            )}

            {activeTab === "pendiente" && (
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
          </div>
        </div>
      ) : (
        // Solo se muestra seguimiento cuando no hay pendientes
        <>
          <div className="field">
            <div className="prospect">
              <strong>Datos de prospecto: </strong>
              <span>{eventSelected?.prospect?.fullname || "Sin nombre"}</span>
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
            <label>Acción</label>
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
              <small style={{ color: "#ff6b6b" }}>
                {errors.action.message}
              </small>
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
        </>
      )}
    </>
  );
}
