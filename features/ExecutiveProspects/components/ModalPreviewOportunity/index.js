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
import useTrackings from "../../../ExecutiveProspectsV2/hooks/useTrackings";
import usePending from "../../../ExecutiveProspectsV2/hooks/usePending";

export default function ModalPreviewOportunity({
  open,
  toggleModal,
  prospectSelected,
  oportunityData,
  // trackings,
  // pendingsData,
}) {
  const oportunityDatax = {
    concept: "UAZM-123456",
    amount: 1000,
    quantity: 1,
    prospect: {
      name: "Juan Perez",
      phone: "1234567890",
      email: "juanperez@gmail.com",
      address: "1234 Main St, Anytown, USA",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      category: {
        name: "Muebles",
      },
    },
  };

  const [showAction, setShowAction] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleOnCancel = () => {
    setShowAction(null);
  };

  const { trackingData } = useTrackings(prospectSelected);

  const { pendingsData } = usePending(prospectSelected?.id);

  let trackings = trackingData.results || [];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ModalPreviewStyled
      anchor={"right"}
      open={open}
      onClose={() => toggleModal()}
    >
      <div className="header">
        <div className="header-title">
          <h3>Prospecto</h3>
        </div>
      </div>

      <div className="rowmain">
        <div className="rowmain-left">
          <p className="concept">Concepto</p>

          <div className="amount">
            <p className="value">{oportunityDatax.concept}</p>
          </div>
        </div>
        <div className="rowmain-right"></div>
      </div>
    </ModalPreviewStyled>
  );
}
