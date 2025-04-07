import { Drawer } from "@material-ui/core";
import styled from "styled-components";
export const DrawerStyled = styled(Drawer)`
  p {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.03em;
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

  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    @media (max-width: 600px) {
      width: 100%;
    }
    overflow: hidden;
  }

  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }

  .ctr_information {
    padding: 20px;
    overflow: auto;
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
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
      .btn_view {
        text-transform: capitalize;
      }
    }
    &__titleProspectContainer {
      display: flex;
      align-items: center;
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
    &__titleProspect {
      font-size: 16px;

      font-weight: bold;
      letter-spacing: 0.03em;
    }
    &__data {
      margin-bottom: 10px;
      margin-top: 10px;
      .label {
        font-size: 13px;
        font-weight: bold;
        color: #4f4f4f;
        margin-bottom: 2px;
      }
      .paragraph {
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }
      .light {
        color: #2979ff;
      }
      .capitalize {
        text-transform: capitalize;
      }
      .whatsApp {
        cursor: pointer;
      }
      .oportunity {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .view {
          font-size: 15px;
          color: #82b1ff;
          font-weight: 500;
          cursor: pointer;
        }
      }
      span {
        color: #d1d1d1;
        font-size: 12px;
        font-weight: 500;
      }
      .name {
        text-transform: capitalize;
      }
    }

    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
  }

  .titulo {
    display: grid;
    grid-template-columns: auto 200px 160px;
    p {
      font-size: 18px;
    }
    button {
      margin-left: 10px;
      text-transform: capitalize;
      margin: 5px;
    }
  }

  .datos {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-top: 20px;

    .capitalize {
      text-transform: capitalize;
    }

    div {
      margin-bottom: 20px;
      padding: 8px;
    }

    p {
      font-size: 13px;
      font-weight: bold;
      color: #4f4f4f;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }
    .valuepharagraph {
      font-size: 16px;
      font-weight: 500;
      color: #2979ff;
    }
    span {
      color: #d1d1d1;
      font-size: 12px;
      font-weight: 500;
    }

    @media (max-width: 1100px) {
      grid-template-columns: auto auto;
    }

    @media (max-width: 900px) {
      grid-template-columns: auto;
    }
  }

  .payments {
    display: grid;
    grid-template-columns: auto auto auto auto;
    margin-top: 20px;
    border-radius: 5px;
    background-color: #bdbdbd;
    padding: 10px;

    div {
      padding: 8px;
    }

    p {
      font-size: 13px;
      font-weight: bold;
      color: #4f4f4f;
    }

    .value {
      color: #000;
      font-size: 16px;
    }

    @media (max-width: 900px) {
      grid-template-columns: auto auto;
    }
  }

  .icon {
    display: flex;
    align-items: center;
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

  .moreInfo {
    margin-left: 10px;
  }
`;
