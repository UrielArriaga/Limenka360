import React, { useState } from "react";
import { generateTemporalId } from "../../../utils";
import dayjs from "dayjs";

let initalPayment = {
  id: "",
  payment: 0,
  date: dayjs().format("YYYY-MM-DD"),
  ispaid: false,
  paymentiva: 0,
  observations: "",
  url: "",
  paymentmethod: "",
  exchangerate: 0,
  conceptimport: {},
  iva: 0,
  currency: "",
  createdbyId: "",
  paidbyId: null,
};

export default function usePayments() {
  const [payments, setPayments] = useState([]);

  const handleOnClickAddPayment = payment => {
    let newPayment = {
      ...initalPayment,
      id: generateTemporalId(10),
      ...payment,
    };
    setPayments([...payments, newPayment]);
  };

  const handleOnClickDeletePayment = id => {
    let newPayments = payments.filter(payment => payment.id !== id);
    setPayments(newPayments);
  };

  const handleOnChangeProperty = (id, name, value) => {
    console.log(id, name, value);
    let finalValue = value;

    if (name == "date") {
      finalValue = dayjs(value).format("YYYY-MM-DD");
    }

    let newPayments = payments.map(payment => {
      if (payment.id === id) {
        return {
          ...payment,
          [name]: finalValue,
        };
      }
      return payment;
    });
    setPayments(newPayments);
  };

  const debuggerConsole = () => {
    console.log(payments);
  };

  return {
    paymentsControl: {
      payments,
      setPayments,
      handleOnClickAddPayment,
      handleOnClickDeletePayment,
      handleOnChangeProperty,
      debuggerConsole,
    },
  };
}
