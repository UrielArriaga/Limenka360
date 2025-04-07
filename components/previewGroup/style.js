import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const PreviewGroupStyle = styled(Drawer)`
  z-index: 10000000 !important;
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    z-index: 10000000 !important;
    width: 50%;
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
  .preview_group {
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .title {
        font-size: 18px;
        font-weight: 500;
      }
    }
    &__body {
      .info_group {
      }
      .tabs {
        overflow-x: auto;
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
          font-weight: bold;
        }
      }
      .render_container {
        width: 100%;
        height: 68vh;
        bottom: 0;
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
