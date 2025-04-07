import styled from "styled-components";
import { Dialog, Drawer } from "@material-ui/core";

export const PreviewStyled = styled(Drawer)`
  overflow: hidden;
  .MuiDrawer-paper {
    @media (min-width: 1151px) {
      width: 40%;
    }
    @media (max-width: 1150px) {
      width: 50%;
    }
    @media (max-width: 900px) {
      width: 70%;
    }
    @media (max-width: 590px) {
      width: 100%;
    }
  }
  .container {
    &__head {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #405189;
      justify-content: space-between;
      padding: 8px;
      position: sticky;
      top: 0;
      z-index: 1;

      .title {
        color: #fff;
        font-size: 19px;
        font-weight: 500;
      }
      .button_close {
        width: 30px;
        height: 30px;
        transition: 0.2s;
        padding: 3px;
        &:hover {
          background-color: red;
          .icon_close {
            color: #fff;
          }
        }
        .icon_close {
          color: red;
          font-size: 25px;
        }
      }
    }
    &__body {
      padding: 10px;
      .title {
      }
      .head {
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin-bottom: 10px;
        .title {
          color: grey;
          span {
            font-weight: 500;
            color: black;
          }
        }
        .buttons {
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          .button_delete {
            background-color: red;
            color: #fff;
            text-transform: capitalize;
            font-size: 13px;
            margin-right: 5px;
          }
          .button_download {
            background-color: #405189;
            color: #fff;
            text-transform: capitalize;
            font-size: 13px;
          }
        }
      }
      .container_file {
        margin-top: 10%;
        padding: 10px;
        .image_empty {
          align-items: center;
          display: flex;
          flex-direction: column;
          .img {
            height: 100px;
            width: 100px;
            margin-bottom: 20px;
          }
          .title {
            font-weight: 500;
            font-size: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .alert {
              color: #990000;
              font-weight: bold;
              margin-bottom: 10px;
            }
          }
          .dowload_file {
            text-transform: capitalize;
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
