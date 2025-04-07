import styled from "styled-components";
import { colors, device } from "../../../styles/global.styles";
import { Dialog } from "@material-ui/core";

export const StyledDialog = styled(Dialog)`
  backdrop-filter: blur(5px);
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    width: 100%;
    max-width: 500px;
    overflow: show;
    background-color: #eeeeee;
  }
  .may {
    text-transform: capitalize;
  }
  .title {
    background: red;
    height: 40px;
    padding: 10px;
    background-color: #e0e0e0;
    font-weight: bold;
  }
  .content {
    text-align: justify;
    padding: 10px;
    font-size: 16.5px;
    font-weight: 500;
  }

  .button_aceptar {
    background-color: #776ceb;
    color: #fff;
    height: 25px;
    width: 60px;
    font-size: 12px;
    border-radius: 3px;
    border: 0px;
    padding: 4px;
    :hover {
      background-color: #3f51b5;
      cursor: pointer;
    }
  }

  .button_cancelar {
    background-color: grey;
    color: #fff;
    height: 25px;
    width: 60px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    :hover {
      background-color: #3f51b5;
      cursor: pointer;
    }
  }
`;

export const StyleEditPaymentDialog = styled(Dialog)`
  backdrop-filter: blur(5px);
  p {
    margin: 0;
    padding: 0;
  }
  input {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 4px;
    border: 1px solid #bdbdbd;
    padding: 10px;
    font-size: 14px;
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    width: 100%;
    max-width: 500px;
    overflow: show;
    background-color: #eeeeee;
  }
  .may {
    text-transform: capitalize;
  }
  .title {
    background: red;
    height: 40px;
    padding: 10px;
    background-color: #e0e0e0;
    font-weight: bold;
  }
  .content {
    display: grid;
    grid-template-columns: auto;
    text-align: justify;
    padding: 10px;
    font-size: 16.5px;
    label {
      margin-top: 7px;
      font-size: 14px;
      color: grey;
    }
  }

  .button_aceptar {
    background-color: #776ceb;
    color: #fff;
    height: 25px;
    width: 60px;
    font-size: 12px;
    border-radius: 3px;
    border: 0px;
    padding: 4px;
    :hover {
      background-color: #3f51b5;
      cursor: pointer;
    }
  }

  .button_cancelar {
    background-color: grey;
    color: #fff;
    height: 25px;
    width: 60px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    :hover {
      background-color: #3f51b5;
      cursor: pointer;
    }
  }
`;

export const PaymentStyle = styled.div`
  width: calc(100% - 40px);
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 25px 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .main {
    height: 100%;
    overflow-y: scroll;
  }

  @media ${device.sm} {
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    .head .title .icon {
      color: #fff;
      background-color: #776ceb;
      border-radius: 5px;
      width: 25px;
      height: 25px;
      margin-top: 5px;
      margin-right: 10px;
      cursor: pointer;
    }

    .head .totalrows {
      display: flex;
    }

    .head .totalrows * {
      margin-right: 2px;
    }
  }
  .search {
    margin-bottom: 20px;
  }

  .inputicon {
    position: relative;

    .searchicon {
      position: absolute;
      top: 10px;
      left: 8px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      padding-left: 40px;

      &:focus {
        outline: 1px solid ${colors.primaryColor};
      }
    }
  }
  .Filter {
    @media ${device.sm} {
      display: flex;
      align-items: baseline;
      justify-content: end;
    }
  }
  .activefilterssection {
    display: flex;

    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    margin: 0px 0px;
    padding: 5px 0px;
  }

  .filters {
    display: inline-block;
    background-color: #dad8db;
    select {
      height: 30px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
    }
  }

  .chip {
    text-transform: capitalize;
  }

  .payment_information_container {
    margin: 15px 0px;
    background-color: #eeeeee;

    .payment_information_header {
      display: grid;
      grid-template-columns: auto 30px;
      background-color: #e0e0e0;
      padding: 8px;
      height: 40px;
      font-weight: bold;
      :hover {
        cursor: pointer;
      }
    }

    .payment_information {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Modificación */
      text-transform: capitalize;
      margin: 8px;
      padding: 5px;

      button {
        background-color: #776ceb;
        color: white;
        font-size: 12px;
        border-radius: 3px;
        border: 0px;
        padding: 4px;
        :hover {
          cursor: pointer;
        }
      }

      button:hover {
        background-color: #3f51b5;
      }

      .label {
        margin: 4px;
        font-size: 14px;
        color: grey;
      }

      .value {
        font-size: 16.5px;
        font-weight: 500;
      }
    }
  }
`;

export const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;
  background-color: #e5efff;

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
      .txt-group {
        font-size: 11px;
        color: #616161;
        text-transform: capitalize;
      }
      span {
        font-size: 12px;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
      text-transform: capitalize;
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
