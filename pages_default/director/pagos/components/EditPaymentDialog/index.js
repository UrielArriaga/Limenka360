import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleEditPaymentDialog } from "../../../../../styles/Director/pagos";
import { DialogActions } from "@material-ui/core";
import { api } from "../../../../../services/api";
import { formatDateToISO, handleGlobalAlert } from "../../../../../utils";

export default function EditPaymentDialog({
    openEditPaymentDialog,
    handleCloseEditPayment,
    dataEditPaymentDialog,
    setRecharge,
    recharge,
  }) {
    const dispatch = useDispatch();
    const [monto, setMonto] = useState(dataEditPaymentDialog?.monto || "");
    const [comision, setComision] = useState(dataEditPaymentDialog?.comission || "");
    const [fecha, setFecha] = useState(dataEditPaymentDialog?.fecha || "");
  
    useEffect(() => {
      setMonto(dataEditPaymentDialog?.monto || "");
      setComision(dataEditPaymentDialog?.comission || "");
      setFecha(dataEditPaymentDialog?.fecha || "");
    }, [dataEditPaymentDialog]);
  
    const handleMontoChange = event => {
      setMonto(event.target.value);
    };
  
    const handleComisionChange = event => {
      setComision(event.target.value);
    };
  
    const handleFechaChange = event => {
      setFecha(event.target.value);
    };
  
    const updatePayment = async () => {
      let currentData = await api.get(`salespayments/${dataEditPaymentDialog?.paymentId}`);
  
      if (
        currentData.data.payment != monto ||
        currentData.data.comission != comision ||
        currentData.data.date != formatDateToISO(fecha)
      ) {
        let data = {
          payments: [
            {
              downpayment: false,
              paymentId: dataEditPaymentDialog?.paymentId,
              payment: monto,
              comission: comision,
              date: formatDateToISO(fecha),
              observations: dataEditPaymentDialog?.observations,
              ispaid: dataEditPaymentDialog?.ispaid,
              oportunityId: dataEditPaymentDialog?.oportunityId,
            },
          ],
        };
  
        await api.put("salespayments", data);
  
        handleCloseEditPayment();
        setRecharge(!recharge);
        return handleGlobalAlert("success", "Se actualizó el pago correctamente!", "basic", dispatch);
      } else {
        return handleGlobalAlert("warning", "No cambio ningún dato!", "basic", dispatch);
      }
    };
  
    return (
      <StyleEditPaymentDialog
        open={openEditPaymentDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p className="title">Editar Pago</p>
  
        <div className="content">
          <label for="monto">Monto:</label>
          <input
            defaultValue={dataEditPaymentDialog?.monto}
            type="number"
            id="monto"
            name="monto"
            step="0.01"
            min="0"
            required
            onChange={handleMontoChange}
          />
  
          <label for="monto">Comisión:</label>
          <input
            defaultValue={dataEditPaymentDialog?.comission}
            type="number"
            id="comision"
            name="comision"
            step="0.01"
            min="0"
            required
            onChange={handleComisionChange}
          />
  
          <label for="fecha">Fecha Limite:</label>
          <input
            defaultValue={dataEditPaymentDialog?.fecha}
            type="date"
            id="fecha"
            name="fecha"
            required
            onChange={handleFechaChange}
          />
        </div>
  
        <DialogActions>
          <button className="button_cancelar" onClick={handleCloseEditPayment}>
            Cancelar
          </button>
          <button className="button_aceptar" onClick={updatePayment}>
            Aceptar
          </button>
        </DialogActions>
      </StyleEditPaymentDialog>
    );
  }