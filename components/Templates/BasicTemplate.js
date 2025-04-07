import { Box } from "@material-ui/core";
import { Call } from "@material-ui/icons";
import { Mail } from "@material-ui/icons";
import { LocationOn } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";
import { URL_SPACE } from "../../services/api";
import { validateURL } from "../../utils";

export default function BasicTemplate(props) {
  const { zoom, data } = props;
  const { prospect, products, footer, total, ejecutive, quoteInfo, company, observations } = data;

  const { userData } = useSelector(userSelector);
  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container_template">
        <table className="header_pdf" id="pageHeader">
          <tr>
            <td className="header_pdf__logo">
              <img src={validateURL(company.photo)} />
            </td>
          </tr>
        </table>

        <div className="complete">
          <table className="header_infoquote">
            <thead className="header_infoquote__head">
              <tr className="header_infoquote__heado w">
                <th scope="col">Cotizacion</th>
                <th scope="col">
                  <p>N Cotizacion</p>
                </th>
                <th scope="col">
                  <p>{quoteInfo.folio}</p>
                </th>
                <th scope="col">Fecha</th>
                <th scope="col">{quoteInfo.date}</th>
              </tr>
            </thead>
          </table>
        </div>

        <table className="contact_info">
          <thead className="">
            <tr className="">
              <th scope="col" className="contact_info__customercontainer">
                <div className="container">
                  <p className="txt">
                    {prospect.name} {prospect.lastname}
                  </p>
                  <p className="txt">{prospect.email}</p>
                  <p className="txt">5525688573</p>
                  <p className="txt">Vigencia de 1 dia</p>

                  <div className="badge">
                    <p>Cliente</p>
                  </div>
                </div>
              </th>

              <th scope="col" className="contact_info__customercontainer">
                <div className="container">
                  <p className="txt">
                    {ejecutive.name} {ejecutive.lastname}
                  </p>
                  <p className="txt">{ejecutive.email}</p>
                  <div className="badge">
                    <p>Ejecutivo</p>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </table>

        <p className="titleproductos">Productos</p>

        <div className="padding">
          <table className="products">
            <thead className="products__head">
              <tr className="products__headrow">
                <th scope="col">Codigo</th>
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
                    <td>{item.brand.name}</td>
                    <td>{item.name}</td>
                    <td>${item.callamount.toFixed(2)}</td>
                    <td>${item.iva.toFixed(2)}</td>
                    <td>${(item.total - item.iva).toFixed(2)}</td>
                    <td>{item.info}</td>
                  </tr>
                );
              })}

              <tr className="item total">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td className="bold">${total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="observations">
          <thead className="">
            <tr className="">
              <th scope="col" className="contact_info__customercontainer">
                <div className="container">
                  <p className="txt">{observations}</p>

                  <div className="badge">
                    <p className="txt">Obervaciones</p>
                  </div>
                </div>
              </th>

              <th scope="col" className="contact_info__customercontainer hide"></th>
            </tr>
          </thead>
        </table>

        <div id="pageFooter-last" className="footer">
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
    line-height: 24px;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    height: 100%;
    position: relative;

    .padding {
      padding: 20px;
    }

    .header_pdf {
      background-color: #ededed;
      height: 10px;
      width: 100%;

      * {
        margin: 0px;
        padding: 0px;
      }
    }

    .header_pdf__logo {
      padding: 30px;

      img {
        max-width: 120px;
        width: 100%;
      }
    }

    .header_pdf__rigth {
      text-align: right;
      padding: 30px;
    }

    .complete {
      width: 100%;
    }

    .header_infoquote {
      width: 100%;
      height: 10px;
      border-collapse: collapse;
      padding: 20px;
      border-spacing: 0;
      background-color: #ededed;

      * {
        margin: 0px;
        padding: 0px;
      }

      .title {
        color: #fff;
        font-size: 10px;
        font-weight: bold;
      }

      th,
      td {
        padding: 5px;
      }

      th {
        &:nth-child(1) {
          width: 20%;
          color: #fff;
          font-weight: bold;
          font-size: 10px;
          background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#1d9adc")};
          /* background-color: ${props => (props.primarColor ? props.primarColor : "#1d9adc")}; */
        }

        &:nth-child(2) {
          width: 20%;
          text-align: right;
          color: #747473;
          font-weight: bold;
          font-size: 8px;
        }

        &:nth-child(3) {
          width: 10%;
          color: #1d9adc;

          color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#1d9adc")};
          text-align: left;
          border-right: 1px solid #e0e0e0;
          font-size: 8px;
        }

        &:nth-child(4) {
          width: 10%;
          color: #747473;
          font-weight: bold;
          font-size: 8px;
        }

        &:nth-child(5) {
          width: 10%;
          color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#1d9adc")};
          text-align: left;
          font-size: 8px;
        }
      }
    }

    .contact_info {
      width: 100%;
      margin-top: 20px;

      th {
        width: 50%;

        .container {
          width: 80%;
          margin: auto;
          background-color: #ededed;
          border-radius: 10px;
          min-height: 100px;
          position: relative;
          margin-top: 20px;
          padding-top: 24px;
          padding-left: 20px;

          * {
            padding: 0px;
            margin: 0px;
          }

          .txt {
            text-align: left;
            font-weight: bold;
          }

          .badge {
            padding: 5px 0;
            top: -10px;
            left: 0;
            position: absolute;
            background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#1d9adc")};
            width: 60%;

            * {
              padding: 0px;
              margin: 0px;
            }

            p {
              color: #fff;
              font-weight: bold;
              font-size: 12px;
            }
          }
        }

        &:nth-child(2) {
          width: 50%;
        }
      }
    }

    .products {
      width: 100%;
      border-collapse: collapse;
      margin: 0;
    }

    .products__head {
      background-color: #3d3d3d;
      border-collapse: collapse;
      padding: 20px;
      border-spacing: 0;

      th,
      td {
        padding: 10px;
        background-color: #3d3d3d;
        color: #f6f6f6;
      }

      th {
        &:nth-child(1),
        &:nth-child(2) {
          width: 10%;
        }

        &:nth-child(3) {
          width: 40%;
        }

        &:nth-child(4),
        &:nth-child(5) {
          width: 20%;
        }
      }
    }

    .products__body {
      td {
        text-align: center;
        font-size: 9px;

        &:nth-child(3) {
          text-align: center;
        }
      }

      tr:nth-child(even) {
        background: #ddd;
      }

      .total {
        font-weight: bold;
      }
    }

    .observations {
      width: 100%;
      margin-top: 20px;

      th {
        width: 50%;

        .container {
          width: 80%;
          margin: auto;
          background-color: #ededed;
          border-radius: 10px;
          min-height: 40px;
          position: relative;
          margin-top: 20px;
          padding-top: 24px;
          padding-left: 20px;

          * {
            padding: 0px;
            margin: 0px;
          }

          .txt {
            text-align: left;
          }

          .badge {
            padding: 5px 0;
            top: -10px;
            left: 0;
            position: absolute;
            background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#1d9adc")};
            width: 60%;

            * {
              padding: 0px;
              margin: 0px;
            }

            p {
              color: #fff;
              font-weight: bold;
              font-size: 12px;
            }
          }
        }
      }

      .hide {
        visibility: hidden;
      }

      th:nth-child(2) {
        width: 50%;
      }
    }

    svg {
      position: absolute;
      bottom: 0;
      z-index: -1;
    }

    .titleproductos {
      font-weight: bold;
      font-size: 16px;
      margin-top: 20px;
      text-align: center;
      color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#1d9adc")};
    }
  }
`;
