import React from "react";
import useGlobalCommons from "../useGlobalCommons";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { commonSelector } from "../../redux/slices/commonSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import { useState } from "react";
import { toUpperCaseChart } from "../../utils";

export default function useEditProspect(prospectEdit, openEdit, setOpenEdit, setFlag) {
  const { getCatalogBy } = useGlobalCommons();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { id_user, roleId } = useSelector(userSelector);

  const [citiesByEntity, setCitiesByEntity] = useState({
    isFetching: false,
    results: [],
    count: 0,
  });

  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    setValue: setValueForm,
    reset: resetForm,
    control: controlForm,
    formState: { errors: errorsForm },
  } = useForm();

  useEffect(() => {
    fillDataForm();
  }, [openEdit]);

  useEffect(() => {
    if (openEdit) {
      getCatalogBy("origins");
      getCatalogBy("phases");
      getCatalogBy("clientTypes");
      getCatalogBy("specialties");
      getCatalogBy("categories");
      getCatalogBy("channels");
      getCatalogBy("clientsCompanies");
      getCatalogBy("users");
    }
  }, [openEdit]);

  useEffect(() => {
    if (openEdit) {
      if (prospectEdit?.postalId !== null || prospectEdit?.postalId !== undefined) {
        getDataPostal(prospectEdit?.postalId);
      }

      if (prospectEdit?.entityId !== null || prospectEdit?.entityId !== undefined) {
        getCitiesByEntity(prospectEdit?.entityId);
      }
    }
  }, [openEdit]);

  async function getDataPostal(postalId) {
    if (postalId === null || postalId === undefined) return;
    try {
      let postal = await api.get(`postals/${postalId}`);
      setValueForm("postal", postal.data?.postal_code ?? "");
    } catch (error) {
      console.log(error);
    }
  }

  async function getCitiesByEntity(entityId) {
    try {
      setCitiesByEntity({ isFetching: true, results: [], count: 0 });
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1004&order=name`);
      setCitiesByEntity({ isFetching: false, results: cities.data?.results, count: cities.data.length });
    } catch (error) {
      console.log(error);
    }
  }

  async function getEntitieCityByPostals(code) {
    let where = JSON.stringify({
      postal_code: code,
    });
    try {
      let postals = await api.get(`/postals?where=${where}&include=city,city.entity&limit=1`);
      if (postals.data.results.length > 0) {
        setValueForm("entityId", postals?.data?.results[0]?.city?.entity?.id);
        setValueForm("cityId", postals?.data?.results[0]?.city.id);
        setValueForm("postalId", postals?.data?.results[0]?.id);
        getCitiesByEntity(postals?.data?.results[0]?.city?.entity?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateProspect(formData) {
    try {
      let defaultFormData = { ...formData };

      if (roleId !== "ejecutivo") formData.reasignedbyId = id_user;

      if (formData.email === prospectEdit.email) delete formData.email;

      if (formData.phone === prospectEdit.phone) delete formData.phone;

      formData.fullname = `${formData?.name} ${formData.lastname}`.toLocaleLowerCase();
      defaultFormData.fullname = `${formData?.name} ${formData.lastname}`.toLocaleLowerCase();

      setAlert({ severity: "info", show: true, message: "Un momento - Actualizando prospecto", type: "load" });

      await api.put(`prospects/${prospectEdit.id}`, formData);
      resetForm();
      setFlag();
      setOpenEdit(false);
      addTrackingProspect(formData, defaultFormData);
      setTimeout(() => {
        setAlert({ severity: null, show: false, message: null, type: null });
      }, [2000]);
    } catch (error) {
      showAlert("error", "Prospecto - Ocurrio un problema!", "basic");
      if (error.response?.data.internalCode == "47582") {
        showAlert("error", "Prospecto -El correo o telefono ya existe!", "basic");
      }
    }
  }
  async function addTrackingProspect(formData, defaultFormData) {
    try {
      let trackings = {};
      if (
        defaultFormData.fullname !== prospectEdit.fullname ||
        defaultFormData.email !== prospectEdit.email ||
        defaultFormData.phone !== prospectEdit.phone ||
        prospectEdit?.phaseId !== defaultFormData.phaseId
      ) {
        let actions = [];
        if (defaultFormData.fullname !== prospectEdit.fullname) {
          actions.push(`El nombre ha sido modificado. Nombre anterior: ${toUpperCaseChart(prospectEdit.fullname)}.`);
        }
        if (defaultFormData.phone !== prospectEdit.phone) {
          console.log(defaultFormData.phone, prospectEdit.phone);
          actions.push(`El teléfono ha sido modificado. Teléfono anterior: ${prospectEdit.phone}.`);
        }
        if (defaultFormData.email !== prospectEdit.email) {
          console.log(defaultFormData.email, prospectEdit.email);
          actions.push(`El Correo ha sido modificado. Correo anterior: ${prospectEdit.email}.`);
        }
        if (defaultFormData.phaseId !== prospectEdit.phaseId) {
          actions.push(`La fase ha sido cambiada. Fase anterior: ${toUpperCaseChart(prospectEdit?.phase?.name)}.`);
        }

        trackings.prospectId = prospectEdit.id;
        trackings.observations = actions.join(" ");
        trackings.actionId = ACTIONIDPRODUCTIONMODE;
        trackings.status = "1";
        trackings.reason = "Seguimiento automático";
        trackings.phaseId = formData?.phaseId;
        trackings.createdbyId = id_user;
        await api.post(`trackings`, trackings);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fillDataForm = () => {
    keysProspects.forEach(key => setValueForm(key, prospectEdit[key] ?? ""));
  };

  const hasError = (key, type = "required") => {
    if (key === "email") {
      return errorsForm[key];
    }
    if (key === "phone") {
      return errorsForm[key];
    }
    return errorsForm[key] && errorsForm[key].type === type;
  };
  const showAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const propsForm = {
    phone: {
      required: { value: false, message: "Requerido" },
      maxLength: {
        value: 10,
        message: "10 Caracteres",
      },
      minLength: {
        value: 10,
        message: "10 Caracteres",
      },
      pattern: {
        value: /[0-9]+/i,
        message: "Caracter Invalido",
      },
    },
    email: {
      required: false,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email Invalido",
      },
    },
  };

  return {
    handleUpdateProspect,
    handleSubmitForm,
    registerForm,
    controlForm,
    errorsForm,
    hasError,
    propsForm,
    setValueForm,
    citiesByEntity,
    getEntitieCityByPostals,
    getCitiesByEntity,
    roleId,
    Alert,
    setAlert,
    resetForm,
  };
}

const keysProspects = [
  "name",
  "lastname",
  "email",
  "title",
  "gender",
  "phone",
  "street",
  "job",
  "categoryId",
  "sharedto",
  "url",
  "facebook",
  "location",
  "ejecutiveId",
  "clientTypeId",
  "observations",
  "product",
  "optionalphone",
  "postalId",
  "entityId",
  "cityId",
  "originId",
  "phaseId",
  "specialtyId",
  "clientCompanyId",
  "postal",
  "channelId",
  "ejecutiveId",
];
