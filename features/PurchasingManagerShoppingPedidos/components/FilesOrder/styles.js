import { Drawer, Modal } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const FilesOrderStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    @media (max-width: 600px) {
      width: 100%;
    }
  }

  .content_filesOrder {
    height: 100vh;
    padding: 10px;
    overflow: hidden;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .title {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.03em;
        &:hover {
          cursor: pointer;
        }
        svg {
          margin-left: 5px;
          font-size: 17px;
          color: ${colors.primaryColor};
        }
      }
      .bt_close {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        color: red;
      }
    }
    .add_files {
      width: auto;
      height: 100%;
      position: relative;
      background-color: rgb(212 212 212 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
      .title_file {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 500;
      }
    }
    &__body {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-height: 90vh;
      .files {
        height: 100%;
        overflow: auto;
        &__file {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          &--icon {
            color: #039be5;
            margin-right: 10px;
          }

          &--name {
            width: 70%;
            p:nth-child(1) {
              font-size: 14px;
              font-weight: bold;
              color: #000;
            }
            p:nth-child(2) {
              font-size: 13px;
              font-weight: 500;
              color: #000;
            }
          }

          &:hover {
            background-color: #f1f1fa;
            .files__file--actions {
              visibility: visible;
            }
          }

          &--actions {
            display: flex;
            justify-content: space-between;
            width: 30%;
            flex-direction: column;
            visibility: hidden;
            p {
              font-size: 13px;
              font-weight: 500;
              color: #000;
              cursor: pointer;
              margin-bottom: 6px;
            }
          }
        }
      }
      .new_files {
        overflow: 100%;
        .title {
          background-color: #fff;
          top: 0;
          position: sticky;
          font-size: 14px;
          font-weight: 500;
          color: #039be5;
          margin-bottom: 10px;
          z-index: 1;
        }
        .item_file {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .icon_file {
            margin-right: 5px;
          }
          .file_data {
            width: 100%;
            margin-bottom: 10px;
            position: relative;
            .name {
              border: 1px solid #d4d4d4;
              width: 90%;
              outline: none;
              border-radius: 5px;
              padding: 5px;
            }
            .type_file {
              border-radius: 5px;
              padding: 2px;
              font-size: 12px;
            }
          }
          .delete_file {
            margin-top: -45px;
            font-size: 18px;
            color: red;
            margin-left: 1px;
            cursor: pointer;
          }
        }
      }
      .buttons {
        margin-top: 10px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: row-reverse;
        .bt_save {
          font-size: 12px;
          text-transform: capitalize;
          background-color: #039be5;
          color: #fff;
          font-weight: 500;
          .loader {
            margin-right: 5px;
            color: #fff;
          }
        }
      }
    }
    .opacity {
      opacity: 0.2;
    }
    .warning {
      width: 100%;
      font-size: 12px;
      color: grey;
      margin-bottom: 10px;
    }
  }
`;
export const ModalFile = styled(Modal)`
  display: flex;
  justify-content: center;
  top: 0px;
  overflow: auto;

  @media (min-width: 800px) {
    align-items: center;
  }
  .modal {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    min-width: 400px;
    max-width: 600px;

    &:focus {
      outline: none;
      border: none;
    }
    overflow: auto;
    .local {
      display: flex;
      align-items: center;
    }
    .icon-big {
      font-size: 1.5em;
      color: ${colors.primaryColor};
    }
    .estructure {
      padding: 1em;
    }
    /* Modal header */
    &-header {
      font-size: 1.5em;
      display: flex;
      justify-content: space-between;
      &__title {
        display: flex;
        align-items: center;
      }
    }
    .type {
      &-create {
        background-color: #6adebb;
      }
      &-update {
        background-color: #3d85c6;
      }
      &-delete {
        background-color: #d63c5d;
      }
    }
    .title {
      border-bottom: 1px solid ${colors.primaryColor};
      margin: 1em 0;
      color: #757575;
    }

    /* Modal body */
    &-body {
      max-height: 700px;
      overflow-y: auto;
      font-size: 1.2em;
      background-color: #f4f5fa;
      .executive {
        display: flex;
        margin-bottom: 1em;
      }
      .location {
        display: flex;
        align-items: center;
      }
    }

    &-body::-webkit-scrollbar {
      width: 6px; /* Ancho de la barra de desplazamiento */
    }

    &-body::-webkit-scrollbar-track {
      background-color: #f2f2f2; /* Color de fondo de la barra de desplazamiento */
    }

    &-body::-webkit-scrollbar-thumb {
      background-color: #3f51b5; /* Color del pulgar de la barra de desplazamiento */
    }

    /* Modal footer */
    &-footer {
      display: flex;
      justify-content: space-between;
      background-color: white;
      .info {
        display: flex;
        align-items: center;
      }
    }

    /* Type of modal text */
    .text {
      margin-left: 1rem;

      &-main {
        font-size: 1.2em;
      }
      &-sub {
        font-size: 1em;
        color: #757575;
      }
    }
  }
`;

export const PreviewStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10%;
  left: 25%;
  right: 25%;
  bottom: auto;
  transform: "translate(50%, 50%)";
  background: white;
  border-radius: 13px;
  overflow-y: hidden;
  overflow-x: hidden;

  .container {
    &__head {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #034d6f;
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
          color: white;
          font-size: 25px;
        }
      }
    }
    &__body {
      height: 732px;
      padding: 10px;
      overflow-x: scroll;
      overflow-x: hidden;
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #407aff;
      }
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

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 30,
    minHeight: 20,
    fontSize: 12,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
  }),

  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  // menuPortal: provided => ({ ...provided, zIndex: 0 }),
  // menu: provided => ({ ...provided, zIndex: 0 }),
};
