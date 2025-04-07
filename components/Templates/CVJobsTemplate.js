import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function CVJobsTemplate(props) {
  const { zoom, data, emailUpdate, totalIVA } = props;
  const { prospect, products, footer, total, ejecutive, quoteInfo, discount, subtotal, company, observations, iva } =
    data;
  const { userData } = useSelector(userSelector);
  useEffect(() => {
    console.log("Objeto de productos:", products);
  }, []);
  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container_template">
        <div className="logo">
          <img
            src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/EFhvunyzusL6X2RDfNUcvNjJy/Iqybf_cvjobspng.png"
            className="img_log"
          />
          <p className="direction">Av. Paseo de la Reforma #250 cp 06600, Juarez, Cuahutemoc</p>
          <div className="art_cot">Cotización</div>
          <div className="num_cot">
            <p className="text_data1 c_gray">Folio:</p>
            <p className="text_data2 c_gray">{quoteInfo.folio}</p>
            <p className="text_data1 c_gray">Fecha:</p>
            <p className="text_data2 c_gray">{quoteInfo.date}</p>
            <p className="text_data1 c_gray">Vigencia</p>
            <p className="text_data2 c_gray">10 días</p>
          </div>
        </div>
        <div className="cli_art">
          <div className="client_art">
            <div className="title_business">Empresa</div>
            <div className="descrip_client">
              <p className="text_data1">Nombre de la empresa:</p>
              <p className="text_data2">{data.clientcompany.companyname ? data.clientcompany.companyname : "-"}</p>
              <p className="text_data1">RFC:</p>
              <p className="text_data2">{data.clientcompany.rfc ? data.clientcompany.rfc : "-"}</p>
              <p className="text_data1">Contacto:</p>
              <p className="text_data2 link">
                {prospect.name} {prospect.lastname}
              </p>
              <p className="text_data1">Correo:</p>
              <p className="text_data2 link c_light_blue">{prospect.email}</p>
              <p className="text_data1">Teléfono:</p>
              <p className="text_data2 link">Pendiente</p>
            </div>
          </div>
          <div className="client_art_executive">
            <div className="title_executive">Ejecutivo</div>
            <div className="descrip_client">
              <p className="text_data1">Nombre del Ejecutivo:</p>
              <p className="text_data2">
                {ejecutive.name} {ejecutive.lastname}
              </p>
              <p className="text_data1">Teléfono:</p>
              <p className="text_data2">{ejecutive.phone}</p>
              <p className="text_data1">Email:</p>
              <p className="text_data2 link c_light_blue">{ejecutive.email}</p>
              <p className="text_data1">Página:</p>
              <p className="text_data2 link c_link_blue">http://www.cvjobs.com/</p>
            </div>
          </div>
        </div>
        <div className="prod_art">
          <div className="art_med">SERVICIO</div>
          <div className="tabs_products">
            <table className="products">
              <thead className="products__head">
                <tr className="products__headrow">
                  <th scope="col">Paquete</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Descripción de Paquete</th>
                  <th scope="col">P.Unitario</th>
                  <th scope="col">Importe total</th>
                  <th scope="col">Moneda</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>
              <tbody className="products__body">
                {products.map((item, index) => {
                  return (
                    <tr key={index} className="item last">
                      <td className="bgc_ligt_blue bold">{item.code}</td>
                      <td className="bgc_ligt_white bold">{item.quantity}</td>
                      <td className="bgc_ligt_blue bold">
                        <p>{item.name}</p>
                        <p className="color_description">{item.description}</p>
                      </td>
                      <td className="bgc_ligt_white price">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                          item.callamount.toFixed(2)
                        )}
                      </td>
                      <td className="price bgc_ligt_blue">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}
                      </td>
                      <td className="bgc_ligt_white bold">MXN</td>
                      <td className="bgc_ligt_blue bold">     <p>{item.deliveryTime}</p>
                      <p>{item.info}</p></td>
                    </tr>
                  );
                })}
                <tr className="row_pink">
                  <td colspan="7"></td>
                </tr>
                <tr className="row_blue">
                <td colspan="7">
                      <p class="title_observations">*OBSERVACIONES</p>
                      <p class="txt_observations">{observations}</p>
                  </td>
                </tr>
                <tr className="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bold txt_right">Subtotal:</td>
                  <td className="bold">{subtotal}</td>
                </tr>
                <tr className="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bold txt_right">Iva:</td>
                  <td className="bold">{iva}</td>
                </tr>
                <tr className="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bold bgc_blue txt_right">Total:</td>
                  <td className="bold">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="obser_art">
          <div className="title_bank_data">Observaciones generales</div>
          <p>{observations}</p>
        </div> */}
        <div className="obser_art">
          <div className="title_bank_data">Datos Bancarios para transferencia</div>
          <p className="text__bank_data">Banco:</p>
          <p className="text__bank_data">BBVA</p>
          <p className="text__bank_data">Cuenta:</p>
          <p className="text__bank_data">0118532834</p>
          <p className="text__bank_data">Clabe:</p>
          <p className="text__bank_data">012180001185328349</p>
        </div>
        <div id="pageFooter" className="footer">
          * Condiciones de pago de nuestros servicios
          <br />
          La cuenta bancaria esta a nombre de la razón social CV JOBS SA DE CV Método de pago:
          <br />
          1. Por transferencia electronica de fondos <br />
          2. Deposito en ventanilla
          <br />
          3. TARJETA DE CREDITO (Botón de pago) <br />
          Nota: La cuenta bancaria esta a nombre de la razon social de la compañía.(Verificar en su banca) Favor de
          notificar datos de facturacion a su ejecutivo, asi como enviar su comprobante de pago para validacion de
          contabilidad. La activacion puede tomar de 4 a 24 hrs segun el método de pago
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  margin: 0;

  body {
          margin: 0;
        }
  
        .footer {
          padding: 5px;
          font-size: 8px;
          color: #000;
          width: 100%;
          float: left;
          line-height: 1em;
        }

        .product_note{
          text-align: center;
        }
  
        @page {
          size: A4;
          margin: 0;
        }
  
        .text_center {
          text-align: center;
        }

        .bg_grey{
          background-color: #DCE1F6;
        }

        .bg_white{
          background-color: #fff;
        }
  
        .container_template {
          max-width: 800px;
          margin: auto;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 12px;
          line-height: 14px;
          font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
          color: #555;
          height: 760px;
          position: relative;
  
          background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/EFhvunyzusL6X2RDfNUcvNjJy/Dao99_fondocvjobspng.png"),
            url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/EFhvunyzusL6X2RDfNUcvNjJy/AANei_cotizador-elementos-03png.png");
          background-size: 550px, 700px;
          background-position-x: -140px, 50px;
          background-position-y: -180px, 0px;
          background-repeat: no-repeat, no-repeat;
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
          width: 100%;
        }
  
        .logo {
          width: 100%;
        }
  
        .img_log {
          width: 290px;
          margin-top: 5px;
          margin-left: 14px;
        }
        .direction {
          margin-left: 4px;
          margin-top: -7px;
          color: #fff;
          font-size: 7pt;
        }
        .img_background {
          position: absolute;
          height: 200px;
          width: 200px;
        }
        .desc_art {
          float: right;
          width: 48%;
        }
        span.text_art {
          color: #0097ce;
          line-height: 2.5em;
          font-size: 6pt;
          font-weight: 900;
        }
        .cot_art {
          width: 100%;
          float: left;
        }
        .art_cot {
          width: 25%;
          margin-left: 400px;
          margin-top: -40px;
          background: #0097ce;
          text-align: center;
          color: white;
          font-size: 22px;
          padding: 4px;
        }
        .num_cot {
          background-color: #fff;
          width: 208px;
          margin-left: 400px;
          font-size: 7.5pt;
          line-height: 1.5em;
        }
        .va_art {
          float: left;
          width: 20%;
          font-size: 7pt;
          color: #0097ce;
          padding: 5px;
          text-align: center;
          font-weight: 900;
        }
        .text_date {
          float: left;
          width: 15%;
          font-size: 7pt;
          color: #686867;
          padding: 5px;
          text-align: center;
          font-weight: 900;
          border-left: 1px solid #c2c1c2;
        }
        .va_texts {
          font-size: 7pt;
          float: left;
          color: #0097ce;
          padding-top: 5px;
          font-weight: 900;
        }
        .cli_art {
          width: 100%;
        }
        .client_art {
          width: 45%;
          float: left;
          height: 130px;
        }
        .name_client {
          margin: 0;
          font-weight: 900;
          color: black;
          font-size: 8px;
        }
        .text_client {
          width: 80%;
          padding: 5px;
          margin-top: 10px;
          font-size: 14px;
          text-align: right;
          font-weight: bold;
        }
        .descrip_client {
          font-size: 7.5pt;
          padding: 10px;
          line-height: 1.5em;
        }
        .art_med {
          width: 100%;
          height: 28px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          font-weight: bold;
          background-color: #081f2d;
          padding-top: 4px;
        }
        .text_data1 {
          width: 50%;
          margin: 0;
          font-weight: 800;
          color: black;
          font-size: 8px;
          float: left;
        }
        .text_data2 {
          width: 50%;
          margin: 0;
          font-weight: 800;
          color: black;
          font-size: 8px;
          float: left;
        }
        .prod_art {
          margin-top: 2%;
          padding-left: 2%;
          width: 95%;
          float: left;
        }
        table.products {
          border-spacing: 0;
          width: 100%;
        }
  
        thead.products__head {
          background: #0097ce;
          color: white;
          font-weight: bold;
          text-align: justify;
          font-size: 9px;
          text-align: center;
        }
        .last {
          font-size: 8px;
          line-height: 2em;
          color: #000;
          /* td{
            border-bottom: 1px solid  #fff;  
          } */
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
          padding: 0px;
        }
        .obser_art {
          width: 35%;
          background: #ededed;
          float: left;
          margin-top: 3%;
          font-size: 6pt;
          padding-left: 5px;
          margin-left: 10px;
          margin-right: 60%;
          text-align: justify;
        }
        .text_observa {
          background: #0097ce;
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
        .row_pink {
          background: #cf4793;
          height: 10px;
          width: 100%;
        }
        .row_blue {
          background: #0097ce;
          width: 100%;
          font-size: 6pt;
        }
        .title_bank_data {
          background: #0097ce;
          color: #fff;
          text-align: center;
          font-weight: bold;
        }
        .text__bank_data {
          float: left;
          width: 40%;
          font-size: 6.5pt;
          text-align: left;
          font-weight: bold;
          margin: 0px;
          font-weight: 800;
          color: #000;
        }
        .rowProducts {
          text-align: center;
          font-weight: 800;
          color: #000;
        }
        .highlightedField {
          background-color: #cfd8dc;
        }
        .c_gray {
          color: gray;
        }
        .c_light_blue {
          color: #93bfbf;
        }
        .c_link_blue {
          color: #266f9d;
        }
        .bgc_blue {
          background-color: #0097ce;
          color: white;
          width: 100px;
        }
        .bgc_ligt_blue {
          background-color: #d9d9d9;
        }
        .bgc_ligt_white {
          background-color: #fff;
        }
        .color_description {
          color: #808080;
          margin-top: -10px;
        }
        .title_business {
          color: white;
          width: 100%;
          margin-top: 10px;
          margin-left: 30px;
          font-size: 10px;
          text-align: center;
          font-weight: bold;
        }
        .title_executive {
          width: 80%;
          margin-top: 10px;
          margin-left: 50px;
          font-size: 10px;
          text-align: center;
          font-weight: bold;
        }
        .client_art_executive {
          width: 40%;
          float: left;
          height: 130px;
          margin-left: 16px;
        }
        .link {
          text-decoration: underline;
        }
        .bold {
          font-weight: bold;
          font-size: 6.4pt;
          text-align: center;
        }
        .txt_right {
          text-align: right;
        }
        .arrow {
          background: rgb(211, 216, 240);
          background: radial-gradient(
            circle,
            rgba(211, 216, 240, 1) 0%,
            rgba(110, 115, 134, 1) 100%
          );
          color: #fff;
          width: 15px;
          height: 15px;
          border-radius: 3px;
          display: inline-block;
          margin-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .txt_cot1 {
          width: 50%;
          margin: 0;
          font-size: 9px;
          float: left;
        }
        .txt_cot2 {
          width: 50%;
          margin: 0;
          font-size: 9px;
          float: left;
        }
        .title_observations{
          margin: 3px;
          font-weight: bold;
          color: #fff;
        }
        .txt_observations{
          color: #000;
          margin: 5px;
        }
        .row_div{
          height: 50px;
          width: 100%;
        }
  
`;
