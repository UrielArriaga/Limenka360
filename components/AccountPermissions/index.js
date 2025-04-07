import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { CircularProgress, Button } from "@material-ui/core";
import { Close, Check } from "@material-ui/icons";
import { useForm } from "react-hook-form";

export default function AccountPermissions(props) {
  const { id_user, roleId } = useSelector(userSelector);
  const { dataPermissions } = props;
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [stateObjPermissions, setstateObjPermissions] = useState();
  const [loading, setLoading] = useState(false);

  let objPermissions = {};

  const getPermission = () => {
    dataPermissions?.results.map(e =>
      Object.assign(objPermissions, JSON.parse(`{"${e.permission.name}": "${e.types_permission.name}"}`))
    );
    //valores del array [<p/>, name-valueRegister, [option1, option2...], defaultValue] ahorra 15 lineas por arreglo aprox
    setstateObjPermissions([
      ["Empresa", "Empresa", ["Solo uso", "Uso y creación"], objPermissions.Empresa],
      ["Crear Etiquetas", "Crearetiquetas", ["No permitido", "Crear y eliminar"], objPermissions.Crearetiquetas],
      ["Plantillas", "Plantillas", ["No permitido", "Solo uso", "Uso y creación"], objPermissions.Plantillas],
      [
        "Campañas de Comunicación",
        "Campanasdecomunicacion",
        ["No permitido", "Solo uso", "Uso y creación"],
        objPermissions.Campanasdecomunicacion,
      ],
      ["Documentos", "Documentos", ["No permitido", "Solo uso", "Uso y creación"], objPermissions.Documentos],
      [
        "Mantenimiento",
        "Mantenimiento",
        ["No permitido", "Combinar registros", "Combinar y mostrar inconsistencias"],
        objPermissions.Mantenimiento,
      ],
      ["Descuentos", "Descuentos", ["No permitido", "Solo uso", "Uso y creación"], objPermissions.Descuentos],
      ["Modificar Precios", "ModificarPrecio", ["No permitido", "Permitido"], objPermissions.ModificarPrecio],
      ["Comisiones", "Comisiones", ["No permitido", "Permitido"], objPermissions.Comisiones],
      [
        "Etiquetar",
        "Etiquetar",
        ["No permitido", "Solo agregar etiquetas", "Solo quitar etiquetas", "Agregar o quitar etiquetas"],
        objPermissions.Etiquetar,
      ],
      ["Importar", "Importar", ["No permitido", "Permitido"], objPermissions.Importar],
      ["Exportar", "Exportar", ["No permitido", "Permitido"], objPermissions.Exportar],
      ["Reasignar", "Reasignar", ["No permitido", "Permitido"], objPermissions.Reasignar],
      [
        "Compartir Contactos",
        "CompartirContactos",
        ["No permitido", "Solo descompartir", "Solo compartir", "Compartir y descompartir"],
        objPermissions.CompartirContactos,
      ],
      ["Facturar", "Facturar", ["No permitido", "Permitido"], objPermissions.Facturar],
      ["Cancelar Factura", "Cancelarfactura", ["No permitido", "Permitido"], objPermissions.Cancelarfactura],
    ]);
    //Reinicia los valores del formulario
    setValue("Empresa", objPermissions.Empresa);
    setValue("Crearetiquetas", objPermissions.Crearetiquetas);
    setValue("Plantillas", objPermissions.Plantillas);
    setValue("Campanasdecomunicacion", objPermissions.Campanasdecomunicacion);
    setValue("Documentos", objPermissions.Documentos);
    setValue("Mantenimiento", objPermissions.Mantenimiento);
    setValue("Descuentos", objPermissions.Descuentos);
    setValue("ModificarPrecio", objPermissions.ModificarPrecio);
    setValue("Comisiones", objPermissions.Comisiones);
    setValue("Etiquetar", objPermissions.Etiquetar);
    setValue("Importar", objPermissions.Importar);
    setValue("Exportar", objPermissions.Exportar);
    setValue("Reasignar", objPermissions.Reasignar);
    setValue("CompartirContactos", objPermissions.CompartirContactos);
    setValue("Facturar", objPermissions.Facturar);
    setValue("Cancelarfactura", objPermissions.Cancelarfactura);
  };

  async function putPermissions(data) {
    if (!loading) {
      setLoading(true);
      try {
        await api.put(`permissionsusers/permissions`, data);
        setLoading(false);
        if (!loading) {
          props.handleAlert("success", "Datos actualizados", "basic", props.setAlert);
        }
      } catch (error) {
        setLoading(false);
        if (!loading) {
          props.handleAlert("error", "Error al actualizar", "basic", props.setAlert);
        }
      }
    }
  }

  const onSubmit = data => {
    let obj = {
      ejecutiveId: id_user,
      permissions: data,
    };

    switch (roleId) {
      case "ejecutivo":
        return props.handleAlert("warning", "No estás autorizado", "basic", props.setAlert);

      case "gerente":
        return putPermissions(obj);

      case "Admin_compania":
        return putPermissions(obj);

      case "admin":
        return putPermissions(obj);
      default:
        null;
    }
  };

  useEffect(() => {
    getPermission();
  }, [props.dataPermissions]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="permisos">
        {stateObjPermissions?.map(val => (
          <div key={val} className="permisos__permiso">
            <p>{val[0]}</p>
            <select name={val[1]} className="permisos__select" defaultValue={val[3]} {...register(val[1])}>
              {(roleId == "ejecutivo") | (roleId == "gerente") && (
                <option key={val[3]} value={val[3]}>
                  {val[3]}
                </option>
              )}
              {(roleId == "Admin_compania") | (roleId == "admin") &&
                val[2].map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>

      <div className="formButtons">
        <div />
        <div className="formButtons__root">
          <div className="formButtons__wrapper">
            <Button
              className="formButtons__button"
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<Close />}
              disabled={props.loadingCancel}
              onClick={() => props.getData()}
            >
              Cancelar
            </Button>
            {props.loadingCancel && <CircularProgress size={24} className="formButtons__progress" />}
          </div>
          <div className="formButtons__wrapper">
            <Button
              className="formButtons__button"
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Check />}
              disabled={loading}
            >
              Actualizar
            </Button>
            {loading && <CircularProgress size={24} className="formButtons__progress" />}
          </div>
        </div>
      </div>
    </form>
  );
}
