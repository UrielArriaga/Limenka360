import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { additionalOptions } from "../databd";

export default function useEditOrder() {
  const router = useRouter();
  const oportunityId = router.query.o;
  const { getCatalogBy } = useGlobalCommons();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const { taxinformations, providers } = useSelector(commonSelector);
  const { open: openPdf, toggleModal: toggleModalPdf } = useModal();
  const [supplicesData, setSupplicesData] = useState({
    results: [],
    count: 0,
    backup: [],
  });
  const [loaderOrder, setLoaderOrder] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [isLoaderEdit, setIsLoaderEdit] = useState(false);
  const [dataOrder, setDataOrder] = useState({});
  const [dataProvider, setDataProvider] = useState(null);
  const [dataPDF, setDataPDF] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedNational, setSelectedNational] = useState("");
  const [dataBuyer, setDataBuyer] = useState({
    name: "",
    tax: "",
    contact: "",
    address: "Calzada de las bombas #35 DEP. Local 4 y 5, Col. El parque de coyoacán, Coyoacán, Ciudad de México, C.P. 04899",
    phone: null,
    email: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [handleProvider, setHandleProvider] = useState([]);
  const handleCloseProvider = () => setOpenHandleProvider(false);
  const [openHandleProvider, setOpenHandleProvider] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();
  const provider = watch("provider");
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    getRequestDataOportunity();
    getRequestDataProducts();
  }, [oportunityId]);

  useEffect(() => {
    handleValidateDataProducts();
  }, [products]);

  useEffect(() => {
    setDataPDF({
      ...dataPDF,
      products: supplicesData.results,
      provider: dataProvider,
    });
  }, [supplicesData, dataOrder, dataProvider, dataBuyer]);
  useEffect(() => {
    if (provider) {
      getRequestData();
    }
  }, [provider]);

  useEffect(() => {
    if (provider) {
      getRequestDataProvider();
    }
  }, [provider]);

  useEffect(() => {
    const foundAddress = directions.find(d => d.id === dataOrder?.provideraddressId);
    setSelectedAddress(foundAddress || null);
  }, [dataOrder, directions]);

  const getRequestDataOportunity = async () => {
    setIsLoaderEdit(true);
    try {
      let params = {
        include: "provider,taxinformation,provideraddress",
      };
      let response = await api.get(`purchaseorders/${oportunityId}`, { params });
      let dataOport = response.data;
      setDataOrder(dataOport);
      setDefaultValuesForm(dataOport);
    } catch (error) {
      setIsLoaderEdit(true);
      console.log(error);
    }
  };

  const getRequestDataProvider = async item => {
    try {
      let params = { include: "postal,entity,city" };
      let response = await api.get(`providers/${provider?.id}`, { params });
      let data = response.data;
      setDataProvider(data);
      setIsLoaderEdit(false);
    } catch (error) {
      setIsLoaderEdit(false);
      console.log(error);
    }
  };

  const getRequestDataProducts = async () => {
    try {
      let query = {
        purchaseorderId: oportunityId,
      };
      const params = {
        all: 1,
        count: 1,
        where: JSON.stringify(query),
        include: "product,product.provider",
      };
      let response = await api.get("supplies", { params });
      setSupplicesData({
        ...supplicesData,
        results: normalizeProduct(response?.data?.results),
        backup: normalizeProduct(response?.data?.results),
        count: response.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getRequestData = async () => {
    try {
      let params = {
        where: { providerId: `${provider?.id}` },
        include: "city,entity,postal",
        join: "c,w,p",
      };
      let response = await api.get(`provideraddresses`, { params });
      setDirections(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const setDefaultValuesForm = data => {
    setValue("payment_condition", data?.paymentcondition);
    setValue("phone", data?.phone);
    setValue("delivery", data?.methoddelivery);
    setValue("provider", {
      companyname: data?.provider?.companyname,
      id: data?.providerId,
      name: data?.provider?.name,
    });
    if (data?.taxinformationId !== null) {
      setValue("tax", { name: data?.taxinformation?.name, id: data?.taxinformationId });
    }
    setValue("observations", data.observations);
    const nationalOption = additionalOptions.find(option => option.id === data?.national);
    setSelectedNational({ id: nationalOption?.id, name: nationalOption?.name });
    setValue("national", { id: nationalOption?.id, name: nationalOption?.name });
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
    Object.values(dataBuyer).some(value => value === "" || value === null || value === undefined);
  };

  const normalizeOrder = savetype => form => {
    // console.log(")
    let isOkDataBuyer = validateDataBuyer();
    if (isOkDataBuyer) {
      showAlertWarning("Los datos del comprador son requeridos");
    } else {
      if (selectedAddress == null) {
        showAlertWarning("Orden - Selecciona una dirección de proveedor.");
        return;
      }
      if (selectedNational == "") {
        showAlertWarning("Selecciona un tipo de orden");
      } else {
        let bodyOrder = {};

        bodyOrder.paymentcondition = form?.payment_condition;
        bodyOrder.phone = form?.phone;
        bodyOrder.observations = form?.observations;
        bodyOrder.methoddelivery = form?.delivery;
        bodyOrder.providerId = form?.provider?.id;
        bodyOrder.taxinformationId = form?.tax?.id;
        bodyOrder.national = form?.national?.id;
        if (supplicesData?.results?.length == 0) {
          bodyOrder.draft = true;
        } else {
          bodyOrder.draft = false;
        }
        bodyOrder.putsupplies = productsUpdate(supplicesData?.results);
        bodyOrder.addsupplies = productsAdd(supplicesData?.results);
        bodyOrder.delsupplies = productsDelete(supplicesData?.backup, supplicesData?.results);
        bodyOrder.provideraddressId = selectedAddress?.id;
        updateOrder(bodyOrder);
      }
    }
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

  const productsDelete = (productsOportunidad, productsSelec) => {
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
      setLoaderOrder(true);

      if (!dataOrder?.draft) {
        if (bodyOrder?.supplies?.length <= 0) {
          showAlertWarning("Orden - Selecciona mínimo un producto.");
          return;
        }
      }
      let response = await api.put(`purchaseorders/${dataOrder?.id}`, bodyOrder);
      if (response.status == 200) {
        showAlertSucces("Orden - La Orden se modifico con exito!");
        router.push("/comprasv2/ordenes");
      }
    } catch (error) {
      setLoaderOrder(false);
      showAlertError("Orden - Ocurrio un error al editar la orden!");
      console.log(error);
    }
  };

  const handleAddProduct = product => {
    let copyProducts = [...supplicesData?.results];
    copyProducts.push(product);
    setSupplicesData({ ...supplicesData, results: copyProducts });
  };
  const handleDeleteProductByIndex = indexToRemove => {
    if (indexToRemove < 0 || indexToRemove >= supplicesData?.results?.length) {
      console.error("Índice fuera de rango:", indexToRemove);
      return;
    }

    const newResults = supplicesData?.results?.filter((_, index) => index !== indexToRemove);

    setSupplicesData(prevState => ({
      ...prevState,
      results: newResults,
      count: newResults?.length,
    }));
  };

  const handleRestoreProducts = () => {
    setSupplicesData(prevState => ({
      ...prevState,
      results: prevState?.backup,
      count: prevState?.backup?.length,
    }));
  };

  const handleEditProduct = (value, identifier, position, item) => {
    const updatedProducts = [...supplicesData.results];

    // Parse the value to a number
    const parsedValue = parseFloat(value);

    if (identifier === "quantity" || identifier === "unitprice") {
      if (value.trim() === "") {
        // If input is empty, set field to empty and reset amount to 0
        updatedProducts[position][identifier] = "";
        updatedProducts[position].amount = 0;
      } else if (isNaN(parsedValue) || parsedValue <= 0) {
        // Handle invalid numbers
        updatedProducts[position][identifier] = "";
        updatedProducts[position].amount = 0;
      } else {
        // Set valid value
        updatedProducts[position][identifier] = parsedValue;

        // Recalculate the amount if both quantity and unitprice are present
        const quantity = updatedProducts[position].quantity || 0;
        const unitprice = updatedProducts[position].unitprice || 0;
        updatedProducts[position].amount = quantity * unitprice;
      }
    }

    // Update the state with the modified products
    setProducts(updatedProducts);
  };

  const setDefaultIfEmpty = (value, defaultValue) => {
    return value === undefined || value === "" || isNaN(value) || Number(value) <= 0 ? defaultValue : Number(value);
  };

  const recalculateAmount = (quantity, unitPrice) => {
    return Number(quantity) * Number(unitPrice);
  };

  const handleBlurProduct = (field, position) => {
    const updatedProducts = [...supplicesData.results];
    const product = updatedProducts[position];

    if (field === "quantity") {
      product.quantity = setDefaultIfEmpty(product.quantity, 1); // Default quantity is 1
    } else if (field === "unitprice") {
      product.unitprice = setDefaultIfEmpty(product.unitprice, 1); // Default unit price is 0
    }

    // Recalculate amount if quantity or unit price changed
    const quantity = product.quantity;
    const unitPrice = product.unitprice;
    product.amount = recalculateAmount(quantity, unitPrice);

    // Update the products list
    setSupplicesData(prevState => ({
      ...prevState,
      results: updatedProducts,
    }));
  };
  const handleValidateProvider = option => {
    let open = !provider ? false : true;
    if (!provider) {
      setValue("provider", option);
      getRequestDataProvider(option);
    } else {
      setHandleProvider(option);
    }
    setOpenHandleProvider(open);
  };

  const handleValidateDataProvider = flag => {
    if (flag) {
      setValue("provider", handleProvider);
      getRequestDataProvider(handleProvider);
      setProducts([]);
      setSelectedAddress(null);
    }
    setOpenHandleProvider(false);
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

  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);

  const handleClicPreview = () => {
    let isOkData = validateDataBuyer();
    if (isOkData) {
      showAlertWarning("Los datos del comprador son requeridos");
    } else if (selectedNational == "") {
      showAlertWarning("selecciona el tipo de orden");
    } else {
      toggleModalPdf();
    }
  };

  const handleAddBuyer = form => {
    setDataBuyer({
      ...dataBuyer,
      name: form?.name,
      tax: form?.taxbuyer,
      contact: form?.contact,
      address: "Calzada de las bombas #35 DEP. Local 4 y 5, Col. El parque de coyoacán, Coyoacán, Ciudad de México, C.P. 04899",
      phone: form?.phonebuyer,
      email: form?.email,
    });
  };

  const handleChangeType = e => {
    if (e) {
      setValue("national", e);
      setSelectedNational(e);
    } else {
      setValue([]);
    }
  };
  const handleSelect = id => {
    setSelectedAddress(prev => {
      if (prev && prev.id === id) {
        return null;
      }

      return directions?.find(d => d.id === id) || null;
    });
  };

  const saveOrderAs = typetosave => data => {
    console.log(typetosave);
    console.log(data);
  };

  return {
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
    handleSelect,
    saveOrderAs,
  };
}
