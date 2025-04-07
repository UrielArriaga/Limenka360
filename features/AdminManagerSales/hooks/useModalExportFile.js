import React, { useState } from "react";
import useModal from "../../../hooks/useModal";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { ActionsAdminServices } from "../services/api";
const FILE_NAME = "Reporte-Ventas";

const validateDateRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (end.isBefore(start)) return "La fecha final no debe ser menor a la de inicio";
  if (start.isSame(end, "day")) return "Las fechas no pueden coincidir el mismo día";

  return null;
};

const exportFile = async (params, request, showAlertSucces, toggleModal) => {
  try {
    const response = await request.getFileExcelSales(params);
    if (response.status === 200 || response.status === 201) {
      showAlertSucces("Creación de Excel satisfactoria");
      toggleModal();
      window.open(response?.data?.url, "");
    }
  } catch (error) {
    console.error("Error exporting file:", error);
  }
};

function useModalExportFile() {
  const { open, toggleModal } = useModal();
  const [rangeDate, setRangeDate] = useState({ startDate: "", endDate: "" });
  const { showAlertWarning, showAlertSucces } = useAlertToast();
  const request = new ActionsAdminServices();

  const handleExportFile = async rangeDate => {
    const { startDate, endDate } = rangeDate;

    if (!startDate) {
      return showAlertWarning("Por favor ingresa la fecha inicial.");
    }

    if (!endDate) {
      return showAlertWarning("Por favor ingresa la fecha final.");
    }

    const validationError = validateDateRange(startDate, endDate);
    if (validationError) {
      return showAlertWarning(validationError);
    }

    const start = dayjs(startDate).format();
    const end = dayjs(endDate).format();

    const params = {
      range: { createdAt: [start, end] },
      name: FILE_NAME,
    };

    toggleModal();
    exportFile(params, request, showAlertSucces, toggleModal);
    setRangeDate({ startDate: "", endDate: "" });
  };

  return {
    modalExport: { open, toggleModal },
    handleExportFile,
    rangeDate,
    setRangeDate,
  };
}

export default useModalExportFile;
