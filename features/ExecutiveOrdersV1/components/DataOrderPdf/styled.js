import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";

export const DataOrderPdfStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .down {
    background: linear-gradient(45deg,#e94745 30%, #ffffff 90%);
    border: none;
    border-radius: 6px;
    color: #333;
    padding: 4px 10px;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    outline: none;

    .MuiButton-label {
      color: #333;
    }

    .MuiButton-startIcon {
      margin-right: 6px;
      .MuiSvgIcon-root {
        color:#ffffff;
      }
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
      opacity: 0.9;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
    }

    &.Mui-disabled {
      background: #e0e0e0;
      color: #bdbdbd;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
      opacity: 0.7;
      .MuiButton-startIcon .MuiSvgIcon-root {
        color: #bdbdbd;
      }
    }
  }

  .loaders {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e53935;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .loader {
    color: #e53935;
    height: 16px !important;
    width: 16px !important;
  }
`;
