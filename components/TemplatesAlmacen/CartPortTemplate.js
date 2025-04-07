import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function CartPortTemplate(props) {
  const { data } = props;
  const converter = num => {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const { userData } = useSelector(userSelector);
  return (
    <LayoutTemplate
      // zoom={zoom}
      primaryColor={userData?.groupprimarycolor}
      secondaryColor={userData?.groupsecondarycolor}
    >
      <div className="container">
        <section className="sections">
          <div className="content_section_info">
            <div className="container_complete_initial">
              <div className="content_div_title">
                <p className="p_div_title">COMERCIALIZADORA Y DISTRIBUIDORA MB</p>
                <p className="p_div_titles">CDM170519ERA</p>
                <p className="p_div_subtitle">Regimen Fiscal: 601 - General de Ley Personas Morales</p>
                <p className="p_div_subtitle">Lugar de expedicion:</p>
                <p className="p_div_subtitle">
                  {" "}
                  Domicilio: Balcon de la cañada 3020 Altavista Sur Monterrey Nuevo Leon Mexico 64740
                </p>
              </div>
              <div className="content_div_cart_port">
                <div className="content_type_document">
                  <p className="type_document">Carta Porte - Translado</p>
                </div>
                <div className="content_date">
                  <p className="title_date_text">T 1</p>
                  <p className="subtitle_date_text">Fecha Timbrado</p>
                  <p className="title_date_text">{data?.createdAt}</p>
                  <p className="subtitle_date_text">Fecha Emision</p>
                  <p className="title_date_text">{data?.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="table_info_client">
            <div className="container_date_folio">
              <div className="container_date_folio_left">
                <div className="date_folio_left_title">
                  <p className="left_title_client">DATOS DEL CLIENTE</p>
                </div>
                <p className="date_folio_text">Nombre: {data?.client?.name}</p>
                <p className="date_folio_text">RFC:{data?.client?.rfc}</p>
                <p className="date_folio_text">Tax Id Number: {data?.client?.tax}</p>
                <p className="date_folio_text">Domicilio: {data?.client?.street}</p>
              </div>
              <div className="container_date_folio_right">
                <p className="folio_right_title">Folio Fiscal</p>
                <p className="folio_right_subtitle">82581A6B-B003-4327-A5AE-C178A5EBD864</p>
                <p className="folio_right_title">No. Certificado Digital</p>
                <p className="folio_right_subtitle">00001000000510785445</p>
                <p className="folio_right_title">No. Certificado SAT</p>
                <p className="folio_right_subtitle">00001000000505142236</p>
              </div>
            </div>
            <div className="date_comprobant">
              <div className="content_date_comprobant_title">
                <p className="comprobant_title_text">DATOS DEL COMPROBANTE</p>
              </div>
              <div className="div_date_comprobant">
                <div className="div_date_comprobant_left">
                  <div className="content_left_date">
                    <p className="date_title">Metodo de pago</p>
                    <p className="date_subtitle">{data?.metodpay}</p>
                    <p className="date_title">Forma de pago</p>
                    <p className="date_subtitle">{data?.metodpay}</p>
                  </div>
                  <div className="content_rigt_date">
                    <p className="date_title">Uso de Cfdi</p>
                    <p className="date_subtitle">---dsd--</p>
                    <p className="date_title">Tipo de Comprobante</p>
                    <p className="date_subtitle">-----</p>
                  </div>
                </div>
                <div className="div_date_comprobant_right">
                  <div className="content_left_date">
                    <p className="date_title">Moneda</p>
                    <p className="date_subtitle">
                      XXX - Los códigos asignados para las transacciones en que intervenga ninguna moneda.
                    </p>
                  </div>
                  <div className="content_rigt_date">
                    <p className="date_title">Tipo de Cambio</p>
                    <p className="date_subtitle">1.00000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="content_table_trasport">
            <table>
              <thead>
                <tr>
                  <th>Medio de transporte</th>
                  <th>Transporte Internacional </th>
                  <th>Tipo de Transporte Internacional </th>
                  <th>Vía de Transporte Internacional </th>
                  <th>País de origen o destino </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01 - Autotransporte</td>
                  <td>No</td>
                  <td>Autotransporte (Terrestre)</td>
                  <td>NA</td>
                  <td>NA</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Total de distancia recorrida:</th>
                  <th>Tipo Autotransporte</th>
                  <th>Aseguradora resp. civil</th>
                  <th>Permiso SCT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data?.transport?.totaldistance}</td>
                  <td>{data?.transport?.tipetrasport}</td>
                  <td>ANA SEGUROS</td>
                  <td>{data?.transport?.poliza}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Número de permiso</th>
                  <th>Placa</th>
                  <th>Año</th>
                  <th>Póliza resp. civil</th>
                  <th>Póliza med. amb.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>999999</td>
                  <td>{data?.transport?.placa}</td>
                  <td>{data?.transport?.age}</td>
                  <td>004819200</td>
                  <td>NA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="sections">
          <div className="content_title_mercan">
            <p className="title_mercan">MERCANCÍAS</p>
          </div>
        </section>
        <section className="sections">
          {data?.products?.map((item, index) => {
            return (
              <div key={index}>
                <table className="table_merchandise">
                  <thead className="thead_merchandise">
                    <tr className="tr_merchandise">
                      <th className="th_merchandise_cant">Cantidad</th>
                      <th className="th_merchandise_unity">Unidad</th>
                      <th className="th_merchandise_desc">Descripción</th>
                      <th className="th_merchandise_unit">Precio Unitario</th>
                      <th className="th_merchandise_imp">Impuestos</th>
                      <th className="th_merchandise_import">Importe</th>
                    </tr>
                  </thead>
                  <tbody className="tbody_merchandise">
                    <tr className="tr_merchandise">
                      <td className="td_merchandise">{item?.productcan}</td>
                      <td className="td_merchandise">{item?.articleunidad}</td>
                      <td className="td_merchandise">{item?.name}</td>
                      <td className="td_merchandise">{item?.precioU} </td>
                      <td className="td_merchandise">{item?.Impuestos}</td>
                      <td className="td_merchandise">{item?.import}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table_merchandise">
                  <thead className="thead_merchandise">
                    <tr className="tr_merchandise">
                      <th className="th_merchandise_cant">Cantidad</th>
                      <th className="th_merchandise_unity">Unidad</th>
                      <th className="th_merchandise_desc">Descripción</th>
                      <th className="th_merchandise_type">Tipo de Material Peligroso</th>
                      <th className="th_merchandise_em">Embalaje </th>
                      <th className="th_merchandise_kg">Peso Kg</th>
                      <th className="th_merchandise_fraction">Fracción arancelaria</th>
                      <th className="th_merchandise_ped">Pedimento</th>
                    </tr>
                  </thead>
                  <tbody className="tbody_merchandise">
                    <tr className="tr_merchandise">
                      <td className="td_merchandise">{item?.articleCant}</td>
                      <td className="td_merchandise">{item?.articleunidad}</td>
                      <td className="td_merchandise">{item?.articledescripcion}</td>
                      <td className="td_merchandise">-</td>
                      <td className="td_merchandise">
                        {" "}
                        {item?.high} x {item?.long} x {item?.broad}
                      </td>
                      <td className="td_merchandise">{item?.weight}</td>
                      <td className="td_merchandise">-</td>
                      <td className="td_merchandise">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>
        <section className="sections">
          <div className="content_packaging">
            <div className="div_packaging_left">
              <p className="packaging_left_text">Embalaje</p>
              <p className="packaging_left_text">----</p>
              <p className="packaging_left_text">Número de guía</p>
              <p className="packaging_left_text">----</p>
            </div>
            <div className="div_packaging_right">
              <p className="packaging_right_text">
                Número total de mercancías: <trong>{data?.products?.length}</trong>
              </p>
              <p className="packaging_right_text">
                Peso guía: <strong> - </strong>{" "}
              </p>
              <p className="packaging_right_text">
                Peso bruto total:<strong>362</strong>&nbsp;&nbsp;&nbsp;&nbsp;Unidad de peso: <strong>KGM</strong>
              </p>
              <p className="packaging_right_text">Descripción guía: -----</p>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="container_Senders_recipients_title">
            <p className="title_Senders_recipients">REMITENTES Y DESTINATARIOS</p>
          </div>
          <table className="table_Senders_recipients">
            <thead className="thead_Senders_recipients">
              <tr className="tr_Senders_recipients">
                <th className="th_Senders_recipients_cant"></th>
                <th className="th_Senders_recipients_unity">Nombre</th>
                <th className="th_Senders_recipients_desc">Tax id</th>
                <th className="th_Senders_recipients_unit">Residencia Fiscal</th>
                <th className="th_Senders_recipients_imp">Fecha</th>
              </tr>
            </thead>
            <tbody className="tbody_Senders_recipients">
              <tr className="tr_Senders_recipients">
                <td className="td_Senders_recipients">Origen</td>
                <td className="td_Senders_recipients">CDM170519ERA COMERCIALIZADORA Y DISTRIBUIDORA MB</td>
                <td className="td_Senders_recipients">----</td>
                <td className="td_Senders_recipients">---</td>

                <td className="td_Senders_recipients">2024-06-28T10:00:00</td>
              </tr>
              <tr className="tr_Senders_recipients">
                <td className="td_Senders_recipients">Destino</td>
                <td className="td_Senders_recipients">MBE150210NX1 MOTORES, BOMBAS Y EQUIPOS HAB</td>
                <td className="td_Senders_recipients">----</td>
                <td className="td_Senders_recipients">---</td>

                <td className="td_Senders_recipients">2024-06-28T10:00:00</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Direcciones:</th>
                <th>Núm Ext.Núm Int.</th>
                <th>Colonia</th>
                <th>Localidad</th>
                <th>Referencia</th>
                <th>Municipio</th>
                <th>Estado</th>
                <th>Pais</th>
                <th>Código Postal</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.Direcciones}</td>
                    <td>{item?.NúmExt}</td>
                    <td>{item?.Colonia}</td>
                    <td>{item?.Localidad}</td>
                    <td>{item?.Referencia}</td>
                    <td>{item?.Municipio}</td>
                    <td>{item?.EstadoPais}</td>
                    <td>{item?.EstadoPais}</td>
                    <td>{item?.cp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section className="sections">
          <div className="container_Senders_recipients_title">
            <p className="title_Senders_recipients">OPERADORES Y DATOS ADICIONALES</p>
          </div>
          <table className="table_Senders_recipients">
            <thead className="thead_Senders_recipients">
              <tr className="tr_Senders_recipients">
                <th className="th_Senders_recipients_cant"></th>
                <th className="th_Senders_recipients_unity">RFC</th>
                <th className="th_Senders_recipients_desc">Descripción</th>
                <th className="th_Senders_recipients_unit">Tax Id</th>
                <th className="th_Senders_recipients_imp">Residencia Fiscal</th>
              </tr>
            </thead>
            <tbody className="tbody_Senders_recipients">
              <tr className="tr_Senders_recipients">
                <td className="td_Senders_recipients">
                  <strong>01</strong>
                </td>
                <td className="td_Senders_recipients">--</td>
                <td className="td_Senders_recipients">{data?.transport?.nametrasport}</td>
                <td className="td_Senders_recipients">010000679262</td>
                <td className="td_Senders_recipients">-------</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Direcciones:</th>
                <th>Núm Ext.Núm Int.</th>
                <th>Colonia</th>
                <th>Localidad</th>
                <th>Referencia</th>
                <th>Municipio</th>
                <th>Estado</th>
                <th>Pais</th>
                <th>Código Postal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>--</td>
                <td>--</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="sections">
          <div className="container_import">
            <div className="div_import_left">
              <p>
                Importe con letra: <strong>cero Pesos 00/100 M.N.</strong>
              </p>
            </div>
            <div className="div_import_right">
              <div className="container_r_l">
                <div className="import_right_l">
                  <p>Subtotal</p>
                  <p>Descuento</p>
                </div>
                <div className="import_right_r">
                  <p>${converter(data?.sub)}</p>
                  <p>$0.00</p>
                </div>
              </div>
              <div className="container_r_l">
                <div className="import_right_l">
                  <p>Total</p>
                </div>
                <div className="import_right_r">
                  <p>${converter(data.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="container_qr_des">
            <div className="qr">
              <img
                src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/common/qr.jpg"
                className="img"
              />
            </div>
            <div className="des">
              <table className="table_des">
                <thead className="thead_des">
                  <tr className="tr_des">
                    <th className="th_des">Cadena Original del Complemento de Certificación Digital del SAT</th>
                  </tr>
                </thead>
                <tbody className="tbody_des">
                  <tr className="tr_des">
                    <td className="td_des">
                      ||1.1|82581A6B-B003-4327-A5AE-C178A5EBD864|2024-06-26T13:25:33|MAS0810247C0|bXwwxxZ/jUEOorVPbvzWvMIjwZQiKATw0Qsd1kv87TuBe
                      s+3E8CcjY5JllUJTvTTGvSBeY/5wCayImtAUoQq8cZkzqVy/Be2Xkbqb92RLKWLiG7FUddlSCgXcfMfhJYKuc8+PYxgiTrzPlET8ijJAnd+Nblrc+2nmHOJk
                      tBNYlgWmEsCmAxGyTH5OBbIaUaHobsutEvwZBlXrAJIlB31LDPb/iUZseppTesOKaaj7ZrsxRn5CaQruUJgRoCakPnSQaRkVy5OW0vPxGhte9D+W+wDNyJYSV
                      tYHnzA/nMy74rpasIuG18j9bzHFINHffTdquzfLsaGkYhAOSaF1LYIw==|00001000000505142236||
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table_des">
                <thead className="thead_des">
                  <tr className="tr_des">
                    <th className="th_des">Sello Digital del CFDI </th>
                  </tr>
                </thead>
                <tbody className="tbody_des">
                  <tr className="tr_des">
                    <td className="td_des">
                      bXwwxxZ/jUEOorVPbvzWvMIjwZQiKATw0Qsd1kv87TuBes+3E8CcjY5JllUJTvTTGvSBeY/5wCayImtAUoQq8cZkzqVy/Bea2Xkbqb92RLKWLiG7FUddlSCgX
                      cfMfhJYKuc8+PYxgiTrzPlET8ijJAnd+Nblrc+2nmHOJktBNYlgWmEsCmAxGyTH5OBbIaUaHobsutEvwZBlXrAJIlB31LDPb/iUZseppTesOKaaj7ZrsxRn5C
                      aQruUJgRoCakPnSQaRkVy5OW0vPxGhte9D+W+wDNyJYSVtYHnzA/nMy74rpasIuG18j9bzHFINHffTdquzfLsaGkYhAOSaF1LYIw==
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table_des">
                <thead className="thead_des">
                  <tr className="tr_des">
                    <th className="th_des">Sello del SAT</th>
                  </tr>
                </thead>
                <tbody className="tbody_des">
                  <tr className="tr_des">
                    <td className="td_des">
                      IBpHglyrmLZ84vQDjUGc67Rcx1e3IcXMGPsYWd5Rfhj17//KRkUq0kLPKlIhw4Huwt0c57CLGS35Rl5zzW0cNUaGLR2HmSEyt1TFl+8okKbPFT7/GC755HB
                      6dX4xV3C9fI/4p0WIjyCwSjcPQe2A0MfwfhTFIvyVwUpUOSisFCID4Og1ZClACWmPQxVDJ1mZDLCxIL2nNHzfm2tIprUag7wuZUgE3fQ7zoXL9s+9bkvls4
                      JVEkukUYTU16xkmxmqwisvbJzTqVtGSs1UPSJuo0dekdcZfsmKxI5ounBWTsmvd4MxKm/Lu7fJYcREElR5ECHsDabxcygd6MZDqbo4aw==
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
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
    font-size: 10px;
    color: #555;
    width: 100%;
    float: left;
  }

  .footer {
    font-size: 10px;
    color: #3d3d3d;
  }

  @page {
    size: A4;
    margin: 0;
  }
  body {
    font-family: Arial, sans-serif;
    /* line-height: 1.5; */
    margin: 0;
    padding: 0;
    background-color: white;
  }

  .container {
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    width: 100%;
    height: 90%;
  }

  .sections {
    float: left;
    width: 100%;
  }

  .content_section_info {
    background-color: rgb(220, 69, 69);
    width: 100%;
  }

  .content_div_title {
    float: left;
    width: 70%;
  }

  .p_div_title {
    color: #000;
    font-weight: 600;
    font-size: 9px;
  }

  .p_div_titles {
    color: #000;
    font-weight: 600;
    font-size: 10px;
  }

  .p_div_subtitle {
    font-size: 9px;
    font-weight: 500;
  }

  .content_div_cart_port {
    float: right;
    width: 30%;
  }

  .content_type_document {
    margin: auto;
    background: #18186f;
    font-size: 9px;
    color: white;
    width: 80%;
    text-align: center;
  }

  .type_document {
    font-size: 7.5px;
    font-weight: 600;
    color: #fff;
  }

  .content_date {
    margin: auto;
    width: 80%;
    text-align: center;
    font-size: 12px;
  }

  .title_date_text {
    font-size: 9px;
    font-weight: 600;
  }

  .subtitle_date_text {
    font-size: 9px;
    font-weight: 500;
  }

  .table_info_client {
    height: 150px;
    border: 1.5px solid black;
  }

  .container_date_folio {
    width: 100%;
    height: 68px;
  }

  .container_date_folio_left {
    float: left;
    width: 60%;
  }

  .date_folio_text {
    font-size: 9px;
  }

  .date_folio_left_title {
    width: 100%;
    text-align: center;
    background: #18186f;
  }

  .left_title_client {
    color: #fff;
    font-weight: 500;
    font-size: 10px;
  }

  .container_date_folio_right {
    text-align: center;
    float: left;
    width: 40%;
    /* height: 70px; */
    border-bottom: 1.5px solid black;
    border-left: 1.5px solid black;
  }

  .folio_right_title {
    font-size: 10px;
    font-weight: 600;
  }

  .folio_right_subtitle {
    font-size: 9px;
    font-size: 500;
  }

  .date_comprobant {
    border-top: 1.5px solid black;
    background-color: rgb(31, 235, 235);
  }

  .content_date_comprobant_title {
    text-align: center;
    background: #18186f;
  }

  .comprobant_title_text {
    font-size: 10px;
    color: #fff;
  }

  .div_date_comprobant_left {
    padding: 2px;
    width: 50%;
    float: left;
  }

  .content_left_date {
    padding: 5px;
    float: left;
    width: 50%;
  }

  .date_title {
    font-size: 9px;
    font-weight: bold;
  }

  .date_subtitle {
    font-size: 9px;
    font-weight: 500;
  }

  .content_rigt_date {
    float: right;
    padding: 5px;
    width: 50%;
  }

  .div_date_comprobant_right {
    height: 67px;
    width: 50%;
    padding: 2px;
    float: right;
    border-left: 1.5px solid black;
  }

  .content_table_trasport {
    padding-top: 3px;
    /* background-color: pink; */
  }

  table {
    width: 100%;
  }

  th {
    text-align: justify;
    font-weight: 600;
    font-size: 9px;
  }

  td {
    font-size: 8px;
  }

  .content_title_mercan {
    width: 100%;
    text-align: center;
  }

  .title_mercan {
    font-size: 9px;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .table_merchandise {
    width: 100%;
  }

  .table_merchandise {
    border-spacing: 0px;
  }

  .th_merchandise_cant {
    width: 10%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_merchandise_unity {
    width: 10%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_merchandise_desc {
    width: 30%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_merchandise_unit {
    width: 10%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_merchandise_imp {
    width: 10%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_merchandise_import {
    width: 10%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_merchandise_type {
    background: #18186f;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .th_merchandise_em {
    background: #18186f;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .th_merchandise_kg {
    background: #18186f;
    color: #fff;
    width: 5%;
    text-align: center;
  }

  .th_merchandise_fraction {
    background: #18186f;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .th_merchandise_ped {
    background: #18186f;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .tr_merchandise {
    text-align: center;
  }

  .content_packaging {
    /* width: 100%; */
    padding: 20px;
    /* margin-top: 20px; */
  }

  .div_packaging_left {
    float: left;

    width: 30%;
    text-align: center;
  }

  .div_packaging_right {
    float: right;
    width: 70%;
  }

  .packaging_right_text {
    font-size: 9px;
    font-weight: bold;
  }

  strong {
    margin-left: 30px;
    font-weight: 500;
  }

  .packaging_left_text {
    font-size: 9px;
    font-weight: 600;
  }

  .comprobant_title_text {
    font-weight: 500;
  }

  .container_Senders_recipients_title {
    width: 100%;
    text-align: center;
  }

  .title_Senders_recipients {
    font-size: 9px;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 5px;
  }

  .table_Senders_recipients {
    width: 100%;
    border-spacing: 0px;
  }

  .thead_Senders_recipients {
  }

  .th_Senders_recipients_cant {
    width: 20%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_Senders_recipients_unity {
    width: 20%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_Senders_recipients_desc {
    width: 20%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_Senders_recipients_unit {
    width: 20%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .th_Senders_recipients_imp {
    width: 20%;
    background: #18186f;
    color: #fff;
    text-align: center;
  }

  .tr_Senders_recipients {
    text-align: center;
    font-size: 8px;
  }

  .container_import {
    width: 100%;
  }

  .div_import_left {
    font-size: 9px;
    padding: 20px;
    width: 40%;
    float: left;
  }

  .div_import_right {
    padding: 10px;
    width: 60%;
    float: right;
  }

  .import_right_l {
    float: left;
  }

  .import_right_r {
    float: right;
  }

  .container_r_l {
    font-size: 9px;
    float: left;
    width: 100%;
    border-top: 1.5px solid black;
  }

  p {
    font-weight: bold;
  }

  .container_qr_des {
    width: 100%;
    padding: 10px;
    float: left;
  }

  .qr {
    text-align: center;
    float: left;
    width: 20%;
  }

  .img {
    width: 100px;
    height: 100px;
    margin: auto;
  }

  .des {
    float: right;
    width: 70%;
  }

  .tbody_des {
    width: 100%;
  }

  .th_des {
    font-size: 8px;
    text-align: center;
    background: #18186f;
    color: white;
  }

  .td_des {
    width: 120px;
    font-size: 4px;
  }

  .table_des {
    float: left;
    text-align: justify;
    /* width: 100%; */
  }
`;
