import styled from "styled-components";
import { device } from "../../global.styles";

export const CategoriesStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }
  .main {
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    .container {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;

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
            svg {
              font-size: 24px;
              margin-right: 5px;
              color: #103c82;
            }
          }
        }

        .total {
          .icon {
            font-size: 27px;
          }
          a {
            margin-left: 10px;
            font-size: 15px;
          }

          display: flex;
          align-items: center;
          font-weight: 600;
          svg {
            font-size: 14px;
            margin-right: 5px;
            color: #103c82;
          }
          .reload {
            font-size: 18px;
            margin-left: 10px;
            cursor: pointer;
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
            border-radius: 50%;
            border: 1px solid #fff;
            padding: 2px;
            margin-right: 5px;
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
      .chip {
        margin-bottom: 3px;
      }
    }
  }
`;
export const NewCategorieStyled = styled.div`
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

    .head {
      display: flex;
      align-items: center;
      margin-block-end: 1%;
      &__title {
        font-size: 14px;
        margin-bottom: 10px;
        display: flex;
        width: 100%;
        align-items: center;
        h1 {
          margin-bottom: 8px;
        }
        svg {
          width: 30px;
          height: 30px;
          padding: 4px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
      }

      .arrow {
        width: 30px;
        height: 30px;
        color: white;
        font-size: 14px;
        background-color: none;
        border-radius: 35px;
        border: 1px solid whitesmoke;
        margin-right: 1%;
        cursor: pointer;
        border-radius: 50px;
        border-width: 0px;
        background-color: #407aff;
        color: #fff;
        &:hover {
          transition: 1s;
          transform: translate(-3px);
        }
      }
    }
    .main_prospects {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .MuiSnackbarContent-root {
        color: #fff;
        display: flex;
        padding: 6px 16px;
        flex-grow: 1;
        flex-wrap: wrap;
        font-size: 0.875rem;
        align-items: center;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.43;
        border-radius: 4px;
        letter-spacing: 0.01071em;
        background-color: #f44336;
      }

      .MuiPaper-elevation6 {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%),
          0px 1px 18px 0px rgb(0 0 0 / 12%);
        background-color: #f44336;
      }
      .MuiSnackbar-anchorOriginTopRight {
        top: 94px;
        left: auto;
        right: 24px;
      }
    }
  }
  .form {
    .ContentTitleandAlert {
      display: flex;
    }

    .item {
      display: flex;
      align-content: center;
      flex-direction: column;
      font-size: 15px;
      width: auto;
      padding: 5px 9px;

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
        min-height: 38px;
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
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: end;
    }
    .btnsalir {
      margin-right: 15px;
    }
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
