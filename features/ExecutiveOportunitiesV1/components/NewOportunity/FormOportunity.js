import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { colors } from "../../../../styles/global.styles";
import { Grid, Slider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useForm, Controller } from "react-hook-form";

export default function FormOportunity({ prospectSelected, onSubmit }) {
  const { phases, clientTypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phase: null,
      clientType: null,
      closeDate: "",
      observations: "",
    },
  });

  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
    console.log("Formulario enviado:", data);
  };

  return (
    <FormStyled onSubmit={handleSubmit(handleFormSubmit)}>
      <InfoProspectStyled container spacing={2}>
        {/* Fase */}
        <Grid item xs={6}>
          <label className="item">
            Fase <strong>*</strong>
          </label>
          <div className="point" />
          <Controller
            name="phase"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <Select
                {...field}
                onMenuOpen={() => getCatalogBy("phases")}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={phases?.results}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                isLoading={phases?.isFetching}
                noOptionsMessage={() => "Sin Opciones"}
                loadingMessage={() => "Cargando Opciones"}
              />
            )}
          />
          {errors.phase && <p className="error">{errors.phase.message}</p>}
        </Grid>

        {/* Fecha de Cierre */}
        <Grid item xs={6}>
          <label className="item">
            Fecha de Cierre <strong>*</strong>
          </label>
          <div className="point" />
          <input
            type="date"
            {...register("closeDate", { required: "Campo requerido" })}
            className="inputItemData"
          />
          {errors.closeDate && (
            <p className="error">{errors.closeDate.message}</p>
          )}
        </Grid>

        {/* Tipo de Cliente */}
        <Grid item xs={6}>
          <label className="item">
            Tipo de Cliente <strong>*</strong>
          </label>
          <div className="point" />
          <Controller
            name="clientType"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <Select
                {...field}
                onMenuOpen={() => getCatalogBy("clientTypes")}
                className="select_data"
                placeholder="Selecciona una Opción"
                options={clientTypes?.results}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                isLoading={clientTypes?.isFetching}
                noOptionsMessage={() => "Sin Opciones"}
                loadingMessage={() => "Cargando Opciones"}
              />
            )}
          />
          {errors.clientType && (
            <p className="error">{errors.clientType.message}</p>
          )}
        </Grid>

        {/* Tipo de Cliente */}
        <Grid item xs={6}>
          <LabelStyled>
            Certeza <strong>*</strong>
          </LabelStyled>
          <div className="point" />
          <Controller
            name="certeza"
            control={control}
            rules={{ required: "La certeza es obligatoria" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Slider
                  {...field}
                  value={field.value || 0}
                  onChange={(e, newValue) => field.onChange(newValue)}
                  aria-labelledby="certeza-slider"
                  step={10}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                  valueLabelComponent={(props) => (
                    <ValueLabelStyled {...props}>
                      {props.children}
                    </ValueLabelStyled>
                  )}
                />
                {error && <ErrorStyled>{error.message}</ErrorStyled>}
              </>
            )}
          />
        </Grid>
        {/* Observaciones */}
        <Grid item xs={12}>
          <label className="item">Observaciones</label>
          <div className="point" />
          <input
            type="text"
            {...register("observations")}
            className="inputItemData"
            placeholder="Escribe algo..."
          />
        </Grid>
        {/*  */}
      </InfoProspectStyled>
    </FormStyled>
  );
}

const LabelStyled = styled.label`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const ValueLabelStyled = styled.div`
  background-color: ${colors.primaryColor};
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
`;

const ErrorStyled = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const FormStyled = styled.form`
  width: 100%;
`;

const InfoProspectStyled = styled(Grid)`
  /* background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px; */

  label.item {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    display: block;
  }

  .point {
    height: 2px;
    background-color: ${colors.primaryColor};
    width: 30px;
    margin-bottom: 10px;
  }

  .inputItemData {
    background-color: #f9f9f9;
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 8px 10px;
    width: 100%;
    font-size: 14px;
  }

  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .select_data {
    width: 100%;
  }

  button {
    background-color: ${colors.primaryColor};
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      background-color: ${colors.primaryHover};
    }
  }
`;
