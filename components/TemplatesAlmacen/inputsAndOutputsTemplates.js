import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function InputsAndOutputsTemplate(props) {
  const { zoom, data } = props;
  const { prospect, products, ejecutive, quoteInfo } = data;
  const { userData } = useSelector(userSelector);
  
  return (
    <LayoutTemplate
      zoom={zoom}
      primaryColor={userData?.groupprimarycolor}
      secondaryColor={userData?.groupsecondarycolor}
    >
      <div className="image">
        <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/HEADER.jpg" className="img_log" />
      </div>
      <p className="title">FORMATO DE ENTRADA / SALIDA</p>
      <div className="line"></div>
      <div className="row">
        <div className="containerDateGeneral">
          <div className="container_title">
            <p className="titles_left">DATOS GENERALES</p>
            <p className="titles_right">DATOS DEL CLIENTE</p>
          </div>
          <div className="container_div_date_General">
            <div className="div_left">
              <div className="content_div_left">
                <div className="content_div">
                  <p className="text_left">SOLICITANTE O EJECUTIVO:</p>
                  <div className="content_div_liner">
                    <p className="div_liner_input">{ejecutive.name}</p>
                    <div className="liner_int"></div>
                  </div>
                </div>
                <div className="content_div">
                  <p className="text_left">FOLIO PEDIDO:</p>
                  <div className="content_div_liner">
                    <p className="div_liner_input">{quoteInfo.folio}</p>
                    <div className="liner_int"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div_rigth">
              <div className="content_div_left">
                <div className="content_div">
                  <p className="text_left">NOMBRE DEL CLIENTE:</p>
                  <div className="content_div_liner">
                    <p className="div_liner_input">
                      {prospect.name} {prospect.lastname}
                    </p>
                    <div className="liner_int"></div>
                  </div>
                </div>
                <div className="content_div">
                  <p className="text_left">TELÉFONO:</p>
                  <div className="content_div_liner">
                    <p className="div_liner_input">{prospect.phone}</p>
                    <div className="liner_int"></div>
                    <p className="folio">
                      FOLIO INTERNO: <strong className="strong">{quoteInfo.folio}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="column izquierda">
          <table>
            <thead>
              <tr>
                <th colspan="2">TIPO DE ENTRADA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td>CORRECTIVO/PREVENTIVO</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>A CUENTA</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>GARANTIA</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>REVISIÓN</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>CAMBIO</td>
                <td>------------------</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="column derecha">
          <table>
            <thead>
              <tr>
                <th colspan="2">SALIDA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td>PRESTAMO</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>CAMBIO</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>PROVEEDOR</td>
                <td>------------------</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <section className="table_section">
        <table>
          <thead>
            <tr>
              <th>MODELO</th>
              <th>DESCRIPCION</th>
              <th>NÚMERO DE SERIE</th>
              <th>ACCESORIOS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.Day}</td>
                </tr>
              );
            })}

            {/* ${itemsProducts} */}
          </tbody>
        </table>
      </section>
      <section>
        <div className="containerDateGeneral">
          <div className="container_title">
            <p className="titles_observations">OBSERVACIONES</p>
          </div>
          <div className="text_observations">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dolor et vitae pariatur a distinctio, cum
              neque reprehenderit dignissimos ab illo debitis atque consequuntur quod, vero aspernatur officiis, libero
              doloremque.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container_date">
          <p>FECHA Y HORA DE INGRESO</p>
          <div className="conten_div_date">
            <div className="div_date"></div>
            <div className="div_date"></div>
          </div>
        </div>
        <div className="new_table">
          <table className="table">
            <thead className="thead">
              <tr className="tr">
                <th className="th">NOMBRE Y FORMA LOGISTICA</th>
                <th className="th">NOMBRE Y FIRMA DE ING BIOMÉDICO</th>
                <th className="th">NOMBRE Y FIRMA CLIENTE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container_date">
          <p>FECHA Y HORA DE SALIDA</p>
          <div className="conten_div_date">
            <div className="div_date"></div>
            <div className="div_date"></div>
          </div>
        </div>
        <div className="new_table">
          <table className="table">
            <thead className="thead">
              <tr className="tr">
                <th className="th">NOMBRE Y FORMA LOGISTICA</th>
                <th className="th">NOMBRE Y FIRMA DE ING BIOMÉDICO</th>
                <th className="th">NOMBRE Y FIRMA CLIENTE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <div className="firm">
          <div className="line_firme"></div>
          <p className="text_firm">FIRMA DE EJECUTIVO</p>
        </div>
      </section>
    </LayoutTemplate>
  );
}

const LayoutTemplate = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  overflow: scroll;

  #pageFooter {
    font-size: 8px;
    color: #555;
    width: 100%;
    float: left;
  }

  .footer {
    font-size: 8px;
    color: #3d3d3d;
  }

  @page {
    size: A4;
    margin: 0;
  }
  body {
    font-family: Arial, sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    background-color: white;
  }

  .img_log {
    width: 100%;
    margin: 0px;
  }

  .container {
    width: 5.8in;
    // height: 11in;
    margin: auto;
    padding: 0px 20px 20px 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  /* el titulo  */
  .title {
    color: black;
    font-weight: 500;
    text-align: center;
    font-size: 22px;
  }

  .line {
    margin: auto;
    width: 50%;
    height: 1.5px;
    background-color: black;
  }
  /* la primera seccion  */
  .containerDateGeneral {
    width: 95%;
    margin: 10px auto 4px auto;
    border: 2px solid black;
    background-color: #fff;
  }

  .container_title {
    width: 100%;
    text-align: center;
    justify-content: space-around;
    /* display: inline-block; */
    background-color: #17406f;
    border-bottom: 2px solid black;
    overflow: hidden; /* Para limpiar los floats */
  }

  .titles_left {
    // border-right:2px solid black;
    width: 50%;

    font-size: 9px;
    color: white;
    font-weight: 600;
    margin-left: px;
    float: left; /* Hacer que ambos elementos floten a la izquierda */
    margin: 0;
  }

  .titles_right {
    width: 50%;

    font-size: 9px;
    color: white;
    font-weight: 600;
    float: left; /* Hacer que ambos elementos floten a la izquierda */
    margin: 0; /* Eliminar márgenes para alineación más precisa */
  }

  .titles_right {
    float: right; /* Alinear el segundo título a la derecha */
  }

  .container_div_date_General {
    overflow: hidden; /* Clear floats */
  }

  .div_left,
  .div_rigth {
    float: left;
    width: 50%;
  }

  .content_div_left {
    padding: 5px;
  }

  .content_div {
    vertical-align: middle;
  }

  .text_left {
    width: 50%;
    font-size: 7px;
    font-weight: 600;
    float: left;
  }
  .div_liner_input {
    height: 15px;
  }

  .content_div_liner {
    float: unset;
    align-items: center;
    // display: block;
    width: 100%;
  }

  .liner_int {
    float: right;
    width: 50%;
    border-bottom: 1px solid black;
  }

  .div_rigth {
    height: auto;
    width: 50%;
  }
  .table_dat {
    border-collapse: collapse;
  }
  .row_tr {
    display: flex;
  }

  .cell {
    font-size: 7px;
    flex: 1; /* Distribuye el espacio uniformemente entre las celdas */
    border: 0.5px solid rgb(100, 100, 100); /* Bordes de las celdas */
    padding: 3px; /* Espaciado dentro de las celdas */
    text-align: center; /* Alinea el texto en el centro */
  }

  .text_observations {
    color: black;
    height: 110px;
    padding: 3px;
  }
  .container_date {
    margin-top: 10px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
  }
  .conten_div_date {
    display: flex;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    /* margin: auto; */
    height: 15px;
    border: 1.5px solid black;
  }
  .div_date {
    width: 50%;
    border: 0.5px solid black;
  }

  .table {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    border-collapse: collapse;
    text-align: center;
  }

  .table,
  .th,
  .td {
    border: 2px solid black;
    font-size: 9px;
  }

  .th,
  .td {
    border: 1.5px solid black;
    text-align: center;
    /* Establece un ancho mínimo para las celdas */
    height: 15px;
  }

  .thead {
    background: #fbfbfb;
    color: #000000;
  }

  .firm {
    margin-top: 30px;
    width: 100%;
    text-align: center;
  }
  .line_firme {
    height: 2px;
    margin: auto;
    border-bottom: 2px solid black;
    width: 30%;
  }
  .text_firm {
    font-size: 10px;
    font-weight: bold;
  }

  h2 {
    color: rgba(88, 9, 88, 0.712);
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    margin: 1px 0px;
  }

  p {
    margin: 0px 0;
    font-size: 9px;
  }

  .folio {
    color: red;
    font-weight: 600;
    float: left;
    font-size: 8px;
    strong {
      margin-right: 20px;
    }
  }
  .strong {
    margin-left: 10px;
    float: right;
    color: green;
  }

  .foliotext {
    color: #fff;
  }

  .row {
    width: 100%;
    overflow: hidden;
  }

  .column {
    width: 235px;
    /* border: 2px solid black; */
    /* height: 100px; */
    /* padding-left: 30px; */
  }

  .izquierda {
    margin-left: 6px;
    float: left; /* Flota a la izquierda */
  }

  .derecha {
    margin-right: 13px;
    float: right; /* Flota a la derecha */
  }

  .fullcolumn {
    overflow: hidden;
    flex-wrap: wrap;
    margin-top: 10px;
    width: 520px;
    border: 2px solid #2f4669;
    padding: 5px;
    padding-left: 30px;
    border-radius: 20px;
  }
  .titles_observations {
    color: white;
  }

  .left-column,
  .right-column {
    width: 50%;
  }
  .left-column p,
  .right-column p {
    margin: 5px 0;
  }

  strong {
    font-weight: 800;
  }

  table {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    border-collapse: collapse;
    text-align: center;
  }

  table,
  th,
  td {
    border: 2px solid black;
    font-size: 9px;
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
    background: #2f4669;
    color: #fff;
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

  .ltitle {
    color: rgba(88, 9, 88, 0.712);
    font-weight: 800;
    font-size: 8px;
  }

  .redcolor {
    color: red;
  }

  .totalamount {
    color: rgba(88, 9, 88, 0.712);
    font-weight: 800;
    font-size: 8px;
  }
  .table_section {
    min-height: 160px;
  }

  /* .backgroundgrey {
        background-color: lightgray;
      } */
`;
