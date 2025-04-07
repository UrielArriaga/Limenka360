import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { toUpperCaseChart } from "../../../../utils";
import { SelectFormStyle } from "../../style";
import { useSelector } from "react-redux";
import { OrderFormStyle } from "./style";
export default function OrderForm(props) {
  const { hookActions } = props;
  const { setValue, control, register } = hookActions;
  const commonValues = useSelector(commonSelector);

  return (
    <OrderFormStyle container spacing={2}>
      <Grid item md={6}>
        <p className="title_data">Cuentas de Pago</p>
        <Controller
          name="order.paymentaccountId"
          control={control}
          rules={{ required: "Requerido" }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={commonValues["paymentsacount"].results}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              isLoading={commonValues["paymentsacount"].isFetching}
              maxMenuHeight={180}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
            />
          )}
        />
      </Grid>
      <Grid item md={6}>
        <p className="title_data">Tipo de Venta</p>
        <Controller
          name="order.typeSaleId"
          control={control}
          rules={{ required: "Requerido" }}
          render={({ field }) => (
            <Select
              {...field}
              className="select_form"
              styles={SelectFormStyle}
              options={commonValues["typesSales"].results}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Selecciona una Opción"
              isLoading={commonValues["typesSales"].isFetching}
              maxMenuHeight={180}
              getOptionValue={option => option.id}
              getOptionLabel={option => toUpperCaseChart(option.name)}
              isClearable
            />
          )}
        />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <p className="title_data">Observaciones</p>
        <textarea className="textarea_form" {...register("order.observations", { required: "Requerido" })} />
      </Grid>
    </OrderFormStyle>
  );
}
