import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { Popover, Switch, withStyles } from "@material-ui/core";
export const DataOrderPdfStyled = styled.div`
  display: flex;
  align-items: center;
  .loaders {
    color: rgba(0, 0, 0, 0.87);
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: #fff;
    background-color: #3f51b5;
    display: flex;
    align-items: center;
    .loader {
      color: #fff;
    }
  }
`;
