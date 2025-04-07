import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { api } from "../../../services/api";

export default function useAddDirection(toggleModal, postalCode, setPostalCode, storedAddresses, setStoredAddresses) {
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [loadCities, setLoadCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      street: "",
      ext_number: "",
      int_number: "",
      settlement: "",
      postalcode: "",
      entity: "",
      city: "",
      references: "",
    },
  });

  useEffect(() => {
    if (!open) {
      clearFormState();
    }
  }, [open]);

  const clearFormState = () => {
    reset();
    setSelectedCity(null);
    setSelectedEntity(null);
    setLoadCities(false);
    setCitiesByEntity([]);
    setPostalCode(null);
  };

  const getEntitieCityByPostals = async code => {
    let where = JSON.stringify({
      postal_code: code,
    });

    try {
      let postals = await api.get(`/postals?where=${where}&include=city,city.entity`);
      if (postals.data.results.length > 0) {
        setPostalCode(postals.data.results[0]?.id);
        setSelectedEntity(postals?.data?.results[0]?.city?.entity); // Almacenar el objeto completo de entity
        setValue("entity", postals?.data?.results[0]?.city?.entity?.id);
        setSelectedCity(postals?.data?.results[0]?.city); // Almacenar el objeto completo de city
        setValue("city", postals?.data?.results[0]?.city.id);
        getCities(postals?.data?.results[0]?.city?.entity?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = { entityId };
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1007`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    clearFormState();
    toggleModal(); // Llama a la función para cerrar el modal
  };
  const handleOnClickAdd = async formData => {
    try {
      const newAddress = {
        street: formData.street,
        ext_number: formData.ext_number,
        int_number: formData.int_number,
        references: formData.references,
        settlement: formData.settlement,
        postalcode: formData.postalcode,
        city: selectedCity,
        entity: selectedEntity,
        postalId: postalCode,
      };
      setStoredAddresses([...storedAddresses, newAddress]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    errors,
    register,
    handleSubmit,
    handleOnClickAdd,
    getEntitieCityByPostals,
    handleClose,
    selectedCity,
    selectedEntity,
    setSelectedCity,
    setSelectedEntity,
    loadCities,
    citiesByEntity,
    getCities,
    isValid,
    isSubmitting,
  };
}
