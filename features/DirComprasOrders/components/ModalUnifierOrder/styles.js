import styled from "styled-components";

export const StylesUnifierOrder = styled.div`
  background-color: #faf6f6;
  padding: 10px;
  width: 500px;
  height: auto;
  /* overflow-y: auto; */
  .note {
    text-align: justify;
    padding: 15px;
    margin-top: 10px;
    .container_identifier {
      background-color: #51a550;
      padding: 2px 3px 3px 2px;
      color: white;
      font-size: 10px;
      border-radius: 10px 10px 10px 0px;
    }
  }
  .orders {
    .headers {
      width: 100%;
      background-color: #cdcdcd;
      padding: 1px 3px 1px 3px;
      border-radius: 5px 5px 0px 0px;
      display: flex;
      justify-content: space-between;
      b{
        width: 33.3%;
      }
    }
    .body {
      width: 100%;
      display: flex;
      justify-content: space-between;
      p{
        width: 33.3%;
      }
    }
  }

  .name_title {
    color: rgb(29, 57, 103);
    font-weight: 600;
    margin-top: 5px;
  }
  .input {
    background-color: white;
    width: 100%;
    border: 1px solid #cdcdcd;
    padding: 5px;
    border-radius: 5px;
  }
  .button {
    text-transform: capitalize;
  }
`;
