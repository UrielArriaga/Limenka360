import { Drawer, Menu, Switch, withStyles } from "@material-ui/core";
import styled, { css } from "styled-components";
import { colors, device } from "../../../../styles/global.styles";

export const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%), 0px 3px 5px 2px rgb(0 0 0 / 5%);
  }

  .options {
    display: flex;
    flex-direction: column;

    &__option {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
      }

      svg {
        color: #f97faa;
        margin-right: 5px;
      }
      &:hover {
        transition: all 0.3s ease;
        background: #fae0e9;
        cursor: pointer;
      }
    }
  }
`;
export const TableDataSettingsColumn = styled.td`
  position: sticky;
  right: 0;
  transition: all 0.3s ease;
  min-height: 42px;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      position: relative;
      background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#f8bbd0")};
      cursor: pointer;
      color: #fff;
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;
export const ReportProspectsLayout = styled.div`
  .top {
    display: flex;
    align-items: center;

    .titleOrigin {
      color: #616161;

      text-transform: capitalize;
      margin-right: 9px;
      font-size: 17px;
      font-weight: 500;
    }
    .selectOrigin {
      height: 30px;
      width: 240px;
    }
  }
  .order-select {
    padding: 4px;
    border: 1.6px solid #103c82;
    border-radius: 8px;
    outline: none;
  }
  .ctr_filter {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    &__ctr_input {
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
          padding-right: 40px;
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
      .filters {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        right: 10px;
        &:hover {
          padding: 3px;
          cursor: pointer;
        }
      }
    }
  }
  .containerDate {
    width: 100%;

    @media ${device.sm} {
      display: flex;
      justify-content: space-between;
    }
    .boxDates {
      padding: 0px 18px 0px 0px;
    }
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__title {
      font-size: 14px;
      margin-bottom: 10px;
      padding: 0px 0px 0px 18px;
      display: flex;
      .total {
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
  }
  .cont_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

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
  .table {
    overflow-x: auto;
  }

  .tfooter {
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
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
`;

export const Container = styled.div``;

export const TableComponentStyled = styled.div`
  background-color: #fff;
  width: 100%;
  max-height: 70vh;
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
`;

export const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

export const TableHead = styled.thead`
  position: sticky;
  top: 0;
  /* z-index: 50; */
`;

export const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
`;

export const TableHeadColumn = styled.th`
  min-width: 200px;
  text-align: left;
  padding-left: 10px;
  text-transform: capitalize;
`;

export const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

export const TableRowBody = styled.tr`
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

    .column_id {
      background-color: #d8dbe6;
    }
  }

  .asdas {
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
  }
`;

export const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;
  p {
    font-weight: bold;
    font-size: 14px;
  }
  .phase {
    background-color: gray;
    text-transform: uppercase;
    border-radius: 4px;
    color: #fff;
    padding: 4px 4px;
    font-size: 12px;
    font-weight: normal;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
`;
export const TableHeadIdColumn = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;

  top: 0;
  background: #405189;
  color: #fff;
  min-width: 150px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
  @media (max-width: 600px) {
    position: relative;
  }
`;

export const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 14px;
  background-color: #fff;

  .data {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 14px;
      font-weight: bold;
      color: #0d47a1;
      font-weight: bold;
      cursor: pointer;
    }
    .icon {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
  .created {
    font-size: 12px;
    color: #616161;
    font-weight: 400;
  }
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
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__more {
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
export const mixinBG = props => {
  switch (true) {
    case props.isPar === true:
      return `
      background-color: #f5f5f5;  
        `;

    case props.isPar === false:
      return `
          background-color: #fff;  
            `;

    default:
      return `&:hover {
        background-color: #d8dbe6 !important;
      }`;
  }
};
export const TableRow = styled.tr`
  height: 50px;

  ${mixinBG};

  &:hover {
    background-color: #d8dbe6;
  }
`;
export const DrawerContainer = styled(Drawer)`
  /* backdrop-filter: blur(2px); */
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
      background-color: none;
    }

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
  .ctr_drawer {
    padding-bottom: 60px;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .title {
        font-weight: bold;
      }

      .close_icon {
        color: #8a8a88;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          color: #f50;
        }
      }
    }
    &__ctr_inputs {
      transition: all 0.4s ease;
      margin-bottom: 20px;
      &__input {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .label {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 5px;
          display: flex;
          &__iconOrder {
            margin-left: 5px;
            margin-bottom: -4px;
            font-size: 24px;
            color: #103c82;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .input {
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 0.47rem 0.75rem;
          width: 100%;
          height: 40px;
          border: 2px solid #f3f3f3;
          color: #000;
          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
          }
        }
        &__with_icon {
          display: flex;
          align-items: center;
          svg {
            width: 40px;
            height: 40px;
            padding: 8px;
          }
        }
      }
    }
    &__ctr_buttons {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 25%;
      .btn_cancel {
        background: #0c203b;
        margin-right: 10px;
        color: #fff;
        text-transform: capitalize;
      }
      .btn_apply {
        background: #405189;
        color: #fff;
        text-transform: capitalize;
      }
    }

    .container {
      display: flex;
      margin-left: 0%;
      margin-top: 10%;
      width: 90%;

      .casilla {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-block-end: 5%;
        margin-left: 5%;

        .checkBox {
          display: flex;
          transform: scale(1.5);
        }

        .label2 {
          display: flex;
          font-size: 18px;
          opacity: 0.9;
        }

        .icon {
          margin-right: 1%;
          font-size: 30px;
          color: #103c82;
        }
      }
      .label3 {
        margin-left: 45%;
        display: flex;
        margin-right: 5%;
        font-size: 18px;
        opacity: 0.9;
        margin-top: 2%;
        margin-block-end: 5%;
      }
      .select2 {
        display: flex;
        margin-left: 8%;
        margin-top: 3%;
        width: 95%;
        height: 40px;
        border: 2px solid #f3f3f3;
        color: #000;
        text-transform: capitalize;
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        margin-block-end: 15%;
        text-align: left;
        &:focus {
          outline: none;
          border: 2px solid #405189;
        }
      }
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
