import React, { useMemo, useState } from "react";
import { commonSelector, getProductsCommon } from "../../../redux/slices/commonSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { api } from "../../../services/api";

export default function useAddProducts() {
  const { products } = useSelector(commonSelector);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productSelected, setProductSelected] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectBrand, setSelectBrand] = useState("");
  const [selectTypeProduct, setSelectTypeProducts] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleShowFilter = () => setShowFilters(!showFilters);
  const dispatch = useDispatch();
  const todosPerPage = 50;
  const [limit, setLimit] = useState(20);
  api;

  const totalPages = Math.ceil(totalProducts / todosPerPage);

  const handleReloadProducts = () => {
    let paramsProducts = {
      include: "category,provider,brand",
      join: "category,pro,bra,prodTy",
      where: `{"isactive": true}`,
      all: 1,
      order: "-createdAt",
      count: 1,
    };
    dispatch(getProductsCommon({ params: paramsProducts }));
  };
  const todosData = useMemo(() => {
    let productsRes = products.results;
    if (searchTerm) {
      productsRes = productsRes.filter(
        todo =>
          todo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo?.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo?.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectCategory) {
      productsRes = productsRes.filter(todo => todo.category?.id === selectCategory.id);
    }
    if (selectTypeProduct) {
      productsRes = productsRes.filter(todo => todo.productstype?.id === selectTypeProduct.id);
    }
    if (selectBrand) {
      productsRes = productsRes.filter(todo => todo.brand?.id === selectBrand.id);
    }
    setTotalProducts(productsRes?.length);

    return productsRes?.slice((page - 1) * todosPerPage, (page - 1) * todosPerPage + todosPerPage);
  }, [products, page, searchTerm, selectCategory, selectTypeProduct, selectBrand]);

  const handlePage = (e, page) => {
    setPage(page);
  };

  const handleSearch = e => {
    let key = e.target.value;
    setSearchTerm(key);
  };

  const handleProductSelected = product => {
    setProductSelected({
      ...product,
      callamount: 0,
    });
    handleOpenAdd();
  };

  const removeCategory = () => {
    setSelectCategory("");
    cleanPagination();
  };
  const removeBrand = () => {
    setSelectBrand("");
    cleanPagination();
  };

  const removeTypeProduct = () => {
    setSelectTypeProducts("");
    cleanPagination();
  };

  const removeProduct = () => {
    setSearchTerm("");
    cleanPagination();
  };

  const handleCategory = event => {
    if (event) {
      setSelectCategory(event);
      // setShowChipsProducts(true);
    } else {
      removeCategory();
    }
  };
  const handleBrand = event => {
    if (event) {
      setSelectBrand(event);
      // setShowChipsProducts(true);
    } else {
      removeBrand();
    }
  };

  const handleTypeProduct = event => {
    if (event == null) {
      removeTypeProduct();
    } else {
      setSelectTypeProducts(event);
      // setShowChipsProducts(true);
    }
  };

  const cleanPagination = () => {
    // setFlag(!flag);
    toggleFlag();
  };
  const toggleFlag = () => {
    if (page > 1) setPage(1);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return {
    states: {
      showFilters,
      products,
      totalPages,
      totalProducts,
      todosPerPage,
      limit,
      page,
      todosData,
      selectCategory,
      selectBrand,
      selectTypeProduct,
      openAdd,
      productSelected,
      searchTerm,
    },
    functions: {
      handleShowFilter,
      handleReloadProducts,
      handlePage,
      handleOpenAdd,
      handleCloseAdd,
      handleProductSelected,
      removeCategory,
      removeBrand,
      removeTypeProduct,
      removeProduct,
      handleCategory,
      handleBrand,
      handleTypeProduct,
      handleSearch,
    },
  };
}
