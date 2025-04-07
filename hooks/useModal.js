import React, { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  return {
    open,
    toggleModal,
    closeModal,
    openModal,
    setOpen,
  };
}
