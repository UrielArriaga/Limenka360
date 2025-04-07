import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Grid, Switch } from "@material-ui/core";
import { Assignment, AttachMoney } from "@material-ui/icons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { EntitiesLocal } from "../../../../BD/databd";
import { SectionStyle, SelectFormStyle } from "../../styles";
import Validate from "../Validate";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import NumberFormat from "react-number-format";
import ExecutiveOrdersService from "../../services";
export default function BillingForm({ control, register, setValue, watch, errors, actions, states }) {
  const {
    handleBackBtForm,
    clearFormError,
    handleSwitch,
    handleSubmit,
    handleSubmitBilling,
    trigger,
    saveLocalStorage,
  } = actions;
  const { requiredBill } = states;

  const { cfdi, paymentmethod, paymentway, taxregime } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const executiveOrderService = new ExecutiveOrdersService();
  const [cities, setCities] = useState({ data: [], isFetching: true });
  const entity = watch("billingData.entity");
  const postalCode = watch("billingData.postalCodeInvoice");

  useEffect(() => {
    trigger("billingData");
    saveLocalStorage();
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
        let settlement = data_code.settlement;
        setValue("billingData.postalId", data_code.id);
        setValue("billingData.cologneInvoice", settlement);
        setValue("billingData.entity", entity);
        setValue("billingData.city", city);
        clearFormError(["billingData.cologneInvoice", "billingData.entity", "billingData.city"]);
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
      <div className="sectionheader billing">
        <div className="billing_header">
          <h3 className="title" onClick={() => console.log("factura", watch("billingData"))}>
            Datos de Facturación
          </h3>
          <Assignment className="icon_primary" />
        </div>
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
      </div>
      <Grid className="container_form" container spacing={2}>
        <Grid item md={4}>
          <p className="title_item">
            Razón Social <Validate message={errors?.billingData?.businessName?.message} />
          </p>
          <input
            className="input_form"
            {...register("billingData.businessName", { required: requiredBill ? "Requerido" : false })}
            disabled={!requiredBill}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
            Calle <Validate message={errors?.billingData?.street?.message} />
          </p>
          <input
            className="input_form"
            {...register("billingData.street", { required: requiredBill ? "Requerido" : false })}
            disabled={!requiredBill}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
            Colonia <Validate message={errors?.billingData?.cologneInvoice?.message} />
          </p>
          <input
            className="input_form"
            {...register("billingData.cologneInvoice", { required: requiredBill ? "Requerido" : false })}
            disabled={!requiredBill}
          />
        </Grid>
        <Grid item md={4}>
          <p className="title_item">
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
          <p className="title_item">
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
          <p className="title_item">
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
      </Grid>
      <div className="buttons">
        <Button variant="contained" className="bt_next" onClick={handleSubmit(handleSubmitBilling)}>
          Continuar
        </Button>
        <Button className="bt_back" onClick={() => handleBackBtForm()}>
          Atrás
        </Button>
      </div>
    </SectionStyle>
  );
}
