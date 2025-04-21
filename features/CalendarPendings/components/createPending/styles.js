import { TextField } from "@mui/material";
import styled from "styled-components";

export const NewEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
`;

export const ChooseColorEvent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const colorsEvents = [
//   { bgColor: "#ffe3e3", color: "#c92a2a", resourceId: "62dlUPgKjOpCoDH6wU0sG9rp" },
//   { bgColor: "#f8f0fc", color: "#862e9c", resourceId: "62dN6LUisuI0rTZm1p5l5Lcp" },
//   { bgColor: "#e7f5ff", color: "#1864ab", resourceId: "62dp9dPnCtgdfTodXAUuzr1N" },
//   { bgColor: "#fff4e6", color: "#d9480f", resourceId: "62dQiGAWr0P53bbpmnYtXmd5" },
//   { bgColor: "#f4fce3", color: "#5c940d", resourceId: "62dUf2tKTw0k9q0WrC5uvf8m" },
// ];

export const HeadInfo = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 20px;
    color: #212529;
    letter-spacing: 1px;
  }

  span {
    background-color: #d0ebff;
    color: #1864ab;
    border-radius: 11px;
    padding: 2px 10px;
    font-size: 12px;
    text-transform: uppercase;
  }
`;

// export const TextFieldStyled = styled(TextField)`
//   width: 100%;

//   .MuiInputLabel-root {
//     font-size: 14px;
//   }

//   .MuiInputBase-root {
//     font-size: 16px; /* Tamaño de la fuente */
//   }

//   .MuiInputBase-input {
//     font-size: 16px;
//   }

//   .MuiInputLabel-shrink {
//     font-size: 1.6rem;
//   }
// `;

export const FormCreateEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerInputTime = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
  }

  span {
    color: #495057;
  }
`;
