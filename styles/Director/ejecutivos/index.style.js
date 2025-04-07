import styled from "styled-components";
import { colors } from "../../global.styles";
export const EjecutivosStyled = styled.div`
  overflow: hidden;
  height: 100%;
  background-color: #f1f1f1;

  * {
    margin: 0;
  }

  .main {
    height: 100%;
    overflow-y: scroll;
  }

  .main h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .container {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    /* min-height: calc(100% - 200px); */
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .head .totalrows {
    display: flex;
  }

  .head .btnadd {
    text-transform: capitalize;
    color: #fff;
    background-color: #405189;
  }

  // ** Start Filter Section

  .filters {
    display: flex;
    justify-content: space-between;
    margin: 15px 0px;
    .select_option {
      font-size: 12px;
      color: #0d47a1;
    }
    .container_right {
      display: flex;
    }
  }

  .titlegroup {
    font-weight: bold;
    color: #495057;
    text-transform: capitalize;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
  }
  .export {
    p {
      font-size: 12px;
      color: #878a99;
    }
  }
  .subtitle {
    font-size: 12px;
    color: #878a99;
  }

  .percentage {
    text-align: right;
    font-size: 12px;
    color: #212121;
  }

  .imagename {
    /* display: flex;
    align-items: center; */
  }
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  .row {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  // ** Finish Filter Section
`;
