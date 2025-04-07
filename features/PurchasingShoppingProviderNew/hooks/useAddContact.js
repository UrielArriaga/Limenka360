import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { useForm } from "react-hook-form";

function useAddContact() {
  const { open: openContact, toggleModal: toggleContact } = useModal();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [relations] = useState([
    { id: "Jefe Directo", name: "jefe directo" },
    { id: "Suplente", name: "suplente" },
    { id: "Adiministartivo", name: "administrativo" },
    { id: "Ejecutivo", name: "ejecutivo" },
    { id: "Compañero", name: "compañero" },
    { id: "Conocido", name: "conocido" },
    { id: "Otro", name: "otro" },
  ]);
  const [selectRelation, setSelectRelation] = useState({});
  const [allContact, setAllContact] = useState([]);

  const handleAddContact = formData => {
    setAllContact([...allContact, formData]);
    reset();
    toggleContact();
  };
  const removeContact = index => {
    setAllContact([...allContact.filter((_, i) => i !== index)]);
  };

  return {
    openContact,
    toggleContact,
    relations,
    setSelectRelation,
    handleAddContact,
    stateHookForm: {
      register,
      errors,
      handleSubmit,
    },
    allContact,
    removeContact,
  };
}

export default useAddContact;
