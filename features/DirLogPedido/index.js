import React from "react";
import { Button, Fab, IconButton, LinearProgress } from "@material-ui/core";
import { AttachFile, Attachment, ChatBubbleOutline, Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { ORDERSTATUS_ALMACEN } from "../../constants";
import { formatNumber } from "../../utils";
import { getColor } from "./utils";
import { DirLogVerPedidoStyles, LoaderWrapper, Dot } from "./styles";
import useDirLogPedidoSelected from "./hooks/useDirLogPedidoSelected";
import useDirLogPedidoId from "./hooks/useDirLogPedidoId";
import BillingInfo from "./components/BillingInfoPedido";
import AddressInfo from "./components/AddressInfoPedido";
import { useRouter } from "next/router";
import useDirLogFiles from "./hooks/useDirLogFiles";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import TrackingsOrder from "./components/TrackingsOrder";
import useDirLogTrackings from "./hooks/useDirLogTrackings";

function DirLogVerPedido(props) {
  const { pedido } = props;
  const { dataOrders, handleClickFillOrder } = useDirLogPedidoId(pedido);
  const { productsData, refetchPedido } = useDirLogPedidoSelected(dataOrders?.data);
  const {
    openTrackings,
    toggleTrackingsModal,
    trackingData,
    reloadTrackings,
    isFetching,
    page,
    setPage,
    limit,
    orderByTracking,
    setOrderByTracking,
  } = useDirLogTrackings(dataOrders?.data);
  const { openFiles, handleToggleFiles, filesData, handleRefetchFiles } = useDirLogFiles(dataOrders?.data);

  if (dataOrders?.isFetching) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  const router = useRouter();
  const isMarked = dataOrders?.data?.exitstatus === ORDERSTATUS_ALMACEN.revisado;
  const isNew = dataOrders?.data?.exitstatus === ORDERSTATUS_ALMACEN.pedidonuevo;

  return (
    <DirLogVerPedidoStyles>
      <div className="headerpreview">
        <p className="concept">
          {dataOrders?.data?.folio}
        </p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              disabled={isMarked || !isNew}
              className={` button ${(isMarked || !isNew) && "buttondisabled"}`}
                onClick={() => handleClickFillOrder(refetchPedido)}
            >
              Asignar Almacen
            </Button>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab">
          <p className="tab__title">Información General</p>
        </div>

        <div className="tab">
          <p className="tab__title">Documentos</p>
        </div>

        <div className="tab">
          <p className="tab__title">Comentarios</p>
        </div>
      </div>

      <div className="contentpreview">
        <div className="rowprevalig">
          <div>
            <h4>Orden de Venta</h4>
            <p>
              Folio de Orden: <span>{dataOrders?.data?.folio}</span>
            </p>
            <p>
              Fecha del Pedido: <span>{dayjs(dataOrders?.data?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              background: getColor(dataOrders?.data?.warehousesstatus?.name).bgColor,
              borderRadius: 15,
              padding: "5px 10px",
            }}
          >
            <p style={{ fontSize: 12, color: getColor(dataOrders?.data?.warehousesstatus?.name).color }}>
              {dataOrders?.data?.warehousesstatus?.name}
            </p>
          </div>
        </div>

        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <AddressInfo orderSelectedData={dataOrders?.data} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={dataOrders?.data} />
          </div>
        </div>
        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody className="bodyTable">
                {productsData.isFetching ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      <div className="load">
                        <div className="load__img">
                          <img src="/load.png" />
                        </div>
                        <div className="content_loadtext">
                          <p>Cargando Productos</p>
                          <LinearProgress color="primary" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  productsData.results.map((productOportunity, index) => (
                    <tr key={index}>
                      <td>{productOportunity.product.code}</td>
                      <td>{productOportunity.product.name}</td>
                      <td>{productOportunity.quantity}</td>
                      <td>{productOportunity.product.stock}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="contentpreview__amounts">
            <div className="row">
              <p>Subtotal: </p>
              <p> {formatNumber(dataOrders?.data?.oportunity?.subtotal)}</p>
            </div>
          </div>
        </div>
      </div>

      <Fab variant="extended">
        <Attachment />
        Navigate
      </Fab>

      <TrackingsOrder
        open={openTrackings}
        toggleTrackingsModal={toggleTrackingsModal}
        trackingData={trackingData}
        reloadTrackings={reloadTrackings}
        isFetching={isFetching}
        orderSelectedData={dataOrders?.data}
        page={page}
        setPage={setPage}
        limit={limit}
        orderBy={orderByTracking}
        setOrderBy={setOrderByTracking}
      />
      <FilesUpload
        open={openFiles}
        handletoogle={handleToggleFiles}
        filesData={filesData}
        idOrder={dataOrders?.data?.id}
        refetch={handleRefetchFiles}
        orderData={dataOrders?.data}
      />
    </DirLogVerPedidoStyles>
  );
}

export default DirLogVerPedido;
