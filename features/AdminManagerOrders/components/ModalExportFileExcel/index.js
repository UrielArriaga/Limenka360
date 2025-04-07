import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { ModalExportFileStyles } from "./styles";
import { CalendarToday, CalendarTodayOutlined, Check, CheckCircle } from "@material-ui/icons";
import Select from "react-select";

export default function ModalExportFileExcel({ open, handletoogle, handleExportFile, rangeDate, setRangeDate }) {
  

  return (
    // <Dialog >
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
          onClick={()=> handleExportFile(rangeDate)}
        >
          Exportar a Excel
        </Button>
      </div>
      {/* <div className="containerBody">
          <Grid container>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <p className="content">El pedido {ordersApproved?.folio} se marcara como aprobado.</p>
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <p className="content">Datos de pedido:</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AccountBox />
                  <p className="label">Nombre Ejecutivo</p>
                </div>

                <p className="content">{toUpperCaseChart(ordersApproved?.oportunity?.soldby?.fullname)} </p>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Folio Pedido</p>
                </div>
                <p className="content"> {ordersApproved?.folio} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Monto Total</p>
                </div>
                <p className="content"> {ordersApproved?.oportunity?.amount} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Comisión Total</p>
                </div>
                <p className="content"> {formatNumber(ordersApproved?.oportunity?.comission)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Factura</p>
                </div>
                <p className="content">{ordersApproved?.data?.billing ? "Facturado" : "No Factura"}</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Estado de la orden</p>
                </div>
                <p className="content">{ordersApproved?.orderstatus?.name}</p>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Observaciones</p>
                </div>
                <p className="content"> {ordersApproved?.observations} </p>
              </div>
            </Grid>
          </Grid>

          <div className="buttons">
            <Button
              disabled={loaderCompleteApproved}
              className={`dialogContainer__buttons__cancel ${loaderCompleteApproved && "disabled"}`}
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>

            <Button
              disabled={loaderCompleteApproved}
              className={`dialogContainer__buttons__acept ${loaderCompleteApproved && "disabled"}`}
              color="primary"
              onClick={approveOrder}
            >
              Aceptar
            </Button>
          </div>
        </div> */}
    </ModalExportFileStyles>
    // </Dialog>
  );
}
