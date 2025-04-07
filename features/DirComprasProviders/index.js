import { Badge, Button, Fade, Grid, IconButton } from "@material-ui/core";
import { Add, Cached, Close, Search } from "@material-ui/icons";
import React from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ActiveFilters from "./components/ActiveFilters";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import { filtersOrders } from "./data";
import useFilters from "./hooks/useFilters";
import { DirLogDashboardStyled } from "./styles";
import { useSelector } from "react-redux";
import { globalNotificationsSelector } from "../../redux/slices/globalNotificationsSlice";
import useDirLogProviders from "./hooks/useDirLogProviders";
import useDirLogProvider from "./hooks/useDirLogProvider";
import useDirLogOrders from "./hooks/useDirLogOrders";
import Head from "next/head";
import DeleteProvider from "./components/DeleteProvider";
import useProviderDelete from "./hooks/useProviderDelete";
import DrawerEditProvider from "./components/DrawerEditProvider";
import useProviderEdit from "./hooks/useProviderEdit";
import DrawerViewProvider from "./components/DrawerViewProvider/DrawerViewProvider";
import useListProvidersDirections from "./hooks/useListProvidersDirections";
import useSupplierProvider from "./hooks/useSupplierProvider";
export default function DirComprasProviders({ isAdmin = false }) {
  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters();
  const {
    toggleModaEdit,
    openEdit,
    setProviderEdit,
    providerEdit,
    closeDrawer,
    errors,
    register,
    handleSubmit,
    handleUploadProspect,
    dataAddress: addressDirection,
    removeAddress,
    setPostalCode,
    postalCode,
    addDirection,
    setSuppliersToSave,
    suppliersToSave
  } = useProviderEdit();

  const {
    suplierProvider,
    removeSupplier,
    openContact,
    toggleContact,
    relations,
    handleAddContact,
    stateHookForm,
  } = useSupplierProvider(providerEdit?.id, setSuppliersToSave, suppliersToSave);

  const {
    isOpenPreview,
    providerSelected,
    keyword,
    orderBy,
    tableData,
    paginationData,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
    lastFetchDate,
    router,
    openConfirmDelete,
    handleToggleDelete,
    providerSelectedDelete,
    toggleModalView,
    openView,
  } = useDirLogProviders(activeFilters, isAdmin, toggleModaEdit, openEdit, setProviderEdit);

  const {
    data: { data, isFetching: fetching, count },
    actions,
    heads,
    customColumns,
  } = tableData;
  const { selectedData, isFetching } = useDirLogProvider(providerSelected);
  const { dataAddress, isfetching, dataContacts } = useListProvidersDirections(isOpenPreview, selectedData);
  const { tableDataOrders, filtersOption, setKeyWord, keyWord } = useDirLogOrders(providerSelected);
  const { deleteProvider } = useProviderDelete(providerSelectedDelete, handleToggleDelete, refetchData);

  return (
    <DirLogDashboardStyled>
      <Head>
        <title>CRM JOBS - Proveedores</title>
      </Head>
      <div className="headerTitle">
        <div className="header">
          <div className="header__headTitle">
            <div className="header__title">
              <h4>
                Proveedores <span>({count})</span>
              </h4>
            </div>

            <div className="header__filters">
              <div className="inputContainer">
                <Search className="inputContainer__icon" />
                <input
                  value={keyword}
                  onChange={e => handleOnChangeKeyWord(e)}
                  className="inputContainer__input"
                  placeholder="Buscar por proveedor"
                />

                {keyword.length > 3 && (
                  <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                    <Close />
                  </IconButton>
                )}
              </div>

              <IconButton className="icon" onClick={() => refetchData()}>
                <Badge badgeContent={lastNotificationAt && lastNotificationAt > lastFetchDate ? 1 : 0} color="primary">
                  <Cached />
                </Badge>
              </IconButton>

              <div className={lastNotificationAt && lastNotificationAt > lastFetchDate && "refetchdata"}>
                {lastNotificationAt && lastNotificationAt > lastFetchDate && <p>Tienes nuevos pedidos</p>}
              </div>
            </div>
          </div>
          <Button className="add" onClick={() => router.push("../directorcompras/proveedores/nuevo")}>
            <Add />
            Agregar Proveedor
          </Button>
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
                orderSelected={providerSelected}
                data={data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={count >= 20 ? 20 : count}
                isLoading={fetching}
                paginationData={{
                  ...paginationData,
                  total: count,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha"}
                  heads={heads}
                  isLoading={fetching}
                  actions={actions}
                  data={data}
                  customColumns={customColumns}
                  typeTable="border"
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  rowsLoader={count >= 20 ? 20 : count || 20}
                  paginationData={{
                    ...paginationData,
                    total: count,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewOrder
                  isFetchingOrder={isFetching}
                  orderSelectedData={selectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  tableDataOrders={tableDataOrders}
                  filtersOption={filtersOption}
                  toggleModalView={toggleModalView}
                  openView={openView}
                  dataAddress={dataAddress}
                  dataContacts={dataContacts}
                  isfetching={isfetching}
                  toggleModaEdit={toggleModaEdit}
                  setProviderEdit={setProviderEdit}
                  setKeyWord={setKeyWord}
                  keyWord={keyWord}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <DeleteProvider
        openConfirmDelete={openConfirmDelete}
        handleToggleDelete={handleToggleDelete}
        deleteProvider={deleteProvider}
      />
      <DrawerEditProvider
        openDrawer={openEdit}
        selectedProvider={providerEdit}
        handleCloseEdit={toggleModaEdit}
        closeDrawer={closeDrawer}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        handleUploadProspect={handleUploadProspect}
        dataAddress={addressDirection}
        removeAddress={removeAddress}
        setPostalCode={setPostalCode}
        postalCode={postalCode}
        addDirection={addDirection}
        suplierProvider={suplierProvider}
        removeSupplier={removeSupplier}
        openContact={openContact}
        toggleContact={toggleContact}
        relations={relations}
        handleAddContact={handleAddContact}
        stateHookForm={stateHookForm}
      />

      <DrawerViewProvider
        open={openView}
        toggleModal={toggleModalView}
        orderSelectedData={selectedData}
        dataAddress={dataAddress}
      />
    </DirLogDashboardStyled>
  );
}
