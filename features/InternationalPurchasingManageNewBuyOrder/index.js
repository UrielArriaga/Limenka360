import React from "react";
import { AlertProviderStyle, NewOrderStyle, selectStyle } from "./styles";
import { Button, Grid, IconButton, Input } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { ArrowBack, Assignment, CheckCircle, ErrorOutline, Room, Visibility } from "@material-ui/icons";
import useNewOrder from "./hooks/useNewOrder";
import { Controller } from "react-hook-form";
import Required from "./components/RequiredData";
import Select from "react-select";
import TableProducts from "./components/TableProducts";
import AddNewProduct from "./components/AddNewProduct";
import LoaderCompleteScreen from "../../components/LoaderCompleteScreen";
import DrawerSelectTemplate from "../../componentx/common/DrawerSelectTemplateOrder";
import FormAddBuyer from "./components/FormAddBuyer";
import DirectionsProviders from "./components/DirectionsProviders";
import LoaderSuggestions from "../../components/UI/atoms/LoaderSuggestions";
import ProviderData from "./components/ProviderData";
import { motion } from "framer-motion";
import CalendarPayments from "./components/CalendarPayments";
import useCreatePaymentsCalendar from "./hooks/useCreatePaymentsCalendar";
export default function NuevaOrden() {
  const {
    showCalendary,
    setShowCalendary,
    payments,
    paymentsPeriods,
    handleChangeQuantity,
    handleOnChangePeriod,
    period,
    handleOnChangeStatusPaymet,
    handleOnChangeAmount,
    handleOnChangeDate,
  } = useCreatePaymentsCalendar();
  const {
    //Opciones
    taxinformations,
    providers,
    products,
    openAddProduct,
    provider,
    openHandleProvider,
    loaderOrder,
    //functions
    handleOpenAddProduct,
    handleAddProduct,
    handleCloseAddProduct,
    handleDeleteProduct,
    handleEditProduct,
    handleBack,
    handleSaveOrder,
    handleValidateProvider,
    handleCloseProvider,
    handleValidateDataProvider,
    requestSavePushOrder,
    getCatalogBy,
    handlePruebas,
    //hooks
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    handleClicPreview,
    openPdf,
    setOpenPdf,
    template,
    handleAddBuyer,
    isNational,
    handleChangeType,
    selectedNational,
    address,
    setSelectedAddress,
    selectedAddress,
    deleveryMethod,
    payMethod,
    delivery,
    roleId,
  } = useNewOrder(payments);
  const filteredOptions = [
    { name: "Internacional", id: false },
    { name: "Nacional", id: true },
  ];

  return (
    <NewOrderStyle>
      <div className="content_neworder">
        <div className="content_neworder__header">
          <IconButton className="bt_back" onClick={() => handleBack()}>
            <ArrowBack />
          </IconButton>
          <p className="title_header">Nueva Orden</p>
        </div>
        <div className="content_neworder__body">
          <FormAddBuyer handleAddBuyer={handleAddBuyer} getCatalogBy={getCatalogBy} taxinformations={taxinformations} />
          <div className="subtitles">
            <Assignment className="icon" />
            <p className="titleDirection">Datos de la orden</p>
          </div>
          <Grid className="form" container spacing={1}>
            <Grid className="item" md={3} item>
              <p className="title">
                Método de Entrega <Required message={errors.delivery?.message} />
              </p>
              <Controller
                name="delivery"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select_data"
                    placeholder="Selecciona una Opción"
                    styles={selectStyle}
                    options={deleveryMethod}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    isLoading={false}
                    noOptionsMessage={() => "Sin Opciones"}
                    loadingMessage={() => "Cargando Opciones"}
                  />
                )}
              />
            </Grid>
            {delivery?.id == "proveedor envia" && (
              <Grid className="item" md={3} item>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
                  <p className="title">
                    Numero de Guía
                    <Required message={errors.guide_number?.message} />
                  </p>
                  <input
                    className="input_data"
                    placeholder="Ingresa Dato"
                    {...register("guide_number", {
                      required: "Requerido",
                    })}
                    disableUnderline
                  />
                </motion.div>
              </Grid>
            )}
            <Grid className="item" md={3} item>
              <p className="title">
                Condiciones de Pago
                <Required message={errors.payment_condition?.message} />
              </p>
              <Controller
                name="payment_condition"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select_data"
                    placeholder="Selecciona una Opción"
                    styles={selectStyle}
                    options={payMethod}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    isLoading={false}
                    noOptionsMessage={() => "Sin Opciones"}
                    loadingMessage={() => "Cargando Opciones"}
                    // onMenuOpen={() => getCatalogBy("providers")}
                    // onChange={e => handleValidateProvider(e)}
                  />
                )}
              />
            </Grid>
            <Grid className="item" md={3} item>
              <p className="title">
                Teléfono <Required message={errors.phone?.message} />
              </p>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => <NumberFormat {...field} className="input_data" placeholder="Ingresa un Dato" />}
              />
            </Grid>
            <Grid className="item" md={3} item>
              <p className="title">
                Proveedor <Required message={errors.provider?.message} />
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
                    onChange={e => handleValidateProvider(e)}
                  />
                )}
              />
            </Grid>
            <Grid className="item" md={3} item>
              <p className="title">
                Impuesto <Required message={errors.tax?.message} />
              </p>
              <Controller
                name="tax"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select_data"
                    placeholder="Selecciona una Opción"
                    styles={selectStyle}
                    options={taxinformations.results}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    isLoading={taxinformations.isFetching}
                    onMenuOpen={() => getCatalogBy("taxinformations")}
                    loadingMessage={() => "Cargando Opciones"}
                    noOptionsMessage={() => "Sin Opciones"}
                  />
                )}
              />
            </Grid>
            <Grid className="item" md={3} item>
              <p className="title">
                Tipo <Required message={errors.national?.message} />
              </p>
              <Controller
                name="national"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select_data"
                    placeholder="Selecciona una Opción"
                    styles={selectStyle}
                    options={filteredOptions}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    onChange={e => handleChangeType(e)}
                    noOptionsMessage={() => "Sin Opciones"}
                  />
                )}
              />
            </Grid>
            <Grid className="item" md={3} item>
              <p className="title">
                Fecha estimada de entrega
                <Required message={errors.estimateddeliverydate?.message} />
              </p>
              <input
                className="input_data"
                type="date"
                placeholder="Ingresa Dato"
                {...register("estimateddeliverydate", {
                  required: "Requerido",
                })}
                disableUnderline
              />
            </Grid>

            {provider && (
              <Grid className="item" md={12} item>
                <p className="title" style={{ display: "flex", alignItems: "center" }}>
                  <Room className="iconroom" />
                  <span style={{ fontSize: "16px", marginLeft: "1%" }}>Selecciona una dirección </span>
                  {selectedAddress == null ? (
                    <Required message={" Requerido"} />
                  ) : (
                    <CheckCircle style={{ color: "green" }} />
                  )}
                </p>
                {provider && <ProviderData dataProvider={provider} />}
                {address?.isFetching ? (
                  <LoaderSuggestions />
                ) : (
                  <DirectionsProviders
                    address={address}
                    setSelectedAddress={setSelectedAddress}
                    selectedAddress={selectedAddress}
                  />
                )}
              </Grid>
            )}
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

            <Grid item md={12}>
              <CalendarPayments
                showCalendary={showCalendary}
                setShowCalendary={setShowCalendary}
                payments={payments}
                paymentsPeriods={paymentsPeriods}
                handleChangeQuantity={handleChangeQuantity}
                handleOnChangePeriod={handleOnChangePeriod}
                period={period}
                handleOnChangeStatusPaymet={handleOnChangeStatusPaymet}
                handleOnChangeAmount={handleOnChangeAmount}
                handleOnChangeDate={handleOnChangeDate}
              />
            </Grid>

            <Grid className="item products" md={12} item>
              <input className="input_products" {...register("products")} readOnly />
              <div className="message">
                {errors.products && (
                  <>
                    <ErrorOutline />
                    <span>Valida los Campos de los productos, puede que algunos se encuentren vacíos</span>
                  </>
                )}
              </div>
              <TableProducts
                provider={provider}
                products={products}
                handleEditProduct={handleEditProduct}
                handleOpenAddProduct={handleOpenAddProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            </Grid>

            <Grid className="buttons" md={12} item>
              <Button className="bt_save" variant="contained" onClick={handleSubmit(handleSaveOrder)}>
                Guardar y Salir
              </Button>
              <Button className="bt_template" variant="contained" onClick={() => handleClicPreview()}>
                <Visibility />
                {selectedNational == "" ? "Ver Plantilla" : `Ver Plantilla ${selectedNational?.name}`}
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className="content_neworder__footer">
          <Grid container>
            <DrawerSelectTemplate
              templateSelected={selectedNational}
              data={template?.dataPreview}
              open={openPdf}
              setMailupdate={template?.setMailupdate}
              emailUpdate={template?.mailupdate}
              closeDrawer={() => setOpenPdf(!openPdf)}
              totalIVA={template?.totalIVA}
            />
          </Grid>
        </div>
      </div>
      <AlertHandleProvider
        open={openHandleProvider}
        close={handleCloseProvider}
        validate={handleValidateDataProvider}
      />
      <AddNewProduct
        provider={provider}
        addProduct={handleAddProduct}
        open={openAddProduct}
        close={handleCloseAddProduct}
      />
      {loaderOrder && <LoaderCompleteScreen />}
    </NewOrderStyle>
  );
}

const AlertHandleProvider = ({ open, close, validate }) => {
  return (
    <AlertProviderStyle open={open} onClose={close}>
      <div className="content_alert">
        <p className="title_alert">
          <ErrorOutline /> Al Cambiar de Proveedor, se eliminaran los productos agregados a la tabla. ¿Esta Seguro de
          Realizar esa Acción?
        </p>

        <div className="buttons">
          <Button className="bt cancel" onClick={() => validate(false)}>
            Cancelar
          </Button>
          <Button className="bt accept" onClick={() => validate(true)}>
            Aceptar
          </Button>
        </div>
      </div>
    </AlertProviderStyle>
  );
};
