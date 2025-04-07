import { Drawer } from "@material-ui/core";
import Select from "react-select";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";

export const LayoutDrawer = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(100% - 250px);
    border-top-left-radius: 10px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }
  }

  .drawer {
    display: flex;
    // * LEFT CONTENT
    .selection {
      width: 20%;
      .drawer-templates {
        padding: 20px;
        height: 100vh;
        overflow: scroll;
        .subtitle {
          margin-top: 15px;
        }
        .template {
          display: flex;

          div {
            transition: all 0.6s ease;
            margin: 10px;
            &:hover {
              transform: translateY(-5px);
              cursor: pointer;
              img {
                box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
              }
            }
          }
        }

        .card-selected {
          border: 2px solid #103c82;
        }
        .card:hover {
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        }
      }
    }
  }

  .preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .preview_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .top {
    display: flex;
  }
  .drawertop {
    padding: 20px;
    font-weight: bold;

    &__title {
      font-size: 21px;
      font-weight: bold;
      letter-spacing: 0.03em;
      color: #103c82;
    }
  }
`;
