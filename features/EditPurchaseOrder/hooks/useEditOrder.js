import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { additionalOptions, deleveryMethod, payMethod } from "../databd";
import { userSelector } from "../../../redux/slices/userSlice";
import ApiRequestProvider from "../services";
import { makeTemplateOrder } from "../../../templates/makeTemplateAlmacen";
import { handleGlobalAlert } from "../../../utils";
import { useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
export default function useEditOrder() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData, id_user, company: id_companys, groupId, roleId } = useSelector(userSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { showAlertError, showAlertWarning } = useAlertToast();
  const { taxinformations, providers } = useSelector(commonSelector);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();
  const orderId = router?.query?.o;
  const provider = watch("provider");
  const [dataOrder, setDataOrder] = useState({});
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [dataProvider, setDataProvider] = useState({
    resultId: {},
    isLoading: false,
  });
  const [handleProvider, setHandleProvider] = useState([]);
  const { open: openHandleProvider, toggleModal: togglehandleProvider } = useModal();
  const [products, setProducts] = useState({
    results: [],
    count: 0,
    backup: [],
    delsupplies: [],
  });
  const { open: openAddProduct, toggleModal: togglehandleAddProduct } = useModal();
  const [directions, setDirections] = useState({
    results: [],
    isFetching: false,
    count: 0,
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [dataPreview, setDataPreview] = useState({});
  const { open: openPdf, toggleModal: toggleModalPdf } = useModal();
  const [selectedNational, setSelectedNational] = useState("");
  const [dataBuyer, setDataBuyer] = useState({
    name: "",
    tax: "",
    contact: "",
    address: "Calzada de las bombas #35 DEP. Local 4 y 5, Col. El parque de coyoacán, Coyoacán, Ciudad de México, C.P. 04899",
    phone: null,
    email: "",
  });

  const [mailupdate, setMailupdate] = useState("");
  const [totalIVA, setTotalIVA] = useState(500);
  const [loaderSave, setLoaderSave] = useState(false);
  const request = new ApiRequestProvider();

  const [isGuideNumberEnabled, setIsGuideNumberEnabled] = useState(false);
  useEffect(() => {
    setMailupdate(userData?.email);
  }, [userData]);

  useEffect(() => {
    if (orderId) {
      getRequestOrders();
      getRequestDataSupplices();
    }
  }, [orderId]);

  useEffect(() => {
    if (provider) {
      getProviderAddress();
      getProvidersDetails();
    }
  }, [provider]);

  useEffect(() => {
    handleValidateDataProducts();
  }, [products]);

  useEffect(() => {
    setDataPreview({
      ...dataPreview,
      products: products?.results,
      provider: dataProvider?.resultId,
      folio: dataOrder?.folio,
      buyer: dataBuyer,
      address: selectedAddress,
    });
  }, [products, dataOrder, dataProvider, dataBuyer, selectedAddress]);

  useEffect(() => {
    const foundAddress = directions?.results.find(d => d.id === dataOrder?.provideraddressId);
    setSelectedAddress(foundAddress || null);
  }, [dataOrder, directions]);

  const getRequestOrders = async () => {
    setIsLoadingOrder(true);
    try {
      let params = {
        include: "provider,taxinformation,provideraddress",
      };
      let response = await api.get(`purchaseorders/${orderId}`, { params });
      let dataOport = response.data;
      setDataOrder(dataOport);
      setDefaultValuesForm(dataOport);
      setIsLoadingOrder(false);
    } catch (error) {
      setIsLoadingOrder(false);
      console.log(error);
    }
  };

  const getProvidersDetails = async () => {
    setDataProvider(prevState => ({ ...prevState, isLoading: true }));
    try {
      let params = { include: "postal,entity,city" };
      let response = await api.get(`providers/${provider?.id}`, { params });
      let data = response.data;
      setDataProvider({
        resultId: data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      setDataProvider(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const getRequestDataSupplices = async () => {
    try {
      let query = {
        purchaseorderId: orderId,
      };
      const params = {
        all: 1,
        count: 1,
        where: JSON.stringify(query),
        include: "product,product.provider",
      };
      let response = await api.get("supplies", { params });
      setProducts({
        ...products,
        results: normalizeProduct(response?.data?.results),
        backup: normalizeProduct(response?.data?.results),
        count: response.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getProviderAddress = async () => {
    setDirections(prevState => ({ ...prevState, isFetching: true }));
    try {
      let params = {
        where: { providerId: `${provider?.id}` },
        include: "city,entity,postal",
        join: "c,w,p",
      };
      let response = await api.get(`provideraddresses`, { params });

      setDirections({
        results: response?.data?.results || [],
        isFetching: false,
        count: response?.data?.results?.length,
      });
    } catch (error) {
      setDirections({
        ...directions,
        isFetching: false,
      });
    }
  };

  const setDefaultValuesForm = data => {
    setValue("phone", data?.phone);
    if (data?.methoddelivery !== null) {
      const method = deleveryMethod.find(option => option.id === data?.methoddelivery);
      setValue("delivery", method);
      if (method?.id === "proveedor envia") {
        setIsGuideNumberEnabled(true);
      } else {
        setIsGuideNumberEnabled(false);
      }
    }

    setValue("provider", {
      companyname: data?.provider?.companyname,
      id: data?.providerId,
      name: data?.provider?.name,
    });
    if (data?.taxinformationId !== null) {
      setValue("tax", { name: data?.taxinformation?.name, id: data?.taxinformationId });
    }
    setValue("observations", data.observations);

    setValue("payment_condition", data?.paymentcondition);
    const nationalOption = additionalOptions.find(option => option.id === data?.national);
    setSelectedNational({ id: nationalOption?.id, name: nationalOption?.name });
    setValue("national", { id: nationalOption?.id, name: nationalOption?.name });
    console.log("nationalOption", nationalOption);
    setValue("guide_number", data?.noguia || "");
    if (data?.paymentcondition !== null) {
      const payment_condition = payMethod.find(option => option.id === data?.paymentcondition);
      setValue("payment_condition", payment_condition);
    }

    setValue("estimateddeliverydate", dayjs(data.estimateddeliverydate).format("YYYY-MM-DD") || "");
  };

  const normalizeProduct = productsnorm => {
    let normalize = productsnorm.map(item => ({
      ...item,
      brand: item?.product?.brand,
      callamount: item?.newprice,
      code: item?.product?.code,
      name: item?.product?.name,
      model: item?.product?.code,
      description: item?.product?.name,
      provider: item?.product?.provider,
    }));
    return normalize;
  };

  const validateDataBuyer = () => {
    return Object.values(dataBuyer).every(value => value !== "" && value !== null && value !== undefined);
  };

  const handleSaveAndComplete = async form => {
    const isBuyerDataComplete = validateDataBuyer();
    if (!isBuyerDataComplete) {
      showAlertWarning("Por favor, completa toda la información del comprador.");
      return;
    }

    if (selectedAddress == null) {
      showAlertWarning("Selecciona una dirección de proveedor.");
      return;
    }

    if (selectedNational === "") {
      showAlertWarning("Selecciona un tipo de orden");
      return;
    }

    if (products.results.length === 0) {
      showAlertWarning("Agrega al menos un producto antes de guardar y finalizar.");
      return;
    }

    const bodyOrder = normalizeOrder(form, "saveandfinish");
    await updateOrder(bodyOrder, "saveandfinish");
  };

  //Guardar cambios de orden
  const handleSaveChanges = async form => {
    const isBuyerDataComplete = validateDataBuyer();
    if (!isBuyerDataComplete) {
      showAlertWarning("Por favor, completa toda la información del comprador.");
      return;
    }
    if (selectedAddress == null) {
      showAlertWarning("Selecciona una dirección de proveedor.");
      return;
    }

    if (selectedNational === "") {
      showAlertWarning("Selecciona un tipo de orden");
      return;
    }

    const bodyOrder = normalizeOrder(form, "savechanges");

    await updateOrder(bodyOrder, "savechanges");
  };

  const normalizeOrder = (form, actionType) => {
    let bodyOrder = {
      noguia: form?.delivery?.id === "proveedor envia" ? form?.guide_number : "",
      paymentcondition: form?.payment_condition?.id,
      phone: form?.phone,
      observations: form?.observations,
      methoddelivery: form?.delivery?.id,
      providerId: form?.provider?.id,
      taxinformationId: form?.tax?.id,
      national: form?.national?.id,
      provideraddressId: selectedAddress?.id,
      estimateddeliverydate: dayjs(form?.estimateddeliverydate).format(""),
    };

    if (actionType === "saveandfinish") {
      bodyOrder.draft = false;
    } else {
      if (products?.results?.length == 0) {
        bodyOrder.draft = true;
      } else {
        bodyOrder.draft = false;
      }
    }

    bodyOrder.putsupplies = productsUpdate(products?.results);
    bodyOrder.addsupplies = productsAdd(products?.results);
    bodyOrder.delsupplies = productsDelete(products?.backup, products?.results);

    return bodyOrder;
  };

  const productsAdd = productsTo => {
    return productsTo
      .filter(item => item.id === undefined)
      .map(item => ({
        quantity: item?.quantity,
        unit: item?.unit,
        unitprice: item?.unitprice,
        amount: item?.amount,
        productId: item?.productId,
      }));
  };

  const productsUpdate = productsTo => {
    return productsTo
      .filter(item => item.id !== undefined)
      .map(item => ({
        quantity: item?.quantity,
        unit: item?.unit,
        unitprice: item?.unitprice,
        amount: item?.amount,
        productId: item?.productId,
        id: item?.id,
      }));
  };

  const productsDelete = (productsOportunidad, productsSelec, productsBacku1) => {
    let del = productsOportunidad?.filter(object1 => {
      return !productsSelec?.some(object2 => {
        return object1?.id === object2?.id;
      });
    });
    let formatToDelete = del?.map(item => item?.id);
    return formatToDelete;
  };

  const updateOrder = async bodyOrder => {
    try {
      let response = await api.put(`purchaseorders/${dataOrder?.id}`, bodyOrder);
      if (response.status == 200) {
        setLoaderSave(true);
        handleGlobalAlert("success", "Orden - La Orden se Modifico  con Éxito", "basic", dispatch, 6000);
        createPDF(response.data);
      }
    } catch (error) {
      setLoaderSave(false);
      alert("Error al guardar los cambios.");
    }
  };

  const createPDF = async () => {
    let data = {
      provider: dataProvider?.resultId,
      products: products?.results,
      folio: dataOrder?.folio,
      buyer: dataBuyer,
      address: selectedAddress,
    };
    let templateSelec = selectedNational?.id ? 2 : 1;
    let templateResponse = makeTemplateOrder(templateSelec, data);
    const form = new FormData();
    form.append("name", dataProvider?.data?.companyname || "nombre proveedor");
    form.append("data", templateResponse);
    form.append("company", id_companys);
    form.append("group", groupId);
    form.append("ejecutive", id_user);
    let responsePDFURL = await request.postCreatePDF(form);
    const pdfBlob = new Blob([responsePDFURL.data], {
      type: "application/pdf;charset=utf-8",
    });

    saveAs(pdfBlob, `${dataOrder?.folio}.pdf`);
    if (responsePDFURL.status == 201 || responsePDFURL.status == 200) {
      putFileOrder(responsePDFURL?.data?.url, dataOrder?.id);
    }
  };

  const putFileOrder = async (url, id) => {
    try {
      let response = await request.putPurchaseOrder(url, id);
      if (response.status == 201 || response.status == 200) {
        setLoaderSave(true);
        router.push("/comprasv2/ordenes");
        console.log("documento actualizado");
      }
    } catch (error) {
      console.log(error, "Error put");
      showAlertError("Error al actualizar archivo");
    }
  };

  const handleAddProduct = product => {
    let copyProducts = [...products?.results];
    copyProducts.push(product);
    setProducts({ ...products, results: copyProducts });
  };
  const handleDeleteProductByIndex = indexToRemove => {
    if (indexToRemove < 0 || indexToRemove >= products.results.length) return;

    const productToRemove = products.results[indexToRemove]; // Guardar el producto a eliminar
    const newResults = products.results.filter((_, index) => index !== indexToRemove);

    setProducts(prevState => ({
      ...prevState,
      results: newResults,
      count: newResults.length,
      delsupplies: [...prevState.delsupplies, productToRemove.id], // Agregar ID a delsupplies
    }));
  };

  const handleEditProduct = (value, identifier, index) => {
    const updatedProducts = [...products.results];
    const parsedValue = parseFloat(value);

    if (identifier === "quantity" || identifier === "unitprice") {
      if (value.trim() === "" || isNaN(parsedValue) || parsedValue <= 0) {
        updatedProducts[index][identifier] = "";
        updatedProducts[index].amount = 0;
      } else {
        updatedProducts[index][identifier] = parsedValue;
        const quantity = updatedProducts[index].quantity || 0;
        const unitprice = updatedProducts[index].unitprice || 0;
        updatedProducts[index].amount = quantity * unitprice;
      }
    }

    setProducts(prevState => ({
      ...prevState,
      results: updatedProducts,
      count: updatedProducts.length,
    }));
  };
  const setDefaultIfEmpty = (value, defaultValue) => {
    return value === undefined || value === "" || isNaN(value) || Number(value) <= 0 ? defaultValue : Number(value);
  };

  const recalculateAmount = (quantity, unitPrice) => {
    return Number(quantity) * Number(unitPrice);
  };

  const handleBlurProduct = (field, position) => {
    const updatedProducts = [...products.results];
    const product = updatedProducts[position];

    if (field === "quantity") {
      product.quantity = setDefaultIfEmpty(product.quantity, 1);
    } else if (field === "unitprice") {
      product.unitprice = setDefaultIfEmpty(product.unitprice, 1);
    }
    const quantity = product.quantity;
    const unitPrice = product.unitprice;
    product.amount = recalculateAmount(quantity, unitPrice);

    setProducts(prevState => ({
      ...prevState,
      results: updatedProducts,
    }));
  };
  const handleValidateProvider = option => {
    let open = !provider ? false : true;
    if (!provider) {
      setValue("provider", option);
      getProvidersDetails(option);
    } else {
      setHandleProvider(option);
    }
    togglehandleProvider();
  };

  const handleValidateDataProvider = flag => {
    if (flag) {
      setValue("provider", handleProvider);
      getProvidersDetails(handleProvider);
      setProducts(prevState => ({
        ...prevState,
        results: [],
        count: 0,
      }));
      setSelectedAddress(null);
    }
    togglehandleProvider();
  };

  const handleValidateDataProducts = () => {
    if (products.length > 0) {
      let isOk = products.some(obj => {
        return Object.values(obj).some(value => value === "" || value === null || value === undefined);
      });
      let emptyData = isOk ? "" : "productos ok";
      !isOk && clearErrors("products");
      setValue("products", emptyData);
    } else {
      setValue("products", "");
    }
  };

  const handleClicPreview = () => {
    if (selectedNational === "") {
      showAlertWarning("Selecciona un tipo de orden");
      return;
    }
    toggleModalPdf();
  };
  const handleAddBuyer = (form, loadState = false) => {
    if (loadState) {
      setDataBuyer(prev => ({
        ...prev,
        ...form,
      }));
    } else {
      if (form && Object.keys(form).length > 0) {
        let key = Object.keys(form)[0];
        let value = Object.values(form)[0];
        setDataBuyer(prev => ({
          ...prev,
          [key]: value,
        }));
      } else {
        console.error("Form data is not in the expected format.");
      }
    }
  };

  const handleChangeType = option => {
    if (option) {
      setValue("national", option);
      setSelectedNational(option);
    } else {
      setValue("national", null);
      setSelectedNational(null);
    }
  };

  const handleSelect = id => {
    setSelectedAddress(prev => {
      if (prev && prev.id === id) {
        return null;
      }

      return directions?.results?.find(d => d.id === id) || null;
    });
  };

  return {
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
    template: {
      mailupdate,
      setMailupdate,
      totalIVA,
      dataPreview,
    },
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
  };
}
