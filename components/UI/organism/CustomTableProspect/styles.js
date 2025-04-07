import { Menu } from "@material-ui/core";
import styled, { css } from "styled-components";

const TableComponentStyled = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow-x: auto;
  transition: all 0.3s ease;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
`;

const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
  height: 100%;
  background-color: #fff;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 10px;
  background-color: red;
  height: 60px;
`;

const TableHeadColumn = styled.th`
  min-width: 200px;
  text-align: left;
  /* padding-left: 10px; */
  text-transform: capitalize;
  background-color: #405189;
  .title {
    color: #fff;
  }
`;

const TableHeadColumnNames = styled.th`
  min-width: 200px;
  text-align: left;
  /* padding-left: 10px; */
  text-transform: capitalize;
  /* background-color: #405189; */
  .title {
    color: #fff;
  }
`;
const TableHeadIdColumn = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;

  top: 0;
  background: #405189;
  color: #fff;
  min-width: 20px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
  @media (max-width: 600px) {
    position: relative;
  }
  z-index: 100000 !important ;

  p {
    font-weight: bold;
  }
`;

const TableHeadIdColumnNames = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;
  padding-right: 10px;
  top: 0;
  color: #fff;
  min-width: 20px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
  @media (max-width: 600px) {
    position: relative;
  }
  z-index: 100000 !important ;

  p {
    font-weight: bold;
  }
`;
const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
  padding: 50px;
`;

const TableRowHeadNames = styled.tr`
  /* background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")}; */
  padding: 5px 10px;
  height: 20px;
  padding: 50px;
  background-color: #9e9e9e;
`;

const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;
const mixinBG = (props) => {
  switch (true) {
    case props.errorSintaxis === true && props.existInDB == false:
      return `
          color:red;
          font-weight:bold;
          text-decoration:underline;
  
        `;

    case props.errorSintaxis === false && props.existInDB == true:
      return `
            color:#1976d2;
            font-weight:bold;
            text-decoration:underline;
          `;

    // default:
    //   return `border:1px solid red;`;
  }
};
const TableRowBody = styled.tr`
  height: 80px;

  ${(props) =>
    props.indicator == 1 &&
    css`
      background-color: red;
    `}
  ${(props) =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}

  ${(props) =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `} /* 
    
    ${(props) =>
    props.indicator == 1 &&
    css`
      background-color: red;
    `}

  ${(props) =>
    props.indicator == 2 &&
    css`
      background-color: green;
    `}

    ${(props) =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
  
    .column_id {
    background-color: #d8dbe6;
  } */
`;

const TableDataId = styled.td`
  min-width: 50px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;

  font-weight: bold;

  .MuiBadge-badge {
    /* backgroundcolor: green; */
    /* backgroundColor: "pink" */
  }

  .MuiBadge-dot {
    background-color: ${(props) => (props.bgBadge ? props.bgBadge : "red")};
  }
  .flex {
    display: flex;
    align-items: center;
    align-items: center;

    .invidual {
      margin-right: 5px;
    }

    .group {
      color: #2962ff;
      margin-right: 5px;
    }
  }
  .name {
    font-weight: bold;
    text-transform: capitalize;
  }
  .email {
    color: #424242;
    font-size: 12px;
  }

  ${(props) =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}
  ${(props) =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}
    ${(props) =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
   
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

const mixin = (props) => {
  switch (true) {
    case props.errorSintaxis === true && props.existInDB == false:
      return `
        color:red;
        font-weight:bold;
        text-decoration:underline;

      `;

    case props.errorSintaxis === false && props.existInDB == true:
      return `
          color:#1976d2;
          font-weight:bold;
          text-decoration:underline;
        `;

    // default:
    //   return `border:1px solid red;`;
  }
};
const TableData = styled.td`
  min-width: 250px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;

  .tabledata {
    p {
      ${mixin}/* color: ${(props) => (props.errorSintaxis ? "red" : "#000")};
      font-weight: ${(props) => (props.errorSintaxis ? "bold" : "normal")};
      text-decoration: ${(props) => (props.errorSintaxis ? "underline" : "none")}; */
    }
    &:hover {
      color: #42a5f5;
      cursor: pointer;
    }
  }
  .goaltotal {
    display: flex;
    align-items: center;
    p {
      font-weight: bold;
      font-size: 14px;
    }

    .divider {
      margin: 0 5px;
    }
  }

  .goalType {
    p {
      color: #0d47a1;
      font-weight: bold;
    }

    .alias {
      font-weight: normal;
      color: #000;
    }
  }

  .dates {
    display: flex;
    align-items: center;
    p {
      font-weight: bold;
      font-size: 14px;
    }

    span {
      margin: 0px 10px;
    }
  }

  .dasycomplete {
    p {
      color: #0d47a1;
      font-weight: bold;
    }
  }
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

const TableDataSettingsColumn = styled.td`
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
      background-color: #405189;
      padding: 4px;
      cursor: pointer;
      color: #fff;
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
  ${(props) =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}

  ${(props) =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}

    ${(props) =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
    &:hover {
    background-color: #d8dbe6;
  }
`;

const TableHeadSettingsColumn = styled.th`
  min-width: 50px;
  position: sticky;
  right: 0;
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  width: max-content;
  background-color: #405189;
  svg {
    cursor: pointer;
    color: #fff;
  }
`;

const TableHeadSettingsColumnNames = styled.th`
  min-width: 50px;
  position: sticky;
  right: 0;
  /* background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")}; */
  width: max-content;
  /* background-color: #405189; */
  svg {
    cursor: pointer;
    color: #fff;
  }
`;
const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%),
      0px 3px 5px 2px rgb(0 0 0 / 5%);
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

export {
  TableHeadColumn,
  TableComponentStyled,
  Table,
  TableHead,
  TableRowHead,
  TableDataId,
  TableData,
  TableBody,
  TableRowBody,
  TableHeadSettingsColumn,
  TableDataSettingsColumn,
  StyledMenu,
  TableHeadIdColumn,
  TableHeadColumnNames,
  TableHeadIdColumnNames,
  TableHeadSettingsColumnNames,
  TableRowHeadNames,
};
