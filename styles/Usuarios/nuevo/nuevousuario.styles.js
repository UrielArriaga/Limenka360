import { colors } from "../../global.styles";
import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .main_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    .contenido {
      width: calc(100% - 60px);
      margin: auto;
      margin-top: 25px;
      margin-bottom: 20px;
      height: fit-content;
      padding: 30px 25px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      border: 1px solid rgb(213, 219, 219, 0.9);

      .stepper {
        margin-top: 60px;
        margin-bottom: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        .step {
          width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0px -20px;
          .icon {
            border: 1px solid;
            font-size: 35px;
            border-radius: 50%;
            padding: 5px;
            margin-bottom: 12px;
            color: #b8b8b8;
            transition: 0.3s;
          }
          .iconActive {
            background-color: ${colors.primaryColorDark};
            color: #fff;
          }
          .titleStep {
            color: #b8b8b8;
          }
          .active {
            color: #000000;
          }
        }
        .progress {
          width: 15%;
          margin-top: -15aspx;
          border-radius: 20px;
        }
      }
      .titleForm {
        font-size: 25px;
        font-weight: bold;
      }
      .form {
        padding: 25px 10px;
        border-radius: 8px;
        background-color: #fff;
        .itemForm {
          margin-bottom: 15px;
          .headAccessItem {
            display: flex;
            align-items: center;
            margin-bottom: -10px;
            .titleAccess {
              font-size: 20px;
            }
            .iconHeadAccess {
              margin-right: 5px;
              .iconPerson {
                font-size: 35px;
              }
              .iconLock {
                margin-left: -15px;
                font-size: 15px;
                color: red;
              }
            }
            .iconPersons {
              font-size: 35px;
            }
          }
          .marginTop {
            margin-top: 35px;
          }
          input {
            margin-top: 10px;
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
          }
          .password {
            display: flex;
            align-items: center;
            .icon {
              background-color: transparent;
              border: 1px solid transparent;
              margin-left: -30px;
              margin-top: 10px;
              cursor: pointer;
            }
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
          .select {
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
            margin-top: 10px;
            &:hover {
              cursor: pointer;
            }
          }
          .selectAccess {
            background-clip: padding-box;
            background-color: #fff;
            border-radius: 0.25rem;
            color: #495057;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            margin-top: 10px;
          }
          &__alert {
            color: transparent;
          }
        }
      }
      .hidden {
        height: 0px;
      }
      .buttons {
        margin-top: 30px;
        width: 100%;
        .itemButtons {
          display: flex;
          justify-content: right;
          &__submit {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            .btnSubmit {
              background-color: ${colors.primaryColorDark};
              color: #fff;
              border: 1px solid;
              &:hover {
                background-color: #fff;
                color: ${colors.primaryColorDark};
              }
            }
            .btnBack {
              background-color: ${colors.danger};
              color: #fff;
              border: 1px solid;
              margin-right: 10px;
              &:hover {
                background-color: #fff;
                color: ${colors.danger};
              }
            }
          }
        }
      }
    }
  }
  .requiredAlert {
    color: red;
    position: relative;
  }
  .alert {
    position: fixed;
    top: 120px;
    width: 300px;
    right: 10px;
    z-index: 1;
  }
`;
