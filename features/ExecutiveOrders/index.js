import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import AddressShopping from "./components/AddressShopping";
import BillingForm from "./components/BillingForm";
import FilesForm from "./components/FilesForm";
import InfoOrders from "./components/InfoOrder";
import ModalShipping from "./components/ModalShipping";
import OrderForm from "./components/OrderForm";
import ProductsForm from "./components/ProductsForm";
import ResumeOrder from "./components/ResumeOrder";
import useFormOrder from "./hooks/useFormOrder";
import useOrder from "./hooks/useOrder";
import useShippingOrder from "./hooks/useShippingOrder";
import { ExecutiveOrdersStyled } from "./styles";
import PreviewFile from "./components/PreviewFile";
import useGlobalCommons from "../../hooks/useGlobalCommons";

import { tabsNewOrder } from "./data";
import LoaderCompleteScreen from "../../components/LoaderCompleteScreen";
import { useState } from "react";

export default function ExecutiveOrders() {
  const { oportunity, productsData, setProductsData } = useOrder(steps);
  const { states, control, errors, actions, register, watch, setValue, setError, handleSubmit, reset, getValues } =
    useFormOrder({
      productsData,
      oportunity,
    });

  const { formData, steps, filesToUpload, fileSelect, openPreviewFile, loaderOrder, selectedTypeSale } = states;
  const {
    setFilesToUpload,
    handleDirectStep,
    handleOnClickFilePreview,
    validateIndicatorErrorForm,
    toogleModalPreview,
  } = actions;
  const {
    open,
    handleOnClickAddProduct,
    handleOnChangeOptionCheck,
    handleOnChangeTotal,
    optionChecked,
    totalShipping,
  } = useShippingOrder(productsData, setProductsData);

  const hookActions = {
    register,
    watch,
    setValue,
    setError,
  };

  const printFormData = () => {
    const allValues = getValues(); // Obtiene todos los valores del formulario
    console.log("Todos los valores del formulario:", allValues);

    console.log(productsData);
  };

  const renderView = () => {
    switch (steps) {
      case 0:
        return (
          <OrderForm
            watch={watch}
            control={control}
            register={register}
            errors={errors}
            reset={reset}
            actions={actions}
          />
        );
      case 1:
        return (
          <AddressShopping
            control={control}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            actions={actions}
          />
        );
      case 2:
        return (
          <BillingForm
            control={control}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            states={states}
            actions={actions}
          />
        );
      case 3:
        return (
          <FilesForm
            filesToUpload={filesToUpload}
            setFilesToUpload={setFilesToUpload}
            handleOnClickFilePreview={handleOnClickFilePreview}
            register={register}
            setValue={setValue}
            actions={actions}
            errors={errors}
            setError={setError}
            selectedTypeSale={selectedTypeSale}
          />
        );
      case 4:
        return (
          <ProductsForm
            handleOnClickAddProduct={handleOnClickAddProduct}
            productsData={productsData}
            setProductsData={setProductsData}
            watch={watch}
            control={control}
            register={register}
            errors={errors}
            actions={actions}
            hookActions={hookActions}
          />
        );
      case 5:
        return (
          <ResumeOrder
            formData={formData}
            productsData={productsData}
            handleOnClickAddProduct={handleOnClickAddProduct}
            register={register}
            actions={actions}
          />
        );
    }
  };

  return (
    <ExecutiveOrdersStyled>
      <div className="header">
        <h1>Nuevo Pedido</h1>

        <button
          onClick={() => {
            printFormData();
          }}
        >
          {" "}
          Print
        </button>
      </div>

      <div className="main_datalles">
        <InfoOrders selectedTypeSale={selectedTypeSale} oportunity={oportunity} step={steps} order={formData} />
      </div>
      <div className="main_orders">
        <div className="tabs">
          {tabsNewOrder.map((item, index) => (
            <Button
              key={index}
              startIcon={validateIndicatorErrorForm(item)}
              className={`tab_option ${steps === item.step && "active"}`}
              onClick={() => handleDirectStep(item.step)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="data">{renderView()}</div>
      </div>

      <ModalShipping
        handleOnChangeOptionCheck={handleOnChangeOptionCheck}
        handleOnChangeTotal={handleOnChangeTotal}
        totalShipping={totalShipping}
        optionChecked={optionChecked}
        productsData={productsData}
        open={open}
        onClose={handleOnClickAddProduct}
      />

      <PreviewFile open={openPreviewFile} onClose={toogleModalPreview} fileSelect={fileSelect} />
      {loaderOrder && <LoaderCompleteScreen />}
    </ExecutiveOrdersStyled>
  );
}
