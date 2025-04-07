export const renderTemplateCarta = data => {

  return `<!DOCTYPE html>
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
          // background-color: #f4f4f4;
        }
  
        .container {
          width: 5.8in;
          // height: 11in;
          margin: auto;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
          padding-top: 50px;
        }
  
        h1 {
          text-align: center; /* Centrando el h1 */
          font-size: 20px; 
          font-weight: 400;
        }
  
        h2 {
          color: rgba(2, 151, 189, 0.712);
          text-align: center; /* Centrando el h1 */
          font-size: 9px;
          font-weight: 800;
          margin: 1px 0px;
        }
  
        p {
          margin: 0px 0;
          font-size: 8px;
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
  
        .centro {
          margin-left: 40px;
        }
  
        .centro2{
        margin-right: 40px;
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
            font-size: 8px;
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
          width: 70%;
  
          margin: 20px 100px;
          border-collapse: collapse;
         
        }
  
        table,
        th,
        td {
          border: 1px solid #ddd;
          font-size: 9px;
          border: 1px solid black;
        }
  
        th,
        td {
          padding: 3px;
          text-align: left;
          background-color: #deeaf6;
        }
  
        td {
          width: 50%;
          font-size: 8px;
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
          font-weight: 700;
          font-size: 9px;
          margin-bottom: 20px;
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
  
        .container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          object-fit: cover;
        }
  
        .underlined {
          display: inline-block;
          border-bottom: 1px solid #000;
          padding-bottom: 2px;
          width: 60%; /* Ajusta el ancho según el espacio necesario */
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/prueba/vm4kC_prueba" alt="Descripción de la imagen" />
        <h1><u>CARTA SATISFACTORIA</u></h1>
        <div class="row">
          <section class="derecha">
            <p>CIUDAD DE MEXICO A ${data?.date} del 2024</p>
          </section>
        </div>
  
        <div class="row">
          <section class="izquierda">
            <br />
            <p class="ltitle">PRESENTE</p>
          </section>
        </div>
  
        <div class="row">
          <p>
            Por medio del presente se menciona que el día ${data?.trainingday} se
            llevó a cabo la capacitación de ${data?.nametraning}
            correspondiente del equipo ${data?.equipement}
            por parte de la esfera de negocio ${data?.sphere}, en el
            domicilio del comprador ubicado en ${data?.localitation}.
          </p>
          <br />
          <p>
            Por último, se notifica que el trabajo realizado por concepto de
            capacitación y entrega estuvo apegado a la orden de compra celebrado
            entre usted y la empresa antes mencionada, así mismo se establece que
            el presente objeto que nos une fue entregado cumple con las
            características y especificaciones solicitadas, sin contar con algún
            desperfecto o se encuentre incompleto el equipo.
          </p>
          <br />
          <p>
            Quiero hacer del conocimiento que estoy conforme con el trabajo
            desempeñado por los colaboradores de la empresa que usted precede han
            realizado en nuestras instalaciones, por lo que reiteramos nuestra
            conformidad con los servicios que se han prestado.
          </p>
        </div>
        <br />
  
        <section>
          <table>
            <tbody>
              <tr>
                <td>Hora de inicio de operaciones</td>
                <td>${data?.starttime}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Hora de finalización de capacitación</td>
                <td>${data?.endtime}</td>
              </tr>
            </tbody>
          </table>
        </section>
  
        <br />
  
        <div class="row">
          <p>ING. BIOMÉDICO:</p>
        </div>
  
        <br />
        <br />
  
        <div class="row">
          <section class="izquierda centro">
            <p>___________________________________________</p>
            <div class="centro">
              <p class="ltitle">
                NOMBRE Y FIRMA <br />
                DEL CAPACITADOR
              </p>
            </div> 
          </section>
  
          <section class="derecha centro2">
            <p>___________________________________________</p>
            <div class="centro">
              <p class="ltitle">
                NOMBRE Y FIRMA <br />
                DEL TITULAR
              </p>
            </div>
          </section>
        </div>
  
        <br />
  
        <div class="row">
          <section>
            <p>
              Leído anteriormente lo mencionado por quienes intervienen, e
              impuestos de su contenido lo ratifican y quedan en conformidad con
              la capacitación ofrecida por _________________________________________________________en ${data?.localitation}.
            </p>
          </section>
        </div>
      </div>
    </body>
  </html>
    `;
};
