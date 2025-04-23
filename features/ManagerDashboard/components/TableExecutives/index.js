import React from "react";
import styled from "styled-components";

const data = [
  {
    id: 1,
    name: "Ejecutivo 1",
    avatar: "",
    funneldata: {
      prospectos: 20,
      oportunidades: 10,
      clientes: 5,
    },
  },
  {
    id: 2,
    name: "Ejecutivo 2",
    avatar: "",
    funneldata: {
      prospectos: 100,
      oportunidades: 80,
      clientes: 50,
    },
  },
  {
    id: 3,
    name: "Ejecutivo 3",
    avatar: "",
    funneldata: {
      prospectos: 10,
      oportunidades: 5,
      clientes: 2,
    },
  },
];

export default function TableExecutives() {
  return (
    <TableExecutivesStyled>
      <h4>Ejecutivos</h4>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Prospectos</th>
            <th>Oportunidades</th>
            <th>Clientes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ejecutivo) => (
            <TableRow key={ejecutivo.id}>
              <td>{ejecutivo.id}</td>
              <td>{ejecutivo.name}</td>
              <td>{ejecutivo.funneldata.prospectos}</td>
              <td>{ejecutivo.funneldata.oportunidades}</td>
              <td>{ejecutivo.funneldata.clientes}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableExecutivesStyled>
  );
}

const TableExecutivesStyled = styled.div`
  width: 90%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableHeadCell = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px;
`;
