import React, { useState } from "react";
import { Button, Drawer, LinearProgress, Pagination } from "@mui/material";
import { formatDate } from "../../../../utils";
import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import { DrawerContainer, StyledTable } from "./styled";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import useUpdatePayment from "../../hooks/usePaymentEdit";

const PaymentsDrawer = ({
  isOpen,
  toggleDrawer,
  paymentspurchaseorder,
  setPaymentsPurchase,
  edit,
  preview,
  payments,
  setEdit,
  generatePreview,
  handleChange,
  paymentPeriods,
  seePreview,
  orderSelectedData,
  updatePayments,
  updating,
  pay,
  fetchDataPaymentsPurchaseOrder,
  paymentsPurchase,
  updatePaymentAmount,
  loadingPay,
  count,
  pagePayments,
  handlePagination,
  limitPayments,
  loadingPP,
}) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedPayment, setEditedPayment] = useState(null);
  const { updatePayment, isLoading, error, data } = useUpdatePayment();

  const handleEditClick = payment => {
    setEditingRow(payment.id);
    setEditedPayment(payment.payment);
  };

  const handleSaveClick = async payment => {
    if (editedPayment !== null && editedPayment !== "") {
      try {
        const updatedPayment = {
          ...payment,
          payment: editedPayment,
        };

        const response = await updatePayment(updatedPayment);
        if (response.status === 200) {
          setPaymentsPurchase(prevState => {
            const updatedData = prevState.data.map(p => (p.id === payment.id ? { ...p, payment: editedPayment } : p));
            return { ...prevState, data: updatedData };
          });

          await fetchDataPaymentsPurchaseOrder();
          setEditingRow(null);
          setEditedPayment(null);
        } else {
          console.error("Error al actualizar el pago. Código de estado:", response.status);
        }
      } catch (err) {
        console.error("Error al actualizar el pago:", err);
      }
    } else {
      console.error("El valor del pago está vacío.");
    }
  };

  const handlePaymentChange = e => {
    setEditedPayment(e.target.value);
  };
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
      <DrawerContainer role="presentation">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className="pagos" onClick={() => console.log(orderSelectedData)}>
            {edit ? "Editar pagos" : "Pagos"}
          </h4>
          <div style={{ marginLeft: "auto" }}>
            <Tooltip title="Editar pagos">
              <IconButton variant="outlined" color="primary" onClick={() => setEdit(!edit)}>
                <Edit style={{ color: edit ? "#039BE5" : "grey" }} />
              </IconButton>
            </Tooltip>
            <IconButton aria-label="delete" onClick={() => toggleDrawer()}>
              <Close style={{ color: "red" }} />
            </IconButton>
          </div>
        </div>

        {!edit && (
          <p style={{ textTransform: "capitalize" }}>Condición de pago: {orderSelectedData?.paymentcondition}</p>
        )}

        {edit && (
          <div>
            <p className="indication">- Selecciona todos los campos:</p>

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
                Generar pagos
              </Button>
            )}

            {preview?.length !== 0 && <p style={{ marginTop: "15px" }}>- Los pagos se actualizarán a:</p>}

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

            {preview?.length !== 0 && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={() => updatePayments()}
              >
                {updating ? <CircularProgress size={24} /> : "Actualizar pagos"}
              </Button>
            )}
          </div>
        )}

        {loadingPP && <LinearProgress color="primary" />}

        {!edit && !loadingPP && (
          <StyledTable>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Pago</th>
                <th>Estado</th>
                <th>Cambiar a pagado</th>
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
                <tr key={p.id}>
                  <td>{formatDate(p.date)}</td>
                  <td>
                    {editingRow === p.id ? (
                      <>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="number"
                          value={editedPayment || ""}
                          onChange={handlePaymentChange}
                          style={{ width: "70%",  marginRight: "10px" }}
                        />
                        <Button
                          style={{
                            color: "#fff",
                            backgroundColor: "#405189",
                            textTransform: "none",
                            height: "30px",
                     
                          }}
                          variant="contained"
                          onClick={() => handleSaveClick(p)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Guardando..." : "Guardar"}
                        </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        ${p.payment}
                        <Tooltip title="Editar">
                          <IconButton color="primary" onClick={() => handleEditClick(p)} style={{ marginLeft: "10px" }}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </td>
                  <td>{p.ispaid ? "Pagado" : "Pendiente"}</td>
                  <td>
                    {p.ispaid ? (
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <MonetizationOnIcon style={{ color: "#388E3C" }} />
                      </div>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          color: "#fff",
                          backgroundColor: "#405189",
                          textTransform: "none",
                          width: "100%",
                          height: "30px",
                        }}
                        onClick={() => pay(p.id)}
                      >
                        {loadingPay[index]?.loading ? <CircularProgress color="#fff" size={20} /> : "Pagar"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {paymentspurchaseorder?.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No hay datos
                  </td>
                </tr>
              )}

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

        {/* Paginación no borrar */}
        {/* {!edit && (
          <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "10px" }}>
            <Pagination
              count={Math.ceil(count / limitPayments)}
              page={pagePayments}
              onChange={handlePagination}
              style={{ marginTop: "10px" }}
              variant="outlined"
              color="primary"
            />
          </div>
        )} */}
      </DrawerContainer>
    </Drawer>
  );
};

export default PaymentsDrawer;
