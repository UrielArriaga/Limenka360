import { Menu } from "@material-ui/core";
import styled, { css } from "styled-components";

const TableReportsStyled = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow-x: auto;
  transition: all 0.3s ease;
  background-color: #fff;
  .pagination {
    display: flex;
    margin: 12px 0;
    justify-content: center;
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
  .oportunitiestile {
    text-align: center;
    margin-bottom: 22px;
    font-size: 19px;
    font-weight: bold;
  }
`;
const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableHead = styled.thead`
  top: 0;
  z-index: 50;
`;
const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
`;

const mixinBG = props => {
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
const TableRow = styled.tr`
  height: 50px;

  ${mixinBG};
  cursor: pointer;

  &:hover {
    background-color: #d8dbe6;
  }
`;

const TableDataId = styled.td`
  min-width: 250px;
  /* position: sticky; */
  left: 0;

  .title {
    font-weight: bold;
    padding-left: 10px;
  }
`;
const TableData = styled.td``;
export { Table, TableReportsStyled, TableBody, TableHead, TableRowHead, TableRow, TableDataId, TableData };
