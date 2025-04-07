import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Select from "react-select";
import NumberFormat from "react-number-format";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack, Assignment, AttachMoney, Edit, ErrorRounded, LocalShipping } from "@material-ui/icons";
import { saveAs } from "file-saver";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControlLabel, Grid, IconButton, LinearProgress, Switch, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import LoaderPage from "../../../LoaderPage";
import MainLayout from "../../../MainLayout";
import { Error, SeeOrderContainer, TableProducts } from "./style";
import FilesOrders from "../../atoms/FilesOrders";
import ModalAddFilesOrders from "../../atoms/ModalAddFilesOrdersAdmin";
import ModalExtraProductOrder from "../../../ModalExtraProductOrder";
import ModalExtraProductOrderDB from "../../../ModalExtraProductOrderBD";
import LoaderCompleteScreen from "../../../LoaderCompleteScreen";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { fetchUserBytoken, userSelector } from "../../../../redux/slices/userSlice";
import { quotesSelector, setArrayExtraProducts, setArrayProducts } from "../../../../redux/slices/quotesSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import useValidateLogin from "../../../../hooks/useValidateLogin";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { EntitiesLocal } from "../../../../BD/databd";
import { URL_SPACE, api } from "../../../../services/api";
import { makeTemplateOrder } from "../../../../templates/makeTemplate";
export default function EditOrder() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData, id_user, company, groupId } = useSelector(userSelector);
  const { cfdi, paymentsacount, paymentmethod, paymentway, taxregime, shippingtype } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  const [isLoading, setisLoading] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [city, setCity] = useState("");
  const [loadCities, setLoadCities] = useState(true);
  const [entity, setEntity] = useState("");
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [cityInvoice, setCityInvoice] = useState("");
  const [entityInvoice, setEntityInvoice] = useState("");
  const [postalCodeInvoice, setPostalCodeInvoice] = useState("");
  const [citiesByEntityInvoice, setCitiesByEntityInvoice] = useState(null);
  const [showDataBill, setShowDataBill] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoaderFiles, setIsLoaderFiles] = useState(false);
  const [openModalAddFiles, setOpenModalAddFiles] = useState(false);
  const [filesRespaldo, setFilesRespaldo] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const idOrder = router.query.pe;
  const idOportunitie = router.query.op;
  // * Add order shippping
  const { productsSelected: products } = useSelector(quotesSelector);
  const [oportunity, setOportunity] = useState({});
  const [openModalExtraProduct, setOpenModalExtraProduct] = useState(false);
  const [isEditingExtraProduct, setIsEditingExtraProduct] = useState(false);
  const [extraProductSelected, setExtraProductSelected] = useState({});
  const [existShipping, setExistShipping] = useState(false);
  const [flagOportunity, setFlagOportunity] = useState(false);
  const [newTotal, setNewTotal] = useState(0);
  const [dataShipping, setDataShipping] = useState({});
  const [lastPayment, setLastPayment] = useState({});

  useEffect(() => {
    if (dataOrder.id) {
      let newAmount = dataOrder.oportunity?.amount;
      if (!existShipping) {
        let dataShipp = products.find(item => item?.product?.code == "ENVIO-UA" || item?.code == "ENVIO-UA");
        if (dataShipp) {
          newAmount = newAmount + dataShipp?.total;
          setDataShipping(dataShipp);
        }
      }
      setNewTotal(newAmount);
    }
  }, [dataOrder, isEditingExtraProduct, products, existShipping]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getDataOrders();
    dispatch(fetchUserBytoken({}));
  }, [flagOportunity]);

  useEffect(() => {
    getQuotesByOportunity();
  }, [idOportunitie, flagOportunity]);

  useEffect(() => {
    getPaymentsOportunity();
    getProductsOp(false);
  }, []);

  useEffect(() => {
    getFilesOrder();
    getDataShippings();
  }, [idOrder, flagOportunity]);

  //Petición para traer info de la orden
  const getDataOrders = async () => {
    try {
      setisLoading(true);
      let params = {
        include:
          "createdbyid,oportunity,oportunity.prospect,address,address.postal,address.city,address.entity,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,paymentaccount",
      };
      let response = await api.get(`orders/${router.query.pe}`, { params });
      let resultados = response.data;
      setDataOrder(resultados);
      SetValues(resultados);
      setisLoading(false);
      setOportunity(resultados.oportunity);
    } catch (error) {
      handleGlobalAlert("warning", `Error de servidor`, "basic", dispatch);
      setisLoading(false);
      setIsCreating(false);
      console.log(error);
    }
  };
  // {
  //   console.log("data", dataOrder);
  // }
  //envio de una order
  const getDataShippings = async () => {
    try {
      let query = { orderId: idOrder };
      const params = {
        where: JSON.stringify(query),
        include: "address,address.city,address.entity,address.postal,shippingtype",
      };
      let shipping = await api.get(`shippings`, { params });
      let result = shipping.data.results[0];
      setShippings(result);
      setValueShipping(result);
    } catch (error) {
      handleGlobalAlert("error", " ¡Error al cargar Datos de Envios!", "basic", dispatch);
    }
  };

  function setValueShipping(shipping) {
    setValue("shippingtype", shipping?.shippingtype);
  }

  const getPaymentsOportunity = async () => {
    try {
      let query = {
        oportunityId: idOportunitie,
      };
      let params = {
        where: JSON.stringify(query),
        order: "-date",
        limit: 1,
        count: 1,
      };
      let response = await api.get("salespayments", { params });
      let payment = response.data.results[0];
      setLastPayment(payment);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuotesByOportunity = async () => {
    try {
      let query = {
        oportunityId: router.query.op,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product, product.brand",
        all: "1",
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      let shipping = products.find(item => item.product?.code == "ENVIO-UA");
      if (shipping) {
        dispatch(setArrayExtraProducts(shipping));
        setExistShipping(true);
      }
      dispatch(setArrayProducts(products));
    } catch (error) {
      console.log(error);
    }
  };

  function SetValues(order) {
    setValue("folio", order?.folio);
    setValue("receive", order?.receive);
    setValue("phone", order?.phone);
    setValue("street", order?.address?.street);
    setValue("int_number", order?.address?.int_number);
    setValue("ext_number", order?.address?.ext_number);
    setValue("entity", order?.address?.entityId);
    setValue("postalcode", order?.address?.postal?.postal_code);
    getEntitieCityByPostals(order?.address?.postal?.postal_code, "");
    setValue("city", order?.address?.cityId);
    setCity(order?.address?.city);
    setValue("references", order?.address?.references);
    setValue("settlement", order?.address?.settlement);
    setShowDataBill(order?.billing);
    if (order.billing === true) {
      setValue("observations", order?.observations);
      setValue("businessName", order?.bill?.businessname);
      setValue("rfc", order?.bill?.rfc);
      setValue("phoneInvoice", order?.bill?.phone);
      setValue("streetInvoice", order?.bill?.address?.street);
      setValue("int_numberInvoice", order?.bill?.address?.int_number);
      setValue("ext_numberInvoice", order?.bill?.address?.ext_number);
      setValue("cologneInvoice", order?.bill?.address?.settlement);
      setValue("postalCodeInvoice", order?.bill?.address?.postal?.postal_code);
      getEntitieCityByPostals(order?.bill?.address?.postal?.postal_code, "postal order");
      setValue("entityOrder", order?.bill?.address?.entityId);
      setValue("cityOrder", order?.bill?.address?.cityId);
      setValue("cfdi", order?.bill?.cfdi);
      setValue("paymentMethod", order?.bill?.paymentmethod);
      setValue("waytoPay", order?.bill?.paymentway);
      setValue("taxregime", order?.bill?.taxregime);
    }
    setValue("paymentaccount", order?.paymentaccount);
  }

  const getEntitieCityByPostals = async (code, title) => {
    let where = JSON.stringify({
      postal_code: code,
    });
    try {
      let postals = await api.get(`/postals?where=${where}&include=city,city.entity`);
      if (postals.data.results.length > 0) {
        if (title == "postal order") {
          setPostalCodeInvoice(postals.data.results[0].id);
          setEntityInvoice(postals?.data?.results[0]?.city?.entity?.id);
          setValue("entityOrder", postals?.data?.results[0]?.city?.entity?.id);
          setCityInvoice(postals?.data?.results[0]?.city);
          setValue("cityOrder", postals?.data?.results[0]?.city.id);
          getCities(postals?.data?.results[0]?.city?.entity?.id, "order");
        } else {
          setPostalCode(postals.data.results[0].id);
          setEntity(postals?.data?.results[0]?.city?.entity?.id);
          setValue("entity", postals?.data?.results[0]?.city?.entity?.id);
          setCity(postals?.data?.results[0]?.city);
          setValue("city", postals?.data?.results[0]?.city.id);
          getCities(postals?.data?.results[0]?.city?.entity?.id, "direction");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async (entityId, title) => {
    try {
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1010`);
      if (title == "order") {
        setCitiesByEntityInvoice(cities.data.results);
      } else {
        setCitiesByEntity(cities.data.results);
      }
      setLoadCities(false);
    } catch (error) {
      setLoadCities(false);

      console.log(error);
    }
  };
  const getFilesOrder = async () => {
    setIsLoaderFiles(true);
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        order: "-createdAt",
        include: "filestype",
        count: 1,
        limit: 100,
      };
      let response = await api.get(`documents/order/${idOrder}`, { params });
      setIsLoaderFiles(false);
      setFiles(response.data.results);
      setFilesRespaldo(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getShippins = async () => {
    let params = {
      where: { companyId: company },
    };
    getCatalogBy("shippingtype", params);
  };
  const handleSelectEntities = id => {
    setEntity(id);
    setCity({});
    getCities(id, "direction");
    setValue("entity", id);
  };

  const handleSelectEntitiesOrder = id => {
    setEntityInvoice(id);
    setCityInvoice({});
    getCities(id, "order");
    setValue("entityOrder", id);
  };
  const handleSelectCity = item => {
    if (item === "") {
      setCity({});
      setValue("city", "");
    } else {
      setCity(item);
      setValue("city", item.id);
    }
  };
  const handleSelectCityOrder = item => {
    if (item === "") {
      setCityInvoice({});
    } else {
      setCityInvoice(item);
      setValue("cityOrder", item.id);
    }
  };

  //actualiza la data
  const saveChanges = async (item, productsOportunity) => {
    setIsCreating(true);
    try {
      let newOrder = {};
      newOrder.folio = item.folio;
      newOrder.paymentaccountId = item.paymentaccount.id;
      if (item.observations !== "") {
        newOrder.observations = item.observations;
      } else {
        newOrder.observations = "";
      }
      newOrder.companyId = dataOrder?.createdbyid?.companyId;
      newOrder.oportunityId = dataOrder.oportunityId;
      newOrder.orderstatusId = dataOrder.orderstatusId;
      newOrder.receive = item.receive;
      newOrder.phone = item.phone;
      newOrder.total = newTotal;
      newOrder.addressId = dataOrder.addressId;
      let adress = {
        entityId: item.entity,
        cityId: item.city,
        postalId: postalCode,
        street: item.street,
        int_number: item.int_number,
        ext_number: item.ext_number,
        references: item.references,
        settlement: item.settlement,
      };
      newOrder.address = adress;
      if (showDataBill == true) {
        newOrder.billing = true;
        newOrder.billingbusiness = item.businessName;
        newOrder.rfc = item.rfc;
        newOrder.billingphone = item.phoneInvoice;
        newOrder.cfdiId = item.cfdi.id;
        newOrder.paymentmethodId = item.paymentMethod.id;
        newOrder.paymentwayId = item.waytoPay.id;
        newOrder.taxregimeId = item.taxregime.id;
        let adressBilling = {
          entityId: item.entityOrder,
          cityId: item.cityOrder,
          postalId: postalCodeInvoice,
          street: item.streetInvoice,
          int_number: item.int_numberInvoice,
          ext_number: item.ext_numberInvoice,
          settlement: item.cologneInvoice,
        };
        newOrder.billingaddress = adressBilling;
        if (dataOrder.billingaddressId !== null) {
          newOrder.billingaddressId = dataOrder.billingaddressId;
        } else {
          newOrder.billingaddressId = "";
        }
      } else {
        newOrder.billing = false;
        newOrder.billingbusiness = "";
        newOrder.rfc = "";
        newOrder.billingphone = "";
        let adressBilling = {};
        newOrder.billingaddress = adressBilling;
        newOrder.billingaddressId = "";
      }
      if (item?.shippingtype?.id !== shippings?.shippingtypeId) {
        let shipping = {
          shippingtypeId: item?.shippingtype?.id,
        };
        newOrder.shippingId = shippings?.id;
        newOrder.shipping = shipping;
      }
      // agregar archivos
      let filesSave = await handleUploadFiles();
      let dataupdate = filesSave.map((item, index) => ({
        name: item.name,
        filestypeId: item.filestype?.id,
        url: item.url,
        orderId: idOrder,
        companyId: company,
      }));
      newOrder.addfiles = dataupdate;

      // Eliminar archivos
      let del = filesRespaldo.filter(object1 => {
        return !files.some(object2 => {
          return object1.id === object2.id;
        });
      });
      newOrder.deletefiles = del?.map(item => item.id);

      //json para pdf
      let entityData = EntitiesLocal.filter(item => item.id == entity);
      let entityDataInvoice = EntitiesLocal.filter(item => item.id == entityInvoice);
      let today = dayjs().format("DD-MM-YYYY");
      let data = {};
      data.concept = item.folio;
      data.groupLogo = userData?.grouplogo;
      data.dateOrder = today;
      data.companyId = dataOrder?.companyId;
      if (item.observations !== "") {
        data.observations = item.observations;
      } else {
        data.observations = "";
      }
      let companys = {
        id: dataOrder?.companyId,
      };
      data.companys = companys;
      let ejecutive = {
        name: `${toUpperCaseChart(dataOrder?.createdbyid?.title)} ${toUpperCaseChart(dataOrder?.createdbyid?.name)}`,
        lastname: toUpperCaseChart(dataOrder?.createdbyid?.lastname),
        phone: dataOrder?.createdbyid?.phone,
      };
      data.ejecutive = ejecutive;
      let adressPdf = {
        receive: item.receive,
        entity: entityData[0]?.name,
        city: city?.name,
        postal: item.postalcode,
        street: item.street,
        int_number: item.int_number,
        ext_number: item.ext_number,
        settlement: item.settlement,
        phone: item.phone,
        references: item.references,
      };
      data.adressPdf = adressPdf;
      data.paymentaccount = toUpperCaseChart(item?.paymentaccount?.name);
      if (showDataBill == true) {
        let adressBilling = {
          billingbusiness: item.businessName,
          rfc: item.rfc,
          phone: item.phoneInvoice,
          street: item.streetInvoice,
          int_number: item.int_numberInvoice,
          ext_number: item.ext_numberInvoice,
          settlement: item.cologneInvoice,
          postal: item.postalCodeInvoice,
          entity: entityDataInvoice[0]?.name,
          city: cityInvoice?.name,
        };
        data.adressBilling = adressBilling;
        data.cfdi = item?.cfdi?.name;
        data.methodPayment = item?.paymentMethod?.name;
        data.wayPayment = item?.waytoPay?.name;
        data.taxregime = item?.taxregime?.name;
      } else {
        let adressBilling = {
          billingbusiness: "",
          rfc: "",
          phone: "",
          street: "",
          int_number: "",
          ext_number: "",
          settlement: "",
          postal: "",
          entity: "",
          city: "",
        };
        data.adressBilling = adressBilling;
        data.cfdi = "";
        data.methodPayment = "";
        data.wayPayment = "";
        data.taxregime = "";
      }
      data.products = productsOportunity;
      data.iva = formatNumber(dataOrder?.oportunity?.totaliva);
      data.discount = formatNumber(dataOrder?.oportunity?.discount);
      data.total = formatNumber(newTotal);
      data.subtotal = formatNumber(dataOrder?.oportunity?.subtotal);

      let user = id_user;
      let group = userData.groupId;
      let response = makeTemplateOrder(data);
      let compani = userData.companyId;
      const form = new FormData();
      form.append("name", item.folio);
      form.append("data", response);
      form.append("company", compani);
      form.append("group", group);
      form.append("ejecutive", user);

      let responsePDFURL = await api.post("convert/pdf", form);
      newOrder.url = responsePDFURL.data.url;
      let orderPuts = await api.put(`orders/${router.query.pe}`, newOrder);
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
      saveAs(pdfBlob, `${item.folio}.pdf`);
      handleGlobalAlert("success", "Pedido - Actualizado correctamente!", "basic", dispatch, 6000);
      setOportunity({});
      setTimeout(() => {
        setIsCreating(false);
        router.back();
      }, 1000);
    } catch (error) {
      handleGlobalAlert("error", "Pedido - Ocurrió un problema!", "basic", dispatch, 6000);
      setIsCreating(false);
      console.log(error);
    }
  };

  const handleValidateAction = data => {
    if (!existShipping) {
      setIsCreating(true);
      updateOportunity(data);
    } else {
      saveChanges(data, products);
    }
  };

  const updateOportunity = async data => {
    try {
      if (dataShipping.id) {
        let productShipping = [
          {
            prodId: dataShipping.id,
            quantity: dataShipping.quantity,
            discount: dataShipping.discount,
            iva: dataShipping.singleiva,
            total: dataShipping.total,
            note: dataShipping.info,
            newprice: dataShipping.callamount,
            customproduct: dataShipping.customproduct ? dataShipping?.customproduct : false,
            shownote: false,
            ejecutiveId: id_user,
            dispercentage: dataShipping.discountp,
          },
        ];
        let responseUpdateOportunity = await api.put(`oportunities/goals/${oportunity.id}`, {
          addproducts: productShipping,
          amount: newTotal,
          totalextracosts: dataShipping.total,
        });
        let updatedProducts = await getProductsOp(true);
        updateOportunityPayments();
        saveChanges(data, updatedProducts);
      } else {
        saveChanges(data, products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOportunityPayments = async () => {
    try {
      let paymentWithoutShipping = Number(lastPayment.payment) + Number(dataShipping.total);
      let payments = [
        {
          id: lastPayment.id,
          comission: lastPayment.comission,
          downpayment: lastPayment.downpayment,
          date: lastPayment.date,
          paymentId: lastPayment.id,
          ispaid: lastPayment.ispaid,
          observations: lastPayment.observations,
          oportunityId: lastPayment.oportunityId,
          payment: paymentWithoutShipping,
          paymentiva: lastPayment.paymentiva,
          ejecutiveId: lastPayment.ejecutiveId,
        },
      ];
      let responseUpdateLastPayment = await api.put("salespayments", { payments });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsOp = async isReturn => {
    try {
      let query = {
        oportunityId: router.query.op,
      };
      let params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product, product.brand",
        all: "1",
      };
      let response = await api.get("productsoportunities", { params });
      let products = response.data.results;
      if (isReturn) return products;
    } catch (error) {
      handleGlobalAlert("error", "Pedido - Ocurrió un problema!", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  const handleUploadFiles = async currentFile => {
    let add = files.filter(object1 => {
      return !filesRespaldo.some(object2 => {
        return object1.id === object2.id;
      });
    });
    let filesUpdate = [...add];
    try {
      for (let i = 0; i < add.length; i++) {
        const fileToSave = add[i];
        let newData = new FormData();
        newData.append("name", fileToSave.name);
        newData.append("file", fileToSave.file);
        let responseFiles = await api.post(
          `files/uploadtofolder/${company}-G${groupId}-E${id_user}-P${dataOrder?.oportunity?.prospectId}/${fileToSave.name}`,
          newData
        );

        filesUpdate[i].url = responseFiles?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }

    return filesUpdate;
  };

  const handleRenderButtonShipping = () => {
    let searchShipping = products.filter(item => item.product?.code == "ENVIO-UA" || item?.code == "ENVIO-UA");
    if (searchShipping.length <= 0)
      return (
        <Button
          startIcon={<LocalShipping />}
          className="button_addShipping"
          onClick={() => setOpenModalExtraProduct(true)}
        >
          Agregar Envio
        </Button>
      );
  };

  if (isLoadingPage) return <LoaderPage />;
  return (
    <MainLayout>
      <SeeOrderContainer>
        <Head>
          <title>CRM JOBS - Editar Pedido</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="contenido_pedidos">
            {isLoading ? (
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
                <div className="head_Orders">
                  <div className="title">
                    <IconButton onClick={() => router.back()}>
                      <ArrowBack className="icon" />
                    </IconButton>
                  </div>
                  <p className="order__title" onClick={() => console.log("productos defauilt", dataOrder)}>
                    Pedido
                  </p>
                </div>
                <div className="information">
                  <div className="information__primarySales">
                    <p>Datos de la Venta.</p>
                    <AttachMoney className="information__primarySales__icon_primary" />
                  </div>
                  <Grid container spacing={1} className="information__head">
                    <Grid md={3} item className="information__head__item">
                      <p className="information__head__item">Concepto</p>
                      <p className="information__head__capitalize">{dataOrder?.oportunity?.concept}</p>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="information__head__item">Monto Total</p>
                      <p className="information__head__capitalize">{formatNumber(dataOrder?.oportunity?.amount)}</p>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="information__head__item">Comisión Total</p>
                      <p className="information__head__capitalize">{formatNumber(dataOrder?.oportunity?.comission)}</p>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <p className="information__head__item">Nombre Cliente</p>
                      <p className="information__head__capitalize">{dataOrder?.oportunity?.prospect?.fullname}</p>
                    </Grid>

                    <Grid item md={9} xs={12}>
                      <p className="information__head__item">Observaciones de la venta</p>
                      <p className="information__head__capitalize">{dataOrder?.oportunity?.generalobservations}</p>
                    </Grid>
                  </Grid>
                  <div className="divider" />
                  <div className="information__primarySales">
                    <p>Editar Datos Pedido.</p>
                    <Assignment className="information__primarySales__icon_primary" />
                  </div>

                  <Grid container spacing={1} className="information__Orders">
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Folio <strong>*</strong>
                          </p>
                          {errors.folio && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.folio?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          placeholder="Folio Pedido"
                          disabled
                          className="inputDisabled"
                          {...register("folio", {
                            required: "*Requerido",
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Cuenta de Pago<strong>*</strong>
                          </p>

                          {errors.paymentaccount && errors.paymentaccount.type === "required" && (
                            <>
                              <div className="point"></div> <Error>{"*Requerido"}</Error>
                            </>
                          )}
                        </div>
                        <Controller
                          name="paymentaccount"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="select-options"
                              placeholder="Selecciona una Opción"
                              onMenuOpen={() => getCatalogBy("paymentsacount")}
                              loadingMessage={() => "Cargando Opciones..."}
                              isLoading={paymentsacount.isFetching}
                              options={paymentsacount.results}
                              isClearable={false}
                              getOptionValue={option => `${option["id"]}`}
                              getOptionLabel={option => `${option.name}`}
                            />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>Observaciones Generales Pedido</p>
                        </div>
                        <input
                          placeholder="Observaciones Generales"
                          className="input"
                          {...register("observations", {
                            required: false,
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <p className="information__title">Dirección de envio</p>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Recibe <strong>*</strong>
                          </p>
                          {errors.receive && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.receive?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          className="input"
                          placeholder="Recibe"
                          {...register("receive", {
                            required: "*Requerido",
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Telefono <strong>*</strong>
                          </p>
                          {errors.phone && (
                            <>
                              <div className="point"></div> <Error>{errors.phone?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          placeholder="Telefono"
                          className="input"
                          {...register("phone", {
                            required: "*Requerido",

                            maxLength: {
                              value: 10,
                              message: "*10 Caracteres",
                            },
                            minLength: {
                              value: 10,
                              message: "*10 Caracteres",
                            },
                            pattern: {
                              value: /[0-9]+/i,
                              message: "*Caracter Invalido",
                            },
                          })}
                          type="number"
                        ></input>
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Calle <strong>*</strong>
                          </p>
                          {errors.street && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.street?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          className="input"
                          placeholder="Calle"
                          {...register("street", {
                            required: "*Requerido",
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Número exterior <strong>*</strong>
                          </p>
                          {errors.ext_number && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.ext_number?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          className="input"
                          placeholder="Número exterior"
                          {...register("ext_number", {
                            required: "*Requerido",
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Número interior <strong>*</strong>
                          </p>
                          {errors.int_number && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.int_number?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          className="input"
                          placeholder="Número Exterior"
                          {...register("int_number", {
                            required: "*Requerido",
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Colonia <strong>*</strong>
                          </p>
                          {errors.settlement && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.settlement?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          placeholder="Colonia"
                          className="input"
                          {...register("settlement", {
                            required: "*Requerido",
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Codigo Postal <strong>*</strong>
                          </p>
                          {errors.postalcode && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.postalcode?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          type="number"
                          placeholder="Codigo Postal"
                          className="input"
                          {...register("postalcode", {
                            required: "*Requerido",
                            onChange: e => {
                              if (e.target.value.length === 5) {
                                getEntitieCityByPostals(e.target.value, "");
                              }
                            },
                          })}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Estado <strong>*</strong>
                          </p>
                          {errors.entity && errors.entity.ref.value === "" && (
                            <>
                              <div className="point"></div> <Error>{"*Requerido"}</Error>
                            </>
                          )}
                        </div>
                        <Controller
                          name="entity"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="select-options"
                              placeholder="Selecciona un Estado"
                              options={EntitiesLocal}
                              isClearable={false}
                              onChange={e => (e === null ? handleSelectEntities("") : handleSelectEntities(e.id))}
                              value={EntitiesLocal.filter(item => item.id === entity)}
                              getOptionValue={option => `${option["id"]}`}
                              getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                            />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Municipio <strong>*</strong>
                          </p>
                          {errors.city && errors.city.type === "required" && (
                            <>
                              <div className="point"></div> <Error>{"*Requerido"}</Error>
                            </>
                          )}
                        </div>

                        <Controller
                          name="city"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="select-options"
                              placeholder="Selecciona un Municipio"
                              options={citiesByEntity !== null ? citiesByEntity : []}
                              isClearable={false}
                              isLoading={loadCities}
                              onChange={e => (e === null ? handleSelectCity("") : handleSelectCity(e))}
                              value={citiesByEntity?.filter(item => item.id === city.id)}
                              getOptionValue={option => `${option["id"]}`}
                              getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                            />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Tipo de Envio<strong>*</strong>
                          </p>

                          {errors.shippingtype && errors.shippingtype.type === "required" && (
                            <>
                              <div className="point"></div> <Error>{"*Requerido"}</Error>
                            </>
                          )}
                        </div>
                        <Controller
                          name="shippingtype"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onMenuOpen={() => getShippins()}
                              loadingMessage={() => "Cargando Opciones..."}
                              isLoading={shippingtype.isFetching}
                              options={shippingtype.results}
                              className="select-options"
                              placeholder="Selecciona una Opción"
                              isClearable={false}
                              getOptionValue={option => `${option["id"]}`}
                              getOptionLabel={option => `${option.name}`}
                            />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <div className="itemGlobal">
                        <div className="ContentTitleandAlert">
                          <p>
                            Referencias <strong>*</strong>
                          </p>
                          {errors.references && (
                            <>
                              <div className="point"></div>
                              <Error> {errors.references?.message}</Error>
                            </>
                          )}
                        </div>
                        <input
                          placeholder="Referencias"
                          className="input"
                          {...register("references", {
                            required: "*Requerido",
                          })}
                        ></input>
                      </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <p className="information__title">Datos de facturación</p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="primary">
                        <p>Agregar Factura </p>
                        <FormControlLabel
                          control={
                            <Switch
                              disabled={
                                dataOrder?.orderstatusId !== "9eQCIBnRvc990VlJfgswanCh" && dataOrder?.billing === true
                                  ? true
                                  : false
                              }
                              checked={showDataBill}
                              onChange={() => setShowDataBill(!showDataBill)}
                              name="checkedB"
                              color="primary"
                            />
                          }
                        />
                        {dataOrder?.orderstatusId !== "9eQCIBnRvc990VlJfgswanCh" && dataOrder?.billing === true && (
                          <div className="alertRequest">
                            <ErrorRounded className="alertRequest__icon" />
                            {dataOrder?.orderstatusId === "YDBO8hIj4LPZzGvgzSeyhhOs" && (
                              <p className="alertRequest__title">
                                No puedes desactivar la opción de factura, tu pedido esta en estado (PENDIENTE DE
                                APROBACION).
                              </p>
                            )}
                            {dataOrder?.orderstatusId === "CwNWIj2RxW6N2B9v4WiwD1V9" && (
                              <p className="alertRequest__title">
                                No puedes desactivar la opción de factura, tu pedido esta en estado (Rechazado).
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </Grid>
                    {showDataBill == true && (
                      <>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Razón Social <strong>*</strong>
                                </p>
                                {errors.businessName && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.businessName?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                placeholder="Razón Social"
                                className="input"
                                {...register("businessName", {
                                  required: "*Requerido",
                                })}
                              ></input>
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  RFC <strong>*</strong>
                                </p>
                                {errors.rfc && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.rfc?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                placeholder="RFC"
                                className="input"
                                {...register("rfc", {
                                  pattern: {
                                    value:
                                      /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                                    message: "*RFC Incorrecto",
                                  },
                                  required: "*Requerido",
                                })}
                              ></input>
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Regimen Fiscal<strong>*</strong>
                                </p>

                                {errors.taxregime && errors.taxregime.type === "required" && (
                                  <>
                                    <div className="point"></div> <Error>{"*Requerido"}</Error>
                                  </>
                                )}
                              </div>
                              <Controller
                                name="taxregime"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    className="select-options"
                                    placeholder="Selecciona una Opción"
                                    isLoading={taxregime.isFetching}
                                    onMenuOpen={() => getCatalogBy("taxregimes")}
                                    options={taxregime?.results}
                                    loadingMessage={() => "Cargando Opciones..."}
                                    isClearable={false}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${option.name}`}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Uso de CFDI<strong>*</strong>
                                </p>

                                {errors.cfdi && errors.cfdi.type === "required" && (
                                  <>
                                    <div className="point"></div> <Error>{"*Requerido"}</Error>
                                  </>
                                )}
                              </div>

                              <Controller
                                name="cfdi"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    className="select-options"
                                    placeholder="Selecciona una Opción"
                                    onMenuOpen={() => getCatalogBy("cfdis")}
                                    loadingMessage={() => "Cargando Opciones..."}
                                    isLoading={cfdi.isFetching}
                                    options={cfdi.results}
                                    isClearable={false}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${option.name}`}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Metodo de Pago<strong>*</strong>
                                </p>

                                {errors.paymentMethod && errors.paymentMethod.type === "required" && (
                                  <>
                                    <div className="point"></div> <Error>{"*Requerido"}</Error>
                                  </>
                                )}
                              </div>

                              <Controller
                                name="paymentMethod"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    className="select-options"
                                    placeholder="Selecciona una Opción"
                                    onMenuOpen={() => getCatalogBy("paymentmethods")}
                                    loadingMessage={() => "Cargando Opciones..."}
                                    isLoading={paymentmethod.isFetching}
                                    options={paymentmethod.results}
                                    isClearable={false}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${option.name}`}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Forma de Pago<strong>*</strong>
                                </p>

                                {errors.waytoPay && errors.waytoPay.type === "required" && (
                                  <>
                                    <div className="point"></div> <Error>{"*Requerido"}</Error>
                                  </>
                                )}
                              </div>
                              <Controller
                                name="waytoPay"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    className="select-options"
                                    placeholder="Selecciona una Opción"
                                    isLoading={paymentway.isFetching}
                                    onMenuOpen={() => getCatalogBy("paymentways")}
                                    loadingMessage={() => "Cargando Opciones..."}
                                    options={paymentway.results}
                                    isClearable={false}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${option.name}`}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Telefono<strong>*</strong>
                                </p>
                                {errors.phoneInvoice && (
                                  <>
                                    <div className="point"></div> <Error>{errors.phoneInvoice?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                {...register("phoneInvoice", {
                                  required: "*Requerido",
                                  maxLength: {
                                    value: 10,
                                    message: "*10 Caracteres",
                                  },
                                  minLength: {
                                    value: 10,
                                    message: "*10 Caracteres",
                                  },
                                  pattern: {
                                    value: /[0-9]+/i,
                                    message: "*Caracter Invalido",
                                  },
                                })}
                                placeholder="Digíte número a 10 dígitos"
                                className="input"
                                type="number"
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Calle <strong>*</strong>
                                </p>
                                {errors.streetInvoice && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.streetInvoice?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                className="input"
                                placeholder="Calle"
                                {...register("streetInvoice", {
                                  required: "*Requerido",
                                })}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Número interior <strong>*</strong>
                                </p>
                                {errors.int_numberInvoice && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.int_numberInvoice?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                className="input"
                                placeholder="Número Exterior"
                                {...register("int_numberInvoice", {
                                  required: "*Requerido",
                                })}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Número exterior <strong>*</strong>
                                </p>
                                {errors.ext_numberInvoice && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.ext_numberInvoice?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                className="input"
                                placeholder="Número exterior"
                                {...register("ext_numberInvoice", {
                                  required: "*Requerido",
                                })}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Colonia <strong>*</strong>
                                </p>
                                {errors.cologneInvoice && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.cologneInvoice?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                placeholder="Colonia"
                                className="input"
                                {...register("cologneInvoice", { required: "*Requerido" })}
                              />
                            </div>
                          </motion.div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <div className="ContentTitleandAlert">
                                <p>
                                  Código Postal <strong>*</strong>
                                </p>
                                {errors.postalCodeInvoice && (
                                  <>
                                    <div className="point"></div>
                                    <Error> {errors.postalCodeInvoice?.message}</Error>
                                  </>
                                )}
                              </div>
                              <input
                                type="number"
                                placeholder="Codigo Postal"
                                className="input"
                                {...register("postalCodeInvoice", {
                                  required: "*Requerido",
                                  onChange: e => {
                                    if (e.target.value.length === 5) {
                                      getEntitieCityByPostals(e.target.value, "postal order");
                                    }
                                  },
                                })}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <p>
                                Estado <strong>*</strong>
                                {errors.entity && errors.entity.ref.value === "" && (
                                  <>
                                    <div className="point"></div>
                                    <Error>Requerido</Error>
                                  </>
                                )}
                              </p>
                              <Controller
                                name="entityOrder"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    className="select-options"
                                    placeholder="Selecciona un Estado"
                                    options={EntitiesLocal}
                                    isClearable={false}
                                    onChange={e =>
                                      e === null ? handleSelectEntitiesOrder("") : handleSelectEntitiesOrder(e.id)
                                    }
                                    value={EntitiesLocal.filter(item => item.id === entityInvoice)}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                                    styles={{
                                      menu: provided => ({ ...provided, zIndex: 9999 }),
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="itemGlobal">
                              <p>
                                Municipio <strong>*</strong>
                              </p>
                              <Controller
                                name="cityOrder"
                                control={control}
                                rules={"*Requerido"}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    className="select-options"
                                    placeholder="Selecciona un Municipio"
                                    options={citiesByEntityInvoice !== null ? citiesByEntityInvoice : []}
                                    isClearable={false}
                                    isLoading={loadCities}
                                    onChange={e => (e === null ? handleSelectCityOrder("") : handleSelectCityOrder(e))}
                                    value={citiesByEntityInvoice?.filter(item => item.id === cityInvoice.id)}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                                    styles={{
                                      menu: provided => ({ ...provided, zIndex: 9999 }),
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>
                        </Grid>
                      </>
                    )}
                    <Grid item md={12} xs={12}>
                      <p className="information__title">Archivos</p>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FilesOrders
                        files={files}
                        setFiles={setFiles}
                        isLoaderFiles={isLoaderFiles}
                        setIsLoaderFiles={setIsLoaderFiles}
                      />
                      <Button
                        variant="outlined"
                        color="primary"
                        className="button_add"
                        onClick={() => setOpenModalAddFiles(true)}
                      >
                        Agregar
                      </Button>
                    </Grid>
                    <Box component="span" m={2} />
                    <Grid item md={12} xs={12}>
                      <p className="information__title">Productos</p>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TableProducts>
                        <table className="ctr_table">
                          <thead className="ctr_table__head">
                            <tr className="ctr_table__head__tr">
                              <th className="title fixed">
                                <div className="ctr_title">
                                  <p>Producto</p>
                                </div>
                              </th>
                              <th className="title">
                                <div className="ctr_title">
                                  <p>Codigo</p>
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
                              <th colSpan={2} className="title">
                                <div className="ctr_title">
                                  <p>Monto Total</p>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="ctr_table__body">
                            {products.map((item, index) => (
                              <tr className={index % 2 == 0 ? "row" : "inpar row"} key={index}>
                                <td className="data fixed">
                                  <p className="ctr_td">{item?.product?.name ? item?.product?.name : item.name}</p>
                                </td>
                                <td className="data">
                                  <p className="text">{item?.product?.code ? item?.product?.code : item?.code}</p>
                                </td>
                                <td className="data">
                                  <p className="text">{item?.quantity}</p>
                                </td>
                                <td className="data">
                                  $
                                  <NumberFormat
                                    value={item?.newprice ? item?.newprice : item?.callamount}
                                    displayType="text"
                                    thousandSeparator={true}
                                  />
                                </td>
                                <td className="data">
                                  $<NumberFormat value={0} displayType="text" thousandSeparator={true} />
                                </td>
                                <td className="data">
                                  $
                                  <NumberFormat value={item?.total} displayType="text" thousandSeparator={true} />
                                </td>
                                <td className="data">
                                  {item.product?.code === "ENVIO-UA" && (
                                    <IconButton
                                      onClick={() => {
                                        setIsEditingExtraProduct(true);
                                        setExtraProductSelected({
                                          ...item,
                                          brand: item.product.brand,
                                          code: item.product.code,
                                        });
                                        setOpenModalExtraProduct(true);
                                      }}
                                    >
                                      <Edit className="icon_item" />
                                    </IconButton>
                                  )}
                                  {item.code === "ENVIO-UA" && (
                                    <IconButton
                                      onClick={() => {
                                        setIsEditingExtraProduct(true);
                                        setExtraProductSelected(item);
                                        setOpenModalExtraProduct(true);
                                      }}
                                    >
                                      <Edit className="icon_item" />
                                    </IconButton>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="totalcontainer">
                          <div className="totalcontainer__items">
                            <div className="totalcontainer__item">
                              <div className="text bold">
                                <p>Total</p>
                              </div>
                              <div className="value bold">
                                <p>{formatNumber(Number(newTotal))}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableProducts>
                    </Grid>
                    {handleRenderButtonShipping()}
                  </Grid>
                  <div className="information__head__buttons">
                    <Button className="information__head__buttons__cancel" onClick={() => router.back()}>
                      Cancelar
                    </Button>
                    <Button
                      disabled={loadCities}
                      className="information__head__buttons__saveChanges"
                      // onClick={handleSubmit(saveChances)}
                      onClick={handleSubmit(handleValidateAction)}
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <ModalAddFilesOrders
          setOpen={setOpenModalAddFiles}
          open={openModalAddFiles}
          filesToSave={files}
          setFilesToSave={setFiles}
        />

        {!existShipping && (
          <ModalExtraProductOrder
            itemSelected={extraProductSelected}
            setItemSelected={setExtraProductSelected}
            isEditing={isEditingExtraProduct}
            setIsEditing={setIsEditingExtraProduct}
            setOpen={setOpenModalExtraProduct}
            open={openModalExtraProduct}
            existShipping={existShipping}
          />
        )}

        {existShipping && (
          <ModalExtraProductOrderDB
            itemSelected={extraProductSelected}
            setItemSelected={setExtraProductSelected}
            isEditing={isEditingExtraProduct}
            setIsEditing={setIsEditingExtraProduct}
            setOpen={setOpenModalExtraProduct}
            open={openModalExtraProduct}
            existShipping={existShipping}
            oportunity={oportunity}
            flagOportunity={flagOportunity}
            setFlagOportunity={setFlagOportunity}
          />
        )}

        {isCreating && <LoaderCompleteScreen />}
      </SeeOrderContainer>
    </MainLayout>
  );
}
