import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Decimal from "decimal.js";
import "moment/locale/es";
import { Button, Checkbox, Grid, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import {
  Add,
  ArrowBack,
  Cached,
  CalendarToday,
  Close,
  Delete,
  DeleteForever,
  Edit,
  ErrorOutline,
  Info,
  LocalShipping,
  LowPriority,
  Visibility,
} from "@material-ui/icons";
import {
  AlertRequired,
  CalculateAutoStyle,
  ConfirmDeleteProduct,
  EditClientStyled,
  EditProduct,
  MessageOrderStyle,
  RedirectOrderStyle,
  VisualizerDoc,
} from "../../../styles/Clientes/editclient.styled";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, URL_SPACE, api } from "../../../services/api";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import MainLayout from "../../../components/MainLayout";
import useModal from "../../../hooks/useModal";
import ProductsToAdd from "../../../components/ProductsToAdd";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { PreviewProduct } from "../../../components/ProductsToAdd/style";
import { userSelector } from "../../../redux/slices/userSlice";
import { commonSelector } from "../../../redux/slices/commonSlice";
import DrawerSelectTemplate from "../../../components/DrawerSelectTemplate";
import { makeTemplate } from "../../../templates/makeTemplate";
import { createNewTracking } from "../../../redux/slices/trackingSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import useFetchData, { normalizeDataSelect, processResponseArray } from "../../../hooks/useFetchData";

export default function EditClient() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id_user, userData, company: id_companys, groupId } = useSelector(userSelector);
  const oportunityId = router.query.o;
  const { open: openPdf, toggleModal: toggleOpenPdf, closeModal: closePdf } = useModal();
  const { open: openEditProduct, toggleModal: toggleEditProduct, closeModal: closeEditProduct } = useModal();
  const { open: openProductsAdd, toggleModal: toggleProductsAdd, closeModal: closeProductsAdd } = useModal();
  const { open: openConfirmDelete, toggleModal: toggleConfirmDelete, closeModal: closeConfirmDelete } = useModal();
  const { open: openAddShipping, toggleModal: toggleAddShipping, closeModal: closeAddShipping } = useModal();
  const { open: openCalcAutoPay, toggleModal: toggleCalcAutoPay, closeModal: closeCalcAutoPay } = useModal();
  const { open: openVisualizer, toggleModal: toggleVisualizer, closeModal: closeVisualizer } = useModal();
  const { open: openRedirectOrder, toggleModal: toggleRedirectOrder, closeModal: closeRedirectOrder } = useModal();
  const [dataOrder, setDataOrder] = useState(null);
  const [dataOportunity, setDataOportunity] = useState({});
  const [newDataOportunity, setNewDataOportunity] = useState({
    id: oportunityId,
    total: 0,
    subtotal: 0,
    iva: 0,
    commission: 0,
    comissiontype: "",
    noshippingtotal: 0,
    discount: 0,
  });
  const [productDelete, setProductDelete] = useState({});
  const [productEdit, setProductEdit] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [products, setProducts] = useState({
    results: [],
    count: 0,
    backup: [],
  });
  const [payments, setPayments] = useState({
    results: [],
    count: 0,
    backup: [],
  });
  const [isSaveChanges, setIsSaveChanges] = useState(false);
  const [isLoaderEdit, setIsLoaderEdit] = useState(false);
  const [haveShipping, setHaveShipping] = useState(false);
  const [isCanSave, setIsCanSave] = useState(false);
  // preview pdf
  const [templateSelected, setTemplateSelected] = useState(0);
  const [paymentperiodId, setPaymentperiodId] = useState("");
  const [emailUpdate, setMailupdate] = useState("");
  const [dataPreview, setDataPreview] = useState({});
  const [executiveData, setDataExecutive] = useState({});
  // -------------------------
  const todayDate = dayjs().toISOString();
  const todayDateFormatTracking = `${dayjs().format("MMMM")} ${dayjs().format("DD, YYYY")}`;

  const { data: paymentways } = useFetchData("paymentways", processResponseArray, { all: true }, normalizeDataSelect);
  const { data: paymentsacounts } = useFetchData(
    "paymentsacounts",
    processResponseArray,
    { all: true },
    normalizeDataSelect
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getRequestDataOportunity();
    getPayments();
    getRequestDataProducts();
  }, [oportunityId, refetch]);

  useEffect(() => {
    if (products?.results?.length > 0) {
      let validateShipping = products?.results?.find(item => item?.product?.code === "ENVIO-UA");
      validateShipping ? setHaveShipping(true) : setHaveShipping(false);
    }
    calculateTotalsOportunity();
  }, [products, dataOportunity]);

  useEffect(() => {
    validateAllData();
  }, [newDataOportunity, payments.results, products, executiveData]);

  useEffect(() => {
    if (payments.results.length > 0) {
      let periodId =
        payments.results.length > 0 ? payments.results[0].paymentperiodId : paymentsBackup[0].paymentperiodId;
      setPaymentperiodId(periodId);
    }
  }, [payments.results]);

  const showDefaultValues = dataOport => setValue("soldat", dayjs(dataOport.soldat).format("YYYY-MM-DD"));

  //Funciones de obtención de datos de la venta__________
  const getRequestDataOportunity = async () => {
    setIsLoaderEdit(true);
    try {
      let params = {
        include: "prospect,prospect.ejecutive,phase",
      };
      let response = await api.get(`oportunities/${oportunityId}`, { params });
      let dataOport = response.data;
      getDataExecutive(dataOport.prospect.ejecutive.id);
      showDefaultValues(dataOport);
      setDataOportunity(dataOport);
      if (dataOport.isorder) getDataOrder(dataOport.id);
      setNewDataOportunity({ ...newDataOportunity, comissiontype: dataOport.comissiontype });
      setIsLoaderEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getRequestDataProducts = async () => {
    try {
      let query = {
        oportunityId: oportunityId,
      };
      const params = {
        all: 1,
        count: 1,
        where: JSON.stringify(query),
        include: "product,product.brand",
      };
      let response = await api.get("productsoportunities", { params });
      setProducts({
        ...products,
        results: normalizeProduct(response.data.results),
        backup: normalizeProduct(response.data.results),
        count: response.data.count,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDataExecutive = async idExecutive => {
    try {
      let params = {
        include: "group",
      };
      let response = await api.get(`ejecutives/${idExecutive}`, { params });
      setDataExecutive(response.data);
      setMailupdate(response.data.email);
    } catch (error) {
      console.log(error);
    }
  };
  const getPayments = async () => {
    try {
      let query = {
        oportunityId: oportunityId,
      };
      let params = {
        where: JSON.stringify(query),
        include: "oportunity,oportunity.prospect,paymentperiod",
        join: "oportunity,oportunity.prospect,paymentperiod",
        order: "date",
        all: "1",
        count: "1",
      };
      let response = await api.get("salespayments", { params });
      let normalizeBackup = normalizeBackupPayments(response.data.results);
      setPayments({
        ...payments,
        results: response.data.results,
        count: response.data.count,
        backup: normalizeBackup,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //En caso de que la oportunidad tenga pedido este la buscara______
  const getDataOrder = async oportunityId => {
    try {
      let query = {
        oportunityId: oportunityId,
      };
      let params = {
        where: JSON.stringify(query),
        include: "orderstatus",
      };
      let response = await api.get(`orders`, { params });
      if (response.data.results.length > 0) {
        let orderData = response.data.results[0];
        orderData.showAlert = orderData?.orderstatus?.status === 2 ? true : false;
        setDataOrder(orderData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //****************************************** */
  //___________________________________________________

  //Funciones de Calculo de totales_________________________
  const calculateTotalsPayments = (allPayments, identifier) => {
    let totalPayment = new Decimal(0);
    if (!allPayments || allPayments.length <= 0) return 0;
    allPayments.forEach(payment => {
      totalPayment = totalPayment.plus(new Decimal(payment[identifier]));
    });
    return Number(totalPayment);
  };
  const calculateTotalsOportunity = () => {
    let allProducts = [...products.results];
    let totalProducts = new Decimal(0);
    let subtotalProducts = new Decimal(0);
    let ivaProducts = new Decimal(0);
    let totalShipping = new Decimal(0);
    allProducts.forEach(product => {
      totalProducts = totalProducts.plus(new Decimal(product.total));
      ivaProducts = ivaProducts.plus(new Decimal(product.iva));
      if (product.product.code !== "ENVIO-UA") subtotalProducts = subtotalProducts.plus(new Decimal(product.newprice));
      if (product.product.code === "ENVIO-UA") totalShipping = totalShipping.plus(new Decimal(product.total));
    });
    let discount = Number(totalProducts) * (dataOportunity.dispercentage / 100);
    let comission = Number(subtotalProducts) * (dataOportunity.compercentage / 100);
    let newTotal = Number(totalProducts) - Number(discount);
    setNewDataOportunity({
      ...newDataOportunity,
      total: Number(newTotal.toFixed(2)),
      subtotal: Number(subtotalProducts.toFixed(2)),
      commission: Number(comission.toFixed(2)),
      iva: Number(ivaProducts.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      noshippingtotal: Number(totalShipping.toFixed(2)),
    });
  };
  //__________________________________________________

  //Funciones de edición de campos e Información_______________
  const handleDeletePayment = indexProd => {
    let deletePayment = payments.results.filter((item, index) => index !== indexProd);
    setPayments({ ...payments, results: deletePayment, count: deletePayment.length });
    handleGlobalAlert("success", "Pago Eliminado", "basic", dispatch, 6000);
  };

  const validatePayments = payments => {
    return payments.every(payment => {
      if (payment.ispaid === true || payment.ispaid == "true") {
        return payment.paymentwayId !== null && payment.paymentaccountId !== null;
      }
      return true;
    });
  };

  const handleEditPayment = (index, identifier, value) => {
    if (value === undefined || value === null) return;
    let typeOf = typeof value;
    let paymentsEdit = [...payments.results];

    switch (typeOf) {
      case "number":
        paymentsEdit[index][identifier] = value ? value : 0;
        break;
      default:
        if (identifier === "downpayment") {
          let searchDownPayment = paymentsEdit.find(item => item.downpayment === true);
          if (searchDownPayment && value === true) {
            handleGlobalAlert("warning", "Solo se permite un Enganche", "basic", dispatch, 6000);
            return;
          }
        }
        if (identifier === "ispaid" && value) {
          paymentsEdit[index].paidbyId = executiveData.id;
          paymentsEdit[index].paidAt = todayDate;
        }
        if (identifier === "ispaid" && !value) {
          paymentsEdit[index].paymentaccountId = null;
          paymentsEdit[index].paymentwayId = null;
        }

        if (identifier === "paymentaccountId" && value == "null") {
          value = null;
        }

        if (identifier === "paymentwayId" && value == "null") {
          value = null;
        }

        paymentsEdit[index][identifier] = value !== undefined ? value : "";
        break;
    }
    setPayments({ ...payments, results: paymentsEdit });
  };
  const handleEditProduct = (product, position) => {
    product.positionArray = position;
    product.applyIVA = product.iva > 0 ? true : false;
    setProductEdit(product);
    toggleEditProduct();
  };
  const handleDeleteProduct = () => {
    let newProd = products.results.filter((item, index) => index !== productDelete?.index);
    setProducts({ ...products, results: newProd, count: newProd.length });
    closeConfirmDelete();
    handleGlobalAlert("success", "Producto Eliminado!", "basic", dispatch, 6000);
  };
  const handleAddNewPayment = async () => {
    let add = [...payments.results];
    add.push({
      payment: 0,
      comission: 0,
      date: dayjs().startOf("day").add(1, "second").toISOString(),
      observations: "",
      ispaid: false,
      downpayment: false,
      ejecutiveId: executiveData.id,
      oportunityId: oportunityId,
      paymentiva: 0,
      paymentperiodId: paymentperiodId,
    });
    setPayments({ ...payments, results: add, count: add.length });
    handleGlobalAlert("success", "Nuevo Pago Agregado", "basic", dispatch, 6000);
  };
  const validateAllData = () => {
    let validateTotalPayments = new Decimal(calculateTotalsPayments(payments.results, "payment")).eq(
      newDataOportunity.total
    );
    let validateCommissionPayments = new Decimal(calculateTotalsPayments(payments.results, "comission")).eq(
      newDataOportunity.commission
    );
    setDataPreview({
      ...dataPreview,
      ejecutive: {
        name: toUpperCaseChart(executiveData?.title) + " " + toUpperCaseChart(executiveData?.name),
        lastname: toUpperCaseChart(executiveData?.lastname),
        email: emailUpdate,
        phone: executiveData?.phone,
      },
      prospect: {
        name: toUpperCaseChart(dataOportunity?.prospect?.name),
        lastname: toUpperCaseChart(dataOportunity?.prospect?.lastname),
        email: dataOportunity?.prospect?.email,
        phone: dataOportunity?.prospect?.phone,
      },
      quoteInfo: {
        folio: dataOportunity?.concept,
        date: dayjs(dataOportunity.createdAt).format("DD/MM/YYYY"),
        observations: dataOportunity?.observations,
      },
      iva: formatNumber(newDataOportunity.iva),
      discount: formatNumber(newDataOportunity.discount),
      total: formatNumber(newDataOportunity.total),
      subtotal: formatNumber(newDataOportunity.subtotal),
      products: normalizeProductsPreview(products.results),
      observations: dataOportunity?.observations,
      company: {
        photo: executiveData?.group?.grouplogo,
      },
      clientcompany: {
        cityId: dataOportunity?.prospect?.clientcompany?.cityId,
        commercialbusinessId: dataOportunity?.prospect?.clientcompany?.commercialbusinessId,
        companyname: dataOportunity?.prospect?.clientcompany?.companyname,
        createdAt: dataOportunity?.prospect?.clientcompany?.createdAt,
        ejecutiveId: dataOportunity?.prospect?.clientcompany?.ejecutiveId,
        email: dataOportunity?.prospect?.clientcompany?.email,
        entityId: dataOportunity?.prospect?.clientcompany?.entityId,
        id: dataOportunity?.prospect?.clientcompany?.id,
        optionalophone: dataOportunity?.prospect?.clientcompany?.optionalophones,
        phone: dataOportunity?.prospect?.clientcompany?.phone,
        photo: dataOportunity?.prospect?.clientcompany?.photo,
        postalId: dataOportunity?.prospect?.clientcompany?.postalId,
        rfc: dataOportunity?.prospect?.clientcompany?.rfc,
        street: dataOportunity?.prospect?.clientcompany?.street,
        updatedAt: dataOportunity?.prospect?.clientcompany?.updatedAt,
      },
    });
    if (validateTotalPayments && validateCommissionPayments) {
      setIsCanSave(true);
    } else {
      setIsCanSave(false);
    }
  };
  const productsDelete = (productsOportunidad, productsSelec) => {
    let del = productsOportunidad.filter(object1 => {
      return !productsSelec.some(object2 => {
        return object1.id === object2.id;
      });
    });
    let formatToDelete = del.map((item, index) => {
      let product = {
        id: item.id,
        prodId: item.product.id,
      };
      return product;
    });
    return formatToDelete;
  };
  const productsAdd = productsTo => {
    let newProducts = productsTo.filter(item => item.id === undefined);
    return newProducts;
  };
  const productsUpdate = productsTo => {
    let putproducts = productsTo.filter(item => item.id !== undefined);
    return putproducts;
  };
  //____________________________________________

  //Funciones de Actualizacion Final de la venta__________
  const saveChanges = form => {
    //Funcion que sirve para validar los datos de la venta al ser editada
    let formatingData = {};
    let timeNow = dayjs().format("HH:mm:ss");
    let formatingDate = dayjs(form.soldat).format("YYYY-MM-DD");
    formatingData.soldat = dayjs(`${formatingDate} ${timeNow}`).toISOString();
    if (!validatePayments(payments.results)) {
      handleGlobalAlert("warning", "Forma y cuenta de pago son requeridas, en estado pagado", "basic", dispatch);
      return;
    }
    if (!isCanSave)
      return handleGlobalAlert("warning", "Verifica los Montos Totales de los Pagos", "basic", dispatch, 8000);
    if (templateSelected <= 0) {
      handleGlobalAlert("warning", "No ha seleccionado una Plantilla", "basic", dispatch, 6000);
    } else {
      handleRequestUpdateOportunity(formatingData);
    }
  };

  const handleRequestUpdateOportunity = async data => {
    //Funcion que actualiza los datos, pagos y productos al editar la venta
    setIsSaveChanges(true);
    try {
      let bodyUpdate = { ...newDataOportunity };
      bodyUpdate.comission = newDataOportunity.commission;
      bodyUpdate.amount = newDataOportunity.total;
      bodyUpdate.totaliva = newDataOportunity.iva;
      bodyUpdate.soldat = data.soldat;
      bodyUpdate.salespayments = normalizePayments(payments.results);
      bodyUpdate.payments = payments.results.length;
      bodyUpdate.delproducts = productsDelete(products.backup, products.results);
      bodyUpdate.addproducts = productsAdd(products.results);
      bodyUpdate.putproducts = productsUpdate(products.results);
      delete bodyUpdate.commission;
      delete bodyUpdate.total;
      delete bodyUpdate.iva;
      delete bodyUpdate.id;
      let response = await api.put(`oportunities/updatesale/${oportunityId}`, bodyUpdate);
      let bodyNewTracking = {
        prospectId: dataOportunity.prospectId,
        status: "4",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: oportunityId,
        reason: `Seguimiento Automatico`,
        observations: `Venta Actualizada por ${userData.name} ${userData.lastname} el dia ${todayDateFormatTracking}`,
        createdbyId: userData.id,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      dispatch(
        createNewTracking({
          data: bodyNewTracking,
        })
      );
      createPDF(dataPreview);
    } catch (error) {
      handleGlobalAlert("error", "Venta - Ocurrió un Error al Actualizar!", "basic", dispatch, 6000);
      setIsSaveChanges(false);
    }
  };
  const createPDF = dataPDF => {
    // Funcion con la se creara un nuevo pdf, al realizar cambios en la valueContainerCSS, y este se actualizara en la oportunidad
    let user = executiveData.id;
    let group = executiveData.groupId;
    let company = executiveData.companyId;
    const form = new FormData();
    let dataBody = dataPDF;
    dataBody.products = normalizeProductsToSavePDF(products.results);
    let response =
      id_companys === "yGDxrTdf9six3E29yxVWc8MF" || id_companys === "UFN6npxl4BkkbVACy66EcEuU"
        ? makeTemplate(8, dataBody)
        : makeTemplate(templateSelected, dataBody);
    form.append("name", dataOportunity.concept);
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
            handleGlobalAlert("success", "Venta - Venta Actualizada!", "basic", dispatch, 6000);
            saveAs(pdfBlob, `${dataOportunity.concept}.pdf`);
            if (dataOportunity.isorder) {
              setIsSaveChanges(false);
              toggleRedirectOrder();
              setTimeout(() => {
                router.push({
                  pathname: "/pedidos/EditarPedido",
                  query: {
                    pe: dataOrder.id,
                    op: oportunityId,
                  },
                });
              }, [5000]);
            } else {
              router.push({
                pathname: "[prospecto]",
                query: { prospecto: dataOportunity.prospectId },
              });
            }
          })
          .catch(error => {
            console.log(error);
            setIsSaveChanges(false);
          });
      })
      .catch(error => {
        console.log(error);
        setIsSaveChanges(false);
      });
  };
  //______________________________________________
  //Normalizaciones__________________________
  const normalizePayments = allPayments => {
    let newPayments = allPayments.map(item => {
      let payment = {
        comission: item.comission,
        date: item.date,
        downpayment: item.downpayment,
        ejecutiveId: item.ejecutiveId,
        ispaid: item.ispaid,
        observations: item.observations,
        oportunityId: item.oportunityId,
        paidAt: item.paidAt,
        paidbyId: item.paidbyId,
        payment: item.payment,
        paymentiva: item.paymentiva,
        paymentperiodId: item.paymentperiodId,
        paymentaccountId: item.paymentaccountId,
        paymentwayId: item.paymentwayId,
      };
      return payment;
    });
    return newPayments;
  };
  const normalizeProduct = productsnorm => {
    let normalize = productsnorm.map(item => ({
      ...item,
      brand: item.product.brand,
      callamount: item.newprice,
      code: item.product.code,
      name: item.product.name,
    }));
    return normalize;
  };
  const normalizeProductsToSavePDF = allProducts => {
    let normalize = allProducts.map(item => {
      let product = {
        code: item.code,
        quantity: item.quantity,
        brand: item.brand.name,
        note: item.note,
        name: item.name,
        amount: item.newprice,
        iva: item.iva,
        total: item.total,
        info: item.note,
      };
      return product;
    });
    return normalize;
  };
  const normalizeProductsPreview = allProducts => {
    let addInfo = allProducts.map(item => ({ ...item, info: item.note }));
    return addInfo;
  };
  const normalizeBackupPayments = payments => {
    // se le cambian los nombres a los atributos de los pagos porque al editar edita ambos arreglos (backup y los pagos)
    let formatPayments = payments.map(item => {
      let payment = {
        iden: item.id,
        monto: item.payment,
        comision: item.comission,
        fecha: item.date,
        fechap: item.paidAt,
        observacion: item.observations,
        pagado: item.ispaid,
        iva: item.paymentiva,
        enganche: item.downpayment,
        creacion: item.createdAt,
        actual: item.updatedAt,
        oportunidadid: item.oportunityId,
        ejecutivoid: item.ejecutiveId,
        pagadopor: item.paidbyId,
        periodoid: item.paymentperiodId,
        oportunidad: item.oportunity,
        periodo: item.paymentperiod,
      };
      return payment;
    });
    return formatPayments;
  };
  const normalizePaymentToTable = payments => {
    // se regresan los nombres correctos para sus respectivas funciones dentro de la tabla
    let formatPayments = payments.map(item => {
      let payment = {
        id: item.iden,
        payment: item.monto,
        comission: item.comision,
        date: item.fecha,
        paidAt: item.fechap,
        observations: item.observacion,
        ispaid: item.pagado,
        paymentiva: item.iva,
        downpayment: item.enganche,
        createdAt: item.creacion,
        updatedAt: item.actual,
        oportunityId: item.oportunidadid,
        ejecutiveId: item.ejecutivoid,
        paidbyId: item.pagadopor,
        paymentperiodId: item.periodoid,
        oportunity: item.oportunidad,
        paymentperiod: item.periodo,
      };
      return payment;
    });
    return formatPayments;
  };
  //____________________________________________

  return (
    <MainLayout>
      <EditClientStyled>
        <Head>
          <title>CRM JOBS - Editar Venta</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="contentEdit">
            {isLoaderEdit ? (
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
              <>
                <div className="contentEdit__head">
                  <Tooltip title="Regresar" arrow={true}>
                    <IconButton className="button_back" onClick={() => router.back()}>
                      <ArrowBack className="icon" />
                    </IconButton>
                  </Tooltip>
                  <p className="title" onClick={() => console.log("datos de la oportunidad", dataOportunity)}>
                    Editar Venta
                  </p>
                </div>
                <div className="contentEdit__body">
                  <Grid container spacing={2} className="container_dataOportunity">
                    <Grid md={3} item>
                      <p className="title">Concepto</p>
                      <p className="data">{dataOportunity?.concept}</p>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Nombre Cliente</p>
                      <p className="data capitalize">{dataOportunity?.prospect?.fullname}</p>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Fase del Cliente</p>
                      <p className="data">{dataOportunity?.phase?.name}</p>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Monto Total</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="$"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.amount}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">IVA Total</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="$"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.totaliva}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Porcentaje de la Comisión (%)</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="%"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.compercentage}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Comisión Total</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="$"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.comission}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Certeza de Venta (%)</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="%"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.certainty}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Porcentaje del Descuento (%)</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="%"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.dispercentage}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Descuento</p>
                      <NumberFormat
                        thousandSeparator=","
                        prefix="$"
                        className="data"
                        displayType="text"
                        value={dataOportunity?.discount}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Total de Pagos Establecidos</p>
                      <NumberFormat
                        thousandSeparator=","
                        className="data"
                        displayType="text"
                        value={dataOportunity?.payments}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Fecha Estimada de Cierre</p>
                      <p className="data">{dayjs(dataOportunity.estimatedclossing).format("DD/MM/YYYY")}</p>
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <p className="title">
                        Fecha de Venta {errors.soldat && <AlertRequired>*{errors.soldat?.message}</AlertRequired>}
                      </p>
                      <input type="date" className="date" {...register("soldat", { required: "Requerido" })} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="title">Formato de la Cotización</p>
                      <Button
                        className="button_visualizer"
                        onClick={() => toggleVisualizer()}
                        endIcon={<Visibility className="icon_see" />}
                      >
                        Ver Cotización
                      </Button>
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <p className="title">Observaciones al Cotizar</p>
                      <textarea className="text_observations" value={dataOportunity.observations} readOnly={true} />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <p className="title">Observaciones en la Venta</p>
                      <textarea
                        className="text_observations"
                        value={dataOportunity.generalobservations}
                        readOnly={true}
                      />
                    </Grid>
                  </Grid>
                  <div className="products_oportunity">
                    <div className="products_header">
                      <p className="title">
                        Productos <span className="count_p">({products?.results?.length})</span>
                      </p>
                      <Button
                        className="button_restore"
                        startIcon={<Cached />}
                        onClick={() => {
                          handleGlobalAlert("success", "Productos Restablecidos", "basic", dispatch, 6000);
                          setProducts({ ...products, results: products?.backup });
                        }}
                      >
                        Restaurar Productos
                      </Button>
                    </div>
                    <div className="container_table">
                      <table className="table">
                        <thead className="table__head">
                          <tr className="tr_head">
                            <th className="th align_left hold_scroll">Código</th>
                            <th className="th align_left">Nombre del Producto</th>
                            <th className="th">Cantidad</th>
                            <th className="th">Precio</th>
                            <th className="th">IVA</th>
                            <th className="th">Total</th>
                            <th className="th">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="table__body">
                          {products?.results?.length <= 0 ? (
                            <tr className="empty_products">
                              <td colSpan={7}>
                                <p className="title_empty"> Sin Productos</p>
                              </td>
                            </tr>
                          ) : (
                            products?.results?.map((item, index) => (
                              <tr key={index}>
                                <td className="td align_left hold_scroll">{item?.product?.code}</td>
                                <td className="td align_left">{item?.product?.name}</td>
                                <td className="td weight">
                                  <NumberFormat value={item?.quantity} displayType="text" thousandSeparator="," />
                                </td>
                                <td className="td weight">
                                  <NumberFormat
                                    value={item?.newprice}
                                    displayType="text"
                                    thousandSeparator=","
                                    prefix="$"
                                  />
                                </td>
                                <td className="td weight">
                                  <NumberFormat value={item?.iva} displayType="text" thousandSeparator="," prefix="$" />
                                </td>
                                <td className="td weight">
                                  <NumberFormat
                                    value={item?.total}
                                    displayType="text"
                                    thousandSeparator=","
                                    prefix="$"
                                    decimalScale={2}
                                  />
                                </td>
                                <td className="td">
                                  <IconButton className="bt_edit" onClick={() => handleEditProduct(item, index)}>
                                    <Edit />
                                  </IconButton>
                                  <IconButton
                                    className="bt_edit"
                                    onClick={() => {
                                      let product = item;
                                      product.index = index;
                                      setProductDelete(product);
                                      toggleConfirmDelete();
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="products_totals">
                      <NumberFormat
                        className="total"
                        prefix="Total:  $"
                        displayType="text"
                        thousandSeparator=","
                        defaultValue={0}
                        value={newDataOportunity.total}
                      />
                      <NumberFormat
                        className="total"
                        prefix="IVA:  $"
                        displayType="text"
                        thousandSeparator=","
                        defaultValue={0}
                        value={newDataOportunity.iva}
                      />
                    </div>
                    <div className="buttons_products">
                      <Button className="bt_add" startIcon={<Add />} onClick={() => toggleProductsAdd()}>
                        Agregar Producto
                      </Button>
                      {!haveShipping && (
                        <Button className="bt_shipping" startIcon={<LocalShipping />} onClick={toggleAddShipping}>
                          Agregar Envió
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="payments_oportunity">
                    <p className="title">
                      Pagos <span className="count_p">({payments?.count})</span>
                    </p>
                    <div className="tab_payments">
                      <p className="title_tab">
                        <CalendarToday /> Calendario de Pagos
                      </p>
                      <div className="buttons_tab">
                        <Tooltip title="Agregar Pago" onClick={handleAddNewPayment} arrow={true}>
                          <IconButton className="add_bt">
                            <Add />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Calculo Automático" arrow={true}>
                          <IconButton className="calculate_bt" onClick={toggleCalcAutoPay}>
                            <LowPriority />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="container_payments">
                      <table className="table_payments">
                        <thead className="table_payments__head">
                          <tr>
                            <th />
                          </tr>
                        </thead>
                        <tbody className="table_payments__body">
                          {payments?.results.length <= 0 ? (
                            <tr className="empty_payments">
                              <td colSpan={7}>
                                <p className="title_empty"> Sin Pagos</p>
                              </td>
                            </tr>
                          ) : (
                            payments?.results?.map((item, index) => (
                              <tr className={`payment ${payments?.results.length > 0 && "margin"}`} key={index}>
                                <td>
                                  <p className="title_p">Pago {index + 1}</p>
                                  <NumberFormat
                                    className={`data_p ${!item.id && "new"}`}
                                    value={item.payment}
                                    prefix="$"
                                    thousandSeparator=","
                                    displayType="input"
                                    allowNegative={false}
                                    onValueChange={e => handleEditPayment(index, "payment", e.floatValue)}
                                  />
                                </td>
                                <td>
                                  <p className="title_p">Comisión</p>
                                  <NumberFormat
                                    className={`data_p ${!item.id && "new"}`}
                                    value={item.comission}
                                    prefix="$"
                                    thousandSeparator=","
                                    displayType="input"
                                    allowNegative={false}
                                    onValueChange={e => handleEditPayment(index, "comission", e.floatValue)}
                                  />
                                </td>
                                <td>
                                  <p className="title_p">Fecha</p>
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="DD-MM-YYYY"
                                    id="date-picker-inline"
                                    className={`input_date ${!item.id && "new"}`}
                                    value={item.date}
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                    onChange={date => {
                                      let newValue = date ? dayjs(date).add(1, "second").toISOString() : "";
                                      handleEditPayment(index, "date", newValue);
                                    }}
                                    autoOk={true}
                                    invalidDateMessage={""}
                                  />
                                </td>

                                <td item={true} className="observations" md={3}>
                                  <p className="title_p">Comentarios</p>
                                  <textarea
                                    className={`text_area ${!item.id && "new"}`}
                                    defaultValue={item.observations}
                                    readOnly={false}
                                    onChange={e => handleEditPayment(index, "observations", e.target.value)}
                                    placeholder="Sin Comentarios"
                                  />
                                </td>

                                <td>
                                  <p className="title_p">Forma de Pago</p>
                                  <select
                                    className={`data_p ${!item.id && "new"}`}
                                    name="paymentwayId"
                                    value={item.paymentwayId || ""}
                                    onChange={e => handleEditPayment(index, "paymentwayId", e.target.value)}
                                    disabled={!item.ispaid}
                                  >
                                    <option key={0} value="null">
                                      -
                                    </option>
                                    {paymentways?.map(option => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>

                                <td>
                                  <p className="title_p">Cuenta de Pago</p>
                                  <select
                                    className={`data_p ${!item.id && "new"}`}
                                    name="paymentaccountId"
                                    value={item.paymentaccountId || ""}
                                    onChange={e => handleEditPayment(index, "paymentaccountId", e.target.value)}
                                    disabled={!item.ispaid}
                                  >
                                    <option key={0} value="null">
                                      -
                                    </option>
                                    {paymentsacounts?.map(option => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>

                                <td>
                                  <p className="title_p">Estado de Pago</p>
                                  <Select
                                    styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        width: 150,
                                        fontSize: 14,
                                        height: 43,
                                        borderColor: !item.id ? "#90caf9" : "#dcdcdc",
                                        backgroundColor: !item.id ? "#90caf9" : "#fff",
                                      }),
                                    }}
                                    placeholder="Selecciona una Opción"
                                    options={optioStatusPayment}
                                    value={optioStatusPayment.find(option => option.value == item.ispaid)}
                                    onChange={option => handleEditPayment(index, "ispaid", option.value)}
                                  />
                                </td>
                                <td>
                                  <p className="title_p" onClick={() => console.log("pago", item)}>
                                    Enganche
                                  </p>
                                  <Select
                                    styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        width: 100,
                                        fontSize: 14,
                                        height: 43,
                                        borderColor: !item.id ? "#90caf9" : "#dcdcdc",
                                        backgroundColor: !item.id ? "#90caf9" : "#fff",
                                      }),
                                    }}
                                    placeholder="Selecciona una Opción"
                                    options={optionsDownpayment}
                                    value={optionsDownpayment.find(option => option.value == item.downpayment)}
                                    onChange={option => handleEditPayment(index, "downpayment", option.value)}
                                  />
                                </td>

                                <td>
                                  <IconButton className="bt_delete" onClick={() => handleDeletePayment(index)}>
                                    <DeleteForever />
                                  </IconButton>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="buttons_payments">
                      <Button
                        className="reload_payments"
                        startIcon={<Cached />}
                        onClick={() => {
                          handleGlobalAlert("success", "Pagos Restablecidos", "basic", dispatch, 6000);
                          setPayments({
                            ...payments,
                            results: normalizePaymentToTable(payments.backup),
                            count: payments.backup.length,
                          });
                          setNewDataOportunity({ ...newDataOportunity, comissiontype: dataOportunity.comissiontype });
                        }}
                      >
                        Reiniciar Pagos
                      </Button>
                    </div>
                    <Grid className="totals_payments" container={true}>
                      <Grid className="item_total" item={true} md={12}>
                        <NumberFormat
                          className={`total ${
                            newDataOportunity.total !== calculateTotalsPayments(payments.results, "payment")
                              ? "error"
                              : "success"
                          }`}
                          prefix="Total:  $"
                          displayType="text"
                          thousandSeparator=","
                          defaultValue={0}
                          value={calculateTotalsPayments(payments.results, "payment")}
                        />
                        <NumberFormat
                          className={`com_total ${
                            newDataOportunity.commission !== calculateTotalsPayments(payments.results, "comission")
                              ? "error"
                              : "success"
                          }`}
                          prefix="Comisión Total: $"
                          displayType="text"
                          thousandSeparator=","
                          defaultValue={0}
                          value={calculateTotalsPayments(payments.results, "comission")}
                        />
                      </Grid>
                      <Grid className="item_total margin_top" item={true} md={12}>
                        <p className="totals_title">Totales Esperados</p>
                        <>
                          <NumberFormat
                            className="total"
                            prefix="Total:  $"
                            displayType="text"
                            thousandSeparator=","
                            defaultValue={0}
                            value={newDataOportunity.total}
                          />
                          <NumberFormat
                            className="com_total"
                            prefix="Comisión Total: $"
                            displayType="text"
                            thousandSeparator=","
                            defaultValue={0}
                            value={newDataOportunity.commission}
                          />
                        </>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="contentEdit__footer">
                  <div className="buttons">
                    <Button className="button_template" onClick={() => toggleOpenPdf()}>
                      Selecciona una Plantilla
                    </Button>
                    <Button className="button_cancel" onClick={() => router.back()}>
                      Cancelar
                    </Button>
                    <Button className="button_save" onClick={handleSubmit(saveChanges)}>
                      Guardar
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <VisualizerDoc open={openVisualizer} onClose={closeVisualizer} anchor="right">
          <div className="container">
            <div className="container__head">
              <p className="title">Vista Cotización</p>
              <IconButton onClick={closeVisualizer} className="button_close">
                <Close className="icon" />
              </IconButton>
            </div>
            <div className="container__body">
              <iframe width="100%" height="800px" src={dataOportunity.quoteurl} />
            </div>
          </div>
        </VisualizerDoc>
        <ProductToEdit
          open={openEditProduct}
          onClose={closeEditProduct}
          productEdi={productEdit}
          setProduct={setProductEdit}
          setAllProducts={setProducts}
          allProducts={products}
        />
        <ProductsToAdd
          open={openProductsAdd}
          close={closeProductsAdd}
          setAllProducts={setProducts}
          allProducts={products}
        />
        <ConfirmDialog
          open={openConfirmDelete}
          close={closeConfirmDelete}
          product={productDelete}
          handleDelete={handleDeleteProduct}
        />
        <CalculateAutoPayments
          open={openCalcAutoPay}
          close={closeCalcAutoPay}
          payments={payments}
          setPayments={setPayments}
          oportunity={newDataOportunity}
          setOportunity={setNewDataOportunity}
          executive={executiveData}
        />
        <DrawerSelectTemplate
          templateSelected={templateSelected}
          setTemplateSelected={setTemplateSelected}
          data={dataPreview}
          open={openPdf}
          setMailupdate={setMailupdate}
          emailUpdate={emailUpdate}
          closeDrawer={closePdf}
          totalIVA={newDataOportunity.iva}
        />
        <AddShipping
          open={openAddShipping}
          close={closeAddShipping}
          products={products}
          setProducts={setProducts}
          executive={executiveData}
        />
        <MessageStatusOrder open={dataOrder ? dataOrder.showAlert : false} />
        <RedirectEditOrder open={openRedirectOrder} close={closeRedirectOrder} />
        {isSaveChanges && <LoaderCompleteScreen />}
      </EditClientStyled>
    </MainLayout>
  );
}

function ProductToEdit({ open, onClose, productEdi, setProduct, setAllProducts, allProducts }) {
  const dispatch = useDispatch();
  const [isCanAdd, setIsCanAdd] = useState(true);
  useEffect(() => {
    let subtotal = productEdi.newprice * productEdi.quantity;
    let iva = productEdi.applyIVA ? subtotal * 0.16 : 0;
    let total = subtotal + iva - productEdi.discount;
    setProduct({
      ...productEdi,
      total: Number(total.toFixed(2)),
      iva: Number(iva.toFixed(2)),
    });
    if (productEdi.quantity > 0 && productEdi.newprice > 0) {
      setIsCanAdd(true);
    } else {
      setIsCanAdd(false);
    }
  }, [productEdi.quantity, productEdi.newprice, productEdi.dispercentage, productEdi.applyIVA]);

  const handleEdit = saveChanges => {
    let updateProducts = [...allProducts.results];
    if (saveChanges) {
      updateProducts[productEdi.positionArray] = productEdi;
      handleGlobalAlert("success", "Producto Editado", "basic", dispatch, 6000);
    }
    setAllProducts({ ...allProducts, results: updateProducts });
    onClose();
  };
  return (
    <EditProduct open={open} onClose={onClose}>
      <div className="edit_container">
        <div className="edit_container__head">
          <p className="title" onClick={() => console.log("product", productEdi)}>
            Editar Producto
          </p>
        </div>
        <div className="edit_container__body">
          <Grid container={true} className="data_product" spacing={1}>
            <Grid item={true} md={12}>
              <p className="title">Nombre</p>
              <input className="data_input" type="text" value={productEdi?.product?.name} disabled={true} />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Código</p>
              <input className="data_input" type="text" value={productEdi?.product?.code} disabled={true} />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Clasificación</p>
              <input
                className="data_input"
                type="text"
                value={productEdi?.product?.import ? "Importado" : "Nacional"}
                disabled={true}
              />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Precio Unitario</p>
              <NumberFormat
                className="data_input"
                value={productEdi?.newprice}
                displayType="input"
                thousandSeparator=","
                prefix="$"
                onValueChange={e => setProduct({ ...productEdi, newprice: e.floatValue ? e.floatValue : 0 })}
              />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Cantidad</p>
              <NumberFormat
                className="data_input"
                value={productEdi?.quantity}
                displayType="input"
                thousandSeparator=","
                decimalScale={0}
                onValueChange={e => setProduct({ ...productEdi, quantity: e.floatValue ? e.floatValue : 0 })}
              />
            </Grid>

            <Grid item={true} md={6}>
              <p className="title">Descuento del producto (%)</p>
              <NumberFormat
                className="data_input"
                value={productEdi?.dispercentage}
                displayType="input"
                disabled={productEdi?.product?.import || productEdi?.productEdi?.code === "ENVIO-UA" ? false : true}
                thousandSeparator=","
                prefix="% "
                onValueChange={e => {
                  let subtotal = productEdi.newprice * productEdi.quantity;
                  let calDisc = e.floatValue ? e.floatValue / 100 : 0;
                  let cantDisc = e.floatValue ? subtotal * calDisc : 0;
                  setProduct({
                    ...productEdi,
                    dispercentage: e.floatValue ? e.floatValue : 0,
                    discount: Number(cantDisc.toFixed(2)),
                  });
                }}
              />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">IVA</p>
              <Checkbox
                disabled={productEdi?.product?.import || productEdi?.product?.code === "ENVIO-UA" ? false : true}
                defaultChecked={productEdi.applyIVA}
                onChange={e => setProduct({ ...productEdi, applyIVA: e.target.checked })}
              />
            </Grid>
            <Grid item={true} md={12}>
              <p className="title">Observaciones del Producto</p>
              <textarea
                className="data_area"
                value={productEdi?.note}
                readOnly={false}
                onChange={e => setProduct({ ...productEdi, note: e.target.value })}
              />
            </Grid>
          </Grid>
        </div>
        <div className="edit_container__footer">
          <Button className="bt save" onClick={() => handleEdit(true)} disabled={!isCanAdd}>
            Guardar
          </Button>
          <Button className="bt cancel" onClick={() => handleEdit(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    </EditProduct>
  );
}
function RedirectEditOrder({ open, close }) {
  return (
    <RedirectOrderStyle open={open} onClose={close}>
      <div className="container_redirect">
        <p className="message">Seras Redirigido a la Vista del Pedido, para Corroborar los datos Actualizados</p>
        <LinearProgress className="progress_bar" />
      </div>
    </RedirectOrderStyle>
  );
}
function ConfirmDialog({ open, close, handleDelete, product }) {
  return (
    <ConfirmDeleteProduct open={open} onClose={close}>
      <div className="container_confirm">
        <div className="container_confirm__header">
          <ErrorOutline className="icon" />
          <p className="title_header">Confirmación Eliminar Producto</p>
        </div>
        <div className="container_confirm__body">
          <p className="cont">
            ¿Confirma el descarte de <span className="product">{`"${product?.product?.name}"`}</span> dentro de la
            venta?
          </p>
          <div className="buttons">
            <Button className="bt_save" onClick={handleDelete}>
              Aceptar
            </Button>
            <Button className="bt_cancel" onClick={close}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </ConfirmDeleteProduct>
  );
}
function AddShipping({ open, close, products, setProducts, executive }) {
  const [productPreview, setProductPreview] = useState("");
  const [isCanAdd, setIsCanAdd] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    calculateAll();
  }, [
    productPreview?.quantity,
    productPreview?.callamount,
    productPreview?.discountPercentage,
    productPreview?.applyIVA,
  ]);

  useEffect(() => {
    if (open) setProductPreview(shippData);
  }, [open]);

  const calculateAll = () => {
    let subtotal = productPreview?.callamount * productPreview?.quantity;
    let iva = productPreview?.applyIVA ? subtotal * 0.16 : 0;
    let total = subtotal + iva;
    setProductPreview({
      ...productPreview,
      subtotal: Number(subtotal.toFixed(2)),
      total: Number(total.toFixed(2)),
      iva: Number(iva.toFixed(2)),
    });

    if (productPreview?.quantity > 0 && productPreview?.callamount > 0) {
      setIsCanAdd(true);
    } else {
      setIsCanAdd(false);
    }
  };

  const handleAddProduct = () => {
    let newProducs = [...products.results];
    newProducs.push({
      prodId: productPreview?.id,
      quantity: productPreview?.quantity,
      discount: productPreview?.discount,
      iva: productPreview?.iva,
      total: productPreview?.total,
      note: productPreview.info,
      newprice: productPreview?.callamount,
      callamount: productPreview.callamount,
      customproduct: true,
      shownote: false,
      ejecutiveId: executive.id,
      dispercentage: productPreview?.discountPercentage,
      newProduct: true,
      brand: productPreview?.brand,
      code: productPreview?.code,
      name: productPreview?.name,
      product: {
        name: productPreview?.name,
        code: productPreview?.code,
        import: productPreview?.import,
      },
    });
    setProducts({ ...products, results: newProducs });
    handleGlobalAlert("success", "Producto Agregado Correctamente", "basic", dispatch, 6000);
    close();
    setProductPreview();
  };

  return (
    <PreviewProduct open={open} onClose={close}>
      <div className="preview_style">
        <div className="preview_style__header">
          <p className="title">Confirmación de Producto</p>
          <IconButton className="bt_close" onClick={close}>
            <Close />
          </IconButton>
        </div>
        <div className="preview_style__body">
          <Grid className="product_data" container={true} spacing={2}>
            <Grid item={true} md={12}>
              <p className="title">Producto</p>
              <input className="input" value={productPreview?.name} disabled={true} />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Código</p>
              <input className="input" disabled={true} value={productPreview?.code} />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Clasificación</p>
              <input className="input" disabled={true} value={productPreview?.import ? "Importado" : "Nacional"} />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Precio Unitario</p>
              <NumberFormat
                className="input"
                prefix="$"
                thousandSeparator={true}
                decimalScale={2}
                value={productPreview?.callamount}
                onValueChange={e => {
                  setProductPreview({
                    ...productPreview,
                    callamount: e.floatValue ? e.floatValue : 0,
                  });
                }}
              />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Marca</p>
              <input className="input" disabled={true} value={productPreview?.brand?.name} />
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Cantidad</p>
              <NumberFormat
                className="input"
                thousandSeparator=","
                displayType="input"
                allowNegative={false}
                defaultValue={1}
                onValueChange={e => {
                  setProductPreview({
                    ...productPreview,
                    quantity: e.floatValue ? e.floatValue : 0,
                  });
                }}
              />
            </Grid>
            <Grid item={true} md={12}>
              <p className="title">Observaciones de Producto</p>
              <textarea
                className="text_area"
                onChange={e => setProductPreview({ ...productPreview, info: e.target.value })}
              />
            </Grid>
            <Grid className="iva_container" item={true} md={12}>
              <p className="title_iva">IVA</p>
              <Checkbox
                disabled={false}
                defaultChecked={true}
                onChange={e => setProductPreview({ ...productPreview, applyIVA: e.target.checked })}
              />
            </Grid>
            <Grid className="totals_container" item={true} md={12}>
              <NumberFormat prefix="IVA:  $" displayType="text" value={productPreview?.iva} thousandSeparator="," />
              <NumberFormat
                prefix="Subtotal:  $"
                displayType="text"
                value={productPreview?.subtotal}
                thousandSeparator=","
              />
              <NumberFormat prefix="Total:  $" displayType="text" value={productPreview?.total} thousandSeparator="," />
            </Grid>
            <Grid className="buttons_container" item={true} md={12}>
              <Button className={`bt_add ${!isCanAdd && "disabled"}`} disabled={!isCanAdd} onClick={handleAddProduct}>
                Agregar Envio
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </PreviewProduct>
  );
}
function CalculateAutoPayments({ open, close, payments, setPayments, oportunity, setOportunity, executive }) {
  const { getCatalogBy } = useGlobalCommons();
  const dispatch = useDispatch();
  const { paymentperiods } = useSelector(commonSelector);
  const [canCalculate, setCanCalculate] = useState(false);
  const [dataCalculate, setDataCalculate] = useState({
    date: defaultDate,
    periodicity: "",
    periodicityCom: "",
    nopayments: 0,
    comissiontype: "",
    paymentperiodId: "",
  });
  const defaultDate = dayjs().toISOString();
  useEffect(() => {
    if (!open)
      setDataCalculate({
        date: defaultDate,
        periodicity: "",
        periodicityCom: "",
        nopayments: 0,
        comissiontype: "",
      });
  }, [open]);
  useEffect(() => {
    validateData();
  }, [dataCalculate]);

  const validateData = () => {
    if (
      dataCalculate.date &&
      dataCalculate.periodicity &&
      dataCalculate.periodicityCom !== undefined &&
      dataCalculate.nopayments > 0
    ) {
      setCanCalculate(true);
    } else {
      setCanCalculate(false);
    }
  };

  const handleCalculatePayments = () => {
    let paymentsCreate = [];
    let totalPayment = oportunity.total.toFixed(2) / dataCalculate.nopayments;
    let totalComission =
      typeof dataCalculate.periodicityCom === "number"
        ? oportunity?.commission.toFixed(2)
        : oportunity?.commission.toFixed(2) / dataCalculate.nopayments;
    for (let i = 0; i < dataCalculate.nopayments; i++) {
      let paymentBody = {
        payment: Number(totalPayment.toFixed(2)),
        date: calculateDatePayment(i),
        observations: "",
        ispaid: false,
        oportunityId: oportunity.id,
        downpayment: false,
        ejecutiveId: executive.id,
        paymentiva: 0,
        paymentperiodId: dataCalculate.paymentperiodId,
      };
      if (typeof dataCalculate.periodicityCom === "number") {
        paymentBody.comission = dataCalculate.periodicityCom === i ? Number(Number(totalComission).toFixed(2)) : 0;
      } else {
        paymentBody.comission = Number(Number(totalComission).toFixed(2));
      }
      paymentsCreate.push(paymentBody);
    }
    validateTotals(paymentsCreate);
  };

  const validateTotals = newpayments => {
    let countPayments = newpayments.length;
    let totalPayment = new Decimal(0);
    let totalComission = new Decimal(0);
    newpayments.forEach((payment, index) => {
      if (index !== countPayments - 1) {
        totalComission = totalComission.plus(new Decimal(payment.comission));
        totalPayment = totalPayment.plus(new Decimal(payment.payment));
      }
    });
    let newTotal = Number(oportunity.total) - Number(totalPayment);
    let newComission = Number(oportunity.commission) - Number(totalComission);
    newpayments[countPayments - 1].payment = Number(Number(newTotal).toFixed(2));
    newpayments[countPayments - 1].comission = Number(Number(newComission).toFixed(2));
    handleGlobalAlert("success", "Pagos Generados Correctamente", "basic", dispatch, 6000);
    setPayments({ ...payments, results: newpayments, count: countPayments });
    setOportunity({ ...oportunity, comissiontype: dataCalculate.comissiontype });
    close();
  };

  const calculateDatePayment = countAdd => {
    let newDate = "";
    switch (dataCalculate.periodicity) {
      case "bimestral":
        newDate = dayjs(dataCalculate.date)
          .add(2 * countAdd, "month")
          .startOf("day")
          .add(1, "second")
          .toISOString();
        break;
      case "trimestral":
        newDate = dayjs(dataCalculate.date)
          .add(3 * countAdd, "month")
          .startOf("day")
          .add(1, "second")
          .toISOString();
        break;
      case "semestral":
        newDate = dayjs(dataCalculate.date)
          .add(6 * countAdd, "month")
          .startOf("day")
          .add(1, "second")
          .toISOString();
        break;
      case "anual":
        newDate = dayjs(dataCalculate.date).add(countAdd, "year").startOf("day").add(1, "second").toISOString();
        break;
      case "semanal":
        newDate = dayjs(dataCalculate.date).add(countAdd, "week").startOf("day").add(1, "second").toISOString();
        break;
      case "mensual":
        newDate = dayjs(dataCalculate.date).add(countAdd, "month").startOf("day").add(1, "second").toISOString();
        break;
      default:
        newDate = dayjs(dataCalculate.date).startOf("day").add(1, "second").toISOString();
        break;
    }
    return newDate;
  };

  const handleFocus = event => event.target.select();

  return (
    <CalculateAutoStyle open={open} onClose={close}>
      <div className="calculate_container">
        <div className="calculate_container__header">
          <p className="title_haeder">Forma Automatica</p>
        </div>
        <div className="calculate_container__body">
          <Grid className="calc_info" container={true} spacing={2}>
            <Grid className="item_pay" item={true} md={12}>
              <p className="title_item">Fecha de Inicio</p>
              <KeyboardDatePicker
                className="date_pay"
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                id="date-picker-inline"
                value={dataCalculate?.date}
                InputProps={{ disableUnderline: true, readOnly: true }}
                onChange={date => {
                  let validate = date ? dayjs(date).add(1, "second").toISOString() : "";
                  setDataCalculate({ ...dataCalculate, date: validate });
                }}
                autoOk={true}
                invalidDateMessage={""}
              />
            </Grid>
            <Grid className="item_pay" item={true} md={12}>
              <p className="title_item">Periocidad de Pago</p>
              <Select
                className="select_pay"
                placeholder="Selecciona una Opción..."
                onMenuOpen={() => getCatalogBy("paymentperiods")}
                isLoading={paymentperiods.isFetching}
                options={paymentperiods.results.filter(item => item.name !== "rango")}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                onMenuOpen={() => getCatalogBy("paymentperiods")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={paymentperiods.isFetching}
                onChange={option =>
                  setDataCalculate({
                    ...dataCalculate,
                    paymentperiodId: option.id,
                    periodicity: option.name,
                    periodicityCom: option.name === "pago único" ? 0 : dataCalculate.periodicityCom,
                    comissiontype: option.name === "pago único" ? "primer pago" : dataCalculate.comissiontype,
                    nopayments: option.name === "pago único" ? 1 : dataCalculate.nopayments,
                  })
                }
                noOptionsMessage={() => "Sin Opciones"}
                maxMenuHeight={150}
              />
            </Grid>

            <Grid className="item_pay" item={true} md={12}>
              <p className="title_item">Periocidad de Comisión</p>
              <Select
                className="select_pay"
                isDisabled={dataCalculate.periodicity == "pago único" ? true : false}
                placeholder="Selecciona una Opción..."
                options={optionsPeriodicity}
                value={optionsPeriodicity.find(item => item.value === dataCalculate?.periodicityCom)}
                onChange={option =>
                  setDataCalculate({ ...dataCalculate, periodicityCom: option.value, comissiontype: option.label })
                }
                noOptionsMessage={() => "Sin Opciones"}
              />
            </Grid>
            <Grid className="item_pay" item={true} md={12}>
              <p className="title_item">Número de Pagos</p>
              <NumberFormat
                className="number_pay"
                disabled={dataCalculate.periodicity == "pago único" ? true : false}
                thousandSeparator={true}
                allowNegative={false}
                value={dataCalculate?.nopayments}
                onValueChange={value => {
                  let validate = value.floatValue ? value.floatValue : 0;
                  setDataCalculate({ ...dataCalculate, nopayments: validate });
                }}
                onClick={handleFocus}
              />
            </Grid>
          </Grid>
          <div className="buttons_pay">
            <Button
              className={`bt_save ${!canCalculate && "disabled"}`}
              disabled={!canCalculate}
              onClick={() => handleCalculatePayments()}
            >
              Confirmar
            </Button>
            <Button className="bt_cancel" onClick={close}>
              Cancelar
            </Button>
          </div>
        </div>
        <div className="calculate_container__footer"></div>
      </div>
    </CalculateAutoStyle>
  );
}
function MessageStatusOrder({ open }) {
  const router = useRouter();
  return (
    <MessageOrderStyle open={open}>
      <div className="container_message">
        <div className="message">
          <Info className="icon_info" />
          <p className="title_info">
            Esta Venta no puede ser Editada, ya que el pedido de la misma fue <b>APROBADO</b>
          </p>
        </div>
        <div className="buttons">
          <Button className="bt_back" onClick={() => router.back()}>
            Regresar
          </Button>
        </div>
      </div>
    </MessageOrderStyle>
  );
}
const shippData = {
  id: "12d09ENVIO22mowzna3P0008",
  name: "Envio",
  amount: 0,
  storeamount: 0,
  callamount: 0,
  code: "ENVIO-UA",
  import: false,
  isactive: true,
  system: false,
  description: "",
  subtotal: 0,
  quantity: 1,
  discount: 0,
  discountPercentage: 0,
  applyIVA: true,
  info: "",
  iva: 0,
  total: 0,
  createdAt: "2022-08-22T16:32:54.787Z",
  updatedAt: "2023-07-19T17:43:38.385Z",
  brandId: "62d09Tuuhp22mowzna3pO122",
  categoryId: "62d09Tuuhp22mowzna3pH163",
  producttypeId: "62d09Tuuhp22mowzna3pR000",
  providerId: "62d09Tuuhp22mowzna3pG000",
  companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  category: {
    id: "62d09Tuuhp22mowzna3pH163",
    name: "SISTEMA",
    system: false,
    createdAt: "2022-07-26T13:28:55.097Z",
    updatedAt: "2022-07-26T13:28:55.097Z",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  },
  provider: {
    id: "62d09Tuuhp22mowzna3pG000",
    name: null,
    lastname: null,
    fullname: null,
    email: null,
    phone: null,
    optionalphone: "",
    rfc: null,
    street: null,
    identifier: null,
    companyname: "Sistema",
    type: null,
    nifcif: null,
    observations: "222",
    system: false,
    createdAt: "2022-07-26T13:28:55.097Z",
    updatedAt: "2022-12-08T17:23:59.378Z",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    postalId: null,
    cityId: null,
    entityId: null,
  },
  brand: {
    id: "62d09Tuuhp22mowzna3pO122",
    name: "Sistema",
    isactive: true,
    system: false,
    createdAt: "2022-07-26T13:28:55.097Z",
    updatedAt: "2022-07-26T13:28:55.097Z",
    brandlineId: "l6hiPutHDo4jXiBWT8h7HPXF",
  },
  productstype: {
    id: "62d09Tuuhp22mowzna3pR000",
    name: "Sistema",
    system: false,
    createdAt: "2022-07-26T13:28:55.097Z",
    updatedAt: "2022-07-26T13:28:55.097Z",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  },
};

const optionsDownpayment = [
  {
    label: "Si",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const optioStatusPayment = [
  {
    label: "Pagado",
    value: true,
  },
  {
    label: "Pendiente",
    value: false,
  },
];

const optionsPeriodicity = [
  {
    label: "primer pago",
    value: 0,
  },
  {
    label: "segundo pago",
    value: 1,
  },
  {
    label: "prorrateadas",
    value: "all",
  },
];
