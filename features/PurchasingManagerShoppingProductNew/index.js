import React from "react";
import { StyledNewProduct } from "./styled";
import Head from "next/head";
import { Add, ArrowBack } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { toUpperCaseChart } from "../../utils";
import useProductNew from "./hooks/useProductNew";
import { useRouter } from "next/router";
export default function ShoppingProductNew() {
  const route = useRouter();
  const { handleSubmit, control, handleAddTProduct, register, errors, isCreated, router, InputsRegister } =
    useProductNew();

  return (
    <StyledNewProduct>
      <Head>
        <title>CRM JOBS - Producto Nuevo</title>
      </Head>
      <div className="main">
        <div className="ctr_products">
          <div className="head">
            <div
              className="head__comeback"
              onClick={() => {
                route.back(``);
              }}
            >
              <ArrowBack />
              <h4>Agregar Producto</h4>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleAddTProduct)}>
            <Grid spacing={1} container className="ctr_inputs">
              {InputsRegister?.map((inputItem, index) => {
                switch (inputItem.inputType) {
                  case "Input":
                    return (
                      <Grid key={index} item xs={12} md={6}>
                        <p>
                          {inputItem.label} <strong>*</strong>
                        </p>
                        <input
                          {...register(inputItem.name, { required: true })}
                          id={inputItem.name}
                          name={inputItem.name}
                          placeholder={inputItem.placeholder}
                          className={
                            errors?.[inputItem.name]?.type === "required"
                              ? "ctr_inputs__input error"
                              : "ctr_inputs__input"
                          }
                        />
                      </Grid>
                    );
                  case "Select":
                    if (inputItem.required) {
                      return (
                        <Grid item xs={12} md={6}>
                          <p>
                            {inputItem.label}
                            <strong>*</strong>
                          </p>
                          <Controller
                            name={inputItem.name}
                            control={control}
                            rules={{ required: "Requerido" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className={
                                  errors?.[inputItem.name]?.type === "required"
                                    ? "ctr_inputs__select error"
                                    : "ctr_inputs__select"
                                }
                                placeholder={inputItem.placeholder}
                                options={inputItem.options}
                                getOptionValue={option => `${option[inputItem.getValue]}`}
                                getOptionLabel={option => `${toUpperCaseChart(option[inputItem.getLabel])}`}
                                maxMenuHeight={130}
                                noOptionsMessage={() => "Sin Opciones"}
                              />
                            )}
                          />
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid item xs={12} md={inputItem.name == "isactive" ? 12 : 6}>
                          <p>{inputItem.label}</p>
                          <Controller
                            name={inputItem.name}
                            control={control}
                            defaultValue={inputItem.defaultValue}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="ctr_inputs__select"
                                placeholder={inputItem.placeholder}
                                options={inputItem.options}
                                getOptionLabel={option => option[inputItem.getLabel]}
                                getOptionValue={option => option[inputItem.getValue]}
                                maxMenuHeight={130}
                                noOptionsMessage={() => "Sin Opciones"}
                              />
                            )}
                          />
                        </Grid>
                      );
                    }
                  case "Textarea":
                    return (
                      <Grid item xs={12} md={12}>
                        <p>{inputItem.label}</p>
                        <textarea
                          {...register(inputItem.name, { required: false })}
                          id={inputItem.name}
                          name={inputItem.name}
                          placeholder={inputItem.placeholder}
                          className="ctr_inputs__textarea"
                        />
                      </Grid>
                    );
                  default:
                    break;
                }
              })}
            </Grid>
            <Grid container className="ctr_buttons">
              <Button
                variant="contained"
                color="secondary"
                disabled={isCreated}
                className="btn_cancel"
                onClick={() => router.push("../productos")}
              >
                Cancelar
              </Button>
              <Button disabled={isCreated} variant="contained" color="primary" className="btn_upload" type="submit">
                Guardar
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </StyledNewProduct>
  );
}
