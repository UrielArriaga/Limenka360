import React from "react";
import styled from "styled-components";

export default function SuggestionsCloseout() {
  const suggestions = [
    "Revisar últimos seguimientos del ejecutivo.",
    "Contactar por llamada antes del cierre.",
    "Enviar resumen de propuesta por correo.",
    "Confirmar disponibilidad del cliente.",
    "Verificar inventario antes de cerrar la venta.",
  ];

  return (
    <SuggestionsCloseoutStyled>
      <h4>Sugerencias de cierre</h4>
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>
            <span className="bullet">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SuggestionsCloseoutStyled>
  );
}

const SuggestionsCloseoutStyled = styled.div`
  width: 90%;
  max-width: 600px;
  /* margin: 20px auto; */
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

  h4 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    color: #444;
    font-size: 15px;

    .bullet {
      color: #6c5ce7;
      font-weight: bold;
      margin-right: 10px;
      font-size: 18px;
      line-height: 1;
    }
  }
`;
