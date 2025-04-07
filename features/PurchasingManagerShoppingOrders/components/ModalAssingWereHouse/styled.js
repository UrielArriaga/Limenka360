import styled from "styled-components";

export const DialogContainer = styled.div`
  margin-top: 2%;
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;

  .infoproductselected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .infoTile {
      font-size: 16px;
      padding-left: 25px;
      .warnning {
        color: #f3bb1b;
      }
    }
  }

  .contentPreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    margin-top: 3%;

    /* max-height: calc(100vh - 268px); */
    height: 80vh;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }

    .containerTable {
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

      max-height: 100vh;
      /* margin-top: 29px; */
      &__products {
        .tablebody {
          .odd-row {
            background-color: #e3e3e3;
          }
          .even-row {
            /* background-color: #f0f0f0; */
          }
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        .tableheader {
          display: flex;
          background-color: #405189;
          color: white;
          border-top-left-radius: 9px;
          border-top-right-radius: 9px;
          padding: 10px;
          font-weight: bold;
          position: sticky;

          .tablehead {
            flex: 1;

            text-align: left;
            font-weight: bold;
          }

          .tableheadproductname {
            flex: 3;
          }
        }

        .tablerow {
          display: flex;
          border-bottom: 1px solid #e0e0e0;
          padding: 20px;
          font-weight: bold;
          min-height: 40px;
          color: #616161;
          cursor: pointer;
          &:hover {
            background-color: #f0f1f1;
          }
          .tablecell {
            flex: 1;

            text-align: left;
            color: #616161;
            font-weight: bold;
          }
          .code {
            color: #000;
            .input_data {
              color: #616161;
              margin: 0px 0px;
              font-size: 12px;
              padding: 2px;
              border: 1px solid #d4d4d4;
              outline: none;
              width: 90%;
              font-weight: bold;
              height: 27px;
              border-radius: 5px;
            }
            .input_observations {
              background-clip: padding-box;
              background-color: #fff;
              border: 1px solid #ced4da;
              border-radius: 0.25rem;
              color: #495057;
              display: block;
              font-size: 0.8125rem;
              font-weight: 400;
              line-height: 1.5;
              padding: 0.47rem 0.75rem;
              width: 100%;
              min-height: 38px;
              outline: none;
              resize: none;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
            }
          }

          .actions {
            .disabled {
              background-color: #e0e0e0;
              color: #616161;
            }
            button {
              margin-right: 10px;

              background-color: #405189;
              color: #fff;
              border: 1px solid #ccc;
              border-radius: 5px;
              padding: 5px 10px;
            }
          }

          .tableheadproductrow {
            flex: 3;
          }
        }

        .tablelist {
          padding-left: 10px;

          .tablelititem {
            font-size: 11px;
            display: flex;
            align-items: flex-start;
            padding: 20px 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #000;
            font-weight: bold;
            .description {
              display: flex;
              margin-right: 10px;
            }
            .contentMenu {
              box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 5px 0px;
              border-radius: 5px;
              background-color: #f0f1f1;
              margin-left: 7px;
            }
            .icon {
              font-size: 11px;
              margin-right: 10px;
            }
            .serialnumber {
              text-transform: uppercase;
              color: #00738e;
              margin-right: 10px;
              font-weight: bold;
            }
            .name {
              margin-right: 10px;
              &:hover {
                color: red;
                cursor: pointer;
                .delete {
                  visibility: visible;
                }
              }
            }

            textarea {
              width: 50%;
              padding: 5px;
              height: 50px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: vertical;
            }

            .delete {
              color: red;
              visibility: hidden;
            }
            .btndelete {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .iconBtnDelete {
              background-color: red;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }

            .icondelete {
              font-size: 15px;
            }
          }
        }

        .tablelistsaved {
          padding-left: 10px;
          .tablelititem {
            font-size: 11px;
            display: flex;
            align-items: flex-start;
            padding: 20px 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #000;
            font-weight: bold;

            .description {
              display: flex;
              margin-right: 10px;
            }
            .icon {
              font-size: 11px;
              margin-right: 10px;
            }
            .serialnumber {
              text-transform: uppercase;
              color: #00738e;
              margin-right: 10px;
              font-weight: bold;
            }
            .name {
              margin-right: 10px;
              &:hover {
                color: red;
                cursor: pointer;
                .delete {
                  visibility: visible;
                }
              }
            }

            textarea {
              width: 300px;
              padding: 5px;
              height: 50px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: none;
            }

            .delete {
              color: red;
              visibility: hidden;
            }
            .btndelete {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .iconBtnDelete {
              background-color: red;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }

            .iconAdd {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .icondelete {
              font-size: 15px;
            }
          }
        }

        .selected {
          background-color: #f1f1fa;
        }

        .stocksavailables {
          background-color: #f1f1fa;
          padding: 10px;
          font-size: 12px;
          h4 {
            margin-bottom: 10px;
            font-size: 14px;
          }

          .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .itemwerehouse {
            padding: 10px;
            background-color: rgba(0, 230, 118, 0.3);
            border-radius: 8px;
          }

          .unit {
            color: #616161;
            font-weight: bold;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .headerDialog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0c203b;
    margin-bottom: 15px;
    &__title {
      display: flex;
      font-size: 18px;
      font-weight: bold;
      align-items: center;
      color: #fff;
      letter-spacing: 0.05em;
    }

    .btnback {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0c203b;
      color: #fff;
      border: none;
      padding: 0;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background: #0d0d0d;
      }
    }
    &__loader {
      color: #fff;
    }
  }
  .bodymodal {
    padding: 0 20px 20px 20px;
    /* width: 809px; */
    /* height: 400px; */

    /* width: 600px; */

    background-color: rgba(88, 88, 88, 0.3);
    margin-top: 20px;
    margin-bottom: 20px;
    .title {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .row {
      display: flex;
      margin-bottom: 0px;
      gap: 10px;
    }

    &__inputContainer {
      display: flex;
      width: 80%;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #c7c7c7;
      border-radius: 5px;
      padding: 0 10px;
      margin-bottom: 20px;

      input {
        border: none;
        outline: none;
        width: 100%;
        padding: 10px;
      }
    }

    &__new {
      button {
        background: #039be5;
        color: #fff;
        border: none;
        height: auto;
        /* padding: 10px 20px; */
        border-radius: 5px;
        cursor: pointer;
        padding: 10px 10px;
      }
    }
    &__ButtonIcon {
      align-items: center;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .icon {
        margin-left: 5px;
        padding: 5px;
        border-radius: 3px;
        background-color: #039be53d;
        color: white;
      }
      .desen {
        /* align-items: center;
        display: inline-block; */
        transform: rotate(180deg);
        transition: transform 0.1s;
      }
      .Asc {
        transform: rotate(0deg);
        transition: transform 0.1s;
      }
      .ilow {
        font-size: 18px;
        margin: auto;
      }
      .content_ascdes {
        cursor: pointer;
        border-radius: 3px;
        padding-left: 8px;
        align-items: center;
        display: flex;
        background-color: #039be5;
      }
      .text__Button {
        color: white;
      }
    }

    &__item {
      // genera estios tipo lista

      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 10px 0;
      border-bottom: 1px solid #c7c7c7;

      &:hover {
        background-color: #f5f5f5;
      }

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0;
      }

      &--name {
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }

      &--date {
        font-size: 12px;
        font-weight: 600;
        color: #616161;
      }

      &--provider {
        font-size: 12px;
        font-weight: 600;
        color: #616161;
      }

      .actions {
        button {
          color: #0c203b;
          background: transparent;
          border: none;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .inputContainer_switch {
    width: 100%;
    align-items: center;
    display: flex;
  }

  .chek {
    align-items: center;
    width: 5%;
    margin: 0px;
  }

  .bodyadd {
    margin-top: 20px;
    background-color: rgba(88, 88, 88, 0.3);
    padding: 10px;
    /* padding: 0 20px 20px 20px; */
    /* width: 809px; */
    /* height: 400px; */
    margin-bottom: 20px;

    /* width: 600px; */

    .title {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .row {
      display: flex;
      margin-bottom: 20px;
      gap: 10px;
    }

    .inputContainer {
      .label {
        font-size: 12px;
        margin-bottom: 5px;
      }
      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    &__new {
      button {
        background: #039be5;
        color: #fff;
        border: none;
        /* padding: 10px 20px; */
        border-radius: 5px;
        cursor: pointer;
        padding: 5px 5px;
      }
    }

    &__item {
      // genera estios tipo lista

      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 10px 0;
      border-bottom: 1px solid #c7c7c7;

      &:hover {
        background-color: #f5f5f5;
      }

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0;
      }

      &--name {
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }

      &--date {
        font-size: 12px;
        font-weight: 600;
        color: #616161;
      }

      .actions {
        button {
          color: #0c203b;
          background: transparent;
          border: none;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .selected {
    background-color: #f5f5f5;
  }

  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
      color: #fff;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }

  .actions {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    margin-top: 3%;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #fff;
      color: #000;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
  .ctr_slope {
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      span {
        color: #0c203b;
      }
    }
    &__item {
      width: 100%;

      .text {
        color: #000;
        font-weight: 600;
      }
      .span {
        color: #c7c7c7;
        font-size: 14px;
        font-weight: 500;
      }
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .btn_close {
        text-transform: capitalize;
        background-color: #000;
        color: #fff;
        margin-right: 10px;
      }
      .btn_complete {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }

  .list {
    height: calc(100vh - 180px);
    overflow: auto;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .containerPagination {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .containerLoad {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
