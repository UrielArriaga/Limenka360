import React from "react";
import { EditOrderShippingStyled } from "./styles";
import { Button, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { EntitiesLocal } from "../../../../BD/databd";
import SelectField from "../SelectField";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import TextAreaField from "../TextAreaField";

export default function EditOrderData({
  open = true,
  handletoogle,
  controlOrderData,
  errorsOrderData,
  handleSubmitOrderData,
  handleOnClickUpdateOrderData,
  registerOrderData,
  setValueOrderData,

  // registerShipping,
  // controlShipping,
  // handleSelectEntity,
  // handleSelectCity,
  // handleOnChangePostalCode,
  // handleOnClickUpdateShipping,
  // handleSubmitShipping,
  // handleOnChangeSelect,
  // errorsShipping,
}) {
  const { cities, shippingtype } = useSelector(commonSelector);

  const { getCatalogBy } = useGlobalCommons();

  const rules = {
    all: {
      required: "*Requerido",
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
        <h3>Editar datos</h3>
      </div>

      <form onSubmit={handleSubmitOrderData(handleOnClickUpdateOrderData)}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <InputField
              label="Recibe"
              name="receive"
              disabled
              placeholder="Recibe"
              register={registerOrderData}
              rules={{ required: "*Requerido" }}
              errors={errorsOrderData}
            />
          </Grid>

          <Grid item md={6}>
            <SelectField
              label="Cuenta de pago"
              name="shippingtype"
              control={controlOrderData}
              placeholder="Selecciona una cuenta de pago"
              isLoading={false}
              options={shippingtype.results}
              errors={errorsOrderData}
              // handleChange={handleOnChangeSelect}
            />
          </Grid>

          <Grid item md={6}>
            <SelectField
              label="Tipo de venta"
              name="shippingtype"
              control={controlOrderData}
              placeholder="Selecciona el tipo de venta"
              isLoading={false}
              options={shippingtype.results}
              errors={errorsOrderData}
              // handleChange={handleOnChangeSelect}
            />
          </Grid>
        </Grid>

        {/* <h4>Datos de prospecto</h4> */}

        {/* <Grid item md={6}>
            <InputField
              label="Telefono"
              name="phoneInvoice"
              placeholder="Digíte número a 10 dígitos"
              register={registerShipping}
              rules={rules.phone}
              errors={errorsShipping}
            />
          </Grid>

          <Grid item md={6}>
            <InputField
              label="Calle"
              name="streetInvoice"
              placeholder="Calle"
              register={registerShipping}
              rules={rules.all}
              errors={errorsShipping}
            />
          </Grid>

          <Grid item md={6}>
            <InputField
              label="Número interior"
              name="int_numberInvoice"
              placeholder="Número Exterior"
              register={registerShipping}
              rules={rules.all}
              errors={errorsShipping}
            />
          </Grid>

          <Grid item md={6}>
            <InputField
              label="Número exterior"
              name="ext_numberInvoice"
              placeholder="Número exterior"
              register={registerShipping}
              rules={rules.all}
              errors={errorsShipping}
            />
          </Grid>

          <Grid item md={6}>
            <InputField
              label="Colonia"
              name="cologneInvoice"
              placeholder="Colonia"
              register={registerShipping}
              rules={rules.all}
              errors={errorsShipping}
            />
          </Grid>

          <Grid item md={6}>
            <InputField
              label="Código Postal"
              name="postalCodeInvoice"
              placeholder="Colonia"
              register={registerShipping}
              rules={rules.all}
              errors={errorsShipping}
              handleChange={handleOnChangePostalCode}
            />
          </Grid>

          <Grid item md={6}>
            <SelectField
              label="Estado"
              name="entity"
              control={controlShipping}
              placeholder="Selecciona un Estado"
              isLoading={false}
              options={EntitiesLocal}
              errors={errorsShipping}
              handleChange={handleSelectEntity}
            />
          </Grid>

          <Grid item md={6}>
            <SelectField
              label="Ciudad"
              name="city"
              control={controlShipping}
              placeholder="Selecciona una Ciudad"
              isLoading={false}
              options={cities.results}
              errors={errorsShipping}
              handleChange={handleSelectCity}
            />
          </Grid>

          <Grid item md={6}>
            <SelectField
              label="Tipo de envio "
              name="shippingtype"
              control={controlShipping}
              placeholder="Selecciona un tipo de envio "
              isLoading={false}
              options={shippingtype.results}
              errors={errorsShipping}
              handleChange={handleOnChangeSelect}
            />
          </Grid>

          <Grid item md={12}>
            <TextAreaField
              label="Observaciones agregadas por el ejecutivo"
              name="observations"
              placeholder="Observaciones"
              register={registerShipping}
              rules={rules.all}
              errors={errorsShipping}
              handleChange={handleOnChangePostalCode}
            />
          </Grid> */}

        <div className="actions">
          <Button onClick={() => handletoogle()} className="cancel">
            Cancelar
          </Button>

          <Button type="submit" className="allow">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </EditOrderShippingStyled>
  );
}
