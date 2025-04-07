import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import Select from "react-select";
import { Grid } from "@material-ui/core";
import { selectStyle } from "../../styles";
import dayjs from "dayjs";

function FormDataProduct({ setProvider, setObservations, setFolio, setTipeEntry }) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      folio: `SALIDA-${dayjs().format("YYYYMMDD")}`,
    },
  });
  const provider = watch("provider");
  const observations = watch("observations");
  const folio = watch("folio");
  const typesentry = watch("typesentries");

  useEffect(() => {
    setProvider(provider);
    setObservations(observations);
    setFolio(folio);
    setTipeEntry(typesentry);
  }, [provider, observations, typesentry]);

  const { getCatalogBy } = useGlobalCommons();
  const { providers, typesentries } = useSelector(commonSelector);
  return (
    <div className="content_neworder">
      <div className="content_neworder__body">
        <Grid className="form" container spacing={1}>
          <Grid className="item" md={12} item>
            <p className="title">Folio</p>
            <input
              className="input_data"
              type="text"
              placeholder="Ingresa el folio"
              {...register("folio", {
                required: "Requerido",
              })}
              disableUnderline
            />
          </Grid>
          {/* <Grid className="item" md={4} item>
            <p className="title">
              Proveedor
            </p>
            <Controller
              name="provider"
              control={control}
              rules={{ required: "Requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="select_data"
                  placeholder="Selecciona una Opción"
                  styles={selectStyle}
                  options={providers.results}
                  getOptionLabel={option => (option.companyname ? option.companyname : option.name)}
                  getOptionValue={option => option.id}
                  isLoading={providers.isFetching}
                  noOptionsMessage={() => "Sin Opciones"}
                  onMenuOpen={() => getCatalogBy("providers")}
                  loadingMessage={() => "Cargando Opciones"}
                />
              )}
            />
          </Grid> */}
          {/* <Grid className="item" md={6} item>
            <p className="title">Tipo de Entrada</p>
            <Controller
              name="typesentries"
              control={control}
              rules={{ required: "Requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="select_data"
                  placeholder="Selecciona una Opción"
                  styles={selectStyle}
                  options={typesentries.results}
                  getOptionLabel={option => option.typesentry}
                  getOptionValue={option => option.id}
                  isLoading={typesentries.isFetching}
                  noOptionsMessage={() => "Sin Opciones"}
                  onMenuOpen={() => getCatalogBy("typesentries")}
                  loadingMessage={() => "Cargando Opciones"}
                />
              )}
            />
          </Grid> */}
          <Grid className="item" md={12} item>
            <p className="title">Observaciones</p>

            <textarea
              className="input_observations"
              placeholder="Ingresa un Dato"
              {...register("observations", {
                required: false,
              })}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default FormDataProduct;
