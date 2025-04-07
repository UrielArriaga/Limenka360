import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const TrackingsInventory = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 24%;
    padding: 24px 24px 37px 24px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    @media (max-width: 600px) {
      width: 100%;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      &__title {
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.03em;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      &__close {
        cursor: pointer;
        color: red;
      }
      &__refresh {
        cursor: pointer;
        font-size: 18px;
        margin-left: 8px;
      }
    }
    .trackings {
      height: 803px;
      /* padding: 10px; */
      overflow-x: scroll;
      overflow-x: hidden;
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #407aff;
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 10%;
      /* height: 400px; */
      &__img {
        width: 150px;
        animation: slide_img 3s infinite;
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
      @keyframes slide_img {
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
    .target_tracing {
      padding: 10px;
      height: 210px;
      width: 100%;
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
      .observation {
        height: 45%;

        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .tracing_empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      img {
        width: 320px;
        height: 120px;
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

    .pagination {
      position: absolute;
      bottom: 10px;
      right: 20px;
      display: flex;
      align-items: center;
      .pageCount {
        font-weight: 500;
        margin-right: 9px;
        font-size: 13px;
      }
      .pageBefore {
        border: 1px solid #3f51b5;
        color: #3f51b5;
        padding: 12px;
        overflow: visible;
        font-size: 11px;
        text-align: center;
        margin-right: 10px;
        border-radius: 50%;

        width: 26px;
        height: 26px;
        &:hover {
          background: #103c82;
          color: #fff;
        }
      }
      .pageNext {
        border: 1px solid #3f51b5;
        color: #3f51b5;
        padding: 12px;
        overflow: visible;
        font-size: 11px;
        text-align: center;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        &:hover {
          background: #103c82;
          color: #fff;
        }
      }
    }
  }
`;
