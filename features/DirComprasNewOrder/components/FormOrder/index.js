import { Assignment } from "@material-ui/icons";
import React from "react";
import { FormContainer } from "./styles";
import { Grid } from "@material-ui/core";
import InputField from "../../common/InputField";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import SelectField from "../../common/SelectField";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { ListArrives } from "../../constants";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function FormOrder({ formControls, catalogs, viewControl }) {
  const { getCatalogBy } = useGlobalCommons();
  const { roleId } = useSelector(userSelector);
  const { providers, taxinformations } = useSelector(commonSelector);
  const { control, errors, register, options, handleOnChangeSelect } = formControls;
  const { addressesData, conceptImports, typesorder } = catalogs;

  const { type } = viewControl;
  return (
    <FormContainer>
      <div className="sectionheader">
        <h1 className="title">Datos de la orden</h1>
        <Assignment className="icon_primary" />
      </div>

      <Grid className="container_form" container spacing={2}>
        <Grid item md={6}>
          <SelectField
            label={"Metodo de entrega"}
            name={"delivery"}
            control={control}
            placeholder="Selecciona un Estado"
            isLoading={false}
            options={[
              { id: "recoleccion", name: "Recoleccion" },
              { id: "proveedor envia", name: "Proveedor Envia" },
              { id: "aerea", name: "Aérea" },
              { id: "maritimo", name: "Marítimo" },
            ]}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={"Condiciones de pago"}
            name={"payment_condition"}
            control={control}
            placeholder="Selecciona una opcion"
            isLoading={false}
            options={[
              { id: "pago de contado", name: "Pago de Contado" },
              { id: "credito interno", name: "Credito Interno" },
              { id: "credito externo", name: "Credito Externo" },
              { id: "especie", name: "Especie" },
              { id: "efectivo-contraentrega", name: "Efectivo - Contra Entrega" },
            ]}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={6}>
          <InputField
            label={"Telefono"}
            name={"phone"}
            control={control}
            errors={errors}
            placeholder=""
            register={register}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={"Impuesto"}
            name={"tax"}
            control={control}
            placeholder="Selecciona un impuesto"
            isLoading={taxinformations?.isFetching}
            options={taxinformations?.results}
            errors={errors}
            handleChange={handleOnChangeSelect}
            onMenuOpen={() => getCatalogBy("taxinformations")}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={"Tipo"}
            name={"national"}
            control={control}
            placeholder="Tipo de orden de compra"
            isLoading={false}
            options={typesorder}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />

          {/* Fecha estimada de entrega */}
        </Grid>
        <Grid item md={6}>
          <InputField
            label={"Fecha estimada de entrega"}
            name={"date"}
            control={control}
            errors={errors}
            placeholder="Recibe"
            register={register}
            type="date"
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label="Proveedor"
            name="provider"
            control={control}
            placeholder="Selecciona un Proveedor"
            isLoading={false}
            options={
              providers?.results?.map(provider => ({
                ...provider,
                name: provider.companyname || "Proveedor sin nombre",
              })) || []
            }
            onMenuOpen={() =>
              getCatalogBy(
                "providers",
                roleId !== "director_compras" ? { where: { national: false }, all: 1 } : { all: 1 }
              )
            }
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={"Direccion"}
            name={"address"}
            control={control}
            placeholder="Selecciona una direccion"
            options={addressesData?.results}
            isLoading={addressesData?.isFetching}
            components={{ Option: CustomOption }}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={6}>
          <SelectField
            label={"Destino"}
            name={"arrivesin"}
            control={control}
            placeholder="Selecciona una direccion"
            options={ListArrives}
            isLoading={false}
            isRequired={type === "NACIONAL" ? false : true}
            errors={errors}
            handleChange={handleOnChangeSelect}
          />
        </Grid>

        <Grid item md={12}>
          <InputField
            label={"Observaciones"}
            name={"observations"}
            control={control}
            errors={errors}
            isRequired={false}
            placeholder=""
            register={register}
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
}

const CustomOption = props => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ padding: 5, display: "flex", alignItems: "center", cursor: "pointer", fontSize: 15 }}
    >
      {/* <img src={data.image} alt={data.label} style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 10 }} /> */}
      {data?.entity?.name},{data?.city?.name},{data?.postal?.postal_code},{data?.settlement}
      {data?.ext_number} {data?.int_number} {data?.street}
    </div>
  );
};
