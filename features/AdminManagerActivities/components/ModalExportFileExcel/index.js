import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";

import { CalendarToday, CalendarTodayOutlined, Check, CheckCircle } from "@material-ui/icons";
import { ModalExportFileStyles } from "./styled";

export default function ModalExportFileExcel({ open, handletoogle, handleExportFile, rangeDate, setRangeDate }) {
  return (
    <ModalExportFileStyles onClose={handletoogle} open={open}>
      <div className="title">
        <CalendarToday className="title__icon" />
        <p>Rango de Fechas</p>
      </div>

      <div className="description">
        <p className="description__message"></p>
      </div>

      <div className="inputsDate">
        <div className="formDate">
          <p>Fecha de inicio</p>
          <input
            type="date"
            className="date"
            onChange={e => setRangeDate({ ...rangeDate, startDate: e.target.value })}
          />
        </div>
        <div className="formDate">
          <p>Fecha de termino</p>
          <input
            type="date"
            disabled={rangeDate?.startDate == "" ? true : false}
            className="date"
            onChange={e => setRangeDate({ ...rangeDate, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="actions">
        <Button
          // disabled={loaderCompleteApproved}
          className={`actions__cancel ${"disabled"}`}
          onClick={handletoogle}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          // disabled={loaderCompleteApproved}
          className={`actions__acept ${"disabled"}`}
          onClick={() => handleExportFile(rangeDate)}
        >
          Exportar a Excel
        </Button>
      </div>
    </ModalExportFileStyles>
  );
}
