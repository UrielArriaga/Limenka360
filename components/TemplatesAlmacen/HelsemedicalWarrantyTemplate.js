import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import styled from "styled-components";
import dayjs from "dayjs";

export default function HelsemedicalGarantia(props) {
  const { zoom, data } = props;

  const { userData } = useSelector(userSelector);

  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container">
        <div className="content">
          <div className="sectionParagraph">
            <h1>POLIZA DE GARANTIA</h1>
            <h3>Folio:{data?.folio}</h3>
            <p className="text">
              HELSE MEDICAL Hace de su conocimiento que es responsabilidad del cliente reportar o notificar
              cualquier falla que se presente en el bien adquirido, así mismo se reserva el derecho a cambiar la parte
              defectuosa o reparar la misma a su entera discreción. La garantía será computada desde el momento de la
              entrega del equipo y no cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios,
              dispositivos y otros aditamentos ajenos al número de serie indicado en la presente póliza. La garantía se
              brinda en la sucursal ubicada en: AVENIDA INSTITUTO POLITECNICO NACIONAL, NUMERO 5129, COLONIA
              CAPULTITLAN, GUSTAVO A MADERO, CODIGO POSTAL 07370, CIUDAD DE MÉXICO y es necesario se agende una cita
              para que la recepción de su equipo sea recibida por personal autorizado y facultado para brindar el
              servicio de HELSE MEDICAL, dicha cita se tendrá que solicitar al correo:
              garantias@solucioneshospitalarias.com.mx
            </p>
            <p className="text">
              <strong>I.</strong> Esta póliza ampara únicamente productos comercializados por HELSE MEDICAL,
              el tiempo de reparación será en un periodo aproximado de entre 60 a 90 días hábiles, mismo que se
              computará una vez recibido el equipo en nuestras instalaciones.
            </p>
            <p className="text">
              En caso de cambio total del equipo, se verificará la disponibilidad y en caso de que se cuente con dicho
              equipo el tiempo de entrega estimada será de 2 meses.
            </p>
            <p className="text">
              En caso de que dicho equipo no se encuentre disponible se reemplazara por uno similar, si así lo prefiere
              el cliente o se realizara el proceso para adquirir uno igual aceptando ajustarse a los tiempos que esto
              conlleve, siempre y cuando dicho equipo se encuentre vigente en el mercado.
            </p>

            <p className="text">
              <strong>II.</strong> La garantía solo será aplicable cuando exista algún defecto de fábrica.
            </p>
            <p className="text">
              <strong>III.</strong> En todo caso que la garantía sea no procedente, se notificará la razón y se
              procederá a generar una cotización del servicio y partes requeridas para su reparación, la cual deberá ser
              cubierta por el cliente.
            </p>
            <p className="text">
              <strong>IV.</strong> Una vez recibida la evidencia y revisada por el personal especializado:
            </p>

            <p className="text">
              <ul className="ul">
                <li className="li">
                  En caso de que sea necesario, se procederá con el envío del equipo a nuestras instalaciones, mismo que
                  deberá que ser enviado completo, en buen estado y con el empaque original además de contar con todos
                  los accesorios, todos los gastos incurridos relacionados a la solicitud de garantía son
                  responsabilidad del cliente y no están incluidos dentro de la garantía, que de manera enunciativa mas
                  no limitativa son: los gastos de envío, fletes, etc.
                </li>

                <li className="li">
                  En caso de ser necesaria la visita del personal especializado al domicilio indicado por el cliente
                  para la revisión del bien adquirido, los gastos erogados serán cubiertos por el cliente en su
                  totalidad.
                </li>
              </ul>
            </p>

            <p className="text">
              <strong>V.</strong> El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el
              equipo una vez cumplido el protocolo anterior.
            </p>
            <p className="text">
              <strong>VI.</strong> La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente,
              descargas eléctricas o detención, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas
              de desgaste, accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los
              mismos.
            </p>
            <div className="cont">
              <p className="t">contacto</p>
              <p className="t">Tel: 3389951637</p>
              <p className="t"> Correo: garantias@solucioneshospitalarias.com.mx</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="sectionParagraph">
            <p className="text">
              <strong>VII.</strong> En caso de que el equipo llegara dañado o maltratado, el cliente deberá notificar de
              forma inmediata a su ejecutivo de ventas y paquetería, así mismo deberá de ser respaldado mediante videos
              y fotos.
            </p>
            <p className="text">
              <strong>VIII.</strong> Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que
              presente el equipo mediante fotografías y/o videos, así como proporcionar la siguiente documentación:
            </p>
            <p className="text">
              <ul className="ul">
                <li className="li">Nombre del cliente</li>
                <li className="li">Numero de contacto</li>
                <li className="li">Dirección donde se encuentra el producto.</li>
                <li className="li">Modelo y número de serie</li>
                <li className="li">Descripción y evidencia de la falla.</li>
                <li className="li">Póliza de garantía en original.</li>
                <li className="li">Recibo de compra y/o factura</li>
              </ul>
            </p>
            <p className="text">ESTA GARANTÍA NO SERÁ VÁLIDA EN LOS SIGUIENTES CASOS.</p>
            <p className="text">
              <ul className="ul">
                <li className="li">
                  <strong>I.</strong>Toda garantía se invalidará a consecuencia de cualquier trabajo de reparación por
                  parte del cliente o un tercero no autorizado, así mismo, si se utilizan accesorios y componentes no
                  aprobados por HELSE MEDICAL.
                </li>
                <li className="li">
                  <strong>II.</strong>La alteración, rotura o enmendadura de cualquier sello de seguridad y/o códigos de
                  barras invalidan la garantía, así mismo el quipo deberá tener el mismo número de serie descrito en la
                  presente póliza.
                </li>
                <li className="li">
                  <strong>III.</strong>Cuando el producto no hubiese sido operado de acuerdo con el instructivo de uso
                  que se le acompaña
                </li>
                <li className="li">
                  <strong>IV.</strong>Cuando el producto se hubiese utilizado en condiciones distintas a las normales.
                </li>
              </ul>
            </p>
            <p className="text">HELSE MEDICAL garantiza durante el lapso de meses 12 MESES</p>

            <div className="sectionFooter">
              <div className="textdataFooter">
                <div className="textFooter2left">
                  <p className="textleft">EQUIPO: {data?.product?.name}</p>
                  <p className="textleft">NUMERO DE SERIE: {data?.serialnumber}</p>
                  <p className="textleft">MARCA: {data?.product?.brand?.name}</p>
                  <p className="textleft">MODELO: {data?.product?.code}</p>
                  <p className="textleft">FECHA: {dayjs(data?.createdAt).format("DD/MM/YYYY")}</p>
                  <p className="textleft">NOMBRE DE CLIENTE: {data?.receive}</p>
                </div>
              </div>
              <div className="container_firm_name">
                <div className="line_name">
                  <p className="line">____________________</p>
                  <span className="name">Nombre y Firma</span>
                </div>
              </div>
            </div>
            <div className="cont">
              <p className="t">contacto</p>
              <p className="t">Tel: 3389951637</p>
              <p className="t"> Correo: garantias@solucioneshospitalarias.com.mx</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  overflow: auto;
  body {
    margin: 0;
  }
  .footer {
    text-align: justify;
    font-size: 8px;
    color: #000;
    line-height: 1em;
  }
  #pageFooter {
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
  .content {
    height: 90VH;
    width: 7in;
    margin: auto;
    padding: 26px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/HELSEMEDICAL.jpeg");
}

    h1 {
      font-size: 10pt;
    }

    h3 {
      font-size: 9pt;
    }

    .sectionParagraph {
      padding: 10px;
      position: absolute;
      margin-top: 23%;
    }

    .text {
      text-align: justify;
      margin-bottom: 10px;
      font-size: 6pt;
    }
    .t {
      padding: 0px;
      margin: 0px;
      text-align: end;
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
      margin-right: 20px;
      text-align: center;
      float: right;
    }

    .line {
      margin-top: -10px;
      margin-bottom: 2px;
    }

    .name {
      color: black;
      font-size: 8px;
    }

    .lu {
      font-size: 8px;
    }

    .li {
      text-align: justify;
      font-size: 8px;
    }
    .cont {
      clear: both;
    float: right;
    text-align: end;
    width: 100%;
    margin-top: 70px;
    }
`;
