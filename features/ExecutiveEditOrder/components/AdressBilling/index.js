import React, { useEffect, useState } from "react";
import { AdressBillingStyle } from "./style";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { Grid, Switch } from "@material-ui/core";
import { EditOrderService } from "../../services";
import Validate from "../Validate";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { SelectFormStyle } from "../../style";
import { toUpperCaseChart } from "../../../../utils";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import NumberFormat from "react-number-format";
import { EntitiesLocal } from "../../../../BD/databd";
export default function AddressBilling(props) {
  const { hookActions, states, functions } = props;
  const { setValue, control, register, watch, errors } = hookActions;
  const { requiredBill } = states;
  const { handleSwitch } = functions;
  const { cfdi, paymentmethod, paymentway, taxregime } = useSelector(commonSelector);
  const editOrderService = new EditOrderService();
  const { getCatalogBy } = useGlobalCommons();

  const [cities, setCities] = useState({ data: [], isFetching: true });

  const entity = watch("billingData.entity");
  const postalCode = watch("billingData.postalCodeInvoice");

  useEffect(() => {
    if (entity) getCities();
  }, [entity]);

  useEffect(() => {
    if (postalCode) handlePostalCode();
  }, [postalCode]);

  const getCities = async () => {
    try {
      setCities({ ...cities, isFetching: true });
      let cities = await editOrderService.getCitiesByEntityId(entity.id);
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
        let response = await editOrderService.getEntitiesAndCityByPostalCode(postalCode);
        let data_code = response.data.results[0];
        let entity = data_code?.city?.entity || null;
        let city = data_code?.city || null;
        let settlement = data_code.settlement;
        setValue("billingData.postalId", data_code.id);
        setValue("billingData.cologneInvoice", settlement);
        setValue("billingData.entity", entity);
        setValue("billingData.city", city);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdressBillingStyle container spacing={2}>
      <Grid md={12} sm={12} xs={12} item>
        <div className="required_billing">
          <p className="title_bill">¿Se Requiere Factura?</p>
          <Switch
            checked={requiredBill}
            className="switch"
            size="small"
            onChange={handleSwitch}
            name="checkedB"
            color="primary"
          />
        </div>
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Razón Social <Validate message={errors?.billingData?.businessName?.message} />
        </p>
        <input
          className="input_form"
          {...register("billingData.businessName", { required: requiredBill ? "Requerido" : false })}
          disabled={!requiredBill}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          RFC <Validate message={errors?.billingData?.rfc?.message} />
        </p>
        <input
          className="input_form"
          {...register("billingData.rfc", {
            required: requiredBill ? "Requerido" : false,
            pattern: {
              value:
                /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
              message: "RFC Incorrecto",
            },
          })}
          disabled={!requiredBill}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Uso de CFDI
          <Validate message={errors?.billingData?.cfdiId?.message} />
        </p>
        <Controller
          name="billingData.cfdiId"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={cfdi.results}
              onMenuOpen={() => getCatalogBy("cfdis")}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              isLoading={cfdi.isFetching}
              maxMenuHeight={180}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
              isDisabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Método de Pago
          <Validate message={errors?.billingData?.paymentMethod?.message} />
        </p>
        <Controller
          name="billingData.paymentMethod"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={paymentmethod.results}
              onMenuOpen={() => getCatalogBy("paymentmethods")}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              isLoading={paymentmethod.isFetching}
              maxMenuHeight={180}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
              isDisabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Forma de Pago
          <Validate message={errors?.billingData?.waytoPay?.message} />
        </p>
        <Controller
          name="billingData.waytoPay"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={paymentway.results}
              onMenuOpen={() => getCatalogBy("paymentways")}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              isLoading={paymentway.isFetching}
              maxMenuHeight={180}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
              isDisabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Régimen Fiscal
          <Validate message={errors?.billingData?.taxregime?.message} />
        </p>
        <Controller
          name="billingData.taxregime"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={taxregime.results}
              onMenuOpen={() => getCatalogBy("taxregimes")}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              isLoading={taxregime.isFetching}
              maxMenuHeight={180}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
              isDisabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Teléfono <Validate message={errors?.billingData?.phoneInvoice?.message} />
        </p>
        <Controller
          name="billingData.phoneInvoice"
          control={control}
          rules={{
            required: requiredBill ? "Requerido" : false,
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
          render={({ field }) => <NumberFormat {...field} className="input_form" disabled={!requiredBill} />}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Calle <Validate message={errors?.billingData?.street?.message} />
        </p>
        <input
          className="input_form"
          {...register("billingData.street", { required: requiredBill ? "Requerido" : false })}
          disabled={!requiredBill}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Numero Interior <Validate message={errors?.billingData?.int_number?.message} />
        </p>
        <Controller
          name="billingData.int_number"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <NumberFormat
              {...field}
              className="input_form"
              allowNegative={false}
              allowLeadingZeros={true}
              disabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Numero Exterior <Validate message={errors?.billingData?.ext_number?.message} />
        </p>
        <Controller
          name="billingData.ext_number"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <NumberFormat
              {...field}
              className="input_form"
              allowNegative={false}
              allowLeadingZeros={true}
              disabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Colonia <Validate message={errors?.billingData?.cologneInvoice?.message} />
        </p>
        <input
          className="input_form"
          {...register("billingData.cologneInvoice", { required: requiredBill ? "Requerido" : false })}
          disabled={!requiredBill}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Código Postal <Validate message={errors?.billingData?.postalCodeInvoice?.message} />
        </p>
        <Controller
          name="billingData.postalCodeInvoice"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <NumberFormat
              {...field}
              className="input_form"
              allowNegative={false}
              allowLeadingZeros={true}
              disabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Estado <Validate message={errors?.billingData?.entity?.message} />
        </p>
        <Controller
          name="billingData.entity"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={EntitiesLocal}
              placeholder="Selecciona una Opción"
              maxMenuHeight={150}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
              isDisabled={!requiredBill}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Municipio / Ciudad <Validate message={errors?.billingData?.city?.message} />
        </p>
        <Controller
          name="billingData.city"
          control={control}
          rules={{ required: requiredBill ? "Requerido" : false }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={cities.data}
              maxMenuHeight={150}
              placeholder="Selecciona una Opción"
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
              isDisabled={!requiredBill}
            />
          )}
        />
      </Grid>
    </AdressBillingStyle>
  );
}
