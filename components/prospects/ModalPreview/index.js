import React from "react";
import { ModalPreviewStyled } from "./styles";
import { Close } from "@material-ui/icons";
import AddTracking from "./AddTracking";
import { Grid } from "@material-ui/core";
import InfoProspect from "./InfoProspect";
import LineTime from "./LineTime";
import AddPending from "./AddPending";
import LineTimePendings from "./LineTimePendings";

export default function ModalPreview({ open, toggleModal, prospectSelected, trackings, pendingsData }) {
  return (
    <ModalPreviewStyled anchor={"right"} open={open} onClose={() => toggleModal()}>
      <div className="headerPreview">
        <h1>{prospectSelected?.fullname}</h1>

        <div className="actionmodal">
          <button className="btn btn--primary">Convertir en Oportunidad</button>
          <button className="btn btn--secondary">Editar</button>
          <button className="btn btn--secondary">Eliminar</button>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <InfoProspect prospectSelected={prospectSelected} />

          <AddPending pendingsData={pendingsData} prospectSelected={prospectSelected} />

          <LineTimePendings pendingsData={pendingsData} />
        </Grid>
        <Grid item md={6} xs={12}>
          <AddTracking />

          <LineTime trackings={trackings} />
        </Grid>
      </Grid>
      {/* {JSON.stringify(prospectSelected)} */}
      <div className="close" onClick={() => toggleModal()}>
        <Close />
      </div>
    </ModalPreviewStyled>
  );
}
