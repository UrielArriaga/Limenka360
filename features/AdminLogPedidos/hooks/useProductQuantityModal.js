import { useState } from "react";

const useProductQuantityModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productToNotify, setProductToNotify] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setProductToNotify(null);
    setIsOpen(false);
  };

  const handleOnClickProduct = product => {
    setProductToNotify(product);
    openModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    productToNotify,
    handleOnClickProduct,
  };
};

export default useProductQuantityModal;
