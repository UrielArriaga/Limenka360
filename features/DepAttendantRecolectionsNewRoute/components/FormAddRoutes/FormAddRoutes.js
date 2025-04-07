import React, { useEffect, useState } from "react";
import { FormStyles, Error } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { ArrowBack, AttachFile } from "@material-ui/icons";
import Select from "react-select";
import dayjs from "dayjs";
import useAlertToast from "../../../../hooks/useAlertToast";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";

function FormAddRoutes({
  dataTransportunits,
  dataDrivers,
  dataPickUp,
  createRouteRecoleccion,
  purcharseOrdersToPickups,
  totalProducts = 1,
}) {
  const { showAlertError, showAlertSucces } = useAlertToast();
  const router = useRouter();
  const { userData } = useSelector(userSelector);
  const [dataSelects, setDataSelects] = useState({
    dataDrivers: [],
    datatransportUnit: [],
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getFomattedDataOnInputs();
  }, [dataPickUp, dataTransportunits, dataDrivers]);

  const getFomattedDataOnInputs = () => {
    setValue("folio", dataPickUp?.data?.folio || userData?.username + dayjs().format("HHmmss"));
    setValue("products", dataPickUp?.data?.quantity || 0);
    setValue("observations", dataPickUp?.data?.description);
    let arryDrivers = [];
    let arryTransport = [];
    dataDrivers?.data?.map(item => {
      if (item.label != null) arryDrivers.push(item);
    });
    dataTransportunits?.data?.map(item => {
      if (item.tuition != null) arryTransport.push(item);
    });
    setDataSelects({ ...dataSelects, dataDrivers: arryDrivers, datatransportUnit: arryTransport });
  };

  const handleFormatData = data => {
    let bodyForm = {
      folio: data?.folio,
      description: data?.observations,
      quantity: data?.prodcuts,
      status: "en ruta",
      driverId: data?.driver?.value,
      transportunitId: data?.trasportunit?.id,
      delivered: false,
      url: "",
      km_output: data?.km_output || 0,
      km_arrival: data?.km_arrival || 0,
    };

    let purchaseorders = purcharseOrdersToPickups?.map(item => item.id);
    bodyForm.purchaseorders = purchaseorders;
    createRouteRecoleccion(bodyForm);
  };
  return (
    <FormStyles>
      <div className="main">
        <div className="container">
          <form onSubmit={handleSubmit(handleFormatData)}>
            <div className="header">
              <div className="header__title">
                <h4>Nueva Recoleccion</h4>
              </div>

              <div className="actions">
                {/* <div
                  className="actions__item"
                  onClick={() => {
                    handleToggleFiles();
                  }}
                >
                  <AttachFile className="icon" />
                  <p className="text">Archivos Adjuntos</p>
                </div> */}
                <Button variant="contained" color="primary" type="submit">
                  Generar Recoleccion
                </Button>
              </div>
            </div>

            <Grid container className="form">
              <Grid item xs={12} sm={6} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Folio <strong>*</strong>
                    </p>
                  </div>
                  <input
                    placeholder="folio"
                    disabled
                    className="input"
                    {...register("folio", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Cantidad de Productos <strong>*</strong>
                    </p>
                  </div>
                  <input
                    disabled
                    {...register("products", {
                      required: "*Requerido",
                    })}
                    defaultValue={totalProducts}
                    placeholder="cantidad de productos"
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Kilometraje de salida <strong>{errors.km_output && errors.km_output?.message}</strong>
                    </p>
                  </div>
                  <input {...register("km_output")} placeholder="km de salida" className="input" type="number" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Kilometraje de llegada <strong>{errors.km_arrival && errors.km_arrival?.message}</strong>
                    </p>
                  </div>
                  <input {...register("km_arrival")} placeholder="km de llegada" className="input" type="number" />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <p>
                    {" "}
                    Unidad <span>{errors.trasportunit && errors.trasportunit?.message}</span>
                  </p>
                  <Controller
                    name="trasportunit"
                    control={control}
                    rules={{ required: " *Requerido" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onMenuOpen={() => dataTransportunits?.data}
                        loadingMessage={() => "Cargando Opciones..."}
                        options={dataSelects?.datatransportUnit}
                        isLoading={dataTransportunits?.isFetching}
                        className="selectAccess"
                        placeholder="Elige unidad"
                        getOptionValue={option => `${option.id}`}
                        getOptionLabel={option => `${option.tuition}`}
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <p>
                    {" "}
                    Chofer <span>{errors.driver && errors.driver?.message}</span>
                  </p>
                  <Controller
                    name="driver"
                    control={control}
                    rules={{ required: " *Requerido" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onMenuOpen={() => dataDrivers?.data}
                        loadingMessage={() => "Cargando Opciones..."}
                        options={dataSelects?.dataDrivers}
                        isLoading={dataDrivers?.isFetching}
                        className="selectAccess"
                        placeholder="Elige un chofer"
                        getOptionValue={option => `${option.value}`}
                        getOptionLabel={option => `${option.label}`}
                      />
                    )}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <div className="item">
                  <p>Observaciones</p>
                  <input disabled placeholder="Ingresa observaciones" className="input" {...register("observations")} />
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </FormStyles>
  );
}

export default FormAddRoutes;
