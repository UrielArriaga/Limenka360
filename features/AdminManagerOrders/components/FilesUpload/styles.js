import { Drawer, Modal } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

const getColor = props => {
  if (props.isDragAccept) {
    return "#2196f3";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#9e9e9e";
};

export const FilesUploadStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 60%;
    @media (max-width: 600px) {
      width: 100%;
    }

    .btndowloand {
      background-color: #039be5;
      color: #fff;
      margin-right: 10px;
      font-size: 12px;
      padding: 5px 10px;
      text-transform: capitalize;
    }

    .disabled {
      background-color: #dcdcdc;
      color: #616161;
      margin-right: 10px;
      font-size: 12px;
      padding: 5px 10px;
      text-transform: capitalize;
    }

    .header {
      padding: 10px 20px;
    }
    .scrollablesection {
      height: 100%;
      overflow-y: auto;
    }

    .dropzone {
      padding: 20px;
      border: 2px dashed #dcdcdc;
      border-color: ${props => getColor(props)};
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 120px;
      width: 96%;
      margin: 0 auto;

      &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .iconupload {
        font-size: 30px;
        color: #616161;
      }
      .highligth {
        color: #3d5afe;
      }
      .icon {
        font-size: 50px;
        color: #dcdcdc;
      }
      .title {
        font-size: 15px;
        font-weight: 500;
        color: #dcdcdc;
      }

      font-size: 13px;
      font-weight: bold;
    }
    .sectionList {
      padding: 20px;

      .iconpng {
        width: 30px;
        margin-right: 10px;
      }

      &__table {
        margin-top: 30px;
        font-size: 12px;
        height: 100%;
        overflow-y: auto;
        height: 670px;

        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px ${colors.bgDirectorr};
        }

        .rowname {
          &:hover {
            cursor: pointer;
            color: #757575;
          }
        }

        .articleproduct {
          font-size: 10px;
          margin-top: 2px;
          color: #757575;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          thead {
            position: sticky;
            top: 0;
            background-color: #fff;
            z-index: 11;

            tr {
              th {
                padding: 10px;
                text-align: left;
                font-weight: 500;

                color: #757575;
                border-bottom: 1px solid #dcdcdc;
              }
            }
          }
          tbody {
            tr {
              td {
                color: #000;
                font-weight: bold;
                padding: 10px;
                border-bottom: 1px solid #dcdcdc;
              }
            }
          }
        }

        .iconButton {
          padding: 0;
          margin: 0;
          margin-right: 10px;
          font-size: 12px;

          &:hover {
            .iconMUI {
              color: #039be5;
            }
          }

          .iconMUI {
            font-size: 19px;
          }
        }
      }
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

  .progress {
    margin-bottom: 10px;
  }
  .filestoupload {
    margin-bottom: 20px;
    padding: 10px;

    align-items: center;
    margin-top: 20px;

    .itemupload {
      margin-bottom: 20px;
    }

    .fileselected {
      display: flex;
      align-items: center;
      border: 1px solid #dcdcdc;
      padding: 10px;

      .inputfile {
        height: 30px;
        width: 250px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
        background-color: #efeff1;
      }

      .rowname {
        &:hover {
          cursor: pointer;
          color: #757575;
        }
      }
      .iconpng {
        width: 30px;
        margin-right: 10px;
      }

      .name {
        font-weight: bold;
        font-size: 12px;
        margin-right: 10px;
      }

      .size {
        font-size: 9px;
        color: #757575;
      }

      .flexend {
        display: flex;
        justify-content: flex-end;
      }

      .btncancel {
        color: #757575;
        height: 30px;
      }

      .removefile {
        font-size: 12px;
        color: #757575;
        &:hover {
          cursor: pointer;
          color: red;
        }
      }
      .btnupload {
        height: 30px;
      }
    }
  }

  .type_file {
    width: 100%;
  }
  .row {
    display: flex;
    align-items: center;
  }

  .previewview {
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10000000000;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      position: sticky;
      top: 0;
      background-color: #f1f1fa;

      .title {
        font-size: 15px;
        font-weight: 500;
        color: #000;
      }
      .close {
        cursor: pointer;
      }
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
      width: 6px;
    }

    &-body::-webkit-scrollbar-track {
      background-color: #f2f2f2;
    }

    &-body::-webkit-scrollbar-thumb {
      background-color: #3f51b5;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      background-color: white;
      .info {
        display: flex;
        align-items: center;
      }
    }

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
    height: 32,
    minHeight: 32,
    fontSize: 12,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    backgroundColor: "#EFEFF1",
  }),
  singleValue: (provided, state) => ({
    ...provided,

    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,

    color: "#1e3a47",
    borderRadius: "4px",

    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,

    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};
