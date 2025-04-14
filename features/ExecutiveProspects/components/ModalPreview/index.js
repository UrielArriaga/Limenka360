import React, { useState } from "react";
import { ModalPreviewStyled } from "./styles";
import {
  AttachFile,
  CalendarToday,
  Close,
  ContactMail,
  Help,
  WhatsApp,
} from "@material-ui/icons";
import AddTracking from "./AddTracking";
import { Grid, IconButton, Tabs, Tab } from "@material-ui/core";
import InfoProspect from "./InfoProspect";
import LineTime from "./LineTime";
import AddPending from "./AddPending";
import LineTimePendings from "./LineTimePendings";
import ArrowStepsComponent from "../ArrowPhases";
import SendWhatsapp from "./SendWhatsapp";
import ProductsOportunities from "./ProductsOportunities";
import ProductsOportunitiesTable from "./ProductsOportunitiesTable";

export default function ModalPreview({
  open,
  toggleModal,
  prospectSelected,
  trackings,
  pendingsData,
}) {
  const [showAction, setShowAction] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleOnCancel = () => {
    setShowAction(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ModalPreviewStyled
      anchor={"right"}
      open={open}
      onClose={() => toggleModal()}
    >
      <div className="row">
        <div className="modalcontainer">
          <div className="headerPreview">
            <h1>Oportunidad</h1>
            {/* <ArrowStepsComponent /> */}

            <div className="actionmodal">
              <button className="btn btn--primary">
                Convertir en Oportunidad
              </button>
              <button className="btn btn--secondary">Editar</button>
              <button className="btn btn--secondary">Eliminar</button>
            </div>
          </div>

          <div className="headertabs">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Resumen" />
              <Tab label="Productos" />
              <Tab label="Cotizacion PDF" />
              <Tab label="Documentos" />
            </Tabs>
          </div>

          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <InfoProspect prospectSelected={prospectSelected} />
                <AddPending
                  pendingsData={pendingsData}
                  prospectSelected={prospectSelected}
                />
                <LineTimePendings pendingsData={pendingsData} />
              </Grid>

              <Grid item md={6} xs={12}>
                {showAction === "whatsapp" && (
                  <>
                    <SendWhatsapp onCancel={() => handleOnCancel()} />
                    <LineTime trackings={trackings} />
                  </>
                )}
                {showAction === null && (
                  <>
                    <AddTracking />
                    <LineTime trackings={trackings} />
                  </>
                )}
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && <ProductsOportunitiesTable products={[]} />}
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
            <IconButton
              className="actionsbar__icon"
              onClick={() => setShowAction("whatsapp")}
            >
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

{
  /* <Grid item md={12} xs={12}>
<Tabs
  value={tabValue}
  onChange={handleTabChange}
  aria-label="simple tabs example"
>
  <Tab label="Resumen" />
  <Tab label="Productos" />
</Tabs>

{tabValue === 0 && (
  <div>
    {/* Aquí puedes poner el contenido del resumen */
}
//     <p>Contenido del Resumen.</p>
//   </div>
// )}

// {tabValue === 1 && (
//   <div>
//     <ProductsOportunitiesTable />
//   </div>
// )}
// </Grid> */}
