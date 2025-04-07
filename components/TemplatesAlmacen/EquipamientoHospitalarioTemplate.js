import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

function EquipamientoHospitalarioGarantia(props) {
  const { zoom, data } = props;
  return (
    <LayoutStyled zoom={zoom}>
      <div className="content">
        <div className="head">
          <h1>GARANTIA</h1>
          <h3>Folio:{data?.folio}</h3>
        </div>
        <div className="sectionParagraph">
          <p className="text">
            EQUIPAMIENTO HOSPITALARIO Hace de su conocimiento que es responsabilidad del cliente reportar o notificar
            cualquier falla que se presente en el bien adquirido, así mismo se reserva el derecho a cambiar la parte
            defectuosa o reparar la misma a su entera discreción. La garantía será computada desde el momento de la
            entrega del equipo y no cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios,
            dispositivos y otros aditamentos ajenos al número de serie indicado en la presente póliza. La garantía se
            brinda en la sucursal ubicada en: AVENIDA INSTITUTO POLITECNICO NACIONAL, NUMERO 5129, COLONIA CAPULTITLAN,
            GUSTAVO A MADERO, CODIGO POSTAL 07370, CIUDAD DE MÉXICO y es necesario se agende una cita para que la
            recepción de su equipo sea recibida por personal autorizado y facultado para brindar el servicio de
            EQUIPAMIENTO HOSPITALARIO, dicha cita se tendrá que solicitar al correo:
            garantias@equipamientohospitalario.com.mx
          </p>
          <p className="text">
            I. Esta póliza ampara únicamente productos comercializados por EQUIPAMIENTO HOSPITALARIO, el tiempo de
            reparación será en un periodo aproximado de entre 60 a 90 días hábiles, mismo que se computará una vez
            recibido el equipo en nuestras instalaciones.
          </p>
          <p className="text">
            En caso de cambio total del equipo, se verificará la disponibilidad y en caso de que se cuente con dicho
            equipo el tiempo de entrega estimada será de 2 meses.
          </p>
          <p className="text">
            En caso de que dicho equipo no se encuentre disponible se reemplazara por uno similar, si así lo prefiere el
            cliente o se realizara el proceso para adquirir uno igual aceptando ajustarse a los tiempos que esto
            conlleve, siempre y cuando dicho equipo se encuentre vigente en el mercado.
          </p>
          <p className="text">II. La garantía solo será aplicable cuando exista algún defecto de fábrica.</p>
          <p className="text">
            III. En todo caso que la garantía sea no procedente, se notificará la razón y se procederá a generar una
            cotización del servicio y partes requeridas para su reparación, la cual deberá ser cubierta por el cliente.
          </p>
          <p className="text">IV. Una vez recibida la evidencia y revisada por el personal especializado:</p>
          <p className="text">
            <ul>
              <li className="text">
                En caso de que sea necesario, se procederá con el envío del equipo a nuestras instalaciones, mismo que
                deberá que ser enviado completo, en buen estado y con el empaque original además de contar con todos los
                accesorios, todos los gastos incurridos relacionados a la solicitud de garantía son responsabilidad del
                cliente y no están incluidos dentro de la garantía, que de manera enunciativa mas no limitativa son: los
                gastos de envío, fletes, etc.
              </li>
              <li className="text">
                En caso de ser necesaria la visita del personal especializado al domicilio indicado por el cliente para
                la revisión del bien adquirido, los gastos erogados serán cubiertos por el cliente en su totalidad.
              </li>
            </ul>
          </p>
          <p className="text">
            V. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez
            cumplido el protocolo anterior.
          </p>
          <p className="text">
            VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas o
            detención, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas de desgaste, accesorios,
            piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos.
          </p>

          <div className="contact">
            <p className="text">TELÉFONO DE ATENCIÓN:</p>
            <p className="text">55 5861 8906 EXT 2303</p>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="head">
          {/* <!-- <h1>GARANTIA</h1> -->
        <!-- <h3>Folio:${data?.folio}</h3> --> */}
        </div>
        <p className="text">
          VII. En caso de que el equipo llegara dañado o maltratado, el cliente deberá notificar de forma inmediata a su
          ejecutivo de ventas y paquetería, así mismo deberá de ser respaldado mediante videos y fotos.
        </p>
        <p className="text">
          VIII. Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo
          mediante fotografías y/o videos, así como proporcionar la siguiente documentación:
        </p>
        <p className="text plus">
          <ul>
            <li className="text">Nombre del cliente</li>
            <li className="text">Numero de contacto</li>
            <li className="text">Dirección donde se encuentra el producto.</li>
            <li className="text">Descripción, evidencia de la falla, número de serie y modelo.</li>
            <li className="text">Póliza de garantía en original.</li>
            <li className="text">Recibo de compra y/o factura</li>
          </ul>
        </p>
        <p className="text">
          Esta información se enviará mediante correo electrónico al correo establecido en al rubro de la presente
          póliza, dicha información será cotejada debiendo coincidir con el número de serie del equipo.
        </p>
        <p className="text">ESTA GARANTÍA NO SERÁ VÁLIDA EN LOS SIGUIENTES CASOS.</p>
        <p className="text plus">
          <ul>
            <li className="text">
              I. Toda garantía se invalidará a consecuencia de cualquier trabajo de reparación por parte del cliente o
              un tercero no autorizado, así mismo, si se utilizan accesorios y componentes no aprobados por EQUIPAMIENTO
              HOSPITALARIO.
            </li>
            <li className="text">
              II. La alteración, rotura o enmendadura de cualquier sello de seguridad y/o códigos de barras invalidan la
              garantía, así mismo el quipo deberá tener el mismo número de serie descrito en la presente póliza.
            </li>
            <li className="text">
              III. Cuando el producto no hubiese sido operado de acuerdo con el instructivo de uso que se le acompaña.
            </li>
            <li className="text">
              IV. Cuando el producto se hubiese utilizado en condiciones distintas a las normales.
            </li>
          </ul>
        </p>
        <div className="sectionFooter">
          <p className="textFooter1">EQUIPAMIENTO HOSPITALARIO garantiza durante el lapso de meses 12 MESES</p>

          <div className="textdataFooter">
            <div className="textFooter2left">
              <p className="textleft">EQUIPO: {data?.product?.name}</p>
              <p className="textleft">MARCA:{data?.product?.brand?.name}</p>
              <p className="textleft">FECHA:{dayjs(data?.createdAt).format("DD/MM/YYYY")}</p>
              <p className="textleft">NOMBRE DEL CLIENTE:{data?.receive}</p>
            </div>
            <div className="textFooter2right">
              <p className="textright">NUMEROS DE SERIE:{data?.serialnumber}</p>
              <p className="textright">MODELO: {data?.product?.code}</p>
            </div>
          </div>

          {/* </div> */}
          <div className="div_firm_name">
            <div className="content_name">
              <p className="line">__________________</p>
              <span className="name">Nombre y Firma</span>
            </div>
          </div>
          <div className="contactdos">
            <p className="text">TELÉFONO DE ATENCIÓN:</p>
            <p className="text">55 5861 8906 EXT 2303</p>
          </div>
        </div>
      </div>
    </LayoutStyled>
  );
}

export default EquipamientoHospitalarioGarantia;

export const LayoutStyled = styled.section`
  height: 100%;
  width: 100%;
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  overflow: auto;
  /* #pageFooter {
    font-size: 8px;
    color: #555;
  }

  .footer {
    font-size: 8px;
    color: #3d3d3d;
  } */

  @page {
    size: A4;
    margin: 0;
  }

  .content {
    height: 8.4in;
    width: 70%;
    margin: auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-25%20at%208.31.43%20AM.jpeg");
    padding: 20px;
  }

  .head {
    padding: 30px 30px 0px 30px;
    margin-top: 14%;
  }

  h1 {
    margin: 0px;
    font-size: 13pt;
  }

  h3 {
    margin: 0px;
    margin-top: 5px;
    font-size: 10pt;
  }

  .sectionParagraph {
    padding: 0px 30px 0px 30px;
  }

  .text {
    text-align: justify;
    font-size: 7pt;
  }

  .sectionFooter {
    padding: 0px 30px 0px 30px;
    width: 500px;
    margin-top: 0px;
  }

  .textFooter1 {
    margin-bottom: 0px;
    font-size: 7pt;
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

  .textFooter2right {
    width: 40%;
    float: right;
    font-weight: bold;
  }

  .textleft {
    font-size: 6pt;
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .textright {
    font-size: 6pt;
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .textFooter3 {
    text-align: center;
    font-weight: bold;
    margin: 0px;
    font-size: 7pt;
  }

  .keywords {
    text-decoration: underline;
  }

  .div_firm_name {
    float: left;
    width: 100%;
  }

  .content_name {
    text-align: center;
    margin-right: 50px;
    float: right;
  }

  .line {
    margin-bottom: 2px;
  }
  .plus {
    padding:20px;
  }

  .name {
    font-size: 8px;
  }
  .contact {
    background-color: white;
    float: left;
    margin-left: 5px;
    margin-top: 50px;
  }
  .contactdos {
    background-color: white;
    float: left;
    margin-left: 30px;
    margin-top: 169px;
  }
`;
