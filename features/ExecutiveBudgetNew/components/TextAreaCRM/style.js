import styled from "styled-components";

export const TextAreaStyled = styled.div`
  .container {
    width: 100%;
    box-sizing: border-box;
  }

  .viewContainer {
    background-color: #bdbdbd;
  }

  .text {
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 10px;
    color: #565656;
    font-weight: bold;
  }

  .label {
    color: red;
  }

  .textarea {
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 14px;
    width: 100%;
    padding: 10px 23px 9px 11px;
    box-sizing: border-box;
    resize: vertical; /* Permite redimensionar el textarea verticalmente */
  }

  .textarea.backgroundDisabled {
    background-color: #ecedee;
  }
`;

