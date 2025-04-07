import React, { useCallback, useEffect, useState } from "react";
import ApiRequestProvider from "../services";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

function useCalendaryPayments(orderId, setDataPaymentsPurchase, products) {
  const [showCalendary, setShowCalendary] = useState(false);
  const { id_user } = useSelector(userSelector);
  const request = new ApiRequestProvider();
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
  const [payments, setPayments] = useState({
    data: [],
    total: 0,
    isFetching: false,
    amountTotal: 0,
  });
  const [totalPay, setTotalPay] = useState(0);
  const [period, setPeriod] = useState("mensual");
  const [messageError, setMessageError] = useState("");
  const [edit, setEdit] = useState(false);

  const sumTotal = useCallback(() => {
    const totalPayment = products?.backup?.reduce((acc, item) => acc + item.unitprice, 0);
    let round = Math.round(totalPayment);
    setTotalPay(round);
  }, [orderId]);

  useEffect(() => {
    sumTotal();
  }, [sumTotal]);

  useEffect(() => {
    getPayments();
  }, []);

  useEffect(() => {
    verifyAmount();
  }, [payments]);

  const verifyAmount = () => {
    let data = payments?.data.map(item => ({ ...item }));
    const totalPayment = data.reduce((acc, item) => acc + item.payment, 0);
    let round = Math.round(totalPayment);
    if (payments?.amountTotal > 0) {
      if (round !== payments?.amountTotal) {
        setMessageError("Datos Incorrectos");
      } else {
        setMessageError("Datos Correctos");
      }
    } else {
      if (round !== totalPay && totalPay > 0) {
        setMessageError("Datos Incorrectos");
      } else if (round == totalPay) {
        setMessageError("Datos Correctos");
      } else if (round !== totalPay && totalPay == 0) {
        setMessageError("Datos Correctos");
      }
    }
  };

  const getPayments = async () => {
    try {
      setPayments(prevState => ({ ...prevState, isFetching: true }));
      let resp = await request.getPaymentsPurchase(orderId);
      if (resp.status == 200) {
        let mormalizeData = resp?.data?.results?.map(item => ({
          ...item,
          date: dayjs(item.date).format("YYYY-MM-DD"),
        }));
        const total = mormalizeData.reduce((acc, item) => acc + item.payment, 0);
        setPayments({ data: mormalizeData, isFetching: false, total: resp.data.count, amountTotal: total });
        setDataPaymentsPurchase({ data: mormalizeData, period: period, sms: messageError });
      }
    } catch (error) {
      setPayments(prevState => ({ ...prevState, isFetching: false }));
      console.log(error);
    }
  };

  const handleOnChangeAmount = (newAmount, position) => {
    let paymentsToEdit = [...payments?.data];
    newAmount = newAmount.replace(",", "");
    paymentsToEdit[position].payment = Number(newAmount);
    setPayments({ ...payments, data: paymentsToEdit });
  };

  const handleOnChangeStatusPaymet = (index, property, value) => {
    const booleanValue = value === "true" ? true : value === "false" ? false : Boolean(value);
    modifyPropertyPayment(index, property, booleanValue);
  };

  const modifyPropertyPayment = (position, property, value) => {
    let paymentsToUpdate = [...payments?.data];
    paymentsToUpdate[position][property] = value;
    setPayments({ ...payments, data: paymentsToUpdate });
  };

  const handleOnChangeDate = (value, position) => {
    let paymentUpdate = [...payments?.data];
    paymentUpdate[position].date = value;
    setPayments({ ...payments, data: paymentUpdate });
  };

  const handleOnChangePeriod = e => setPeriod(e.target.value);

  const handleChangeQuantity = e => {
    if (e && e > 0) {
      modifyTotalPayment(e);
    }
  };

  const countDecimals = num => {
    if (Math.floor(num) === num) return 0;
    return num.toString().split(".")[1]?.length || 0;
  };

  const modifyTotalPayment = total => {
    let paymentsTotal = [...payments?.data];
    let totalParcial = payments?.amountTotal / total;
    let quantityDecimal = countDecimals(totalParcial);
    totalParcial = quantityDecimal > 0 ? Number(totalParcial.toFixed(2)) : Number(totalParcial);

    let tamData = paymentsTotal.length;
    if (tamData < total) {
      let res = total - tamData;
      for (let i = 0; i < res; i++) {
        paymentsTotal.push({
          payment: 0,
          iva: 0,
          date: "",
          observations: "",
          ispaid: false,
          currency: "",
          purchaseorderId: "",
        });
      }
      let dataNormalize = paymentsTotal?.map(item => {
        if (item.id) {
          return {
            ...item,
            payment: totalParcial,
          };
        } else {
          return {
            ...item,
            purchaseorderId: orderId,
            // purchaseorderId: "yrEvIl37fMjuMp3PtuBo5wH5",
            date: dayjs(new Date()).format("YYYY-MM-DD"),
            payment: totalParcial,
            createdbyId: id_user,
          };
        }
      });
      setPayments({ ...payments, data: dataNormalize, total: Number(total) });
      setDataPaymentsPurchase({ data: dataNormalize, period: period, sms: messageError });
    } else if (tamData > total) {
      let res = tamData - total;
      for (let i = 0; i < res; i++) {
        paymentsTotal.pop();
      }
      let dataNormalize = paymentsTotal?.map(item => {
        return {
          ...item,
          payment: totalParcial,
        };
      });
      setPayments({ ...payments, data: dataNormalize, total: Number(total) });
      setDataPaymentsPurchase({ data: dataNormalize, period: period, sms: messageError });
    }
  };

  const editData = () => {
    setDataPaymentsPurchase({ data: payments?.data, period: period, sms: messageError });
    setEdit(!edit);
  };

  return {
    showCalendary,
    setShowCalendary,
    paymentsPeriods,
    period,
    payments,
    handleOnChangeAmount,
    handleOnChangeStatusPaymet,
    handleOnChangeDate,
    handleOnChangePeriod,
    handleChangeQuantity,
    messageError,
    editData,
    edit,
  };
}

export default useCalendaryPayments;
