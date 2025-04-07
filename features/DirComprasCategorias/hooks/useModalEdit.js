import React, { useState } from "react";

function useModalEdit() {
  const [showUpload, setShowUpload] = useState(false);

  const handleCloseEdit = () => {
    setShowUpload(false);
  };

  return {
    showUpload,
    setShowUpload,
    handleCloseEdit,
  };
}

export default useModalEdit;
