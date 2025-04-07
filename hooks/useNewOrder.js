import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { LocalShipping } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGlobalCommons from "./useGlobalCommons";
import { fetchUserBytoken, userSelector } from "../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, URL_SPACE, api } from "../services/api";
import { quotesSelector, setArrayExtraProducts, setArrayProducts } from "../redux/slices/quotesSlice";
import { SocketContext } from "../context/socketContext";
import { formatDate, formatDateZone, formatNumber, handleGlobalAlert, toUpperCaseChart } from "../utils";
import { getOrders } from "../redux/slices/dashboardSlice";
import { makeTemplateOrder } from "../templates/makeTemplate";
import { EntitiesLocal } from "../BD/databd";
import RequestOrders from "../services/request_Orders";

export default function useNewOrder(params) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { oportunityId = null, prospectId = null } = params;
  const { userData, id_user, company, groupId, roleId } = useSelector(userSelector);

  let apiOrders = new RequestOrders(id_user, null, null, null, null, null);

  const { productsSelected: products } = useSelector(quotesSelector);

  const { socket } = useContext(SocketContext);

  const { getCatalogBy } = useGlobalCommons();

  const [postalCode, setPostalCode] = useState("");

  const [postalCodeInvoice, setPostalCodeInvoice] = useState("");

  const [entityInvoice, setEntityInvoice] = useState("");

  const [cityInvoice, setCityInvoice] = useState("");

  const [city, setCity] = useState("");

  const [entity, setEntity] = useState("");

  const [totalShipping, seTotalShipping] = useState(0);

  const [existShipping, setExistShipping] = useState(false);

  const [flagOportunity, setFlagOportunity] = useState(false);

  const [isEditingExtraProduct, setIsEditingExtraProduct] = useState(false);

  const [openModalExtraProduct, setOpenModalExtraProduct] = useState(false);

  const [isLoaderValidating, setIsLoaderValidating] = useState(false);

  const [loaderBack, setLoaderBack] = useState(false);

  const [dataOrders, setDataOrders] = useState(false);

  const [loadCities, setLoadCities] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const [openModalAddFiles, setOpenModalAddFiles] = useState(false);

  const [citiesByEntityInvoice, setCitiesByEntityInvoice] = useState(null);

  const [citiesByEntity, setCitiesByEntity] = useState(null);

  const [extraProductSelected, setExtraProductSelected] = useState({});

  const [oportunidad, setOportunidad] = useState({});

  const [productsCotization, setProductsCotizacion] = useState([]);

  const [filesToSave, setFilesToSave] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // dispatch(fetchUserBytoken({}));
    requestOrders();
  }, []);

  useEffect(() => {
    getQuotesByOportunity();
    getDataInitial();
  }, [flagOportunity]);

  useEffect(() => {
    handleTotalShipping();
  }, [isEditingExtraProduct, products]);

  const getDataInitial = async () => {
    let params = {
      //   where: JSON.stringify(query),
      include: "prospect",
    };
    try {
      let response = await api.get(`oportunities/${oportunityId}`, { params });
      let oportunity = response.data || {};
      setOportunidad(oportunity);
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

  const getQuotesByOportunity = async () => {
    try {
      let query = {
        oportunityId: oportunityId,
      };
      let params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product, product.brand",
        all: 1,
      };
      let reponse = await api.get("productsoportunities", { params });
      let products = reponse.data.results || [];

      let shipping = products.find(item => item.product?.code == "ENVIO-UA");

      if (shipping) setExistShipping(true);

      setProductsCotizacion(products);
      dispatch(setArrayExtraProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
  const getCities = async (entityId, title) => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1011`);
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
  const requestOrders = async () => {
    try {
      let query = {
        oportunity: {
          soldbyId: id_user,
        },
      };
      let params = {
        where: JSON.stringify(query),
        count: 0,
        showproducts: 1,
        include: "oportunity",
      };
      query.oportunity = { soldbyId: id_user };
      let responseOportunity = await api.get(`orders`, { params });
      let responseCount =
        responseOportunity.data.count < 9
          ? "0" + (responseOportunity.data.count + 1)
          : responseOportunity.data.count + 1;
      setValue("folio", `${userData.username}${"PE"}-${responseCount}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotalShipping = () => {
    let totalShp = products.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    seTotalShipping(totalShp);
  };
  const handleSendNotifyOrder = async idOrder => {
    socket?.emit("send_notifyorder_individual", {
      id_user,
      companyId: company,
      idOrder,
      approved: false,
    });
  };
  const handleUploadFiles = async currentFile => {
    let filesUpdate = [...filesToSave];
    try {
      for (let i = 0; i < filesToSave.length; i++) {
        const fileToSave = filesToSave[i];
        let newData = new FormData();
        newData.append("name", fileToSave.name);
        newData.append("file", fileToSave.file);
        let responseFiles = await api.post(
          `files/uploadtofolder/${company}-G${groupId}-E${id_user}-P${prospectId}/${fileToSave.name}`,
          newData
        );
        filesUpdate[i].url = responseFiles?.data?.url;
      }
      setFilesToSave(filesUpdate);
    } catch (error) {
      alert("PEE-FU1");
      console.log("ERROR AL SUBIR ARCHIVOS");
      console.log(error);
    }

    return filesUpdate;
  };
  const handleCreateTracking = async item => {
    try {
      let today = new Date();
      let order = item.data;
      let bodyNewTracking = {
        orderId: order.id,
        prospectId: prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: oportunityId,
        reason: "Seguimiento automático",
        observations: `Pedido: ${order.folio}, creado con éxito el dia ${formatDate(today)}`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      await api.post(`trackings`, bodyNewTracking);
    } catch (error) {
      handleGlobalAlert("error", "Pedido - Error al Crear el Seguimiento del Prospecto", "basic", dispatch, 6000);
      console.log(error);
    }
  };
  const handleDeleteLocalShipping = async item => {
    let productsToUpdate = products.filter((item, index) => item.code !== "ENVIO-UA");
    dispatch(setArrayProducts(productsToUpdate));
  };
  const handleRenderButtonShipping = () => {
    let searchShipping = products.filter(item => item.product?.code == "ENVIO-UA" || item?.code == "ENVIO-UA");
    if (searchShipping.length <= 0)
      return (
        <>
          {existShipping ? null : (
            <Button
              startIcon={<LocalShipping />}
              className="button_addShipping"
              onClick={() => setOpenModalExtraProduct(true)}
            >
              Agregar Envio
            </Button>
          )}
        </>
      );
  };
  const handleCheckEmptyStates = formData => {
    if (postalCode === "") {
      toast.error("Código postal de dirección envio incorrecto", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (dataOrders == true && postalCodeInvoice === "") {
      toast.error("Código postal de factura incorrecto", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    handleCreatePedidos(formData);
  };
  const handleCreatePedidos = async formData => {
    try {
      // setLoaderBack(true);
      // setIsLoaderValidating(true);
      if (products.length > 0) {
        let shippingToPut = products.map;
        // let productsToPost = products.map((item, index) => ({
        //   prodId: item.id,
        //   quantity: item.quantity,
        //   discount: item.discount,
        //   iva: item.singleiva,
        //   total: item.total,
        //   note: item.info,
        //   newprice: item.callamount,
        //   customproduct: item.customproduct ? item?.customproduct : false,
        //   shownote: false,
        //   ejecutiveId: id_user,
        //   dispercentage: item.discountp,
        // }));

        console.log(productsToPost);

        // let response = await api.put(`oportunities/goals/${oportunidad.id}`, {
        //   addproducts: productsToPost,
        //   amount: oportunidad?.amount + totalShipping,
        //   totalextracosts: totalShipping,
        // });
      }

      let newOrder = {};
      let adress = {
        entityId: formData.entity,
        cityId: formData.city,
        postalId: postalCode,
        street: formData.street,
        int_number: formData.int_number,
        ext_number: formData.ext_number,
        references: formData.references,
        settlement: formData.cologne,
      };
      newOrder.isshipped = true;
      newOrder.folio = formData.folio;
      newOrder.companyId = userData.companyId;
      newOrder.oportunityId = oportunityId;
      newOrder.orderstatusId = "YDBO8hIj4LPZzGvgzSeyhhOs";
      newOrder.receive = formData.receive;
      newOrder.phone = formData.phone;
      newOrder.total = oportunidad.amount;
      newOrder.paymentaccountId = formData.paymentAccount.id;
      newOrder.gmtminutes = formatDateZone();
      newOrder.address = adress;
      newOrder.shippingtype = formData.shippingtype.id;
      newOrder.observations = formData.observations;
      if (dataOrders == true) {
        newOrder.billing = true;
        newOrder.billingbusiness = formData.businessName;
        newOrder.rfc = formData.rfc;
        newOrder.billingphone = formData.phoneInvoice;
        newOrder.cfdiId = formData.cfdi.id;
        newOrder.paymentmethodId = formData.paymentMethod.id;
        newOrder.paymentwayId = formData.waytoPay.id;
        newOrder.taxregimeId = formData.taxregime.id;
        let adressBilling = {
          entityId: formData.entityOrder,
          cityId: formData.cityOrder,
          postalId: postalCodeInvoice,
          street: formData.streetInvoice,
          int_number: formData.int_numberInvoice,
          ext_number: formData.ext_numberInvoice,
          settlement: formData.cologneInvoice,
        };
        newOrder.billingaddress = adressBilling;
      } else {
        newOrder.billing = false;
      }

      let orderNews = await api.post("orders", newOrder);
      //json para pdf
      let today = dayjs().format("DD-MM-YYYY");
      let entity = EntitiesLocal.filter(item => item.id == formData.entity);
      let city = citiesByEntity.filter(item => item.id == formData.city);
      let entityInvoices = EntitiesLocal.filter(item => item.id == formData.entityOrder);
      let cityInvoices = citiesByEntity.filter(item => item.id == formData.cityOrder);
      let data = {};
      data.concept = orderNews?.data?.folio;
      data.groupLogo = userData?.grouplogo;
      data.dateOrder = today;
      if (formData.observations !== "") {
        data.observations = formData.observations;
      } else {
        data.observations = "";
      }

      data.companyId = userData.companyId;
      let companys = {
        id: company,
      };
      data.companys = companys;
      let ejecutive = {
        name: `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`,
        lastname: toUpperCaseChart(userData?.lastname),
        phone: userData?.phone,
      };

      data.ejecutive = ejecutive;
      let adressPdf = {
        receive: formData.receive,
        entity: entity[0]?.name,
        city: city[0]?.name,
        postal: formData.postalcode,
        street: formData.street,
        int_number: formData.int_number,
        ext_number: formData.ext_number,
        settlement: formData.cologne,
        phone: formData.phone,
        references: formData.references,
      };
      data.adressPdf = adressPdf;
      data.paymentaccount = formData?.paymentAccount?.name;
      if (dataOrders == true) {
        let adressBilling = {
          billingbusiness: formData.businessName,
          rfc: formData.rfc,
          phone: formData.phoneInvoice,
          street: formData.streetInvoice,
          int_number: formData.int_numberInvoice,
          ext_number: formData.ext_numberInvoice,
          settlement: formData.cologneInvoice,
          postal: formData.postalCodeInvoice,
          entity: entityInvoices[0]?.name,
          city: cityInvoices[0]?.name,
        };
        data.adressBilling = adressBilling;
        data.cfdi = formData?.cfdi?.name;
        data.methodPayment = formData?.paymentMethod?.name;
        data.wayPayment = formData?.waytoPay?.name;
        data.taxregime = formData?.taxregime?.name;
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
      data.iva = formatNumber(oportunidad?.totaliva);
      data.discount = formatNumber(oportunidad?.discount);
      data.total = formatNumber(oportunidad?.amount);
      data.subtotal = formatNumber(oportunidad?.subtotal);

      return;
      let user = id_user;
      let group = userData.groupId;
      let response = makeTemplateOrder(data);
      let company = userData.companyId;
      const form = new FormData();
      form.append("name", formData.folio);
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);
      let responsePDFURL = await api.post("convert/pdf", form);
      let dataUrl = {};
      dataUrl.url = responsePDFURL.data.url;
      let orderUrl = api.put(`orders/${orderNews?.data?.id}`, dataUrl).catch(() => {
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

      if (filesToSave.length > 0) {
        let files = await handleUploadFiles();

        let dataupdate = {
          addfiles: files.map((item, index) => ({
            name: item.name,
            filestypeId: item.filestype?.id,
            url: item.url,
            orderId: orderNews.data.id,
            companyId: company,
          })),
        };

        let orderupdate = await api.put(`orders/${orderNews.data.id}`, dataupdate).catch(() => {
          alert("PEE-OR1");
        });
      }

      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      saveAs(pdfBlob, `${formData.folio}.pdf`);
      handleGlobalAlert("success", "Pedido - Creado correctamente!", "basic", dispatch, 6000);
      handleSendNotifyOrder(orderNews.data.id);
      handleCreateTracking(orderNews);
      dispatch(getOrders({ id: id_user }));
      setLoaderBack(false);
      setIsLoaderValidating(false);
      router.push({
        pathname: roleId == "administracion" ? "/administracion/pedidos" : "/pedidos",
      });
    } catch (error) {
      alert("PEE-FU1");

      console.log(error);
      handleGlobalAlert("error", "Pedido - Ocurrió un problema!", "basic", dispatch, 6000);
      setLoaderBack(false);
      setIsLoaderValidating(false);
    }
  };
  const handleEntitieCityByPostals = async (code, title) => {
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
      } else {
        if (title == "postal order") {
          setPostalCodeInvoice("");
        } else {
          setPostalCode("");
        }
      }
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
  const handleSelectCity = item => {
    if (item === "") {
      setCity({});
    } else {
      setCity(item);
      setValue("city", item.id);
    }
  };
  const handleSelectEntitiesOrder = id => {
    setEntityInvoice(id);
    setCityInvoice({});
    getCities(id, "order");
    setValue("entityOrder", id);
  };
  const handleSelectCityOrder = item => {
    if (item === "") {
      setCityInvoice({});
    } else {
      setCityInvoice(item);
      setValue("cityOrder", item.id);
    }
  };

  return {
    oportunidad,
    flagOportunity,
    existShipping,
    productsCotization,
    products,
    socket,
    isEditingExtraProduct,
    totalShipping,
    filesToSave,
    openModalExtraProduct,
    postalCode,
    isLoaderValidating,
    loaderBack,
    postalCodeInvoice,
    entityInvoice,
    loadCities,
    citiesByEntityInvoice,
    citiesByEntity,
    cityInvoice,
    entityInvoice,
    city,
    entity,
    postalCode,
    showAll,
    extraProductSelected,
    openModalAddFiles,
    dataOrders,
    setFlagOportunity,
    setIsEditingExtraProduct,
    setFilesToSave,
    setOpenModalExtraProduct,
    setPostalCode,
    setIsLoaderValidating,
    setLoaderBack,
    setDataOrders,
    setPostalCodeInvoice,
    setLoadCities,
    setCitiesByEntityInvoice,
    setCitiesByEntity,
    setCityInvoice,
    setEntityInvoice,
    setCity,
    setEntity,
    setShowAll,
    setExtraProductSelected,
    setOpenModalAddFiles,
    handleSendNotifyOrder,
    handleUploadFiles,
    handleCreateTracking,
    handleDeleteLocalShipping,
    handleRenderButtonShipping,
    handleCheckEmptyStates,
    handleEntitieCityByPostals,
    handleSelectEntities,
    handleSelectCity,
    handleSelectEntitiesOrder,
    handleSelectCityOrder,
    getShippins,
    getDataInitial,
    getQuotesByOportunity,
    getCities,
    getCatalogBy,
    dispatch,
    // hooks
    register,
    handleSubmit,
    setValue,
    control,
    errors,
  };
}
