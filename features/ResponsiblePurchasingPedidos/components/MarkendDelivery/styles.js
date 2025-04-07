import styled from "styled-components";

export const DialogContainer = styled.div`
padding: 12px;
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;

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
  .containerTable {
    overflow: auto;
    width: 1000px;
    margin-bottom: 20px;
    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
    border-radius: 9px;
    max-height: 70vh;
    margin-top: 29px;
    .products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }

        tbody {
          tr {
            border-bottom: 2px solid #e0e0e0;
            td {
              padding: 4px 0px 0px 9px;
              text-align: left;
              color: #616161;
              font-weight: bold;
              height: 60px;
              font-size: 13px;
            }
            .input_data {
          width: 100%;
          font-size: 14px;
          border-radius: 5px;
          padding: 5px;
          border: 1px solid #d4d4d4;
          outline: none;
        }
          }
        }

        .load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__img {
            width: 150px;
            animation: slide 3s infinite;

            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }

      .icnButton {
        background-color: #405189;
        padding: 2px;

        .icon {
          color: #fff;
        }
      }
    }
  }

  .bodymodal {
    padding: 0 20px 20px 20px;
    /* width: 809px; */
    height: 400px;

    width: 600px;

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
  v .inputContainer_switch {
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
    padding: 0 20px 20px 20px;
    /* width: 809px; */
    height: 400px;

    width: 600px;

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
