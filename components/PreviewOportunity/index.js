import React, { useEffect, useState } from "react";
import InfoProspect from "../InformationProspect";
import { PreviewOportunityStyled } from "./style";
import MenuForDrawers from "../UI/molecules/MenuForDrawer";
import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PreviewCuote from "../DrawerPreview";
import { api } from "../../services/api";
import { handleGlobalAlert } from "../../utils";
import { useDispatch } from "react-redux";

export default function PreviewOportunity(props) {
  const { oportunity, isOpen, close } = props;
  const [optionSelected, setOptionSelected] = useState("tracking");
  const dataProspect = oportunity?.itemBD;
  const prospectId = oportunity?.itemBD?.id;
  const oportunitySelect = [oportunity?.oportunityData];
  const [openpreview, setOpenpreview] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [prospect, setProspect] = useState({});

  const dispatch = useDispatch();
  const handleOpenPreview = () => {
    setOpenpreview(!openpreview);
  };

  useEffect(() => {
    let mounted = true;
    if ((mounted, prospectId)) {
      getInitialData();
    }

    return () => (mounted = false);
  }, [prospectId]);

  const getInitialData = async () => {
    setisLoading(true);
    try {
      let include =
        "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel";
      let p = await api.get(`prospects/${prospectId}?include=${include}`);
      setProspect(p.data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      handleGlobalAlert("error", "oportunidades-error al cargar informacion del prospecto", "basic", dispatch, 6000);
      console.log("eer", error);
    }
  };

  return (
    <PreviewOportunityStyled open={isOpen} onClose={close} anchor="right">
      <div className="preview">
        <div className="preview__header">
          <p className="title">Datos de la Oportunidad</p>
          <div>
            <Button variant="contained" color="primary" className="btn_view" onClick={() => handleOpenPreview()}>
              Ver cotización
            </Button>
            <IconButton className="bt_close" onClick={() => close()}>
              <Close />
            </IconButton>
          </div>
        </div>
        <div className="preview__body">
          <InfoProspect prospect={prospect} loader={isLoading} />
          <div className="divider" />
          <MenuForDrawers
            oportunity={oportunity}
            setOptionSelected={setOptionSelected}
            optionSelected={optionSelected}
            dataProspect={dataProspect}
            isSale={false}
          />
        </div>
        <div className="preview__footer"></div>
      </div>
      <PreviewCuote open={openpreview} setOpen={setOpenpreview} oportunitySelect={oportunitySelect} />
    </PreviewOportunityStyled>
  );
}
