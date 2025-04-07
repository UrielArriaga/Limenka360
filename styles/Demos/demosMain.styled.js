import styled from "styled-components";
import { colors } from "../global.styles";

export const DemoMainStyled = styled.div`
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

.griditem-menu {
  position: relative;
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
    margin-top: 20px;
    width: 100%;
    &__ctr_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      &__title {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        svg {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #407aff ;
          color: #fff;
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
  &__table {
    margin-top: 55px;
    &__title_table {
      display: flex;
      font-size: medium;
      margin-top: 30px;
      svg {
        background: #407aff ;
        border-radius: 50%;
        color: #fff;
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-bottom: 1px;
        margin-right: 2px;
      }
    }
    &__info {
      margin-top: 30px;
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
