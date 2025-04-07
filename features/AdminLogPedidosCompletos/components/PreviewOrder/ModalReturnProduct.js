import { Button, DialogActions, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import { DialogContainer } from "./styles";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useReturn from "../../hooks/useReturn";

export default function ModalReturnProduct({
  openWarningModal,
  handleCloseWarningModal,
  purcharseOrdersToPickups,
  productToOrderSelected,
  setRefetch,
  refetch,
  handleCancelAll,
}) {
  const {
    handleClose,
    GiveToBack,
    dataWarehouses,
    typereturns,
    getCatalogBy,
    handleSubmit,
    control,
    register,
    errors,
    selectedProducts,
  } = useReturn(
    purcharseOrdersToPickups,
    productToOrderSelected,
    setRefetch,
    refetch,
    handleCancelAll,
    openWarningModal,
    handleCloseWarningModal
  );

  return (
    <DialogContainer open={openWarningModal} onClose={handleCloseWarningModal}>
      <DialogTitle className="title">Devolución de productos</DialogTitle>
      <DialogContent className="containerBody">
        <Grid container className="dialogContainer">
          <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
            <p>Los productos seleccionados serán devueltos ({selectedProducts?.length})</p>
          </Grid>

          <Grid item md={12} sm={6} xs={6} className="dialogContainer__item">
            <p className="dialogContainer__item__header__title">
              Razón:
              {errors.reason && errors.reason.type === "required" && (
                <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
              )}
            </p>
            <Controller
              name="reason"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="select-options"
                  placeholder="Selecciona una Opción"
                  loadingMessage={() => "Cargando Opciones..."}
                  isClearable={true}
                  onMenuOpen={() => getCatalogBy("typereturns")}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name}`}
                  isLoading={typereturns.isFetching}
                  options={typereturns.results}
                  maxMenuHeight={130}
                />
              )}
            />
          </Grid>

          <Grid item md={12} sm={6} xs={6} className="dialogContainer__item">
            <p className="dialogContainer__item__header__title">
              Almacenes:
              {errors.warehouse && errors.warehouse.type === "required" && (
                <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
              )}
            </p>
            <Controller
              name="warehouse"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="select-options"
                  placeholder="Selecciona una Opción"
                  loadingMessage={() => "Cargando Opciones..."}
                  isClearable={true}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name}`}
                  options={dataWarehouses}
                  maxMenuHeight={130}
                />
              )}
            />
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
            <p className="dialogContainer__item__header__title">
              Observaciones:
              {errors.observations && errors.observations.type === "required" && (
                <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
              )}
            </p>
            <input
              className="dialogContainer__item__header__input"
              {...register("observations", { required: true })}
              placeholder="ingresar observaciones"
            ></input>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleClose}>
          Cancelar
        </Button>
        <Button className="accept" onClick={handleSubmit(GiveToBack)}>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
