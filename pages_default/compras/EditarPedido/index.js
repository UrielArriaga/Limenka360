import React, { useState, useEffect } from "react";
import { ArrowBack, Assignment, AttachMoney, Visibility } from "@material-ui/icons";
import { Box, Button, FormControlLabel, Grid, IconButton, LinearProgress, Switch } from "@material-ui/core";
import { useRouter } from "next/router";
import Head from "next/head";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";
import { motion } from "framer-motion";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE, URL_SPACE } from "../../../services/api";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import NumberFormat from "react-number-format";
import { Controller, useForm } from "react-hook-form";
import { EntitiesLocal } from "../../../BD/databd";
import Select from "react-select";
import { fetchUserBytoken, userSelector } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import RequestCommon from "../../../services/request_Common";
import { saveAs } from "file-saver";
import { makeTemplateOrder } from "../../../templates/makeTemplate";
import dayjs from "dayjs";
import FilesOrders from "../../../components/UI/atoms/FilesOrders";
import ModalAddFilesOrders from "../../../components/UI/atoms/ModalAddFilesOrdersAdmin";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import { Error, SeeOrderContainer, TableProducts } from "../../../styles/Pedidos/EditOrder/index-Styles";
import ModalShowProducts from "../../../components/UI/organism/ModalShowProducts";
import useModal from "../../../hooks/useModal";
import MainLayout from "../../../components/MainLayout";

export default function EditOrder() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { open: showProducts, toggleModal: toggleModalProducts, closeModal: closeModalProducts } = useModal();
  const { userData, id_user, company, groupId } = useSelector(userSelector);
  const { isLoadingPage } = useValidateLogin(["compras"]);
  const commonApi = new RequestCommon();
  const [isLoading, setisLoading] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [city, setCity] = useState("");
  const [entity, setEntity] = useState("");
  const [loadCities, setLoadCities] = useState(false);
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [cityInvoice, setCityInvoice] = useState("");
  const [entityInvoice, setEntityInvoice] = useState("");
  const [postalCodeInvoice, setPostalCodeInvoice] = useState("");
  const [citiesByEntityInvoice, setCitiesByEntityInvoice] = useState(null);
  const [paymentsMethods, setPaymentsMethods] = useState([]);
  const [wayToPay, setWayToPay] = useState([]);
  const [taxregime, setTaxregime] = useState([]);
  const [paymentAccount, setPaymentsAccount] = useState([]);
  const [showDataBill, setShowDataBill] = useState(false);
  const [cfdi, setCfdi] = useState([]);
  const [files, setFiles] = useState([]);
  const [filesRespaldo, setFilesRespaldo] = useState([]);
  const [productsCotization, setProductsCotizacion] = useState([]);
  const [isLoaderFiles, setIsLoaderFiles] = useState(false);
  const [openModalAddFiles, setOpenModalAddFiles] = useState(false);
  const [isLoaderSaveChanges, setIsLoaderSaveChanges] = useState(false);
  const [shippingsTypes, setShippingsTypes] = useState([]);
  const [shippings, setShippings] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const idOrder = router.query.pe;
  useEffect(() => {
    getDataPayments();
    getCfdi();
    getpaymentmethods();
    getpaymentways();
    getQuotesByOportunity();
    getpaymentAccount();
    gettaxregimens();
    getShippins();
    dispatch(fetchUserBytoken({}));
  }, []);

  useEffect(() => {
    getFilesOrder();
    getDataShippings();
  }, [idOrder]);

  const getDataPayments = async () => {
    try {
      setisLoading(true);
      let params = {
        include:
          "oportunity,oportunity.prospect,oportunity.productsoportunities,address,address.postal,address.city,address.entity,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,paymentaccount",
      };
      let response = await api.get(`orders/${router.query.pe}`, { params });
      let resultados = response.data;

      setDataOrder(resultados);
      SetValues(resultados);
      setAllProducts(resultados.oportunity.productsoportunities);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
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
        all: 1,
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      setProductsCotizacion(products);
    } catch (error) {
      console.log(error);
    }
  };
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
  function SetValues(order) {
    setValue("folio", order?.folio);
    setValue("paymentaccount", order?.paymentaccount);
    setValue("observations", order?.observations);
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
    setValue("itemBd", order);
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
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1009`);
      if (title == "order") {
        setCitiesByEntityInvoice(cities.data.results);
      } else {
        setCitiesByEntity(cities.data.results);
      }
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getCfdi = async () => {
    try {
      let origins = await commonApi.getCfdi();
      setCfdi(origins.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getpaymentmethods = async () => {
    try {
      let origins = await commonApi.getpaymentmethods();
      setPaymentsMethods(origins.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getpaymentways = async () => {
    try {
      let origins = await commonApi.getpaymentways();
      setWayToPay(origins.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getpaymentAccount = async () => {
    try {
      let origins = await commonApi.getpaymentAccount();
      setPaymentsAccount(origins.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const gettaxregimens = async () => {
    try {
      let tax = await commonApi.gettaxregimens();
      setTaxregime(tax.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getShippins = async () => {
    try {
      let res = await api.get("/shippingtypes");
      setShippingsTypes(res.data.results);
    } catch (error) {
      console.log(error);
    }
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

        filesUpdate[i].url = responseFiles?.data?.name;
      }
    } catch (error) {
      console.log(error);
    }

    return filesUpdate;
  };

  //actualiza la data
  const saveChances = async (item, formData) => {
    setIsLoaderSaveChanges(true);
    try {
      let newOrder = {};
      newOrder.folio = item.folio;
      newOrder.paymentaccountId = item.paymentaccount.id;
      if (item.observations !== "") {
        newOrder.observations = item.observations;
      } else {
        newOrder.observations = "";
      }
      newOrder.companyId = company;
      newOrder.oportunityId = dataOrder.oportunityId;
      newOrder.orderstatusId = dataOrder.orderstatusId;
      newOrder.receive = item.receive;
      newOrder.phone = item.phone;
      newOrder.total = dataOrder.oportunity.amount;
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
        newOrder.taxregimeId = item.taxregime.id;
        newOrder.paymentwayId = item.waytoPay.id;
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
      } else {
        newOrder.billing = false;
        newOrder.billingbusiness = "";
        newOrder.rfc = "";
        newOrder.billingphone = "";
        let adressBilling = {};
        newOrder.billingaddress = adressBilling;
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

      let entityData = EntitiesLocal.filter(item => item.id == entity);
      let entityDataInvoice = EntitiesLocal.filter(item => item.id == entityInvoice);
      let today = dayjs().format("DD-MM-YYYY");
      //pdf
      let data = {};
      data.concept = item.folio;
      data.groupLogo = userData?.grouplogo;
      data.dateOrder = today;
      data.companyId = company;
      if (item.observations !== "") {
        data.observations = item.observations;
      } else {
        data.observations = "";
      }
      let companys = {
        id: company,
      };
      data.companys = companys;
      let ejecutive = {
        name: `${toUpperCaseChart(userData?.name)}`,
        lastname: toUpperCaseChart(userData?.lastname),
        phone: userData?.phone,
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
      data.products = productsCotization;
      data.iva = formatNumber(dataOrder?.oportunity?.totaliva);
      data.discount = formatNumber(dataOrder?.oportunity?.discount);
      data.total = formatNumber(dataOrder?.oportunity.amount);
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
      setIsLoaderSaveChanges(false);
      createTrackingUpdate();
      setTimeout(() => {
        setIsLoaderSaveChanges(false);
        router.back();
      }, 1000);
    } catch (error) {
      setIsLoaderSaveChanges(false);
      handleGlobalAlert("error", "Pedido - Ocurrió un problema!", "basic", dispatch, 6000);

      console.log(error);
    }
  };

  const createTrackingUpdate = async () => {
    try {
      let bodyNewTracking = {
        prospectId: dataOrder?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: dataOrder?.oportunityId,
        orderId: dataOrder?.id,
        reason: `Seguimiento Automático - Actualización de Información`,
        observations: `Se Actualizarón los Datos del pedido el dia ${dayjs().format("DD MMMM YYYY - HH:mm A")}`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let response = await api.post(`trackings`, bodyNewTracking);
    } catch (error) {
      console.log(error);
    }
  };
  const getFilesOrder = async () => {
    setIsLoaderFiles(true);
    try {
      let response = await api.get(`documents?where={"orderId":"${idOrder}"}`);
      setIsLoaderFiles(false);
      setFiles(response.data.results);
      setFilesRespaldo(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingPage) return <LoaderPage />;
  return (
    <MainLayout>
      <SeeOrderContainer>
        <Head>
          <title>CRM JOBS - Editar Pedido</title>
        </Head>

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
                  <p className="order__title">Pedido</p>
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
                    <Grid item md={6} xs={12}>
                      <p className="information__head__item">Observaciones de la venta</p>
                      <p className="information__head__capitalize">{dataOrder?.oportunity?.generalobservations}</p>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <p className="information__head__item">Productos</p>
                      <div className="information__head__products">
                        <p className="information__head__capitalize">Ver Todos</p>
                        <IconButton onClick={toggleModalProducts} className="information__head__iconsView">
                          <Visibility />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                  <div className="divider" />
                  <div className="information__primarySales">
                    <p>Editar Pedido.</p>
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
                              options={paymentAccount}
                              isClearable={true}
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
                          {errors.entity && errors.entity.type === "required" && (
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
                              isClearable={true}
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
                              isClearable={true}
                              isLoading={loadCities}
                              onChange={e => (e === null ? handleSelectCity("") : handleSelectCity(e))}
                              value={citiesByEntity?.filter(item => item.id === city?.id)}
                              getOptionValue={option => `${option["id"]}`}
                              getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                            />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                                className="select-options"
                                placeholder="Selecciona una Opción"
                                options={shippingsTypes}
                                isClearable={true}
                                getOptionValue={option => `${option["id"]}`}
                                getOptionLabel={option => `${option.name}`}
                              />
                            )}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item md={12} xs={12}>
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
                              checked={showDataBill}
                              onChange={() => setShowDataBill(!showDataBill)}
                              name="checkedB"
                              color="primary"
                            />
                          }
                        />
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
                                    options={taxregime}
                                    isClearable={true}
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
                                    options={cfdi}
                                    isClearable={true}
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
                                    options={paymentsMethods}
                                    isClearable={true}
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
                                    options={wayToPay}
                                    isClearable={true}
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
                                    isClearable={true}
                                    onChange={e =>
                                      e === null ? handleSelectEntitiesOrder("") : handleSelectEntitiesOrder(e.id)
                                    }
                                    value={EntitiesLocal.filter(item => item.id === entityInvoice)}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
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
                                    isClearable={true}
                                    isLoading={loadCities}
                                    onChange={e => (e === null ? handleSelectCityOrder("") : handleSelectCityOrder(e))}
                                    value={citiesByEntityInvoice?.filter(item => item.id === cityInvoice.id)}
                                    getOptionValue={option => `${option["id"]}`}
                                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
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
                      ></FilesOrders>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="btn_AddFiles"
                        onClick={() => setOpenModalAddFiles(true)}
                      >
                        Agregar
                      </Button>
                    </Grid>
                    <Box component="span" m={2}></Box>
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
                              <th className="title">
                                <div className="ctr_title">
                                  <p>Monto Total</p>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="ctr_table__body">
                            {allProducts.map((item, index) => (
                              <tr className={index % 2 == 0 ? "row" : "inpar row"} key={index}>
                                <td className="data fixed">
                                  <p className="ctr_td">{item?.product?.name}</p>
                                </td>
                                <td className="data">
                                  <p className="text">{item?.product?.code}</p>
                                </td>
                                <td className="data">
                                  <p className="text">{item?.quantity}</p>
                                </td>
                                <td className="data">
                                  $
                                  <NumberFormat
                                    value={item?.newprice === 0 ? item?.product?.callamount : item?.newprice}
                                    displayType="text"
                                    thousandSeparator={true}
                                  />
                                </td>
                                <td className="data">
                                  $<NumberFormat value={0} displayType="text" thousandSeparator={true} />
                                </td>
                                <td className="data">
                                  $
                                  <NumberFormat
                                    // value={item.newprice === 0 ? item.product?.callamount * item.quantity : item?.newprice * item.quantity}
                                    value={item?.total}
                                    displayType="text"
                                    thousandSeparator={true}
                                  />
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
                                <p>{formatNumber(dataOrder?.oportunity?.amount)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableProducts>
                    </Grid>
                  </Grid>
                  <div className="information__head__buttons">
                    <Button
                      disabled={isLoaderSaveChanges}
                      className="information__head__buttons__cancel"
                      onClick={() => router.back()}
                    >
                      Cancelar
                    </Button>
                    <Button
                      disabled={isLoaderSaveChanges}
                      className="information__head__buttons__saveChanges"
                      onClick={handleSubmit(saveChances)}
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <ModalShowProducts open={showProducts} closeProducts={closeModalProducts} allProducts={allProducts} />
        <ModalAddFilesOrders
          setOpen={setOpenModalAddFiles}
          open={openModalAddFiles}
          filesToSave={files}
          setFilesToSave={setFiles}
        />

        {isLoaderSaveChanges && <LoaderCompleteScreen />}
      </SeeOrderContainer>
    </MainLayout>
  );
}
