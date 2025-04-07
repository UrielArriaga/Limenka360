import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { ChatBubbleOutline, Close } from "@material-ui/icons";
import InformationProduct from "../InfomationProduct";
import OutputsProducts from "../OutputsProduct";
import EntriesProduct from "../EntriesProduct";
import InformationBiomedical from "../InfomationBiomedical";
import ReturnsProducts from "../returnsProducts";

export default function InventoryDetails({
  isFetchingData,
  tabSeletect,
  handleOnClickTab,
  productInventorySelected,
  handleOnClickClosePreview,
  orderSelectedData,
  dataEntrance,
  paginationDataEntrance,
  paginationDataOutput,
  dataExit,
  handleOnClickNewRepair,
  isFetchingEntrance,
  isFetchingExit,
  dataId,
  toggleTrackingsModal,
  handleOnClickNewReserve,
  handleOnClickReset,
  dataBiomedical,
  isFetchingBiomedical,
  handleToggleDrawer,
  returnsProducts,
  pagination,
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
  console.log("dataExit:", dataExit);

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">
          {productInventorySelected?.name} ({productInventorySelected?.code})
        </p>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button className="buttonTranckings" onClick={() => toggleTrackingsModal()}>
              Ver Seguimientos
            </Button>
          </div>

          <IconButton onClick={handleOnClickClosePreview} className="close">
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="contentpreview__tabs">
          <div className="contentpreview__tabs__content">
            <div
              className={`contentpreview__tabs__content--tab ${tabSeletect === "infoProduct" && "active"}`}
              onClick={() => handleOnClickTab("infoProduct")}
            >
              <p>Información general</p>
            </div>

            <div
              className={`contentpreview__tabs__content--tab ${tabSeletect === "entries" && "active"}`}
              onClick={() => handleOnClickTab("entries")}
            >
              <p>Entradas</p>
            </div>

            <div
              className={`contentpreview__tabs__content--tab ${tabSeletect === "outputs" && "active"}`}
              onClick={() => handleOnClickTab("outputs")}
            >
              <p>Salidas</p>
            </div>

            <div
              className={`contentpreview__tabs__content--tab ${tabSeletect === "biomedical" && "active"}`}
              onClick={() => handleOnClickTab("biomedical")}
            >
              <p>Biomédica</p>
            </div>
            <div
              className={`contentpreview__tabs__content--tab ${tabSeletect === "outputs" && "active"}`}
              onClick={() => handleOnClickTab("returns")}
            >
              <p>Devoluciones del Articulo</p>
            </div>
          </div>
          <div className="contentpreview__tabs--tabStatus">
            {dataId?.isapart && <p>Apartado</p>}
            {dataId?.statusrepair && <p>En Reparación</p>}
          </div>
        </div>

        <div className="contentpreview__render">
          {tabSeletect === "infoProduct" && <InformationProduct orderSelectedData={orderSelectedData} />}
          {tabSeletect === "entries" && (
            <EntriesProduct
              dataEntrance={dataEntrance}
              isFetchingEntrance={isFetchingEntrance}
              paginationData={paginationDataEntrance}
            />
          )}
          {tabSeletect === "outputs" && (
            <OutputsProducts
              dataExit={dataExit}
              isFetchingExit={isFetchingExit}
              paginationDataOutput={paginationDataOutput}
            />
          )}
          {tabSeletect === "biomedical" && (
            <InformationBiomedical
              dataExit={dataBiomedical}
              isFetchingExit={isFetchingBiomedical}
              handleToggleDrawer={handleToggleDrawer}
              handleOnClickTab={handleOnClickTab}
            />
          )}
          {tabSeletect === "returns" && <ReturnsProducts returnsProducts={returnsProducts} pagination={pagination} />}
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
