import React from "react";

import styled from "styled-components";


export default function DemotoTemplate(obj) {
  const data = obj.obj;
  let rowCount = 28;

  return (
    <Layout>
      <div className="container">
        <p className="title">FORMATO PARA DEMOSTRACIONES</p>
        <section className="sections">
          <div className="content-date">
            <div className="content-rigth-empty-title">
              <div className="lettering-date">
                <p className="date">{data?.dateActuality}</p>
              </div>
              <div className="date-title">
                <p className="date">Fecha:</p>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="th-title">EJECUTIVO</th>
                <th className="th-title">ESFERA DE NEGOCIO</th>
                <th className="th-title">INSTRUCTOR ASIGNADO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="th-desc">{data?.ejecutive}</td>
                <td className="th-desc">{data?.sphere}</td>
                <td className="th-desc">{data?.instructor}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="sections">
          <div className="content-info-1">
            <div className="content-info-title-left">
              <b className="content-info-b">Nombre del Cliente:</b>
            </div>
            <div className="content-info-desc-rigth">
              <b className="content-info-p">sdcsdc{data?.customer}</b>
            </div>
          </div>
          <div className="content-info-2">
            <div className="content-info-title-left">
              <b className="content-info-b">Lugar de Demostración:</b>
            </div>
            <div className="content-info-desc-rigth">
              <b className="content-info-p">{data?.demonstrationPlace}</b>
            </div>
          </div>
          <div className="content-info-3">
            <div className="content-info-title-left">
              <b className="content-info-b">Fecha de Demostración:</b>
            </div>
            <div className="content-info-desc-rigth-hora">
              <div className="hora">
                <b className="content-info-p">{data?.demoDate}</b>
              </div>
              <div className="hora-title">
                <b className="content-info-b">Hora</b>
              </div>
              <div className="hora">
                <b className="content-info-p">{data?.hoursDate}</b>
              </div>
            </div>
          </div>
          <div className="content-info-4">
            <div className="content-info-title-left">
              <b className="content-info-b">Unidad Asignada:</b>
            </div>
            <div className="content-info-desc-rigth">
              <b className="content-info-p">{data?.assignedUnit}</b>
            </div>
          </div>
          <div className="content-info-5">
            <div className="content-info-title-left">
              <b className="content-info-b">Telefono del Cliente:</b>
            </div>
            <div className="content-info-desc-rigth-hora">
              <div className="hora">
                <b className="content-info-p">{data?.phonoCustomer}</b>
              </div>
              <div className="hora-title">
                <b className="content-info-b">Viaticos Asignados</b>
              </div>
              <div className="hora">
                <b className="content-info-p">{data?.travelExpenses} mnx.</b>
              </div>
            </div>
          </div>
        </section>

        <section className="sections">
          <table>
            <thead>
              <tr>
                <th className="th-title-model">MODELO</th>
                <th className="th-title-des">DESCRIPCION</th>
                <th className="th-title-pzas">N° PZAS</th>
                <th className="th-title-serial">N° DE SERIE</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.model}</td>
                  <td>{item?.description}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.serial}</td>
                </tr>
              ))}
              {Array?.from({ length: rowCount - data?.products?.length }).map((_, index) => (
                <tr key={data?.products?.length + index}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="sections">
          <table className="custom-table">
            <tr className="header-row">
              <td colSpan="2" className="th-title-2">
                DOCUMENTOS PARA DEMOSTRACIÓN
              </td>
              <td className="th-title-2">AUTORIZACIÓN</td>
            </tr>
            <tr>
              <td>N° INE</td>
              <td>{data?.document?.ine}</td>
              <td rowSpan="5"></td>
            </tr>
            <tr>
              <td>COMPROBANTE DOMICILIO</td>
              <td>{data?.document?.proffaddress}</td>
            </tr>
            <tr>
              <td>CÉDULA PROFESIONAL</td>
              <td>{data?.document?.cedula}</td>
            </tr>
            <tr>
              <td>TIPO DE CLIENTE</td>
              <td>{data?.document?.typleCustomer}</td>
            </tr>
            <tr>
              <td>CERTEZA DE CIERRE</td>
              <td>{data?.document?.closingcertainty}</td>
            </tr>
          </table>
        </section>
      </div>
    </Layout>
  );
}
const Layout = styled.section`
  .container {
    height: 80vh;
    width: 500px;
    /* height: 11in; */
    margin: auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* el titulo  */
  .title {
    color: black;
    font-weight: 600;
    text-align: center;
    font-size: 22px;
    margin: 0px;
  }

  .sections {
    float: left;
    width: 100%;
  }

  .content-date {
    margin: 0px;
  }

  .content-left-empty-title {
    margin-bottom: 1px;
    float: left;
    width: 65%;
    /* height: 20px; */
  }

  .content-rigth-empty-title {
    margin-bottom: 1px;
    float: right;
    width: 35%;
    /* height: 20px; */
  }

  .lettering-date {
    text-align: center;
    float: right;
    width: 50%;
    /* height: 20px; */
    font-size: 12px;
  }

  .date {
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
  }

  /* .lettering-date {
        float: right;
        height: 20px;
        width: 50%;
      } */
  .date-title {
    float: right;
    width: 50%;
    text-align: center;
    background-color: #ffd966;
    font-size: 12px;
  }

  strong {
    font-weight: 800;
  }

  table {
    width: 100%;
    /* margin-left: auto;
        margin-right: auto; */

    border-collapse: collapse;
    text-align: center;
  }

  table,
  th,
  td {
    border: 1.5px solid black;
    font-size: 9px;
  }

  .th-title {
    width: 33.33%;
    font-size: 9px;
    font-weight: 800;
    color: black;
  }

  .th-title-2 {
    width: 60.33%;
    font-size: 9px;
    font-weight: 800;
    color: black;
  }

  .th-desc {
    font-size: 9px;
    font-weight: 500;
    color: black;
  }

  .th-title-model {
    width: 18%;
    font-size: 9px;
    font-weight: 800;
    color: black;
  }

  .th-title-des {
    font-size: 9px;
    font-weight: 800;
    color: black;
  }

  .th-title-pzas {
    width: 14%;
    font-size: 9px;
    font-weight: 800;
    color: black;
  }

  .th-title-serial {
    font-size: 9px;
    font-weight: 800;
    color: black;
  }

  th,
  td {
    border: 1.5px solid black;
    font-size: 7px;
    text-align: center;
    /* Establece un ancho mínimo para las celdas */
    height: 13px;
  }

  thead {
    background: #9bc2e6;
    color: black;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin: 0px 0;
    padding: 1px;
    font-size: 8px;
    font-weight: 700;
  }

  .content-info-1 {
    height: 20px;
    float: left;
    width: 99.6%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-left: 1.5px solid black;
    border-right: 1.5px solid black;
    border-top: 1.5px solid black;
    border-bottom: 1.5px solid black;
  }

  .content-info-2 {
    height: 20px;
    float: left;
    width: 99.6%;
    margin-left: auto;
    margin-right: auto;
    border-left: 1.5px solid black;
    border-right: 1.5px solid black;
    border-bottom: 1.5px solid black;
  }

  .content-info-3 {
    height: 20px;
    float: left;
    width: 99.6%;
    margin-left: auto;
    margin-right: auto;
    border-left: 1.5px solid black;
    border-right: 1.5px solid black;
    border-bottom: 1.5px solid black;
  }

  .content-info-4 {
    height: 20px;
    float: left;
    width: 99.6%;
    margin-left: auto;
    margin-right: auto;
    border-left: 1.5px solid black;
    border-right: 1.5px solid black;
    border-bottom: 1.5px solid black;
  }

  .content-info-5 {
    height: 20px;
    float: left;
    width: 99.6%;
    margin-left: auto;
    margin-right: auto;
    border-left: 1.5px solid black;
    border-right: 1.5px solid black;
  }

  .content-info-title-left {
    text-align: center;
    float: left;
    width: 30%;
    border-right: 1.5px solid black;
  }

  .content-info-b {
    font-weight: 700;
    font-size: 10px;
    margin: 0px;
  }

  .content-info-p {
    margin: 0px;
    font-weight: 500;
    font-size: 10px;
  }

  .content-info-desc-rigth {
    float: right;
    width: 69%;
  }

  .content-info-desc-rigth-hora {
    float: left;
    width: 69%;
  }

  .hora {
    text-align: center;
    width: 30%;
    float: left;
  }

  .hora-title {
    height: 20px;
    text-align: center;
    border-left: 1.5px solid black;
    border-right: 1.5px solid black;
    width: 30%;
    float: left;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }

  .custom-table,
  .custom-table td {
    border: 1.5px solid black;
  }

  .custom-table td {
    padding: 2px;
  }

  .header-row {
    background-color: #a1c2e2;
    font-weight: bold;
  }
`;
