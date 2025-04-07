import { useState } from "react";
import { toast } from "react-toastify";

export default function useAlertToast() {
  const [loadingToastId, setLoadingToastId] = useState(null);

  const commonValues = {
    position: `top-right`,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const showAlertSucces = msg => {
    toast.success(`${msg}`, commonValues);
  };

  const showAlertError = msg => {
    toast.error(`${msg}`, commonValues);
  };

  const showAlertStart = (msg = "Cargando...") => {
    const id = toast.loading(msg);
    setLoadingToastId(id);
  };

  const showAlertFinish = () => {
    toast.dismiss(loadingToastId);
    setLoadingToastId(null);
  };

  const showAlertWarning = (msg, autoClose) => {
    toast.warning(`${msg}`, {
      ...commonValues,
      autoClose: autoClose || commonValues.autoClose,
    });
  };

  const showCustomAlert = ({ message = "", position = "top-right", time = 3000, type = "success" }) => {
    toast[type](message, {
      position: position,
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return { showAlertSucces, showAlertError, showAlertWarning, showCustomAlert, showAlertStart, showAlertFinish };
}
