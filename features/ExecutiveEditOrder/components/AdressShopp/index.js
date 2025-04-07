import React, { useEffect, useState } from "react";
import { AdressShopoStyle } from "./style";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Validate from "../Validate";
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import { SelectFormStyle } from "../../style";
import { EntitiesLocal } from "../../../../BD/databd";
import { EditOrderService } from "../../services";
export default function AdressShopp(props) {
  const { hookActions } = props;
  const { setValue, control, register, errors, watch } = hookActions;
  const editOrderService = new EditOrderService();
  const [cities, setCities] = useState({ data: [], isFetching: true });
  const { shippingtype } = useSelector(commonSelector);

  const entity = watch("mailingAddress.entity");
  const postalCode = watch("mailingAddress.postalCodeInvoice");

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
        let settlement = data_code?.settlement;
        setValue("mailingAddress.cologneInvoice", settlement);
        setValue("mailingAddress.entity", entity);
        setValue("mailingAddress.city", city);
        setValue("mailingAddress.postalId", data_code.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdressShopoStyle container spacing={2}>
      <Grid item md={4}>
        <p className="title_data">
          Recibe <Validate message={errors?.mailingAddress?.receive?.message} />
        </p>
        <input
          className="input_form"
          placeholder="Ingresa un Valor"
          {...register("mailingAddress.receive", { required: "Requerido" })}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Calle <Validate message={errors?.mailingAddress?.street?.message} />
        </p>
        <input
          className="input_form"
          placeholder="Ingresa un Valor"
          {...register("mailingAddress.street", { required: "Requerido" })}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">Numero Interior</p>
        <Controller
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
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Numero Exterior <Validate message={errors?.mailingAddress?.ext_number?.message} />
        </p>
        <Controller
          name="mailingAddress.ext_number"
          control={control}
          rules={{ required: "Requerido" }}
          render={({ field }) => (
            <NumberFormat {...field} className="input_form" allowNegative={false} allowLeadingZeros={true} />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Colonia <Validate message={errors?.mailingAddress?.cologneInvoice?.message} />
        </p>
        <input className="input_form" {...register("mailingAddress.cologneInvoice", { required: "Requerido" })} />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
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
        <p className="title_data">
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
        <p className="title_data">
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
        <p className="title_data">
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
              loadingMessage={() => "Selecciona una Entidad..."}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Referencias <Validate message={errors?.mailingAddress?.references?.message} />
        </p>
        <input className="input_form" {...register("mailingAddress.references", { required: "Requerido" })} />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
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
              isLoading={shippingtype.isFetching}
              loadingMessage={() => "Cargando Opciones..."}
            />
          )}
        />
      </Grid>
      <Grid item md={4}>
        <p className="title_data">
          Tipo de Puesto <Validate message={errors?.mailingAddress?.type_position?.message} />
        </p>
        <input className="input_form" {...register("mailingAddress.type_position", { required: "Requerido" })} />
      </Grid>
    </AdressShopoStyle>
  );
}
