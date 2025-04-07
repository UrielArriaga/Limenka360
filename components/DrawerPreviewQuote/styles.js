import { Drawer } from "@material-ui/core";
import Select from "react-select";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";

export const DrawerStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    padding: 20px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .drawer_container {
    &__top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
    }

    &__selecttemplate {
      margin-top: 20px;

      .row {
        display: flex;
        overflow-x: scroll;
      }

      .row img {
        margin-right: 20px;
      }

      .actions {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
      }

      .cancel {
        margin-right: 10px;
      }

      .row .active {
        border: 2px solid green;
      }
    }

    &__data {
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
      .capitalize {
        text-transform: capitalize;
      }
    }

    &__products {
      &__top {
        p {
          font-size: 15px;
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }

      &__containercards {
        padding-top: 10px;
        &__card {
          padding: 10px;
          margin-bottom: 20px;
          box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
          background-color: #fff;

          .title {
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
    }
    .preview__pdf {
      .body_empty {
        position: relative;
        width: 100%;
        padding: 40px;
        height: 353px;
        .message_ctr {
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          p {
            text-align: center;
            color: #8a8a8a;
          }
        }
      }
    }

    .dividerTabs {
      /* margin-top: 15px; */
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
    .tabs {
      margin-top: 22px;
      button {
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 4px;
        /* width: 193px; */
        height: 30px;
        background-color: #fff;
        /* border: 1px solid #e0e0e0; */
        transition: all 0.4s ease-in-out;
        font-weight: bold;
        color: #5b759e;
        &:hover {
          font-weight: bold;
          color: #424242;
        }
      }

      .button_selected {
        background-color: rgb(48 63 159 / 9%);
        border-bottom: 2px solid #103c82;
        font-weight: bold;
        color: #103c82;
      }
    }
  }
`;

export const CustomSelected = styled(Select)`
  z-index: 51;

  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }
`;
