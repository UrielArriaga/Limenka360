import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Pagination } from "@material-ui/lab";
import { Button, Chip, Collapse, IconButton, Input, Tooltip } from "@material-ui/core";
import { Autorenew, Ballot, Close, FilterList, Help, Search } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { AddProductStyle } from "./styles";
import FormNewProduct from "../FormNewProduct";
import { commonSelector, getProductsCommon } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { toUpperCaseChart } from "../../../../utils";

export default function AddNewProduct({ provider = null, addProduct, open, close }) {
  const { products, categories, typeProducts, brands } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const dispatch = useDispatch();
  const [keySearch, setKeySearch] = useState("");
  const [openProduct, setOpenProduct] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState(null);
  const [typeProduct, setTypeProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [productSelect, setProductSelect] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const rangeData = 50;
  const totalPages = Math.ceil(totalProducts / rangeData);

  useEffect(() => {
    if (open) reloadProducts();
  }, [open]);

  const handleSelectProduct = product => {
    setProductSelect(product);
    handleOpenFormProduct();
  };
  const handleCloseFormProduct = () => {
    setProductSelect({});
    setOpenProduct(false);
  };
  const handleCloseAll = () => {
    setProductSelect({});
    setOpenProduct(false);
    close();
  };
  const reloadProducts = () => {
    let query = {
      isactive: true,
      providerId: provider?.id,
    };
    let paramsProducts = {
      include: "category,provider,brand,productstype",
      join: "category,pro,bra,prodTy",
      where: JSON.stringify(query),
      all: 1,
      order: "-createdAt",
      count: 1,
    };
    dispatch(getProductsCommon({ params: paramsProducts }));
  };

  const productsData = useMemo(() => {
    let productsRes = products.results || [];
    if (keySearch) {
      productsRes = productsRes?.filter(
        todo =>
          todo.name?.toLowerCase()?.includes(keySearch.toLowerCase()) ||
          todo.code?.toLowerCase()?.includes(keySearch.toLowerCase()) ||
          todo.category?.name?.toLowerCase().includes(keySearch.toLowerCase())
      );
    }
    if (category?.id) productsRes = productsRes.filter(todo => todo.category?.id === category?.id);
    if (typeProduct?.id) productsRes = productsRes.filter(todo => todo.productstype?.id === typeProduct?.id);
    if (brand?.id) productsRes = productsRes.filter(todo => todo.brand?.id === brand?.id);

    setTotalProducts(productsRes.length);

    return productsRes.slice((page - 1) * rangeData, (page - 1) * rangeData + rangeData);
  }, [products, page, keySearch, category, typeProduct, brand]);

  const handleSelect = (setIdentifier, value) => {
    if (value) {
      setIdentifier(value);
    } else {
      setIdentifier(null);
    }
  };

  const handlePage = (event, value) => setPage(value);
  const handleOpenFormProduct = () => setOpenProduct(true);
  const handleShowFilters = () => setShowFilters(!showFilters);

  const chipData = [
    { id: keySearch?.length >= 1, label: "Búsqueda: " + keySearch, onDelete: () => setKeySearch("") },
    { id: category?.id, label: "Categoría: " + category?.name, onDelete: () => setCategory(null) },
    { id: typeProduct?.id, label: "Tipo de Producto: " + typeProduct?.name, onDelete: () => setTypeProduct(null) },
    { id: brand?.id, label: "Marca: " + brand?.name, onDelete: () => setBrand(null) },
  ];

  return (
    <AddProductStyle anchor="right" open={open} onClose={close}>
      <div className="content_products">
        <div className="content_products__header">
          <p className="title_header">
            Productos
            <Tooltip title="Cargar los Productos" arrow={true}>
              <Autorenew className="bt_reload" onClick={() => reloadProducts()} />
            </Tooltip>
          </p>
          <IconButton className="bt_close" onClick={() => close()}>
            <Close />
          </IconButton>
        </div>
        <div className="content_products__body">
          <Input
            className="search_box"
            placeholder="Buscar por Nombre del Producto..."
            fullWidth={true}
            disableUnderline={true}
            value={keySearch}
            onChange={e => setKeySearch(e.target.value)}
            startAdornment={<Search className="search_icon" />}
            endAdornment={
              <Button className="bt_filters" onClick={() => handleShowFilters()} startIcon={<FilterList />}>
                Filtros
              </Button>
            }
          />

          <Collapse in={showFilters}>
            <div className="filters">
              <Select
                className="select_filter"
                placeholder="Tipo de Producto"
                onMenuOpen={() => getCatalogBy("typeProducts")}
                onChange={e => handleSelect(setTypeProduct, e)}
                options={typeProducts.results}
                isLoading={typeProducts.isFetching}
                isClearable={true}
                value={typeProduct}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
              />
              <Select
                className="select_filter"
                placeholder="Categoría del Producto"
                onMenuOpen={() => getCatalogBy("categories")}
                onChange={e => handleSelect(setCategory, e)}
                options={categories.results}
                isLoading={categories.isFetching}
                isClearable={true}
                value={category}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
              />
              <Select
                className="select_filter"
                placeholder="Marca del Producto"
                onMenuOpen={() => getCatalogBy("brands")}
                onChange={e => handleSelect(setBrand, e)}
                isLoading={brands.isFetching}
                options={brands.results}
                isClearable={true}
                value={brand}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
              />
            </div>
          </Collapse>

          <div className="chips">
            <Chip
              icon={
                <Tooltip title="Solo se Mostraran Productos del Proveedor seleccionado en la Orden" arrow>
                  <Help />
                </Tooltip>
              }
              className="chip"
              color="primary"
              size="small"
              label={`Proveedor: ${
                provider?.name ? provider?.name : "" + provider?.companyname ? provider?.companyname : ""
              }`}
            />
            {chipData?.map(
              (chip, index) =>
                chip.id && (
                  <Chip
                    key={index}
                    className="chip"
                    color="primary"
                    size="small"
                    label={chip.label}
                    onDelete={chip.onDelete}
                  />
                )
            )}
          </div>

          <p className="count_products">
            <Ballot className="icon_count" />
            <span className="count">{totalProducts}</span>
            Total de Productos
          </p>
          <div className="table_products">
            <table className="table">
              <thead className="head">
                <tr className="tr_head">
                  <th className="th">Proveedor</th>
                  <th className="th">Modelo</th>
                  <th className="th">Producto</th>
                  <th className="th">Marca</th>
                  <th className="th">Categoría</th>
                </tr>
              </thead>
              <tbody className="body">
                {products?.isFetching && (
                  <tr>
                    <td className="load_products" colSpan={5}>
                      Cargando Productos...
                    </td>
                  </tr>
                )}

                {!products?.isFetching &&
                  productsData?.length >= 1 &&
                  productsData?.map((item, index) => (
                    <tr key={index} className="tr_body" onClick={() => handleSelectProduct(item)}>
                      <td className="td">{item.provider.companyname}</td>
                      <td className="td">{item.code}</td>
                      <td className="td product_name">{item.name}</td>
                      <td className="td">{item?.brand?.name}</td>
                      <td className="td">{item?.category?.name}</td>
                    </tr>
                  ))}
                {!products?.isFetching && productsData?.length === 0 && (
                  <tr>
                    <td className="empty_products" colSpan={5}>
                      No hay Productos del Proveedor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!products.isFetching && (
            <div className="pagination">
              <Pagination
                color="primary"
                shape="rounded"
                size="small"
                page={page}
                defaultPage={1}
                onChange={handlePage}
                count={totalPages}
              />
            </div>
          )}
        </div>
        <div className="content_products__footer"></div>
      </div>
      <FormNewProduct
        open={openProduct}
        close={handleCloseFormProduct}
        closeAll={handleCloseAll}
        product={productSelect}
        addProduct={addProduct}
      />
    </AddProductStyle>
  );
}
