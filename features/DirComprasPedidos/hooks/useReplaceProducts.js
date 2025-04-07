import { useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import RequestApiReplace from "../services";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useAlertToast from "../../../hooks/useAlertToast";

function useReplaceProducts() {
  const request = new RequestApiReplace();
  const { id_user, userData, roleId } = useSelector(userSelector);
  const { showAlertWarning, showAlertSucces } = useAlertToast();
  const [products, setProducts] = useState({
    count: 1,
    data: [],
    isFetching: false,
  });
  const [keyWord, setKeyWord] = useState("");
  const [open, setOpen] = useState(false);

  const pagination = usePagination({
    defaultLimit: 15,
    defaultPage: 1,
    count: products.count,
  });

  useEffect(() => {
    getAllProducts();
  }, [pagination.page, keyWord]);

  const getAllProducts = async () => {
    try {
      let query = { isactive: true };

      if (keyWord.length > 3) {
        query = {
          ...query,
          $or: [{ name: { iRegexp: keyWord.trim() } }, { code: { iRegexp: keyWord.trim() } }],
        };
      }

      setProducts(prev => ({ ...prev, isFetching: true }));

      const response = await request.getProducts(pagination.limit, pagination.page, query);

      if (response.status === 200) {
        setProducts({
          isFetching: false,
          count: response.data.count,
          data: response.data.results,
        });
      }
    } catch (error) {
      setProducts(prev => ({ ...prev, isFetching: false }));
      console.error("Error fetching products:", error);
    }
  };

  const fetchAllProducts = () => {
    getAllProducts();
  };

  const createReplace = async (originalProduct, newProduct) => {
    if (!originalProduct?.id || !newProduct?.id) {
      showAlertWarning("Debes seleccionar ambos productos para el reemplazo");
      return false;
    }
    try {
      let body = {
        products: [
          {
            productoportunityId: originalProduct.id,
            toreplace: newProduct.id,
          },
        ],
      };

      let response = await request.postReplaceProduct(body);
      if (response.status === 201) {
        showAlertSucces("Reemplazo realizado con éxito");
        fetchAllProducts();
        return true;
      }
    } catch (error) {
      console.error("Error en reemplazo:", error);
      showAlertWarning("Error al realizar el reemplazo");
      return false;
    }
  };

  return {
    products,
    paginationData: {
      handlePagination: pagination.handlePagination,
      page: pagination.page,
      limit: pagination.limit,
    },
    handleOpenModal: () => setOpen(true),
    handleCloseModal: () => setOpen(false),
    open,
    handleSearch: setKeyWord,
    keyWord,
    fetchAllProducts,
    createReplace,
    refreshProducts: () => {
      setKeyWord("");
      pagination.setPage(1);
    },
  };
}

export default useReplaceProducts;
