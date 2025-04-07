import { Drawer } from "@material-ui/core";
import styled from "styled-components";
export const DrawerFileStyled = styled(Drawer)`
  .drawerFile {
    padding: 10px;
    h3 {
      padding: 5px;
      padding-bottom: 10px;
      color: rgb(97 97 97 / 90%);
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
