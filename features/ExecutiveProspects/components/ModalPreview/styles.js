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
  .row {
    display: flex;
    width: 100%;
  }

  .modalcontainer {
    width: 100%;
  }

  .headerPreview {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* margin-bottom: 20px; */

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #282455;
      text-transform: capitalize;
    }
  }

  .headertabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 0;
    /* border-bottom: 1px solid #d9d9d9; */
    /* background-color: #fff; */
    /* background-color: red; */

    .MuiTabs-flexContainer {
      /* background-color: red; */
      /* margin-bottom: 20px; */
      /* margin-left: 20px; */
      /* background-color: #fff; */
      /* border-radius: 8px; */
      /* padding: 10px; */
      /* box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px; */
    }

    .MuiTabs-scroller {
      padding: 0;
    }

    .MuiTabs-flexContainer {
      /* padding: 20px; */
    }

    .MuiTab-root {
      padding: 6px 12px; /* si quieres modificar el padding del tab individual */
      min-width: unset;
      margin-right: 20px;
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

  .actionsbar {
    width: 50px;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */

    /* <div className="actionsbar">
          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <Close />
            </IconButton>
          </div>
        </div> */

    .actionsbar__item {
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: #407aff; */
      color: #fff;
      width: 30px;
      height: 30px;

      border-radius: 50%;
      cursor: pointer;
      margin-bottom: 10px;
    }

    .actionsbar__icon {
      font-size: 20px;
    }

    /* align-items: center; */
    /* margin-top: 20px; */
    /* button {
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
    } */
  }
`;
