import styled from "styled-components";
import { Drawer, Dialog, Paper, Popover } from "@material-ui/core";
import { colors, device } from "../../global.styles";
import { Skeleton } from "@material-ui/lab";
export const PedidosStyle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }

  .order-select {
    padding: 4px;
    border: 1.6px solid #103c82;
    border-radius: 8px;
    outline: none;
  }
  .footer {
    display: block;
    @media ${device.sm} {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    margin-top: 6px;

    .pagination {
      display: flex;
      align-items: center;
    }
    .total {
      margin-right: 5px;
      font-size: 14px;
      color: rgb(97, 97, 97);
      font-weight: 500;
    }
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 10px; */
    &__title {
      font-size: 14px;
      margin-bottom: 10px;
      .containerTitle {
        display: flex;
        align-items: initial;
        .min {
          text-align: center;
          margin-left: 8px;
          .bg {
            background-color: rgb(255, 255, 255);
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            background-color: #dce1f6;
            display: flex;
            align-items: center;
            padding: 2px;
            border-radius: 5px;
            .reloadIcon {
              font-size: 15px;
              margin-right: 5px;
              color: #103c82;
              cursor: pointer;
            }
          }
        }
      }
      .total {
        display: flex;
        align-items: center;
        font-weight: 500;
        svg {
          font-size: 14px;
          margin-right: 5px;
          color: #103c82;
          cursor: pointer;
        }
        .reload {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .MuiBadge-badge {
        top: 5px;
        height: 15px;
        font-size: 0.6rem;
      }
    }
    .filters {
      display: flex;
      flex-direction: row-reverse;
    }

    .container_dates {
      transition: 0.4s;
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      .date_container {
        font-weight: 500;
        font-size: 13px;
        .input_date {
          outline: none;
          border-width: 0px 0px 1px 0px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
      }
    }
    .show {
      width: 240px;
    }
    .hidden {
      width: 0px;
      overflow: hidden;
    }
    .button_filter {
      background-color: #3f51b5;
      color: #fff;
      text-transform: capitalize;
      font-size: 12px;
      border: 1px solid #3f51b5;
      &:hover {
        background-color: #fff;
        color: #3f51b5;
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
  .main {
    width: calc(100% - 0px);
    height: calc(100vh - 60px);
    overflow-y: auto;
  }

  .total_cards {
    margin-bottom: 10px;
    .filters {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .ranges {
    display: flex;
    justify-content: end;
    margin-top: -14px;
  }
  .red_text {
    color: #ff0000;
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
          padding-right: 70px;
        }
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
        border-radius: 10px;
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
          transition: all 0.4s ease;
        }
        .text {
          font-size: 12px;
        }
        &:hover .filters {
          padding: 3px;
        }
      }
    }
  }

  .filters_chip {
    display: flex;
    width: 100%;
    flex-direction: row;
    overflow: auto hidden;
    padding: 5px 0px;
    margin-bottom: 10px;
    .chip {
      /* text-transform: capitalize; */
      margin-right: 5px;
    }
  }
  .filtersDates {
    margin-bottom: 7px;
  }
  .search {
    margin-bottom: 10px;
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
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 5%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
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
    @keyframes slide_img {
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
  .ctr_prospects {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 15px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
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
    position: relative;
  }
`;

export const DrawerContainer = styled(Drawer)`
  /* backdrop-filter: blur(2px); */
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
      background-color: none;
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
    padding-bottom: 60px;

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
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 25%;
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
        margin-left: 45%;
        display: flex;
        margin-right: 5%;
        font-size: 18px;
        opacity: 0.9;
        margin-top: 2%;
        margin-block-end: 5%;
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
`;
export const DialogContainer = styled(Dialog)`
  * {
    margin: 0;
    padding: 0;
  }
  .MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
  label {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
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
    margin-top: 20px;
  }
  .DialogText {
    margin-top: 14px;
    margin-bottom: 0;
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
  }
  .buttons {
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
    .acept {
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
    &:focus {
      outline: none;
      border: 2px solid #405189;
    }
  }
`;
export const DialogFullScreen = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 100%;
    background: #f3f3f3;
    min-height: 100vh;
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
  .ctr_edit {
    &__header {
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 60px;
      background-color: #103c82;

      &__close {
        display: flex;
        align-items: center;
        .title {
          font-weight: bold;
          color: #fff;
          font-size: 20px;
        }
        .close {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .btn_save {
        text-transform: capitalize;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
    }
    &__ctr_info {
      width: 100%;
      max-width: 1300px;
      margin: auto;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      margin-bottom: 20px;
      height: calc(100% - 100px);
      border-radius: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &__title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;

        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          padding: 5px;
          border-radius: 50%;
          background: rgba(16, 60, 130, 0.5);
          color: #fff;
        }
        span {
          font-weight: bold;
          color: #103c82;
          text-transform: capitalize;
          margin-left: 5px;
        }
      }

      .form {
        .ContentTitleandAlert {
          display: flex;
        }

        .item {
          display: flex;
          align-content: center;
          flex-direction: column;
          font-size: 15px;
          width: auto;
          padding: 5px 9px;

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
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            height: 38px;
          }
          .capitalize {
            text-transform: capitalize;
          }
          .inputComments {
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
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            height: 25px;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }

          p {
            margin-bottom: 2px;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 1px;
            color: rgb(86 86 86);
          }
          strong {
            color: red;
          }
        }
        .ctr_buttons {
          display: flex;
          justify-content: end;
          margin-top: 20px;

          .btn_cancel {
            background: #0c203b;
            color: #fff;
            text-transform: capitalize;
            margin-right: 10px;
          }
          .btn_upload {
            background: #103c82;
            color: #fff;
            text-transform: capitalize;
          }
        }
        .point {
          width: 0;
          height: 0;
          border-top: 13px solid transparent;
          border-bottom: 13px solid transparent;
          border-right: 13px solid rgba(241, 113, 113, 0.9);
          height: 27px;
          float: left;
        }
      }
    }
  }
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 100%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;

export const ContainerModalRejected = styled.div`
  position: absolute;
  width: 600px;

  height: auto;
  top: 30%;
  left: 30%;
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

export const MenuFilterCards = styled(Popover)`
  display: flex;
  flex-direction: column;
  .item {
    .option {
      width: 100%;
      text-transform: capitalize;
      font-size: 12px;
      &:hover {
        background-color: #3f51b5;
        border-radius: 0%;
        color: #fff;
      }
    }
    .selected {
      background-color: #3f51b5;
      border-radius: 0%;
      color: #fff;
    }
  }
`;

export const TotalOrders = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #3f51b5;
  .title {
    display: flex;
    align-items: center;
    color: #3f51b5;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
`;

export const OrdersApproved = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #00c853;

  .title {
    display: flex;
    align-items: center;
    color: #00c853;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const OrdersDenied = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #ff0000;
  .title {
    display: flex;
    align-items: center;
    color: #ff0000;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const OrdersPending = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #ffa500;
  .title {
    display: flex;
    align-items: center;
    color: #ffa500;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;
