import { Fade, Grid, IconButton } from "@material-ui/core";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import React, { useState } from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ActiveFilters from "./components/ActiveFilters";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import ModalProductExit from "./components/ModalProductExit";
import PreviewOrder from "./components/PreviewOrder";
import useDirLogFiles from "./hooks/useDirLogFiles";
import useDirLogPedido from "./hooks/useDirLogPedido";
import useDirLogPedidos from "./hooks/useDirLogPedidos";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import { DirLogDashboardStyled } from "./styles";

const useProductsToExit = () => {
  const [products, seProducts] = useState([]);

  const handleClickProducts = products => {
    seProducts(products);
  };

  return {
    handleClickProducts,
    products,
  };
};

export default function FloorManagerPedidos() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters();

  const {
    isOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    setOrderBy,
    orderBy,
    tableData,
    paginationData,
    totalOrders,
    isOpenModalExit,
    productSelected,
    openModalExit,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    handleOnClickNewExit,
    deleteKeyWord,
    handleClickProduct,
    refetchData,
  } = useDirLogPedidos(activeFilters);

  const { orderSelectedData, isFetchingOrder, productsData } = useDirLogPedido(orderSelected);
  const { openTrackings, toggleTrackingsModal } = useDirLogTrackings(orderSelected);
  const { openFiles, handleToggleFiles, filesData } = useDirLogFiles(orderSelected);

  const { products, handleClickProducts } = useProductsToExit();

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
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <UpdateSharp />
          </IconButton>
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
              <TableLimenkaGeneral
                onRowClick={item => handleOnClickRow(item)}
                isSelectable={true}
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
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9}>
                <PreviewOrder
                  products={products}
                  isFetchingOrder={isFetchingOrder}
                  orderSelectedData={orderSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleToggleFiles={handleToggleFiles}
                  productsData={productsData}
                  handleClickProduct={handleClickProduct}
                  handleOnClickNewExit={handleOnClickNewExit}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>

      {/* <div className="main">
      

      

        
      </div>

      <TrackingsOrder open={openTrackings} handletoogle={toggleTrackingsModal} />
      <FilesOrder open={openFiles} handletoogle={handleToggleFiles} filesData={filesData} />

       */}
      <ModalProductExit
        handleExitProducts={handleClickProducts}
        products={products}
        productSelected={productSelected}
        open={isOpenModalExit}
        onClose={openModalExit}
      />
    </DirLogDashboardStyled>
  );
}
