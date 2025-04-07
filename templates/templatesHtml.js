export const templateEquipamientoHospitalarioGarantia = data => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Background Image</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    }
    .container {
      background-image:url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-25%20at%208.31.43%20AM.jpeg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: -1;
    }
    .content {
      padding:15px;
    }
    .head {
      padding: 30px 30px 0px 30px;  
      margin-top:14%
    }

        h1 {
            margin: 0px;
            font-size:13pt
        }

        h3 {
            margin: 0px;
            margin-top: 5px;
            font-size:10pt;
        }

        .sectionParagraph {
            padding: 0px 30px 0px 30px;
        }

        .text {
            text-align: justify;
            font-size: 6pt;
        }

        .sectionFooter {
            padding: 0px 30px 0px 30px;
            width: 500px;
            margin-top:0px;
    
        }

        .textFooter1 {
            margin-bottom: 0px;
            font-size:7pt;
        }

        .textdataFooter {
            display: inline-block;
            width: 500px;
        }

        .textFooter2left {
            width: 50%;
            float: left;
            font-weight:bold;
         }
            
        .textFooter2right {
            width: 40%;
            float: right;
            font-weight:bold;
        }

        .textleft {
          font-size: 6pt;
          margin-bottom:0px;
          margin-top:0px;
         }
            
        .textright {
          font-size: 6pt;
          margin-bottom:0px;
          margin-top:0px;
        }

        .textFooter3 {
            text-align: center;
            font-weight: bold;
            margin: 0px;
            font-size: 7pt;
        }
        .keywords{
          text-decoration:underline;
        }
        .div_firm_name{
            float: left;
            width:100%;
        }
        .content_name{
            text-align:center;
            margin-right: 50px;
            float:  right;
        }
            .line {
            margin-bottom: 2px;
            }
        .name{
           font-size: 8px;
        }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="head">
            <h1>GARANTIA</h1>
            <h3>Folio:${data?.folio}</h3>
        </div>
        <div class="sectionParagraph">
            <p class="text"><span class="keywords">Equipamiento Hospitalario</span> se reserva el derecho a cambiar la parte defectuosa o reparar la
                misma a su
                entera discreción, la
                garantía será computada desde el momento de la entrega del equipo y no cubre repuestos, mano de obra,
                calibración ni mantenimiento
                de accesorios, dispositivos y otros aditamentos ajenos al número de serie indicado en esta garantía. La
                garantía se brinda en la oficina
                central, ubicada <span class="keywords">Paseo de la Reforma 250 Ciudad de México.</span> por personal autorizado para brindar el
                servicio técnico por <span class="keywords">Equipamiento Hospitalario</span></p>
            <p class="text">I. El tiempo de reparación será en un periodo aproximado de entre 4 y 8 semanas, mismo que
                se computará
                una
                vez recibido el
                equipo en nuestras instalaciones, en caso de cambio total del equipo, el tiempo de entrega estimado será
                de 2 meses</p>
            <p class="text">
                II. La garantía solo será aplicable cuando exista un defecto de fábrica.
            </p>
            <p class="text">
                III. El diagnóstico de la falla del equipo tendrá un costo, mismo que será notificado y cubierto por el
                cliente, más gastos de
                reparaciones y/o piezas en caso de que la garantía no cubra el fallo presentado por el equipo en
                revisión
            </p>
            <p class="text">
                IV. Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo
                mediante fotografías y/o videos,
                proporcionar todos los requisitos que se le pidan y enviarlos mediante correo electrónico a su ejecutivo
                de venta. La garantía no será
                aplicable cuando el equipo sea manipulado, realice cambios o modificaciones e intervenga el equipo <span class="keywords">${data?.nameproduct}</span> por personal no autorizado por la empresa o <span class="keywords">personal ajeno a Equipamiento Hospitalario</span>
            </p>
            <p class="text">
                V. Una vez recibida la evidencia y revisada por el personal especializado en caso de que sea necesario,
                se procederá con el envío
                del equipo a nuestras oficinas, mismo que tendrá que ser enviado completo, en buen estado y con el
                empaque original además de contar
                con todos los accesorios, todos los gastos de envío, fletes y/o viáticos del biomédico serán cubiertos
                por el cliente.
            </p>
            <p class="text">
                VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas
                eléctricas o de tensión, tormentas
                eléctricas, variación de voltaje que afecten al equipo, piezas de desgaste, accesorios, piezas
                complementarias, aditamentos del equipo
                adquirido, ni calibración de los mismos.
            </p>
            <p class="text">
                VII. El cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería, si el
                equipo llega dañado o maltratado.
            </p>
            <p class="text">
                VIII. El cliente deberá presentar el recibo de compra y/o factura, para efectuar la garantía, dicho
                documento será cotejado con el
                número de serie del equipo.
            </p>
            <p class="text">
                IX. La rotura de cualquier sello de seguridad y/o códigos de barras hacen que el equipo no sea sujeto de
                garantía
            </p>
            <p class="text">
                X. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez
                cumplido el protocolo
                anterior.
            </p>
            <p class="text">
                XI. Es responsabilidad del cliente hacer un respaldo de la información que contenga en el equipo,
                <span class="keywords">Equipamiento Hospitalario</span> no se hace responsable por la pérdida de datos durante el tiempo de
                reparación. La
                garantía no cubre daños de instalación de software, virus o sistemas operativos que el cliente realice,
                así como daños por mal uso.
                adquisición según sea el caso
            </p>
        </div>
        <div class="sectionFooter">
            <p class="textFooter1">
                <span class="keywords">Equipamiento Hospitalario</span> garantiza durante el lapso de <span class="keywords">18</span> meses
            </p>
            <div class="textdataFooter">
                <div class="textFooter2left">
                    <p class="textleft">EQUIPO: ${data?.nameproduct}</p>
                    <p class="textleft">MARCA:${data?.namebrand}</p>
                    <p class="textleft">FECHA:${data?.date}</p>
                    <p class="textleft">NOMBRE DEL CLIENTE:${data?.clientname}</p>
                </div>
                <div class="textFooter2right">
                    <p class="textright">NUMEROS DE SERIE:${data?.serialnumber}</p>
                    <p class="textright">MODELO: ${data?.model}</p>
                </div>
            </div>

        </div>
         <div class="div_firm_name">
              <div class="content_name">
                <p class="line">__________________</p>
                <span class="name">Nombre y Firma</span>
              </div>
          </div>
    </div>
  </div>
</body>
</html>
  
  `;
};
export const templateMexreiGarantia = data => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Background Image</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    }
    .container {
      background-image:url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-25%20at%208.32.09%20AM.jpeg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 98%;
      height: 97%;
      position: relative;
      z-index: -1;
      padding:12px;
    }
    .content {
      padding:15px;
    }
    .headertitle {
    margin-top:6%;
            padding: 30px 30px 0px 30px;
            width: 100%;
        }
        
        .titleleft {
            float: left;
            width: 60%;
            font-size:8pt;
            margin-bottom:0px;
            }
            
        .titleright {
          float: right;
          width: 40%;
          font-size:8pt;
          margin-bottom:0px;
        }
        .sectioninitial{
            padding: 30px 30px 0px 30px;
        }
        .textinitial{
            text-align: justify;
            font-size: 6pt;
        }
        .sectionparagraph{
            padding: 0px 30px 0px 30px
        }
        .sectiontext{
            text-align: justify;
            font-size: 6pt;
        }
        .sectiongarantia{
            font-size: 6pt;
            text-align: center;
        }
        .sectionfooter{
        float: left;
            padding: 10px;
        }
        .email{
            width: 330px;
            text-align: end;
            color: grey;
            font-size: 10px;
            float:left;
        }
        .sectionmedia{
            float: right;
            margin-right:5px;
        }
        .content_divs {
          width: 100% ; 
          margin-top:10px;
          background-color:red;
        }
        .info_left{
          float: left; 
          width:70%;
        }
        .info_right {
          text-align: center;
          margin-top:50px;
          width:30%;
          float: right;
        }
        .name{
        font-size: 8px;
          }
        .line{
        margin-bottom: 2px;
        }
        img{
            width: 100px;
            height: 25px;
        }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
     <div class="headertitle">
            <h3 class="titleleft">POLIZA DE GARANTIA</h3>
            <h3 class="titleright">FOLIO: ${data?.folio}</h3>
        </div>
        <div class="sectioninitial">
            <p class="textinitial">
              ___MEXREI___ se reserva el derecho a cambiar la parte defectuosa o reparar la misma a su entera
              discreción, la garantía será computada desde el momento de la entrega del equipo y no cubre repuestos,
              mano de obra, calibración ni mantenimiento de accesorios, dispositivos y otros aditamentos ajenos al
              número de serie indicado en esta garantía. 
              
              La garantía se brinda en <b>${data.address.street}, ${data.address.city.name}, ${data.address.entity.name},C.P.${data.address.postal.postal_code}</b> la oficina central,por personal autorizado para brindar el servicio Ingeniero Biomedico de la compañia.
            </p>
        </div>
        <div class="sectionparagraph">
            <p class="sectiontext">
                I.  El tiempo de reparación será en un periodo aproximado de entre 4 y 8 semanas, mismo que se
                computará una vez recibido el equipo en nuestras instalaciones, en caso de cambio total del equipo,
                el tiempo de entrega estimado será de 2 meses
            </p>
            <p class="sectiontext">
                II.  La garantía solo será aplicable cuando exista un defecto de fábrica
            </p>
            <p class="sectiontext">
                III. El diagnóstico de la falla del equipo tendrá un costo, mismo que será notificado y cubierto por el
                cliente, más gastos de reparaciones y/o piezas en caso de que la garantía no cubra el fallo
                presentado por el equipo en revisión.                
            </p>
            <p class="sectiontext">
                IV. Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo
                mediante fotografías y/o videos, proporcionar todos los requisitos que se le pidan y enviarlos
                mediante correo electrónico a su ejecutivo de venta. La garantía no será aplicable cuando el equipo
                sea manipulado, realice cambios o modificaciones e intervenga el equipo. por personal no
                autorizado por la empresa o personal ajeno a
                __________________MEXREI___
            </p>
            <p class="sectiontext">
                V. Una vez recibida la evidencia y revisada por el personal especializado en caso de que sea necesario,
                se procederá con el envío del equipo a nuestras oficinas, mismo que tendrá que ser enviado
                completo, en buen estado y con el empaque original además de contar con todos los accesorios,
                todos los gastos de envío, fletes y/o viáticos del biomédico serán cubiertos por el cliente
            </p>
            <p class="sectiontext">
                VI. . La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas
                o de tensión, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas de desgaste,
                accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos
            </p>
            <p class="sectiontext">
                VII. El cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería, si el
                equipo llega dañado o maltratado.
            </p>
            <p class="sectiontext">
                VIII.  El cliente deberá presentar el recibo de compra y/o factura, para efectuar la garantía, dicho
                documento será cotejado con el número de serie del equipo.
            </p>
            <p class="sectiontext">
                IX.  La rotura de cualquier sello de seguridad y/o códigos de barras hacen que el equipo no sea sujeto de
                garantía.
            </p>
            <p class="sectiontext">
                X. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez
                cumplido el protocolo anterior.
            </p>
            <p class="sectiontext">
                XI. La garantía no cubre daños por mal uso o adquisición según sea el caso.
            </p>
            <p class="sectiongarantia">
                garantiza durante el lapso de 12 meses
            </p>
            <div class="content_divs">
                <div class="info_left">
                    <p class="sectiontext">
                    EQUIPO:${data?.nameproduct}
                    </p>
                    <p class="sectiontext">
                    MARCA:${data?.namebrand}
                    </p>
                    <p class="sectiontext">
                    FECHA: ${data?.date}</p>
                    <p class="sectiontext">
                    REMISIÓN:${data?.date}
                    </p>
                    <p class="sectiontext">
                    NOMBRE DEL CLIENTE: ${data?.clientname}
                    </p>
                </div>
                <div class="info_right">
                    <p class="line">____________________</p>
                    <span class="name">Nombre y Firma</span>
                </div>
            </div>
        </div>

        <div class="sectionfooter">
            <p class="email">ventas@mexrei.com</p>
            <div class="sectionmedia">
                <img src="https://thumbs.dreamstime.com/b/facebook-instagram-whatsapp-youtube-icono-del-logo-de-los-medios-sociales-vector-negro-aislado-en-fondo-blanco-185522524.jpg"/>
            </div>
        </div>
    </div>
  </div>
</body>
</html>
`;
};
export const templateMeisonGarantia = data => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Background Image</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    }
    .container {
      background-image:url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-25%20at%208.31.57%20AM.jpeg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: -1;
    }
    .content {
      padding:15px;
    }
    .headertitles {
        padding: 20px 20px 0px 20px;
        margin-bottom: 1%;
        float: right;
      }
      h2 {
        font-size: 16px;
        margin-bottom: 1%;
        color:#12AACC;
      }
      h3 {
        font-size: 15px;
        font-weight:normal;
      }
      .contentext {
        clear: both;
        padding: 0px 20px 5px 20px;
      }
      .paragraph {
        text-align: justify;
        font-size: 6pt;
        padding-bottom: 8px;
      }
      .datameison {
        padding: 0px 20px 5px 20px;
       
      }
      .sectionleft {
        width:50%;
        float: left;
      }
      .sectionright {
        width:50%;
        float: right;
      }
      .datameisonname {
        clear: both;
        // padding: 5px 20px 5px 20px;
      }
      .labelleft {
        width: 300px;
        margin: 0% 0% 5% 0%;
        font-size:6pt;
      }
      .valueleft {
        height: 20px;
        border: 1px solid grey;
        padding: 4px;
        font-size:6pt;
      }
      .labelright {
        width: 400px;
        margin: 0% 0% 4% 0%;
        font-size:6pt;
      }
      .valueright {
        height: 20px;
        border: 1px solid grey;
        padding: 4px;
        font-size:6pt;
      }
      .nameclient {
        width: 600px;
        margin: 0% 0% 5% 0%;
        font-size:6pt;
      }
      .valueclient{
        height: 20px;
        border: 1px solid grey;
        padding: 4px;
        font-size:6pt;
      }
      .keywords{
      text-decoration: underline;
      }
      .container_name_and_signature {
      margin-top: 20px;
      text-align:center;
      }
      .name {
      font-size: 8px;
      }

  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="headertitles">
        <h2>GARANTÍA</h2>
        <h3>FOLIO: ${data.folio}</h3>
      </div>
      <div class="contentext">
        <p class="paragraph">
          <span class="keywords">MEISON MEDICAL</span> se reserva el derecho a cambiar la parte defectuosa o
          reparar la misma a su entera discreción,la garantía será computada
          desde el momento de la entrega del equipo y no cubre repuestos, mano
          de obra, calibración ni mantenimiento de accesorios, dispositivos y
          otros aditamentos ajenos al número de serie indicado en esta garantía.
          La garantía se brinda en <b>${data.address.street}, ${data.address.city.name}, ${data.address.entity.name},C.P.${data.address.postal.postal_code}</b> la oficina central, por personal autorizado para brindar el
          servicio técnico por <span class="keywords">MEISON MEDICAL </span>
        </p>
        <p class="paragraph">
          I. El tiempo de reparación será en un periodo aproximado de entre 4 y 8
          semanas, mismo que se computará una vez recibido el equipo en nuestras
          instalaciones, en caso de cambio total del equipo, el tiempo de
          entrega estimado será de 2 meses
        </p>
        <p class="paragraph">
          II. La garantía solo será aplicable cuando exista un defecto de fábrica.
        </p>
        <p class="paragraph">
          III. El diagnóstico de la falla del equipo tendrá un costo, mismo que será
          notificado y cubierto por el cliente, más gastosde reparaciones y/o
          piezas en caso de que la garantía no cubra el fallo presentado por el
          equipo en revisión
        </p>
        <p class="paragraph">
          IV. Para solicitar la garantía, el cliente deberá recabar evidencia de la
          falla que presente el equipo mediante fotografías y/o videos,
          proporcionar todos los requisitos que se le pidan y enviarlos mediante
          correo electrónico a su ejecutivo de venta. La garantía no será
          aplicable cuando el equipo sea manipulado, realice cambios o
          modificaciones e intervenga el equipo.<span class="keywords"> Por personal no autorizado por
          la empresa o personal ajeno MEISON MEDICAL. </span>
        </p>
        <p class="paragraph">
          V. Una vez recibida la evidencia y revisada por el personal especializado
          en caso de que sea necesario, se procederá con el envío del equipo a
          nuestras oficinas, mismo que tendrá que ser enviado completo, en buen
          estado y con el empa- que original además de contar con todos los
          accesorios, todos los gastos de envío, fletes y/o viáticos del
          biomédico serán cubiertos por el cliente.
        </p>
        <p class="paragraph">
          VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte
          del cliente, descargas eléctricas o de tensión,tormentas eléctricas,
          variación de voltaje que afecten al equipo, piezas de desgaste,
          accesorios, piezas complementa- rias, aditamentos del equipo
          adquirido, ni calibración de los mismos
        </p>
        <p class="paragraph">
          VII. El cliente deberá notificar de forma inmediata a su ejecutivo de
          ventas y paquetería, si el equipollega dañado o maltratado.
        </p>
        <p class="paragraph">
          VIII. El cliente deberá presentar el recibo de compra y/o factura, para
          efectuar la garantía, dicho documento será coteja-do con el número de
          serie del equipo.
        </p>
        <p class="paragraph">
          IX. La rotura de cualquier sello de seguridad y/o códigos de barras hacen
          que el equipo no sea sujeto de garantía.
        </p>
        <p class="paragraph">
          X. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea
          entregado el equipo una vez cumplido el proto- colo anterior.
        </p>
        <p class="paragraph">
          XI. Es responsabilidad del cliente hacer un respaldo de la información que
          contenga en el equipo, <span class="keywords">Meison Medical no se hace responsable</span> por la
          pérdida de datos durante el tiempo de reparación. La garantía nocubre
          daños de instalación de software, virus o sistemas operativos que el
          cliente realice, así como daños por mal uso. adquisición según sea el
          caso.
        </p>
        <p class="paragraph">
          <span class="keywords">MEISON MEDICAL </span> garantiza durante el lapso de 12 meses.
        </p>
      </div>
      <div class="datameison">
        <div class="sectionleft">
          <p class="labelleft">
            EQUIPO: <span class="valueleft">${data?.nameproduct}</span>
          </p>
          <p class="labelleft">
            MARCA: <span class="valueleft">${data?.namebrand}</span>
          </p>
          <p class="labelleft">
            FECHA: <span class="valueleft">${data?.date}</span>
          </p>
          <p class="nameclient">
          NOMBRE DEL CLIENTE: <span class="valueclient">${data?.clientname}</span>
        </p>
        </div>
        <div class="sectionright">
          <p class="labelright">
            NSS: <span class="valueright">${data?.nss}</span>
          </p>
          <p class="labelright">
            MODELO: <span class="valueright">${data.model}</span>
          </p>
           <div class="container_name_and_signature">
                <p class="line">
                 ____________________
                 <br>
                <span class="name">Nombre Y Firma</span>
              </p>   
              </div>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
  `;
};

export const templateInputAndOutPuts = data => {
  const { products } = data;
  let itemsProducts = "";
  products?.products.forEach((item, index) => {
    itemsProducts += `
    <tr>
    <td>${item.code}</td>
    <td>${item.description}</td>
    <td>${item.numberSerial}</td>
    <td>${item.quantity}</td>
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
        background-color: white;
      }

        .img_log {
           width: 100%;
             margin:0px;
         }

      .container {
        width: 5.8in;
        // height: 11in;
        margin: auto;
        padding: 0px 20px 20px 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      /* el titulo  */
      .title {
        color: black;
        font-weight: 500;
        text-align: center;
        font-size: 22px;
      }

      .line {
        margin: auto;
        width: 50%;
        height: 1.5px;
        background-color: black;
      }
      /* la primera seccion  */
      .containerDateGeneral {
        width: 95%;
        margin: 10px auto 4px auto;
        border: 2px solid black;
        background-color: #fff;
      }

      .container_title {
        width: 100%;
        text-align: center;
        justify-content: space-around;
        /* display: inline-block; */
        background-color: #17406f;
        border-bottom: 2px solid black;
        overflow: hidden; /* Para limpiar los floats */
      }

      .titles_left {
        // border-right:2px solid black;
        width: 50%;
   
        font-size: 9px;
        color: white;
        font-weight: 600;
        margin-left: px;
        float: left; /* Hacer que ambos elementos floten a la izquierda */
        margin: 0;
      }

      .titles_right {
        width: 50%;

        font-size: 9px;
        color: white;
        font-weight: 600;
        float: left; /* Hacer que ambos elementos floten a la izquierda */
        margin: 0; /* Eliminar márgenes para alineación más precisa */
      }

      .titles_right {
        float: right; /* Alinear el segundo título a la derecha */
      }

      .container_div_date_General {
        overflow: hidden; /* Clear floats */
      }

      .div_left,
      .div_rigth {
        float: left;
        width: 50%;
      }

      .content_div_left {
        padding: 5px;
      }

      .content_div {
       vertical-align: middle;
      }

      .text_left {
        width: 50%;
        font-size: 7px;
        font-weight: 600;
        float: left;
      }
        .div_liner_input{
    
        height:15px;
        }

      .content_div_liner {
        float: unset;
        align-items: center;
          // display: block;
        width: 100%;
      }

      .liner_int {
       float: right;
        width: 50%;
        border-bottom: 1px solid black;
      }

      .div_rigth {
        height: auto;
        width: 50%;
      }
      .table_dat {
        border-collapse: collapse;
      }
      .row_tr {
        display: flex;
      }

      .cell {
        font-size: 7px;
        flex: 1; /* Distribuye el espacio uniformemente entre las celdas */
        border: 0.5px solid rgb(100, 100, 100); /* Bordes de las celdas */
        padding: 3px; /* Espaciado dentro de las celdas */
        text-align: center; /* Alinea el texto en el centro */
      }

      .text_observations {
        color: black;
        height: 110px;
        padding: 3px;
      }
      .container_date {
        margin-top: 10px;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
      }
      .conten_div_date {
        display: flex;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
        /* margin: auto; */
        height: 15px;
        border: 1.5px solid black;
      }
      .div_date {
        width: 50%;
        border: 0.5px solid black;
      }

      .table {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        border-collapse: collapse;
        text-align: center;
      }

      .table,
      .th,
      .td {
        border: 2px solid black;
        font-size: 9px;
      }

      .th,
      .td {
        border: 1.5px solid black;
        text-align: center;
        /* Establece un ancho mínimo para las celdas */
        height: 15px;
      }

      .thead {
        background: #fbfbfb;
        color: #000000;
      }

      .firm {
        margin-top: 30px;
        width: 100%;
        text-align: center;
      }
      .line_firme {
        height: 2px;
        margin: auto;
        border-bottom: 2px solid black;
        width: 30%;
      }
      .text_firm {
        font-size: 10px;
        font-weight: bold;
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
        color: red;
        font-weight: 600;
        float:left;
        font-size: 8px;
        strong {
          margin-right: 20px;
        }
      }
      .strong {
      margin-left: 10px;
         float: right;
        color: green;
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
        /* border: 2px solid black; */
        /* height: 100px; */
        /* padding-left: 30px; */
      }

      .izquierda {
        margin-left: 6px;
        float: left; /* Flota a la izquierda */
      }

      .derecha {
        margin-right: 13px;
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
      .titles_observations{
        color: white;
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
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        border-collapse: collapse;
        text-align: center;
      }

      table,
      th,
      td {
        border: 2px solid black;
        font-size: 9px;
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
        .table_section {
         min-height: 160px; 
        }

      /* .backgroundgrey {
        background-color: lightgray;
      } */
    </style>
  </head>
  <body>
     <div class="image">
     <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/HEADER.jpg" class="img_log" />
    </div>
      <p class="title">FORMATO DE ENTRADA / SALIDA</p>
      <div class="line"></div>
      <div class="row">
        <div class="containerDateGeneral">
          <div class="container_title">
            <p class="titles_left">DATOS GENERALES</p>
            <p class="titles_right">DATOS DEL CLIENTE</p>
          </div>
          <div class="container_div_date_General">
            <div class="div_left">
              <div class="content_div_left">
                <div class="content_div">
                  <p class="text_left">SOLICITANTE O EJECUTIVO:</p>
                  <div class="content_div_liner">
                    <p class="div_liner_input">${date_uno.EjecutiveName}</p>
                    <div class="liner_int"></div>
                  </div>
                </div>
                <div class="content_div">
                  <p class="text_left">FOLIO PEDIDO:</p>
                  <div class="content_div_liner">
                    <p class="div_liner_input">${date_uno.Folio}</p>
                    <div class="liner_int"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="div_rigth">
              <div class="content_div_left">
                <div class="content_div">
                  <p class="text_left">NOMBRE DEL CLIENTE:</p>
                  <div class="content_div_liner">
                    <p class="div_liner_input">${date_uno.ClienteName}</p>
                    <div class="liner_int"></div>
                  </div>
                </div>
                <div class="content_div">
                  <p class="text_left">TELÉFONO:</p>
                  <div class="content_div_liner">
                    <p class="div_liner_input">${date_uno.Phone}</p>
                    <div class="liner_int"></div>
                    <p class="folio">
                      FOLIO INTERNO: <strong class="strong">${date_uno.FolioInt}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="column izquierda">
          <table>
            <thead>
              <tr>
                <th colspan="2">TIPO DE ENTRADA</th>
              </tr>
            </thead>
            <tbody>
              <tr class="tr">
                <td>CORRECTIVO/PREVENTIVO</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>A CUENTA</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>GARANTIA</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>REVISIÓN</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>CAMBIO</td>
                <td>------------------</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="column derecha">
          <table>
            <thead>
              <tr>
                <th colspan="2">SALIDA</th>
              </tr>
            </thead>
            <tbody>
              <tr class="tr">
                <td>PRESTAMO</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>CAMBIO</td>
                <td>------------------</td>
              </tr>
              <tr>
                <td>PROVEEDOR</td>
                <td>------------------</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <section class="table_section">
        <table>
          <thead>
            <tr>
              <th>MODELO</th>
              <th>DESCRIPCION</th>
              <th>NÚMERO DE SERIE</th>
              <th>ACCESORIOS</th>
            </tr>
          </thead>
          <tbody>
         ${itemsProducts}
          </tbody>
        </table>
      </section>
      <section>
        <div class="containerDateGeneral">
          <div class="container_title">
            <p class="titles_observations">OBSERVACIONES</p>
          </div>
          <div class="text_observations">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dolor et vitae pariatur a distinctio, cum neque reprehenderit dignissimos ab illo debitis atque consequuntur quod, vero aspernatur officiis, libero doloremque.</p>
          </div>
        </div>
      </section>
      <section>
        <div class="container_date">
          <p>FECHA Y HORA DE INGRESO</p>
          <div class="conten_div_date">
            <div class="div_date"></div>
            <div class="div_date"></div>
          </div>
        </div>
        <div class="new_table">
          <table class="table">
            <thead class="thead">
              <tr class="tr">
                <th class="th">NOMBRE Y FORMA LOGISTICA</th>
                <th class="th">NOMBRE Y FIRMA DE ING BIOMÉDICO</th>
                <th class="th">NOMBRE Y FIRMA CLIENTE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="container_date">
          <p>FECHA Y HORA DE SALIDA</p>
          <div class="conten_div_date">
            <div class="div_date"></div>
            <div class="div_date"></div>
          </div>
        </div>
        <div class="new_table">
          <table class="table">
            <thead class="thead">
              <tr class="tr">
                <th class="th">NOMBRE Y FORMA LOGISTICA</th>
                <th class="th">NOMBRE Y FIRMA DE ING BIOMÉDICO</th>
                <th class="th">NOMBRE Y FIRMA CLIENTE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <div class="firm">
          <div class="line_firme"></div>
          <p class="text_firm">FIRMA DE EJECUTIVO</p>
        </div>
      </section>
    </div>
  </body>
</html> `;
};

export const templateNoteRemission = data => {
  console.log("entro al templatenota", data.sphere);

  let itemsProducts = "";
  data?.products?.forEach((item, index) => {
    itemsProducts += `
          <tr>
              <td>${item.articleCant}</td>
              <td>${item.articleunidad}</td>
               <td>${item.id}</td>
              <td>${item.code}</td>
              <td>${item.name}</td>
          </tr>
        `;
  });
  return `
      <!DOCTYPE html>
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
          background-color: #fff;
        }
    
        .content_titles_image {
          width: 100%;
          overflow: hidden;
          margin-bottom: 5px;
          /* border: 1px solid #ddd; */
          padding: 10px;
          box-sizing: border-box;
        }
    
        .logo {
          float: left;
          width: 150px;
          height: auto;
          margin-right: 20px;
        }
    
        .title_info_logo {
          color: #a2999d;
          float: left;
          width: calc(100% - 300px);
          text-align: center;
          text-align: center;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
    
        .title {
          float: right;
          width: 200px;
          text-align: right;
          margin-top: 20px;
          color: #358da1;
          font-weight: 500;
          padding: 0;
          font-size: 13px;
          box-sizing: border-box;
        }
    
        .container {
          width: 5.8in;
          // height: 11in;
          margin: auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .date_info {
          width: 100%;
          overflow: hidden;
          margin-bottom: 5px;
          /* border: 1px solid #eb5d5d; */
          /* padding: 10px; */
          box-sizing: border-box;
        }
    
        .date_info_medical {
          float: left;
          width: 70%;
          /* background: rgb(0, 255, 26); */
        }
    
        .info_medical_text {
          font-size: 8px;
          color: #52595f;
          font-weight: 600;
          margin-bottom: 5px;
        }
    
        .date_info_bay {
    
          width: 30%;
          /* background: red; */
          float: right;
        }
    
        .date_info_bay {
          overflow: hidden;
          text-align: center;
        }
    
        .content_info_left {
          float: left;
        }
    
        .content_info_right {
          float: right;
        }
    
        .title_info {
          font-weight: 800;
          padding: 0px;
          font-size: 8px;
          color: red;
        }
    
        .subtitle_info {
          color: #52595f;
          font-weight: bold;
        }
    
        .divider {
          background-color: #bbbbbb;
          height: 5px;
        }
    
        .div_content {
          margin-top: 10px;
          width: 100%;
        }
        .container_buy_left {
    
          float: left;
          width: 60%;
    
        }
        .container_buy_right {
          float: right;
          width: 40%;
        }
        .text {
          color: grey;
          font-size: 9px;
          font-weight: 500;
        }
        strong {
          font-size: 8px;
          color: #444a4f;
        }
    
        .text_right {
          font-size: 8px;
          color: rgb(235, 32, 32);
          font-weight: 800;
        }
    
        .div_table {
          width: 100%;
          float: left;
          min-height: 460px;
    
        }
    
        table {
          margin-top: 10px;
          width: 100%;
        }
    
        thead {
          background-color: #cdcdcd;
        }
    
        tr {
          text-align: center;
          color: rgb(36, 34, 34);
          font-size: 8px;
        }
        p {
          margin: 0px 0;
          font-size: 9px;
        }
        .cant {
          padding: 4px;
          width: 10%;
        }
    
        td {
          font-size: 7px;
        }
        .dub {
          margin-top: 30px;
          float: left;
          width: 100%;
          text-align: center;
        }
        .name {
          margin-bottom: 20px;
        }
    
        .firm {
          background-color: black;
          width: 40%;
          height: 2px;
          margin: auto;
        }
        .reg {
        margin-top: 30px;
          font-size: 5px;
          color: #444a4f;
        }
      </style>
    </head>
    
    <body>
       <div class="container">
        <div class="content_titles_image">
          <img class="logo" src=${data.sphere}></img>
          <p class="title_info_logo">Empresa número uno
            en distribución de
            equipo médico</p>
          <p class="title">NOTA DE REMISIÓN </p>
        </div>
        <section>
          <div class="date_info">
            <div class="date_info_medical">
              <p class="info_medical_text">Av Instituto Politécnico Nacional 5129 </p>
              <p class="info_medical_text">Capultitlán, Del. Gustavo A. Madero, CP 07370 Ciudad de México. 06600</p>
              <p class="info_medical_text">TELEFONO. 55 5861 8906</p>
            </div>
            <div class="date_info_bay">
              <div class="content_info_left">
                <p class="title_info">Folio núm.</p>
                <p class="subtitle_info">${data.folioSerial}</p>
                <p class="title_info">Entrega</p>
                <p class="subtitle_info">${data.createdAt}</p>
              </div>
              <div class="content_info_right">
                <p class="title_info">Emisión</p>
                <p class="subtitle_info">${data.createdAt}</p>
                <p class="title_info">Expedición</p>
                <p class="subtitle_info">ALMACEN</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="divider"></div>
        </section>
    
        <div class="div_content">
          <div class="container_buy_left">
            <p class="text">Nombre: <strong>${data.client.name}</strong> </p>
            <p class="text">Dirección: <strong>${data.client.street}</strong></p>
            <p class="text">Ciudad y C.P.: <strong>134587</strong></p>
            <p class="text">Telefono: <strong>${data.phone}</strong></p>
            <p class="text">Referencia: <strong>Sin refencia</strong></p>
          </div>
          <div class="container_buy_right">
            <p class="text_right">Ejecutivo: <strong class="strong_right">${data.EjecutiveName}</strong></p>
            <p class="text_right">Pedido: <strong class="strong_right">${data.Folio}</strong></p>
          </div>
          <div class="div_table">
            <table>
              <thead>
                <tr>
                  <th class="cant">Cantidad</th>
                  <th class="cant">Unidad</th>
                  <th class="cant">Numero Serie</th>
                  <th class="cant">CLAVE</th>
                  <th class="">Descripción</th>
                </tr>
              </thead>
              <tbody>
                 ${itemsProducts}
              </tbody>
            </table>
     
          </div>
          <div class="dub">
            <p class="name">Nombre Completo y Firma</p>
            <div class="firm"></div>
            <p class="reg">Es responsabilidad del cliente revisar cada uno de los productos entregados. En caso de tener
              alguna observación, favor de reportarla inmediatamente
              vía correo electronico al ejecutivo de ventas durante los 2 días hábiles siguientes a su entrega. De lo
              contrario la empresa no se hace responsable por
              cualquier desperfecto físico que llegara a tener dicho producto. </p>
          </div>
        </div>
      </div>
    </body>
    </html> `;
};

export const templateSalidaGeneral = data => {
  let itemsProducts = "";
  data?.products?.forEach((item, index) => {
    itemsProducts += `
          <tr>
              <td>${item.articleCant}</td>
              <td>${item.articleunidad}</td>
              <td>${item.id}</td>
              <td>${item.code}</td>
              <td>${item.name}</td>
          </tr>
        `;
  });
  return `
      <!DOCTYPE html>
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
          background-color: #fff;
        }
    
        .content_titles_image {
          width: 100%;
          overflow: hidden;
          margin-bottom: 5px;
          /* border: 1px solid #ddd; */
          padding: 10px;
          box-sizing: border-box;
        }
    
        .logo {
          float: left;
          width: 150px;
          height: auto;
          margin-right: 20px;
        }
    
        .title_info_logo {
          color: #a2999d;
          float: left;
          width: calc(100% - 300px);
          text-align: center;
          text-align: center;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
    
        .title {
          float: center;
          width: 100%;
          text-align: center;
          margin-top: 20px;
          color:  #203764;
          font-weight: 200;
          padding: 0;
          font-size: 14px;
          box-sizing: border-box;
        }
    
        .container {
          width: 5.8in;
          // height: 11in;
          margin: auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .date_info {
         text-align: right;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
    
        .info_medical_text {
          font-size: 8px;
          color: #52595f;
          font-weight: 600;
          margin-bottom: 5px;
        }
    
        .date_info_bay {
    
          width: 30%;
          /* background: red; */
          float: right;
        }
    
        .date_info_bay {
          overflow: hidden;
          text-align: center;
        }
    
        .content_info_left {
          float: left;
        }
    
        .content_info_right {
          float: right;
        }
    
        .title_info {
          font-weight: 800;
          padding: 0px;
          font-size: 8px;
          color: red;
        }
    
        .subtitle_info {
          color: #52595f;
          font-weight: bold;
          margin-left: 200px;
        }
    
        .divider {
          background-color: #bbbbbb;
          height: 5px;
        }
    
        .div_content {
          margin-top: 10px;
          width: 100%;
        }
        .container_buy_left {
    
          float: left;
          width: 60%;
    
        }
        .container_buy_right {
          float: right;
          width: 40%;
        }
        .text {
          color: grey;
          font-size: 9px;
          font-weight: 500;
        }
        strong {
          font-size: 8px;
          color: #444a4f;
        }
    
        .text_right {
          font-size: 8px;
          color: rgb(235, 32, 32);
          font-weight: 800;
        }
    
        .div_table {
          width: 100%;
          float: left;
          min-height: 460px;
    
        }
    
        table {
          margin-top: 10px;
          width: 100%;
        }
    
        thead {
          background-color: #b4c6e7;
        }
    
        tr {
          text-align: center;
          color: rgb(36, 34, 34);
          font-size: 8px;
        }
        p {
          margin: 0px 0;
          font-size: 9px;
        }
        .cant {
          padding: 4px;
          width: 10%;
        }
    
        td {
          font-size: 7px;
        }
        .dub {
          margin-top: 30px;
          float: left;
          width: 100%;
          text-align: center;
        }
        .name {
          margin-bottom: 20px;
        }
    
        .firm {
          background-color: black;
          width: 40%;
          height: 2px;
          margin: auto;
        }

        .firma {
          background-color: black;
          width: 130px;
          height: 2px;
          margin: auto;
        }

        .reg {
        margin-top: 30px;
          font-size: 5px;
          color: #444a4f;
        }

  .bold_text {
    font-weight: bold;
    color: #0b2c4c;
      font-size: 9px;
  }

  .with_line {
    border-top:1px solid black;
    border-bottom: 1px solid black;
    padding: 2px 0; /* Ajusta el espaciado alrededor de la línea */
  }

  .dynamic_text {
  color: #000;
  font-weight: 200;
   font-size: 9px;
}

 .container_firm {
    text-align: center; /* Centra los elementos en el contenedor */
  }

  .container_firm div {
    display: inline-block;
    margin: 0 10px; /* Espaciado horizontal entre los div */
  }

  .margin_top {
   margin-top: 30px;
  }


      </style>
    </head>
    
    <body>
       <div class="container">
        <div class="content_titles_image">
          <img class="logo" src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/prueba/DE0eN_prueba     "></img>
          <p class="title">SALIDA GENERAL DE EQUIPO MEDICO </p>
        </div>
    
        
            <div class="date_info">
                 <p class="subtitle_info bold_text">
    Folio: <span class="dynamic_text">${data.folioSerial}</span>
  </p>
                <p class="subtitle_info bold_text">Fecha de emisión:<span class="dynamic_text">${data.createdAt}</span> </p>
                <p class="subtitle_info bold_text with_line">Fecha de salida: <span class="dynamic_text">${data.createdAt}</span></p>
            </div>
        
       
    
        <div class="div_content">
          <div class="div_table">
            <table>
              <thead>
                <tr>
                  <th class="cant">Cantidad</th>
                  <th class="cant">Unidad</th>
                   <th class="cant">Numero Serie</th>
                  <th class="cant">CLAVE</th>
                  <th class="">Descripción</th>
                </tr>
              </thead>
              <tbody>
                 ${itemsProducts}
              </tbody>
            </table>
     
          </div>

          <div class="container_firm">
            <div>
             <div class="firma"></div>
              <p>OPERADOR</p>
            </div>
            <div >
              <div class="firma"></div>
              <p>VIGILANCIA</p>
            </div>
            <div>
              <div class="firma"></div>
              <p>OSCAR ADAIR MARTINEZ ALMACÉN</p>
            </div>

          </div>

            <div class="margin_top"> </div>

          <div class="container_firm">
            <div>
              <div class="firma"></div>
              <p >VIGILANCIA EXTERNA</p>
            </div>
            <div>
              <div class="firma"></div> 
              <p >SERGIO LOPEZ GERENCIA</p>
            </div>
            <div>
              <div class="firma"></div>
              <p >MARIA MARTINEZ</p>
            </div>
           </div>
       

        </div>
      </div>
    </body>
    </html> `;
};
export const templateSalidaGeneralForaneos = data => {
  let itemsProducts = "";
  data?.products?.forEach((item, index) => {
    itemsProducts += `
          <tr>
              <td>${item.articleCant}</td>
              <td>${item.articleunidad}</td>
              <td>${item.id}</td>
              <td>${item.code}</td>
              <td>${item.name}</td>
          </tr>
        `;
  });
  return `
      <!DOCTYPE html>
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
          background-color: #fff;
        }
    
        .content_titles_image {
          width: 100%;
          overflow: hidden;
          margin-bottom: 5px;
          /* border: 1px solid #ddd; */
          padding: 10px;
          box-sizing: border-box;
        }
    
        .logo {
          float: left;
          width: 150px;
          height: auto;
          margin-right: 20px;
        }
    
        .title_info_logo {
          color: #a2999d;
          float: left;
          width: calc(100% - 300px);
          text-align: center;
          text-align: center;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
    
        .title {
          float: center;
          width: 100%;
          text-align: center;
          margin-top: 20px;
          color:  #203764;
          font-weight: 200;
          padding: 0;
          font-size: 14px;
          box-sizing: border-box;
        }
    
        .container {
          width: 5.8in;
          // height: 11in;
          margin: auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .date_info {
         text-align: right;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
    
        .info_medical_text {
          font-size: 8px;
          color: #52595f;
          font-weight: 600;
          margin-bottom: 5px;
        }
    
        .date_info_bay {
    
          width: 30%;
          /* background: red; */
          float: right;
        }
    
        .date_info_bay {
          overflow: hidden;
          text-align: center;
        }
    
        .content_info_left {
          float: left;
        }
    
        .content_info_right {
          float: right;
        }
    
        .title_info {
          font-weight: 800;
          padding: 0px;
          font-size: 8px;
          color: red;
        }
    
        .subtitle_info {
          color: #52595f;
          font-weight: bold;
          margin-left: 200px;
        }
    
        .divider {
          background-color: #bbbbbb;
          height: 5px;
        }
    
        .div_content {
          margin-top: 10px;
          width: 100%;
        }
        .container_buy_left {
    
          float: left;
          width: 60%;
    
        }
        .container_buy_right {
          float: right;
          width: 40%;
        }
        .text {
          color: grey;
          font-size: 9px;
          font-weight: 500;
        }
        strong {
          font-size: 8px;
          color: #444a4f;
        }
    
        .text_right {
          font-size: 8px;
          color: rgb(235, 32, 32);
          font-weight: 800;
        }
    
        .div_table {
          width: 100%;
          float: left;
          min-height: 460px;
    
        }
    
        table {
          margin-top: 10px;
          width: 100%;
        }
    
        thead {
          background-color: #b4c6e7;
        }
    
        tr {
          text-align: center;
          color: rgb(36, 34, 34);
          font-size: 8px;
        }
        p {
          margin: 0px 0;
          font-size: 9px;
        }
        .cant {
          padding: 4px;
          width: 10%;
        }
    
        td {
          font-size: 7px;
        }
        .dub {
          margin-top: 30px;
          float: left;
          width: 100%;
          text-align: center;
        }
        .name {
          margin-bottom: 20px;
        }
    
        .firm {
          background-color: black;
          width: 40%;
          height: 2px;
          margin: auto;
        }

        .firma {
          background-color: black;
          width: 130px;
          height: 2px;
          margin: auto;
        }

        .reg {
        margin-top: 30px;
          font-size: 5px;
          color: #444a4f;
        }

  .bold_text {
    font-weight: bold;
    color: #0b2c4c;
      font-size: 9px;
  }

  .with_line {
    border-top:1px solid black;
    border-bottom: 1px solid black;
    padding: 2px 0; /* Ajusta el espaciado alrededor de la línea */
  }

  .dynamic_text {
  color: #000;
  font-weight: 200;
   font-size: 9px;
}

 .container_firm {
    text-align: center; /* Centra los elementos en el contenedor */
  }

  .container_firm div {
    display: inline-block;
    margin: 0 10px; /* Espaciado horizontal entre los div */
  }

  .margin_top {
   margin-top: 30px;
  }


      </style>
    </head>
    
    <body>
       <div class="container">
        <div class="content_titles_image">
          <img class="logo" src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/prueba/DE0eN_prueba     "></img>
          <p class="title">SALIDA GENERAL DE EQUIPO MEDICO </p>
        </div>
    
        
            <div class="date_info">
                 <p class="subtitle_info bold_text">
    Folio: <span class="dynamic_text">${data.folioSerial}</span>
  </p>
                <p class="subtitle_info bold_text">Fecha de emisión:<span class="dynamic_text">${data.createdAt}</span> </p>
                <p class="subtitle_info bold_text with_line">Fecha de salida: <span class="dynamic_text">${data.createdAt}</span></p>
            </div>
        
       
    
        <div class="div_content">
          <div class="div_table">
            <table>
              <thead>
                <tr>
                  <th class="cant">Cantidad</th>
                  <th class="cant">Unidad</th>
                   <th class="cant">Numero Serie</th>
                  <th class="cant">CLAVE</th>
                  <th class="">Descripción</th>
                </tr>
              </thead>
              <tbody>
                 ${itemsProducts}
              </tbody>
            </table>
     
          </div>

          <div class="container_firm">
            <div>
             <div class="firma"></div>
              <p>GERENTE</p>
            </div>
            <div >
              <div class="firma"></div>
              <p>ADMINISTRADOR</p>
            </div>
            <div>
              <div class="firma"></div>
              <p>EJECUTIVO</p>
            </div>
          </div>
          <div class="margin_top"> </div>
          </div>
      </div>
    </body>
    </html> `;
};
export const templateHelsemedicalGarantia = data => {
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template</title>
<style>
.layout {
  margin: 0;
}

.layout .footer {
    text-align: justify;
    font-size: 8px;
    color: #000;
    line-height: 1em;
}

.layout #pageFooter {
    margin-top: 10px;
    font-size: 8px;
    color: #000;
    width: 100%;
    float: left;
}

@page {
    size: A4;
    margin: 0;
}

.layout .container_template {
    border: 1px solid #eee;
    font-size: 10px;
    font-family: "Calibri", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    position: relative;
}

.layout img {
    position: static;
}

.layout .bg_img {
    opacity: 0.2;
    position: absolute;
    height: 100px;
    top: 325px;
    left: 210px;
}

.layout .box {
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 0;
    display: inline-block;
    background: #ededed;
    display: flex;
    position: relative;
}

.layout .head_Main {
    display: flex;
}

.layout .head_Main .colum_one img {
    width: 500px;
}

.layout .head_Main .colum_two {
    margin-top: 30px;
}

.layout .head_Main .colum_two img {
    width: 200px;
}

.layout .head_Main .colum_two p {
    font-weight: 550;
    font-size: medium;
}

.layout .head_Two {
    position: relative;
    display: flex;
    margin-top: -35px;
    justify-content: center;
}

.layout .head_Two .text_Main {
    color: black;
    font-size: 40px;
    font-weight: 600;
    margin-left: 220px;
}

.layout .head_Two .text_Product {
    color: #2596be;
    font-size: large;
    font-weight: 600;
    margin-left: 40px;
}

.layout .text_Articles {
    padding: 40px;
}
    .text_Articles .list{
      text-align:justify;
      margin-top:6px;
    }
    .text_Articles span{
      font-weight: 500;
    }
    .list .name{
      text-decoration:underline;
    }
    .list .span_italics {
      font-style: italic;
      text-decoration: underline;
    }
    .text_Articles .color{
      font-weight: 600;
    }
    .text_Articles .list-footer {
      display: grid;
      font-size: 8px;
    }



.layout .template_Two img{
  width: 100%;
}
.layout .template_Two .title_body_Two {
    margin-bottom: 8px;
    display: flex;
}
.layout .template_Two .title_body_Two .folio {
    width: 100px;
    height: 16px;
    border: 1px solid #000;
}
.layout .template_Two .title_body_Two .folio p {
    margin-top: 2px;
    text-align: center;
    font-weight: 600;
    font-size: small;
}
 table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            font-size: 10px;
            padding: 4px;
        }
        th, td {
            width: 25%;
            height: 18px;
            text-align: center;
        }
        .signatures{
          height: 86px;
        }
        .signatures p{
          margin-bottom: 60px;
          font-weight: 600;
        }
     
        .full-width {
            width: 100%;
        }
        .half-width {
            width: 50%;
        }
        .quarter-width {
            width: 25%;
        }
        .head {
          background: #f5f5f5;
          border: 1px solid #000;
          outline: 1px solid black;
          font-size: small;
          font-weight: 600;
          text-align: center;
          padding: 6px;
        }


.layout .template_Three img{
  width: 100%;
}
.layout .template_Three .title_body_Three {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.layout .template_Three .title_body_Three p {
    font-weight: 600;
    text-align: center;
    font-size: 14px;
}
.layout .template_Three .date {
    margin-top: 24px;
    font-weight: 500;
    font-size: small;
    margin-left: 400px;
    font-style: italic;
}
.layout .template_Three .body_body .text_body_body_three {
    font-weight: 600;
    text-align: justify;
    padding: 40px;
}
.layout .template_Three .body_body .text_body_body_three p {
    font-size: smaller;
}
.small_table{
  padding: 40px;
}
.label, .input {
  background:aliceblue;
}
.layout .template_Three .body_body .text_signatures {
    display: flex;
}
.layout .template_Three .body_body .text_signatures span {
    margin-left: 70px;
}
.layout .template_Three .body_body .text_signatures p {
    margin-left: 120px;
}
.layout .template_Three .body_body .text_signatures .span_name{
  margin-left: 116px;
}
.layout .template_Three .text_footer {
    padding: 41px;
}
.layout .template_Three .text_footer p {
    font-size: smaller;
    font-weight: 600;
    text-align: justify;
}
.layout .template_Three .text_footer span {
    color: #244076;
    font-weight: 600;
    font-size: smaller;
}
.layout .template_Three .text_footer .span_footer {
    color: #244076;
    font-weight: 600;
    font-size: smaller;
    margin-left: 90px;
}


.container {
    position: relative;
    background: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/image%20(6).jpeg") no-repeat center center;
    background-repeat: no-repeat; 
    background-size: 100% 100%;
    color: #000;
    font-family: Arial, sans-serif;
    padding:0px;
    heigth: 100%;
}
</style>
</head>

<body>
    <section class="layout">
        <div class="container_template">

          <div class="container">

           <div class="Body">
            <div class="text_Articles">
              <div class="list">
                </br>
                <p class="folio"> Folio: ${data.folio} </p>
                <span class="name"> HELSE MEDICAL</span> se reserva el derecho a cambiar la parte defectuosa o reparar la misma a su
                entera discreción, la garantía será computada desde el momento de la entrega del equipo y no cubre
                repuestos, mano de obra, calibración ni mantenimiento de accesorios, dispositivos y otros aditamentos
                ajenos al número de serie indicado en esta garantía. La garantía se brinda en la oficina central,
                ubicada <span class="span_italics">Cto Héroes 53, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.</span> por
                personal autorizado para brindar el servicio técnico por parte del Área Biomédica
              </div>

              <div class="list">
              <p><span>I.</span>  El tiempo de reparación será en un periodo aproximado de entre 4 y 8 semanas, mismo que se computará 
              una vez recibido el equipo en nuestras instalaciones, en caso de cambio total del equipo, 
              el tiempo de entrega estimado será de 2 meses.
              </p>
              </div>

              <div class="list">
                <span>II.</span> La garantía solo será aplicable cuando exista un defecto de fábrica.
                de instalación.
              </div>

              <div class="list">
                <span>III.</span> El diagnóstico de la falla del equipo tendrá un costo, mismo que será notificado y cubierto por el cliente, 
                másgastos de reparaciones y/o piezas en caso de que la garantía no cubra el fallo presentado por el equipo en revisión.
              </div>

              <div class="list">
                <span>IV.</span>Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo 
                mediantefotografías y/o videos, proporcionar todos los requisitos que se le pidan y enviarlos mediante correo electrónico 
                a su ejecutivo de venta. La garantía no será aplicable cuando el equipo sea manipulado, realice cambios o 
                modificaciones e intervenga el equipo. por personal no autorizado por la empresa o personal ajeno HELSE MEDICAL.
              </div>

              <div class="list">
                <span>V.</span> Una vez recibida la evidencia y revisada por el personal especializado en caso de que sea
                necesario, <span class="span_italics">se procederá con el envío del equipo a nuestras oficinas, </span>
                mismo que tendrá que ser enviado completo, en buen estado y con el empaque original además de contar con
                todos los accesorios, todos los gastos de envío, fletes y/o viáticos del biomédico serán cubiertos por
                el cliente.
              </div>

              <div class="list">
                <span>VI.</span> La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente,
                descargas eléctricas o de tensión, tormentas eléctricas, variación de voltaje que afecten al equipo,
                piezas de desgaste, accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración
                de los mismos.
              </div>

              <div class="list">
                <span>VII.</span> El cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería,
                si el equipo llega dañado o maltratado.
              </div>

              <div class="list">
                <span>VIII.</span> El cliente deberá presentar el recibo de compra y/o factura, para efectuar la
                garantía, dicho documento será cotejado con el número de serie del equipo.
              </div>

              <div class="list">
                <span>IX.</span> La rotura de cualquier sello de seguridad y/o códigos de barras hacen que el equipo no
                sea sujeto de garantía.
              </div>

              <div class="list">
                <span>X.</span> El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el
                equipo una vez cumplido el protocolo anterior.
              </div>

              <div class="list">
                <span>XI.</span> Es responsabilidad del cliente hacer un respaldo de la información que contenga en el
                equipo, <span class="span_italics"> HELSE MEDICAL </span> no se hace responsable por la pérdida de
                datos durante el tiempo de reparación. La garantía no cubre daños de instalación de software, virus o
                sistemas operativos que el cliente realice, así como daños por mal uso. adquisición según sea el caso.
                Es responsabilidad del cliente tener el área adecuada para la instalación del equipo, así mismo, la
                estructura y medidas de seguridad dictadas por COFEPRIS previo a la instalación.
              </div>
              
              <p class="color">HELSE MEDICAL garantiza durante el lapso de 12 meses en equipo</p>

              <div class="list-footer">
                <p>FECHA: <span> ${data?.date} </span></p>
                <p>FOLIO: <span> ${data?.folio} </span></p>
                <p> NOMBRE DEL CLIENTE: <span> ${data?.clientname}</span></p>
              </div>
            </div>
          </div>
       </div>

       <div class="template_Two">
          <div><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/image%20(1).jpeg" /> </div>
                <div class="title_body_Two">
                    <div class="folio"><p>Folio </p></div>
                    <div class="folio"><p> ${data?.folio} </p></div>
                </div>

    <table class="full-width">
      <div class="head"> <p class="title">NOTA DE REMISIÓN </p> </div>
       
        <tr>
            <td colspan="3">NOMBRE (PERSONA FISICA) O RAZÓN SOCIAL (PERSONA MORAL)</td>
             <td>R.F.C.</td>   
        </tr>

        <tr>
            <td colspan="3" > ${data?.clientname} </td>
            <td>${data?.rfc} </td>
        </tr>
        <tr>
            <td colspan="2" >CALLE, NÚMERO EXT/INT</td>
            <td>COLONIA</td>
            <td>DELEGACIÓN O MUNICIPIO</td>
        </tr>
         <tr>
            <td colspan="2" > ${data?.address?.street},N.ex${data?.address?.ext_number},N.int${data?.address?.int_number}</td>
            <td >${data?.address?.entity?.name} </td>
            <td >${data?.address?.city?.nam} </td>
        </tr>
        <tr>
            <td colspan="2">LOCALIDAD</td>
            <td>CÓDIGO POSTAL</td>
            <td colspan="2">ENTIDAD FEDERATIVA</td>
        </tr>
        <tr>
            <td colspan="2"> ${data?.address?.entity?.name} </td>
            <td > ${data?.address?.postal?.postal_code} </td>
            <td > ${data?.address?.entity?.name} </td>
        </tr>
        <tr>
            <td>ENTRE CALLE</td>
            <td>Y CALLE</td>
            <td>TELÉFONO</td>
            <td>FAX</td>
        </tr>
         <tr>
            <td >${data?.address?.street}</td>
            <td >${data?.address?.settlement}</td>
            <td >${data?.phone} </td>
            <td >N/A</td>
        </tr>
        <tr>
            <th>CANTIDAD</th>
            <th>PRODUCTO</th>
            <th>PRECIO UNITARIO</th>
            <th>IMPORTE</th>
        </tr>
        <!-- Repeat this row as needed for products -->
         <!-- Repeat this row as needed for products -->
        <tr>
            <td>${data?.oportunity?.amount}</td>
            <td>${data?.nameproduct}</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
             <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" rowspan="3"></td>
            <td>SUBTOTAL</td>
            <td>${data?.oportunity?.subtotal}</td>
        </tr>
        <tr>
            <td>IVA</td>
            <td>${data?.oportunity?.totaliva}</td>
        </tr>
        <tr>
            <td>TOTAL</td>
            <td>${data?.total}</td>
        </tr>
        <tr>
            <td colspan="2" class="signatures"><p>NOMBRE Y FIRMA EJECUTIVO</p> ________________________</td>
            <td colspan="2" class="signatures"><p>NOMBRE Y FIRMA CLIENTE</p> ________________________ </td>
        </tr>
    </table>

            <div class="template_Three">
                <div><img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/image%20(1).jpeg" /> </div>
                <div class="title_body_Three"><p>CARTA SATISFACTORIA</p> </div>
                <div class="date"> <p> ${data?.date} </p> </div>

                <div class="body_body">
                    <div class="text_body_body_three">
                          <p>PRESENTE</p>
                           <p>
                             Por medio del presente se informa que el día 21 de septiembre del 2023 se llevó a cabo la Capacitación
                             correspondiente por parte de nuestro equipo de trabajo para el uso de este titulado “CAPACITACIÓN DE
                             EQUIPO MEDICO” por parte de la empresa Helse Medical, en el domicilio ubicado en:
                           </p>
                           <p>
                             Por último, se notifica que el trabajo realizado estuvo apegado a la orden de compra celebrado entre
                             usted y la empresa antes mencionada, así mismo se confirma que el presente objeto que nos une fue
                             entregado en su totalidad de acuerdo con la fecha límite de entrega estipulada en dicho contrato.
                           </p>
             
                           <p>
                             Quisiera hacer del conocimiento que estamos conformes con el excelente trabajo que los colaboradores de
                             la empresa que usted precede han realizado en nuestras instalaciones, así mismo, se informa que todas
                             las cláusulas del contrato de servicio que compartimos, fueron respetadas y llevadas a cabalidad, por lo
                             que reiteramos nuestra conformidad con los servicios que se han prestado, sin más por el momento,
                             quedamos a sus órdenes para cualquier comentario al respecto.
                           </p>
                    </div>

                     <div class="style_square">


                    <div class="small_table" >
                        <table>
                          <tr>
                            <td class="label">Hora de inicio de operaciones:</td>
                            <td class="input"></td>
                         </tr>

                         <tr>
                           <td class="label">Hora de final </td>
                           <td class="input"></td>
                         </tr>
                        </table>
                    </div>
                   
                    <div class="text_signatures">        
                           <p>________________________  <span>________________________</span>  </p>      
                           <p>  NOMBRE Y FIRMA           <span class="span_name">  NOMBRE Y FIRMA</span>    </p>          
                           <p> DEL CAPACITADOR           <span class="span_name" >   DEL TITULAR   </span>   </p>             
                    </div>
                </div>

                <div class="text_footer">
                    <p>Leído anteriormente lo mencionado por quienes intervienen, e impuestos de su contenido lo ratifican y
                      quedan en conformidad con la capacitación ofrecida por Helse Medical.</p>
                    <span>atencionaclientes@helsemedical.com </span> <span class="span_footer">www.helsemedical.com 55-88-72-25-86</span> 
                </div>
            </div>
        </div>
    </section>
</body>
</html>


  `;
};
export const templateLifeMedicaGarantia = data => {
  return `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="output.css" />
  <style>
    body {
      margin: 0;
    }

    .container_template {
      font-size: 8px;
      line-height: 10px;
      font-family: "Calibri", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
      color: #555;
      position: relative;
      height: 110vh;
    }

    .head img {
      width: 100%;
    }

    .folio {
      margin-top: -45px;
      margin-left: 390px;
      font-weight: 600px;
      font-size: 11px;
    }

    .head_Two {
      margin-left: 60px;
    }

    .head_Two p {
      font-size: 32px;
      font-weight: 600;
      margin-left: 102px;
    }

    .head_Two span {
      color: #2596be;
      font-size: 10px;
      margin-left: 31px;
    }

    .text_Articles {
      margin-left: 25px;
      margin-right: 25px;
    }

    .text_Articles p {
      font-size: 8px;
      line-height: normal;
    }

    .fragment_main {
      display: flex;
      text-align: justify;
      margin-bottom: 10px;
    }

    .fragment_main span {
      font-weight: 600px;
      text-decoration: underline;
      font-size: 8px;
      font-weight: 600;
    }

    .list {
      font-size: 8px;
      margin-left: 20px;
      text-align: justify;
      line-height: normal;
      margin-bottom: 4px;
    }

    .list span {
      margin-right: 4px;
      text-decoration: none;
    }

    .fragment_iv {
      text-align: justify;
      margin-top: 4px;
      margin-bottom: 4px;
      margin-left: 10px;
    }

    .fragment_iv span {
      font-weight: 600;
    }

    .list_v-x {
      margin-left: 20px;
      margin-bottom: 5px;
      text-align: justify;
    }

    .list_v-x span {
      margin-right: 4px;
      text-decoration: none;
    }

    .fragment_xi {
      margin-left: 20px;
      text-align: justify;
    }

    .fragment_xi span {
      text-decoration: none;
    }

    .footer {
      float: left;
      text-align: justify;
      color: #000;
      width: 50%;
      margin-left: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .footer span {
      text-decoration: underline;
    }

    .footer .span_blue {
      color: #2596be;
    }

    .footer .span_red {
      color: red;
    }

    .footer .span_no_underlining {
      text-decoration: none;
    }

    .image {
      float: left;
      width: 100%;
    }

    .contents {
    margin-top: 40px;
    margin-bottom: 26px;
      width: 100%;
      float: left;
    }

    .container_line_name {
      text-align: center;
      margin-top: 60px;
      width: 40%;
      float: right;
    }
      
  </style>
</head>

<body>
  <div class="container_template">
    <div class="head">
      <img
        src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-31%20at%2010.35.59%20AM%20(1).jpeg"
        alt="img Logo Lifemedic" />
    </div>
    <div class="folio">
      <p>Folio: ${data?.folio} </p>
    </div>

    <div class="head_Two">
      <p> GARANTÍA <span> </span> </p>
    </div>
    <div class="text_Articles">
      <div class="fragment_main">
        <p>
          <span>LIFEMEDIC </span> se reserva el derecho a cambiar la parte defectuosa o reparar la misma a su entera
          discreción,
          la garantía será computada desde el momento de la entrega del equipo y no cubre repuestos, mano de obra,
          calibración ni mantenimiento de accesorios, dispositivos y otros aditamentos ajenos al número de serie
          indicado en esta garantía.
        </p>
      </div>
      </br>

      <div class="list">
        <span>I.</span> El tiempo de reparación será en un periodo aproximado de 15 días hábiles, mismo que se computará
        una vez
        recibido el equipo en nuestras instalaciones, en caso de que la reparación no pueda realizarse, se entregará
        un equipo nuevo en un máximo de 30 días esto si la falla es por defecto de fábrica.
      </div>

      <div class="list">
        <span>II.</span> La garantía solo será aplicable cuando exista un defecto de fábrica, no por cuestiones de
        instalación.
      </div>

      <div class="list">
        <span>III.</span>El diagnóstico de la falla del equipo tendrá un costo, mismo que será notificado y cubierto
        por el cliente, más gastos de reparaciones y/o piezas en caso de que la garantía no cubra el fallo
        presentado por el equipo en revisión. Cuando el equipo esté en proceso de reparación se proporcionará uno en
        calidad de préstamo para no interrumpir las operaciones.
      </div>

      </br>

      <div class="fragment_iv">
        <span>IV.</span>Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el
        equipo mediante fotografías y/o videos, proporcionar todos los requisitos que se le pidan y enviarlos
        mediante correo electrónico a su ejecutivo de venta. La garantía no será aplicable cuando el equipo sea
        manipulado, realice cambios o modificaciones e intervenga el equipo:
        <span className="span_underlining"> SILLA DE RUEDAS</span> por personal no autorizado por la empresa o
        personal ajeno a LIFEMEDIC.
      </div>

      </br>

      <div class="list_v-x">
        <span>V.</span>Una vez recibida la evidencia y revisada por el personal especializado en caso de que sea
        necesario, se procederá con el envío del equipo a nuestras oficinas, mismo que tendrá que ser enviado
        completo, en buen estado y con el empaque original además de contar con todos los accesorios, todos los
        gastos de envío, fletes y/o viáticos del biomédico serán cubiertos por el cliente.
      </div>

      <div class="list_v-x">
        <span>VI.</span>La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas
        eléctricas o de tensión, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas de
        desgaste, accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los
        mismos.
      </div>

      <div class="list_v-x">
        <span>VII.</span>El cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería, si el
        equipo llega dañado o maltratado.
      </div>

      <div class="list_v-x">
        <span>VIII.</span>El cliente deberá presentar el recibo de compra y/o factura, para efectuar la garantía,
        dicho documento será cotejado con el número de serie del equipo.
      </div>

      <div class="list_v-x">
        <span>IX.</span>La rotura de cualquier sello de seguridad y/o códigos de barras hacen que el equipo no sea
        sujeto de garantía. X. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el
        equipo una vez cumplido el protocolo anterior.
      </div>

      <div class="list_v-x">
        <span>X.</span>El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo
        una vez cumplido el protocolo anterior.
      </div>

      <div class="fragment_xi">
        <span>XI.</span> Es responsabilidad del cliente hacer un respaldo de la información que contenga en el
        equipo, <span>LIFEMEDIC</span> no se hace responsable por la pérdida de datos durante el tiempo de reparación.
        La
        garantía no cubre daños de instalación de software, virus o sistemas operativos que el cliente realice,
        así como daños por mal uso. adquisición según sea el caso. Es responsabilidad del cliente tener el área
        adecuada para la instalación del equipo, así mismo, la estructura y medidas de seguridad dictadas por
        COFEPRIS previo a la instalación.
      </div>
      <div class="contents">
          <div class="footer">
          <p><span>LIFEMEDIC</span> garantiza durante el lapso de <span>18</span> meses. </p>
          <p>Equipo: <span class="span_blue"> ${data?.nameproduct} </span></p>
          <p>NO. DE SERIE: ${data?.serialnumber} </p>
          <p>MARCA: <span class="span_blue"> ${data?.namebrand} </span> MODELO: <span class="span_red"> ${data?.model}
          </span> </p>
          <p> <span> FECHA: ${data?.date}</span> </p>
          <p> NOMBRE DEL CLIENTE: <span class="span_no_underlining"> ${data?.clientname} </span></p>
          </div>
          <div class="container_line_name">
              <div class="line_name">
                  <p class="line">_____________________________</p>
                  <span class="name">Nombre Y Firma</span>
              </div>
          </div>
       </div>
  </div>
    <div class="divImage">
      <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/image%20(9).jpeg" class="image" />
    </div>
  </div>
</body>

</html> `;
};

export const templateGarantiaChiso = data => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certificado de Garantía</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        width: 100%;
        height: 100%;
        background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-30%20at%203.21.37%20PM.jpeg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .content {
        margin: 0 10%;
        border-radius: 8px;
      }
      .spacer {
        height: 85px;
      }
      .spacer2 {
        height: 70px;
      }
      .footer {
        text-align: center;
        font-size: 7.5pt;
      }
      .descrip_client {
        font-size: 6.5pt;
        padding: 5px;
        line-height: normal;
        margin-top: 8px;
      }
      .descrip {
        width: 65%;
        float: left;
        font-size: 6.2pt;
        // padding: 5px;
      }
      .firm_name {
        text-align: center;
        margin-top: 30px;
        width: 30%;
        float: right;
      }
      .content_divs {
        float: left;
        width: 100%;
      }
      .name {
        font-size: 10px;
      }
      .line {
        margin: 0px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="descrip_client">
          Chison, se reserva el derecho a cambiar la parte defectuosa o reparar
          la misma a su entera discreción, la garantía cubre repuestos y mano de
          obra por el período indicado anteriormente.La garantía se brinda en <b>${data.address.street}, ${data.address.city.name}, ${data.address.entity.name},C.P.${data.address.postal.postal_code}</b> la oficina central, por personal autorizado para
          brindar el servicio técnico por Chison.

          <p>
            El tiempo de reparación puede variar, siendo un periodo "estándar"
            de 3 a 6 semanas.
          </p>

          <p>
            En caso de no existir un defecto de fábrica, el diagnóstico tendrá
            un costo de $780.00 pesos, IVA incluido.
          </p>

          <p>
            Para hacer valida su garantía, deberá previamente indicar por medio
            de fotos, video o si es posible una falla que presente el equipo.
          </p>

          <p>
            El envío a nuestras oficinas se debe hacer posterior a que se haga
            entrega de esta comprobación mediante correo electrónico, sujeto a
            solicitud de la empresa; todos los envíos y costos del flete o
            transporte corren por cuenta del cliente.
          </p>

          <p>
            La garantía no cubre los daños por golpes, maltratos, descargas
            eléctricas o de tensión, ni tormentas eléctricas que afecten el
            equipo. De igual manera el cliente deberá notificar a paquetería si
            su equipo llegase dañado o maltratado, ya que de lo contrario la
            garantía no se aplicara por golpes externos.
          </p>

          <p>
            El cliente deberá presentar el recibo de compra o factura,
            cualquiera que sea el caso, para que su garantía tenga validez,
            Chison, verificará el número de serie del equipo que este respaldado
            por la empresa.
          </p>

          <p>
            La rotura de cualquier sello de seguridad, así como los códigos de
            barras hacen que el equipo pierda automáticamente la garantía.
          </p>

          <p>
            De igual manera la garantía no cubre gastos de maniobra y/o envíos a
            la oficina
          </p>

          <p>
            Es responsabilidad del cliente hacer un respaldo de la información
            de su equipo, Chison, no se hace responsable por pérdida de datos
            durante el tiempo de reparación. La garantía no cubre daños de
            instalaciones de software, virus o sistemas operativos que el
            cliente realice, así como daños por mal uso. En caso de que se
            encuentre con software incorrectamente instalado o contenga virus y
            este sea la causa de la falla de funcionamiento, Chison, tiene el
            derecho de cobrar al cliente los gastos generados de mantenimiento o
            adquisición en su caso.
          </p>

          <p>
            Chison, garantiza su equipo médico durante el lapso de 12 meses en
            equipo.
          </p>
        </div>
        <div class="content_divs">
          <div class="descrip">
            <p><strong>Fecha:</strong>${data?.date}</p>
            <p><strong>Nombre:</strong>${data?.clientname}</p>
            <p><strong>Equipo:</strong>${data?.nameproduct}</p>
            <p><strong>No. de Serie:</strong>${data?.serialnumber}</p>
            <p><strong>No. de Piezas:</strong>${data?.quantity}</p>
          </div>
          <div class="firm_name">
            <p class="line">__________________</p>
            <span class="name">Nombre y firma</span>
          </div>
        </div>
        <div class="footer">
          <p>
            La misión de Chison, es conseguir la plena satisfacción de todos sus
            clientes.
          </p>
        </div>
      </div>
      <div class="spacer2"></div>
    </div>
  </body>
</html>

  `;
};

export const templateProMedGarantia = data => {
  return `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Garantía 2022 Pro</title>
      <style>
          body {
              font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
              margin: 0;
          }
          .container {
              width: 100%;
              height: 100%;
              background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/PROMED.jpg");
              background-size: cover;
          }
          .content {
              padding: 6%;
          }
          .sectionParagraph {
              margin-top: 27%;
          }
          .text {
              text-align: justify;
              // margin-bottom: 10px;
              font-size: 6pt;
          }
          .sectionFooter {
              width: 500px;
         
          }
          .textdataFooter {
              display: inline-block;
              width: 500px;
          }
          .textFooter2left {
              width: 50%;
              float: left;
              font-weight: bold;
          }
          .textleft {
            
              font-size: 6pt;
          }
          .spacer {
              height: 31px; 
          }
           .content_folio{
              width: 100%;
              margin-bottom: 4%;
              float: left;
         }
        .foli{
            float: right;
            width: 10%;
        }
          .folio_b{
          font-size: 8px;
        }
        .content_firm_name {
          width: 100%;
          margin-bottom: 10px;
          float: left; 
        }
        .container_firm {
         float: right;
         text-align: center;
        }
        .line{
          padding: 0px;
          margin: -10px;
         margin-bottom: 0px;
        }
        .name{
        margin: 80px;
        font-size: 8px;

        }

      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
              <div class="sectionParagraph">
                  <div class="content_folio">
                    <div class="foli">
                      <b class="folio_b">${data.folio}</b>
                    </div>
                  </div>
                  <p class="text"><strong>PROMED</strong> se reserva el derecho a cambiar la parte defectuosa o reparar la misma a su entera discreción, la garantía será computada desde el momento de la entrega del equipo y no cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios, dispositivos y otros aditamentos ajenos al número de serie indicado en esta garantía. La garantía se brinda en la oficina central, ubicada AV. PASEO DE LA REFORMA 260, CDMX por personal autorizado para brindar el servicio técnico por GERENCIA DE INGENIERÍA BIOMÉDICA.</p>
                  <p class="text">I. El tiempo de reparación será en un periodo aproximado de entre 4 y 8 semanas, mismo que se computará una vez recibido el equipo en nuestras instalaciones, en caso de cambio total del equipo, el tiempo de entrega estimado será de 2 meses.</p>
                  <p class="text">II. La garantía solo será aplicable cuando exista un defecto de fábrica.</p>
                  <p class="text">III. El diagnóstico de la falla del equipo tendrá un costo, mismo que será notificado y cubierto por el cliente, más gastos de reparaciones y/o piezas en caso de que la garantía no cubra el fallo presentado por el equipo en revisión.</p>
                  <p class="text">IV. Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo mediante fotografías y/o vídeos, proporcionando todos los requisitos que se le pidan y enviarlos mediante correo electrónico a su ejecutivo de venta. La garantía no será aplicable cuando el equipo sea manipulado, realice cambios o modificaciones e intervenga el equipo por personal no autorizado por la empresa o personal ajeno a <strong>PROMED</strong>.</p>
                  <p class="text">V. Una vez recibida la evidencia y revisada por el personal especializado en caso de que sea necesario, se procederá con el envío del equipo a nuestras oficinas, mismo que tendrá que ser enviado completo, en buen estado y con el empaque original además de contar con todos los accesorios, todos los gastos de envío, fletes y/o viáticos del biomédico serán cubiertos por el cliente.</p>
                  <p class="text">VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas o de tensión, tormentas eléctricas, variación de voltaje que afecten el equipo, piezas de desgaste, accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos.</p>
                  <p class="text">VII. El cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería, si el equipo llega dañado o maltratado.</p>
                  <p class="text">VIII. El cliente deberá presentar el recibo de compra y/o factura, para efectuar la garantía, dicho documento será cotejado con el número de serie del equipo.</p>
                  <p class="text">IX. La rotura de cualquier sello de seguridad y/o códigos de barras hacen que el equipo no sea sujeto de garantía.</p>
                  <p class="text">X. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez cumplido el protocolo anterior.</p>
                  <p class="text">XI. Es responsabilidad del cliente hacer un respaldo de la información que contenga en el equipo, <strong>PROMED</strong> no se hace responsable por la pérdida de datos durante el tiempo de reparación. La garantía no cubre daños de instalación de software, virus o sistemas operativos que el cliente realice, así como daños por mal uso, adquisición según sea el caso.</p>
                  <p class="text"><strong>PROMED</strong> garantiza durante el lapso de 12 meses.</p>
              </div>
              <div class="sectionFooter">
                  <div class="textdataFooter">
                      <div class="textFooter2left">
                          <p class="textleft">EQUIPO: ${data?.nameproduct}</p>
                          <p class="textleft">MARCA: ${data?.namebrand}</p>
                          <p class="textleft">MODELO:  ${data?.model}</p>
                          <p class="textleft">FECHA: ${data?.date}</p>
                          <p class="textleft">NUMERO DE FACTURA O NOTA DE REMISIÓN: ${data?.invoicenumberornote} </p>
                          <p class="textleft">NOMBRE DE CLIENTE:${data?.clientname} </p>
                      </div>
                  </div>
              </div>
              <div class="content_firm_name">
                <div class="container_firm">
                  <p class="line">____________________</p>
                  <span class="name">Nombre y Firma </span>
                </div>
            </div>
          </div>
        <div class="spacer"></div>
      </div>
  </body>
  </html>
     `;
};

export const templateSolucionesHospitalariasGarantia = data => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Garantía AYMOJUL5002</title>
    <style>
        body {
            margin: 0;
            font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        }
        .container{
            height: 100%;
            width: 100%;
            background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/SOLUCIONES_HOSPITALARIAS.jpg");
            background-size: cover;
            background-position: center;
            position: relative;
        }
        .content{
            padding: 6%;
        }

        h1 {
            font-size:10pt
        }

        h3 {
            font-size:9pt;
        }
        .sectionParagraph {
            margin-top: 15%;
        }
        .text {
            text-align: justify;
            margin-bottom: 10px;
            font-size: 6pt;
        }
        .sectionFooter {
            width: 500px;
            margin-top: 0;
            margin-left: 10px;
        }
        .textdataFooter {
            display: inline-block;
            width: 500px;
        }
        .textFooter2left {
            width: 50%;
            float: left;
            font-weight: bold;
        }
        .textleft {
            font-size: 6pt;
        }
        .spacer {
            height: 67px; 
        }
        .container_firm_name {
        float: left;
        width: 100%;
        }
        .line_name {
        margin-bottom: 2px;
        margin-right:20px;
        text-align:center;
        float: right;
        }
        .line {
        margin-top: -10px;
        margin-bottom: 2px; 
        }
        .name{
        color: black;
        font-size: 8px;
        }

    </style>
</head>
<body>
    <div class="container">
      <div class="content">
          <div class="sectionParagraph">
                      <h1>POLIZA DE GARANTIA</h1>
                      <h3>Folio:${data?.folio}</h3>
              <p class="text">
                  SOLUCIONES HOSPITALARIAS se reserva el derecho a cambiar la parte defectuosa o reparar la misma a su entera discreción, la garantía será computada desde el momento de la entrega del equipo y no cubre repuestos, 
                  mano de obra, calibración ni mantenimiento de accesorios, dispositivos y otros aditamentos ajenos al número de serie indicado en esta garantía. La garantía se brinda en la oficina central, 
                  ubicada PASEO DE LA REFORMA, 250, CIUDAD DE MEXICO por personal autorizado para brindar el servicio técnico por SOLUCIONES HOSPITALARIAS.
              </p>
              <p class="text"><strong>I.</strong> El tiempo de reparación será en un periodo aproximado de entre 4 y 8 semanas, mismo que se computará una vez recibido el equipo en nuestras instalaciones, 
                  en caso de cambio total del equipo, el tiempo de entrega estimada será de 2 meses.</p>
              <p class="text"><strong>II.</strong> La garantía solo será aplicable cuando exista un defecto de fábrica.</p>
              <p class="text"><strong>III.</strong> El diagnóstico de la falla del equipo tendrá un costo, mismo que será notificado y cubierto por el cliente, 
                  más gastos de reparaciones y/o piezas en caso de que la garantía no cubra el fallo presentado por el equipo en revisión.
              </p>
              <p class="text">
                  <strong>IV.</strong> Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo mediante fotografías y/o videos, proporcionar 
                  todos los requisitos que se le pidan y enviarlos mediante correo electrónico a su ejecutivo de venta. La garantía no será aplicable cuando el equipo sea manipulado, 
                  realice cambios o modificaciones e intervenga el equipo por personal no autorizado por la empresa o personal ajeno a SOLUCIONES HOSPITALARIAS.
              </p>
              <p class="text">
                  <strong>V.</strong> Una vez recibida la evidencia y revisada por el personal especializado en caso de que sea necesario, se procederá con el envío del equipo a nuestras oficinas, 
                  mismo que tendrá que enviar el equipo completo, en buen estado y con el empaque original además de contar con todos los accesorios, todos los gastos de envío, fletes y/o viáticos 
                  del biomédico serán cubiertos por el cliente.
              </p>
              <p class="text">
                  <strong>VI.</strong> La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas o detección, tormentas eléctricas, variación de voltaje 
                  que afecten al equipo, piezas de desgaste, accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos.
              </p>
              <p class="text"><strong>VII.</strong> El cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería, si el equipo llega dañado al notificarlo.</p>
              <p class="text"><strong>VIII.</strong> El cliente deberá presentar el recibo de compra y/o factura, para efectuar la garantía, dicho documento será cotejado con el número de serie del equipo.</p>
              <p class="text"><strong>IX.</strong> La rotura de cualquier sello de seguridad y/o códigos de barras hacen que el equipo no sea sujeto de garantía.</p>
              <p class="text"><strong>X.</strong> El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez cumplido el protocolo anterior.</p>
              <p class="text"><strong>XI.</strong> La garantía no cubre daños por mal uso o adquisición según sea el caso.</p>
              <p class="text">SOLUCIONES HOSPITALARIAS garantiza durante el lapso de meses 12 MESES</p>
          </div>
          <div class="sectionFooter">
              <div class="textdataFooter">
                  <div class="textFooter2left">
                      <p class="textleft">EQUIPO: ${data?.nameproduct}</p>
                      <p class="textleft">NUMERO DE SERIE: ${data?.serialnumber}</p>
                      <p class="textleft">MARCA: ${data?.namebrand}</p>
                      <p class="textleft">MODELO: ${data?.model}</p>
                      <p class="textleft">FECHA: ${data?.date}</p>
                      <p class="textleft">NOMBRE DE CLIENTE: ${data?.clientname}</p>
                  </div>
              </div>
              <div class="container_firm_name">
                  <div class="line_name">
                      <p class="line">____________________</p>
                      <span class="name">Nombre y Firma</span> 
                  </div>
              </div>
          </div>
      </div>
    <div class="spacer"></div>
  </div>
</body>
</html>`;
};

export const templateCartaPorteBack = data => {
  let itemsProducts = "";
  data.products.forEach((item, index) => {
    itemsProducts += `
          <table class="table_merchandise">
              <thead class="thead_merchandise">
                  <tr class="tr_merchandise">
                      <th class="th_merchandise_cant">Cantidad</th>
                      <th class="th_merchandise_unity">Unidad</th>
                      <th class="th_merchandise_desc">Descripción</th>
                      <th class="th_merchandise_unit">Precio Unitario</th>
                      <th class="th_merchandise_imp">Impuestos</th>
                      <th class="th_merchandise_import">Importe</th>
                  </tr>
              </thead>
              <tbody class="tbody_merchandise">
                  <tr class="tr_merchandise">
                      <td className="td_merchandise">${item.productcan}</td>
                  <td className="td_merchandise">${item.articleunidad}</td>
                  <td className="td_merchandise">
                  ${item.name}
                  </td>
                  <td className="td_merchandise">${item.precioU} </td>
                  <td className="td_merchandise">${item.Impuestos}</td>
                  <td className="td_merchandise">${item.import}</td>
                  </tr>
              </tbody>
          </table>
          <table class="table_merchandise">
              <thead class="thead_merchandise">
                  <tr class="tr_merchandise">
                      <th class="th_merchandise_cant">Cantidad</th>
                      <th class="th_merchandise_unity">Unidad</th>
                      <th class="th_merchandise_desc">Descripción</th>
                      <th class="th_merchandise_type">Tipo de Material Peligroso</th>
                      <th class="th_merchandise_em">Embalaje </th>
                      <th class="th_merchandise_kg">Peso Kg</th>
                      <th class="th_merchandise_fraction">Fracción arancelaria</th>
                      <th class="th_merchandise_ped">Pedimento</th>
                  </tr>
              </thead>
              <tbody class="tbody_merchandise">
              <tr class="tr_merchandise">
                   <td className="td_merchandise">${item.articleCant}</td>
              <td className="td_merchandise">${item.articleunidad}</td>
              <td className="td_merchandise">
              ${item.articledescripcion}
              </td>
                  <td class="td_merchandise">-</td>
                  <td class="td_merchandise">${item?.high} x ${item?.long} x ${item?.broad}</td>
                  <td class="td_merchandise">${item.weight}</td>
                  <td class="td_merchandise">-</td>
                  <td class="td_merchandise">-</td>
              </tr>
              </tbody>
          </table>
    `;
  });
  let itemsDirections = "";
  data.products.forEach((item, index) => {
    itemsDirections += `
        <tr >
          <td>${item.Direcciones}</td>
          <td>${item.NúmExt}</td>
          <td>${item.Colonia}</td>
          <td>${item.Localidad}</td>
          <td>${item.Referencia}</td>
          <td>${item.Municipio}</td>
          <td>${item.EstadoPais}</td>
          <td>${item.EstadoPais}</td>
          <td>${item.cp}</td>
        </tr
        `;
  });

  return ` <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>templatesCartPort</title>
  <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

      * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
      }

      :root {
          --morado: #18186f;
      }

      html,
      body {
          font-family: Arial, sans-serif;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          background-color: white;
      }

      .container {
          width: 5.8in;
          height: 11in;
          margin: auto;
          padding: 10px;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .sections {
          float: left;
          width: 100%;
      }

      .content_section_info {
          background-color: rgb(220, 69, 69);
          width: 100%;
      }



      .content_div_title {
          float: left;
          width: 70%;
      }

      .p_div_title {
          color: #000;
          font-weight: 600;
          font-size: 9px;
      }

      .p_div_titles {
          color: #000;
          font-weight: 600;
          font-size: 8px;
      }

      .p_div_subtitle {
          font-size: 7px;
          font-weight: 500;
      }

      .content_div_cart_port {
          float: right;
          width: 30%;
      }

      .content_type_document {
          margin: auto;
          background: #18186f;
          font-size: 7px;
          color: white;
          width: 80%;
          text-align: center;
      }

      .type_document {
          font-size: 7.5px;
          font-weight: 600;
          color: #fff;
      }

      .content_date {
          margin: auto;
          width: 80%;
          text-align: center;
          font-size: 12px;
      }

      .title_date_text {
          font-size: 7px;
          font-weight: 600;
      }

      .subtitle_date_text {
          font-size: 7px;
          font-weight: 500;
      }

      .table_info_client {
          height: 150px;
          border: 1.5px solid black;
      }

      .container_date_folio {
          width: 100%;
          height: 68px;
      }

      .container_date_folio_left {
          float: left;
          width: 60%;
      }

      .date_folio_text {
          font-size: 7px;
      }

      .date_folio_left_title {
          width: 100%;
          text-align: center;
          background: #18186f;
      }

      .left_title_client {
          color: #fff;
          font-weight: 500;
          font-size: 8px;
      }

      .container_date_folio_right {
          text-align: center;
          float: left;
          width: 40%;
          /* height: 70px; */
          border-bottom: 1.5px solid black;
          border-left: 1.5px solid black;
      }

      .folio_right_title {
          font-size: 8px;
          font-weight: 600;
      }

      .folio_right_subtitle {
          font-size: 7px;
          font-size: 500;
      }

      .date_comprobant {
          border-top: 1.5px solid black;
          background-color: rgb(31, 235, 235);
      }

      .content_date_comprobant_title {

          text-align: center;
          background: #18186f;
      }

      .comprobant_title_text {
          font-size: 8px;
          color: #fff;
      }

      .div_date_comprobant_left {
          padding: 2px;
          width: 50%;
          float: left;
      }

      .content_left_date {
          padding: 5px;
          float: left;
          width: 50%;

      }

      .date_title {
          font-size: 7px;
          font-weight: bold;

      }

      .date_subtitle {
          font-size: 7px;
          font-weight: 500;
      }

      .content_rigt_date {
          float: right;
          padding: 5px;
          width: 50%;
      }

      .div_date_comprobant_right {
          height: 67px;
          width: 50%;
          padding: 2px;
          float: right;
          border-left: 1.5px solid black;
      }

      .content_table_trasport {
          padding-top: 3px;
          /* background-color: pink; */
      }

      table {
          width: 100%;
      }

      th {
  //  width: 22%;
          text-align: center;
          font-weight: 600;
          font-size: 6px;
      }

      td {
       text-align: center;
          font-size: 6px;
      }

      .content_title_mercan {
          width: 100%;
          text-align: center;
      }

      .title_mercan {
          font-size: 9px;
          font-weight: 600;
          margin-top: 5px;
          margin-bottom: 5px;
      }

      .table_merchandise {
          width: 100%;
      }

      .table_merchandise {
          border-spacing: 0px;
      }

      .th_merchandise_cant {
          width: 10%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_merchandise_unity {
          width: 10%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_merchandise_desc {
          width: 30%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_merchandise_unit {
          width: 10%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_merchandise_imp {
          width: 10%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_merchandise_import {
          width: 10%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_merchandise_type {
          background: #18186f;
          color: #fff;
          width: 10%;
          text-align: center;
      }

      .th_merchandise_em {
          background: #18186f;
          color: #fff;
          width: 10%;
          text-align: center;
      }

      .th_merchandise_kg {
          background: #18186f;
          color: #fff;
          width: 5%;
          text-align: center;
      }

      .th_merchandise_fraction {
          background: #18186f;
          color: #fff;
          width: 10%;
          text-align: center;
      }

      .th_merchandise_ped {
          background: #18186f;
          color: #fff;
          width: 10%;
          text-align: center;
      }

      .tr_merchandise {
          text-align: center;
      }

      .content_packaging {
          /* width: 100%; */
          padding: 20px;
          /* margin-top: 20px; */
      }

      .div_packaging_left {
          float: left;

          width: 30%;
          text-align: center;
      }

      .div_packaging_right {
          float: right;
          width: 70%;

      }

      .packaging_right_text {
          font-size: 7px;
          font-weight: bold;
      }

      strong {

          margin-left: 30px;
          font-weight: 500;
      }

      .packaging_left_text {
          font-size: 7px;
          font-weight: 600;
      }

      .comprobant_title_text {
          font-weight: 500;
      }

      .container_Senders_recipients_title {
          width: 100%;
          text-align: center;
      }

      .title_Senders_recipients {
          font-size: 9px;
          font-weight: 600;
          margin-top: 30px;
          margin-bottom: 5px;
      }

      .table_Senders_recipients {
          width: 100%;
          border-spacing: 0px;
      }

      .thead_Senders_recipients {}

      .th_Senders_recipients_cant {
          width: 20%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_Senders_recipients_unity {
          width: 20%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_Senders_recipients_desc {
          width: 20%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_Senders_recipients_unit {
          width: 20%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .th_Senders_recipients_imp {
          width: 20%;
          background: #18186f;
          color: #fff;
          text-align: center;
      }

      .tr_Senders_recipients {
          text-align: center;
          font-size: 6px;
      }

      .container_import {
          width: 100%;
      }

      .div_import_left {
          font-size: 7px;
          padding: 20px;
          width: 40%;
          float: left;
      }

      .div_import_right {
          padding: 10px;
          width: 60%;
          float: right;

      }

      .import_right_l {
          float: left;
      }

      .import_right_r {

          float: right;
      }

      .container_r_l {
          font-size: 7px;
          float: left;
          width: 100%;
          border-top: 1.5px solid black;
      }

      p {
          font-weight: bold;
      }

      .container_qr_des {
          width: 100%;
          padding: 10px;
          float: left;
      }

      .qr {
          text-align: center;
          float: left;
          width: 20%;
      }

      .img {
          width: 100px;
          height: 100px;
          margin: auto;
      }

      .des {
          float: right;
          width: 70%;
      }

      .tbody_des {
          width: 100%;
      }

      .th_des {
          font-size: 6px;
          text-align: center;
          background: #18186f;
          color: white;
      }

      .td_des {
          width: 120px;
          font-size: 4px;
      }
      .str{
      margin-left:1px;
      }

      .table_des {
          float: left;
          // text-align: justify;
          /* width: 100%; */
      }
  </style>
</head>

<body>
  <div class="container">
      <section class="sections">
          <div class="content_section_info">
              <div class="container_complete_initial">
                  <div class="content_div_title">
                      <p class="p_div_title">COMERCIALIZADORA Y DISTRIBUIDORA MB</p>
                      <p class="p_div_titles">CDM170519ERA</p>
                      <p class="p_div_subtitle">Regimen Fiscal: 601 - General de Ley Personas Morales</p>
                      <p class="p_div_subtitle">Lugar de expedicion:</p>
                      <p class="p_div_subtitle"> Domicilio: Balcon de la cañada 3020 Altavista Sur Monterrey Nuevo
                          Leon Mexico 64740</p>
                  </div>
                  <div class="content_div_cart_port">
                      <div class="content_type_document">
                          <p class="type_document">Carta Porte - Translado</p>
                      </div>
                      <div class="content_date">
                          <p class="title_date_text">T 1</p>
                          <p class="subtitle_date_text">Fecha Timbrado</p>
                          <p class="title_date_text">${data?.createdAt}</p>
                          <p class="subtitle_date_text">Fecha Emision</p>
                          <p class="title_date_text">${data?.createdAt}</p>
                      </div>
                  </div>

              </div>
          </div>
      </section>
      <section class="sections">
          <div class="table_info_client">
              <div class="container_date_folio">
                  <div class="container_date_folio_left">
                      <div class="date_folio_left_title">
                          <p class="left_title_client">DATOS DEL CLIENTE</p>
                      </div>
                      <p class="date_folio_text">Nombre: ${data.client.name}</p>
                      <p class="date_folio_text">RFC: ${data.client.rfc}</p>
                      <p class="date_folio_text">Tax Id Number: ${data.client.tax}</p>
                      <p class="date_folio_text">Domicilio: ${data.client.street}
                      </p>
                  </div>
                  <div class="container_date_folio_right">
                      <p class="folio_right_title">Folio Fiscal</p>
                      <p class="folio_right_subtitle">82581A6B-B003-4327-A5AE-C178A5EBD864</p>
                      <p class="folio_right_title">No. Certificado Digital</p>
                      <p class="folio_right_subtitle">00001000000510785445</p>
                      <p class="folio_right_title">No. Certificado SAT</p>
                      <p class="folio_right_subtitle">00001000000505142236</p>
                  </div>
              </div>
              <div class="date_comprobant">
                  <div class="content_date_comprobant_title">
                      <p class="comprobant_title_text">DATOS DEL COMPROBANTE</p>
                  </div>
                  <div class="div_date_comprobant">
                      <div class="div_date_comprobant_left">
                          <div class="content_left_date">
                              <p class="date_title">Metodo de pago</p>
                              <p class="date_subtitle">${data.metodpay}</p>
                              <p class="date_title">Forma de pago</p>
                              <p class="date_subtitle">${data.metodpay}</p>
                          </div>
                          <div class="content_rigt_date">
                              <p class="date_title">Uso de Cfdi</p>
                              <p class="date_subtitle">-----</p>
                              <p class="date_title">Tipo de Comprobante</p>
                              <p class="date_subtitle">-----</p>
                          </div>
                      </div>
                      <div class="div_date_comprobant_right">
                          <div class="content_left_date">
                              <p class="date_title">Moneda</p>
                              <p class="date_subtitle">XXX - Los códigos asignados
                                  para las transacciones en
                                  que intervenga ninguna
                                  moneda.
                              </p>
                          </div>
                          <div class="content_rigt_date">
                              <p class="date_title">Tipo de Cambio</p>
                              <p class="date_subtitle">1.00000
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="sections">
          <div class="content_table_trasport">
              <table>
                  <thead>
                      <tr>
                          <th>Medio de transporte</th>
                          <th>Transporte Internacional </th>
                          <th>Tipo de Transporte Internacional </th>
                          <th>Vía de Transporte Internacional </th>
                          <th>País de origen o destino </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>01 - Autotransporte</td>
                          <td>No</td>
                          <td>Autotransporte (Terrestre)</td>
                          <td>NA</td>
                          <td>NA</td>
                      </tr>
                  </tbody>
              </table>
              <table>
                  <thead>
                      <tr>
                          <th>Total de distancia recorrida:</th>
                          <th>Tipo Autotransporte</th>
                          <th>Aseguradora resp. civil</th>
                          <th>Permiso SCT</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                <td>${data.transport.totaldistance}</td>
                <td>${data.transport.tipetrasport}</td>
                <td>ANA SEGUROS</td>
                <td>${data.transport.poliza}</td>
                      </tr>
                  </tbody>
              </table>
              <table>
                  <thead>
                      <tr>
                          <th>Número de permiso</th>
                          <th>Placa</th>
                          <th>Año</th>
                          <th>Póliza resp. civil</th>
                          <th>Póliza med. amb.</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                           <td>999999</td>
                          <td>${data.transport.placa}</td>
                          <td>${data.transport.age}</td>
                          <td>004819200</td>
                          <td>NA</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </section>
      <section class="sections">
          <div class="content_title_mercan">
              <p class="title_mercan">MERCANCÍAS</p>
          </div>
          </section>
          <section class="sections">
            ${itemsProducts}
         </section>
  <section class="sections">
      <div class="content_packaging">
          <div class="div_packaging_left">
              <p class="packaging_left_text">Embalaje</p>
              <p class="packaging_left_text">----</p>
              <p class="packaging_left_text">Número de guía</p>
              <p class="packaging_left_text">----</p>
          </div>
          <div class="div_packaging_right">
              <p class="packaging_right_text">Número total de mercancías: <trong>${data?.products?.length}</trong>
              </p>
              <p class="packaging_right_text">Peso guía: <strong>--</strong> </p>
              <p class="packaging_right_text">Peso bruto
                  total:<strong>362</strong>&nbsp;&nbsp;&nbsp;&nbsp;Unidad de peso: <strong>KGM</strong>
              </p>
              <p class="packaging_right_text">Descripción guía: -----</p>

          </div>
      </div>
      </section>
      <section class="sections">
          <div class="container_Senders_recipients_title">
              <p class="title_Senders_recipients">REMITENTES Y DESTINATARIOS</p>
          </div>
          <table class="table_Senders_recipients">
              <thead class="thead_Senders_recipients">
                  <tr class="tr_Senders_recipients">
                      <th class="th_Senders_recipients_cant"></th>
                      <th class="th_Senders_recipients_unity">Nombre</th>
                      <th class="th_Senders_recipients_desc">Tax id</th>
                      <th class="th_Senders_recipients_unit">Residencia Fiscal</th>
                      <th class="th_Senders_recipients_imp">Fecha</th>
                  </tr>
              </thead>
              <tbody class="tbody_Senders_recipients">
                  <tr class="tr_Senders_recipients">
                      <td class="td_Senders_recipients">Origen</td>
                      <td class="td_Senders_recipients">CDM170519ERA COMERCIALIZADORA Y
                          DISTRIBUIDORA MB</td>
                      <td class="td_Senders_recipients">----</td>
                      <td class="td_Senders_recipients">---</td>

                      <td class="td_Senders_recipients">2024-06-28T10:00:00</td>
                  </tr>
                  <tr class="tr_Senders_recipients">
                      <td class="td_Senders_recipients">Destino</td>
                      <td class="td_Senders_recipients">MBE150210NX1 MOTORES, BOMBAS Y
                          EQUIPOS HAB</td>
                      <td class="td_Senders_recipients">----</td>
                      <td class="td_Senders_recipients">---</td>

                      <td class="td_Senders_recipients">2024-06-28T10:00:00</td>
                  </tr>
              </tbody>
          </table>

          <table>
              <thead>
                  <tr>
                      <th>Direcciones:</th>
                      <th>Núm Ext.Núm Int.</th>
                      <th>Colonia</th>
                      <th>Localidad</th>
                      <th>Referencia</th>
                      <th>Municipio</th>
                      <th>Estado</th>
                      <th>Pais</th>
                      <th>Código Postal</th>
                  </tr>
              </thead>
              <tbody>
                  ${itemsDirections}
              </tbody>
          </table>

          </section>
          <section class="sections">
              <div class="container_Senders_recipients_title">
                  <p class="title_Senders_recipients">OPERADORES Y DATOS ADICIONALES</p>
              </div>
              <table class="table_Senders_recipients">
                  <thead class="thead_Senders_recipients">
                      <tr class="tr_Senders_recipients">
                          <th class="th_Senders_recipients_cant"></th>
                          <th class="th_Senders_recipients_unity">RFC</th>
                          <th class="th_Senders_recipients_desc">Descripción</th>
                          <th class="th_Senders_recipients_unit">Tax Id</th>
                          <th class="th_Senders_recipients_imp">Residencia Fiscal</th>
                      </tr>
                  </thead>
                  <tbody class="tbody_Senders_recipients">
                      <tr class="tr_Senders_recipients">
                          <td class="td_Senders_recipients"><strong>01</strong></td>
                          <td class="td_Senders_recipients">--</td>
                          <td class="td_Senders_recipients">${data.transport.nametrasport}</td>
                          <td class="td_Senders_recipients">010000679262</td>
                          <td class="td_Senders_recipients">-------</td>
                      </tr>
                  </tbody>
              </table>
              <br>
              <table>
                  <thead>
                      <tr>
                          <th>Direcciones:</th>
                          <th>Núm Ext.Núm Int.</th>
                          <th>Colonia</th>
                          <th>Localidad</th>
                          <th>Referencia</th>
                          <th>Municipio</th>
                          <th>Estado</th>
                          <th>Pais</th>
                          <th>Código Postal</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>--</td>
                          <td>--</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                      </tr>

                  </tbody>
              </table>
              </section>
      <section class="sections">
          <div class="container_import">
              <div class="div_import_left">
                  <p>Importe con letra: <strong class="str">cero Pesos 00/100 M.N.</strong></p>
              </div>
              <div class="div_import_right">
                  <div class="container_r_l">
                      <div class="import_right_l">
                          <p>Subtotal</p>
                          <p>Descuento</p>
                      </div>
                      <div class="import_right_r">
                          <p>$${data.sub}</p>
                          <p>$0.00</p>
                      </div>
                  </div>
                  <div class="container_r_l">
                      <div class="import_right_l">
                          <p>Total</p>
                      </div>
                      <div class="import_right_r">
                          <p>$${data.total}</p>
                      </div>
                  </div>
              </div>
          </div>
          </section>
          <section class="sections">
              <div class="container_qr_des">
                  <div class="qr">
                      <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/common/qr.jpg"
                          class="img">
                  </div>
                  <div class="des">
                      <table class="table_des">
                          <thead class="thead_des">
                              <tr class="tr_des">
                                  <th class="th_des">Cadena Original del Complemento de
                                      Certificación Digital del SAT</th>

                              </tr>
                          </thead>
                          <tbody class="tbody_des">
                              <tr class="tr_des">
                                  <td class="td_des">
                                      ||1.1|82581A6B-B003-4327-A5AE-C178A5EBD864|2024-06-26T13:25:33|MAS0810247C0|bXwwxxZ/jUEOorVPbvzWvMIjwZQiKATw0Qsd1kv87TuBe
                                      s+3E8CcjY5JllUJTvTTGvSBeY/5wCayImtAUoQq8cZkzqVy/Be2Xkbqb92RLKWLiG7FUddlSCgXcfMfhJYKuc8+PYxgiTrzPlET8ijJAnd+Nblrc+2nmHOJk
                                      tBNYlgWmEsCmAxGyTH5OBbIaUaHobsutEvwZBlXrAJIlB31LDPb/iUZseppTesOKaaj7ZrsxRn5CaQruUJgRoCakPnSQaRkVy5OW0vPxGhte9D+W+wDNyJYSV
                                      tYHnzA/nMy74rpasIuG18j9bzHFINHffTdquzfLsaGkYhAOSaF1LYIw==|00001000000505142236||
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="table_des">
                          <thead class="thead_des">
                              <tr class="tr_des">
                                  <th class="th_des">Sello Digital del CFDI </th>

                              </tr>
                          </thead>
                          <tbody class="tbody_des">
                              <tr class="tr_des">
                                  <td class="td_des">
                                      bXwwxxZ/jUEOorVPbvzWvMIjwZQiKATw0Qsd1kv87TuBes+3E8CcjY5JllUJTvTTGvSBeY/5wCayImtAUoQq8cZkzqVy/Bea2Xkbqb92RLKWLiG7FUddlSCgX
                                      cfMfhJYKuc8+PYxgiTrzPlET8ijJAnd+Nblrc+2nmHOJktBNYlgWmEsCmAxGyTH5OBbIaUaHobsutEvwZBlXrAJIlB31LDPb/iUZseppTesOKaaj7ZrsxRn5C
                                      aQruUJgRoCakPnSQaRkVy5OW0vPxGhte9D+W+wDNyJYSVtYHnzA/nMy74rpasIuG18j9bzHFINHffTdquzfLsaGkYhAOSaF1LYIw==
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table class="table_des">
                          <thead class="thead_des">
                              <tr class="tr_des">
                                  <th class="th_des">Sello del SAT</th>

                              </tr>
                          </thead>
                          <tbody class="tbody_des">
                              <tr class="tr_des">
                                  <td class="td_des">
                                      IBpHglyrmLZ84vQDjUGc67Rcx1e3IcXMGPsYWd5Rfhj17//KRkUq0kLPKlIhw4Huwt0c57CLGS35Rl5zzW0cNUaGLR2HmSEyt1TFl+8okKbPFT7/GC755HB
                                      6dX4xV3C9fI/4p0WIjyCwSjcPQe2A0MfwfhTFIvyVwUpUOSisFCID4Og1ZClACWmPQxVDJ1mZDLCxIL2nNHzfm2tIprUag7wuZUgE3fQ7zoXL9s+9bkvls4
                                      JVEkukUYTU16xkmxmqwisvbJzTqVtGSs1UPSJuo0dekdcZfsmKxI5ounBWTsmvd4MxKm/Lu7fJYcREElR5ECHsDabxcygd6MZDqbo4aw==
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </section>


  </div>
</body>

</html>`;
};

export const templateCartaPorte = data => {
  let itemsProducts = "";
  data.products.forEach((item, index) => {
    itemsProducts += `
      <tr class="tr_merchandise">
        <td>${item.productcan}</td>
        <td>${item.articleunidad}</td>
        <td>${item.name}</td>
        <td>${item.precioU} </td>
        <td>${item.Impuestos}</td>
        <td>${item.import}</td>
      </tr>
    `;
  });
  let itemsProductsArticle = "";
  data.products.forEach((item, index) => {
    itemsProductsArticle += `
      <tr >
        <td>${item.articleCant}</td>
        <td>${item.articleunidad}</td>
        <td>${item.articledescripcion}</td>
        <td>-</td>
        <td>${item?.high} x ${item?.long} x ${item?.broad}</td>
        <td>${item.weight}</td>
        <td>-</td>
        <td>-</td>
      </tr>
    `;
  });
  let itemsDirections = "";
  data.products.forEach((item, index) => {
    itemsDirections += `
        <tr >
          <td>${item.Direcciones}</td>
          <td>${item.NúmExt}</td>
          <td>${item.Colonia}</td>
          <td>${item.Localidad}</td>
          <td>${item.Referencia}</td>
          <td>${item.Municipio}</td>
          <td>${item.EstadoPais}</td>
          <td>${item.EstadoPais}</td>
          <td>${item.cp}</td>
        </tr
          `;
  });

  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>templatesCartPort</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        :root {
            --morado: #005151;
        }

        html,
        body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: white;
        }

        .container {
            width: 5.8in;
         
            margin: auto;
            padding: 10px;
            background: #fff;
            // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .sections {
            float: left;
            width: 100%;
        }

        .content_section_info {
            background-color: rgb(220, 69, 69);
            width: 100%;
        }

        .content_div_title {
            float: left;
            width: 70%;
        }

        .p_div_title {
            color: #000;
            font-weight: 600;
            font-size: 9px;
        }

        .p_div_titles {
            color: #000;
            font-weight: 600;
            font-size: 8px;
        }

        .p_div_subtitle {
            font-size: 7px;
            font-weight: 500;
        }

        .content_div_cart_port {
            float: right;
            width: 30%;
        }

        .content_type_document {
            border: 1px solid black;
            margin: auto;
            background: #005151;
            font-size: 7px;
            color: white;
            width: 80%;
            text-align: center;
        }

        .type_document {
            font-size: 7.5px;
            font-weight: 600;
            color: #fff;
        }

        .content_date {
            margin: auto;
            width: 80%;
            text-align: center;
            font-size: 12px;
            border: 1px solid black;
        }

        .title_date_text {
            font-size: 7px;
            font-weight: 600;
        }

        .subtitle_date_text {
            font-size: 7px;
            font-weight: 500;
        }

        .table_info_client {
            height: 150px;
            border: 1.5px solid black;
        }

        .container_date_folio {
            width: 100%;
            height: 68px;
        }

        .container_date_folio_left {
            float: left;
            width: 60%;
        }

        .date_folio_text {
            font-size: 7px;
        }

        .date_folio_left_title {
            width: 100%;
            text-align: center;
            background: #005151;
        }

        .left_title_client {
            color: #fff;
            font-weight: 500;
            font-size: 8px;
        }

        .container_date_folio_right {
            text-align: center;
            float: left;
            width: 40%;
            /* height: 70px; */
            border-bottom: 1.5px solid black;
            border-left: 1.5px solid black;
        }

        .folio_right_title {
            font-size: 8px;
            font-weight: 600;
        }

        .folio_right_subtitle {
            font-size: 7px;
            font-size: 500;
        }

        .date_comprobant {
            border-top: 1.5px solid black;
            background-color: rgb(31, 235, 235);
        }

        .content_date_comprobant_title {
            text-align: center;
            background: #005151;
        }

        .comprobant_title_text {
            font-size: 8px;
            color: #fff;
        }

        .div_date_comprobant_left {
            padding: 2px;
            width: 50%;
            float: left;
        }

        .content_left_date {
            padding: 5px;
            float: left;
            width: 50%;
        }

        .date_title {
            font-size: 7px;
            font-weight: bold;
        }

        .date_subtitle {
            font-size: 7px;
            font-weight: 500;
        }

        .content_rigt_date {
            float: right;
            padding: 5px;
            width: 50%;
        }

        .div_date_comprobant_right {
            height: 67px;
            width: 50%;
            padding: 2px;
            float: right;
            border-left: 1.5px solid black;
        }

        .content_table_trasport {
            width: 100%;
            /* padding-top: 3px; */
            /* background-color: pink; */
        }

        table {
            width: 100%;
        }

        th {
            /* width: 20%; */
            text-align: left;
            font-weight: 700;
            font-size: 7px;
        }

        td {
            text-align: left;
            font-size: 7px;
        }

        .content_title_mercan {
            width: 100%;
            text-align: center;
        }

        .title_mercan {
            font-size: 9px;
            font-weight: 600;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .table_merchandise {
            width: 100%;
            border: black;
            /* border: 1px solid black; */
        }

        .thead_merchandise {
            border: 2px solid black;
        }

        .table_merchandise {
            /* border: 1px solid blue; */
            border-spacing: 0px;
            color: grey;
            /* border: grey; */
        }

        .th_merchandise_cant {
            width: 10%;
            background: #005151;
            color: #fff;
            text-align: center;
            border: 1px solid grey;
        }

        .th_merchandise_unity {
            width: 10%;
            background: #005151;
            color: #fff;
            text-align: center;
            border: 1px solid grey;
        }

        .th_merchandise_desc {
            width: 30%;
            background: #005151;
            color: #fff;
            text-align: center;
            border: 1px solid grey;
        }

        .th_merchandise_unit {
            width: 10%;
            background: #005151;
            color: #fff;
            text-align: center;
            border: 1px solid grey;
        }

        .th_merchandise_imp {
            width: 10%;
            background: #005151;
            color: #fff;
            text-align: center;
            border: 1px solid grey;
        }

        .th_merchandise_import {
            width: 10%;
            background: #005151;
            color: #fff;
            text-align: center;
            border: 1px solid grey;
        }

        .th_merchandise_type {
            background: #005151;
            color: #fff;
            width: 10%;
            text-align: center;
        }

        .th_merchandise_em {
            background: #005151;
            color: #fff;
            width: 10%;
            text-align: center;
        }

        .th_merchandise_kg {
            background: #005151;
            color: #fff;
            width: 5%;
            text-align: center;
        }

        .th_merchandise_fraction {
            background: #005151;
            color: #fff;
            width: 10%;
            text-align: center;
        }

        .th_merchandise_ped {
            background: #005151;
            color: #fff;
            width: 10%;
            text-align: center;
        }

        .tr_merchandise {
            border: 1px solid grey;
            text-align: center;
        }

        .td_merchandise {
            border: 1px solid grey;
            text-align: center;
        }

        .content_packaging {
            /* width: 100%; */
            padding: 20px;
            /* margin-top: 20px; */
        }

        .div_packaging_left {
            float: left;

            width: 30%;
            text-align: center;
        }

        .div_packaging_right {
            float: right;
            width: 70%;
        }

        .packaging_right_text {
            font-size: 7px;
            font-weight: bold;
        }

        strong {
            margin-left: 30px;
            font-weight: 500;
        }

        .packaging_left_text {
            font-size: 7px;
            font-weight: 600;
        }

        .comprobant_title_text {
            font-weight: 500;
        }

        .table_Senders_recipients {
            width: 100%;
            border-spacing: 0px;
        }

        .container_import {
            width: 100%;
        }

        .div_import_left {
            font-size: 7px;
            padding: 20px;
            width: 40%;
            float: left;
        }

        .div_import_right {
            padding: 10px;
            width: 60%;
            float: right;
        }

        .import_right_l {
            float: left;
        }

        .import_right_r {
            float: right;
        }

        .container_r_l {
            font-size: 7px;
            float: left;
            width: 100%;
            border-top: 1.5px solid black;
        }

        p {
            font-weight: bold;
        }

        .container_qr_des {
            width: 100%;
            padding: 10px;
            float: left;
        }

        .qr {
            text-align: center;
            float: left;
            width: 20%;
        }

        .img {
            width: 100px;
            height: 100px;
            margin: auto;
        }

        .des {
            float: right;
            width: 70%;
        }

        .tbody_des {
            width: 100%;
        }

        .th_des {
            font-size: 6px;
            text-align: center;
            background: #005151;
            color: white;
        }

        .td_des {
            width: 120px;
            font-size: 4px;
        }

        .str {
            margin-left: 1px;
        }

        .table_des {
            float: left;
            /* text-align: justify; */
            /* width: 100%; */
        }

        .sections_qr {
            /* width: 100%; */
            padding: 10px;
        }

        .info_qr {
            float: right;
            width: 70%;
        }

        .info_text_qr_black {
            font-size: 7px;
            font-weight: 800;
        }

        .info_text_qr {
            font-size: 8px;
            font-weight: 600;
        }

        .sections_titles {
            padding: 10px;
            float: left;
            width: 100%;
        }

        .title_regimen {
            float: left;
            width: 20%;
        }

        .title_description_regimen {
            width: 40%;
            float: left;
        }

        .content_titles_mercan {
            width: 25%;
            float: left;
        }

        .info_text {
            font-weight: 500;
        }

        .content_titles_mercan_trasport {
            /* padding: 10px; */
            width: 50%;
            float: left;
        }

        .content_titles_mercan_trasport_complete {
            width: 100%;
            float: left;
        }
        // .sections_services{
        //   margin-bottom: 350px;
        // }
    </style>
</head>

<body>
    <div class="container">
        <section class="sections">
            <div class="content_section_info">
                <div class="container_complete_initial">
                    <div class="content_div_title">
                        <p class="p_div_title">COMERCIALIZADORA Y DISTRIBUIDORA MB</p>
                        <p class="p_div_titles">CDM170519ERA</p>
                        <p class="p_div_subtitle">
                            Regimen Fiscal: 601 - General de Ley Personas Morales
                        </p>
                        <p class="p_div_subtitle">Lugar de expedicion:</p>
                        <p class="p_div_subtitle">
                            Domicilio: Balcon de la cañada 3020 Altavista Sur Monterrey
                            Nuevo Leon Mexico 64740
                        </p>
                    </div>
                    <div class="content_div_cart_port">
                        <div class="content_type_document">
                            <p class="type_document">Carta Porte - Translado</p>
                        </div>
                        <div class="content_date">
                            <p class="title_date_text">T 1</p>
                            <p class="subtitle_date_text">Fecha Timbrado</p>
                            <p class="title_date_text">${data?.createdAt}</p>
                            <p class="subtitle_date_text">Fecha Emision</p>
                            <p class="title_date_text">${data?.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="sections">
            <div class="table_info_client">
                <div class="container_date_folio">
                    <div class="container_date_folio_left">
                        <div class="date_folio_left_title">
                            <p class="left_title_client">DATOS DEL CLIENTE</p>
                        </div>
                        <p class="date_folio_text">Nombre: ${data?.client?.name}</p>
                        <p class="date_folio_text">RFC: ${data?.client?.rfc}</p>
                        <p class="date_folio_text">Tax Id Number: ${data?.client?.tax}</p>
                        <p class="date_folio_text">Domicilio: ${data?.client?.street}</p>
                    </div>
                    <div class="container_date_folio_right">
                        <p class="folio_right_title">Folio Fiscal</p>
                        <p class="folio_right_subtitle">
                            82581A6B-B003-4327-A5AE-C178A5EBD864
                        </p>
                        <p class="folio_right_title">No. Certificado Digital</p>
                        <p class="folio_right_subtitle">00001000000510785445</p>
                        <p class="folio_right_title">No. Certificado SAT</p>
                        <p class="folio_right_subtitle">00001000000505142236</p>
                    </div>
                </div>
                <div class="date_comprobant">
                    <div class="content_date_comprobant_title">
                        <p class="comprobant_title_text">DATOS DEL COMPROBANTE</p>
                    </div>
                    <div class="div_date_comprobant">
                        <div class="div_date_comprobant_left">
                            <div class="content_left_date">
                                <p class="date_title">Metodo de pago</p>
                                <p class="date_subtitle">${data?.metodpay}</p>
                                <p class="date_title">Forma de pago</p>
                                <p class="date_subtitle">${data?.metodpay}</p>
                            </div>
                            <div class="content_rigt_date">
                                <p class="date_title">Uso de Cfdi</p>
                                <p class="date_subtitle">-----</p>
                                <p class="date_title">Tipo de Comprobante</p>
                                <p class="date_subtitle">-----</p>
                            </div>
                        </div>
                        <div class="div_date_comprobant_right">
                            <div class="content_left_date">
                                <p class="date_title">Moneda</p>
                                <p class="date_subtitle">
                                    XXX - Los códigos asignados para las transacciones en que
                                    intervenga ninguna moneda.
                                </p>
                            </div>
                            <div class="content_rigt_date">
                                <p class="date_title">Tipo de Cambio</p>
                                <p class="date_subtitle">1.00000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="sections">
            <div class="content_title_mercan">
                <p class="title_mercan">SERVICIOS</p>
            </div>
        </section>
        <section class="sections_services">
            <table class="table_merchandise">
                <thead class="thead_merchandise">
                    <tr class="tr_merchandise">
                        <th class="th_merchandise_cant">Cantidad</th>
                        <th class="th_merchandise_unity">Unidad</th>
                        <th class="th_merchandise_desc">Descripción</th>
                        <th class="th_merchandise_unit">Valor Unitario</th>
                        <th class="th_merchandise_imp">Impuestos</th>
                        <th class="th_merchandise_import">Importe</th>
                    </tr>
                </thead>
                <tbody class="tbody_merchandise">
                ${itemsProducts}
                </tbody>
            </table>
        </section>
        <section class="sections">
            <div class="container_import">
                <div class="div_import_left">
                    <p>
                        Importe con letra:
                        <strong class="str">cero Pesos 00/100 M.N.</strong>
                    </p>
                </div>
                <div class="div_import_right">
                    <div class="container_r_l">
                        <div class="import_right_l">
                            <p>Subtotal</p>
                            <p>I.V.A.</p>
                            <p>Ret I.V.A.</p>
                            <p>Descuento.</p>
                        </div>
                        <div class="import_right_r">
                            <p>$0.00</p>
                            <p>$0.00</p>
                            <p>$0.00</p>
                            <p>$0.00</p>
                        </div>
                    </div>
                    <div class="container_r_l">
                        <div class="import_right_l">
                            <p>Total</p>
                        </div>
                        <div class="import_right_r">
                            <p>$0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="sections">
            <div class="container_qr_des">
                <div class="qr">
                    <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/common/qr.jpg" class="img" />
                </div>
                <div class="des">
                    <table class="table_des">
                        <thead class="thead_des">
                            <tr class="tr_des">
                                <th class="th_des">
                                    Cadena Original del Complemento de Certificación Digital del
                                    SAT
                                </th>
                            </tr>
                        </thead>
                        <tbody class="tbody_des">
                            <tr class="tr_des">
                                <td class="td_des">
                                    ||1.1|82581A6B-B003-4327-A5AE-C178A5EBD864|2024-06-26T13:25:33|MAS0810247C0|bXwwxxZ/jUEOorVPbvzWvMIjwZQiKATw0Qsd1kv87TuBe
                                    s+3E8CcjY5JllUJTvTTGvSBeY/5wCayImtAUoQq8cZkzqVy/Be2Xkbqb92RLKWLiG7FUddlSCgXcfMfhJYKuc8+PYxgiTrzPlET8ijJAnd+Nblrc+2nmHOJk
                                    tBNYlgWmEsCmAxGyTH5OBbIaUaHobsutEvwZBlXrAJIlB31LDPb/iUZseppTesOKaaj7ZrsxRn5CaQruUJgRoCakPnSQaRkVy5OW0vPxGhte9D+W+wDNyJYSV
                                    tYHnzA/nMy74rpasIuG18j9bzHFINHffTdquzfLsaGkYhAOSaF1LYIw==|00001000000505142236||
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table_des">
                        <thead class="thead_des">
                            <tr class="tr_des">
                                <th class="th_des">Sello Digital del CFDI</th>
                            </tr>
                        </thead>
                        <tbody class="tbody_des">
                            <tr class="tr_des">
                                <td class="td_des">
                                    bXwwxxZ/jUEOorVPbvzWvMIjwZQiKATw0Qsd1kv87TuBes+3E8CcjY5JllUJTvTTGvSBeY/5wCayImtAUoQq8cZkzqVy/Bea2Xkbqb92RLKWLiG7FUddlSCgX
                                    cfMfhJYKuc8+PYxgiTrzPlET8ijJAnd+Nblrc+2nmHOJktBNYlgWmEsCmAxGyTH5OBbIaUaHobsutEvwZBlXrAJIlB31LDPb/iUZseppTesOKaaj7ZrsxRn5C
                                    aQruUJgRoCakPnSQaRkVy5OW0vPxGhte9D+W+wDNyJYSVtYHnzA/nMy74rpasIuG18j9bzHFINHffTdquzfLsaGkYhAOSaF1LYIw==
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table_des">
                        <thead class="thead_des">
                            <tr class="tr_des">
                                <th class="th_des">Sello del SAT</th>
                            </tr>
                        </thead>
                        <tbody class="tbody_des">
                            <tr class="tr_des">
                                <td class="td_des">
                                    IBpHglyrmLZ84vQDjUGc67Rcx1e3IcXMGPsYWd5Rfhj17//KRkUq0kLPKlIhw4Huwt0c57CLGS35Rl5zzW0cNUaGLR2HmSEyt1TFl+8okKbPFT7/GC755HB
                                    6dX4xV3C9fI/4p0WIjyCwSjcPQe2A0MfwfhTFIvyVwUpUOSisFCID4Og1ZClACWmPQxVDJ1mZDLCxIL2nNHzfm2tIprUag7wuZUgE3fQ7zoXL9s+9bkvls4
                                    JVEkukUYTU16xkmxmqwisvbJzTqVtGSs1UPSJuo0dekdcZfsmKxI5ounBWTsmvd4MxKm/Lu7fJYcREElR5ECHsDabxcygd6MZDqbo4aw==
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">CARTA PORTE - AUTOTRANSPORTE</p>
            </div>
            <div class="sections_qr">
                <div class="qr">
                    <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/common/qr.jpg" class="img" />
                </div>
                <div class="info_qr">
                    <p class="info_text_qr_black">
                        ID: CCC5a96f-52aa-4811-b6bc-817a1c488cd2
                    </p>
                    <p class="info_text_qr_black">Versión: 3.1</p>
                    <p class="info_text_qr">Total de distancia recorrida: 755.8km</p>
                    <p class="info_text_qr">Transporte internacional: No</p>
                </div>
            </div>
        </section>

        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">DETALLE ISTMO</p>
            </div>
            <div class="sections_titles">
                <p class="info_text_qr_black">Registro Istmo</p>
                <p class="info_text_qr">No</p>
            </div>
        </section>

        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">REGÍMENES ADUANEROS</p>
            </div>
            <div class="sections_titles">
                <div class="title_regimen">
                    <p class="info_text_qr_black">Clave</p>
                </div>
                <div class="title_description_regimen">
                    <p class="info_text_qr_black">Descripción</p>
                </div>
            </div>
        </section>

        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">DATOS DEL COMPROBANTE</p>
            </div>
            <div class="sections_titles">
                <table>
                    <thead>
                        <tr>
                            <th>Tipó Ubicación</th>
                            <th>RFC</th>
                            <th>Nombre</th>
                            <th>Tax Id</th>
                            <th>Residencia Fiscal</th>
                            <th>Fecha Salida/Llegada</th>
                            <th>Distancia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01 - Autotransporte</td>
                            <td>No</td>
                            <td>Autotransporte (Terrestre)</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Direcciones:</th>
                            <th>Núm Ext.</th>
                            <th>Núm Int.</th>
                            <th>Colonia</th>
                            <th>Localidad</th>
                            <th>Referencia</th>
                            <th>MunicipioEstadoPaís</th>
                            <th>Estado</th>
                            <th>País</th>
                            <th>Código Postal</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${itemsDirections}
                    </tbody>
                </table>
            </div>
        </section>
        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">MERCANCIAS</p>
            </div>
            <div class="sections_titles">
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Peso Bruto total: <span class="info_text">16</span>
                    </p>
                </div>
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Unidad de peso :<span class="info_text">KGM</span>
                    </p>
                </div>
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Peso neto total: <span class="info_text">2000</span>
                    </p>
                </div>
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Número total de mercancías: <span class="info_text">${data?.products?.length}</span>
                    </p>
                </div>
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Logística inversa: <span class="info_text">No</span>
                    </p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Producto</th>
                            <th>Material Peligroso</th>
                            <th>Clave Embalaje</th>
                            <th>Referencia</th>
                            <th>Peso</th>
                            <th>Fraccion Arancelaria</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${itemsProductsArticle}
                    </tbody>
                </table>
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Material Peligroso: <span class="info_text">-</span>
                    </p>
                    <p class="info_text_qr_black">
                        Embalaje: <span class="info_text">-</span>
                    </p>
                </div>
            </div>
        </section>
        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">DOCUMENTACIÓN ADUANERA</p>
            </div>
            <div class="sections_titles">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de Documento</th>
                            <th>Número de Pedimento</th>
                            <th>Indentificador Documento Aduanero</th>
                            <th>RFC Importador</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">GUíAS DE IDENTIFICACIÓN</p>
            </div>
            <div class="sections_titles">
                <table>
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Descripción</th>
                            <th>Peso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">CANTIDAD TRANSPORTADA</p>
            </div>
            <div class="sections_titles">
                <table>
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>ID Origen</th>
                            <th>ID Destino</th>
                            <th>Transporte</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1.00</td>
                            <td>OR000001</td>
                            <td>DE000001</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>1.00</td>
                            <td>OR000001</td>
                            <td>DE000001</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">MEDIO DE TRANSPORTE</p>
            </div>
            <div class="sections_titles">
                <div class="content_titles_mercan_trasport">
                    <p class="info_text_qr_black">
                        Tipo de Autotrasporte: <span class="info_text">VL - VL</span>
                    </p>
                    <p class="info_text_qr_black">
                        Permiso SCT:
                        <span class="info_text">TPAF02 - Transporte privado de carga.</span>
                    </p>
                </div>
                <div class="content_titles_mercan_trasport_complete">
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Número de Permiso: <span class="info_text">${data?.transport?.Numpermision}</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan_trasport">
                        <p class="info_text_qr_black">
                            Placa: <span class="info_text">${data?.transport?.placa}</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan_trasport">
                        <p class="info_text_qr_black">
                            Año: <span class="info_text">${data?.transport?.age}</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan_trasport">
                        <p class="info_text_qr_black">
                            Peso bruto vehicular: <span class="info_text">4115.00</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan_trasport">
                        <p class="info_text_qr_black">
                            Aseguradora resp. civil: <span class="info_text">QUALITAS</span>
                        </p>
                    </div>
                </div>
                <div class="content_titles_mercan_trasport_complete">
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Aseguradora med. amb: <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Poliza resp. civil, Poliza med. amb: <span class="info_text">${data?.transport?.poliza}</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Año: <span class="info_text">2024</span>
                        </p>
                    </div>
                </div>
                <div class="content_titles_mercan_trasport_complete">
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Aseguradora carga: <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Póliza carga: <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Prima seguro: <span class="info_text">-</span>
                        </p>
                    </div>
                </div>
                <div class="content_titles_mercan_trasport_complete">
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Remolque: <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Placa: <span class="info_text">-</span>
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <section class="sections">
            <div class="content_date_comprobant_title">
                <p class="comprobant_title_text">FIGURAS DE TRANSPORTE</p>
            </div>
            <div class="sections_titles">
                <div class="sections_titles">
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo de figura:</th>
                                <th>Rfc</th>
                                <th>Nombre</th>
                                <th>Licencia</th>
                                <th>Tax id</th>
                                <th>Residencia Fiscal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>CUCR930831P33</td>
                              <td>${data?.transport?.nametrasport}</td>
                              <td>${data?.transport?.poliza}</td>
                                <td>-</td>
                                <td>-</td>
                        </tbody>
                    </table>
                </div>
                <div class="content_titles_mercan_trasport_complete">
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Direcciones: <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Núm Ext.Núm Int.ColoniaLocalidadReferencia : <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Municipio EstadoPaís: <span class="info_text">-</span>
                        </p>
                    </div>
                    <div class="content_titles_mercan">
                        <p class="info_text_qr_black">
                            Código Postal: <span class="info_text">-</span>
                        </p>
                    </div>

                </div>
                <div class="content_titles_mercan">
                    <p class="info_text_qr_black">
                        Parte Trasporte: <span class="info_text">-</span>
                    </p>
                </div>
            </div>
        </section>
    </div>
</body>

</html>
   
  `;
};

export const templateNewOrder = data => {
  const { provider, products, folio = "A2-01GT", buyer, address } = data;
  let renderProducts = "";
  let totalQuantity = 0;
  let totalAmount = 0;
  products.forEach((item, index) => {
    totalQuantity += item.quantity;
    totalAmount += item.amount;
    renderProducts += `
        <tr>
          <td>${index}</td>
          <td>${item.model}</td>
          <td colspan="4">${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.unitprice}</td>
          <td colspan="3">${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
            item.amount
          )}</td>
        </tr>
      `;
  });

  const validName = name => {
    if (name != null && name != "null null" && name != "") {
      return name;
    } else {
      return "N/A";
    }
  };

  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template</title>
<style>

@page {
    size: A4;
    margin: 0;
}
    body{
      font-family: Arial, sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        background-color:#cdcdcd;
    }

  .container_template {
    background: #fff;
    border: 1px solid #eee;
    font-size: 10px;
    font-family: "Calibri", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    position: relative;
    width: 5.8in;
    margin: auto;
    padding: 0px 20px 20px 20px;
}
  img{
    width: 100%;
  }
  span{
    color: red;
    font-weight: 600;
  }
  .folio{
    background: aliceblue;
    margin-top: -81px;
    margin-left: 440px;
    font-weight: 400;
    color: #fff;
    font-size: 10px;
    }
    .numberfolio{
      margin-top:15px;
      font-size: 10px;
    }

.table-container {
            float: left;
            box-sizing: border-box;
            width:48%;
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

.div_data{
  display: flex;
}
.div_head_three{
  border-radius: 6px;
  border: 2px solid #455469;
  padding: 6px;
  line-height: 0.1em;
  }
  .text_data{
  font-weight: 600;
  margin-left: 2px;
  font-size: smaller;
  }
  .span_color_data{
    margin-left:100px;
    color: #555;
  }
 
 table, th, td {
            border: 1px solid black;
             border-collapse: collapse; 
            font-size: 8px;
            padding: 2px;
        }
        th, td {
            height: 8px;
            text-align: center;
        }
     
        .full-width {
            width: 100%;
            margin-top: 6px;
        }
        
.footer p{
  font-size: smaller;
  font-weight: bold;
  line-height: 0.1em;
  padding: 2px;
}
.word_violet{
  color: #6b449c;
  font-weight: 600;
  font-size: smaller;
  margin-bottom: 2px;
}
.color_div{
    background: #455469;
    color: #fff;
    font-weight: 600;
}
.color_row{
    background: #bfbfbf;
    font-weight: 600;
}

.text {
  font-size: smaller;
  font-weight: 600;
}
.span_color_main{
  font-weight: 600;
  color: #555;
}
.span_color{
  font-weight: 500;
  color: #455469;
}


</style>
</head>

<body>
  <div class="container_template">
    <div>
      <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-08-05%20at%2012.36.18%20PM%20(1).jpeg" alt="Logo" />
    </div>
    <div>
    <div class="folio">
      <p class="numberfolio"> ${folio} </p>
    </div>
    <br>
    <br>
    <br>

  <div class="table-container">
      <div class="table">
          <div class="table-header">SELLER</div>
          <div class="table-content">
              <p class="text">COMPANYNAME:  <span class="span_color_main">${provider?.companyname}</span> </p>
              <p class="text">NAME:  <span class="span_color">${validName(
                provider?.name || provider?.fullname
              )}</span></p>
              <p class="text">ADDRESS: <span class="span_color"> ${
                address?.street ? `Calle ${address?.street},` : ""
              } ${address?.int_number ? `num.interior: ${address?.int_number},` : ""} ${
    address?.ext_number ? `numero exterior: ${address?.ext_number},` : ""
  } ${address?.postal?.postal_code ? `C.P: ${address?.postal?.postal_code},` : ""} ${
    address?.city?.name ? `Ciudad: ${address?.city?.name},` : ""
  }  ${address?.entity?.name ? `Estado: ${address?.entity?.name}` : ""}</span></p>
              <p class="text">PREPARED BY: <span class="span_color">N/A</span></p>
              <p class="text">PHONE: <span class="span_color"> ${provider?.phone} <br>  </span></p>
              <p class="text">E-MAIL: <span class="span_color"> ${provider?.email}</span> </p>
            </div>
      </div>
  </div>
  <div class="table-container2">
      <div class="table2">
          <div class="table-header2">BUYER</div>
          <div class="table-content2">
              <p class="text">NAME: <span class="span_color_main"> ${buyer?.name} </span></p>
              <p class="text">TAX: <span class="span_color"> ${buyer?.tax}</span> </p>
              <p class="text">CONTACT: <span class="span_color"> ${buyer?.contact} </span></p>
              <p class="text">ADDRESS: <span class="span_color"> ${buyer?.address} </span> </p>
              <p class="text">PHONE: <span class="span_color">${buyer?.phone}</span></p>
              <p class="text">EMAIL: <span class="span_color">${buyer?.email}</span></p>
          </div>
      </div>
  </div>

 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
   <div class="div_head_three">
      <span class="word_violet"> SHIPPING DETAILS <br> <br> </span> 
      
    <div class="div_data">
      <div class="div_dates">
        <p class="text_data"> PROMED EXPORT SERVICES, LLC          <span class="span_color_data">   MARICELA RODRIGUEZ    unomedimagingsolutions@yahoo.com</span> </p>
        <p class="text_data"> 6324 S 23RD ST. MCALLEN, TX 78503 USA    <span class="span_color_data"> PHONE: +9566273526 FX: 956-627-3576 ZIP: 78503</span></p>
      </div>
    </div>
    </div>
    
    <table class="full-width">
        <tr class="color_div">
            <td class="header">No.</td>
            <td colspant="1"> ITEM CODE</td>
            <td colspan="4" class="header">ITEM NAME</td>
            <td class="header">QTY</td>
            <td class="header">UNIT PRICE</td>
            <td colspan="3" class="header">TOTAL VALUE</td>
        </tr>
       ${renderProducts}
        <tr>
            <td></td>
            <td></td>
            <td colspan="4">TOTAL</td>
            <td >${totalQuantity}</td>
            <td> </td>
            <td >TOTAL VALUE</td>
            <td>${totalAmount}</td>
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
            <td class="color_row" >Freight by:</td>
            <td class="color_row" colspan="4">SEA</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td class="color_row"> Destination:</td>
            <td class="color_row" colspan="4">MC ALLEN</td>
            <td></td>
            <td></td>
            <td class="word_violet"> TOTAL AMOUNT</td>
            <td></td>
        </tr>
        <tr>
       
        </tr>
    </table>
    </div>
    
    <div class="footer">
        <p class="word_violet">TERMS & CONDITIONS FOR THIS ORDER</p>
        <p>1. Trade mode: CFR </p>
        <p>2. In shipments by SEA please do not use:</p>
        <span> -Hapag Lloyd </span> </br>
        <span> -Cosco Shipping </span>
        <p>3. Currency: USD </p>
        <p>4.Minimum Warranty: 12 Months</p>
        <p>5. American Plug</p>
        <p>6. User manual.</p>
        Goods Delivery:
        <p>7. Use CMC GLOBAL for the Goods that arrives in HOUSTON </p>
        <p>8. Do not send the Goods until it is approved by Homukea </p>
        <p>9. Send the ISF information once the suppiler got the booking </p>
        <p>10. Send CI, PL, SN before shipping merchandise.</p>
    </div>
  </div>
       
</body>
</html>
`;
};

export const templateNationalRosster = data => {
  const { provider, products, folio = "A2-01GT", buyer } = data;
  let renderProducts = "";
  let totalQuantity = 0;
  let totalAmount = 0;
  products?.forEach((item, index) => {
    totalQuantity += item.quantity;
    totalAmount += item.amount;
    renderProducts += `
        <tr>
          <td>${index}</td>
          <td>${item.model}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>Pzas</td>
          <td>${item.unitprice}</td>
          <td>${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.amount)}</td>
        </tr>
      `;
  });
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
              <p class="text">FECHA DE PEDIDO: ${provider?.date}</p>
              <p class="text">FECHA DE ENTREGA: ${provider?.date}</p>
              <p class="text">ATENCIÓN: ${data.name}</p>
              <p class="text">CONDICIÓN DE PAGO: </p>
              <p class="text">TELÉFONO: ${provider?.phone}</p>
            </div>
          </div>
        </div>
        <div class="table-container2">
          <div class="table2">
            <div class="table-header2">${buyer?.tax}</div>
            <div class="table-content2">
              <p class="text">RFC: OME200918IQ2</p>
              <p class="text">CONTACTO: ${buyer?.contact}</p>
              <p class="text">DIRECCIÓN: ${buyer?.address} </p>
              <p class="text">TELÉFONO: ${buyer?.phone}</p>
              <p class="text">EMAIL: ${buyer?.email}</p>
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
                ${renderProducts}
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
                <p></p>
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

export const templateGeneralMedicalEquipmentOutput = data => {
  const { prospect, products, quoteInfo } = data;
  let nums = 25;
  let itemsProducts = "";

  // Verifica si products es un array válido, de lo contrario, usa un array vacío
  let validProducts = products ?? []; // Si products es undefined o null, usa []

  validProducts.forEach((item, index) => {
    // Agregar productos reales al HTML
    itemsProducts += `
    <tr>
      <td>${item?.quantity}</td>
      <td>${item?.code}</td>
      <td>${item?.brand?.name}</td>
      <td>${item?.entity}</td>
    </tr>
  `;
  });

  // Calcular filas vacías que faltan
  let emptyRows = nums - validProducts.length;
  console.log("html", emptyRows);

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
      background-color: #ffffff;
    }

    .container {
      width: 5.8in;
      margin: auto;
      padding: 20px;
      background: #fff;

    }

    .sections {
      width: 100%;
      float: left;
    }

    .content_title {
      float: left;
      width: 100%;
      height: 25px;
      text-align: center;
    }

    .title {
      height: 0px;
      font-size: 14px;
      color: #3b647e;
      font-weight: 500;
    }
    .date_info {
      float: left;
      width: 100%;
    }

    .content_img {
      float: left;

      width: 30%;
      overflow: hidden;
      margin-bottom: 5px;
      /* border: 1px solid #ddd; */
      padding: 10px;
      box-sizing: border-box;
    }

    .logo {
      float: left;
      width: 130px;
      height: auto;
      margin-right: 20px;
    }

    .date_info_folio_date {
    padding-top: 10px;
      width: 70%;
      /* border-bottom: 1px solid black; */
      float: right;
    }
    .left{
      text-align: center;
      float: left;
      width: 100%;
    }
    .left_left{
      float: left;
      width: 50%;
    }
    .left_rigth{
      float: right;
      width: 20%;
    }

    .divider_folios_date {
      border-bottom: 1.5px solid black;
    }

    .text_folio_date {
      height: 0px;
      color: #42627e;
      font-weight: 700;
      font-size: 8px;
    }

    .text_folio {
      height: 0px;
      color: #42627e;
      font-weight: 700;
      font-size: 8px;
    }
    table {
      width: 100%;
      /* margin-left: auto;
      margin-right: auto; */
      margin-top: 10px;
      border-collapse: collapse;
      text-align: center;
    }

    table,
    th,
    td {
      border: 2px solid #203663;
      font-size: 9px;
    }

    th {
      color: #203663;
    }

    td {
      border: 1.5px solid #203663;
      font-size: 7px;
      text-align: center;
      /* Establece un ancho mínimo para las celdas */
      height: 16px;
    }

    thead {
      background: #bdd7ee;
      color: #fff;
    }

    .thead_th_cant {
      width: 5%;
    }

    .thead_th_code {
      width: 10%;
    }

    .thead_th_desc {
      width: 65%;
    }

    .thead_th_dest {
      width: 20%;
    }

    .content__firm {
      float: right;
    }

    .content_left {
      text-align: center;
      float: left;
      width: 50%;
    }

    .content_firm_operator {
      width: 50%;
      float: left;
    }

    .content_firm_vigilance {
      width: 50%;
      float: right;
    }

    .content_rigth {
      text-align: center;
      float: right;
      width: 50%;
    }

    .content_firm_almacenist {
      width: 50%;
      float: left;
    }

    .content_firm_gerent {
      float: right;
      width: 50%;
    }

    .text_operator {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .text_vigilace {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .text_almacenist {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .text_gerent {
      font-size: 8px;
      color: #203663;
      font-weight: 600;
    }

    .line {
      float: left;
      margin-top: 2px;
      margin-left: auto;
      margin-right: auto;
      width: 90%;
      background-color: #203663;
      height: 1.4px;
    }   
    .liner {
      float: left;
      margin-top: 2px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      background-color: #203663;
      height: 1.4px;
    }

    .sections_firm {
      float: left;
      width: 100%;
      margin-top: 150px;
    }
  </style>
  </head>

  <body>
    <div class="container">
      <div class="content_title">
        <p class="title">SALIDA GENERAL DE EQUIPO MEDICO</p>
      </div>
 <section class="sections">
      <div class="date_info">
        <div class="content_img">
          <img class="logo" src=""></img>
        </div>
        <div class="date_info_folio_date">
          <div class="left">
            <div class="left_left"><p class="text_folio">FOLIO:</p></div>
            <div class="left_rigth"><p class="text_folio">${quoteInfo?.folio}</p></div>
          </div>
          <div class="left">
            <div class="left_left">  <p class="text_folio_date">FECHA DE EMISION:</p></div>
            <div class="left_rigth">  <p class="text_folio_date">${quoteInfo?.date}</p></div>
            <div class="liner"></div>
          </div>
          <div class="left">
            <div class="left_left"><p class="text_folio_date">FECHA DE SALIDA:</p></div>
            <div class="left_rigth"><p class="text_folio_date">${quoteInfo?.date}</p><div class="liner"></div></div>
          </div>
        </div>
      </div>

    </section>
      <section class="sections">
        <table>
          <thead>
            <tr>
              <th class="thead_th_cant">CANTIDAD (PZAS)</th>
              <th class="thead_th_code">CODIGO</th>
              <th class="thead_th_desc">DESCRIPCION</th>
              <th class="thead_th_dest">DESTINO</th>
            </tr>
          </thead>
          <tbody>
           ${itemsProducts}
          </tbody>
        </table>
      </section>
      <section class="sections_firm">
        <div class="content_left">
          <div class="content_firm_operator">
            <div class="line"></div>
            <p class="text_operator">OPERADOR</p>
          </div>

          <div class="content_firm_vigilance">
            <div class="line"></div>
            <p class="text_vigilace">VIGILANCIA</p>
          </div>
        </div>
        <div class="content_rigth">
          <div class="content_firm_almacenist">
            <div class="line"></div>
            <p class="text_almacenist">ALMACÉN</p>
          </div>
          <div class="content_firm_gerent">
            <div class="line"></div>
            <p class="text_gerent">GERENTE</p>
          </div>
        </div>
      </section>
    </div>
  </body>
          </html>`;
  return ` `;
};

export const templateReviewbyArticle = data => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CHECK PRODCUTO</title>
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
        // height: 900px;
        margin: auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .title {
        color: black;
        font-weight: 600;
        text-align: center;
        font-size: 8px;
        margin-top: 20px;
      }

      .sections {
        float: left;
        width: 100%;
      }
      .content-rigth-empty-title {
        margin-bottom: 1px;
        float: right;
        width: 35%;
      }

      .th-title {
        width: 100%;
        font-size: 9px;
        font-weight: 600;
        color: black;
        text-align: center;
        background-color: #cdcdcd;
        border: 1.5px solid black;
      }
      span {
        margin: auto;
        font-size: 10px;
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

      .content-info-1 {
        height: 20px;
        float: left;
        width: 100%;
        border-left: 1.5px solid black;
        border-right: 1.5px solid black;
        border-bottom: 1.5px solid black;
      }

      .content-info-2 {
        float: left;
        width: 100%;
        border-left: 1.5px solid black;
        border-right: 1.5px solid black;
        border-bottom: 1.5px solid black;
      }
      .content-info-2-sello-firma {
        height: 20px;
        float: left;
        width: 100%;
        border-left: 1.5px solid black;
        border-right: 1.5px solid black;
        border-bottom: 1.5px solid black;
      }

      .content-info-3 {
        height: 20px;
        float: left;
        width: 100%;
        border-left: 1.5px solid black;
        border-right: 1.5px solid black;
        border-bottom: 1.5px solid black;
      }
      .back {
        background-color: #cdcdcd;
      }

      .content-info-4 {
        height: 20px;
        float: left;
        width: 100%;
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
        width: 25%;
        border-right: 1.5px solid black;
      }
      .content-info-title-left-sello-firma {
        text-align: center;
        float: left;
        width: 25%;
        border-right: 1.5px solid black;
      }

      .content-info-b-sello-firma {
        font-weight: 700;
        font-size: 9px;
        margin: 0px;
      }

      .content-info-p-sello-firma {
        font-weight: 700;
        font-size: 9px;
      }
      .content-info-b {
        font-weight: 700;
        font-size: 9px;
        margin: 0px;
      }
      .spacing {
        height: 100px;
      }
.content-info-p {
        margin-left: 3px;
        font-weight: 700;
        font-size: 9px;
}
      .content-info-pa {
      margin-top:5px;
      width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-block;
      }
  .class-verde {
  background-color: green;
}

.class-amarillo {
  background-color: yellow;
}
.class-azul {
  background-color: blue;
}
.class-rojo {
  background-color: red;
}

      .content-info-desc-rigth {
        margin-left: 10px;
      }
      .content-info-desc-rigth-sello-firma {
        text-align: center;
        margin-left: 10px;

      }

      .content-info-desc-rigth-hora {
        float: left;
       width: 74.7%;
      }

      .hora {
        text-align: center;
        width: 10%;
        float: left;
      }
      .des{
      
      }
      .hora-observation {
        text-align: center;
      }

      .hora-title {
        height: 20px;
        text-align: center;
        border-left: 1.5px solid black;
        border-right: 1.5px solid black;
        width: 10%;
        float: left;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <p class="title">FORMATO DE REVISION POR ARTICULO</p>
      <section class="sections">
        <div class="th-title"><span>CHECK GENERAL</span></div>
      </section>

      <section class="sections">
        <div class="content-info-1">
          <div class="content-info-title-left">
            <b class="content-info-b">MODELO</b>
          </div>
          <div class="content-info-desc-rigth">
            <b class="content-info-p">${data?.model}</b>
          </div>
        </div>
        <div class="content-info-1">
          <div class="content-info-title-left">
            <b class="content-info-b">NUMERO SERIE</b>
          </div>
          <div class="content-info-desc-rigth">
            <b class="content-info-p">${data?.numberSerial}</b>
          </div>
        </div>
        <div class="content-info-2">
          <div class="content-info-title-left">
            <b class="content-info-b">DESCRIPCION EQUIPO</b>
          </div>
          <div class="content-info-desc-rigth">
            <b class="content-info-p"
              >${data?.name}</b
            >
          </div>
        </div>

        <div class="content-info-3 back">
          <div class="content-info-title-left">
            <b class="content-info-b">LISTA</b>
          </div>
          <div class="content-info-desc-rigth-hora">
            <div class="hora">
              <b class="content-info-p">SI</b>
            </div>
            <div class="hora-title">
              <b class="content-info-b">NO</b>
            </div>
            <div class="hora-observation">
              <b class="content-info-p">OBSERVACIONES</b>
            </div>
          </div>
        </div>
        <div class="content-info-3">
          <div class="content-info-title-left">
            <b class="content-info-b">FUNCIONAMIENTO</b>
          </div>
          <div class="content-info-desc-rigth-hora">
            <div class="hora">
              <b class="content-info-p">${data?.details?.rule == true ? "✓" : ""}</b>
            </div>
            <div class="hora-title">
              <b class="content-info-b">${data?.details?.rule == false ? "✓" : ""}</b>
            </div>
            <div class="des">
              <b class="content-info-p">${data?.details?.description}</b>
            </div>
          </div>
        </div>
        <div class="content-info-3">
          <div class="content-info-title-left">
            <b class="content-info-b">ACCESORIOS</b>
          </div>
          <div class="content-info-desc-rigth-hora">
            <div class="hora">
              <b class="content-info-p">${data?.accessories?.rule == true ? "✓" : ""}</b>
            </div>
            <div class="hora-title">
              <b class="content-info-b">${data?.accessories?.rule == false ? "✓" : ""}</b>
            </div>
            <div class="desc">
              <b class="content-info-p">${data?.accessories?.description}</b>
            </div>
          </div>
        </div>
        <div class="content-info-3">
          <div class="content-info-title-left">
            <b class="content-info-b">DETALLES ESTETICOS:</b>
          </div>
          <div class="content-info-desc-rigth-hora">
            <div class="hora">
              <b class="content-info-p">${data?.detailsStatic?.rule == true ? "✓" : ""}</b>
            </div>
            <div class="hora-title">
              <b class="content-info-b">${data.detailsStatic?.rule == false ? "✓" : ""}</b>
            </div>
            <div class="desc">
              <b class="content-info-p">${data.detailsStatic?.description}</b>
            </div>
          </div>
        </div>
             <div class="content-info-3">
          <div class="content-info-title-left">
            <b class="content-info-b">LIMPIEZA:</b>
          </div>
          <div class="content-info-desc-rigth-hora">
            <div class="hora">
              <b class="content-info-p">${data?.cleaning?.rule == true ? "✓" : ""}</b>
            </div>
            <div class="hora-title">
              <b class="content-info-b">${data.cleaning?.rule == false ? "✓" : ""}</b>
            </div>
            <div class="desc">
              <b class="content-info-p">${data.cleaning?.description}</b>
            </div>
          </div>
        </div>
        <div class="content-info-2">
          <div class="content-info-title-left">
            <b class="content-info-b">PERSONA RESPONSABLE</b>
          </div>
          <div class="content-info-desc-rigth">
            <b class="content-info-p">${data?.personcharge}</b>
          </div>
        </div>

        <div class="content-info-2">
          <div class="content-info-title-left">
            <b class="content-info-b">FECHA DE REVISION</b>
          </div>
          <div class="content-info-desc-rigth">
            <b class="content-info-p">${data?.daterevision}</b>
          </div>
        </div>

        <div class="content-info-2 back">
          <div class="content-info-title-left-sello-firma">
            <b class="content-info-b-sello-firma">SEMAFORO</b>
          </div>
          <div class="content-info-desc-rigth-sello-firma">
            <b class="content-info-p-sello-firma">SELLO Y FIRMA</b>
          </div>
        </div>

        <div class="content-info-2 spacintg">
          <div class="content-info-title-left spacing">
          <b 
  class="content-info-pa 
    ${
      data?.indicator === "Verde"
        ? "class-verde"
        : data?.indicator === "Amarillo"
        ? "class-amarillo"
        : data?.indicator === "Azul"
        ? "class-azul"
        : "class-rojo"
    }"
>
 
</b>
          </div>
          <div class="content-info-desc-rigth spacing"></div>
        </div>
        
      </section>
    </div>
  </body>
</html>

    
    `;
};
export const templateOuts = data => {
  let nums = 14;
  let itemsProducts = "";
  let validProducts = data.products ?? [];

  validProducts.forEach((item, index) => {
    // Agregar productos reales al HTML
    itemsProducts += `
      <tr>
        <td>${data.folio}</td>
        <td>${data?.createdby}</td>
        <td>${data.provider.fullname}</td>
        <td>${item?.code}</td>
        <td>${item?.name}</td>
        <td>${data?.quantity}</td>
        <td>${data?.oc}</td>    
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
        <td></td>
        <td></td>
        <td></td>
      </tr>
    `;
  }
  //   <tr>
  //   <td>OSCLNO2456</td>
  //   <td>OZCAR LOPEZ GUTIERRES</td>
  //   <td>AARON ARROLLO</td>
  //   <td>SE_RTG156</td>
  //   <td>FILTRO Y MANGUERA PARA EVACUADOR SE-S120</td>
  //   <td>1</td>
  //   <td>7126</td>
  // </tr>

  return `
    <!DOCTYPE html>
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
            background-color: #ffffff;
        }

        .container {
            width: 5.8in;
            // height: 11in;
            margin: auto;
            padding: 20px;
            background: #fff;

            // /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
        }

        .container-border {
            width: 5.8in;
            height: 8in;
            margin: auto;
            padding-top: 10px;
            background: #fff;
            border: 1.5px solid black;
        }

        .sections {
            margin-top: 10px;
            width: 100%;
            float: left;
        }

        .sections_a {
            margin-top: 50px;
            width: 100%;
            float: left;
        }

        .content_title {
            float: left;
            width: 33%;
            height: 25px;
            text-align: center;
        }

        .titlea {
            height: 0px;
            font-size: 14px;
            color: black;
            font-weight: 500;
            text-decoration: underline;
        }

        .title {
            height: 0px;
            font-size: 20px;
            color: #0071c2;
            font-weight: 500;
        }

        .logo {
          float: left;
    width: 140px;
    height: auto;
    margin-left: 20px;
        }

        .sections_a_fecha {
            border: 1.5px solid black;
            float: left;
            height: 15px;
            width: 40%;
            margin-bottom: -1px;
        }

        .sections_a_fecha_title {
            text-align: center;
            float: left;
            width: 40%;
            height: 15px;
            font-size: 10px;
            color: white;
            background-color:  #0071c2;

        }

        .fecha_title_text {
            text-align: center;
            float: right;
            width: 50%;
            height: 15px;
            font-size: 10px;

        }

        .p {
            margin: 0px;
        }

        .sections_b_folio {
            border: 1.5px solid black;
            float: right;
            height: 15px;
            width: 30%;
            margin-bottom: -1px;
        }

        .fecha_title_text_folio {
            /* text-align: center; */
            float: right;
            width: 40%;
            height: 15px;
            font-size: 10px;

        }

        .sections_a_fecha_title_folio {
            /* text-align: center; */
            float: left;
            width: 60%;
            height: 15px;
            font-size: 10px;
            color: white;
            background-color:  #0071c2;

        }

        .sections_c_fecha {
            border-top: 1.5px solid black;
            border-bottom: 1.5px solid black;
            float: left;
            height: 15px;
            width: 100%;

        }

        .sections_left {
            float: left;
            width: 58%;

        }

        .sections_right {
            float: right;
            width: 42%;

        }

        .sections_d_fecha {
            margin-top: -1px;
            border-top: 1.5px solid black;
            border-bottom: 1.5px solid black;
            float: left;
            height: 15px;
            width: 100%;

        }

        .sections_d_fecha_title {
            text-align: center;
            float: left;
            width: 69%;
            height: 15px;
            font-size: 10px;
            color: white;
            background-color:  #0071c2;

        }
        .fecha_title_text_d {
            text-align: center;
            float: right;
            width: 30%;
            height: 15px;
            font-size: 10px;

        }

        table {
            font-size: 8px;
            width: 100%;
            /* margin-left: auto;
      margin-right: auto; */
            margin-top: 10px;
            border-collapse: collapse;
            text-align: center;
            font-weight: 600;
        }

        table,
        th,
        td {
            border: 1.5px solid black;
            font-size: 9px;
        }

        th {
            background-color:  #0071c2;
            color: white;
        }

        td {
            padding: 3px;
            border: 1.5px solid black;
            font-size: 7px;
            text-align: center;
            /* Establece un ancho mínimo para las celdas */
            height: 16px;
        }

        thead {
            background: #bdd7ee;
            color: #fff;
        }

        .thead_th_folio {
            width: 14.28%;
        }

        .thead_th_ejec {
            width: 14.28%;
        }

        .thead_th_prove {
            width: 14.28%;
        }

        .thead_th_code {
            width: 14.28%;
        }

        .thead_th_dest {
            width: 26.28%;
        }

        .thead_th_cant {
            width: 8.28%;
        }

        .thead_th_oc {
            width: 8.28%;
        }

        .content__firm {
            float: right;
        }

        .content_left {
            padding: 10px;
            text-align: center;
            float: left;
            width: 100%;
        }

        .content_firm_operator {
            width: 50%;
            float: left;
        }

        .content_firm_vigilance {
            width: 50%;
            float: right;
        }

        .content_rigth {
            text-align: center;
            float: right;
            width: 50%;
        }

        .content_firm_almacenist {
            width: 50%;
            float: left;
        }

        .content_firm_gerent {
            float: right;
            width: 50%;
        }

        .text_operator {
            font-size: 8px;
            color: black;
            font-weight: 600;
        }

        .text_vigilace {
            font-size: 8px;
            color: black;
            font-weight: 600;
        }

        .line {
            float: left;
            margin-top: 2px;
            margin-left: auto;
            margin-right: auto;
            width: 90%;
            background-color: black;
            height: 1.4px;
        }

        .liner {
            float: left;
            margin-top: 2px;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            background-color:  #0071c2;
            height: 1.4px;
        }

        .sections_firm {
            float: left;
            width: 100%;
            margin-top: 40px;
        }

        .observations {
            width: 100%;

        }

        .sections_observations_fecha {
            margin-top: -1px;
            border-top: 1.5px solid black;
            border-bottom: 1.5px solid black;
            float: left;
            width: 100%;

        }

        .sections_observations_fecha_title {
            text-align: center;
            float: left;
            width: 40%;
            padding-top: 30px;
            font-size: 10px;
            color: white;
            background-color:  #0071c2;

        }

        .fecha_title_text_observations {
            text-align: center;
            float: right;
            width: 60%;
            font-size: 10px;
            padding-top: 2%;
        }

        .p_observations {
            height: 50px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="container-border">
            <section class="sections">
                <div class="content_title">
                    <p class="title">Compras</p>
                </div>
                <div class="content_title">
                    <p class="titlea">SALIDA DE MERCANCIA</p>
                </div>
                <div class="content_title">
                    <img class="logo"
                        src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-12-05%20at%209.25.54%20AM.jpeg "></img>
                </div>
            </section>

            <section class="sections_a">
                <div class="sections_a_fecha">
                    <div class="sections_a_fecha_title">
                        <p class="p">Fecha de solicitud</p>
                    </div>
                    <div class="fecha_title_text">
                        <p class="p">${data.createdAt}</p>
                    </div>
                </div>



                <div class="sections_b_folio">
                    <div class="sections_a_fecha_title_folio">
                        <p class="p">Folio</p>
                    </div>
                    <div class="fecha_title_text_folio">
                        <p class="p">${data.createdAt}</p>
                    </div>
                </div>
                <div class="sections_c_fecha">
                    <div class="sections_a_fecha_title">
                        <p class="p">Tipo de recolección</p>
                    </div>
                    <div class="fecha_title_text">
                        <p class="p">${data.typerecolections}</p>
                    </div>
                </div>
            </section>
            <section class="sections">
                <table>
                    <thead>
                        <tr>
                            <th class="thead_th_folio">Folio de Pedido</th>
                            <th class="thead_th_ejec">Ejecutivo</th>
                            <th class="thead_th_prove">Proveedor</th>
                            <th class="thead_th_code">Código</th>
                            <th class="thead_th_dest">Descripción</th>
                            <th class="thead_th_cant">Cantidad</th>
                            <th class="thead_th_oc">OC</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${itemsProducts}
                    </tbody>
                </table>
                <div class="sections_left">
                    <div class="sections_d_fecha">
                        <div class="sections_d_fecha_title">
                            <p class="p">Fecha de Entrega Prov.</p>
                        </div>
                        <div class="fecha_title_text_d">
                            <p class="p">${data.createdAt}</p>
                        </div>
                    </div>
                    <div class="sections_d_fecha">
                        <div class="sections_d_fecha_title">
                            <p class="p">Fecha de Recolección Log.</p>
                        </div>
                        <div class="fecha_title_text_d">
                            <p class="p">N/A</p>
                        </div>
                    </div>
                    <div class="sections_d_fecha">
                        <div class="sections_d_fecha_title">
                            <p class="p">Paqueteria</p>
                        </div>
                        <div class="fecha_title_text_d">
                            <p class="p">N/A</p>
                        </div>
                    </div>
                </div>
                <div class="sections_right">
                    <div class="sections_d_fecha">
                        <div class="sections_d_fecha_title">
                            <p class="p">Sucursal de Origen</p>
                        </div>
                        <div class="fecha_title_text_d">
                            <p class="p">N/A</p>
                        </div>
                    </div>
                    <div class="sections_d_fecha">
                        <div class="sections_d_fecha_title">
                            <p class="p">Sucursal de Destino</p>
                        </div>
                        <div class="fecha_title_text_d">
                            <p class="p">ALMACÉN</p>
                        </div>
                    </div>
                    <div class="sections_d_fecha">
                        <div class="sections_d_fecha_title">
                            <p class="p">No de Guia</p>
                        </div>
                        <div class="fecha_title_text_d">
                            <p class="p">N/A</p>
                        </div>
                    </div>
                </div>

            </section>
            <section class="sections">
                <div class="sections_observations_fecha">
                    <div class="sections_observations_fecha_title">
                        <p class="p_observations">Observaciones</p>
                    </div>
                    <div class="fecha_title_text_observations">
                        <p class="">${data.obserevationgeneral}
                        </p>
                    </div>
                </div>
            </section>
            <section class="sections_firm">
                <div class="content_left">
                    <div class="content_firm_operator">
                        <div class="line"></div>
                        <p class="text_operator">Quien recibe</p>
                    </div>

                    <div class="content_firm_vigilance">
                        <div class="line"></div>
                        <p class="text_vigilace">Quien entrega</p>
                    </div>
                </div>
                <!-- <div class="content_rigth">
                    <div class="content_firm_almacenist">
                        <div class="line"></div>
                        <p class="text_almacenist">ALMACÉN</p>
                    </div>
                    <div class="content_firm_gerent">
                        <div class="line"></div>
                        <p class="text_gerent">GERENTE</p>
                    </div>
                </div> -->
            </section>
        </div>

    </div>
</body>

    </html>
  `;
};
export const templateMedicalBuyGarantia = data => {
  return `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Garantía 2022 Pro</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    }

    .content {
      height: 7.5in;
      width: 4.80in;
      margin: auto;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/MEDICALBUY.jpeg");
      padding: 60px;
    }
    
    .folio {
      float: left;
      width: 70%;
      font-weight: 700px;
      font-size: 10px;
    }

    .head_Two {
      font-size: 10px;
      float: right;
      width: 30%;
      margin: 0px;
    }

    .sectionParagraph {
      margin-top: 20%;
    }

    .text {
      text-align: justify;
      font-size: 7pt;
    }

    .sectionFooter {
      width: 500px;

    }

    .textdataFooter {
      display: inline-block;
      width: 500px;
    }

    .textFooter2left {
      width: 50%;
      float: left;
      font-weight: bold;
    }

    .textleft {

      font-size: 6pt;
    }

    .spacer {
      height: 31px;
    }

    .content_folio {
      width: 100%;
      margin-bottom: 4%;
      float: left;
    }

    .foli {
      float: right;
      width: 10%;
    }

    .folio_b {
      font-size: 8px;
    }

    .content_firm_name {
      width: 100%;
      margin-bottom: 10px;
      float: left;
    }

    .container_firm {
      float: right;
      text-align: center;
    }

    .line {
      padding: 0px;
      margin: -10px;
      margin-bottom: 0px;
    }

    .name {
      margin: 80px;
      font-size: 8px;

    }
    .text-title {
      margin-top: 20px;
      /* text-align: justify;
      font-size: 7pt; */
    }

    .sections-title {
      margin-top: 50px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="content">
      <div class="sectionParagraph">
        <div class="sections-title">
          <div class="folio">
            <p>POLIZA DE GARANTÍA</p>
          </div>
          <div class="head_Two">
            <p> Folio: ${data?.folio}</p>
          </div>
        </div>
        <p class="text">
          MEDICAL BUY Hace de su conocimiento que es responsabilidad del cliente reportar o notificar cualquier falla que se presente en el bien adquirido, así mismo se reserva el derecho a cambiar la parte defectuosa o reparar la misma a su entera discreción. La garantía será computada desde el momento de la entrega del equipo y no cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios, dispositivos y otros aditamentos ajenos al número de serie indicado en la presente póliza. La garantía se brinda en la sucursal ubicada en: AVENIDA INSTITUTO POLITECNICO NACIONAL, NUMERO 5129, COLONIA CAPULTITLAN, GUSTAVO A MADERO, CODIGO POSTAL 07370, CIUDAD DE MÉXICO y es necesario se agende una cita para que la recepción de su equipo sea recibida por personal autorizado y facultado para brindar el servicio de MEDICAL BUY, dicha cita se tendrá que solicitar al correo: garantias@medicalbuy.mx
          </p>

        <p class="text">I. Esta póliza ampara únicamente productos comercializados por MEDICAL BUY, el tiempo de reparación será en un periodo aproximado de entre 60 a 90 días hábiles, mismo que se computará una vez recibido el equipo en nuestras instalaciones.</p>

        <p class="text">En caso de cambio total del equipo, se verificará la disponibilidad y en caso de que se cuente con dicho equipo el tiempo de entrega estimada será de 2 meses.</p>

        <p class="text">En caso de que dicho equipo no se encuentre disponible se reemplazara por uno similar, si así lo prefiere el cliente o se realizara el proceso para adquirir uno igual aceptando ajustarse a los tiempos que esto conlleve, siempre y cuando dicho equipo se encuentre vigente en el mercado.</p>

        <p class="text">II. La garantía solo será aplicable cuando exista algún defecto de fábrica.</p>

        <p class="text">III. En todo caso que la garantía sea no procedente, se notificará la razón y se procederá a generar una cotización del servicio y partes requeridas para su reparación, la cual deberá ser cubierta por el cliente.</p>

        <p class="text">
         IV. Una vez recibida la evidencia y revisada por el personal especializado:
        </p>
        <p class="text">
          <ul>
            <li class="text">En caso de que sea necesario, se procederá con el envío del equipo a nuestras instalaciones, mismo que deberá que ser enviado completo, en buen estado y con el empaque original además de contar con todos los accesorios, todos los gastos incurridos relacionados a la solicitud de garantía son responsabilidad del cliente y no están incluidos dentro de la garantía, que de manera enunciativa mas no limitativa son: los gastos de envío, fletes, etc.</li>
            <li class="text">En caso de ser necesaria la visita del personal especializado al domicilio indicado por el cliente para la revisión del bien adquirido, los gastos erogados serán cubiertos por el cliente en su totalidad.</li>
          </ul>
        </p>
        <p class="text">V. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez cumplido el protocolo anterior.</p>
        <p class="text">
          VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas o detención, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas de desgaste, accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos.
          </p>
      </div>
  
    </div>
    <div class="content">
    <div class="sectionParagraph">  
      
      <p class="text">VII. En caso de que el equipo llegara dañado o maltratado, el cliente deberá notificar de forma inmediata a su ejecutivo de ventas y paquetería, así mismo deberá de ser respaldado mediante videos y fotos.</p>


      <p class="text">VIII. Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo mediante fotografías y/o videos, así como proporcionar la siguiente documentación:</p>

      <p class="text">
        <ul>
          <li class="text">Nombre del cliente</li>
          <li class="text">Numero de contacto</li>
          <li class="text">Dirección donde se encuentra el producto.</li>
          <li class="text">Descripción, evidencia de la falla, número de serie y modelo.</li>
          <li class="text">Póliza de garantía en original.</li>
          <li class="text">Recibo de compra y/o factura</li>
        </ul>
      </p>
      <p class="text">Esta información se enviará mediante correo electrónico al correo establecido en al rubro de la presente póliza, dicha información será cotejada debiendo coincidir con el número de serie del equipo.</p>

      <p class="text">ESTA GARANTÍA NO SERÁ VÁLIDA EN LOS SIGUIENTES CASOS.</p>
      <p class="text">
        <ul>
          <li class="text">
       Esta información se enviará mediante correo electrónico establecido en al rubro de la presente póliza, dicha información será cotejada debiendo coincidir con el número de serie del equipo.
          </li>
          <li class="text">
            La alteración, rotura o enmendadura de cualquier sello de seguridad y/o códigos de barras invalidan la garantía, así mismo el quipo deberá tener el mismo número de serie descrito en la presente póliza.
          </li>
          <li class="text">
            III. Cuando el producto no hubiese sido operado de acuerdo con el instructivo de uso que se le acompaña.
          </li>
          <li class="text">
            IV. Cuando el producto se hubiese utilizado en condiciones distintas a las normales.
          </li>
        </ul>

      </p>

      <p class="text">MEDICAL BUY garantiza durante el lapso de meses 12 MESES</p>
      <div class="sectionFooter">
        <div class="textdataFooter">
          <div class="textFooter2left">
            <p class="textleft">EQUIPO: ${data?.nameproduct}</p>
            <p class="textleft">MARCA: ${data?.namebrand}</p>
            <p class="textleft">MODELO: ${data?.serialnumber}</p>
            <p class="textleft">FECHA: ${data?.date}</p>
            <p class="textleft">NOMBRE DE CLIENTE:${data?.clientname} </p>
          </div>
        </div>
      </div>
      <div class="content_firm_name">
        <div class="container_firm">
          <p class="line">____________________</p>
          <span class="name">Nombre y Firma </span>
        </div>
      </div>
    </div>
    </div>
  </div>
</body>

</html>  `;
};

export const templateBitacora = data => {
  console.log(data);

  let nums = 10;
  let itemsProducts = "";
  let validProducts = data ?? [];

  validProducts.forEach((item, index) => {
    // Agregar productos reales al HTML
    itemsProducts += `
      <tr>
        <td>${item.brand ?? ''}</td>
        <td>${item?.code}</td>
        <td>${item.name}</td>
        <td>${item?.ubi}</td>
        <td>${item?.serial}</td>
        <td>${item?.folio}</td>
        <td>${item?.namealmacen}</td> 
        <td>${item?.date}</td>
        <td></td>   
      </tr>
    `;
  });
  let emptyRows = nums - validProducts.length;

  for (let i = 0; i < emptyRows; i++) {
    itemsProducts += `
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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
            background-color: #ffffff;
        }

        .container {
            width: 5.8in;
            height: 8in;
            margin: auto;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            padding: 20px;
            background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/bitacora.jpeg");
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .sections {
            width: 100%;
            float: left;
        }

        .content_title {
            float: left;
            width: 100%;
            height: 25px;
            text-align: center;
            margin-top: 70px;
            margin-bottom: 40px;
        }

        .title {
            height: 0px;
            font-size: 16px;
            color: black;
            font-weight: 700;
        }

        .content_img {
            float: left;
            width: 30%;
            overflow: hidden;
            margin-bottom: 5px;
            /* border: 1px solid #ddd; */
            padding: 10px;
            box-sizing: border-box;
        }

        .logo {
            float: left;
            width: 130px;
            height: auto;
            margin-right: 20px;
        }

        .divider_folios_date {
            border-bottom: 1.5px solid black;
        }

        table {
            width: 100%;
            /* margin-left: auto;
      margin-right: auto; */
            margin-top: 10px;
            border-collapse: collapse;
            text-align: center;
        }

        table,
        th,
        td {
            border: 1px solid black;
            font-size: 9px;
        }

        th {
            /* padding: 4px; */
            background-color: #548cd4;
            color: white;
        }

        td {
            border: 1px solid #203663;
            font-size: 7px;
            text-align: center;
            /* Establece un ancho mínimo para las celdas */
            height: 16px;
        }

        thead {
            background: #bdd7ee;
            color: #fff;
        }

        .table {
            margin-top: -1px;
        }

        .thead {}

        .tr {
            padding: 10px;
        }

        .th {
            width: 25%;
            color: black;
            background-color: #fff;
        }

        .tbody {
            background-color: #fff;
        }

        .tbody_tr {
            height: 40px;
        }

        .tbody_td {
            height: 13px;
        }

        .thead_th_cant {
            width: 8%;
        }

        .thead_th_code {
            width: 7%;
        }

        .thead_th_desc {
            width: 18.1%;
        }

        .thead_th_ubi {
            width: 7%;
        }

        .thead_th_num {
            width: 11.1%;
        }

        .thead_th_folio {
            width: 11.1%;
        }

        .thead_th_nameal {
            width: 11.1%;
        }

        .thead_th_date {
            width: 7.1%;
        }

        .thead_th_firm {
            width: 11.1%;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="content_title">
            <p class="title">BITACORA DE ENTRADAS ALMACEN</p>
        </div>
        <section class="sections">
            <table>
                <thead>
                    <tr>
                        <th class="thead_th_cant">MARCA</th>
                        <th class="thead_th_code">CODIGO</th>
                        <th class="thead_th_desc">DESCRIPCION DEL EQUIPO</th>
                        <th class="thead_th_ubi">UBICACION</th>
                        <th class="thead_th_num">NUMERO DE SERIE</th>
                        <th class="thead_th_folio">FOLIO DE PEDIDO</th>
                        <th class="thead_th_nameal">NOMBRE DEL ALMACENISTA</th>
                        <th class="thead_th_date">FECHA</th>
                        <th class="thead_th_firm">FIRMA</th>
                    </tr>
                </thead>
                <tbody>
             ${itemsProducts}
                </tbody>
            </table>
            <table class="table">
                <thead class="thead">
                    <tr class="tr">
                        <th class="th">JEFE DE PISO</th>
                        <th class="th">CORDINADOR SALIDAS</th>
                        <th class="th">VIGILANCIA</th>
                        <th class="th">OPERADOR</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                    <tr class="tbody_tr">
                        <td class="tbody_td"></td>
                        <td class="tbody_td"></td>
                        <td class="tbody_td"></td>
                        <td class="tbody_td"></td>
                </tbody>
            </table>
        </section>
    </div>
</body>

</html> `;
};
export const templateEquipmentTransfers = data => {
  let nums = 20;
  let itemProducts = "";
  let validProducts = data ?? [];

  validProducts.forEach((item, index) => {
    itemProducts += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.serial}</td>
        <td>${item.product}</td>
        <td>${item.almOrigin}</td>
        <td>${item.almDest}</td>
        <td>${item.delivery}</td>
        <td>${item.dateOut}</td>
        <td>${item.receive}</td>
        <td>${item.dateInt}</td>
        <td>${item.observation}</td>
      </tr> 
    `;
  });

  let emptyRows = nums - validProducts.length;
  for (let i = 0; i < emptyRows; i++) {
    itemProducts += `
     <tr>
      <td>${validProducts.length + i + 1}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    `;
  }

  const folioElement = validProducts.length > 0 
    ? `<h5 style="text-align: center">(${validProducts[0].folio})</h5>` 
    : '';

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Traspasos de Equipos</title>
   <style>
      .content {
        width: 85%;
        margin: 0 auto;
        padding: 0;
        font-family: 'Arial Narrow', sans-serif;
      }
      table {
        width: 100%;
        font-size: 6px;
        table-layout: fixed;
        border-collapse: collapse;
        margin: 2px 0;
      }
      th,
      td {
        border: 1px solid black;
        font-size: 6px;
        max-width: 50px; 
        padding: 4px;
        text-align: center;
        word-wrap: break-word;
      }
      th {
        font-weight: bold;
        background-color:#ceeaff;
      }
      .lineas-firma {
        display: inline-block;
        width: 45%;
        margin: 15px 2%;
        position: relative;
        height: 20px;
      }
      .lineas-firma::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 1px solid black;
      }
      .lineas-firma::before {
        content: "____________________";
        position: absolute;
        left: 0;
        bottom: -3px;
        font-size: 16px;
        letter-spacing: -2px;
        color: transparent;
      }
      h2 {
        font-size: 14px;
        margin: 5px 0;
      }
      h5 {
        font-size: 10px;
        margin: 3px 0;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h2 style="text-align: center">TRASPASOS DE EQUIPOS</h2>
      ${folioElement}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>SERIAL</th>
            <th>PRODUCTO</th>
            <th>ALMACÉN ORIGEN</th>
            <th>ALMACÉN DESTINO</th>
            <th>ENTREGA (NOMBRE Y FIRMA)</th>
            <th>FECHA SALIDA</th>
            <th>RECIBE (NOMBRE Y FIRMA)</th>
            <th>FECHA INGRESO</th>
            <th>OBSERVACIONES</th>
          </tr>
        </thead>
        <tbody>
          ${itemProducts}
        </tbody>
      </table>
      <p>
        <span class="lineas-firma"></span>
        <span class="lineas-firma"></span>
      </p>
      <p>
        <span class="lineas-firma"></span>
        <span class="lineas-firma"></span>
      </p>
    </div>
  </body>
</html>
 `;
};
