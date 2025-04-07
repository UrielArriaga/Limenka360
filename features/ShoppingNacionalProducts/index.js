import React from "react";
import { StyledProducts } from "./styled";
import { Button, Grid, IconButton } from "@material-ui/core";
import { Add, Cached, Close, Search } from "@material-ui/icons";
import useShippingProducts from "./hooks/useShippingProducts";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { useRouter } from "next/router";
import Head from "next/head";
import LogisticsFilters from "../../components/LogisticsFilters";
import useEditProduct from "./hooks/useEditProduct";
import DrawerEditProduct from "./components/DrawerEditProduct";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import useFiltersProduct from "./hooks/useFiltersProduct";
import ShowFilters from "./components/ShowFilters";

export default function ShoppingNacionalProducts() {
  const { filterStatusProduct, filterImportProduct } = useSelector(commonSelector);
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
    paginationData,
    router,
    handleSelectedProduct,
    selecteProduct,
  } = useShippingProducts(openDrawer, selectedProduct?.setSelectItemProduct, optionsFilterSelected);
  const {
    data: { data, fetching, count },
    heads,
    customColumns,
    actions,
  } = tableData;

  return (
    <StyledProducts>
      <Head>
        <title>CRM JOBS - Productos</title>
      </Head>
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

            <select
              id="product-select"
              className="select"
              value={selecteProduct}
              onChange={handleSelectedProduct}
            >
              <option value="code">Codigo</option>
              <option value="name">Producto</option>
            </select>

            <LogisticsFilters 
              filters={filtersPurchaseOrders} 
              handleOnChangeFilter={handleOnChangeFilter} 
            />
            <IconButton className="icon" onClick={() => refetchData()}>
              <Cached />
            </IconButton>
          </div>
        </div>

        <Button className="add" onClick={() => router.push("../comprasv2/productos/nuevo")}>
          <Add />
          Agregar Producto
        </Button>
      </div>

      <ShowFilters optionsFilterSelected={optionsFilterSelected} handleDeleteFilter={handleDeleteFilter} />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            <div className="table">
              <TableLimenkaGeneral
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
          </Grid>
        </Grid>
      </div>
      <DrawerEditProduct
        openDrawer={openDrawer}
        selectedProduct={selectedProduct.selectItemProduct}
        handleCloseEdit={handleCloseEdit}
        handleUploadProduct={handleUploadProduct}
        isfetching={isfetching}
      />
    </StyledProducts>
  );
}
