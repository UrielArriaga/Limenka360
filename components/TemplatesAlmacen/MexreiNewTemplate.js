import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

function MexreiGarantia(props) {
  const { zoom, data } = props;
  console.log(data);

  return (
    <LayoutStyledMexrei zoom={zoom}>
      <div className="container">
        <div className="content">
          <div className="headertitle">
            <h3 className="titleleft">POLIZA DE GARANTIA</h3>
            <h3 className="titleright">FOLIO:{data?.folio}</h3>
          </div>
          <div className="sectioninitial">
            <p className="textinitial">
              MEXREI hace de su conocimiento que es responsabilidad del cliente reportar o notificar cualquier falla que
              se presente en el bien adquirido, así mismo se reserva el derecho a cambiar la parte defectuosa o reparar
              la misma a su entera discreción. La garantía será computada desde el momento de la entrega del equipo y no
              cubre repuestos, mano de obra, calibración ni mantenimiento de accesorios, dispositivos y otros
              aditamentos ajenos al número de serie indicado en la presente póliza. La garantía se brinda en la sucursal
              ubicada en: AVENIDA INSTITUTO POLITECNICO NACIONAL, NUMERO 5129, COLONIA CAPULTITLAN, GUSTAVO A MADERO,
              CODIGO POSTAL 07370, CIUDAD DE MÉXICO y es necesario se agende una cita para que la recepción de su equipo
              sea recibida por personal autorizado y facultado para brindar el servicio de MEXREI, dicha cita se tendrá
              que solicitar al correo: garantias@mexrei.com
            </p>
          </div>
          <div className="sectionparagraph">
            <p className="sectiontext">
              I. Esta póliza ampara únicamente productos comercializados por MEXREI, el tiempo de reparación será en un
              periodo aproximado de entre 60 a 90 días hábiles, mismo que se computará una vez recibido el equipo en
              nuestras instalaciones.
            </p>
            <p className="sectiontext">
              En caso de cambio total del equipo, se verificará la disponibilidad y en caso de que se cuente con dicho
              equipo el tiempo de entrega estimada será de 2 meses.
            </p>
            <p className="sectiontext">
              En caso de que dicho equipo no se encuentre disponible se reemplazara por uno similar, si así lo prefiere
              el cliente o se realizara el proceso para adquirir uno igual aceptando ajustarse a los tiempos que esto
              conlleve, siempre y cuando dicho equipo se encuentre vigente en el mercado.
            </p>

            <p className="sectiontext">II. La garantía solo será aplicable cuando exista algún defecto de fábrica.</p>
            <p className="sectiontext">
              III. En todo caso que la garantía sea no procedente, se notificará la razón y se procederá a generar una
              cotización del servicio y partes requeridas para su reparación, la cual deberá ser cubierta por el
              cliente.
            </p>
            <p className="sectiontext">IV. Una vez recibida la evidencia y revisada por el personal especializado:</p>
            <p className="sectiontext">
              <ul>
                <li className="sectiontext">
                  En caso de que sea necesario, se procederá con el envío del equipo a nuestras instalaciones, mismo que
                  deberá que ser enviado completo, en buen estado y con el empaque original además de contar con todos
                  los accesorios, todos los gastos incurridos relacionados a la solicitud de garantía son
                  responsabilidad del cliente y no están incluidos dentro de la garantía, que de manera enunciativa mas
                  no limitativa son: los gastos de envío, fletes, etc.
                </li>

                <li className="sectiontext">
                  En caso de ser necesaria la visita del personal especializado al domicilio indicado por el cliente
                  para la revisión del bien adquirido, los gastos erogados serán cubiertos por el cliente en su
                  totalidad.
                </li>
              </ul>
            </p>
            <p className="sectiontext">
              V. El cliente cubrirá los gastos de envío y maniobra a donde requiera sea entregado el equipo una vez
              cumplido el protocolo anterior.
            </p>
            <p className="sectiontext">
              VI. La garantía no cubre daños por golpes, maltratos, mal uso por parte del cliente, descargas eléctricas
              o detención, tormentas eléctricas, variación de voltaje que afecten al equipo, piezas de desgaste,
              accesorios, piezas complementarias, aditamentos del equipo adquirido, ni calibración de los mismos.
            </p>
            <p className="sectiontext">
              VII. En caso de que el equipo llegara dañado o maltratado, el cliente deberá notificar de forma inmediata
              a su ejecutivo de ventas y paquetería, así mismo deberá de ser respaldado mediante videos y fotos.
            </p>
            <div className="contuno">
              <p className="t">TELÉFONO DE ATENCIÓN: 55-89-95-14-33 EXT. 2303 </p>
              <p className="t">garantias@mexrei.com</p>
            </div>
          </div>

          <div className="sectionfooter">
            <p className="email">ventas@mexrei.com</p>
            <div className="sectionmedia">
              <img src="https://thumbs.dreamstime.com/b/facebook-instagram-whatsapp-youtube-icono-del-logo-de-los-medios-sociales-vector-negro-aislado-en-fondo-blanco-185522524.jpg" />
            </div>
          </div>
        </div>
        <div className="content">
          <div className="headertitle"></div>
          <p className="sectiontext">
            VIII. El cliente deberá presentar el recibo de compra y/o factura, para efectuar la garantía, dicho
            documento será cotejado con el número de serie del equipo.
          </p>
          <p className="sectiontext plus">
            <ul>
              <li className="sectiontext">Nombre del cliente</li>
              <li className="sectiontext">Numero de contacto</li>
              <li className="sectiontext">Dirección donde se encuentra el producto</li>
              <li className="sectiontext">Descripción, evidencia de la falla, número de serie y modelo</li>
              <li className="sectiontext">Póliza de garantía en original</li>
              <li className="sectiontext">Recibo de compra y/o factura</li>
            </ul>
          </p>
          <p className="sectiontext">
            Esta información se enviará mediante correo electrónico al correo establecido en al rubro de la presente
            póliza, dicha información será cotejada debiendo coincidir con el número de serie del equipo.
          </p>
          <p className="sectiontext plus">
            <ul>
              <li className="sectiontext">
                I.Toda garantía se invalidará a consecuencia de cualquier trabajo de reparación por parte del cliente o
                un tercero no autorizado, así mismo, si se utilizan accesorios y componentes no aprobados por MEXREI.
              </li>
              <li className="sectiontext">
                II.La alteración, rotura o enmendadura de cualquier sello de seguridad y/o códigos de barras invalidan
                la garantía, así mismo el quipo deberá tener el mismo número de serie descrito en la presente póliza.
              </li>
              <li className="sectiontext">
                III. Cuando el producto no hubiese sido operado de acuerdo con el instructivo de uso que se le acompaña.
              </li>
              <li className="sectiontext">
                IV. Cuando el producto se hubiese utilizado en condiciones distintas a las normales.
              </li>
            </ul>
          </p>
          <p className="sectiontext">MEXREI garantiza durante el lapso de meses 12 MESES</p>
          <div className="content_divs">
            <div className="info_left">
              <p className="sectiontext">EQUIPO:{data?.product?.name}</p>
              <p className="sectiontext">MARCA:{data?.product?.brand?.name}</p>
              <p className="sectiontext">FECHA: {dayjs(data?.createdAt).format("DD/MM/YYYY")}</p>
              {/* <p className="sectiontext">REMISIÓN:${data?.date}</p> */}
              <p className="sectiontext">NOMBRE DEL CLIENTE: {data?.receive}</p>
            </div>
            <div className="info_right">
              <p className="line">____________________</p>
              <span className="name">Nombre y Firma</span>
            </div>
          </div>
          <div className="contdos">
            <p className="t">TELÉFONO DE ATENCIÓN: 55-89-95-14-33 EXT. 2303 </p>
            <p className="t">garantias@mexrei.com</p>
          </div>
        </div>
      </div>
    </LayoutStyledMexrei>
  );
}

export default MexreiGarantia;

export const LayoutStyledMexrei = styled.section`
  height: 100%;
  width: 100%;
  zoom: ${props => (props.zoom ? `${props.zoom}%` : "70%")};
  overflow: auto;
  @page {
    size: A4;
    margin: 0;
  }
  background-size: cover;
  /* background-position: center;
  background-repeat: no-repeat; */
  .content {
      height: 8.4in;
      width: 65%;
      margin: auto;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-07-25%20at%208.32.09%20AM.jpeg");
      padding: 15px;
    }

    .headertitle {
      margin-top: 50px;
      padding: 30px 30px 0px 30px;
      width: 100%;
    }

    .titleleft {
      float: left;
      width: 60%;
      font-size: 8pt;
      margin-bottom: 0px;
    }

    .titleright {
      float: right;
      width: 40%;
      font-size: 8pt;
      margin-bottom: 0px;
    }

    .sectioninitial {
      padding: 30px 30px 0px 30px;
    }

    .textinitial {
      text-align: justify;
      font-size: 6pt;
    }

    .sectionparagraph {
      padding: 0px 30px 0px 30px
    }

    .sectiontext {
      text-align: justify;
      font-size: 6pt;
    }

    .sectiongarantia {
      font-size: 6pt;
      text-align: center;
    }

    .sectionfooter {
      float: left;
      padding: 10px;
    }

    .email {
      width: 330px;
      text-align: end;
      color: grey;
      font-size: 10px;
      float: left;
    }

    .sectionmedia {
      float: right;
      margin-right: 5px;
    }

    .content_divs {
      width: 100%;
      margin-left: 40px;
      margin-top: 10px;
      background-color: red;
    }
    .plus {
      padding: 30px;

    }

    .contuno {
      clear: both;
      float: right;
      text-align: end;
      width: 100%;
      margin-top: 230px;
    }
      .contdos {
      clear: both;
      float: right;
      text-align: end;
      width: 100%;
      margin-top: 200px;
    }

    .t {
      padding: 0px;
      margin: 0px;
      text-align: end;
      font-size: 6pt;
    }

    .info_left {
      float: left;
      width: 70%;
    }

    .info_right {
      text-align: center;
      margin-top: 10px;
      width: 54%;
      float: right;
    }

    .name {
      font-size: 8px;
    }

    .line {
      margin-bottom: 2px;
    }

    img {
      width: 100px;
      height: 25px;
    }
`;
