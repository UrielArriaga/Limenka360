import React from "react";
import { PreviewProductStyled, LoaderWrapper, Dot } from "./styles";
import { Button, IconButton, } from "@material-ui/core";
import { Close, Print,AttachFile } from "@material-ui/icons";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
export default function PreviewProduct({
  productSelect,
  isFetchingProduct,
  handleOnClickClosePreview,
  handleOnClickRepair,
  handleOnClickTraking,
  handleOnClickReviwed,
  handleToggleFiles,
  tableDataTrakings,
  isFetchingTraking,
  totalTrakigs,
  paginationDataTrackigs,
  handleOnClickRowTraking,
  handleOnClickReview,
}) {
  if (isFetchingProduct) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }

  const handlePrintFormat = url => {
    window.open(url, "_blank");
  };

  const model = productSelect?.code;
  const category = productSelect?.category;
  const serialNumber = productSelect?.serialnumber;
  const brand = productSelect?.brand;
  const description = productSelect?.product;
  const revised = productSelect?.reviewed;
  const reparation = productSelect?.statusrepair;
  const updatedAt = productSelect?.updatedAt;
  const urlFormat = productSelect?.reviewformatURL;
  
  return (
    <PreviewProductStyled>
      <div className="headerprview">
        <div className="product">
          <p className="text">
            {productSelect.product} <strong>({productSelect.serialnumber})</strong>
          </p>
        </div>
        <div className="btn-headers">
         
          <Button
            disabled={productSelect?.reviewed == "Revisado"}
            className={productSelect?.reviewed !== "Revisado" ? "btn_reviwed" : "disabled"}
            onClick={() => handleOnClickReview(productSelect)}
          >Marcar como revisado
          </Button>
          <Button className="btn_traking" onClick={() => handleOnClickTraking(productSelect)}
            >Agregar Seguimiento
          </Button>
          <Button className="btn_traking"
            /*disabled={productSelect?.statusrepair == "En buen estado"}
            className={productSelect?.statusrepair !== "En buen estado" ? "btn_status" : "disabled"}*/
            onClick={() => handleOnClickRepair(productSelect)}
          >Cambiar Status
          </Button>
          {productSelect?.reviewformatURL ? (
            <Button className="btn-print-format" onClick={() => handlePrintFormat(productSelect.reviewformatURL)}>
              <Print /> &nbsp; Imprimir
            </Button>
          ) : (
            <Button className="disabled">
              <Print /> Imprimir
            </Button>
          )}
            <Button className="btn-print-format" onClick={() => handleToggleFiles()}>
             <AttachFile/>Adjuntos
          </Button>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
       
        </div>
      </div>
      <div className="ctr_data_Revised">
        <h3> Datos de revisión</h3>

        <div className="info"> 

        <div className="formDataRevised">
        <p> Modelo: <span> {model}</span></p>
        <p> Category: <span> {category}  </span></p>
        <p> Número de Serie: <span> {serialNumber}  </span></p>
        <p> Marca: <span> {brand}  </span></p>
        </div>

        <div className="formDataRevised">
          <p> Descripción: <span> {description} </span> </p>
          <p> Estatus de Revisión: <span> {revised} </span> </p>
          <p> Estatus de Reparación: <span> {reparation} </span> </p>
          <p> Fecha de Entrada: <span> {updatedAt} </span> </p>
        </div>
      </div>
        </div>
      <div className="ctr_container">
        <h3>
          Seguimientos <span>( Total {totalTrakigs})</span>
        </h3>
        <div className="ctr_table">
          {tableDataTrakings.dataTracking && tableDataTrakings.dataTracking.length > 0 ? (
            <TableLimenkaGeneral
              onRowClick={item => handleOnClickRowTraking(item)}
              heads={tableDataTrakings.heads}
              data={tableDataTrakings.dataTracking}
              mainColumn={"Fecha"}
              typeTable="border"
              isLoading={isFetchingTraking}
              rowsLoader={totalTrakigs >= 10 ? 10 : totalTrakigs}
              customColumns={tableDataTrakings.customColumns}
              paginationDataTrackigs={{
                ...paginationDataTrackigs,
                total: totalTrakigs,
              }}
            />
          ) : (
            <p>Aún no hay datos disponibles.</p>
          )}
        </div>
      </div>
    </PreviewProductStyled>
  );
}
