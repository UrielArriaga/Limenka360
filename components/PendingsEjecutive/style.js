import { Card } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const PendingsStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  height: 100%;
  padding: 10px;

  .card_style {
    width: 100%;
    padding: 5px;

    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    border-radius: 8px;
    padding: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    border-left: 3px solid #132c52;
    .location {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      .icon {
        color: ${colors.primaryColorDark};
        font-size: 18px;
      }
    }
    .actions {
      display: flex;
      justify-content: end;
      .pendingButton {
        color: #fff;
        background-color: #3f51b5;
        font-size: 11px;
        text-transform: capitalize;
      }
    }
    .date {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      text-transform: capitalize;
      .icon {
        color: ${colors.primaryColorDark};
        font-size: 18px;
      }
    }
    .title {
      font-size: 12px;
      color: grey;
    }
    .data {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .visit {
        color: #03cd71;
      }
      .date {
        color: #fba92b;
      }
      .call {
        color: #9e9e9e;
      }
      .remember {
        color: #6682f2;
      }
      .task {
        color: #b247e3;
      }
      .icon {
        font-size: 17px;
        margin-right: 3px;
      }
    }
    .observations {
      width: 100%;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
      resize: vertical;
      outline: none;
      cursor: default;
    }
    .button_complete {
      width: 100%;
      text-transform: capitalize;
      padding: 1px;
      font-size: 12px;
      background-color: ${colors.primaryColorDark};
      color: #fff;
      font-weight: 500;
    }
    .status {
      color: red;
    }
  }
`;
