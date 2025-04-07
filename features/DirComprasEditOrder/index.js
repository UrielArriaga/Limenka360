import React, { useEffect, useState } from "react";
import { EditOrderStyle } from "./styled";
import { Button, Grid, IconButton } from "@material-ui/core";
import { ArrowBack, Assignment, Cached, Visibility } from "@material-ui/icons";
import useEditOrder from "./hooks/useEditOrder";
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
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import OrderFormShippings from "./components/OrderForm";
import CalendarPayments from "./components/CalendarPayments";
export default function DirComprasEditOrder() {
  const {
    taxinformations,
    providers,
    openAddProduct,
    provider,
    loaderSave,
    togglehandleAddProduct,
    handleEditProduct,
    handleValidateProvider,
    getCatalogBy,
    register,
    handleSubmit,
    control,
    isLoadingOrder,
    dataProvider,
    template,
    normalizeOrder,
    handleDeleteProductByIndex,
    toggleModalPdf,
    handleAddProduct,
    openPdf,
    router,
    products,
    selectedNational,
    handleClicPreview,
    handleAddBuyer,
    handleChangeType,
    selectedAddress,
    handleBlurProduct,
    openHandleProvider,
    handleValidateDataProvider,
    togglehandleProvider,
    directions,
    handleSelect,
    handleSaveAndComplete,
    handleSaveChanges,
    payMethod,
    deleveryMethod,
    isGuideNumberEnabled,
    setIsGuideNumberEnabled,
    roleId,
    setDataPaymentsPurchase
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

        {isLoadingOrder ? (
          <LoaderData />
        ) : (
          <div className="content_neworder__body">
            <FormAddBuyer
              handleAddBuyer={handleAddBuyer}
              getCatalogBy={getCatalogBy}
              taxinformations={taxinformations}
            />

            <Grid className="form" container spacing={1}>
              <OrderFormShippings
                control={control}
                register={register}
                providers={providers}
                taxinformations={taxinformations}
                deleveryMethod={deleveryMethod}
                payMethod={payMethod}
                setIsGuideNumberEnabled={setIsGuideNumberEnabled}
                isGuideNumberEnabled={isGuideNumberEnabled}
                handleChangeType={handleChangeType}
                getCatalogBy={getCatalogBy}
                handleValidateProvider={handleValidateProvider}
                roleId={roleId}
              />
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

              <Grid className="" md={12} item>
                <CalendarPayments setDataPaymentsPurchase={setDataPaymentsPurchase} products={products}/>
              </Grid>

              <Grid className="item products" md={12} item={true}>
                <TableProducts
                  provider={provider}
                  products={products}
                  handleEditProduct={handleEditProduct}
                  handleOpenAddProduct={togglehandleAddProduct}
                  handleDeleteProduct={handleDeleteProductByIndex}
                  handleBlurProduct={handleBlurProduct}
                />
              </Grid>

              <Grid className="buttons" md={12} item>
                <Button className="bt_cancel" onClick={() => router.back()} disabled={loaderSave}>
                  Cancelar
                </Button>
                <Button type="button" className="bt_save" onClick={handleSubmit(handleSaveAndComplete)}>
                  Guardar y Concluir
                </Button>
                <Button
                  className="bt_save"
                  type="submit"
                  disabled={loaderSave}
                  onClick={handleSubmit(handleSaveChanges)}
                >
                  Guardar Cambios
                </Button>
                <Button className="bt_template" variant="contained" onClick={() => handleClicPreview()}>
                  <Visibility />
                  {selectedNational == "" ? "Ver Plantilla" : `Ver Plantilla ${selectedNational?.name}`}
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
        <div className="content_neworder__footer"></div>
      </div>
      <AlertHandleProvider
        open={openHandleProvider}
        close={togglehandleProvider}
        validate={handleValidateDataProvider}
      />
      <AddNewProduct
        provider={provider}
        addProduct={handleAddProduct}
        open={openAddProduct}
        close={togglehandleAddProduct}
      />
      <DrawerSelectTemplate
        templateSelected={selectedNational}
        data={template?.dataPreview}
        open={openPdf}
        setMailupdate={template?.setMailupdate}
        emailUpdate={template?.mailupdate}
        closeDrawer={toggleModalPdf}
        totalIVA={template?.totalIVA}
      />
      {loaderSave && <LoaderCompleteScreen />}
    </EditOrderStyle>
  );
}
