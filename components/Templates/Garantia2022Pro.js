export const Garantia2022Pro = () => {
    let array = [
        {
            id: "1",
            codigo: "MC-HB1001",
            desc: "SILLA DE RUEDAS BASICA CO OR NEGRO",
            cantidad: "20",
            unidad: "pzs",
            precio: "800",
            importe: "1000",
        },
        {
            id: "2",
            codigo: "MC-HB1003",
            desc: "SILLA DE RUEDAS BASICA",
            cantidad: "10",
            unidad: "pzs",
            precio: "1000",
            importe: "2000",
        },
    ]
    let itemsProducts = "";
    array?.forEach((item) => {
        itemsProducts += `
      <tr>
      <td>${item.id}</td>
      <td>${item.codigo}</td>
      <td>${item.desc}</td>
      <td>${item.cantidad}</td>
      <td>${item.unidad}</td>
      <td>${item.precio}</td>
      <td>${item.importe}</td>
    </tr>
      `;
    }
    ) 
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plantilla Nacional</title>
  <style>
    body {
    font-family: Arial, sans-serif;
      height: 100%;
      width: 100%;
      zoom: 70%;
      overflow: scroll;
    }

    .container {
      max-width: 90%;
      height: 11in;
      margin: auto;
      padding: 0px 20px 20px 20px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      color: #72b2c7;
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
      width: 45%;
      margin-top: 15px;
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
  </style>
</head>
<body>
  <section>
    <div class="container">
      <div class="content-wrapper">
        <div class="header">
          <h10>OLAKINO MEDICAL SA DE CV</h10>
        </div>
        <img class="logo" src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/medicalbuy.png" alt="Logo">
        <div class="Fol">
          <p class="text4">2537</p>
        </div>
        <br>
        <div class="table-container">
          <div class="table">
            <div class="table-header">STARKET</div>
            <div class="table-content">
              <p class="text">FECHA DE PEDIDO: </p>
              <p class="text">FECHA DE ENTREGA:</p>
              <p class="text">ATENCIÓN: LUIS RODRIGUEZ</p>
              <p class="text">CONDICIÓN DE PAGO: CREDITO</p>
              <p class="text">TELÉFONO:</p>
            </div>
          </div>
        </div>
        <div class="table-container2">
          <div class="table2">
            <div class="table-header2">OLAKINO MEDICAL SA DE CV</div>
            <div class="table-content2">
              <p class="text">RFC: OME200918IQ2</p>
              <p class="text">CONTACTO: Mariana Martínez</p>
              <p class="text">DIRECCIÓN: Av. J Jimenez Cantú Mz34 Col. Centro Urbano Cuautitlan Izcalli, México. CP. 54700</p>
              <p class="text">TELÉFONO: 58 61 89 00 EXT 2111</p>
              <p class="text">EMAIL: mariana.martinez@medicalbuy.mx</p>
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
              <th>UNIDAD</th>
              <th>PRECIO UNITARIO</th>
              <th>IMPORTE</th>
            </tr>
          </thead>
          <tbody>
                ${itemsProducts}
            <tr class="totals">
              <td colspan="5"></td>
              <td>MONTO</td>
              <td>$0.00</td>
            </tr>
            <tr class="totals">
              <td colspan="5"></td>
              <td>DESCUENTO</td>
              <td>$0.00</td>
            </tr>
            <tr class="totals">
              <td colspan="5"></td>
              <td>SUB-TOTAL</td>
              <td>$0.00</td>
            </tr>
            <tr class="totals">
              <td colspan="5"></td>
              <td>IVA</td>
              <td>$0.00</td>
            </tr>
            <tr class="totals">
              <td colspan="5"></td>
              <td>TOTAL</td>
              <td>$0.00</td>
            </tr>
          </tbody>
        </table>
        <div class="content-description">
          <div>
            <p class="text"><strong>OBSERVACIONES:</strong></p>
            <p class="text"><strong>ENTREGAR OC JUNTO CON FACTURA.</strong></p>
            <p class="text"><strong>TIEMPO DE ENTREGA.</strong> La entrega del equipo se realizará el 01 DE JUNIO DEL 2023; en caso de incumplimiento el proveedor le pagará a Comercializadora y Distribuidora MB, S.A. de C.V., daños y perjuicios.</p>
            <p class="text"><strong>LUGAR DE ENTREGA.</strong> La entrega del equipo se hará en el domicilio ubicado en: NOSOTROS RECOGEMOS .. , junto con la capacitación correspondiente.</p>
            <p class="text"><strong>INCUMPLIMIENTO.</strong> Comercializadora y Distribuidora MB, S.A. de C.V., queda facultada para demandar ante las autoridades correspondientes el resarcimiento de daños y perjuicios que se ocasionen por incumplimiento del proveedor. Asimismo, en dicho caso, el proveedor deberá devolver el total de los pagos que Comercializadora y Distribuidora MB, S.A. de C.V., le hubiese realizado por la compra del equipo.</p>
            <p class="text"><strong>PENA CONVENCIONAL.</strong> Para el caso de incumplimiento del proveedor, éste le pagará a Comercializadora y Distribuidora MB, S.A. de C.V., una pena convencional por la cantidad equivalente al 25% (veinticinco por ciento) del precio total de compra-venta. Además de la pena ya señalada, el proveedor deberá restituir todas las cantidades pagadas por Comercializadora y Distribuidora MB, S.A. de C.V., obligándose el proveedor a realizar tal restitución dentro de los 30 (treinta) días naturales siguientes a la fecha en que ocurrió el incumplimiento. En caso de que no se restituyeren dichas cantidades dentro del plazo establecido, el proveedor deberá pagar un interés del 5% (cinco por ciento) por cada día transcurrido de retraso en la restitución.</p>
            <p class="text"><strong>JURISDICCIÓN.</strong> Para cualquier tipo de controversia que se suscite, las partes se someten expresa y tácitamente ante los Tribunales del municipio de Naucalpan de Juárez, Estado de México, renunciando a cualquier otro fuero que en razón de su domicilio presente o futuro o cuantía, pudiera corresponderles.</p>
          </div>
        </div>
        <div class="small_table">
          <table>
            <tr>
              <td class="label tall-cell">
                <div class="cell-content">
                  <p class="text3">ENTREGAR EN:</p>
                  <div class="divider"></div>
                  <p class="text6">SUC. HELSE</p>
                  <p class="text4">NOSOTROS RECOGEMOS</p>
                </div>
              </td>
              <td class="center tall-cell">
                <p class="text5">ENTREGAR EN:</p>
                <p>Mariana Martínez</p>
              </td>
              <td class="right tall-cell">
                <p class="text5">PROVEEDOR:</p>
                <div class="divi"></div>
                <p class="text2">NOMBRE Y FIRMA</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
`;
};

