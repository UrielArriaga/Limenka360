import styled from "styled-components";
import { Dialog } from "@material-ui/core";

export const StyledModalTrainings = styled(Dialog)`
  .MuiDialog-paper {
    background: #faf6f6 !important;
    width: 500px;
    max-width: 90vw;
    border-radius: 5px;
  }

  h3 {
    background: #0F899A;
    color: white;
    padding: 15px 20px;
    margin: 0;
    font-size: 1.2rem;
  }

  .MuiDialogContent-root {
    padding: 20px !important;
    background: #faf6f6;
  }

  .MuiTextField-root {
    background: white;
    border-radius: 5px;

    .MuiOutlinedInput-root {
      fieldset {
        border-color: #cdcdcd;
      }

      &:hover fieldset {
        border-color: #0F899A;
      }
    }
  }

  .MuiFormControlLabel-root {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
    padding: 8px 0;

    .MuiTypography-root {
      color: #1d3967;
      font-weight: 600;
    }
  }

  .MuiDialogActions-root {
    padding: 15px 20px;
    background: #f0f0f0;

    .MuiButton-root {
      text-transform: capitalize;
      border-radius: 5px;
      min-width: 100px;

      &.MuiButton-containedPrimary {
        background: #0F899A;
        color: #faf6f6;
        &:hover {
          background: #02626E;
        }
      }

      &.MuiButton-textSecondary {
        color: #193364;
        border: 1px solid #193364;
        &:hover {
          background: rgba(25, 51, 100, 0.05);
        }
      }
    }
  }
`;
