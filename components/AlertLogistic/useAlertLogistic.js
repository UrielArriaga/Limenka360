import React, { useState } from "react";

export default function useAlertLogistic() {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => setShowAlert(false);
  return {
    showAlert,
    handleCloseAlert,
  };
}
