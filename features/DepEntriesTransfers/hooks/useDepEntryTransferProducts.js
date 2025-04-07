import React from "react";
import { useEffect, useState } from "react";
import { OrdersServices } from "../services";
import useModal from "../../../hooks/useModal";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useAlertToast from "../../../hooks/useAlertToast";
import { templateEquipmentTransfers } from "../../../templates/templatesHtml";

function useDepEntryTransferProducts(selectedTransfer) {
  const [productsTransfer, setProductsTransfer] = useState([]);
  const { showAlertError, showAlertSucces } = useAlertToast();
  const { id_user, groupId, company, username, name } = useSelector(userSelector);
  const { open: openModalExit, toggleModal, closeModal } = useModal();
  const [isFetching, setIsFetching] = useState(false);
  const [observations, setObservations] = useState("");
  const ordersServices = new OrdersServices();
  console.log(selectedTransfer, "sele");
  
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

  const createExitArticles = () => {
    toggleModal();
  };

  const NormalizeArticles = () => {
    let data = [...productsTransfer];
    let dataNormalize = data?.map(item => {
      return {
        // id: item?.warehouseproduct?.id,
        serialnumber: item?.warehouseproduct?.serialnumber,
        warehouseId: item?.warehouseproduct?.warehouseId,
        comments: item?.warehouseproduct?.comments,
        productId: item?.warehouseproduct?.productId,
      };
    });

    return dataNormalize;
  };

  const handleOnSaveEntry = async () => {
    
    let normalizeProducts = NormalizeArticles();
    let newDataNormalizeTOPDF = [];
    newDataNormalizeTOPDF = productsTransfer?.map(item => {
      return {
        serial: item?.warehouseproduct?.serialnumber,
        product: item?.warehouseproduct?.product?.name,
        almOrigin: selectedTransfer?.exitwarehouse,
        almDest: selectedTransfer?.entrywarehouse,
        delivery:selectedTransfer?.createdBy,
        receive: username || name,
        dateOut: dayjs(selectedTransfer?.data?.warehouseexit).format("DD,MMMM YYYY") || "N/A",
        dateInt: dayjs(new Date()).format("DD,MMMM, YYYY"),
        observation: selectedTransfer?.data?.description,
        folio: selectedTransfer?.folio,
      };
    });
 
    let body = {
      inventorytransferId:selectedTransfer?.id,
      warehouseId:selectedTransfer?.data?.exitwarehouse?.id,
    }
    try {
      console.log(JSON.stringify(body), "body");
      
      let response = await ordersServices.postEntryTransfer(body);
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Se ha generado la entrada correctamente");
        let url = await generatePDF(newDataNormalizeTOPDF);
        showAlertSucces("Se genero formato de entrada de los articulos");
        closeModal();
        setObservations("");
        getDataSelectedInventory();
        saveFormattransfer(url)
        window.open(url,"_blank");
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
    createExitArticles,

    openModalExit,
    toggleModal,
    closeModal,
    observations,
    setObservations,
    handleOnSaveEntry,
  };
}

export default useDepEntryTransferProducts;
