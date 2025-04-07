import React, { useEffect, useState } from "react";
import { EditOrderService } from "../services";
import { useForm } from "react-hook-form";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

export default function useEditOrder(props) {
  const { idOrder, idOportunity } = props;
  const editOrderService = new EditOrderService();
  const { getCatalogBy } = useGlobalCommons();
  const [oportunity, setOportunity] = useState({});
  const [loader, setLoader] = useState(true);
  const [readyCatalogs, setReadyCatalogs] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [requiredBill, setRequiredBill] = useState(false);
  const [step, setStep] = useState(1);
  const [dataFiles, setDataFiles] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    getValues,
    control,
    reset,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm();

  const order = watch("order");
  const address = watch("address");
  const address_bill = watch("address_bill");

  useEffect(() => {
    handleGetCatalogs();
  }, []);

  useEffect(() => {
    if (readyCatalogs) getDataOrder();
  }, [refresh, readyCatalogs]);

  useEffect(() => {
    getDataFiles();
  }, []);

  const handleGetCatalogs = () => {
    getCatalogBy("paymentsacount");
    getCatalogBy("typesSales");
    getCatalogBy("paymentway");
    getCatalogBy("shippingtype");
    getCatalogBy("cfdis");
    getCatalogBy("paymentmethods");
    getCatalogBy("paymentways");
    getCatalogBy("taxregimes");
    setReadyCatalogs(true);
  };

  const getDataOrder = async () => {
    try {
      let response = await editOrderService.getDataOrder(idOrder);
      let oportunidad = response.oportunity;
      setOportunity(oportunidad);
      handleDefaultData(response);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFiles = async () => {
    try {
      let response = await editOrderService.getOrderFiles(idOrder);
      setDataFiles(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDefaultData = order => {
    console.log("orden", order);
    //datos de pedido hook
    let paymentaccountId = order.paymentaccount;
    let typeSaleId = order.oportunity.typesale;
    let defOrder = {
      observations: order.observations,
    };
    setValue("order", defOrder);
    setValue("order.paymentaccountId", paymentaccountId);
    setValue("order.typeSaleId", typeSaleId);
    //

    //datos de direccion de envio
    let address = order.address;
    let mailingAddress = {
      receive: order.receive,
      street: address.street,
      int_number: address.int_number,
      ext_number: address.ext_number,
      cologneInvoice: address.settlement,
      phoneInvoice: order.phone,
      postalCodeInvoice: address.postal.postal_code,
      references: address.references,
    };
    setValue("mailingAddress", mailingAddress);
    //

    //datos de direccion de factura
    if (order.billing) {
      setRequiredBill(true);
      let bill = order.bill;
      let billingData = {
        businessName: bill.businessname,
        rfc: bill.rfc,
        phoneInvoice: bill.phone,
        street: bill.address.street,
        int_number: bill.address.int_number,
        ext_number: bill.address.ext_number,
        cologneInvoice: bill.address.settlement,
        postalCodeInvoice: bill.address.postal.postal_code,
      };
      setValue("billingData", billingData);
      setValue("billingData.cfdiId", bill.cfdi);
      setValue("billingData.paymentMethod", bill.paymentmethod);
      setValue("billingData.waytoPay", bill.paymentway);
      setValue("billingData.taxregime", bill.taxregime);
    }
    //
  };

  const handleSwitch = event => {
    let check = event.target.checked;
    setRequiredBill(check);
  };

  const handleDirectStep = step => setStep(step);
  const handleRefresh = () => setRefresh(!refresh);

  return {
    states: {
      loader,
      oportunity,
      step,
      order,
      requiredBill,
      dataFiles,
    },
    functions: {
      handleRefresh,
      handleDirectStep,
      handleSwitch,
    },
    hookActions: {
      setValue,
      register,
      control,
      errors,
      watch,
    },
  };
}
