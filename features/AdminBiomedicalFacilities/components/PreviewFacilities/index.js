import React from "react";
import { PreviewFacilitieStyled, LoaderWrapper, Dot } from "./styles";
import { LinearProgress, Tooltip, IconButton } from "@material-ui/core";
import { toUpperCaseChart } from "../../../../utils";
import { Pagination } from "@material-ui/lab";
import { Close, EditOutlined } from "@material-ui/icons";
import dayjs from "dayjs";

export default function PreviewFacilities({
  selectedTraining,
  productsInstallations,
  paginationProducts,
  handleOnClickClosePreview
}) {
 

  return (
    <PreviewFacilitieStyled>
      <div className="headerprview">
        <div className="concep">
          <p className="text">Instalacion: {selectedTraining?.folio ? selectedTraining?.folio : "Sin Folio"}</p>
        </div>
        <div>
          <Tooltip title="Cerrar vista">
            <Close onClick={()=> handleOnClickClosePreview()} className="iconClose"/>
          </Tooltip>
        </div>
      </div>
      <div className="content-exit">
        <div className="headerday">
          <div className="day">
            <p className="title">Fecha de Creacion</p>
            <p>{selectedTraining?.createdAt}</p>
            {selectedTraining?.responsible && (
              <p className="title">
                Asesor: <span className="title__name">{selectedTraining?.responsible}</span>{" "}
                <span className="title__status">Asignado</span>
                <IconButton >
                     <EditOutlined />
                </IconButton>
              </p>
            )}
            <p className="title">Fecha de la Instalación: </p>
               <span>{selectedTraining?.item?.installationdate 
                      ? dayjs(selectedTraining?.item?.installationdate).format('DD/MM/YYYY'): 'Fecha no disponible'}
               </span>
            <p className="title">Folio: </p>
             <span>{selectedTraining?.folio ? selectedTraining?.folio : "Sin Folio"}</span>


          </div>
          <div className="crated">
            <p className="title">Creado por</p>
            <p>
              {toUpperCaseChart(
                selectedTraining?.item?.createdby?.fullname ? selectedTraining?.item?.createdby?.fullname : "Sistema"
              )}
            </p>
          </div>
        </div>
        <div className="data_order">
          <p className="title">Tabla de Instalacion de los Productos</p>
          <div className="info">
            <div className="info_addrees">
              <p>{selectedTraining?.item?.title}</p>
            </div>
          </div>
        </div>
        <div className="table_products">
          {/* <p className="title">Productos en la Capacitacion</p> */}
          <div className="products">
            <table>
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Serial</th>
                  <th>Producto</th>
                  <th>Codigo</th>
                  <th>Fecha de Instalacion</th>
                  <th>Responsable</th>
                </tr>
              </thead>

              <tbody className="bodyTable">
                {productsInstallations?.isFetching && (
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
                {!productsInstallations?.isFetching &&
                  productsInstallations?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.folio}</td>
                        <td>{item?.serial}</td>
                        <td>{item?.item?.warehouseproduct?.product?.name}</td>
                        <td>{item?.item?.warehouseproduct?.product?.code}</td>
                        <td>{item?.installationdate}</td>
                        <td>{item?.responsible}</td>
                      </tr>
                    );
                  })}
                {productsInstallations?.data?.length === 0 && <tr>No hay datos</tr>}
              </tbody>
            </table>
          </div>

          <div className="total">Total de productos {productsInstallations?.total}</div>
          <Pagination
            count={Math.ceil(productsInstallations.total / paginationProducts.limitData)}
            onChange={(e, value) => paginationProducts.changePage(value)}
            page={paginationProducts.currentPage}
            size="small"
            color="primary"
          />
        </div>
      </div>
    </PreviewFacilitieStyled>
  );
}
