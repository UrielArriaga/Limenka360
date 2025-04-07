import { Drawer } from "@mui/material";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const DrawerLayout = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 400px;
    @media (max-width: 600px) {
      width: 100%;
    }

    .appbar {
      height: 50px;
      background-color: ${colors.primaryColorDark};
      padding: 10px;
      p {
        color: #fff;
        font-weight: bold;
      }
    }

    .notifications {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .notifications .empty {
      display: flex;
      justify-content: center;
    }

    .notifications .notification {
      margin-bottom: 10px;
    }

    .notifications .notification .row {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      .dot {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10%;
        svg {
          font-size: 10px;
          color: ${colors.primaryColor};
        }
      }

      .content {
        width: 90%;

        .title {
          font-weight: bold;
          font-size: 15px;
          margin-bottom: 10px;
        }
        .message {
          font-size: 13;
          margin-bottom: 10px;
        }
        .date {
          color: #9e9e9e;
          font-size: 13px;
        }

        .btn_check {
          font-size: 12px;

          &:hover {
            color: ${colors.primaryColor};
            cursor: pointer;
          }
        }

        .flex-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }

      .photo {
        width: 20%;

        .avatar {
          background-color: ${colors.primaryColorDark};
        }
      }
    }

    .bar {
      margin: auto;
      width: 90%;
      height: 2px;
      background-color: #e0e0e0;
      margin-top: 20px;
    }
  }
`;
