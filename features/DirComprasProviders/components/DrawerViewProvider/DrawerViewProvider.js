import React, { useEffect, useState } from "react";
import { DialogFullScreen } from "./styles";
import { CloseOutlined, AssignmentInd, Phone, Room, Info } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";

function DrawerViewProvider({ open, toggleModal, orderSelectedData, dataAddress, isfetching }) {
  const validator = data => {
    if (data != null && data != "null null" && data != "") {
      return data.trim();
    } else {
      return "N/A";
    }
  };

  return (
    <DialogFullScreen open={open} onClose={toggleModal}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={() => toggleModal()} />
            <p className="title">Detalles del Proveedor</p>
          </div>
        </div>
        <div className="ctr_edit__ctr_info">
          <Grid container spacing={3} className="contentSectionInfo">
            <Grid item sm={12} className="title">
              <span>
                <AssignmentInd fontSize="small" />
              </span>
              <h4> Datos del Proveedor</h4>
            </Grid>
            <Grid item sm={11} className="sectionInfo">
              <p>
                <span>Proveedor: </span>
                {validator(orderSelectedData?.companyname)}
              </p>
              <p>
                <span>Nombre Completo: </span>
                {validator(orderSelectedData?.fullname)}
              </p>
              <p>
                <span>RFC: </span> {validator(orderSelectedData?.rfc)}
              </p>
              <p>
                <span>Tipo: </span> {validator(orderSelectedData?.type)}
              </p>
              <p>
                <span>NIFCIF : </span> {validator(orderSelectedData?.nifcif)}
              </p>
              <p>
                <span>Identificador : </span> {validator(orderSelectedData?.identifier)}
              </p>
            </Grid>
            <Grid item sm={11} className="sectionInfo">
              <h4>
                <Phone fontSize="small" /> Contacto
              </h4>
              <p>
                <span>Email: </span>
                {validator(orderSelectedData?.email)}
              </p>
              <p>
                <span>Telefono: </span> {validator(orderSelectedData?.phone)}
              </p>
              <p>
                <span>Telefono Opcional: </span> {validator(orderSelectedData?.optionalphone)}
              </p>
            </Grid>
            <Grid item sm={11} className="sectionInfo">
              <h4>
                <Info fontSize="small" /> Más Información
              </h4>
              <p>
                <span>Observaciones: </span> {validator(orderSelectedData?.observations)}
              </p>
            </Grid>
            <Grid item sm={11} className="sectionDirections">
              <h4>
                <Room fontSize="small" /> Direcciones: {dataAddress?.length}
              </h4>

              {!isfetching && dataAddress?.length == 0 && (
                <div className="address">
                  <p>No hay Direcciones Disponibles</p>
                </div>
              )}
              {isfetching && (
                <div className="address">
                  <p>Cargando Direcciones</p>
                </div>
              )}
              {!isfetching &&
                dataAddress?.map((item, index) => (
                  <div className="address" key={index}>
                    <p>
                      <span>Dirección: </span> {index + 1}
                    </p>
                    <p>
                      <span>Calle: </span> {validator(item?.street)}
                    </p>
                    <p>
                      <span>Numero Interior: </span> {validator(item?.int_number)}
                    </p>
                    <p>
                      <span>Numero Exterior: </span> {validator(item?.ext_number)}
                    </p>
                    <p>
                      <span>Estado: </span> {item?.entity?.name}
                    </p>
                    <p>
                      <span>Ciudad: </span> {item?.city?.name ? item?.city?.name : "N/A"}
                    </p>

                    <p>
                      <span>Codigo Postal: </span> {item?.postal?.postal_code ? item?.postal?.postal_code : "N/A"}
                    </p>
                  </div>
                ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </DialogFullScreen>
  );
}

export default DrawerViewProvider;
