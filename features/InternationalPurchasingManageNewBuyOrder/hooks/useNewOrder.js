import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { handleGlobalAlert } from "../../../utils";
import { useDispatch } from "react-redux";
import { makeTemplateOrder } from "../../../templates/makeTemplateAlmacen";
import ApiRequestProvider from "../services/services";
import { userSelector } from "../../../redux/slices/userSlice";
import useAlertToast from "../../../hooks/useAlertToast";
import dayjs from "dayjs";

export default function useNewOrder(payments) {
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const router = useRouter();
  const { userData, id_user, company: id_companys, groupId, roleId } = useSelector(userSelector);
  const request = new ApiRequestProvider();
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { taxinformations, providers } = useSelector(commonSelector);
  const [handleProvider, setHandleProvider] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaderOrder, setLoaderOrder] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openHandleProvider, setOpenHandleProvider] = useState(false);
  const [deleveryMethod, setDeleveryMethod] = useState([
    { id: "recoleccion", name: "Recoleccion" },
    { id: "proveedor envia", name: "Proveedor Envia" },
  ]);
  const [payMethod, setPayMethod] = useState([
    { id: "pago de contado", name: "Pago de Contado" },
    { id: "credito interno", name: "Credito Interno" },
    { id: "credito externo", name: "Credito Externo" },
    { id: "especie", name: "Especie" },
    { id: "efectivo-contraentrega", name: "Efectivo - Contra Entrega" },
  ]);
  const [providerDetails, setProviderDetails] = useState({
    data: [],
    isfetchingdata: false,
  });
  const [openPdf, setOpenPdf] = useState(false);
  const [mailupdate, setMailupdate] = useState("");
  const [totalIVA, setTotalIVA] = useState(500);
  const [dataPreview, setDataPreview] = useState({});
  const [dataBuyer, setDataBuyer] = useState({
    name: "",
    tax: "",
    contact: "",
    address: "Calzada de las bombas #35 DEP. Local 4 y 5, Col. El parque de coyoacán, Coyoacán, Ciudad de México, C.P. 04899",
    phone: null,
    email: "",
  });
  const [isNational] = useState([
    {
      id: true,
      name: "Nacional",
    },
    {
      id: false,
      name: "Internacional",
    },
  ]);
  const [address, setAddress] = useState({
    data: [],
    isFetching: false,
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedNational, setSelectedNational] = useState("");
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
  const delivery = watch("delivery");

  useEffect(() => {
    handleValidateDataProducts();
  }, [products]);

  useEffect(() => {
    getProvidersDetails();
  }, [provider]);

  useEffect(() => {
    setMailupdate(userData?.email);
  }, [userData]);

  useEffect(() => {
    setDataPreview({
      ...dataPreview,
      products,
      provider: providerDetails?.data,
      folio: "N/A",
      buyer: dataBuyer,
      address: selectedAddress,
    });
  }, [providerDetails, products, dataBuyer, selectedAddress]);

  const getProvidersDetails = async () => {
    try {
      setProviderDetails({ ...providerDetails, isfetchingdata: true });
      let response = await request.getProvider(provider?.id);
      if (response.status == 200) {
        setProviderDetails({ data: response?.data?.results[0], isfetchingdata: false });
      }
    } catch (error) {
      setProviderDetails({ ...providerDetails, isfetchingdata: false });
      console.log(error, "Error providers");
    }
  };

  const handleEditProduct = (value, identifier, position, item) => {
    let copyProducts = [...products];
    if (value === 0 || value === undefined || value === "" || value === undefined) {
      showAlertWarning(`El campo ${identifier === "quantity" ? " Cantidad" : " Precio"} es obligatorio`);
    } else {
      copyProducts[position][identifier] = value;
      let total = 0;
      if (identifier === "quantity") {
        total = value * item.unitprice;
      } else if (identifier === "unitprice") {
        total = value * item.quantity;
      }
      copyProducts[position]["amount"] = total;
      setProducts(copyProducts);
    }
  };
  const handleAddProduct = product => {
    let copyProducts = [...products];
    copyProducts.push(product);
    setProducts(copyProducts);
  };

  const handleValidateProvider = option => {
    let open = !provider ? false : true;
    if (!provider) {
      setValue("provider", option);
      getAddressByProvider(option);
    } else {
      setHandleProvider(option);
    }
    setOpenHandleProvider(open);
  };
  const handleValidateDataProvider = flag => {
    if (flag) {
      setValue("provider", handleProvider);
      getAddressByProvider(handleProvider);
      setProducts([]);
      setSelectedAddress(null);
    }
    setOpenHandleProvider(false);
  };

  const getAddressByProvider = async option => {
    try {
      setAddress({ ...address, isFetching: true });
      let query = {
        providerId: option.id,
      };
      let response = await request.getAddress(query);
      if (response.status == 200 || response.status == 201) {
        setAddress({ isFetching: false, data: response?.data?.results });
      }
    } catch (error) {
      setAddress({ ...address, isFetching: false });
      console.log("Error: ", error);
    }
  };

  const validateDataBuyer = () =>
    Object.values(dataBuyer).some(value => value === "" || value === null || value === undefined);

  const handleSaveOrder = async form => {
    if (selectedNational == "") {
      showAlertWarning("Selecciona un tipo de orden");
    } else if (selectedAddress == null) {
      showAlertWarning("Selecciona una direccion del proveedor");
    } else {
      let query = {
        createdbyId: id_user,
      };
      let dataPurcharse = await request.getPurcharseOrdersByUser(query);
      let responseCount =
        dataPurcharse?.data?.count < 9 ? "0" + (dataPurcharse?.data?.count + 1) : dataPurcharse?.data?.count + 1;

      let bodyOrder = {
        folio: `${userData?.username}${"OR"}-${responseCount}`,
        provideraddressId: selectedAddress?.id,
        paymentcondition: form?.payment_condition?.id,
        phone: form?.phone,
        observations: form?.observations,
        methoddelivery: form?.delivery?.id,
        providerId: form?.provider?.id,
        taxinformationId: form?.tax?.id,
        companyId: provider?.companyId,
        national: selectedNational?.id,
        createdbyId: id_user,
        estimateddeliverydate: dayjs(form?.estimateddeliverydate).format(""),
      };
      if (delivery?.id == "proveedor envia") {
        bodyOrder.noguia = form?.guide_number;
      } else if (delivery == undefined || delivery?.id == "recoleccion") {
        bodyOrder.noguia = "";
      }
      if (products?.length > 0) bodyOrder.supplies = normalizeProducts(products);
      if (products?.length == 0) bodyOrder.draft = true;

      let sumAmountSupplies = 0;
      let sumPaymentsAmount = 0;
      if (bodyOrder.supplies) {
        sumAmountSupplies = bodyOrder?.supplies.reduce((acc, item) => acc + item.amount, 0);
        sumPaymentsAmount = payments?.reduce((acc, item) => acc + item.payment, 0);
        if (sumAmountSupplies != sumPaymentsAmount) {
          showAlertWarning(
            "La suma de los pagos en el calendario debe ser igual al monto total a pagar de los productos"
          );
          return;
        }
      }

      requestSavePushOrder(bodyOrder);
    }
  };

  const addPaymentPurchase = async bodyOrder => {
      let data = payments?.map(item => ({ ...item, date: dayjs(item.date).format(""), purchaseorderId: bodyOrder?.id }));
      try {
        let body = {
          payments: data,
        };
        let response = await request.postPaymentsPurchase(body);
        if (response.status == 200 || response.status == 201) {
          showAlertSucces("Calendario de pagos creado con exito");
          createOrderDocument(bodyOrder);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };

  const requestSavePushOrder = async bodyOrder => {
    try {
      setLoaderOrder(true);
      let response = await request.postPurchaseOrders(bodyOrder);
      if (response.status == 201) {
        handleGlobalAlert("success", "Orden - La Orden se Creo con Éxito", "basic", dispatch, 6000);
        addPaymentPurchase(response?.data);
      }
    } catch (error) {
      setLoaderOrder(false);
      handleGlobalAlert("error", "Orden - Ha Ocurrido un error al Crear la Orden", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  const createOrderDocument = async dataOrder => {
    let data = {
      provider: providerDetails?.data,
      products,
      folio: dataOrder?.folio,
      buyer: dataBuyer,
      address: selectedAddress,
    };
    let templateSelec = selectedNational?.id ? 2 : 1;

    let templateResponse = makeTemplateOrder(templateSelec, data);
    const form = new FormData();
    form.append("name", providerDetails?.data?.companyname || "nombre proveedor");
    form.append("data", templateResponse);
    form.append("company", id_companys);
    form.append("group", groupId);
    form.append("ejecutive", id_user);
    let responsePDFURL = await request.postCreatePDF(form);

    if (responsePDFURL.status == 201 || responsePDFURL.status == 200) {
      putFileOrder(responsePDFURL?.data?.url, dataOrder?.id);
    }
  };

  const putFileOrder = async (url, id) => {
    try {
      let response = await request.putPurchaseOrder(url, id);
      if (response.status == 201 || response.status == 200) {
        router.push("/gerentecompras/ordenes");
      }
    } catch (error) {
      console.log(error, "Error put");
      showAlertError("Error al actualizar archivo");
    }
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

  const normalizeProducts = products => {
    let normalize = products.map(item => ({
      quantity: item.quantity,
      unit: item.unit,
      unitprice: item.unitprice,
      amount: item.amount,
      productId: item.productId,
      name: item.name,
    }));
    return normalize;
  };

  const handleCloseProvider = () => setOpenHandleProvider(false);
  const handleOpenAddProduct = () =>
    !provider ? showAlertWarning("Debes seleccionar un proveedor primero") : setOpenAddProduct(true);

  const handleCloseAddProduct = () => setOpenAddProduct(false);
  const handleDeleteProduct = idProd => {
    let copyProducts = [...products];
    let deleteProduct = copyProducts.filter(item => item.productId !== idProd.productId);
    setProducts(deleteProduct);
  };

  const handleBack = () => router.back();

  const handleClicPreview = () =>
    selectedNational == "" ? showAlertWarning("selecciona el tipo de orden") : setOpenPdf(true);

  const handleAddBuyer = (form, loadState = false) => {
    if (loadState) {
      setDataBuyer({ ...dataBuyer, ...form });
    } else {
      let key = Object.keys(form)[0];
      let value = Object.values(form)[0];
      setDataBuyer({
        ...dataBuyer,
        [key]: value,
      });
    }
  };

  const handleChangeType = e => {
    if (e) {
      setValue("national", e);
      setSelectedNational(e);
    } else {
      setValue([]);
    }
  };

  return {
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
    handleDeleteProduct,
    handleEditProduct,
    handleCloseAddProduct,
    handleBack,
    handleSaveOrder,
    handleValidateProvider,
    handleCloseProvider,
    handleValidateDataProvider,
    requestSavePushOrder,
    getCatalogBy,
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
    template: {
      mailupdate,
      setMailupdate,
      totalIVA,
      dataPreview,
    },
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
  };
}
