import React, { useEffect, useState } from "react";
import { FormStyles, Error } from "./styles";
import { Button, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { AttachFile } from "@material-ui/icons";
import Select from "react-select";
import dayjs from "dayjs";
import useAlertToast from "../../../../hooks/useAlertToast";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import RequestApiEntries from "../../../DirLogEntryNew/services";

export default function FormAddRoutes({ handleToggleFiles, dataSupplies }) {
  const { showAlertError, showAlertSucces } = useAlertToast();
  const router = useRouter();
  const request = new RequestApiEntries();
  const { id_user, userData, roleId } = useSelector(userSelector);
  const [dataSelects, setDataSelects] = useState({
    dataDrivers: [],
    datatransportUnit: [],
  });
console.log("FormAddRoutes dataSupplies:",dataSupplies);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const observationsValue = watch("observations");

  const handleFormatData = async () => {    
    try {
      const storedSupplies = localStorage.getItem("suppliesData");
      const parsedSupplies = storedSupplies ? JSON.parse(storedSupplies) : [];
      let products = dataSupplies?.results || [];
      let productsFormated = products.map((item) => {
        let matchingSupply = parsedSupplies.find(supply => 
          supply.code === item.code || supply.product === item.product );
        return {
          productId: matchingSupply?.productId,
          serialnumber: item.serialnumber,
          purchaseorderId: parsedSupplies[0]?.purchaseorderId,
          warehouseId: userData?.warehouse?.id,
          comments: "",
        };
      });
      let body = {
        deliverydate: dayjs(new Date()).format(""),
        observations: observationsValue || "",
        providerId: parsedSupplies[0]?.providerId,
        typesentriesId: "bVyigBXNTsB0IkHLZSpK8KrS",//orden de compra
        warehouseproducts: productsFormated,
        createdById: id_user,
        /*purchaseorderId: router?.query?.purchaseOrderId ?? parsedSupplies[0]?.purchaseorderId,
        folio: `ENTRADA-${dayjs().format("YYYY-MM-DD")}`,*/
      }
      console.log("data recoleccion:",body);
      let response = await request.postEntryManual(body);
      if (response.status == 201) {
        showAlertSucces("Se creo entrada correctamente");
          if (roleId === 'master_almacen') {
            router.push({ pathname: `/almacenesforaneos/entradas` });
          } else {
            router.push({ pathname: `/encargadoentradas/entradas` });
            }
      }
    } catch (error) {
      console.log("error de la funcion",error);    
      router.push("/encargadoentradas/entradas");
      showAlertError("Error al generar la entrada");
    }
  };

  return (
    <FormStyles>
      <div className="main">
        <div className="container">
          <form onSubmit={handleSubmit(handleFormatData)}>
            <div className="header">
              <div className="header__title">
                <h4>Generar Entrada</h4>
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
                  Generar Entrada
                </Button>
              </div>
            </div>

            <Grid container className="form">
              <Grid item xs={12} sm={6} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Cantidad de Productos <strong>*</strong>
                    </p>
                  </div>
                  <input
                    readOnly // Ahora es solo lectura, no está deshabilitado
                    value={dataSupplies?.results?.length || 0}
                    {...register("products", { required: true })}
                    placeholder="Cantidad de productos"
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Fecha de Entrada <strong>*</strong>
                    </p>
                  </div>
                  <input
                    type="date"
                    value={dayjs().format("YYYY-MM-DD")}
                    className="input"
                    onClick={e => e.target.showPicker()}
                    {...register("date", { required: true })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <div className="item">
                  <p>Observaciones</p>
                  <input
                    // readOnly
                    placeholder="Ingresa observaciones"
                    className="input"
                    {...register("observations")}
                  />
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </FormStyles>
  );
}
