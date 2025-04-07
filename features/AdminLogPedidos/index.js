import { Badge, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import { SocketContext } from "../../context/socketContext";
import useAlertToast from "../../hooks/useAlertToast";
import { globalNotificationsSelector } from "../../redux/slices/globalNotificationsSlice";
import { api } from "../../services/api";
import ActiveFilters from "./components/ActiveFilters";
import AnimationInputOutput from "./components/AnimationInputOutput";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import ModalAssingWereHouse from "./components/ModalAssingWereHouse";
import PreviewOrder from "./components/PreviewOrder";
import PreviewWareHouseOrder from "./components/PreviewWareHouseOrder";
import TrackingsOrder from "./components/TrackingsOrder";
import { filtersOrders } from "./data";
import useDirLogAssingWereHouse from "./hooks/useDirLogAssingWereHouse";
import useDirLogFiles from "./hooks/useDirLogFiles";
import useDirLogPedido from "./hooks/useDirLogPedido";
import useDirLogPedidos from "./hooks/useDirLogPedidos";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import { OrdersServices } from "./services";
import { DirLogDashboardStyled } from "./styles";
import useRejectedDirLogOrders from "./hooks/useRejectedDirLogOrders";
import ModalMarkDelivery from "./components/ModalMarkDelivery";
import ProductQuantityModal from "./components/ProductQuantityModal";
import useProductQuantityModal from "./hooks/useProductQuantityModal";
import useNotifications from "../../hooks/useNotifications";

export default function AdminLogPedidos({ isAdmin = false, status }) {
  const { socket, online } = useContext(SocketContext);
  const { pushNotification } = useNotifications();

  const ordersService = new OrdersServices();
  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);

  const {
    isOpenPreview,
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
    setIsOpenPreview,
    markedDeliveryProduct,
    openModalDelivery,
    toggleModalDelivery,
    GetSuplaceProducts,
    productsModal,
    statusPoo,
    // activeFilters,
    // setActiveFilters,
    // handleOnChangeFilter,
  } = useDirLogPedidos(activeFilters, isAdmin, status, setActiveFilters);

  const {
    actionsPedido,
    statesPedido,
    orderSelectedData,
    isFetchingOrder,
    productsData,
    refetchPedido,
    handleClickAssing,
    handleSaveStatusPooToOrder,
    handleOnClickApprovedOrder,
    getProductsSerial,
    serialProducts,
  } = useDirLogPedido(orderSelected, statusPoo);
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

  const { openFiles, handleToggleFiles, paginationFiles, statesFiles, actionsFiles } =
    useDirLogFiles(orderSelectedData);

  const { showAlertError, showAlertSucces } = useAlertToast();

  const [werehouseProducts, setWerehouseproducts] = useState({
    results: [],
    total: 0,
    isFetching: false,
    isError: false,
  });

  const getAvailableWereHousesByProduct = async producId => {
    try {
      let params = {
        limit: 10000,
        where: {
          productIds: [producId],
        },
      };
      let resp = await api.get(`/warehouseproducts/availability`, {
        params,
      });

      setWerehouseproducts({
        results: resp.data.results,
        total: resp.data.total,
        isFetching: false,
        isError: false,
      });
    } catch (error) {}
  };

  const {
    openWereHouses,
    handleToggleWereHouses,
    warehouses,
    setWharehousSelected,
    handleAssing,
    wharehousSelected,
    finalProducts,
  } = useDirLogAssingWereHouse(orderSelected, productsData);

  const [productsDataX, setProductsDataX] = useState({
    results: [],
    total: 0,
    isFetching: false,
    isError: false,
  });

  const [productsAvailablesByHouse, setProductsAvailablesByHouse] = useState({
    results: [],
    total: 0,
    isFetching: false,
    isError: false,
  });

  useEffect(() => {
    fetchProducts();
  }, [orderSelectedData?.oportunityId]);

  const ordenarProductosPorPaquete = productos => {
    // Filtra los paquetes y productos

    const paquetes = productos.filter(producto => producto?.product?.ispackage);
    const otrosProductos = productos.filter(producto => !producto?.product?.ispackage);

    // Crear un mapa para agrupar productos por su `productpackageId`
    const productosPorPaquete = {};
    otrosProductos.forEach(producto => {
      if (producto.productpackageId) {
        if (!productosPorPaquete[producto.productpackageId]) {
          productosPorPaquete[producto.productpackageId] = [];
        }
        productosPorPaquete[producto.productpackageId].push(producto);
      }
    });

    // Ordena los productos con los paquetes y sus productos
    const resultado = [];
    paquetes.forEach(paquete => {
      resultado.push(paquete); // Añadir el paquete primero
      // Añadir los productos asociados al paquete
      if (productosPorPaquete[paquete.id]) {
        resultado.push(...productosPorPaquete[paquete.id]);
      }
    });

    // Agrega los productos que no están asociados a ningún paquete
    const productosSinPaquete = otrosProductos.filter(
      producto => !producto.productpackageId && !producto.product.ispackage
    );
    resultado.push(...productosSinPaquete);

    return resultado;
  };

  const fetchProducts = async () => {
    try {
      if (!orderSelectedData.oportunityId) return;

      setProductsDataX(prev => ({ ...prev, isFetching: true }));
      const resProducts = (await ordersService.getProductsOrder(orderSelectedData.oportunityId)).data?.results || [];

      let normalizeProducts = resProducts?.map((item, index) => ({
        ...item,
        id: index,
        isComplete: false,
        totalToExit: 0,
        wherehousesavailability: [],
      }));

      //
      //filter ENVIO-UA no mostrar
      const annularENVIO = resProducts.filter(product => product.product.code !== "ENVIO-UA");
      fetchAvailableWereHousesByProducts(annularENVIO);
      setProductsDataX(prev => ({ ...prev, results: ordenarProductosPorPaquete(annularENVIO), isFetching: false }));
    } catch (error) {
      setProductsDataX(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
    }
  };

  const fetchAvailableWereHousesByProducts = async resProducts => {
    let ids = resProducts.map(item => item.productId);
    try {
      let params = {
        limit: 10000,

        where: {
          productIds: ids,
        },
      };
      let resp = await api.get(`/warehouseproducts/availability`, {
        params,
      });

      setProductsAvailablesByHouse({
        results: resp.data.results,
        total: resp.data.total,
        isFetching: false,
        isError: false,
      });

      let disponibilidadporporudcto = resProducts;

      for (let index = 0; index < disponibilidadporporudcto.length; index++) {
        const elementToAddWereHouse = disponibilidadporporudcto[index];
        //

        let element = resp.data.results.filter(item => item.productId === elementToAddWereHouse.productId);

        let newElement = element.map(item => {
          return {
            ...item,
            totalToExit: 0,
          };
        });

        elementToAddWereHouse.wherehousesavailability = newElement || [];
      }

      setProductsDataX(prev => ({
        ...prev,
        results: ordenarProductosPorPaquete(disponibilidadporporudcto),
        isFetching: false,
      }));
    } catch (error) {}
  };

  const handleOnClickSaveOrder = async () => {
    try {
      let products = productsDataX.results;

      if (products.every(product => product.totalToExit > 0)) {
      }

      let objects = [];
      for (let i = 0; i < products.length; i++) {
        const productOportunity = products[i];

        if (productOportunity.totalToExit > 0) {
          productOportunity.wherehousesavailability.forEach(warehouse => {
            if (warehouse.totalToExit > 0) {
              objects.push({
                productId: productOportunity.product.id,
                warehouseId: warehouse.warehouseId,
                orderId: orderSelectedData.id,
                productOportunityId: productOportunity?.id,
                statuswho: "asignado",
                folio: orderSelected?.folio,
                totalorder: warehouse.totalToExit,
              });
            }
          });
        }
      }

      for (let i = 0; i < objects.length; i++) {
        const element = objects[i];

        let resp = await api.post("warehouseorders", element);
      }

      let resp = await ordersService.updateOrderStatus(orderSelectedData.id, "por surtir");
      fetchProducts();

      // socket?.emit("newnotification", {
      //   orderId: orderSelectedData?.id,
      //   message: "Pedido asignado por administrador de logistica",
      //   notificationtype: "asignado",
      // });

      refetchData();
      refetchPedido();
      showAlertSucces("Pedido asignado correctamente");

      pushNotification(typeSockets.new_order_warehouse.value, {
        folio: orderSelectedData?.folio,
        orderId: orderSelectedData?.id,
        warehousesorders: objects,
      });
    } catch (error) {
      showAlertError("Error al asignar pedido");
    }
  };

  const [productoportunityorder, setproductoportunityorder] = useState(null);

  const handleOnClickViewProduct = async product => {
    setproductoportunityorder(product);

    fetchWareHoseOrderByOrder(product);
  };

  const [warehouseorders, setWarehouseorders] = useState([]);

  const fetchWareHoseOrderByOrder = async product => {
    try {
      let params = {
        include: "warehouse",
        where: {
          productId: product.product.id,
          orderId: orderSelectedData.id,
        },
      };

      let resp = await api.get(`warehouseorders`, {
        params,
      });

      setWarehouseorders(resp.data.results);
    } catch (error) {}
  };

  const {
    handleMenuClose,
    handleMenuOpen,
    handleRejectOrder,
    anchorEl,
    openRejected,
    closeModalReject,
    handleReject,
    toggleModalRejected,
    setRejectedOptionSelected,
  } = useRejectedDirLogOrders(orderSelected, refetchData, setIsOpenPreview, orderSelectedData);

  const { isOpen, openModal, closeModal, handleOnClickProduct } = useProductQuantityModal();

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
              placeholder="Buscar por folio, producto"
            />

            {keyword.length > 3 && (
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
                  typeActions="icon"
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
            <Grid item md={9} className="preview">
              <AnimatePresence>
                <div style={{ overflow: "hidden" }}>
                  {productoportunityorder ? (
                    <AnimationInputOutput key="previewWareHouseOrder">
                      <PreviewWareHouseOrder
                        isFetchingOrder={isFetchingOrder}
                        orderSelectedData={orderSelectedData}
                        productsData={productsDataX}
                        actionsPedido={actionsPedido}
                        statesPedido={statesPedido}
                        handleOnClickViewProduct={handleOnClickViewProduct}
                        warehouseorders={warehouseorders}
                      />
                    </AnimationInputOutput>
                  ) : (
                    <motion.div
                      key="previewOrder"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PreviewOrder
                        isFetchingOrder={isFetchingOrder}
                        orderSelectedData={orderSelectedData}
                        handleOnClickClosePreview={handleOnClickClosePreview}
                        toggleTrackingsModal={toggleTrackingsModal}
                        handleToggleFiles={handleToggleFiles}
                        productsData={productsDataX}
                        handleClickFillOrder={handleToggleWereHouses}
                        refetchPedido={refetchPedido}
                        getAvailableWereHousesByProduct={getAvailableWereHousesByProduct}
                        werehouseProductsData={werehouseProducts}
                        actionsPedido={actionsPedido}
                        statesPedido={statesPedido}
                        handleToggleWereHouses={handleToggleWereHouses}
                        handleOnClickSaveOrder={handleOnClickSaveOrder}
                        handleOnClickViewProduct={handleOnClickViewProduct}
                        markedDeliveryProduct={markedDeliveryProduct}
                        handleRejectOrder={handleRejectOrder}
                        handleMenuOpen={handleMenuOpen}
                        handleMenuClose={handleMenuClose}
                        anchorEl={anchorEl}
                        openRejected={openRejected}
                        closeModalReject={closeModalReject}
                        handleReject={handleReject}
                        toggleModalRejected={toggleModalRejected}
                        setRejectedOptionSelected={setRejectedOptionSelected}
                        handleOnClickProduct={handleOnClickProduct}
                        openModal={openModal}
                        handleOnClickApprovedOrder={handleOnClickApprovedOrder}
                        getProductsSerial={getProductsSerial}
                        serialProducts={serialProducts}
                      />
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </Grid>
          )}
        </Grid>
      </div>
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

      <ModalMarkDelivery
        open={openModalDelivery}
        handleToggle={toggleModalDelivery}
        orderDataSelect={orderSelectedData}
        GetSuplaceProducts={GetSuplaceProducts}
        productsModal={productsModal}
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

      <ModalAssingWereHouse
        open={openWereHouses}
        handleToggle={handleToggleWereHouses}
        warehousesData={warehouses}
        setWharehousSelected={setWharehousSelected}
        selectedWarehouse={wharehousSelected}
        handleAssing={handleAssing}
        productsData={productsDataX}
        setProductsDataX={setProductsDataX}
        orderId={orderSelectedData?.id}
      />

      <ProductQuantityModal
        open={isOpen}
        onClose={closeModal}
        handleSaveStatusPooToOrder={handleSaveStatusPooToOrder}
      />
    </DirLogDashboardStyled>
  );
}
