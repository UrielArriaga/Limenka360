import styled, { css } from "styled-components";

// * Styles for custom table

export const tableHeadTypeDefault = css`
  background-color: rgb(236, 241, 247);
  color: rgb(101, 101, 101);
  &:hover {
    /* background-color: #ffcccb; */
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

// * Styles for custom table

export const TableWrapper = styled.div`
  width: 100%;
  /* overflow: auto; */
  /* height: ${(props) => `${props.styles?.minHeight}px`}; */

  /* flex: 1; */

  /* height: $; */
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
    /* top: 0; */
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
      /* color: #fff; */
      /* font-weight: bold; */
    }

    .btnactonselected {
      display: flex;
      align-items: center;
      /* margin-left: 10px; */
      height: 28px;
      background-color: #039be5;
      color: #fff;
      /* color: #fff; */
      /* background-color: #fff; */
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
    /* prop fixedHeader */
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
    /* font-weight: bold; */

    ${({ styles }) => styles?.typeTable === "border" && tableRowTypeBorder}

    &:nth-child(even) {
      background-color: ${(props) => props.styles?.nthChild};
    }

    &:hover {
      background-color: ${(props) => props.styles?.hoverColor};
    }

    .tableData {
      padding: 8px;
      /* color: grey; */
    }

    .tableDataId {
      padding: 8px;
      /* color: grey; */
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
  }

  .tableRow--clickable {
    cursor: pointer;
  }

  .tableRow--highlighted {
    background-color: #e5efff;
  }
`;
