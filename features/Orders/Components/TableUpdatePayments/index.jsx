import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LinearProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { api } from "../../../../services/api";
import { formatDateToISO, handleGlobalAlert } from "../../../../utils";
import Decimal from "decimal.js";
import Table from "../Table";
import BarEditPayments from "../BarEditPayments";
import { truncateDecimalsWithTargetSum } from "../../../../utils/utils_payments";
import { CalendarToday } from "@material-ui/icons";
import styles from "./TableUpdatePayments.module.css";
import { checkIdExists, getIdFromName, hasUndefinedValues } from "../../utils";

export default function TableUpdatePayments({
  dataPayments,
  paymentData,
  paymentPeriods,
  commissionPeriod,
  handleChange,
  modifiedPayments,
  calculateTotalModifiedPayments,
  calculateTotalComissionModifiedPayments,
  formatDate,
  justAHitch,
  handleChangeModifiedPayments,
  savePayments,
}) {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const oportunityId = router.query.o;
  // const [modifiedPayments, setModifiedPayments] = useState(dataPayments);
  // const [commissionPeriod, setCommissionPeriod] = useState("");
  // const [paymentData, setPaymentData] = useState();
  // const [paymentPeriods, setPaymentPeriods] = useState([]);
  // const oportunityAmount = dataPayments[0].oportunity.amount;
  // const oportunityComission = dataPayments[0].oportunity.comission;
  // const [periodicityOfPayments, setPeriodicityOfPayments] = useState("");
  // const ejecutiveId = dataPayments[0].ejecutiveId;

  //Obtener los datos para el dialogo iniciales
  // useEffect(() => {
  //   getOportunity();
  //   getPaymentPeriods();
  // }, [isRefetch, oportunityId]);

  // useEffect(() => {
  //   resetPayments();
  // }, [paymentData]);

  // //Obtener los datos de la oportunidad
  // const getOportunity = async () => {
  //   let params = {
  //     where: { id: oportunityId },
  //     keys: "id,paymentperiodicity,payments,comissiontype",
  //   };
  //   let response = await api.get(`oportunities`, { params });
  //   let opo = response.data.results[0];
  //   //Guarda los datos del dialog
  //   setPaymentData({
  //     date: formatDate(dataPayments[0]?.date),
  //     periodicity: opo?.paymentperiodicity,
  //     paymentamount: opo?.payments,
  //     periodicitycomission: opo?.comissiontype,
  //   });
  //   //Periocidad actual (en base)
  //   setCommissionPeriod(opo?.comissiontype);
  // };

  // //Obtener los periodos de los pagos
  // const getPaymentPeriods = async () => {
  //   const response = await api.get(`paymentperiods`);
  //   const paymentPeriods = response.data.results.filter(item => item.name !== "rango");
  //   setPaymentPeriods(paymentPeriods);
  // };

  // const calculateTotalModifiedPayments = () => {
  //   let totalPayment = new Decimal(0);
  //   modifiedPayments.forEach(payment => {
  //     totalPayment = totalPayment.plus(new Decimal(payment.payment));
  //   });
  //   return totalPayment.toString();
  // };

  // const calculateTotalComissionModifiedPayments = () => {
  //   let totalComission = new Decimal(0);

  //   modifiedPayments.forEach(payment => {
  //     const comission = new Decimal(payment.comission);
  //     totalComission = totalComission.plus(comission);
  //   });

  //   return totalComission.toString();
  // };

  // const formatDate = dateString => {
  //   var utc = require("dayjs/plugin/utc");
  //   dayjs.extend(utc);
  //   const date = dayjs.utc(dateString).format("YYYY-MM-DD");
  //   return date;
  // };

  // //Obten los datos del enganche actual en el calendario y retorna los datos normalizados, si no existe solo manda false
  // const obtainDownPaymentData = () => {
  //   let downPaymentData = {};
  //   //Si existe un enganche
  //   dataPayments.forEach(item => {
  //     if (item.downpayment) {
  //       downPaymentData = {
  //         payment: item.payment,
  //         comission: item.comission,
  //         date: item.date, //Falta mandar la fecha corta (Revisar))
  //         observations: item.observations,
  //         ispaid: item.ispaid,
  //         oportunityId: item.oportunityId,
  //         downpayment: true,
  //       };
  //     }
  //   });

  //   if (Object.keys(downPaymentData).length === 0) {
  //     return false;
  //   }
  //   return downPaymentData;
  // };

  // const generateDates = (periodicity, numDates, startDate) => {
  //   const today = dayjs(startDate); // obtener la fecha actual

  //   if (periodicity === "pago único") {
  //     return [today.format("YYYY-MM-DD")];
  //   }

  //   let interval;
  //   switch (periodicity) {
  //     case "semanal":
  //       interval = "week";
  //       break;
  //     case "mensual":
  //       interval = "month";
  //       break;
  //     case "bimestral":
  //       interval = "month";
  //       break;
  //     case "trimestral":
  //       interval = "month";
  //       break;
  //     case "semestral":
  //       interval = "month";
  //       break;
  //     case "anual":
  //       interval = "year";
  //       break;
  //     default:
  //       return [];
  //   }

  //   const dates = [today.format("YYYY-MM-DD")];
  //   for (let i = 1; i < numDates; i++) {
  //     if (periodicity === "bimestral") {
  //       dates.push(today.add(2 * i, interval).format("YYYY-MM-DD"));
  //     } else if (periodicity === "trimestral") {
  //       dates.push(today.add(3 * i, interval).format("YYYY-MM-DD"));
  //     } else if (periodicity === "semestral") {
  //       dates.push(today.add(6 * i, interval).format("YYYY-MM-DD"));
  //     } else {
  //       dates.push(today.add(i, interval).format("YYYY-MM-DD"));
  //     }
  //   }

  //   return dates;
  // };

  // const createCommissionArray = (commission, periodType, periodCount) => {
  //   const commissionArray = [];

  //   for (let index = 0; index < periodCount; index++) {
  //     commissionArray.push(0);
  //   }

  //   switch (periodType) {
  //     case "Primer Pago":
  //       if (!obtainDownPaymentData().downpayment) {
  //         commissionArray[0] = commission;
  //       }
  //       break;
  //     case "Segundo Pago":
  //       if (!obtainDownPaymentData().downpayment) {
  //         commissionArray[0] = 0;
  //         commissionArray[1] = commission;
  //       } else {
  //         commissionArray[0] = commission;
  //       }
  //       break;
  //     case "Prorrateadas":
  //       const dividedCommission = commission / periodCount;
  //       for (let i = 0; i < periodCount; i++) {
  //         commissionArray[i] = dividedCommission;
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   return commissionArray;
  // };

  // //Re inicia los pagos
  // const resetPayments = async () => {
  //   //Si existe un enganche y solo es 1 pago la forma automatica no se crea correctamente
  //   if (obtainDownPaymentData().downpayment && paymentData.paymentamount == 1) {
  //     return handleGlobalAlert(
  //       "warning",
  //       "El número de pagos no puede ser 1 si existe un enganche.",
  //       "basic",
  //       dispatch
  //     );
  //   }

  //   //Revisa que todos los contengan datos
  //   if (hasUndefinedValues(paymentData)) {
  //     return handleGlobalAlert("warning", "Selecciona todos los campos ", "basic", dispatch);
  //   }

  //   //Datos del formulario norm Original
  //   let newPayments = {
  //     //Si exite el engache resta 1 a la periocidad
  //     paymentamount: obtainDownPaymentData().downpayment ? paymentData.paymentamount - 1 : paymentData.paymentamount,
  //     periodicity: paymentData.periodicity,
  //     periodicitycomission: paymentData.periodicitycomission,
  //     hitch: obtainDownPaymentData().downpayment,
  //   };

  //   //Revisa que los datos del formulario no esten vacios
  //   if (Object.values(newPayments).every(value => value !== "")) {
  //     //Guardara los objetos de los pagos
  //     let resultado = obtainDownPaymentData().downpayment ? [obtainDownPaymentData()] : [];

  //     //Calcula la periocidad y regresa un arreglo de fechas
  //     let arrayDates = generateDates(newPayments.periodicity, newPayments.paymentamount, paymentData.date);

  //     //Arreglo de pagos y su monto
  //     let total = obtainDownPaymentData().downpayment
  //       ? oportunityAmount - obtainDownPaymentData().payment
  //       : oportunityAmount;
  //     let divTotalPayment = total / newPayments.paymentamount;
  //     let divTotalPaymentArray = Array.from({ length: newPayments.paymentamount }, () => divTotalPayment);
  //     let newDivTotalPaymentArray = truncateDecimalsWithTargetSum(divTotalPaymentArray, total);

  //     //Arreglo con las comisiones y su monto
  //     let comissionTotal = obtainDownPaymentData().downpayment
  //       ? oportunityComission - obtainDownPaymentData().comission
  //       : oportunityComission;
  //     let numberOfComission = obtainDownPaymentData().downpayment
  //       ? paymentData.paymentamount - 1
  //       : paymentData.paymentamount;
  //     let arrayComission = createCommissionArray(comissionTotal, paymentData.periodicitycomission, numberOfComission);
  //     let newArrayComission = truncateDecimalsWithTargetSum(arrayComission, comissionTotal);

  //     //Guarda los objetos de los pagos
  //     for (let i = 0; i < newPayments.paymentamount; i++) {
  //       let obj = {
  //         payment: newDivTotalPaymentArray[i],
  //         comission: newArrayComission[i],
  //         date: arrayDates[i],
  //         observations: "",
  //         ispaid: "false",
  //         oportunityId: dataPayments[0].oportunityId,
  //         downpayment: "false",
  //       };
  //       resultado.push(obj);
  //     }

  //     setModifiedPayments(resultado);
  //     //Actualiza las periocidades
  //     setPeriodicityOfPayments(newPayments.periodicity);
  //     setCommissionPeriod(newPayments.periodicitycomission);

  //     handleGlobalAlert("success", "Pagos creados correctamente!", "basic", dispatch);
  //   } else {
  //     handleGlobalAlert("warning", "Selecciona todos los campos ", "basic", dispatch);
  //   }
  // };

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setPaymentData(prevData => ({
  //     ...prevData,
  //     [name]: value,
  //     ...(value === "pago único" && {
  //       paymentamount: 1,
  //       periodicitycomission: "Primer Pago",
  //     }),
  //   }));
  // };

  // const savePayments = () => {
  //   const totalPayments = calculateTotalModifiedPayments(modifiedPayments).toString();
  //   const expectedPayments = dataPayments[0]?.oportunity?.amount.toString();
  //   const totalComission = calculateTotalComissionModifiedPayments(modifiedPayments).toString();
  //   const expectedComission = dataPayments[0]?.oportunity?.comission.toString();

  //   if (totalPayments === expectedPayments && totalComission === expectedComission) {
  //     updatePayment(); // Actualizar todos los pagos
  //   } else {
  //     handleGlobalAlert("warning", "El total y el total esperado no son iguales!", "basic", dispatch);
  //   }
  // };

  // const updatePayment = async () => {
  //   let objPayments = modifiedPayments.map(item => ({
  //     id: item.id ? item.id : false,
  //     payment: item.payment,
  //     comission: item.comission,
  //     date: formatDateToISO(item.date),
  //     observations: item.observations,
  //     ispaid: item.ispaid,
  //     paymentiva: item.paymentiva,
  //     downpayment: item.downpayment,
  //     oportunityId: item.oportunityId,
  //     ejecutiveId: ejecutiveId,
  //     paymentperiodId: getIdFromName(paymentPeriods, periodicityOfPayments),
  //   }));
  //   //Cuando todos tengan id enviar los datos a allpayments para que se actualicen
  //   if (checkIdExists(objPayments) && paymentData.paymentamount == objPayments.length) {
  //     //Manual way
  //     try {
  //       await api.put(`/salespayments/allpayments`, { payments: objPayments });

  //       socket?.emit("send_notify_activity", {
  //         activity: {
  //           type: "update",
  //           from: "payments",
  //           message: `${name} modifico los pagos`,
  //           data: { oportunityId: oportunityId, comission: oportunityComission, amount: oportunityAmount },
  //           ejecutiveId: id_user,
  //           groupId: groupId,
  //           companyId: id_company,
  //         },
  //       });

  //       handleGlobalAlert("success", "Los pagos se actualizaron correctamente!", "basic", dispatch);
  //     } catch (error) {
  //       handleGlobalAlert("error", "Error al actualizar!", "basic", dispatch);
  //       console.log("error:", error);
  //     }
  //   } else {
  //     //Automatic way
  //     let newObjPayments = objPayments.map(({ id, ...resto }) => resto);
  //     let objPaymentsNoID = {
  //       allpayments: true,
  //       oportunity: {
  //         id: oportunityId,
  //         comissiontype: commissionPeriod,
  //         payments: objPayments.length,
  //         paymentperiodicity: periodicityOfPayments,
  //       },
  //       payments: newObjPayments,
  //     };
  //     console.log("UN CAMPO NO TIENE ID !!!", objPaymentsNoID);
  //     try {
  //       await api.put(`/salespayments`, objPaymentsNoID);

  //       socket?.emit("send_notify_activity", {
  //         activity: {
  //           type: "update",
  //           from: "payments",
  //           message: `${name} modifico los pagos`,
  //           data: { oportunityId: oportunityId, comission: oportunityComission, amount: oportunityAmount },
  //           ejecutiveId: id_user,
  //           groupId: groupId,
  //           companyId: id_company,
  //         },
  //       });

  //       handleGlobalAlert("success", "Los pagos se actualizaron correctamente!", "basic", dispatch);
  //     } catch (error) {
  //       handleGlobalAlert("error", "Error al actualizar!", "basic", dispatch);
  //     }
  //   }

  //   setIsRefetch(!isRefetch);
  // };

  // //Revisar que solo sea un enganche
  // const justAHitch = (e, index) => {
  //   const { name, value } = e.target;
  //   const isDownpaymentTrue = modifiedPayments.some(item => item.downpayment.toString() === "true");

  //   if (value === "true" && isDownpaymentTrue) {
  //     handleGlobalAlert("warning", "Sólo se permite un enganche!", "basic", dispatch);
  //     return;
  //   }

  //   setModifiedPayments(prevData => {
  //     const updatedPayments = [...prevData];
  //     updatedPayments[index] = { ...updatedPayments[index], [name]: value };
  //     return updatedPayments;
  //   });
  // };

  // const handleChangeModifiedPayments = (e, index) => {
  //   const { name, value } = e.target;
  //   setModifiedPayments(prevData => {
  //     const updatedPayments = [...prevData];
  //     const updatedPayment = { ...updatedPayments[index] };

  //     if (name === "comission" || name === "payment") {
  //       updatedPayment[name] = Number(value); // Convertir a número
  //     } else {
  //       updatedPayment[name] = value;
  //     }

  //     updatedPayments[index] = updatedPayment;
  //     return updatedPayments;
  //   });
  // };

  return (
    <ContainerStyle>
      <div>
        <div className={styles.barButtons}>
          <div className={styles.barButtonsTitle}>
            <CalendarToday />
            <p>Pagos</p>
          </div>
        </div>
        <BarEditPayments
          paymentData={paymentData}
          paymentPeriods={paymentPeriods}
          commissionPeriod={commissionPeriod}
          handleChange={handleChange}
        />
        <Table
          dataPayments={dataPayments}
          modifiedPayments={modifiedPayments}
          calculateTotalModifiedPayments={calculateTotalModifiedPayments}
          calculateTotalComissionModifiedPayments={calculateTotalComissionModifiedPayments}
          formatDate={formatDate}
          justAHitch={justAHitch}
          handleChangeModifiedPayments={handleChangeModifiedPayments}
        />
        {/* <div className="buttons">
          <button className="save" type="button" onClick={() => savePayments()}>
            Guardar
          </button>
        </div> */}
      </div>
    </ContainerStyle>
  );
}

export const ContainerStyle = styled.div`
  padding-bottom: 4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);

  table {
    padding: 10px;
    width: 100%;
  }

  select,
  .data,
  .modified {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 23px 9px 11px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .modified {
    background-color: #90caf9;
  }

  .head {
    min-width: 200px;
    text-align: left;
    padding-left: 10px;
    text-transform: capitalize;
    background-color: #dce1f6;
  }

  .extra {
    display: grid;
    grid-template-columns: auto;
  }

  .total {
    font-weight: bold;
    margin-top: 10px;
  }

  .icon {
    padding-left: 15px;
    padding-top: 10px;
    color: #405189;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right: 5px;
  }

  .button_reset,
  .button_add,
  .button_edit,
  .button_delete {
    width: 100%;
    height: 42px;
    text-transform: capitalize;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    margin-top: 10px;
  }

  .button_reset {
    color: #6b34bc;
    background-color: #fff;
    :hover {
      background-color: #9c72db;
    }
  }

  .button_add {
    color: green;
    background-color: #fff;
    :hover {
      background-color: #88c82d;
    }
  }

  .button_edit {
    color: #407aff;
    background-color: #fff;
    :hover {
      background-color: #7ca6ff;
    }
  }

  .button_delete {
    color: #f00c0c;
    background-color: #fff;
    :hover {
      background-color: #f65f55;
    }
  }

  .green {
    color: green;
    background-color: #aed581;
  }

  .red {
    color: red;
    background-color: #ffcdd2;
  }

  .alert {
    margin-bottom: 10px;
  }

  button {
    width: 100px;
    height: 42px;
    text-transform: capitalize;
    color: #424242;
    background-color: #cfd8dc;
    transition: background-color 0.3s ease-in-out;
    border-radius: 4px;
    padding: 6px 8px;
    border: 0;
    cursor: pointer;
    :hover {
      background-color: #90a4ae;
    }
  }
`;
