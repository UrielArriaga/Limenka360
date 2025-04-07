import React from "react";
import styled from "styled-components";

export default function TraspTemplate(props) {
  const { data } = props;
  const folio = data.length > 0 ? data[0].folio : "";

  return (
    <LayoutTemplate>
      <div className="content">
        <h2 style={{ textAlign: "center" }}>TRASPASOS DE EQUIPOS</h2>
        {folio && (
          <h5 style={{ textAlign: "center" }}>
            ({folio})
          </h5>
        )}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>SERIAL</th>
              <th>PRODUCTO</th>
              <th>ALMACÉN ORIGEN</th>
              <th>ALMACÉN DESTINO</th>
              <th>ENTREGA (NOMBRE Y FIRMA)</th>
              <th>FECHA SALIDA</th>
              <th>RECIBE (NOMBRE Y FIRMA)</th>
              <th>FECHA INGRESO</th>
              <th>OBSERVACIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.serial}>
                  <td>{index + 1}</td>
                  <td>{item.serial}</td>
                  <td>{item.product}</td>
                  <td>{item.almOrigin}</td>
                  <td>{item.almDest}</td>
                  <td>{item.delivery}</td>
                  <td>{item.dateOut}</td>
                  <td>{item.receive}</td>
                  <td>{item.dateInt}</td>
                  <td>{item.observation}</td>
                </tr>
              );
            })}
            {Array.from({ length: 20 - data.length }, (_, index) => (
              <tr key={index}>
                <td>{data.length + index + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="signatures">
          <div>
            <div className="line"></div>
          </div>
          <div>
            <div className="line"></div>
          </div>
          <div>
            <div className="line"></div>
          </div>
          <div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

const LayoutTemplate = styled.section`
  .content {
    width: 100%;
    margin: auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  table {
    width: 100%;
    font-size: 8px;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid black;
    font-size: 8px;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
  .signatures {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
  .signatures div {
    text-align: center;
    width: 80%;
  }
  .line {
    border-bottom: 1px solid black;
    margin-bottom: 5px;
    height: 20px;
  }
`;
