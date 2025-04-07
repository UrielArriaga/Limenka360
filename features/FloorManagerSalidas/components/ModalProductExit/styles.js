import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const ModalProductExitStyled = styled(Dialog)`
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    width: 100%;
    max-width: 70vw;
    height: 700px;
    padding: 0;
    margin: 0;
    /* overflow: show; */
  }

  .orderad {
    display: flex;
    align-items: center;

    h3 {
      margin-right: 5px;
    }
    /* flex-direction: column; */
    padding: 10px;
    &__productselected {
      display: flex;
      flex-direction: column;
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding: 10px;
    /* margin-top: 20px; */
    /* padding: 20px 10px; */
    &__title {
      font-size: 16px;
      font-weight: bold;
      font-weight: normal;
      margin-right: 20px;
      h4 {
        font-weight: normal;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: #9e9e9e;
      }
    }

    &__filters {
      display: flex;
      align-items: center;

      .inputContainer {
        width: 600px;
        position: relative;
        margin-right: 10px;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
        }

        &__input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          height: 34px;
          margin-right: 20px;
          padding-left: 30px;
        }

        &__clean {
          position: absolute;
          font-size: 16px;
          top: 6px;
          right: 5px;
          color: #ccc;
          padding: 0;
          margin: 0;
          color: #059be5;
        }
      }
    }
  }

  .body {
    padding: 10px;
    height: 400px;
    /* background-color: red; */
    overflow: scroll;
  }
  .modalbody {
    /* padding: 20px; */
    /* width: 700px; */

    /* display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto; */

    &__title {
      font-size: 12px;
      background-color: #034d6f;
      color: #fff;
      padding: 10px;
    }
  }
`;
