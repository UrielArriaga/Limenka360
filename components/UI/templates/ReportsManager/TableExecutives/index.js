import React from "react";
import styled from "styled-components";
import { colors } from "../../../../../styles/global.styles";
import { URL_SPACE } from "../../../../../services/api";

const TableRow = ({ item, handleSelectExecutive }) => (
  <tr onClick={() => handleSelectExecutive(item)}>
    <Td>
      <div className="row">
        <img
          src={URL_SPACE + item.Foto}
          alt=""
          onError={e =>
            (e.target.src =
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png")
          }
        />
        {item.Nombre} - {item.Alias}
      </div>
    </Td>
    <Td>{item.Leads}</Td>
    <Td>
      <div className="row">
        <p className="value">{item.Oportunidades} - </p>
        <div
          className="percentaje"
          style={{
            background: item.proportunidadesColor,
          }}
        >
          <p className="countvalue">{item.proportunidades?.toFixed(1)}%</p>
        </div>
      </div>
    </Td>
    <Td>
      <div className="row">
        <p className="value">{item.Ventas} - </p>
        <div
          className="percentaje"
          style={{
            background: item.prclientsColor,
          }}
        >
          <p className="countvalue">{item.prclients?.toFixed(1)}%</p>
        </div>
      </div>
    </Td>
  </tr>
);

export default function TableExecutives({ data: executives, handleSelectExecutive }) {
  return (
    <TableExecutivesStyled>
      <Table>
        <thead>
          <tr>
            <Th id>Nombre</Th>
            <Th>Leads</Th>
            <Th>Oportunidades</Th>
            <Th>Clientes</Th>
          </tr>
        </thead>
        <tbody>
          {executives.map((item, index) => (
            <TableRow key={index} item={item} handleSelectExecutive={handleSelectExecutive} />
          ))}
        </tbody>
      </Table>
    </TableExecutivesStyled>
  );
}

const TableExecutivesStyled = styled.div`
  height: 320px;
  overflow-y: scroll;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  thead {
    /* position: sticky;
    top: 0;
    padding: 8px;
    text-align: left;
    background-color: rgba(54, 58, 63, 0.7);
    color: #fff;
    z-index: 1; */
  }

  tr {
    border-bottom: 1px solid #ddd;
    &:hover {
      background-color: #f5f5f5;
    }
    cursor: pointer;
  }
`;

const Th = styled.th`
  padding: 8px;
  color: #fff;
  position: sticky;
  top: 0;
  padding: 8px;
  text-align: left;
  background-color: #727578;
  color: #fff;
  z-index: 1;
  /* border: 1px solid #ddd; */
  /* background-color: ${props => (props.id ? colors.primaryColor : "#fff")}; */
  /* color: ${props => (props.id ? "#fff" : "#000")}; */
`;

const Td = styled.td`
  /* border: 1px solid #ddd; */
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  min-width: 100px;
  text-transform: capitalize;

  .row {
    display: flex;
    align-items: center;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 4px;
    border-radius: 50%;
    object-fit: cover;
  }

  .column {
    text-align: center;
  }

  .value {
    margin-right: 4px;
    font-weight: bold;
  }

  .percentaje {
    background-color: #f3f3f3;
    border-radius: 4px;
    padding: 5px;
    p {
      font-size: 12px;
      color: #000;
    }

    .countvalue {
      /* font-weight: bold; */
    }
  }
`;
