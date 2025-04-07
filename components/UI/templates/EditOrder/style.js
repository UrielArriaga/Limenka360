import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
export const SeeOrderContainer = styled.div`
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
    .contenido_pedidos {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .head_Orders {
        display: flex;
        align-items: center;
        .title {
          display: grid;
          grid-template-columns: 35px auto;
          margin-bottom: 15px;
          p {
            letter-spacing: 0.04em;
            margin-bottom: 15px;
            font-size: 22px;
            font-weight: bold;
          }
          button {
            height: 30px;
            width: 30px;
            border-radius: 50px;
            border-width: 0px;
            background-color: #407aff;
          }
          .icon {
            color: #fff;
          }
        }
      }
      .orderView {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .view {
          font-size: 14px;
          color: #82b1ff;
          font-weight: 500;
          cursor: pointer;
        }
      }
      .order {
        &__title {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 20px;
        }
      }
      .order__head__item {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        -webkit-letter-spacing: 1px;
        -moz-letter-spacing: 1px;
        -ms-letter-spacing: 1px;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 500px;
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
  }
  .divider {
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1.5px solid #f3f3f3;
  }
  .information {
    margin-bottom: 30px;
    .alertRequest {
      display: flex;
      align-items: center;
      width: fit-content;
      border-radius: 8px;
      padding: 3px;

      &__title {
        font-size: 13px;
        color: #d32f2f;
        font-weight: 500;
      }
      &__icon {
        color: #d32f2f;
        font-size: 18px;
        margin-right: 8px;
      }
    }
    &__title {
      font-size: 20px;
      font-weight: 500;
    }
    &__container {
      margin-bottom: 35px;
    }

    &__primarySales {
      display: flex;
      align-items: center;
      &__icon_primary {
        width: 30px;
        height: 30px;
        padding: 5px;

        background: #dce1f6;
        color: #103c82;
        border-radius: 50%;
      }
      p {
        font-size: 18px;
        letter-spacing: 0.04em;
        font-weight: 600;
        color: rgb(86 86 86);
      }
    }
    .primary {
      display: flex;
      align-items: center;
      padding: 5px 1px 0px 11px;
      p {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }
      label {
        margin-left: 2px;
      }
    }
    .itemGlobal {
      display: flex;
      align-content: center;
      flex-direction: column;
      font-size: 15px;
      width: auto;
      padding: 5px 1px 0px 11px;
      .ContentTitleandAlert {
        display: flex;
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
      .inputDisabled {
        background-clip: padding-box;
        background-color: #eeeeee;
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
    &__head {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      &__item {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }

      &__capitalize {
        font-size: 14px;
        font-weight: bold;
      }
      &__products {
        display: flex;
        align-items: center;
      }

      &__iconsView {
        padding: 0px 0px 0px 9px;
        color: #0d47a1;
      }

      &__show {
        padding: 0px 14px 14px 10px;
        cursor: pointer;
        color: #3f51b5;
      }
      &__buttons {
        display: flex;
        margin-top: 30px;
        justify-content: right;
        align-items: center;
        &__saveChanges {
          text-transform: capitalize;
          color: #fff;
          background-color: #103c82;
          margin-left: 5px;
          border-radius: 8px;
          &:hover {
            background-color: #0c203b;
          }
        }
        &__cancel {
          text-transform: capitalize;
          color: #fff;
          background-color: #0c203b;
          border-radius: 8px;
          &:hover {
            background-color: #103c82;
          }
        }
        &__loader {
          color: #103c82;
          height: 50px;
          margin-right: 100px;
        }
      }
    }
  }
  .button_add {
    text-transform: capitalize;
    background-color: #ffffff;
    color: #103c82;
    margin-left: 5px;
    border-radius: 8px;
    height: 25px;
    margin-top: 15px;
  }
  .button_addShipping {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    color: #103c82;
    border: 1px solid #103c82;
    border-radius: 8px;
    font-size: 12px;
    margin: 2px 5px;
    svg {
      font-size: 17px;
    }
  }
`;
export const ShowProducts = styled(Dialog)`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
    &__icon {
      color: red;
    }
  }
  .contenido {
    .product {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 7px;
      margin-bottom: 15px;
      &__infoName {
        display: flex;
        flex-direction: column;
        &__title {
          font-size: 12px;
        }
        &__info {
          font-weight: 500;
          font-size: 14px;
        }
      }
      .quantities {
        display: flex;
        margin-left: 15px;
        &__infoPrice {
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
            white-space: nowrap;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
        &__infoQuantity {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
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

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;

export const TableProducts = styled.div`
  .totalcontainer {
    display: flex;
    justify-content: flex-end;
    /* background-color: red; */
    &__items {
      padding: 10px;
    }
    &__item {
      display: flex;

      .text {
        margin-right: 10px;
        width: 200px;
      }
      .bold {
        font-weight: bold;
      }
    }
  }
  overflow: auto;
  /* margin-top: 20px; */
  margin-bottom: 20px;
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  border-radius: 9px;
  max-height: 70vh;
  table {
    width: 100%;
    border-spacing: 0;
    /* max-height: 70vh;
    overflow-x: auto; */
    transition: all 0.3s ease;

    /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
    .ctr_table {
      border-spacing: 0;
      margin: auto;
      width: inherit;
      &__head {
        position: sticky;
        top: 0;
        z-index: 50;
        &__tr {
          background-color: #dce1f6;
          padding: 5px 10px;
          height: 40px;
          .fixed {
            /* position: sticky;
            left: 0;
            top: 0; */
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;
            background-color: #405189;
            color: #fff;
            min-width: 350px;
            height: inherit;
            .MuiFormControlLabel-root {
              margin-right: 5px;
            }
            @media (max-width: 600px) {
              min-width: 80px;
            }
          }
          .fix {
            position: sticky;
            left: 0;
            top: 0;
            background-color: #dce1f6;
          }
          .fixedlast {
            position: sticky;
            right: 0;
            top: 0;
            background: #dce1f6;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;

            min-width: 10px;
            height: inherit;
            width: 40px;
          }
          .title {
            text-transform: capitalize;
            padding: 0 10px;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
              /* min-width: 150px; */
            }
          }
        }
      }
      &__body {
        .row {
          background: #fff;
          font-weight: bold;
          color: #2c2c2c;
          transition: all 0.3s ease;
          min-height: 50px;

          .fixed {
            position: sticky;
            left: 0;
            background: #fff;
            transition: all 0.3s ease;
          }

          .fixedlast {
            position: sticky;
            right: 0;
            background: #fff;
            transition: all 0.3s ease;
            svg {
              color: #103c82;
              &:hover {
                color: #a31c24;
              }
            }
          }
          .data {
            font-size: 14px;
            padding: 0 10px;
            cursor: pointer;
            .text {
              display: flex;
              align-items: center;
              svg {
                font-size: 14px;
                margin-right: 5px;
                color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
              }
            }
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;
            }
          }
          .dataDrag {
            font-size: 14px;
            padding: 0 10px;
            cursor: grab;
            .text {
              display: flex;
              align-items: center;
              svg {
                font-size: 14px;
                margin-right: 5px;
                color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
              }
            }
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;
            }
          }
          .options-td {
            position: sticky;
            right: 0;
            background: #fff;
            transition: all 0.3s ease;
            .options {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #405189;
              opacity: 0.6;
              border-radius: 4px;
              transition: all 0.3s ease;
              &:hover {
                cursor: pointer;
                opacity: 1;
              }
              svg {
                color: #fff;
              }
            }
          }
          &:hover {
            background: #d8dbe6;
            opacity: 0.8;
            color: #000;
            .fixed {
              background: #d8dbe6;
            }

            .fixedlast {
              background: #d8dbe6;
            }
            .options-td {
              background: #d8dbe6;
              .options {
                background: #2c3d72;
                opacity: 1;
              }
            }
          }
        }
        .inpar {
          background: #f3f3f3;
          .fixed {
            background: #f3f3f3;
          }
          .options-td {
            background: #f3f3f3;
          }
        }
      }
    }
  }
  .notFound {
    text-align: center;
    color: #8a8a8a;
    margin: 11px 0px 14px 0px;
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
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
`;
