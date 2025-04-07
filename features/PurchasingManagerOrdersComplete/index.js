import React from "react";
import { ContainerStyled } from "./styled";
import { Cached, Close, Search } from "@material-ui/icons";
import useCompleteOrders from "./hooks/useCompleteOrders";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { Grid, IconButton } from "@material-ui/core";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import useCompleteOrder from "./hooks/useCompleteOrder";
import useShippingsFiles from "./hooks/useShippingsFiles";
import TrackingsOrdersComplete from "./components/TrackingsOrdersComplete";
import useTrackings from "./hooks/useTrackings";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";

export default function PurchasingManagerOrdersComplete() {
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
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
  } = useCompleteOrders();
  const { orderSelectedData, isFetchingOrder, productsData } = useCompleteOrder(orderSelected);
  const { openFiles, handleToggleFiles, statesFiles, actionsFiles, paginationFiles } =
    useShippingsFiles(orderSelectedData);
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
  } = useTrackings(orderSelected);
  return (
    <ContainerStyled>
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
              placeholder="Buscar por folio"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
          <IconButton className="icon" onClick={() => refetchData()}>
            <Cached />
          </IconButton>
        </div>
      </div>
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
                  // actions={tableData.actions}
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
              <PreviewOrder
                isFetchingOrder={isFetchingOrder}
                orderSelectedData={orderSelectedData}
                handleOnClickClosePreview={handleOnClickClosePreview}
                productsData={productsData}
                toggleTrackingsModal={toggleTrackingsModal}
                handleToggleFiles={handleToggleFiles}
              />
            </Grid>
          )}
        </Grid>
      </div>
      <TrackingsOrdersComplete
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
    </ContainerStyled>
  );
}
