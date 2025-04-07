import { Button, CircularProgress, IconButton } from "@material-ui/core";
import { AttachFile, BubbleChart, ChatBubbleOutline, CheckCircle, Close, FiberManualRecord } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import AddressInfo from "../../../DirLogPedidos/components/PreviewOrder/AddressInfo";
import BillingInfo from "../../../DirLogPedidos/components/PreviewOrder/BillingInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import MenuOptions from "../MenuOptions";
import TrackinsHistory from "../TrackingsHistory";
import { useSelector } from "react-redux";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  handleOnClickFloorManager,
  toggleTrackingsModal,
  productsData,
  handleClickProduct,
  handleOnClickNewExit,
  products,
  ShippingsData,
  handleClickDeleteProduct,
  handleAddArticleToProduct,
  handleOnChangeComments,
  anchorEl,
  handleMenuClose,
  handleMenuOpen,
  handleArticle,
  handleDeleteArticle,
  isCompleteWHOrder,
  sendRequest,
  handleIsNotApart,
  setMaxSelection,
  handleToggleFiles,
}) {
  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  const getMenuOptions = () => {
    return [
      { label: "Cambiar estatus a en piso", action: handleOnClickFloorManager },
    ];
  };
  const postsTrakings = useSelector(state => state.postsTrakings);
  const { loading } = postsTrakings;
  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>

        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <Button
              className={`${isCompleteWHOrder ? "disabled" : "button"}`}
              disabled={isCompleteWHOrder}
              onClick={() => handleOnClickNewExit(products)}
              style={{ width: "160px", height: "39px" }}
            >
              {loading ? <CircularProgress style={{ color: "#fff" }} size={20} /> : "Asignar Seriales"}
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
          <div className="headerpreview__listactions--item">
            <MenuOptions
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              options={getMenuOptions()}
            />
          </div>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>

      <div className="contentpreview">
        <div className="headerinstructions">
          <BubbleChart className="icon" />
          <p className="guide">
            ¿CÓMO CONTINUAR?
            <span className="guidedescription">
              {" "}
              Para enviar solicitud, asignar el número de serie al producto y seleccionar artículos por número de serie,
              asigna un comentario y para finalizar, selecciona enviar solicitud.
            </span>
          </p>
        </div>
        <div className="rowprevalig">
          <div>
            <h4>Orden de Venta</h4>
            <p>
              Folio de Order <span>{orderSelectedData?.folio}</span>
            </p>
            <p>
              Fecha del Pedido <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
            </p>
            <p>
              Ejecutivo: <span>{orderSelectedData?.createdbyid?.fullname}</span>
            </p>
            <p>
              Grupo: <span>{orderSelectedData?.createdbyid?.group?.name}</span>{" "}
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              background: getColorStatusOrder(orderSelectedData?.exitstatus).bgColor,
              borderRadius: 15,
              padding: "5px 10px",
            }}
          >
            <p style={{ fontSize: 12, color: getColorStatusOrder(orderSelectedData?.exitstatus).color }}>
              {orderSelectedData?.exitstatus}
            </p>
          </div>
        </div>

        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <AddressInfo orderSelectedData={orderSelectedData} ShippingsData={ShippingsData.results} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>

        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Codigo</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                <div className="tablehead center">
                  <p>Cantidad Solicitada</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {productsData?.results?.map((productOportunity, index) => (
                  <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                    <div className="tablerow">
                      <div className="tablecell code">{productOportunity?.product?.code}</div>
                      <div className="tablecell tableheadproductrow">
                        <div className="content">{productOportunity?.product?.name}</div>
                      </div>
                      <div className="tablecell center">{productOportunity?.totalorder}</div>
                      <div className="tablecell actions">
                        <div>
                          {productOportunity?.totalorder === productOportunity?.total ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <p>Asignado </p>
                              <CheckCircle
                                style={{
                                  color: "green",
                                }}
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                handleClickProduct(productOportunity), setMaxSelection(productOportunity?.totalorder);
                              }}
                            >
                              {productOportunity?.isComplete
                                ? "Completo"
                                : productOportunity?.isMajor
                                ? "Mayor"
                                : "Asignar No. Serie"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="tablelist">
                      {productOportunity?.articles?.map((article, index) => (
                        <div className="tablelititem" key={index}>
                          <div className="description">
                            <FiberManualRecord className="icon" />
                            <p
                              onClick={() => handleAddArticleToProduct(productOportunity, article, false)}
                              className="serialnumber"
                            >
                              {article?.serialnumber}
                            </p>

                            <p className="name">
                              {article?.product?.name}
                              <span style={{ color: "#50C878" }}>
                                {article?.isapart == true ? " (Se marcara como apartado)" : ""}
                              </span>
                            </p>
                          </div>
                          <textarea
                            onChange={e => handleOnChangeComments(productOportunity, article, e.target.value)}
                            value={article?.comments}
                            placeholder="Comentarios"
                            rows="4"
                          />

                          <div className="contentMenu">
                            <MenuOptions
                              handleMenuOpen={handleMenuOpen}
                              anchorEl={anchorEl}
                              handleMenuClose={handleMenuClose}
                              handleArticle={handleArticle}
                              options={getMenuOptions()}
                              productOportunity={productOportunity}
                              article={article}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="tablelistsaved">
                      {productOportunity?.articlessaved?.map((article, index) => (
                        <div className="tablelititem" key={index}>
                          <div className="description">
                            <FiberManualRecord className="icon" />
                            <p className="serialnumber">{article?.serialnumber}</p>

                            <p className="name">{article?.product?.name}</p>
                          </div>
                          <textarea disabled value={article?.comments} placeholder="Comentarios" rows="4" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="observations">
          <div>
            <h4>Observaciones Generales</h4>
            <p className="text_observations">{orderSelectedData?.observations || "Sin observaciones"}</p>
          </div>
          <NewTrackinsOrder orderData={orderSelectedData} />
        </div>
      </div>
    </PreviewOrderStyled>
  );
}
