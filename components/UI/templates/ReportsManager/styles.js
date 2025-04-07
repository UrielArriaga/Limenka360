import styled, { css } from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { ErrorOutline } from "@material-ui/icons";

export const ReportExecutivesLayout = styled.div`
  width: 100%;
  /* background-image: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png"); */
  background-image: cover;

  height: calc(100vh - 60px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  .table {
    width: 100%;
    overflow-x: auto;
    transition: all 0.3s ease 0s;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  .report_section {
    background: #ffff;
    width: 100%;
    padding: 20px;
    margin: 3px 0 0 0;
    border-radius: 6px;
  }

  .order {
    display: flex;
    justify-content: flex-end;
  }

  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab {
      font-size: 15px;
      font-weight: bold;
      color: #ffff;
      background-color: rgb(64, 81, 137);
      height: 40px;
    }
  }

  /* height: 100vh; */
  /* overflow-y: scroll; */

  .loader_report {
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .padding {
    padding: 20px;
  }

  .cards {
    /* border: 1px solid red; */
  }

  .cards .card {
    height: 80px;
    background-color: red;
  }
  .header {
    border-radius: 6px;
    display: -ms-flexbox;
    align-items: center;
    justify-content: start;
    background: rgb(255 255 255);
    width: 100%;
    /* margin-top: 2px; */
    padding: 10px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    /* padding: 10px 10px 0 10px; */
  }

  .top .welcome {
    h3 {
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    p {
      color: #616161;
      font-size: 14px;
    }

    .input_phase {
      height: 30px;
      width: 200px;
      background-color: #ffff;
      border-radius: 2px;
      padding-left: 10px;
      margin-right: 4px;
      margin-bottom: 8px;
      /* border: 2px solid #cfd8dc; */
      background-color: #ffff;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }

  .top .actions {
    display: flex;
    align-items: center;

    .inputdate {
      height: 30px;
      width: 200px;
      background-color: #ffff;
      border-radius: 2px;
      padding-left: 10px;
      margin-right: 4px;
      margin-bottom: 8px;
      /* border: 2px solid #cfd8dc; */
      background-color: #ffff;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .divider-date {
      margin-right: 4px;
    }
    .btn_add {
      height: 30px;
      background-color: #3aade6;
      color: #fff;
      width: 220px;
      margin-top: 6px;
    }
  }

  .containerSelect {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    /* padding: 0px 1em; */
    border-radius: 10px;
  }
  .selecteroptions {
    margin-right: 6px;
    padding-top: 12px;
    width: 229px;
    .title {
      font-weight: 600;
      margin-left: 3px;
      color: rgb(14 60 131);
      margin-bottom: 3px;
    }
    .titleRequired {
      display: flex;
      align-items: center;
      /* margin-bottom: 8px; */
    }
    .error {
      margin-left: 6px;
      font-size: 18px;
      display: flex;
    }
    .selectOrder {
      align-items: center;
      background-color: hsl(0, 0%, 100%);
      border-color: hsl(0, 0%, 80%);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      cursor: default;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      min-height: 38px;
      outline: 0 !important;
      position: relative;
      -webkit-transition: all 100ms;
      transition: all 100ms;
      box-sizing: border-box;
    }
  }
  .Dateoptions {
    margin-right: 6px;
    padding-top: 12px;
    width: 144px;
    .title {
      font-weight: 600;
      margin-left: 3px;
      color: rgb(14 60 131);
      margin-bottom: 3px;
    }
    .titleRequired {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    .error {
      margin-left: 6px;
      font-size: 18px;
      display: flex;
    }
    .MuiFormControl-marginNormal {
      margin-top: -9px;
      margin-bottom: 8px;
      align-items: center;
      background-color: hsl(0, 0%, 100%);
      border-color: hsl(0, 0%, 80%);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      cursor: default;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      min-height: 36px;
      outline: 0 !important;
      position: relative;
      transition: all 100ms;
      box-sizing: border-box;
    }
    .MuiInputBase-input {
      width: 60%;
    }
    .MuiIconButton-root {
      flex: 0 0 auto;
      color: #0d47a1;
      padding: 12px;
      overflow: visible;
      font-size: 1.5rem;
      text-align: center;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 50%;
    }
  }
  .selecteroptionsButton {
    margin-right: 6px;
    padding-top: 14px;
    width: 100px;
    .title {
      font-weight: 600;
      margin-left: 3px;
      color: rgb(14 60 131);
      margin-bottom: 3px;
    }
    .titleRequired {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    .error {
      margin-left: 6px;
      font-size: 18px;
      display: flex;
    }
    .buttonReport {
      width: 100px;
      height: 38px;
      text-transform: capitalize;
      background-color: rgb(64, 81, 137);
      color: rgb(255, 255, 255);
      transition: background-color 0.3s ease-in-out 0s;
      border-radius: 4px;
      padding: 6px 6px;
      border: 0px;
      margin-top: 9px;
      &:hover {
        color: rgb(66, 66, 66);
        cursor: pointer;
        background-color: rgb(207, 216, 220);
      }
    }
    .disabled {
      width: 100px;
      height: 38px;
      text-transform: capitalize;
      -webkit-transition: background-color 0.3s ease-in-out 0s;
      transition: background-color 0.3s ease-in-out 0s;
      border-radius: 4px;
      padding: 6px 6px;
      border: 0px;
      margin-top: 9px;
      /* border: 1px solid #999999; */
      background-color: #ebebebc2;
      color: #666666c2;
    }
  }
  .sectionreports {
    background: #efefef;
    width: 100%;
    padding: 20px;
    margin: 3px 0 0 0;
    border-radius: 6px;

    &__table {
      margin-top: 20px;
      padding: 20px;

      &__container {
        background: #fff;
        padding: 20px;
        min-height: 862px;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;

        &__content {
          width: 100%;
        }
      }
    }
    .options {
      width: 100%;
    }
  }
`;

export const Container = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

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
  z-index: 50;
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
export const IconError = styled(ErrorOutline)`
  color: red;
  margin-bottom: -5px;
  margin-left: 6px;
`;

export const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;

  .content {
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }

    .icon_phone {
      color: #4caf50;
      width: 20px;
      height: 15px;
    }

    p {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .phase {
    text-transform: uppercase;
    border-radius: 4px;
    color: #fff;
    padding: 4px 4px;

    .phase-title {
      font-size: 12px;
      font-weight: normal;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }

  .phone {
    cursor: pointer;
  }

  .notasigned {
    color: #424242;
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
  /* cursor: pointer; */
  padding: 5px 10px;
  background-color: #f5f5f5;

  p {
    font-weight: bold;
    cursor: pointer;
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
      props.bg &&
      css`
        background-color: ${props.bg};
      `}
    &:hover {
    background-color: #d8dbe6;
  }

  ${props =>
    props.disabledColor === true &&
    css`
      background-color: #f5f5f5;
    `}
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

export const TableDataFrRow = styled.td`
  min-width: 100px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;
  background-color: #f5f5f5;
  border:1px solid rgba(126, 190, 222,0.4);

  p {
    font-weight: bold;
    cursor: pointer;
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
      props.bg &&
      css`
        background-color: ${props.bg};
      `}
    &:hover {
    background-color: red;
  }

  ${props =>
    props.disabledColor === true &&
    css`
      background-color: #f5f5f5;
    `}
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      /* justify-content: space-between; */
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
      /* color: #0d47a1; */
      color:"#000",
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

export const TableDataRow = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;
  background-color: #f5f5f5;

  p {
    font-weight: bold;
    cursor: pointer;
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
      props.bg &&
      css`
        background-color: ${props.bg};
      `}
    &:hover {
    background-color: #d8dbe6;
  }

  ${props =>
    props.disabledColor === true &&
    css`
      background-color: #f5f5f5;
    `}
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;

      /* justify-content: space-between; */
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
