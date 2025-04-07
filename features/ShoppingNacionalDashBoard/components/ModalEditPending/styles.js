import styled from "styled-components";

export const StylesDirectModalEditEvent = styled.div`
  background-color: #faf6f6;
  /* padding: 10px; */
  width: 500px;
  height: auto;
  /* overflow-y: auto; */
  h2 {
    font-size: 19px;
    background-color: #193364;
    padding: 6px;
    color: white;
  }
  .content_inputs {
    margin-top: 10px;
    padding: 15px;
  }
  .name_title {
    color: rgb(29, 57, 103);
    font-weight: 600;
    margin-top: 5px;
    padding: 6px 0px;
  }
  .input {
    background-color: white;
    width: 100%;
    border: 1px solid #cdcdcd;
    padding: 4px;
    border-radius: 5px;
    font-size: 14px;
  }
  .inputSelected {
    background-color: white;
    width: 100%;
    /* border: 1px solid #cdcdcd; */
    /* padding: 5px; */
    border-radius: 5px;
  }

  .inputDate {
    font-size: 12px;
    background-color: white;
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }
  .button {
    text-transform: capitalize;
  }
  .edit {
    background-color: #193364;
    color: #faf6f6;
  }

  .btnadd {
    background-color: #193364;
    color: white;
    padding: 4px;
    :hover {
      background-color: #193364;
      color: white;
    }
  }
  .btncancel {
    border: 1px solid #193364;
    padding: 3px;
    color: #193364;
    :hover {
      border: 1px solid #193364;
      color: #193364;
    }
  }
`;
