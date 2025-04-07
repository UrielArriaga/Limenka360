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

      .title {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
    }
    &__body {
      .info_prospect {
      }
      .titleHeader {
        display: flex;
        align-items: center;

        .headersTitle {
          font-weight: bold;
          letter-spacing: 0.03em;
          cursor: pointer;
        }
        .icon {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
      }
      .headersTitle {
        font-weight: bold;
        letter-spacing: 0.03em;
        cursor: pointer;
      }
      .title {
        color: grey;
        font-size: 13px;
      }
      p.data.capitalize {
        font-size: 16px;
        font-weight: 500;
        color: rgb(0, 0, 0);
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

      .card {
        padding: 10px;
        margin-bottom: 20px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        background-color: #fff;

        border-radius: 10px;

        .title {
          font-weight: bold;
          font-size: 14px;
        }
      }
      .link {
        cursor: pointer;
        color: #3f51b5;
      }
    }
    &__footer {
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
export const LindeDivider = styled.hr`
  width: 100%;
  border-top: 1.5px solid rgb(241, 241, 241);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 5px;
`;
