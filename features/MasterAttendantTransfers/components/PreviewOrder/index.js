import { Button, IconButton } from "@material-ui/core";
import { Close, Create, Info } from "@material-ui/icons";
import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import DetailsTransfer from "./DetailsTransfer";
import { userSelector } from "../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import useAlertToast from "../../../../hooks/useAlertToast";

export default function PreviewOrder({
  isFetching:{isFetching, fetching},
  handleOnClickClosePreview,
  selectedTransfer,
  productsTransfer,
  createExitArticles,
  createEntryArticles,
}) {
  const { userData } = useSelector(userSelector);
  const { showAlertWarning } = useAlertToast();

  if (isFetching || fetching) {
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
        <p className="concept">{selectedTransfer?.folio}</p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              onClick={() => {
                if (productsTransfer[0]?.warehouseproduct?.intransit != true) {
                  createExitArticles();
                } else {
                  showAlertWarning("No puedes volver a generar la salida del articulo de traspaso");
                }
              }}
              className="button"
              startIcon={<Create className="icon" />}
              disabled={selectedTransfer?.data?.status === "completado" ? true : false}
            >
              <p className="text">Generar Salida</p>
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
          <Button
  onClick={() => {
    if (userData?.warehouse?.name === selectedTransfer?.entrywarehouse) {
      if (productsTransfer[0]?.warehouseproduct?.intransit === true) {
        createEntryArticles();
      } else {
        showAlertWarning("Debes de Generar la salida de los artículos");
      }
    } else {
      showAlertWarning(`Solo usuarios del: ${selectedTransfer?.entrywarehouse} pueden generar entrada.`);
    }
  }}
  className={`button entry ${
    selectedTransfer?.data?.status === "completado" ||
    userData?.warehouse?.name !== selectedTransfer?.entrywarehouse
      ? "button-disabled"
      : ""
  }`}
  startIcon={<Create className="icon" />}
  disabled={
    selectedTransfer?.data?.status === "completado" ||
    userData?.warehouse?.name !== selectedTransfer?.entrywarehouse
  }
>
  Crear Entrada
</Button>
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="headerinstructions">
          <Info className="icon" />
          <p className="guide">
            Informacion
            <span className="guidedescription">Tabla de los productos seleccionados para el traspado</span>
          </p>
        </div>

        <div className="rowprevalig">
          <div className="contentpreview__clientinfo">
            <p className="contentpreview__clientinfo--title">Datos del Traspaso</p>
            <DetailsTransfer selectedTransfer={selectedTransfer} />
          </div>
        </div>

        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Num.Serie</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                <div className="tablehead center">
                  <p>Codigo</p>
                </div>
                <div className="tablehead center">
                  <p>Cantidad</p>
                </div>
              </div>

              <div className="tablebody">
                {productsTransfer?.map((productTransfer, index) => {
                  const article = productTransfer?.warehouseproduct;
                  const product = productTransfer?.warehouseproduct?.product;
                  const isSelected = productTransfer?.id === selectedTransfer?.id;

                  return (
                    <div key={`${productTransfer?.id}-${index}`}>
                      <div className={`tablerow ${isSelected && "selected"}`}>
                        <div className="tablecell code">{article?.serialnumber}</div>
                        <div className="tablecell tableheadproductrow">
                          <div className="content">{product?.name}</div>
                        </div>
                        <div className="tablecell center">{product?.code}</div>
                        <div className="tablecell center">1</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
