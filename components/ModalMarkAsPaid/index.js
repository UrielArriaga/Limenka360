import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import useFetchData, { normalizeDataSelect, processResponseArray } from "../../hooks/useFetchData";
import { api } from "../../services/api";
import { handleGlobalAlert } from "../../utils";
import { useDispatch } from "react-redux";
import { ButtonContainer, StyledBox } from "./ModalMarkAsPaid.styles";

const ModalMarkAsPaid = ({ open, handleClose, item, setRecharge, recharge }) => {
  const dispatch = useDispatch();
  const [dataToUpdate, setDataToUpdate] = useState({
    paymentwayId: "",
    paymentaccountId: "",
  });

  //Todos los pagos de la oportunidad
  const { data: allPayments, fetchData: reloadAllPayments } = useFetchData("salespayments", processResponseArray, {
    all: true,
    where: { oportunityId: item.oportunityId },
  });

  //Valor de los select
  const { data: paymentways } = useFetchData("paymentways", processResponseArray, { all: true }, normalizeDataSelect);
  const { data: paymentsacounts } = useFetchData(
    "paymentsacounts",
    processResponseArray,
    { all: true },
    normalizeDataSelect
  );

  const pay = async () => {
    //Crear el objeto
    const data = allPayments.map(p => ({
      id: p.id,
      payment: p.payment,
      comission: p.comission,
      date: p.date,
      observations: p.observations,
      paymentiva: p.paymentiva,
      downpayment: p.downpayment,
      oportunityId: p.oportunityId,
      ejecutiveId: p.ejecutiveId,
      paymentperiodId: p.paymentperiodId,
      ispaid: item.id == p.id ? true : p.ispaid,
      paymentwayId: item.id == p.id ? dataToUpdate.paymentwayId : p.paymentwayId,
      paymentaccountId: item.id == p.id ? dataToUpdate.paymentaccountId : p.paymentaccountId,
    }));

    if (dataToUpdate.paymentwayId != "" && dataToUpdate.paymentaccountId != "") {
      //Guardar la data
      const update = await api.put("salespayments/allpayments", { payments: data });
      await reloadAllPayments(); //recarga al guardar

      if (update.status === 200) {
        handleClose();
        handleGlobalAlert("success", "Pago - Se ha confirmado el Pago, Estatus Actualizado!", "basic", dispatch);
        setRecharge(!recharge);
      }
    } else {
      handleGlobalAlert("warning", "Selecciona todos los campos", "basic", dispatch);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <StyledBox>
        <Typography id="modal-title" variant="h6" component="h2">
          Marcar como pagado
        </Typography>
        <div className="item">
          <div className="label-box row">
            <label className={`item ${item.downpayment ? "downpayment" : ""}`}>Tipo de pago</label>
          </div>

          <select
            value={dataToUpdate.paymentwayId}
            onChange={e =>
              setDataToUpdate(prevState => ({
                ...prevState,
                paymentwayId: e.target.value,
              }))
            }
          >
            <option hidden value="">
              Seleccione Tipo de pago
            </option>
            {paymentways?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <div className="label-box row">
            <label className={`item ${item.downpayment ? "downpayment" : ""}`}>Cuenta de pago</label>
          </div>

          <select
            value={dataToUpdate.paymentaccountId}
            onChange={e =>
              setDataToUpdate(prevState => ({
                ...prevState,
                paymentaccountId: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Seleccione Cuenta de pago
            </option>{" "}
            {paymentsacounts?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <ButtonContainer>
          <Button onClick={handleClose} variant="contained">
            Cancelar
          </Button>
          <Button onClick={pay} variant="contained">
            Confirmar
          </Button>
        </ButtonContainer>
      </StyledBox>
    </Modal>
  );
};

export default ModalMarkAsPaid;
