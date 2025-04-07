import React, { useEffect, useState } from "react";
import { AlertProviderStyle, EditOrderStyle } from "./styled";
import { Button, Grid, IconButton } from "@material-ui/core";
import { ArrowBack, Assignment, Cached, Visibility } from "@material-ui/icons";
import useEditOrder from "./hooks/useEditOrder";
import { Controller } from "react-hook-form";
import Select from "react-select";
import TableProducts from "./components/TableProducts";
import AddNewProduct from "./components/AddNewProduct";
import LoaderCompleteScreen from "../../components/LoaderCompleteScreen";
import InformationProvider from "./components/InformationProvider";
import DrawerSelectTemplate from "../../componentx/common/DrawerSelectTemplateOrder";
import { additionalOptions } from "./databd";
import LoaderData from "./components/LoaderData";
import DirectionsProviders from "./components/DirectionsProviders";
import FormAddBuyer from "../ComprasNuevaOrden/components/FormAddBuyer";
import AlertHandleProvider from "./components/AlertHandleProvider";
export default function EditPurchaseOrder() {
  const {
    taxinformations,
    providers,
    openAddProduct,
    provider,
    loaderOrder,
    handleOpenAddProduct,
    handleCloseAddProduct,
    handleEditProduct,
    handleValidateProvider,
    getCatalogBy,
    register,
    handleSubmit,
    control,
    isLoaderEdit,
    dataProvider,
    dataPDF,
    normalizeOrder,
    handleDeleteProductByIndex,
    toggleModalPdf,
    handleAddProduct,
    openPdf,
    handleRestoreProducts,
    router,
    supplicesData,
    selectedNational,
    handleClicPreview,
    handleAddBuyer,
    handleChangeType,
    selectedAddress,
    handleBlurProduct,
    openHandleProvider,
    handleValidateDataProvider,
    handleCloseProvider,
    directions,
    saveOrderAs,
    handleSelect,
  } = useEditOrder();

  return (
    <EditOrderStyle>
      <div className="content_neworder">
        <div className="content_neworder__header">
          <IconButton className="bt_back" onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
          <h3>Orden de Compra</h3>
        </div>

        {isLoaderEdit ? (
          <LoaderData />
        ) : (
          <div className="content_neworder__body">
            <FormAddBuyer
              handleAddBuyer={handleAddBuyer}
              getCatalogBy={getCatalogBy}
              taxinformations={taxinformations}
            />

            <div className="head">
              <Assignment className="iconEdit" />
              <p className="title">Datos Orden de Compra</p>
            </div>
            <form onSubmit={handleSubmit(normalizeOrder)}>
              <Grid className="form" container spacing={1}>
                <Grid className="item" xs={12} md={4} item>
                  <p className="title">
                    Condiciones de Pago <strong>*</strong>
                  </p>
                  <input
                    className="input_data"
                    placeholder="Ingresa Condicion de Pago"
                    {...register("payment_condition", {
                      required: "Requerido",
                    })}
                  />
                </Grid>
                <Grid className="item" xs={12} md={4} item>
                  <p className="title">
                    Teléfono <strong>*</strong>
                  </p>
                  <input
                    {...register("phone", {
                      required: true,
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
                    placeholder="Digíte número a 10 dígitos "
                    className="input_data"
                    type="number"
                  />
                </Grid>
                <Grid className="item" xs={12} md={4} item>
                  <p className="title">
                    Método de Entrega <strong>*</strong>
                  </p>
                  <input
                    className="input_data"
                    placeholder="Ingresa Metodo de entrega"
                    {...register("delivery", {
                      required: "Requerido",
                    })}
                  />
                </Grid>
                <Grid className="item" xs={12} md={4} item>
                  <p className="title">
                    Proveedor <strong>*</strong>
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
                        options={providers.results}
                        getOptionLabel={option => (option.companyname ? option.companyname : option?.name)}
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
                <Grid className="item" xs={12} md={4} item>
                  <p className="title">
                    Impuesto <strong>*</strong>
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
                <Grid className="item" xs={12} md={4} item>
                  <p className="title">
                    Tipo <strong>*</strong>
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
                        options={additionalOptions}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        onChange={option => {
                          field.onChange(option);
                          handleChangeType(option);
                        }}
                        value={field.value || null}
                      />
                    )}
                  />
                </Grid>
                <Grid className="item" xs={12} md={12} item>
                  <p className="title">Observaciones</p>
                  <input
                    placeholder="Ingresa Observaciones"
                    className="input_data"
                    {...register("observations", {
                      required: false,
                    })}
                  />
                </Grid>
                <Grid className="item" xs={12} md={12} item={true}>
                  <div className="divider"></div>
                </Grid>
                <Grid xs={12} md={12} item={true}>
                  <InformationProvider data={dataProvider} />
                </Grid>
                <Grid xs={12} md={12} item={true}>
                  <DirectionsProviders
                    selectedAddress={selectedAddress}
                    handleSelect={handleSelect}
                    directions={directions}
                  />
                </Grid>

                <Grid className="item Heads" md={12} item={true}>
                  <p className="titleProducts">Productos:({supplicesData?.results?.length})</p>
                  <Button
                    className="button_restore"
                    startIcon={<Cached />}
                    onClick={() => {
                      handleRestoreProducts();
                    }}
                  >
                    Restaurar Productos
                  </Button>
                </Grid>
                <Grid className="item products" md={12} item={true}>
                  <TableProducts
                    provider={provider}
                    products={supplicesData}
                    handleEditProduct={handleEditProduct}
                    handleOpenAddProduct={handleOpenAddProduct}
                    handleDeleteProduct={handleDeleteProductByIndex}
                    handleBlurProduct={handleBlurProduct}
                  />
                </Grid>

                <Grid className="buttons" md={12} item>
                  <Button onClick={() => router.back()} disabled={loaderOrder}>
                    {/* <Button className="bt_cancel" > */}
                    Cancelar
                  </Button>
                  <Button
                    className="bt_conclude"
                    type="submit"
                    disabled={loaderOrder}
                    onClick={handleSubmit(normalizeOrder("saveasdraft"))}

                    //  onClick={handleSubmit(validateEmail("saveAndShow"))}
                  >
                    Guardar y Concluir
                  </Button>
                  <Button className="bt_save" type="submit" disabled={loaderOrder}>
                    Guardar Cambios
                  </Button>
                  <Button className="bt_template" variant="contained" onClick={() => handleClicPreview()}>
                    <Visibility />

                    {selectedNational == "" ? "Ver Plantilla" : `Ver Plantilla ${selectedNational?.name}`}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
        <div className="content_neworder__footer"></div>
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

      <DrawerSelectTemplate
        templateSelected={selectedNational}
        data={dataPDF}
        open={openPdf}
        setMailupdate={dataPDF?.setMailupdate}
        emailUpdate={dataPDF?.mailupdate}
        closeDrawer={toggleModalPdf}
        totalIVA={dataPDF?.totalIVA}
      />
      {loaderOrder && <LoaderCompleteScreen />}
    </EditOrderStyle>
  );
}
