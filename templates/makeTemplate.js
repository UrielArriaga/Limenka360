import {
  renderTemplateHospital,
  renderTemplateMedicalBuy,
  renderTemplateMeisonMedical,
  renderTemplatePromed,
  renderTemplateLifemedic,
  renderTemplateHelsemedical,
  renderTemplateChison,
  renderTemplateCVJobs,
  renderTemplateSolutions,
  renderTemplateMaxrei,
  renderTemplateTabulator,
  renderTempleteMbhHealthCare,
} from ".";
import { URL_SPACE } from "../services/api";

export const makeTemplate = (template, data) => {
  let { prospect, products, footer, total, ejecutive, company, quoteInfo } = data;
  let itemsProducts = "";
  products.forEach((item, index) => {
    itemsProducts += `
    <tr class="item ${index === products.length - 1 ? "last" : ""}">
    <td>${item.code}</td>
    <td>${item.brand}</td>
    <td>${item.name}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.iva)}</td>
    <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.total)}</td>
    </tr>
    `;
  });

  let finalTemplate = "";
  switch (template) {
    case 1:
      finalTemplate = renderTemplateHospital(data);
      break;
    case 2:
      finalTemplate = renderTemplateMedicalBuy(data);
      break;
    case 3:
      finalTemplate = renderTemplateMeisonMedical(data);
      break;
    case 4:
      finalTemplate = renderTemplatePromed(data);
      break;
    case 5:
      finalTemplate = renderTemplateLifemedic(data);
      break;
    case 6:
      finalTemplate = renderTemplateHelsemedical(data);
      break;
    case 7:
      finalTemplate = renderTemplateChison(data);
      break;
    case 8:
      finalTemplate = renderTemplateCVJobs(data);
      break;
    case 9:
      finalTemplate = renderTemplateSolutions(data);
      break;
    case 10:
      finalTemplate = renderTemplateMaxrei(data);
      break;

    case 11:
      finalTemplate = renderTempleteMbhHealthCare(data);
      break;
    case 12:
      finalTemplate = renderTemplateTabulator(data);
      break;
    default:
      break;
  }

  // let finalTemplate = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Document</title>
  //     <link rel="stylesheet" href="output.css" />

  //     <style>
  //       #pageFooter {
  //         font-size: 8px;
  //         color: #555;
  //       }

  //       .footer {
  //         font-size: 8px;
  //         color: #3d3d3d;
  //       }

  //       @page {
  //         size: A4;
  //         margin: 0;
  //       }
  //       .container_template {
  //         max-width: 800px;
  //         margin: auto;
  //         border: 1px solid #eee;
  //         font-size: 12px;
  //         line-height: 24px;
  //         font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  //         color: #555;
  //         height: 100%;
  //         position: relative;
  //       }
  //       .container_template .padding {
  //         padding: 20px;
  //       }
  //       .container_template .header_pdf {
  //         background-color: #ededed;
  //         height: 10px;
  //         width: 100%;
  //       }
  //       .container_template .header_pdf * {
  //         margin: 0px;
  //         padding: 0px;
  //       }
  //       .container_template .header_pdf__logo {
  //         padding: 30px;
  //       }
  //       .container_template .header_pdf__logo img {
  //         max-width: 120px;
  //         width: 100%;
  //       }
  //       .container_template .header_pdf__rigth {
  //         text-align: right;
  //         padding: 30px;
  //       }
  //       .container_template .complete {
  //         width: 100%;
  //       }
  //       .container_template .header_infoquote {
  //         width: 100%;
  //         height: 10px;
  //         border-collapse: collapse;
  //         padding: 20px;
  //         border-spacing: 0;
  //         background-color: #ededed;
  //       }
  //       .container_template .header_infoquote * {
  //         margin: 0px;
  //         padding: 0px;
  //       }
  //       .container_template .header_infoquote .title {
  //         color: #fff;
  //         font-size: 10px;
  //         font-weight: bold;
  //       }
  //       .container_template .header_infoquote th,
  //       .container_template .header_infoquote td {
  //         padding: 5px;
  //       }
  //       .container_template .header_infoquote th:nth-child(1) {
  //         width: 20%;
  //         color: #fff;
  //         font-weight: bold;
  //         font-size: 10px;
  //         background-color: #1d9adc;
  //       }
  //       .container_template .header_infoquote th:nth-child(2) {
  //         width: 20%;
  //         text-align: right;
  //         color: #747473;
  //         font-weight: bold;
  //         font-size: 8px;
  //       }
  //       .container_template .header_infoquote th:nth-child(3) {
  //         width: 10%;
  //         color: #1d9adc;
  //         text-align: left;
  //         border-right: 1px solid #e0e0e0;
  //         font-size: 8px;
  //       }
  //       .container_template .header_infoquote th:nth-child(4) {
  //         width: 10%;
  //         color: #747473;
  //         font-weight: bold;
  //         font-size: 8px;
  //       }
  //       .container_template .header_infoquote th:nth-child(5) {
  //         width: 10%;
  //         color: #1d9adc;
  //         text-align: left;
  //         font-size: 8px;
  //       }
  //       .container_template .contact_info {
  //         width: 100%;
  //         margin-top: 20px;
  //       }
  //       .container_template .contact_info th {
  //         width: 50%;
  //       }
  //       .container_template .contact_info th .container {
  //         width: 80%;
  //         margin: auto;
  //         background-color: #ededed;
  //         border-radius: 10px;
  //         min-height: 100px;
  //         position: relative;
  //         margin-top: 20px;
  //         padding-top: 24px;
  //         padding-left: 20px;
  //       }
  //       .container_template .contact_info th .container * {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //       .container_template .contact_info th .container .txt {
  //         text-align: left;
  //         font-weight: bold;
  //       }
  //       .container_template .contact_info th .container .badge {
  //         padding: 5px 0;
  //         top: -10px;
  //         left: 0;
  //         position: absolute;
  //         background-color: #1d9adc;
  //         width: 60%;
  //       }
  //       .container_template .contact_info th .container .badge * {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //       .container_template .contact_info th .container .badge p {
  //         color: #fff;
  //         font-weight: bold;
  //         font-size: 12px;
  //       }
  //       .container_template .contact_info th:nth-child(2) {
  //         width: 50%;
  //       }
  //       .container_template .products {
  //         width: 100%;
  //         border-collapse: collapse;
  //         margin: 0;
  //       }
  //       .container_template .products__head {
  //         background-color: #3d3d3d;
  //         border-collapse: collapse;
  //         padding: 20px;
  //         border-spacing: 0;
  //       }
  //       .container_template .products__head th,
  //       .container_template .products__head td {
  //         padding: 10px;
  //         background-color: #3d3d3d;
  //         color: #f6f6f6;
  //       }
  //       .container_template .products__head th:nth-child(1) {
  //         width: 10%;
  //       }
  //       .container_template .products__head th:nth-child(2) {
  //         width: 10%;
  //       }
  //       .container_template .products__head th:nth-child(3) {
  //         width: 40%;
  //       }
  //       .container_template .products__head th:nth-child(4) {
  //         width: 20%;
  //       }
  //       .container_template .products__head th:nth-child(5) {
  //         width: 20%;
  //       }
  //       .container_template .products__body td {
  //         text-align: center;
  //         font-size: 9px;
  //       }
  //       .container_template .products__body td:nth-child(3) {
  //         text-align: center;
  //       }
  //       .container_template .products__body tr:nth-child(even) {
  //         background: #ddd;
  //       }
  //       .container_template .observations {
  //         width: 100%;
  //         margin-top: 20px;
  //       }
  //       .container_template .observations th {
  //         width: 50%;
  //       }
  //       .container_template .observations th .container {
  //         width: 80%;
  //         margin: auto;
  //         background-color: #ededed;
  //         border-radius: 10px;
  //         min-height: 40px;
  //         position: relative;
  //         margin-top: 20px;
  //         padding-top: 24px;
  //         padding-left: 20px;
  //       }
  //       .container_template .observations th .container * {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //       .container_template .observations th .container .txt {
  //         text-align: left;
  //       }
  //       .container_template .observations th .container .badge {
  //         padding: 5px 0;
  //         top: -10px;
  //         left: 0;
  //         position: absolute;
  //         background-color: #1d9adc;
  //         width: 60%;
  //       }
  //       .container_template .observations th .container .badge * {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //       .container_template .observations th .container .badge p {
  //         color: #fff;
  //         font-weight: bold;
  //         font-size: 12px;
  //       }
  //       .container_template .observations .hide {
  //         visibility: hidden;
  //       }
  //       .container_template .observations th:nth-child(2) {
  //         width: 50%;
  //       }
  //       .container_template svg {
  //         position: absolute;
  //         bottom: 0;
  //         z-index: -1;
  //       }
  //       .container_template .titleproductos {
  //         font-weight: bold;
  //         font-size: 16px;
  //         margin-top: 20px;
  //         text-align: center;
  //         color: #1d9adc;
  //       }

  //       /*# sourceMappingURL=output.css.map */
  //     </style>
  //   </head>

  //   <body>
  //     <div class="container_template">
  //       <table class="header_pdf" id="pageHeader">
  //         <tr>
  //           <td class="header_pdf__logo">
  //             <img src="${company.photo}" />
  //           </td>
  //         </tr>
  //       </table>

  //       <div class="complete">
  //         <table class="header_infoquote">
  //           <thead class="header_infoquote__head">
  //             <tr class="header_infoquote__headrow">
  //               <th scope="col">Cotizacion</th>
  //               <th scope="col">
  //                 <p>N Cotizacion</p>
  //               </th>
  //               <th scope="col">
  //                 <p>${data.quoteInfo.folio}</p>
  //               </th>
  //               <th scope="col">Fecha</th>
  //               <th scope="col">${data.quoteInfo.date}</th>
  //             </tr>
  //           </thead>
  //         </table>
  //       </div>

  //       <table class="contact_info">
  //         <thead class="">
  //           <tr class="">
  //             <th scope="col" class="contact_info__customercontainer">
  //               <div class="container">
  //                 <p class="txt">${prospect.name} ${prospect.lastname}</p>
  //                 <p class="txt">${prospect.phone}</p>
  //                 <p class="txt">${prospect.email}</p>
  //                 <p class="txt">Vigencia de 1 dia</p>

  //                 <div class="badge">
  //                   <p>Cliente</p>
  //                 </div>
  //               </div>
  //             </th>

  //             <th scope="col" class="contact_info__customercontainer">
  //               <div class="container">
  //                 <p class="txt">${ejecutive.name} ${ejecutive.lastname}</p>
  //                 <p class="txt">${ejecutive.email}</p>
  //                 <div class="badge">
  //                   <p>Ejecutivo</p>
  //                 </div>
  //               </div>
  //             </th>
  //           </tr>
  //         </thead>
  //       </table>

  //       <p class="titleproductos">Productos</p>

  //       <div class="padding">
  //         <table class="products">
  //           <thead class="products__head">
  //             <tr class="products__headrow">
  //               <th scope="col">Codigo</th>
  //               <th scope="col">Marca</th>
  //               <th scope="col">Producto</th>
  //               <th scope="col">Precio</th>
  //               <th scope="col">Iva</th>
  //               <th scope="col">SubTotal</th>
  //             </tr>
  //           </thead>

  //           <tbody class="products__body">
  //             ${itemsProducts}
  //           </tbody>
  //         </table>
  //       </div>

  //       <table class="observations">
  //         <thead class="">
  //           <tr class="">
  //             <th scope="col" class="contact_info__customercontainer">
  //               <div class="container">
  //                 <p class="txt">${quoteInfo.observations}</p>

  //                 <div class="badge">
  //                   <p class="txt">Obervaciones</p>
  //                 </div>
  //               </div>
  //             </th>

  //             <th scope="col" class="contact_info__customercontainer hide"></th>
  //           </tr>
  //         </thead>
  //       </table>

  //       <div id="pageFooter-last" class="footer">
  //         *Precio sujeto a cambio sin previo aviso *Las existencias de los equipos
  //         son salvo venta, una vez confirmado el pedido no se aceptan cambios o
  //         devoluciones, *En caso de cancelación solicitarse por escrito y enviarse
  //         por correo a su ejecutivo de ventas, se cobrará el 30% del monto total
  //         de la compra y el reembolso se realiza 30 días hábiles posteriores a la
  //         cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de
  //         ventas, es indispensable enviar el comprobante de pago para tramitar el
  //         pedido de los equipos solicitados. *Cuando el equipo sea enviado por
  //         paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
  //         este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
  //         momento de la compra al tipo de cambio de BBVA BANCOMER a la venta. Los
  //         números de guia se daran despues del tercer dia.
  //       </div>
  //     </div>
  //   </body>
  // </html>
  // `;

  //

  return finalTemplate;
};

export const makeTemplateOrder = (data, template) => {
  let { company, ejecutive, concept, dateOrder, adressPdf, adressBilling, products, total, discount, groupLogo } = data;

  let itemsProducts = "";
  products.forEach(item => {
    itemsProducts += `
      <tr class="item last">
      <td>${item.product.code}
      ${item.inPackage ? item.inPackage.map(item => `<p class="package">${item.code}</p>`).join("") : ""}
      </td>
      <td>${item.quantity} 
      ${item.inPackage ? item.inPackage.map(item => `<p class="package">${item.quantity}</p>`).join("") : ""}
      </td>
      <td>${item.product.brand.name}
      ${item.inPackage ? item.inPackage.map(item => `<p class="package">${item.brand}</p>`).join("") : ""}
      </td>
      <td>${item.product.note ? item.product.name + "(" + item.product.note + ")" : item.product.name}
       ${item.inPackage ? item.inPackage.map(item => `<p class="package">${item.name_product}</p>`).join("") : ""}
      </td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.newprice)}
      ${
        item.inPackage
          ? item.inPackage
              .map(
                item =>
                  `<p class="package">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
                    item.callamount
                  )}</p>`
              )
              .join("")
          : ""
      }
      </td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.iva)}</td>
      <td class="price">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
        item.total
      )}</td>
      <td>${item.note}</td>
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
  line-height: 20px;
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
    background: #fefefefe;
  }
  .art-cabezera {
    background: #fefefefe;
    width: 100%;
  }
  .logo {
    width:120px;
    height:90px;
    float: left;
    margin: 3%;
  }
  img.img_log {
    object-fit: cover;
    width:100%;
    height:100%;
  }
  .desc_art {
    display: none;
  }

  .cot_art {
    width: 50%;
    margin-right: 3%;
    margin-top: 2.5%;
    margin-right: 3%;
    float: right;
    color: #4a4a4a;
  }
  .art_cot {
    width: 100%;
    text-align: center;
    font-size: 10pt;
    font-weight: bold;
    padding: 5px;
    color: #4a4a4a;
    float: left;
  }
  .num_cot {
    width: 100%;
    float: left;
    color: #4a4a4a;
  }
  .text_ejecutive {
   float: left;
    width: 100%;
    font-size: 8px;
    text-align: center;
    font-weight: 900;
    color: #4a4a4a;
    line-height: 150%;
  }
  .text_account {
    float: left;
    width: 100%;
    font-size: 8px;
    text-align: center;
    font-weight: 900;
    color: #4a4a4a;
    line-height: 150%;
  }
  .text_date {
    text-align: center;
    width: 100%;
    font-size: 8px;
    float: left;
    font-weight: 900;
    color: #4a4a4a;
    line-height: 150%;
  }

    .text_concept {
      float: left;
      width: 100%;
      font-size: 8px;
      text-align: center;
      font-weight: bold;
      color: #4a4a4a;
      line-height: 150%;
    }


    .cli_art {
      width: 100%;
      margin-top: 10px;
    }
    .client_art {
      height: 193px;
      width: 40%;
      float: left;
      margin-left: 5%;
      background: #fbf9f9;
      height: 321px;

    }
    .text_client {
    background: #3e8ed0; 
    text-transform: uppercase;
    width: 50%;
    padding: 5px 5px 0px 5px;
    color: white;
    margin-left: 5px;
    margin-top: 0;
    font-size: 7pt;
    text-align: justify;
    font-weight: 900;
    }
    .descrip_client {
      font-size: 7.5pt;
      /*padding: 10px;*/
      padding: 0px 1px 3px 10px;
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

  }
  .text_data {
  font-size: 8px;
  /*line-height: 3px;*/
  padding: 1px 0px 4px 0px;
  overflow-wrap: break-word;
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
  background: #3e8ed0;
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
      margin-top: 4px;
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
  .package{
  margin-top:-4px;
  margin-bottom:-4px;
  }
    .obser_art {
      width: 40%;
      background: #ededed;
      float: left;
      margin-top: 3%;
      font-size: 7pt;
      padding-left: 5px;
      margin-left:10px;
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
        <div class="logo">

        <img src="${
          groupLogo === undefined || groupLogo === ""
            ? "https://limenka.sfo3.digitaloceanspaces.com/common/LOGOPEDIDOS.png"
            : URL_SPACE + groupLogo
        }"  alt="logo limenka" class="img_log" />
        
        </div>
        <div class="cot_art">
          <div class="art_cot">Formato de Pedido</div>
          <div class="num_cot">
              <span class="text_concept">Folio: ${concept}</span>
              <span class="text_ejecutive">Ejecutivo: ${ejecutive.name} ${ejecutive.lastname} </span>
              <span class="text_account">Cuenta de pago: ${data.paymentaccount} </span>
              <span class="text_date">Fecha: ${dateOrder}</span>
            </div>
        </div>
      </div>
    </div>


      <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Dirección de envio</div>
      <div class="descrip_client">
      <p class="text_data">Recibe: ${adressPdf.receive}.</p>
          <p class="text_data">Teléfono: ${adressPdf.phone}.</p>
          <p class="text_data">Calle: ${adressPdf.street}.</p>
          <p class="text_data">Número Interior: ${adressPdf.int_number}.</p>
          <p class="text_data">Numero Exterior: ${adressPdf.ext_number}.</p>
          <p class="text_data">Colonia: ${adressPdf.settlement}.</p>
          <p class="text_data">C.P: ${adressPdf.postal}.</p>
          <p class="text_data">Delegación/ Municipio: ${adressPdf.city}.</p>
          <p class="text_data">Estado: ${adressPdf.entity}.</p>
          <p class="text_data">Referencias: ${adressPdf.references}</p>
          </div>
          
      </div>
      <div class="client_art">
      <div class="text_client">Datos Facturación</div>
      <div class="descrip_client">
      <p class="text_data">Razón Social: ${adressBilling?.billingbusiness}</p>
           <p class="text_data">RFC: ${adressBilling?.rfc}</p>
           <p class="text_data">Teléfono: ${adressBilling.phone}</p>
           <p class="text_data">Calle y N°: ${adressBilling?.street}, N°.Int: ${adressBilling?.int_number}, N°.Ext: ${
    adressBilling?.ext_number
  }</p>
            <p class="text_data">Colonia: ${adressBilling?.settlement}</p>
            <p class="text_data">C.P: ${adressBilling.postal}</p>
            <p class="text_data">Delegación/ Municipio: ${adressBilling.city}</p>
            <p class="text_data">Estado: ${adressBilling.entity}</p>
           <p class="text_data">Uso de CFDI:${data.cfdi}</p>
           <p class="text_data">Metodo de Pago: ${data.methodPayment}</p>
           <p class="text_data">Forma de Pago: ${data.wayPayment}</p>
           <p class="text_data">Regimen Fiscal: ${data.taxregime}</p>

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
                          <th scope="col">Precio</th>
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
          paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guia se daran despues del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html> `;
};

const formatCurrency = value => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value);

const getNestedProperty = (obj, path) => {
  // * El codigo siguiente es para obtener valores anidados de un objeto en base a un string
  // * Ejemplo: path = "product.code" => obj.product.code
  // * @author  Uriel

  return path.split(".").reduce((acc, key) => {
    return acc ? acc[key] : "N/A";
  }, obj);
};

const mapProductsLocal = (productsLocal, field) => {
  return productsLocal
    ? productsLocal.map(localItem => `<p class="package">${getNestedProperty(localItem, field)}</p>`).join(``)
    : ``;
};

export const makeTemplateOrderUpdate = (data, template) => {
  let { company, ejecutive, concept, dateOrder, adressPdf, adressBilling, products, total, discount, groupLogo } = data;

  let itemsProducts = "";

  products.forEach(item => {
    const { product, quantity, newprice, iva, total, note, productslocal = [] } = item;
    const { code, brand, name, note: productNote } = product;

    itemsProducts += ` 
            ${
              product?.ispackage
                ? `
            <tr class="item last itempackage">`
                : `<tr class="item last">`
            }
              <td>
                ${code}          
              </td>
              <td>
                ${quantity}          
              </td>
              <td>
                ${brand.name}          
              </td>
              <td>
                ${product.ispackage ? "<strong>(Producto con el que se cotizo) </strong>" : ""}
                ${productNote ? `${name} (${productNote})` : name}
              </td>
              <td class="price">
                ${formatCurrency(newprice)}
              </td>
              <td class="price">
                ${formatCurrency(iva)}          
              </td>
              <td class="price">
                ${formatCurrency(total)}   
              </td>
              <td>
                ${note}
              </td>
            </tr>
          `;
    productslocal.forEach(itemChild => {
      const { product, quantity, newprice, iva, total, note } = itemChild;
      const { code, brand, name, note: productNote } = product;

      itemsProducts += `           
            <tr class="item last itempackagechild">
              <td>
                ${code}          
              </td>
              <td>
                ${quantity}          
              </td>
              <td>
                ${brand.name}          
              </td>
              <td>              
                ${productNote ? `${name} (${productNote})` : name}
              </td>
              <td class="price">
                ${formatCurrency(newprice)}
              </td>
              <td class="price">
                ${formatCurrency(iva)}          
              </td>
              <td class="price">
                ${formatCurrency(total)}   
              </td>
              <td>
                ${note}
              </td>
            </tr>
          `;
    });
  });

  const styles = `
  body {
  margin: 0;
}
#pageFooter {
  font-size: 7px;
  color: #555;
  padding: 5px;
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
  line-height: 20px;
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
  background: #fefefefe;
}
.art-cabezera {
  background: #fefefefe;
  width: 100%;
}
.logo {
  width: 100px;
  height: 100px;
  float: left;
  margin: 3%;
}
img.img_log {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.desc_art {
  display: none;
}

.cot_art {
  width: 50%;
  margin-right: 3%;
  margin-top: 2.5%;
  margin-right: 3%;
  float: right;
  color: #4a4a4a;
}
.art_cot {
  width: 100%;
  text-align: center;
  font-size: 10pt;
  font-weight: bold;
  padding: 5px;
  color: #4a4a4a;
  float: left;
}
.num_cot {
  width: 100%;
  float: left;
  color: #4a4a4a;
}
.text_ejecutive {
  float: left;
  width: 100%;
  font-size: 8px;
  text-align: center;
  font-weight: 900;
  color: #4a4a4a;
  line-height: 150%;
}
.text_account {
  float: left;
  width: 100%;
  font-size: 8px;
  text-align: center;
  font-weight: 900;
  color: #4a4a4a;
  line-height: 150%;
}
.text_date {
  text-align: center;
  width: 100%;
  font-size: 8px;
  float: left;
  font-weight: 900;
  color: #4a4a4a;
  line-height: 150%;
}

.text_concept {
  float: left;
  width: 100%;
  font-size: 8px;
  text-align: center;
  font-weight: bold;
  color: #4a4a4a;
  line-height: 150%;
}

.cli_art {
  width: 100%;
  margin-top: 10px;
}
.client_art {
  height: 193px;
  width: 40%;
  float: left;
  margin-left: 5%;
  background: #fbf9f9;
  height: 321px;
}
.text_client {
  background: #3e8ed0;
  text-transform: uppercase;
  width: 50%;
  padding: 5px 5px 0px 5px;
  color: white;
  margin-left: 5px;
  margin-top: 0;
  font-size: 7pt;
  text-align: justify;
  font-weight: 900;
}
.descrip_client {
  font-size: 7.5pt;
  /*padding: 10px;*/
  padding: 0px 1px 3px 10px;
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
}
.text_data {
  font-size: 8px;
  /*line-height: 3px;*/
  padding: 1px 0px 4px 0px;
  overflow-wrap: break-word;
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
  background: #3e8ed0;
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
  margin-top: 4px;
  padding: 10px;
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

.itempackage{
font-size: 8px;
  line-height: 2em;
  color: #000;
  background: red;
}
.price {
  font-weight: bold;
  color: black;
  text-align: center;
}
.package {
  margin-top: -4px;
  margin-bottom: -4px;
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
   table tbody tr.itempackage {
        background-color: #b3e5fc;
      }

      table tbody tr.itempackagechild {
        background-color: #dbf4ff;
      }

  `;

  let res = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="output.css" />
      <style>
    ${styles}
  /*# sourceMappingURL=outpu.css.map */
  </style>
  </head>
  
  <body>
      <div class="container_template">
      
      <div class="box">
      <div class="art_cabezera">
        <div class="logo">

        <img src="${
          groupLogo === undefined || groupLogo === ""
            ? "https://res.cloudinary.com/dvmpejtlj/image/upload/v1694467886/sidelog_fmtchn.png"
            : URL_SPACE + groupLogo
        }"  alt="logo limenka" class="img_log" />
        
        </div>
        <div class="cot_art">
          <div class="art_cot">Formato de Pedido</div>
          <div class="num_cot">
              <span class="text_concept">Folio: ${concept}</span>
              <span class="text_ejecutive">Ejecutivo: ${ejecutive.name} ${ejecutive.lastname} </span>
              <span class="text_account">Cuenta de pago: ${data.paymentaccount} </span>
              <span class="text_date">Fecha: ${dateOrder}</span>
            </div>
        </div>
      </div>
    </div>


      <div class="cli_art">
      <div class="client_art">
      <div class="text_client">Dirección de envio</div>
      <div class="descrip_client">
      <p class="text_data">Recibe: ${adressPdf.receive}.</p>
          <p class="text_data">Teléfono: ${adressPdf.phone}.</p>
          <p class="text_data">Calle: ${adressPdf.street}.</p>
          <p class="text_data">Número Interior: ${adressPdf.int_number}.</p>
          <p class="text_data">Numero Exterior: ${adressPdf.ext_number}.</p>
          <p class="text_data">Colonia: ${adressPdf.settlement}.</p>
          <p class="text_data">C.P: ${adressPdf.postal}.</p>
          <p class="text_data">Delegación/ Municipio: ${adressPdf.city}.</p>
          <p class="text_data">Estado: ${adressPdf.entity}.</p>
          <p class="text_data">Referencias: ${adressPdf.references}</p>
          </div>
          
      </div>
      <div class="client_art">
      <div class="text_client">Datos Facturación</div>
      <div class="descrip_client">
      <p class="text_data">Razón Social: ${adressBilling?.billingbusiness}</p>
           <p class="text_data">RFC: ${adressBilling?.rfc}</p>
           <p class="text_data">Teléfono: ${adressBilling.phone}</p>
           <p class="text_data">Calle y N°: ${adressBilling?.street}, N°.Int: ${adressBilling?.int_number}, N°.Ext: ${
    adressBilling?.ext_number
  }</p>
            <p class="text_data">Colonia: ${adressBilling?.settlement}</p>
            <p class="text_data">C.P: ${adressBilling.postal}</p>
            <p class="text_data">Delegación/ Municipio: ${adressBilling.city}</p>
            <p class="text_data">Estado: ${adressBilling.entity}</p>
           <p class="text_data">Uso de CFDI:${data.cfdi}</p>
           <p class="text_data">Metodo de Pago: ${data.methodPayment}</p>
           <p class="text_data">Forma de Pago: ${data.wayPayment}</p>
           <p class="text_data">Regimen Fiscal: ${data.taxregime}</p>

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
                          <th scope="col">Precio</th>
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
          paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo
          este en perfectas condiciones. *Precios en USD O EURO A M.N. en el
          momento de la compra al tipo de cambio
          de BBVA BANCOMER a la venta. Los
          números de guia se daran despues del tercer dia.
          </div>
  </div>
  
  </body>
  
  </html> `;

  return res;
};
