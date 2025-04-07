import React, { useState } from "react";
import { AddressShoppingEditStyled, BillingEditStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Grid, Switch } from "@material-ui/core";
import SelectField from "../SelectField";
import InputField from "../InputField";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { namesForm } from "../../../ExecutiveEditOrder/data";
import { EntitiesLocal } from "../../../../BD/databd";
import InputFieldPostalCode from "../InputFieldPostalCode";

export default function BillingEdit({ formControls }) {
  const {
    rules = {},
    control,
    errors,
    register,
    options,
    citiesBilling,
    requireBilling,
    setRequireBilling,
    handleOnChangeSelect,
    handleOnChangePostalCodeBilling,
    handleSelectEntity,
  } = formControls;
  const { cfdi, paymentmethod, paymentway, taxregime, cities } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { orderNames, billing } = namesForm;

  // const [requireBilling, setRequireBilling] = useState(false);

  return (
    <BillingEditStyled>
      <div className="sectionheader">
        <h1 className="title">Direccion de facturacion</h1>
        <Assignment className="icon_primary" />
      </div>

      <div className="required_billing">
        <p className="title_bill">¿Se Requiere Factura?</p>
        <Switch
          checked={requireBilling}
          className="switch"
          size="small"
          onChange={e => {
            if (e.target.checked) {
              setRequireBilling(true);
            } else {
              setRequireBilling(false);
            }
          }}
          name="checkedB"
          color="primary"
        />
      </div>

      {requireBilling && (
        <Grid className="container_form" container spacing={2}>
          <Grid item md={4}>
            <InputField
              label={billing.businessName.label}
              name={billing.businessName.name}
              register={register}
              rules={rules.all}
              errors={errors}
              disabled={!requireBilling}
            />
          </Grid>

          <Grid item md={4}>
            <InputField
              label={billing.rfc.label}
              name={billing.rfc.name}
              register={register}
              rules={rules.all}
              errors={errors}
              disabled={!requireBilling}
            />
          </Grid>

          <Grid item md={4}>
            <SelectField
              label={billing.cfdi.label}
              name={billing.cfdi.name}
              control={control}
              placeholder="Uso de CFDI"
              isLoading={false}
              options={cfdi.results?.length > 0 ? cfdi.results : options?.cfdidef}
              errors={errors}
              handleChange={handleOnChangeSelect}
              disabled={!requireBilling}
              onMenuOpen={() => getCatalogBy("cfdis")}
            />
          </Grid>

          <Grid item md={4}>
            <SelectField
              label={billing.paymentMethod.label}
              name={billing.paymentMethod.name}
              control={control}
              placeholder="Metodo de pago"
              isLoading={false}
              options={paymentmethod.results?.length > 0 ? paymentmethod.results : options?.paymentmethods}
              errors={errors}
              handleChange={handleOnChangeSelect}
              disabled={!requireBilling}
              onMenuOpen={() => getCatalogBy("paymentmethods")}
            />
          </Grid>

          <Grid item md={4}>
            <SelectField
              label={billing.waytoPay.label}
              name={billing.waytoPay.name}
              control={control}
              placeholder="Forma de pago"
              isLoading={false}
              options={paymentway.results?.length > 0 ? paymentway.results : options?.paymentwaydef}
              errors={errors}
              handleChange={handleOnChangeSelect}
              disabled={!requireBilling}
              onMenuOpen={() => getCatalogBy("paymentways")}
            />
          </Grid>

          <Grid item md={4}>
            <SelectField
              label={billing.taxregime.label}
              name={billing.taxregime.name}
              control={control}
              placeholder="Regimen fiscal"
              isLoading={false}
              options={taxregime.results?.length > 0 ? taxregime.results : options?.taxregimes}
              errors={errors}
              handleChange={handleOnChangeSelect}
              disabled={!requireBilling}
              onMenuOpen={() => getCatalogBy("taxregimes")}
            />
          </Grid>

          {/* xxx */}
          <Grid item md={4}>
            <InputField
              label={billing.phone.label}
              name={billing.phone.name}
              control={control}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item md={4}>
            <InputField
              label={billing.street.label}
              name={billing.street.name}
              control={control}
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item md={4}>
            <InputField
              label={billing.number_int.label}
              name={billing.number_int.name}
              control={control}
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item md={4}>
            <InputField
              label={billing.number_ext.label}
              name={billing.number_ext.name}
              control={control}
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item md={4}>
            <InputField
              label={billing.settlement.label}
              name={billing.settlement.name}
              control={control}
              errors={errors}
              register={register}
            />
          </Grid>

          {/* xxx */}

          <Grid item md={4}>
            <InputFieldPostalCode
              label={billing.postalCode.label}
              name={billing.postalCode.name}
              register={register}
              rules={rules.all}
              errors={errors}
              handleChange={handleOnChangePostalCodeBilling}
              disabled={!requireBilling}
            />
          </Grid>

          <Grid item md={4}>
            <SelectField
              label={billing.entity.label}
              name={billing.entity.name}
              control={control}
              placeholder="Selecciona un Estado"
              isLoading={false}
              options={EntitiesLocal}
              errors={errors}
              handleChange={handleOnChangeSelect}
              disabled={!requireBilling}
            />
          </Grid>

          <Grid item md={4}>
            <SelectField
              label={billing.city.label}
              name={billing.city.name}
              control={control}
              placeholder="Selecciona una Ciudad"
              isLoading={false}
              options={citiesBilling}
              errors={errors}
              handleChange={handleOnChangeSelect}
              disabled={!requireBilling}
            />
          </Grid>
        </Grid>
      )}
    </BillingEditStyled>
  );
}
