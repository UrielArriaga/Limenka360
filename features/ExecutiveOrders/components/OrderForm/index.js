import { Button, Grid } from "@material-ui/core";
import { Assignment, AttachMoney } from "@material-ui/icons";
import React, { useEffect } from "react";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { SectionStyle, SelectFormStyle } from "../../styles";
import Validate from "../Validate";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import SelectField from "../SelectField";
export default function OrderForm({ register, errors = {}, control, watch, actions }) {
  const { handleSubmitOrder, handleSubmit, trigger, handleOnChangeSelect, saveLocalStorage } = actions;
  const commonValues = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  useEffect(() => {
    trigger("order");
  }, []);
  return (
    <SectionStyle>
      <div className="sectionheader">
        <h1 className="title" onClick={() => console.log("datos", watch("order"))}>
          Datos de pedido
        </h1>
        <Assignment className="icon_primary" />
      </div>
      <Grid className="container_form" container spacing={2}>
        <Grid item md={6}>
          <p className="title_item">
            Cuenta de Pago
            <Validate message={errors?.order?.paymentaccountId?.message} />
          </p>
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
                onMenuOpen={() => getCatalogBy("paymentsacount")}
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
          {/* <p className="title_item">
            Tipo de Venta
            <Validate message={errors?.order?.typeSaleId?.message} />
          </p> */}
          {/* <Controller
            name="order.typeSaleId"
            control={control}
            rules={{ required: "Requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                className="select_form"
                styles={SelectFormStyle}
                options={commonValues["typesSales"].results}
                onMenuOpen={() => getCatalogBy("typesSales")}
                loadingMessage={() => "Cargando Opciones..."}
                placeholder="Selecciona una Opción"
                isLoading={commonValues["typesSales"].isFetching}
                maxMenuHeight={180}
                getOptionValue={option => option.id}
                getOptionLabel={option => toUpperCaseChart(option.name)}
                value={commonValues["typesSales"].results.find(option => option.id === field.value) || null}
                onChange={selectedOption => {
                  field.onChange(selectedOption?.id);
                  setSelectedTypeSale(selectedOption ? selectedOption.name : null);
                }}
                defaultValue={
                  selectedTypeSale
                    ? commonValues["typesSales"].results.find(option => option.name === selectedTypeSale)
                    : null
                }
              />
            )}
          /> */}

          <SelectField
            label="Tipo de envio "
            name="typesale"
            control={control}
            placeholder="Selecciona un tipo de envio "
            isLoading={false}
            errors={errors}
            options={commonValues["typesSales"].results}
            onMenuOpen={() => getCatalogBy("typesSales")}
            // options={shippingtype.results}
            // errors={errorsShipping}
            handleChange={handleOnChangeSelect}
          />
        </Grid>
        <Grid item md={12}>
          <p className="title_item">
            Observaciones <Validate message={errors?.order?.observations?.message} />
          </p>
          <textarea className="textarea_form" {...register("order.observations", { required: "Requerido" })} />
        </Grid>
      </Grid>
      <div className="buttons">
        <Button variant="contained" className="bt_next" onClick={handleSubmit(handleSubmitOrder)}>
          Continuar
        </Button>
      </div>
    </SectionStyle>
  );
}
