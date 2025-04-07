import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function NewOrderTemplate(props) {
  const { zoom, data, emailUpdate, totalIva } = props;
  const { provider, products, folio = "N/A", buyer, address, arrivesIn } = data;
  const { userData } = useSelector(userSelector);
  let totalQuantity = products.reduce((prevValue, currentValue) => {
    return prevValue + Number(currentValue.quantity);
  }, 0);
  let totalAmount = products.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.amount;
  }, 0);

  const validName = name => {
    if (name != null && name != "null null" && name != "") {
      return name;
    } else {
      return "N/A";
    }
  };
  const addressData = {
    MCALLEN: {
      name: "PROMED EXPORT SERVICES, LLC",
      contact: "MARICELA RODRIGUEZ unomedimagingsolutions@yahoo.com",
      address: "6324 S 23RD ST. MCALLEN, TX 78503 USA",
      details: "PHONE: +9566273526 FX: 956-627-3576 ZIP: 78503",
    },
    HOUSTON: {},
    "MEXICO-LAZARO CARDENAS": {
      name: "MEXICO2",
      contact: "",
      address: "LAZARO CARDENAS",
      details: "",
    },
    "MEXICO-MANZANILLO": {
      name: "MEXICO1",
      contact: "",
      address: "MANSANILLO",
      details: "",
    },
    "MEXICO-REFORMA": {
      name: "MEXICO-REFORMA",
      contact: "Cecilia Saldaña",
      address: "Reforma Capital, Av. Paseo de la reforma 250, Juárez, Cuauthémoc,00600, Ciudad de México",
      details: "+52 5525622736",
    },
  };
  addressData.HOUSTON = addressData.MCALLEN;
  const selectedData = addressData[arrivesIn] || null;

  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container_template">
        <div>
          <img
            src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-08-05%20at%2012.36.18%20PM%20(1).jpeg"
            alt="Logo"
          />
        </div>
        <div>
          &nbsp;
          <div className="folio">
            <p>{folio}</p>
          </div>
        </div>

        <div className="table-container">
          <div className="table">
            <div className="table-header">SELLER</div>
            <div className="table-content">
              <p className="text">
                COMPANYNAME: <span className="span_color_main">{provider?.companyname}</span>{" "}
              </p>
              <p className="text">
                NAME: <span className="span_color">{validName(provider?.name || provider?.fullname)}</span>
              </p>
              <p className="text">
                ADDRESS:{" "}
                <span className="span_color">
                  {address?.street ? `Calle ${address?.street}, ` : ""}
                  {address?.int_number ? `num.interior: ${address?.int_number}, ` : ""}
                  {address?.ext_number ? `numero exterior: ${address?.ext_number}, ` : ""}
                  {address?.postal?.postal_code ? `C.P: ${address?.postal?.postal_code}, ` : ""}
                  {address?.city?.name ? `Ciudad: ${address?.city?.name}, ` : ""}
                  {address?.entity?.name ? `Estado: ${address?.entity?.name}.` : ""}
                </span>{" "}
              </p>
              <p className="text">
                PREPARED BY: <span className="span_color">N/A</span>
              </p>
              <p className="text">
                PHONE: <span className="span_color"> {provider?.phone} </span>
              </p>
              <p className="text">
                E-MAIL: <span className="span_color"> {provider?.email}</span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="table-container2">
          <div className="table2">
            <div className="table-header2">BUYER</div>
            <div className="table-content2">
              <p className="text">
                NAME: <span className="span_color_main"> {buyer?.name} </span>
              </p>
              <p className="text">
                TAX: <span className="span_color"> {buyer?.tax}</span>{" "}
              </p>
              <p className="text">
                CONTACT: <span className="span_color"> {buyer?.contact} </span>
              </p>
              <p className="text">
                ADDRESS: <span className="span_color"> {buyer?.address2} </span>{" "}
              </p>
              <p className="text">
                PHONE: <span className="span_color">{buyer?.phone}</span>
              </p>
              <p className="text">
                EMAIL: <span className="span_color">{buyer?.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="div_head_three">
          <span className="word_violet"> SHIPPING DETAILS </span>
          <div className="div_data">
    <div className="div_dates">
      {selectedData ? (
        <>
          <p className="text_data">
            {selectedData.name}{" "}
            <span className="span_color_data">{selectedData.contact}</span>
          </p>
          <p className="text_data">
            {selectedData.address}{" "}
            <span className="span_color_data">{selectedData.details}</span>
          </p>
        </>
      ) : (
        <p className="text_data">Sin información disponible</p>
      )}
    </div>
  </div>
        </div>
        <div>
          <table className="full-width">
            <tr className="color_div">
              <td className="header">No.</td>
              <td colspan="1"> ITEM CODE</td>
              <td colspan={4} className="header">
                ITEM NAME
              </td>
              <td className="header">QTY</td>
              <td className="header">UNIT PRICE</td>
              <td colspan="3" className="header">
                TOTAL VALUE
              </td>
            </tr>
            {products?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.model}</td>
                  <td colspan="4">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitprice}</td>
                  <td colspan="3">
                    {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td colspan="4">TOTAL</td>
              <td>{totalQuantity}</td>
              <td></td>
              <td>TOTAL VALUE</td>
              <td>{totalAmount}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td colspan="4"></td>
              <td></td>
              <td></td>
              <td> SHIPPING TO MEXICO</td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td colspan="4"></td>
              <td></td>
              <td></td>
              <td> SUB-TOTAL</td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td className="color_row">Freight by:</td>
              <td className="color_row" colspan="4">
                SEA
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="color_row"> Destination:</td>
              <td className="color_row" colspan="4">
                {arrivesIn}
              </td>
              <td></td>
              <td></td>
              <td className="word_violet"> TOTAL AMOUNT</td>
              <td></td>
            </tr>
            <tr></tr>
          </table>
        </div>

        <div className="footer">
          <p className="word_violet">TERMS & CONDITIONS FOR THIS ORDER</p>
          <p>1. Trade mode: CFR </p>
          <p>2. In shipments by SEA please do not use:</p>
          <span> -Hapag Lloyd </span>
          <span> -Cosco Shipping </span>
          <p>3. Currency: USD </p>
          <p>4.Minimum Warranty: 12 Months</p>
          <p>5. American Plug</p>
          <p>6. User manual.</p>
          Goods Delivery:
          <p>7. Use CMC GLOBAL for the Goods that arrives in {arrivesIn} </p>
          <p>8. Do not send the Goods until it is approved by Homukea </p>
          <p>9. Send the ISF information once the suppiler got the booking </p>
          <p>10. Send CI, PL, SN before shipping merchandise.</p>
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  /* zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")}; */
  /* overflow-y: scroll; */
  overflow: hidden;
  /* background-color: red; */
  body {
    font-family: Arial, sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    background-color: #cdcdcd;
  }

  .container_template {
    background: #fff;
    border: 1px solid #eee;
    font-size: 10px;
    font-family: "Calibri", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    position: relative;
    width: 5.8in;
    height: 80vh;
    margin: auto;
    padding: 0px 20px 20px 20px;
    width: 100%;
  }
  img {
    width: 100%;
  }
  span {
    color: red;
    font-weight: 600;
  }
  .folio {
    margin-top: -75px;
    margin-left: 418px;
    font-weight: 600;
    color: #fff;
    font-size: small;
  }

  .table-container {
    float: left;
    box-sizing: border-box;
    width: 48%;
  }

  .table {
    border: 2px solid #004d67;
    padding: 8px;
    line-height: 0.8em;
    border-radius: 10px;
  }

  .table-header {
    font-weight: bold;
    color: #6b449c;
    font-size: 6pt;
    text-align: center;
  }

  .table-content {
    margin-top: 10px;
  }

  .table-container2 {
    float: right;
    box-sizing: border-box;
    width: 48%;
  }

  .table2 {
    border: 2px solid #004d67;
    padding: 8px;
    line-height: 0.8em;
    border-radius: 10px;
  }

  .table-header2 {
    font-weight: bold;
    color: #6b449c;
    font-size: 6pt;
    text-align: center;
  }

  .table-content2 {
    margin-top: 10px;
  }

  .div_data {
    display: flex;
  }
  .div_head_three {
    margin-top: 106px;
    border-radius: 6px;
    border: 2px solid #455469;
    padding: 6px;
    /* line-height: 0.1em; */
  }
  .text_data {
    font-weight: 600;
    margin-left: 2px;
    font-size: smaller;
  }
  .span_color_data {
    margin-left: 100px;
    color: #555;
  }

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 8px;
    padding: 2px;
  }
  th,
  td {
    height: 8px;
    text-align: center;
  }

  .full-width {
    width: 100%;
    margin-top: 6px;
  }

  .footer p {
    font-size: smaller;
    font-weight: bold;
    padding: 2px;
  }
  .word_violet {
    color: #6b449c;
    font-weight: 600;
    font-size: smaller;
    margin-bottom: 2px;
  }
  .color_div {
    background: #455469;
    color: #fff;
    font-weight: 600;
  }
  .color_row {
    background: #bfbfbf;
    font-weight: 600;
  }

  .text {
    font-size: smaller;
    font-weight: 600;
  }
  .span_color_main {
    font-weight: 600;
    color: #555;
  }
  .span_color {
    font-weight: 500;
    color: #455469;
  }
`;
