import { Badge, Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import { globalNotificationsSelector } from "../../redux/slices/globalNotificationsSlice";
import { userSelector } from "../../redux/slices/userSlice";
import ModalProductExit from "../FloorManagerPedidos/components/ModalProductExit";
import ActiveFilters from "./components/ActiveFilters";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import TrackingsOrder from "./components/TrackingsOrder";
import { filtersOrders } from "./data";
import useAdmAlmacen from "./hooks/useAdmAlmacen";
import useAdmAlmacenFiles from "./hooks/useAdmAlmacenFiles";
import useDirLogPedido from "./hooks/useDirLogPedido";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import { DirLogDashboardStyled } from "./styles";
import useModal from "../../hooks/useModal";
import { api } from "../../services/api";
import { OrdersServices } from "./services";
import useAlertToast from "../../hooks/useAlertToast";
import { ORDERSTATUS } from "../../constants";
import { SocketContext } from "../../context/socketContext";
import useOptionsArticles from "./hooks/useOptionsArticles";
import usePagination from "../../hooks/usePagination";

export default function AdminAlmacenPedidosCompletos({ isAdmin = true }) {
  const { userData } = useSelector(userSelector);
  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);
  const {
    page: pageCurrent,
    limit: limitResults,
    handlePage,
  } = usePagination({
    defaultLimit: 2,
    defaultPage: 1,
  });

  //  * lOGIC PEDIDOS
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
    productSelected,
    searchProduct,
  } = useAdmAlmacen(activeFilters, isAdmin, setActiveFilters);

  // * LOGIC PEDIDO
  const { orderSelectedData, isFetchingOrder, productsData } = useDirLogPedido(orderSelected);

  // * LOGIC PRODUCTOS In Preview
  const {
    productToSearch,
    isOpenModalExit,
    products,
    articles,
    isLoadingArticles,
    articlesData,
    countProducts,
    sortBy,
    handleSortBy,
    handleClickProduct,
    openModalExit,
    handleClickProducts,
    handleClickDeleteProduct,
    handleAddArticleToProduct,
    handleOnChangeComments,
    handleOnClickNewExit,
    handleSearch,
    handleOnclickExit,
    fetchWarehouseProductsByProduct,
    handleOnChangeStatusIsApart,
    handleOnDeleteArticle,
    isCompleteWHOrder,
    paginationProducts,
    handleOnChangeStatusIsNotApart,
    total,
  } = useProductsToExit(orderSelected, refetchData, pageCurrent, limitResults);

  // * LOGIC TRACKINGS
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

  // * LOGIC FILES
  const { openFiles, handleToggleFiles, paginationFiles, statesFiles, actionsFiles } =
    useAdmAlmacenFiles(orderSelectedData);

  const { anchorEl, handleMenuClose, handleMenuOpen, handleArticle, handleDeleteArticle, handleIsNotApart } =
    useOptionsArticles(handleOnChangeStatusIsApart, handleOnDeleteArticle, handleOnChangeStatusIsNotApart);

  return (
    <DirLogDashboardStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Pedidos <span>({totalOrders})</span> {userData?.warehouse?.name}
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio"
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
                  // products={products}
                  handleToggleFiles={handleToggleFiles}
                  isCompleteWHOrder={isCompleteWHOrder}
                  isFetchingOrder={isFetchingOrder}
                  orderSelectedData={orderSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleTrackingsModal={toggleTrackingsModal}
                  productsData={products}
                  handleClickProduct={handleClickProduct}
                  handleOnClickNewExit={handleOnClickNewExit}
                  handleClickDeleteProduct={handleClickDeleteProduct}
                  handleAddArticleToProduct={handleAddArticleToProduct}
                  handleOnChangeComments={handleOnChangeComments}
                  anchorEl={anchorEl}
                  handleMenuClose={handleMenuClose}
                  handleMenuOpen={handleMenuOpen}
                  handleArticle={handleArticle}
                  handleDeleteArticle={handleDeleteArticle}
                  handleIsNotApart={handleIsNotApart}
                  paginationDatas={{
                    total,
                    pageCurrent,
                    limitResults,
                    handlePage,
                  }}
                />
              </Grid>
            </Fade>
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

      <ModalProductExit
        articles={articles}
        isLoadingArticles={isLoadingArticles}
        sortBy={sortBy}
        handleSortBy={handleSortBy}
        articlesData={articlesData}
        handleExitProducts={handleClickProducts}
        products={products}
        productToSearch={productToSearch}
        productSelected={productSelected}
        open={isOpenModalExit}
        onClose={handleOnclickExit}
        handleAddArticleToProduct={handleAddArticleToProduct}
        handleSearch={handleSearch}
        fetchWarehouseProductsByProduct={fetchWarehouseProductsByProduct}
        paginationProducts={paginationProducts}
        countProducts={countProducts}
      />
    </DirLogDashboardStyled>
  );
}

function useProductsToExit(orderSelected, refetchData, pageCurrent, limitResults) {
  const ordersService = new OrdersServices();

  const [isCompleteWHOrder, setIsCompleteWHOrder] = useState(false);
  const { open: isOpenModalExit, toggleModal: openModalExit } = useModal();
  const [flagToRefecth, setFlagToRefecth] = useState(false);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { socket, online } = useContext(SocketContext);
  const { userData } = useSelector(userSelector);
  const [countProducts, setCountProducts] = useState(0);
  const { page, setPage, limit, handlePagination, paginationCount } = usePagination({
    defaultLimit: 5,
    defaultPage: 1,
    count: countProducts,
  });
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const [sortBy, setSortBy] = useState("createdAt");

  const [articlesData, setArticlesData] = useState({
    results: [],
    isFetching: true,
    isError: false,
    isSuccess: false,
    orderBy: "-createdAt",
  });

  const [productToSearch, setProductToSearch] = useState(null);
  useEffect(() => {
    fetchWarehouseProductsByProduct();
  }, [productToSearch, page, sortBy]);

  useEffect(() => {
    if (!orderSelected) return;
    fetchProductsOrder();
  }, [orderSelected, pageCurrent]);

  const handleSortBy = e => {
    setSortBy(e.target.value);
  };

  const handleOnclickExit = () => {
    openModalExit();
    setArticles([]);
  };

  const handleClickProduct = product => {
    setPage(1);
    setProductToSearch(product);
    if (!product) {
      fetchWarehouseProductsByProduct();
    }
    openModalExit();
  };

  const handleSearch = e => {
    if (e) {
      setProductToSearch(e.target.value);
    } else {
      setProductToSearch(null);
    }
  };

  const fetchProductsOrder = async () => {
    try {
      setArticles([]);
      setProducts(prev => ({ ...prev, isFetching: true }));
      const resDataProducts = await ordersService.getWareProductsOrder(orderSelected.id, pageCurrent, limitResults);
      const resProducts = resDataProducts?.data?.results;
      setTotal(resDataProducts?.data?.count);

      setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
      let isComplete = resProducts.every(product => product.total === product.totalorder);

      setIsCompleteWHOrder(isComplete);
    } catch (error) {
      setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      console.log(error);
    }
  };

  const fetchWarehouseProductsByProduct = async () => {
    setIsLoadingArticles(true);
    try {
      const response = await api.get(`warehouseproducts`, {
        params: {
          order: sortBy,
          include: "product",
          count: 1,
          limit: limit,
          skip: page,
          where: JSON.stringify({
            productId: productToSearch?.product?.id,
            isapart: false,
            statusrepair: false,
            warehouseId: userData?.warehouse?.id,
          }),
        },
      });
      setCountProducts(response.data.count);

      setArticles(response.data.results);

      setArticlesData({
        results: response.data.results,
        isFetching: false,
        isError: false,
        isSuccess: true,
        orderBy: "-createdAt",
      });
    } catch (error) {
      console.error("Error fetching warehouse products by product:", error);
    }
    setIsLoadingArticles(false);
  };

  const handleOnClickOrder = order => {
    setArticlesData(prev => {
      return {
        ...prev,
        orderBy: order,
      };
    });
  };

  const handleOnChangeComments = (product, article, value) => {
    let newArray = products?.results.map((item, index) => {
      if (product.id === item.id) {
        return {
          ...item,
          articles: item?.articles
            ? item.articles.map(art => {
                if (art.id === article.id) {
                  return {
                    ...art,
                    comments: value,
                  };
                }
                return art;
              })
            : [],
        };
      }
      return item;
    });

    setProducts({
      ...products,
      results: newArray,
    });
  };

  const handleOnChangeStatusIsApart = (product, article) => {
    let newArray = products?.results.map((item, index) => {
      if (product.id === item.id) {
        return {
          ...item,
          articles: item?.articles
            ? item.articles.map(art => {
                if (art.id === article.id) {
                  return {
                    ...art,
                    isapart: true,
                  };
                }
                return art;
              })
            : [],
        };
      }
      return item;
    });

    setProducts({
      ...products,
      results: newArray,
    });
  };
  const handleOnChangeStatusIsNotApart = (product, article) => {
    let newArray = products?.results.map((item, index) => {
      if (product.id === item.id) {
        return {
          ...item,
          articles: item?.articles
            ? item.articles.map(art => {
                if (art.id === article.id) {
                  return {
                    ...art,
                    isapart: false,
                  };
                }
                return art;
              })
            : [],
        };
      }
      return item;
    });

    setProducts({
      ...products,
      results: newArray,
    });
  };

  const handleOnDeleteArticle = (product, article) => {
    let newArray = products?.results.map((item, index) => {
      if (product.id === item.id) {
        return {
          ...item,
          articles: item?.articles ? item.articles.filter(art => art.id != article.id) : [],
        };
      }
      return item;
    });

    setProducts({
      ...products,
      results: newArray,
    });
  };

  const handleAddArticleToProduct = (product, article, isChecked) => {
    let articlefinal = {
      ...article,
      comments: "",
      warehouseOrderId: productToSearch?.id,
    };

    if (isChecked) {
      let newArray = products?.results.map((item, index) => {
        if (product.id === item.id) {
          return {
            ...item,
            articles: item?.articles ? [...item.articles, articlefinal] : [articlefinal],
          };
        }
        return item;
      });

      setProducts({
        ...products,
        results: newArray,
      });
      setProductToSearch(newArray.filter(item => item.id === product.id)[0]);
    } else {
      let newArray = products?.results.map((item, index) => {
        if (product.id === item.id) {
          return {
            ...item,
            articles: item?.articles ? item.articles.filter(art => art.id !== article.id) : [],
          };
        }
        return item;
      });

      setProducts({
        ...products,
        results: newArray,
      });
      setProductToSearch(newArray.filter(item => item.id === product.id)[0]);
    }
  };

  const handleOnClickNewExit = async () => {
    let finalProducts = products.results;

    let productsToExit = [];

    // return;

    finalProducts.forEach(prd => {
      if (prd?.articles?.length > 0) {
        prd.articles.forEach(art => {
          productsToExit.push({
            productOportunityId: prd.id,
            id: art.id,
            comments: art.comments,
            warehouseOrderId: art.warehouseOrderId,
            isapart: art.isapart,
            productId: art.productId,
          });
        });
      }
    });

    let bodyCreateExit = {
      folio: `AIZU98${Math.floor(Math.random() * 1000)}`,
      description: "Prueba 01 PRIMER SALIDA",
      status: "En proceso",
      deliveryAt: null,
      warehouseproducts: productsToExit,
      orderId: orderSelected?.itemData?.orderId,
      warehouseorderId: orderSelected?.id,
    };

    // return;

    try {
      const response = await ordersService.createInventoryExit(bodyCreateExit).catch(error => {
        showAlertError("Error  ORDC01"), console.log(error);
        throw error;
      });
      // let updateWhREsponse = await ordersService
      //   .updateWareHouseOrderStatus(orderSelected.id, ORDERSTATUS.surtir)
      //   .catch(error => {
      //     showAlertError("Error UPDO 01"), console.log(error);
      //     throw error;
      //   });
      // router.push(`/jefedepiso/${bodyCreateExit.orderId}`);
      showAlertSucces("Solicitud enviada creada correctamente");

      fetchProductsOrder();
      refetchData();

      socket?.emit("newnotification", {
        orderId: orderSelected?.id,
        message: "Pedido asignado a surtir",
        notificationtype: "porsurtir",
      });
    } catch (error) {
      console.log(error);
      // showAlertError("Error al crear la salida");
    }
  };

  const handleClickProducts = products => {
    setProducts(products);
  };

  const handleClickDeleteProduct = productToDelete => {
    setProducts([]);
    const updatedProducts = products.filter(product => product.serialnumber !== productToDelete.serialnumber);
    setProducts(updatedProducts);
  };
  return {
    products,
    articles,
    isLoadingArticles,
    articlesData,
    productToSearch,
    isOpenModalExit,
    countProducts,
    sortBy,
    handleSortBy,
    handleClickProduct,
    handleClickProducts,
    handleClickDeleteProduct,
    handleAddArticleToProduct,
    handleOnChangeComments,
    handleOnClickNewExit,
    openModalExit,
    handleSearch,
    handleOnclickExit,
    fetchWarehouseProductsByProduct,
    handleOnChangeStatusIsApart,
    handleOnDeleteArticle,
    isCompleteWHOrder,
    paginationProducts: {
      handlePagination,
      page,
      limit,
      paginationCount,
    },
    handleOnChangeStatusIsNotApart,
    total,
  };
}
