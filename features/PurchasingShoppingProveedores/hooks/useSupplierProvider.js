import React, { useEffect, useState } from "react";
import { ProvidersServices } from "../services";
import { useForm } from "react-hook-form";
import useModal from "../../../hooks/useModal";

function useSupplierProvider(ID, setSuppliersToSave, suppliersToSave) {
  const request = new ProvidersServices();
  const [suplierProvider, setSuplierProvider] = useState({
    data: [],
    count: 0,
    isfetching: false,
    backUp: [],
  });
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

  useEffect(() => {
    getSuppliers();
  }, [ID]);

  const getSuppliers = async () => {
    try {
      setSuplierProvider({ ...suplierProvider, isfetching: true });
      let query = {
        providerId: ID,
      };
      let response = await request.getSupplierProvider(query);
      if (response.status == 200 || response.status == 201) {
        setSuplierProvider({
          data: response?.data?.results,
          backUp: response?.data?.results,
          isfetching: false,
          count: response?.data?.count,
        });
        setSuppliersToSave({
          ...suppliersToSave,
          add: response?.data?.results
        })
      }
    } catch (error) {
      setSuplierProvider({ ...suplierProvider, isfetching: false });
      console.log(error, " error");
    }
  };

  const handleAddContact = formData => {
    let supplier = suplierProvider?.data;
    supplier.push(formData);
    setSuplierProvider({ ...suplierProvider, data: supplier });
    setSuppliersToSave({ ...suppliersToSave, add: supplier });
    reset();
    toggleContact();
  };

  const removeSupplier = index => {
    let suplier = suplierProvider?.data?.filter((_, i) => i == index);

    if (suplier[0].id) {
      {
        setSuppliersToSave({
          remove: [...suppliersToSave?.remove, suplier[0].id],
          add: [...suppliersToSave?.add.filter((item) => item.id !== suplier[0]?.id)],
        });
      }
    } else {
      setSuppliersToSave({
        ...suppliersToSave,
        add: [...suppliersToSave?.add.filter((_, i) => i !== index)],
      });
    }
    setSuplierProvider({ ...suplierProvider, data: suplierProvider?.data?.filter((_, i) => i !== index) });
  };

  return {
    suplierProvider,
    removeSupplier,
    openContact,
    toggleContact,
    relations,
    handleAddContact,
    stateHookForm: {
      register,
      errors,
      handleSubmit,
    },
  };
}

export default useSupplierProvider;
