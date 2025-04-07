import styled from "styled-components";

export const StylesUnifierOrder = styled.div`
  background-color: #faf6f6;
  /* padding: 10px; */
  width: 500px;
  height: auto;
  /* overflow-y: auto; */
  h3{
    background-color: #193364;
    padding: 15px;
    color: white;
  }
  .note {
    text-align: justify;
    padding: 15px;
    margin-top: 10px;
    .pcondition{
      margin-top: 1%;
      color: #C70039;
    }
    .container_identifier {
      background-color: #51a550;
      padding: 2px 3px 3px 2px;
      color: white;
      font-size: 10px;
      border-radius: 10px 10px 10px 0px;
    }
    ol{
      margin-top: 1%;
      list-style: none;
      li{
        margin-bottom: 2%;
        strong{
          font-weight: 600;
        }
        span{
          color: #9e9e9e;
        }
      }
    }
  }
  .orders {
    padding: 15px;
    h4{
      margin-bottom: 1%;
      font-weight: 600;
    }
    .headers {
      width: 100%;
      background-color: #e3eefa;
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
        color: #9e9e9e;
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
  .cancel{
    border:1px solid #C70039;
    color: #C70039;
  }
  .add{
    background-color: #51a550;
    color: #faf6f6;
  }
`;
