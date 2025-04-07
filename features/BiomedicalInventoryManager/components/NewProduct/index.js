import React from "react";
import { NewProductStyled } from "./styles";
import { Grid, Button } from "@material-ui/core";
import useNewProduct from "../../hooks/useNewProduct";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { convertLength } from "@mui/material/styles/cssUtils";

export default function NewProduct({ open, close, isEditing, producSelect, refreshData, setProductSelect }) {
  const {
    optionsType,
    optionsstatus,
    optionsavailable,
    errors,
    control,
    productSearch,
    resetForm,
    customFilter,
    register,
    handleSubmit,
    handleAddProduct,
    handleEditProduct,
    formatOptionLabel
  } = useNewProduct({ refreshData, close, producSelect, isEditing });

  const HandleOnclose = () => {
    close();
    setProductSelect();
    resetForm();
  };
  const onSubmit = isEditing ? handleEditProduct : handleAddProduct;

  return (
    <NewProductStyled open={open} onClose={HandleOnclose} anchor="right">
      <div className="container">
        <div className="headerDialog">
          <div className="title">{isEditing ? "Editar Producto" : "Agregar nuevo Producto"}</div>
        </div>
        <div className="dataform">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container className="ctr_inputs">
              <Grid item xs={6} md={6} className="resons">
                <label className="ctr_inputs__label">Nombre del accesorio*</label>
                <input
                  {...register("name", { require: true })}
                  id="name"
                  name="name"
                  defaultValue={producSelect?.name || ""}
                  className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                />
              </Grid>
              <Grid item xs={6} md={6} className="resons">
                <label className="ctr_inputs__label">Numero de serie*</label>
                <input
                  {...register("serialnumber", { require: true })}
                  id="serialnumber"
                  name="serialnumber"
                  defaultValue={producSelect?.serialnumber || ""}
                  className={
                    errors?.serialnumber?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                  }
                />
              </Grid>
              <Grid item xs={6} md={6} className="resons">
                <label className="ctr_inputs__label">Status*</label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={isEditing && producSelect?.status ? producSelect.status : null}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Selecciona un estatus"
                      options={optionsstatus}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={6} className="resons">
                <label className="ctr_inputs__label">Disponible*</label>
                <Controller
                  name="available"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Selecciona un estado"
                      options={optionsavailable}
                      isClearable
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={6} className="resons">
                <label className="ctr_inputs__label">Observaciones*</label>
                <input
                  {...register("observations", { require: true })}
                  id="observations"
                  name="observations"
                  defaultValue={producSelect?.observations || ""}
                  className={
                    errors?.observations?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} className="resons">
                <label className="ctr_inputs__label">Tipo*</label>
                <Controller
  name="type"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      placeholder="Selecciona un tipo"
      options={optionsType}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
    />
  )}
/>
              </Grid>
              <Grid item xs={12} md={12} className="resons">
                <label className="ctr_inputs__label">Descripción*</label>
                <input
                  {...register("description", { require: true })}
                  id="description"
                  name="description"
                  defaultValue={producSelect?.description || ""}
                  className={errors?.description?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                />
              </Grid>
              <Grid item xs={12} md={12} className="resons">
                <label className="ctr_inputs__label">Stock*</label>
                <input
                  type="number"
                  min="0"
                  {...register("physicalstock", { require: true })}
                  id="physicalstock"
                  name="physicalstock"
                  defaultValue={producSelect?.stock || ""}
                  className={
                    errors?.stock?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} className="resons">
                <label className="ctr_inputs__label">Refaccion de equipo*</label>
                <Controller
                  name="productId"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Buscar Nombre del Producto..."
                      options={productSearch}
                      isClearable={true}
                      noOptionsMessage={() => "Ingrese el Nombre"}
                      onInputChange={customFilter}
                      formatOptionLabel={formatOptionLabel}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option.id}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div className="btn">
              <Button variant="contained" className="btn_cancel" onClick={() => HandleOnclose()}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" className="btn_save">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </NewProductStyled>
  );
}
