import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { device } from "../../styles/global.styles";

export const DrawerPurchasingOrderStyle = styled(Drawer)`
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
      width: 200px;
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
  .container {
    padding: 10px;
    &__head {
      width: 100%;
      padding: 10px;
    }

    &__titleBox {
      display: flex;
      align-items: center;
      gap: 10px;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .redirec {
        cursor: pointer;
      }
    }
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;

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
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220 225 246 / 0%);
        color: #0c203b;
        border-radius: 50%;
      }
    }
    .headers {
      font-size: 13px;
      font-weight: bold;
      color: #4f4f4f;
    }
    .divider_white {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1.5px solid white;
    }
    .divider {
      margin-top: 20px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid rgb(241, 241, 241);
    }
  }
`;
