import styled from "styled-components";
import { colors } from "../global.styles";

export const ShippingsStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    width: calc(100% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__title {
      font-size: 14px;
      margin-bottom: 10px;
      h1 {
        margin-bottom: 8px;
      }
      .total {
        display: flex;
        align-items: center;
        font-weight: 500;
        svg {
          font-size: 14px;
          margin-right: 5px;
          color: #103c82;
        }
        .reloadIcon {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .filters_chip {
    display: flex;
    width: 100%;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 5px 0px;
    margin-bottom: 10px;
    &__chip {
      margin-right: 10px;
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .ctr_filter {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    &__ctr_input {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      .inputText {
        width: 100%;
        height: 40px;

        input {
          padding-left: 40px;
          padding-right: 40px;
        }
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
        border-radius: 10px;
      }
      .search {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        left: 10px;
      }
      .filters {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        right: 10px;
        &:hover {
          padding: 3px;
          cursor: pointer;
        }
      }
    }
  }

  .ctr_oportunities {
    width: calc(100% - 30px);
    margin: auto;

    margin-top: 26px;
    margin-bottom: 20px;
    min-height: calc(100% - 50%);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    // ** Start Search
    .search {
      margin-bottom: 20px;
    }
    .inputicon {
      position: relative;

      .searchicon {
        position: absolute;
        top: 10px;
        left: 8px;
      }

      input {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 4px;
        border: 1px solid #bdbdbd;
        padding-left: 40px;

        &:focus {
          outline: 1px solid ${colors.primaryColor};
        }
      }
    }
    // ** Finish Search
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .table {
      border-radius: 8px;
      width: 100%;
      .chips_filter {
        margin-bottom: 10px;
        &__item {
          margin-right: 10px;
          margin-bottom: 10px;
          height: 25px;
          width: fit-content;
          padding: 1px;
          background-color: #fff;
          color: #405189;
          border: 1px solid #405189;
          text-transform: capitalize;
        }
      }
      &__TableUsers {
        max-height: 598px;
        background-color: #fff;
        border-radius: 8px;
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
        .rowHead {
          position: sticky;
          top: 0px;
          z-index: 100;
          .cellHead {
            border: 1px solid;
            background-color: #dce1f6;
            color: black;
            font-weight: bold;
            border: none;
            padding: 5px 10px;
          }
          .hold {
            position: sticky;
            left: 0;
            background-color: #405189;
            color: #fff;
          }
          .center {
            text-align: center;
          }
        }
        .rowBody {
          transition: 0.3s;
          &:nth-child(even) {
            background: #f3f3f3;
            .cellHold {
              background: #f3f3f3;
            }
          }

          &:hover {
            background-color: #d8dbe6;
            color: #000;
            cursor: pointer;
            .cellHold {
              background-color: #d8dbe6;
            }
            .buttonMenu {
              background-color: black;
            }
          }
          .cell {
            border: none;
            font-weight: bold;
            font-size: 14px;
            padding: 10px 10px;
            .menu {
              border: 5px solid;
            }
            .check {
              color: green;
            }
            .none {
              color: red;
            }
            &__statusActive {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 4px;
              border: 1px solid #1abc9c;
              border-radius: 8px;
              font-size: 12px;
              &__icon {
                color: #1abc9c;
                margin: 2px;
                font-size: 10px;
              }
            }
            &__statusInactive {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 4px;
              border: 1px solid rgb(64, 81, 137, 0.3);
              color: rgb(64, 81, 137, 0.3);
              border-radius: 8px;
              font-size: 12px;
              &__icon {
                margin: 2px;
                font-size: 10px;
              }
            }
          }
          .cellHorizontal {
            display: flex;
            flex-direction: row;
            border: none;
            font-size: 14px;
            padding: 10px;
          }
          .cellHold {
            transition: 0.3s;
            position: sticky;
            left: 0px;
            z-index: 50;
            font-weight: bold;
            background-color: #fff;
            text-transform: capitalize;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          .centerCell {
            text-align: center;
          }
          .centerAvatar {
            display: flex;
            align-items: center;
            flex-direction: column;

            .avatar {
              width: 30px;
              height: 32px;
              font-size: 14px;
              font-weight: bold;
              background-color: #405189;
            }
          }
          .buttonMenu {
            padding: 1px;
            width: 18px;
            border-radius: 5px 5px 5px 5px;
            background-color: grey;
            color: #fff;
            transition: 0.3s;
          }
        }
      }
      &__pagination {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: right;
        align-items: center;
        margin-top: 25px;
        &__title {
        }
        &__selectLimit {
          margin-right: 10px;
          border: none;
          outline: none;
          margin-bottom: -3.5px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }
        &__totalUsers {
          margin-right: 15px;
        }
        &__button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          width: 30px;
          height: 30px;
          border: none;
          background-color: #f3f3f3;
          transition: all 0.2s ease;
          margin-right: 5px;
          margin-left: 5px;
          &:hover {
            cursor: pointer;
            background-color: #dce1f6;
          }
          &[disabled] {
            background-color: transparent;
            color: #e5e8e8;
            cursor: default;
          }
          &__left {
            font-size: 16px;
            color: #0c203b;
            margin-right: -5px;
            font-weight: bold;
            transition: 0.2s;
            &__disabled {
              margin-right: -5px;
              font-size: 13px;
              color: grey;
            }
          }
          &__right {
            font-size: 16px;
            color: #0c203b;
            font-weight: bold;
            transition: 0.2s;
            &__disabled {
              font-size: 13px;
              color: grey;
            }
          }
        }
      }
      &__empty {
        display: flex;
        padding: 20px;
        justify-content: center;
      }
      &__loader {
        padding: 20px;
      }
    }
    .order-select {
      padding: 4px;
      border: 1.6px solid #103c82;
      border-radius: 8px;
      outline: none;
    }
    &__tfooter {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      &__ctr_button {
        margin-top: 10px;
        margin-bottom: 10px;
        .add_buton {
          text-transform: capitalize;
          background-color: #405189;
        }
      }
      &__ctr_pagination {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
  .ctr_drawer {
    background-color: #0c203b;
  }
`;

export const ContainerModalRejected = styled.div`
  position: absolute;
  width: 400px;
  height: auto;
  top: 40%;
  left: 40%;
  background-color: white;
  border-radius: 4px;
  font-size: 18px;
  color: gray;

  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #405189;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;

    &__loader {
      color: #fff;
    }
  }
  .dialogContainer {
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 20px;
      }
      &__select__value-container {
        height: 15px;
      }

      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__cancel {
        color: #fff;
        text-transform: capitalize;
        border: 2px solid #103c82;
        color: #103c82;
        border-radius: 2px solid;
        font-size: 14px;
        border-radius: 10px;
        background: white;
        margin-right: 11px;
        cursor: pointer;
      }
      &__acept {
        text-transform: capitalize;
        border: 2px solid;

        font-size: 14px;
        border-radius: 10px;
        color: #fff;

        background-color: #103c82;

        &:hover {
          text-transform: capitalize;
          border: 2px solid #103c82;
          color: #103c82;
          font-size: 14px;
          border-radius: 10px;
          background: white;
          cursor: pointer;
        }
      }

      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__loader {
      }
    }
    .restore {
      margin-top: 35px;
    }
  }

  .containerBody {
    padding: 0px 20px 20px 20px;
    margin-top: 20px;

    .row {
      display: flex;
      align-items: center;
      margin-top: 9px;

      svg {
        color: grey;
        margin-right: 4px;
        font-size: 15px;
      }
      p {
        font-size: 14px;
        color: grey;
      }
    }

    .content {
      font-weight: 500;
      color: black;
      font-size: 15px;
    }

    .buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
    }
  }

  select {
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 20px;
  }
  .input {
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
    height: 40px;
    border: 2px solid #f3f3f3;
    color: #000;
  }
`;
export const ContainerModalImportant = styled.div`
  position: absolute;
  width: 400px;
  height: auto;
  top: 40%;
  left: 40%;
  background-color: white;
  border-radius: 4px;
  font-size: 18px;
  color: gray;

  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #405189;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
    &__loader {
      color: #fff;
    }
  }
  .containerBody {
    padding: 0px 20px 20px 20px;
    margin-top: 20px;

    .row {
      display: flex;
      align-items: center;
      margin-top: 9px;

      svg {
        color: grey;
        margin-right: 4px;
        font-size: 15px;
      }
      p {
        font-size: 14px;
        color: grey;
      }
    }

    .content {
      font-weight: 500;
      color: black;
      font-size: 15px;
    }

    .buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
    }
  }

  .text_input {
    color: black;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  .dialogContainer {
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 20px;
      }
      &__select__value-container {
        height: 15px;
      }

      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__cancel {
        color: #fff;
        text-transform: capitalize;
        border: 2px solid #103c82;
        color: #103c82;
        border-radius: 2px solid;
        font-size: 14px;
        border-radius: 10px;
        background: white;
        margin-right: 11px;
        cursor: pointer;
      }
      &__acept {
        text-transform: capitalize;
        border: 2px solid;

        font-size: 14px;
        border-radius: 10px;
        color: #fff;

        background-color: #103c82;

        &:hover {
          text-transform: capitalize;
          border: 2px solid #103c82;
          color: #103c82;
          font-size: 14px;
          border-radius: 10px;
          background: white;
          cursor: pointer;
        }
      }

      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__loader {
      }
    }
    .restore {
      margin-top: 35px;
    }
  }
`;

export const ContainerModal = styled.div`
  position: absolute;
  width: 400px;
  height: auto;
  top: 40%;
  left: 40%;
  background-color: white;
  border-radius: 4px;
  font-size: 18px;
  color: gray;

  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #405189;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
    &__loader {
      color: #fff;
    }
  }

  .buttons {
    position: relative;
    top: 30px;
    left: 180px;
  }

  .buttons-restore {
    position: relative;
    top: 90px;
    left: 180px;
  }

  .text_input {
    color: black;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  .descarted_input {
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
    height: 40px;
    border: 2px solid #f3f3f3;
    color: #000;
  }
  .containerBody {
    padding: 0px 20px 0px 20px;
    margin-top: 20px;
  }
  .containerBodyRestore {
    padding: 10px;
    display: flex;
    justify-content: end;
  }
  .titleNameRestore {
    margin-top: 34px;
    padding: 10px;
  }
  .dialogContainer {
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 20px;
      }
      &__select__value-container {
        height: 15px;
      }

      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__cancel {
        color: #fff;
        text-transform: capitalize;
        border: 2px solid #103c82;
        color: #103c82;
        border-radius: 2px solid;
        font-size: 14px;
        border-radius: 10px;
        background: white;
        margin-right: 11px;
        cursor: pointer;
      }
      &__acept {
        text-transform: capitalize;
        border: 2px solid;

        font-size: 14px;
        border-radius: 10px;
        color: #fff;

        background-color: #103c82;

        &:hover {
          text-transform: capitalize;
          border: 2px solid #103c82;
          color: #103c82;
          font-size: 14px;
          border-radius: 10px;
          background: white;
          cursor: pointer;
        }
      }

      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__loader {
      }
    }
    .restore {
      margin-top: 35px;
    }
  }
`;
