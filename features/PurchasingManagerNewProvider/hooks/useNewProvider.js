import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
export default function useNewProvider(allContact) {
  const router = useRouter();
  const { showAlertWarning, showAlertSucces, showAlertError } = useAlertToast();
  const [storedAddresses, setStoredAddresses] = useState([]);
  const { open: openDirection, toggleModal } = useModal();
  const [postalCode, setPostalCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCreateProspect = formData => {
    if (storedAddresses.length === 0) {
      showAlertWarning("Es necesario agregar una dirección de proveedor.");
      return;
    }

    const addresses = storedAddresses.map(address => {
      const baseAddress = {
        street: address.street || "",
        ext_number: address.ext_number || "",
        int_number: address.int_number || "",
        references: address.references || "",
        settlement: address.settlement || "",
        companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        entityId: address.entity?.id || "",
      };
      if (address?.postalId) {
        baseAddress.postalId = address?.postalId;
      }

      if (address?.city?.id) {
        baseAddress.cityId = address?.city?.id;
      }

      return baseAddress;
    });

    const newProvider = {
      name: formData?.name?.toLowerCase() || "",
      lastname: formData?.lastname?.toLowerCase() || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      optionalphone: formData?.optionalphone || "",
      rfc: formData?.rfc || "",
      identifier: formData?.identifier || "",
      companyname: formData?.companyname?.toLowerCase() || "",
      type: formData?.type || "",
      nifcif: formData?.nifcif || "",
      observations: formData?.observations || "",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
      fullname: `${formData?.name || ""} ${formData?.lastname || ""}`,
      addresses,
      system: false,
    };

    if(allContact.length == 0){
      showAlertWarning("Agrega por lo menos un contacto mas de proveedor");
    } else {
      PostProvier(newProvider);
    }
  };

  const PostProvier = async item => {
    setIsCreating(true);
    try {
      let providerNew = await api.post(`providers`, item);

      if (providerNew.status == 201) {
        showAlertSucces("Se agrego el producto correctamente");
        let idProvider = providerNew?.data?.provider?.id;
        PostSupplierPorvider(allContact, idProvider);
      }
    } catch (error) {
      setIsCreating(false);
      console.log("eror", error);
      showAlertError("Ocurrio un error agregar producto");
    }
  };

  const PostSupplierPorvider = async (contacts,idProvider) => {
    let dataContact = contacts.map((item)=> {
      return {
        ...item,
        providerId:idProvider
      }
    })
    try {
      for(let i=0; i<dataContact.length; i++){
        await api.post(`suppliercontacts`, dataContact[i]);
      }
      router.back();
      setIsCreating(false);
    } catch (error) {
      console.log(error, " error");
    }
  }

  const removeAddress = index => {
    const updatedAddresses = storedAddresses.filter((_, i) => i !== index);
    setStoredAddresses(updatedAddresses);
  };

  return {
    handleCreateProspect,
    removeAddress,
    errors,
    handleSubmit,
    router,
    register,
    toggleModal,
    openDirection,
    storedAddresses,
    setStoredAddresses,
    postalCode,
    setPostalCode,
    isCreating,
  };
}
