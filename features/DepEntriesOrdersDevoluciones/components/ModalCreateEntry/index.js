import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { ModalExportFileStyles } from "./styles";
import { CalendarToday, CalendarTodayOutlined, Check, CheckCircle, Forward } from "@material-ui/icons";

export default function ModalEntry({
  openModal, closeModal, generateEntry
}) {

  return (
    <ModalExportFileStyles onClose={closeModal} open={openModal}>
      <div className="title">
        <p>Generar Entrada</p>
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
        ¿Estas seguro de realizar la entrada?
      </p>

      <div className="actions">
        <Button
          className={`actions__cancel ${"disabled"}`}
          onClick={() => {
            closeModal();
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={`actions__acept ${"disabled"}`}
          onClick={() => {
            generateEntry();
          }}
        >
          Generar
        </Button>
      </div>
    </ModalExportFileStyles>
  );
}
