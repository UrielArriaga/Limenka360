import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ProductsServices } from "../services";
import useModal from "../../../hooks/useModal";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useCalendarSupplierActivities() {
  const { phases, actions } = useSelector(commonSelector);
  const { showAlertError, showAlertWarning, showAlertSucces } = useAlertToast();
  const { id_user } = useSelector(userSelector);
  const { open, toggleModal, closeModal } = useModal();
  const { getCatalogBy } = useGlobalCommons();
  const DirCompProvider = new ProductsServices();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectDate, setSelectDate] = useState();
  const [selectDateEdit, setSelectDateEdit] = useState();
  const [providerData, setProviderData] = useState();
  const [ejecutivesData, setEjecutiveData] = useState();
  const [typesData, setTypesData] = useState();
  const [role, setRoles] = useState( { roleId: ["l0mRG6ytPeEXc6KxJpMdMQ1S", "3Do6TEdJgT043d3m78bJ22kM", "wnEQjoeEI6UiirLILYsZivtS", "LOsE6ldJgT0162Um78bJH4kM" ]});
  const [pendingsShopping, setPendingsShopping] = useState([]);
  const [isEventFinished, setIsEventFinished] = useState(false);

  useEffect(() => {
    getProvidersData();
    getEjecutiveData();
    getPeddinsData();
    getEvenstData();
    getCatalogBy("phases", {
      all: true,
      count: 1,
    });
    getCatalogBy("actions", {
      all: true,
      count: 1,
    });
  }, []);

  
  const getProvidersData = async () => {
    try {
      const resData = (await DirCompProvider.getProviders()).data;
      setProviderData(resData.results);
    } catch (error) {
      console.error(error);
    }
  };
  // const getEjecutiveData = async () => {
  //   try {
  //     const resData = (await DirCompProvider.getEjecutives(role)).data;
  //     setEjecutiveData(resData.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getEjecutiveData = async () => {
    try {
      const resData = (await DirCompProvider.getEjecutives(role)).data;
      let ejecutives = resData.results || [];
  
      if (!ejecutives.some(e => e.id === id_user)) {
        ejecutives.push({
          id: id_user,
          name: "Yo mismo",
        });
      }
  
      setEjecutiveData(ejecutives);
    } catch (error) {
      console.error(error);
    }
  };
  const createNewPending = async data => {
    let body = {};
    body = PostEvenstData(data);
    try {
      toggleModal();
      let response = await ordersService.createPending(body);
      if (response.status == 200 || response.status == 201) {
        showAlertSucces("Nuevo pendiente creado correctamente");
        getPeddinsData();
      }
    } catch (error) {
      showAlertError("Error al crear pendiente");
      console.log(error);
    }
  };
  
  const getPeddinsData = async () => {
    try {
      const resData = (await DirCompProvider.getPeddingsType()).data;
      setTypesData(resData.results);
      // console.log("peticionb de pedins", resData.results);
    } catch (error) {
      console.error(error);
    }
  };
  const Normalize = item => {
    return {
      title: item?.subject,
      start: item?.date_from,
      end: item?.postponedtime,
      comment: item?.description,
      itemdetails: item,
      typePedding: item?.pendingstype?.name,
    };
  };

  const getEvenstData = async () => {
    try {
      const resData = (await DirCompProvider.getPendingsshopping()).data; 
      let normalizeData = resData.results.map(item => Normalize(item));
      setPendingsShopping(normalizeData);
    } catch (error) {
      console.error(error);
    }
  };

  const PostEvenstData = async item => {
    let data = {
      notify_by: "Correo",
      remember_by: "Correo",
      remember: true,
      description: item.eventComment,
      place: "",
      subject: item.eventName,
      date_from: dayjs(item.eventDate).toDate(),
      date_to: null,
      isdone: false,
      status: 1,
      zone: "GMT-06:00",
      priority: 0,
      recurrent: false,
      postponedtime: dayjs(item.eventDateEnd).toDate(),
      purchaseorderId: null,
      pendingstypeId: item?.typeName?.id,
      // ejecutiveId: item.ejecutiveName?.id,
      ejecutiveId: item.ejecutiveName?.id || id_user,
    };
    try {
      const resData = (await DirCompProvider.postPendingsshopping(data)).data;
       console.log(resData);
       
      getEvenstData();
    } catch (error) {
      console.error(error);
    }
  };
  const PutEvenstData = async item => {
    let data = {
      description: item.eventComment,
      subject: item.eventName,
      date_from: dayjs(item.eventDate).toDate(),
      postponedtime: dayjs(item.eventDateEnd).toDate(),
      pendingstypeId: item?.typeName?.id,
      isdone: false
    };
    try {
      const resData = (await DirCompProvider.putPendingsshopping(selectDateEdit?.id, data)).data;

      getEvenstData();
    } catch (error) {
      console.error(error);
    }
  };

  // const finishPending =  async data => {
  //   let dataNormalize = {
  //     reason: data?.reason,
  //     observations: data?.observations,
  //     // purchaseorderId: selectDateEdit?.id,
  //     // createdbyId: id_user,
  //   };

  //   try {
  //     let response = await DirCompProvider.postTrackingsPendings(dataNormalize);
  //     if(response.status == 200 || response.status == 201){
  //       putPending()
  //       setIsEventFinished(true);
  //     }
  //   } catch (error) {
  //     console.log(error, "Error");
  //     showAlertError("Algo ocurrio al finalizar pendiente");
  //   }
  // };
  const finishPending = async data => {
    let dataNormalize = {
      reason: data?.reason,
      observations: data?.observations,
    };
  
    try {
      let response = await DirCompProvider.postTrackingsPendings(dataNormalize);
      if (response.status === 200 || response.status === 201) {
        await putPending();
        setIsEventFinished(true);
      }
    } catch (error) {
      console.log(error, "Error");
      showAlertError("Algo ocurrió al finalizar pendiente");
    }
  };
  

  const putPending = async() => {
    try {
      let body = {
        isdone:false
      }
      let response = await DirCompProvider.putPendingsshopping(selectDateEdit?.id, body);
      if(response.status == 201 || response.status == 200){
        showAlertSucces("Se finalizo pendiente correctamente");
        closeModal();
        getEvenstData();
      }
    } catch (error) {
      console.log(error, "error");
      showAlertError("Error al finalizar pendiente");
    }
  }

  // const handleSelectSlot = slotInfo => {
  //   setFormData(slotInfo);
  // };

  const handleSelectSlot = slotInfo => {
    setFormData(slotInfo);
    if (slotInfo?.itemdetails?.isdone) {
      showAlertWarning("Este evento ya ha sido finalizado.");
    } else {
      setOpenModal(true);
    }
  };
  
  
  

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClickOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };
  const refrechEvents = () => {
    getEvenstData();
  };
  const handleFormData = item => {
    PostEvenstData(item);
  };
  const handleFormDataEdit = item => {
    PutEvenstData(item);
  };
  return {
    handleSelectSlot,
    handleClickOpenModal,
    handleCloseModal,
    openModal,
    openModalEdit,
    handleFormData,
    setSelectDate,
    selectDate,
    providerData,
    ejecutivesData,
    typesData,
    refrechEvents,
    pendingsShopping,
    createNewPending,
    handleCloseModalEdit,
    handleClickOpenModalEdit,
    setSelectDateEdit,
    selectDateEdit,
    handleFormDataEdit,
    modalFinish: {
      open,
      closeModal,
      toggleModal,
    },
    phases,
    actions,
    finishPending,
  };
}
