import { DirLogTransfersStyled } from "./styles";
import { Badge, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { globalNotificationsSelector } from "../../redux/slices/globalNotificationsSlice";
import ActiveFilters from "./components/ActiveFilters";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import { filtersOrders } from "./data";
import useDirLogTransfers from "./hooks/useDirLogTransfers";
import useFilters from "./hooks/useFilters";
import useDirLogTransferProducts from "./hooks/useDirLogTransferProducts";

function AdminLogTransfers({ isAdmin = false, status }) {
  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);
  const [productoportunityorder, setproductoportunityorder] = useState(null);

  const {
    isOpenPreview,
    orderSelected,
    keyword,
    orderBy,
    tableData,
    paginationData,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    handleOnKeyEnter,
    deleteKeyWord,
    refetchData,
    lastFetchDate,
    selectedTransfer
  } = useDirLogTransfers(activeFilters, isAdmin, status, setActiveFilters, setproductoportunityorder);
  
  const { productsTransfer, isFetching } = useDirLogTransferProducts(selectedTransfer);

  return (
    <DirLogTransfersStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Traspasos <span>({tableData?.data?.total})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              onKeyDown={e => handleOnKeyEnter(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio."
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
                data={tableData?.data?.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={tableData?.data?.total >= 20 ? 20 : tableData?.data?.total}
                isLoading={tableData?.data?.isFetchingData}
                paginationData={{
                  ...paginationData,
                  total: tableData?.data?.total,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  isLoading={tableData?.data?.isFetchingData}
                  actions={tableData.actions}
                  data={tableData?.data?.data}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  typeActions="icon"
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  rowsLoader={tableData?.data?.total >= 20 ? 20 : tableData?.data?.total || 20}
                  paginationData={{
                    ...paginationData,
                    total: tableData?.data?.total,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Grid item md={9} className="preview">
              <AnimatePresence>
                <div style={{ overflow: "hidden" }}>
                    <motion.div
                      key="previewOrder"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PreviewOrder
                        isFetching={isFetching}
                        handleOnClickClosePreview={handleOnClickClosePreview}
                        selectedTransfer={selectedTransfer}
                        productsTransfer={productsTransfer}
                      />
                    </motion.div>
                </div>
              </AnimatePresence>
            </Grid>
          )}
        </Grid>
      </div>

    </DirLogTransfersStyled>
  );
}

export default AdminLogTransfers;
