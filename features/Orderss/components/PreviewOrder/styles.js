import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
export const PreviewOrderStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 60%;
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

  .headerpreview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .buttons {
      display: flex;
      .bt {
        border-radius: 5px;
        height: 30px;
        font-size: 13px;
        margin: 0px 5px;
        border: 1px solid;
        text-transform: capitalize;
        color: #fff;
      }
      .approve {
        background-color: green;
      }
      .denied {
        background-color: red;
      }
      .download {
        background-color: ${colors.primaryColorDark};
      }
    }
  }

  .swithview {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .rowinfo {
    display: flex;

    .info {
      flex: 1;
    }
  }

  .pdfview {
    .pdf {
      height: 800px;
    }
  }
  .viewdata {
    .tabs {
      margin-top: 10px;
      margin-bottom: 20px;
      .tab {
        border-bottom: 2px solid #d4d4d4;
        text-transform: capitalize;
        border-radius: 0px;
        color: grey;
      }
      .active {
        border-bottom: 2px solid ${colors.primaryColorDark};
        color: ${colors.primaryColorDark};
        font-weight: bold;
      }
    }
  }

  .observations {
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`;

export const ApproveOrderStyle = styled(Dialog)`
  .head {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 2px solid ${colors.primaryColorDark};
    margin-bottom: 10px;
    .title_head {
      font-size: 18px;
      font-weight: 500;
    }
    svg {
      font-size: 20px;
      margin-right: 5px;
    }
    .reject {
      color: red;
    }
    .approve {
      color: green;
    }
  }
  .body {
    padding: 10px 20px;
    .title_body {
      font-weight: 500;
      margin-bottom: 10px;
    }
    .title_data {
      font-size: 13px;
      color: grey;
      svg {
        font-size: 13px;
        margin-bottom: -2px;
        margin-right: 5px;
      }
    }
    .data {
      font-weight: 500;
    }
    .select_reject {
    }
    .buttons {
      margin-top: 20px;
      display: flex;
      flex-direction: row-reverse;
      .bt {
        margin: 0px 5px;
        text-transform: capitalize;
        color: #fff;
      }
      .cancel {
        background-color: red;
      }
      .accept {
        background-color: ${colors.primaryColorDark};
      }
    }
    .required {
      border: 1px solid red;
    }
  }
`;
