import React from "react";
import { FormContainer } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import InputField from "../../common/InputField";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import SelectField from "../../common/SelectField";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function FormBuyer({ formControls }) {
  const { control, errors, register, options, handleOnChangeSelect } = formControls;
  const { paymentsacount, shippingtype, cities, taxinformations } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  return (
    <FormContainer>
      <div className="sectionheader">
        <h1 className="title">Datos de pedido</h1>
        <Assignment className="icon_primary" />
      </div>

      <Grid className="container_form" container spacing={2}>
        <Grid item md={6}>
          <InputField
            label={"Nombre"}
            name={"name"}
            control={control}
            errors={errors}
            placeholder=""
            register={register}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={"Inpuesto"}
            name={"tax"}
            control={control}
            placeholder=""
            isLoading={false}
            options={taxinformations.results}
            errors={errors}
            onMenuOpen={() => getCatalogBy("taxinformations")}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={6}>
          <InputField
            label={"Contacto"}
            name={"contact"}
            control={control}
            errors={errors}
            placeholder=""
            register={register}
          />
        </Grid>

        <Grid item md={6}>
          <InputField
            label={"Correo"}
            name={"email"}
            control={control}
            errors={errors}
            placeholder=""
            register={register}
          />
        </Grid>

        <Grid item md={6}>
          <InputField
            label={"Telefono"}
            name={"phonebuyer"}
            control={control}
            errors={errors}
            placeholder=""
            register={register}
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}
