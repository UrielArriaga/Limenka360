import React, { useState } from "react";

function useModalDelete() {
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  return {
    showDelete,
    setShowDelete,
    handleCloseDelete,
  };
}

export default useModalDelete;
