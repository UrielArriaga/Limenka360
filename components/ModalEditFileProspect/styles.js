import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { device } from "../../styles/global.styles";

export const EditFileStyle = styled(Dialog)`
  .container {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      background-color: #0c203b;
      padding: 10px;
      .title {
        color: #fff;
        font-weight: 500;
      }
      .loader_save {
        color: #fff;
      }
    }
    &__body {
      padding: 30px 30px 0px 30px;
      height: 39vh;
      transition: 0.2s;
      overflow-y: hidden;
      @media ${device.md} {
        width: 443px;
      }

      .container_dataFile {
        .item {
          .title {
            font-size: 14px;
            color: grey;
          }
          .file_name {
            border: 1px solid hsl(0, 0%, 80%);
            border-radius: 4px;
            height: 38px;
            width: 100%;
            outline: none;
            padding: 5px;
            font-size: 15px;
            margin-bottom: 10px;
          }
        }
      }
    }
    &__openMenu {
      height: 40vh;
    }

    &__footer {
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px 5px;
        .save_button {
          color: #fff;
          background-color: #0c203b;
          text-transform: capitalize;
          margin-left: 5px;
        }
        .cancel_button {
          color: #fff;
          background-color: #0d0d0d;
          text-transform: capitalize;
          margin-right: 5px;
        }
      }
    }
  }
`;

export const AlertRequired = styled.span`
  color: red;
  font-weight: 500;
`;
