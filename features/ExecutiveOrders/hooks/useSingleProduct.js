import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { useSelector, useDispatch } from "react-redux";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { handleGlobalAlert } from "../../../utils";

export default function useSingleProduct(props) {
  const { getCatalogBy } = useGlobalCommons();
  const dispatch = useDispatch();
  const { deliverytimes } = useSelector(commonSelector);
  const { data: product, functionsProducts, packageSelected, close } = props;
  const { setProductsData, productsData } = functionsProducts;
  const {
    setValue,
    handleSubmit,
    register,
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({});
  const quantity = watch("quantity");
  const callamount = watch("callamount");
  const total = watch("total");

  useEffect(() => {
    getCatalogBy("deliverytimes");
  }, []);

  useEffect(() => {
    handleSetDefaultValues();
  }, [product]);

  useEffect(() => {
    handleCalculateTotal();
  }, [quantity, callamount]);

  const handleSetDefaultValues = () => {
    setValue("name_product", product.name);
    setValue("code", product.code);
    setValue("import", product.import ? "Importado" : "Nacional");
    setValue("brand", product.brand?.name);
    setValue("callamount", product.callamount);
    setValue("quantity", 1);
    setValue("product", product);
  };

  const handleCalculateTotal = () => {
    let total = Number(formatNumbers(quantity)) * Number(formatNumbers(callamount));
    setValue("total", total);
  };

  const handleFormProduct = form => {
    let bodyFormat = { ...form };
    bodyFormat.callamount = Number(formatNumbers(bodyFormat.callamount));
    bodyFormat.quantity = Number(formatNumbers(bodyFormat.quantity));
    bodyFormat.total = Number(formatNumbers(bodyFormat.total));
    handleAddAToPackage(bodyFormat);
  };

  const handleAddAToPackage = product => {
    let copyProductsData = { ...productsData };
    let copyProducts = [...copyProductsData.products];
    copyProducts[packageSelected.index].inPackage.push(product);
    copyProductsData.products = copyProducts;
    setProductsData(copyProductsData);
    handleGlobalAlert("success", "Se Agrego el Producto al Paquete!", "basic", dispatch, 6000);

    close();
  };

  const formatNumbers = num => {
    if (num) {
      let newNumber = num.toString();
      let number = newNumber.replace(/[^0-9.]/g, "");
      return number;
    }
    return 0;
  };

  return {
    hooksTools: {
      setValue,
      handleSubmit,
      register,
      control,
      clearErrors,
      errors,
    },
    states: {
      deliverytimes: deliverytimes.results,
      total,
    },
    functions: {
      handleFormProduct,
    },
  };
}
