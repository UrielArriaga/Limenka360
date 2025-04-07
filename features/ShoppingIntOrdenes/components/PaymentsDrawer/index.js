import React from "react";
import { Button, Drawer, LinearProgress } from "@mui/material";
import { formatDate } from "../../../../utils";
import { IconButton } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import { DrawerContainer, StyledTable } from "./styled";

const PaymentsDrawer = ({
  isOpen,
  toggleDrawer,
  paymentspurchaseorder,
  edit,
  preview,
  payments,
  setEdit,
  generatePreview,
  handleChange,
  paymentPeriods,
  seePreview,
}) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
      <DrawerContainer role="presentation" onKeyDown={toggleDrawer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="pagos">{edit ? "Editar pagos" : "Pagos"}</h4>
          <div style={{ marginLeft: "auto" }}>
            <IconButton variant="outlined" color="primary" onClick={() => setEdit(!edit)}>
              <Edit style={{ color: edit ? "#039BE5" : "grey" }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => toggleDrawer()}>
              <Close style={{ color: "red" }} />
            </IconButton>
          </div>
        </div>

        {edit && (
          <div>
            <p>Fecha de inicio:</p>
            <input value={payments?.date} name="date" onChange={handleChange} type="date" />

            <p>Periocidad De Pago:</p>
            <select name="periodicity" onChange={handleChange} value={payments.periodicity}>
              <option value="" disabled hidden>
                Selecciona una periocidad
              </option>
              {paymentPeriods?.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <p>Número De Pagos:</p>
            <input
              value={payments.periodicity === "pago único" ? 1 : payments.paymentamount}
              name="paymentamount"
              onChange={e => payments.periodicity !== "pago único" && handleChange(e)}
              type="number"
              min="1"
              onWheel={e => e.stopPropagation()}
            />

            <p>Periodicidad De Comisión:</p>
            <select
              name="periodicitycomission"
              onChange={e => payments.periodicity !== "pago único" && handleChange(e)}
              value={payments.periodicitycomission}
            >
              <option value="" disabled hidden>
                Selecciona un periodo
              </option>
              <option value="Primer Pago">Primer Pago</option>
              {payments.periodicity !== "pago único" && (
                <>
                  <option value="Segundo Pago">Segundo Pago</option>
                  <option value="Prorrateadas">Prorrateadas</option>
                </>
              )}
            </select>

            {seePreview && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={() => generatePreview()}
              >
                Generar vista previa
              </Button>
            )}

            {preview?.length !== 0 && (
              <StyledTable>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Pago</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {false && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        <div className="load">
                          <div className="load__img">
                            <img src="/load.png" alt="Cargando" />
                          </div>
                          <div className="content_loadtext">
                            <p>Cargando Productos</p>
                            <LinearProgress color="primary" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  {preview?.map((p, index) => (
                    <tr key={index}>
                      <td>{formatDate(p.date)}</td>
                      <td>${p.payment}</td>
                      <td>{p.ispaid ? "Pagado" : "Pendiente"}</td>
                    </tr>
                  ))}
                  {preview?.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No hay datos
                      </td>
                    </tr>
                  )}
                </tbody>
              </StyledTable>
            )}
          </div>
        )}

        {!edit && (
          <StyledTable>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody className="bodyTable">
              {false && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    <div className="load">
                      <div className="load__img">
                        <img src="/load.png" alt="Cargando" />
                      </div>
                      <div className="content_loadtext">
                        <p>Cargando Productos</p>
                        <LinearProgress color="primary" />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {paymentspurchaseorder?.map((p, index) => (
                <tr key={index}>
                  <td>{formatDate(p.date)}</td>
                  <td>${p.payment}</td>
                  <td>{p.ispaid ? "Pagado" : "Pendiente"}</td>
                </tr>
              ))}
              {paymentspurchaseorder?.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No hay datos
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        )}
      </DrawerContainer>
    </Drawer>
  );
};

export default PaymentsDrawer;
