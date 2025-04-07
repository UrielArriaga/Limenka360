import styled from "styled-components";
import { colors } from "../global.styles";
export const UsuariosStyle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  .main_container {
    display: flex;
    flex-direction: column;
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;
    /* margin-top: 60px; */
    .contenido {
      width: calc(100% - 35px);
      margin: auto;
      margin-top: 25px;
      margin-bottom: 20px;
      height: fit-content;
      padding: 30px 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      border: 1px solid rgb(213, 219, 219, 0.9);
      .headerUser {
        display: flex;
        align-items: center;
        &__text {
          width: 100%;
          display: flex;
          align-items: center;
          &__titleUsers {
            font-size: 28px;
            font-weight: bold;
          }
          &__totalUsers {
            margin-left: 5px;
            margin-top: 4px;
          }
          &__icon {
            font-size: 30px;
            margin-right: 10px;
          }
        }
        &__button {
          padding: 10px;
          display: flex;
          justify-content: right;
        }
        .addUser {
          border: 1px solid #405189;
          background-color: #405189;
          color: #fff;
          font-size: 12px;
          border-radius: 8px;
          padding: 8px 20px;
          width: fit-content;
          text-transform: capitalize;
          &:hover {
            background-color: #fff;
            color: #405189;
          }
          &__icon {
            margin-top: -3px;
            margin-right: 10px;
            font-size: 18px;
          }
        }
      }
      .filters {
        margin: 14px 0px 25px 0px;
        width: 100%;
        display: flex;
        .filterButton {
          padding-left: 10px;
          height: 45px;
          border-radius: 10px 0px 0px 10px;
          color: grey;
          border-top: 1px solid #d5dbdb;
          border-bottom: 1px solid #d5dbdb;
          border-left: 1px solid #d5dbdb;
          border-right: 1px solid transparent;
          text-transform: capitalize;
          font-size: 35px;
          transition: 0.2s;
          &:hover {
            color: black;
            cursor: pointer;
          }
        }
        .inputText {
          width: 100%;
          font-size: 15px;
          height: 45px;
          padding-left: 10px;
          background-color: #fff;
          border-radius: 0px;
          border-top: 1px solid #d5dbdb;
          border-bottom: 1px solid #d5dbdb;
          border-left: none;
          border-right: none;
          outline: none;
        }
        .clear {
          height: 45px;
          border-top: 1px solid #d5dbdb;
          border-bottom: 1px solid #d5dbdb;
          background-color: #fff;
          transition: 0.2s;
          &:hover {
            cursor: pointer;
            color: red;
          }
        }
        .arrayOptions {
          padding-right: 10px;
          padding-left: 10px;
          height: 45px;
          border-radius: 0px 10px 10px 0px;
          color: grey;
          border-top: 1px solid #d5dbdb;
          border-bottom: 1px solid #d5dbdb;
          border-left: 1px solid transparent;
          border-right: 1px solid #d5dbdb;
          text-transform: capitalize;
          font-size: 45px;
          transition: 0.2s;
          &:hover {
            color: black;
            cursor: pointer;
          }
        }
      }
      .options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fae0e9;
        padding: 10px 25px;
        width: inherit;
        min-height: 40px;
        &__selected {
          display: flex;
          align-items: center;
          .total_number {
            font-size: 20px;
            font-weight: bold;
            color: #f7367b;
            margin-right: 10px;
          }
          .span {
            font-weight: bold;
            color: #f7367b;
          }
        }
        &__actions {
          display: flex;
          align-items: center;
          .delete {
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            justify-content: center;
            border-radius: 50%;
            svg {
              transition: all 0.3s ease;
              color: #73676b;
            }
            &:hover {
              cursor: pointer;
              background: #fa7fab;
              width: 40px;
              height: 40px;
              justify-content: center;
              border-radius: 50%;
              svg {
                color: #fff;
              }
            }
          }
          .options {
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            justify-content: center;
            border-radius: 50%;
            svg {
              transition: all 0.3s ease;
              color: #73676b;
            }
            &:hover {
              cursor: pointer;
              background: #fa7fab;
              width: 40px;
              height: 40px;
              justify-content: center;
              border-radius: 50%;
              svg {
                color: #fff;
              }
            }
          }
        }
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
              padding: 12px 10px;
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
              justify-content: center;
              .initials {
                text-align: center;
                font-size: 14px;
                padding: 3px;
                border-radius: 5px;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                background-color: rgb(220, 225, 246, 0.8);
              }
              .avatarEmpty {
                margin-left: 35%;
                width: 30px;
                height: 32px;
                font-size: 14px;
                background-color: rgb(188, 199, 245, 0.9);
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
    }
  }
`;
export const DraweFilters = styled.div`
  width: 270px;
  .headFilters {
    padding: 20px 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleHead {
      font-weight: bold;
    }
    .iconHead {
      color: red;
      transition: 0.3s;
      font-size: 25px;
      &:hover {
        border-radius: 50%;
        background-color: red;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .contenido {
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
    align-items: center;
    .headSelect {
      font-size: 15px;
      margin-top: -7px;
    }
    .select {
      width: 98%;
      font-size: 15px;
      height: 40px;
      margin-bottom: 30px;
    }
    .buttonsFilter {
      &__clean {
        background-color: #e74c3c;
        color: #fff;
        margin-right: 5px;
        text-transform: capitalize;
        border: 1px solid #e74c3c;
        border-radius: 8px;
        font-size: 12px;
        &:hover {
          color: #e74c3c;
          background-color: #fff;
          border: 1px solid #e74c3c;
        }
      }
      &__apply {
        background-color: #405189;
        color: #fff;
        margin-left: 5px;
        text-transform: capitalize;
        border: 1px solid #405189;
        border-radius: 8px;
        font-size: 12px;
        &:hover {
          color: #405189;
          background-color: #fff;
          border: 1px solid #405189;
        }
      }
    }
  }
`;
export const DrawerUser = styled.div`
  width: 400px;
  overflow-y: auto;
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
  .contenido {
    .header {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;

      &__options {
        width: 90%;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        background-color: #dce1f6;
        &__btData {
          width: 50%;
          padding: 8px 0px;
          border-radius: 10px;
          text-align: center;
          border: none;
          color: grey;
          background-color: none;
          &:hover {
            cursor: pointer;
          }
        }
        &__btPermi {
          width: 50%;
          padding: 8px 0px;
          border-radius: 20px;
          text-align: center;
          border: none;
          color: grey;
          background-color: none;
          transition: 0.3s;
          &:hover {
            cursor: pointer;
          }
        }
        &__active {
          width: 50%;
          padding: 8px 0px;
          border-radius: 20px;
          text-align: center;
          border: none;
          background-color: #405189;
          color: #fff;
          transition: 0.3s;
        }
      }
      &__back {
        height: 20px;
      }
      &__iconUser {
        color: #405189;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 65px;
      }
    }
    .information {
      margin-top: 20px;
      padding: 10px 8px 10px 25px;
      .information_item {
        margin-bottom: 25px;
        &__title {
          color: grey;
          font-size: 13px;
          &__icon {
            font-size: 15px;
            margin-bottom: -3px;
          }
        }
        &__content {
          font-size: 14px;
          font-weight: bold;
          text-transform: capitalize;
        }
        &__email {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .permit {
      margin-top: 20px;
      padding: 10px 8px 10px 25px;
      .permit_item {
        margin-bottom: 20px;
        &__title {
          display: flex;
          align-items: center;
          color: grey;
          font-size: 13px;
        }
        &__content {
          font-size: 14px;
          font-weight: bold;
          text-transform: capitalize;
        }
        &__email {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .acces {
      margin-top: 20px;
      padding: 10px 8px 10px 25px;
      &__prospects {
        .acces_item {
          margin-bottom: 20px;
          &__title {
            display: flex;
            align-items: center;
            color: grey;
            font-size: 13px;
            &__sub {
              margin-top: 10px;
              display: flex;
              align-items: center;
              color: grey;
              font-size: 13px;
              &__icon {
                margin-left: 3px;
                font-size: 15px;
              }
            }
          }
          &__content {
            margin-top: 10px;
            margin-left: 20px;
            font-size: 14px;
            font-weight: bold;
            text-transform: capitalize;
          }
          &__email {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      &__interaction {
        margin-top: 20px;
        .acces_item {
          margin-bottom: 20px;
          &__title {
            display: flex;
            align-items: center;
            color: grey;
            font-size: 13px;
            &__sub {
              display: flex;
              align-items: center;
              margin-top: 10px;
              color: grey;
              font-size: 13px;
              &__icon {
                margin-left: 3px;
                font-size: 15px;
              }
            }
          }
          &__content {
            margin-top: 10px;
            margin-left: 20px;
            font-size: 14px;
            font-weight: bold;
            text-transform: capitalize;
          }
          &__email {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
export const Menu = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  .contenido {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      transition: 0.3s;
      background-color: #011c40;
      color: #fff;
      padding: 5px;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        color: black;
        background-color: #fff;
      }
      .icon {
        font-size: 18px;
      }
      .menuItem {
        padding: 0px 12px;
      }
    }
  }
  .arrow {
  }
`;
export const EditUser = styled.div`
  padding: 10px;

  .headerUser {
    padding: 5px 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      font-weight: bold;
    }
    &__icon {
      color: #b8b8b8;
      width: 30px;
      height: 30px;
      transition: 0.2s;
      &:hover {
        color: red;
      }
    }
  }
  .containerUser {
    display: flex;
    flex-direction: column;
    align-items: center;
    .stepperUser {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 30px;

      &__stepp {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
        &__icon {
          font-size: 25px;
          border: 1px solid;
          padding: 2px;
          border-radius: 50%;
          color: #b8b8b8;
        }
        .iconActive {
          background-color: #405189;
          color: #fff;
        }

        &__title {
          color: #b8b8b8;
          font-size: 13px;
        }
        .active {
          color: black;
          font-weight: 600;
        }
      }
      &__bar {
        width: 30%;
        border-radius: 15px;
      }
    }
    .mainUser {
      padding: 5px 10px;
      min-height: 380px;
      max-height: 380px;
      overflow-y: auto;
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
      .formUser {
        .titleA {
          font-size: 13px;
        }
        .selectAccess {
          background-clip: padding-box;
          background-color: #fff;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        &__title {
        }
        &__input {
          width: 100%;
          border: 1px solid #d6dbdf;
          outline: none;
          margin-top: 5px;
          padding: 5px;
          border-radius: 3px;
        }
        &__icon {
          font-size: 18px;
          color: #b8b8b8;
          transition: 0.3s;
          margin-bottom: -5px;
          &:hover {
            cursor: pointer;
          }
        }
        .headAccessItem {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .titleAccess {
            font-size: 13px;
          }
          .iconHeadAccess {
            margin-right: 5px;
            .iconPerson {
              font-size: 25px;
            }
            .iconLock {
              margin-left: -15px;
              font-size: 12px;
              color: red;
            }
          }
          .iconPersons {
            font-size: 25px;
          }
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }
      .formButtons {
        display: flex;
        justify-content: right;
        padding: 10px;
        margin-top: 20px;
        &__submit {
          height: 35px;
          text-transform: capitalize;
          border: 1px solid #405189;
          background-color: #405189;
          color: #fff;
          border-radius: 10px;
          margin-left: 5px;
          &:hover {
            border: 1px solid #405189;
            background-color: #fff;
            color: #405189;
          }
        }
        &__cancel {
          height: 35px;
          text-transform: capitalize;
          border: 1px solid #e74c3c;
          background-color: #e74c3c;
          color: #fff;
          margin-right: 5px;
          border-radius: 10px;
          &:hover {
            background-color: #fff;
            border: 1px solid #e74c3c;
            color: #e74c3c;
          }
        }
      }
    }
    .requiredAlert {
      font-size: 12px;
      color: red;
      position: relative;
    }
  }
  .alert {
    position: fixed;
    top: 120px;
    width: 300px;
    right: 10px;
    z-index: 1;
  }
`;
export const DeleteUser = styled.div`
  .buttons {
    display: flex;
    justify-content: center;
    &__accept {
      height: 32px;
      margin-left: 5px;
    }
    &__cancel {
      height: 32px;
      margin-right: 5px;
    }
  }
`;
