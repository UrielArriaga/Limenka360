import React from "react";
import { EditOrderShippingStyled } from "./styles";
import { Button, Checkbox, Grid, Switch } from "@material-ui/core";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { EntitiesLocal } from "../../../../BD/databd";
import SelectField from "../SelectField";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import TextAreaField from "../TextAreaField";

export default function EditOrderBilling({
  open = true,
  handletoogle,
  registerBilling,
  handleSubmitBilling,
  controlBilling,
  handleOnChangePostalCodeBill,
  handleOnClickUpdateBilling,
  handleOnChangeSelectBilling,
  optionsSelectBilling,
  errorsBilling,
  hasBilling,
  setHasBilling,
}) {
  const { cities, taxregime, cfdi, paymentway, paymentmethod } = useSelector(commonSelector);

  const { getCatalogBy } = useGlobalCommons();

  const handle = formdata => {
    console.log("handle");
    console.log(formdata);
  };

  const rules = {
    all: {
      required: "*Requerido",
    },

    pattern: {
      required: "*Requerido",
      value: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
      message: "*RFC Incorrecto",
    },
    phone: {
      required: "*Requerido",
      minLength: { value: 10, message: "El número de teléfono debe tener 10 dígitos" },
      maxLength: { value: 10, message: "El número de teléfono debe tener 10 dígitos" },
    },
  };
  return (
    <EditOrderShippingStyled open={open} anchor="right" onClose={() => handletoogle()}>
      <div className="header">
        <h3>Editar datos de facturacion</h3>
      </div>

      <div className="checkboxcontainer">
        <Checkbox value={hasBilling} checked={hasBilling} onChange={e => setHasBilling(e.target.checked)} />
        <p>Habilitar Factura</p>
      </div>

      <form onSubmit={handleSubmitBilling(handleOnClickUpdateBilling)}>
        {hasBilling && (
          <Grid container spacing={2}>
            <Grid item md={6}>
              <InputField
                label="Razón Social"
                name="businessName"
                placeholder="razon social"
                register={registerBilling}
                rules={{ required: "*Requerido" }}
                errors={errorsBilling}
                disabled={!hasBilling}
              />
            </Grid>

            <Grid item md={6}>
              <InputField
                label="RFC"
                name="rfc"
                placeholder="RFC"
                register={registerBilling}
                rules={rules.pattern}
                errors={errorsBilling}
              />
            </Grid>

            <Grid item md={6}>
              <SelectField
                label="Regimen Fiscal"
                name="taxregime"
                control={controlBilling}
                placeholder="Selecciona un regimen fiscal"
                isLoading={taxregime.isFetching}
                options={taxregime.results?.length > 0 ? taxregime.results : optionsSelectBilling?.taxregimendef}
                errors={errorsBilling}
                isFetching={taxregime.isFetching}
                onMenuOpen={() => getCatalogBy("taxregimes")}
                handleChange={handleOnChangeSelectBilling}
              />
            </Grid>

            <Grid item md={6}>
              <SelectField
                label="Uso de CFDI"
                name="cfdi"
                control={controlBilling}
                placeholder="Seleccion uso de CFDI"
                isLoading={cfdi.isFetching}
                options={cfdi.results?.length > 0 ? cfdi.results : optionsSelectBilling?.cfdidef}
                // options={cfdi.results}
                errors={errorsBilling}
                isFetching={cfdi.isFetching}
                onMenuOpen={() => getCatalogBy("cfdis")}
                handleChange={handleOnChangeSelectBilling}
              />
            </Grid>

            <Grid item md={6}>
              <SelectField
                label="Metodo de Pago"
                name="paymentmethod"
                control={controlBilling}
                placeholder="Seleccion uso de CFDI"
                isLoading={paymentmethod.isFetching}
                options={
                  paymentmethod.results.length > 0 ? paymentmethod.results : optionsSelectBilling?.paymentmethoddef
                }
                errors={errorsBilling}
                isFetching={paymentway.isFetching}
                onMenuOpen={() => getCatalogBy("paymentmethods")}
                handleChange={handleOnChangeSelectBilling}
              />
            </Grid>
            <Grid item md={6}>
              <SelectField
                label="Forma de Pago"
                name="paymentway"
                control={controlBilling}
                placeholder="Seleccion forma de pago"
                isLoading={paymentway.isFetching}
                options={paymentway.results?.length > 0 ? paymentway.results : optionsSelectBilling?.paymentwaydef}
                errors={errorsBilling}
                isFetching={paymentway.isFetching}
                onMenuOpen={() => getCatalogBy("paymentways")}
                handleChange={handleOnChangeSelectBilling}
              />
            </Grid>

            <Grid item md={6}>
              <InputField
                label="Telefono"
                name="phoneInvoice"
                placeholder="Digíte número a 10 dígitos"
                register={registerBilling}
                rules={rules.phone}
                errors={errorsBilling}
              />
            </Grid>

            <Grid item md={6}>
              <InputField
                label="Calle"
                name="streetInvoice"
                placeholder="Calle"
                register={registerBilling}
                rules={rules.all}
                errors={errorsBilling}
              />
            </Grid>
            <Grid item md={6}>
              <InputField
                label="Número interior"
                name="int_numberInvoice"
                placeholder="Número Exterior"
                register={registerBilling}
                rules={rules.all}
                errors={errorsBilling}
              />
            </Grid>
            <Grid item md={6}>
              <InputField
                label="Número exterior"
                name="ext_numberInvoice"
                placeholder="Número exterior"
                register={registerBilling}
                rules={rules.all}
                errors={errorsBilling}
              />
            </Grid>

            <Grid item md={6}>
              <InputField
                label="Colonia"
                name="cologneInvoice"
                placeholder="Colonia"
                register={registerBilling}
                rules={rules.all}
                errors={errorsBilling}
              />
            </Grid>

            <Grid item md={6}>
              <InputField
                label="Código Postal"
                name="postalCodeInvoice"
                placeholder="Codigo Postal"
                register={registerBilling}
                rules={rules.all}
                errors={errorsBilling}
                handleChange={handleOnChangePostalCodeBill}
              />
            </Grid>
            <Grid item md={6}>
              <SelectField
                label="Estado"
                name="entity"
                control={controlBilling}
                placeholder="Selecciona un Estado"
                isLoading={false}
                options={EntitiesLocal}
                errors={errorsBilling}
                handleChange={handleOnChangeSelectBilling}
              />
            </Grid>

            <Grid item md={6}>
              <SelectField
                label="Ciudad"
                name="city"
                control={controlBilling}
                placeholder="Selecciona una Ciudad"
                isLoading={false}
                options={cities.results}
                errors={errorsBilling}
                handleChange={handleOnChangeSelectBilling}
              />
            </Grid>

            {/*

         

          <pre>{JSON.stringify(watchBilling("waytoPay"), null, 2)}</pre> */}
          </Grid>
        )}
        <div className="actions">
          <Button onClick={() => handletoogle()} className="cancel">
            Cancelar
          </Button>

          <Button type="submit" className="allow">
            {hasBilling ? "Actualizar Factura" : "Guardar"}
          </Button>
        </div>
      </form>
    </EditOrderShippingStyled>
  );
}
