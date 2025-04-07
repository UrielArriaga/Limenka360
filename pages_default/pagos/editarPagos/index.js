import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Close,
  Visibility,
  ArrowBack,
  MoneyOffOutlined,
  AttachMoneyOutlined,
  LoyaltyOutlined,
  MonetizationOnOutlined,
} from "@material-ui/icons";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Dialog,
  LinearProgress,
} from "@material-ui/core";
import { api } from "../../../services/api";
import { toUpperCaseChart } from "../../../utils";
import { months } from "../../../BD/databd";
import { useRouter } from "next/router";
import Head from "next/head";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import PaymentCalendar from "../../../components/UI/organism/PaymentCalendar";
import MainLayout from "../../../components/MainLayout";

export default function EditarPagos() {
  const router = useRouter();
  const { id_user, roleId } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  const [isLoading, setisLoading] = useState(true);
  const [showConfirmPay, setShowConfirmPay] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [open, setOpen] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const [refetchEditPayment, setRefetchEditPayment] = useState(false);
  const [refetchEditComission, setRefetchEditComission] = useState(false);
  const [isDatesOk, setIsDatesOk] = useState(true);
  const [isPaymentOk, setIsPaymentOk] = useState(true);
  const [isComissionOk, setIsComissionOk] = useState(true);
  const [alertAddTotalPayments, setAlertAddTotalPayments] = useState(false);
  const [isLoaderSaveChanges, setIsLoaderSaveChanges] = useState(false);
  const [isAllPaymentsArePayed, setIsAllPaymentsArePayed] = useState(false);
  const [alertDate, setAlertDate] = useState();
  const [alertPayment, setalertPayment] = useState();
  const [alertComission, setalertComission] = useState();
  const [totalPendingPayments, setTotalPendingPayments] = useState(0);
  const [totalPayedPayments, setTotalPayedPayments] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [comissionDebt, setComissionDebt] = useState(0);
  const [newAmountPayments, setNewAmountPayments] = useState(0);
  const [comisionTotal, setComissionTotal] = useState(0);
  const [typeComision, setTypeComision] = useState("");
  const [dataTempStatus, setDataTempStatus] = useState({});
  const [dataPayment, setDataPayment] = useState({});
  const [dataOportunity, setDataOportunity] = useState({}); //al cargar los datos, aqui se guardan los datos de la oportunidad
  const [allProducts, setAllProducts] = useState([]);
  const [dataPayments, setDataPayments] = useState([]);
  const [respaldo, setRespaldo] = useState([]);
  const [typePeriodicity, setTypePeriodicity] = useState("Semanal");
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const [totals, setTotals] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [oportunidad, setOportunidad] = useState([]);
  const [isOkPayments, setIsOkPayments] = useState(false);
  const [defaultCommision, setDefaultCommision] = useState(3);

  //Importaciones para la funcion de fecha de Dayjs con forme a la hora local UTC
  const relativeTime = require("dayjs/plugin/relativeTime");
  const utc = require("dayjs/plugin/utc");
  const timezone = require("dayjs/plugin/timezone");
  const customParseFormat = require("dayjs/plugin/customParseFormat");
  const dateAddByPeriod = {
    Semanal: { lapse: 7, period: "day" },
    Quincenal: { lapse: 15, period: "day" },
    Mensual: { lapse: 1, period: "month" },
    Bimestral: { lapse: 2, period: "month" },
    Trimestral: { lapse: 3, period: "month" },
    Semestral: { lapse: 6, period: "month" },
    Anual: { lapse: 1, period: "year" },
  };

  const getPeriodicity = {
    "en 7 días": "Semanal",
    "en 15 días": "Quincenal",
    "en un mes": "Mensual",
    "en 7 días": "Bimestral",
    "en 15 días": "Trimestral",
    "en un mes": "Semestral",
    "en 7 días": "Anual",
  };
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(customParseFormat);

  useEffect(() => {
    getDataPayments();
    getProductsFromOportunity(router.query.o);
  }, [router.query, isRefetch]);

  useEffect(() => {
    applyChangesOnPayments();
  }, [refetchEditPayment]);

  useEffect(() => {
    applyChangesOnComissions();
  }, [refetchEditComission]);

  //Petición para traer la data de los pagos por la oportunidad
  const getDataPayments = async () => {
    try {
      let query = {
        oportunityId: router.query.o,
      };
      const params = {
        where: JSON.stringify(query),
        include: "oportunity,oportunity.prospect",
        join: "oportunity,oportunity.prospect",
        order: "date",
        all: "1",
      };
      let total = 0;
      let comision = 0;
      let countPaymentsPayed = 0;
      let response = await api.get(`salespayments`, { params });
      let resultados = response.data.results;
      let amountPending = 0;
      let amountPayed = 0;

      //ciclo que hace la función de calcular el total de los pagos, comisión y en su caso de igual manera el monto a deber
      for (let i = 0; i < resultados.length; i++) {
        total += resultados[i].payment;
        comision += resultados[i].comission;
        if (resultados[i].ispaid) {
          countPaymentsPayed += 1;
          amountPayed += resultados[i].payment;
        } else {
          amountPending += resultados[i].payment;
        }
      }
      //se guardan los valores obtenidos dentro de los estados
      setTotalPendingPayments(amountPending);
      setTotalPayedPayments(amountPayed);

      //condicional para calcular si todos los pagos se encuentran pagados
      if (countPaymentsPayed >= resultados.length) {
        setIsAllPaymentsArePayed(true);
      } else {
        setIsAllPaymentsArePayed(false);
      }
      setDataPayments(resultados);

      //a la "data" obtenida se genera un respaldo, el cual es la información obtenida sin algún cambio aplicado, y se normaliza para no crear conflicto con algún
      //otro arreglo y se guarda dentro del estado de respaldo
      let normalizeToBack = resultados.map((item, index) => {
        let payment = {
          x: index,
          idP: item.id,
          ispaidP: item.ispaid,
          comissionP: item.comission,
          dateP: item.date,
          observationsP: item.observations,
          oportunityP: item.oportunity,
          oportunityIdP: item.oportunityId,
          paymentP: item.payment,
          createdAtP: item.createdAt,
          updatedAtP: item.updatedAt,
        };
        return payment;
      });

      //estados donde se guardan los resultados de las operaciones anteriores
      setRespaldo(normalizeToBack);
      setComissionDebt(comision);
      setTotalDebt(total);
      //se envia la data de la oportunidad del pago para guardar en un estado
      showDataOportunity(resultados[0].oportunity, resultados);
      //comision total de la venta
      setComissionTotal(resultados[0].oportunity.comission);
      //se envía la data obtenida a una función donde calculara la Periodicidad aplicada a los pagos
      calculatePeiodicity(resultados);
      setNewAmountPayments(resultados.length);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //función para obtener los productos vendidos dentro de la oportunidad
  const getProductsFromOportunity = async idOportunity => {
    try {
      let query = { id: idOportunity };
      let oportunity = await api.get(`oportunities?where=${JSON.stringify(query)}&showproducts=1`);
      let products = oportunity.data.results[0].productsoportunities;
      //Ordenar los productos alfabéticamente
      products.sort((a, b) => {
        return a.product.name.toUpperCase() > b.product.name.toUpperCase() ? 1 : -1;
      });
      setAllProducts(products);
    } catch (error) {
      console.log("error al mostrar los productos", error);
    }
  };

  const showDataOportunity = (oportunity, data) => {
    setDataOportunity(oportunity);
    //se valida si la comision del primer pago es la comision global, para que en automático
    //el select usado tome el valor, ya que en base se guarda otro tipo de comision dentro de la oportunidad
    if (data[0].comission === oportunity.comission) {
      setTypeComision("Primer Pago");
    } else {
      setTypeComision("Prorrateadas");
    }
  };

  const splitDate = str => {
    let dates = dayjs(str);
    let month = months.filter((i, ix) => ix == dates.month());
    let day = dates.format("D");
    let year = dates.year();
    return `${month[0]} ${day}, ${year}`;
  };

  const openConfirmPay = item => {
    setShowConfirmPay(true);
    setDataPayment(item);
  };

  const closeConfirmPay = () => {
    setDataTempStatus({});
    setShowConfirmPay(false);
  };

  //función en la que nos ayuda a cerrar el modal de completar pago y de igual manera actualizar el estatus del pago
  const updatePayment = () => {
    editAnyPayment("status", dataTempStatus.index, dataTempStatus.value);
    closeConfirmPay();
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: null, show: null, message: "", type: null });
    }, 3000);
  };

  const formatDate = item => {
    let date = dayjs(item).format("YYYY-MM-DD");
    return date;
  };

  //esta función recibe cambios que se realicen dentro del arreglo mostrado al usuarios, dependiendo del lugar donde se efectué, mostrara el cambio
  const editAnyPayment = (nameLocationArray, positionArray, itemValue) => {
    console.log("editAnyPayment", nameLocationArray, positionArray, itemValue);

    switch (nameLocationArray) {
      //dependiendo de la posición donde realice el cambio se aplicara, o de igual manera aparte de aplicar generara otra funcion
      case "payment":
        dataPayments[positionArray].payment = Number(itemValue);
        applyChangesOnPayments(itemValue, positionArray);
        deletePaymentZero();
        break;
      case "comission":
        dataPayments[positionArray].comission = Number(itemValue);
        applyChangesOnComissions({ valuePosition: itemValue, indexPosition: positionArray });
        break;
      case "date":
        dataPayments[positionArray].date = itemValue;
        updateDatesPaymentsByDatePayment(itemValue, positionArray);
        break;
      case "reference":
        dataPayments[positionArray].observations = itemValue;
        break;
      case "status":
        dataPayments[positionArray].ispaid = itemValue;
        break;
      default:
        break;
    }
    setRefetchEditPayment(!refetchEditPayment);
  };

  //recibirá el valor y la position donde se haya efectuado un cambio y realiza
  const applyChangesOnPayments = (itemValue, positionArray) => {
    //recibe el valor y el lugar dentro del arreglo para hacer el cambio
    let totalPaymentsPending = 0;
    let amountPayed = 0;
    for (let i = 0; i < dataPayments.length; i++) {
      if (dataPayments[i].ispaid === "true" || dataPayments[i].ispaid) {
        amountPayed += Number(dataPayments[i].payment);
      } else {
        totalPaymentsPending += 1;
      }
    }

    //validación de recibir variables con información
    if (itemValue !== undefined || positionArray !== undefined) {
      //al monto total de la oportunidad se le resta el calculo de los pagos con estatus de "pagado"
      let newAmountTotal = totalDebt - amountPayed;
      //se realiza una operación para que al momento de realizar el cambio del monto del pago, de igual manera calcule la comision respectiva al monto del pago
      if (typeComision === "Prorrateadas") {
        //para aplicar los cambios de la comision se enviar a la función que aplica los cambios
        editAnyPayment("comission", positionArray, (comisionTotal * itemValue) / newAmountTotal);
      }
      if (Number(itemValue) <= newAmountTotal) {
        //en caso de que el monto ingresado sea menor al monto restante ejecutara la función ya que si no es asi, mostrara números negativos
        let newPayment = (newAmountTotal - Number(itemValue)) / (totalPaymentsPending - 1);
        //calcula el nuevo pago a pintar a los pagos que no han sido modificados, se calcula el monto pendiente y se divide entro los mismos, a excepción del que se esta editando
        for (let i = 0; i < dataPayments.length; i++) {
          //su función es pintar el nuevo pago calculado anteriormente en los pagos pendientes
          if (i !== positionArray && !dataPayments[i].ispaid) {
            dataPayments[i].payment = newPayment.toFixed(4);
          }
        }
        setalertPayment("");
        setIsPaymentOk(true);
      } else {
        //el estado de abajo funciona como alerta ya que en caso de que el monto ingresado en el pago sea mayor al monto pendiente, arrojara una alerta
        //notificando dicho problema
        setalertPayment(positionArray);
        setIsPaymentOk(false);
      }
    }
  };

  //esta funcion ejecuta y aplica los cambios dentro de las comisiones
  const applyChangesOnComissions = item => {
    //se valida que al cambiar sobre el campo de comision al iniciar este vació
    if (item !== undefined) {
      let totalPaymentsPending = 0;
      let comissionComplete = 0;

      // dataPayments.forEach(item => {
      //   //verifica la cantidad de pagos pendientes al momento de realizar cambio en alguna comision
      //   if (item.ispaid === false || item.ispaid === "false") {
      //     totalPaymentsPending += 1;
      //   }
      // });

      for (let i = 0; i < dataPayments.length; i++) {
        if (!dataPayments[i].ispaid || dataPayments[i].ispaid === "false") {
          totalPaymentsPending += 1;
        } else {
          comissionComplete += Number(dataPayments[i].comission);
        }
        //verifica los pagos con estatus de "pagado", y realiza la suma de las comision ya "pagadas"
        // if (dataPayments[i].ispaid === "true" || dataPayments[i].ispaid === true) {
        //   comissionComplete += Number(dataPayments[i].comission);
        // }
      }

      if (item.typeComi === "Primer Pago") {
        dataPayments[0].comission = comisionTotal.toFixed(1);
        //de igual manera esta función recibe el valor del select de "comision", y en caso de que el select se encuentre en primer pago,
        //la comision se aplicara solamente en el primer pago, y los demás pagos sus comisiones cambiarían a 0
        for (let i = 1; i < dataPayments.length; i++) {
          // if (!dataPayments[i].downpayment)
          dataPayments[i].comission = 0;
        }
      } else {
        //en caso de que la comision sea "prorrateada" entra aqui y en caso de que algunos pagos ya hayan
        //sido realizados se los restara a la comision pendiente en tiempo real para tener una nueva
        //comision y poder repartir en los pagos que aun no esten marcados como "pagados"
        let newComissionTotal = comissionDebt - comissionComplete;
        if (item.indexPosition !== undefined) {
          //en caso de que la nueva comision que se ingresa en tiempo real sea menor a la comision que falta por cobrar
          //realiza el ingreso a los pagos pendientes con la nueva comision anteriormente calculada
          if (item.valuePosition <= newComissionTotal) {
            let newPayment = (newComissionTotal - item.valuePosition) / (totalPaymentsPending - 1);
            //muestra la nueva comision calculada a los pagos pendientes
            for (let i = 0; i < dataPayments.length; i++) {
              if (i !== item.indexPosition && dataPayments[i].ispaid === false) {
                dataPayments[i].comission = newPayment.toFixed(1);
              }
            }
            //alerta por si la comision ingresada es mayor a la comision restante
            setalertComission("");
            setIsComissionOk(true);
          } else {
            setIsComissionOk(false);
            setalertComission(item.indexPosition);
          }
        } else {
          //en caso de que solamente haga el cambio en el select de "Pago unico" a "prorratedas" aqui divide la comision pendiente entre
          //los pagos restantes
          let newComission = comissionDebt / totalPaymentsPending;
          for (let i = 0; i < dataPayments.length; i++) {
            dataPayments[i].comission = newComission.toFixed(1);
          }
          //en caso de que el primer pago ya haya sido marcado como "pagado" y la comision quedo en el primer pago
          //no dejara que la comision de reparta a los demas pagos, si esta marcado como pendiente dejara repartir la comision con los demas pagos
        }
      }
    }
  };
  const validateDisabled = item => {
    //funcion para deshabilitar los campos de los pagos en caso de que estos ya esten completos
    return item.itemValue || item.itemValue === "true" || item.comission === "Primer Pago";
  };

  const validateLastPayment = (length, item) => {
    return length === 1 || item.ispaid || item.ispaid === "true";
  };

  const validateOptionPay = (index, value) => {
    //validar que el pago anterior este pagado para poder confirmar el siguiente pago
    if (index < 1) return value;
    if (value === "true" || value) {
      return true;
    } else {
      return !(dataPayments[index - 1].ispaid === "true" || dataPayments[index - 1].ispaid);
    }
  };

  const addMorePayments = quantity => {
    //Funcion de prueba para en caso de que se ingresen más cantidad de pagos estos se generen de manera automatica
    setNewAmountPayments(quantity);
    let quantityNewPayments = 0;
    let newPay = 0;
    let newComission = 0;
    let totalPaymentsPending = 0;
    let totalPendingsPayed = 0;
    let amountPaymentsPending = 0;
    let amountComissionPending = 0;
    let paymentsToAdd = 0;
    dataPayments.forEach(item => {
      if (item.ispaid === false || item.ispaid === "false") {
        //realiza el conteo de pagos que este con estatus pendiente, realiza la suma de los pagos pendientes, y la comision de igual manera pendiente
        totalPaymentsPending += 1;
        amountPaymentsPending += item.payment;
        amountComissionPending += item.comission;
      }
    });
    dataPayments.forEach(item => {
      if (item.ispaid || item.ispaid === "true") {
        totalPendingsPayed += 1;
      }
    });

    if (Number(quantity) > totalPendingsPayed && amountPaymentsPending > 0) {
      //en caso de que la cantidad de pagos a agregar sea mayor a la de pagos con estatus "pagados", y el monto pendiente sea mayor a 0, ingresara
      //y dejara al usuario agregar más pagos
      //si la cantidad de pagos ingresados de igual manera es mayor a la de pagos ya mostrados se ejecutara.
      if (Number(quantity) > dataPayments.length) {
        //se realiza un calculo de la cantidad de pagos, y se restan los pagos con estatus de "pagado", ya que estos no pueden ser editados o restados
        //si ya se han pagado
        quantityNewPayments = quantity - totalPendingsPayed;
        //se calcula la cantidad de pagos a agregar
        paymentsToAdd = quantity - dataPayments.length;
        //se calcula el nuevo monto de los nuevos campos
        newPay = amountPaymentsPending / quantityNewPayments;
        //de igual manera se calcula la comision de los nuevos pagos
        newComission = amountComissionPending / quantityNewPayments;

        //se busca la fecha del ultimo pago, esto para saber que fechas se agregaran a los nuevos pagos
        let lastDate = dataPayments[dataPayments.length - 1].date;
        let newCount = 0;
        for (let i = 0; i < paymentsToAdd; i++) {
          //este ciclo agregara los pagos nuevos
          newCount += 1;
          //verifica la periodicidad para de esta manera calcular la fecha de los nuevos pagos, si son semanales, mensuales, anuales, etc.
          let dateFormat = dayjs(lastDate)
            .add(dateAddByPeriod[typePeriodicity]?.lapse * newCount, dateAddByPeriod[typePeriodicity]?.period)
            .format("YYYY-MM-DD");

          //se agregan los nuevos pagos al arreglo mostrado al usuario
          setDataPayments(payment => [
            ...payment,
            {
              comission: typeComision === "Primer Pago" ? 0 : newComission, //en caso de que el tipo de comision es primer pago agrega a los nuevos pagos 0, de lo contrario les agrega su comision respectiva
              date: dayjs(dateFormat).add(1, "second").utc().format(),
              ispaid: false,
              observations: "",
              oportunityId: dataOportunity.id,
              payment: newPay,
            },
          ]);
        }
        updateToAdd(newPay, newComission); //se ejecuta la funcion que actualiza los datos al agregar pagos
      } else {
        if (Number(quantity) > 0) {
          //en este caso verifica si el numero ingresado no sea negativo, y en caso de que los pagos esten con estatus pendientes pueda quitarlos del arreglo
          let quantityPaymentsDelete = dataPayments.length - quantity;
          //ejecutara la funcion para poder eliminar los pagos
          deletePayments(quantityPaymentsDelete, amountPaymentsPending, amountComissionPending);
        }
      }
    }
    if (Number(quantity) >= totalPendingsPayed) {
      setAlertAddTotalPayments(false);
    } else {
      //en caso de que la cantidad de pagos ingresados sea menor a la cantidad de pagos con estatus "pagado", se mostrara una alerta notificando
      //que los pagos ingresados debe ser mayor a los pagos con estatus "pagado"
      setAlertAddTotalPayments(true);
    }
  };

  const handleSelectPeriodicity = item => {
    if (item === "Pago único") addMorePayments(1);

    setTypePeriodicity(item || "Semanal");
    let lastPaymentPending;
    let indexLast = 0;
    //al cambiar la Periodicidad, realiza una verificacion en la cual, el ciclo nos ayudara a buscar el primer pago encontrado con estatus de "pendiente"
    for (let i = 0; i < dataPayments.length; i++) {
      if (dataPayments[i].ispaid === "false" || !dataPayments[i].ispaid) {
        lastPaymentPending = dataPayments[i];
        indexLast = i;
        i += dataPayments.length;
      }
    }
    //y los datos encontrados los mandara a la funcion que realiza la actualizacion de datos al cambiar la Periodicidad
    updateDatesPaymentsByPeriodicity(indexLast, lastPaymentPending.date, item);
  };

  const handleSelectStatusPayment = (payment, index, value) => {
    openConfirmPay(payment);
    //se guarda la info recibida en un estado, para marcar el pago como realizado, ya que se abre un modal para mostrar la informacion del pago a actualizar el estatus
    setDataTempStatus({ index: index, value: value });
  };

  //la funcionde abajo, realiza el calculo de comisiones y pagos con los pagos que quedaron al ser eliminados algunos
  const calculateToDelete = () => {
    let quantityPaymentsPending = 0;
    let amountPaymentsComplete = 0;
    let amountComissionComplete = 0;
    let newAmountPending = 0;
    let newComissionPending = 0;
    let newPaymentsToUpdate = 0;
    let newComissionToUpdate = 0;
    for (let i = 0; i < dataPayments.length; i++) {
      //realiza el conteo de pagos con estado pendiente que quedaron al ser eliminados algunos
      if (dataPayments[i].ispaid === "false" || dataPayments[i].ispaid === false) {
        quantityPaymentsPending += 1;
      }
    }
    for (let i = 0; i < dataPayments.length; i++) {
      if (dataPayments[i].ispaid === "true" || dataPayments[i].ispaid) {
        //realiza el conteo de pagos con estado pagado y realiza la suma de sus comisiones y montos
        amountPaymentsComplete += dataPayments[i].payment;
        amountComissionComplete += dataPayments[i].comission;
      }
    }
    newAmountPending = totalDebt - Number(amountPaymentsComplete);
    newComissionPending = comissionDebt - Number(amountComissionComplete);
    newPaymentsToUpdate = newAmountPending / quantityPaymentsPending;
    newComissionToUpdate = newComissionPending / quantityPaymentsPending;
    //los datos recaudados se envian a la funcion que actualiza los datos al eliminarse algun pago
    updateToDelete(newPaymentsToUpdate, newComissionToUpdate);
  };

  //esta funcion sirve para calcular la Periodicidad que traen los pagos al cargar la data
  const calculatePeiodicity = payments => {
    // if (payments.length > 1) {
    //   let days = dayjs(payments[0].date).to(payments[1].date);
    //   setTypePeriodicity(getPeriodicity[days]);
    // }
  };

  //la funcion de abajo dependiendo del pago, si su monto llega a 0, filtra los pagos cuyo monto sea 0 y de esta manera elimina el pago con monto de 0
  const deletePaymentZero = () => {
    let zero = dataPayments.filter(item => {
      if (item.payment !== 0) {
        return item;
      }
    });
    setDataPayments(zero);
    setNewAmountPayments(zero.length);

    //actualiza los datos con los filtrado anteriormente
    //actualiza el campo de "total de nuevos pagos con el arreglo actualizado"
  };

  //la funcion de abajo elimina los pagos, segun el total de pagos ingresados
  const deletePayments = quantity => {
    for (let i = 0; i < quantity; i++) {
      dataPayments.pop();
    }
    //al eliminar pagos, ejecuta la funcion para realizar calculos del comisiones y montos para actualizar los pagos sobrantes
    calculateToDelete();
  };

  //la funcion de abajo, actualiza los datos al agregarse un nuevo campo
  const updateToAdd = (newPay, newComission) => {
    for (let i = 0; i < dataPayments.length; i++) {
      //actualizara los datos a los pagos con estatus de pendiente
      if (dataPayments[i].ispaid === "false" || dataPayments[i].ispaid === false) {
        dataPayments[i].payment = newPay.toFixed(4);
        //de igual manera la comision de los pagos, pero esto dependera del tipo de comision aplicada
        if (typeComision === "Prorrateadas") {
          dataPayments[i].comission = newComission.toFixed(4);
        } else {
          dataPayments[0].comission = comisionTotal;
        }
      }
    }
  };

  //la funcion de abajo, actualizara los datos al momento de que se elimine algun pago
  const updateToDelete = (newPaymentsToUpdate, newComissionToUpdate) => {
    for (let i = 0; i < dataPayments.length; i++) {
      if (dataPayments[i].ispaid === "false" || dataPayments[i].ispaid === false) {
        //actualizara los datos a los pagos con estatus de pendiente
        dataPayments[i].payment = newPaymentsToUpdate;
        //de igual manera la comision de los pagos, pero esto dependera del tipo de comision aplicada
        if (typeComision === "Prorrateadas") {
          dataPayments[i].comission = newComissionToUpdate;
        } else {
          dataPayments[0].comission = comisionTotal;
        }
      }
    }
  };

  //la funcion de abajo editara las fechas de los pagos mediante el select de Periodicidad
  const updateDatesPaymentsByPeriodicity = (indexPayment, datePayment, periodicity) => {
    //el indexPayment es el index del ultimo pago calculado con el select de periodicity

    //en este caso la fecha la actualizara conforme al ultimo pago calculado en el select
    let newDate = dayjs(dataPayments[indexPayment].date).format("YYYY-MM-DD");

    let newCount = 0;
    //en este apartado actualizara las fechas de los pagos con estatus pendiente, apartir de la fecha que se especifico anteriormente y de igual manera
    //dependera de la Periodicidad
    for (let i = indexPayment; i < dataPayments.length; i++) {
      let dateFormat;
      if (dataPayments[i].ispaid === "false" || !dataPayments[i].ispaid) {
        dateFormat = dayjs(newDate)
          .add(dateAddByPeriod[periodicity]?.lapse * newCount, dateAddByPeriod[periodicity]?.period)
          .format("YYYY-MM-DD");
        newCount += 1;

        dataPayments[i].date = dayjs(dateFormat).add(1, "second").utc().format();
      }
    }
  };

  useEffect(() => {
    console.log("dataPayments", dataPayments);
  }, [dataPayments]);

  //la funcion de abajo realiza la actualizacion de los pagos, al editar una fecha en especifico
  const updateDatesPaymentsByDatePayment = (date, positionPayment) => {
    console.log("editing", date, positionPayment, typePeriodicity);
    let firstDate;
    let secondDate;
    let dateFirstFormat;
    let dateSecondFormat;

    // if (positionPayment >= 1) {
    //   //esta condicion realiza la funcion de validar la fecha que se esta modificando, en caso de que la posicion del pago sea mayor a 1 va a tomar de refencia la anterior a el
    //   firstDate = new Date(dataPayments[positionPayment - 1].date);
    //   secondDate = new Date(date);
    //   dateFirstFormat = firstDate.getTime();
    //   dateSecondFormat = secondDate.getTime();
    // } else {
    //   //en caso de que no se cumpla y el pago este en la primera posicion, se le quita un dia y se toma de referencia dicha fecha
    //   let calculateDate = dayjs(respaldo[0].dateP).subtract(1, "day").format("YYYY/MM/DD");
    //   firstDate = new Date(calculateDate);
    //   secondDate = new Date(date);
    //   dateFirstFormat = firstDate.getTime();
    //   dateSecondFormat = secondDate.getTime();
    // }
    // if (dateSecondFormat > dateFirstFormat) {
    //si la segunda fecha es mayor a la fecha anterior realiza las funciones
    setAlertDate("");
    setIsDatesOk(true);
    let newCount = 0;
    //al cambiar una fecha de una cierta posicion, actualizara las fechas que le siguen, dependiendo de igualmanera de la Periodicidad aplicada
    for (let i = positionPayment + 1; i < dataPayments.length; i++) {
      if (!dataPayments[i]?.ispaid) {
        newCount += 1;

        let dateFormat = dayjs(date)
          .add(dateAddByPeriod[typePeriodicity]?.lapse * newCount, dateAddByPeriod[typePeriodicity]?.period)
          .format("YYYY-MM-DD");
        console.log(
          "DATE",
          typePeriodicity,
          dateAddByPeriod,
          dateAddByPeriod[typePeriodicity]?.lapse,
          dateAddByPeriod[typePeriodicity]?.period
        );

        dataPayments[i].date = dayjs(dateFormat).add(1, "second").utc().format();
      }
    }
    // } else {
    //   //en caso de que la fecha no sea mayor mostrara una alerta en donde notificara que la fecha debe ser mayor a su antecesora
    //   setIsDatesOk(false);
    //   setAlertDate(positionPayment);
    // }
  };

  //recibe el valor de un booleano pero en ocaciones esta se recibia como "cadena", se formatea a booleano
  const formatingTrueFalse = item => {
    return item || item === "true";
  };

  //recibe el valor de la fecha en formato UTC y se formatea a un formato de YYYY-MM-DD y se devuelve en dicho formato
  const formatingFirstDate = item => {
    return dayjs(item).format("YYYY-MM-DD");
  };
  //recibe el valor de la fecha en formato UTC y se formatea a un formato de YYYY-MM-DD y se devuelve en dicho formato
  const formatingSecondDate = item => {
    let date = dayjs(item).format("YYYY-MM-DD");
    return date;
  };

  //guarda la data
  const saveChances = async () => {
    setIsLoaderSaveChanges(true);
    try {
      //aqui valida si las fechas estan correctamente ingresadas (que el pago siguiente a uno, su fecha no puede ser menor a el)
      //valida si el pago es correcto, que no sea mayor al monto total de la oportunidad
      //valida si la comision es correcta, que no sea mayor a la total,o pendiente por cobrar
      if (isDatesOk && isPaymentOk && isComissionOk) {
        //filtra los pagos que no cuenten id, estos seran los nuevos pagos a guardar
        console.log("Datapayments", dataPayments, respaldo);
        let newPaymentsAdd = dataPayments.filter(item => item.id === undefined);

        //filtra a los pagos con id, estos son los que ya estaban al cargar los datos
        let paymentsWithId = dataPayments.filter(item => item.id !== undefined);

        //aqui se hace la comparacion del arreglo que se muestra al usuario con el de respaldo y valida que pagos ya no se encuentran en el nuevo arreglo
        //pero en el respaldo si aparecen, estos pagos son los que han sido eliminados, o remplazados
        // let del = respaldo.filter(object1 => {
        //   return !dataPayments.some(object2 => {
        //     return object1.idP === object2.id;
        //   });
        // });

        console.log("paymentsWithId", paymentsWithId);
        //de los pagos con id del nuevo arreglo se comparan con el de respaldo y los que contengan algun cambio, esto para realizar un update en la peticion
        let search = paymentsWithId.filter(payment => {
          return !respaldo.find(resp => {
            return (
              resp.idP == payment.id &&
              resp.ispaidP == formatingTrueFalse(payment.ispaid) &&
              resp.comissionP == payment.comission &&
              resp.paymentP == payment.payment &&
              resp.observationsP == payment.observations &&
              formatingFirstDate(resp.dateP) == formatingSecondDate(payment.date)
            );
          });
        });
        console.log("search", search);

        //se formatean los pagos a eliminar para la peticion a la base
        // let formatToDelete = del.map(item => {
        //   let formatPayment = {
        //     comission: item.comissionP,
        //     createdAt: item.createdAtP,
        //     date: item.dateP,
        //     paymentId: item.idP,
        //     ispaid: item.ispaidP,
        //     observations: item.observationsP,
        //     oportunity: item.oportunityP,
        //     oportunityId: item.oportunityIdP,
        //     payment: item.paymentP,
        //     updatedAt: item.updatedAtP,
        //   };
        //   return formatPayment;
        // });

        //se formatean los pagos para actualizar y enviar en la peticion a la base
        let formatUpdate = search.map(item => {
          let formatPayment = {
            id: item.id,
            comission: +item.comission,
            downpayment: item.downpayment,
            date: item.date,
            paymentId: item.id,
            ispaid: item.ispaid,
            observations: item.observations,
            oportunityId: item.oportunityId,
            payment: +item.payment,
            paymentiva: item.paymentiva,
            ejecutiveId: item.ejecutiveId,
          };
          return formatPayment;
        });
        let queryUpdatePayments = {};
        let queryNewPayments = {};
        //se concatenan los datos que requieren el mismo tipo de peticion "put", para no generar mas de una
        // let concatPayments = [...formatUpdate, ...formatToDelete];
        let concatPayments = [...formatUpdate];
        console.log("formatUpdate", formatUpdate);
        queryNewPayments.payments = newPaymentsAdd;
        queryUpdatePayments.payments = concatPayments;

        // setIsLoaderSaveChanges(false);
        // return;

        if (formatUpdate.length > 0) {
          let res = await api.put("salespayments", { payments: formatUpdate });
        }

        // let bodyNewTracking = {
        //   prospectId: router.query.p,
        //   status: "3",
        //   actionId: ACTIONIDPRODUCTIONMODE,
        //   oportunityId: "",
        //   reason: `Cambio en pagos`,
        //   observations: `Se cambiaron los pagos`,
        //   createdbyId: id_user,
        //   phaseId: PHASEIDPRODUCTIONMODE,
        // };

        // let trackings = {
        //   reason: `Nuevo cliente`,
        //   observations: `Pago por ${amountTotal} realizado`,
        //   status: 1,
        //   actionId: ACTIONIDPRODUCTIONMODE,
        //   prospectId: oportunidad.prospectId,
        //   phaseId: PHASEIDPRODUCTIONMODE, //Cuenta por cobrar
        // };

        // dispatch(
        //   createNewTracking({
        //     data: bodyNewTracking,
        //   })
        // );

        // if (del.length > 0 || search.length > 0) {
        //   let response = await api.put(`salespayments`, queryUpdatePayments);
        // }

        handleAlert("success", "Pago - Pagos Actualizados!", "basic");
        setIsRefetch(!isRefetch);
        setisLoading(!isLoading);
        setIsLoaderSaveChanges(false);
      } else {
        //en caso de que haya fallado alguna validacion mandara una alerta notificando en donde se encuentra el problema y coloque los datos correctamente el usuario
        setIsLoaderSaveChanges(false);

        if (!isDatesOk) {
          handleAlert("error", "Verifica las Fechas de Pagos Ingresadas", "basic");
        }
        if (!isPaymentOk) {
          handleAlert("error", "Verifica el Monto de los Pagos Ingresados", "basic");
        }
        if (!isComissionOk) {
          handleAlert("error", "Verifica la Comision Ingresada en los Pagos", "basic");
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoaderSaveChanges(false);
    }
  };

  const calculateProgress = total => {
    let progressPorcent = (totalPayedPayments * 100) / total;
    console.log("porcentaje", progressPorcent);
    return progressPorcent;
  };

  const openProducts = () => setShowProducts(true);
  const closeProducts = () => setShowProducts(false);

  if (isLoadingPage) return <LoaderPage />;
  return (
    <MainLayout>
      <SeeFullPaymentContainer>
        <Head>
          <title>CRM JOBS - Editar Pagos</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="contenido_pagos">
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
                <div className="title">
                  <IconButton onClick={() => router.back()}>
                    <ArrowBack className="icon" />
                  </IconButton>
                </div>
                <div className="information">
                  <p className="information__title">Información de la Venta</p>
                  <Grid container spacing={5}>
                    <Grid item md={7} sm={12} xs={12}>
                      <Grid container className="information__cards" spacing={5}>
                        <Grid item>
                          <CardAmountTotal elevation={2}>
                            <div className="content">
                              <div className="content__head">
                                <MonetizationOnOutlined className="icon" />
                              </div>
                              <NumberFormat
                                className="content__quantity"
                                value={dataOportunity?.amount}
                                thousandSeparator={true}
                                displayType="text"
                                prefix="$"
                              />
                              <p className="content__title">Monto Total de la Venta</p>
                            </div>
                          </CardAmountTotal>
                        </Grid>
                        <Grid item>
                          <CardAmountCommision elevation={2}>
                            <div className="content">
                              <div className="content__head">
                                <LoyaltyOutlined className="icon" />
                              </div>
                              <NumberFormat
                                className="content__quantity"
                                value={dataOportunity?.comission}
                                thousandSeparator={true}
                                displayType="text"
                                prefix="$"
                              />
                              <p className="content__title">Comisión</p>
                            </div>
                          </CardAmountCommision>
                        </Grid>
                        <Grid item>
                          <CardAmountPayed elevation={2}>
                            <div className="content">
                              <div className="content__head">
                                <AttachMoneyOutlined className="icon" />
                              </div>
                              <NumberFormat
                                className="content__quantity"
                                value={totalPayedPayments}
                                thousandSeparator={true}
                                displayType="text"
                                prefix="$"
                              />
                              <p className="content__title">Total Pagado</p>
                            </div>
                          </CardAmountPayed>
                        </Grid>
                        <Grid item>
                          <CardAmountPending elevation={2}>
                            <div className="content">
                              <div className="content__head">
                                <MoneyOffOutlined className="icon" />
                              </div>
                              <NumberFormat
                                className="content__quantity"
                                value={totalPendingPayments}
                                thousandSeparator={true}
                                displayType="text"
                                prefix="$"
                              />
                              <p className="content__title">Total Pendiente</p>
                            </div>
                          </CardAmountPending>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                      <Grid container spacing={2} className="information__container">
                        <Grid item md={6} sm={6} xs={12} className="information__container__item">
                          <p className="information__container__item__title">Folio</p>
                          <p className="information__container__item__data">{dataOportunity?.concept}</p>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="information__container__item">
                          <p className="information__container__item__title">Nombre del Cliente</p>
                          <p className="information__container__item__data">
                            {toUpperCaseChart(dataOportunity?.prospect?.name) +
                              " " +
                              toUpperCaseChart(dataOportunity?.prospect?.lastname)}
                          </p>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="information__container__item">
                          <p className="information__container__item__title">Fecha de Venta</p>
                          <p className="information__container__item__data">
                            {dayjs(dataPayments[0].createdAt).format("DD MMMM YYYY")}
                          </p>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="information__container__item">
                          <p className="information__container__item__title">Productos</p>
                          <p className="information__container__item__data">
                            Ver Todos
                            <IconButton onClick={openProducts}>
                              <Visibility />
                            </IconButton>
                          </p>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className="information__container__item">
                          <p className="information__container__item__title">Observaciones de la Venta</p>
                          <p className="information__container__item__observations">
                            {toUpperCaseChart(dataOportunity?.generalobservations)}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                {isAllPaymentsArePayed && roleId != "gerente" ? (
                  <div>Todos los Pagos han sido Completados</div>
                ) : dataPayments[0] ? (
                  <PaymentCalendar dataPayments={dataPayments} isRefetch={isRefetch} setIsRefetch={setIsRefetch} />
                ) : (
                  <p>Buscando pagos...</p>
                )}
              </>
            )}
          </div>
        </div>
        <AlertConfirmPay open={showConfirmPay} onClose={closeConfirmPay}>
          <DialogTitle id="alert-dialog-title">{"Confirmación de Pago"}</DialogTitle>
          <DialogContent>
            ¿Confirmas que se ha realizado el pago?
            <Grid container spacing={1} className="oportunityData">
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Folio </p>
                <p className="oportunityData__data">{dataPayment?.oportunity?.concept}</p>
              </Grid>
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Monto a Pagar</p>
                <p className="oportunityData__data">
                  <NumberFormat value={dataPayment?.payment} thousandSeparator="," displayType="text" prefix="$" />
                </p>
              </Grid>
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Fecha limite de Pago</p>
                <p className="oportunityData__data">{splitDate(dataPayment?.date)}</p>
              </Grid>
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Nombre del Cliente</p>
                <p className="oportunityData__data">{`${toUpperCaseChart(
                  dataPayment?.oportunity?.prospect?.name
                )} ${toUpperCaseChart(dataPayment?.oportunity?.prospect?.lastname)}`}</p>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="buttons">
            <button className="buttons__cancel" onClick={closeConfirmPay}>
              Cancelar
            </button>
            <button className="buttons__save" onClick={updatePayment}>
              Marcar como Pagado
            </button>
          </DialogActions>
        </AlertConfirmPay>
        <ShowProducts open={showProducts} onClose={closeProducts}>
          <div className="header">
            <p className="header__title">Productos</p>
            <IconButton onClick={() => closeProducts()}>
              <Close className="header__icon" />
            </IconButton>
          </div>
          <DialogContent className="contenido">
            {allProducts?.map(item => (
              <Paper elevation={2} className="product" key={item.id}>
                <div className="product__infoName">
                  <p className="product__infoName__title">Nombre</p>
                  <p className="product__infoName__info">{item.product?.name}</p>
                </div>
                <div className="quantities">
                  <div className="quantities__infoPrice">
                    <p className="quantities__infoPrice__title">Precio Unitario</p>
                    <NumberFormat
                      value={item.product?.callamount}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      className="quantities__infoPrice__info"
                    />
                  </div>
                  <div className="quantities__infoQuantity">
                    <p className="quantities__infoQuantity__title">Cantidad</p>
                    <NumberFormat
                      value={item.quantity}
                      displayType="text"
                      thousandSeparator=","
                      className="quantities__infoQuantity__info"
                    />
                  </div>
                </div>
              </Paper>
            ))}
          </DialogContent>
        </ShowProducts>
        {alert?.show && (
          <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
        )}
      </SeeFullPaymentContainer>
    </MainLayout>
  );
}
const SeeFullPaymentContainer = styled.div`
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
    .contenido_pagos {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .title {
        /* display: grid; */
        /* grid-template-columns: 35px auto; */
        /* margin-bottom: 15px; */
        p {
          letter-spacing: 0.04em;
          margin-bottom: 15px;
          font-size: 22px;
          font-weight: bold;
        }
        button {
          height: 30px;
          width: 30px;
          border-radius: 50px;
          border-width: 0px;
          background-color: #407aff;
        }
        .icon {
          color: #fff;
        }
      }

      .information {
        margin-bottom: 30px;
        &__cards {
          display: flex;
          justify-content: center;
        }
        &__title {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 18px;
        }
        &__container {
          margin-bottom: 35px;
          &__item {
            width: 100%;
            &__title {
              font-size: 14px;
              color: grey;
            }
            &__data {
              font-size: 16.5px;
              font-weight: 500;
            }
            &__observations {
              margin-top: 5px;
              font-size: 15.5px;
              font-weight: 500;
              border-radius: 8px;
              padding: 6px;
              border: 1px solid #9b9b9b;
              text-align: justify;
            }
          }
        }
        input {
          margin-top: 10px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 10px 23px 9px 11px;
          -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
          outline: none;
        }
        select {
          margin-top: 10px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 10px 23px 9px 11px;
          -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
        }
      }
      .payments {
        &__title {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        &__head {
          display: flex;
          width: 100%;
          margin-bottom: 20px;
          &__item {
            &__totalPayments {
              /* display: flex; */
              align-items: center;
              &__icon {
                color: red;
                font-size: 18px;
                margin-left: 5px;
                &:hover {
                  cursor: pointer;
                }
              }
            }
            &__inputTotal {
              width: 90%;
              padding: 2px;
              border-radius: 5px;
            }
            &__selectPeriocidad {
              width: 90%;
              border-radius: 5px;
              padding: 2px;
            }
            &__selectComission {
              width: 90%;
              padding: 2px;
              border-radius: 5px;
            }
          }
          &__title {
            font-size: 16px;
            font-weight: 500;
          }
          &__icon {
            margin-left: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        &__restoreData {
          display: flex;
          align-items: center;
          justify-content: right;
          &__button {
            display: flex;
            align-items: center;
            text-transform: capitalize;
            border-radius: 8px;
            background-color: #407aff;
            color: #fff;
            font-size: 13px;
          }
        }
        &__containerAll {
          max-height: 500px;
          overflow-x: hidden;
          overflow-y: auto;
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
          .paperContent {
            margin-top: 20px;
            border-radius: 5px;
            padding: 10px;
            .itemCenter {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .titleItem {
              display: flex;
              align-items: center;
              &__iconAlert {
                font-size: 18px;
                color: red;
                margin-left: 5px;
                margin-top: -2px;
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .productsList {
              margin-top: 5px;
              margin-left: 15px;
              &__item {
                font-size: 11px;
                font-weight: 500;
              }
            }
            p {
              font-size: 13px;
              font-weight: bold;
              color: #4f4f4f;
              width: fit-content;
            }
            .p--red {
              font-size: 13px;
              font-weight: bold;
              color: #a53232;
            }
            .p--disabled {
              font-size: 13px;
              font-weight: bold;
              color: grey;
            }
            .p--green {
              font-size: 13px;
              font-weight: bold;
              color: #1b5e20;
            }
            .iconConfirm {
              transition: 0.3s;
              text-decoration: underline;
              &:hover {
                color: #407aff;
                cursor: pointer;
              }
            }
            .disabled {
              color: grey;
            }
            .iconPayed {
              color: #1b5e20;
            }
            .value {
              color: #000;
              font-size: 16px;
            }
            .inputNumber {
              font-size: 15px;
              outline: none;
              border-radius: 5px;
              padding: 3px;
              width: 80%;
            }
            .inputDate {
              font-size: 14px;
              padding: 1px;
              border-radius: 5px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
            }
            .inputTextArea {
              width: 100%;
              outline: none;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
              resize: vertical;
              padding: 3px;
              border-radius: 5px;
              max-height: 150px;
            }
            .inputSelectStatus {
              border-radius: 5px;
              padding: 2px;
              margin-top: 5px;
              font-size: 14px;
              outline: none;
            }
            .iconStatus {
              color: #48c600;
              margin-top: 5px;
              font-size: 25px;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
          .paymentSelect {
            border: 3px solid #407aff;
            border-radius: 8px;
          }
          .paymentPayed {
            background-color: rgb(72, 198, 0, 0.1);
          }
          .colorIsPaid {
            color: #1b5e20;
          }
        }
        &__buttons {
          display: flex;
          margin-top: 30px;
          justify-content: right;
          align-items: center;
          &__saveChanges {
            text-transform: capitalize;
            color: #fff;
            background-color: #103c82;
            margin-left: 5px;
            border-radius: 8px;
          }
          &__cancel {
            text-transform: capitalize;
            color: #fff;
            background-color: #0c203b;
            border-radius: 8px;
          }
          &__loader {
            color: #103c82;
            height: 50px;
            margin-right: 100px;
          }
        }
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 500px;
      &__img {
        width: 150px;
        animation: slide 3s infinite;
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
      @keyframes slide {
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
`;
const AlertConfirmPay = styled(Dialog)`
  .oportunityData {
    margin-top: 15px;
    &__title {
      font-size: 14px;
    }
    &__data {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .buttons {
    margin-top: 15px;
    &__cancel {
      background: #0c203b;
      color: #fff;
      text-transform: capitalize;
      margin-right: 10px;
      padding: 5px;
      border-radius: 6px;
      font-size: 15px;
      &:hover {
        cursor: pointer;
      }
    }
    &__save {
      background: #103c82;
      color: #fff;
      text-transform: capitalize;
      padding: 5px;
      border-radius: 6px;
      font-size: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const ShowProducts = styled(Dialog)`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
    &__icon {
      color: red;
    }
  }
  .contenido {
    .product {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 7px;
      margin-bottom: 15px;
      &__infoName {
        display: flex;
        flex-direction: column;
        &__title {
          font-size: 12px;
        }
        &__info {
          font-weight: 500;
          font-size: 14px;
        }
      }
      .quantities {
        display: flex;
        margin-left: 15px;
        &__infoPrice {
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
            white-space: nowrap;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
        &__infoQuantity {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
      }
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
    width: 100%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide 3s infinite;
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
    @keyframes slide {
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
`;

const CardAmountTotal = styled(Paper)`
  width: 200px;

  &:hover {
    transition: 0.5s;
    cursor: pointer;
    transform: translateY(-10px);
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #fff;
    transition: 0.2s;
    &:hover {
      background-color: rgb(58, 173, 230, 0.1);
    }
    &__head {
      margin-bottom: 5px;
      .icon {
        border-radius: 12px;
        background-color: #3aade6;
        color: #fff;
        padding: 3px;
        font-size: 30px;
      }
    }
    &__quantity {
      color: #3aade6;
      font-weight: 500;
      font-size: 23px;
      letter-spacing: 1px;
      margin-bottom: 5px;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &__title {
      font-weight: 500;
      color: #3aade6;
    }
  }
`;
const CardAmountCommision = styled(Paper)`
  width: 200px;
  &:hover {
    transition: 0.5s;
    cursor: pointer;
    transform: translateY(-10px);
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #fff;
    transition: 0.2s;
    &:hover {
      background-color: rgb(240, 172, 12, 0.1);
    }
    &__head {
      margin-bottom: 5px;
      .icon {
        border-radius: 12px;
        background-color: #f0ac0c;
        color: #fff;
        padding: 3px;
        font-size: 30px;
      }
    }
    &__quantity {
      color: #f0ac0c;
      font-weight: 500;
      font-size: 23px;
      letter-spacing: 1px;
      margin-bottom: 5px;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &__title {
      font-weight: 500;
      color: #f0ac0c;
    }
  }
`;
const CardAmountPayed = styled(Paper)`
  width: 200px;
  &:hover {
    transition: 0.5s;
    cursor: pointer;
    transform: translateY(-10px);
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #fff;
    transition: 0.2s;
    &:hover {
      background-color: rgb(14, 189, 72, 0.1);
    }

    &__head {
      margin-bottom: 5px;
      .icon {
        border-radius: 12px;
        background-color: #0ebd48;
        color: #fff;
        padding: 3px;
        font-size: 30px;
      }
    }
    &__quantity {
      color: #0ebd48;
      font-weight: 500;
      font-size: 23px;
      letter-spacing: 1px;
      margin-bottom: 5px;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &__title {
      font-weight: 500;
      color: #0ebd48;
    }
  }
`;
const CardAmountPending = styled(Paper)`
  width: 200px;
  &:hover {
    transition: 0.5s;
    cursor: pointer;
    transform: translateY(-10px);
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #fff;
    transition: 0.2s;
    &:hover {
      background-color: rgb(240, 12, 12, 0.1);
    }
    &__head {
      margin-bottom: 5px;
      .icon {
        border-radius: 12px;
        background-color: #f00c0c;
        color: #fff;
        padding: 3px;
        font-size: 30px;
      }
    }
    &__quantity {
      color: #f00c0c;
      font-weight: 500;
      font-size: 23px;
      letter-spacing: 1px;
      margin-bottom: 5px;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &__title {
      font-weight: 500;
      color: #f00c0c;
    }
  }
`;
