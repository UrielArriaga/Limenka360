import React from "react";
import { ContainerStyled } from "./styled";
import { Cached, Close, Search } from "@material-ui/icons";
import useSalesPayments from "./hooks/useSalesPayments";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { Grid, IconButton, Badge } from "@material-ui/core";
import ListOrders from "./components/ListOrders";
import PreviewPayment from "./components/PreviewPayment";
import { optionsFilters } from "./data";
import ActiveFilters from "./components/ActiveFilters";
import useFilters from "./hooks/useFilters";
import Filters from "./components/Filters";
import ModalMarkAsPaid from "./components/ModalMarkIsPaid";

export default function PurchasingManagerPayments() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(optionsFilters);
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
    deleteKeyWord,
    salesPayments,
    refetchData,
    selectedPay,
    open,
    toggleModal,
    refresh,
    dataOportunity,
    setSelectedPay
  } = useSalesPayments(activeFilters);


  return (
    <ContainerStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Pagos <span>({salesPayments?.total})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por prospecto"
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
          <IconButton className="icon" onClick={()=> refresh()}>
            <Badge overlap="rectangular" color="primary">
              <Cached/>
            </Badge>
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
                selectedPay={selectedPay}
                data={salesPayments?.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={salesPayments?.total >= 20 ? 20 : salesPayments?.total}
                isLoading={salesPayments?.isfetching}
                paginationData={{
                  ...paginationData,
                  total: salesPayments?.total,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Nombre"}
                  heads={tableData.headsPayments}
                  isLoading={salesPayments?.isfetching}
                  actions={tableData.actions}
                  data={salesPayments?.data}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  // orderBy={orderBy}
                  // setOrderBy={setOrderBy}
                  rowsLoader={salesPayments?.total >= 20 ? 20 : salesPayments?.total || 20}
                  paginationData={{
                    ...paginationData,
                    total: salesPayments?.total,
                  }}
                />
              </div>
            )}
          </Grid>
          {isOpenPreview && (
            <Grid item md={9} className="preview">
              <PreviewPayment
                selectedPay={selectedPay}
                handleOnClickClosePreview={handleOnClickClosePreview}
                toggleModal={toggleModal}
                dataOportunity={dataOportunity}
                />
            </Grid>
          )}
        </Grid>
      </div>

      <ModalMarkAsPaid
        open={open}
        handleClose={toggleModal}
        item={selectedPay?.data}
        refresh={refresh}
        setSelectedPay={setSelectedPay}
      />

    </ContainerStyled>
  );
}
