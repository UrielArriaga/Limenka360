import { customWidth, device } from "../global.styles";
import styled, { css } from "styled-components";
import { Dialog, Drawer, Grid } from "@material-ui/core";
export const ShowProducts = styled(Dialog)`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0d47a1;
    color: white;

    &__title {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
    &__icon {
      color: #f3f3f3;
    }
  }
  .contenido {
    flex: 1 1 auto;
    padding: 8px 24px;
    overflow-y: auto;
    height: 396px;
    width: 429px;

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
    .item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 5px;
      .icon {
        color: #3f51b5;
        font-size: 16px;
      }
      .iconStatus {
        color: #3f51b5;
        font-size: 16px;
      }
      .date {
        font-size: 12px;
        font-weight: bold;
        color: #0c203b;
      }
      .capitalize {
        text-transform: capitalize;
      }
    }
    .sale {
      /* display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center; */

      border-radius: 13px;
      width: 100%;
      padding: 7px;
      margin-bottom: 15px;
      &__infoName {
        display: flex;
        flex-direction: column;
        &__title {
          font-weight: 500;
          font-size: small;
          color: rgba(64, 123, 254, 1);
        }
        &__info {
          font-weight: 500;
          font-size: 14px;
        }
      }
      .amount {
        /* display: flex;
        margin-left: 15px; */
        &__infoPrice {
          &__title {
            font-size: 12px;
            white-space: nowrap;
            font-weight: 500;
            font-size: small;
            color: rgba(64, 123, 254, 1);
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
        &__infoQuantity {
          &__title {
            font-size: 12px;
            font-weight: 500;
            font-size: small;
            color: rgba(64, 123, 254, 1);
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
      }

      .buttonSale {
        display: flex;
        align-items: end;
        align-items: end;
        justify-content: end;
        .OrderButton {
          height: 25px;
          text-transform: capitalize;
          border: 2px solid #103c82;
          background: #103c82;
          border-radius: 2px solid;
          font-size: 12px;
          border-radius: 10px;
          color: white;
        }
        .OrderButtonDisabled {
          height: 25px;
          text-transform: capitalize;
          background: rgb(0 0 0 / 20%);
          border-radius: 2px solid;
          font-size: 12px;
          border-radius: 10px;
        }
      }
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
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
  }
  .containerBody {
    padding: 0px 20px 0px 20px;
    margin-top: 42px;

    span {
      font-weight: 500;
    }
  }
  .alert {
    color: #0d47a1;
    font-weight: bold;
    font-size: 15px;
    text-align: justify;
  }
  .list {
    display: flex;
  }

  .buttons-restore {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 17px;

    .cancel {
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
    .accept {
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
  }
`;
export const ContainerModalDiscard = styled.div`
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

  .alert {
    /* color: #fefefefe; */
    color: #0d47a1;
    font-weight: bold;
    font-size: 15px;
    text-align: justify;
  }
  .list {
    display: flex;
  }
  .buttons {
    position: relative;
    top: 30px;
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
  }
`;
export const ClientesStyled = styled.div`
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
    /* width: calc(100% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px; */
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
      }
    }
    .btn_add {
      padding: 10px 15px;
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      border-radius: 10px;
      svg {
        width: 15px;
        height: 15px;
        /* font-size: 25px; */
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 2px;
        margin-right: 5px;
      }
    }
  }
  .filters_chip {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 5px 0px;
    margin-bottom: 10px;
  }
  .chip {
    text-transform: capitalize;
    margin-right: 5px;
  }
  .order-select {
    padding: 4px;
    border: 1.6px solid #103c82;
    border-radius: 8px;
    outline: none;
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
          padding-right: 70px;
          padding-left: 40px;
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
      .ctr_filters {
        display: flex;
        align-items: center;
        position: absolute;
        right: 10px;
        color: #8a8a8a;
        cursor: pointer;
        .filters {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 20px;
          transition: all 0.4s ease;
        }
        .text {
          font-size: 12px;
        }
        &:hover .filters {
          padding: 3px;
        }
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

  .ctr_clients {
    width: calc(100% - 30px);
    margin: auto;

    margin-top: 26px;
    margin-bottom: 20px;
    min-height: calc(100% - 50%);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
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
          margin-left: 10px;
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
        &__pagination {
          display: flex;
          align-items: center;
          .before {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background: #f3f3f3;
            border-radius: 8px;
            margin-right: 5px;
            margin-left: 10px;
            color: #0c203b;
            border: none;
            transition: all 0.2s ease;
            &:hover {
              cursor: pointer;
              background: #dce1f6;
            }
          }
          .next {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background: #f3f3f3;
            border-radius: 8px;
            margin-left: 5px;
            color: #0c203b;
            border: none;
            transition: all 0.2s ease;
            &:hover {
              cursor: pointer;
              background: #dce1f6;
            }
          }
        }
      }
    }
  }
  .ctr_drawer {
    background-color: #0c203b;
  }
`;
export const DrawerContainer = styled(Drawer)`
  background-color: none;

  /* backdrop-filter: blur(2px); */
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 36%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }

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
  .ctr_drawer {
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .title {
        font-weight: bold;
      }

      .close_icon {
        color: #8a8a88;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          color: #f50;
        }
      }
    }
    &__ctr_inputs {
      transition: all 0.4s ease;
      margin-bottom: 20px;
      &__input {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        .label {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 5px;
          display: flex;
          &__iconOrder {
            margin-left: 5px;
            margin-bottom: -4px;
            font-size: 24px;
            color: #103c82;
            &:hover {
              cursor: pointer;
            }
          }
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
          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
          }
        }
        /* .ranges {
          display: flex;

          .dateTwo {
            margin-left: 5px;
            width: 100%;
          }
          .dateTwo {
            margin-left: 5px;
            width: 100%;
          }
        } */
        &__with_icon {
          display: flex;
          align-items: center;
          svg {
            width: 40px;
            height: 40px;
            padding: 8px;
          }
        }
      }
    }
    &__ctr_buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 5%;
      .btn_cancel {
        background: #0c203b;
        margin-right: 10px;
        color: #fff;
        text-transform: capitalize;
      }
      .btn_apply {
        background: #405189;
        color: #fff;
        text-transform: capitalize;
      }
    }

    .container {
      display: flex;
      margin-left: 0%;
      margin-top: 10%;
      width: 90%;

      .casilla {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-block-end: 5%;
        margin-left: 5%;

        .checkBox {
          display: flex;
          transform: scale(1.5);
        }

        .label2 {
          display: flex;
          font-size: 18px;
          opacity: 0.9;
        }

        .icon {
          margin-right: 1%;
          font-size: 30px;
          color: #103c82;
        }
      }
      .label3 {
        margin-left: 8%;
        display: flex;
        margin-right: 5%;
        font-size: 18px;
        opacity: 0.9;
        margin-top: 2%;
      }
      .select2 {
        display: flex;
        margin-left: 8%;
        margin-top: 3%;
        width: 95%;
        height: 40px;
        border: 2px solid #f3f3f3;
        color: #000;
        text-transform: capitalize;
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        margin-block-end: 15%;
        text-align: left;
        &:focus {
          outline: none;
          border: 2px solid #405189;
        }
      }
    }
  }

  .switch_txt {
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
export const AlertDate = styled.div`
  background-color: rgb(255, 20, 0, 0.2);
  border-radius: 5px;
  margin-top: 2px;
  .alert_title {
    padding: 5px;
    font-weight: 500;
    color: #b53232;
    font-size: 12px;
    text-align: center;
    display: block;
  }
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  @media ${device.sm} {
    width: 100%;
  }
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  height: 50px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
