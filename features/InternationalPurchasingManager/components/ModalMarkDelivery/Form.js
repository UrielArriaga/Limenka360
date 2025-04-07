import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";

export default function Form({ register, control, setValue }) {
  const { getCatalogBy } = useGlobalCommons();

  const { userData } = useSelector(userSelector);
  const { providers } = useSelector(commonSelector);
  const [showDataBill, setShowDataBill] = useState(false);

  useEffect(() => {
    const getCountOrders = async () => {
      try {
        let params = {
          count: 1,
          limit: 0,
          where: JSON.stringify({
            createdbyId: userData.id,
          }),
        };
        let resp = await api.get(`/purchaseorders`, {
          params,
        });
        let count = resp.data.count;

        setValue("folio", `${userData?.username}-${count + 1}`);
      } catch (error) {
        console.log(error);
      }
    };

    getCountOrders();
  }, []);
  return (
    <FormStyled>
      <Grid container spacing={2}>
        {/* <Grid item xs={6}>
          <div className="inputContainer">
            <p className="label">Alias</p>
            <input
              placeholder=""
              {...register("alias", {
                required: "Este campo es requerido",
              })}
            />
          </div>
        </Grid> */}

        <Grid item xs={12}>
          <div className="inputContainer">
            <p className="label">Folio</p>
            <input
              placeholder=""
              {...register("folio", {
                required: "Este campo es requerido",
              })}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="inputContainer">
            <p className="label">Proveedor</p>

            <Controller
              name="providerId"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onMenuOpen={() => getCatalogBy("providers")}
                  loadingMessage={() => "Cargando Opciones..."}
                  options={providers.results}
                  isLoading={providers.isFetching}
                  className="selectAccess"
                  placeholder="Elige Proveedor"
                  getOptionValue={option => `${option.id}`}
                  getOptionLabel={option => `${option.companyname}`}
                />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          {/* <div className="inputContainer_switch">
            <input
              className="chek"
              type="checkbox"
              // name={field.name}
              {...register("relation")}
            />
            <b>Relacionar orden de compra con pedido</b>
          </div> */}
        </Grid>
      </Grid>
    </FormStyled>
  );
}

const FormStyled = styled.div`
  .inputContainer {
    /* margin-bottom: 10px; */
  }

  .label {
    margin-bottom: 5px;
    font-size: 12px;
  }
  .inputContainer_switch {
    width: 100%;
    align-items: center;
    display: flex;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .chek {
    align-items: center;
    width: 5%;
    margin: 0px;
  }
`;
