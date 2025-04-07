import React from "react";
import { AdminAlmacenEntradasStyled } from "./styles";
import { Cached, Close, Search } from "@material-ui/icons";
import { Fade, Grid, IconButton } from "@material-ui/core";
import ListExits from "../DirLogEntradas/components/ListExits";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import PreviewOutPut from "./components/PreviewOutPut";
import useAdmAlmacenSalida from "./hooks/useAdmAlmacenSalida";
import useAdmAlmacenSalidas from "./hooks/useAdmAlmacenSalidas";
import useFilters from "./hooks/useFilters";
import ActiveFiltersEntries from "./components/ActiveFilters/ActiveFilters";
import { filtersEntries } from "./data";
import Filters from "./components/Filters";
import FormatReview from "./components/FormatReview";
import useNewRevision from "./hooks/useNewRevision";
import useRepairStatus from "./hooks/useRepairStatus";
export default function BiomedicalManagerTickets() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters();
  const {
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    setIsFetchingData,
    setexitSelected,
    keyword,
    orderBy,
    setOrderBy,
    exitSelected,
    totalExits,
    isFetchingData,
    isOpenPreview,
    paginationData,
    setProductSelect,
    refreshData,
    setIsOpenPreview,
    tableData,
    refetchData,
  } = useAdmAlmacenSalidas(activeFilters);
const { handleOnClickRepair, openRepair, handleToggleRepair, handleRepair } = useRepairStatus({
    setIsOpenPreview,
    setIsFetchingData,
    refreshData,
    setProductSelect,
  });
  const {
    openFormat,
    handleToggleFormat,
    register,
    handleSubmit,
    errors,
    handleOnClickReview,
    reset,
    handleCancel,
    onSubmit,
    items,
    productSelected,
  } = useNewRevision();
  let actions = [
    {
      name: "Marcar como revisado",
      action: e => {
        handleToggleFormat(e);
      },
    },
    {
      name: "Cambiar estatus",
      action: e => {
        handleOnClickRepair(e);
      },
    },
  ];

  const { exitSelectedData, isFetchingOrder, productsExit, isFechingProduct, totalProductsExits } =
    useAdmAlmacenSalida(exitSelected);


  return (
    <AdminAlmacenEntradasStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Entradas <span>({totalExits})</span>
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
            filters={filtersEntries}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <Cached />
          </IconButton>
        </div>
      </div>
      <ActiveFiltersEntries
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />
      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListExits
                exitSelected={exitSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={totalExits >= 20 ? 20 : totalExits}
                isLoading={isFetchingData}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                paginationData={{
                  ...paginationData,
                  total: totalExits,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  isSelectable={true}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  data={tableData.data}
                  actions={tableData.actions}
                  customColumns={tableData.customColumns}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  typeTable="border"
                  isLoading={isFetchingData}
                  rowsLoader={totalExits >= 20 ? 20 : totalExits}
                  paginationData={{
                    ...paginationData,
                    total: totalExits,
                  }}
                />
              </div>
            )}
          </Grid>
          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewOutPut
                  isFetchingOrder={isFetchingOrder}
                  exitSelectedData={exitSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  dataproducts={productsExit}
                  isFechingProduct={isFechingProduct}
                  totalProductsExits={totalProductsExits}
                  handleOnClickReview={handleOnClickReview}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
        <FormatReview
          open={openFormat}
          onClose={handleToggleFormat}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          reset={reset}
          handleCancel={handleCancel}
          onSubmit={onSubmit}
          items={items}
          productSelect={productSelected}
        />
      </div>
    </AdminAlmacenEntradasStyled>
  );
}
