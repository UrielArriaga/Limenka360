import React from "react";
import InfoProspect from "../InformationProspect";
import { PreviewStyled } from "./style";
import MenuForDrawers from "../UI/molecules/MenuForDrawer";

export default function DirectorDrawerForPayments(props) {
  const { oportunity, isOpen, close, optionSelected, setOptionSelected } = props;
  const dataProspect = oportunity?.itemBD;
  return (
    <PreviewStyled open={isOpen} onClose={close} anchor="right">
      <div className="preview preview__body">
        <InfoProspect prospect={dataProspect} close={close} />
        <MenuForDrawers
          oportunity={oportunity}
          setOptionSelected={setOptionSelected}
          optionSelected={optionSelected}
          dataProspect={dataProspect}
          isSale={true}
        />
      </div>
    </PreviewStyled>
  );
}
