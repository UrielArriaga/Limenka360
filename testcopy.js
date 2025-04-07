const generatePdf = (template, data) => {
  let { prospect, products, footer, total, ejecutive } = data;
  let itemsProducts = "";
  products.forEach((item, index) => {
    itemsProducts += `
    <tr class="item ${index === products.length - 1 ? "last" : ""}">
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price)}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price)}</td>
    <td>${item.name}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price)}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price)}</td>
  </tr>
    `;
  });
  let finalTemplate = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  
      <style>
          #pageFooter {
              font-size: 8px;
              color: #555;
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
              height: 100%;
              position: relative;
              height: 900px;
          }
  
          .container_template .header_pdf {
              width: 100%;
          }
  
          .container_template .header_pdf__logo {
              padding: 30px;
          }
  
          .container_template .header_pdf__rigth {
              text-align: right;
              padding: 30px;
          }
  
          .container_template .contact_info {
              width: 100%;
          }
  
          .container_template .contact_info__customer {
              padding: 30px;
          }
  
          .container_template .contact_info__executive {
              text-align: right;
              padding: 30px;
          }
  
          .container_template .products {
              width: 100%;
              padding: 20px;
              margin: 0;
          }
  
          .container_template .products__head th,
          .container_template .products__head td {
              padding: 10px;
              background-color: #0099ff;
          }
  
          .container_template .products__head th:nth-child(1) {
              width: 10%;
          }
  
          .container_template .products__head th:nth-child(2) {
              width: 10%;
          }
  
          .container_template .products__head th:nth-child(3) {
              width: 40%;
          }
  
          .container_template .products__head th:nth-child(4) {
              width: 20%;
          }
  
          .container_template .products__head th:nth-child(5) {
              width: 20%;
          }
  
          .container_template .products__body td {
              text-align: center;
          }
  
          .container_template .products__body td:nth-child(3) {
              text-align: center;
          }
  
          .container_template svg {
              position: absolute;
              bottom: 0;
              z-index: -1;
          }
  
          /*# sourceMappingURL=output.css.map */
      </style>
  </head>
  
  
  
  <body>
      <div class="container_template">
  
  
          <table class="header_pdf">
              <tr>
                  <td class="header_pdf__logo">
                      <img src="https://www.medicalbuy.mx/images/logo-medical.png"
                          style="width: 100%; max-width: 150px" />
                  </td>
  
                  <td class="header_pdf__rigth">
                      Numero de Cotizacion <span> #UAZE01</span><br />
                      Fecha:01/09/22<br />
  
                  </td>
              </tr>
          </table>
  
  
  
          <table class="contact_info">
              <tr class="information">
                  <td class="contact_info__customer">
                      Cliente Uriel Arriaga<br />
                      Estado de mexico<br />
                  </td>
                  <td class="contact_info__executive">
                      Ejecutivo : Uriel Arriaga<br />
                      urielarriaga@gmail.com
                  </td>
              </tr>
          </table>
  
  
          <table class="products">
              <thead class="products__head">
                  <tr class="products__headrow">
                      <th scope="col">Codigo</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Producto</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Iva</th>
                      <th scope="col">SubTotal</th>
                  </tr>
              </thead>
  
              <tbody class="products__body">
                ${itemsProducts}
              </tbody>
          </table>
  
  
  
          <div id=${footer.showIn}>
          ${footer.data}
        </div>
  
      </div>
  
  </body>
  
  
  
  </html> `;

  console.log(finalTemplate);

  return finalTemplate;
};

let data = {
  prospect: {
    name: "Uriel Arriaga",
    entity: "Estado de mexico",
  },
  products: [{ name: "X producto", price: "2000" }],
  total: 2000,
  ejecutive: {
    name: "Uriel",
    lastname: "Arriaga",
    email: "urielarriaga@gmail.com",
  },
  footer: {
    showIn: "pageFooter-last",
    data: `*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación
    solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la
    cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando
    el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la
    compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.`,
  },
};
generatePdf(1, data);
