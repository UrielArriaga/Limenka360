import styled from "styled-components";
export const TableContainer = styled.div`
  width: 100%;
  border-collapse: collapse;

  .MuiIconButton-root{
    padding: 0px;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  background-color: #405189;
  font-weight: bold;
  color: #fff;
  /* padding: 10px 0; */
  border-bottom: 2px solid #ddd;
`;

export const TableRowPackage = styled.div`
  /* display: flex; */
  /* padding: 10px 0; */
  /* border-bottom: 1px solid #ddd; */
  /* background-color: #b3e5fc; */

  .packageparent {
    background-color: #b3e5fc;
  }

  .packagechild {
    background-color: #dbf4ff;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const TableRow = styled.div`
  display: flex;
  /* padding: 10px 0; */
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div`
  flex: ${props => props.flex || 1};
  padding: 8px;
  text-align: left;
  font-size: 12px;
`;

export const TableCellHeader = styled.div`
  flex: ${props => props.flex || 1};
  padding: 8px;
  text-align: left;
  font-size: 12px;
`;

export const ActionsCell = styled(TableCell)`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9em;

  &:hover {
    background-color: #0056b3;
  }

  &:nth-child(2) {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;
