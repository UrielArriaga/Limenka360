import React, { useEffect, useState } from "react";

export default function useTableProducts() {
  const [packageSelected, setPackageSelected] = useState({});
  const [openAddProducts, setOpenAddProducts] = useState(false);
  const [openUpdatePackage, setOpenUpdatePackage] = useState(false);

  const handleSelectPackage = (index, product, action) => {
    let newProduct = { ...product };
    newProduct.index = index;
    setPackageSelected(newProduct);
    switch (action) {
      case "add":
        handleOpenAddProduct();
        break;
      case "edit":
        handleOpenUpdatePackage();
        break;
      default:
        break;
    }
  };

  const handleOpenAddProduct = () => setOpenAddProducts(true);
  const handleCloseAddProduct = () => setOpenAddProducts(false);

  const handleOpenUpdatePackage = () => setOpenUpdatePackage(true);
  const handleCloseUpdatePackage = () => setOpenUpdatePackage(false);

  return {
    states: {
      packageSelected,
      openAddProducts,
      openUpdatePackage,
    },
    functions: {
      handleSelectPackage,
      handleCloseAddProduct,
      handleCloseUpdatePackage,
    },
  };
}
