import { IconButton } from "@material-ui/core";
import { Close, Print } from "@material-ui/icons";
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { makeTemplate } from "../../templates/makeTemplate";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { saveAs } from "file-saver";
import { URL_SPACE, api } from "../../services/api";
import dayjs from "dayjs";

export default function TabulatorPreview(props) {
  const { quotes, planQuotes, cotization, close } = props;
  const { userData, id_user, company: id_companys, groupId } = useSelector(userSelector);
  const renderContent = option => {
    let styleName = "";
    let secondStyle = "";
    if (option === "lapse") styleName = "blue";
    if (option === "pendingpayments") styleName = "blue_light_table td_center";
    if (option === "initialpayment") styleName = "td_initialpayment";
    if (option !== "lapse" && option !== "pendingpayments") secondStyle = "td_border";
    return quotes.map((item, index) => (
      <td className={`${styleName} ${secondStyle} ${validateStyle(option, index)}`} key={index}>
        {option === "lapse" || option === "pendingpayments" ? item[option] : pesoMXN(item[option])}{" "}
        {option === "lapse" && "meses"}
      </td>
    ));
  };
  const validateStyle = (option, index) => {
    if (option === "lapse" && index === 4) return "green";
    if (option === "pendingpayments" && index === 4) return "green";
  };
  const pesoMXN = amount => {
    return amount?.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
  };
  const handlePrint = async () => {
    try {
      let data = {
        products: [],
        quotes: quotes,
        cotization: cotization,
      };
      let response = makeTemplate(11, data);
      let company = userData.companyId;
      let group = userData.groupId;
      let user = id_user;

      const form = new FormData();
      form.append("name", "tabulador");
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);
      let responsePDFURL = await api.post("convert/pdf", form);
      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + responsePDFURL.data.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      saveAs(pdfBlob, `tabulador.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="close_preview">
        <p className="title_preview">Vista Previa de la Cotización</p>
        <IconButton className="bt_close" onClick={close}>
          <Close />
        </IconButton>
        <IconButton onClick={handlePrint}>
          <Print />
        </IconButton>
      </div>
      <div className="container_template">
        <div className="container_template__header">
          <p className="date">{cotization.date}</p>
          <p className="title">Propuesta Económica</p>
          <p className="subtitle">
            <span className="bold">CRÉDITO</span> - VASA FINANCIAMIENTOS
          </p>
        </div>
        <div className="container_template__body">
          <p className="title_body bold">Estimado DOCTOR</p>
          <p className="info">
            Le enviamos la presente cotización, la cual fue preparada y estructurada especialmente para usted.
            Apreciamos la oportunidad que nos brinda de presentarle ésta propuesta y estamos a sus órdenes para atender
            cualquier duda o comentario sobre la misma.
          </p>
          <div className="resumen_totals">
            <div className="titles_totals">
              <p className="title bold">Equipo a arrendar</p>
              <p className="title">Precio del equipo</p>
              <p className="title">Enganche</p>
              <p className="title bold">Monto del crédito</p>
            </div>
            <div className="data_totals">
              <p className="data">EQUIPO</p>
              <p className="data">
                <NumberFormat
                  value={cotization.amount}
                  prefix="$"
                  decimalScale={0}
                  thousandSeparator=","
                  displayType="text"
                />
              </p>
              <p className="data">
                <NumberFormat
                  value={cotization.downpayment}
                  prefix="$"
                  decimalScale={0}
                  thousandSeparator=","
                  displayType="text"
                />
              </p>
              <p className="data blue_light bold">
                <NumberFormat
                  value={cotization.credit}
                  prefix="$"
                  decimalScale={0}
                  thousandSeparator=","
                  displayType="text"
                />
              </p>
            </div>
          </div>
          <div className="content_quotes">
            <table className="table">
              <thead className="table__head"></thead>
              <tbody className="table__body">
                <tr className="tr_top">
                  <td className="start_row">Plazo</td>
                  {renderContent("lapse")}
                </tr>
                <tr className="tr_second"></tr>
                <tr className="tr_space"></tr>
                <tr></tr>
                <tr>
                  <td>Comisión de Apertura</td>
                  {renderContent("commision")}
                </tr>
                <tr>
                  <td>1era mensualidad</td>
                  {renderContent("firstmonth")}
                </tr>
                <tr>
                  <td>Enganche</td>
                  {renderContent("downpayment")}
                </tr>
                <tr className="tr_initialpayment">
                  <td className="blue_bold">Total del pago inicial</td>
                  {renderContent("initialpayment")}
                </tr>
                <tr></tr>
                <tr className="tr_doublespace"></tr>
                <tr></tr>
                <tr>
                  <td>Mensualidades restantes</td>
                  {renderContent("pendingpayments")}
                </tr>
                <tr>
                  <td>Pago Mensual</td>
                  {renderContent("amount")}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="terms">
            <p className="terms_title">Términos y Condiciones</p>
            <p className="text" />
            <p className="text">
              El pago inicial deberá liquidarse a la firma del contrato. La primera de las mensualidades restantes a los
              30 días
            </p>
            <p className="text">
              Si no hay enganche, el cliente deberá liquidar la primera mensualidad a la firma del contrato
            </p>
            <p className="text">Montos, tasas y precios pueden variar sin previo aviso</p>
            <p className="text">
              Mensualmente se facturan los intereses y el IVA de éstos. Las aportaciones a capital se mencionarán en
              cada factura
            </p>
            <p className="text">Los pagos mensuales ya incluyen el IVA de los intereses</p>
            <p className="text">
              La información presentada en esta cotización es de carácter informativo y tiene una vigencia de 10 días{" "}
            </p>
          </div>
          <div className="warnings">
            <p className="warnings_title">Advertencias:</p>
            <p className="text" />
            <p className="text">Ningún pago al proveedor garantiza que el arrendamiento será aprobado</p>
            <p className="text">
              Contratar arrendamientos por arriba de sus capacidades de pago puede afectar su historial crediticios
            </p>
            <p className="text">
              Incumplir sus obligaciones les puede generar gastos de cobranza y la aplicación de la tasa de interés
              moratorio
            </p>
            <div className="divider" />
          </div>

          <div className="firms">
            <div className="first_firm">
              <p className="firm">FIRMA Y ACEPTACIÓN</p>
            </div>
            <div className="second_firm">
              <p className="firm">PLAZO SOLICITADO</p>
            </div>
          </div>
        </div>
        <div className="container_template__footer">{/* <p className="title_footer">CORPORATIVO VASA </p> */}</div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  overflow: scroll;
  @page {
    size: A4;
    margin: 0;
  }
  .close_preview {
    display: flex;
    justify-content: space-between;
    background: transparent;
    align-items: center;
    position: sticky;
    width: auto;
    z-index: 100000;
    top: 1;
    background-color: #1763ab;
    padding: 5px;
    margin-bottom: 5px;
    .title_preview {
      color: #fff;
      font-size: 17px;
      font-weight: 500;
    }
    .bt_close {
      height: 35px;
      width: 35px;
      color: red;
    }
  }
  .container_template {
    padding: 17px;
    max-width: 800px;
    margin: auto;
    border: 1px solid #eee;
    font-size: 12px;
    line-height: 14px;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    height: 100%;
    position: relative;
    background-image: url("tabulator_background.png");
    &__header {
      margin-top: 100px;
      margin-bottom: 20px;
      .date {
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
      }
      .title {
        width: fit-content;
        border-bottom: 1px solid;
        margin-bottom: 1px;
      }
      .subtitle {
        width: fit-content;
        border-top: 1px solid;
      }
    }
    &__body {
      margin-bottom: 20px;
      .title_body {
        margin-bottom: 20px;
      }
      .info {
        margin-bottom: 20px;
      }
      .resumen_totals {
        width: 100%;
        display: flex;
        margin-bottom: 20px;

        .titles_totals {
          width: 25%;
          .title {
            margin-bottom: 8px;
            width: fit-content;
          }
        }
        .data_totals {
          width: 75%;
          .data {
            width: fit-content;
            padding: 0px 20px;
            margin-bottom: 8px;
          }
        }
      }
      .content_quotes {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        .table {
          td {
            padding: 2px;
          }
          width: 94%;
          border-collapse: collapse;
          &__head {
          }
          &__body {
            .td_border {
              border: 1px solid;
              text-align: center;
            }
            .td_initialpayment {
              border: none;
              font-weight: bold;
            }
            .td_center {
              text-align: center;
            }
            .tr_top {
              border-bottom: 1px solid;
              .start_row {
              }
            }
            .tr_initialpayment {
              border-bottom: 1px solid;
            }
            .tr_second {
              height: 2px;
              background-color: red;
              border-bottom: 1px solid;
            }
            .tr_space {
              height: 10px;
            }
            .tr_doublespace {
              height: 20px;
            }
          }
        }
      }
      .terms {
        width: 100%;
        margin-bottom: 20px;
        padding-left: 25px;
        .terms_title {
          margin-left: -25px;
          font-weight: bold;
        }
        .text {
          padding: 2px;
          /* border-top: 1px solid #c0c0c0; */
          border-bottom: 1px solid #c0c0c0;
        }
      }
      .warnings {
        width: 100%;
        margin-bottom: 20px;
        padding-left: 25px;
        .warnings_title {
          margin-left: -25px;
          font-weight: bold;
        }
        .text {
          padding: 2px;
          /* border-top: 1px solid #c0c0c0; */
          border-bottom: 1px solid #c0c0c0;
        }
        .divider {
          margin-top: 40px;
          margin-bottom: 20px;
          padding: 2px;
          border-bottom: 1px solid #c0c0c0;
        }
      }
      .firms {
        width: 100%;
        display: flex;
        .first_firm {
          display: flex;
          justify-content: center;
          width: 50%;
        }
        .second_firm {
          display: flex;
          justify-content: center;
          width: 50%;
        }
        .firm {
          padding: 60px 60px 0px 60px;
          background-color: #f2f2f2;
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 20px;
        }
      }

      .blue_light {
        background-color: #60c4e1;
      }
      .blue_light_table {
        background-color: #60c4e1;
        color: #fff;
      }
      .blue {
        background-color: #49a2db;
        color: #fff;
      }
      .blue_bold {
        background-color: #1763ab;
        color: #fff;
      }
      .green {
        color: #006100;
        background-color: #c6efce;
      }
    }
    &__footer {
      border-top: 2px solid #366092;
      display: flex;
      justify-content: center;
      .title_footer {
      }
    }
    .bold {
      font-weight: bold;
    }
  }
`;
