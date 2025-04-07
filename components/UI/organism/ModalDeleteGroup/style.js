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
  .containerBody {
    padding: 0px 20px 0px 20px;
    margin-top: 20px;
    height: 340px;
    width: 520px;
  }
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      font-weight: 700;
    }
    .titleDelete {
      font-size: 14px;
      /* color: grey; */
      font-size: 15px;
      font-weight: 700;
    }
  }
  .itemOptions {
    padding: 0px 10px 0px 10px;
    .tileOption {
      font-weight: 500;
      color: black;
      font-size: 15px;
    }
  }
  .itemEjecutives {
    padding: 11px 10px 0px 10px;
    .titleEjecutives {
      font-weight: 500;
      color: #405189;
      font-size: 15px;
    }
    .containerOcultar {
      display: flex;
      align-items: center;
      .ocultar {
        margin-top: 1px;
        font-weight: 700;
        text-decoration: underline;
        &:hover {
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }
  .GroupsAndExecutives {
    padding: 0px 10px 0px 10px;
  }
  .DialogText {
    margin-top: 14px;
    margin-bottom: 0;
  }
  .dialogContainer {
    height: 300px;
    transition: 0.2s;
  }
  .item {
    margin: 20px 0px 5px 0;
  }
  .itemDelete {
    margin: 20px 0px 5px 0;
    .deletes {
      .tileDelete {
        font-weight: 500;
        font-size: 18px;
        color: #8b0101;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tileDeleteAcept {
        padding: 0px 10px 0px 10px;
        margin-top: 17px;
        font-weight: 500;
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 73px;
        /* margin-top: 48px; */
        color: #ad2626;
      }
    }
  }
  .itemDeleteAssing {
    margin: 20px 0px 5px 0;
    .titleDelete {
      font-size: 14px;
      font-size: 15px;
      font-weight: 700;
    }
    .titleDel {
      padding: 0px 10px 0px 10px;
      font-weight: 500;
      margin-bottom: 13px;
    }
    .selectedOption {
      font-weight: 500;
      color: #405189;
      font-size: 15px;
      margin-bottom: 9px;
    }
  }
  .tileOption {
    font-weight: 500;
    color: black;
    font-size: 15px;
  }
  .contentAccept {
    font-weight: 500;

    font-size: 15px;
    margin-top: 9px;
  }
  .select {
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 20px;
  }
  .select__value-container {
    height: 15px;
  }
  .textArea {
    width: 100%;
    resize: none;
    outline: none;
    border-radius: 5px;
    margin-top: 5px;
    padding: 5px;
    height: 100px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
  .addHeight {
    margin-bottom: 30vh;
  }
  .buttons {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 17px;
    .cancel {
      color: #fff;
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 14px;
      border-radius: 10px;
      background: white;
      margin-right: 11px;
      cursor: pointer;
    }
    .acept {
      text-transform: capitalize;
      border: 2px solid;

      font-size: 14px;
      border-radius: 10px;
      color: #fff;

      background-color: #103c82;

      &:hover {
        text-transform: capitalize;
        border: 2px solid #103c82;
        color: #103c82;
        font-size: 14px;
        border-radius: 10px;
        background: white;
        cursor: pointer;
      }
    }
    .disabled {
      background-color: #e0e0e0;
      border: 2px solid #e0e0e0;
    }
  }
  .descarted_input {
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
    &:focus {
      outline: none;
      border: 2px solid #405189;
    }
  }
`;

const DialogContainerDelete = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0c203b;
    padding: 10px 20px;
    .loader {
      color: #fff;
    }
  }
  .title {
    font-size: 18px;
    /* margin-bottom: 15px; */
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    margin-top: 14px;

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
    .infoContainer {
      .colorsContainer {
        display: flex;
        flex-direction: column;
      }
    }
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;
        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    &__inputColor {
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
  .ctr_buttonsDelete {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    margin-top: 15px;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
  .containerProspects {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    max-height: 200px;
    overflow: auto;
    overflow-x: hidden;
    .prospecInfo {
      padding: 3px;
      border: 1px solid #405189;
      border-radius: 5px;
      margin-bottom: 5px;
      margin-right: 5px;
      .name {
        font-size: 12px;
        color: #405189;
        font-weight: 500;
        text-transform: capitalize;
      }
      .email {
        font-size: 12px;
        color: #405189;
      }
    }
  }
  .bodyDelete {
    padding: 0 20px 20px 20px;
    margin-top: 14px;
    width: 606px;
    .titleDelete {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      margin-bottom: 11px;
    }
  }
  .containerProspectsSkeleton {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    max-height: 200px;
    overflow: auto;
    overflow-x: hidden;
    .MuiSkeleton-text {
      height: auto;
      transform: none;
      margin-top: 0;
      border-radius: 4px;
      margin-bottom: 0;
      transform-origin: 0 60%;
      margin: 1px;
    }
    .prospecInfo {
      padding: 3px;
      border-radius: 5px;
      margin-right: 5px;
      .name {
        font-size: 12px;
        color: #405189;
        font-weight: 500;
        text-transform: capitalize;
      }
      .email {
        font-size: 12px;
        color: #405189;
      }
    }
  }
`;
