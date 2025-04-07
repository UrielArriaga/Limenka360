import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box, Button, Fade, Grid, IconButton, LinearProgress, Tooltip, Zoom } from "@material-ui/core";

import { useRouter } from "next/router";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE, URL_SPACE } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { quotesSelector, setProductSelect, setArrayProducts } from "../../../redux/slices/quotesSlice";
import {
  Add,
  ArrowBack,
  CalendarToday,
  Delete,
  Edit,
  ErrorOutline,
  LocalShipping,
  Lock,
  LockOpen,
} from "@material-ui/icons";
import { calculatePercentaje, formatNumber, toUpperCaseChart, handleGlobalAlert } from "../../../utils";
import { userSelector } from "../../../redux/slices/userSlice";
import { generateTemporalId } from "../../../utils";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Controller, useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import "moment/locale/es";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import DrawerCotizacion from "../../../components/DrawerCotizacion";
import QuantityModal from "../../../components/QuantityModal";
import RequestCommon from "../../../services/request_Common";
import MomentUtils from "@date-io/moment";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import Select from "react-select";
import ModalExtraProduct from "../../../components/ModalExtraProduct";
import DrawerSelectTemplate from "../../../components/DrawerSelectTemplate";
import DiscountPermission from "../../../components/ComponentsEditOporunity/PermissionOportunity";
import { makeTemplate } from "../../../templates/makeTemplate";
import { arrayMove } from "react-sortable-hoc";

export default function EditOportunity() {
  const router = useRouter();
  const commonApi = new RequestCommon();
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { phases } = useSelector(commonSelector);
  const { userData, id_user, company: id_companys } = useSelector(userSelector);
  const { productSelect, productsSelected: products } = useSelector(quotesSelector);
  const [oportunity, setOportunity] = useState({});
  const [prospect, setProspect] = useState({});
  const [dataShipping, setDataShipping] = useState({});
  const [producto, setProducto] = useState([]);
  const [templatesObservations, setTemplatesObservations] = useState([]);
  // const [phases, setPhases] = useState([]);
  const [productsOportunity, setProductsOportunity] = useState([]);
  const [editingShipping, setEditingShipping] = useState(false);
  const [open, setOpen] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [drawerCotizacion, setDrawerCotizacion] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [openEditShipping, setOpenEditShipping] = useState(false);
  const [isHaveShipping, setIsHaveShipping] = useState(false);
  const [drawerDiscount, setDrawerDiscount] = useState(false);
  const [globalLoader, setGlobalLoader] = useState(false);
  const [isDiscountAccept, setIsDiscountAccept] = useState(false);
  const [variablePrueba, setVariablePrueba] = useState({});
  const [isUpdatingOportunity, setIsUpdatingOportunity] = useState(false);
  const [dataOportunityDiscount, setDataOportunityDiscount] = useState({});
  //Data Updated PDF
  const [dataPDF, setDataPDF] = useState({});
  const [emailUpdate, setEmailUpdate] = useState("");
  const [openPdf, setOpenPdf] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(0);
  const handleOnClickOpenPreview = item => setOpenPdf(true);
  //

  const [discountTotal, setDiscountTotal] = useState(null);
  const [discountPorcent, setDiscountPorcent] = useState(0);
  const [amountComission, setAmountComission] = useState(0);
  const [defaultCommision, setDefaultCommision] = useState(3);
  const [totalIVA, setTotalIVA] = useState(0);
  const [totalWithoutShipping, setTotalWithoutShipping] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalAmout, setTotalAmout] = useState(0);
  const [totalAmoutSub, setTotalAmoutSub] = useState(0);
  const [finalTotalAmount, setFinalTotalAmount] = useState(0);
  const [finalTotalExtraCpst, setFinalTotalExtraCpst] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0);
  const [Alert, setAlert] = useState({
    severity: null,
    show: null,
    message: "",
    type: null,
  });
  const handleDrawerCotizacion = () => {
    setDrawerCotizacion(true);
    setIsEditingProduct(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const obs = watch("observations");
  const dat = watch("estimatedclossing");
  const oportunityId = router.query.o;

  useEffect(() => {
    getCatalogBy("phases");
    getDataOportunity();
    // getPashes();
    getTemplatesObservations();
    getProductsOportunity();
  }, []);

  useEffect(() => {
    calculateAll();
  }, [products]);

  useEffect(() => {
    validatingDataShipping();
  }, [products]);

  useEffect(() => {
    handleCommission();
  }, [totalWithoutShipping, products, finalTotalAmount, finalTotalExtraCpst]);

  useEffect(() => {
    let totalDiscount = calculatePercentaje(discountPorcent, totalWithoutShipping);
    setTotalDiscount(Number(totalDiscount) + Number(totalDiscountProducts));
    setFinalTotalAmount(totalAmout - totalDiscount);
  }, [discountPorcent, totalWithoutShipping, products]);

  // Sort the array by applying drag
  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   dispatch(setArrayProducts(arrayMoveImmutable(products, oldIndex, newIndex)));
  // };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // setSortableItems(arrayMove(sortableItems, oldIndex, newIndex));
    // setArrayProducts(arrayMove(sortableItems, oldIndex, newIndex));
    dispatch(setArrayProducts(arrayMove(products, oldIndex, newIndex)));
  };

  useEffect(() => {
    handleDiscounts();
  }, [openDiscount, discountPorcent]);

  const handleDiscounts = () => {
    if (discountPorcent > 0) {
      setOpenDiscount(true);
    } else {
      if (!discountPorcent) {
        setOpenDiscount(false);
      } else {
        setOpenDiscount(false);
      }
    }
  };

  const getDataOportunity = async () => {
    setGlobalLoader(true);
    try {
      let params = {
        include: "prospect,phase",
      };
      let response = await api.get(`oportunities/${oportunityId}`, { params });

      setOportunity(response.data);
      setProspect(response.data.prospect);
      setDefaultValuesForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductsOportunity = async () => {
    try {
      let query = {
        oportunityId: oportunityId,
      };
      let params = {
        all: "1",
        count: "1",
        where: JSON.stringify(query),
        include: "product, product.brand,product.category,product.provider,deliverytime",
      };
      let response = await api.get(`productsoportunities`, { params });

      formatProductsOportunity(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  // const getPashes = async () => {
  //   try {
  //     let phases = await commonApi.getPashes();
  //     setPhases(phases?.data?.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getTemplatesObservations = async () => {
    try {
      let templates = await api.get(`observations?where={"ejecutiveId":"${id_user}"}&all=1`);
      setTemplatesObservations(templates.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const setDefaultValuesForm = data => {
    setValue("phase", data.phase);
    setValue("certainty", { label: data.certainty, value: data.certainty });
    setValue("estimatedclossing", dayjs(data.estimatedclossing).format());
    setValue("observations", data.observations);
    setEmailUpdate(userData.email);
    setDiscountPorcent(data.dispercentage);
    setTimeout(() => {
      setGlobalLoader(false);
    }, 1000);
  };
  const handleTemplatesObservations = item => {
    if (item) {
      setValue("observations", "Cargando Plantilla...");
      setTimeout(() => {
        setValue("observations", item.data);
      }, 1000);
    }
  };
  const formatProductsOportunity = products => {
    let formatingProducts = products.map((item, index) => {
      let product = {
        code: item.product.code,
        name: item.product.name,
        index: Number(index),
        quantity: Number(item.quantity),
        iva: parseFloat(item.iva),
        singleiva: calculateSingleIva(item.newprice),
        discount: Number(item.discount),
        discountp: Number(item.dispercentage),
        callamount: Number(item.newprice),
        totalWithoutIva: calculateTotalWithoutIva(item.total, item.iva),
        total: item.total,
        info: item.note,
        code_temporal: generateTemporalId(24),
        product: item.product,
        brand: item.product.brand,
        import: item.product.import,
        isactive: item.product.isactive,
        provider: item.product.provider,
        category: item.product.category,
        storeamount: item.product.storeamount,
        idProduct: item.product.id,
        id: item.id,
        isOportunity: true,
        system: item.product.system,
        customproduct: validateCustomProduct(item.product.code),
        deliveryTime: item?.deliverytime?.deliverytimes || "",
        deliveryTimeId: item?.deliverytimeId || "",
      };

      return product;
    });

    setProductsOportunity(formatingProducts);
    dispatch(setArrayProducts(formatingProducts));
    let filterShipping = formatingProducts.filter(item => item.code === "ENVIO-UA");
    if (filterShipping.length >= 1) {
      setIsHaveShipping(true);
      setDataShipping(filterShipping[0]);
    } else {
      setIsHaveShipping(false);
    }
  };
  const validateCustomProduct = code => {
    if (code === "ENVIO-UA") {
      return true;
    } else {
      return false;
    }
  };
  const handleSelectProduct = (product, index) => {
    setIsEditingProduct(true);
    setOpenQuantity(true);
    dispatch(setProductSelect(product));
  };
  const handleShipping = haveShipp => {
    setOpenEditShipping(true);
    if (haveShipp) {
      setEditingShipping(true);
    } else {
      setEditingShipping(false);
    }
  };
  const calculateSingleIva = price => {
    let singIva = calculatePercentaje(16, price);
    return parseFloat(singIva);
  };
  const calculateTotalWithoutIva = (total, totalIva) => {
    let iva = Number(total) - Number(totalIva);
    return Number(iva);
  };
  const validatingDataShipping = () => {
    let shipping = products.filter(item => item.code === "ENVIO-UA");
    if (shipping.length >= 1) {
      setDataShipping(shipping[0]);
      setIsHaveShipping(true);
    } else {
      setIsHaveShipping(false);
    }
  };
  const calculateAll = () => {
    let discountTotal = products.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.discount;
    }, 0);
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
    setTotalProducts(totalproducts);
    setTotalWithoutShipping(totalWithoutShipping);
    let subtotal = products.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.totalWithoutIva;
    }, 0);
    let totaliva = products.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.iva;
    }, 0);

    setTotalIVA(totaliva);
    // setAmountProduct(total);
    setTotalAmout(total);
    setTotalAmoutSub(totalsub);
    setSubTotal(subtotal);
  };
  const handleCommission = () => {
    let commissions = calculatePercentaje(defaultCommision, finalTotalAmount);
    setAmountComission(commissions);
  };
  const handleDiscount = () => {
    setDrawerDiscount(true);
    let dataDiscount = {
      concept: oportunity.concept,
      ivatotal: Number(totalIVA),
      discount: Number(totalDiscount),
      dispercentage: Number(discountPorcent),
      porcentComission: Number(oportunity.compercentage),
      comission: Number(amountComission),
      total: Number(finalTotalAmount) + Number(finalTotalExtraCpst),
      subtotal: Number(totalAmoutSub),
      prospectId: prospect.id,
      dataProspect: prospect,
      dataOportunity: oportunity,
      totalextracosts: finalTotalExtraCpst,
    };
    setDataOportunityDiscount(dataDiscount);
  };

  useEffect(() => {
    setDataPDF({
      ...dataPDF,
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
        // name: company,
        photo: userData?.grouplogo,
      },
      quoteInfo: {
        folio: oportunity.concept,
        observations: obs,
        date: dayjs().format("DD/MM/YYYY"),
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
      products: products,
      observations: obs == "" ? "Sin Observaciones" : obs,
      footer: {
        showIn: "pageFooter-last",
        data: `*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación
      solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la
      cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando
      el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la
      compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.`,
      },
    });
  }, [
    products,
    prospect,
    totalAmout,
    obs,
    dat,
    discountTotal,
    discountPorcent,
    finalTotalAmount,
    emailUpdate,
    finalTotalExtraCpst,
  ]);

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
    }
  };

  const normalizeProductToAddPut = productsToAdd => {
    let productsToPost = productsToAdd.map((item, index) => {
      let product = {
        id: item.id,
        quantity: item.quantity,
        discount: item.discount,
        dispercentage: item.discountp,
        iva: item.iva,
        total: item.total,
        note: item.info,
        newprice: item.callamount,
        customproduct: item.customproduct ? item?.customproduct : false,
        shownote: false,
        deliverytimeId: item?.deliveryTimeId,
      };
      if (item.idProduct) {
        product.prodId = item.idProduct;
      } else {
        product.prodId = item.id;
        delete product.id;
      }
      return product;
    });
    return productsToPost;
  };

  const normalizeExtraProducts = extraProducts => {
    let formatProducts = extraProducts.map((item, index) => {
      let extraPro = {
        id: item.id,
        name: item.name,
        amount: item.total,
        storeamount: 0,
        callamount: item.callamount,
        code: item.code,
        import: item.import,
        isactive: item.isactive,
        system: item.system,
        description: "mucho texto",
        brandId: "61d4b7c377616e74ffda8025",
        categoryId: "61d4b7c377616e74ffda8025",
        providerId: "61d4b7c377616e74ffda8025",
        producttypeId: "61d4b7c377616e74ffda8025",
        createdAt: "2022-10-20 15:30:41.000+00",
        updatedAt: "2022-10-20 15:30:41.000+00",
      };
      return extraPro;
    });
  };

  const normalizeProductsPDF = productsPDF => {
    let normalizeProduct = productsPDF.map((item, index) => ({
      name: item.name,
      amount: item.callamount,
      quantity: item.quantity,
      code: item.code,
      iva: item.iva,
      total: item.total,
      brand: item?.brand?.name,
      info: item.info,
      description: item.description,
      deliveryTime: item.deliveryTime || "",
    }));
    return normalizeProduct;
  };

  const productsDelete = (productsOportunidad, productsSelec) => {
    let filterProductsOportunity = productsSelec.filter(item => item.isOportunity === true);
    let deleteProducts = productsOportunidad.filter(object1 => {
      return !filterProductsOportunity.some(object2 => {
        return object1.code_temporal === object2.code_temporal;
      });
    });
    let formatToDelete = deleteProducts.map((item, index) => {
      let product = {
        id: item.id,
        prodId: item.idProduct,
      };
      return product;
    });

    return formatToDelete;
  };

  const normalizeOportunity = form => {
    if (templateSelected === 0) {
      handleGlobalAlert("warning", "Selecciona una Plantilla", "basic", dispatch, 6000);
      return;
    }
    if (products.length <= 0)
      return handleGlobalAlert("warning", "Selecciona Minimo un Producto", "basic", dispatch, 6000);

    if (discountPorcent > 3) {
      if (!isDiscountAccept) {
        handleGlobalAlert("warning", "Tu descuento no ha sido aceptado, y no sera aplicado", "basic", dispatch, 6000);
      }
    }

    let newFormatOportunity = {
      estimatedclossing: dayjs(form.estimatedclossing).startOf("day").add(1, "millisecond").toISOString(),
      amount: parseFloat(finalTotalAmount + finalTotalExtraCpst),
      certainty: Number(form.certainty.value),
      comission: Number(amountComission),
      quantity: Number(totalProducts),
      discount: Number(totalDiscount),
      dispercentage: Number(discountPorcent),
      compercentage: Number(defaultCommision),
      observations: form.observations,
      noshippingtotal: Number(finalTotalExtraCpst),
      totalextracosts: Number(finalTotalExtraCpst),
      subtotal: Number(finalTotalAmount),
      totaliva: Number(totalIVA),
      phaseId: form.phase.id,
    };
    if (openDiscount === true) {
      newFormatOportunity.typediscounts = 2;
    } else {
      let exist = products.filter((item, index) => item.discount !== 0);
      if (exist.length >= 1) {
        newFormatOportunity.typediscounts = 3;
      } else {
        newFormatOportunity.typediscounts = 1;
      }
    }
    let extraProducts = products.filter((item, index) => item?.code === "ENVIO-UA");
    let newProducts = products.filter((item, index) => item?.isOportunity === undefined);
    let updateProducts = products.filter((item, index) => item?.isOportunity === true);
    newFormatOportunity.concept = oportunity.concept;
    newFormatOportunity.prospectId = prospect.id;
    newFormatOportunity.extraproducts = normalizeExtraProducts(extraProducts);
    newFormatOportunity.delproducts = productsDelete(productsOportunity, products);
    newFormatOportunity.addproducts = normalizeProductToAddPut(newProducts);
    newFormatOportunity.putproducts = normalizeProductToAddPut(updateProducts);
    let resextracost = {
      totalcost: 0,
      shipping: 0,
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
      oportunityId: oportunityId,
    };

    updateOportunity(newFormatOportunity, resextracost);
  };

  const updateOportunity = async (dataOportunity, resextracost) => {
    setIsUpdatingOportunity(true);
    try {
      let response = await api.put(`oportunities/goals/${oportunityId}`, dataOportunity);
      createPDF();
      createTrackingUpdate();
      handleGlobalAlert("success", "Oportunidad - Datos Actualizados", "basic", dispatch, 6000);
      setTimeout(() => {
        router.push({
          pathname: "/oportunidades/[prospecto]",
          query: {
            prospecto: prospect.id,
          },
        });
        setIsUpdatingOportunity(false);
      }, 2000);
    } catch (error) {
      handleGlobalAlert("error", "Oportunidad - Ocurrio un Error al Actualizar", "basic", dispatch, 6000);
      setIsUpdatingOportunity(false);
      console.log(error);
    }
  };

  const createPDF = () => {
    let user = id_user;
    let group = userData.groupId;
    let company = userData.companyId;
    const form = new FormData();
    let dataBody = dataPDF;
    dataBody.products = normalizeProductsPDF(dataBody.products);
    let response =
      id_companys === "yGDxrTdf9six3E29yxVWc8MF" || id_companys === "UFN6npxl4BkkbVACy66EcEuU"
        ? makeTemplate(8, dataBody)
        : makeTemplate(templateSelected, dataBody);
    form.append("name", oportunity.concept);
    form.append("data", response);
    form.append("company", company);
    form.append("group", group);
    form.append("ejecutive", user);

    api
      .post("convert/pdf", form)
      .then(responsePDFURL => {
        api
          .put(`oportunities/goals/${oportunityId}`, { quoteurl: responsePDFURL.data.url })
          .catch(error => console.log(error));
        api
          .post(
            "convert/pdfbuffer",
            {
              pdfurl: URL_SPACE + responsePDFURL.data.url,
            },
            {
              responseType: "blob",
            }
          )
          .then(responsePDFSAVE => {
            const pdfBlob = new Blob([responsePDFSAVE.data], {
              type: "application/pdf;charset=utf-8",
            });
            saveAs(pdfBlob, `${oportunity.concept}.pdf`);
            cleanData();
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };

  const cleanData = () => {
    dispatch(setArrayProducts([]));
  };

  const createTrackingUpdate = async () => {
    try {
      let bodyNewTracking = {
        prospectId: prospect.id,
        status: "2",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: oportunity.id,
        reason: `Seguimiento Automático - Actualización de Información`,
        observations: `Se Actualizan los Datos de la Cotización, el dia ${dayjs().format("DD MMMM YYYY - HH:mm A")}`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let response = await api.post(`trackings`, bodyNewTracking);
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfExistDiscount = item => {
    let exist = item.filter((item, index) => item.discount !== 0);

    if (exist.length >= 1) {
      return true;
    }

    return false;
  };

  return (
    <MainLayout>
      <StyleEdit>
        <Head>Editar Cotización</Head>
        {/* <SideBar open={open} setOpen={setOpen} />
        <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="contentEdit">
            <div className="contentEdit__header">
              <IconButton onClick={() => router.back()}>
                <ArrowBack className="icon" />
              </IconButton>
              <p className="title">Editar Cotización</p>
            </div>
            {globalLoader ? (
              <div className="ctr_load">
                <div className="ctr_load__img">
                  <img src="/load.png" />
                </div>
                <div className="ctr_load__load">
                  <p>Cargando</p>
                  <LinearProgress color="primary" />
                </div>
              </div>
            ) : (
              <div className="contentEdit__body">
                <form onSubmit={handleSubmit(normalizeOportunity)}>
                  <Grid container={true} spacing={3} className="oportunity_data">
                    <Grid item md={12} sm={12} xs={12}>
                      <p className="title">Datos de la Oportunidad</p>
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Concepto</p>
                      <p className="subtitle">{oportunity.concept}</p>
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Monto Total</p>
                      <NumberFormat
                        value={formatNumber(finalTotalAmount + finalTotalExtraCpst)}
                        displayType="text"
                        prefix="$"
                        thousandSeparator={true}
                        className="subtitle"
                        decimalScale={2}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Porcentaje de la Comisión</p>
                      <NumberFormat
                        value={oportunity.compercentage}
                        displayType="text"
                        prefix="%"
                        thousandSeparator={true}
                        className="subtitle"
                        decimalScale={2}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Comisión Total</p>
                      <NumberFormat
                        value={amountComission}
                        displayType="text"
                        prefix="$"
                        thousandSeparator={true}
                        className="subtitle"
                        decimalScale={2}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p
                        className="title"
                        onClick={() => {
                          handleDiscounts();
                        }}
                      >
                        Descuento %
                        {isDiscountAccept ? (
                          <Tooltip title="Descuento Aceptado" arrow={true} TransitionComponent={Zoom}>
                            <LockOpen className="iconDiscount accept" onClick={handleDiscount} />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title="Solicitar Permiso si el Descuento es Mayor al Permitido"
                            arrow={true}
                            TransitionComponent={Zoom}
                          >
                            <Lock className="iconDiscount dennied" onClick={handleDiscount} />
                          </Tooltip>
                        )}
                      </p>

                      <NumberFormat
                        disabled={checkIfExistDiscount(products)}
                        value={discountPorcent}
                        displayType="display"
                        prefix="%"
                        className="displayText"
                        decimalScale={0}
                        placeholder="Ingresa un Porcentaje"
                        allowNegative={false}
                        onValueChange={e => setDiscountPorcent(e.value)}
                      />

                      {!isDiscountAccept && <Fade in={discountPorcent > 3 ? true : false}>{AlertDisc()}</Fade>}
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Fase</p>
                      <Controller
                        name="phase"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="select"
                            placeholder="Selecciona una Fase"
                            options={phases.results}
                            getOptionValue={option => option["id"]}
                            getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                            styles={{
                              menu: provided => ({ ...provided, zIndex: 9999 }),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Certeza</p>
                      <Controller
                        name="certainty"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="select"
                            placeholder="Selecciona una Porcentaje"
                            options={porcents}
                            getOptionLabel={option => `${option.label}%`}
                            styles={{
                              menu: provided => ({ ...provided, zIndex: 9999 }),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12} className="item">
                      <p className="title">Fecha Estimada de Cierre</p>
                      <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
                        <Controller
                          name="estimatedclossing"
                          control={control}
                          defaultValue={new Date()}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <KeyboardDatePicker
                              {...field}
                              disableToolbar
                              format="DD/MM/YYYY"
                              views={["year", "month", "date"]}
                              margin="none"
                              id="date-picker-inline"
                              className="date"
                              size="small"
                              InputProps={{ disableUnderline: true, readOnly: true }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          )}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="item">
                      <p className="title">Observaciones Generales</p>
                      <Select
                        placeholder="Selecciona una Plantilla"
                        className="select"
                        styles={{
                          menu: provided => ({ ...provided, zIndex: 9999 }),
                        }}
                        options={templatesObservations}
                        getOptionValue={item => item["id"]}
                        getOptionLabel={item => item["name"]}
                        onChange={handleTemplatesObservations}
                        isClearable={true}
                        isSearchable={true}
                      />
                      <textarea
                        className="textarea"
                        {...register("observations", { required: false })}
                        placeholder="Selecciona una Plantilla o Ingresa una Observación Manualmente"
                      />
                    </Grid>
                  </Grid>
                  <div className="oportunity_products">
                    <div className="buttons">
                      <Button
                        startIcon={<LocalShipping />}
                        className="addShipping"
                        onClick={() => handleShipping(isHaveShipping)}
                      >
                        {isHaveShipping ? "Editar Envió" : "Agregar Envió"}
                      </Button>
                      <Button startIcon={<Add />} className="addProduct" onClick={handleDrawerCotizacion}>
                        Agregar Producto
                      </Button>
                    </div>
                    <TableProducts>
                      <div className="ctr_table">
                        <thead className="ctr_table__head">
                          <tr className="ctr_table__head__tr">
                            <th className="title fix ">
                              <div className="ctr_title">
                                <p>Código</p>
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
                            <th className="title">
                              <div className="ctr_title">
                                <p>Acciones</p>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <SortableContainter2
                          items={products}
                          setArrayProducts={setArrayProducts}
                          onSortEnd={onSortEnd}
                          handleSelectProduct={handleSelectProduct}
                          deleteItem={deleteItem}
                        />
                      </div>

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
                  </div>
                  <div className="oportunity_buttons">
                    <Button className="buttonCancelChanges" onClick={() => router.back()}>
                      Cancelar
                    </Button>
                    <Button className="buttonSaveChanges" type="submit">
                      Guardar Cambios
                    </Button>
                    <Button onClick={handleOnClickOpenPreview} className="buttonTemplate">
                      Seleccionar Plantilla
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <DrawerCotizacion
          width={"60%"}
          show={drawerCotizacion}
          producto={producto}
          setProducto={setProducto}
          discountTotal={discountTotal}
          closeDrawer={() => setDrawerCotizacion(!drawerCotizacion)}
          ShowAlert={ShowAlert}
          setAlert={setAlert}
          openDiscount={openDiscount}
          setOpenDiscount={setOpenDiscount}
        />
        <QuantityModal
          editQuantity={isEditingProduct}
          setIsEditingProduct={setIsEditingProduct}
          setOpen={setOpenQuantity}
          open={openQuantity}
          setAlert={setAlert}
          openDiscount={openDiscount}
          setOpenDiscount={setOpenDiscount}
        />

        <DrawerSelectTemplate
          templateSelected={templateSelected}
          setTemplateSelected={setTemplateSelected}
          data={dataPDF}
          open={openPdf}
          setMailupdate={setEmailUpdate}
          emailUpdate={emailUpdate}
          closeDrawer={() => setOpenPdf(!openPdf)}
          totalIVA={totalIVA}
        />

        <ModalExtraProduct
          itemSelected={dataShipping}
          setItemSelected={setVariablePrueba}
          isEditing={editingShipping}
          setIsEditing={setEditingShipping}
          setOpen={setOpenEditShipping}
          open={openEditShipping}
        />

        <DiscountPermission
          open={drawerDiscount}
          close={() => setDrawerDiscount(false)}
          dataDiscount={dataOportunityDiscount}
          isDiscountAccept={isDiscountAccept}
          setIsDiscountAccept={setIsDiscountAccept}
          prospect={prospect}
          oportunity={oportunity}
        />

        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
        {isUpdatingOportunity && <LoaderCompleteScreen />}
      </StyleEdit>
    </MainLayout>
  );
}
const porcents = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "40",
    value: 40,
  },
  {
    label: "50",
    value: 50,
  },
  {
    label: "60",
    value: 60,
  },
  {
    label: "70",
    value: 70,
  },
  {
    label: "80",
    value: 80,
  },
  {
    label: "90",
    value: 90,
  },
  {
    label: "100",
    value: 100,
  },
];

const AlertDisc = () => {
  return (
    <AlertStyle>
      <ErrorOutline className="icon" />
      <p className="titleAlert">Se requiere permiso para Aplicar este Descuento</p>
    </AlertStyle>
  );
};

import styled, { css } from "styled-components";
import SortableContainter2 from "../../../components/UI/atoms/SortableContainer2";
import MainLayout from "../../../components/MainLayout";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";
const StyleEdit = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .contentEdit {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      &__header {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .title {
          font-size: 20px;
          font-weight: 500;
        }
        .icon {
          height: 25px;
          width: 25px;
          border-radius: 50px;
          border-width: 0px;
          background-color: #407aff;
          color: #fff;
        }
      }
      &__body {
        /* border: 1px solid; */
        .oportunity_data {
          .title {
            font-size: 15px;
          }
          .item {
            .title {
              font-size: 13.5px;
            }
            .subtitle {
              font-size: 15px;
              font-weight: 500;
            }
            .textarea {
              width: 100%;
              margin-top: 8px;
              resize: vertical;
              padding: 5px;
              border: 1px solid #bebebe;
              font-size: 13px;
              border-radius: 5px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
              outline: none;
              &:hover {
                cursor: default;
              }
            }
            .toUpperCase {
              text-transform: capitalize;
            }
            .select {
              font-size: 13px;
            }
            .date {
              display: flex;
              align-items: center;
              margin-top: 6px;
              font-size: 10px;
              width: 70%;
              margin-top: -1px;
              border-radius: 5px;
              padding: 4px;
              border: 1px solid #dcdcdc;
            }
            .displayText {
              border: 1px solid #dcdcdc;
              height: 38px;
              padding: 10px;
              outline: none;
            }
            .iconDiscount {
              font-size: 18px;
              margin-bottom: -3px;
              transition: 0.3s;
              margin-left: 7px;
              &:hover {
                transform: translateY(-2px);
                cursor: pointer;
              }
            }
            .accept {
              color: green;
            }
            .dennied {
              color: red;
            }
          }
        }
        .oportunity_products {
          width: 100%;
          .buttons {
            display: flex;
            justify-content: space-between;
            margin: 40px 0px;
            .addProduct {
              border: 1px solid #405189;
              color: #405189;
              text-transform: capitalize;
              font-size: 12px;
              &:hover {
                background-color: #405189;
                color: #fff;
              }
            }
            .addShipping {
              border: 1px solid #405189;
              color: #405189;
              text-transform: capitalize;
              font-size: 12px;
              &:hover {
                background-color: #405189;
                color: #fff;
              }
            }
          }
        }
        .oportunity_buttons {
          display: flex;
          flex-direction: row-reverse;
          .buttonTemplate {
            text-transform: capitalize;
            color: #405189;
            border: 1px solid #405189;
            border-radius: 8px;
            font-size: 12px;
            &:hover {
              background-color: #405189;
              color: #fff;
            }
          }
          .buttonSaveChanges {
            text-transform: capitalize;
            color: #fff;
            background-color: #405189;
            font-size: 12px;
            border-radius: 8px;
            margin-left: 10px;
          }

          .buttonCancelChanges {
            text-transform: capitalize;
            color: #fff;
            background-color: red;
            font-size: 12px;
            border-radius: 8px;
            margin-left: 10px;
          }
        }
      }
      .ctr_load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 10%;
        /* height: 400px; */
        &__img {
          width: 150px;
          animation: slide_img 3s infinite;
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        &__load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 30px;
          width: 200px;
          p {
            text-align: center;
            font-weight: bold;
          }
        }
        @keyframes slide_img {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      }
    }
  }
`;
const scroll = css`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
`;
export const TableProducts = styled.div`
  width: 100%;
  .totalcontainer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    &__items {
      padding: 10px;
    }
    &__item {
      display: flex;
      .text {
        margin-right: 10px;
        width: 200px;
      }
      .bold {
        font-weight: bold;
      }
    }
  }
  overflow: auto;
  margin-bottom: 20px;
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  border-radius: 9px;
  max-height: 70vh;
  table {
    width: 100%;
    border-spacing: 0;
    transition: all 0.3s ease;
    ${scroll};
  }
  .ctr_table {
    width: 100%;
    border-spacing: 0;
    margin: auto;
    &__head {
      width: 100%;

      position: sticky;
      top: 0;
      z-index: 50;
      &__tr {
        width: 100%;
        background-color: #dce1f6;
        padding: 5px 10px;
        height: 40px;
        .fixed {
          width: 100%;
          padding: 3px 5px;
          background-color: #405189;
          color: #fff;
          height: inherit;
        }
        .fix {
          position: sticky;
          left: 0;
          top: 0;
          background-color: #dce1f6;
        }
        .fixedlast {
          position: sticky;
          right: 0;
          top: 0;
          background: #dce1f6;
          flex-direction: row;
          align-items: center;
          padding: 3px 5px;
          min-width: 10px;
          height: inherit;
          width: 40px;
          max-width: 80px;
        }
        .title {
          text-transform: capitalize;
          padding: 0 10px;
          .ctr_title {
            display: flex;
            align-items: center;
            width: max-content;
            min-width: 100px;
          }
        }
      }
    }
    &__body {
      width: 100%;
      .row {
        width: 100%;
        background: #fff;
        font-weight: bold;
        color: #2c2c2c;
        transition: all 0.3s ease;
        min-height: 50px;
        .fixed {
          position: sticky;
          left: 0;
          background: #fff;
          transition: all 0.3s ease;
        }
        .fixedlast {
          position: sticky;
          right: 0;
          background: #fff;
          transition: all 0.3s ease;

          svg {
            color: #103c82;
            &:hover {
              color: #a31c24;
            }
          }
        }
        .data {
          font-size: 14px;
          padding: 0 10px;
          cursor: pointer;
          .text {
            display: flex;
            align-items: center;
            svg {
              font-size: 14px;
              margin-right: 5px;
              color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
            }
          }
          .ctr_td {
            display: flex;
            align-items: center;
            min-height: 42px;
          }
        }
        .dataDrag {
          font-size: 14px;
          padding: 0 10px;
          width: 100%;

          cursor: grab;
          .text {
            display: flex;
            align-items: center;
            svg {
              font-size: 14px;
              margin-right: 5px;
              color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
            }
          }
          .ctr_td {
            display: flex;
            align-items: center;
            min-height: 42px;
          }
        }
        .options-td {
          position: sticky;
          right: 0;
          background: #fff;
          transition: all 0.3s ease;
          .options {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #405189;
            opacity: 0.6;
            border-radius: 4px;
            transition: all 0.3s ease;
            &:hover {
              cursor: pointer;
              opacity: 1;
            }
            svg {
              color: #fff;
            }
          }
        }
        &:hover {
          background: #d8dbe6;
          opacity: 0.8;
          color: #000;
          .fixed {
            background: #d8dbe6;
          }

          .fixedlast {
            background: #d8dbe6;
          }
          .options-td {
            background: #d8dbe6;
            .options {
              background: #2c3d72;
              opacity: 1;
            }
          }
        }
      }
      .inpar {
        background: #f3f3f3;
        .fixed {
          background: #f3f3f3;
        }
        .options-td {
          background: #f3f3f3;
        }
      }
    }
    /* } */
  }
  .notFound {
    text-align: center;
    color: #8a8a8a;
    margin: 11px 0px 14px 0px;
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
`;

export const AlertStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .icon {
    color: red;
    font-size: 16px;
    margin-right: 2px;
  }
  .titleAlert {
    color: red;
    font-weight: 500;
    font-size: 12px;
  }
`;
