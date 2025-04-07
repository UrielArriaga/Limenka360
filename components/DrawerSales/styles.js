import { Drawer, colors } from "@material-ui/core";
import styled from "styled-components";
export const DrawerStyled = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 60%;
    overflow-y: hidden;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }

  .hiddeButton {
    height: 8%;
    border: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(-50%, -50%);
    border-radius: 0 10rem 10rem 0;
    transition: 0.1s;
    cursor: pointer;
    &:hover {
      border-color: #3f51b5;
      svg {
        transform: translate(5px);
        color: #3f51b5;
        /* margin-left: 5px; */
      }
    }
    svg {
      transition: 0.2s;
      margin-right: 5px;
      font-size: 22px;
      color: #d0d0d0;
    }
  }
  .ctr_information {
    height: 100%;
    padding: 20px 20px 20px 35px;
    overflow-y: auto;
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
    &__ctr_targets {
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
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
          padding: 0.27rem 0.25rem;
          /* width: 100%; */
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
      .titlePendings {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: space-between;
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
      .ctr_grid {
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
      .containerLoader {
        display: flex;
        padding: 5px;
        margin: auto;
        height: 235px;

        align-items: center;
      }
      .MuiCircularProgress-root.MuiCircularProgress-indeterminate {
        color: #3f51b5;
      }
      .target_payments {
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
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }
        .paymentButton {
          position: absolute;
          bottom: 5px;
          width: 300px;
          margin-left: 5px;
        }
      }
      .target_tracing {
        padding: 10px;
        height: 150px;
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
    :hover {
      color: blue;
    }
  }

  .tooltip {
    width: 90px;
  }
`;
export const MenuWhats = styled.div`
  .headerMenu {
    display: flex;
    align-items: center;
    .titleMenu {
      font-weight: 500;
      padding: 5px 5px 10px 10px;
    }
    &__icon {
      margin-top: -4px;
      font-size: 15px;
      color: #103c82;
    }
  }
  .number {
    font-weight: 500;
    padding: 5px 10px;
  }
  .menuItem {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: rgb(220, 225, 246, 0.4);
      .iconArrow {
        font-size: 25px;
        color: #103c82;
        transform: translateX(4px);
      }
    }

    .iconArrow {
      font-size: 25px;
      transition: 0.3s;
      margin-left: 5px;
      color: grey;
    }
    &__icon {
      color: green;
      font-size: 17px;
      margin-right: 5px;
    }
    &__title {
      font-weight: 500;
      font-size: 13px;
    }
  }

  .paymentButton {
    margin-top: 20px;
  }

  .switchContainer {
    background-color: red;
  }
`;

export const DivLine = styled.div`
  background-color: #303f9f;
  height: 0.5px;
  width: 100%;
`;
