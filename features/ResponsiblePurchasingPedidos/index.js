import { Badge, Button, Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search, UpdateSharp } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ActiveFilters from "./components/ActiveFilters";
import FilesOrder from "./components/FilesOrder";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import TrackingsOrder from "./components/TrackingsOrder";
import { filtersOrders } from "./data";
import useDirLogFiles from "./hooks/useDirLogFiles";
import useDirLogPedido from "./hooks/useDirLogPedido";
import useDirLogPedidos from "./hooks/useDirLogPedidos";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import { DirLogDashboardStyled } from "./styles";
import { useSelector } from "react-redux";
import { globalNotificationsSelector } from "../../redux/slices/globalNotificationsSlice";
import { useState } from "react";
import useModal from "../../hooks/useModal";
// import AddProductToOrder from "./components/AddProductToOrder";
// import ProductDelivery from "./components/MarkedDelivery";
import ModalAssingPorder from "../ShoppingOrdenes/components/ModalAssingWereHouse";
import ModalAssingByProduct from "../ShoppingOrdenes/components/ModalAssingByProduct";
// import FilesUpload from "./components/FilesUpload";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import ModalMarkDelivery from "../ShoppingOrdenes/components/ModalMarkDelivery";
import useRejectedShippingsOrders from "./hooks/useRejectedShippingsOrders";
import { useRouter } from "next/router";
import { SocketContext } from "../../context/socketContext";

const useAddProductToOrder = () => {
  const { open, toggleModal } = useModal();
  const [productToOrderSelected, setProductToOrderSelected] = useState([]);

  const handleClickProduct = product => {
    setProductToOrderSelected([product]);
    toggleModal();
  };

  return {
    open,
    toggleModal,
    handleClickProduct,
    productToOrderSelected,
    setProductToOrderSelected,
  };
};

export default function ResponsiblePurchasingPedidos({ isAdmin = false }) {
  const { socket, online } = useContext(SocketContext);

  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);
  console.log("notificationDatanotificationDatanotificationData", notificationData);

  const router = useRouter();
  const { folio } = router.query;
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);

  const {
    isOpenPreview,
    setIsOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    orderBy,
    tableData,
    paginationData,
    totalOrders,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleClickFillOrder,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
    lastFetchDate,
    openModalDelivery,
    toggleModalDelivery,
    markedDeliveryProduct,
    GetSuplaceProducts,
    productsModal,
    // activeFilters,
    // setActiveFilters,
    // handleOnChangeFilter,
  } = useDirLogPedidos(activeFilters, isAdmin, folio);

  const { orderSelectedData, isFetchingOrder, productsData, totalOrdersShopping, getDataOrder } =
    useDirLogPedido(orderSelected);
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
  } = useDirLogTrackings(orderSelected);

  const { openFiles, handleToggleFiles, statesFiles, actionsFiles, paginationFiles } =
    useDirLogFiles(orderSelectedData);

  const { open, toggleModal, handleClickProduct, productToOrderSelected, setProductToOrderSelected } =
    useAddProductToOrder();
  const {
    handleReject,
    setRejectedOptionSelected,
    handleMenuOpen,
    handleRejectOrder,
    anchorEl,
    openRejected,
    closeModalReject,
    handleMenuClose,
    toggleModalRejected,
    handleRemoveRejectOrder,
  } = useRejectedShippingsOrders(orderSelected, refetchData, setIsOpenPreview, orderSelectedData);

  return (
    <DirLogDashboardStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Pedidos <span>({totalOrders})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio de pedido"
            />

            {keyword?.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          <Filters
            filters={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />
          <IconButton className="icon" onClick={() => refetchData()}>
            <Badge
              overlap="rectangular"
              badgeContent={lastNotificationAt && lastNotificationAt > lastFetchDate ? 1 : 0}
              color="primary"
            >
              <Cached />
            </Badge>
          </IconButton>

          <div className={lastNotificationAt && lastNotificationAt > lastFetchDate && "refetchdata"}>
            {lastNotificationAt && lastNotificationAt > lastFetchDate && <p>Tienes nuevos pedidos</p>}
          </div>
        </div>
      </div>

      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />
      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListOrders
                orderSelected={orderSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={totalOrders >= 20 ? 20 : totalOrders}
                isLoading={isFetchingData}
                paginationData={{
                  ...paginationData,
                  total: totalOrders,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  isLoading={isFetchingData}
                  actions={tableData.actions}
                  data={tableData.data}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  rowsLoader={totalOrders >= 20 ? 20 : totalOrders || 20}
                  paginationData={{
                    ...paginationData,
                    total: totalOrders,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewOrder
                  isFetchingOrder={isFetchingOrder}
                  orderSelectedData={orderSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleToggleFiles={handleToggleFiles}
                  productsData={productsData}
                  handleClickFillOrder={handleClickFillOrder}
                  handleClickProduct={handleClickProduct}
                  markedDeliveryProduct={markedDeliveryProduct}
                  isChecked={openModalDelivery}
                  setRejectedOptionSelected={setRejectedOptionSelected}
                  handleReject={handleReject}
                  handleMenuOpen={handleMenuOpen}
                  handleRejectOrder={handleRejectOrder}
                  anchorEl={anchorEl}
                  openRejected={openRejected}
                  closeModalReject={closeModalReject}
                  handleMenuClose={handleMenuClose}
                  toggleModalRejected={toggleModalRejected}
                  handleRemoveRejectOrder={handleRemoveRejectOrder}
                  totalOrdersShopping={totalOrdersShopping}
                  productToOrderSelected={productToOrderSelected}
                  setProductToOrderSelected={setProductToOrderSelected}
                  toggleModal={toggleModal}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <ModalAssingPorder
        open={open}
        handleToggle={toggleModal}
        productToOrderSelected={productToOrderSelected}
        orderSelectedData={orderSelectedData}
        productsData={productsData}
        getDataOrder={getDataOrder}
      />

      <ModalMarkDelivery
        open={openModalDelivery}
        handleToggle={toggleModalDelivery}
        orderDataSelect={orderSelectedData}
        GetSuplaceProducts={GetSuplaceProducts}
        productsModal={productsModal}
      />

      <TrackingsOrder
        open={openTrackings}
        toggleTrackingsModal={toggleTrackingsModal}
        trackingData={trackingData}
        reloadTrackings={reloadTrackings}
        isFetching={isFetching}
        orderSelectedData={orderSelectedData}
        page={page}
        setPage={setPage}
        limit={limit}
        orderBy={orderByTracking}
        setOrderBy={setOrderByTracking}
      />
      <FilesUpload
        idOrder={orderSelectedData?.id}
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={orderSelectedData}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
    </DirLogDashboardStyled>
  );
}
// En general si es la primera parte de que no valoran nuestro trabajo, el concepto en el que nos tienen y hablo en general, con faltas, ratardos y son ellos, en mi defenza sobre ese tema y por lo qyue stoy pasando amigos , mis faltas es de salud jsutificadas, mis retardos por que si vivo lejos la verdad algunos saben como esta el pedo, llego a casa noche pues por cosas de familia, solo es contexto de lo que pasa y por que creo que soninjsutos y me saca de onda que aunque allan motivos justificables, carlos No apoya siempre es de " cualquier cosa avisame, le comentamos que pasa que nos dicen y como se manejkan las cosas y solo dice, PUES QUE TE DIGO", reitero que es independiente a cada unod nosotros por otra parte creo que carlos no dio a resptar el area desde un principio lo cual impide avanzar, no es cosa de hoy esta forma de trabajar siempre fue desde el principio , carlos aveces no sabe ni lo que quiere y no apoya, el esta en su luga de confort. Ana lo tiene catalocado como un wey X, por que por eso no respeta el area por el par empezar por el que nos representa, me gustaria que se lleve acabo el buen de los requerimientos que pide hector, carlor deveria de decir que los tiempo que pide son super minimos t debe de aver al instintivo sobre la carga de trabajo, empezando por uri y de alli en fila como van. carlos se queja de que paenas si se da abasto de las cosas hasta el pide actividad cuando carlos es el que deberia de decir como se va a manejar el proceso, no ve por uriel hasta apenas que lo comentamos ayer no?, la verdad que lo que se hace por lo que segana es el minimo porlomenos todos neta : deberiamos de ganar minimo 17 - o - 20 mil al meso hasta 30 o mas los que saben mas.. pero bueno , hay niveles, y creo que como equipo deberiamos de exigir una metodologia agil real Scrum, home office,trato justo para todos,capacitaciones, obtener el respeto en cuanto a deciciones, un sueldo digno, mas prestaciones, y lo principar sentirnos respaldador por alguien en cuanto a iregularidades en mi caso y algunos con RH para mi esta en duda pedirle a carlos , seria podelo comentar con alguien arriba d carlos o ana.pero vemos comole hacemos
