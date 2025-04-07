import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { api } from "../../../services/api";
import useModal from "../../../hooks/useModal";
import useFetchData, { processResponseArray } from "../../../hooks/useFetchData";
import { useDispatch } from "react-redux";
import { handleGlobalAlert } from "../../../utils";
import usePagination from "../../../hooks/usePagination";
import { ShippingsOrdersServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";

export const usePayments = (orderSelectedData, dataProducts) => {
  const { showAlertError, showAlertSucces } = useAlertToast()
  const request = new ShippingsOrdersServices();
  const [payments, setPayments] = useState({
    date: "",
    periodicity: "",
    paymentamount: 1,
    periodicitycomission: "",
  });
  const [paymentsPurchase, setPaymentsPurchase] = useState({
    data: [],
    isFetching: false,
    total: 0,
  });
  const [conceptImport, setConceptImport] = useState([]);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [paymentPeriods, setPaymentPeriods] = useState();
  const [seePreview, setSeePreview] = useState(false);
  const [preview, setPreview] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [loadingPay, setLoadingPay] = useState({});
  const [isPaying, setIsPaying] = useState(false);
  const { date, paymentamount, periodicity, periodicitycomission } = payments;
  const { open: openPaymentsDrawer, toggleModal: togglePaymentsDrawer } = useModal();

  const {
    limit: limitPayments,
    page: pagePayments,
    handleLimit,
    handlePagination,
  } = usePagination({
    defaultLimit: 10,
    defaultPage: 1,
  });

  const {
    data: paymentspurchaseorder,
    fetchData: fetchDataPaymentsPurchaseOrder,
    count,
    loading: loadingPP,
  } = useFetchData("paymentspurchaseorder", processResponseArray, {
    where: {
      purchaseorderId: orderSelectedData?.id,
    },
    order: "date",
    all: true,
    //Para paginación
    // count: 1,
    // limit: limitPayments,
    // skip: pagePayments,
  });

  const sumField = (array, field) => {
    return array?.reduce((accumulator, current) => {
      return accumulator + (current[field] || 0);
    }, 0);
  };

  const totalAmount = sumField(dataProducts.data, "importe");

  useEffect(() => {
    // console.log("limit", limit);
    console.log("page", pagePayments);
    fetchDataPaymentsPurchaseOrder();
  }, [pagePayments]);

  useEffect(() => {
    getPaymentsPurchase();
    getConceptsImports();
  }, [orderSelectedData?.id]);

  const getConceptsImports = async () => {
    try {
      let response = await request.getConceptImport();
      if (response.status == 200 || response.status == 201) {
        let dataNormalize = response?.data?.results?.map(item => ({
          label: item.name,
          value: item.id,
        }));
        setConceptImport(dataNormalize);
      }
    } catch (error) {
      setConceptImport([]);
      console.log(error, "error");
    }
  };

  const getPaymentsPurchase = async () => {
    try {
      setPaymentsPurchase(prevState => ({ ...prevState, isFetching: true }));
      let query = {
        purchaseorderId: orderSelectedData?.id,
        // purchaseorderId: "yrEvIl37fMjuMp3PtuBo5wH5",
      };
      let response = await request.getPaymentsPurchase(query);
      if (response.status == 200) {
        setPaymentsPurchase({ data: response?.data?.results, isFetching: false, total: response?.data?.count });
      }
    } catch (error) {
      setPaymentsPurchase(prevState => ({ ...prevState, isFetching: false }));
      console.log(error, "error");
    }
  };

  useEffect(() => {
    const arrayLoadingPay = [];
    for (let index = 0; index < paymentspurchaseorder?.length; index++) {
      arrayLoadingPay.push({
        id: paymentspurchaseorder[index].id,
        loading: false,
      });
    }
    setLoadingPay(arrayLoadingPay);
  }, [paymentspurchaseorder]);

  useEffect(() => {
    if (openPaymentsDrawer) {
      fetchDataPaymentsPurchaseOrder();
    }
  }, [openPaymentsDrawer]);

  useEffect(() => {
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
      return [today.format("YYYY-MM-DD HH:mm:ss.SSS Z")];
    }

    const interval = periodicity === "anual" ? "year" : "month";
    const periodMultiplier = intervals[periodicity] || 0;

    if (!periodMultiplier) return [];

    return Array.from({ length: numDates }, (_, i) =>
      today.add(i * periodMultiplier, interval).format("YYYY-MM-DD HH:mm:ss.SSS Z")
    );
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
    res[res.length - 1] = Number((res[res.length - 1] + adjustment).toFixed(2));

    return res;
  };

  const generatePreview = () => {
    const pre = [];
    const dates = generateDates(periodicity, paymentamount, date);
    const pay = generatePayments(totalAmount, paymentamount); //Cambiarlo por el monto total de la venta (order)

    for (let i = 0; i < paymentamount; i++) {
      pre.push({
        date: dates[i],
        payment: pay[i],
        ispaid: false,
        iva: 0,
        observations: "",
        currency: "",
        purchaseorderId: orderSelectedData.id,
      });
    }

    setPreview(pre);
  };

  const updatePayments = async () => {
    setUpdating(true);
    let body = {
      payments: preview,
    };

    try {
      const update = await api.put(`paymentspurchaseorder/${orderSelectedData.id}`, body);
      if (update.status == 200) {
        handleGlobalAlert("success", "Se actualizaron los pagos", "basic", dispatch, 6000);
        await fetchDataPaymentsPurchaseOrder();
        setEdit(false);
      }
    } catch (error) {
      console.log("error al actualizar paymentspurchaseorder", error);
    } finally {
      setUpdating(false);
    }
  };

  const pay = async payID => {
    if (isPaying) {
      return;
    }

    setIsPaying(true);
    setLoadingPay(loadingPay => loadingPay.map(item => (item.id === payID ? { ...item, loading: true } : item)));

    const filteredArray = paymentspurchaseorder.map(
      ({ payment, iva, date, observations, ispaid, currency, purchaseorderId, id }) => ({
        payment,
        iva,
        date,
        observations,
        ispaid: payID === id ? true : ispaid,
        currency,
        purchaseorderId,
      })
    );

    let body = {
      payments: filteredArray,
    };

    try {
      const update = await api.put(`paymentspurchaseorder/${orderSelectedData.id}`, body);
      if (update.status == 200) {
        handleGlobalAlert("success", "Se marco como pagado", "basic", dispatch, 6000);
        await fetchDataPaymentsPurchaseOrder();
        // setEdit(false);
      }
    } catch (error) {
      console.log("error al actualizar paymentspurchaseorder", error);
    } finally {
      setUpdating(false);
      setLoadingPay(loadingPay => loadingPay.map(item => (item.id === payID ? { ...item, loading: false } : item)));
      setIsPaying(false);
    }
  };

  const handleChangeConcept = (position, data, payData) => {
    let dataPayms = [...paymentsPurchase.data];
    dataPayms[position]["conceptimportId"] = data?.value;
    setPaymentsPurchase(prevState => ({ ...prevState, data: dataPayms }));

    let dataToUpdate = dataPayms?.map(item => {
      let pay = { ...item };
      delete pay.purchaseorder;
      return pay;
    });
    updatePaymentsPurchase(dataToUpdate);
  };

  const updatePaymentsPurchase = async dataToUpdate => {
    try {
      let response = await request.putPaymentsPurchase(dataToUpdate, orderSelectedData?.id);
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Se actualizo correctamente");
      }
    } catch (error) {
      console.log(error, "error");
      showAlertError("Error al actualizar el concepto de importacion");
    }
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
    paymentspurchaseorder,
    updatePayments,
    updating,
    pay,
    loadingPay,
    count,
    pagePayments,
    handlePagination,
    limitPayments,
    loadingPP,
    paymentsPurchase,
    handleChangeConcept,
    conceptImport
  };
};
