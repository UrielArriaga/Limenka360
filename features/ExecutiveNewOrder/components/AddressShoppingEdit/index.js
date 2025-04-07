import React from "react";
import { AddressShoppingEditStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import SelectField from "../SelectField";
import InputField from "../InputField";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { namesForm } from "../../../ExecutiveEditOrder/data";
import { EntitiesLocal } from "../../../../BD/databd";
import InputFieldPostalCode from "../InputFieldPostalCode";

export default function AddressShoppingEdit({ formControls }) {
  const {
    rules,
    control,
    errors,
    register,
    options,
    handleOnChangeSelect,
    handleOnChangePostalCode,
    handleSelectEntity,
    trigger,
  } = formControls;
  const { paymentsacount, shippingtype, cities } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { orderNames, addressShipping } = namesForm;

  return (
    <AddressShoppingEditStyled>
      <div className="sectionheader">
        <h1 className="title">Direccion de envio</h1>
        <Assignment className="icon_primary" />
      </div>

      <Grid className="container_form" container spacing={2}>
        <Grid item md={4}>
          <InputField
            label={addressShipping.receive.label}
            name={addressShipping.receive.name}
            control={control}
            errors={errors}
            placeholder="Recibe"
            register={register}
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={addressShipping.street.label}
            name={addressShipping.street.name}
            control={control}
            errors={errors}
            register={register}
            placeholder="Calle"
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={addressShipping.number_int.label}
            name={addressShipping.number_int.name}
            control={control}
            errors={errors}
            register={register}
            placeholder="Número Interior"
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={addressShipping.number_ext.label}
            name={addressShipping.number_ext.name}
            errors={errors}
            register={register}
            placeholder="Número Exterior"
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={addressShipping.settlement.label}
            name={addressShipping.settlement.name}
            errors={errors}
            register={register}
            placeholder="Colonia"
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={orderNames.phone.label}
            name={orderNames.phone.name}
            control={control}
            errors={errors}
            register={register}
            type="number"
            placeholder="Telefono"
          />
        </Grid>

        <Grid item md={4}>
          <InputFieldPostalCode
            label={addressShipping.postalCode.label}
            name={addressShipping.postalCode.name}
            register={register}
            rules={rules.all}
            errors={errors}
            handleChange={handleOnChangePostalCode}
            placeholder="Codigo Postal"
          />
        </Grid>

        <Grid item md={4}>
          <SelectField
            label={addressShipping.entity.label}
            name={addressShipping.entity.name}
            control={control}
            placeholder="Selecciona un Estado"
            isLoading={false}
            options={EntitiesLocal}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={4}>
          <SelectField
            label={addressShipping.city.label}
            name={addressShipping.city.name}
            control={control}
            placeholder="Selecciona una Ciudad"
            isLoading={false}
            options={cities.results}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={addressShipping.reference.label}
            name={addressShipping.reference.name}
            register={register}
            errors={errors}
            placeholder="Referencias"
          />
        </Grid>

        <Grid item md={4}>
          <SelectField
            label={addressShipping.shippingtype.label}
            name={addressShipping.shippingtype.name}
            control={control}
            placeholder="Selecciona un tipo de envio"
            isLoading={false}
            options={shippingtype.results?.length > 0 ? shippingtype.results : options?.shippingtypes}
            errors={errors}
            handleChange={handleOnChangeSelect}
            onMenuOpen={() => getCatalogBy("shippingtype")}
          />
        </Grid>

        <Grid item md={4}>
          <InputField
            label={orderNames.workstation.label}
            name={orderNames.workstation.name}
            register={register}
            errors={errors}
            placeholder="Puesto de Trabajo"
          />
        </Grid>

        {/* <Grid item md={6}>
          <SelectField label={"Calle"} name={"addressshipping.street"} control={control} errors={errors} />
        </Grid> */}
      </Grid>
    </AddressShoppingEditStyled>
  );
}
