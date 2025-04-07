import styled from "styled-components";

export const InputStyled = styled.div`
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
    font-weight: 600;
    font-weight: bold;
  }

  .label {
    color: red;
  }

  .input {
    color: #495057;
    background-color: #fff;
    border: none;
    border-radius: 0.1rem;
    font-size: 14px;
    width: 100%;
    height: 25px;
    padding: 10px 23px 9px 11px;
    box-sizing: border-box;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }

  .backgroundDisabled {
    background-color: #ecedee;
  }
`;
