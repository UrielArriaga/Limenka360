import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { ChatBubbleOutline, Close } from "@material-ui/icons";
import InformationProduct from "../InfomationProduct";
import OutputsProducts from "../OutputsProduct";
import EntriesProduct from "../EntriesProduct";
import ReturnsProducts from "../returnsProducts";

export default function InventoryDetails({
  isFetchingData,
  tabSeletect,
  handleOnClickTab,
  productInventorySelected,
  handleOnClickClosePreview,
  orderSelectedData,
  dataEntrance,
  dataExit,
  handleOnClickNewRepair,
  isFetchingEntrance,
  isFetchingExit,
  dataId,
  toggleTrackingsModal,
  handleOnClickNewReserve,
  handleOnClickReset,
  handleOnClickSelectArticle,
  returnsProducts,
  pagination
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
        <p className="concept">{productInventorySelected?.name}</p>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Tooltip title="Restablecer valores del producto">
              <Button className="buttonTrans" onClick={() => handleOnClickReset(productInventorySelected)}>
                Restablecer
              </Button>
            </Tooltip>
          </div>
          <div className="headerpreview__listactions--item">
            <Button onClick={() => handleOnClickSelectArticle(productInventorySelected)} className="buttonTrans">
              Transpasar
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              disabled={dataId?.statusrepair == true || (dataId.isapart == true && true)}
              className={dataId?.statusrepair !== true && dataId?.isapart !== true ? "buttonRepair" : "disabled"}
              onClick={() => handleOnClickNewRepair(productInventorySelected)}
            >
              Mover a Reparaciones
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
            <Button
              disabled={dataId.statusrepair == true || (dataId.isapart == true && true)}
              className={dataId?.statusrepair !== true && dataId?.isapart !== true ? "buttonRepair" : "disabled"}
              onClick={() => handleOnClickNewReserve(productInventorySelected)}
            >
              Apartar Articulo
            </Button>
          </div>
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
              <p>Informacion general</p>
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
              className={`contentpreview__tabs__content--tab ${tabSeletect === "outputs" && "active"}`}
              onClick={() => handleOnClickTab("returns")}
            >
              <p>Devoluciones del Articulo</p>
            </div>
          </div>
          <div className="contentpreview__tabs--tabStatus">
            {dataId?.isapart && <p>Apartado</p>}
            {dataId?.statusrepair && <p>En Reparacion</p>}
          </div>
        </div>

        <div className="contentpreview__render">
          {tabSeletect === "infoProduct" && <InformationProduct orderSelectedData={orderSelectedData} />}
          {tabSeletect === "entries" && (
            <EntriesProduct dataEntrance={dataEntrance} isFetchingEntrance={isFetchingEntrance} />
          )}
          {tabSeletect === "outputs" && <OutputsProducts dataExit={dataExit} isFetchingExit={isFetchingExit} />}
          {tabSeletect === "returns" && <ReturnsProducts returnsProducts={returnsProducts} pagination={pagination}/>}
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
