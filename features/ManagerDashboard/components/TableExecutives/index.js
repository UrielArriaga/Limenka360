import React from "react";
import styled from "styled-components";
export default function TableExecutives() {
  return (
    <TableExecutivesStyled>
      <h4>Ejecutivos</h4>
    </TableExecutivesStyled>
  );
}

const TableExecutivesStyled = styled.div`
  width: 90%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 10px;
`;
