import React, { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import RequestsApi from "../services/requestsApi";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";

function usePurcharseOrder(purchaseorderId) {
  const request = new RequestsApi();
  const router = useRouter();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const { open: isOpenModalPurcharseOrders, toggleModal: handleToggleModalPurcharseOrders } = useModal();
  const { page, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });

  const [totalProducts, setTotalProducts] = useState(0);
  const { id_user } = useSelector(userSelector);

  const [orderById, setOrderById] = useState({
    data: {},
    isFetching: false,
  });
  const [dataPickUp, setDataPickUp] = useState({
    data: {},
    isFetching: false,
  });
  const [dataPurcharseOrders, setDataPurcharseOrders] = useState({
    data: [],
    isFetching: false,
    count: 0,
  });

  const [orderSelected, setOrderSelected] = useState(null);
  const [ordersToAdd, setOrdersToAdd] = useState([]);

  const [dataDrivers, setDataDrievrs] = useState({
    data: [],
    isFetching: false,
    isError: false,
    ErrorMessage: "",
  });
  const [dataTransportunits, setDataTransportunits] = useState({
    data: [],
    isFetching: false,
    isError: false,
    ErrorMessage: "",
  });
  const [purcharseOrdersToPickups, setPurcharseOrdersToPickups] = useState([]);

  useEffect(() => {
    getTransportunits();
  }, []);
  useEffect(() => {
    getDrivers();
  }, []);
  useEffect(() => {
    getPurcharseOrder();
    getPickUps();
  }, [purchaseorderId]);
  useEffect(() => {
    getAllpurcharseOrder();
  }, [page, purchaseorderId, ordersToAdd, purcharseOrdersToPickups, isOpenModalPurcharseOrders]);

  const getTransportunits = async () => {
    try {
      let query = {};
      setDataTransportunits({ ...dataTransportunits, isFetching: true });
      let responseUnits = (await request.getDataTransportunits(query)).data;
      setDataTransportunits({ ...dataTransportunits, isFetching: false, data: responseUnits?.results });
    } catch (error) {
      console.log(error);
      setDataTransportunits({ ...dataTransportunits, isFetching: false, isError: true, ErrorMessage: error });
    }
  };

  const getDrivers = async () => {
    try {
      let query = {};
      setDataDrievrs({ ...dataDrivers, isFetching: true });
      let responseDrivers = (await request.getDrivers(query)).data;
      let normalize = responseDrivers?.results?.map(request.normalizeDrivers);
      setDataDrievrs({ ...dataDrivers, isFetching: false, data: normalize });
    } catch (error) {
      console.log(error);
      setDataDrievrs({ ...dataDrivers, isFetching: false, isError: true, ErrorMessage: error });
    }
  };

  const getPurcharseOrder = async () => {
    try {
      setOrderById({ ...orderById, isFetching: true });
      let response = await request.getPurcharseOrderById(purchaseorderId);
      if (response.status == 200 || response.status == 201) {
        let itemPurchase = response?.data;
        itemPurchase.isprimary = true;
        setOrderById({ isFetching: false, data: response?.data });
        setOrdersToAdd([...ordersToAdd.filter(item => item.id != itemPurchase.id), itemPurchase]);
        setPurcharseOrdersToPickups([
          ...purcharseOrdersToPickups.filter(item => item.id != itemPurchase.id),
          itemPurchase,
        ]);

        setTotalProducts(itemPurchase?.quantity);
      }
    } catch (error) {
      console.log(error, " ::Error");
      setOrderById({ ...orderById, isFetching: false });
    }
  };

  const getPickUps = async () => {
    try {
      setDataPickUp({ ...dataPickUp, isFetching: true });
      let query = {
        purchaseorderId,
      };
      let response = await request.getPickUps(query);
      if (response.status == 200 || response.status == 201) {
        setDataPickUp({ isFetching: false, data: response?.data?.results[0] });
      }
    } catch (error) {
      console.log(error, " ::Error pickups");
      setDataPickUp({ ...dataPickUp, isFetching: false });
    }
  };

  const getAllpurcharseOrder = async () => {
    try {
      setDataPurcharseOrders({ ...dataPurcharseOrders, isFetching: true });
      let response = await request.getPurcharsesOrders(page);
      if (response.status == 200 || response.status == 201) {
        let dataNormalize = response.data?.results.map(item => normalize(item));
        setDataPurcharseOrders({ isFetching: false, data: dataNormalize, count: response?.data?.count });
      }
    } catch (error) {
      console.log(error, " :Error all orders");
      setDataPurcharseOrders({ ...dataPurcharseOrders, isFetching: false });
    }
  };

  const normalize = item => {
    if (item.id == orderById?.data?.id) {
      return {
        ...item,
        isprimary: true,
      };
    } else {
      return {
        ...item,
      };
    }
  };

  const handleOnChangeAddOrder = (isChecked, order) => {
    if (!isChecked) {
      return setOrdersToAdd(ordersToAdd.filter(item => item.id !== order.id));
    } else {
      setOrdersToAdd([...ordersToAdd, order]);
    }
  };
  const handleAddPurcharseOrder = (isChecked, order) => {
    if (!isChecked) return setPurcharseOrdersToPickups(purcharseOrdersToPickups.filter(item => item.id !== order.id));
    setPurcharseOrdersToPickups([...purcharseOrdersToPickups, order]);
  };

  const handleAddAllPurchaseOrders = (isChecked, orders) => {
    if(!isChecked) { 
      setPurcharseOrdersToPickups(purcharseOrdersToPickups.filter(item => item.id == purchaseorderId));
      setOrdersToAdd([...ordersToAdd.filter(item => item.id == purchaseorderId)])
    } else {
      let arrayAuxOrders = [];
      orders?.map(item => arrayAuxOrders.push(item) );
      setPurcharseOrdersToPickups(arrayAuxOrders);
    }
  }

  const handleOnClickSelectOrder = order => setOrderSelected(order);
  const deleteOfListOrder = order => {
    setPurcharseOrdersToPickups(purcharseOrdersToPickups.filter(item => item.id !== order.id));
    setOrdersToAdd([...ordersToAdd.filter(item => item.id != order.id)]);
  };

  const createRouteRecoleccion = async dataForm => {
    dataForm.createdbyId = id_user;

    if (dataForm.purchaseorders.length == 0) {
      showAlertWarning("selecciona al menos una orden de compra");
    } else {
      try {
        let response = await request.createNewRecoleccion(dataForm);
        if (response.status == 200 || response.status == 201) {
          showAlertSucces("Recoleccion creada");
          router.push("/encargadosalidas/recolecciones");
        }
      } catch (error) {
        console.log(error, "Error post recoleccion");
        showAlertError("Error al crear la nueva recoleccion");
      }
    }
  };

  return {
    orderById,
    dataPickUp,
    dataPurcharseOrders,
    isOpenModalPurcharseOrders,
    handleToggleModalPurcharseOrders,
    handleOnChangeAddOrder,
    ordersToAdd,
    handleOnClickSelectOrder,
    orderSelected,
    deleteOfListOrder,
    dataDrivers,
    dataTransportunits,
    handleAddPurcharseOrder,
    purcharseOrdersToPickups,
    handlePage,
    page,
    createRouteRecoleccion,
    totalProducts,
    handleAddAllPurchaseOrders
  };
}

export default usePurcharseOrder;
