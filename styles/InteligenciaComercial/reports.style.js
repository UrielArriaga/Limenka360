import { ErrorOutline } from "@material-ui/icons";
import { colors } from "../global.styles";
import styled from "styled-components";
export const ReportSyle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100vh;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .container_reports {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      &__head {
        margin-bottom: 20px;
        .title_head {
          font-size: 20px;
          font-weight: 500;
        }
      }
      &__body {
        .item {
          .buttons {
            margin-top: 30px;
            display: flex;
            flex-direction: row-reverse;
          }
        }
        .select {
          font-size: 14px;
        }
        .calendar {
          width: 100%;
          border-color: hsl(0, 0%, 80%);
          border-radius: 4px;
          border-style: solid;
          border-width: 1px;
          min-height: 38px;
        }
        .button_report {
          text-transform: capitalize;
          background-color: ${colors.primaryColorDark};
          color: #fff;
        }
        .button_disabled {
          text-transform: capitalize;
          background-color: grey;
          color: #fff;
        }
      }
      &__footer {
      }
    }
  }
`;
export const IconError = styled(ErrorOutline)`
  color: red;
  margin-bottom: -5px;
  margin-left: 5px;
`;
