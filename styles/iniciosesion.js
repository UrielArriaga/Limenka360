import styled from "styled-components";
import { colors, device } from "./global.styles";

export const LoginStyled = styled.div`
  background-color: #f9f9fb;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .login_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media ${device.md} {
      flex-direction: row;
      flex-direction: row-reverse;
    }
    &__form_side {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      &__topnav {
        width: 100%;
        display: flex;
        align-items: center;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: #fff;
        padding: 10px 5px 10px 5px;
        p,
        svg {
          color: ${colors.primaryColor};
          font-weight: bold;
          font-size: 18px;
        }
        svg {
          font-size: 32px;
        }
        span {
          color: #616161;
          font-weight: normal;
        }
      }
      &__content {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &__container {
          width: 90%;
          height: 70%;
          padding: 10px;
          @media ${device.md} {
            width: 70%;
          }
          .title {
            color: #424242;
            font-size: 32px;
            font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
            font-size: bold;
            margin-bottom: 20px;
          }
          .subtitle {
            color: #616161;
            margin-bottom: 50px;
            span {
              font-weight: bold;
              color: #000;
            }
          }
          .input_item {
            display: flex;
            margin-bottom: 20px;
            &__label {
              width: 40%;
              &__labeltxt {
                color: #212121;
                font-size: 14px;
                font-weight: bold;
              }
            }
            &__input {
              width: 60%;
              height: 50px;
              &__field {
                border-radius: 4px;
                height: 30px;
                width: 100%;
                outline: 0;
                padding-left: 10px;
                border: 1px solid #e0e0e0;
                &:focus {
                  outline: 1px solid ${colors.primaryColor};
                }
              }
              &__error {
                position: relative;
                font-size: small;
                margin-top: 20px;
                color: red;
              }
            }
          }
          .forgot_password {
            color: ${colors.primaryColor};
            text-align: right;
            font-weight: bold;
            p {
              :hover {
                cursor: pointer;
              }
            }
          }
          .divider {
            width: 100%;
            margin-top: 30px;
            margin-bottom: 30px;
            height: 1px;
            background-color: #bdbdbd;
          }
          .actionlogin {
            display: flex;
            justify-content: flex-end;
            button {
              height: 30px;
              padding: 6px 14px;
              border: none;
              outline: none;
              border-radius: 4px;
              background-color: ${colors.primaryColor};
              color: #fff;
              :hover {
                cursor: pointer;
              }
            }
          }
          .donthaveaccount {
            margin-top: 20px;
            p {
              text-align: center;
              font-size: 14px;
              span {
                color: #873ac8;
                :hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    &__info_side {
      width: 100%;
      display: none;

      background-image: linear-gradient(to right top, #0c203b, #193f64, #216290, #2287bd, #12afeb);
      @media ${device.md} {
        display: inline-block;
      }
      &__content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        display: none;
        &__images {
          position: relative;
          display: flex;
          justify-content: center;

          img {
            width: 400px;
            height: 200px;
            border-radius: 4px;
            margin-bottom: 30px;
            z-index: 2;
          }
          .shadow1 {
            position: absolute;
            top: -10px;
            width: 380px;
            border-radius: 4px;
            height: 200px;
            z-index: 1;
            background-color: rgb(255, 255, 255, 0.3);
          }
          .shadow2 {
            position: absolute;
            top: -20px;
            width: 350px;
            border-radius: 4px;
            height: 200px;
            z-index: 1;
            background-color: rgb(255, 255, 255, 0.3);
          }
        }
        p {
          color: #fff;
          font-size: 25px;
          text-align: center;
        }
      }
    }
  }
`;
