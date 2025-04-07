import React from "react";
import { Dot, LoaderWrapper, PreviewRecolecionStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, Close, Edit } from "@material-ui/icons";
import InformationProductRecolecion from "../InformationProductRecolecion";
import OutputsProducts from "../OutputsProductRecolecion";
import EntriesProduct from "../EntriesProductRecolecion";
import { useRouter } from "next/router";

export default function RecolecionDetails({
  handleOnClickClosePreview,
  // handleToggleFiles,
  // productsData,
  tabSeletect,
  handleOnClickTab,
  isFetchingData,
  // orderSelectedData,
  // dataEntrance,
  // isFetchingEntrance,
  // dataOutputs,
  // isFetchingExit,
  // paginationData,
  // paginationDataOutput,
  pickupsSelect,
  pickuppurchaseorderData,
  suppliesData,
  suppliesWarehouseProducts,
}) {
  const router = useRouter();
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
      {/* <div className="headerpreview">
        <h4 className="concept">{pickupsSelect?.folio}</h4>
        <Tooltip title="Cerrar Vista Previa">
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </Tooltip>
      </div> */}

      <div className="headerpreview">
        <h4 className="concept">{pickupsSelect?.folioOrder}</h4>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              className="button"
              onClick={() => {
                localStorage.setItem("suppliesData", JSON.stringify(suppliesData));
                router.push({
                  pathname: "recolecciones/nuevaentrada",
                  query: { pickupId: pickupsSelect?.id },
                });
              }}
            >
              Generar Entrada
            </Button>
          </div>

          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
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
          {tabSeletect === "infoProduct" && (
            <InformationProductRecolecion
              pickupsSelect={pickupsSelect}
              pickuppurchaseorderData={pickuppurchaseorderData}
              suppliesData={suppliesData}
              suppliesWarehouseProducts={suppliesWarehouseProducts}
            />
          )}
        </div>
      </div>
    </PreviewRecolecionStyled>
  );
}
