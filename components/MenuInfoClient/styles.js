import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
import { Popover } from "@material-ui/core";

export const DetailsContainer = styled.div`
  border-radius: 8px;
  .topHeads {
    padding: 0px 10px 0px 10px;
    margin-top: 8px;
    @media ${device.md} {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pagination {
      display: flex;
      align-items: center;
    }
    .totalPage {
      font-weight: 500;
      font-size: 14px;
      color: grey;
    }
  }
  .title {
    display: flex;
    align-items: center;

    .text {
      cursor: pointer;
      font-weight: 500;
      color: #000;
      font-size: 15px;
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
    .iconRefresh {
      font-size: 14px;
      color: rgb(16, 60, 130);
      cursor: pointer;
      margin-left: 6px;
    }
  }
`;

export const TabContent = styled.div`
  width: 100%;
  height: 45vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 10px;
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
`;

export const tabStyle = {
  fontSize: "0.9rem",
  textTransform: "none",
};
export const PreviewOportunitiesStyle = styled.div`
  //pagos
  .itemDiv {
    display: flex;
    align-items: center;
    .data.status {
      margin-left: 4px;
      font-size: 13px;
    }
  }

  .card {
    border-radius: 8px;
    position: relative;
    border-radius: 8px;
    padding: 10px;
    margin: 1em;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
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
    .title {
      font-weight: 500;
      font-size: 13px;
      color: gray;
    }
    .status {
      font-size: 14px;
      font-weight: 500;
    }
    .top {
      margin-bottom: 5px;

      @media ${device.md} {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

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
        .dateRedirect {
          font-size: 14px;
          font-weight: bold;
          &:hover {
            color: #3f51b5;
            cursor: pointer;
          }
        }
        .date {
          font-size: 14px;
          font-weight: bold;
        }
        .capitalize {
          font-size: 13px;
          font-weight: bold;
        }
      }
      .options {
        border-radius: 8px;
        transition: 0.2s;
        margin-left: 11px;
        background-color: #8da5edb0;
        color: #fff;
        &:hover {
          background-color: #3f51b5;
          cursor: pointer;
        }
      }
    }
    .totalTop {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-gap: 10px;
      margin-bottom: 11px;
    }
    .code {
      font-size: 14px;
    }
    .observations {
      width: 100%;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
      resize: vertical;
      outline: none;
      cursor: default;
    }
    &-header {
      display: flex;
      justify-content: space-between;
      .location {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        .icon {
          color: ${colors.primaryColorDark};
          font-size: 18px;
        }
      }
      .date {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
        .icon {
          color: ${colors.primaryColorDark};
          font-size: 18px;
        }
      }
    }
  }
  .products {
    margin-bottom: 3px;
    margin-top: 6px;
    .containerProducts {
      height: 40px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 4px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #585858;
      }
    }
    p {
      letter-spacing: 0.03em;
      font-size: 11px;
    }

    .bold {
      font-weight: bold;
    }

    .icon {
      background-color: #3f51b5;
      color: #fff;
      border-radius: 8px;
    }
  }
`;
export const PreviewSalesStyle = styled.div`
  .card {
    border-radius: 8px;
    position: relative;
    border-radius: 8px;
    padding: 10px;
    margin: 1em;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
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
      .dateRedirect {
        font-size: 14px;
        font-weight: bold;
        &:hover {
          color: #3f51b5;
          cursor: pointer;
        }
      }
      .options {
        border-radius: 8px;
        transition: 0.2s;
        margin-left: 11px;
        background-color: #8da5edb0;
        color: #fff;
        &:hover {
          background-color: #3f51b5;
          cursor: pointer;
        }
      }
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
          font-size: 13px;
          font-weight: bold;
        }
        .capitalize {
          text-transform: capitalize;
          font-weight: bold;
          font-size: 13px;
        }
      }
    }
    .headTop {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-gap: 10px;
      margin-bottom: 11px;
    }
    .title {
      font-weight: 500;
      font-size: 13px;
      color: gray;
    }

    .text-Amount {
      .icon {
        color: #407aff;
        font-size: 18px;
      }

      .amount {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .observations {
      width: 100%;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
      resize: vertical;
      outline: none;
      cursor: default;
    }
    .products {
      margin-bottom: 3px;
      margin-top: 6px;
      .containerProducts {
        height: 40px;
        overflow-y: auto;
        ::-webkit-scrollbar {
          width: 4px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #585858;
        }
      }
      p {
        letter-spacing: 0.03em;
        font-size: 11px;
      }

      .bold {
        font-weight: bold;
      }

      .icon {
        background-color: #3f51b5;
        color: #fff;
        border-radius: 8px;
      }
    }
  }
`;

export const CardPaymentsStyle = styled.div`
  .card {
    border-radius: 8px;
    position: relative;
    border-radius: 8px;
    padding: 10px;
    margin: 1em;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
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
      .options {
        border-radius: 8px;
        transition: 0.2s;
        margin-left: 11px;
        background-color: #8da5edb0;
        color: #fff;
        &:hover {
          background-color: #3f51b5;
          cursor: pointer;
        }
      }
      .dateRedirect {
        font-size: 14px;
        font-weight: bold;
        &:hover {
          color: #3f51b5;
          cursor: pointer;
        }
      }
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
          font-size: 13px;
          font-weight: bold;
        }
        .capitalize {
          text-transform: capitalize;
        }
      }
    }
    .paymentTrue {
      color: green;
      font-weight: 500;
      font-size: 14px;
    }
    .paymentFalse {
      color: red;
      font-weight: 500;
      font-size: 14px;
    }
    .itemPayment {
      display: flex;
      font-size: 14px;
    }
    .code {
      font-size: 14px;
      font-weight: 500;
    }
    .itemContainerDates {
      display: flex;
      font-size: 14px;
      align-items: center;
    }
    .span {
      font-weight: 500;
      font-size: 13px;
      color: gray;
      margin-right: 6px;
    }
  }
`;
export const MenuFile = styled(Popover)`
  .container {
    display: flex;
    flex-direction: column;
    .option {
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      border-radius: 0px;
      color: #3f51b5;
      font-size: 13px;
      &:hover {
        background-color: #3f51b5;
        color: #fff;
      }
    }
    .optionDisabled {
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      border-radius: 0px;
      color: gray;
      font-size: 13px;
    }
  }
`;
