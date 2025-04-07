import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { device } from "../../global.styles";
export const PedidosStyled = styled.div`
  * {
    margin: 0;
  }
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  .main {
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
  .ctr_order {
    width: calc(100% - 80px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      @media ${device.sm} {
        display: flex;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 0.04em;
        margin-bottom: 15px;
        align-items: baseline;
        justify-content: space-between;
      }
    }

    &__titles {
      display: grid;
      grid-template-columns: 35px auto;
      @media ${device.sm} {
        margin-bottom: 15px;
      }
      p {
        letter-spacing: 0.04em;
        font-size: 22px;
        font-weight: bold;
        @media ${device.sm} {
          margin-bottom: 15px;
        }
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

    &__info {
      width: 100%;
      &__ctr_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &__title {
          display: flex;
          align-items: center;
          svg {
            width: 30px;
            height: 30px;
            padding: 5px;
            margin-right: 5px;
            background: #dce1f6;
            color: #0c203b;
            border-radius: 50%;
          }
          p {
            font-size: 18px;
            letter-spacing: 0.04em;
            font-weight: 600;
          }
        }
        &__titles {
          display: flex;

          align-items: center;
          font-size: 16px;
          font-weight: 600;
          color: #103c82;
          margin-bottom: 2px;
          height: 32px;
        }
        &__edit {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #103c82;
          color: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      &__data {
        margin-bottom: 10px;
        transition: all 0.5s ease;
        .label {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: bold;
          color: #4f4f4f;
          margin-bottom: 2px;
          height: 32px;
          svg {
            color: #103c82;
          }
        }
        .paragraph {
          font-size: 16px;
          padding: 0 10px;
          font-weight: 500;
        }
        .primary_paragraph {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          /* padding: 0 10px; */
          svg {
            font-size: 25px;
            color: #66b271;
          }
        }
        .sendMessage {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .capitalize {
          text-transform: capitalize;
        }
        span {
          color: #d1d1d1;
          font-size: 12px;
          font-weight: 500;
        }
        .orderShowAll {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .view {
            font-size: 14px;
            color: #82b1ff;
            font-weight: 700;
            cursor: pointer;
          }
        }
      }
      .divider {
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 1.5px solid #f3f3f3;
      }
    }

    .buttons {
      margin-top: 20px;
      display: flex;
      flex-direction: row-reverse;
      &__bt {
        text-transform: capitalize;
        font-weight: 500;
        font-size: 12px;
        color: #fff;
      }
      .denied {
        border: 1px solid #ec1313;
        background-color: #ec1313;
        color: #fff;
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.87);
        padding: 6px 16px;
        font-size: 0.875rem;
        min-width: 64px;
        box-sizing: border-box;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
          box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 500;
        line-height: 1.75;
        border-radius: 4px;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        &:hover {
          color: #ec1313;
          background-color: #fff;
        }
      }
      .aproved {
        border: 1px solid #36a200;
        background-color: #36a200;
        color: #fff;
        margin-right: 10px;
        padding: 6px 16px;
        font-size: 0.875rem;
        min-width: 64px;
        box-sizing: border-box;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
          box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 500;
        line-height: 1.75;
        border-radius: 4px;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        &:hover {
          color: #36a200;
          background-color: #fff;
        }
      }
      .button_Verified {
        background-color: rgb(9, 122, 9);
        color: #fff;
        margin: 0px 7px 0px 5px;
        text-transform: capitalize;
        :hover {
          background-color: rgb(9, 152, 9);
        }
      }
      .button_RemoveVerified {
        background-color: rgb(191, 24, 24);
        color: #fff;
        margin: 0px 7px 0px 5px;
        text-transform: capitalize;
        :hover {
          background-color: rgb(221, 24, 24);
        }
      }
    }
    .products {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: grid;
      grid-column: 1 / 5;

      height: -57%;
      overflow-y: auto;

      max-height: 262px;
    }
    .ctr_gridProduct {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100%;
      overflow-x: auto;
      padding: 0px 1px;

      ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #0c203b;
      }
    }
    .target_shippingProduct {
      padding: 10px;
      height: 222px;
      width: max-content;
      min-width: 320px;
      max-width: 350px;
      border-radius: 8px;
      position: relative;
      box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
      &::before {
        top: 0px;
        left: 0px;
        width: 5px;
        bottom: 0px;
        content: "";
        position: absolute;
        /* background-image: linear-gradient(
        to right bottom,
        #3f51b5,
        #2d499e,
        #1e4086,
        #13376f,
        #0e2d58,
        #122d55,
        #142c51,
        #172c4e,
        #20355c,
        #2a3e6b,
        #35487a,
        #405189
      ); */
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
        .item {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .icon {
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
      }
      .span {
        font-weight: bold;
        letter-spacing: 0.03em;
        font-size: 11px;
        color: #616161;
      }
      .productName {
        height: 26px;
        overflow-y: auto;
      }
    }
    .target_tracing {
      padding: 10px;
      height: 210px;

      width: max-content;
      min-width: 320px;
      max-width: 350px;
      border-radius: 8px;
      position: relative;
      border: 1px solid #103c8230;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
        .item {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .icon {
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
      }
      .span {
        font-weight: bold;
        letter-spacing: 0.03em;
        font-size: 11px;
        color: #103c82;
      }
    }
    .ctr_grid {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100%;
      overflow-x: auto;
      padding: 0px 10px;
      padding-bottom: 10px;
      ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #0c203b;
      }
    }
    .productC {
      padding: 6px;
      margin: 3px;
      border-radius: 8px;
      border: 1px solid #dce1f6;
    }
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
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 12px;
          color: #4f4f4f;
        }
        &__info {
          font-weight: 500;
          font-size: 12px;
          color: #000;
        }
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(100vh - 200px);
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
  .title {
    padding: 0;
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
