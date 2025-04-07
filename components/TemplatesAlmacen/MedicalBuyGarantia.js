import React from "react";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

export default function MedicalBuyGarantia(props) {
  const { zoom, data } = props;
  const { userData } = useSelector(userSelector);

  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container">
        <div className="content">
          <div className="sectionParagraph">
            <div className="sections-title">
              <div className="folio">
                <p>POLIZA DE GARANTÍA</p>
              </div>
              <div className="head_Two">
                <p> Folio: {data?.folio}</p>
              </div>
            </div>
            <p className="text">
              MEDICAL BUY Hace de su conocimiento que es responsabilidad del cliente reportar o notificar cualquier
              falla que se presente en el bien adquirido, así mismo se reserva el derecho a cambiar la parte defectuosa
              o reparar la misma a su entera discreción. La garantía será computada desde el momento de la entrega del
              equipo y no cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios, dispositivos y
              otros aditamentos ajenos al número de serie indicado en la presente póliza. La garantía se brinda en la
              sucursal ubicada en: AVENIDA INSTITUTO POLITECNICO NACIONAL, NUMERO 5129, COLONIA CAPULTITLAN, GUSTAVO A
              MADERO, CODIGO POSTAL 07370, CIUDAD DE MÉXICO y es necesario se agende una cita para que la recepción de
              su equipo sea recibida por personal autorizado y facultado para brindar el servicio de MEDICAL BUY, dicha
              cita se tendrá que solicitar al correo: garantias@medicalbuy.mx
            </p>

            <p className="text">
              I. Esta póliza ampara únicamente productos comercializados por MEDICAL BUY, el tiempo de reparación será
              en un periodo aproximado de entre 60 a 90 días hábiles, mismo que se computará una vez recibido el equipo
              en nuestras instalaciones.
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

            <p className="text">II. La garantía solo será aplicable cuando exista algún defecto de fábrica.</p>

            <p className="text">
              III. En todo caso que la garantía sea no procedente, se notificará la razón y se procederá a generar una
              cotización del servicio y partes requeridas para su reparación, la cual deberá ser cubierta por el
              cliente.
            </p>

            <p className="text">IV. Una vez recibida la evidencia y revisada por el personal especializado:</p>
            <p className="text">
              <ul>
                <li className="text">
                  En caso de que sea necesario, se procederá con el envío del equipo a nuestras instalaciones, mismo que
                  deberá que ser enviado completo, en buen estado y con el empaque original además de contar con todos
                  los accesorios, todos los gastos incurridos relacionados a la solicitud de garantía son
                  responsabilidad del cliente y no están incluidos dentro de la garantía, que de manera enunciativa mas
                  no limitativa son: los gastos de envío, fletes, etc.
                </li>
                <li className="text">
                  En caso de ser necesaria la visita del personal especializado al domicilio indicado por el cliente
                  para la revisión del bien adquirido, los gastos erogados serán cubiertos por el cliente en su
                  totalidad.
                </li>
              </ul>
            </p>
            <p className="text">
              V. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez
              cumplido el protocolo anterior.
            </p>
            <p className="text">
              VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas
              o detención, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas de desgaste,
              accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos.
            </p>
          </div>
        </div>
        <div className="content">
          <div className="sectionParagraph">
            <p className="text">
              VII. En caso de que el equipo llegara dañado o maltratado, el cliente deberá notificar de forma inmediata
              a su ejecutivo de ventas y paquetería, así mismo deberá de ser respaldado mediante videos y fotos.
            </p>

            <p className="text">
              VIII. Para solicitar la garantía, el cliente deberá recabar evidencia de la falla que presente el equipo
              mediante fotografías y/o videos, así como proporcionar la siguiente documentación:
            </p>

            <p className="text">
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
            <p className="text">
              <ul>
                <li className="text">
                  Esta información se enviará mediante correo electrónico establecido en al rubro de la presente póliza,
                  dicha información será cotejada debiendo coincidir con el número de serie del equipo.
                </li>
                <li className="text">
                  La alteración, rotura o enmendadura de cualquier sello de seguridad y/o códigos de barras invalidan la
                  garantía, así mismo el quipo deberá tener el mismo número de serie descrito en la presente póliza.
                </li>
                <li className="text">
                  III. Cuando el producto no hubiese sido operado de acuerdo con el instructivo de uso que se le
                  acompaña.
                </li>
                <li className="text">
                  IV. Cuando el producto se hubiese utilizado en condiciones distintas a las normales.
                </li>
              </ul>
            </p>

            <p className="text">MEDICAL BUY garantiza durante el lapso de meses 12 MESES</p>
            <div className="sectionFooter">
              <div className="textdataFooter">
                <div className="textFooter2left">
                  <p className="textleft">EQUIPO: {data?.product?.name}</p>
                  <p className="textleft">MARCA: {data?.product?.brand?.name}</p>
                  <p className="textleft">MODELO: {data?.product?.code}</p>
                  <p className="textleft">FECHA: {dayjs(data?.createdAt).format("DD/MM/YYYY")}</p>
                  {/* <p className="textleft">NUMERO DE FACTURA O NOTA DE REMISIÓN: {data?.invoicenumberornote} </p> */}
                  <p className="textleft">NOMBRE DE CLIENTE:{data?.receive} </p>
                </div>
              </div>
            </div>
            <div className="content_firm_name">
              <div className="container_firm">
                <p className="line">____________________</p>
                <span className="name">Nombre y Firma </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "100%")};
  overflow: none;
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
    width: 4.8in;
    height: 8.75in;
    /* margin: auto; */
    background-size: 100% 100%;
    /* background-repeat: no-repeat;
    background-position: center; */
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
`;
