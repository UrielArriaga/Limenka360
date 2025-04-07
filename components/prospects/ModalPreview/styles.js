import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const ModalPreviewStyled = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 70%;
    padding: 20px;
    background-color: #eef2f4;
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

    /* position: relative; */
    overflow: visible;
    overflow-x: scroll;
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }

  .headerPreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #282455;
      text-transform: capitalize;
    }
  }

  .actionmodal {
    button {
      margin-right: 10px;
    }
    // give me styles to my buttons
    .btn {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn--primary {
      background-color: #407aff;
      color: white;
      border: none;
    }
  }

  .close {
    position: absolute;
    top: 4px;
    left: -44px;
    cursor: pointer;
    height: 40px;
    width: 40px;
    background-color: #407aff;
    z-index: 30000000000000 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    /* padding: 10px 30px; */
  }
`;
