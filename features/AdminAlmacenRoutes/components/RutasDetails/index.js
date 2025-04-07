import React, { useEffect } from "react";
import { Dot, LoaderWrapper, PreviewRecolecionStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close, Edit } from "@material-ui/icons";
import InformationRutas from "../InformationRutas";

export default function RutasDetails({
  handleOnClickClosePreview,
  tabSeletect,
  handleOnClickTab,
  routeSelected,
  handleOnClickSaveDelivery,
  toggleTrackingsModal
}) {


  return (
    <PreviewRecolecionStyled>
      <div className="headerpreview">
        <h4 className="concept">{routeSelected?.data?.driver?.name}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              className={` button ${routeSelected?.data?.delivered ? "buttondisabled":""}`}
              disabled={routeSelected?.data?.delivered ? true:false}
              onClick={() => {
                handleOnClickSaveDelivery(routeSelected?.data);
              }}
            >
              {routeSelected?.data?.delivered ? "Entregado":"Marcar Entregado"}
            </Button>
          </div>
          <div
            className="headerpreview__listactions--item"
            //  onClick={() => toggleTrackingsModal()}
          >
            <ChatBubbleOutline className="icon" />
            <p className="text" onClick={()=> toggleTrackingsModal()}>Ver Seguimientos</p>
          </div>
          <Tooltip title="Cerrar Vista Previa">
            <IconButton onClick={handleOnClickClosePreview}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="contentpreview">
        <div className="contentpreview__tabs">
          <div
            className={`contentpreview__tabs--tab ${tabSeletect === "infoProduct" && "active"}`}
            onClick={() => handleOnClickTab("infoProduct")}
          >
            <p>Informacion general</p>
          </div>
        </div>

        <div className="contentpreview__render">
          {tabSeletect === "infoProduct" && <InformationRutas routeSelected={routeSelected} />}
        </div>
      </div>
    </PreviewRecolecionStyled>
  );
}
