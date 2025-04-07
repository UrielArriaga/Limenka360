import styled from "styled-components";
import { Dialog } from "@material-ui/core";

export const PendingDialog = styled(Dialog)`
  .container {
    &__header {
      background-color: #405189;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title_header {
        color: #fff;
        font-weight: 500;
        word-break: break-all;
      }
      .iconButton {
        height: 30px;
        width: 30px;
        .icon {
          color: red;
        }
      }
    }
    &__body {
      padding: 10px;
      .itemGrid {
        margin-bottom: 15px;
      }
      .title_body {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 8px;
        .seeMore {
          font-size: 13px;
          font-weight: 400;
          color: #405189;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
            .iconSeeUp {
              transform: translateY(-3px);
            }
            .iconSeeDown {
              transform: translateY(3px);
            }
          }
          .iconSeeUp {
            transition: 0.3s;
            margin-bottom: -10px;
            font-size: 25px;
            margin-right: -2px;
          }
          .iconSeeDown {
            transition: 0.3s;
            margin-bottom: -8px;
            font-size: 25px;
            margin-right: -2px;
          }
        }
      }
      .title {
        font-size: 14px;
        font-weight: 500;
      }
      .subtitle {
        font-size: 12px;
        color: grey;
        word-break: break-all;
      }
      .pending_data {
      }
      .divider {
        margin: 5px 0px;
      }
      .capitalize {
        text-transform: capitalize;
      }
      .description {
        border: 1px solid #d3d3d3;
        margin-top: 5px;
        border-radius: 5px;
        padding: 5px;
        font-size: 12.5px;
        word-break: break-word;
      }
      .header_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .button_seeComplete {
        height: fit-content;
        width: fit-content;
        padding: 5px;
        border: 1px solid;
        text-transform: capitalize;
        border-radius: 6px;
        font-size: 11px;
        color: #fff;
        background-color: #405189;
      }
    }
    &__footer {
      display: flex;
      flex-direction: row-reverse;
      padding: 5px;
      align-items: center;

      .button_seeComplete {
        height: fit-content;
        width: fit-content;
        padding: 5px;
        border: 1px solid;
        text-transform: capitalize;
        border-radius: 6px;
        font-size: 11px;
        color: #fff;
        background-color: #405189;
      }
    }
  }
`;
