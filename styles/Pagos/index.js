import styled from "styled-components";
import { Drawer } from "@material-ui/core";
export const OportinitiesStyled = styled.div`
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
    height: 30px;
    margin-bottom: 10px;
    .chip {
      text-transform: capitalize;
      margin-right: 5px;
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
export const Field = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  margin-top: 20px;

  select {
    margin-top: 10px;
    height: 35px;
    border-radius: 5px;
  }

  .radioContainer {
    display: grid;
    grid-template-columns: 30px auto 30px auto;
    margin-top: 10px;

    input {
      width: 15px;
    }
  }

  .switch {
    display: grid;
    grid-template-columns: auto 50px;
    p {
      margin-top: 5px;
    }
  }

  .rangeOfDate {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-bottom: 10px;
    margin-top: 3px;

    p {
      color: rgba(0, 0, 0, 0.7);
    }

    input {
      width: 99%;
      height: 35px;
      padding-left: 8px;
      color: rgba(0, 0, 0, 0.7);
      border: 1px solid #c8c8c8;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
        Helvetica Neue, sans-serif;
    }
  }

  .orderInput {
    display: grid;
    grid-template-columns: 20px auto;
    margin-top: 5px;
    input {
      width: 15px;
    }
  }
`;
export const ContainerPagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;
export const ChipsContainer = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  min-height: 50px;

  .chip {
    margin: 1px;
  }
`;
export const FiltersPayments = styled(Drawer)`
  background-color: none;
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
          &__iconOrder {
            margin-left: 5px;
            margin-bottom: -4px;
            font-size: 17px;
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
    &__orderBy {
      display: flex;
      &__content {
        display: flex;
        align-items: center;
        transition: 0.3s;
        color: #103c82;
        &:hover {
          cursor: pointer;
        }
        &__iconFilterBy {
          font-size: 15px;
          margin-left: 5px;
          margin-bottom: -1px;
        }
        &__title {
          font-size: 13px;
        }
      }
    }
    &__ctr_buttons {
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
    &__alert {
      border: 1px solid;
      border-radius: 6px;
      padding: 3px;
      margin-top: 10px;
      color: #ff4848;
      background-color: rgb(255, 72, 72, 0.2);
      font-weight: 400;
      display: flex;
      align-items: center;
      font-size: 15px;
      &__icon {
        margin-right: 5px;
        font-size: 22px;
      }
    }
    &__showRangeDate {
      display: flex;
      justify-content: space-between;
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 4px;
      padding: 8px;
      &:hover {
        cursor: pointer;
        background-color: hsl(0, 0%, 100%);
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
