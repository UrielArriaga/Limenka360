import React, { useState } from "react";
import useModal from "../../../hooks/useModal";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { OrdersAdminServices } from "../services";

function useModalExportFile() {
  const { open, toggleModal } = useModal();
  const [dataResponseFileExcel, setDataResponseFileExcel] = useState({});
  const [rangeDate, setRangeDate] = useState({
    startDate: "",
    endDate: "",
  });
  const { showAlertWarning, showAlertSucces } = useAlertToast();
  const request = new OrdersAdminServices();

  const handleExportFile = async rangeDate => {
    let start = dayjs(rangeDate.startDate).format("");
    let end = dayjs(rangeDate.endDate).format("");

    if (end < start) return showAlertWarning("La fecha final no debe ser menor a la de inicio");
    if (start == end) return showAlertWarning("las fecha no pueden coincidir el mismo dia");
    let params = {
      range: {
        createdAt: [start, end],
      },
      name: "pruebaorder",
    };
    toggleModal();
    // return;
    try {
      let response = await request.getFileExcelOrder(params);
      console.log("resss", response);

      if (response.status == 200 || response.status == 201) {
        showAlertSucces("Creacion de excel satisfactorio");
        setRangeDate({
          startDate: "",
          endDate: "",
        });
        toggleModal();
        window.open(response?.data?.url, "");
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  };
  return {
    modalExport: {
      open,
      toggleModal,
    },
    handleExportFile,
    rangeDate,
    setRangeDate,
  };
}

export default useModalExportFile;
