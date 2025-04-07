import { Dialog } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import { display } from "@mui/system";
import styled from "styled-components";

export const ModalNewNameGoalStyle = styled(Dialog)`
  .container {
    overflow: hidden;
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      margin-bottom: 15px;
      background-color: #0c203b;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        letter-spacing: 0.04em;
      }
      .loader {
        color: #fff;
      }
    }
    &__body {
      height: 200px;
      padding: 20px;
      overflow: hidden;
      transition: 0.2s;
      .form {
        .title {
          font-size: 12px;
          font-weight: bold;
          color: #4f4f4f;
        }
        .select_product {
          .iconLoader {
          }
        }
        .input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid #ccc;
          transition: all 0.3s ease;
          font-size: 16px;
          min-height: 36px;
          resize: none;
          padding: 5px 5px;
          background-color: #fff;
          &:focus {
            outline: none;
            border: none;
            transition: all 0.3s ease;

            border-bottom: 1.5px solid #0d0d0d;
          }
        }
        .error {
          border-bottom: 1.5px solid #f50f;
        }
        .span_error {
          height: 16px;
          font-weight: bold;
          letter-spacing: 0.05em;
          font-size: 10px;
          color: #f50;
          margin-top: 5px;
        }
        .container_product {
          display: flex;
          .input_search {
            width: 100px;
            position: fixed;
          }
        }
      }
    }
    .upgrade_height {
      height: 430px;
    }
    &__footer {
      padding: 10px;
      .buttons_container {
        display: flex;
        flex-direction: row-reverse;
        .btn_save {
          background-color: #3f51b5;
          color: #fff;
        }
        .btn_cancel {
          background-color: #0c203b;
          color: #fff;
          margin-right: 5px;
        }
      }
    }
  }
`;

export const StyleProductsOption = styled.div`
  .product_name {
    font-size: 13px;
    color: grey;
    .data {
      color: black;
      font-weight: 500;
    }
  }
  .product_code {
    font-size: 13px;
    color: grey;
    .data {
      font-size: 14px;
      color: #3f51b5;
    }
  }
`;

export const OptionSeeMore = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: rgb(246, 246, 246);
    .icon {
      transform: translateY(2px);
    }
  }
  .icon {
    transition: 0.2s;
    color: #3f51b5;
    font-size: 22;
  }
`;

export const LoaderProductsSelect = styled.div`
  display: flex;
  justify-content: center;
  .iconReload {
    margin-left: 10px;
    color: grey;
  }
`;
