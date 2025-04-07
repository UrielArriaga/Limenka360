import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const TrackingsOrderStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 20%;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    &__title {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.03em;
    }

    &__close {
      cursor: pointer;
      color: red;
    }
  }

  /* .drawer_container {
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
    } */
`;
