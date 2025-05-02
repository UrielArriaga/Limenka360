import styled, { css } from "styled-components";

export const tableHeadTypeDefault = css`
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th {
    background-color: #1976d2;
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
`;

export const tableHeadTypeBorder = css`
  border-bottom: 1px solid #d1d5db;
  border-top: 1px solid #d1d5db;
  font-size: 13px;
  background-color: #f5f5f5;
  color: #555;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const tableRowTypeBorder = css`
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 3px;
  }

  .tableHeadSelectedRows {
    background-color: #e9f3fc;
    padding: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cfd8dc;
    border-radius: 8px 8px 0 0;
    position: sticky;
    top: ${(props) => (props.fixedHeader ? "0" : "auto")};
    z-index: 1;

    &__text {
      margin-right: 16px;
      color: #333;
      font-weight: bold;
    }

    .btnactonselected {
      background-color: #1976d2;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #1565c0;
      }
    }
  }
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 12px 12px;

  .MuiPagination-root {
    display: flex;
    gap: 10px;

    button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 14px;
      color: #555;
      background-color: #fff;
      border: 1px solid #ddd;
      transition: all 0.3s ease;

      &:hover {
        background-color: #e0f7fa;
        border-color: #1976d2;
      }

      &.Mui-selected {
        background-color: #039be5 !important;
        color: white !important;
        transform: scale(1.1);
      }
    }
  }
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 0;

  thead {
    position: sticky;
    top: ${(props) => (props.fixedHeader ? "40px" : "0")};
    z-index: 1;

    ${({ styles }) => styles?.typeTable === "border" && tableHeadTypeBorder};
    ${({ styles }) => styles?.typeTable === "default" && tableHeadTypeDefault};
  }

  .tableHead {
    padding: 12px;
    text-align: left;
    background-color: ${(props) =>
      props.styles?.headerColorSecondary || "#7fb3d5"};
    color: ${(props) => props.styles?.headerTextColor || "#333"};
    border-radius: 0; /* Sin redondeo */
  }

  .tableHead--clickable {
    cursor: pointer;
  }

  .tableRow {
    transition: background-color 0.2s ease, transform 0.2s ease;
    ${({ styles }) => styles?.typeTable === "border" && tableRowTypeBorder};

    &:nth-child(even) {
      background-color: ${(props) => props.styles?.nthChild || "#fafafa"};
    }

    &:hover {
      background-color: ${(props) => props.styles?.hoverColor || "#f1f1f1"};
      transform: translateY(-2px);
    }

    .tableData,
    .tableDataId {
      padding: 12px;
      color: #444;
      border-radius: 0;
    }

    .tableDataId {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: #1a73e8;
      }
    }

    .tableDataContainer--flex {
      display: flex;
      align-items: center;
    }
  }

  .tableRow--clickable {
    cursor: pointer;
  }

  .tableRow--highlighted {
    background-color: #e0f3ff;
  }
`;
