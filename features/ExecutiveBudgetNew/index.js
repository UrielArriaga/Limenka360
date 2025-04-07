import React from "react";
import SelectCRM from "./components/SelectCRM";
import InputCRM from "./components/InputCRM";
import { ContainerStyled } from "./style";
import TextAreaCRM from "./components/TextAreaCRM";
import FileUpload from "./components/FileUpload";
import { Button, CircularProgress } from "@material-ui/core";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import useExecutiveBudget from "./hooks/useExecutiveBudget";
import { opt } from "./constants";

const ExecutiveBudgetNew = () => {
  const {
    alert,
    files,
    formData,
    handleChange,
    handleChangeTipoPresupuesto,
    handleChangeTiempoEntrega,
    handleSubmit,
    setFiles,
    loading,
  } = useExecutiveBudget();

  return (
    <ContainerStyled>
      <div className="main">
        <div className="body">
          <h1>Presupuesto nuevo</h1>

          <form className="form" onSubmit={handleSubmit}>
            <div className="col2">
              <InputCRM text="Folio" name="folio" value={formData.folio} onChange={handleChange} />
              <InputCRM text="Vigencia" name="vigencia" value={formData.vigencia} onChange={handleChange} type="date" />
              <SelectCRM
                text="Tipo de presupuesto"
                name="tipoPresupuesto"
                value={formData.tipoPresupuesto}
                onChange={handleChangeTipoPresupuesto}
                options={opt}
              />
              <SelectCRM
                text="Tiempo de entrega"
                name="tiempoEntrega"
                value={formData.tiempoEntrega}
                onChange={handleChangeTiempoEntrega}
                options={opt}
              />
            </div>
            <TextAreaCRM
              text="Observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
            />
            <FileUpload files={files} setFiles={setFiles} />

            <Button
              type="submit"
              variant="contained"
              color={loading ? "default" : "primary"}
              style={{ marginTop: "20px", position: "relative" }}
              disabled={loading} // Deshabilitar el botón mientras carga
            >
              {loading && <CircularProgress size={24} style={{ position: "absolute" }} />}
              {loading ? "Cargando..." : "Crear presupuesto"}
            </Button>
          </form>
          {alert?.show && (
            <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
          )}
        </div>
      </div>
    </ContainerStyled>
  );
};

export default ExecutiveBudgetNew;
