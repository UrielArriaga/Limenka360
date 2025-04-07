import React from "react";
import { Dot, LoaderWrapper, PreviewRecolecionStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, Close, Edit } from "@material-ui/icons";
import InformationProductRecolecion from "../InformationProductRecolecion";
import OutputsProducts from "../OutputsProductRecolecion";
import EntriesProduct from "../EntriesProductRecolecion";

export default function RecolecionDetails({
  handleOnClickClosePreview,
  handleToggleFiles,
  productsData,
  tabSeletect,
  handleOnClickTab,
  isFetchingData,
  orderSelectedData,
  dataEntrance,
  isFetchingEntrance,
  dataOutputs,
  isFetchingExit,
  paginationData,
  paginationDataOutput,
  pickupsSelect,
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
        <Tooltip title="Cerrar Vista Previa">
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </Tooltip>
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
          {tabSeletect === "infoProduct" && <InformationProductRecolecion pickupsSelect={pickupsSelect} />}
        </div>
      </div>
    </PreviewRecolecionStyled>
  );
}
