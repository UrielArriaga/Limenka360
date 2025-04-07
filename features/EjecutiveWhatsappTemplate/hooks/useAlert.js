import React from "react";


export  const handleAlert = (severity, message, type) => {
  setAlert({ severity: severity, show: true, message: message, type: type });
  setTimeout(() => {
    setAlert({ severity: severity, show: false, message: message, type: null });
  }, 3000);
};
