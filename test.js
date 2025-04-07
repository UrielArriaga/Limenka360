const generatePdf = (template, data) => {
  let { prospect, products, footer, total, ejecutive, company, quoteInfo } = data;
  let itemsProducts = "";

  products.forEach((item, index) => {
    itemsProducts += `
    <tr class="item ${index === products.length - 1 ? "last" : ""}">
    <td>${item.name}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price)}</td>
  </tr>
    `;
  });

  let finalTemplate = `
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
line-height: 24px;
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
img.img-log {
  width: 100%;
  margin:10px;
}
.desc-art {
  display: none;
}
span.text-art {
  color: #e00209;
  line-height: 2.5em;
  font-size: 10pt;
  font-weight: 900;
}
span.sp-art {
  color: #000;
  width: 100%;
  line-height: 1.5em;
  width: 100%;
  float: left;
  font-size: 7pt;
}
span.sp-art1 {
  color: #000;
  width: 100%;
  line-height: 1.5em;
  width: 100%;
  float: left;
  font-size: 7pt;
  margin-left: 18px;
}
img.address {
  width: 5%;
  margin-right: 5px;
}
.cot-art {
  width: 20%;
  margin-right: 3%;
  margin-top: 0.5%;
  margin-right: 3%;
  float: right;
}
.art-cot {
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
.num-cot {
  width: 100%;
  float: left;
}
.text-cot {
  display: none;
}
.va-art {
  background: #ffffff;
  float: left;
  width: 100%;
  font-size: 7pt;
  color: #e00209;
  padding: 5px;
  text-align: center;
  font-weight: 900;
}
.text-date {
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
.va-texts {
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
	height: 100px;
}
.text-client {
  background: #0e196f;
  width: 50%;
  padding: 5px;
  color: white;
  margin-top: -10px;
  font-size: 9pt;
  text-align: center;
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
  color: #e00209;
  font-weight: bold;
}
.prod-art {
  margin-top: 2%;
  width: 100%;
  float: left;
}
.tabs_products {
padding: 10px;
}
table.products {
border-spacing: 0;
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
.obser-art {
  width: 40%;
  background: #ededed;
  float: left;
  margin-top: 3%;
  font-size: 7pt;
	margin-left:10px;
  padding-left: 5px;
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
            <div class="logo"><img src="${company.photo}" class="img-log" />
                        </div>
            <div class="cot-art">
            <div class="art-cot">Cotización</div>
            <div class="num-cot">
            <span class="text-cot">Nº de Cotización:</span>
            <span class="va-art">${data.quoteInfo.folio}</span>
            <span class="text-date">Fecha:</span>
            <span class="va-texts">${data.quoteInfo.date}</span>
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
                        <th scope="col">Precio</th>
                        <th scope="col">Iva</th>
                        <th scope="col">SubTotal</th>
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
    <td class="bold">Total</td>
    <td class="bold">${new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(total)}</td>
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
        paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
        este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
        momento de la compra al tipo de cambio
        de BBVA BANCOMER a la venta. Los
        números de guia se daran despues del tercer dia.
        </div>
</div>

</body>

</html> `;

  console.log(finalTemplate);
  return finalTemplate;
};
let data = {
  company: { photo: "iqApAd2IOU1mlG2WYgF1954JwrEEQQiK_logo-de-medicar-para-borrarpng" },
  quoteInfo: { folio: "UAZE-07", observations: "Productos Entregados", date: "06-10-2022" },
  ejecutive: { name: "uriel", lastname: "arriaga", email: "urielarriaga.1998@executive.com" },
  prospect: { name: "daniela", lastname: "ramirez", entity: "Estado de México", email: "danielaram@gmail.com", phone: "5525688573" },
  products: [
    { name: "BOMBA DE INFUSION DE UN CANAL CON PANTALLA LCD", amount: 16500, quantity: 1, code: "ZNB-XBY1000", iva: 2640, total: 19140, brand: "NINGBO DAVID" },
    { name: "ROLLO DE PAPEL PARA ELECTROCARDIOGRAFO ZONCARE 1212 21.6 CM X 20 MTS", amount: 162, quantity: 1, code: "ZQ1021503", iva: 25.92, total: 187.92000000000002, brand: "ZONCARE" },
  ],
  footer: {
    showIn: "pageFooter-last",
    data: "*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación\n        solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la\n        cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando\n        el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la\n        compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.",
  },
};

generatePdf(1, data);
