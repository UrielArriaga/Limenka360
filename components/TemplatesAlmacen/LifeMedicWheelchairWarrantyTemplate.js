import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import styled from "styled-components";
import dayjs from "dayjs";

export default function LifeMedicaGarantia(props) {
  const { zoom, data } = props;
  const { userData } = useSelector(userSelector);

  return (
    <Layout zoom={zoom} primaryColor={userData?.groupprimarycolor} secondaryColor={userData?.groupsecondarycolor}>
      <div className="container_template">
        <div className="content">
          <div className="sections-title">
            <div className="folio">
              <p>POLIZA DE GARANTÍA</p>
            </div>
            <div className="head_Two">
              <p> Folio: {data?.folio}</p>
            </div>
          </div>

          <div className="text-title">
            <p className="text">
              LIFEMEDIC Hace de su conocimiento que es responsabilidad del cliente reportar o notificar cualquier falla
              que se presente en el bien adquirido, así mismo se reserva el derecho a cambiar la parte defectuosa o
              reparar la misma a su entera discreción. La garantía será computada desde el momento de la entrega del
              equipo y no cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios, dispositivos y
              otros aditamentos ajenos al número de serie indicado en la presente póliza. La garantía se brinda en la
              sucursal ubicada en: AVENIDA INSTITUTO POLITECNICO NACIONAL, NUMERO 5129, COLONIA CAPULTITLAN, GUSTAVO A
              MADERO, CODIGO POSTAL 07370, CIUDAD DE MÉXICO y es necesario se agende una cita para que la recepción de
              su equipo sea recibida por personal autorizado y facultado para brindar el servicio de LIFEMEDIC, dicha
              cita se tendrá que solicitar al correo: garantias@lifemedic.com.mx
            </p>
            <p className="text">
              I. Esta póliza ampara únicamente productos comercializados por LIFEMEDIC, el tiempo de reparación será en
              un periodo aproximado de entre 60 a 90 días hábiles, mismo que se computará una vez recibido el equipo en
              nuestras instalaciones.
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
          <div className="sections-title"></div>
          <p className="text">
            VII. En caso de que el equipo llegara dañado o maltratado, el cliente deberá notificar de forma inmediata a
            su ejecutivo de ventas y paquetería, así mismo deberá de ser respaldado mediante videos y fotos.
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
              <li className="text">Descripción, evidencia de la falla, número de serie, modelo.</li>
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
                I. Toda garantía se invalidará a consecuencia de cualquier trabajo de reparación por parte del cliente o
                un tercero no autorizado, así mismo, si se utilizan accesorios y componentes no aprobados por LIFEMEDIC.
              </li>
              <li className="text">
                II. La alteración, rotura o enmendadura de cualquier sello de seguridad y/o códigos de barras invalidan
                la garantía, así mismo el quipo deberá tener el mismo número de serie descrito en la presente póliza.
              </li>
              <li className="text">
                III. Cuando el producto no hubiese sido operado de acuerdo con el instructivo de uso que se le acompaña.
              </li>
              <li className="text">
                IV. Cuando el producto se hubiese utilizado en condiciones distintas a las normales.
              </li>
            </ul>
          </p>
          <div className="text_Articles">
            <div className="contents">
              <div className="footer">
                <p>
                  <span>LIFEMEDIC</span> garantiza durante el lapso de <span>18</span> meses.{" "}
                </p>
                <p>
                  Equipo: <span className="span_blue"> {data?.product?.name} </span>
                </p>
                <p>NO. DE SERIE: {data?.serialnumber} </p>
                <p>
                  MARCA: <span className="span_blue"> {data?.product?.brand?.name} </span> MODELO:{" "}
                  <span className="span_red"> {data?.model}</span>{" "}
                </p>
                <p>
                  {" "}
                  <span> FECHA: {dayjs(data?.createdAt).format("DD/MM/YYYY")}</span>{" "}
                </p>
                <p>
                  {" "}
                  NOMBRE DEL CLIENTE: <span className="span_no_underlining"> {data?.receive} </span>
                </p>
              </div>
              <div className="container_line_name">
                <div className="line_name">
                  <p className="line">_____________________________</p>
                  <span className="name">Nombre Y Firma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
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
       height: 7.5in; 
      width: 4.80in;
      margin: auto; 
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      position: relative; 
      background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/LIFEMEDIC.jpeg");
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

    .head_Two span {
      color: #2596be;
      font-size: 10px;
      margin-left: 31px;
    }

    .text_Articles {
      /* margin-left: 25px;
      margin-right: 25px; */
    }

    .text_Articles p {
      font-size: 8px;
      line-height: normal;
    }

    .fragment_main {
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
      font-size: 12px;
      font-weight: 600;
    }

    /* .footer span {
      text-decoration: underline;
    } */

    .footer .span_blue {
      color: black;
    }

    .footer .span_red {
      color: black;
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

    .name {
      font-size: 8px;
    }

    .container_line_name {
      text-align: center;
      margin-top: 60px;
      width: 40%;
      float: right;
    }

    .text {
      text-align: justify;
      font-size: 7pt;
    }

    .sections {
      float: left;
      width: 100%;
    }

    .text-title {
      margin-top: 30px;
      /* text-align: justify;
      font-size: 7pt; */
    }

    .sections-title {
      margin-top: 50px;
    }
`;