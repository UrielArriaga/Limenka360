import React, { useEffect, useState } from "react";
import RequestApiEntries from "../services";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { NormalizePostProductEntry } from "../utils";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

function useProducts() {
  const request = new RequestApiEntries();
  const { id_user,userData } = useSelector(userSelector);
  const [productQuantities, setProductQuantities] = useState("");
  const { showAlertWarning, showAlertSucces } = useAlertToast();
  const router = useRouter();
  const { page, setPage, handlePage, limit, handlePagination } = usePagination({
    defaultLimit: 15,
    defaultPage: 1,
    count: products?.count,
  });
  const [products, setProducts] = useState({
    count: 1,
    data: [],
    isFetching: false,
  });
  const [keyWord, setKeyWord] = useState("");
  const [open, setOpen] = useState(false);
  const [productToArticle, setProductToArticle] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [provider, setProvider] = useState({});
  const [observations, setObservations] = useState("");
  const [tipeEntry, setTipeEntry] = useState("");
  const [warehouse, setWareHouse] = useState("");

  useEffect(() => {
    getAllProducts();
  }, [page, keyWord]);

  useEffect(() => {
    if (warehouse?.id) {
      const updatedProducts = productToArticle.map(product => ({
        ...product,
        warehouseId: warehouse.id
      }));
      setProductToArticle(updatedProducts);
    }
  }, [warehouse]);

  const getAllProducts = async () => {
    try {
      let query = {};
      if (keyWord.length > 3) {
        query.name = {
          $iRegexp: keyWord.trim(),
        };
      }
      setProducts({ ...products, isFetching: true });
      let response = await request.getProducts(limit, page, query);
      if (response.status == 200) {
        setProducts({ isFetching: false, count: response.data.count, data: response.data.results });
      }
    } catch (error) {
      setProducts({ ...products, isFetching: false });
      console.log(error, " ERROR");
    }
  };

  const handleOpenModalProduct = () => setOpen(true);
  const onClose = () => setOpen(false);
  const fetchAllProducts = () => {
    getAllProducts();
  };
  const handleSearchProduct = value => {
    setKeyWord(value);
  };

  // const handleClickAddProduct = (product, position) => {
  //   let Product = {
  //     ...product,
  //     serial: "",
  //     warehouseId: "",
  //     comments: "",
  //   };
  //   setProductToArticle([...productToArticle, Product]);
  //   onClose();
  // };
  const handleClickAddProduct = (product, position, quantity = null) => {
    const finalQuantity = quantity > 0 ? quantity : 1;
    const newProducts = Array.from({ length: finalQuantity }, () => ({
      ...product,
      serial: "",
      //warehouseId: userData?.warehouse?.id,
      warehouseId: warehouse?.id,
      comments: "",
    }));

    setProductToArticle([...productToArticle, ...newProducts]);
    onClose();
  };
  const handleQuantityChange = (index, value) => {
    setProductQuantities(value);
  };
  const handleValidateDataInputs = (option, product, i, nameInput = "warehouse") => {
    switch (typeof option) {
      case "object":
        const data = productToArticle?.map((item, index) => {
          if (index == i) {
            return {
              ...item,
              warehouseId: option.id,
            };
          } else {
            return item;
          }
        });
        setProductToArticle(data);
        break;
      case "string":
        if (nameInput == "serial") {
          const data = productToArticle?.map((item, index) => {
            if (index == i) {
              return {
                ...item,
                serial: option,
              };
            } else {
              return item;
            }
          });
          setProductToArticle(data);
        } else {
          const data = productToArticle?.map((item, index) => {
            if (index == i) {
              return {
                ...item,
                comments: option,
              };
            } else {
              return item;
            }
          });
          setProductToArticle(data);
        }
        break;
      default:
        break;
    }
  };

  const deleteToList = (i) => {
    setProductToArticle((prev) => prev.filter((__, index) => index !== i));
    setSelectedProducts((prev) => prev.filter((__, index) => index !== i));
  };
  const conmProductSelection = (index) => {
    setSelectedProducts((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  const generateUniqueSerials = () => {
    const updatedProducts = [...productToArticle];
    selectedProducts.forEach((index) => {
      const product = updatedProducts[index];
      if (product) {
      const year = new Date().getFullYear();
      const sixDigits = Math.floor(100000 + Math.random() * 900000);
      const uniqueSerial = `SN${year}${sixDigits}${index}`;
      product.serial = uniqueSerial;
      }
    });
    handleValidateDataInputs(updatedProducts);
    setSelectedProducts([]);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === productToArticle.length) {
      setSelectedProducts([]);
    } else {
      const allIndexes = productToArticle.map((_, index) => index);
      setSelectedProducts(allIndexes);
    }
  };

  const createNewEntry = async () => {
    let DataProductNormalize = NormalizePostProductEntry(productToArticle);
        
    if (tipeEntry == "" || tipeEntry == undefined) {
      showAlertWarning("Ingresa el tipo de entrada");
    } else if (productToArticle?.length == 0) {
      showAlertWarning("Selecciona por lo menos un producto");
    } else {
      let isVoidInput = DataProductNormalize?.some(item => {
        return Object.values(item).some(product => product == "" || product == null || product == undefined);
      });

      if (isVoidInput) {
        showAlertWarning("Ningun campo de los articulos debe estar vacio");
        return;
      }

      try {
        let body = {
          deliverydate: dayjs(new Date()).format(""),
          observations: observations || "",
          providerId: provider?.id,
          typesentriesId: tipeEntry?.id,
          warehouseproducts: DataProductNormalize,
          createdById: id_user,
          warehouseId: warehouse?.id,
        };

        let response = await request.postEntryManual(body);
        if (response.status == 201) {
          showAlertSucces("Se creo entrada correctamente");
          router.push({ pathname: `/directorlogistica/entradas` });
          console.log(response, " respuesta");
        }
      } catch (error) {
        console.log(error, "ERROR");
      }
    }
  };

  return {
    products,
    paginationData: {
      handlePagination,
      page,
      limit,
    },
    handleOpenModalProduct,
    onClose,
    open,
    fetchAllProducts,
    keyWord,
    handleSearchProduct,
    handleClickAddProduct,
    productToArticle,
    handleValidateDataInputs,
    deleteToList,
    setProvider,
    setWareHouse,
    setObservations,
    createNewEntry,
    setTipeEntry,
    warehouse,
    productQuantities,
    setProductQuantities,
    handleQuantityChange,
    selectedProducts,
    conmProductSelection,
    generateUniqueSerials,
    toggleSelectAll,
  };
}

export default useProducts;
