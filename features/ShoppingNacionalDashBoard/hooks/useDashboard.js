import React, { useEffect, useState } from "react";
import { OrdersServices } from "../services";
import useModal from "../../../hooks/useModal";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { useRouter } from "next/router";
import { getColor } from "../../PurchasingManager/utils";
import { getColorStatusOrder } from "../../../utils/DirLog";
import usePagination from "../../../hooks/usePagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

export default function useDashboard(isAdmin = false, folio = "") {
  const { phases, actions } = useSelector(commonSelector);
  const { id_user } = useSelector(userSelector);
  const { getCatalogBy } = useGlobalCommons();
  const ordersService = new OrdersServices();
  const router = useRouter();
  const { open, toggleModal, closeModal } = useModal();
  const { open: openModalEdit, toggleModal: toggleModalEdit } = useModal();
  const { handlePagination: handlePage, page, limit } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { open: openModalCreate, toggleModal: toggleModalCreate } = useModal();
  const [slotSelected, setSlotSelected] = useState({});
  const [slotToEdit, setSlotToEdit] = useState({});
  const [avaliableModal, setAvaliableModal] = useState(false);
  const [ejecutivesData, setEjecutiveData] = useState();
  const [role, setRoles] = useState( { roleId: ["l0mRG6ytPeEXc6KxJpMdMQ1S", "3Do6TEdJgT043d3m78bJ22kM", "wnEQjoeEI6UiirLILYsZivtS", "LOsE6ldJgT0162Um78bJH4kM" ]});

  let headsProducts = [
    {
      headText: "Código",
      headNormalize: "code",
      orderby: null,
    },
    {
      headText: "Nombre",
      headNormalize: "name",
      orderby: "-name",
    },
    {
      headText: "Stock",
      headNormalize: "stock",
      orderby: null,
    },
    {
      headText: "Proveedor",
      headNormalize: "providerId",
      orderby: null,
    },
    {
      headText: "Precio Unitario",
      headNormalize: "amount",
      orderby: null,
    },
    {
      headText: "Precio Tienda",
      headNormalize: "storeamount",
      orderby: null,
    },
  ];

  // const [productsOrders, setProductsOrders] = useState({
  //   data: [],
  //   isFetchingData: false,
  //   total: 0,
  // });
  // const [providers, setProviders] = useState({
  //   data: [],
  //   isFetchingData: false,
  //   total: 0,
  // });
  const [pendingsShopping, setPendingsShopping] = useState({
    data: [],
    isFetching: false,
    total: 0,
  });
  useEffect(() => {
    getEjecutiveData();
    getCatalogBy("phases", {
      all: true,
      count: 1,
    });
    getCatalogBy("actions", {
      all: true,
      count: 1,
    });
  }, []);

  useEffect(() => {
    getDataPendigs();
  }, [page]);

  const getDataPendigs = async () => {
    try {
      setPendingsShopping(prevState => ({ ...prevState, isFetching: true }));
      let query= {
        isdone: false,
        ejecutiveId: id_user
      }
      let response = await ordersService.getDataPendingsShopping(limit, page, query);
      if (response.status == 200 || response.status == 201) {
        let { results, count } = response?.data;
        let dataNormalize = results?.map(item => ordersService.normalizePendings(item));
        setPendingsShopping({ data: dataNormalize, total: count, isFetching: false });
      }
    } catch (error) {
      setPendingsShopping(prevState => ({ ...prevState, isFetching: false }));
      console.log(error, "Error");
    }
  };

  const getEjecutiveData = async () => {
    try {
      const resData = (await ordersService.getEjecutives(role)).data;
      setEjecutiveData(resData.results);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getProducts();
  // }, []);
  // useEffect(() => {
  //   getProviders();
  // }, []);
  // const getProducts = async () => {
  //   try {
  //     setProductsOrders({ ...productsOrders, isFetchingData: true });
  //     let response = await ordersService.getProductsOrder(limitRes, pageRes);
  //     if (response.status == 200) {
  //       let dataNormalize = response?.data?.results.map(item => ordersService.normalizeDataProducts(item));
  //       setProductsOrders({ data: dataNormalize, total: response.data.count, isFetchingData: false });
  //     }
  //   } catch (error) {
  //     setProductsOrders({ ...productsOrders, isFetchingData: false });
  //   }
  // };
  // const getProviders = async () => {
  //   try {
  //     setProviders({ ...providers, isFetchingData: false });
  //     let response = await ordersService.getProviders(limitPro, pagePro);
  //     console.log(response.data, "pro");

  //     if (response.status == 200) {
  //       let normalizeData = response?.data?.results.map(item => {
  //         return {
  //           ...item,
  //           total: Math.floor(Math.random() * (1000 - 99) + 94),
  //         };
  //       });
  //       setProviders({ data: normalizeData, total: response.data.count, isFetchingData: false });
  //     }
  //   } catch (error) {
  //     setProviders({ ...providers, isFetchingData: false });
  //   }
  // };

  const NormalizeDataToPost = data => {
    return {
      notify_by: "Correo",
      remember_by: "Correo",
      remember: true,
      description: data.eventComment,
      place: "",
      subject: data.eventName,
      date_from: dayjs(data.eventDate).toDate(),
      date_to: null,
      isdone: false,
      status: 1,
      zone: "GMT-06:00",
      priority: 0,
      recurrent: false,
      postponedtime: dayjs(data.eventDateEnd).toDate(),
      purchaseorderId: null,
      pendingstypeId: data?.typeName?.id,
      ejecutiveId: id_user,
    };
  };

  const createNewPending = async data => {
    let body = {};
    body = NormalizeDataToPost(data);
    try {
      toggleModalCreate();
      let response = await ordersService.createPending(body);
      if (response.status == 200 || response.status == 201) {
        showAlertSucces("Nuevo pendiente creado correctamente");
        getDataPendigs();
      }
    } catch (error) {
      showAlertError("Error al crear pendiente");
      console.log(error);
    }
  };

  const NormalizeDataToEdit = data => {
    return {
      description: data?.eventComment,
      subject: data?.eventName,
      date_from: dayjs(data?.eventDate).toDate(),
      postponedtime: dayjs(data?.eventDateEnd).toDate(),
      pendingstypeId: data?.typeName?.id,
    };
  };

  const updatePending = async data => {
    let body = {};
    body = NormalizeDataToEdit(data);
    try {
      toggleModalEdit();
      let response = await ordersService.updatePendingsshopping(slotToEdit?.id, body);
      if (response.status == 200 || response.status == 201) {
        showAlertSucces("Pendiente Actulizado Correctamente");
        getDataPendigs();
      }
    } catch (error) {
      showAlertError("Error al actualizar pendiente");
      console.log(error, ":Error");
    }
  };

  const closeModalCreate = () => {
    setAvaliableModal(false);
    toggleModalCreate();
  };

  const finishPending =  async data => {
    let dataNormalize = {
      reason: data?.reason,
      observations: data?.observations,
      // purchaseorderId: slotToEdit?.id,
      // createdbyId: id_user,
    };

    try {
      let response = await ordersService.postTrackingsPendings(dataNormalize);
      if(response.status == 200 || response.status == 201){
        putPending()
      }
    } catch (error) {
      console.log(error, "Error");
      showAlertError("Algo ocurrio al finalizar pendiente");
    }

    
  };

  const putPending = async() => {
    try {
      let body = {
        isdone:true
      }
      let response = await ordersService.updatePendingsshopping(slotToEdit?.id, body);
      if(response.status == 201 || response.status == 200){
        showAlertSucces("Se finalizo pendiente correctamente");
        closeModal();
        getDataPendigs();
      }
    } catch (error) {
      console.log(error, "error");
      showAlertError("Error al finalizar pendiente");
    }
  }

  return {
    pendingsShopping,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    openModalCreate,
    toggleModalCreate,
    setSlotSelected,
    slotSelected,
    createNewPending,
    slotToEdit,
    setSlotToEdit,
    openModalEdit,
    toggleModalEdit,
    updatePending,
    closeModalCreate,
    setAvaliableModal,
    avaliableModal,
    modalFinish: {
      open,
      closeModal,
      toggleModal,
    },
    phases,
    actions,
    finishPending,
    ejecutivesData,
  };
}
