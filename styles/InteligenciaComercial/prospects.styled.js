import { Switch, withStyles } from "@material-ui/core";
import styled, { css } from "styled-components";
import { colors, device } from "../global.styles";

export const ProspectosStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      &__title {
        font-size: 14px;
        margin-bottom: 10px;
      }
      &__titleDiv {
        display: flex;
        align-items: center;
        .buttonIcon {
          padding: 3px;
        }
        svg {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
        p {
          font-size: 18px;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
      }
      &__total {
        display: flex;
        align-items: center;
        font-weight: 500;
        svg {
          font-size: 15px;
          margin-left: 10px;
          cursor: pointer;
          color: rgb(16, 60, 130);
        }
        .reload {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
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
      .img {
        width: 150px;
        animation: slide_img 3s infinite;
        img {
          width: 100%;
          object-fit: contain;
        }
      }
      .load {
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
    .filter {
      align-items: end;
      @media ${device.sm} {
        display: flex;
        justify-content: right;
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
    .ctr_ejecutives {
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
  }
  .MuiGrid-container {
    width: 100%;
    display: flex;
    flex-wrap: initial;
    box-sizing: border-box;
  }
  .gridtable {
    width: 100%;
    max-height: 58vh;
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
      min-width: 250px;
      font-weight: bold;
      font-size: 14px;
    }
  }

  .body {
    div:nth-child(1) {
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      padding-left: 10px;
      top: 0;
      background-color: #f5f5f5;

      min-width: 267px;
      text-transform: capitalize;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      text-align: left;
    }
    div {
      background-color: #f5f5f5;
      padding: 10px;
      min-width: 250px;
      font-weight: bold;
      font-size: 14px;
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
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

export const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;

  ${props =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}
  ${props =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}
  ${props =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
  &:hover {
    background-color: #d8dbe6;
  }

  .txt-labelssa {
    .index {
      display: contents;
    }
    .chipView {
      height: 18px;
      background: #d8dbe6;
      padding: 2px;
      text-decoration: underline;
      &:hover {
        border: 1px solid #407aff54;
        cursor: pointer;
      }
    }
    .MuiChip-root.chip {
      height: 18px;
      background: #d8dbe6;
      padding: 2px;
      margin-right: 2px;
    }
    .MuiChip-label {
      overflow: hidden;
      white-space: nowrap;
      padding-left: 9px;
      padding-right: 0px;
      text-overflow: ellipsis;
      color: #0d47a1;
      font-weight: 600;
      font-size: 11px;
    }
    .MuiChip-root .MuiChip-avatar {
      margin-left: 1px;
      margin-right: -6px;
    }
    .fire {
      font-size: 11px;
      padding: -5px;
      height: 10px;
      background: white;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
  }

  .txt-label {
    display: flex;
    align-items: baseline;
    .spans {
      font-weight: bold;
      font-size: 12px;
      color: #495057;
      margin-right: 8px;
    }
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      /* justify-content: space-between; */
    }
    &__flexlabels {
      display: flex;
      flex-wrap: wrap;
      text-align: justify;
      justify-content: initial;
      align-items: baseline;
      .spans {
        font-weight: bold;
        font-size: 12px;
        color: #495057;
        margin-right: 8px;
      }
    }
    &__flexlabelsss {
      display: flex;
      flex-wrap: wrap;
      text-align: justify;
      justify-content: initial;
      align-items: baseline;
      .spans {
        font-weight: bold;
        font-size: 12px;
        color: #495057;
        margin-right: 8px;
      }
    }
    &__moreName {
      color: rgb(13, 71, 161);
      font-weight: bold;
      font-size: 14px;
    }
    &__more {
      .txt-labels {
        font-size: 12px;
        color: #616161;
        font-weight: bold;
      }
      .txt-lastracking {
        font-size: 12px;
        color: #616161;
      }

      .txt-createdAt {
        font-size: 11px;
        color: #616161;
      }
      span {
        font-size: 12px;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .icon-bg {
      .openprospect {
        width: 15px;
        height: 15px;

        &:hover {
          cursor: pointer;

          color: #0d47a1;
        }
      }
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;
