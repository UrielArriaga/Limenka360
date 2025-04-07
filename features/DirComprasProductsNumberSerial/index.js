import React from "react";
import { StyledProductsNumberSerial } from "./styled";
import { Add, Cached, Close, Search } from "@material-ui/icons";
import LogisticsFilters from "../../components/LogisticsFilters";
import { commonSelector } from "../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useFiltersProduct from "./hooks/useFiltersProduct";
import ListPurchaseOrders from "./components/ListPurchaseOrders";
import useEditProduct from "./hooks/useEditProduct";
import { Button, Fade, Grid, IconButton } from "@material-ui/core";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import DrawerEditProduct from "./components/DrawerEditProduct";
import ShowFilters from "./components/ShowFilters";
import useShippingProductsNumberSerial from "./hooks/useShippingProductsNumberSerial";
import PreviewArticlesSerialNumber from "./components/PreviewArticles";
import ModalGaranties from "./components/ModalGarant";
import useModal from "../../hooks/useModal";

export default function ProductsNumberSerial() {
  const { filterStatusProduct, filterImportProduct } = useSelector(commonSelector);
  const { open: openModalGaranties, toggleModal: toggleModalGaranties, closeModal: closeModalGaranties } = useModal();
  const filtersPurchaseOrders = [
    {
      label: "Tipo de Producto",
      value: "typeProducts",
      valuedb: "producttypeId",
      custom: false,
      customOptions: [],
      getLabel: "name",
      getValue: "id",
    },
    {
      label: "Categoria",
      value: "categories",
      valuedb: "categoryId",
      custom: false,
      customOptions: [],
      getLabel: "name",
      getValue: "id",
    },
    {
      label: "Marca",
      value: "brands",
      valuedb: "brandId",
      custom: false,
      customOptions: [],
      getLabel: "name",
      getValue: "id",
    },
    {
      label: "Proveedor",
      value: "providers",
      valuedb: "providerId",
      custom: false,
      customOptions: [],
      getLabel: "companyname",
      getValue: "id",
    },
    {
      label: "Importados",
      value: "import",
      valuedb: "import",
      custom: true,
      customOptions: filterImportProduct,
      getLabel: "name",
      getValue: "id",
    },
    {
      label: "Estado del producto",
      value: "isactive",
      valuedb: "isactive",
      custom: true,
      customOptions: filterStatusProduct,
      getLabel: "name",
      getValue: "id",
    },
  ];
  const { handleOnChangeFilter, optionsFilterSelected, handleDeleteFilter } = useFiltersProduct();
  const { openDrawer, selectedProduct, handleCloseEdit, dataGeneral, handleUploadProduct, isfetching } =
    useEditProduct();

  const {
    handleOnChangeKeyWord,
    deleteKeyWord,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    refetchData,
    tableData,
    isFetchingData,
    paginationData,
    handleOnClickRow,
    orderSelected,
    handleOnClickClosePreview,
    router,
    createWarranty,
  } = useShippingProductsNumberSerial(
    openDrawer,
    selectedProduct?.setSelectItemProduct,
    optionsFilterSelected,
    selectedProduct?.selectItemProduct
  );
  const {
    data: { data, fetching, count },
    heads,
    customColumns,
    actions,
  } = tableData;

  return (
    <StyledProductsNumberSerial>
      <div className="headerTitle">
        <div className="header">
          <div className="header__title">
            <h4>
              Productos <span>({count})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por nombre de producto"
              />

              {keyword.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>
              )}
            </div>

            <LogisticsFilters filters={filtersPurchaseOrders} handleOnChangeFilter={handleOnChangeFilter} />
            <IconButton className="icon" onClick={() => refetchData()}>
              <Cached />
            </IconButton>
          </div>
        </div>

        <Button className="add" onClick={() => router.push("../directorcompras/productos/nuevo")}>
          <Add />
          Agregar Producto
        </Button>
      </div>
      <ShowFilters optionsFilterSelected={optionsFilterSelected} handleDeleteFilter={handleDeleteFilter} />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListPurchaseOrders
                orderSelected={orderSelected}
                data={tableData.data.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={count >= 20 ? 20 : count}
                isLoading={isFetchingData}
                paginationData={{
                  ...paginationData,
                  total: count,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="table">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Código"}
                  heads={heads}
                  isLoading={fetching}
                  actions={actions}
                  data={data}
                  customColumns={customColumns}
                  typeTable="border"
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  rowsLoader={count >= 60 ? 60 : count || 60}
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
                <PreviewArticlesSerialNumber
                  orderSelected={orderSelected}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleModalGaranties={toggleModalGaranties}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <DrawerEditProduct
        openDrawer={openDrawer}
        selectedProduct={selectedProduct.selectItemProduct}
        handleCloseEdit={handleCloseEdit}
        handleUploadProduct={handleUploadProduct}
        isfetching={isfetching}
      />
      <ModalGaranties
        openModalGaranties={openModalGaranties}
        closeModalGaranties={closeModalGaranties}
        orderSelected={orderSelected}
        createWarranty={createWarranty}
      />
    </StyledProductsNumberSerial>
  );
}
