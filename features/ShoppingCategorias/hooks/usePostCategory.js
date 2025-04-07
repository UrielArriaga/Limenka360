import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { RequestDataCategories } from "../services";

function usePostCategory(toggleModal) {
  const router = useRouter();
  const { company } = useSelector(userSelector);
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [name, setName] = useState("");
  const request = new RequestDataCategories();

  const createNewCategory = async() => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando categoría", type: "load" });

      let body = {};
      body.name = name.toLocaleLowerCase();
      body.companyId = company;

      let categoriaNew = await request.postCategory(body);
      if (categoriaNew.status == 201) {
        handleAlert("success", "Categoría - ¡Agregada correctamente!", "basic");
        setTimeout(() => {
            toggleModal();
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Categoría - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Categoría - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Categoría - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Categoría - ¡Error al cargar los datos!", "basic");
      }
    }
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  return {
    alert,
    setName,
    createNewCategory,
  };
}

export default usePostCategory;
