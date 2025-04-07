import React from "react";
import { PreviewRecolecionStyled } from "./styles";
import { LinearProgress, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";

export default function RutasDetails({ handleOnClickClosePreview, routeSelected, dataEntrance, isFetchingEntrance, toggleModal }) {
  return (
    <PreviewRecolecionStyled>
      <div className="headerpreview">
        <h4 className="concept">Fecha {routeSelected?.createdAt}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Edit className="icon" />
            <p className="text" onClick={()=> {toggleModal()}}>Generar Entrada</p>
          </div>
          <Tooltip title="Cerrar Vista Previa">
            <IconButton onClick={handleOnClickClosePreview}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="contentpreview">
        <div className="contentpreview__render">
          <div className="data_order">
            <p className="title">Datos de Devolución</p>
            <p className="create">Creado por {routeSelected?.createdby}</p>
          </div>
          <div className="table_products">
            <p className="title">Productos</p>
            <div className="products">
              <table>
                <thead>
                  <tr>
                    <th>Folio Pedido</th>
                    <th>Serial</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {isFetchingEntrance && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <div className="load">
                          <div className="load__img">
                            <img src="/load.png" />
                          </div>
                          <div className="content_loadtext">
                            <p>Cargando Productos</p>
                            <LinearProgress color="primary" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isFetchingEntrance &&
                    dataEntrance?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.folio}</td>
                        <td>{item?.serialNumber}</td>
                        <td>{item?.code}</td>
                        <td>{item?.nameproduct}</td>
                      </tr>
                    ))}
                  {dataEntrance?.length === 0 && <tr>No hay datos</tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PreviewRecolecionStyled>
  );
}
