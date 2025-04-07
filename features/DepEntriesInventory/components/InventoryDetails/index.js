import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, Close, Edit } from "@material-ui/icons";
import InformationProduct from "../InfomationProduct";
import OutputsProducts from "../OutputsProduct";
import EntriesProduct from "../EntriesProduct";

export default function InventoryDetails({
  handleOnClickClosePreview,
  handleToggleFiles,
  productsData,
  tabSeletect,
  handleOnClickTab,
  isFetchingData,
  productInventorySelected,
  orderSelectedData,
  dataEntrance,
  isFetchingEntrance,
  dataOutputs,
  isFetchingExit,
  paginationData,
  paginationDataOutput,
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
    <PreviewOrderStyled>
      <div className="headerpreview">
        <h4 className="concept">Código de Producto: {orderSelectedData?.code}</h4>
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
            <p>Información general</p>
          </div>

          <div
            className={`contentpreview__tabs--tab ${tabSeletect === "entries" && "active"}`}
            onClick={() => handleOnClickTab("entries")}
          >
            <p>Entradas</p>
          </div>

          <div
            className={`contentpreview__tabs--tab
          ${tabSeletect === "outputs" && "active"}
          
          `}
            onClick={() => handleOnClickTab("outputs")}
          >
            <p>Salidas</p>
          </div>
          <div
            className={`contentpreview__tabs--tab
          ${tabSeletect === "pdf" && "active"}
          
          `}
            onClick={() => handleOnClickTab("pdf")}
          >
            <p>PDF</p>
          </div>
        </div>

        <div className="contentpreview__render">
          {tabSeletect === "infoProduct" && <InformationProduct orderSelectedData={orderSelectedData} />}
          {tabSeletect === "entries" && (
            <EntriesProduct
              dataEntrance={dataEntrance}
              isFetchingEntrance={isFetchingEntrance}
              paginationData={paginationData}
            />
          )}
          {tabSeletect === "outputs" && (
            <OutputsProducts
              dataExit={dataOutputs}
              isFetchingExit={isFetchingExit}
              paginationDataOutput={paginationDataOutput}
            />
          )}
          {tabSeletect === "pdf" && (
            <p>View Pdf</p>
          )}
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
