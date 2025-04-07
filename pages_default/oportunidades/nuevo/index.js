import React, { useContext, useEffect, useState } from "react";
import NavBarDashboard from "../../../components/NavBarDashboard";
import { Grid, Button, Tooltip, Box, Fade } from "@material-ui/core";
import Head from "next/head";
import { useForm } from "react-hook-form";
import DrawPermissions from "../../../components/DrawerPermissions";
import DrawerCotizacion from "../../../components/DrawerCotizacion";
import RequestCommon from "../../../services/request_Common";
import { saveAs } from "file-saver";
import {
  Add,
  Assignment,
  Delete,
  Edit,
  ErrorRounded,
  LocalShipping,
  Lock,
  LockOpen,
  Visibility,
} from "@material-ui/icons";
import SideBar from "../../../components/SideBar";
import { useRouter } from "next/router";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE, URL_SPACE } from "../../../services/api";
import { ProspectosStyled, TableProducts } from "../../../styles/Cotizaciones/nuevo.styled";
import { useDispatch, useSelector } from "react-redux";
import { quotesSelector, setArrayProducts, setProductSelect } from "../../../redux/slices/quotesSlice";
import { normalizeOpportunity } from "../../../utils/normalizeData";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { formatNumber, formatNumberNoSymbol, generateTemporalId, handleAlert, toUpperCaseChart } from "../../../utils";
import { getCountOportunities, getCountProspect } from "../../../redux/slices/dashboardSlice";
import { userSelector } from "../../../redux/slices/userSlice";
import { createNewTracking } from "../../../redux/slices/trackingSlice";
import QuantityModal from "../../../components/QuantityModal";
import useValidateLogin from "../../../hooks/useValidateLogin";
import LoaderPage from "../../../components/LoaderPage";
import { companySelector } from "../../../redux/slices/companySlice";
import { makeTemplate } from "../../../templates/makeTemplate";
import dayjs from "dayjs";
import DrawerSelectTemplate from "../../../components/DrawerSelectTemplate";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import DrawerDiscounts from "../../../components/DrawesDiscounts";
import Select from "react-select";
import ModalExtraProduct from "../../../components/ModalExtraProduct";
import ModalCustomTutorial from "../../../components/ModalCustomTutorial";
import { arrayMoveImmutable } from "array-move";
import { SortableTable } from "../../../components/UI/atoms/SortableTable";
import { SocketContext } from "../../../context/socketContext";
import MainLayout from "../../../components/MainLayout";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import useSaveError from "../../../hooks/useSaveError";

export default function NuevaOportunidad() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { saveError } = useSaveError();

  const { getCatalogBy } = useGlobalCommons();
  const { socket, online } = useContext(SocketContext);
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  const [Alert, setAlert] = useState({
    severity: null,
    show: null,
    message: "",
    type: null,
  });
  // * sidebar estado
  const [open, setOpen] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [openModalExtraProduct, setOpenModalExtraProduct] = useState(false);
  const [phases, setPhases] = useState([]);
  const [producto, setProducto] = useState([]);
  const [discountsEjecutive, setDiscountsEjecutive] = useState([]);
  const [templatesObservations, setTemplatesObservations] = useState([]);
  const [amountProduct, setAmountProduct] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(null);
  const [totalPieces, setTotalPieces] = useState(null);
  const [priceUnit, setPriceUnit] = useState(null);
  const [totalFinal, setTotalFinal] = useState(null);
  const [showDrawer, setshowDrawer] = useState(false);
  const { productSelect, productsSelected: products } = useSelector(quotesSelector);
  const { userData, id_user, company: id_companys, groupId } = useSelector(userSelector);
  const [openDrawerDiscounts, setOpenDrawerDiscounts] = useState(false);
  const [refetchDiscounts, setRefetchDiscounts] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [isLoadingDataRequest, setIsLoadingRequestData] = useState(false);
  const [requestAprobate, setRequestAprobate] = useState(false);
  const [disabledButtonsOnSave, setDisabledButtonsOnSave] = useState(false);
  const [totalIVA, setTotalIVA] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [disableAddDiscount, setDisableAddDiscount] = useState(0);
  const { photo } = useSelector(companySelector);
  const { clientTypes } = useSelector(commonSelector);
  const [observations, setObservations] = useState("");
  const [concept, setConcept] = useState(undefined);
  const [prospect, setProspect] = useState({});
  const [bodyRequest, setBodyRequest] = useState({});
  const [openPdf, setOpenPdf] = useState(false);
  const [dataPreview, setDataPreview] = useState(initialDataPreview);
  const [totalWithoutShipping, setTotalWithoutShipping] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0);
  const [isCreatingOportunity, setIsCreatingOportunity] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(0);
  const [totalAmout, setTotalAmout] = useState(0);
  const [totalAmoutSub, setTotalAmoutSub] = useState(0);
  const [finalTotalAmount, setFinalTotalAmount] = useState(0);
  const [finalTotalExtraCpst, setFinalTotalExtraCpst] = useState(0);
  const [emailUpdate, setMailupdate] = useState("");
  const [openDiscount, setOpenDiscount] = useState(false);
  const defaultCommision = 3;
  const [validClientType, setValidClientType] = useState(null);

  //folios
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // * WATCH DE USEHOOK FORM
  const obs = watch("observations");
  const conc = watch("concept");
  const dat = watch("estimatedclosing");
  const discountWatch = watch("discounted");
  const shippingWatch = watch("shipping");
  const commonApi = new RequestCommon();

  // Sort the array by applying drag
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(setArrayProducts(arrayMoveImmutable(products, oldIndex, newIndex)));
  };

  // * UseEffects
  useEffect(() => {
    requestProspectData();
    getTemplatesObservations();
  }, [router.query.p]);

  useEffect(() => {
    getCatalogBy("clientTypes");
  }, []);

  useEffect(() => {
    setMailupdate(userData?.email);
  }, [userData]);

  useEffect(() => {
    setValue("amount", formatNumberNoSymbol(finalTotalAmount + finalTotalExtraCpst).toString());
  }, [finalTotalAmount, finalTotalExtraCpst]);

  useEffect(() => {
    // requestOportunities();
    setValue("shipping", 0);
  }, []);

  useEffect(() => {
    getPashes();
  }, []);

  useEffect(() => {
    getEjecutiveDiscounts();
  }, [refetchDiscounts]);

  useEffect(() => {
    let totalDiscount = calculatePercentaje(discountWatch || 0, totalWithoutShipping);
    setTotalDiscount(Number(totalDiscount) + Number(totalDiscountProducts));
    setFinalTotalAmount(totalAmout - totalDiscount);
    setValue("amount", formatNumberNoSymbol(finalTotalAmount + finalTotalExtraCpst).toString());
  }, [discountWatch, totalWithoutShipping, products, totalDiscountProducts]);

  // * PREVIEW DE LA COTIZACION
  useEffect(() => {
    console.log("PREVIEW DE LA COTIZACION: ", products);
    // console.log("Datos de la compañia:", prospect.clientcompany);
    setDataPreview({
      ...dataPreview,
      ejecutive: {
        name: `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}  ${toUpperCaseChart(
          userData?.lastname
        )}`,
        email: emailUpdate,
        phone: userData?.phone,
      },
      prospect: {
        name: `${toUpperCaseChart(prospect?.name)}`,
        lastname: `${toUpperCaseChart(prospect?.lastname)}`,
        email: prospect?.email,
        phone: prospect?.phone,
      },
      quoteInfo: {
        folio: conc,
        date: dayjs(new Date()).format("DD/MM/YYYY"),
      },
      iva: formatNumber(totalIVA),
      discount: formatNumber(totalDiscount),
      total: formatNumber(finalTotalAmount + finalTotalExtraCpst),
      subtotal: formatNumber(totalAmoutSub),

      products: products,
      observations: obs == "" ? "Sin Observaciones" : obs,
      company: {
        photo: userData?.grouplogo,
      },
      clientcompany: {
        cityId: prospect.clientcompany?.cityId,
        commercialbusinessId: prospect.clientcompany?.commercialbusinessId,
        companyname: prospect.clientcompany?.companyname,
        createdAt: prospect.clientcompany?.createdAt,
        ejecutiveId: prospect.clientcompany?.ejecutiveId,
        email: prospect.clientcompany?.email,
        entityId: prospect.clientcompany?.entityId,
        id: prospect.clientcompany?.id,
        optionalophone: prospect.clientcompany?.optionalophones,
        phone: prospect.clientcompany?.phone,
        photo: prospect.clientcompany?.photo,
        postalId: prospect.clientcompany?.postalId,
        rfc: prospect.clientcompany?.rfc,
        street: prospect.clientcompany?.street,
        updatedAt: prospect.clientcompany?.updatedAt,
      },
    });
  }, [
    products,
    prospect,
    obs,
    conc,
    dat,
    totalAmout,
    discountTotal,
    discountWatch,
    finalTotalAmount,
    finalTotalExtraCpst,
  ]);

  useEffect(() => {
    calculateTotal();
  }, [products, totalAmout, totalDiscount, finalTotalExtraCpst, totalDiscountProducts]);

  useEffect(() => {
    handleCommission();
  }, [amountProduct, totalWithoutShipping, products, finalTotalAmount, finalTotalExtraCpst]);

  useEffect(() => {
    handleDiscount();
  }, [openDiscount, discountWatch]);

  const handleDiscount = () => {
    if (discountWatch > 0) {
      setOpenDiscount(true);
    } else {
      if (!discountWatch) {
        setOpenDiscount(false);
      } else {
        setOpenDiscount(false);
      }
    }
  };

  // * REQUEST SERVER

  const requestOportunities = async () => {
    // Todo Request data to increment concept

    try {
      let query = {
        prospect: {
          ejecutiveId: id_user,
        },
      };
      let responseOportunity = await api.get(`oportunities?where=${JSON.stringify(query)}&count=0&include=prospect`);
      let responseCount =
        responseOportunity.data.count < 9
          ? "0" + (responseOportunity.data.count + 1)
          : responseOportunity.data.count + 1;
      setValue("concept", `${userData.username}-${responseCount}`);
      setConcept(`${userData.username}-${responseCount}`);
    } catch (error) {
      console.log(error);
    }
  };

  const requestProspectData = async () => {
    // Todo Request data to save prospect Data

    if (!router.query.p) return;
    let params = {
      include: "city,entity,phase,origin,clientcompany,clienttype,specialty,postal",
    };
    try {
      let Prospect = await api.get(`prospects/${router.query.p}`, { params });
      setProspect(Prospect.data);
      let { clientTypeId } = Prospect?.data;
      if (clientTypeId !== null) {
        setValue("clienttype", clientTypeId);
        setValidClientType(clientTypeId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getPashes = async () => {
    try {
      let phases = await commonApi.getPashes();
      setPhases(phases?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getEjecutiveDiscounts = async () => {
    setIsLoadingRequestData(true);
    try {
      let query = {};
      query.ejecutiveId = id_user;
      let discounts = await api.get(`ejecutivediscounts?where=${JSON.stringify(query)}`);
      setDiscountsEjecutive(discounts.data.results);
      setIsLoadingRequestData(false);
    } catch (error) {
      setIsLoadingRequestData(false);
      console.log(error);
    }
  };

  const getTemplatesObservations = async () => {
    try {
      let templates = await api.get(`observations?where={"ejecutiveId":"${id_user}"}&all=1`);
      setTemplatesObservations(templates.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // * REQUEST SERVER

  // * CALCULO
  const calculateTotal = () => {
    let discountTotal = products.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.discount;
    }, 0);
    if (discountTotal > 0) {
      setDisableAddDiscount(true);
    } else {
      setDisableAddDiscount(false);
    }

    setTotalDiscountProducts(discountTotal);

    let total = products.reduce((prevValue, currentValue) => {
      if (currentValue.code === "ENVIO-UA") return prevValue;
      return prevValue + currentValue.total;
    }, 0);

    let totalsub = products.reduce((prevValue, currentValue) => {
      if (currentValue.code === "ENVIO-UA") return prevValue;
      return prevValue + currentValue.callamount * currentValue.quantity;
    }, 0);

    let totalproducts = products.reduce((prevValue, currentValue) => {
      if (currentValue.code === "ENVIO-UA") return prevValue;
      return prevValue + currentValue.quantity;
    }, 0);

    let totalWithoutShipping = products.reduce((prevValue, currentValue) => {
      if (currentValue.code === "ENVIO-UA") return prevValue;
      return prevValue + currentValue.total;
    }, 0);

    let totalExtraCots = products.reduce((prevValue, currentValue) => {
      if (currentValue?.customproduct == true) return prevValue + currentValue.total;
      return prevValue;
    }, 0);

    setFinalTotalExtraCpst(totalExtraCots);

    setTotalWithoutShipping(totalWithoutShipping);

    let subtotal = products.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.totalWithoutIva;
    }, 0);

    let totaliva = products.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.iva;
    }, 0);

    setTotalIVA(totaliva);
    setAmountProduct(total);
    setTotalAmout(total);
    setTotalAmoutSub(totalsub);
    setValue("amount", formatNumberNoSymbol(finalTotalAmount + finalTotalExtraCpst).toString());
    setValue("quantity", totalproducts);
    setSubTotal(subtotal);
  };
  //* PETICIONES

  // * Handlers Events
  const handleOnClickOpenProducts = item => setshowDrawer(true);
  const handleOnClickOpenPreview = item => setOpenPdf(true);

  const handleCommission = e => {
    let commissions = calculatePercentaje(defaultCommision, subTotal);
    setValue("commission", commissions);
  };

  const calculatePercentaje = (percent, total) => ((percent / 100) * total).toFixed(2);
  const deleteItem = (productToDelete, index) => {
    const lastProducts = products.filter((item, index) => item.code_temporal !== productToDelete.code_temporal);
    dispatch(setArrayProducts(lastProducts));

    if (lastProducts.length <= 0) {
      setTotalAmout(0);
      setFinalTotalAmount(0);
      setFinalTotalExtraCpst(0);
      setTotalIVA(0);
      setDiscountTotal(0);
      setTotalDiscount(0);
      setValue("amount", (0).toString());
    }
  };

  const createOportunity = returnTo => async formDataCotizacion => {
    if (products.length <= 0) {
      handleAlert("warning", "Es necesario agregar un producto", "basic", setAlert);
      return;
    }

    if (templateSelected === 0) {
      handleAlert("warning", "Selecciona una plantilla", "basic", setAlert);
      return;
    }

    setIsCreatingOportunity(true);
    setDisabledButtonsOnSave(true);
    formDataCotizacion.p = router.query.p;

    try {
      let dataOportunity = normalizeOpportunity(formDataCotizacion);
      dataOportunity.noshippingtotal = Number(finalTotalExtraCpst);
      dataOportunity.totalextracosts = Number(finalTotalExtraCpst);
      dataOportunity.totaliva = Number(totalIVA);
      dataOportunity.discount = Number(totalDiscount);
      dataOportunity.dispercentage = Number(discountWatch || 0);
      dataOportunity.compercentage = Number(defaultCommision);
      dataOportunity.subtotal = Number(finalTotalAmount);

      // TODO Normalize Product To Save In Quotes
      // console.log("producrs", products);
      let productsToPost = products.map((item, index) => ({
        prodId: item.id,
        quantity: item.quantity,
        discount: item.discount,
        iva: item.iva,
        total: item.total,
        note: item.info,
        newprice: item.callamount,
        customproduct: item.customproduct ? item?.customproduct : false,
        shownote: false,
        ejecutiveId: id_user,
        dispercentage: item.discountp,
        deliverytimeId: item?.deliveryTimeId,
      }));

      let envioProduct = productsToPost.filter((item, index) => item.customproduct == true);
      let extraProducts = products.filter((item, index) => item?.customproduct === true);

      if (envioProduct.length >= 1) {
        envioProduct[0].product = extraProducts[0];
      }

      dataOportunity.addproducts = productsToPost;
      dataOportunity.extraproducts = envioProduct;

      if (openDiscount === true) {
        dataOportunity.typediscounts = 2;
      } else {
        let exist = products.filter((item, index) => item.discount !== 0);
        if (exist.length >= 1) {
          dataOportunity.typediscounts = 3;
        } else {
          dataOportunity.typediscounts = 1;
        }
      }
      let oportunity = await api.post(`oportunities/goals`, dataOportunity);
      console.log(oportunity);

      if (dataOportunity.clientTypeId !== validClientType) {
        updateProspect(dataOportunity);
      }

      setConcept(oportunity?.data?.concept);
      setValue("concept", oportunity?.data?.concept);

      console.log(oportunity?.data?.concept);

      let resExtraCost = await api.post("extracosts", {
        totalcost: shippingWatch,
        shipping: shippingWatch,
        installation: 0,
        training: 0,
        shippinginsurance: 0,
        exportcost: 0,
        ensurance: 0,
        extraweight: 0,
        extradimenssions: 0,
        extrapacking: 0,
        maintenance: 0,
        extra: 0,
        oportunityId: oportunity.data.id,
      });

      let today = dayjs().format("DD-MM-YYYY");
      let normalizeProduct = products.map((item, index) => ({
        name: item.name,
        amount: item.callamount,
        quantity: item.quantity,
        code: item.code,
        iva: item.iva,
        total: item.total,
        brand: item?.brand?.name,
        info: item.info || "",
        description: item.description,
        deliveryTime: item?.deliveryTime || "",
      }));
      let data = {
        clientcompany: {
          cityId: prospect.clientcompany?.cityId,
          commercialbusinessId: prospect.clientcompany?.commercialbusinessId,
          companyname: prospect.clientcompany?.companyname,
          createdAt: prospect.clientcompany?.createdAt,
          ejecutiveId: prospect.clientcompany?.ejecutiveId,
          email: prospect.clientcompany?.email,
          entityId: prospect.clientcompany?.entityId,
          id: prospect.clientcompany?.id,
          optionalophone: prospect.clientcompany?.optionalophones,
          phone: prospect.clientcompany?.phone,
          photo: prospect.clientcompany?.photo,
          postalId: prospect.clientcompany?.postalId,
          rfc: prospect.clientcompany?.rfc,
          street: prospect.clientcompany?.street,
          updatedAt: prospect.clientcompany?.updatedAt,
        },
        company: {
          name: company,
          photo: photo,
        },
        quoteInfo: {
          folio: oportunity?.data?.concept,
          observations: observations,
          date: today,
        },
        ejecutive: {
          name: `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`,
          lastname: toUpperCaseChart(userData?.lastname),
          email: emailUpdate,
          phone: userData?.phone,
        },
        prospect: {
          name: toUpperCaseChart(prospect?.name),
          lastname: toUpperCaseChart(prospect?.lastname),
          entity: prospect?.entity?.name,
          email: prospect?.email,
          phone: prospect?.phone,
        },
        iva: formatNumber(totalIVA),
        discount: formatNumber(totalDiscount),
        total: formatNumber(finalTotalAmount + finalTotalExtraCpst),
        subtotal: formatNumber(totalAmoutSub),
        products: normalizeProduct,
        footer: {
          showIn: "pageFooter-last",
          data: `*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación
        solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la
        cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando
        el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la
        compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.`,
        },
      };
      let user = id_user;
      let group = userData.groupId;
      let response =
        id_companys === "yGDxrTdf9six3E29yxVWc8MF" || id_companys === "UFN6npxl4BkkbVACy66EcEuU"
          ? makeTemplate(8, data)
          : makeTemplate(templateSelected, data);
      let company = userData.companyId;
      const form = new FormData();
      form.append("name", oportunity?.data?.concept);
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);

      let responsePDFURL = await api.post("convert/pdf", form);

      let dataUrl = {};
      dataUrl.quoteurl = responsePDFURL.data.url;

      let oportunityUrl = await api.put(`oportunities/goals/${oportunity.data.id}`, dataUrl);

      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + responsePDFURL.data.url,
        },
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });

      saveAs(pdfBlob, `${oportunity?.data?.concept}.pdf`);

      handleAlert("success", "cotizacion - Creada correctamente!", "basic", setAlert);
      let bodyNewTracking = {
        prospectId: router.query.p,
        status: "2",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: oportunity.data.id,
        reason: `Cotizado con certeza de ${formDataCotizacion.certainty}`,
        observations: `Cotizado con certeza de ${formDataCotizacion.certainty}`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };

      handleAlert("success", "cotizacion - Creada correctamente!", "basic", setAlert);
      switch (returnTo) {
        case "saveAndReturn":
          router.back();
          break;

        case "saveAndShow":
          router.push({
            pathname: "/oportunidades/[prospecto]",
            query: {
              prospecto: router.query.p,
            },
          });

          break;

        case "saveAndNew":
          router.reload();
          break;

        default:
          router.back();
          break;
      }

      let queryOportunitiesExecutive = {
        isoportunity: true,
        ejecutiveId: id_user,
      };

      let paramsOportunitiesExecutive = {
        where: JSON.stringify(queryOportunitiesExecutive),
        count: 1,
        limit: 0,
      };

      dispatch(
        getCountOportunities({
          params: paramsOportunitiesExecutive,
        })
      );

      let queryProspectsExecutive = {
        isclient: false,
        isoportunity: false,
        ejecutiveId: id_user,
      };

      let paramsProspectsExecutive = {
        where: JSON.stringify(queryProspectsExecutive),
        count: 1,
        limit: 0,
      };
      dispatch(
        getCountProspect({
          params: paramsProspectsExecutive,
        })
      );
      dispatch(
        createNewTracking({
          data: bodyNewTracking,
        })
      );
      setIsCreatingOportunity(false);
      dispatch(setArrayProducts([]));

      socket?.emit("send_notify_activity", {
        type: "create", // create,update
        from: "oportunity", // data+
        message: `Oportunidad creada con certeza de ${formDataCotizacion.certainty}`,
        data: oportunityUrl.data.oportunity,
        ejecutiveId: id_user,
        groupId: groupId,
        companyId: id_companys,
      });

      handleAlert("success", "Cotizacion Exitosa", "basic", setAlert);
    } catch (error) {
      let idError = "ERROR-" + generateTemporalId(5);

      handleAlert("error", `Ocurrio un problema,intentelo mas tarde ${idError}`, "basic", setAlert);
      console.log(error);
      saveError(error, idError, "createoportunity");

      console.log(error?.response);
      setIsCreatingOportunity(false);
      setDisabledButtonsOnSave(false);
    }
  };

  const updateProspect = async data => {
    try {
      let response = await api.put(`prospects/${prospect?.id}`, {
        clientTypeId: data?.clientTypeId,
      });
    } catch (error) {
      handleGlobalAlert(
        "error",
        "Oportunidad - Ocurrio un Error al Actualizar el tipo de cliente",
        "basic",
        dispatch,
        6000
      );
      console.log(error);
    }
  };

  const [extraProductSelected, setExtraProductSelected] = useState({});
  const [isEditingExtraProduct, setIsEditingExtraProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  const handleSelectProduct = item => {
    // console.log("Abriendo Quantity", item);
    if (item?.customproduct == true) {
      setExtraProductSelected(item);
      setOpenModalExtraProduct(true);
      setIsEditingExtraProduct(true);
    } else {
      dispatch(setProductSelect(item));
      setOpenQuantity(!openQuantity);
      setIsEditingProduct(true);
    }
  };

  const handleTemplatesObservations = item => {
    if (item !== null) {
      setValue("observations", item.data);
      setObservations(item.data);
    } else {
      setValue("observations", "");
      setObservations("");
    }
  };

  const handleClickRequestDiscount = () => {
    setShowPermissions(!showPermissions);
    let requestBody = {
      comission: Number(watch("commission")),
      concept: watch("concept"),
      ejecutiveId: id_user,
      subtotal: Number(finalTotalAmount),
      total: Number(finalTotalAmount + finalTotalExtraCpst),
      ivatotal: Number(totalIVA),
      prospectId: router.query.p,
      discount: Number(totalDiscount),
      compercentage: Number(defaultCommision),
      dispercentage: Number(discountWatch),
      totalextracosts: Number(finalTotalExtraCpst),
    };
    setBodyRequest(requestBody);
  };

  const alertDiscount = (porcentDiscount, discountAprobate) => {
    if (porcentDiscount >= 4 && discountAprobate === false) {
      return true;
    } else {
      return false;
    }
  };

  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };
  const checkIfExistDiscount = item => {
    let exist = item.filter((item, index) => item.discount !== 0);

    if (exist.length >= 1) {
      return true;
    }

    return false;
  };
  if (isLoadingPage) return <LoaderPage />;
  console.log("cnjedncdcndcf", products);

  return (
    <MainLayout>
      <ProspectosStyled>
        <Head>
          <title>CRM JOBS - Cotización</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="ctr_prospects">
            <div className="head">
              <div className="head__title">
                <h2>Nueva oportunidad y Cotizacion</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit(createOportunity)}>
              <Grid container spacing={1} className="form">
                <Grid item xs={12} sm={12} md={12}>
                  <label className="item">
                    Folio <strong>*</strong>
                  </label>
                  <input
                    disabled
                    autoComplete="off"
                    {...register("concept", { required: false })}
                    defaultValue={"Folio"}
                    name="concept"
                    id="title"
                    type="text"
                    placeholder="Ingrese el nombre"
                    className="input disabled"
                  />
                  {errors.concept && errors.concept.type === "required" && <ShowAlert info="Requerido" />}
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">Cantidad Productos</label>
                  <input
                    disabled
                    autoComplete="off"
                    {...register("quantity", { required: true })}
                    name="quantity"
                    id="quantity"
                    type="number"
                    className="input disabled"
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Monto Total <strong>*</strong>
                  </label>
                  <div className="inputcontainerAmount">
                    <div className="Amount">
                      <input
                        disabled
                        className="inputAmount"
                        {...register("amount", {
                          required: true,
                        })}
                        name="amount"
                        id="amount"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="Etiqueta">
                        <p className="porcentain">$</p>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Fase<strong>*</strong>
                  </label>
                  <div className="point"></div>
                  <select className="input" {...register("phase", { required: true })}>
                    <option hidden value="">
                      Selecciona una Opción
                    </option>
                    {phases.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name?.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  {errors.phase && errors.phase.type === "required" && <ShowAlert info="Requerido" />}
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Certeza <strong>*</strong>
                  </label>
                  <select
                    {...register("certainty", { required: true })}
                    name="certainty"
                    id="certainty"
                    type="texto"
                    placeholder="%"
                    className="input"
                  >
                    <option hidden value="">
                      Seleccione certeza
                    </option>

                    {percentajes.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.certainty && errors.certainty.type === "required" && <ShowAlert info="Requerido" />}
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className="item">Comisión</label>
                  <div className="containerCommision">
                    <div className="inputcontainer">
                      <div className="inputAmount">
                        <input defaultValue={defaultCommision} className="input3" autoComplete="off" readOnly />
                        <div className="Etiqueta">
                          <p className="porcentain">%</p>
                        </div>
                      </div>
                    </div>
                    <div className="inputcontainer">
                      <div className="inputAmount">
                        <input
                          className="input3"
                          {...register("commission", {
                            required: true,
                          })}
                          name="commission"
                          id="commission"
                          type="number"
                          placeholder="Total Comisión"
                          disabled
                          autoComplete="off"
                        />
                        <div className="Etiqueta">
                          <p className="porcentain">$</p>
                        </div>
                      </div>
                      {errors.commission && errors.commission.type === "required" && <ShowAlert info="Requerido" />}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Fecha de cierre <strong>*</strong>
                  </label>
                  <input
                    className="input"
                    {...register("estimatedclosing", { required: true })}
                    name="estimatedclosing"
                    id="estimatedclosing"
                    type="date"
                    onChange={e => console.log(e.target.value)}
                  />
                  {errors.estimatedclosing && errors.estimatedclosing.type === "required" && (
                    <ShowAlert info="Requerido" />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center">
                    <label className="item">Descuento</label>
                    <Tooltip title="Solicitar Permiso si el Descuento es Mayor al Permitido">
                      {requestAprobate === true ? (
                        <LockOpen className="lockIcon permit" onClick={() => handleClickRequestDiscount()} />
                      ) : (
                        <Lock className="lockIcon denied" onClick={() => handleClickRequestDiscount()} />
                      )}
                    </Tooltip>
                  </Box>
                  <div className="containerCommision">
                    <div className="inputcontainer">
                      <div className="inputAmount">
                        <Tooltip
                          title={`${
                            disableAddDiscount ? "Descuento General no Permitido" : "Ingresa descuento de 5% o 10%"
                          }`}
                        >
                          <input
                            max={3}
                            disabled={checkIfExistDiscount(products)}
                            {...register("discounted")}
                            name="discounted"
                            className="input3"
                            placeholder="Ingresa Descuento"
                            autoComplete="off"
                            type="number"
                          />
                        </Tooltip>

                        <div className="Etiqueta">
                          <p className="porcentain">%</p>
                        </div>
                      </div>
                      <Fade in={alertDiscount(watch("discounted"), requestAprobate)}>
                        <div className="alertRequest">
                          <ErrorRounded className="alertRequest__icon" />
                          <p className="alertRequest__title">Se requiere permiso para Aplicar este Descuento</p>
                        </div>
                      </Fade>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className="itemClient">
                  <label className="item">
                    Tipo de cliente <strong>*</strong>
                  </label>
                  <select
                    {...register("clienttype", { required: true })}
                    name="clienttype"
                    id="clienttype"
                    type="texto"
                    placeholder="ej: prospecto"
                    className="input"
                  >
                    <option hidden value="">
                      Seleccione el tipo de cliente
                    </option>

                    {clientTypes?.results?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.clienttype && errors.clienttype.type === "required" && <ShowAlert info="Requerido" />}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div>
                    <label
                      onClick={() => {
                        console.log(totalAmoutSub);
                      }}
                      className="item"
                    >
                      Observaciones
                    </label>
                    <Select
                      placeholder="Selecciona una Plantilla"
                      options={templatesObservations}
                      onChange={handleTemplatesObservations}
                      isClearable={true}
                      maxMenuHeight={190}
                      className="selectObservations"
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} `}
                    />
                  </div>
                  <div></div>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <textarea
                    autoComplete="off"
                    {...register("observations")}
                    onChange={e => {
                      setObservations(e.target.value);
                    }}
                    name="observations"
                    id="observations"
                    type="text"
                    placeholder="Ingrese Observaciones o Eliga una Plantilla "
                    className="textArea"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    className="btn_extraproduct"
                    startIcon={<LocalShipping />}
                    variant="contained"
                    onClick={() => setOpenModalExtraProduct(true)}
                  >
                    <p>Agregar Envio</p>
                  </Button>
                </Grid>
              </Grid>

              <div className="actions-products" display="flex" mt={2} mb={1}>
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  className="btn_add"
                  onClick={() => handleOnClickOpenProducts()}
                >
                  <p>Agregar Producto</p>
                </Button>
              </div>
              <TableProducts>
                <SortableTable styleClass={"ctr_table"} onSortEnd={onSortEnd}>
                  <thead className="ctr_table__head">
                    <tr className="ctr_table__head__tr">
                      <th className="title fix ">
                        <div className="ctr_title">
                          <p>Codigo</p>
                        </div>
                      </th>
                      <th className="title fixed">
                        <div className="ctr_title">
                          <p>Producto</p>
                        </div>
                      </th>
                      <th className="title">
                        <div className="ctr_title">
                          <p>Cantidad</p>
                        </div>
                      </th>
                      <th className="title">
                        <div className="ctr_title">
                          <p>Precio Unitario</p>
                        </div>
                      </th>
                      <th className="title">
                        <div className="ctr_title">
                          <p>Descuento</p>
                        </div>
                      </th>
                      <th className="title">
                        <div className="ctr_title">
                          <p>Iva</p>
                        </div>
                      </th>
                      <th className="title">
                        <div className="ctr_title">
                          <p>Monto Total</p>
                        </div>
                      </th>

                      <th className="title">
                        <div className="ctr_title">
                          <p>Observaciones</p>
                        </div>
                      </th>

                      <th className="title fixedlast">
                        <div className="ctr_title"></div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="ctr_table__body">
                    {products.map((item, index) => (
                      <tr className={index % 2 == 0 ? "row" : "inpar row"} key={index}>
                        <td className="data fixed">
                          <p className="text">{item.code}</p>
                        </td>
                        <td className="data ">
                          {item?.customproduct === true ? (
                            <p className="ctr_td">
                              {item.name} {item?.shownote && item?.note}{" "}
                              <span
                                style={{
                                  fontSize: 10,
                                  color: "gray",
                                }}
                              >
                                (Este producto no afecta la comision )
                              </span>
                            </p>
                          ) : (
                            <p className="ctr_td">{item.name}</p>
                          )}
                        </td>
                        <td className="data">
                          <p className="text">{item.quantity}</p>
                        </td>
                        <td className="data">{formatNumber(item.callamount)}</td>
                        <td className="data">{formatNumber(item.discount)}</td>
                        <td className="data">{formatNumber(item.iva)}</td>
                        <td className="data">{formatNumber(item.total)}</td>
                        <td className="data">
                          <p>{item.deliveryTime}</p>
                          <p>{item.info}</p>
                        </td>
                        <td className="data fixedlast">
                          <div className="ctr_options__item">
                            <Box display={"flex"}>
                              <Tooltip title={"Eliminar" + " " + item.code}>
                                <Delete onClick={() => deleteItem(item, index)} />
                              </Tooltip>

                              <Tooltip title={"Editar" + " " + item.code}>
                                <Edit onClick={() => handleSelectProduct(item)} />
                              </Tooltip>
                            </Box>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </SortableTable>

                {products == 0 && <div className="notFound">Aun no hay Productos a cotizar</div>}

                <div className="totalcontainer">
                  <div className="totalcontainer__items">
                    <div className="totalcontainer__item">
                      <div className="text bold">
                        <p>Sub Total</p>
                      </div>
                      <div className="value bold">
                        <p>{formatNumber(totalAmoutSub)}</p>
                      </div>
                    </div>
                    <div className="totalcontainer__item">
                      <div className="text ">
                        <p>Iva</p>
                      </div>
                      <div className="value">
                        <p>{formatNumber(totalIVA)}</p>
                      </div>
                    </div>

                    <div className="totalcontainer__item">
                      <div className="text ">
                        <p>Descuento</p>
                      </div>
                      <div className="value">
                        <p>-{formatNumber(totalDiscount)}</p>
                      </div>
                    </div>

                    <div className="totalcontainer__item">
                      <div className="text bold">
                        <p>Total</p>
                      </div>
                      <div className="value bold">
                        <p>{formatNumber(finalTotalAmount + finalTotalExtraCpst)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TableProducts>

              <Grid container>
                <Grid item xs={12} md={12}>
                  <div className="ctr_buttons">
                    <Button
                      variant="contained"
                      disabled={disabledButtonsOnSave}
                      className="btn_generate"
                      onClick={() => handleOnClickOpenPreview()}
                    >
                      <Visibility />
                      <p>Seleccionar Plantilla</p>
                    </Button>
                    <Button
                      variant="contained"
                      className="btn_generate"
                      type="submit"
                      disabled={disabledButtonsOnSave}
                      onClick={handleSubmit(createOportunity("saveAndReturn"))}
                    >
                      <Assignment />
                      <p>Guardar Cotizacion</p>
                    </Button>

                    <Button
                      variant="contained"
                      className="btn_generate"
                      type="submit"
                      disabled={disabledButtonsOnSave}
                      onClick={handleSubmit(createOportunity("saveAndShow"))}
                    >
                      <Assignment />
                      <p>Guardar Cotizacion y Ver</p>
                    </Button>

                    <Button
                      variant="contained"
                      className="btn_generate"
                      type="submit"
                      disabled={disabledButtonsOnSave}
                      onClick={handleSubmit(createOportunity("saveAndNew"))}
                    >
                      <Assignment />
                      <p>Guardar Cotizacion y Nueva</p>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
            <DrawerSelectTemplate
              templateSelected={templateSelected}
              setTemplateSelected={setTemplateSelected}
              data={dataPreview}
              open={openPdf}
              setMailupdate={setMailupdate}
              emailUpdate={emailUpdate}
              closeDrawer={() => setOpenPdf(!openPdf)}
              totalIVA={totalIVA}
            ></DrawerSelectTemplate>
            <DrawerCotizacion
              width={"60%"}
              show={showDrawer}
              producto={producto}
              setProducto={setProducto}
              closeDrawer={() => setshowDrawer(!showDrawer)}
              ShowAlert={ShowAlert}
              totalPieces={totalPieces}
              discountTotal={discountTotal}
              totalFinal={totalFinal}
              priceUnit={priceUnit}
              setAlert={setAlert}
              openDiscount={openDiscount}
              setOpenDiscount={setOpenDiscount}
            ></DrawerCotizacion>
          </div>
        </div>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
        <QuantityModal
          editQuantity={isEditingProduct}
          setIsEditingProduct={setIsEditingProduct}
          setOpen={setOpenQuantity}
          open={openQuantity}
          openDiscount={openDiscount}
          setAlert={setAlert}
        />
        <ModalExtraProduct
          itemSelected={extraProductSelected}
          setItemSelected={setExtraProductSelected}
          isEditing={isEditingExtraProduct}
          setIsEditing={setIsEditingExtraProduct}
          setOpen={setOpenModalExtraProduct}
          open={openModalExtraProduct}
        />
        <DrawerDiscounts setOpen={setOpenDrawerDiscounts} open={openDrawerDiscounts} />
        <DrawPermissions
          open={showPermissions}
          close={setShowPermissions}
          discountsEjecutive={discountsEjecutive}
          refetch={refetchDiscounts}
          setRefetch={setRefetchDiscounts}
          request={bodyRequest}
          handleAlert={handleAlert}
          setAlert={setAlert}
          isLoadingDataRequest={isLoadingDataRequest}
          requestAprobate={requestAprobate}
          setRequestAprobate={setRequestAprobate}
        />

        <ModalCustomTutorial />
        {isCreatingOportunity && <LoaderCompleteScreen />}
      </ProspectosStyled>
    </MainLayout>
  );
}

const percentajes = [
  {
    label: "10%",
    value: 10,
  },
  {
    label: "20%",
    value: 20,
  },
  {
    label: "30%",
    value: 30,
  },
  {
    label: "40%",
    value: 40,
  },
  {
    label: "50%",
    value: 50,
  },
  {
    label: "60%",
    value: 60,
  },
  {
    label: "70%",
    value: 70,
  },
  {
    label: "80%",
    value: 80,
  },
  {
    label: "90%",
    value: 90,
  },
  {
    label: "100%",
    value: 100,
  },
];

let initialDataPreview = {
  company: {
    name: "Medical Buy",
    photo: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/templates/medicalbuy.png",
    primaryColor: "#",
  },
  quoteInfo: {
    folio: "UAZG-02",
    observations: "",
    date: "22/09/2022",
  },
  prospect: {
    name: "nuevo",
    lastname: "nuevo",
    entity: "Estado de México",
    email: "prueba1@gmail.com",
    phone: "5525688573",
  },
  products: [
    {
      name: "BOMBA DE INFUSION DE DOS CANALES CON PANTALLA LCD COLOR",
      amount: 42750,
      quantity: 1,
      code: "ZNB-XBY1200",
      iva: 6840,
      total: 49590,
      brand: "NINGBO DAVID",
    },
  ],
  discount: 0,
  total: 49590,
  ejecutive: {
    name: "uriel",
    lastname: "arriaga",
    email: "urielarriaga@medicalbuy.com.mx",
  },
  footer: {
    showIn: "pageFooter-last",
    data: "*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación\n        solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la\n        cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando\n        el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la\n        compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.",
  },
};
