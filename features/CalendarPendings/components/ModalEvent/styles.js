import styled from "styled-components";
import { Modal } from "@material-ui/core";

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    min-width: 600px;
    font-family: "Inter", sans-serif;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  .field {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    label {
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 0.9rem;
      color: #222;
    }

    textarea,
    input[type="datetime-local"],
    select {
      border: 1.5px solid #ccc;
      border-radius: 10px;
      padding: 10px;
      font-size: 0.9rem;
    }

    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;

      button {
        padding: 8px 12px;
        border-radius: 8px;
        /* border: 1.5px solid #ccc; */
        /* background: #f5f5f5; */

        border: 1.5px solid #ccc;
        background: #ffff;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s ease;
        color: #757575;

        &.active {
          background-color: #2563eb;
          color: white;
          border-color: #2563eb;
        }
      }
    }
  }

  .field .prospect {
    /* font-size: 0.9rem; */
  }

  .field .last-followup {
    font-size: 0.9rem;
    color: #666;
    background: #f5f5f5;
    padding: 10px;
    border-radius: 10px;
  }

  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actions {
      display: flex;
      gap: 8px;

      button {
        padding: 8px 16px;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }

      .cancel {
        background: #f0f0f0;
        color: #333;
      }

      .save {
        background: #2563eb;
        color: white;
      }
    }
  }
`;
