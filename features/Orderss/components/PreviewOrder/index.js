import React, { useEffect } from "react";
import { Button, Grid, Switch } from "@material-ui/core";
import { ApproveOrderStyle, PreviewOrderStyled } from "./styles";
import InfoAddress from "./InfoAddress";
import InfoBilling from "./InfoBilling";
import TableProducts from "./TableProducts";
import InfoTrackings from "./InfoTrackings";
import usePreviewOrder from "./hooks/usePreviewOrder";
import FilesOrder from "../FilesOrder";
import Select from "react-select";
import { AttachMoney, CheckCircle, Clear, Note } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useActionsOrder from "./hooks/useActionsOrder";

export default function PreviewOrder({
  open,
  onClose,
  orderData,
  trackingsData,
  productsData,
  showPdf,
  handleOnChangeShowPdf,
  refreshTrackings,
  refetch,
}) {
  const { tab, handleTabs, actionsOrder, handleOpenAction, handleDownload } = usePreviewOrder();
  const statusOrder = orderData?.orderstatus?.name;

  return (
    <PreviewOrderStyled anchor={"right"} open={open} onClose={onClose} width={600}>
      <div className="headerpreview">
        <h3>Detalles de pedido</h3>
        <div className="buttons">
          <Button className=" bt download" onClick={() => handleDownload(orderData)}>
            Descargar Orden
          </Button>
          {statusOrder === "Rechazado" && (
            <Button className="bt approve" onClick={() => handleOpenAction("approve")}>
              Aprobar
            </Button>
          )}
          {statusOrder === "Aprobado" && (
            <Button className="bt denied" onClick={() => handleOpenAction("rejected")}>
              Rechazar
            </Button>
          )}
        </div>
      </div>

      <div className="swithview">
        <p>Mostrar vista de PDF</p>
        <Switch checked={showPdf} onChange={e => handleOnChangeShowPdf(e)} />
      </div>

      {showPdf && (
        <div className="pdfview">
          <div className="pdf">
            <iframe src={orderData?.url} width="100%" height="100%" />
          </div>
        </div>
      )}

      {!showPdf && (
        <div className="viewdata">
          <div className="rowinfo">
            <InfoAddress orderData={orderData} />
            <InfoBilling orderData={orderData} />
          </div>
          <div className="tabs">
            <Button className={`tab ${tab === 1 && "active"}`} onClick={() => handleTabs(1)}>
              Productos
            </Button>
            <Button className={`tab ${tab === 2 && "active"}`} onClick={() => handleTabs(2)}>
              Seguimientos
            </Button>
            <Button className={`tab ${tab === 3 && "active"}`} onClick={() => handleTabs(3)}>
              Archivos
            </Button>
          </div>

          {tab === 1 && <TableProducts productsData={productsData} />}
          {tab === 2 && (
            <InfoTrackings orderData={orderData} trackingsData={trackingsData} refreshTrackings={refreshTrackings} />
          )}
          {tab === 3 && <FilesOrder filesFrom={"order"} data={orderData} />}
        </div>
      )}
      <ModalActionsOrder actions={actionsOrder} order={orderData} refetch={refetch} />
    </PreviewOrderStyled>
  );
}

const ModalActionsOrder = props => {
  const { actions, order, refetch } = props;
  const { orderrejected } = useSelector(commonSelector);
  const { rejectReason, handleRejectOrder, handleSelectRejectReason, handleValidateAction } = useActionsOrder({
    order,
    actionsClose: actions,
    refetch: refetch,
  });
  const { getCatalogBy } = useGlobalCommons();
  const { openActions, typeAction, handleCloseActions } = actions;
  const rejectOrder = typeAction === "rejected" ? true : false;

  useEffect(() => {
    getCatalogBy("orderrejected");
    console.log("orden", order);
  }, []);

  return (
    <ApproveOrderStyle open={openActions} onClose={handleCloseActions}>
      <div className="head">
        {rejectOrder ? <Clear className="reject" /> : <CheckCircle className="approve" />}
        <p className="title_head">{rejectOrder ? "Rechazar Pedido" : "Aprobación de Pedido"}</p>
      </div>
      <div className="body">
        <p className="title_body">Datos del Pedido</p>
        <Grid container spacing={2}>
          <Grid md={6} item>
            <p className="title_data">
              <Note /> Folio del Pedido
            </p>
            <p className="data">{order?.folio}</p>
          </Grid>
          <Grid md={6} item>
            <p className="title_data">
              <AttachMoney />
              Monto Total
            </p>
            <NumberFormat
              className="data"
              value={order?.oportunity?.amount}
              thousandSeparator
              displayType="text"
              prefix="$"
            />
          </Grid>
          <Grid md={6} item>
            <p className="title_data">
              <AttachMoney />
              Comisión Total
            </p>
            <NumberFormat
              className="data"
              value={order?.oportunity?.comission}
              thousandSeparator
              displayType="text"
              prefix="$"
            />
          </Grid>
          <Grid md={6} item>
            <p className="title_data">
              <Note />
              Factura
            </p>
            <p className="data">{order?.billing ? "Facturado" : "No Factura"}</p>
          </Grid>
          <Grid md={6} item>
            <p className="title_data">
              <Note />
              Estado de la Orden
            </p>
            <p className="data">{order?.orderstatus?.name}</p>
          </Grid>
          <Grid md={6} item>
            <p className="title_data">
              <Note />
              Observaciones
            </p>
            <p className="data">{order?.observations}</p>
          </Grid>
          {rejectOrder && (
            <Grid md={12} item>
              <p className="title_data">Razón de Rechazo</p>
              <Select
                className={`select_reject ${!rejectReason.id && "required"}`}
                onChange={handleSelectRejectReason}
                isLoading={orderrejected.isFetching}
                options={orderrejected.results}
                placeholder="Selecciona una Opción"
                noOptionsMessage={() => "Sin Opciones"}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.reason}
              />
            </Grid>
          )}
        </Grid>
        <div className="buttons">
          <Button className="bt cancel" onClick={handleCloseActions}>
            Cancelar
          </Button>
          <Button className="bt accept" onClick={() => handleValidateAction(rejectOrder)}>
            {rejectOrder ? "Rechazar" : "Aprobar"}
          </Button>
        </div>
      </div>
    </ApproveOrderStyle>
  );
};
