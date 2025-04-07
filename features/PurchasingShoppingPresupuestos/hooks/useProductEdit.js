import { useState } from "react";
import useModal from "../../../hooks/useModal";

export default function useProductEdit() {
  const { open: openEdit, toggleModal: toggleEdit } = useModal();

  const [productEdit, setproductEdit] = useState({});

  const uploadProduct = item => {
    setproductEdit(item);
    toggleEdit();
  };

  return { openEdit, toggleEdit, productEdit, setproductEdit, uploadProduct };
}
