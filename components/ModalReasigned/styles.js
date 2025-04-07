import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const DialogContainer = styled(Dialog)`
  * {
    margin: 0;
    padding: 0;
  }
  .MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
  label {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #405189;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
    .loader {
      color: #fff;
    }
  }
  .InfoProspect {
    margin-top: 14px;
    margin-bottom: 0;
    .prospectTitle {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      margin-bottom: 4px;
    }
  }
  .containerBody {
    padding: 0px 20px 0px 20px;
    margin-top: 20px;
    height: 280px;
    width: 443px;
    .ejecutives {
      display: -ms-flexbox;
      cursor: pointer;
      align-items: center;
      min-height: 65px;
    }
  }
  .DialogText {
    font-size: 16px;
    margin-bottom: 0;
    font-weight: 500;
    color: #000;
  }
  .dialogContainer {
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 20px;
      }
      &__select__value-container {
        height: 15px;
      }
    }
  }

  .cancel {
    color: #fff;
    padding: 5px;
    background-color: #000000;
    border-radius: 4px;
    margin-right: 5px;
    transition: 0.3s;
    &:hover {
      background-color: #fff;
      color: #000000;
      cursor: pointer;
    }
  }
  .acept {
    margin-left: 5px;
    color: #fff;
    padding: 5px;
    background-color: #0c203b;
    border-radius: 4px;
    transition: 0.3s;
    &:hover {
      background-color: #fff;
      color: #0c203b;
      cursor: pointer;
    }
  }
  .disabled {
    background-color: grey;
    &:hover {
      background-color: grey;
      color: #fff;
      cursor: none;
    }
  }
`;

export const ExecutiveOptions = styled.div`
  .name {
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .email {
    font-size: 13px;
    color: grey;
  }
`;
