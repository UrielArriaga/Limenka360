import { Button, Dialog } from "@material-ui/core";
import React, { useEffect } from "react";
import { DialogCompleteApproved } from "./styles";
import { BorderColor, Check, CheckCircle } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export default function ModalEditAccountPay({ open, toggleModal, closeModal, orderSelectedData, updateAccountOfOrder }) {
  const {
    paymentsacount: { results },
  } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { setValue, control, watch } = useForm();
  const pay = watch("account")
  useEffect(() => {
    setValue("account", orderSelectedData?.paymentaccount);
    getCatalogBy("paymentsacount");
  }, [orderSelectedData?.id]);

  return (
    <DialogCompleteApproved onClose={toggleModal} open={open}>
      <div className="title">
        <BorderColor className="title__icon" />
        <p>¿Estás Seguro de cambiar la cuenta de pago?</p>
      </div>

      <div className="description">
        <Controller
          name="account"
          control={control}
          rules={{ required: "Requerido" }}
          render={({ field }) => (
            <Select
              {...field}
              name="account"
              className="select_data"
              placeholder="Elige una Opción"
              options={results}
              getOptionLabel={e => e.name}
              getOptionValue={e => e.id}
              maxMenuHeight={130}
              noOptionsMessage={() => "Sin Opciones"}
            />
          )}
        />
      </div>

      <div className="actions">
        <Button className={`actions__cancel ${"disabled"}`} onClick={() => closeModal()}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" className={`actions__acept ${"disabled"}`} type="submit" onClick={()=> updateAccountOfOrder(pay)}>
          Aceptar
        </Button>
      </div>
    </DialogCompleteApproved>
  );
}
