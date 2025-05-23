import React, { useState } from "react";
import { ModalPreviewStyled } from "./styles";
import {
  AttachFile,
  CalendarToday,
  CalendarTodayOutlined,
  Close,
  ContactMail,
  Help,
  WhatsApp,
} from "@material-ui/icons";
import AddTracking from "./AddTracking";
import { Grid, IconButton } from "@material-ui/core";
import InfoProspect from "./InfoProspect";
import LineTime from "./LineTime";
import AddPending from "./AddPending";
import LineTimePendings from "./LineTimePendings";
import ArrowStepsComponent from "../ArrowPhases";
import SendWhatsapp from "./SendWhatsapp";
import { set } from "date-fns";

export default function ModalPreview({ open, toggleModal, prospectSelected, trackings, pendingsData }) {
  const [showAction, setShowAction] = useState(null);

  const handleOnCancel = () => {
    setShowAction(null);
  };

  return (
    <ModalPreviewStyled anchor={"right"} open={open} onClose={() => toggleModal()}>
      <div className="row">
        <div className="modalcontainer">
          <div className="headerPreview">
            <ArrowStepsComponent />

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
              {showAction === "whatsapp" && (
                <>
                  <SendWhatsapp onCancel={() => handleOnCancel()} />
                  <LineTime trackings={trackings} />
                </>
              )}
              {/* //  */}
              {showAction === null && (
                <>
                  <AddTracking />
                  <LineTime trackings={trackings} />
                </>
              )}
            </Grid>
          </Grid>
          {/* {JSON.stringify(prospectSelected)} */}
          <div className="close" onClick={() => toggleModal()}>
            <Close />
          </div>
        </div>
        <div className="actionsbar">
          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <Help />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <CalendarToday />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon" onClick={() => setShowAction("whatsapp")}>
              <WhatsApp />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <AttachFile />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <ContactMail />
            </IconButton>
          </div>
        </div>
      </div>
    </ModalPreviewStyled>
  );
}
