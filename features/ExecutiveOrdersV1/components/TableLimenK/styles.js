import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  padding: 16px;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #283593;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 3px;
  }

  .tableHeadSelectedRows {
    background-color: #ede7f6;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d1c4e9;
    border-radius: 8px 8px 0 0;
    position: sticky;
    top: ${(props) => (props.fixedHeader ? "0" : "auto")};
    z-index: 3;

    &__text {
      margin-right: 16px;
      color: #3f51b5;
      font-weight: 500;
      letter-spacing: 0.3px;
      font-size: 13px;
    }

    .btnactonselected {
      background-color: #3f51b5;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 400;
      font-size: 13px;
      transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: #283593;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
      }
    }
  }
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;

  .MuiPagination-root {
    display: flex;
    gap: 8px;

    button {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-size: 13px;
      color: #555;
      background-color: #fff;
      border: 1px solid #ddd;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e0f7fa;
        border-color: #95cdff;
      }

      &.Mui-selected {
        background-color: #20242c !important;
        color: white !important;
        transform: scale(1.05);
      }
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;

  thead {
    position: sticky;
    top: ${(props) => (props.fixedHeader ? "50px" : "0")};
    z-index: 1;
  }

  th {
    padding: 12px 16px;
    background-color: #20242c;
    color: #95cdff;
    font-weight: 500;
    letter-spacing: 0.2px;
    border-bottom: 1px solid #c5e4ff;
    text-align: center;
    vertical-align: middle;
    &:first-child {
      border-radius: 8px 0 0 0;
    }
    &:last-child {
      border-radius: 0 8px 0 0;
    }
  }

  tr {
    transition: background-color 0.2s ease-in-out, box-shadow 0.15s ease-in-out,
      transform 0.05s ease-in-out;
    background-color: #fff;

    &:nth-child(even) {
      background-color: #f0f0f0;
    }

    &:hover {
      background-color: #e0f1ff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transform: translateY(-1px);
    }

    &:last-child td {
      border-bottom: none;
      &:first-child {
        border-radius: 0 0 0 8px;
      }
      &:last-child {
        border-radius: 0 0 8px 0;
      }
    }
  }

  td {
    padding: 12px 16px;
    color: #2a2a2a;
    border-bottom: 1px solid #eee;
    text-align: center;
    vertical-align: middle;
  }

  .tableDataId {
    cursor: pointer;
    color: #3f51b5;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.15s ease-in-out;
    font-size: 13px;

    &:hover {
      text-decoration: underline;
      color: #283593;
    }
  }

  .tableDataContainer--flex {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }

  .tableRow--clickable {
    cursor: pointer;
  }

  .tableRow--highlighted {
    background-color: #bbdefb;
  }
`;
