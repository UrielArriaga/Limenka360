import { useEffect, useState } from "react";
import ProspectsApi from "../services";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
const prospectsApi = new ProspectsApi();

export default function useProspectDetails(prospectId, open) {
  const [data, setData] = useState(null);
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const { getCatalogBy } = useGlobalCommons();
  const [loading, setLoading] = useState(false);
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
    getValues,
  } = useForm();
  useEffect(() => {
    if (open) {
      getCatalogBy("origins");
      getCatalogBy("phases");
      getCatalogBy("clientTypes");
      getCatalogBy("specialties");
      getCatalogBy("categories");
      getCatalogBy("channels");
      getCatalogBy("clientsCompanies");
      getCatalogBy("users");
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (prospectId?.postalId !== null || prospectId?.postalId !== undefined) {
        getDataPostal(prospectId?.postalId);
      }

      if (prospectId?.entityId !== null || prospectId?.entityId !== undefined) {
        getCitiesByEntity(prospectId?.entityId);
      }
    }
  }, [open]);

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
      let cities = await api.get(
        `cities?where=${JSON.stringify(
          query
        )}&include=entity&limit=1004&order=name`
      );
      setCitiesByEntity({
        isFetching: false,
        results: cities.data?.results,
        count: cities.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getEntitieCityByPostals(code) {
    let where = JSON.stringify({
      postal_code: code,
    });
    try {
      let postals = await api.get(
        `/postals?where=${where}&include=city,city.entity&limit=1`
      );
      if (postals.data.results.length > 0) {
        setValueForm("postal_code", code);
        setValueForm("entityId", postals?.data?.results[0]?.city?.entity?.id);
        setValueForm("cityId", postals?.data?.results[0]?.city.id);
        setValueForm("postalId", postals?.data?.results[0]?.id);

        getCitiesByEntity(postals?.data?.results[0]?.city?.entity?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const hasError = (key, type = "required") => {
    if (key === "email") {
      return errorsForm[key];
    }
    if (key === "phone") {
      return errorsForm[key];
    }
    return errorsForm[key] && errorsForm[key].type === type;
  };
  useEffect(() => {
    if (prospectId && open) {
      setLoading(true);
      prospectsApi
        .getProspectDetails(prospectId)
        .then((res) => {
          const result = res?.data || {};
          result.prospectId = prospectId;
          setData(result);
          setOriginalEmail(result.email || "");
          setOriginalPhone(result.phone || "");
        })
        .finally(() => setLoading(false));
    }
  }, [prospectId, open]);

  return {
    data,
    originalEmail,
    originalPhone,
    loading,
    setValueForm,
    errorsForm,
    citiesByEntity,
    getEntitieCityByPostals,
    getCitiesByEntity,
    registerForm,
    resetForm,
    getValues,
    controlForm,
    hasError,
  };
}
