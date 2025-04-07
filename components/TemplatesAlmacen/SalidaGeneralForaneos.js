import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function SalidaGeneralForaneos(props) {
  const { data } = props;
  const { userData } = useSelector(userSelector);
  return (
    <LayoutTemplate
      // zoom={zoom}
      primaryColor={userData?.groupprimarycolor}
      secondaryColor={userData?.groupsecondarycolor}
    >
      <div className="container">
        <div className="content_titles_image">
          <img className="logo" src="/vasa.jpeg"></img>
          <p className="title" onClick={() => console.log("dd", data)}>
            SALIDA GENERAL DE EQUIPO MEDICO
          </p>
        </div>
        <section>
          <div className="date_info">
            <div className="date_info_medical">
              <p className="info_medical_text"></p>
              <p className="info_medical_text"></p>
              <p className="info_medical_text"></p>
            </div>
            <div className="content_info_right">
              <div className="info_row">
                <p className="subtitle_info bold_text">Folio:</p>
                <p className="subtitle_info">{data.folioSerial}</p>
              </div>
              <div className="info_row ">
                <p className="subtitle_info bold_text">Fecha de emisión:</p>
                <p className="subtitle_info">{data.createdAt}</p>
              </div>
              <div className="info_row with_line">
                <p className="subtitle_info bold_text">Fecha de salida:</p>
                <p className="subtitle_info">{data.createdAt}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="div_content">
          <div className="div_table">
            <table>
              <thead>
                <tr>
                  <th className="cant">Cantidad (PZAS)</th>
                  <th className="cant">Numero Serie</th>
                  <th className="cant">Codigo</th>
                  <th className="cant">Descripción</th>
                  <th className="">Destino</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.articleCant}</td>
                      <td>{item?.id}</td>
                      <td>{item?.code}</td>
                      <td>{item?.articledescripcion}</td>
                      <td>{item?.Direcciones}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="dub">
            <table>
              <tbody>
                <tr>
                  <td className="centered-text">
                    <div className="line"></div>
                    <p>GERENTE</p>
                  </td>
                  <td className="centered-text">
                    <div className="line"></div>
                    <p>ADMINISTRADOR </p>
                  </td>
                  <td className="centered-text">
                    <div className="line"></div>
                    <p>EJECUTIVO</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

const LayoutTemplate = styled.section`
  width: 100%;
  overflow-y: auto;
  height: 75vh;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px, rgba(27, 31, 35, 0.15) 0px 0px 1px;
  padding: 10px;

  .content_info_right {
    width: 480px;
  }

  .info_row {
    display: flex;
    justify-content: flex-end;
    padding: 2px 0;
  }

  .bold_text {
    font-weight: bold;
    color: #0b2c4c;
  }

  .with_line {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 2px 0; /* Ajusta el espaciado alrededor de la línea */
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

  .line {
    border: none;
    border-top: 1px solid black;
    margin: 0;
    padding: 0;
  }

  .container {
    background: #fff;
  }

  .content_titles_image {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
  }

  .logo {
    width: 150px;
    height: auto;
    margin-right: 20px;
  }

  .title {
    margin-left: 100px;
    color: #203764;
    font-weight: 400;
    font-size: 18px;
  }

  .date_info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .info_medical_text,
  p {
    font-size: 10px;
    color: #52595f;
    margin: 0;
  }

  .subtitle_info {
    width: 90px;
    p {
      font-size: 10px;
      color: #52595f;
      margin: 0;
    }
  }

  .align_right {
    text-align: right;
    width: 200px;
  }

  .div_table {
    margin-top: 10px;
    min-height: 460px;
  }

  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
    font-size: 8px;
    color: rgb(36, 34, 34);
  }

  thead {
    background-color: #b4c6e7;
  }

  th,
  td {
    text-align: center;
    padding: 4px;
  }

  .dub {
    margin-top: 30px;
    text-align: center;
  }

  .firm {
    background-color: black;
    width: 40%;
    height: 2px;
    margin: 10px auto;
  }

  .reg {
    margin-top: 30px;
    font-size: 8px;
    color: #444a4f;
  }

  .centered-text {
    height: 60px;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
  }

  .line {
    width: 90%; /* Controla el largo de la línea */
    height: 1px; /* Grosor de la línea */
    background-color: #000; /* Color de la línea */
    margin: 0 auto; /* Centra la línea en la celda */
  }
`;
