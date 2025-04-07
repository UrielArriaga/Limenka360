import styled from "styled-components";
import { colors, device } from "../../global.styles";

export const NewGroupStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  * {
    margin: 0;
  }

  .main {
    display: flex;
    flex-direction: column;
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;
    /* margin-top: 60px; */
    .head {
      display: flex;
      align-items: center;
      margin-block-end: 1%;
      padding: 15px 10px;
      h1 {
        color: #fff;
      }

      &__title {
        display: flex;
        align-items: center;

        svg {
          font-size: 30px;
          color: #fff;
          border: 1px solid #fff;
          margin-left: 20px;
          border-radius: 50%;
        }
      }
      .titleForm {
        font-size: 25px;
        font-weight: bold;
      }
      .arrow {
        width: 40px;
        height: 40px;
        color: white;
        font-size: 15px;
        margin-top: 10px;
        margin-left: 5px;
        background-color: none;
        border-radius: 35px;
        border: 1px solid whitesmoke;
        margin-right: 1%;
        cursor: pointer;
        &:hover {
          transition: 1s;
          transform: translate(-10px);
        }
      }
    }
    .main_prospects {
      width: calc(100% - 42px);
      margin: auto;
      margin-top: 25px;
      margin-bottom: 20px;
      height: fit-content;
      padding: 30px 25px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      border: 1px solid rgb(213, 219, 219, 0.9);
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

    .objetive {
      margin-top: 2%;
      margin-block-end: 1%;

      .title {
        /* background-color: blue; */
      }
    }

    .table {
      width: 100%;
      max-height: 70vh;
      overflow-x: auto;
      transition: all 0.3s ease;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

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
      .ctr_table {
        border-spacing: 0;
        margin: auto;
        width: inherit;

        &__head {
          position: sticky;
          top: 0;
          z-index: 50;

          &__tr {
            background-color: #bbdefb;
            padding: 5px 10px;
            height: 110px;

            .checkbox {
              position: sticky;
              left: 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 3px 5px;
              background-color: #405189;
              color: #fff;
              min-width: 250px;
              height: inherit;
              .MuiFormControlLabel-root {
                margin-right: 5px;
              }
              @media (max-width: 600px) {
                min-width: 100px;
                position: relative;
              }
            }
            .title {
              text-transform: capitalize;
              padding: 0 10px;
              position: static;
              background-color: green;

              .ctr_title {
                background-color: red;
                display: flex;
                align-items: center;
                width: max-content;
                min-width: 150px;
              }
            }
          }
          .op {
            background-color: purple;
            position: absolute;
            /* width: 100%; */
            /* padding-left: 20%; */
          }
        }
        &__body {
          .row {
            background: #fff;
            font-weight: bold;
            color: #2c2c2c;
            transition: all 0.3s ease;
            height: 70px;

            .fixed {
              position: sticky;
              left: 0;
              background: #fff;
              transition: all 0.3s ease;
              @media (max-width: 600px) {
                position: relative;
              }
            }
            .data {
              font-size: 14px;
              padding: 0 100px;
              align-items: center;
              justify-content: center;
              .date {
                font-size: 13px;
              }
              .ctr_td {
                display: flex;
                align-items: center;
                min-height: 42px;
                .span {
                  width: 100%;
                  cursor: pointer;
                }
              }
              .capitalize {
                text-transform: capitalize;
              }
              .select {
                cursor: pointer;
              }
              .ejecutive {
                display: flex;
                align-items: center;
                min-height: 42px;
                text-transform: capitalize;
                cursor: pointer;
                justify-content: center;
              }
              .ctr_icon_complete {
                justify-content: center;
                svg {
                  cursor: pointer;
                  width: 25px;
                  height: 25px;
                  padding: 5px;
                  background: #103c82;
                  color: #fff;
                  border-radius: 50%;
                }
              }
              .ctr_icon_incomplete {
                justify-content: center;
                svg {
                  cursor: pointer;
                  width: 25px;
                  height: 25px;
                  padding: 5px;
                  background: #8a8a8a;
                  color: #fff;
                  border-radius: 50%;
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

    .selectOption {
      margin-top: 2%;
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

    .buttons {
      display: flex;
      justify-content: end;
      /* margin-right: 5px; */
    }

    .btnGuardar {
      margin-right: 5px;
    }
  }
  ul.react-autosuggest__suggestions-list {
    list-style: none;
  }
  .sugerencia {
    padding: 5px;
    background: white;
  }
  .form {
    .ContentTitleandAlert {
      display: flex;
    }
    .iconMen {
      color: ${colors.primaryColor};
      margin-bottom: -7px;
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
      .create-select {
        position: sticky;
        z-index: 9;

        min-height: 30px;
        margin: 30px;
      }
      .select-options {
        margin-top: -0.5px;
        font-size: 0.8125rem;
        border-radius: 0.25rem;
        font-weight: 400;
        width: 100%;
        line-height: 1.5;
        background-clip: padding-box;
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

    .logo {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      &__img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: contain;
      }
      &__icon {
        font-size: 60px;
      }
      &__input {
        display: none;
      }
      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        text-align: center;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #ced4da;
        border-radius: 50%;
        transition: 0.3s;
        &:hover {
          -webkit-filter: blur(2px);
          cursor: pointer;
          &__logoFooter {
            z-index: 0;
          }
        }
      }
      &__buttonUploadImage {
        margin-bottom: 10px;
      }
      &__buttonDeleteImage {
      }
      &__logoFooter {
        position: fixed;
        color: red;
        color: black;
        font-size: 40px;
        text-align: center;
        margin-top: 100px;
        z-index: -1;
        transition: 0.2s;
        font-weight: bold;
      }
    }
    .imageContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__deleteImage {
        margin-top: 15px;
        border-radius: 5px;
        padding: 2px;
        background-color: red;
        color: #fff;
        border-color: red;
        transition: 0.3s;
        text-transform: capitalize;
        &:hover {
          cursor: pointer;
          background-color: #fff;
          color: red;
        }
      }
    }

    .buttons {
      margin-top: 100px;
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
    .refresh {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 35px;
      cursor: pointer;
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

export const GruposStyled = styled.div`
  background-color: #f3f3f8;
  /* height: 100vh; */
  width: 100%;
  display: flex;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .main {
    display: flex;
    flex-direction: column;
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;

    .container {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 25px;
      margin-bottom: 20px;
      height: fit-content;
      padding: 30px 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      border: 1px solid rgb(213, 219, 219, 0.9);
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &__title {
          font-size: 14px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          .reload {
            &:hover {
              padding: 3px;
              cursor: pointer;
            }
          }

          h1 {
            margin-bottom: 8px;
            svg {
              font-size: 24px;
              margin-right: 5px;
              color: #103c82;
            }
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
    }
  }
`;
