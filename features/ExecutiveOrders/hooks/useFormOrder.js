import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ExecutiveOrdersService from "../services";
import { useRouter } from "next/router";
import useModal from "../../../hooks/useModal";
import { ErrorOutline } from "@material-ui/icons";
import { dataOrderToSave, normalizeNewProducts, productsPDF } from "../utils/normalizeOrder";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import { api, URL_SPACE } from "../../../services/api";
import dayjs from "dayjs";
import { makeTemplateOrder } from "../../../templates/makeTemplate";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

export default function useFormOrder(props) {
  const { productsData, oportunity } = props;
  const executiveOrderService = new ExecutiveOrdersService();
  const { company, id_user, userData } = useSelector(userSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();

  const { open: openPreviewFile, toggleModal } = useModal();
  const [fileSelect, setFileSelect] = useState(null);
  const [selectedTypeSale, setSelectedTypeSale] = useState();

  const [steps, setSteps] = useState(0);
  const [loaderOrder, setLoaderOrder] = useState(false);
  const [requiredBill, setRequiredBill] = useState(false);
  const [emptySection, setEmptySection] = useState({
    order: false,
    mailingAddress: false,
    billingData: false,
  });
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [formData, setFormData] = useState({
    order: {},
    mailing: {},
    billing: {},
  });
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
  const e_order = errors.order ? true : false;
  const e_mailingAddress = errors.mailingAddress ? true : false;
  const e_billingData = errors.billingData ? true : false;
  const e_files = errors.files ? true : false;
  useEffect(() => {
    if (!requiredBill) {
      setValue("billingData", { isBilling: false });
      setFormData({ ...formData, billing: { isBilling: false } });
      clearErrors("billingData");
    } else {
      setFormData({ ...formData, billing: { isBilling: true } });
      setValue("billingData.isBilling", true);
    }
  }, [requiredBill]);

  useEffect(() => {
    handleInitialData();
    if (oportunity) {
      setSelectedTypeSale(oportunity?.typesale?.name || oportunity.typeSaleId?.name || "N/A");
    }
  }, [oportunity]);

  const handleInitialData = () => {
    getCatalogBy("paymentway");
    getCatalogBy("typesSales");
    setValue("order.typeSaleId", oportunity.typesale);

    setValue("typesale", oportunity.typesale);
    clearFormError(["order.typeSaleId"]);
  };

  const saveLocalStorage = form => {
    // localStorage.setItem("orden", JSON.stringify(formData));
  };

  const getLocalStorage = () => {
    let storage = localStorage.getItem("orden");
    let dataForm = JSON.parse(storage);
    if (!dataForm) return;
    // setValue("order", dataForm.order);
    // setValue("mailingAddress", dataForm.mailing);
    // setValue("billingData", dataForm.billing);
    // setFormData(dataForm);
    // setRequiredBill(dataForm.billing.isBilling ? true : false);
  };

  // localStorage.setItem("orden",formData)

  // useEffect(() => {
  //   const getFormDataLocalStorage = () => {
  //     let data = localStorage.getItem(`formdataorder-${oportunityId}`);
  //     if (data) {
  //       setFormData(JSON.parse(data));
  //       delete data.files;
  //       reset(JSON.parse(data));
  //     }
  //   };

  //   getFormDataLocalStorage();
  // }, [oportunityId]);

  // useEffect(() => {
  //   validateEmptyForm();
  // }, [e_order, e_mailingAddress, e_billingData]);

  // const handleOnSubmit = data => {
  //   let newData = {
  //     ...data,
  //   };

  //   if (steps === 3) {
  //     newData.files = filesToUpload;
  //   }

  //   setFormData(newData);

  //   console.log("data", data);
  //   localStorage.setItem(`formdataorder-${oportunityId}`, JSON.stringify(formData));

  //   handleOnChangeStep("next");
  // };

  const handleSubmitOrder = data => {
    let order = data.order;
    setFormData({ ...formData, order: order });
    saveLocalStorage();
    setSteps(1);
  };
  const handleSubmitMailing = data => {
    let mailing = data.mailingAddress;
    setFormData({ ...formData, mailing: mailing });
    saveLocalStorage();
    setSteps(2);
  };
  const handleSubmitBilling = data => {
    let billing = data.billingData;
    setFormData({ ...formData, billing: billing });
    saveLocalStorage();
    setSteps(3);
  };

  const handleDirectStep = step => {
    switch (step) {
      case 0:
        trigger("order");
        break;
      case 1:
        trigger("mailingAddress");
        break;
      case 2:
        trigger("billingData");
        break;
    }
    setSteps(step);
  };

  const handleOnClickFilePreview = async file => {
    setFileSelect(file);
    toggleModal();
  };

  const toogleModalPreview = () => {
    setFileSelect(null);
    toggleModal();
  };

  const handleSwitch = event => {
    let check = event.target.checked;
    setRequiredBill(check);
  };

  const handleSave = () => {
    validateEmptyForm();
    handleSaveProducts();
  };
  const validateEmptyForm = () => {
    trigger("order");
    trigger("mailingAddress");
    trigger("billingData");
    let errors = {
      order: e_order,
      mailingAddress: e_mailingAddress,
      billingData: e_billingData,
      files: e_files,
    };
    setEmptySection(errors);

    console.log(e_files);
    // if (e_order || e_mailingAddress || e_billingData || e_files) {
    //   handleGlobalAlert("warning", "Faltan Algunos Campos por Llenar", "basic", dispatch, 6000);
    // } else {
    validateDataOrder();
    // }
  };

  const validateDataOrder = async () => {
    try {
      setLoaderOrder(true);
      let aditionalData = {
        companyId: company,
        oportunityId: oportunity.id,
        amount: oportunity.amount,
      };
      let bodyNormalizeOrder = dataOrderToSave(aditionalData, formData);
      let response = await api.post("orders", bodyNormalizeOrder);
      let neworder = response.data;
      handleSaveProducts();
      handleUploadFiles(neworder);
    } catch (error) {
      setLoaderOrder(false);
      handleGlobalAlert("error", "Error al Crear la Orden", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  const handleSaveProducts = async () => {
    try {
      let products = productsData.products;
      let allProductsPackage = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].inPackage) {
          let inpackage = products[i].inPackage;
          for (let a = 0; a < inpackage.length; a++) {
            allProductsPackage.push(normalizeNewProducts(inpackage[a], id_user, products[i].id));
          }
        }
      }
      let response = await api.put(`oportunities/goals/${oportunity.id}`, {
        addproducts: allProductsPackage,
        amount: oportunity?.amount,
        totalextracosts: oportunity.totalextracosts,
        typesalesId: formData.order?.typeSaleId?.id,
      });
    } catch (error) {
      handleGlobalAlert("error", "Error al Guardar los Productos", "basic", dispatch, 6000);

      console.log(error);
    }
  };

  const handleUploadFiles = async order => {
    try {
      let formData = new FormData();
      let typesFiles = "";
      formData.append("oportunityId", order.oportunityId);
      formData.append("prospectId", oportunity.prospectId);
      formData.append("uploadbyId", id_user);
      for (let i = 0; i < filesToUpload.length; i++) {
        const fileToUpload = filesToUpload[i];
        formData.append("file", fileToUpload.file);
        typesFiles += `${fileToUpload.idTypeFile}${i >= filesToUpload.length - 1 ? "" : ","}`;
      }
      formData.append("filestypesId", typesFiles);
      // let response = await api.post(`files/arrayuploadtofolder/${order.id}`, formData);
      createPDFOrder(order);
      handleGlobalAlert("success", "Orden Generada con Éxito", "basic", dispatch, 6000);
      router.push("/pedidos");
    } catch (error) {
      setLoaderOrder(false);
      handleGlobalAlert("error", "Error al Subir Archivos", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  const createPDFOrder = async order => {
    try {
      let ejecutive = {
        name: `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`,
        lastname: toUpperCaseChart(userData?.lastname),
        phone: userData?.phone,
      };
      let address = {
        receive: formData.mailing.receive,
        entity: formData.mailing.entity.name,
        city: formData.mailing.city.name,
        postal: formData.mailing.postalCodeInvoice,
        street: formData.mailing.street,
        int_number: formData.mailing.int_number || "",
        ext_number: formData.mailing.ext_number,
        settlement: formData.mailing.cologneInvoice,
        phone: formData.mailing.phoneInvoice,
        references: formData.mailing.references,
      };
      let billing = formData.billing.isBilling;
      let adressBilling = {
        billingbusiness: billing ? formData.billing.businessName : "",
        rfc: billing ? formData.billing.rfc : "",
        phone: billing ? formData.billing.phoneInvoice : "",
        street: billing ? formData.billing.street : "",
        int_number: billing ? formData.billing.int_number : "",
        ext_number: billing ? formData.billing.ext_number : "",
        settlement: billing ? formData.billing.cologneInvoice : "",
        postal: billing ? formData.billing.postalCodeInvoice : "",
        entity: billing ? formData.billing.entity.name : "",
        city: billing ? formData.billing.city.name : "",
      };
      let bodyPDF = {
        concept: order.folio,
        groupLogo: userData.grouplogo,
        dateOrder: dayjs().format("DD-MM-YYYY"),
        observations: order.observations,
        companyId: userData.companyId,
        ejecutive: ejecutive,
        adressPdf: address,
        paymentaccount: formData.order?.paymentaccountId.name,
        adressBilling: adressBilling,
        cfdi: billing ? formData.billing?.cfdiId?.name : "",
        methodPayment: billing ? formData.billing?.paymentMethod?.name : "",
        wayPayment: billing ? formData.billing?.waytoPay?.name : "",
        taxregime: billing ? formData.billing?.taxregime?.name : "",
        products: productsPDF(productsData.products),
        iva: formatNumber(oportunity.totaliva),
        discount: formatNumber(oportunity.discount),
        total: formatNumber(oportunity.amount),
        subtotal: formatNumber(oportunity.subtotal),
      };
      let user = id_user;
      let group = userData.groupId;
      let response = makeTemplateOrder(bodyPDF);
      let company = userData.companyId;
      const form = new FormData();
      form.append("name", order.folio);
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);
      let responsePDFURL = await api.post("convert/pdf", form);
      let dataUrl = {};
      dataUrl.url = responsePDFURL.data.url;
      let orderUrl = api.put(`orders/${order.id}`, dataUrl).catch(() => {
        alert("PEE-OR2");
      });
      let responsePDFSAVE = await api
        .post(
          "convert/pdfbuffer",
          {
            pdfurl: URL_SPACE + responsePDFURL.data.url,
          },
          {
            responseType: "blob",
          }
        )
        .catch(() => {
          alert("PEE-PF1");
        });

      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      saveAs(pdfBlob, `${order.folio}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  const validateIndicatorErrorForm = item => {
    let icon = item.icon;
    if (item.step === 0) {
      if (emptySection.order) return <ErrorOutline className="error" />;
    }
    if (item.step === 1) {
      if (emptySection.mailingAddress) return <ErrorOutline className="error" />;
    }
    if (item.step === 0) {
      if (emptySection.billingData) return <ErrorOutline className="error" />;
    }
    return icon;
  };

  const handleBackBtForm = () => setSteps(steps - 1);
  const clearFormError = errors => clearErrors(errors);

  const handleOnChangeSelect = (option, action) => {
    console.log(option, action);
    const { name } = action;
    console.log(name);

    switch (name) {
      case "typesale":
        setValue("typesale", option);
        setSelectedTypeSale(option.name);

        break;

      case "taxregime":
        setValueBilling("taxregime", option);
        break;
      case "cfdi":
        setValueBilling("cfdi", option);
        break;
      case "paymentmethod":
        setValueBilling("paymentmethod", option);
        break;
      case "paymentway":
        setValueBilling("paymentway", option);
        break;

      case "entity":
        handleSelectEntity(option);
        break;
      case "city":
        handleSelectCity(option);
        break;

      default:
        break;
    }

    trigger(name);
  };

  return {
    errors,
    watch,
    register,
    control,
    setValue,
    setError,
    getValues,
    handleSubmit,
    states: {
      steps,
      formData,
      filesToUpload,
      fileSelect,
      openPreviewFile,
      requiredBill,
      loaderOrder,
      selectedTypeSale,
    },
    actions: {
      handleSubmit,
      handleDirectStep,
      handleOnClickFilePreview,
      handleSwitch,
      handleBackBtForm,
      handleSave,
      // ---hooks
      handleSubmitOrder,
      handleSubmitMailing,
      handleSubmitBilling,
      handleOnChangeSelect,
      //
      validateIndicatorErrorForm,
      toogleModalPreview,
      setFilesToUpload,
      clearFormError,
      trigger,
      saveLocalStorage,
    },
  };
}
