import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import FormOportunity from "./FormOportunity";
import { NewOportunityStyled } from "./styles";
import TableProducts from "./TableProducts";

export default function NewOportunity({ open, toggleModal, prospectSelected }) {
  const [showAction, setShowAction] = useState(null);

  const handleOnCancel = () => {
    setShowAction(null);
  };

  return (
    <NewOportunityStyled
      anchor={"right"}
      open={open}
      onClose={() => toggleModal()}
    >
      <div className="row">
        <div className="modalcontainer">
          <div className="headerPreview">
            <div className="headerPreview__title">
              Nueva oportunidad y Cotizacion
            </div>

            <div className="actionmodal"></div>
          </div>

          <FormOportunity prospectSelected={prospectSelected} />

          <TableProducts />
        </div>
      </div>
    </NewOportunityStyled>
  );
}
