import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import TitlePage from "./titlePage";
import AccountEjecutives from "../AccountEjecutives";
import { MiCuentaStyled } from "../../styles/JefeDePiso/micuenta.styles";
import { handleGlobalAlert } from "../../utils";
import AlertGlobal from "../Alerts/AlertGlobal";

export default function MyAccountForm() {
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const alert = (type, label) => {
    handleGlobalAlert(type, label, "basic", setAlert);
  };

  return (
    <Grid container style={{ padding: "30px" }}>
      <Grid item xs={12}>
        <TitlePage />
      </Grid>
      <MiCuentaStyled>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
        <AccountEjecutives alert={alert} />
      </MiCuentaStyled>
    </Grid>
  );
}
