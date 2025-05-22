import React from "react";

export default function ResultOptions({
  options,
  selectedResult,
  setSelectedResult,
  clearErrors,
  errors,
}) {
  return (
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
  );
}
