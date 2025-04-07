import React from "react";
import { TextAreaStyled } from "./style";

const TextAreaCRM = ({
  text = "Ejemplo de texto",
  value = "",
  onChange,
  name,
  disabled = false,
  viewContainer = false,
  rows = 3, // Define la cantidad de renglones por defecto
}) => {
  return (
    <TextAreaStyled>
      <div className={`container ${viewContainer ? "viewContainer" : ""}`}>
        <p className="text">
          {text} <label className="label">*</label>
        </p>
        <textarea
          className={`textarea ${disabled ? "backgroundDisabled" : ""}`}
          value={value}
          onChange={onChange} // Agrega onChange
          name={name} // Agrega name
          readOnly={disabled} // Solo lectura si está deshabilitado
          rows={rows} // Número de renglones para textarea
        />
      </div>
    </TextAreaStyled>
  );
};

export default TextAreaCRM;
