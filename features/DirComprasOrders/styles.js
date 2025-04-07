import styled from "styled-components";
import { colors, device, zIndexHeader } from "../../styles/global.styles";

export const StyledOrders = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    @media ${device.sm} {
      display: flex;
    }
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    flex-shrink: 0;
    .headers {
      display: flex;
      align-items: center;
    }
    .add {
      text-transform: capitalize;
      background: rgb(25 51 100);
      color: rgb(255, 255, 255);
      font-size: 13px;
      border-radius: 10px;
    }
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        font-size: 14px;
        font-weight: normal;
        color: #9e9e9e;
      }
    }
    &__filters {
      display: flex;
      align-items: center;

      .inputContainer {
        width: 300px;
        position: relative;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
        }

        &__input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          height: 34px;
          margin-right: 20px;
          padding-left: 30px;
        }

        &__clean {
          position: absolute;
          font-size: 16px;
          top: 6px;
          right: 5px;
          color: #ccc;
          padding: 0;
          margin: 0;
          color: #059be5;
        }
      }
    }
  }

  .main {
    flex: 1;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    @media ${device.sm} {
      overflow-y: hidden;
    }
    .containertable {
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
    .list-container {
      flex: 1; /* Ocupa todo el espacio vertical disponible */
      overflow-y: auto; /* Agrega barra de desplazamiento vertical según sea necesario */
    }

    .preview {
      background: #f9f9fb;
      padding: 20px; /* Ajusta el padding según necesidad */
    }
    .TableName {
      display: flex;
      align-items: center;
      gap: 8px;
      .badge {
        font-size: 8px;
        font-weight: bold;
        letter-spacing: 0.03em;
        top: -5px;
        background: #51a550;
        padding: 1px 5px;
        color: white;
        border-radius: 15px 15px 15px 0px;
        margin-bottom: 10px;
        margin-right: 6px;
      }
    }
  }
`;

export const StyledContainerProfile = styled.div`
  * {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 200px;
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

  .griditem-menu {
    position: relative;
  }

  .container {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;

      .text {
        font-weight: bold;
        letter-spacing: 0.03em;
        cursor: pointer;
      }
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
      .redirec {
        cursor: pointer;
        margin-bottom: 6px;
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220 225 246 / 0%);
        color: #0c203b;
        border-radius: 50%;
      }
    }
    .headers {
      display: flex;
      font-size: 13px;
      font-weight: bold;
      color: #4f4f4f;
    }
    .text {
      margin-left: 10px;
      font-weight: 500;
    }
    .divider_white {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1.5px solid white;
    }
    .divider {
      margin-top: 20px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid rgb(241, 241, 241);
    }
  }

  .griditem-menuchiquito {
    padding: 5px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: 100%;
    width: 150px;
    position: absolute;
    top: 0;
    right: -50%;
    transition: all 3s ease-in-out;
    .item {
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: red;
      }
    }

    /* .form {
      width: 0;
      height: 0;
      transform: rotate(10deg);
      border-left: 100px solid #f0ad4e;
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
    } */
  }
  .ctr_prospecto {
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
            color: ${colors.iconColor};
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
        .oportunity {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          button {
            p {
              font-size: 14px;
              text-transform: capitalize;
              color: #fff;
            }
          }
          .bt_reasign {
            margin-right: 10px;
          }
          .view {
            font-size: 14px;
            color: #82b1ff;
            font-weight: 500;
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
`;
