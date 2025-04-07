import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const TableQuoteStyled = styled.div`
  p {
    margin: 0;
  }
  .title_table {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .primary {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon_primary {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
      p {
        font-size: 18px;
        letter-spacing: 0.04em;
        font-weight: 600;
        margin-right: 10px;
      }
      .load {
        color: #103c82;
      }
      .reload {
        color: #103c82;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .chip {
      margin-right: 5px;
      text-transform: capitalize;
    }
    .secondary {
      display: flex;
      align-items: center;
      color: #8a8a8a;
      font-size: 12px;
      svg {
        font-size: 18px;
        transition: all 0.3s ease;
      }
      &:hover {
        cursor: pointer;
        svg {
          font-size: 20px;
        }
      }
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
        background-color: #dce1f6;
        padding: 5px 10px;
        height: 40px;
        .checkbox {
          position: sticky;
          left: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 3px 5px;
          background-color: #405189;
          color: #fff;
          /* min-width: 250px; */
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
          .ctr_title {
            display: flex;
            align-items: center;
            width: max-content;
            /* min-width: 150px; */
          }
        }
      }
    }
    &__body {
      .row {
        background: #fff;
        font-weight: bold;
        color: #2c2c2c;
        transition: all 0.3s ease;
        min-height: 50px;

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
          padding: 0 10px;
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
          .icon {
            svg {
              cursor: pointer;
              width: 25px;
              height: 25px;
              padding: 5px;
              background: #eaeaea;
              color: #103c82;
              border-radius: 50%;
            }
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
  .body_empty {
    position: relative;
    width: 100%;
    padding: 40px;
    height: 250px;
    .message_ctr {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      p {
        text-align: center;
        color: #8a8a8a;
      }
    }
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
`;

export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .title {
    font-size: 18px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 20px;
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
      resize: none;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .capitalize {
      text-transform: capitalize;
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

  .ctr_tracking {
    padding: 20px;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      /* color: #eaeaea; */
      letter-spacing: 0.03em;
      .icon {
        font-size: 16px;
        margin-right: 5px;
        color: #405189;
      }
    }
    .paraghap {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .capitalize {
      text-transform: capitalize;
    }
  }
`;

export const DrawerContainer = styled(Drawer)`
  background-color: none;
  /* backdrop-filter: blur(2px); */
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
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
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }
  .ctr_drawer {
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
`;
