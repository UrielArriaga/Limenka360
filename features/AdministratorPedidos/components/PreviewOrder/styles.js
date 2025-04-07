import { Drawer } from "@material-ui/core";
import styled from "styled-components";
export const PreviewOrderStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 60%;
    padding: 20px;
    @media (max-width: 600px) {
      width: 100%;
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

  .headerpreview {
    margin-bottom: 10px;
  }

  .swithview {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .rowinfo {
    display: flex;

    .info {
      flex: 1;
    }
  }

  .pdfview {
    .pdf {
      height: 800px;
    }
  }

  .observations {
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`;
