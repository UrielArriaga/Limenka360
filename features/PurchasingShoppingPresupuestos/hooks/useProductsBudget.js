import React, { useEffect, useState } from "react";
import { BudgetsServices } from "../services";
import useModal from "../../../hooks/useModal";
import { handleGlobalAlert } from "../../../utils";
import { api } from "../../../services/api";
import { useDispatch } from "react-redux";

export default function useProductsBudget(budgetsSelected) {
  const BubgetsService = new BudgetsServices();
  const dispatch = useDispatch();
  const { open: openDelete, toggleModal: toggleProductDelete } = useModal();
  const [dataProduct, setDataProduct] = useState({
    data: [],
    fetching: false,
    count: 0,
  });
  const [productSelected, setDataProductSelected] = useState({});
  const [loaderBack, setLoaderBack] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (budgetsSelected) {
      getData();
    }
  }, [budgetsSelected, flag]);

  const getData = async () => {
    try {
      setDataProduct({ ...dataProduct, fetching: true });
      let query = {
        budgetId: budgetsSelected?.id,
      };
      const response = await BubgetsService.getProductsbudgets(query);
      let results = response?.data;

      setDataProduct({ ...dataProduct, fetching: false, data: results?.results, count: results?.count });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteProduct = async () => {
    setLoaderBack(true);

    try {
      let deleteProspect = await api.delete(`productsbudgets/${productSelected?.id}`);
      if (deleteProspect.status == 200) {
        toggleProductDelete();
        handleGlobalAlert("success", "Producto eliminado correctamente!", "basic", dispatch, 6000);
        setLoaderBack(false);
        setFlag(!flag);
      }
    } catch (error) {
      setLoaderBack(false);
      handleGlobalAlert("error", "Ocurrio un error al eliminar producto de presupuesto", "basic", dispatch, 6000);
      console.log(error);
    }
  };
  const refetchProducts = () => {
    setFlag(!flag);
  };
  return {
    dataProduct,
    openDelete,
    toggleProductDelete,
    productSelected,
    setDataProductSelected,
    DeleteProduct,
    loaderBack,
    refetchProducts,
  };
}
