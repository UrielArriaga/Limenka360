import { Grid } from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import React, { useEffect } from "react";
import { ContainerNew, Error } from "./styles";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { motion } from "framer-motion";
function FormAddBuyer(props) {
  const { userData } = useSelector(userSelector);
  const { handleAddBuyer, getCatalogBy, taxinformations } = props;
  const nameInputs = ["name", "contact", "email", "phone"];
  const {
    setValue,
    control,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!userData) {
      return;
    }
    setValue("name", userData?.groupName);
    setValue("contact", userData?.name);
    setValue("email", userData?.email);
    setValue("phone", userData?.phone);
    let data = formatData();
    let loadState = true;
    handleAddBuyer(data, loadState);
  }, [userData]);

  const formatData = () => {
    let obj = {};
    nameInputs.map((item, index) => {
      if (nameInputs[index] == "name") {
        obj.name = userData?.groupName;
      } else if (nameInputs[index] == "contact") {
        obj.contact = userData?.name;
      } else {
        obj[nameInputs[index]] = userData[nameInputs[index]];
      }
    });
    return obj;
  };

  const handleChangeTaxBuyer = e => {
    let event = {};
    if (e) {
      event.target = {
        name: "tax",
        value: e.name,
      };
      handleChangeInputBuyer(event);
    }
  };

  const handleChangeInputBuyer = e => {
    let { name, value } = e.target;
    let obj = {
      [name]: value,
    };
    handleAddBuyer(obj);
  };

  return (
    <ContainerNew>
      <div className="main">
        <div className="ctr_provider">
          <form onChange={e => handleChangeInputBuyer(e)}>
            <Grid container className="form">
              <Grid item xs={12} sm={12} md={12}>
                <div className="subtitles">
                  <Assignment className="icon" />
                  <p className="titleDirection">Datos del Comprador</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Nombre <strong>*</strong>
                      </p>

                      {errors.name && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.name?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Nombre del comprador"
                      className="input"
                      {...register("name", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Impuesto <strong>*</strong>
                      </p>
                      {errors.tax && (
                        <>
                          <div className="point"></div> <Error>{errors.tax?.message}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="tax"
                      control={control}
                      rules={{ required: "Requerido" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select_data"
                          placeholder="Selecciona una Opción"
                          styles={selectStyles}
                          options={taxinformations.results}
                          getOptionLabel={option => option.name}
                          getOptionValue={option => option.id}
                          isLoading={taxinformations.isFetching}
                          onChange={e => handleChangeTaxBuyer(e)}
                          onMenuOpen={() => getCatalogBy("taxinformations")}
                          loadingMessage={() => "Cargando Opciones"}
                          noOptionsMessage={() => "Sin Opciones"}
                        />
                      )}
                    />
                  </div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Contacto <strong>*</strong>
                      </p>

                      {errors.contact && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.contact?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Contacto"
                      className="input"
                      {...register("contact", { required: "*Requerido" })}
                    />
                  </div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Correo <strong>*</strong>
                      </p>
                      {errors.email && (
                        <>
                          <div className="point"></div> <Error>{errors.email?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="ejemplo@gmail.com "
                      {...register("email", {
                        required: "*Requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                          message: "*Correo Invalido",
                        },
                      })}
                      className="input"
                    />
                  </div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Teléfono <strong>*</strong>
                      </p>
                      {errors.phone && (
                        <>
                          <div className="point"></div> <Error>{errors.phone?.message}</Error>
                        </>
                      )}
                    </div>

                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Requerido",
                        maxLength: {
                          value: 10,
                          message: "*10 Caracteres",
                        },
                        minLength: {
                          value: 10,
                          message: "*10 Caracteres",
                        },
                        pattern: {
                          value: /^\d*$/.test(),
                          message: "*Caracter Invalido",
                        },
                      }}
                      render={({ field }) => (
                        <NumberFormat {...field} className="input" placeholder="Digíte número a 10 dígitos" />
                      )}
                    />
                  </div>
                </motion.div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </ContainerNew>
  );
}

export default FormAddBuyer;

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    height: 36,
    minHeight: 36,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
};
