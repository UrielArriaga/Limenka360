import React from "react";
import { handleOpenGlobalAlert } from "../redux/slices/alertSlice";
import { useDispatch } from "react-redux";

export default function useAlert() {
  const dispatch = useDispatch();

  const showSuccess = (message, time = 3000) => {
    dispatch(handleOpenGlobalAlert({ show: true, severity: "success", message, type: "success" }));
    setTimeout(() => {
      dispatch(handleOpenGlobalAlert({ show: false, severity: null, message: "", type: null }));
    }, time);
  };

  const showError = (message, time = 3000) => {
    dispatch(handleOpenGlobalAlert({ show: true, severity: "error", message, type: "error" }));
    setTimeout(() => {
      dispatch(handleOpenGlobalAlert({ show: false, severity: null, message: "", type: null }));
    }, time);
  };

  return { showSuccess, showError };
}
