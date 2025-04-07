import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { ModalExportFileStyles } from "./styles";
import { CalendarToday, CalendarTodayOutlined, Check, CheckCircle } from "@material-ui/icons";
import Select from "react-select";

export default function ModalTransfers({
  statesTransfers = {},
  handlersTransfers = {},
  open,
  handletoogle,
  warehouses,
  rowsSelected,
}) {
  const [steps, setSteps] = useState(0);

  const { observations, articleSelected, wareHouseSelected, isUploading } = statesTransfers;
  const { handleOnChangeWareHouse, handleOnChangeObservations, handleOnSaveTransfer, fetchWarehouses } = handlersTransfers;
  return (
    // <Dialog >
    <ModalExportFileStyles onClose={handletoogle} open={open}>
      {/* <pre>{JSON.stringify(rowsSelected, null, 2)}</pre> */}
      <div className="title">
        <CalendarToday className="title__icon" />
        <p>Transpasar equipos a otro almacen</p>
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
          <div>Almacen</div>
        </div>

        <div className="headerbody">
          {articleSelected?.length > 0 &&
            articleSelected.map((a, i) => {
              return (
                <div className="row">
                  <div>{a?.serialnumber}</div>
                  <div>{a?.name}</div>
                  <div>{a?.warehouse}</div>
                </div>
              );
            })}
          {rowsSelected.map((a, i) => {
            return (
              <div className="row">
                <div>{a?.serialnumber}</div>
                <div>{a?.name}</div>
                <div>{a?.warehouse}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="body">
        <div className="body__item">
          <p className="label">Selecciona el almacen</p>
          <Select
            placeholder="Ej. Huehuetoca"
            options={warehouses}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            menuPosition="fixed"
            onChange={handleOnChangeWareHouse}
            onMenuOpen={() => {
              console.log("ccc");
              fetchWarehouses();
            }}
          />
        </div>

        <div className="body__item">
          <p className="label">Observaciones</p>
          <textarea value={observations} onChange={handleOnChangeObservations}></textarea>
        </div>

        <div className="body__resume">
          <div className="row">
            <p>Origen:</p> <p>{rowsSelected[0]?.warehouse}</p>
          </div>
          <div className="row">
            <p>Destino:</p> <p>{wareHouseSelected?.name || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="actions">
        <Button
          className={`actions__cancel ${"disabled"}`}
          onClick={() => {
            handletoogle();
            setSteps(0);
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={`actions__acept ${"disabled"}`}
          disabled={isUploading}
          onClick={() => {
            handleOnSaveTransfer();
          }}
        >
          {steps === 0 ? "Transpasar equipos" : "Confirmar Transpaso"}
        </Button>
      </div>
    </ModalExportFileStyles>
    // </Dialog>
  );
}
