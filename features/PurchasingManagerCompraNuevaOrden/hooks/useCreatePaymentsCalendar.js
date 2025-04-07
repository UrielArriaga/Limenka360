import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

function useCreatePaymentsCalendar() {
  const [showCalendary, setShowCalendary] = useState(false);
  const { id_user } = useSelector(userSelector);
  const paymentsPeriods = [
    {
      id: "62dHK9wABpiYa4N9hoNX2Dme",
      name: "pago único",
      order: 1,
    },
    {
      id: "62dB7XgfaZ4SNjt7nLWHUV7o",
      name: "semanal",
      order: 2,
    },
    {
      id: "62dAupLsSFICWWTU3F1y64Mj",
      name: "mensual",
      order: 3,
    },
    {
      id: "62dhtnny5B6W2oMYvmnpyHVc",
      name: "bimestral",
      order: 4,
    },
    {
      id: "62dB9sHhytN3Nb6N71d2qOJ4",
      name: "trimestral",
      order: 5,
    },
    {
      id: "62dxKprqioI2uPsO3FY82D6Y",
      name: "semestral",
      order: 6,
    },
    {
      id: "62dq4fxp8Ln823NiukYbZi7Q",
      name: "anual",
      order: 7,
    },
  ];
  const [period, setPeriod] = useState("mensual");
  const initialData = {
    payment: 0,
    iva: 0,
    date: dayjs(new Date()).format("YYYY-MM-DD"),
    observations: "",
    ispaid: false,
    currency: "",
    purchaseorderId: "",
    createdbyId: id_user,
    paidbyId: null,
  };
  const [payments, setPayments] = useState([initialData]);

  useEffect(() => {}, []);

  const handleChangeQuantity = e => {
    if (e && e > 0) modifyTotalPayment(e);
  };
  const modifyTotalPayment = e => {
    let dataPay = [...payments];
    if (payments?.length > e) {
      let decr = payments?.length - e;
      for (let i = 0; i < decr; i++) {
        dataPay.pop();
      }
      setPayments(dataPay);
    } else if (payments?.length < e) {
      let inc = e - payments?.length;
      let arrPayments = [];
      for (let i = 0; i < inc; i++) {
        arrPayments.push(initialData);
      }
      setPayments([...payments, ...arrPayments]);
    }
  };

  const handleOnChangePeriod = e => setPeriod(e.target.value);

  const handleOnChangeAmount = (newAmount, position) => {
    let paymentsToEdit = [...payments];
    newAmount = newAmount.replace(",", "");
    paymentsToEdit[position].payment = Number(newAmount);
    setPayments(paymentsToEdit);
  };

  const handleOnChangeStatusPaymet = (index, property, value) => {
    const booleanValue = value === "true" ? true : value === "false" ? false : Boolean(value);
    modifyPropertyPayment(index, property, booleanValue);
  };

  const modifyPropertyPayment = (position, property, value) => {
    let paymentsToUpdate = [...payments];
    paymentsToUpdate[position][property] = value;
    setPayments(paymentsToUpdate);
  };

  const handleOnChangeDate = (value, position) => {
    let paymentUpdate = [...payments];
    paymentUpdate[position].date = value;
    setPayments(paymentUpdate);
  };

  return {
    showCalendary,
    setShowCalendary,
    payments,
    paymentsPeriods,
    handleChangeQuantity,
    handleOnChangePeriod,
    period,
    handleOnChangeStatusPaymet,
    handleOnChangeAmount,
    handleOnChangeDate,
  };
}

export default useCreatePaymentsCalendar;
