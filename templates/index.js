export const renderTemplateHospital = data => {
  let { subtotal, prospect, products, total, discount, ejecutive, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
      <tr class="item last">
      <td>${item.code}</td>
      <td>${item.quantity}</td>
      <td>${item.brand}</td>
      <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
        item.amount
      )}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.iva)}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
        item.total
      )}</td>
        <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
      </tr>
      `;
  });

  return `
  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="output.css" />
    <style>
    body {
margin:0;
}
#pageFooter {
font-size: 7px;
color: #555;
padding:5px;
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
font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
color: #555;
   height: 760px;
position: relative;
}
.box {
width: 100%;
margin: 0;
padding: 0;
z-index: 0;
display: inline-block;
background: #ededed;
}
.art-cabezera {
background: #ededed;
width: 100%;
}
.logo {
width: 25%;
float: left;
margin-left: 3%;
margin-top:5px;
}
img.img-log {
width: 100%;
}
.desc-art {
display: none;
}
span.text-art {
color: #1c9adc;
line-height: 2.5em;
font-size: 6pt;
font-weight: 900;
}
.cot-art {
height: 0;
border-bottom: 100px solid #0072c0;
border-left: 90px solid transparent;
width: 44%;
float: right;
margin-top: 0;
}
.art-cot {
width: 100%;
margin: 3% 0 7px 0;
text-align: center;
color: white;
font-size: 14pt;
font-weight: bold;
padding: 5px;
float: left;
}
.num-cot {
width: 100%;
float: left;
}
.text-cot {
float: left;
width: 32%;
font-size: 8px;
color: #ffffff;
padding: 5px;
text-align: center;
font-weight: bold;
}
.va-art {
float: left;
width: 20%;
font-size: 8px;
color: #ffffff;
padding: 5px;
text-align: center;
font-weight: 900;
}
.text-date {
float: left;
width: 15%;
font-size: 8px;
color: #ffffff;
padding: 5px;
text-align: center;
font-weight: 900;
border-left: 1px solid #c2c1c2;
}
.va-texts {
font-size: 8px;
float: left;
color: #ffffff;
padding-top: 5px;
font-weight: 900;
}
.cli-art {
width: 100%;
margin-top: 40px;
}
.client-art {
width: 40%;
float: left;
margin-left: 5%;
background: #ededed;
border-radius: 10px;
margin-top: 15px;
height: 125px;
}
.text-client {
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
.descrip-client {
font-size: 7.5pt;
padding: 10px;
line-height: 1em;
}
.art-med {
width: 100%;
text-align: center;
font-size: 9pt;
margin-top: 10px;
color: #1c9adc;
font-weight: bold;
}
.prod-art {
margin-top: 2%;
width: 100%;
float: left;
}.tabs_products {
padding: 10px;
}
table.products {
border-spacing: 0;
width: 100%;
}
thead.products__head {
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
.obser-art {
width: 60%;
background: #ededed;
float: left;
margin-top: 3%;
font-size: 7pt;
padding-left: 5px;
margin-left: 10px;
text-align: justify;
}
.text-observa {
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
/*# sourceMappingURL=outpu.css.map */
</style>
</head>
<body>
    <div class="container_template">
        <div class="box">
            <div class="art-cabezera">
            <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/EQUIPAMIENTO-HOSPITALARIO_LOGO.png" class="img-log" />
                        </div>
            <div class="cot-art">
            <div class="art-cot">Cotización</div>
            <div class="num-cot">
            <span class="text-cot">Nº de Cotización:</span>
            <span class="va-art">${quoteInfo.folio}</span>
            <span class="text-date">Fecha:</span>
            <span class="va-texts">${quoteInfo.date}</span>
            </div>
            </div>
            </div>
            </div>
<div class="cli-art">
    <div class="client-art">
    <div class="text-client">Cliente</div>
    <div class="descrip-client">
        <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
        <p class="text_data">${prospect.phone}</p>
        <p class="text_data">${prospect.email}</p>
        <p class="text_data">Vigencia de 1 día.</p></div>
    </div>
    <div class="client-art">
    <div class="text-client">Ejecutivo</div>
    <div class="descrip-client">
        <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
         <p class="text_data">${ejecutive.email}</p>
         <p class="text_data">${ejecutive.phone}</p>
    </div>
    </div>
    </div>
    <div class="prod-art">
        <div class="art-med">PRODUCTOS</div>
        <div class="tabs_products">
            <table class="products">
                <thead class="products__head">
                    <tr class="products__headrow">
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
                <tbody class="products__body">
                ${itemsProducts}
  
                <tr class="item total">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="bold">Descuento</td>
                <td class="bold">${discount}</td>
                 </tr>
       
              <tr class="item total">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="bold">Total</td>
                <td class="bold">${total}</td>
              </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="obser-art">
      <div class="text-client">Observaciones</div>
        <p class="text-note">
            ${quoteInfo.observations}
        </p>
    </div>
    <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
        equipos
        son salvo venta, una vez confirmado el
        pedido no se aceptan cambios o
        devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
        por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
        de la compra y el reembolso se realiza
        30 días hábiles posteriores a la
        cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
        ventas, es indispensable enviar el comprobante de pago para tramitar el
        pedido de los equipos solicitados. *Cuando el equipo sea enviado por
        paquetería, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
        este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
        momento de la compra al tipo de cambio
        de BBVA BANCOMER a la venta. Los
        números de guía se darán después del tercer dia.
        </div>
</div>
</body>
</html>`;
};

export const renderTemplateMedicalBuy = data => {
  let { prospect, products, total, subtotal, discount, ejecutive, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
        <tr class="item last">
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.brand}</td>
        <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.amount
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.iva
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.total
        )}</td>
          <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
        </tr>
        `;
  });

  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
  position: relative;
  
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
      width: 25%;
      float: left;
    }
    .img_log {
      width: 100%;
      margin: 15px 0px 0 10px;
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
      margin-top: 5%;
    }
    .art_cot {
      width: 40%;
      background: #03aed2;
      text-align: center;
      color: white;
      font-size: 12pt;
      font-weight: bold;
      padding: 5px;
      float: left;
    }
    .num_cot {
      width: 50%;
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
      color: #03aed2;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
      margin-top: 30px;
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
    .name_client {
      margin: 0;
      font-weight: 900;
      color: black;
      font-size: 8px;
  }
    .text_client {
      background: #03aed2;
      width: 50%;
      padding: 5px;
      color: white;
      margin-top: -10px;
      font-size: 9px;
      text-align: center;
      font-weight: bold;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1.5em;
    }
    .art_med {
      width: 100%;
      text-align: center;
      font-size: 9px;
      margin-top: 10px;
      color: #03aed2;
      font-weight: bold;
    }
    .text_data {
      margin: 0;
      font-size: 8px;
      color:#000;
  }
  
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }
    .tabs_products {
      padding: 10px;
  }
  table.products {
      border-spacing: 0;
      width: 100%;
  }
  thead.products__head {
      background: #3d3d3d;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
  }
  table tbody tr:nth-child(odd) {
      background: #ececec;
  }
  table tbody tr:nth-child(even) {
      background: #ffffff;
  }
  .last {
      font-size: 8px;
      line-height: 2em;
      color:#000;
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
    
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
              <div class="art_cabezera">
              <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/medicalbuy.png" class="img_log" /></div>
              <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
              <span class="text_cot">Nº de Cotización:</span>
              <span class="va_art">${data.quoteInfo.folio}</span>
              <span class="text_date">Fecha:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
              </div>
              </div>
              </div>
              </div>
  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Cliente</div>
      <div class="descrip_client">
          <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
               <p class="text_data">${prospect.email}</p>
               <p class="text_data">${prospect.phone}</p>
          <p class="text_data">Vigencia de 1 día.</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Ejecutivo</div>
      <div class="descrip_client">
          <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
           <p class="text_data">${ejecutive.email}</p>
           <p class="text_data">${ejecutive.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
             
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${discount}</td>
                </tr>
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${total}</td>
              </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${quoteInfo.observations}
          </p>
      </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paquetería, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guía se darán después del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html>`;
};

export const renderTemplateMeisonMedical = data => {
  let { prospect, products, total, subtotal, discount, ejecutive, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
        <tr  class="item last">
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.brand}</td>
        <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.amount
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.iva
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.total
        )}</td>
         <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
        </tr>
        `;
  });

  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Meison Medical</title>
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
  position: relative;
  
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
      width: 25%;
      float: left;
    }
    .img_log {
      width: 100%;
      margin: 15px 0px 0 10px;
    }
    .desc_art {
      float: right;
      width: 48%;
    }
    span.text_art {
      color: #1c9adc;
      line-height: 2.5em;
      font-size: 6pt;
      font-weight: 900;
    }
  
    .cot_art {
      width: 100%;
      float: left;
      margin-top: 5%;
    }
    .art_cot {
      width: 40%;
      background: #1c9adc;
      text-align: center;
      color: white;
      font-size: 12pt;
      font-weight: bold;
      padding: 5px;
      float: left;
    }
    .num_cot {
      width: 50%;
      float: left;
    }
    .text_cot {
      float: left;
      width: 35%;
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
      color: #1c9adc;
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
      color: #1c9adc;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
      margin-top: 30px;
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
    .name_client {
      margin: 0;
      font-weight: 900;
      color: black;
      font-size: 8px;
  }
    .text_client {
      background: #1c9adc;
      width: 50%;
      padding: 5px;
      color: white;
      margin-top: -10px;
      font-size: 9px;
      text-align: center;
      font-weight: bold;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1.5em;
    }
    .art_med {
      width: 100%;
      text-align: center;
      font-size: 9px;
      margin-top: 10px;
      color: #1c9adc;
      font-weight: bold;
    }
    .text_data {
      margin: 0;
      font-size: 8px;
      color:#000;
  }
  
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }
    .tabs_products {
      padding: 10px;
  }
  table.products {
      border-spacing: 0;
      width: 100%;
  }
  thead.products__head {
      background: #3d3d3d;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
  }
  table tbody tr:nth-child(odd) {
    background: #ececec;
  }
  table tbody tr:nth-child(even) {
    background: #ffffff;
  }
  .last {
      font-size: 8px;
      line-height: 2em;
      color:#000;
  }
  .price {
      font-weight: bold;
      color: black;
      text-align: center;
  }
  .bold {
      background: #1c9adc;
      color: white;
      font-weight: 900;
      font-size: 10px;
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
    .container_obsevations {
      width: 100%;
      float: left;
      margin-bottom: 10px;
  }
    
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
  
              <div class="art_cabezera">
              <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/MEISON_LOGO.png" alt="logo Meison" class="img_log" />
                          </div>
              <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
              <span class="text_cot">Nº de Cotización:</span>
              <span class="va_art">${data.quoteInfo.folio}</span>
              <span class="text_date">Fecha:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
              </div>
              </div>
              </div>
              </div>
  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Cliente</div>
      <div class="descrip_client">
          <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
          <p class="text_data">${prospect.email}</p>
          <p class="text_data">${prospect.phone}</p>
          <p class="text_data">Vigencia de 1 día.</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Ejecutivo</div>
      <div class="descrip_client">
          <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
           <p class="text_data">${ejecutive.email}</p>
           <p class="text_data">${ejecutive.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
         
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${discount}</td>
                </tr>
          
                <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${total}</td>
              </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="container_obsevations">
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${quoteInfo.observations}
          </p>
      </div>
    </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paquetería, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guía se darán después del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html>
  `;
};

export const renderTemplatePromed = data => {
  let { prospect, products, total, subtotal, discount, ejecutive, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
        <tr  class="item last">
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.brand}</td>
        <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.amount
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.iva
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.total
        )}</td>
          <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
        </tr>
        `;
  });
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
  position: relative;
  }
    .box {
      width: 100%;
      margin: 0;
      padding: 0;
      z-index: 0;
      display: inline-block;
    }
    .art_cabezera {
      background: #ededed;
      width: 100%;
    }
    .logo {
      height: 0;
      border-right: 100px solid transparent;
      border-bottom: 90px solid #0072c0;
      width: 25%;
      float: left;
    }
    img.img_log {
      margin: 15px;
      width: 100%;
    }
    .desc_art {
      display: none;
    }
    span.text-art {
      color: #0072c0;
      line-height: 2.5em;
      font-size: 6pt;
      font-weight: 900;
    }
      .cot_art {
      background: #0072c0;
      width: 100%;
      float: left;
    }
    .art_cot {
      margin-top: -9%;
      width: 40%;
      text-align: center;
      color: #4e4e4e;
      font-size: 20pt;
      font-weight: bold;
      padding: 5px;
      float: right;
    }
    .num_cot {
      width: 50%;
      float: right;
    }
    .text_cot {
      float: left;
      width: 35%;
      font-size: 6.5pt;
      color: #ffffff;
      padding: 5px;
      text-align: center;
      font-weight: bold;
    }
    .va_art {
      float: left;
      width: 20%;
      font-size: 7pt;
      color: #ffffff;
      padding: 5px;
      text-align: center;
      font-weight: 900;
    }
    .text_date {
      float: left;
      width: 15%;
      font-size: 7pt;
      color: #ffffff;
      padding: 5px;
      text-align: center;
      font-weight: 900;
      border-left: 1px solid #ffffff;
    }
    .va_texts {
      font-size: 7pt;
      float: left;
      color: #ffffff;
      padding-top: 5px;
      font-weight: 900;
    }
    .name_client {
      font-size: 8px;
      font-weight: 900;
      line-height: 10px;
      margin: 0;
  }
  
  .text_data {
      font-size: 8px;
  }
    .cli_art {
      padding-bottom: 2%;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      float: left;
      width: 100%;
      margin-top: 30px;
    }
    .client_art {
      height: 100px;
      background: #f7f0f0;
      width: 40%;
      float: left;
      margin-left: 5%;
      border-radius: 10px;
      margin-top: 15px;
    }
    .text_client {
      width: 50%;
      padding-left: 5px;
      color: #4e4e4e;
      font-size: 8pt;
      font-weight: bold;
    }
    .descrip_client {
      font-size: 7.5pt;
    padding: 5px;
      line-height: 1em;
    }
    .art_med {
      width: 100%;
      text-align: center;
      font-size: 9pt;
      background: #4e4e4e;
      margin-top: 10px;
      color: #ffffff;
      font-weight: bold;
    margin-bottom: 10px;
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
  thead.products__head {
      background: #0072c0;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
  }
  table tbody tr:nth-child(odd) {
    background: #ececec;
  }
  table tbody tr:nth-child(even) {
    background: #ffffff;
  }
  .last {
      font-size: 8px;
      line-height: 2em;
      color:#000;
  }
  .price {
      font-weight: bold;
      color: black;
      text-align: center;
  }
  .bold {
      color: #000;
      font-size: 9px;
  }
    .obser_art {
      width: 60%;
      background: #f7f0f0;
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
    .container_obsevations {
      width: 100%;
      float: left;
      margin-bottom: 10px;
  }
  
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
              <div class="art_cabezera">
              <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/PROMED_LOGO_BLANCO.png" class="img_log" />
                          </div>
              <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
              <span class="text_cot">Nº de Cotización:</span>
              <span class="va_art">${data.quoteInfo.folio}</span>
              <span class="text_date">Fecha:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
              </div>
              </div>
              </div>
              </div>
  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Cliente</div>
      <div class="descrip_client">
          <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
          <p class="text_data">${prospect.phone}</p>
          <p class="text_data">${prospect.email}</p>
          <p class="text_data">Vigencia de 1 día.</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Ejecutivo</div>
      <div class="descrip_client">
          <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
           <p class="text_data">${ejecutive.email}</p>
           <p class="text_data">${ejecutive.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
         
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${discount}</td>
                </tr>
          
                <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${total}</td>
                </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="container_obsevations"> 
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${quoteInfo.observations}
          </p>
      </div>
    </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paquetería, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guía se darán después del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html>
  `;
};

export const renderTemplateLifemedic = data => {
  let { prospect, products, total, ejecutive, subtotal, discount, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
        <tr  class="item last">
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.brand}</td>
        <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.amount
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.iva
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.total
        )}</td>
          <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
        </tr>
        `;
  });

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
  position: relative;
  
  }
  
  .box {
      width: 100%;
      margin: 0;
      padding: 0;
      z-index: 0;
      display: inline-block;
    }
    .art_cabezera {
      background: #ededed;
      width: 100%;
    }
    .logo {
      background: #115da9;
      width: 50%;
      float: left;
    }
  .img_log {
      width: 60%;
      margin-left: 20%;
      margin-top:10%;
       margin-bottom:10%;
    }
      .cot_art {
      width: 100%;
      float: left;
      background: #737474;
    }
    .art_cot {
      width: 36%;
      text-transform: uppercase;
      text-align: center;
      color: #d31718;
      font-size: 18pt;
      font-weight: bold;
      padding: 11px;
      float: right;
      margin-top: -10%;
    }
    .num_cot {
      width: 50%;
      float: right;
    }
    .text_cot {
      float: left;
      width: 35%;
      font-size: 7.5pt;
      color: white;
      padding: 5px;
      text-align: center;
      font-weight: bold;
    }
    .va_art {
      float: left;
      width: 20%;
      font-size: 7pt;
      color: white;
      padding: 5px;
      text-align: center;
      font-weight: 900;
    }
    .text_date {
      float: left;
      width: 15%;
      font-size: 7pt;
      color: white;
      padding: 5px;
      text-align: center;
      font-weight: 900;
      border-left: 1px solid #c2c1c2;
    }
    .va_texts {
      font-size: 7pt;
      float: left;
      color: white;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
     margin-top: 40px;
    }
    .client_art {
      height: 100px;
      width: 40%;
      float: left;
      margin-left: 5%;
      background: #fbf9f9;
    }
    .text_client {
      background: #115da9;
      text-transform: uppercase;
      width: 50%;
      padding: 5px;
      color: white;
      margin-left: 5px;
      margin-top: 0;
      font-size: 7pt;
      text-align: justify;
      font-weight: 900;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1em;
    }
    .art_med {
      background: #737474;
      width: 100%;
      text-align: center;
      font-size: 9pt;
      margin-top: 10px;
      color: #ffffff;
      font-weight: bold;
    }
    .name_client {
  font-size: 8px;
  font-weight: 900;
  line-height: 5px;
  margin: 0;
  }
  .text_data {
  font-size: 8px;
  line-height: 3px;
  }
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }
    
  table.products {
  border-spacing: 0;
  width: 100%;
  }
  
  thead.products__head {
  background: red;
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
  .tabs_products {
      margin-top: 10px;
      padding:10px;
  }
  .bold {
      font-size: 9px;
      color: #000;
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
    .obser_art {
      width: 60%;
      background: #ededed;
      float: left;
      margin-top: 3%;
      font-size: 7pt;
      padding-left: 5px;
      margin-left:10px;
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
      color: #000000;
      width: 100%;
      text-align: justify;
    }
    table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
  
              <div class="art_cabezera">
              <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/LIFEMEDIC_LOGO_BLANCO.png"  alt="logo lifemedic" class="img_log" />
                          </div>
              <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
              <span class="text_cot">Nº de Cotización:</span>
              <span class="va_art">${data.quoteInfo.folio}</span>
              <span class="text_date">Fecha:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
              </div>
              </div>
              </div>
              </div>
  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Cliente</div>
      <div class="descrip_client">
          <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
          <p class="text_data">${prospect.phone}</p>
          <p class="text_data">${prospect.email}</p>
          <p class="text_data">Vigencia de 1 día.</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Ejecutivo</div>
      <div class="descrip_client">
          <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
           <p class="text_data">${ejecutive.email}</p>
           <p class="text_data">${ejecutive.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
              
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${discount}</td>
                </tr>
           
                <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${total}</td>
                </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${quoteInfo.observations}
          </p>
      </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guia se daran despues del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html>
  `;
};

export const renderTemplateHelsemedical = data => {
  let { prospect, products, total, ejecutive, subtotal, discount, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
        <tr  class="item last">
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.brand}</td>
        <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.amount
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.iva
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.total
        )}</td>
          <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
        </tr>
        `;
  });
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
  position: relative;
  
  }
  .box {
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 0;
    display: inline-block;
    background: #f9f9f9;
  }
  .art-cabezera {
    background: #ededed;
    width: 100%;
  }
  .logo {
    width: 25%;
    float: left;
  }
  img.img_log {
    width: 100%;
    margin:10px;
  }
  .desc_art {
    display: none;
  }
  
  .cot_art {
    width: 20%;
    margin-right: 3%;
    margin-top: 0.5%;
    margin-right: 3%;
    float: right;
  }
  .art_cot {
    -webkit-transform: skew(20deg);
    width: 100%;
    background: #0e196f;
    text-align: center;
    color: white;
    font-size: 10pt;
    font-weight: bold;
    padding: 5px;
    float: left;
  }
  .num_cot {
    width: 100%;
    float: left;
  }
  .text_cot {
    display: none;
  }
  .va_art {
    background: #ffffff;
    float: left;
    width: 100%;
    font-size: 7pt;
    color: #e00209;
    padding: 5px;
    text-align: center;
    font-weight: 900;
  }
  .text_date {
    -webkit-transform: skew(20deg);
    background: #0e196f;
    float: left;
    width: 100%;
    font-size: 10pt;
    color: white;
    padding: 5px;
    text-align: center;
    font-weight: 900;
    border-left: 1px solid #c2c1c2;
  }
  .va_texts {
    text-align: center;
    background: #ffffff;
    width: 100%;
    font-size: 7pt;
    float: left;
    color: #e00209;
    padding-top: 5px;
    font-weight: 900;
  }
  .name_client {
  font-size: 8px;
  font-weight: 900;
  line-height: 10px;
  margin: 0;
  }
  .text_data {
  font-size: 8px;
  }
  .cli_art {
    width: 100%;
    margin-top: 40px;
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
    background: #0e196f;
    width: 50%;
    padding: 5px;
    color: white;
    margin-top: -10px;
    font-size: 9pt;
    text-align: center;
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
    color: #e00209;
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
  table.products {
  border-spacing: 0;
  width:100%;
  }
  thead.products__head {
  background: #0e196f;
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
  .obser_art {
    width: 60%;
    background: #ededed;
    float: left;
    margin-top: 3%;
    font-size: 7pt;
    margin-left:10px;
    padding-left: 5px;
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
  
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
  
              <div class="art_cabezera">
              <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/HELSEMEDICAL_LOGO.png" class="img_log" />
                          </div>
              <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
              <span class="text_cot">Nº de Cotización:</span>
              <span class="va_art">${data.quoteInfo.folio}</span>
              <span class="text_date">Fecha:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
              </div>
              </div>
              </div>
              </div>
  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Cliente</div>
      <div class="descrip_client">
          <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
                  <p class="text_data">${prospect.email}</p>
                  <p class="text_data">${prospect.phone}</p>
          <p class="text_data">Vigencia de 1 día.</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Ejecutivo</div>
      <div class="descrip_client">
          <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
           <p class="text_data">${ejecutive.email}</p>
           <p class="text_data">${ejecutive.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
               
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${discount}</td>
                </tr>
             
                <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${total}</td>
                </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${quoteInfo.observations}
          </p>
      </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guia se daran despues del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html>
  `;
};

export const renderTemplateChison = data => {
  let { prospect, products, total, subtotal, discount, ejecutive, quoteInfo, iva } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
        <tr  class="item last">
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.brand}</td>
        <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.amount
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.iva
        )}</td>
        <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          item.total
        )}</td>
          <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
        </tr>
        `;
  });
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
  position: relative;
  
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
      width: 25%;
      float: left;
    }
    .img_log {
      width: 100%;
      margin: 15px 0px 0 10px;
    }
    .desc_art {
      float: right;
      width: 48%;
    }
  
    .cot_art {
      width: 100%;
      float: left;
      margin-top: 5%;
    }
    .art_cot {
      width: 40%;
      background: #0f6db0;
      text-align: center;
      color: white;
      font-size: 12pt;
      font-weight: bold;
      padding: 5px;
      float: left;
    }
    .num_cot {
      width: 50%;
      float: left;
    }
    .text_cot {
      float: left;
      width: 35%;
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
      color: #0f6db0;
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
      color: #0f6db0;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
      margin-top: 30px;
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
    .name_client {
      margin: 0;
      font-weight: 900;
      color: black;
      font-size: 8px;
  }
    .text_client {
      background: #0f6db0;
      width: 50%;
      padding: 5px;
      color: white;
      margin-top: -10px;
      font-size: 9px;
      text-align: center;
      font-weight: bold;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1.5em;
    }
    .art_med {
      width: 100%;
      text-align: center;
      font-size: 9px;
      margin-top: 10px;
      color: #0f6db0;
      font-weight: bold;
    }
    .text_data {
      margin: 0;
      font-size: 8px;
      color:#000;
  }
  
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }
    .tabs_products {
      padding: 10px;
  }
  table.products {
      border-spacing: 0;
      width: 100%;
  }
  thead.products__head {
      background: #3d3d3d;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
  }
  table tbody tr:nth-child(odd) {
    background: #ececec;
  }
  table tbody tr:nth-child(even) {
    background: #ffffff;
  }
  .last {
      font-size: 8px;
      line-height: 2em;
      color:#000;
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
      background: #0f6db0;
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
    
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
  
              <div class="art_cabezera">
              <div class="logo"><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/logo_CHISON.png" class="img_log" />
                          </div>
              <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
              <span class="text_cot">Nº de Cotización:</span>
              <span class="va_art">${data.quoteInfo.folio}</span>
              <span class="text_date">Fecha:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
              </div>
              </div>
              </div>
              </div>
  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Cliente</div>
      <div class="descrip_client">
          <h5 class="name_client">${prospect.name} ${prospect.lastname}</h5>
          <p class="text_data">${prospect.phone}</p>
          <p class="text_data">${prospect.email}</p>
          <p class="text_data">Vigencia de 1 día.</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Ejecutivo</div>
      <div class="descrip_client">
          <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
           <p class="text_data">${ejecutive.email}</p>
           <p class="text_data">${ejecutive.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
            
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${discount}</td>
                </tr>
           
                <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${total}</td>
                </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${quoteInfo.observations}
          </p>
      </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guia se daran despues del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html>
  
  `;
};

export const renderTemplateCVJobs = data => {
  let { subtotal, prospect, products, total, discount, ejecutive, quoteInfo, iva, clientcompany } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
      <tr class="item last">
        <td class="bg_grey">
        ${item.code}
        </td>
        <td class="bg_white">
        ${item.quantity}
        </td>
        <td class="bg_grey">
        <p>${item.name}</p>
        <p class="color_description">${item.description}</p>
        </td>
        <td class="price bg_white">
        ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}
        </td>
        <td class="price bg_grey">
        ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}
        </td>
        <td class="price bg_white">MXN</td>
        <td class="bg_grey"> <p>${item.deliveryTime}</p>
          <p>${item.info}</p></td>
      </tr>
      `;
  });

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
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
  
      </style>
    </head>
    <body>
      <div class="container_template">
        <div class="box">
        </div>
        <div class="logo">
          <img
            src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/EFhvunyzusL6X2RDfNUcvNjJy/Iqybf_cvjobspng.png"
            class="img_log"
          />
          <p class="direction">
            Av. Paseo de la Reforma #250 cp 06600, Juarez, Cuahutemoc
          </p>
          <div class="art_cot">Cotización</div>
          <div class="num_cot">
            <p class="txt_cot1">Folio:</p>
            <p class="txt_cot2">${quoteInfo.folio}</p>
            <p class="txt_cot1">Fecha:</p>
            <p class="txt_cot2">${quoteInfo.date}</p>
            <p class="txt_cot1">Vigencia</p>
            <p class="txt_cot2">10 días</p>
          </div>
        </div>
        <div class="cli_art">
          <div class="client_art">
            <div class="title_business">Empresa</div>
            <div class="descrip_client">
              <p class="text_data1">Nombre de la empresa:</p>
              <p class="text_data2">${data.clientcompany?.companyname ? data.clientcompany?.companyname : "-"}</p>
              <p class="text_data1">RFC:</p>
              <p class="text_data2">
                ${clientcompany?.rfc ? clientcompany.rfc : "-"}
              </p>
              <p class="text_data1">Contacto:</p>
              <p class="text_data2 link">${prospect.name} ${prospect.lastname}</p>
              <p class="text_data1">Correo:</p>
              <p class="text_data2 link c_light_blue">${prospect?.email}</p>
              <p class="text_data1">Teléfono:</p>
              <p class="text_data2 link">${prospect?.phone}</p>
            </div>
          </div>
          <div class="client_art_executive">
            <div class="title_executive">Ejecutivo</div>
            <div class="descrip_client">
              <p class="text_data1">Nombre del Ejecutivo:</p>
              <p class="text_data2">${ejecutive.name} ${ejecutive.lastname}</p>
              <p class="text_data1">Teléfono:</p>
              <p class="text_data2">${ejecutive.phone}</p>
              <p class="text_data1">Email:</p>
              <p class="text_data2 link c_light_blue">${ejecutive.email}</p>
              <p class="text_data1">Página:</p>
              <p class="text_data2 link c_link_blue">http://www.cvjobs.com/</p>
            </div>
          </div>
        </div>
        <div class="prod_art">
          <div class="art_med">SERVICIO</div>
          <div class="tabs_products">
            <table class="products">
              <thead class="products__head">
                <tr class="products__headrow">
                  <th scope="col">Paquete</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Descripción de Paquete</th>
                  <th scope="col">P.Unitario</th>
                  <th scope="col">Importe total</th>
                  <th scope="col">Moneda</th>
                  <th scope="col">Nota</th>
                </tr>
              </thead>
              <tbody class="products__body">
                ${itemsProducts}
                <tr class="row_pink">
                  <td colspan="7"></td>
                </tr>
                <tr class="row_blue">
                  <td colspan="7">
                      <p class="title_observations">*OBSERVACIONES</p>
                      <p class="txt_observations">${quoteInfo.observations}</p>
                  </td>
                </tr>
                <tr class="row_div">
  
                </tr>
                <tr class="item total">
                  <td colspan="5"></td>
                  <td class="bold txt_right">Subtotal:</td>
                  <td class="bold">${subtotal}</td>
                </tr>
                <tr class="item total">
                  <td colspan="5"></td>
                  <td class="bold txt_right">Iva:</td>
                  <td class="bold">${iva}</td>
                </tr>
                <tr class="item total">
                  <td colspan="5"></td>
                  <td class="bold bgc_blue txt_right">Total:</td>
                  <td class="bold">${total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="obser_art">
          <div class="title_bank_data">Datos Bancarios para transferencia</div>
          <p class="text__bank_data">Banco:</p>
          <p class="text__bank_data">BBVA</p>
          <p class="text__bank_data">Cuenta:</p>
          <p class="text__bank_data">0118532834</p>
          <p class="text__bank_data">Clabe:</p>
          <p class="text__bank_data">012180001185328349</p>
        </div>
        <div id="pageFooter" class="footer"> 
          * Condiciones de pago de nuestros servicios<br />La cuenta bancaria esta
          a nombre de la razón social CV JOBS SA DE CV Método de pago:<br />1. Por
          transferencia electronica de fondos <br />2. Deposito en ventanilla
          <br />3. TARJETA DE CREDITO (Botón de pago) <br />Nota: La cuenta
          bancaria esta a nombre de la razon social de la compañía.(Verificar en
          su banca) Favor de notificar datos de facturacion a su ejecutivo, asi
          como enviar su comprobante de pago para validacion de contabilidad. La
          activacion puede tomar de 4 a 24 hrs segun el método de pago
        </div>
      </div>
    </body>
  </html>
  `;
};

export const renderTemplateOrder = (data, template) => {
  let itemsProducts = "";
  products.forEach((item, index) => {
    itemsProducts += `
    <tr class="item ${index === products.length - 1 ? "last" : ""}">
    <td>${item.name}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price)}</td>
  </tr>
    `;
  });

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
  font-size: 7px;
  color: #555;
  padding:5px;
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
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
     height: 760px;
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
      width: 25%;
      float: left;
    }
    .img_log {
      width: 100%;
      margin: 15px 0px 0 10px;
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
      margin-top: 5%;
    }
    .art_cot {
      width: 40%;
      background: #03aed2;
      text-align: center;
      color: white;
      font-size: 12pt;
      font-weight: bold;
      padding: 5px;
      float: left;
    }
    .num_cot {
      width: 50%;
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
      color: #03aed2;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
      margin-top: 30px;
    }
    .client_art {
      width: 40%;
      float: left;
      margin-left: 5%;
      background: #ededed;
      border-radius: 10px;
      margin-top: 15px;
      height: 291px;
    }
    .name_client {
      margin: 0;
      font-weight: 900;
      color: black;
      font-size: 8px;
  }
    .text_client {
      background: #03aed2;
      width: 50%;
      padding: 5px;
      color: white;
      margin-top: -10px;
      font-size: 9px;
      text-align: center;
      font-weight: bold;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1.5em;
    }
    .art_med {
      width: 100%;
      text-align: center;
      font-size: 9px;
      margin-top: 10px;
      color: #03aed2;
      font-weight: bold;
    }
    .text_data {
      margin: 0;
      font-size: 8px;
      color:#000;
  }
  
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }
    .tabs_products {
      padding: 10px;
  }
  table.products {
      border-spacing: 0;
      width: 100%;
  }
  thead.products__head {
      background: #3d3d3d;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
  }
  table tbody tr:nth-child(odd) {
      background: #ececec;
  }
  table tbody tr:nth-child(even) {
      background: #ffffff;
  }
  .last {
      font-size: 8px;
      line-height: 2em;
      color:#000;
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
    .obser_art {
      width: 40%;
      background: #ededed;
      float: left;
      margin-top: 3%;
      font-size: 7pt;
      padding-left: 5px;
      margin-left: 10px;
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
  }
  </style>
  </head>
  
  <body>
      <div class="container_template">

  <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Dirección de envio</div>
      <div class="descrip_client">
          <h5 class="name_client">Recibe:${data.receive}</h5>
          <p class="text_data">Calle y N°: ${data.adress.street} ${data.int_number}</p>
          <p class="text_data">Colonia: ${data.adress.settlement}</p>
          <p class="text_data">C.P:${data.adress.postal}</p>
          <p class="text_data">Delegación/ Municipio:${data.adress.city}.</p>
          <p class="text_data">Estado:${data.adress.entity}.</p>
          <p class="text_data">Teléfono:${data.adress.phone}.</p>
          <p class="text_data">Referencias:${data.adress.references}</p></div>
      </div>
      <div class="client_art">
      <div class="text_client">Datos de Facturación</div>
      <div class="descrip_client">
      <h5 class="name_client">Razón Social:${data.adressBilling.billingbusiness}</h5>
      <p class="text_data">RFC:${data.adressBilling.rfc}</p>
      <p class="text_data">Calle y N°:${data.adressBilling.street}</p>
      <p class="text_data">Colonia:${data.adressBilling.settlement}</p>
      <p class="text_data">C.P:${data.adressBilling.postal}</p>
      <p class="text_data">Delegación/ Municipio:${data.adressBilling.city}</p>
      <p class="text_data">Estado:${data.adressBilling.entity}</p>
      <p class="text_data">Uso de CFDI:${data.adressBilling.cfdi}</p>
      <p class="text_data">Metodo de Pago:${data.adressBilling.methodPayment}</p>
      <p class="text_data">Forma de Pago:${data.adressBilling.wayPayment}</p>
      <p class="text_data">Teléfono:${data.adressBilling.phone}</p>
      </div>
      </div>
      </div>
      <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
              <table class="products">
                  <thead class="products__head">
                      <tr class="products__headrow">
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
  
                  <tbody class="products__body">
                  ${itemsProducts}
             
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Descuento</td>
                  <td class="bold">${data.descuento}</td>
                </tr>
                  <tr class="item total">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="bold">Total</td>
                  <td class="bold">${data.total}</td>
              </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="obser_art">
        <div class="text_client">Observaciones</div>
          <p class="text_note">
              ${data.observations}
          </p>
      </div>
      <div id="pageFooter" class="footer"> *Precio sujeto a cambio sin previo aviso *Las existencias de los
          equipos
          son salvo venta, una vez confirmado el
          pedido no se aceptan cambios o
          devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
          por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
          de la compra y el reembolso se realiza
          30 días hábiles posteriores a la
          cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
          ventas, es indispensable enviar el comprobante de pago para tramitar el
          pedido de los equipos solicitados. *Cuando el equipo sea enviado por
          paquetería, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guía se darán después del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html> `;
};

export const renderTemplateSolutions = data => {
  let { prospect, products, total, ejecutive, subtotal, discount, quoteInfo, iva, observations } = data;
  let itemsProducts = "";
  products.forEach((item, index) => {
    itemsProducts += `
    <tr class="item ${index === products.length - 1 ? "last" : ""}">
    <td>${item.code}</td>
    <td>${item.quantity}</td>
    <td>${item.brand}</td>
    <td>${item.name}</td>
    <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}</td>
    <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.iva)}</td>
    <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}</td>
    <td>
        <p>${item.deliveryTime}</p>
        <p>${item.info}</p>
    </td>
  </tr>
    `;
  });
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
        margin: 0;
      }
      .footer {
        text-align: justify;
        font-size: 8px;
        color: #000;
        line-height: 1em;
        margin: 5px;
      }
      #pageFooter {
        margin-top: 10px;
        font-size: 8px;
        color: #000;
        width: 98%;
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
        top: 275px;
        left: 190px;
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
        margin-top:-20px;
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
        font-size: 30px;
        font-weight: bold;
        padding: 5px;
        float: left;
      }
      .sub {
        margin-top: 11px;
        height: 8px;
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
        height: 120px;
      }
      .name_client {
        color: black;
        font-size: 14px;
      }
      .text_client {
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
      .products__headrow{
        text-align:center;
        font-size: 11px;
        font-weight:100;
      }
      table tbody tr:nth-child(odd) {
        background: #d6e5ec;
        color: #000;
      }
      table tbody tr:nth-child(even) {
        background: #2f99cc;
        color: #000;
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
        color: #000;
        font-size: 10px;
        font-weight: 900;
        text-align: right;
        width:80px;
      }
      .subtitle_subtotal {
        font-size: 10px;
        margin-left: 3px;
        font-weight: bold;
        background-color: #d6e5ec;
        color: #000;
        padding: 0px 10px;
      }
      .title_total {
        height: fit-content;
        padding-left: 40px;
        font-size: 10px;
        font-weight: 900;
        background-color: #000;
        color: #fff;
      }
      .subtitle_total {
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
     
      </style>
      </head>
      <body>
      <div class="container_template">
      <div class="box">
        <div class="art_cabezera">
          <div class="logo">
            <img
              class="img_log"
              src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/E62dAxhxdX84p2camHNVOOu7d/YGrmd_shpng.png"
            />
            <img
              class="bg_img"
              src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/62dz3qnimTqzfPfKpt7JtOtE/G62djqtmbXxhqx70ksMpspJ22/E62dAxhxdX84p2camHNVOOu7d/HKmMH_bgshpng.png"
            />
          </div>
          <div class="cot_art">
            <div class="art_cot">COTIZACIÓN</div>
            <div class="num_cot">
              <span class="text_date">FECHA:</span>
              <span class="va_texts">${data.quoteInfo.date}</span>
            </div>
            <div class="art_cot sub"></div>
            <div class="num_cot">
              <span class="text_date">DE COTIZACIÓN:</span>
              <span class="va_texts">${data.quoteInfo.folio}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cli_art">
        <div class="client_art">
          <div class="text_client">CLIENTE:</div>
          <div class="descrip_client">
            <h5 class="name_client">
              ${prospect.name} ${prospect.lastname}
            </h5>
            <p class="text_data">${prospect.email ? prospect.email : "N/A"}</p>
            <p class="text_data">${prospect.phone ? prospect.phone : "N/A"}</p>
          </div>
        </div>
        <div class="client_art">
          <div class="text_client">EJECUTIVO:</div>
          <div class="descrip_client">
            <h5 class="name_client">
              ${ejecutive.name} ${ejecutive.lastname}
            </h5>
            <p class="text_data">${ejecutive.email ? ejecutive.email : "N/A"}</p>
            <p class="text_data">${ejecutive.phone ? ejecutive.phone : "N/A"}</p>
          </div>
        </div>
      </div>
      <div class="prod_art">
        <div class="art_med">PRODUCTOS</div>
        <div class="tabs_products">
          <table class="products">
            <thead class="products__head">
              <tr class="products__headrow">
                <th scope="col">ID</th>
                <th scope="col">CANT</th>
                <th scope="col">MARCA</th>
                <th scope="col">DESCRIPCIÓN</th>
                <th scope="col">P.UNITARIO</th>
                <th scope="col">IVA</th>
                 <th scope="col">SUBTOTAL</th>
              </tr>
            </thead>

            <tbody class="products__body">
             ${itemsProducts}
            </tbody>
          </table>
        </div>
        <table class="div_totals">
            <tr>
              <td class="title_subtotal">SUBTOTAL:</td>
              <td class="subtitle_subtotal">${subtotal}</td>
            </tr>
              <tr>
              <td class="title_subtotal">IVA:</td>
              <td class="subtitle_subtotal">${iva}</td>
            </tr>
            <tr>
              <td class="title_total">TOTAL:</td>
              <td class="subtitle_total">${total}</td>
            </tr>
        </table>
      </div>
      <div class="obser_art">
        <div class="title_bank_data">Observaciones generales</div>
        <p class="obs">${quoteInfo.observations}</p>
      </div>
      <div id="pageFooter" class="footer">
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
      </body>
  </html>`;
};

export const renderTemplateMaxrei = data => {
  let { ejecutive, products, total, prospect, subtotal, quoteInfo } = data;
  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
      <tr class="item last">
      <td>${item.code}</td>
      <td>${item.quantity}</td>
      <td>${item.brand}</td>
      <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
        item.amount
      )}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.iva)}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
        item.total
      )}</td>
        <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
      </tr>
      `;
  });

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
      body {
  margin:0;
  }
  #pageFooter {
    font-size: 8px;
    color: #555;
    width: 100%;
    float: left;
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
    font-family: Times, serif;
    color: #555;
    height: 100%;
    position: relative;
  }
    .box {
      width: 100%;
      margin: 0;
      padding: 0;
      z-index: 0;
      display: inline-block;
    }
    .art_cabezera {
      background: #ededed;
      width: 100%;
    }
    .logo {
      width: 25%;
      float: left;
    }
    .img_log {
      width: 60%;
      margin-left: 20%;
      margin-top: 10%;
      margin-bottom: 10%;
    }
    .desc_art {
      display: none;
    }
    .cot_art {
      width: 100%;
      float: left;
      background: #000;
    }
    .art_cot {
      width: 50%;
      text-transform: uppercase;
      text-align: center;
      color: #e6b047;
      font-size: 18pt;
      font-weight: bold;
      padding: 11px;
      float: right;
      margin-top: -10%;
    }
    .num_cot {
      width: 50%;
      float: right;
    }
    .text_cot {
      float: left;
      width: 35%;
      font-size: 7.5pt;
      color: white;
      padding: 5px;
      text-align: center;
      font-weight: bold;
    }
    .va_art {
      float: left;
      width: 20%;
      font-size: 7pt;
      color: white;
      padding: 5px;
      text-align: center;
      font-weight: 900;
    }
    .text_date {
      float: left;
      width: 15%;
      font-size: 7pt;
      color: white;
      padding: 5px;
      text-align: center;
      font-weight: 900;
      border-left: 1px solid #c2c1c2;
    }
    .va_texts {
      font-size: 7pt;
      float: left;
      color: white;
      padding-top: 5px;
      font-weight: 900;
    }
    .cli_art {
      width: 100%;
      margin-top: 40px;
    }
    .client_art {
      height: 100px;
      width: 40%;
      float: left;
      margin-left: 5%;
      background: #fbf9f9;
    }
    .text_client {
      background: #e6b047;
      text-transform: uppercase;
      width: 50%;
      padding: 5px;
      color: white;
      margin-left: 5px;
      margin-top: 0;
      font-size: 7pt;
      text-align: justify;
      font-weight: 900;
    }
    .descrip_client {
      font-size: 7.5pt;
      padding: 10px;
      line-height: 1em;
    }
    .art_med {
      background: #000;
      width: 100%;
      text-align: center;
      font-size: 9pt;
      margin-top: 10px;
      color: #ffffff;
      font-weight: bold;
    }
    .name_client {
      font-size: 8px;
      font-weight: 900;
      line-height: 5px;
      margin: 0;
    }
    .text_data {
      font-size: 8px;
      line-height: 2em;
    }
    .prod_art {
      margin-top: 2%;
      width: 100%;
      float: left;
    }

    table.products {
      border-spacing: 0;
      width: 100%;
      border-spacing: 1px;
    }

    thead.products__head {
      background: #000;
      color: white;
      font-weight: bold;
      text-align: justify;
      font-size: 9px;
      border-left: 1px solid #ffffff;
    }

    table tbody tr:nth-child(odd) {
      background: #f9f9f9;
    }
    table tbody tr:nth-child(even) {
      background: #ececec;
    }
    .products {
      border-collapse: separate;
      border-spacing: 5px;
    }
    .tabs_products {
      margin-top: 10px;
      padding: 10px;
    }
    .disc {
      font-size: 9px;
      color: #000;
    }
    .last {
      font-size: 8px;
      line-height: 2em;
      color: #000;
    }
    .price {
      color: black;
      text-align: center;
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
      color: #000000;
      width: 100%;
      text-align: justify;
    }
    table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
    .div_totals {
      display: flex;
      justify-content: flex-end;
      display: -moz-flex;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      -moz-justify-content: flex-end;
      -webkit-justify-content: flex-end;
      -ms-justify-content: flex-end;
      justify-content: flex-end;
    }
        </style>
      </head>
      <body>

            <div class="container_template">
        <div class="box">
          <div class="art_cabezera">
            <div class="logo">
              <img
                src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/e33P8_mexrei.png"
                class="img_log"
              />
            </div>
            <div class="cot_art">
              <div class="art_cot">Cotización</div>
              <div class="num_cot">
                <span class="text_cot">Nº de Cotización:</span>
                <span class="va_art">${data.quoteInfo.folio}</span>
                <span class="text_date">Fecha:</span>
                <span class="va_texts">${data.quoteInfo.date}</span>
                </div>
            </div>
          </div>
        </div>
        <div class="cli_art">
          <div class="client_art">
            <div class="text_client">Cliente</div>
            <div class="descrip_client">
            <h5 class="name_client">
              ${prospect.name} ${prospect.lastname}
            </h5>
            <p class="text_data">${prospect.email ? prospect.email : "N/A"}</p>
            <p class="text_data">${prospect.phone ? prospect.phone : "N/A"}</p>
          </div>
          </div>
          <div class="client_art">
            <div class="text_client">Ejecutivo</div>
            <div class="descrip_client">
            <h5 class="name_client">
              ${ejecutive.name} ${ejecutive.lastname}
            </h5>
            <p class="text_data">${ejecutive.email ? ejecutive.email : "N/A"}</p>
            <p class="text_data">${ejecutive.phone ? ejecutive.phone : "N/A"}</p>
          </div>
          </div>
        </div>
        <div class="prod_art">
          <div class="art_med">PRODUCTOS</div>
          <div class="tabs_products">
            <table class="products">
              <thead class="products__head">
                <tr class="products__headrow">
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

              <tbody class="products__body">
              ${itemsProducts}

              </tbody>
            </table>
          </div>
          <table class="div_totals">         
          <tr>
            <td class="title_total">TOTAL:</td>
            <td class="subtitle_total">${total}</td>
          </tr>
      </table>
        </div>
        <div class="obser_art">
          <div class="text_client">Observaciones</div>
          <p class="text_note">${quoteInfo.observations}</p>
        </div>
        <div id="pageFooter" class="footer">
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
      </body>
  </html>`;
};
export const renderTempleteMbhHealthCare = data => {
  let { ejecutive, products, total, prospect, subtotal, quoteInfo, discount } = data;

  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
    <tr class="item last">
    <td>${item.code}</td>
    <td>${item.quantity}</td>
    <td>${item.brand}</td>
    <td>${item.note ? item.name + "(" + item.note + ")" : item.name}</td>
    <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}</td>
    <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.iva)}</td>
    <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}</td>
       <td>
          <p>${item.deliveryTime}</p>
          <p>${item.info}</p>
      </td>
    </tr>
    `;
  });

  return `<!DOCTYPE html>

  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="output.css" />
      
      <style>
          body {
              margin: 0;
          }
  
          #pageFooter {
              font-size: 8px;
              color: #555;
              width: 100%;
              float: left;
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
              border: 1px solid #eee0;
              font-size: 12px;
              line-height: 14px;
              font-family: Times, serif;
              color: #555;
              height: 100%;
              position: relative;
          }
  
          .box {
              width: 100%;
              margin: 0;
              padding: 0;
              z-index: 0;
              display: inline-block;
          }
  
          .art_cabezera {
              width: 100%;
          }
  
          .img_log2 {
              width: 100%;
              position: relative;
          }
  
          .img_log {
              width: 27%;
              position: absolute;
              top: -37px;
              left: 0;
              right: 0;
              margin: 0px auto;
          }
  
          .cli_art {
              width: 100%;
              margin-top: 10px;
          }
  
          .client_art {
              height: 100px;
              width: 40%;
              float: left;
              margin-left: 5%;
          }
  
          .name_client {
              font-size: 8px;
              font-weight: 900;
              margin: 0;
              background: #d9d9d9;
              padding: 3px;
              width: 100%;
          }
  
          .text_data {
              font-size: 8px;
          }
  
          .text_dataPar {
              font-size: 8px;
              background: #f2f2f2;
              padding: 3px;
              width: 100%;
              margin: 0px;
          }
  
          .text_dataParDate {
              font-size: 8px;
              background: #f2f2f2;
              padding: 3px;
              width: 70%;
              margin: 0px;
          }
  
          .titleContainerdate {
              font-size: 8px;
              background: #f2f2f2;
              padding: 3px;
              width: 70%;
              margin: 0px;
          }
  
          .text_dataParNone {
              font-size: 8px;
              background: #f2f2f2;
              padding: 3px;
              width: 70%;
              margin: 0px;
          }
  
          .text_client {
              font-size: 7pt;
              text-align: justify;
              font-weight: 900;
              color: #2769ae;
          }
  
          .personContainer {
              display: -webkit-box;
              display: flex;
              -webkit-box-pack: center;
              justify-content: center;
              width: 100%;
              margin: 0px
          }
  
          .containerTiltes {
              width: 44px;
              margin: 0;
              display: flex;
              align-items: center;
          }
         
          .titleQuote {
              font-size: 8px;
              margin: 0;
              color: #005b9f;
              font-weight: 900;
              margin: 0;
              width: 20%;
          }
  
          .text_dataNone {
              font-size: 8px;
              background: #d9d9d9;
              padding: 3px;
              width: 70%;
              margin: 0;
          }
  
          .text_dataNonePhone {
              font-size: 8px;
              background: #d9d9d9;
              padding: 3px;
              width: 100%;
              margin: 0;
          }
  
          .titleContainer {
              display: flex;
              min-width: 50px;
          }
  
          .prod_art {
              margin-top: 2%;
              width: 100%;
              float: left;
          }
  
          table.products {
              border-spacing: 0;
              width: 100%;
              border-spacing: 1px;
          }
  
          thead.products__head {
              color: #005b9f;
              font-weight: bold;
              text-align: center;
              font-size: 9px;
              border-left: 1px solid #ffffff;
          }
  
          table tbody td:nth-child(odd) {
              background: #d9d9d9;
          }
  
          table tbody td:nth-child(even) {
              background: #f2f2f2;
          }
  
          table tr:nth-child(even) {
              background-color: #f9f9f9;
          }
  
          thead.products__foot {
              background: #000;
              color: white;
              font-weight: bold;
              text-align: justify;
              font-size: 9px;
              border-left: 1px solid #ffffff;
          }
  
          .products {
              border-collapse: separate;
              border-spacing: 5px;
          }
  
          .tabs_products {
              margin-top: 1px;
              padding: 10px;
          }
  
          .disc {
              font-size: 9px;
              color: #000;
          }
  
          .last {
              font-size: 8px;
              line-height: 2em;
              color: #000;
          }
  
          .price {
              color: black;
              text-align: center;
          }
  
          .footers {
              background-color: #005b9f;
              color: white;
              text-align: center;
              padding: 3px;
          }
  
          .obser_art {
              background: #ddebf7;
              margin-top: 3%;
              font-size: 7pt;
              padding-left: 5px;
              text-align: justify;
              height: 100px;
              width: 35%;
              float: left;
              margin-left: 4%;
          }
  
          .text_note {
              color: #2769ae;
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
          .contaierTotal {
            display: -webkit-box; 
            display: flex;
            -webkit-box-pack: center; 
            justify-content: center;
            min-width: 100%;
          }
          .total_art {
              margin-top: 3%;
              font-size: 7pt;
              padding-left: 5px;
              text-align: justify;
              height: 100px;
              width: 35%;
              float: left;
              margin-left: 20%;
          }
          .total {
          background: #005b9f;
          width: 20%;
          height: 25px;
          margin:0;
        }
        .text_total {
          width: 82%;
          height: 25px;
          padding-left: 2px;
          background: #ddebf7;
          display: flex;
          align-items: inherit;
          font-weight: 900;
          text-align: left;
          text-transform: uppercase;
          margin:0;
          color:#005b9f;
        }
        .text_discount {
          background: #f2f2f2;
          margin: 0;
          padding: 3px;
          width: 100%;
          color:#005b9f;
      }
      </style>
  </head>
  
  <body>
      <div class="container_template">
          <div class="box">
              <div class="art_cabezera">
                  <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/COTIZADOR_MBH3.png" class="img_log2" />
              </div>
          </div>
          <div class="cli_art">
              <div class="client_art">
  
                  <h5 class="name_client">${ejecutive.name} ${ejecutive.lastname}</h5>
                  <p class="text_dataPar">${ejecutive.email}</p>
                  <p class="text_dataNonePhone">${ejecutive.phone}</p>
  
              </div>
  
              <div id="login" class="client_art">
  
                  <div class="personContainer">
                      <p class="titleQuote">Folio:</p>
                      <p class="text_dataNone">${data.quoteInfo.folio}</p>
                  </div>
                  <div class="personContainer">
                      <p class="titleQuote">Fecha:</p>
                      <p class="text_dataParDate">${data.quoteInfo.date}</p>
                  </div>
                  <div class="personContainer">
                      <p class="titleQuote">Vigencia</p>
                      <p class="text_dataNone">1 día.</p>
                  </div>
  
              </div>
          </div>
  
          <div class="prod_art">
              <div class="tabs_products">
                  <table class="products">
                      <thead class="products__head">
                          <tr class="products__headrow">
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
  
                      <tbody class="products__body">
                          ${itemsProducts}
                      </tbody>
                  </table>
                  <div class="footers">
                      <p></p>
                  </div>
              </div>
          </div>
          <div class="obser_art">
              <div class="text_client">Observaciones</div>
              <p class="text_note"> ${quoteInfo.observations}</p>
          </div>
           <div class="total_art">
            <p class="text_discount">Descuento: ${discount}</p>
            <div class="contaierTotal">
              <p class="total"></p>
              <p class="text_total">Total: ${total}</p>
            </div>
          </div>
  
  
          <div id="pageFooter" class="footer">
              *Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación solicitarse por escrito y enviarse por correo a su ejecutivo de ventas,
              se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar
              el pedido de los equipos solicitados. *Cuando el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la compra al tipo
              de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.
          </div>
      </div>
  </body>
  
  </html>`;
};

export const renderTemplateTabulator = data => {
  let { quotes, cotization } = data;

  const renderContent = option => {
    let styleName = "";
    let secondStyle = "";
    if (option === "lapse") styleName = "blue";
    if (option === "pendingpayments") styleName = "blue_light_table td_center";
    if (option === "initialpayment") styleName = "td_initialpayment";
    if (option !== "lapse" && option !== "pendingpayments") secondStyle = "td_border";
    let renderContent = "";
    quotes.forEach((item, index) => {
      renderContent += `
      <td class="${styleName} ${secondStyle} ${validateStyle(option, index)}">
      ${option === "lapse" || option === "pendingpayments" ? item[option] : pesoMXN(item[option])} 
        ${option === "lapse" ? "meses" : ""}
      </td>
      `;
    });
    return renderContent;
  };

  const validateStyle = (option, index) => {
    if (option === "lapse" && index === 4) return "green";
    if (option === "pendingpayments" && index === 4) return "green";
  };

  const pesoMXN = amount => {
    return amount?.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
  };
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link href="tabulador.css" rel="stylesheet"> -->
    <style>
    body {
      margin:0;
      }
        @page {
            size: A4;
            margin: 0;
        }

        .container_template {
          padding:19px;
          max-width: 800px;
          margin: auto;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 8px;
          line-height: 14px;
          font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
          color: #555;
          height: 760px;
          position: relative;
            background-image: url("tabulator_background.png");
        }

        .header {
            margin-top: 60px;
            margin-bottom: 10px;
        }

        .date {
            display: flex;
            text-align:right;
            width: 100%;
        }

        .title {
            border-bottom:1px solid;
            width:147px;
            margin-bottom:7px;
        }

        .subtitle {
            margin-top: -10px;
            border-top:1px solid;
            width:147px;
        }

        .body {
            margin-bottom: 10px;
        }

        .title_body {
            margin-bottom: 10px;
        }

        .info {
            line-height: 10px;
            margin-bottom: 15px;
        }

        .resumen_totals {
          width: 100%;
          margin-bottom: 10px;
          display: -moz-flex;
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
        }

        .titles_totals {
            width:30%;
        }
        .title_to {
            margin-bottom: 8px;
        }
        .data_totals {
            width:30%;
        }
        .title_dat {
          text-align:center;
          width:100px;
          padding: 0px 20px;
          margin-bottom: 8px;
      }

        .content_quotes {
            margin-bottom: 10px;
            padding: 0px 15px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            padding: 1px;
        }

        .table_head {}

        .table_body {}

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
        }

        .start_row {}

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

        .terms {
            width: 100%;
            margin-bottom: 10px;
            padding-left: 25px;
        }

        .terms_title {
            margin-left: -25px;
            font-weight: bold;
        }

        .text_terms {
            font-size: 7px;
            width: 94%;
            margin-top: -8px;
            border-bottom: 1px solid #c0c0c0;
        }

        .warnings {
            width: 100%;
            margin-bottom: 10px;
            padding-left: 25px;
        }

        .warnings_title {
            margin-left: -25px;
            font-weight: bold;
        }

        .text_warnings {
           font-size: 7px;
            width: 94%;
            margin-top: -8px;
            border-bottom: 1px solid #c0c0c0;
        }

        .divider {
            width: 94%;
            margin-top: 20px;
            margin-bottom: 10px;
            padding: 2px;
            border-bottom: 1px solid #c0c0c0;
        }

        .firms {
            width: 94%;
            display: -moz-flex;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            margin-bottom: 10px;
        }

        .first_firm {
          width:100%;
          padding: 0px 30px;
        }

        .second_firm {
          width:100%;
          padding: 0px 30px;
        }

        .firm {
            text-align:center;
            width:100%;
            height:60px;
            background-color: #f2f2f2;
            font-size: 7px;
            font-weight: bold;
        }
        .firm_title{
          margin-top:-20px;
          font-size: 7px;
          font-weight: bold;
          text-align:center;
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

        .bold {
            font-weight: bold;
        }

        .footer {
            width: 94%;
            border-top: 2px solid #366092;
            display: flex;
            justify-content: center;
        }
        .title_footer {
          margin-top:-2px;
          text-align:center;
        }
    </style>
</head>

<body>
    <div class="container_template">
        <div class="header">
            <p class="date">${cotization.date}</p>
            <p class="title">Propuesta Económica</p>
            <p class="subtitle">
                <span class="bold">CRÉDITO</span> - VASA FINANCIAMIENTOS
            </p>
        </div>
        <div class="body">
            <p class="title_body bold">Estimado DOCTOR</p>
            <p class="info">
                Le enviamos la presente cotización, la cual fue preparada y estructurada especialmente para usted.
                Apreciamos la oportunidad que nos brinda de presentarle ésta propuesta y estamos a sus órdenes para
                atender
                cualquier duda o comentario sobre la misma.
            </p>
            <div class="resumen_totals">
                <div class="titles_totals">
                    <p class="title_to bold">Equipo a arrendar</p>
                    <p class="title_to">Precio del equipo</p>
                    <p class="title_to">Enganche</p>
                    <p class="title_to bold">Monto del crédito</p>
                </div>
                <div class="data_totals">
                    <p class="title_dat">EQUIPO</p>
                    <p class="title_dat">
                      ${pesoMXN(cotization.amount)}
                    </p>
                    <p class="title_dat">
                      ${pesoMXN(cotization.downpayment)}
                    </p>
                    <p class="title_dat blue_light bold">
                      ${pesoMXN(cotization.credit)}
                    </p>
                </div>
            </div>
            <div class="content_quotes">
                <table class="table">
                    <thead class="table_head"></thead>
                    <tbody class="table_body">
                        <tr class="tr_top">
                            <td class="start_row">Plazo</td>
                            ${renderContent("lapse")}
                        </tr>
                        <tr class="tr_second"></tr>
                        <tr class="tr_space"></tr>
                        <tr></tr>
                        <tr>
                            <td>Comisión de Apertura</td>
                            ${renderContent("commision")}
                        </tr>
                        <tr>
                            <td>1era mensualidad</td>
                           ${renderContent("firstmonth")}
                        </tr>
                        <tr>
                            <td>Enganche</td>
                            ${renderContent("downpayment")}
                        </tr>
                        <tr class="tr_initialpayment">
                            <td class="blue_bold">Total del pago inicial</td>
                           ${renderContent("initialpayment")}
                        </tr>
                        <tr></tr>
                        <tr class="tr_doublespace"></tr>
                        <tr></tr>
                        <tr>
                            <td>Mensualidades restantes</td>
                           ${renderContent("pendingpayments")}
                        </tr>
                        <tr>
                            <td>Pago Mensual</td>
                           ${renderContent("amount")}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="terms">
                <p class="terms_title">Términos y Condiciones</p>
                <p class="text_terms"></p>
                <p class="text_terms">
                    El pago inicial deberá liquidarse a la firma del contrato. La primera de las mensualidades restantes
                    a los
                    30 días
                </p>
                <p class="text_terms">
                    Si no hay enganche, el cliente deberá liquidar la primera mensualidad a la firma del contrato
                </p>
                <p class="text_terms">Montos, tasas y precios pueden variar sin previo aviso</p>
                <p class="text_terms">
                    Mensualmente se facturan los intereses y el IVA de éstos. Las aportaciones a capital se mencionarán
                    en
                    cada factura
                </p>
                <p class="text_terms">Los pagos mensuales ya incluyen el IVA de los intereses</p>
                <p class="text_terms">
                    La información presentada en esta cotización es de carácter informativo y tiene una vigencia de 10
                    días{" "}
                </p>
            </div>
            <div class="warnings">
                <p class="warnings_title">Advertencias:</p>
                <p class="text_warnings"></p>
                <p class="text_warnings">Ningún pago al proveedor garantiza que el arrendamiento será aprobado</p>
                <p class="text_warnings">
                    Contratar arrendamientos por arriba de sus capacidades de pago puede afectar su historial
                    crediticios
                </p>
                <p class="text_warnings">
                    Incumplir sus obligaciones les puede generar gastos de cobranza y la aplicación de la tasa de
                    interés
                    moratorio
                </p>
                <div class="divider" />
            </div>
            <div class="firms">
                <div class="first_firm">
                    <p class="firm"></p>
                    <p class="firm_title">FIRMA Y ACEPTACIÓN</p>
                </div>
                <div class="second_firm">
                    <p class="firm"></p>
                    <p class="firm_title">PLAZO SOLICITADO</p>
                </div>
            </div>
            <div class="footer">
                
            </div>
        </div>
    </div>
</body>

</html>
  `;
};

export const renderTemplateOlakino = data => {
  let { subtotal, products, total, discount, iva } = data;

  let itemsProducts = "";

  // Datos del primer cuadro STARKET
  let orderDate = "";
  let estimatedDeliveryDate = "";
  let attended = "";
  let paymentCondition = "";
  let phoneStarket = "";

  // Datos fiscales
  let taxDataName = "OLAKINO MEDICAL SA DE CV";
  let taxDataRFC = "OME2009181Q2";
  let taxDataContact = "";
  let taxDataAddress = "";
  let taxDataPhone = "";
  let taxDataEmail = "";

  //Tabla
  let tableAmount = "";
  let tableDiscount = discount;
  let tableSubTotal = subtotal;
  let tableIVA = iva;
  let tableTotal = total;

  // Datos Footer
  let observationsBoldFont = "";
  let observations = {
    deliveryTime:
      "La entrega del equipo se realizará el 01 DE JUNIO DEL 2023 ; en caso de incumplimiento el proveedor le pagará a Comercializadora y Distribuidora MB, S.A. de C.V., daños y perjuicios.",
    deliveryPlace:
      "La entrega del equipo se hará en el domicilio ubicado en: NOSOTROS RECOGEMOS .. , junto con la capacitación correspondiente.",
    nonCompliance:
      "ComercializadorayDistribuidoraMB,S.A.deC.V.,quedafacultadaparademandarantelasautoridadescorrespondienteselresarcimientodedañosyperjuiciosqueseocasionenporincumplimientodelproveedor.Asimismo,endichocaso,elproveedor deberá devolver el total de los pagos que Comercializadora y Distribuidora MB, S.A. de C.V., le hubiese realizado por la compra del equipo.",
    penaltyClause:
      "Paraelcasodeincumplimientodelproveedor,éstelepagaráaComercializadorayDistribuidoraMB,S.A.deC.V.,unapenaconvencionalporlacantidadequivalenteal25%(veinticincoporciento)delpreciototaldecompra-venta.Ademásdelapenayaseñalada,elproveedordeberárestituirtodaslascantidadespagadasporComercializadorayDistribuidoraMB,S.A.deC.V.,obligándoseelproveedorarealizartalrestitucióndentrodelos30(treinta)díasnaturalessiguientesalafechaenque ocurrió el incumplimiento. En caso de que no se restituyeren dichas cantidades dentro del plazo establecido, el proveedor deberá pagar un interés del 5% (cinco por ciento) por cada día transcurrido de retraso en la restitución.",
    jurisdiction:
      "Paracualquiertipodecontroversiaquesesuscite,laspartessesometenexpresaytácitamenteantelosTribunalesdelmunicipiodeNaucalpandeJuárez,EstadodeMéxico,renunciandoacualquierotrofueroqueenrazóndesudomiciliopresenteo futuro o cuantía, pudiera corresponderles.",
  };
  let deliver = "SUC. HELSE";
  let textDeliver = "NOSOTROS RECOGEMOS";
  let authorized = "Mariana Martinez";

  products.forEach((item, index) => {
    itemsProducts += `
        <tr>
          <td>${index}</td>
          <td>${item.code}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>PZAS</td>
          <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}</td>
          <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}</td>
        </tr>
      `;
  });

  return `
  <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orden de Compra</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      .container {
        width: 5.8in;
        height: 11in;
        margin: auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: rgba(2, 151, 189, 0.712);
        text-align: center; /* Centrando el h1 */
        font-size: 12px;
      }

      h2 {
        color: rgba(2, 151, 189, 0.712);
        text-align: center; /* Centrando el h1 */
        font-size: 10px;
        font-weight: 800;
        margin: 1px 0px;
      }

      p {
        margin: 0px 0;
        font-size: 9px;
      }

      .folio {
        background-color: rgba(0, 54, 68, 0.767);
        margin-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        strong {
          margin-right: 20px;
        }
      }

      .foliotext {
        color: #fff;
      }

      .row {
        width: 100%;
        overflow: hidden;
      }

      .izquierda {
        float: left; /* Flota a la izquierda */
      }

      .derecha {
        float: right; /* Flota a la derecha */
      }

      .column {
        width: 235px;
        height: 140px;
        border: 3px solid rgba(0, 54, 68, 0.767);
        padding-left: 30px;
        border-radius: 30px;
        p {
          font-weight: 700;
        }
      }

      .columnblue {
        width: 235px;
        height: 140px;
        border: 3px solid rgba(0, 54, 68, 0.767);
        padding-left: 30px;
        border-radius: 30px;
        h2 {
          color: grey;
          font-size: 10px;
          font-weight: 700;
        }
        p {
          color: rgba(2, 151, 189, 0.712);
          font-weight: 700;
        }
      }

      .fullcolumn {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        width: 784px;
        border: 2px solid #2f4669;
        padding-left: 30px;
        border-radius: 30px;
      }

      .left-column,
      .right-column {
        width: 50%; /* Cada columna ocupa el 50% del ancho */
      }
      .left-column p,
      .right-column p {
        margin: 5px 0; /* Espacio entre párrafos */
      }

      strong {
        font-weight: 800;
      }

      table {
        width: 100%;
        margin: 20px 0;
        border-collapse: collapse;
      }

      table,
      th,
      td {
        border: 1px solid #ddd;
        font-size: 9px;
      }

      th,
      td {
        padding: 3px;
        text-align: left;
      }

      thead {
        background: rgba(0, 54, 68, 0.767);
        color: #fff;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul li {
        margin: 0px 0;
        padding: 1px;
        font-size: 7px;
        font-weight: 700;
        word-wrap: break-word; /* Ajusta el texto dentro del ancho máximo */
      }

      .ltitle {
        font-weight: 800;
        font-size: 8px;
      }

      .footer {
        display: table;
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
      }

      .footer-cell {
        display: table-cell;
        width: 33%;
        padding: 0 10px; /* Ajusta el espacio entre las celdas */
        overflow: hidden; /* Maneja el desbordamiento de contenido */
        vertical-align: top; /* Alinea el contenido al principio de cada celda */
      }

      .div1 {
        background-color: lightgray;
      }
      .div2,
      .div3 {
        background-color: rgb(230, 173, 218);
      }

      .firma {
        height: 60px;
        background-color: #fff;
        margin: 2px;
      }

      .textfirmablue {
        text-align: center;
        font-weight: 700;
        font-size: 8px;
        color: rgba(2, 151, 189, 0.712);
      }

      .textentrega {
        text-align: center;
        margin-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${taxDataName}</h1>
      <div class="row">
        <section class="folio izquierda">
          <h2 class="foliotext">2537</h2>
        </section>
        <section class="derecha"></section>
      </div>
      <div class="row">
        <section class="column izquierda">
          <h2>STARKET</h2>
          <p>FECHA DE PEDIDO: ${orderDate}</p>
          <p>FECHA DE ENTREGA: ${estimatedDeliveryDate}</p>
          <p>ATENCIÓN: ${attended}</p>
          <p>CONDICION DE PAGO: ${paymentCondition}</p>
          <p>TELEFONO: ${phoneStarket}</p>
        </section>
        <section class="columnblue derecha">
          <h2>DATOS FISCALES</h2>
          <p>${taxDataName}</p>
          <p>RFC: ${taxDataRFC}</p>
          <p>CONTACTO: ${taxDataContact}</p>
          <p>
            DIRECCIÓN: ${taxDataAddress}
          </p>
          <p>TELÉFONO: ${taxDataPhone}</p>
          <p>EMAIL: ${taxDataEmail}</p>
        </section>
      </div>

      <section>
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

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>MONTO</td>
              <td>${tableAmount}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>0.0 %</td>
              <td>DESCUENTO</td>
              <td>${tableDiscount}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>SUB-TOTAL</td>
              <td>${tableSubTotal}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>IVA</td>
              <td>${tableIVA}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>TOTAL</td>
              <td>${tableTotal}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="conobs">
        <ul>
          <li class="ltitle">OBSERVACIONES</li>
          <li class="ltitle">${observationsBoldFont}</li>
          <li>
            TIEMPO DE ENTREGA. ${observations.deliveryTime}
          </li>
          <li>
            LUGAR DE ENTREGA. ${observations.deliveryPlace}
          </li>
          <li>
            INCUMPLIMIENTO. ${observations.nonCompliance}    
          </li>
          <li>
            PENACONVENCIONAL. ${observations.penaltyClause}
          </li>
          <li>
            JURISDICCIÓN. ${observations.jurisdiction}
          </li>
        </ul>
      </section>
      <section>
        <div class="footer">
          <div class="footer-cell">
            <p>ENTREGAR EN:</p>
            <p>${deliver}</p>
            <div class="textentrega">
              <p>${textDeliver}</p>
            </div>
          </div>
          <div class="footer-cell">
            <p class="textfirmablue">AUTORIZO COMPRA:</p>
            <div class="firma">
              <p>${authorized}</p>
            </div>
          </div>
          <div class="footer-cell">
            <p class="textfirmablue">PROVEEDOR:</p>
            <div class="firma"></div>
            <p class="textfirmablue">NOMBRE Y FIRMA</p>
          </div>
        </div>
      </section>
    </div>
  </body>
</html>
  `;
};

export const renderTemplateHomukea = data => {
  let { subtotal, products, total, discount, iva } = data;

  let itemsProducts = "";

  // == Data needed for the PDF ==

  // Document title

  let title = "HOMUKEA MEDICA, SA DE CV";

  //Seller
  let sellerName = "";
  let sellerNameCompany = "";
  let sellerAddress = "";
  let sellerPrepared = "";
  let sellerPhone = "";
  let sellerEmail = "";

  //Buyer
  let buyerName = "";
  let buyerTax = "";
  let buyerContact = "";
  let buyerAddress = "";
  let buyerPhone = "";
  let buyerEmail = "";

  //Shipping
  let shippingNameComany = "";
  let shippingAddress = "";
  let shippingName = "";
  let shippingEmail = "";
  let shippingPhone = "";
  let shippingFX = "";
  let shippingZIP = "";

  //Tabla
  let tableTotalQTY = "";
  let tableTotal = total;
  let tableShipping = "México";
  let tableSubTotal = subtotal;
  let tableFreight = "SEA";
  let tableDestination = "MC ALLEN";
  let tableAmount = "";

  products.forEach((item, index) => {
    itemsProducts += `
        <tr>
          <td>${index}</td>
          <td>${item.code}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>-</td>
          <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}</td>
          <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}</td>
        </tr>
      `;
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Purchase Order</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      .container {
        width: 5.8in;
        height: 11in;
        margin: auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #2f4669;
        text-align: center;
        font-size: 12px;
      }

      h2 {
        color: rgba(88, 9, 88, 0.712);
        text-align: center;
        font-size: 10px;
        font-weight: 700;
        margin: 1px 0px;
      }

      p {
        margin: 0px 0;
        font-size: 9px;
      }

      .folio {
        background-color: #2f4669;
        margin-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        strong {
          margin-right: 20px;
        }
      }

      .foliotext {
        color: #fff;
      }

      .row {
        width: 100%;
        overflow: hidden;
      }

      .column {
        width: 235px;
        border: 2px solid #2f4669;
        height: 130px;
        padding-left: 30px;
        border-radius: 30px;
      }

      .izquierda {
        float: left; /* Flota a la izquierda */
      }

      .derecha {
        float: right; /* Flota a la derecha */
      }

      .fullcolumn {
        overflow: hidden;
        flex-wrap: wrap;
        margin-top: 10px;
        width: 520px;
        border: 2px solid #2f4669;
        padding: 5px;
        padding-left: 30px;
        border-radius: 20px;
      }

      .left-column,
      .right-column {
        width: 50%;
      }
      .left-column p,
      .right-column p {
        margin: 5px 0;
      }

      strong {
        font-weight: 800;
      }

      table {
        width: 100%;
        margin: 20px 0;
        border-collapse: collapse;
      }

      table,
      th,
      td {
        border: 1px solid #ddd;
        font-size: 9px;
      }

      th,
      td {
        padding: 3px;
        text-align: left;
      }

      thead {
        background: #2f4669;
        color: #fff;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      ul li {
        margin: 0px 0;
        padding: 1px;
        font-size: 8px;
        font-weight: 700;
      }

      .ltitle {
        color: rgba(88, 9, 88, 0.712);
        font-weight: 800;
        font-size: 8px;
      }

      .redcolor {
        color: red;
      }

      .totalamount {
        color: rgba(88, 9, 88, 0.712);
        font-weight: 800;
        font-size: 8px;
      }

      .backgroundgrey {
        background-color: lightgray;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${title}</h1>
      <div class="row">
        <section class="izquierda"></section>
        <section class="folio derecha">
          <h2 class="foliotext"><strong> FOLIO No. </strong> 176</h2>
        </section>
      </div>
      <div class="row">
        <section class="column izquierda">
          <h2>Seller</h2>
          <p><strong>NAME:</strong> ${sellerName}</p>
          <p><strong>NAME:</strong> ${sellerNameCompany}</p>
          <p>
            <strong>ADDRESS:</strong> ${sellerAddress}
          </p>
          <p><strong>PREPARED BY:</strong> ${sellerPrepared}</p>
          <p><strong>PHONE:</strong> ${sellerPhone}</p>
          <p><strong>EMAIL:</strong> ${sellerEmail}</p>
        </section>
        <section class="column derecha">
          <h2>Buyer</h2>
          <p><strong>NAME:</strong> ${buyerName}</p>
          <p><strong>TAX:</strong> ${buyerTax}</p>
          <p><strong>CONTACT:</strong> ${buyerContact}</p>
          <p>
            <strong>ADDRESS:</strong> ${buyerAddress}
          </p>
          <p><strong>PHONE:</strong> ${buyerPhone}</p>
          <p><strong>EMAIL:</strong> ${buyerEmail}</p>
        </section>
      </div>
      <section class="fullcolumn">
        <div class="izquierda">
          <h2>Shipping Details</h2>
          <p><strong>${shippingNameComany}</strong></p>
          <p>${shippingAddress}</p>
          <p></p>
        </div>
        <div class="derecha">
          <p>
            <strong>${shippingName}</strong> ${shippingEmail}
          </p>
          <p><strong>PHONE:</strong> ${shippingPhone}</p>
          <p><strong>FX:</strong> ${shippingFX} <strong>ZIP:</strong> ${shippingPhone}</p>
        </div>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>ITEM CODE</th>
              <th>ITEM NAME</th>
              <th>QTY</th>
              <th></th>
              <th>UNIT PRICE</th>
              <th>TOTAL VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PRZ-200</td>
              <td>High Frequency Electrocautery 200W (GE-350) (LEEP-C)</td>
              <td>80</td>
              <td></td>
              <td></td>
              <td>-</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>-</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>TOTAL</td>
              <td>${tableTotalQTY}</td>
              <td></td>
              <td>TOTAL VALUE</td>
              <td>${tableTotal}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>0.0%</td>
              <td>SHIPPING TO ${tableShipping}</td>
              <td>-</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>SUB-TOTAL</td>
              <td>${tableSubTotal}</td>
            </tr>
            <tr>
              <td></td>
              <td class="backgroundgrey">Freight by:</td>
              <td class="backgroundgrey">${tableFreight}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>-</td>
            </tr>
            <tr>
              <td></td>
              <td class="backgroundgrey">Destination:</td>
              <td class="backgroundgrey">${tableDestination}</td>
              <td></td>
              <td></td>
              <td class="totalamount">TOTAL AMOUNT</td>
              <td>${tableAmount}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <ul>
          <li class="ltitle">Order Terms and Conditions</li>
          <li>1. Trade mode: CFR</li>
          <li>2. In shipments by SEA please do not use:</li>
          <li class="redcolor">- Hapag Lloyd</li>
          <li class="redcolor">- Cosco Shipping</li>
          <li>3. Currency: USD</li>
          <li>4. Minimum warranty: 12 months</li>
          <li>5. American plug</li>
          <li>6. User manual</li>
          <li></li>
          <li>Goods delivery:</li>
          <li>7. Use CMC GLOBAL for the Goods that arrives in HOUSTON</li>
          <li>8. Do not send the Goods until it is approved by Homukea</li>
          <li>9. Send the ISF information once the supplier got the booking</li>
          <li>10. Send CI, PL, SN before shipping merchandise</li>
        </ul>
      </section>
    </div>
  </body>
</html>
`;
};

export const renderTemplateDemo = data => {
  console.log("data",data)
  const { document, products } = data;
  let nums = 28;
  let itemsProducts = "";

  let validProducts = products ?? [];

  validProducts.forEach((item, index) => {
    // Agregar productos reales al HTML
    itemsProducts += `
      <tr>
        <td>${item?.model}</td>
        <td>${item?.description}</td>
        <td>${item?.quantity}</td>
        <td>${item?.serial}</td>
      </tr>
    `;
  });

  // Calcular filas vacías que faltan
  let emptyRows = nums - validProducts.length;

  for (let i = 0; i < emptyRows; i++) {
    itemsProducts += `
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Purchase Order</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      width: 5.8in;
      // height: 11in;
      margin: auto;
      padding: 20px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* el titulo  */
    .title {
      color: black;
      font-weight: 600;
      text-align: center;
      font-size: 22px;
      margin: 0px;
    }

    .sections {
      float: left;
      width: 100%;
    }

    .content-date {
      margin: 0px;
    }

    .content-left-empty-title {
      margin-bottom: 1px;
      float: left;
      width: 65%;
      /* height: 20px; */
    }

    .content-rigth-empty-title {
      margin-bottom: 1px;
      float: right;
      width: 35%;
      /* height: 20px; */
    }

    .lettering-date {
      text-align: center;
      float: right;
      width: 50%;
      /* height: 20px; */
      font-size: 12px;
    }

    .date {
      font-size: 12px;
      font-weight: bold;
      margin: 0px;
    }

    /* .lettering-date {
        float: right;
        height: 20px;
        width: 50%;
      } */
    .date-title {
      float: right;
      width: 50%;
      text-align: center;
      background-color: #ffd966;
      font-size: 12px;
    }

    strong {
      font-weight: 800;
    }

    table {
      width: 100%;
      /* margin-left: auto;
        margin-right: auto; */

      border-collapse: collapse;
      text-align: center;
    }

    table,
    th,
    td {
      border: 1.5px solid black;
      font-size: 9px;
    }

    .th-title {
      width: 33.33%;
      font-size: 9px;
      font-weight: 800;
      color: black;
    }

    .th-title-2 {
      width: 60.33%;
      font-size: 9px;
      font-weight: 800;
      color: black;
    }

    .th-desc {
      font-size: 9px;
      font-weight: 500;
      color: black;
    }

    .th-title-model {
      width: 18%;
      font-size: 9px;
      font-weight: 800;
      color: black;
    }

    .th-title-des {
      font-size: 9px;
      font-weight: 800;
      color: black;
    }

    .th-title-pzas {
      width: 14%;
      font-size: 9px;
      font-weight: 800;
      color: black;
    }

    .th-title-serial {
      font-size: 9px;
      font-weight: 800;
      color: black;
    }

    th,
    td {
      border: 1.5px solid black;
      font-size: 7px;
      text-align: center;
      /* Establece un ancho mínimo para las celdas */
      height: 13px;
    }

    thead {
      background: #9bc2e6;
      color: black;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    ul li {
      margin: 0px 0;
      padding: 1px;
      font-size: 8px;
      font-weight: 700;
    }

    .content-info-1 {
      height: 20px;
      float: left;
      width: 99.6%;
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;
      border-left: 1.5px solid black;
      border-right: 1.5px solid black;
      border-top: 1.5px solid black;
      border-bottom: 1.5px solid black;
    }

    .content-info-2 {
      height: 20px;
      float: left;
      width: 99.6%;
      margin-left: auto;
      margin-right: auto;
      border-left: 1.5px solid black;
      border-right: 1.5px solid black;
      border-bottom: 1.5px solid black;
    }

    .content-info-3 {
      height: 20px;
      float: left;
      width: 99.6%;
      margin-left: auto;
      margin-right: auto;
      border-left: 1.5px solid black;
      border-right: 1.5px solid black;
      border-bottom: 1.5px solid black;
    }

    .content-info-4 {
      height: 20px;
      float: left;
      width: 99.6%;
      margin-left: auto;
      margin-right: auto;
      border-left: 1.5px solid black;
      border-right: 1.5px solid black;
      border-bottom: 1.5px solid black;
    }

    .content-info-5 {
      height: 20px;
      float: left;
      width: 99.6%;
      margin-left: auto;
      margin-right: auto;
      border-left: 1.5px solid black;
      border-right: 1.5px solid black;
    }

    .content-info-title-left {
      text-align: center;
      float: left;
      width: 30%;
      border-right: 1.5px solid black;
    }

    .content-info-b {
      font-weight: 700;
      font-size: 10px;
      margin: 0px;
    }

    .content-info-p {
      margin: 0px;
      font-weight: 500;
      font-size: 10px;
    }

    .content-info-desc-rigth {
      float: right;
      width: 69%;
    }

    .content-info-desc-rigth-hora {
      float: left;
      width: 69%;
    }

    .hora {
      text-align: center;
      width: 30%;
      float: left;
    }

    .hora-title {
      height: 20px;
      text-align: center;
      border-left: 1.5px solid black;
      border-right: 1.5px solid black;
      width: 30%;
      float: left;
    }

    .custom-table {
      width: 100%;
      border-collapse: collapse;
    }

    .custom-table,
    .custom-table td {
      border: 1.5px solid black;
    }

    .custom-table td {
      padding: 2px;
    }

    .header-row {
      background-color: #a1c2e2;
      font-weight: bold;
    }

    /* .backgroundgrey {
        background-color: lightgray;
      } */
  </style>
</head>

<body>
  <div class="container">
    <p class="title">FORMATO PARA DEMOSTRACIONES</p>
    <section class="sections">
      <div class="content-date">
        <div class="content-rigth-empty-title">
          <div class="lettering-date">
            <p class="date">${data?.dateActuality}</p>
          </div>
          <div class="date-title">
            <p class="date">Fecha:</p>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th class="th-title">EJECUTIVO</th>
            <th class="th-title">ESFERA DE NEGOCIO</th>
            <th class="th-title">INSTRUCTOR ASIGNADO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="th-desc">${data?.ejecutive}</td>
            <td class="th-desc">${data?.sphere}</td>
            <td class="th-desc">${data?.instructor}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="sections">
      <div class="content-info-1">
        <div class="content-info-title-left">
          <b class="content-info-b">Nombre del Cliente:</b>
        </div>
        <div class="content-info-desc-rigth">
          <b class="content-info-p">${data?.customer}</b>
        </div>
      </div>
      <div class="content-info-2">
        <div class="content-info-title-left">
          <b class="content-info-b">Lugar de Demostración:</b>
        </div>
        <div class="content-info-desc-rigth">
          <b class="content-info-p">${data?.demonstrationPlace}</b>
        </div>
      </div>
      <div class="content-info-3">
        <div class="content-info-title-left">
          <b class="content-info-b">Fecha de Demostración:</b>
        </div>
        <div class="content-info-desc-rigth-hora">
          <div class="hora">
            <b class="content-info-p">${data?.demoDate}</b>
          </div>
          <div class="hora-title">
            <b class="content-info-b">Hora</b>
          </div>
          <div class="hora">
            <b class="content-info-p">${data?.hoursDate}</b>
          </div>
        </div>
      </div>
      <div class="content-info-4">
        <div class="content-info-title-left">
          <b class="content-info-b">Unidad Asignada:</b>
        </div>
        <div class="content-info-desc-rigth">
          <b class="content-info-p">${data?.assignedUnit}</b>
        </div>
      </div>
      <div class="content-info-5">
        <div class="content-info-title-left">
          <b class="content-info-b">Telefono del Cliente:</b>
        </div>
        <div class="content-info-desc-rigth-hora">
          <div class="hora">
            <b class="content-info-p">${data?.phonoCustomer}</b>
          </div>
          <div class="hora-title">
            <b class="content-info-b">Viaticos Asignados</b>
          </div>
          <div class="hora">
            <b class="content-info-p">$${data?.travelExpenses} mnx.</b>
          </div>
        </div>
      </div>
    </section>

    <section class="sections">
      <table>
        <thead>
          <tr>
            <th class="th-title-model">MODELO</th>
            <th class="th-title-des">DESCRIPCION</th>
            <th class="th-title-pzas">N° PZAS</th>
            <th class="th-title-serial">N° DE SERIE</th>
          </tr>
        </thead>
        <tbody>
            ${itemsProducts}
        </tbody>
      </table>
    </section>
    <section class="sections">
      <table class="custom-table">
        <tr class="header-row">
          <td colspan="2" class="th-title-2">DOCUMENTOS PARA DEMOSTRACIÓN</td>
          <td class="th-title-2">AUTORIZACIÓN</td>
        </tr>
        <tr>
          <td>N° INE</td>
          <td>${document?.ine}</td>
          <td rowspan="5"></td>
          <!-- Columna vacía para "Autorización" -->
        </tr>
        <tr>
          <td>COMPROBANTE DOMICILIO</td>
          <td>${document?.proffaddress}</td>
        </tr>
        <tr>
          <td>CÉDULA PROFESIONAL</td>
          <td>${document?.cedula}</td>
        </tr>
        <tr>
          <td>TIPO DE CLIENTE</td>
          <td>${document?.typleCustomer}</td>
        </tr>
        <tr>
          <td>CERTEZA DE CIERRE</td>
          <td>${document?.closingcertainty}</td>
        </tr>
      </table>
    </section>
  </div>
</body>
</html>`;
};
