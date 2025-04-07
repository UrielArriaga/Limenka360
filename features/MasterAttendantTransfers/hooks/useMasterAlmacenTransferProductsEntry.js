import React from "react";
import { useEffect, useState } from "react";
import { OrdersServices } from "../services";
import useModal from "../../../hooks/useModal";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useAlertToast from "../../../hooks/useAlertToast";
import { templateEquipmentTransfers } from "../../../templates/templatesHtml";

function useMasterAlmacenTransferProductsEntry(selectedTransfer) {
  const [productsTransfer, setProductsTransfer] = useState([]);
  const { showAlertError, showAlertSucces } = useAlertToast();
  const { id_user, groupId, company, username, name } = useSelector(userSelector);
  const { 
    open: openModalEntry,
    toggleModal: toggleModalEntry, 
    closeModal: closeModalEntry 
  } = useModal();
  const [isFetching, setIsFetching] = useState(false);
  const [observations, setObservations] = useState("");
  const ordersServices = new OrdersServices();
  useEffect(() => {
    if (selectedTransfer) {
      getDataSelectedInventory();
    }
  }, [selectedTransfer]);

  let getDataSelectedInventory = async () => {
    try {
      setIsFetching(true);
      let query = {
        inventorytransferId: selectedTransfer?.id,
      };
      const response = await ordersServices.getProductsOfTransfers(query);
      setProductsTransfer(response?.data?.results);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const createEntryArticles = () => {
    toggleModalEntry();
  };

  const NormalizeArticles = () => {
    let data = [...productsTransfer];
    let dataNormalize = data?.map(item => {
      return {
        id: item?.warehouseproduct?.id,
        serialnumber: item?.warehouseproduct?.serialnumber,
        warehouseId: item?.warehouseproduct?.warehouseId,
        comments: item?.warehouseproduct?.comments,
        productId: item?.warehouseproduct?.productId,
      };
    });

    return dataNormalize;
  };
  
  const handleOnSaveEntry = async () => {

    // let normalizeProducts = NormalizeArticles();
    let newDataNormalizeTOPDF = [];
    newDataNormalizeTOPDF = productsTransfer?.map(item => {
      return {
        serial: item?.warehouseproduct?.serialnumber,
        product: item?.warehouseproduct?.product?.name,
        almOrigin: selectedTransfer?.exitwarehouse,
        almDest: selectedTransfer?.entrywarehouse,
        delivery: username || name,
        receive: "",
        dateOut: selectedTransfer?.exitdate,
        dateInt: dayjs(new Date()).format("DD,MMMM YYYY"),
        observation: selectedTransfer?.data?.description,
        folio: selectedTransfer?.folio,
      };
    });

    let body = {
      inventorytransferId: selectedTransfer?.id,
      warehouseId:selectedTransfer?.data?.entrywarehouse?.id
    };
    
    try {
      let response = await ordersServices.postEntryTransfer(body);
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Se ha generado la entrada correctamente");
        let url = await generatePDF(newDataNormalizeTOPDF);
        showAlertSucces("Se genero formato de entrada de los articulos");
        closeModalEntry();
        setObservations("");
        getDataSelectedInventory();
        saveFormattransfer(url)
        window.open(url, "_blank");
      }
    } catch (error) {
      console.log(error, "error");
      showAlertError("Error al crear entrada de traspaso");
    }
  };

  const generatePDF = async newDataNormalizeTOPDF => {
    let dataTemplate = templateEquipmentTransfers(newDataNormalizeTOPDF);
    try {
      let form = new FormData();
      form.append("name", "entrada de trasppaso");
      form.append("data", dataTemplate);
      form.append("company", company);
      form.append("group", groupId);
      form.append("ejecutive", id_user);
      let response = await ordersServices.createPDF(form);
      if (response.status == 201 || response.status == 200) {
        let { url } = response?.data;
        return url;
      }
    } catch (error) {
      console.log(error, "error generate file");
      showAlertError("error al generar el archivo")
    }
  };

  const saveFormattransfer = async(url) => {
    try {
      let body = {
        formattransfer:url
      }
      let response = await ordersServices.putFormatTransfer(selectedTransfer?.id, body)
      if(response.status == 200 || response.status == 201){
        showAlertSucces("formato guardado");
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al guardar formato de traspaso")
    }
  }

  return {
    productsTransfer,
    isFetching,
    createEntryArticles,

    openModalEntry,
    toggleModalEntry,
    closeModalEntry,
    observations,
    setObservations,
    handleOnSaveEntry,
  };
}

export default useMasterAlmacenTransferProductsEntry;

