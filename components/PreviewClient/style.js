import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const PreviewProspectStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
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
  .preview_prospect {
    &__header {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 18px;
        font-weight: 500;
      }
      .bt_close {
        width: 35px;
        height: 35px;
        svg {
          color: red;
        }
      }
    }
    &__body {
      .info_prospect {
      }
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
