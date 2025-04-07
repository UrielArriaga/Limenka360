import { Button, IconButton } from "@material-ui/core";
import { Close, Create, Info } from "@material-ui/icons";
import React from "react";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import DetailsTransfer from "./DetailsTransfer";

export default function PreviewOrder({
  isFetching,
  handleOnClickClosePreview,
  selectedTransfer,
  productsTransfer,
  createExitArticles
}) {
  if (isFetching) {
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
                createExitArticles();
              }}
              className="button"
              startIcon={<Create className="icon" />}
            >
              <p className="text">Generar Salida</p>
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
