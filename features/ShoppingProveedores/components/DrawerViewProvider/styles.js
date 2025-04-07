import styled from "styled-components";
// import { device } from "../../../../styles/global.styles";
import { Drawer } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";

export const DialogFullScreen = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 100%;
    background: #f3f3f3;
    min-height: 100vh;
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
  .ctr_edit {
    &__header {
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 60px;
      background-color: #103c82;

      &__close {
        display: flex;
        align-items: center;
        .title {
          font-weight: bold;
          color: #fff;
          font-size: 20px;
        }
        .close {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .btn_save {
        text-transform: capitalize;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
    }
    &__ctr_info {
      width: 2000px;
      min-width: 2000px;
      margin: auto;
      padding: 100px;
      padding-top: 30px;
      background: #fff;
      margin-top: 50px;
      margin-bottom: 20px;
      height: calc(100% - 100px);
      border-radius: 8px;
      .title {
        display: flex;
      }
      .contentSectionInfo {
        display: flex;
        justify-content: space-between;
      }
      .sectionInfo {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin-top: 1%;
        .address {
          background-color: #f0f0f0;
          padding: 5px;
          margin-bottom: 6px;
          margin-top: 6px;
          border-radius: 5px;
          p {
            margin-left: 5px;
          }
        }
        h4 {
          padding-bottom: 5px;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 3px;
        }
        p {
          padding: 2px;
          span {
            font-weight: bold;
            color: #616161;
          }
        }
      }
      .sectionDirections {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin-top: 1%;
        height: 310px;
        overflow: auto;
        padding: 12px;
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
        }
        .address {
          background-color: #f0f0f0;
          padding: 5px;
          margin-bottom: 6px;
          margin-top: 6px;
          border-radius: 5px;
          p {
            margin-left: 5px;
          }
        }
        h4 {
          padding-bottom: 5px;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 3px;
        }
        p {
          padding: 2px;
          span {
            font-weight: bold;
            color: #616161;
          }
        }
      }
    }
  }
`;
