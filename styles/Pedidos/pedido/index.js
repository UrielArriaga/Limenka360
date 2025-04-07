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
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ctr_order {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 0.04em;
      margin-bottom: 15px;
      @media ${device.sm} {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .titleContainer {
        display: flex;
        align-items: center;
      }
      .iconEdit {
        width: 20px;
        height: 20px;
        padding: 3px;
        margin-left: 9px;
        background: #103c82;
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
      }
      .button {
        margin-right: 122px;
        .down {
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
            0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }
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
          cursor: pointer;
          &:hover {
            background-color: #e6eef0;
            color: #6b34bc;
            border-radius: 17px;
          }

          padding: 6px;
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
            font-size: 16px;
            letter-spacing: 0.04em;
            font-weight: 600;
          }
        }
        .titleSelect {
          border-bottom: 2px solid #3f51b5;
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
