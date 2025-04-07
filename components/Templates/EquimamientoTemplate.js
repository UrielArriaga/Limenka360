import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function EquimamientoTemplate(props) {
  const { zoom, data, emailUpdate, totalIVA } = props;
  const { prospect, products, footer, total, ejecutive, discount, subtotal, quoteInfo, company, observations } = data;
  const { userData } = useSelector(userSelector);

  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container_template">
        <div className="box">
          <div className="art_cabezera">
            <div className="logo">
              <img
                src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/EQUIPAMIENTO-HOSPITALARIO_LOGO.png"
                className="img_log"
              />
            </div>
            <div className="cot_art">
              <div className="art_cot">Cotización</div>
              <div className="num_cot">
                <span className="text_cot">Nº de Cotización:</span>
                <span className="va_art">{quoteInfo.folio}</span>
                <span className="text_date">Fecha:</span>
                <span className="va_texts">{quoteInfo.date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cli_art">
          <div className="client_art">
            <div className="text_client">Cliente</div>
            <div className="descrip_client">
              <h5 className="name_client">
                {prospect.name} {prospect.lastname}
              </h5>
              <p className="text_data">{prospect.phone}</p>
              <p className="text_data">{prospect.email}</p>
              <p className="text_data">Vigencia de 1 día.</p>
            </div>
          </div>
          <div className="client_art">
            <div className="text_client">Ejecutivo</div>
            <div className="descrip_client">
              <h5 className="name_client">
                {ejecutive.name} {ejecutive.lastname}
              </h5>
              <p className="text_data">{emailUpdate}</p>
              <p className="text_data">{ejecutive.phone}</p>
            </div>
          </div>
        </div>
        <div className="prod_art">
          <div className="art_med">PRODUCTOS</div>
          <div className="tabs_products">
            <table className="products">
              <thead className="products__head">
                <tr className="products__headrow">
                  <th scope="col">Codigo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Producto</th>
                  <th scope="col">P.Unitario</th>
                  <th scope="col">Iva</th>
                  <th scope="col">SubTotal</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>

              <tbody className="products__body">
                {products.map((item, index) => {
                  return (
                    <tr className="item last" key={index}>
                      <td>{item.code}</td>
                      <td>{item.quantity}</td>
                      <td>{item.brand.name}</td>
                      <td>{item.name}</td>
                      <td className="price">${item.callamount.toFixed(2)}</td>
                      <td className="price">${item.iva.toFixed(2)}</td>
                      <td className="price">${item.total.toFixed(2)}</td>
                      <td> <p>{item.deliveryTime}</p>
                        <p>{item.info}</p>
                      </td>
                    </tr>
                  );
                })}

                <tr className="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bold">Descuento</td>
                  <td className="bold">{discount}</td>
                </tr>

                <tr className="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bold">Total</td>
                  <td className="bold">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="container_obsevations">
          <div className="obser_art">
            <div className="text_client">Observaciones</div>
            <p className="text_note">{observations}</p>
          </div>
        </div>
        <div id="pageFooter_last" className="footer">
          {" "}
          *Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado
          el pedido no se aceptan cambios o devoluciones, *En caso de cancelación solicitarse por escrito y enviarse por
          correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30
          días hábiles posteriores a la cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es
          indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando el
          equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en
          perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la compra al tipo de cambio de BBVA
          BANCOMER a la venta. Los números de guia se daran despues del tercer dia.
        </div>
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

  .container_template {
    max-width: 800px;
    margin: auto;
    border: 1px solid #eee;
    font-size: 12px;
    line-height: 14px;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    height: 100%;
    position: relative;

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
      width: 150px;
      float: left;
      margin-left: 3%;
      margin-top: 5px;
    }
    .img_log {
      width: 100%;
    }
    .desc_art {
      display: none;
    }
    .address {
      width: 5%;
      margin-right: 5px;
    }
    .cot_art {
      height: 0;
      border-bottom: 120px solid #0072c0;
      border-left: 90px solid transparent;
      width: 44%;
      float: right;
      margin-top: 0;
    }
    .art_cot {
      width: 100%;
      margin: 3% 0 7px 0;
      text-align: center;
      color: white;
      font-size: 14pt;
      font-weight: bold;
      padding: 5px;
      float: left;
    }
    .num_cot {
      width: 100%;
      float: left;
    }
    .text_cot {
      float: left;
      width: 32%;
      font-size: 8px;
      color: #ffffff;
      padding: 5px;
      text-align: center;
      font-weight: bold;
    }
    .va_art {
      float: left;
      width: 20%;
      font-size: 8px;
      color: #ffffff;
      padding: 5px;
      text-align: center;
      font-weight: 900;
    }
    .text_date {
      float: left;
      width: 15%;
      font-size: 8px;
      color: #ffffff;
      padding: 5px;
      text-align: center;
      font-weight: 900;
      border-left: 1px solid #c2c1c2;
    }
    .va_texts {
      font-size: 8px;
      float: left;
      color: #ffffff;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
      margin-top: 40px;
      float: left;
    }
    .client_art {
      width: 40%;
      float: left;
      margin-left: 5%;
      background: #ededed;
      border-radius: 10px;
      margin-top: 15px;
      height: 100px;
    }
    .text_client {
      background: #0072c0;
      width: 50%;
      padding: 5px;
      color: white;
      margin-top: -10px;
      font-size: 9px;
      text-align: center;
      font-weight: bold;
    }
    .name_client {
      font-size: 8px;
      font-weight: 900;
      line-height: 10px;
      margin: 0;
    }
    .text_data {
      font-size: 8px;
      font-weight: bold;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1em;
    }
    .art_med {
      width: 100%;
      text-align: center;
      font-size: 9pt;
      margin-top: 10px;
      color: #1c9adc;
      font-weight: bold;
    }
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }
    .tabs_products {
      padding: 10px;
    }
    .products {
      border-spacing: 0;
      width: 100%;
    }
    .products__head {
      background: #3d3d3d;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
    }
    table tbody tr:nth-child(odd) {
      background: #f9f9f9;
    }
    table tbody tr:nth-child(even) {
      background: #ececec;
    }
    .bold {
      font-size: 9px;
      color: #000;
      font-weight: bold;
    }
    .last {
      font-size: 8px;
      line-height: 2em;
      color: #000;
    }
    .price {
      font-weight: bold;
      color: black;
      text-align: center;
    }
    .container_obsevations {
      float: left;
      width: 100%;
      margin-bottom: 5%;
    }
    .obser_art {
      width: 60%;
      background: #ededed;
      float: left;
      margin-top: 3%;
      font-size: 7pt;
      padding-left: 5px;
      margin-left: 10px;
      text-align: justify;
    }
    .text_observa {
      background: #03aed2;
      width: 50%;
      padding: 5px;
      color: white;
      margin-top: -10px;
      font-weight: bold;
      font-size: 7pt;
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
  }
`;
