import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { OrdersServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useReturn(
  purcharseOrdersToPickups,
  productToOrderSelected,
  setRefetch,
  refetch,
  handleCancelAll,
  openWarningModal,
  handleCloseWarningModal
) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { typereturns } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const serviceApi = new OrdersServices();
  const [dataWarehouses, setDataWarehouses] = useState([]);
  const selectedProducts = productToOrderSelected ? productToOrderSelected : purcharseOrdersToPickups;

  const { showAlertSucces, showAlertError } = useAlertToast();

  useEffect(() => {
    if (openWarningModal) {
      fetchData();
    }
  }, [openWarningModal]);

  const fetchData = async () => {
    try {
      const response = (await serviceApi.getWareHouses()).data;
      let normalizeData = response?.results.map(serviceApi.normalizeWareHouser);
      setDataWarehouses(normalizeData);
    } catch (error) {
      showAlertError("Error al mostrar almacenes");
    }
  };

  const GiveToBack = async formData => {
    try {
      let newData = {
        comment: formData.observations || "sin observaciones",
        typereturnsId: formData?.reason?.id,
        quantity: selectedProducts.length,
        warehouseId: formData?.warehouse?.id,
        whproducts: selectedProducts.map(product => ({ id: product?.id })),
      };
      console.log("data devolucion:",newData);
      let orderNews = await api.post("returns/manual", newData);
      if (orderNews.status == 201) {
        setRefetch(!refetch);
        handleCancelAll();
        showAlertSucces("Devolución Creada con Exito");
        handleClose();
      }
    } catch (error) {
      showAlertError("Ocurrion un error al realizar devolución");
      console.log(error);
    }
  };

  const handleClose = () => {
    setValue("reason", "");
    setValue("warehouse", "");
    setValue("observations", "");
    handleCloseWarningModal();
  };

  return {
    handleClose,
    GiveToBack,
    dataWarehouses,
    typereturns,
    getCatalogBy,
    handleSubmit,
    control,
    register,
    errors,
    selectedProducts,
  };
}
