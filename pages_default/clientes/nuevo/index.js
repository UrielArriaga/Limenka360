import React, { useContext, useEffect, useRef, useState } from "react";
import NavBarDashboard from "../../../components/NavBarDashboard";
import { Grid, Button, Tooltip, Box, Checkbox } from "@material-ui/core";
import Head from "next/head";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { colors, device } from "../../../styles/global.styles";
import DrawerCotizacion from "../../../components/DrawerCotizacion";
import RequestCommon from "../../../services/request_Common";
import { Alert } from "@material-ui/lab";
import { Add, Assignment, CalendarToday, ContactsOutlined, Delete, Settings } from "@material-ui/icons";
import SideBar from "../../../components/SideBar";
import { useRouter } from "next/router";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../services/api";
import { ErrorFlag, ProspectosStyled, TableProducts, MenuContainer } from "../../../styles/Cotizaciones/nuevo.styled";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { quotesSelector, setArrayProducts } from "../../../redux/slices/quotesSlice";
import { normalizeOpportunity, normalizeQuote } from "../../../utils/normalizeData";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { formatDate, formatDateToISO, handleAlert } from "../../../utils";
import {
  getCountCustomers,
  getCountOportunities,
  getCountProspect,
  getPayments,
} from "../../../redux/slices/dashboardSlice";
import { userSelector } from "../../../redux/slices/userSlice";
import FormatPayments from "../../../components/FormatPayments";
import dayjs from "dayjs";
import { months } from "../../../BD/databd";
import moment from "moment";
import { format } from "path";
import useValidateLogin from "../../../hooks/useValidateLogin";
import LoaderPage from "../../../components/LoaderPage";
import Congratulations from "../../../components/Congratulations";
import { MoreVert } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import { createTheme } from "@mui/material/styles";
import { MenuIcon } from "../../../styles/Cotizaciones/nuevo.styled";
import { setProductSelect } from "../../../redux/slices/quotesSlice";
import ModifyProductModal from "../../../components/ModifyProductModal";
import { formatNumber, formatNumberNoSymbol, toUpperCaseChart } from "../../../utils";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import ModalTutorialPayment from "../../../components/ModalTutorialPayment";
import { createNewTracking } from "../../../redux/slices/trackingSlice";
import { SocketContext } from "../../../context/socketContext";
import { companySelector } from "../../../redux/slices/companySlice";
import MainLayout from "../../../components/MainLayout";
import DrawerFileEjecutive from "../../../components/DrawerFileEjecutive";

export default function NuevoCliente() {
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [productsSelected, setProductsSelected] = useState(initialProducts);
  // * sidebar estado
  const [open, setOpen] = useState(false);
  const [phases, setPhases] = useState([]);
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [showFalseAlert, setShowFalseAlert] = useState(false);
  const [producto, setProducto] = useState([]);
  const [price, setPrice] = useState(null);
  const [amountProduct, setAmountProduct] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(null);
  const [totalPieces, setTotalPieces] = useState(null);
  const [priceUnit, setPriceUnit] = useState(null);
  const [totalFinal, setTotalFinal] = useState(null);
  const [showDrawer, setshowDrawer] = useState(false);
  const [defaultCommision, setDefaultCommision] = useState(3);
  const router = useRouter();
  const [oportunidad, setOportunidad] = useState([]);
  const [productsCotization, setProductsCotizacion] = useState([]);
  const { productSelect, productsSelected: products } = useSelector(quotesSelector);
  const { id_user, name, groupId } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [totals, setTotals] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [isOkPayments, setIsOkPayments] = useState(false);
  const [addShipping, setAddShipping] = useState(false);
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const { socket } = useContext(SocketContext);
  const { id_company } = useSelector(companySelector);
  const [disableButton, setDisableButton] = useState(true);
  const [periodicityOfPayments, setPeriodicityOfPayments] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [productToEdit, setProductToEdit] = useState({ product: "" });
  const [indexProduct, setIndexProduct] = useState();
  const [showDrawerFile, setShowDrawerFile] = useState(false);
  const [dataFileDrawer, setDataFileDrawer] = useState(null);
  
  const handleChange = event => {
    setAddShipping(event.target.addShipping);
  };
  const [shipPrice, setShipPrice] = useState(0);

  const handleClick = (event, index) => {
    setIndexProduct(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectProduct = (item, itemQuantity) => {
    let obj = { ...item };
    obj.quantity = itemQuantity;
    dispatch(setProductSelect(obj));
    setProductToEdit(productsCotization[indexProduct]);
    setOpenQuantity(!openQuantity);
  };

  //motivo de cierre
  const [clossingReasons, setClossingReasons] = useState([]);
  const [typeSales, setTypeSales] = useState([]);
  //++++++++++++++++++++++++pagos
  const [showAll, setShowAll] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const commonApi = new RequestCommon();

  
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, []);

  const getDataInitial = async () => {
    let param = {
      id: router.query.o,
    };

    try {
      let responseOportunity = await api.get(`oportunities?where=${JSON.stringify(param)}&include=prospect`);
      setOportunidad(responseOportunity.data.results[0]);
    } catch (error) {}
  };
  useEffect(() => {
    getQuotesByOportunity();
    getClossingReasons();
    getTypeSales();
  }, []);

  //peticion motivo de cierre
  const getClossingReasons = async () => {
    try {
      let clossing = await commonApi.getClossingReasons();
      setClossingReasons(clossing?.data?.results);
    } catch (error) {}
  };

  const getTypeSales = async () => {
    try {
      let typeSales = await commonApi.getTypeSales();
      setTypeSales(typeSales?.data?.results);
    } catch (error) {}
  };

  const getQuotesByOportunity = async () => {
    try {
      let query = {
        oportunityId: router.query.o,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product,product.brand,deliverytime",
        all: 1,
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      setProductsCotizacion(products);
    } catch (error) {}
  };
  useEffect(() => {
    setDataForm();
  }, [oportunidad]);

  const setDataForm = () => {
    console.log("oportunidad", oportunidad);
    setValue("concept", oportunidad.concept);
    // setValue("estimatedclossing", dayjs(oportunidad.estimatedclossing).format("YYYY-MM-DD"));
    setValue("quantity", oportunidad.quantity);
    setValue("amount", oportunidad.amount);
    setValue("commission", oportunidad.comission);
    setValue("discounted", oportunidad.discount);
    setValue("soldat", dayjs().format("YYYY-MM-DD"));
  };

  const convertUTCDate = objeto => objeto.map(item => ({ ...item, date: formatDateToISO(item.date) }));

  const checkPayment = arr => {
    if (!Array.isArray(arr)) {
      return { isValid: false, error: "Datos de entrada inválidos" };
    }

    // Recorre el array buscando el primer objeto con `ispaid` en `true` que tenga campos requeridos vacíos
    for (let index = 0; index < arr.length; index++) {
      const obj = arr[index];

      // Verificar si el objeto actual existe y tiene `ispaid` en `true`
      if (obj && obj.ispaid === true) {
        let errorMessages = [];

        // Verificar si el tipo de pago es requerido y está vacío
        if (!obj.paymentwayId || obj.paymentwayId.trim() === "") {
          errorMessages.push("Tipo de pago es requerido");
        }

        // Verificar si la cuenta de pago es requerida y está vacía
        if (!obj.paymentaccountId || obj.paymentaccountId.trim() === "") {
          errorMessages.push("Cuenta de pago es requerida");
        }

        // Si se encontraron errores, retorna el primero encontrado con el número de fila
        if (errorMessages.length > 0) {
          return {
            isValid: false,
            error: `Fila ${index + 1}: ${errorMessages.join(", ")}`,
          };
        }
      }
    }

    // Si no se encuentran errores, se considera válido
    return { isValid: true, error: null };
  };

  const createSale = async formDataCotizacion => {
    const { isValid, error } = checkPayment(totals);

    if (!isValid) {
      handleAlert("error", error, "basic", setAlert);
      return;
    }

    let newPay = {};
    newPay.payments = convertUTCDate(totals);

    // Ajustar los campos después de la asignación inicial
    for (let i = 0; i < newPay.payments.length; i++) {
      let payment = newPay.payments[i];

      // Asignar paymentperiodId
      payment.paymentperiodId = payment.period;

      // Eliminar paymentaccountId si es undefined o vacío
      if (!payment.paymentaccountId || payment.paymentaccountId.trim() === "") {
        delete payment.paymentaccountId;
      }

      // Eliminar paymentwayId si es undefined o vacío
      if (!payment.paymentwayId || payment.paymentwayId.trim() === "") {
        delete payment.paymentwayId;
      }
    }
    try {
      if (isOkPayments === true) {
        setIsCreatingCustomer(true);
        let newSales = {};
        let timeNow = dayjs().format("HH:mm:ss");
        newSales.soldat = dayjs(`${formDataCotizacion.soldat} ${timeNow}`).toISOString();
        newSales.iscloseout = true;
        newSales.typesalesId = formDataCotizacion?.typesalesId;
        newSales.generalobservations = formDataCotizacion?.generalobservations;
        newSales.clossingreasonId = formDataCotizacion?.closingReason;
        newSales.soldbyId = id_user;
        newSales.ispaid = true;
        let resProspect = await api.put(`prospects/goals/${oportunidad.prospectId}`, {
          isclient: true,
          status: 3,
        });

        if (resProspect.status !== 200) return alert("Algo salio mal");

        let resOportunity = await api.put(`oportunities/goals/${router.query.o}`, newSales);

        if (resOportunity.status !== 200) return alert("Algo salio mal");
   
        let res = await api.post("salespayments", newPay);
        setIsCreatingCustomer(false);

        //Crear el objeto
        let trackings = {
          reason: `Nuevo cliente`,
          observations: `Pago por ${oportunidad.amount} realizado`,
          status: 1,
          actionId: ACTIONIDPRODUCTIONMODE,
          prospectId: oportunidad.prospectId,
          phaseId: PHASEIDPRODUCTIONMODE, //Cuenta por cobrar
        };

        //Crear el seguimiento del pago
        let paymentTracking = await api.post("trackings", trackings);

        handleAnimation();
      } else {
        setIsCreatingCustomer(true);
        let newSales = {};
        let timeNow = dayjs().format("HH:mm:ss");
        newSales.soldat = dayjs(`${formDataCotizacion.soldat} ${timeNow}`).toISOString();
        newSales.iscloseout = true;
        newSales.generalobservations = formDataCotizacion?.generalobservations;
        newSales.clossingreasonId = formDataCotizacion?.closingReason;
        newSales.soldbyId = id_user;
        newSales.typesalesId = formDataCotizacion?.typesalesId;

        let resProspect = await api.put(`prospects/goals/${oportunidad.prospectId}`, {
          isclient: true,
          status: 3,
        });

        if (resProspect.status !== 200) return alert("Algo salio mal");

        let resOportunity = await api.put(`oportunities/goals/${router.query.o}`, newSales);

        if (resOportunity.status !== 200) return alert("Algo salio mal");

        //Delete this next 3 lines, debug mode
        // setIsCreatingCustomer(false);
        // console.log("salespayments", totals);
        // return;

        let res = await api.post("salespayments", newPay);
        let proOportunities = await api.get(`oportunities/${router.query.o}`);

        socket?.emit("send_notify_activity", {
          activity: {
            type: "create",
            from: "clients",
            message: `Venta creada por ${name} `,
            data: {
              ...oportunidad,
              products: proOportunities?.data?.productsoportunities,
            },
            ejecutiveId: id_user,
            groupId: groupId,
            companyId: id_company,
          },
        });

        setIsCreatingCustomer(false);
        handleAnimation();
      }
      let todayDate = dayjs().startOf("day").add(1, "millisecond").toISOString();
      if (oportunidad?.prospect?.clientat === null || oportunidad?.prospect?.clientat === "") {
        let updateDateClientProspect = await api.put(`prospects/${oportunidad.prospectId}`, { clientat: todayDate });
        // socket?.emit("send_notify_activity", {
        //   activity: {
        //     type: "create",
        //     from: "clients",
        //     message: `Venta creada por ${name} `,
        //     data: updateDateClientProspect.data,
        //     ejecutiveId: id_user,
        //     groupId: groupId,
        //     companyId: id_company,
        //   },
        // });
      }

      let bodyNewTracking = {
        prospectId: router.query.p,
        status: "3",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: "",
        reason: `Oportunidad Convertida a venta `,
        observations: `Oportunidad Convertida a venta por un monto de ${oportunidad?.amount} `,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };

      dispatch(
        createNewTracking({
          data: bodyNewTracking,
        })
      );

      // console.log("tracking", bodyNewTracking);

      //Guarda la frecuencia al final
      let data = {
        paymentperiodicity: periodicityOfPayments,
      };
      await api.put(`oportunities/${router.query.o}`, data);
    } catch (error) {
      console.log("error", error);
      handleAlert("error", "Ocurrio un problema,intentelo mas tarde", "basic", setAlert);
      setIsCreatingCustomer(false);
    }
  };

  const handleAnimation = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);

      let queryCustomersExecutive = {
        isclient: true,
        ejecutiveId: id_user,
      };

      let paramsCustomersExecutive = {
        where: JSON.stringify(queryCustomersExecutive),
        count: 1,
        limit: 0,
      };

      dispatch(getCountOportunities({ params: paramsCustomersExecutive }));
      dispatch(getCountCustomers({ params: paramsCustomersExecutive }));
      dispatch(getPayments({ id: id_user }));
      router.push("/clientes");
    }, 8000);
  };

  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };

  const handleAction = item => setshowDrawer(true);

  // const ship = () => {
  //   let copy = {
  //     id: "12d09ENVIO22mowzna3P0008",
  //     name: "Envio",
  //     callamount: addShipping ? shipPrice : 0,
  //     code: "ENVIO-UA",
  //     import: true,
  //     brandId: "62d09Tuuhp22mowzna3pO002",
  //     categoryId: "62d09Tuuhp22mowzna3pH027",
  //     producttypeId: "62d09Tuuhp22mowzna3pR001",
  //     category: {
  //       id: "62d09Tuuhp22mowzna3pH027",
  //       name: "ENVIO",
  //       createdAt: "2022-07-26T13:28:55.097Z",
  //       updatedAt: "2022-07-26T13:28:55.097Z",
  //       companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  //     },
  //     brand: {
  //       id: "62d09Tuuhp22mowzna3pO002",
  //       name: "ENVIO",
  //       isactive: true,
  //       createdAt: "2022-07-26T13:28:55.097Z",
  //       updatedAt: "2022-07-26T13:28:55.097Z",
  //       brandlineId: null,
  //     },
  //     index: null,
  //     quantity: 1,
  //     iva: 0,
  //     singleiva: 32854.4,
  //     discount: 0,
  //     discountp: 0,
  //     totalWithoutIva: 205340,
  //     total: 238194.4,
  //   };
  //   setProductsCotizacion([...productsCotization, copy]);
  //
  //
  // };
  const renderFileIntoDrawer = (data) => {
    if(!data?.payFile) return;
    let url = URL.createObjectURL(data?.payFile);
    setDataFileDrawer({url,type:data?.payFile?.type});
    setShowDrawerFile(true);
  }

  if (isLoadingPage) return <LoaderPage />;
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
                <h2
                  onClick={() => {
                    console.log("datos de oportunidad", oportunidad);
                  }}
                >
                  Nuevo Cliente(Venta)
                </h2>
              </div>
            </div>
            <form onSubmit={handleSubmit(createSale)}>
              <Grid container spacing={1} className="form">
                <Grid item xs={12} sm={12} md={12}>
                  <label className="item">
                    Folio <strong>*</strong>
                  </label>
                  <input
                    disabled
                    autoComplete="off"
                    {...register("concept", { required: true })}
                    name="concept"
                    id="title"
                    type="text"
                    placeholder="Ingrese el nombre"
                    className="input disabled"
                  />
                  {errors.concept && errors.concept.type === "required" && <ShowAlert info="Requerido" />}
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Fecha de cierre <strong>*</strong>
                  </label>
                  <input className="input" {...register("soldat", { required: true })} type="date" />
                  {errors.estimatedclosing && errors.estimatedclosing.type === "required" && (
                    <ShowAlert info="Requerido" />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Motivo de cierre <strong>*</strong>
                  </label>
                  <select
                    {...register("closingReason", { required: true })}
                    name="closingReason"
                    id="closingReason"
                    type="texto"
                    placeholder="%"
                    className="input"
                  >
                    <option hidden value="">
                      Seleccione motivo cierre
                    </option>
                    {clossingReasons.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.reason}
                      </option>
                    ))}
                  </select>
                  {errors.closingReason && errors.closingReason.type === "required" && <ShowAlert info="Requerido" />}
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
                        {...register("amount", { required: true })}
                        name="amount"
                        id="amount"
                        type="number"
                        autoComplete="off"
                      />
                      <div className="Etiqueta">
                        <p className="porcentain">$</p>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">Comisión</label>
                  <div className="containerCommision">
                    <div className="inputcontainer">
                      <div className="inputAmount">
                        <input
                          value={defaultCommision}
                          onChange={e => {
                            setDefaultCommision(e.target.value);
                          }}
                          className="input3"
                          placeholder="Ingresa Comisión"
                          autoComplete="off"
                          disabled
                        />
                        <div className="Etiqueta">
                          <p className="porcentain">%</p>
                        </div>
                      </div>
                    </div>
                    <div className="inputcontainer">
                      <div className="inputAmount">
                        <input
                          className="input3"
                          {...register("commission", { required: true })}
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
                  <label className="item">Descuento</label>
                  <div className="containerCommision">
                    <div className="inputcontainer">
                      <div className="inputAmount">
                        <input
                          {...register("discounted")}
                          name="discounted"
                          className="input3"
                          placeholder="Ingresa Descuento"
                          autoComplete="off"
                          disabled
                        />

                        <div className="Etiqueta">
                          <p className="porcentain">%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">
                    Tipo de venta <strong>*</strong>
                  </label>
                  <select
                    {...register("typesalesId", { required: true })}
                    name="typesalesId"
                    id="typesaleId"
                    type="texto"
                    placeholder="%"
                    className="input"
                  >
                    <option hidden value="">
                      Seleccione el tipo de venta
                    </option>
                    {typeSales.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.typesalesId && errors.typesalesId.type === "required" && <ShowAlert info="Requerido" />}
                </Grid>
                <Grid item xs={12} md={6}>
                  <label className="item">Envio</label>
                  {/* <Checkbox
                  style={{ margin: 0, marginLeft: 5, padding: 0 }}
                  checked={addShipping}
                  onChange={(e) => {
                    
                    setAddShipping(e.target.checked);
                    if (!e.target.checked) {
                      setValue("shipping", 0);
                    }
                  }}
                /> */}

                  <div className="inputcontainer">
                    <div className="inputAmount">
                      <input type="number" value={oportunidad.totalextracosts} className="input3" />
                      <div className="Etiqueta">
                        <p className="porcentain">$</p>
                      </div>
                      {/* <div className="button" onClick={() => ship()}>
                      <p className="porcentain">Aplicar</p>
                    </div> */}
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className="item">Observaciones</label>
                  <input
                    className="input"
                    {...register("generalobservations", { required: true })}
                    name="generalobservations"
                    id="generalobservations"
                    placeholder="Ingresa Observaciones"
                  />
                  {errors.generalobservations && errors.generalobservations.type === "required" && (
                    <ShowAlert info="Requerido" />
                  )}
                </Grid>
              </Grid>
              <div className="actions-products" display="flex" mt={2} mb={1}>
                {/* <Button startIcon={<Add />} variant="contained" className="btn_add" onClick={() => handleAction()}>
                <p>Agregar Producto</p>
              </Button> */}
                <Button
                  startIcon={<CalendarToday />}
                  variant="contained"
                  className="btn_Calendar"
                  onClick={() => {
                    setShowAll(!showAll);
                  }}
                >
                  <p> {showAll ? " Ocultar Calendario de Pagos" : "Ver Calendario de Pagos"}</p>
                </Button>
              </div>
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
                      <th className="title fixedlast">
                        <div className="ctr_title">
                          <Settings />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="ctr_table__body">
                    {productsCotization.map((item, index) => (
                      <tr className={index % 2 === 0 ? "row" : "inpar row"} key={index}>
                        <td className="data fixed">
                          <p className="ctr_td">{item.product?.name}</p>
                        </td>
                        <td className="data">
                          <p className="text">{item.product?.code}</p>
                        </td>
                        <td className="data">
                          <p className="text">{item.quantity}</p>
                        </td>
                        <td className="data">
                          ${" "}
                          <NumberFormat
                            value={item.newprice === 0 ? item.product?.callamount : item?.newprice}
                            displayType="text"
                            thousandSeparator={true}
                          />
                        </td>
                        <td className="data">
                          $ <NumberFormat value={0} displayType="text" thousandSeparator={true} />
                        </td>
                        <td className="data">
                          $ <NumberFormat value={item.total} displayType="text" thousandSeparator={true} />
                        </td>
                        <td className="data">
                          <MenuIcon
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            onClick={event => handleClick(event, index)}
                          >
                            <MoreVert className="icon" />
                          </MenuIcon>
                          <MenuContainer
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                handleSelectProduct(item.product, item.quantity);
                              }}
                            >
                              <EditIcon className="icon_item" /> Modificar
                            </MenuItem>
                          </MenuContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="totalcontainer">
                  <div className="totalcontainer__items">
                    {/* <div className="totalcontainer__item">
                    <div className="text ">
                      <p>Iva</p>
                    </div>
                    <div className="value">
                      <p>{formatNumber(oportunidad.totaliva)}</p>
                    </div>
                  </div>

                  <div className="totalcontainer__item">
                    <div className="text ">
                      <p>Descuento</p>
                    </div>
                    <div className="value">
                      <p>-{formatNumber(oportunidad.discount)}</p>
                    </div>
                  </div>

                  <div className="totalcontainer__item">
                    <div className="text bold">
                      <p>Sub Total</p>
                    </div>
                    <div className="value bold">
                      <p>{formatNumber(0)}</p>
                    </div>
                  </div> */}
                    <div className="totalcontainer__item">
                      <div className="text bold">
                        <p>Total</p>
                      </div>
                      <div className="value bold">
                        <p>{formatNumber(oportunidad.amount)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TableProducts>

              <Grid container>
                <Grid item xs={12} md={12}>
                  <FormatPayments
                    totals={totals}
                    setTotals={setTotals}
                    showAll={showAll}
                    comisionTotal={oportunidad.comission}
                    amountTotal={oportunidad.amount}
                    isOkPayments={isOkPayments}
                    setIsOkPayments={setIsOkPayments}
                    oportunitiId={router.query.o}
                    defaultCommision={defaultCommision}
                    setDisableButton={setDisableButton}
                    disableButton={disableButton}
                    setPeriodicityOfPayments={setPeriodicityOfPayments}
                    renderFileIntoDrawer={renderFileIntoDrawer}

                  />
                  <div className="ctr_buttons">
                    <Button
                      variant="contained"
                      className={`btn_generate ${disableButton && "disable"}`}
                      type="submit"
                      disabled={disableButton}
                    >
                      <Assignment />
                      <p>Generar Venta</p>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>

            <DrawerFileEjecutive show={showDrawerFile} closeDrawer={()=> setShowDrawerFile(!showDrawerFile)} dataFileDrawer={dataFileDrawer}/>

            <DrawerCotizacion
              width={"60%"}
              show={showDrawer}
              producto={producto}
              setProducto={setProducto}
              closeDrawer={() => setshowDrawer(!showDrawer)}
              ShowAlert={ShowAlert}
              // amountProduct={amountProduct}

              totalPieces={totalPieces}
              discountTotal={discountTotal}
              totalFinal={totalFinal}
              priceUnit={priceUnit}
              setAlert={setAlert}
            />
          </div>
        </div>

        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}

        {showConfetti && <Congratulations />}

        <ModifyProductModal
          setOpen={setOpenQuantity}
          open={openQuantity}
          setAlert={setAlert}
          productToEdit={productToEdit}
          getQuotesByOportunity={getQuotesByOportunity}
        />

        {isCreatingCustomer && <LoaderCompleteScreen />}
      </ProspectosStyled>
    </MainLayout>
  );
}

const initialProducts = [
  {
    id: "62d09Tuuhp22mowzna3P0001",
    name: "CAMILLA DE TRASLADO DE EMERGENCIA CON BARANDALES TIPO ABS",
    amount: "16258.62",
    createdAt: "2022-08-10T20:56:15.233Z",
    updatedAt: "2022-08-10T20:56:15.233Z",
    brandId: "62d09Tuuhp22mowzna3pO002",
    categoryId: "62d09Tuuhp22mowzna3pH027",
    providerId: "62d09Tuuhp22mowzna3pG001",
    producttypeId: "62d09Tuuhp22mowzna3pR003",
  },
  {
    id: "62d09Tuuhp22mowzna3P0002",
    name: "CAMILLA HIDRAULICA CON BARANDAL DE ALUMINIO, COMPATIBLE CON RAYOS-X",
    amount: "20224.14",
    createdAt: "2022-08-10T20:56:15.233Z",
    updatedAt: "2022-08-10T20:56:15.233Z",
    brandId: "62d09Tuuhp22mowzna3pO002",
    categoryId: "62d09Tuuhp22mowzna3pH027",
    providerId: "62d09Tuuhp22mowzna3pG001",
    producttypeId: "62d09Tuuhp22mowzna3pR003",
  },
  {
    id: "62d09Tuuhp22mowzna3P0003",
    name: "CAMILLA DE TRASLADO HIDRAULICA CON RESPALDO RADIOTRANSPARENTE",
    amount: "20224.14",
    createdAt: "2022-08-10T20:56:15.233Z",
    updatedAt: "2022-08-10T20:56:15.233Z",
    brandId: "62d09Tuuhp22mowzna3pO002",
    categoryId: "62d09Tuuhp22mowzna3pH027",
    providerId: "62d09Tuuhp22mowzna3pG001",
    producttypeId: "62d09Tuuhp22mowzna3pR003",
  },
];

let copy = {
  id: "12d09ENVIO22mowzna3P0008",
  name: "Envio",
  callamount: 0,
  code: "ENVIO-UA",
  import: true,
  brandId: "62d09Tuuhp22mowzna3pO002",
  categoryId: "62d09Tuuhp22mowzna3pH027",
  producttypeId: "62d09Tuuhp22mowzna3pR001",
  category: {
    id: "62d09Tuuhp22mowzna3pH027",
    name: "ENVIO",
    createdAt: "2022-07-26T13:28:55.097Z",
    updatedAt: "2022-07-26T13:28:55.097Z",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  },
  brand: {
    id: "62d09Tuuhp22mowzna3pO002",
    name: "ENVIO",
    isactive: true,
    createdAt: "2022-07-26T13:28:55.097Z",
    updatedAt: "2022-07-26T13:28:55.097Z",
    brandlineId: null,
  },
  index: null,
  quantity: 1,
  iva: 0,
  singleiva: 32854.4,
  discount: 0,
  discountp: 0,
  totalWithoutIva: 205340,
  total: 238194.4,
};
