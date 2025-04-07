import React, { useState } from "react";
import InfoProspect from "../InformationProspect";
import { PreviewOportunityStyled } from "./style";
import MenuForDrawers from "../UI/molecules/MenuForDrawer";
import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PreviewCuote from "../DrawerPreview";
import InfoSale from "../InformationSale";

export default function PreviewSale(props) {
  const { oportunity, isOpen, close } = props;
  const [optionSelected, setOptionSelected] = useState("tracking");
  const dataProspect = oportunity?.itemBD;
  const oportunitySelect = [oportunity?.oportunityData];
  const [openpreview, setOpenpreview] = useState(false);
  const oportunityData = oportunity?.oportunityData;
  const handleOpenPreview = () => {
    setOpenpreview(!openpreview);
  };

  return (
    <PreviewOportunityStyled open={isOpen} onClose={close} anchor="right">
      <div className="preview">
        <div className="preview__header">
          <p className="title">Venta</p>
          <div>
            <Button variant="contained" color="primary" className="btn_view" onClick={() => handleOpenPreview()}>
              Ver cotización
            </Button>
            <IconButton className="bt_close" onClick={() => close()}>
              <Close />
            </IconButton>
          </div>
        </div>
        {/* {isOportunity && ( */}

        {/* )} */}
        <div className="preview__body">
          <InfoProspect prospect={dataProspect} />
          <div className="divider" />
          <InfoSale oportunity={oportunityData} />
          <MenuForDrawers
            oportunity={oportunity}
            setOptionSelected={setOptionSelected}
            optionSelected={optionSelected}
            dataProspect={dataProspect}
            isSale={true}
          />
        </div>
        <div className="preview__footer"></div>
      </div>
      <PreviewCuote open={openpreview} setOpen={setOpenpreview} oportunitySelect={oportunitySelect} />
    </PreviewOportunityStyled>
  );
}
