import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const DialogStyle = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    /* background-color: rgba(68, 138, 255, 0.3); */
    min-width: 900px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
  }
  .content {
    width: 100%;
  }

  .body {
    width: 100%;
    padding: 10px;
    overflow-y: auto;
    .buttons {
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }

  .chart {
    width: 100%;
    /* height: 100%; */
    overflow: auto;
  }
`;
