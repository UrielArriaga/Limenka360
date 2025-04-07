import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { ModalExportFileStyles } from "./styles";
import { CalendarToday, CalendarTodayOutlined, Check, CheckCircle, Forward } from "@material-ui/icons";
import TraspTemplate from "../../../../components/TemplatesAlmacen/TraspTemplate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function ModalEntry({
  selectedTransfer,
  productsTransfer,
  openModalExit,
  toggleModal,
  closeModal,
  observations,
  setObservations,
  handleOnSaveEntry,
}) {
  const { username, name } = useSelector(userSelector);
  const newDataNormalizeTOPDF = productsTransfer?.map(item => {
    return {
      folio: selectedTransfer?.folio,
      serial: item?.warehouseproduct?.serialnumber,
      product: item?.warehouseproduct?.product?.name,
      almOrigin: selectedTransfer?.exitwarehouse,
      almDest: selectedTransfer?.entrywarehouse,
      delivery:selectedTransfer?.createdBy,
      receive: username || name,
      dateOut: dayjs(selectedTransfer?.data?.warehouseexit).format("DD,MMMM YYYY") || "N/A",
      dateInt: dayjs(new Date()).format("DD,MMMM, YYYY"),
      observation: selectedTransfer?.data?.description,
    };
  });

  return (
    <ModalExportFileStyles onClose={toggleModal} open={openModalExit}>
      <div className="title">
        <Forward className="title__icon" />
        <p>Generar Entrada de Articulos de Traspaso</p>
      </div>

      <div className="description">
        <p className="description__message"></p>
      </div>

      <p
        className="label"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
        }}
      >
        Articulos
      </p>
      <div className="articles">
        <div className="headertable">
          <div>Serial</div>
          <div>Nombre</div>
          <div>Almacen Origen</div>
          <div>Almacen Destino</div>
        </div>

        <div className="headerbody">
          {productsTransfer?.length > 0 &&
            productsTransfer.map((a, i) => {
              return (
                <div className="row">
                  <div>{a?.warehouseproduct?.serialnumber}</div>
                  <div>{a?.warehouseproduct?.product?.name}</div>
                  <div>{selectedTransfer?.exitwarehouse}</div>
                  <div>{selectedTransfer?.entrywarehouse}</div>
                </div>
              );
            })}
        </div>
      </div>

      {/* <div className="body">
        <div className="body__item">
          <p className="label">Observaciones</p>
          <textarea
            value={observations}
            placeholder="Ingresa alguna observacion"
            onChange={e => setObservations(e.target.value)}
          ></textarea>
        </div>
      </div> */}

      <div className="previewFile">
        <TraspTemplate data={newDataNormalizeTOPDF} />
      </div>

      <div className="actions">
        <Button
          className={`actions__cancel ${"disabled"}`}
          onClick={() => {
            toggleModal();
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={`actions__acept ${"disabled"}`}
          onClick={() => {
            handleOnSaveEntry();
          }}
        >
          Generar
        </Button>
      </div>
    </ModalExportFileStyles>
  );
}
