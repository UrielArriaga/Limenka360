import React from "react";
import { InputStyled } from "./style";

const InputCRM = ({
  text = "Ejemplo de texto",
  value = "",
  onChange,
  name,
  disabled = false,
  viewContainer = false,
  type = "text", // Nueva prop para definir el tipo de input
}) => {
  return (
    <InputStyled>
      <div className={`container ${viewContainer ? "viewContainer" : ""}`}>
        {text !== "" && (
          <p className="text">
            {text} <label className="label">*</label>
          </p>
        )}

        {disabled ? (
          <input
            className="input backgroundDisabled"
            value={value}
            readOnly
            disabled
            type={type} // Utilizamos el tipo pasado por props
          />
        ) : (
          <input
            className="input"
            value={value}
            name={name}
            onChange={onChange}
            type={type} // Utilizamos el tipo pasado por props
            onClick={type === "date" ? e => e.target.showPicker() : undefined}
          />
        )}
      </div>
    </InputStyled>
  );
};

export default InputCRM;
