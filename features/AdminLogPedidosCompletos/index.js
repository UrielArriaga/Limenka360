import { Badge, Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search, UpdateSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
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
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import useDirLogAssingWereHouse from "./hooks/useDirLogAssingWereHouse";
import ModalAssingWereHouse from "./components/ModalAssingWereHouse";
import { api } from "../../services/api";
import { OrdersServices } from "./services";
import PreviewWareHouseOrder from "./components/PreviewWareHouseOrder";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimationInputOutput from "./components/AnimationInputOutput";

export default function AdminLogPedidosCompletos({ isAdmin = false, status }) {
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
  } = useDirLogPedido(orderSelected);
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

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [orderSelectedData?.oportunityId, refetch]);

  const fetchProducts = async () => {
    try {
      if (!orderSelectedData.oportunityId) return;

      setProductsDataX(prev => ({ ...prev, isFetching: true }));
      const resProducts = (await ordersService.getWarehouseproducts(orderSelectedData?.id)).data?.results || [];

      // console.log(resProducts, "la orden y su información");

      fetchAvailableWereHousesByProducts(resProducts);
      setProductsDataX(prev => ({ ...prev, results: resProducts, isFetching: false }));
    } catch (error) {
      console.log(error);
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
        // console.log(elementToAddWereHouse);

        let element = resp.data.results.filter(item => item.productId === elementToAddWereHouse.productId);

        let newElement = element.map(item => {
          return {
            ...item,
            totalToExit: 0,
          };
        });

        elementToAddWereHouse.wherehousesavailability = newElement || [];

        console.log(element);
      }

      console.log(disponibilidadporporudcto);

      setProductsDataX(prev => ({ ...prev, results: disponibilidadporporudcto, isFetching: false }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickSaveOrder = async () => {
    console.log("xxx");
    try {
      let products = productsDataX.results;

      // are all complete

      if (products.every(product => product.isComplete)) {
        console.log("all complete");
      }

      let objects = [];
      for (let i = 0; i < products.length; i++) {
        const productOportunity = products[i];

        if (productOportunity.isComplete) {
          productOportunity.wherehousesavailability.forEach(warehouse => {
            if (warehouse.totalToExit > 0) {
              console.log("ddd");
              objects.push({
                productId: productOportunity.product.id,
                warehouseId: warehouse.warehouseId,
                orderId: orderSelectedData.id,
                total: warehouse.totalToExit,
                productOportunityId: productOportunity?.id,
                statuswho: "pedido nuevo",
              });
            }
          });
        }
      }

      for (let i = 0; i < objects.length; i++) {
        const element = objects[i];

        let resp = await api.post("warehouseorders", element);

        console.log(resp);
      }

      let resp = await ordersService.updateOrderStatus(orderSelectedData.id, "por surtir");

      console.log(objects);
    } catch (error) {
      console.log(error);
    }
  };

  const [productoportunityorder, setproductoportunityorder] = useState(null);

  const handleOnClickViewProduct = async product => {
    setproductoportunityorder(product);
  };

  return (
    <DirLogDashboardStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Pedidos Completos <span>({totalOrders})</span>
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
                        refetch={refetch}
                        setRefetch={setRefetch}
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

      {/* <FilesOrder
        open={openFiles}
        handletoogle={handleToggleFiles}
        filesData={filesData}
        idOrder={orderSelectedData?.id}
        refetch={handleRefetchFiles}
      /> */}
    </DirLogDashboardStyled>
  );
}
