import { useState } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  padding: 14px;
  border-radius: 3px;
  border: 1px solid #adb5bd;
  font-size: 16px;

  &:focus {
    border-color: #1c7ed6 !important;
  }
`;

const InputTime = ({ time, setTime }) => {
  // const [time, setTime] = useState('');
  const [error, setError] = useState("");

  const handleChange = e => {
    const value = e.target.value;
    setTime(value);

    // Validar que los minutos sean 00 o 30
    const [hours, minutes] = value.split(":");
    if (minutes !== "00" && minutes !== "30") {
      setError("Solo se permiten minutos en múltiplos de 30 (00 o 30)");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <InputStyled type="time" id="time" name="time" value={time} onChange={handleChange} required />
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
};

export default InputTime;
