import React from "react";
import { userSelector } from "../../redux/slices/userSlice";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function CartPortTemplateNew(props) {
  const { data } = props;
  // const converter = num => {
  //   return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // };
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
                <p className="date_folio_text">RFC: {data?.client?.rfc}</p>
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
                    <p className="date_subtitle">-----</p>
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
          <div className="content_title_mercan">
            <p className="title_mercan">SERVICIOS</p>
          </div>
        </section>
        <section className="sections_services">
          <table className="table_merchandise">
            <thead className="thead_merchandise">
              <tr className="tr_merchandise">
                <th className="th_merchandise_cant">Cantidad</th>
                <th className="th_merchandise_unity">Unidad</th>
                <th className="th_merchandise_desc">Descripción</th>
                <th className="th_merchandise_unit">Valor Unitario</th>
                <th className="th_merchandise_imp">Impuestos</th>
                <th className="th_merchandise_import">Importe</th>
              </tr>
            </thead>
            <tbody className="tbody_merchandise">
              {data?.products?.map((item, index) => {
                return (
                  <tr className="tr_merchandise" key={index}>
                    <td className="td_merchandise">{item?.productcan}</td>
                    <td className="td_merchandise">{item?.articleunidad}</td>
                    <td className="td_merchandise">{item?.name}</td>
                    <td className="td_merchandise">-</td>
                    <td className="td_merchandise">-</td>
                    <td className="td_merchandise">-</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section className="sections">
          <div className="container_import">
            <div className="div_import_left">
              <p>
                Importe con letra:
                <strong className="str">cero Pesos 00/100 M.N.</strong>
              </p>
            </div>
            <div className="div_import_right">
              <div className="container_r_l">
                <div className="import_right_l">
                  <p>Subtotal</p>
                  <p>I.V.A.</p>
                  <p>Ret I.V.A.</p>
                  <p>Descuento.</p>
                </div>
                <div className="import_right_r">
                {/* <p>${converter(data?.sub)}</p> */}
                  <p>$0.00</p>
                  <p>16%</p>
                  <p>$0.00</p>
                  <p>$0.00</p>
                </div>
              </div>
              <div className="container_r_l">
                <div className="import_right_l">
                  <p>Total</p>
                </div>
                <div className="import_right_r">
                  <p>$0.00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="container_qr_des">
            <div className="qr">
              <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/common/qr.jpg" className="img" />
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
                    <th className="th_des">Sello Digital del CFDI</th>
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

        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">CARTA PORTE - AUTOTRANSPORTE</p>
          </div>
          <div className="sections_qr">
            <div className="qr">
              <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/common/qr.jpg" className="img" />
            </div>
            <div className="info_qr">
              <p className="info_text_qr_black">ID: CCC5a96f-52aa-4811-b6bc-817a1c488cd2</p>
              <p className="info_text_qr_black">Versión: 3.1</p>
              <p className="info_text_qr">Total de distancia recorrida: 755.8km</p>
              <p className="info_text_qr">Transporte internacional: No</p>
            </div>
          </div>
        </section>

        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">DETALLE ISTMO</p>
          </div>
          <div className="sections_titles">
            <p className="info_text_qr_black">Registro Istmo</p>
            <p className="info_text_qr">No</p>
          </div>
        </section>

        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">REGÍMENES ADUANEROS</p>
          </div>
          <div className="sections_titles">
            <div className="title_regimen">
              <p className="info_text_qr_black">Clave</p>
            </div>
            <div className="title_description_regimen">
              <p className="info_text_qr_black">Descripción</p>
            </div>
          </div>
        </section>

        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">DATOS DEL COMPROBANTE</p>
          </div>
          <div className="sections_titles">
            <table>
              <thead>
                <tr>
                  <th>Tipó Ubicación</th>
                  <th>RFC</th>
                  <th>Nombre</th>
                  <th>Tax Id</th>
                  <th>Residencia Fiscal</th>
                  <th>Fecha Salida/Llegada</th>
                  <th>Distancia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01 - Autotransporte</td>
                  <td>No</td>
                  <td>Autotransporte (Terrestre)</td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>NA</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Direcciones:</th>
                  <th>Núm Ext. Núm Int.</th>
                  <th>Colonia</th>
                  <th>Localidad</th>
                  <th>Referencia</th>
                  <th>Municipio</th>
                  <th>Estado</th>
                  <th>País</th>
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
          </div>
        </section>
        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">MERCANCIAS</p>
          </div>
          <div className="sections_titles">
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Peso Bruto total: <span className="info_text">16</span>
              </p>
            </div>
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Unidad de peso :<span className="info_text">KGM</span>
              </p>
            </div>
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Peso neto total: <span className="info_text">2000</span>
              </p>
            </div>
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Número total de mercancías: <span className="info_text">{data?.products?.length}</span>
              </p>
            </div>
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Logística inversa: <span className="info_text">No</span>
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Unidad</th>
                  <th>Producto</th>
                  <th>Material Peligroso</th>
                  <th>Clave Embalaje</th>
                  <th>Referencia</th>
                  <th>Peso</th>
                  <th>Fraccion Arancelaria</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.articleCant}</td>
                      <td>{item?.articleunidad}</td>
                      <td>{item?.articledescripcion}</td>
                      <td>-</td>
                      <td>
                        {item?.high} x {item?.long} x {item?.broad}
                      </td>
                      <td>{item?.weight}</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Material Peligroso: <span className="info_text">-</span>
              </p>
              <p className="info_text_qr_black">
                Embalaje: <span className="info_text">-</span>
              </p>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">DOCUMENTACIÓN ADUANERA</p>
          </div>
          <div className="sections_titles">
            <table>
              <thead>
                <tr>
                  <th>Tipo de Documento</th>
                  <th>Número de Pedimento</th>
                  <th>Indentificador Documento Aduanero</th>
                  <th>RFC Importador</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">GUíAS DE IDENTIFICACIÓN</p>
          </div>
          <div className="sections_titles">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Descripción</th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">CANTIDAD TRANSPORTADA</p>
          </div>
          <div className="sections_titles">
            <table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>ID Origen</th>
                  <th>ID Destino</th>
                  <th>Transporte</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1.00</td>
                  <td>OR000001</td>
                  <td>DE000001</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>1.00</td>
                  <td>OR000001</td>
                  <td>DE000001</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">MEDIO DE TRANSPORTE</p>
          </div>
          <div className="sections_titles">
            <div className="content_titles_mercan_trasport">
              <p className="info_text_qr_black">
                Tipo de Autotrasporte: <span className="info_text">VL - VL</span>
              </p>
              <p className="info_text_qr_black">
                Permiso SCT:
                <span className="info_text">TPAF02 - Transporte privado de carga.</span>
              </p>
            </div>
            <div className="content_titles_mercan_trasport_complete">
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Número de Permiso: <span className="info_text">{data?.transport?.Numpermision}</span>
                </p>
              </div>
              <div className="content_titles_mercan_trasport">
                <p className="info_text_qr_black">
                  Placa: <span className="info_text">{data?.transport?.placa}</span>
                </p>
              </div>
              <div className="content_titles_mercan_trasport">
                <p className="info_text_qr_black">
                  Año: <span className="info_text">{data?.transport?.age}</span>
                </p>
              </div>
              <div className="content_titles_mercan_trasport">
                <p className="info_text_qr_black">
                  Peso bruto vehicular: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan_trasport">
                <p className="info_text_qr_black">
                  Aseguradora resp. civil: <span className="info_text">QUALITAS</span>
                </p>
              </div>
            </div>
            <div className="content_titles_mercan_trasport_complete">
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Aseguradora med. amb: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Poliza resp. civil, Poliza med. amb: <span className="info_text">{data?.transport?.poliza}</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Año: <span className="info_text">2024</span>
                </p>
              </div>
            </div>
            <div className="content_titles_mercan_trasport_complete">
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Aseguradora carga: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Póliza carga: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Prima seguro: <span className="info_text">-</span>
                </p>
              </div>
            </div>
            <div className="content_titles_mercan_trasport_complete">
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Remolque: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Placa: <span className="info_text">-</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sections">
          <div className="content_date_comprobant_title">
            <p className="comprobant_title_text">FIGURAS DE TRANSPORTE</p>
          </div>
          <div className="sections_titles">
            <div className="sections_titles">
              <table>
                <thead>
                  <tr>
                    <th>Tipo de figura:</th>
                    <th>Rfc</th>
                    <th>Nombre</th>
                    <th>Licencia</th>
                    <th>Tax id</th>
                    <th>Residencia Fiscal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>-</td>
                    <td>CUCR930831P33</td>
                    <td>{data?.transport?.nametrasport}</td>
                    <td>{data?.transport?.poliza}</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="content_titles_mercan_trasport_complete">
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Direcciones: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Núm Ext.Núm Int.ColoniaLocalidadReferencia : <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Municipio EstadoPaís: <span className="info_text">-</span>
                </p>
              </div>
              <div className="content_titles_mercan">
                <p className="info_text_qr_black">
                  Código Postal: <span className="info_text">-</span>
                </p>
              </div>
            </div>
            <div className="content_titles_mercan">
              <p className="info_text_qr_black">
                Parte Trasporte: <span className="info_text">-</span>
              </p>
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
    width: 90%;
    margin: auto;
    padding: 10px;
    background: #fff;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    font-size: 8px;
  }

  .p_div_subtitle {
    font-size: 7px;
    font-weight: 500;
  }

  .content_div_cart_port {
    float: right;
    width: 30%;
  }

  .content_type_document {
    border: 1px solid black;
    margin: auto;
    background: #005151;
    font-size: 7px;
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
    border: 1px solid black;
  }

  .title_date_text {
    font-size: 7px;
    font-weight: 600;
  }

  .subtitle_date_text {
    font-size: 7px;
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
    font-size: 7px;
  }

  .date_folio_left_title {
    width: 100%;
    text-align: center;
    background: #005151;
  }

  .left_title_client {
    color: #fff;
    font-weight: 500;
    font-size: 8px;
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
    font-size: 8px;
    font-weight: 600;
  }

  .folio_right_subtitle {
    font-size: 7px;
    font-size: 500;
  }

  .date_comprobant {
    border-top: 1.5px solid black;
    background-color: rgb(31, 235, 235);
  }

  .content_date_comprobant_title {
    text-align: center;
    background: #005151;
  }

  .comprobant_title_text {
    font-size: 8px;
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
    font-size: 7px;
    font-weight: bold;
  }

  .date_subtitle {
    font-size: 7px;
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
    width: 100%;
    /* padding-top: 3px; */
    /* background-color: pink; */
  }

  table {
    width: 100%;
  }

  th {
    /* width: 20%; */
    text-align: left;
    font-weight: 700;
    font-size: 7px;
  }

  td {
    text-align: left;
    font-size: 7px;
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
    border: black;
    /* border: 1px solid black; */
  }

  .thead_merchandise {
    border: 2px solid black;
  }

  .table_merchandise {
    /* border: 1px solid blue; */
    border-spacing: 0px;
    color: grey;
    /* border: grey; */
  }

  .th_merchandise_cant {
    width: 10%;
    background: #005151;
    color: #fff;
    text-align: center;
    border: 1px solid grey;
  }

  .th_merchandise_unity {
    width: 10%;
    background: #005151;
    color: #fff;
    text-align: center;
    border: 1px solid grey;
  }

  .th_merchandise_desc {
    width: 30%;
    background: #005151;
    color: #fff;
    text-align: center;
    border: 1px solid grey;
  }

  .th_merchandise_unit {
    width: 10%;
    background: #005151;
    color: #fff;
    text-align: center;
    border: 1px solid grey;
  }

  .th_merchandise_imp {
    width: 10%;
    background: #005151;
    color: #fff;
    text-align: center;
    border: 1px solid grey;
  }

  .th_merchandise_import {
    width: 10%;
    background: #005151;
    color: #fff;
    text-align: center;
    border: 1px solid grey;
  }

  .th_merchandise_type {
    background: #005151;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .th_merchandise_em {
    background: #005151;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .th_merchandise_kg {
    background: #005151;
    color: #fff;
    width: 5%;
    text-align: center;
  }

  .th_merchandise_fraction {
    background: #005151;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .th_merchandise_ped {
    background: #005151;
    color: #fff;
    width: 10%;
    text-align: center;
  }

  .tr_merchandise {
    border: 1px solid grey;
    text-align: center;
  }

  .td_merchandise {
    border: 1px solid grey;
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
    font-size: 7px;
    font-weight: bold;
  }

  strong {
    margin-left: 30px;
    font-weight: 500;
  }

  .packaging_left_text {
    font-size: 7px;
    font-weight: 600;
  }

  .comprobant_title_text {
    font-weight: 500;
  }

  .table_Senders_recipients {
    width: 100%;
    border-spacing: 0px;
  }

  .container_import {
    width: 100%;
  }

  .div_import_left {
    font-size: 7px;
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
    font-size: 7px;
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
    font-size: 6px;
    text-align: center;
    background: #005151;
    color: white;
  }

  .td_des {
    width: 120px;
    font-size: 4px;
  }

  .str {
    margin-left: 1px;
  }

  .table_des {
    float: left;
    /* text-align: justify; */
    /* width: 100%; */
  }

  .sections_qr {
    /* width: 100%; */
    padding: 10px;
  }

  .info_qr {
    float: right;
    width: 70%;
  }

  .info_text_qr_black {
    font-size: 7px;
    font-weight: 800;
  }

  .info_text_qr {
    font-size: 8px;
    font-weight: 600;
  }

  .sections_titles {
    padding: 10px;
    float: left;
    width: 100%;
  }

  .title_regimen {
    float: left;
    width: 20%;
  }

  .title_description_regimen {
    width: 40%;
    float: left;
  }

  .content_titles_mercan {
    width: 25%;
    float: left;
  }

  .info_text {
    font-weight: 500;
  }

  .content_titles_mercan_trasport {
    /* padding: 10px; */
    width: 50%;
    float: left;
  }

  .content_titles_mercan_trasport_complete {
    width: 100%;
    float: left;
  }
  // .sections_services{
  //   margin-bottom: 350px;
  // }
`;
