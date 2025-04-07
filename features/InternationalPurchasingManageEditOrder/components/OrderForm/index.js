import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { motion } from "framer-motion";
import { Assignment } from "@material-ui/icons";

export default function OrderFormShippings({
  control,
  register,
  providers,
  taxinformations,
  deleveryMethod,
  payMethod,
  setIsGuideNumberEnabled,
  isGuideNumberEnabled,
  handleChangeType,
  getCatalogBy,
  handleValidateProvider,
  roleId,
  setSelectedNational,
}) {
  const filteredOptions = [
    { name: "Internacional", id: false },
    { name: "Nacional", id: true },
  ];
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <div className="subtitles">
          <Assignment className="icon" />
          <p className="titleDirection">Datos de la orden</p>
        </div>
      </Grid>
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Método de Entrega <strong>*</strong>
          </p>
          <Controller
            name="delivery"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={deleveryMethod}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                isLoading={false}
                noOptionsMessage={() => "Sin Opciones"}
                loadingMessage={() => "Cargando Opciones"}
                onChange={selectedOption => {
                  field.onChange(selectedOption);
                  setIsGuideNumberEnabled(selectedOption.name === "Proveedor Envia");
                }}
              />
            )}
          />
        </motion.div>
      </Grid>
      {isGuideNumberEnabled && (
        <Grid className="item" xs={12} md={3} item>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <p className="title">
              Número de Guía <strong>*</strong>
            </p>
            <input
              className="input_data"
              placeholder="Ingresa Dato"
              {...register("guide_number", {
                required: "Requerido",
              })}
            />
          </motion.div>
        </Grid>
      )}
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Condiciones de Pago <strong>*</strong>
          </p>
          <Controller
            name="payment_condition"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={payMethod}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                isLoading={false}
                noOptionsMessage={() => "Sin Opciones"}
                loadingMessage={() => "Cargando Opciones"}
              />
            )}
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Teléfono <strong>*</strong>
          </p>
          <input
            {...register("phone", {
              required: true,
              maxLength: { value: 10, message: "*10 Caracteres" },
              minLength: { value: 10, message: "*10 Caracteres" },
              pattern: { value: /[0-9]+/i, message: "*Caracter Invalido" },
            })}
            placeholder="Digíte número a 10 dígitos "
            className="input_data"
            type="number"
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Proveedor <strong>*</strong>
          </p>
          <Controller
            name="provider"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={providers.results}
                getOptionLabel={option => (option.companyname ? option.companyname : option?.name)}
                getOptionValue={option => option.id}
                isLoading={providers.isFetching}
                noOptionsMessage={() => "Sin Opciones"}
                onMenuOpen={() => getCatalogBy("providers")}
                loadingMessage={() => "Cargando Opciones"}
                onChange={e => handleValidateProvider(e)}
              />
            )}
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Impuesto <strong>*</strong>
          </p>
          <Controller
            name="tax"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={taxinformations.results}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                isLoading={taxinformations.isFetching}
                onMenuOpen={() => getCatalogBy("taxinformations")}
                loadingMessage={() => "Cargando Opciones"}
                noOptionsMessage={() => "Sin Opciones"}
              />
            )}
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Tipo <strong>*</strong>
          </p>
          <Controller
            name="national"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={filteredOptions}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                onChange={option => {
                  setSelectedNational(option);
                  field.onChange(option);
                  // if (option?.name === "Proveedor Envia") {
                  //   setIsGuideNumberEnabled(true);
                  // } else {
                  //   setIsGuideNumberEnabled(false);
                  // }
                }}
                value={field.value || null}
              />
            )}
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={3} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">
            Fecha estimada de entrega <strong>*</strong>
          </p>
          <input
            className="input_data"
            type="date"
            placeholder="Ingresa Dato"
            {...register("estimateddeliverydate", {
              required: "Requerido",
            })}
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={12} item>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="title">Observaciones</p>
          <input
            placeholder="Ingresa Observaciones"
            className="input_data"
            {...register("observations", {
              required: false,
            })}
          />
        </motion.div>
      </Grid>
      <Grid className="item" xs={12} md={12} item>
        <div className="divider"></div>
      </Grid>
    </>
  );
}
