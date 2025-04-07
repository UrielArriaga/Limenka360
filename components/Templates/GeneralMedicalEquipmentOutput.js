import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function GeneralMedicalEquipmentOutput(props) {
  const { zoom,data } = props;
  
  const { prospect, products, footer, total, ejecutive, discount, subtotal, quoteInfo, company, observations } = data;
  const { userData } = useSelector(userSelector);
  const rowCount = 30;
  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container">
      <section className="sections">
        <div className="content_title">
          <p className="title">SALIDA GENERAL DE EQUIPO MEDICO</p>
        </div>
        </section>
        <section className="sections">
      <div className="date_info">
        <div className="content_img">
          <img className="logo" src=""></img>
        </div>
        <div className="date_info_folio_date">
          <div className="left">
            <div className="left_left"><p className="text_folio">FOLIO:</p></div>
            <div className="left_rigth"><p className="text_folio">{quoteInfo.folio || "Sin folio"}</p></div>
          </div>
          <div className="left">
            <div className="left_left">  <p className="text_folio_date">FECHA DE EMISION:</p></div>
            <div className="left_rigth">  <p className="text_folio_date">{quoteInfo.date}</p></div>
            <div className="liner"></div>
          </div>
          <div className="left">
            <div className="left_left"><p className="text_folio_date">FECHA DE SALIDA:</p></div>
            <div className="left_rigth"><p className="text_folio_date">{quoteInfo.date}</p><div className="liner"></div></div>
          </div>
        </div>
      </div>

    </section>
        <section className="sections">
          <table>
            <thead>
              <tr>
                <th className="thead_th_cant">CANTIDAD (PZAS)</th>
                <th className="thead_th_code">CODIGO</th>
                <th className="thead_th_desc">DESCRIPCION</th>
                <th className="thead_th_dest">DESTINO</th>
              </tr>
            </thead>
            <tbody>
            {products.map((item, index) => (
          <tr key={index}>
            <td>{item.quantity}</td>
            <td>{item.code}</td>
            <td>{item.brand.name}</td>
            <td>{item.entity || "sin destino "}</td>
          </tr>
        ))}
        
        {/* Luego generar las filas vacías restantes */}
        {Array.from({ length: rowCount - products.length }).map((_, index) => (
          <tr key={products.length + index}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
            </tbody>
          </table>
        </section>
        <section className="sections_firm">
          <div className="content_left">
            <div className="content_firm_operator">
              <div className="line"></div>
              <p className="text_operator">OPERADOR</p>
            </div>

            <div className="content_firm_vigilance">
              <div className="line"></div>
              <p className="text_vigilace">VIGILANCIA</p>
            </div>
          </div>
          <div className="content_rigth">
            <div className="content_firm_almacenist">
              <div className="line"></div>
              <p className="text_almacenist">ALMACÉN </p>
            </div>
            <div className="content_firm_gerent">
              <div className="line"></div>
              <p className="text_gerent">GERENTE</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  overflow: scroll;
  #pageFooter {
    font-size: 8px;
    color: #555;
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
    background-color: #ffffff;
  }

  .container {
      width: 5.8in;
      margin: auto;
      padding: 20px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .sections {
      width: 100%;
      float: left;
    }

    .content_title {
      float: left;
      width: 100%;
      height: 25px;
      text-align: center;
    }

    .title {
      height: 0px;
      font-size: 14px;
      color: #3b647e;
      font-weight: 500;
    }
    .date_info {
      float: left;
      width: 100%;
    }

    .content_img {
      float: left;

      width: 30%;
      overflow: hidden;
      margin-bottom: 5px;
      /* border: 1px solid #ddd; */
      padding: 10px;
      box-sizing: border-box;
    }

    .logo {
      float: left;
      width: 130px;
      height: auto;
      margin-right: 20px;
    }

    .date_info_folio_date {
    padding-top: 10px;
      width: 70%;
      /* border-bottom: 1px solid black; */
      float: right;
    }
    .left{
      text-align: center;
      float: left;
      width: 100%;
    }
    .left_left{
      float: left;
      width: 50%;
    }
    .left_rigth{
      float: right;
      width: 20%;
    }

    .divider_folios_date {
      border-bottom: 1.5px solid black;
    }

    .text_folio_date {
     
      color: #42627e;
      font-weight: 700;
      font-size: 8px;
    }

    .text_folio {
     
      color: #42627e;
      font-weight: 700;
      font-size: 8px;
    }
    table {
      width: 100%;
      /* margin-left: auto;
      margin-right: auto; */
      margin-top: 10px;
      border-collapse: collapse;
      text-align: center;
    }

    table,
    th,
    td {
      border: 2px solid #203663;
      font-size: 9px;
    }

    th {
      color: #203663;
    }

    td {
      border: 1.5px solid #203663;
      font-size: 7px;
      text-align: center;
      /* Establece un ancho mínimo para las celdas */
      height: 16px;
    }

    thead {
      background: #bdd7ee;
      color: #fff;
    }

    .thead_th_cant {
      width: 5%;
    }

    .thead_th_code {
      width: 10%;
    }

    .thead_th_desc {
      width: 65%;
    }

    .thead_th_dest {
      width: 20%;
    }

    .content__firm {
      float: right;
    }

    .content_left {
      text-align: center;
      float: left;
      width: 50%;
    }

    .content_firm_operator {
      width: 50%;
      float: left;
    }

    .content_firm_vigilance {
      width: 50%;
      float: right;
    }

    .content_rigth {
      text-align: center;
      float: right;
      width: 50%;
    }

    .content_firm_almacenist {
      width: 50%;
      float: left;
    }

    .content_firm_gerent {
      float: right;
      width: 50%;
    }

    .text_operator {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .text_vigilace {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .text_almacenist {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .text_gerent {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .line {
      float: left;
      margin-top: 2px;
      margin-left: auto;
      margin-right: auto;
      width: 90%;
      background-color: #203663;
      height: 1.4px;
    }   
    .liner {
      float: left;
      margin-top: 2px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      background-color: #203663;
      height: 1.4px;
    }

    .sections_firm {
      float: left;
      width: 100%;
      margin-top: 150px;
    }
`;