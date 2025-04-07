import React, { useEffect, useState } from "react";
import { FormStyles, Error } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { ArrowBack, AttachFile } from "@material-ui/icons";
import Select from "react-select";
import dayjs from "dayjs";
import useAlertToast from "../../../../hooks/useAlertToast";

function FormAddRoutes({
  handleToggleFiles,
  dataTransportunits,
  dataDrivers,
  order,
  CreateRoute,
  ordersToAdd,
  handleOpenDrawer,
  setDriverSelect,
}) {
  const { showAlertError, showAlertSucces } = useAlertToast();
  const router = useRouter();
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
  }, [order, dataTransportunits, dataDrivers]);

  const getFomattedDataOnInputs = () => {
    setValue("folio", order?.data?.folio);
    setValue("prodcuts", order?.data?.oportunity?.quantity);
    setValue("observations", order?.data?.observations);
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
    try {
      let bodyForm = {
        assigned_date: dayjs(new Date()).format(""),
        comment: data?.comment,
        driverId: data?.driver?.value,
        transportunitId: data?.trasportunit?.id,
        km_output: data?.km_output || "",
        km_arrival: data?.km_arrival || "",
        alias: data?.alias
      };
      let inventorytoaddroute = ordersToAdd.map(item => ({
        id: item.id,
      }));
      // console.log(bodyForm);

      // showAlertSucces("Ruta creada correctamente");

      handleOpenDrawer(null, null, { bodyForm, inventorytoaddroute });
      setDriverSelect(data);
      // router.push("/encargadosalidas/rutas");
    } catch (error) {
      showAlertError("Error al crear la ruta");
    }
    // CreateRoute(bodyForm);
  };
  return (
    <FormStyles>
      <div className="main">
        <div className="container">
          <form onSubmit={handleSubmit(handleFormatData)}>
            <div className="header">
              <div className="header__title">
                <h4>Nueva Ruta</h4>
              </div>

              <div className="actions">
                <div
                  className="actions__item"
                  onClick={() => {
                    handleToggleFiles();
                  }}
                >
                  <AttachFile className="icon" />
                  <p className="text">Archivos Adjuntos</p>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // onClick={async () => {
                  //   return;
                  //   console.log("Generar documentos");

                  //   console.log(ordersToAdd);

                  //   try {
                  //     let products = [
                  //       {
                  //         quantity: 1,
                  //         name: "test",
                  //         amount: 50,
                  //         callamount: 10,
                  //       },
                  //     ];

                  //     let templateHtml = templateCartPort({
                  //       folio: "test",
                  //       products,
                  //     });

                  //     navigator.clipboard.writeText(templateHtml);

                  //     // let resp = await api.
                  //   } catch (error) {
                  //     console.log(error);
                  //   }
                  // }}
                >
                  Generar Ruta
                </Button>
              </div>
            </div>

            <Grid container className="form">
            <Grid item xs={12} sm={6} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Nombre de la ruta <strong>*</strong>
                    </p>
                  </div>
                  <input
                    placeholder="Ejemplo Ruta Gerrero - Oxaca"
                    className="input"
                    {...register("alias", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>
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
                    {...register("prodcuts", {
                      required: "*Requerido",
                    })}
                    placeholder="cantidad de productos"
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Kilometros Salida</p>
                  </div>
                  <input
                    {...register("km_output")}
                    placeholder="Ingresa Kilometros Salida"
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Kilometros Llegada</p>
                  </div>
                  <input
                    {...register("km_arrival")}
                    placeholder="Ingresa Kilometros Llegada"
                    className="input"
                    type="number"
                  />
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
                        getOptionLabel={(option) => `${option.model} (${option.tuition})`}
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
                  <input  placeholder="Ingresa observaciones" className="input" {...register("comment")} />
                </div>
              </Grid>

              {/* <Grid item xs={12} className="actions">
                <Button variant="contained" className="btnGuardar" type="submit">
                  Guardar
                </Button>
              </Grid> */}
            </Grid>
          </form>
        </div>
      </div>
    </FormStyles>
  );
}

export default FormAddRoutes;
