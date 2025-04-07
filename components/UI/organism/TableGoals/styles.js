import { Dialog, Menu } from "@material-ui/core";
import styled, { css } from "styled-components";

const TableComponentStyled = styled.div`
  width: 100%;
  max-height: 55vh;
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

  .delete_selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 52;
    background-color: #e0e4f4;
    height: 50px;
    .content_title {
      display: flex;
      align-items: center;
      .title_del {
        font-weight: 500;
        .notification {
          color: red;
          font-size: 13px;
          font-weight: 500;
          margin-left: 2px;
        }
      }
    }
    .bt_delete {
      background-color: red;
      color: #fff;
      text-transform: capitalize;
      font-size: 12px;
    }
  }
`;

const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 50;
`;

const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
`;

const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableRowBody = styled.tr`
  height: 80px;
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

const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;
  .flex {
    display: flex;
    align-items: center;
    align-items: center;
    .item_goal {
      display: flex;
      border: 1px solid;
    }
    .invidual {
      margin-right: 5px;
    }

    .group {
      color: #2962ff;
      margin-right: 5px;
    }
  }
  .name {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    text-transform: capitalize;
    .email {
      color: #424242;
      font-size: 12px;
      font-weight: 400;
      text-transform: none;
    }
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

const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;

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

  .contentConfigTable{
    display: flex;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
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
`;

const TableHeadSettingsColumn = styled.th`
  min-width: 50px;
  position: sticky;
  right: 0;
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  width: max-content;
  svg {
    cursor: pointer;
  }
`;
const StyledMenu = styled(Menu)`
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

export {
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
};

export const DeleteSelectedStyle = styled(Dialog)`
  .container_delete {
    &__head {
      background-color: #3f51b5;
      padding: 5px;
      .title_head {
        color: #fff;
        font-weight: 500;
        padding: 5px;
      }
    }
    &__body {
      padding: 15px;
      .text_body {
      }
      .count_goals {
        font-weight: 500;
      }
    }
    &__footer {
      .buttons {
        margin: 10px;
        display: flex;
        flex-direction: row-reverse;
        .bt_accept {
          text-transform: capitalize;
          color: #fff;
          background-color: #3f51b5;
          font-size: 12px;
        }
        .bt_cancel {
          margin-right: 5px;
          font-size: 12px;
          color: #fff;
          background-color: red;
          text-transform: capitalize;
        }
      }
    }
  }
`;
