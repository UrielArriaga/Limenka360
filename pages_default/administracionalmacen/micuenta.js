import React from "react";
import MyAccountForm from "../../components/MyAccountForm";
import CommonLogLayout from "../../layouts/CommonLogLayout";

export default function micuenta() {
  return (
    <CommonLogLayout role="administrador_de_almacen">
      <MyAccountForm />
    </CommonLogLayout>
  );
}