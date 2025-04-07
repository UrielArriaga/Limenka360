import { Button, Grid, Input } from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Error from "../Error";
import ErrorMessage from "../ErrorMessage";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { EntitiesLocal } from "../../../../BD/databd";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { SectionStyle, SelectFormStyle } from "../../styles";
import { Controller } from "react-hook-form";
import Select from "react-select";
import Validate from "../Validate";
import { toUpperCaseChart } from "../../../../utils";
import NumberFormat from "react-number-format";
import ExecutiveOrdersService from "../../services";
export default function AddressShopping({ control, register, setValue, watch, errors, actions }) {
  const executiveOrderService = new ExecutiveOrdersService();
  const { handleBackBtForm, clearFormError, handleSubmit, handleSubmitMailing, trigger, saveLocalStorage } = actions;
  const [cities, setCities] = useState({ data: [], isFetching: true });
  const { shippingtype } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  const entity = watch("mailingAddress.entity");
  const postalCode = watch("mailingAddress.postalCodeInvoice");

  useEffect(() => {
    trigger("mailingAddress");
  }, []);

  useEffect(() => {
    if (entity) getCities();
  }, [entity]);

  useEffect(() => {
    if (postalCode) handlePostalCode();
  }, [postalCode]);

  const getCities = async () => {
    try {
      setCities({ ...cities, isFetching: true });
      let cities = await executiveOrderService.getCitiesByEntityId(entity.id);
      let ciudades = cities.data.results || [];
      setCities({ ...cities, isFetching: false, data: ciudades });
    } catch (error) {
      setCities({ ...cities, isFetching: false });
      console.log(error);
    }
  };

  const handlePostalCode = async () => {
    try {
      if (postalCode.length === 5) {
        let response = await executiveOrderService.getEntitiesAndCityByPostalCode(postalCode);
        let data_code = response.data.results[0];
        let entity = data_code?.city?.entity || null;
        let city = data_code?.city || null;
        let settlement = data_code?.settlement;
        setValue("mailingAddress.cologneInvoice", settlement);
        setValue("mailingAddress.entity", entity);
        setValue("mailingAddress.city", city);
        setValue("mailingAddress.postalId", data_code.id);
        clearFormError(["mailingAddress.cologneInvoice", "mailingAddress.entity", "mailingAddress.city"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCatalogBy("paymentway");
  }, []);

  return (
    <SectionStyle>
      <div className="sectionheader">
        <h1 className="title">Dirección de Envío</h1>
        <AttachMoney className="icon_primary" />
      </div>

      <Grid className="container_form" container spacing={2}>
        <Grid item md={4}>
          <p className="title_item">
            Recibe <Validate message={errors?.mailingAddress?.receive?.message} />
          </p>
          <input
            className="input_form"
            placeholder="Ingresa un Valor"
            {...register("mailingAddress.receive", { required: "Requerido" })}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Calle <Validate message={errors?.mailingAddress?.street?.message} />
          </p>
          <input
            className="input_form"
            placeholder="Ingresa un Valor"
            {...register("mailingAddress.street", { required: "Requerido" })}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Numero Interior <Validate message={errors?.mailingAddress?.int_number?.message} />
          </p>

          <input
            className="input_form"
            placeholder="Ingresa un Valor"
            {...register("mailingAddress.int_number", { required: "Requerido" })}
          />
          {/* <Controller
            name="mailingAddress.int_number"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <NumberFormat
                {...field}
                className="input_form"
                placeholder="Ingresa un Valor"
                allowNegative={false}
                allowLeadingZeros={true}
              />
            )}
          /> */}
        </Grid>

        <Grid item md={4}>
          <p className="title_item">
            Numero Exterior <Validate message={errors?.mailingAddress?.ext_number?.message} />
          </p>
          <input
            className="input_form"
            placeholder="Ingresa un Valor"
            {...register("mailingAddress.ext_number", { required: "Requerido" })}
          />

          {/* <Controller
            name="mailingAddress.ext_number"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <NumberFormat {...field} className="input_form" allowNegative={false} allowLeadingZeros={true} />
            )}
          /> */}
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Colonia <Validate message={errors?.mailingAddress?.cologneInvoice?.message} />
          </p>
          <input className="input_form" {...register("mailingAddress.cologneInvoice", { required: "Requerido" })} />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Teléfono <Validate message={errors?.mailingAddress?.phoneInvoice?.message} />
          </p>
          <Controller
            name="mailingAddress.phoneInvoice"
            control={control}
            rules={{
              required: "Requerido",
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
                message: "Carácter Invalido",
              },
            }}
            render={({ field }) => <NumberFormat {...field} className="input_form" />}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Código Postal <Validate message={errors?.mailingAddress?.postalCodeInvoice?.message} />
          </p>
          <Controller
            name="mailingAddress.postalCodeInvoice"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <NumberFormat {...field} className="input_form" allowNegative={false} allowLeadingZeros={true} />
            )}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Estado <Validate message={errors?.mailingAddress?.entity?.message} />
          </p>
          <Controller
            name="mailingAddress.entity"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_form"
                styles={SelectFormStyle}
                options={EntitiesLocal}
                placeholder="Selecciona una Opción"
                maxMenuHeight={180}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
                isClearable
              />
            )}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Municipio / Ciudad <Validate message={errors?.mailingAddress?.city?.message} />
          </p>
          <Controller
            name="mailingAddress.city"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_form"
                styles={SelectFormStyle}
                options={cities.data}
                isLoading={cities.isFetching}
                maxMenuHeight={180}
                placeholder="Selecciona una Opción"
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
                isClearable
              />
            )}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Referencias <Validate message={errors?.mailingAddress?.references?.message} />
          </p>
          <input className="input_form" {...register("mailingAddress.references", { required: "Requerido" })} />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Tipo de Envió <Validate message={errors?.mailingAddress?.shippingtype?.message} />
          </p>
          <Controller
            name="mailingAddress.shippingtype"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_form"
                styles={SelectFormStyle}
                options={shippingtype.results}
                maxMenuHeight={180}
                placeholder="Selecciona una Opción"
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
                onMenuOpen={() => getCatalogBy("shippingtype")}
                isLoading={shippingtype.isFetching}
                loadingMessage={() => "Cargando Opciones..."}
              />
            )}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
            Tipo de Puesto <Validate message={errors?.mailingAddress?.type_position?.message} />
          </p>
          <input className="input_form" {...register("mailingAddress.type_position", { required: "Requerido" })} />
        </Grid>
      </Grid>
      <div className="buttons">
        <Button variant="contained" className="bt_next" onClick={handleSubmit(handleSubmitMailing)}>
          Continuar
        </Button>
        <Button className="bt_back" onClick={() => handleBackBtForm()}>
          Atrás
        </Button>
      </div>
    </SectionStyle>
  );
}
