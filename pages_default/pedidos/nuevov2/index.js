import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Assignment, AttachMoney, Delete, Edit, Settings } from "@material-ui/icons";
import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Backdrop,
  makeStyles,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { Error, PedidosStyled, TableProducts } from "../../../styles/Orders.styles";
import { EntitiesLocal } from "../../../BD/databd";
import { formatNumber, toUpperCaseChart } from "../../../utils";
import ModalExtraProductOrder from "../../../components/ModalExtraProductOrder";
import AddFiles from "../../../components/AddFiles";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import MainLayout from "../../../components/MainLayout";
import ModalExtraProductOrderDB from "../../../components/ModalExtraProductOrderBD";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useNewOrder from "../../../hooks/useNewOrder";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function NewOrders() {
  const { cfdi, paymentsacount, paymentmethod, paymentway, taxregime, shippingtype } = useSelector(commonSelector);
  const router = useRouter();
  const toastRef = useRef(null);
  const classes = useStyles();

  const {
    oportunidad,
    flagOportunity,
    existShipping,
    productsCotization,
    products,
    isEditingExtraProduct,
    totalShipping,
    filesToSave,
    openModalExtraProduct,
    isLoaderValidating,
    loaderBack,
    dataOrders,
    loadCities,
    citiesByEntityInvoice,
    citiesByEntity,
    cityInvoice,
    entityInvoice,
    city,
    entity,
    showAll,
    extraProductSelected,
    openModalAddFiles,
    setFlagOportunity,
    setIsEditingExtraProduct,
    setFilesToSave,
    setOpenModalExtraProduct,
    setDataOrders,
    setShowAll,
    setExtraProductSelected,
    setOpenModalAddFiles,
    handleDeleteLocalShipping,
    handleRenderButtonShipping,
    handleCheckEmptyStates,
    handleEntitieCityByPostals,
    handleSelectEntities,
    handleSelectCity,
    handleSelectEntitiesOrder,
    handleSelectCityOrder,
    getShippins,
    getCatalogBy,
    register,
    handleSubmit,
    control,
    errors,
  } = useNewOrder({
    oportunityId: router.query.o,
    prospectId: router.query.p,
  });

  return (
    <MainLayout>
      <PedidosStyled>
        <div className="main">
          <div className="head">
            <h1> Nuevo Pedido</h1>
          </div>
          <div className="main_orders">
            <div className="primarySales">
              <h1 className="title">Datos de la Venta.</h1>
              <AttachMoney className="icon_primary" />
            </div>
            <Grid container className="formSales">
              <Grid item xs={12} md={3}>
                <div className="items">
                  <p className="label">Concepto</p>
                  <p className="paragraph">{oportunidad?.concept}</p>
                </div>
              </Grid>

              <Grid item xs={12} md={3}>
                <div className="items">
                  <p className="label">Monto Total</p>
                  <p className="paragraph">{formatNumber(oportunidad?.amount)}</p>
                </div>
              </Grid>

              <Grid item xs={12} md={3}>
                <div className="items">
                  <p className="label">Comision Total</p>
                  <p className="paragraph">{formatNumber(oportunidad?.comission)}</p>
                </div>
              </Grid>

              <Grid item xs={12} md={3}>
                <div className="items" style={{ position: "relative" }}>
                  <p className="label">Envio</p>
                  <p className="paragraph">{formatNumber(oportunidad?.totalextracosts)}</p>
                </div>
              </Grid>
              {showAll && (
                <>
                  <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <div className="items">
                        <p className="label">Nombre cliente</p>
                        <p className="paragraph">
                          {toUpperCaseChart(oportunidad?.prospect?.name) +
                            " " +
                            toUpperCaseChart(oportunidad?.prospect?.lastname)}
                        </p>
                      </div>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <div className="items">
                        <p className="label">Observaciones de la venta</p>
                        <p className="paragraph">{oportunidad?.generalobservations}</p>
                      </div>
                    </motion.div>
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={12}>
                <p onClick={() => setShowAll(!showAll)} className="show">
                  {showAll ? " Ocultar datos" : "Ver mas"}
                </p>
              </Grid>
            </Grid>

            <form onSubmit={handleSubmit(handleCheckEmptyStates)}>
              <Grid container className="form">
                <Grid item xs={12}>
                  <div className="primary">
                    <h1 className="title">Datos de Pedido. </h1>
                    <Assignment className="icon_primary" />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Cuenta de Pago<strong>*</strong>
                      </p>

                      {errors.paymentAccount && errors.paymentAccount.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="paymentAccount"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          onMenuOpen={() => getCatalogBy("paymentsacount")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isLoading={paymentsacount.isFetching}
                          options={paymentsacount.results}
                          isClearable={true}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${option.name}`}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Observaciones Generales</p>
                    <input placeholder="Ingresa observaciones" className="input" {...register("observations")} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="primary">
                    <p className="title">Dirección de Envío. </p>
                    <Assignment className="icon_primary" />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Recibe <strong>*</strong>
                      </p>
                      {errors.receive && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.receive?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      className="input"
                      placeholder="Recibe"
                      {...register("receive", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Calle <strong>*</strong>
                      </p>
                      {errors.street && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.street?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      className="input"
                      placeholder="Calle"
                      {...register("street", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Número interior <strong>*</strong>
                      </p>
                      {errors.int_number && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.int_number?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      className="input"
                      placeholder="Número Exterior"
                      {...register("int_number", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Número exterior <strong>*</strong>
                      </p>
                      {errors.ext_number && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.ext_number?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      className="input"
                      placeholder="Número exterior"
                      {...register("ext_number", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Colonia <strong>*</strong>
                      </p>
                      {errors.cologne && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.cologne?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Colonia"
                      className="input"
                      {...register("cologne", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Codigo Postal <strong>*</strong>
                      </p>
                      {errors.postalcode && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.postalcode?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      type="number"
                      placeholder="Codigo Postal"
                      className="input"
                      {...register("postalcode", {
                        required: "*Requerido",
                        onChange: e => {
                          if (e.target.value.length === 5) {
                            handleEntitieCityByPostals(e.target.value, "");
                          }
                        },
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Estado <strong>*</strong>
                      </p>
                      {errors.entity && errors.entity.ref.value === "" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="entity"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona un Estado"
                          options={EntitiesLocal}
                          isClearable={false}
                          onChange={e => (e === null ? handleSelectEntities("") : handleSelectEntities(e.id))}
                          value={EntitiesLocal.filter(item => item.id === entity)}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Municipio <strong>*</strong>
                      </p>
                      {errors.city && errors.city.ref.value === "" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona un Municipio"
                          options={citiesByEntity !== null ? citiesByEntity : []}
                          isClearable={false}
                          isLoading={loadCities}
                          onChange={e => (e === null ? handleSelectCity("") : handleSelectCity(e))}
                          value={citiesByEntity?.filter(item => item.id === city.id)}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Telefono <strong>*</strong>
                      </p>
                      {errors.phone && (
                        <>
                          <div className="point"></div> <Error>{errors.phone?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Telefono"
                      className="input"
                      {...register("phone", {
                        required: "*Requerido",

                        maxLength: {
                          value: 10,
                          message: "*10 Caracteres",
                        },
                        minLength: {
                          value: 10,
                          message: "*10 Caracteres",
                        },
                        pattern: {
                          value: /[0-9]+/i,
                          message: "*Caracter Invalido",
                        },
                      })}
                      type="number"
                    ></input>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Tipo de Envio<strong>*</strong>
                      </p>

                      {errors.shippingtype && errors.shippingtype.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="shippingtype"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          onMenuOpen={() => getShippins()}
                          loadingMessage={() => "Cargando Opciones..."}
                          isLoading={shippingtype.isFetching}
                          options={shippingtype.results}
                          isClearable={true}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${option.name}`}
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={8}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Referencias <strong>*</strong>
                      </p>
                      {errors.references && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.references?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Referencias"
                      className="input"
                      {...register("references", {
                        required: "*Requerido",
                      })}
                    ></input>
                  </div>
                </Grid>
                <Grid className="titleDiv" item xs={12}>
                  <div className="primary">
                    {/* <Assignment className="icon_primary" /> */}
                    <h1 className="title">Agregar Facturación </h1>
                    <FormControlLabel
                      className="item"
                      control={
                        <Switch
                          checked={dataOrders}
                          onChange={e => {
                            setDataOrders(e.target.checked);
                          }}
                          name="checkedA"
                          color="primary"
                        />
                      }
                    />
                  </div>
                </Grid>
                {dataOrders == true && (
                  <>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Razón Social <strong>*</strong>
                            </p>
                            {errors.businessName && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.businessName?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            placeholder="Razón Social"
                            className="input"
                            {...register("businessName", {
                              required: "*Requerido",
                            })}
                          ></input>
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              RFC <strong>*</strong>
                            </p>
                            {errors.rfc && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.rfc?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            placeholder="RFC"
                            className="input"
                            {...register("rfc", {
                              pattern: {
                                value:
                                  /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                                message: "*RFC Incorrecto",
                              },
                              required: "*Requerido",
                            })}
                          ></input>
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Uso de CFDI<strong>*</strong>
                            </p>

                            {errors.cfdi && errors.cfdi.type === "required" && (
                              <>
                                <div className="point"></div> <Error>{"*Requerido"}</Error>
                              </>
                            )}
                          </div>

                          <Controller
                            name="cfdi"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="select-options"
                                placeholder="Selecciona una Opción"
                                onMenuOpen={() => getCatalogBy("cfdis")}
                                loadingMessage={() => "Cargando Opciones..."}
                                isLoading={cfdi.isFetching}
                                options={cfdi.results}
                                isClearable={true}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${option.name}`}
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
                              Metodo de Pago<strong>*</strong>
                            </p>

                            {errors.paymentMethod && errors.paymentMethod.type === "required" && (
                              <>
                                <div className="point"></div> <Error>{"*Requerido"}</Error>
                              </>
                            )}
                          </div>

                          <Controller
                            name="paymentMethod"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="select-options"
                                placeholder="Selecciona una Opción"
                                onMenuOpen={() => getCatalogBy("paymentmethods")}
                                loadingMessage={() => "Cargando Opciones..."}
                                isLoading={paymentmethod.isFetching}
                                options={paymentmethod.results}
                                isClearable={true}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${option.name}`}
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
                              Forma de Pago<strong>*</strong>
                            </p>

                            {errors.waytoPay && errors.waytoPay.type === "required" && (
                              <>
                                <div className="point"></div> <Error>{"*Requerido"}</Error>
                              </>
                            )}
                          </div>
                          <Controller
                            name="waytoPay"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="select-options"
                                placeholder="Selecciona una Opción"
                                isLoading={paymentway.isFetching}
                                onMenuOpen={() => getCatalogBy("paymentways")}
                                loadingMessage={() => "Cargando Opciones..."}
                                options={paymentway.results}
                                isClearable={true}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${option.name}`}
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
                              Regimen Fiscal<strong>*</strong>
                            </p>

                            {errors.taxregime && errors.taxregime.type === "required" && (
                              <>
                                <div className="point"></div> <Error>{"*Requerido"}</Error>
                              </>
                            )}
                          </div>
                          <Controller
                            name="taxregime"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="select-options"
                                placeholder="Selecciona una Opción"
                                isLoading={taxregime.isFetching}
                                onMenuOpen={() => getCatalogBy("taxregimes")}
                                options={taxregime?.results}
                                loadingMessage={() => "Cargando Opciones..."}
                                isClearable={true}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${option.name}`}
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
                              Telefono<strong>*</strong>
                            </p>
                            {errors.phoneInvoice && (
                              <>
                                <div className="point"></div> <Error>{errors.phoneInvoice?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            {...register("phoneInvoice", {
                              required: "*Requerido",
                              maxLength: {
                                value: 10,
                                message: "*10 Caracteres",
                              },
                              minLength: {
                                value: 10,
                                message: "*10 Caracteres",
                              },
                              pattern: {
                                value: /[0-9]+/i,
                                message: "*Caracter Invalido",
                              },
                            })}
                            placeholder="Digíte número a 10 dígitos"
                            className="input"
                            type="number"
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Calle <strong>*</strong>
                            </p>
                            {errors.streetInvoice && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.streetInvoice?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            className="input"
                            placeholder="Calle"
                            {...register("streetInvoice", {
                              required: "*Requerido",
                            })}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Número interior <strong>*</strong>
                            </p>
                            {errors.int_numberInvoice && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.int_numberInvoice?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            className="input"
                            placeholder="Número Exterior"
                            {...register("int_numberInvoice", {
                              required: "*Requerido",
                            })}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Número exterior <strong>*</strong>
                            </p>
                            {errors.ext_numberInvoice && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.ext_numberInvoice?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            className="input"
                            placeholder="Número exterior"
                            {...register("ext_numberInvoice", {
                              required: "*Requerido",
                            })}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Colonia <strong>*</strong>
                            </p>
                            {errors.cologneInvoice && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.cologneInvoice?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            placeholder="Colonia"
                            className="input"
                            {...register("cologneInvoice", { required: "*Requerido" })}
                          />
                        </div>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Código Postal <strong>*</strong>
                            </p>
                            {errors.postalCodeInvoice && (
                              <>
                                <div className="point"></div>
                                <Error> {errors.postalCodeInvoice?.message}</Error>
                              </>
                            )}
                          </div>
                          <input
                            type="number"
                            placeholder="Codigo Postal"
                            className="input"
                            {...register("postalCodeInvoice", {
                              required: "*Requerido",
                              onChange: e => {
                                if (e.target.value.length === 5) {
                                  handleEntitieCityByPostals(e.target.value, "postal order");
                                }
                              },
                            })}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="item">
                          <div className="ContentTitleandAlert">
                            <p>
                              Estado <strong>*</strong>
                            </p>
                            {errors.entityOrder && errors.entityOrder.ref.value === "" && (
                              <>
                                <div className="point"></div> <Error>{"*Requerido"}</Error>
                              </>
                            )}
                          </div>
                          <Controller
                            name="entityOrder"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="select-options-fixed"
                                placeholder="Selecciona un Estado"
                                options={EntitiesLocal}
                                isClearable={false}
                                onChange={e =>
                                  e === null ? handleSelectEntitiesOrder("") : handleSelectEntitiesOrder(e.id)
                                }
                                value={EntitiesLocal.filter(item => item.id === entityInvoice)}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
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
                              Municipio <strong>*</strong>
                            </p>
                            {errors.cityOrder && errors.cityOrder.ref.value === "" && (
                              <>
                                <div className="point"></div> <Error>{"*Requerido"}</Error>
                              </>
                            )}
                          </div>
                          <Controller
                            name="cityOrder"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="select-options-fixed"
                                placeholder="Selecciona un Municipio"
                                options={citiesByEntityInvoice !== null ? citiesByEntityInvoice : []}
                                isClearable={false}
                                isLoading={loadCities}
                                onChange={e => (e === null ? handleSelectCityOrder("") : handleSelectCityOrder(e))}
                                value={citiesByEntityInvoice?.filter(item => item.id === cityInvoice.id)}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                              />
                            )}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <div className="primary">
                    <h1 className="title">Archivos</h1>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <AddFiles
                      setOpen={setOpenModalAddFiles}
                      open={openModalAddFiles}
                      filesToSave={filesToSave}
                      setFilesToSave={setFilesToSave}
                    />
                  </motion.div>
                </Grid>
                <Box component="span" m={2}></Box>
                <Grid className="titleDiv" item xs={12}>
                  <div className="primary">
                    <p>Productos</p>
                  </div>
                </Grid>
                <Box component="span" m={1}></Box>
                <Grid item xs={12} sm={12} md={12}>
                  <TableProducts>
                    <table className="ctr_table">
                      <thead className="ctr_table__head">
                        <tr className="ctr_table__head__tr">
                          <th className="title fixed">
                            <div className="ctr_title">
                              <p>Producto</p>
                            </div>
                          </th>
                          <th className="title">
                            <div className="ctr_title">
                              <p>Codigo</p>
                            </div>
                          </th>
                          <th className="title">
                            <div className="ctr_title">
                              <p>Cantidad</p>
                            </div>
                          </th>
                          <th className="title">
                            <div className="ctr_title">
                              <p>Precio Unitario</p>
                            </div>
                          </th>
                          <th className="title">
                            <div className="ctr_title">
                              <p>Descuento</p>
                            </div>
                          </th>
                          <th className="title">
                            <div className="ctr_title">
                              <p>Monto Total</p>
                            </div>
                          </th>
                          <th className="title fixedlast">
                            <div className="ctr_title">
                              <Settings />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ctr_table__body">
                        {productsCotization.map((item, index) => (
                          <tr className={index % 2 == 0 ? "row" : "inpar row"} key={index}>
                            <td className="data fixed">
                              <p className="ctr_td">{item.product?.name}</p>
                            </td>
                            <td className="data">
                              <p className="text">{item.product?.code}</p>
                            </td>
                            <td className="data">
                              <p className="text">{item.quantity}</p>
                            </td>
                            <td className="data">
                              $
                              <NumberFormat
                                value={item.newprice === 0 ? item.product?.callamount : item?.newprice}
                                displayType="text"
                                thousandSeparator={true}
                              />
                            </td>
                            <td className="data">
                              $<NumberFormat value={0} displayType="text" thousandSeparator={true} />
                            </td>
                            <td className="data">
                              $
                              <NumberFormat
                                // value={item.newprice === 0 ? item.product?.callamount * item.quantity : item?.newprice * item.quantity}
                                value={item.total}
                                displayType="text"
                                thousandSeparator={true}
                              />
                            </td>
                            <td className="data">
                              {item.product.code === "ENVIO-UA" && (
                                <IconButton
                                  onClick={() => {
                                    setIsEditingExtraProduct(true);
                                    setExtraProductSelected(item);
                                    setOpenModalExtraProduct(true);
                                  }}
                                >
                                  <Edit className="icon_item" />
                                </IconButton>
                              )}
                            </td>
                          </tr>
                        ))}

                        {products.map((item, index) => {
                          return (
                            <tr className={index % 2 == 0 ? "row" : "inpar row"} key={index}>
                              <td className="data fixed">
                                <p className="ctr_td">{item.name}</p>
                              </td>
                              <td className="data">
                                <p className="text">{item.code}</p>
                              </td>

                              <td className="data">
                                <p className="text">{item.quantity}</p>
                              </td>

                              <td className="data">
                                $
                                <NumberFormat value={item.callamount} displayType="text" thousandSeparator={true} />
                              </td>

                              {/* <td className="data">
                                <p className="text">{item.total}</p>
                              </td> */}

                              <td className="data">
                                $
                                <NumberFormat value={item.discount} displayType="text" thousandSeparator={true} />
                              </td>

                              <td className="data">
                                $
                                <NumberFormat value={item.total} displayType="text" thousandSeparator={true} />
                              </td>

                              <td>
                                <Box flexDirection={"row"} display={"flex"}>
                                  <IconButton
                                    onClick={() => {
                                      setIsEditingExtraProduct(true);
                                      setExtraProductSelected(item);
                                      setOpenModalExtraProduct(true);
                                    }}
                                  >
                                    <Edit />
                                  </IconButton>

                                  <IconButton onClick={() => handleDeleteLocalShipping(item)}>
                                    <Delete />
                                  </IconButton>
                                </Box>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="totalcontainer">
                      <div className="totalcontainer__items">
                        <div className="totalcontainer__item">
                          <div className="text bold">
                            <p>Total</p>
                          </div>
                          <div className="value bold">
                            <p>{formatNumber(oportunidad?.amount + totalShipping)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableProducts>
                </Grid>
                <Grid item sm={12} className="actions">
                  {handleRenderButtonShipping()}
                  <Button
                    disabled={isLoaderValidating}
                    variant="outlined"
                    color="primary"
                    className="btn_salir"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button disabled={isLoaderValidating} variant="contained" className="btn_generate" type="submit">
                    <Assignment />
                    <p>Guardar</p>
                  </Button>
                </Grid>
              </Grid>
            </form>
            <ToastContainer ref={toastRef} />
          </div>
          <Backdrop className={classes.backdrop} open={loaderBack}>
            {alert?.show && (
              <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
            )}
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>

        {!existShipping && (
          <ModalExtraProductOrder
            itemSelected={extraProductSelected}
            setItemSelected={setExtraProductSelected}
            isEditing={isEditingExtraProduct}
            setIsEditing={setIsEditingExtraProduct}
            setOpen={setOpenModalExtraProduct}
            open={openModalExtraProduct}
            existShipping={existShipping}
          />
        )}

        {existShipping && (
          <ModalExtraProductOrderDB
            itemSelected={extraProductSelected}
            setItemSelected={setExtraProductSelected}
            isEditing={isEditingExtraProduct}
            setIsEditing={setIsEditingExtraProduct}
            setOpen={setOpenModalExtraProduct}
            open={openModalExtraProduct}
            existShipping={existShipping}
            oportunity={oportunidad}
            flagOportunity={flagOportunity}
            setFlagOportunity={setFlagOportunity}
          />
        )}
      </PedidosStyled>
    </MainLayout>
  );
}
