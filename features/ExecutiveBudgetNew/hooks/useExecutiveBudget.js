// useExecutiveBudget.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";

const useExecutiveBudget = () => {
  const router = useRouter();
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [files, setFiles] = useState([]);
  const [prospect, setProspect] = useState();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    folio: "",
    vigencia: "",
    tipoPresupuesto: "",
    tiempoEntrega: "",
    observaciones: "",
    archivo: null,
  });

  useEffect(() => {
    getProspects();
  }, []);

  useEffect(() => {
    console.log("files cambio", files);
    setFormData(prevData => ({ ...prevData, archivo: files }));
  }, [files]);

  const getProspects = async () => {
    try {
      const res = await api.get(`prospects/${router.query.p}`);
      console.log("respuesta", res.data);
      setProspect(res.data);
    } catch (error) {
      console.log("ocurrio un error", error);
    }
  };

  const putBudgets = async () => {
    setLoading(true);
    const data = new FormData();
    let arrayURL;
    let newBudget;

    try {
      let data = {
        folio: formData.folio,
        validity: formData.vigencia,
        budgettype: formData.tipoPresupuesto,
        deliverytime: formData.tiempoEntrega,
        observations: formData.observaciones,
        prospectId: router.query.p,
        createdbyId: prospect.ejecutiveId,
        ejecutiveId: prospect.ejecutiveId,
      };
      let res = await api.post("budgets", data);
      console.log("respuesta post budgets:", res);
      newBudget = res.data;
    } catch (error) {
      console.log("error en budgets", error);
    }

    try {
      formData.archivo.map(item => {
        data.append("file", item);
      });

      const resFiles = await api.post(`files/arrayuploadtofolder/${newBudget.id}`, data);
      console.log("Archivo subido con éxito:", resFiles.data);
      arrayURL = resFiles.data;

      console.log("arrayURL", arrayURL);
    } catch (error) {
      console.log("error en files", error);
    }

    try {
      for (let item of arrayURL) {
        let bodyfile = {
          url: item.name,
          name: newBudget.id,
          filestypeId: "wErcfRHaKXUihI5sl7dOdV9h",
          prospectId: router.query.p,
          budgetyId: newBudget.id,
        };

        console.log("bodyfile", bodyfile);

        await api.post(`documents`, bodyfile);
      }

      handleAlert("success", "Nuevo presupuesto creado", "basic");

      setLoading(false);

      router.push({
        pathname: `/ejecutivos/presupuestos`,
        // query: { p: item.id },
      });
    } catch (error) {
      console.error("error documents: ", error);
    }
  };

  const areFieldsValid = data => {
    return Object.values(data).every(value => {
      if (value === "" || value === null) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("rr", router);
    // console.log("form data", formData);
    if (areFieldsValid(formData)) {
      putBudgets();
    } else {
      handleAlert("warning", "Completa todos los campos", "basic");
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeTipoPresupuesto = e => {
    const { value } = e;
    setFormData(prevData => ({
      ...prevData,
      tipoPresupuesto: value,
    }));
  };

  const handleChangeTiempoEntrega = e => {
    const { value } = e;
    setFormData(prevData => ({
      ...prevData,
      tiempoEntrega: value,
    }));
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity, show: true, message, type });
    setTimeout(() => {
      setAlert({ severity, show: false, message, type: null });
    }, 3000);
  };

  return {
    alert,
    files,
    formData,
    loading,
    handleChange,
    handleChangeTipoPresupuesto,
    handleChangeTiempoEntrega,
    handleSubmit,
    setFiles,
  };
};

export default useExecutiveBudget;
