import { Drawer } from "@material-ui/core";
import styled from "styled-components";
export const DrawerStyled = styled(Drawer)`
  p {
    margin: 0;
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
    padding-left: 15px;
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
    &__data {
      padding: 10px;
      // background-color: #f5f5f5;
      border-radius: 5px;

      .label {
        font-size: 13px;
        font-weight: bold;
        color: #4f4f4f;
        margin-bottom: 2px;
      }
      .ok {
        background-color: rgb(9, 122, 9);
        color: #fff;
        width: fit-content;
        padding: 4px 4px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 700;
      }
      .rejected {
        background-color: rgb(191, 24, 24);
        color: #fff;
        width: fit-content;
        padding: 4px 4px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 700;
      }
      .pending {
        background-color: rgb(229, 202, 10);
        color: #fff;
        width: fit-content;
        padding: 4px 4px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 700;
      }
      .exitstatus {
        background-color: #2979ff;
        color: #fff;
        width: fit-content;
        padding: 4px 4px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 700;
      }
      .labelTitles {
        font-weight: bold;
        color: #4f4f4f;
        letter-spacing: 0.03em;
        cursor: pointer;
      }
      .paragraph {
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }
      .light {
        color: #2979ff;
      }
      .whatsApp {
        cursor: pointer;
      }
      .capitalize {
        text-transform: capitalize;
      }

      .name {
        text-transform: capitalize;
      }
      .contenido {
        .product {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 7px;
          margin-bottom: 15px;
          .infoName {
            display: flex;
            flex-direction: column;
            .title {
              font-size: 12px;
              color: #4f4f4f;
              font-weight: 700;
            }
            .info {
              font-weight: 500;
              font-size: 14px;
              color: #0e2d58;
            }
          }
          .quantities {
            display: flex;
            margin-left: 15px;
            .infoPrice {
              display: flex;
              flex-direction: column;
              align-items: center;
              .title {
                font-size: 12px;
                color: #4f4f4f;
                font-weight: 700;
              }
              .info {
                font-weight: 500;
                font-size: 14px;
                color: #0e2d58;
              }
            }
            .infoQuantity {
              margin-left: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .title {
                font-size: 12px;
                color: #4f4f4f;
                font-weight: 700;
              }
              .info {
                font-weight: 500;
                font-size: 14px;
                color: #0e2d58;
              }
            }
          }
        }
      }
    }
    &__ctr_targets {
      width: 100%;

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
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
        }
      }

      .cont {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }
      .order {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          margin-top: 7px;
          margin-right: 7px;
          font-weight: 600;
          color: #495057;
        }
        .input {
          margin-top: 7px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          height: 40px;
          border: 2px solid #f3f3f3;

          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
            color: #405189;
          }
        }
      }
      .cont {
        display: flex;

        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }
      .titlePendings {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: space-between;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
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
        }
      }
      .ctr_grid {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }
      .containertext {
        width: 100%;
        margin-top: 1%;
        /* height: 100px; */
        border: 1px solid #ccc;
        /* padding: 10px; */
        border-radius: 5px;
        /* background-color: red; */
        .headercontainertracking {
          background-color: #f3f4f8;
          padding: 10px;
          p {
            font-size: 12px;
            color: #616161;
          }
        }
        .textareatrackings {
          outline: none;
          border: none;
          width: 100%;
          /* height: 20px; */
          min-height: 20px;
          resize: none;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          padding: 10px;
        }
        .actionscontainertracking {
          padding: 10px;
          button {
            margin-right: 10px;
          }
        }
        .actionscontainertracking .active {
          background-color: #000;
          color: #fff;
          cursor: pointer;
          padding: 5px 10px;
          border: none;
        }

        .actionscontainertracking .disablebutton {
          background-color: #ccc;
          color: #fff;
          cursor: not-allowed;
          padding: 5px 10px;
          border: none;
        }
      }
      .containertext .line {
        width: 98%;
        height: 1px;
        margin: auto;
        background-color: #ccc;
        margin-top: 10px;
      }
      .ctr_grid2 {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding: 0px 10px;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }
      .render_content {
        height: 55vh;
        overflow: auto;
        overflow-x: hidden;
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
      .tabs {
        display: flex;
        margin-top: 20px;
        margin-bottom: 10px;
        .bt_tab {
          margin-right: 2px;
          font-size: 13px;
          border-radius: 0px;
          color: grey;
          border-bottom: 2px solid transparent;
        }
        .active {
          font-weight: bold;
          color: #103c82;
          border-bottom: 2px solid #103c82;
        }
      }
      .containerLoader {
        display: flex;
        padding: 5px;
        margin: auto;
        height: 265px;

        align-items: center;
      }
      .MuiCircularProgress-root.MuiCircularProgress-indeterminate {
        color: #3f51b5;
      }
      .target_tracing {
        background-color: #fff;
        padding: 10px;
        height: 210px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
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
      .target_pendings {
        padding: 10px;
        height: 245px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
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
          }
        }
        .ct_icon_complete {
          justify-content: center;
          color: #008000;
        }
        .ct_icon_incomplete {
          justify-content: center;
          color: red;
        }
        .pendingButton {
          position: absolute;
          width: 300px;
          margin-left: 5px;
          margin: 2px 0px;
          text-transform: capitalize;
          font-size: 12px;
          margin-top: -11px;
        }
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }

        .time {
          font-size: 14px;
          font-weight: bold;
          color: #103c82;
        }
      }

      .target_sales {
        padding: 10px;
        height: 250px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
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
        .paymentTrue {
          color: green;
        }
        .paymentFalse {
          color: red;
        }
        span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
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
            .iconStatus {
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
        .OrderButton {
          position: absolute;
          width: 300px;
          margin-left: 5px;
          margin: 2px 0px;
          text-transform: capitalize;
          font-size: 12px;

          margin-top: 22px;
        }
        /* .products {
          overflow-x: auto;
          height: 50px;
          ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
          }
          ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 20px #0c203b;
          }
          .product {
            display: flex;
            svg {
              color: #3f51b5;
            }
          }
        } */
      }
    }
    .ctr_targetsProducts {
      width: 100%;
      margin-top: 20px;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
          cursor: pointer;
        }
      }
      .ctr_grid {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }

      .target_products {
        background-color: #fff;
        padding: 10px;
        height: 233px;
        width: max-content;
        min-width: 320px;
        max-width: 492px;
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
      }
    }
    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
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

  .link {
    margin-left: 8px;
    cursor: pointer;
    :hover {
      color: blue;
    }
  }

  .tooltip {
    width: 90px;
  }
`;

export const DivLine = styled.div`
  background-color: #303f9f;
  height: 0.5px;
  width: 100%;
`;
