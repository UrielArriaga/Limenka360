import React from "react";
import { PreviewTrainingStyled, LoaderWrapper, Dot } from "./styles";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { Close, EditOutlined } from "@material-ui/icons";
import { toUpperCaseChart } from "../../../../utils";
import dayjs from "dayjs";

export default function PreviewTrainingProducts({
  selectedTraining,
  handleOnClickClosePreview,
  dataproducts,
  isFechingProduct,
  totalProducts,
  modalAssignBiome,
}) {
  if (isFechingProduct) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }

  const haveResponsible = selectedTraining?.responsable == "N/A" ? "btn_reviwed" : "disabled";

  return (
    <PreviewTrainingStyled>
      <div className="headerprview">
        <div className="concep">
          <p className="text">
            Folio de la Capacitación: {selectedTraining?.folio ? selectedTraining?.folio : "Sin Folio"}
          </p>
        </div>
        <Tooltip title={haveResponsible == "N/A" ? "Agregue asesor" : "Asesor asignado"}>
          <div className="btn-headers">
            <Button
              disabled={haveResponsible == "N/A" ? false : true}
              onClick={() => modalAssignBiome?.handleToggleBio()}
              className={haveResponsible}
            >
              Agregar Asesor
            </Button>
            <IconButton onClick={handleOnClickClosePreview}>
              <Close />
            </IconButton>
          </div>
        </Tooltip>
      </div>
      <div className="content-exit">
        <div className="headerday">
          <div className="day">
            <p className="title">Fecha de Creacion</p>
            <p>{selectedTraining?.item?.assignmentdate 
                  ? dayjs(selectedTraining?.item?.assignmentdate).format('DD/MM/YYYY') : 'Fecha no disponible'}</p>
            {selectedTraining?.responsable && (
              <p className="title">
                Asesor: <span className="title__name">{selectedTraining?.responsable}</span>{" "}
                <span className="title__status">Asignado</span>
                <IconButton onClick={() => modalAssignBiome?.handleToggleBio()}>
                     <EditOutlined />
                </IconButton>
              </p>
            )}
            <p className="title">Capacitación Virtual: </p>
            <span>{selectedTraining?.item?.isvirtual ? "Sí" : "No"}</span>

            <p className="title">Fecha de la Capacitación: </p>
            <span>{selectedTraining?.item?.trainingdate 
                  ? dayjs(selectedTraining?.item?.trainingdate).format('DD/MM/YYYY') : 'Fecha no disponible'}
            </span>

            <p className="title">Dirección: </p>
            <span>{selectedTraining?.item?.address?.street
                    ? `${selectedTraining?.item?.address?.street}, ${selectedTraining?.item?.address?.settlement}`: "No disponible"}
            </span>
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
          <p className="title">Productos en la Capacitacion</p>
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
                  <th>Producto</th>
                  <th>Codigo</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Proveedor</th>
                  <th>Compañia</th>
                </tr>
              </thead>

              <tbody className="bodyTable">
                {isFechingProduct && (
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
                {!isFechingProduct &&
                  dataproducts?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.product?.name}</td>
                        <td>{item?.product?.code}</td>
                        <td>{item?.product?.brand?.name}</td>
                        <td>{item?.product?.category?.name}</td>
                        <td>{item?.product?.provider?.companyname}</td>
                        <td>{item?.product?.company?.company}</td>
                      </tr>
                    );
                  })}
                {dataproducts?.data?.length === 0 && <tr>No hay datos</tr>}
              </tbody>
            </table>
          </div>

          <div className="total">Total de productos {totalProducts}</div>
        </div>
      </div>
    </PreviewTrainingStyled>
  );
}
