import { withStyles } from "@material-ui/styles";
import styled from "styled-components";
import { colors } from "../global.styles";
import { Switch } from "@material-ui/core";

export const GropupsStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__title {
      font-size: 14px;
      margin-bottom: 10px;
    }
    &__total {
      display: flex;
      align-items: center;
      font-weight: 500;
      svg {
        font-size: 14px;
        margin-right: 5px;
        color: #103c82;
      }
      .reload {
        font-size: 18px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ctr_filter {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    .input {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      .inputText {
        width: 100%;
        height: 40px;
        input {
          padding-left: 40px;
        }
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
        border-radius: 10px;
      }
      .search {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        left: 10px;
      }
    }
  }
  .filters {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .labelOrder {
      font-weight: 700;
      margin-right: 5px;
      font-size: 12px;
      color: #0c203b;
    }
    .order-select {
      align-items: center;
      background-color: hsl(0, 0%, 100%);
      border-color: hsl(0, 0%, 80%);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      cursor: default;
      display: -ms-flexbox;
      min-height: 27px;
      color: #103c82;
    }
    .asc {
      font-size: 11px;
      font-weight: 600;
      margin-right: 5px;
      font-size: 12px;
      color: #0c203b;
    }
  }
  .activefilterssection {
    margin-bottom: 6px;
  }
  .ctr_groups {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    &__tfooter {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      &__ctr_button {
        margin-top: 10px;
        margin-bottom: 10px;
        .add_buton {
          text-transform: capitalize;
          background-color: #405189;
        }
      }
    }
    .pagination {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: right;
      align-items: center;
      margin-top: 25px;
      &__title {
      }
      &__selectLimit {
        margin-right: 10px;
        border: none;
        outline: none;
        margin-bottom: -3.5px;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
      }
      &__totalUsers {
        margin-right: 15px;
      }
      &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        width: 30px;
        height: 30px;
        border: none;
        background-color: #f3f3f3;
        transition: all 0.2s ease;
        margin-right: 5px;
        margin-left: 5px;
        &:hover {
          cursor: pointer;
          background-color: #dce1f6;
        }
        &[disabled] {
          background-color: transparent;
          color: #e5e8e8;
          cursor: default;
        }
        &__left {
          font-size: 16px;
          color: #0c203b;
          margin-right: -5px;
          font-weight: bold;
          transition: 0.2s;
          &__disabled {
            margin-right: -5px;
            font-size: 13px;
            color: grey;
          }
        }
        &__right {
          font-size: 16px;
          color: #0c203b;
          font-weight: bold;
          transition: 0.2s;
          &__disabled {
            font-size: 13px;
            color: grey;
          }
        }
      }
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
  .MuiGrid-container {
    width: 100%;
    display: flex;
    flex-wrap: initial;
    box-sizing: border-box;
  }
  .gridtable {
    width: 100%;
    max-height: 59vh;
    overflow-x: auto;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
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
  .header {
    width: 100%;
    display: flex;
    flex-wrap: initial;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 50;
    div:nth-child(1) {
      position: sticky;
      left: 0;
      padding-left: 10px;
      top: 0;
      background: #405189;
      color: #fff;
      min-width: 267px;
      text-transform: capitalize;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      text-align: left;
    }

    div {
      background-color: #dce1f6;
      padding: 10px;
      min-width: 267px;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .body {
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
      position: sticky;
      z-index: 47px;
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      top: 0;
      background-color: #f5f5f5;
      min-width: 267px;
      text-transform: capitalize;
      transition: all 0.3s ease;
      text-align: left;
      .cell {
        margin-left: 7px;
        padding: 10px;
        cursor: pointer;
      }
    }
    .containerAvatar {
      min-width: 267px;
      font-weight: bold;
      font-size: 14px;
      padding: 10px;
      padding: 10px;
      background-color: #f5f5f5;
      .avatars {
        position: initial;
      }
    }
    .total {
      min-width: 267px;
      font-weight: bold;
      font-size: 14px;
      background-color: #f5f5f5;
      .cell {
        padding: 10px;
      }
    }
    .containerColor {
      min-width: 267px;
      font-weight: bold;
      font-size: 14px;
      background-color: #f5f5f5;
    }
  }
`;
export const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
    "&$checked + $track": {
      backgroundColor: colors.primaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch);
