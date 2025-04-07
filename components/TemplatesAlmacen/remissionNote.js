import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";
import LogoSelect from "../Group";

export default function RemissionNote(props) {
  const { data,folioSerial } = props;

  const { userData } = useSelector(userSelector);
  return (
    <LayoutTemplate
      // zoom={zoom}
      primaryColor={userData?.groupprimarycolor}
      secondaryColor={userData?.groupsecondarycolor}
    >
      <div className="container">
        <div className="content_titles_image">
          <img className="logo" src={LogoSelect(data?.groupName)}></img>
          <p className="title_info_logo">Empresa número uno en distribución de equipo médico</p>
          <p className="title">NOTA DE REMISIÓN </p>
        </div>
        <section>
          <div className="date_info">
            <div className="date_info_medical">
              <p className="info_medical_text">Av Instituto Politécnico Nacional 5129, Capultitlán, </p>
              <p className="info_medical_text">Del. Gustavo A. Madero, CP 07370 Ciudad de México.</p>
              <p className="info_medical_text">TELEFONO. 55 5861 8906</p>
            </div>
            <div className="date_info_bay">
              <div className="content_info_left">
                <p className="title_info">Folio núm.</p>
                <p className="subtitle_info">{data.folioSerial}</p>
                <p className="title_info">Entrega</p>
                <p className="subtitle_info">{data.createdAt}</p>
              </div>
              <div className="content_info_right">
                <p className="title_info">Emisión</p>
                <p className="subtitle_info">{data.createdAt}</p>
                <p className="title_info">Expedición</p>
                <p className="subtitle_info">{userData?.warehouse?.name}</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="divider"></div>
        </section>

        <div className="div_content">
          <div className="container_buy_left">
            <p className="text">
              Nombre: <strong>{data?.client.name}</strong>{" "}
            </p>
            <p className="text">
              Dirección: <strong>{data.client.street}</strong>
            </p>
            <p className="text">
              Ciudad y C.P.: <strong>134587</strong>
            </p>
            <p className="text">
              Telefono: <strong>{data?.phone}</strong>
            </p>
            <p className="text">
              Referencia: <strong>sobre la calle madero , aun lado el edificio capital reforma </strong>
            </p>
          </div>
          <div className="container_buy_right">
            <p className="text_right">
              Ejecutivo: <strong className="strong_right">{data.EjecutiveName}</strong>
            </p>
            <p className="text_right">
              Pedido: <strong className="strong_right">{data.Folio}</strong>
            </p>
          </div>
          <div className="div_table">
            <table>
              <thead>
                <tr>
                  <th className="cant">Cantidad</th>
                  <th className="cant">Unidad</th>
                  <th className="cant">Numero Serie</th>
                  <th className="cant">CLAVE</th>
                  <th className="">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.articleCant}</td>
                      <td>{item?.articleunidad}</td>
                      <td>{item?.id}</td>
                      <td>{item?.code}</td>
                      <td>{item?.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="dub">
            <p className="name">Nombre Completo y Firma</p>
            <div className="firm"></div>
            <p className="reg">
              Es responsabilidad del cliente revisar cada uno de los productos entregados. En caso de tener alguna
              observación, favor de reportarla inmediatamente vía correo electronico al ejecutivo de ventas durante los
              2 días hábiles siguientes a su entrega. De lo contrario la empresa no se hace responsable por cualquier
              desperfecto físico que llegara a tener dicho producto.{" "}
            </p>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

const LayoutTemplate = styled.section`
  width: 100%;
  overflow-y: scroll;
  height: 75vh;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  /* position: relative;
   zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")}; */
  padding: 10px;
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
    background-color: #fff;
  }

  .content_titles_image {
    width: 100%;
    overflow: hidden;
    margin-bottom: 5px;
    /* border: 1px solid #ddd; */
    padding: 10px;
    box-sizing: border-box;
  }

  .logo {
    float: left;
    width: 150px;
    height: auto;
    margin-right: 20px;
  }

  .title_info_logo {
    color: #a2999d;
    float: left;
    width: calc(100% - 300px);
    text-align: center;
    text-align: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .title {
    float: right;
    width: 200px;
    text-align: right;
    margin-top: 20px;
    color: #358da1;
    font-weight: 500;
    padding: 0;
    font-size: 13px;
    box-sizing: border-box;
  }

  .container {
    /* width: 5.8in; */
    // height: 11in;
    /* margin: auto; */
    /* padding: 20px; */
    background: #fff;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  }

  .date_info {
    width: 100%;
    overflow: hidden;
    margin-bottom: 5px;
    /* border: 1px solid #eb5d5d; */
    /* padding: 10px; */
    box-sizing: border-box;
  }

  .date_info_medical {
    float: left;
    width: 70%;
    /* background: rgb(0, 255, 26); */
  }

  .info_medical_text {
    font-size: 8px;
    color: #52595f;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .date_info_bay {
    width: 30%;
    /* background: red; */
    float: right;
  }

  .date_info_bay {
    overflow: hidden;
    text-align: center;
  }

  .content_info_left {
    float: left;
  }

  .content_info_right {
    float: right;
  }

  .title_info {
    font-weight: 800;
    padding: 0px;
    font-size: 8px;
    color: red;
  }

  .subtitle_info {
    color: #52595f;
    font-weight: bold;
  }

  .divider {
    background-color: #bbbbbb;
    height: 5px;
  }

  .div_content {
    margin-top: 10px;
    width: 100%;
  }
  .container_buy_left {
    float: left;
    width: 60%;
  }
  .container_buy_right {
    float: right;
    width: 40%;
  }
  .text {
    color: grey;
    font-size: 9px;
    font-weight: 500;
  }
  strong {
    font-size: 8px;
    color: #444a4f;
  }

  .text_right {
    font-size: 8px;
    color: rgb(235, 32, 32);
    font-weight: 800;
  }

  .div_table {
    width: 100%;
    float: left;
    min-height: 460px;
  }

  table {
    margin-top: 10px;
    width: 100%;
  }

  thead {
    background-color: #cdcdcd;
  }

  tr {
    text-align: center;
    color: rgb(36, 34, 34);
    font-size: 8px;
  }
  p {
    margin: 0px 0;
    font-size: 9px;
  }
  .cant {
    padding: 4px;
    width: 8%;
  }

  td {
    font-size: 7px;
  }
  .dub {
    margin-top: 30px;
    float: left;
    width: 100%;
    text-align: center;
  }
  .name {
    margin-bottom: 20px;
  }

  .firm {
    background-color: black;
    width: 40%;
    height: 2px;
    margin: auto;
  }
  .reg {
    margin-top: 30px;
    font-size: 5px;
    color: #444a4f;
  }
`;
