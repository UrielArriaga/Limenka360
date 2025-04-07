import { Box, Modal } from "@mui/material";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0;
`;

export const StyledBox = styled(Box)`
  background-color: #fff;
  border-radius: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 1000px;
  max-width: 100%;
  height: auto;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .actions {
      display: flex;
      gap: 8px;
      .buttonPrint {
        background: #039be5;
        color: white;
        text-transform: none;
      }
      .close {
        color: #6d4f4f;
        border: 1px solid #dcdcdc;
        text-transform: capitalize;
      }
    }
  }
  .empty {
    display: grid;

    justify-content: center;
    margin: 137px;
    justify-content: center;
    &__image {
      width: 214px;
      margin: auto;
    }
    .titleNotFound {
      font-weight: 700;
      color: #9e9e9e;
      margin-top: 17px;
      text-align: center;
    }
  }
  .content {
    margin-top: 16px;
    height: 780px;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const StyledContainer = styled.div`
  .buttonPdf {
    background-color: #f2f2f200;
    color: #fff;
    font-size: 13px;
    border-radius: 5px;
    color: #616161;
    cursor: pointer;
    text-transform: none;
  }
`;