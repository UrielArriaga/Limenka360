import styled from "styled-components";

export const DialogContainer = styled.div`
  background-color: #faf6f6;
  width: 500px;
  max-width: 90vw;
  border-radius: 2px;
  overflow: hidden;
  font-family: "Inter", sans-serif;

  h3 {
    background: #224d92;
    color: white;
    padding: 15px 20px;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .headerDialog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background: #224d92;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .MuiDialogContent-root,
  .ctr_inputs {
    padding: 20px;
    background-color: #faf6f6;

    &__label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1d3967;
      margin-bottom: 0.25rem;
      display: block;
    }

    &__input {
      width: 100%;
      padding: 10px 12px;
      font-size: 1rem;
      border: 1px solid #cdcdcd;
      border-radius: 5px;
      background-color: white;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #224d92;
      }
    }

    .capitalize {
      text-transform: capitalize;
    }

    .error {
      border-color: #ff4d4f;
    }

    &__span_error {
      font-size: 0.7rem;
      font-weight: bold;
      color: #ff4d4f;
      margin-top: 5px;
    }
  }

  .ctr_tracking {
    padding: 20px;

    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 600;
      color: #1d3967;

      .icon {
        color: #405189;
        margin-right: 5px;
      }
    }

    .paraghap {
      font-size: 1rem;
      font-weight: 600;
      color: #000;
      margin-top: 0.5rem;
    }
  }

  .ctr_buttons,
  .MuiDialogActions-root {
    padding: 15px 20px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    .btn_cancel,
    .btn_upload,
    .MuiButton-root {
      border-radius: 5px;
      padding: 8px 16px;
      min-width: 100px;
      font-weight: 500;
      text-transform: capitalize;
      transition: background-color 0.3s ease;
    }

    .btn_cancel,
    .MuiButton-textSecondary {
      background: transparent;
      color: #9a0f11;
      border: 1px solid #670305;

      &:hover {
        background: rgba(25, 51, 100, 0.05);
      }
    }

    .btn_upload,
    .MuiButton-containedPrimary {
      background: #224d92;
      color: #faf6f6;

      &:hover {
        background: #052457;
      }
    }

    .disabled {
      background-color: #b0b0b0;
      cursor: not-allowed;
      &:hover {
        background-color: #b0b0b0;
      }
    }
  }
`;
