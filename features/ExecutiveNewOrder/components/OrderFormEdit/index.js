import React from "react";
import { OrderFormEditStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import SelectField from "../SelectField";
import TextAreaField from "../TextAreaField";
import { namesForm } from "../../../ExecutiveEditOrder/data";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function OrderFormEdit({ formControls }) {
  const { control, errors, register, options, handleOnChangeSelect } = formControls;
  const { paymentsacount, typesSales } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { orderNames } = namesForm;
  return (
    <OrderFormEditStyled>
      <div className="sectionheader">
        <h1 className="title">Datos de pedido</h1>
        <Assignment className="icon_primary" />
      </div>

      <Grid className="container_form" container spacing={2}>
        <Grid item md={6}>
          <SelectField
            label={orderNames.paymentaccount.label}
            name={orderNames.paymentaccount.name}
            control={control}
            errors={errors}
            options={paymentsacount.results}
            onMenuOpen={() => getCatalogBy("paymentsacount")}
            handleChange={handleOnChangeSelect}
            placeholder={"Selecciona Cuenta de pago"}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={orderNames.typesale.label}
            name={orderNames.typesale.name}
            control={control}
            errors={errors}
            options={typesSales.results?.length > 0 ? typesSales.results : options?.typesales}
            onMenuOpen={() => getCatalogBy("typesSales")}
            handleChange={handleOnChangeSelect}
            placeholder={"Selecciona Tipo de Venta"}
          />
        </Grid>

        <Grid item md={6}>
          <TextAreaField
            label={orderNames.observations.label}
            name={orderNames.observations.name}
            control={control}
            errors={errors}
            register={register}
            placeholder={"Observaciones "}
          />
        </Grid>
      </Grid>
    </OrderFormEditStyled>
  );
}
