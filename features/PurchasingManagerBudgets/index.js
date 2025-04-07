import React from "react";
import { StyledBudgets } from "./styles";
import Head from "next/head";
import { Button, Fade, Grid, IconButton } from "@material-ui/core";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import useShippingBudgets from "./hooks/useShippingBudgets";
import { Add, Cached, Close, Search } from "@material-ui/icons";
import ListBudgets from "./components/ListBudgets";
import PreviewBudgets from "./components/PreviewBudgets";
import ModalProduct from "./components/PreviewBudgets/ModalProduct";
import useShippingBudget from "./hooks/useShippingBudget";
import ModalProductDelete from "./components/PreviewBudgets/ModalProductDelete";
import useProductsBudget from "./hooks/useProductsBudget";
import useProductNew from "./hooks/useProductNew";
import ModalProductEdit from "./components/PreviewBudgets/ModalProductEdit";
import useProductEdit from "./hooks/useProductEdit";
import ModalAssing from "./components/PreviewBudgets/ModalAssing";

export default function ShoppingPresupuestos() {
  const {
    paginationData,
    tableData,
    isOpenPreview,
    setIsOpenPreview,
    refetchData,
    handleOnClickClosePreview,
    handleOnClickRow,
    budgetsSelected,
    handleOnChangeKeyWord,
    deleteKeyWord,
  } = useShippingBudgets();

  const { dataBudget, toggleAssing, openAssing, handleAssing, dataBudgetAssing, UpdateBudgetAllocation } =
    useShippingBudget(budgetsSelected, refetchData);
  const {
    dataProduct,
    openDelete,
    toggleProductDelete,
    productSelected,
    setDataProductSelected,
    DeleteProduct,
    loaderBack,
    refetchProducts,
  } = useProductsBudget(budgetsSelected);
  const {
    handleSubmit,
    control,
    handleAddTProduct,
    register,
    errors,
    isCreated,
    router,
    InputsRegister,
    toggleProducts,
    openProduct,
    reset,
    providerValue,
    setProviderValue,
    setProviderId,
    setValue,
  } = useProductNew(budgetsSelected, refetchProducts);
  const { openEdit, toggleEdit, productEdit, setproductEdit, uploadProduct, handleCloseEdit } = useProductEdit(
    budgetsSelected,
    setDataProductSelected,
    refetchProducts
  );
  return (
    <StyledBudgets>
      <Head>
        <title>CRM JOBS - Presupuestos</title>
      </Head>
      <div className="headerTitle">
        <div className="header">
          <div className="header__title">
            <h4>
              Presupuestos <span>({tableData?.data?.count})</span>
            </h4>
          </div>
          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={tableData?.keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por folio de Presupuesto"
              />

              {tableData?.keyword?.length > 3 && (
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
      </div>
      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListBudgets
                budgetsSelected={budgetsSelected}
                data={tableData?.data?.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={tableData?.data?.count >= 20 ? 20 : tableData?.data?.count}
                isLoading={tableData?.data?.fetching}
                paginationData={{
                  ...paginationData,
                  total: tableData?.data?.count,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha de Creación"}
                  heads={tableData?.heads}
                  isLoading={tableData?.data?.fetching}
                  data={tableData?.data?.data}
                  customColumns={tableData?.customColumns}
                  typeTable="border"
                  orderBy={tableData?.orderBy}
                  setOrderBy={tableData?.setOrderBy}
                  rowsLoader={tableData?.data?.count >= 60 ? 60 : tableData?.data?.count || 60}
                  paginationData={{
                    ...paginationData,
                    total: tableData?.data?.count,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewBudgets
                  data={dataBudget?.data}
                  dataProduct={dataProduct}
                  close={handleOnClickClosePreview}
                  toggleProducts={toggleProducts}
                  isFetchingData={dataBudget?.fetching}
                  toggleProductDelete={toggleProductDelete}
                  setDataProductSelected={setDataProductSelected}
                  refetchProducts={refetchProducts}
                  uploadProduct={uploadProduct}
                  toggleAssing={toggleAssing}
                  handleAssing={handleAssing}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <ModalProduct
        open={openProduct}
        toggleProducts={toggleProducts}
        handleSubmit={handleSubmit}
        control={control}
        handleAddTProduct={handleAddTProduct}
        register={register}
        errors={errors}
        isCreated={isCreated}
        InputsRegister={InputsRegister}
        reset={reset}
        setValue={setValue}
        providerValue={providerValue}
        setProviderValue={setProviderValue}
        setProviderId={setProviderId}
      />
      <ModalProductDelete
        open={openDelete}
        handleClose={toggleProductDelete}
        productSelected={productSelected}
        DeleteProduct={DeleteProduct}
        loaderBack={loaderBack}
      />
      <ModalProductEdit
        openEdit={openEdit}
        toggleEdit={() => toggleEdit()}
        productEdit={productEdit}
        budgetsSelected={budgetsSelected}
        refetchProducts={refetchProducts}
        productSelected={productSelected}
      />
      <ModalAssing
        open={openAssing}
        toggleAssing={toggleAssing}
        dataBudgetAssing={dataBudgetAssing}
        UpdateBudgetAllocation={UpdateBudgetAllocation}
      />
    </StyledBudgets>
  );
}
