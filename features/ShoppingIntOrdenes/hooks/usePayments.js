import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { api } from "../../../services/api";
import useModal from "../../../hooks/useModal";

export const usePayments = () => {
  const [payments, setPayments] = useState({
    date: "",
    periodicity: "",
    paymentamount: 1,
    periodicitycomission: "",
  });

  const [edit, setEdit] = useState(false);
  const [paymentPeriods, setPaymentPeriods] = useState();
  const [seePreview, setSeePreview] = useState(false);
  const [preview, setPreview] = useState([]);
  const { date, paymentamount, periodicity, periodicitycomission } = payments;

  const { open: openPaymentsDrawer, toggleModal: togglePaymentsDrawer } = useModal();

  useEffect(() => {
    console.log("Valor de Payments: ", payments);
    setSeePreview([date, paymentamount, periodicity, periodicitycomission].every(Boolean));
  }, [payments]);

  useEffect(() => {
    getPaymentPeriods();
    setEdit(false);
    //Close Drawer
    if (!openPaymentsDrawer) {
      setPayments({
        date: "",
        periodicity: "",
        paymentamount: 1,
        periodicitycomission: "",
      });
      setPreview([]);
    }
  }, [openPaymentsDrawer]);

  const getPaymentPeriods = async () => {
    const response = await api.get(`paymentperiods`);
    const paymentPeriods = response.data.results.filter(item => item.name !== "rango");
    setPaymentPeriods(paymentPeriods);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    if (value == "pago único") {
      setPayments(prevData => ({
        ...prevData,
        [name]: value,
        paymentamount: 1,
        periodicitycomission: "Primer Pago",
      }));
    } else {
      setPayments(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const generateDates = (periodicity, numDates, startDate) => {
    const today = dayjs(startDate);
    const intervals = {
      semanal: 1,
      mensual: 1,
      bimestral: 2,
      trimestral: 3,
      semestral: 6,
      anual: 1,
    };

    if (periodicity === "pago único") {
      return [today.format("YYYY-MM-DD")];
    }

    const interval = periodicity === "anual" ? "year" : "month";
    const periodMultiplier = intervals[periodicity] || 0;

    if (!periodMultiplier) return [];

    return Array.from({ length: numDates }, (_, i) => today.add(i * periodMultiplier, interval).format("YYYY-MM-DD"));
  };

  const generatePayments = (total, num) => {
    let res = [];
    let sum = 0;

    const basePayment = Number((total / num).toFixed(2));

    for (let i = 0; i < num; i++) {
      res.push(basePayment);
      sum += basePayment;
    }

    // Ajustar el último pago para cuadrar la diferencia
    const adjustment = Number((total - sum).toFixed(2));
    res[res.length - 1] += adjustment;

    return res;
  };

  const generatePreview = () => {
    const pre = [];
    const dates = generateDates(periodicity, paymentamount, date);
    const pay = generatePayments(500, paymentamount); //Cambiarlo por el monto total de la venta (order)

    for (let i = 0; i < paymentamount; i++) {
      pre.push({
        date: dates[i],
        payment: pay[i],
        ispaid: false,
      });
    }

    setPreview(pre);
  };

  return {
    payments,
    edit,
    paymentPeriods,
    seePreview,
    preview,
    setEdit,
    handleChange,
    generatePreview,

    openPaymentsDrawer,
    togglePaymentsDrawer,
  };
};
