import React from "react";
import { FormContainer } from "./styles";
import { Assignment } from "@material-ui/icons";
import PaymentItem from "./PaymentItem";
import { Button } from "@material-ui/core";

export default function FormPayments({ paymentsControl, catalogs }) {
  const { payments } = paymentsControl;

  const { addressesData, conceptImports, typesorder } = catalogs;

  return (
    <FormContainer>
      <div className="sectionheader">
        <h1 className="title">Pagos y Gastos de importacion</h1>
        <Assignment className="icon_primary" />
      </div>

      {payments.map((payment, index) => {
        return (
          <PaymentItem
            conceptImports={conceptImports}
            payment={payment}
            index={index + 1}
            handleOnClickDeletePayment={paymentsControl.handleOnClickDeletePayment}
            handleOnChangeProperty={paymentsControl.handleOnChangeProperty}
          />
        );
      })}
      {/* <button onClick={() => paymentsControl.debuggerConsole()}>debuggerConsole</button> */}

      {/* <pre>{JSON.stringify(payments, null, 2)}</pre> */}

      <Button variant="outlined" className="button-add" onClick={() => paymentsControl.handleOnClickAddPayment()}>
        Agregar Nuevo Pago
      </Button>
    </FormContainer>
  );
}
