import React, { useEffect } from "react";
import { Dot, LoaderWrapper, PreviewRecolecionStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, ChatBubbleOutline, Close, Edit } from "@material-ui/icons";
import InformationRutas from "../InformationRutas";
import PrintPdf from "../PrintPdf";

export default function RutasDetails({
  handleOnClickClosePreview,
  tabSeletect,
  handleOnClickTab,
  routeSelected,
  handleOnClickSaveDelivery,
  handleToggleFiles,
  toggleTrackingsModal,
  dataDelivery,
}) {
  const pdfList = [
    {
      id: 1,
      name: "Salida",
      url: dataDelivery?.data?.url,
    },
    {
      id: 2,
      name: "Carta Porte ",
      url: dataDelivery?.data?.urlcart,
    },
    {
      id: 3,
      name: "Nota Remisión",
      url: dataDelivery?.data?.urlnote,
    },
  ];

  if (dataDelivery?.isfetching) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  return (
    <PreviewRecolecionStyled>
      <div className="headerpreview">
        <h4 className="concept">{routeSelected?.data?.driver?.name}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <PrintPdf documents={pdfList} />
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              className={` button ${routeSelected?.data?.delivered ? "buttondisabled" : ""}`}
              disabled={routeSelected?.data?.delivered ? true : false}
              onClick={() => {
                handleOnClickSaveDelivery(routeSelected?.data);
              }}
            >
              {routeSelected?.data?.delivered ? "Entregado" : "Marcar Entregado"}
            </Button>
          </div>
          {/* <div
            className="headerpreview__listactions--item"
            //  onClick={() => handleToggleFiles() }
          >
            <AttachFile className="icon" />
            <p className="text" onClick={() => handleToggleFiles()}>
              Archivos Adjuntos
            </p>
          </div>
          <div
            className="headerpreview__listactions--item"
            //  onClick={() => toggleTrackingsModal()}
          >
            <ChatBubbleOutline className="icon" />
            <p className="text" onClick={() => toggleTrackingsModal()}>
              Ver Seguimientos
            </p>
          </div> */}
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
