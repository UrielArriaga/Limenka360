import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import styled from "styled-components";
import dayjs from "dayjs";

function PlantillaNacionalTemplate(props) {
  const { zoom, data, emailUpdate, totalIva } = props;
  const { provider, products, folio = "A2-01GT", buyer, address } = data; 
  const { userData } = useSelector(userSelector);
  let totalQuantity = products.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);
  let totalAmount = products.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.amount;
  }, 0);
  let totalsubtotal = products.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.subtotal;
  }, 0);
  let totalIvaproduc = products.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.totalIva;
  }, 0);
  let totalIvaProducts = totalIvaproduc.toFixed(2);
  return (
    <LayoutStyled zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container">
        <div className="content-wrapper">
          <div className="header">
            <h10>OLAKINO MEDICAL SA DE CV</h10>
          </div>
          <img className="logo" src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/medicalbuy.png"></img>
          <div className="Fol">
            <p className="text4">{folio}</p>
          </div>
          <br />
          <div className="table-container">
            <div className="table">
              <div className="table-header">{data?.provider?.companyname}</div>
              <div className="table-content">
                <p className="text">FECHA DE PEDIDO: {dayjs(provider?.createdAt).format("DD/MM/YYYY")} </p>
                <p className="text">FECHA DE ENTREGA: {dayjs(provider?.updatedAt).format("DD/MM/YYYY")} </p>
                {/* <p className="text">ATENCIÓN: {provider?.name} </p>
                <p className="text">CONDICIÓN DE PAGO: </p> */}
                <p className="text">TELÉFONO: {provider?.phone}</p>
              </div>
            </div>
          </div>
          <div className="table-container2">
            <div className="table2">
              <div className="table-header2">{buyer?.tax}</div>
              <div className="table-content2">
                <p className="text">RFC: OME200918IQ2</p>
                <p className="text">CONTACTO: {buyer?.contact}</p>
                <p className="text">
                  DIRECCIÓN: {buyer?.address}
                </p>
                <p className="text">TELÉFONO: {buyer?.phone}</p>
                <p className="text">EMAIL: {buyer?.email}</p>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>CÓDIGO</th>
                <th>DESCRIPCIÓN DE LOS BIENES O INSUMOS</th>
                <th>CANTIDAD</th>
                <th>PRECIO UNITARIO</th>
                <th>SUBTOTAL</th>
                <th>IVA</th>
              </tr>
            </thead>
            <tbody>
            
                {products?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.model}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                       <td> {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.unitprice)}</td>
                       <td>
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.subtotal)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.totalIva)}
                      </td>
                    </tr>
                  );
                })}
              
              <tr className="totals">
                <td colspan="5"></td>
               </tr>
              <tr className="totals">
                <td colspan="5"></td>
                <td>DESCUENTO</td>
                <td>$0.00</td>
              </tr>
              <tr className="totals">
                <td colspan="5"></td>
                <td>SUB-TOTAL</td>
                <td>${totalsubtotal}</td>
              </tr>
              <tr className="totals">
                <td colspan="5"></td>
                <td>IVA</td>
                <td>${totalIvaProducts}</td>
              </tr>
              <tr className="totals">
                <td colspan="5"></td>
                <td>TOTAL</td>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <div className="content-description">
            <div>
              <p className="text">
                <strong>OBSERVACIONES:</strong>
              </p>
              <p className="text">
                <strong>ENTREGAR OC JUNTO CON FACTURA.</strong>
              </p>
              <p className="text">
                <strong>TIEMPO DE ENTREGA.</strong>La entrega del equipo se realizará el 01 DE JUNIO DEL 2023 ; en caso
                de incumplimiento el proveedor le pagará a Comercializadora y Distribuidora MB, S.A. de C.V., daños y
                perjuicios.
              </p>
              <p className="text">
                <strong>LUGAR DE ENTREGA.</strong>La entrega del equipo se hará en el domicilio ubicado en: NOSOTROS
                RECOGEMOS .. , junto con la capacitación correspondiente.
              </p>
              <p className="text">
                <strong>INCUMPLIMIENTO.</strong>ComercializadorayDistribuidoraMB,S.A.deC.V.,queda facultada para
                demandar ante las autoridades correspondientes el resarcimiento de daños y perjuicios que se ocasionen
                por incumplimiento del proveedor. Asimismo, en dicho caso, el proveedor deberá devolver el total de los
                pagos que Comercializadora y Distribuidora MB, S.A. de C.V., le hubiese realizado por la compra del
                equipo.
              </p>
              <p className="text">
                <strong>PENA CONVENCIONAL.</strong>Para el caso de incumplimiento del proveedor,éste le pagará a
                Comercializadora y Distribuidora MB,S.A.deC.V., una pena convencional por la cantidad equivalente al 25%
                (veinticincoporciento) del precio total de compra-venta. Además de la pena ya señalada, el proveedor
                deberá restituir todas las cantidades pagadas por Comercializadora y Distribuidora MB,S.A.deC.V.,
                obligándose el proveedor a realizar tal restitución dentro de los 30 (treinta) días naturales siguientes
                a la fecha en que ocurrió el incumplimiento. En caso de que no se restituyeren dichas cantidades dentro
                del plazo establecido, el proveedor deberá pagar un interés del 5% (cinco por ciento) por cada día
                transcurrido de retraso en la restitución.
              </p>
              <p className="text">
                <strong>JURISDICCIÓN.</strong>Para cualquier tipo de controversia que se suscite, las partes se someten
                expresa y tácitamente ante los Tribunales del municipio de Naucalpan de Juárez, Estado de México,
                renunciando a cualquier otro fuero que en razón de su domicilio presenteo futuro o cuantía, pudiera
                corresponderles
              </p>
            </div>
          </div>
          <div className="small_table">
            <table>
              <tr>
                <td className="label tall-cell">
                  <div className="cell-content">
                    <p className="text3">ENTREGAR EN:</p>
                    <div className="divider"></div>
                    <p className="text6">SUC. HELSE</p>
                    <p className="text4">NOSOTROS RECOGEMOS</p>
                  </div>
                </td>
                <td className="center tall-cell">
                  <p className="text5">ENTREGAR EN:</p>
                  <p>{data?.name}</p>
                </td>
                <td className="right tall-cell">
                  <p className="text5">PROVEEDOR::</p>
                  <div className="divi"></div>
                  <p className="text2">NOMBRE Y FIRMA</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </LayoutStyled>
  );
}

export default PlantillaNacionalTemplate;

export const LayoutStyled = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  overflow: scroll;

  @page {
    size: A4;
    margin: 0;
  }
  .container {
    width: 6.5in;
    max-width: 90%;
    height:80vh;
    margin: auto;
    padding: 0px 20px 20px 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    text-align: center;
    color: #72b2c7;
  }

  .header {
    padding-bottom: 0;
  }

  .Fol {
    background-color: #004d67;
    width: 20%;
    color: #f2f2f2;
    text-align: center;
  }

  .table-container {
    float: left;
    box-sizing: border-box;
    width: 40%;
    margin-top: 45px;
  }

  .table {
    border: 2px solid #004d67;
    padding: 10px;
    border-radius: 10px;
  }

  .table-header {
    font-weight: bold;
    color: #004d67;
    font-size: 8pt;
  }

  .table-content {
    margin-top: 10px;
  }

  .table-container2 {
    float: right;
    box-sizing: border-box;
    width: 45%;
    margin-bottom: 10px;
  }

  .table2 {
    border: 2px solid #004d67;
    padding: 10px;
    border-radius: 10px;
  }

  .table-header2 {
    font-weight: bold;
    color: #004d67;
    font-size: 8pt;
  }

  .table-content2 {
    margin-top: 10px;
  }

  .text {
    text-align: justify;
    margin-bottom: 10px;
    font-size: 7pt;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    border: 1px solid black;
    padding: 3px;
    text-align: left;
    font-size: 7pt;
    text-align: center;
    background-color: #f2f2f2;
  }

  td {
    border: 1px solid black;
    padding: 3px;
    text-align: left;
    font-size: 7pt;
  }

  .text {
    text-align: justify;
    margin-bottom: 8px;
    font-size: 6pt;
  }

  .content-wrapper {
    border: 2px solid black;
    padding: 5px;
    margin-top: 10px;
  }

  .content-description {
    border: 1px solid black;
    padding: 1px;
    margin-top: 10px;
  }

  .tall-cell {
    height: 50px;
    vertical-align: top;
    text-align: center;
  }

  .divider {
    border-top: 1px solid #000;
    width: 100%;
    margin: 10px 0;
  }

  .divi {
    width: 100%;
    margin: 10px 0;
  }

  .text2 {
    margin-top: 50px;
    color: #72b2c7;
  }

  .text3 {
    text-align: left;
  }

  .text4 {
    text-align: center;
  }

  .text5 {
    text-align: center;
    color: #72b2c7;
  }

  .text6 {
    text-align: left;
    color: #72b2c7;
  }

  .logo {
    float: right;
    width: 170px;
  }
  .totals td {
    font-weight: bold;
    text-align: justify;
    border: none;
    padding: 2px;
    font-size: 7pt;
  }

  .totals td:last-child {
    text-align: center;
    padding-right: 20px;
  }
`;
