import styled from "styled-components";
import { Drawer, Paper } from "@material-ui/core";

export const DiscountStyled = styled(Drawer)`
  .MuiDrawer-paperAnchorRight {
    overflow-x: hidden;
    overflow-y: hidden;
    @media (min-width: 1151px) {
      width: 30%;
    }
    @media (max-width: 1150px) {
      width: 40%;
    }
    @media (max-width: 900px) {
      width: 60%;
    }
    @media (max-width: 590px) {
      width: 100%;
    }
  }
  .container {
    &__header {
      background-color: #405189;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .title {
        color: #fff;
        font-weight: 500;
      }
      .buttonIcon {
        height: 15px;
        width: 15px;
        &__icon {
          color: red;
        }
      }
    }
    &__body {
      .buttons_header {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: -30px;
        .button_reload {
          height: 40px;
          width: 40px;
          &:hover {
            .icon {
              color: #405189;
              rotate: 360deg;
            }
          }
          .icon {
            transition: 0.6s;
            font-size: 25px;
          }
        }
      }
      .info_discount {
        padding: 10px;
        margin-bottom: 10px;
        .item {
          .title {
            font-size: 14px;
            color: grey;
          }
          .data {
            font-weight: 500;
          }
        }
      }
      .buttons {
        padding: 10px;
        display: flex;
        flex-direction: row-reverse;
        .request_button {
          text-transform: capitalize;
          font-size: 13px;
          &:hover {
            background-color: #405189;
            color: #fff;
          }
        }
        .send {
          border: 1px solid #405189;
          color: #405189;
          &:hover {
            background-color: #405189;
            color: #fff;
          }
        }
        .delete {
          color: red;
          background-color: #fff;
          border: none;
          border: 1px solid red;
          &:hover {
            background-color: red;
            color: #fff;
          }
        }
        .resend {
          border: 1px solid #405189;
          color: #405189;
          &:hover {
            background-color: #405189;
            color: #fff;
          }
        }
      }
      .data_discounts {
        padding: 10px;
        .loader {
          padding: 20px;
          display: flex;
          justify-content: center;
        }
      }
      .empty {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &__title {
          color: #abb2b9;
        }
        &__image {
          margin-top: 50px;
          margin-bottom: 15px;
          width: 120px;
          height: 120px;
        }
      }
    }
    &__footer {
    }
  }
`;

export const ItemDiscount = styled(Paper)`
  padding: 9px;
  margin-bottom: 15px;
  .header {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      font-size: 14px;
      color: grey;
    }
    .data {
      color: black;
      font-weight: 500;
    }
    .status {
      font-size: 12px;
      border: 1px solid;
      border-radius: 5px;
      padding: 3px;
      font-weight: 500;
    }
    .approved {
      color: #fff;
      background-color: green;
    }
    .pending {
      color: #fff;
      background-color: #f07f0e;
    }
    .dennied {
    }
  }
  .body {
    .discount_information {
      margin: 10px 0px;
    }
    .title {
      font-size: 14px;
      color: grey;
    }
    .data {
      font-size: 14px;
      font-weight: 500;
    }
    .date {
      font-size: 14px;
      text-transform: capitalize;
      color: black;
      font-weight: 500;
    }
  }
  .footer {
  }
`;

export const AlertStyle = styled.div`
  position: fixed;
  z-index: 50;
  justify-content: center;
`;
