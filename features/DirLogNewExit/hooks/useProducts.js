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
  const { id_user } = useSelector(userSelector);
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

  const [provider, setProvider] = useState({});
  const [observations, setObservations] = useState("");
  const [tipeEntry, setTipeEntry] = useState("");

  useEffect(() => {
    getAllProducts();
  }, [page, keyWord]);

  const getAllProducts = async () => {
    try {
      let query = {};
      if (keyWord.length > 3) {
        query.product = { name: { $iRegexp: keyWord.trim() } };
      }
      setProducts({ ...products, isFetching: true });
      let response = await request.getArticles(limit, page, query);
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

  const handleClickAddProduct = (product, position) => {
    let Product = {
      ...product,
      serial: "",
      warehouseId: "",
      comments: "",
    };
    setProductToArticle([...productToArticle, Product]);
    onClose();
  };

  const handleValidateDataInputs = (option, product, i, nameInput = "warehouse") => {
    switch (typeof option) {
      case "object":
        const data = productToArticle?.map((item, index) => {
          if (index == i) {
            return {
              ...item,
              warehouseId: option?.id,
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

  const deleteToList = i => setProductToArticle([...productToArticle.filter((__, index) => index != i)]);

  const createNewEntry = async () => {
    let DataProductNormalize = NormalizePostProductEntry(productToArticle);

    if (productToArticle?.length == 0) {
      showAlertWarning("Selecciona por lo menos un producto");
    } else {
      let isVoidInput = DataProductNormalize?.some(item => {
        return Object.values(item).some(product => product == "" || product == null || product == undefined);
      });

      try {
        let body = {
          deliverydate: dayjs(new Date()).format(""),
          observations: observations || "",
          warehouseproducts: DataProductNormalize,
          createdById: id_user,
        };

        let response = await request.postEntryManual(body);
        if (response.status == 201) {
          showAlertSucces("Se creo entrada correctamente");
          router.push({ pathname: `/directorlogistica/salidas` });
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
    setObservations,
    createNewEntry,
    setTipeEntry,
  };
}

export default useProducts;
