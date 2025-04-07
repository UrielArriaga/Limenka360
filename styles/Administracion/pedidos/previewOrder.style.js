import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const DrawerStyled = styled(Drawer)`
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
  .ctr_grid {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    padding: 0px 10px;
    padding-bottom: 10px;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #0c203b;
    }
  }
  .target_tracing {
    padding: 10px;
    height: 210px;
    width: max-content;
    min-width: 320px;
    max-width: 350px;
    border-radius: 8px;
    position: relative;
    box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
    &::before {
      top: 0px;
      left: 0px;
      width: 5px;
      bottom: 0px;
      content: "";
      position: absolute;
      background-image: linear-gradient(
        to right bottom,
        #3f51b5,
        #2d499e,
        #1e4086,
        #13376f,
        #0e2d58,
        #122d55,
        #142c51,
        #172c4e,
        #20355c,
        #2a3e6b,
        #35487a,
        #405189
      );
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .item {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .icon {
          color: #3f51b5;
          font-size: 16px;
        }
        .date {
          font-size: 12px;
          font-weight: bold;
          color: #0c203b;
        }
        .capitalize {
          text-transform: capitalize;
        }
      }
    }
    .span {
      font-weight: bold;
      letter-spacing: 0.03em;
      font-size: 11px;
    }
  }
  .tracing_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    img {
      width: 300px;
      height: 90px;
      object-fit: contain;
    }
    .btn_tracking {
      margin-top: 10px;
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 12px;
      padding: 5px 10px;
    }
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .head {
    /* display: grid;
    grid-template-columns: auto 120px 120px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .text {
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
    .redirec {
      cursor: pointer;
      margin-bottom: 6px;
    }
  }
  .head_loading {
    display: grid;
    grid-template-columns: auto 240px;
  }
  .headers {
    font-size: 13px;
    font-weight: bold;
    color: #4f4f4f;
  }
  .cell {
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
  .na {
    color: #d1d1d1;
    font-size: 12px;
    font-weight: 500;
  }
  .divider {
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 1.5px solid rgb(241, 241, 241);
  }
  .divider_white {
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1.5px solid white;
  }
  .contact {
    font-size: 16px;
    font-weight: 500;
    color: #2979ff;
  }
  .ok {
    background-color: rgb(9, 122, 9);
    color: #fff;
    width: 100%;
    padding: 4px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .button_download {
    background-color: #103c82;
    color: #fff;
    text-transform: capitalize;
    font-size: 13px;
    margin: 3px;
    /* margin-left: 6px; */
    /* margin: 0px 0px 0px 5px; */
    :hover {
      background-color: #103c82;
    }
  }
  .link {
    cursor: pointer;
  }
  .rejected {
    background-color: rgb(191, 24, 24);
    color: #fff;
    width: 100%;
    padding: 4px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .pending {
    background-color: rgb(229, 202, 10);
    color: #fff;
    width: 100%;
    padding: 4px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .button_rejected {
    background-color: rgb(191, 24, 24);
    color: #fff;
    margin: 0px 0px 0px 0px;
    height: 35px;
    :hover {
      background-color: rgb(221, 24, 24);
    }
  }
  .button_ok {
    background-color: rgb(9, 122, 9);
    color: #fff;
    margin: 0px 0px 0px 5px;
    height: 35px;
    :hover {
      background-color: rgb(9, 152, 9);
    }
  }
  .button_loader {
    background-color: #fff;
    color: #2979ff;
    margin: 0px 0px 0px 5px;
    height: 35px;
  }
  .filesContainer {
    margin-top: 10px;
    .filesItem {
      padding: 5px;
      .fileData {
        margin: 5px;
        padding: 3px;
        border-radius: 5px;
        transition: 0.3s;
        border: 1px solid #2979ff;
        &:hover {
          background-color: rgb(41, 121, 255, 0.1);
        }

        &__header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          .icon {
            font-size: 40px;
          }
          .iconMenu {
            font-size: 25px;
            height: 5px;
            width: 5px;
            color: #2979ff;
          }
        }
        .titleFile {
          font-size: 12px;
          color: #585858;
        }
        .nameFile {
          font-weight: 500;
          font-size: 15px;
          width: 100%;
          margin-bottom: 8px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        &__footer {
          .titleDate {
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
      .word {
        .icon {
          color: #2979ff;
        }
      }
      .pdf {
        .icon {
          color: #ff1212;
        }
      }
      .image {
        .icon {
          color: #39b2e7;
        }
      }
      .excel {
        .icon {
          color: #148248;
        }
      }
      .default {
        .icon {
          color: #405189;
        }
      }
    }
  }
`;

export const AlertFile = styled.div`
  position: fixed;
  z-index: 50;
  width: 100%;
`;
