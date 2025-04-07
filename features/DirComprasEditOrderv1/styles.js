import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const NewOrderStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  padding: 20px;
  background-color: #fafafa;

  // * COMMON

  .flex-aling-center {
    display: flex;
    align-items: center;
  }

  .header {
    .bt_back {
      margin-right: 10px;
      height: 30px;
      width: 30px;
      color: grey;
      background-color: #d4d4d4;
    }

    h1 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .main_order {
    position: relative;
    width: calc(100% - 30px);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    height: 80%;
    padding: 10px;
    background-color: #fff;
    /* background-color: rgba(255, 255, 255, 0.8); */
    border-radius: 8px;
    box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;
  }

  .main_order .tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-right: 20px;
    margin-top: 10px;

    .tab_option {
      width: 200px;
      font-size: 13px;
      border-bottom: 1px solid #d4d4d4;
      text-transform: capitalize;
      height: 40px;
      display: flex;
      justify-content: left;
      margin-bottom: 5px;
      svg {
        margin-top: -3px;
        font-size: 18px;
        color: grey;
      }
      .error {
        color: red;
      }
    }
  }

  .main_order .fixed {
    position: fixed;
    top: 160px;
    right: 80px;
    /* width: 100%; */
    z-index: 1000;
    /* background-color: #fff; */
    /* box-shadow: 0px 6px 15px rgb(64 79 104 / 5%); */
  }

  .data {
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    position: relative;
  }

  .flex-center-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .btn_generate {
    text-transform: capitalize;
    background: #103c82;
    color: #fff;
    font-size: 13px;

    margin-left: 5px;
  }

  .content_neworder {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: auto;
    margin-bottom: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .title_header {
        font-size: 20px;
        margin-right: 20px;
        font-weight: 500;
      }
      .bt_back {
        margin-right: 10px;
        height: 30px;
        width: 30px;
        color: grey;
        background-color: #d4d4d4;
      }
    }
    &__body {
      .subtitles {
        display: flex;
        align-items: center;
        margin-bottom: 1%;
        .icon {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgb(220, 225, 246);
          color: rgb(16, 60, 130);
          border-radius: 50%;
          margin-right: 6px;
        }
        .titleDirection {
          font-weight: 600;
          color: #565661;
        }
      }
      .form {
        .item {
          .title {
            font-size: 14px;
            color: rgb(86 86 86);
            font-weight: 550;
            margin-bottom: 1%;
            .iconroom {
              color: rgb(16, 60, 130);
              padding: 5px;
              background: rgb(220, 225, 246);
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .input_data {
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
            -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            height: 35px;
            max-height: 35px;
            &:focus {
              outline: none;
              border: none;
              transition: all 0.3s ease;

              border-bottom: 1.5px solid #0d0d0d;
            }
          }
          .select_data {
            font-size: 14px;
          }
          .input_observations {
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
            min-height: 38px;
            outline: none;
            resize: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
          }
        }
        .products {
          .input_products {
            color: transparent;
            border: none;
            outline: none;
            width: 0px;
            height: 0px;
          }
          .message {
            height: 10px;
            display: flex;
            align-items: center;
            color: red;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 10px;
            svg {
              margin-right: 5px;
              font-size: 18px;
            }
          }
        }
        .buttons {
          display: flex;
          flex-direction: row-reverse;
          margin-top: 2%;
          .bt_save {
            margin-right: 0.5%;
            font-size: 12px;
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            background: #193364;
          }
          .bt_template {
            margin-right: 0.5%;
            font-size: 12px;
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            background: #193364;
          }
        }
      }
    }
  }
`;

export const AlertProviderStyle = styled(Dialog)`
  .content_alert {
    padding: 10px;
    .title_alert {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
      svg {
        margin-right: 10px;
        color: red;
        font-size: 25px;
      }
    }
    .buttons {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      .bt {
        text-transform: capitalize;
        font-size: 12px;
        margin: 5px;
      }
      .accept {
        background-color: ${colors.primaryColorDark};
        color: #fff;
      }
      .cancel {
        border: 1px solid #d4d4d4;
      }
    }
  }
`;

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 36,
    minHeight: 36,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
};
