import styled, { css } from "styled-components";

export const tableHeadTypeDefault = css`
  background-color: rgb(229, 235, 236);

  &:hover {
    background-color: #ffcccb;
    color: #000;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export const tableHeadTypeBorder = css`
  border-bottom: 1px solid ${(props) => props.styles?.borderColor};
  border-top: 1px solid ${(props) => props.styles?.borderColor};
  font-size: 12px;
  background-color: red;
`;

export const tableRowTypeBorder = css`
  border-bottom: 1px solid ${(props) => props.styles?.borderColor};
  font-size: 12px;
  font-weight: normal;
`;

export const TableWrapper = styled.div`
  width: 100%;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #9e9e9e;
  }

  .tableHeadSelectedRows {
    background-color: #e3eefa;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid #616161;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: sticky;

    z-index: 1;
    height: 40px;
    top: ${(props) => (props?.fixedHeader ? "0" : "auto")};

    &__text {
      margin-right: 20px;
      color: #000;
    }

    .globalCheckbox {
      margin-right: 10px;
    }

    p {
      font-weight: bold;
    }

    .btnactonselected {
      display: flex;
      align-items: center;

      height: 28px;
      background-color: #039be5;
      color: #fff;
    }
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  flex: 1;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    position: sticky;

    top: ${(props) => (props?.fixedHeader ? "40px" : "0")};
    z-index: 1;

    ${({ styles }) => styles?.typeTable === "border" && tableHeadTypeBorder};
    ${({ styles }) => styles?.typeTable === "default" && tableHeadTypeDefault};
  }

  .tableHide {
    display: none;
  }
  .tableHead {
    padding: 8px;
    text-align: left;
    min-width: ${(props) => props?.styles?.widthColumn}px;
    color: ${(props) => props.styles?.headerTextColor};
    background-color: ${(props) => props.styles?.headerColorSecondary};
    text-transform: uppercase;
    &--main {
      min-width: ${(props) => props?.styles?.widthColumnId}px;
      background-color: ${(props) => props.styles?.headerColor};
    }

    &--isselectable {
      min-width: 10px;
    }

    &--hide {
      background: blue;
    }
  }
  .tableHead--clickable {
    cursor: pointer;
  }

  .tableHeadActions {
    background-color: ${(props) => props.styles?.headerColor};
    padding: 8px;
    text-align: left;

    color: ${(props) => props.styles?.headerTextColor};
    width: 10px;
    &--main {
    }
  }

  .tableRow {
    transition: all 0.1s ease;
    border: 1px solid ${(props) => props.styles?.rowBorderColor || "#ccc"}; // Agregado

    ${({ styles }) => styles?.typeTable === "border" && tableRowTypeBorder}

    &:nth-child(even) {
      background-color: ${(props) => props.styles?.nthChild};
    }

    &:hover {
      background-color: ${(props) => props.styles?.hoverColor};
    }

    .tableData {
      padding: 8px;
    }

    .tableDataId {
      padding: 8px;

      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: rgb(21, 79, 58);
      }
    }

    .tableDataContainer {
      padding: 4px;
    }

    .tableDataContainer--flex {
      display: flex;
      justify-content: flex-start;
    }

    .tableDataActions {
    }

    .bold {
      font-weight: bold;
      color: red;
    }
  }

  .tableRow--clickable {
    cursor: pointer;
  }

  .tableRow--highlighted {
    background-color: #e5efff;
  }
`;
