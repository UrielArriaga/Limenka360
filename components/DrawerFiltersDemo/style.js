import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const DrawerContainerDemo = styled(Drawer)`
  background-color: none;
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 34%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }

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
  .drawer_container {
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .title {
        font-weight: bold;
      }

      .close_icon {
        color: #8a8a88;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          color: #f50;
        }
      }
    }
    &__form {
      &__containerSelect {
        width: 100%;
        p {
          font-size: 14px;
          font-weight: 500;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        &__select {
          font-size: 15px;
          margin-bottom: 10px;
          width: 100%;
          border-color: hsl(0, 0%, 80%);
          outline: none;
          height: 35px;
        }
        &__calendarFrom {
          width: 100%;
          margin-right: 5px;
          font-size: 14px;
          padding: 5px;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
        &__calendarTo {
          width: 100%;
          margin-left: 5px;
          font-size: 14px;
          padding: 5px;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
      }
    }
    &__ctr_inputs {
      transition: all 0.4s ease;
      margin-bottom: 20px;
      &__input {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .label {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 5px;
        }
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
          width: 100%;
          height: 40px;
          border: 2px solid #f3f3f3;
          color: #000;
          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
          }
        }
        &__with_icon {
          display: flex;
          align-items: center;
          svg {
            width: 40px;
            height: 40px;
            padding: 8px;
          }
        }
      }
    }
    &__ctr_buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10%;
      .btn_cancel {
        background: #0c203b;
        margin-right: 10px;
        color: #fff;
        text-transform: capitalize;
      }
      .btn_apply {
        background: #405189;
        color: #fff;
        text-transform: capitalize;
      }
    }
  }
  .alert {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0px;
    border-radius: 5px;
    margin-top: 10px;
    background-color: rgb(255, 0, 0, 0.1);
    &__title {
      font-size: 14px;
      font-weight: 500;
    }
    &__iconAlert {
      font-size: 18px;
      margin-right: 5px;
      color: red;
    }
  }
`;
