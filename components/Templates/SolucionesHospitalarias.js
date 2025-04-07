import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function SolucionesHospitalarias(props) {
  const { zoom, data, emailUpdate, totalIVA } = props;
  const { prospect, products, footer, total, ejecutive, quoteInfo, discount, subtotal, company, observations, iva } =
    data;
  const { userData } = useSelector(userSelector);
  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container_template">
        <div className="box">
          <div className="art_cabezera">
            <div className="logo">
              <img
                className="img_log"
                src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/E62dAxhxdX84p2camHNVOOu7d/YGrmd_shpng.png"
              />
              <img
                className="bg_img"
                src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/E62dAxhxdX84p2camHNVOOu7d/HKmMH_bgshpng.png"
              />
            </div>
            <div className="cot_art">
              <div className="art_cot">COTIZACIÓN</div>
              <div className="num_cot">
                <span className="text_date">FECHA:</span>
                <span className="va_texts">{data.quoteInfo.date}</span>
              </div>
              <div className="art_cot sub"></div>
              <div className="num_cot">
                <span className="text_date">DE COTIZACIÓN:</span>
                <span className="va_texts">{data.quoteInfo.folio}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cli_art">
          <div className="client_art">
            <div className="text_client">CLIENTE:</div>
            <div className="descrip_client">
              <h5 className="name_client">
                {prospect.name} {prospect.lastname}
              </h5>
              <p className="text_data">{prospect.email ? prospect.email : "N/A"}</p>
              <p className="text_data">{prospect.phone ? prospect.phone : "N/A"}</p>
            </div>
          </div>
          <div className="client_art">
            <div className="text_client">EJECUTIVO:</div>
            <div className="descrip_client">
              <h5 className="name_client">
                {ejecutive.name} {ejecutive.lastname}
              </h5>
              <p className="text_data">{ejecutive.email ? ejecutive.email : "N/A"}</p>
              <p className="text_data">{ejecutive.phone ? ejecutive.phone : "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="prod_art">
          <div className="art_med">PRODUCTOS</div>
          <div className="tabs_products">
            <table className="products">
              <thead className="products__head">
                <tr className="products__headrow">
                  <td scope="col">ID</td>
                  <td scope="col">CANTIDAD</td>
                  <td scope="col">MARCA</td>
                  <td scope="col">DESCRIPCIÓN</td>
                  <td scope="col">P.UNITARIO</td>
                  <td scope="col">IVA</td>
                  <td scope="col">SUBTOTAL</td>
                </tr>
              </thead>

              <tbody className="products__body">
                {/* ${itemsProducts} */}
                {products.map((item, index) => {
                  return (
                    <tr className="item last" key={index}>
                      <td>{item.code}</td>
                      <td>{item.quantity}</td>
                      <td>{item.brand.name}</td>
                      <td>{item.name}</td>
                      <td className="price">${item.callamount.toFixed(2)}</td>
                      <td className="price">${item.iva.toFixed(2)}</td>
                      <td scope="col">${item.total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <table className="div_totals">   
            <tr>
              <td className="title_subtotal">SUBTOTAL:</td>
              <td className="subtitle_subtotal">{subtotal}</td>
            </tr>
            <tr>
              <td className="title_subtotal">IVA:</td>
              <td className="subtitle_subtotal">{iva}</td>
            </tr>
            <tr>
              <td className="title_total">TOTAL:</td>
              <td className="subtitle_total">{total}</td>
            </tr>
          </table>
        </div>
        <div className="obser_art">
          <div className="title_bank_data">Observaciones generales</div>
          <p className="obs">{observations}</p>
        </div>
        <div id="pageFooter" className="footer">
          *Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado
          el pedido no se aceptan cambios o devoluciones, *En caso de cancelación solicitarse por escrito y enviarse por
          correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30
          días hábiles posteriores a la cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es
          indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando el
          equipo sea enviado por paquetería, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en
          perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la compra al tipo de cambio de BBVA
          BANCOMER a la venta. Los números de guía se darán después del tercer dia.
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  //overflow: scroll;
  body {
    margin: 0;
  }
  .footer {
    text-align: justify;
    font-size: 8px;
    color: #000;
    line-height: 1em;
  }
  #pageFooter {
    margin-top: 10px;
    font-size: 8px;
    color: #000;
    width: 100%;
    float: left;
  }

  @page {
    size: A4;
    margin: 0;
  }

  .container_template {
    max-width: 800px;
    margin: auto;
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    font-size: 12px;
    line-height: 14px;
    font-family: "Calibri", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    height: 760px;
    position: relative;
  }
  .bg_img {
    opacity: 0.2;
    position: absolute;
    height: 100px;
    top: 325px;
    left: 210px;
  }
  .box {
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 0;
    display: inline-block;
    background: #ededed;
  }
  .art_cabezera {
    background: #ededed;
    width: 99%;
  }
  .logo {
    width: 100%;
    float: center;
  }
  .img_log {
    width: 100%;
    margin-bottom: -70px;
    margin-top: -20px;
  }
  .desc_art {
    float: right;
    width: 48%;
  }
  span.text_art {
    color: #03aed2;
    line-height: 2.5em;
    font-size: 6pt;
    font-weight: 900;
  }
  .cot_art {
    width: 100%;
    float: left;
    line-height: 1.5em;
  }
  .art_cot {
    color: #000;
    width: 50%;
    text-align: left;
    font-size: 40px;
    font-weight: bold;
    padding: 5px;
    float: left;
  }
  .sub {
    margin-top: 12px;
    height: 17px;
    background-color: #03aed2;
  }
  .num_cot {
    width: 47%;
    float: left;
  }
  .text_cot {
    float: left;
    width: 28%;
    font-size: 6.5pt;
    color: #686867;
    padding: 5px;
    text-align: center;
    font-weight: bold;
  }
  .va_art {
    float: left;
    width: 20%;
    font-size: 7pt;
    color: #03aed2;
    padding: 5px;
    text-align: center;
    font-weight: 900;
  }
  .text_date {
    font-family: "Lucida Console";
    background-color: #000;
    color: #fff;
    float: left;
    width: 50%;
    font-size: 9pt;
    padding: 5px;
    text-align: right;
    font-weight: 700;
    margin: 1px;
  }
  .va_texts {
    font-size: 10pt;
    float: right;
    color: #000;
    padding-top: 6px;
    font-weight: 100;
  }
  .cli_art {
    width: 100%;
    margin-top: 15px;
  }
  .client_art {
    width: 40%;
    float: left;
    margin-left: 5%;
    height: 85px;
  }
  .name_client {
    color: black;
    font-size: 14px;
  }
  .text_client {
    font-family: "Lucida Console";
    width: 50%;
    color: #000;
    margin-top: -10px;
    font-size: 14px;
    text-align: left;
    font-weight: 900;
  }
  .descrip_client {
    font-size: 4.5pt;
    line-height: 2.5em;
  }
  .art_med {
    font-family: "Lucida Console";
    text-align: center;
    font-size: 14px;
    background-color: #000;
    color: #fff;
    margin: 1px;
  }
  .text_data {
    margin: 0;
    font-size: 14px;
    color: #000;
  }

  .prod_art {
    margin-top: 2%;
    width: 100%;
    float: left;
  }

  .tabs_products {
  }
  table.products {
    border-spacing: 0;
    width: 100%;
    border-spacing: 1px;
  }
  thead.products__head {
    background: #1f6d92;
    color: white;
    font-size: 12px;
  }
  .products__headrow {
    text-align: center;
    font-size: 11px;
    font-weight: 100;
  }
  table.products tbody tr:nth-child(odd) {
    background: #d6e5ec;
  }
  table.products tbody tr:nth-child(even) {
    background: #2f99cc;
  }
  .last {
    font-size: 10px;
    //line-height: 1.9em;
    color: #000;
  }
  .price {
    font-weight: bold;
    color: black;
    text-align: center;
  }
  .bold {
    color: #000;
    font-weight: 900;
    font-size: 10px;
  }
  .total {
    color: #fff;
    background-color: #000;
    font-weight: 500;
    font-size: 12px;
    text-align: right;
  }
  .obser_art {
    width: 60%;
    background: #ededed;
    float: right;
    margin-top: 3%;
    font-size: 7pt;
    padding-right: 5px;
    padding-left: 5px;
    margin-right: 10px;
    margin-left: 60%;
    text-align: justify;
  }
  .text_observa {
    background: #03aed2;
    width: 50%;
    padding: 5px;
    color: white;
    margin-top: -10px;
    font-weight: bold;
    font-size: 7px;
  }
  .formal {
    font-size: 5pt;
    line-height: 1.5em;
    color: #474645;
    width: 100%;
    text-align: justify;
  }
  table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .div_totals {
    margin-top: 40px;
    margin-bottom: 2px;
    line-height: 1.4em;
  }
  .first_div {
    display: flex;
  }
  .second_div {
    display: flex;
  }
  .title_subtotal {
    font-family: "Lucida Console";
    color: #000;
    font-size: 10px;
    font-weight: 900;
    text-align: right;
    width: 80px;
  }
  .subtitle_subtotal {
    font-family: "Lucida Console";
    font-size: 10px;
    margin-left: 3px;
    font-weight: bold;
    background-color: #d6e5ec;
    color: #000;
    padding: 0px 10px;
  }
  .title_total {
    font-family: "Lucida Console";
    height: fit-content;
    padding-left: 40px;
    font-size: 10px;
    font-weight: 900;
    background-color: #000;
    color: #fff;
  }
  .subtitle_total {
    font-family: "Lucida Console";
    background-color: #d6e5ec;
    font-size: 10px;
    margin-left: 3px;
    font-weight: bold;
    padding: 0px 10px;
    color: #000;
  }
  .title_bank_data {
    background: #000;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
`;
