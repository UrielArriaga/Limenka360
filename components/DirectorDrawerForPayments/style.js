import { Drawer } from "@material-ui/core";
import styled from "styled-components";
export const PreviewStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
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
      -webkit-box-shadow: inset 0 0 20px #e0e0e0;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    p {
      color: #000;
      font-size: 16px;
      font-weight: 600;
    }
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #dce1f6;
      color: #0c203b;
      border-radius: 50%;
    }
  }
  .preview {
    &__header {
      background-color: #e0e0e0;
      margin-bottom: 10px;
      height: 40px;
      padding: 8px;
      font-weight: bold;
      .title {
        font-size: 18px;
        font-weight: 500;
      }
    }
    &__body {
      padding: 10px;
      .tabs {
        margin-top: 20px;
        width: 100%;
        display: flex;
        .title {
          font-weight: 500;
          margin-right: 15px;
          padding-bottom: 5px;
          transition: 0.2s;
          border-bottom: 2px solid transparent;
          &:hover {
            cursor: pointer;
            border-bottom: 2px solid rgb(41, 121, 255);
            color: rgb(41, 121, 255);
          }
        }
        .selected {
          border-bottom: 2px solid rgb(41, 121, 255);
          color: rgb(41, 121, 255);
        }
        .count {
          color: rgb(41, 121, 255);
          font-size: 13px;
        }
      }
      .render_container {
        width: 100%;
        height: 50vh;
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: 20px;
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
    }
    &__footer {
    }
  }
`;
