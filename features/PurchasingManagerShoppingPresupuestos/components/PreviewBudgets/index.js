import { Close } from "@material-ui/icons";
import React from "react";
import { PreviewBudgetsStyled } from "./styles";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import TableProducts from "./TableProducts";
import { Dot, LoaderWrapper } from "../../../ShoppingOrdenes/components/PreviewPurchase/styled";
import { formatDate } from "../../../../utils";

export default function PreviewBudgets(props) {
  const {
    data,
    dataProduct,
    close,
    toggleProducts,
    isFetchingData,
    toggleProductDelete,
    setDataProductSelected,
    refetchProducts,
    uploadProduct,
  } = props;

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
    <PreviewBudgetsStyled>
      <div className="headerpreview">
        <h4 className="concept">{data?.folio}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item"></div>
          {/* <div className="headerpreview__listactions--item">
            <Button className="button" disabled>
              Actualizar
            </Button>
          </div> */}
          <div className="headerpreview__listactions--item">
            <Tooltip title="Cerrar Vista Previa">
              <IconButton onClick={close}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="contentpreview">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h4>Datos de Presupuesto</h4>
            <p>
              Tipo de Presupuesto: <span>{data?.budgettype}</span>
            </p>
            <p>
              Vigencia: <span>{formatDate(data?.validity)}</span>
            </p>
            <p>
              Creado Por: <span>{data?.createdby?.fullname}</span>
            </p>
          </div>
        </div>
        <div className="contentpreview__products">
          <TableProducts
            toggleProductDelete={toggleProductDelete}
            dataProduct={dataProduct}
            setDataProductSelected={setDataProductSelected}
            refetchProducts={refetchProducts}
            uploadProduct={uploadProduct}
          />
        </div>
        <div className="contentpreview__Actions">
          <Button className="add" onClick={() => toggleProducts()}>
            Agregar Producto
          </Button>
        </div>
      </div>
    </PreviewBudgetsStyled>
  );
}
