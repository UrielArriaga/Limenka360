import React from "react";
import styled from "styled-components";

export default function MerchandiseoutTemplate(props) {
  const { data } = props;

  let rowCount = 15;
  return (
    <Layout>
      <div className="container">
        <section className="sections">
          <div className="content_title">
            <p className="title">Compras</p>
          </div>
          <div className="content_title">
            <p className="titlea">RECOLECCIÓN DE MERCANCIA</p>
          </div>
          <div className="content_title">
            <img
              className="logo"
              src="https://crm-desarrollo.sfo3.digitaloceanspaces.com/WhatsApp%20Image%202024-12-05%20at%209.25.54%20AM.jpeg "
            ></img>
          </div>
        </section>

        <section className="sections_a">
          <div className="sections_a_fecha">
            <div className="sections_a_fecha_title">
              <p className="p">Fecha de solicitud</p>
            </div>
            <div className="fecha_title_text">
              <p className="p">{data.createdAt}</p>
            </div>
          </div>

          <div className="sections_b_folio">
            <div className="sections_a_fecha_title_folio">
              <p className="p">Folio</p>
            </div>
            <div className="fecha_title_text_folio">
              <p className="p">{data.folio}</p>
            </div>
          </div>
          <div className="sections_c_fecha">
            <div className="sections_a_fecha_title">
              <p className="p">Tipo de recolección</p>
            </div>
            <div className="fecha_title_text">
              <p className="p">{data.typerecolections}</p>
            </div>
          </div>
          <div className="sections_c_fecha">
            <div className="sections_a_fecha_title">
              <p className="p">Ejecutivo</p>
            </div>
            <div className="fecha_title_text">
              <p className="p">{data.typerecolections}</p>
            </div>
          </div>
          <div className="sections_c_fecha">
            <div className="sections_a_fecha_title">
              <p className="p">Folio orden de compra</p>
            </div>
            <div className="fecha_title_text">
              <p className="p">{data.folioorden}</p>
            </div>
          </div>
        </section>
        <section className="sections">
          <table>
            <thead>
              <tr>
                 <th className="thead_th_prove">Proveedor</th>
                <th className="thead_th_code">Código</th>
                <th className="thead_th_dest">Descripción</th>
                <th className="thead_th_cant">Cantidad</th>
  
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((item, index) => (
                
                <tr key={index}>
                  <td>{item.provider}</td>
                  <td>{item?.code}</td>
                  <td>{item?.product}</td>
                  <td>{item?.quantity}</td>
                </tr>
              ))}
              {Array?.from({ length: rowCount - data.products.length }).map((_, index) => (
                <tr key={data?.products?.length + index}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                                </tr>
              ))}
            </tbody>
          </table>
          <div className="sections_left">
            <div className="sections_d_fecha">
              <div className="sections_d_fecha_title">
                <p className="p">Fecha de Entrega Prov.</p>
              </div>
              <div className="fecha_title_text_d">
                <p className="p">{data.createdAt}</p>
              </div>
            </div>
            <div className="sections_d_fecha">
              <div className="sections_d_fecha_title">
                <p className="p">Fecha de Recolección Log.</p>
              </div>
              <div className="fecha_title_text_d">
                <p className="p">N/A</p>
              </div>
            </div>
            <div className="sections_d_fecha">
              <div className="sections_d_fecha_title">
                <p className="p">Paqueteria</p>
              </div>
              <div className="fecha_title_text_d">
                <p className="p">N/A</p>
              </div>
            </div>
          </div>
          <div className="sections_right">
            <div className="sections_d_fecha">
              <div className="sections_d_fecha_title">
                <p className="p">Sucursal de Origen</p>
              </div>
              <div className="fecha_title_text_d">
                <p className="p">N/A</p>
              </div>
            </div>
            <div className="sections_d_fecha">
              <div className="sections_d_fecha_title">
                <p className="p">Sucursal de Destino</p>
              </div>
              <div className="fecha_title_text_d">
                <p className="p">ALMACÉN</p>
              </div>
            </div>
            <div className="sections_d_fecha">
              <div className="sections_d_fecha_title">
                <p className="p">No de Guia</p>
              </div>
              <div className="fecha_title_text_d">
                <p className="p">N/A</p>
              </div>
            </div>
          </div>
        </section>
        <section className="sections">
          <div className="sections_observations_fecha">
            <div className="sections_observations_fecha_title">
              <p className="p_observations">Observaciones</p>
            </div>
            <div className="fecha_title_text_observations">
              <p className="">{data.obserevationgeneral}</p>
            </div>
          </div>
        </section>
        <section className="sections_firm">
          <div className="content_left">
            <div className="content_firm_operator">
              <div className="line"></div>
              <p className="text_operator">Quien recibe</p>
            </div>

            <div className="content_firm_vigilance">
              <div className="line"></div>
              <p className="text_vigilace">Quien entrega</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const Layout = styled.section`
  .container {
    width: 90%;
    height: 600px;
    align-items: center;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
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
    font-size: 30px;
    color: #0071c2;
    font-weight: 600;
  }

  .logo {
    float: left;
    width: 240px;
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
    background-color: #0071c2;
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
    float: right;
    width: 40%;
    height: 15px;
    font-size: 10px;
  }

  .sections_a_fecha_title_folio {
    float: left;
    width: 60%;
    height: 15px;
    font-size: 10px;
    color: white;
    background-color: #0071c2;
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
    background-color: #0071c2;
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
    background-color: #0071c2;
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
    width: 90%;
    font-size: 8px;
    color: black;
    font-weight: 600;
  }

  .text_vigilace {
    width: 90%;
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
    background-color: #0071c2;
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
    background-color: #0071c2;
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
`;
