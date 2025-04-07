import React from "react";
import { Dot, LoaderWrapper, PreviewRecolecionStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, Close, Edit,Print } from "@material-ui/icons";
import InformationProductRecolecion from "../InformationProductRecolecion";
import OutputsProducts from "../OutputsProductRecolecion";
import EntriesProduct from "../EntriesProductRecolecion";

export default function RecolecionDetails({
  handleOnClickClosePreview,
  handleDrawerPrevieOuts,
  tabSeletect,
  handleOnClickTab,
  isFetchingData,
  pickupsSelect,
  dataEntrance,
  dataOutputs,
  isFetchingExit
}) {
  if (isFetchingData) {
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
        <h4 className="concept">{pickupsSelect?.folio}</h4>
        <div className="content_header">
          <div className="headerpreview__listactions--item" onClick={() => handleDrawerPrevieOuts()}>
            <Print className="icon" />
            <p className="text">Imprimir Documento</p>
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
          {tabSeletect === "infoProduct" && <InformationProductRecolecion pickupsSelect={pickupsSelect} dataEntrance={dataEntrance} dataOutputs={dataOutputs} isFetchingExit={isFetchingExit} />}
        </div>
      </div>
    </PreviewRecolecionStyled>
  );
}
