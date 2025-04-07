import React, { useState } from "react";
import { BitacoraPreviewStyled } from "./styles";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Button } from "@mui/material";

export default function PreviewBitacora({ Cloused, open, productsData,generatePDF }) {
  let rowCount = 15;

  return (
    <BitacoraPreviewStyled open={open} anchor="right" onClose={Cloused}>
      <div className="content_titles">
        <h3>Vista Previa Bitacora</h3>
        <IconButton onClick={Cloused}>
          <Close />
        </IconButton>
      </div>
      <div className="preview">
        <div className="container">
          <div className="content_title">
            <p className="title">BITACORA DE ENTRADAS ALMACEN</p>
          </div>
          <section className="sections">
            <table>
              <thead>
                <tr>
                  <th className="thead_th_cant">MARCA</th>
                  <th className="thead_th_code">CODIGO</th>
                  <th className="thead_th_desc">DESCRIPCION DEL EQUIPO</th>
                  <th className="thead_th_ubi">UBICACION</th>
                  <th className="thead_th_num">NUMERO DE SERIE</th>
                  <th className="thead_th_folio">FOLIO DE PEDIDO</th>
                  <th className="thead_th_nameal">NOMBRE DEL ALMACENISTA</th>
                  <th className="thead_th_date">FECHA</th>
                  <th className="thead_th_firm">FIRMA</th>
                </tr>
              </thead>
              <tbody>
                {productsData?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.brand}</td>
                      <td>{item?.code}</td>
                      <td>{item?.name}</td>
                      <td>{item?.ubi}</td>
                      <td>{item?.serial}</td>
                      <td>{item?.folio}</td>
                      <td>{item?.namealmacen}</td>
                      <td>{item?.date}</td>
                      <td></td>
                    </tr>
                  );
                })}
                {Array?.from({ length: rowCount - productsData?.length }).map((_, index) => (
                  <tr key={productsData?.length + index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table">
              <thead className="thead">
                <tr className="tr">
                  <th className="th">JEFE DE PISO</th>
                  <th className="th">CORDINADOR SALIDAS</th>
                  <th className="th">VIGILANCIA</th>
                  <th className="th">OPERADOR</th>
                </tr>
              </thead>
              <tbody className="tbody">
                <tr className="tbody_tr">
                  <td className="tbody_td"></td>
                  <td className="tbody_td"></td>
                  <td className="tbody_td"></td>
                  <td className="tbody_td"></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <div className="content_button">
        <Button className="button" onClick={generatePDF}>Guardar y descargar</Button>
      </div>
    </BitacoraPreviewStyled>
  );
}
