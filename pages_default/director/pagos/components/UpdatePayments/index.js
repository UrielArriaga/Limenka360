import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Dialog, Slide, Tooltip, Grow } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useRouter } from "next/router";
import { api } from "../../../../../services/api";
import { formatDateToISO, handleGlobalAlert } from "../../../../../utils";
import { userSelector } from "../../../../../redux/slices/userSlice";

export default function UpdatePayments({ dataPayments, isRefetch, setIsRefetch }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const oportunityId = router.query.o;
  const { id_user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const [paymentsData, setPaymentsData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [headerDialog, setHeaderDialog] = useState("");
  const [CRUD, setCRUD] = useState("update");
  const [modifiedPayments, setModifiedPayments] = useState(dataPayments);
  const [periodicityOfPayments, setPeriodicityOfPayments] = useState("");
  const [commissionPeriod, setCommissionPeriod] = useState("");
  const [paymentData, setPaymentData] = useState();
  const [oportunity, setOportunity] = useState();
  const [paymentPeriods, setPaymentPeriods] = useState();

  //Obtener los datos para el dialogo iniciales
  useEffect(() => {
    getOportunity();
    getPaymentPeriods();
  }, [isRefetch]);

  useEffect(() => {
    resetModifiedPayments();
  }, [dataPayments]);

  //Obtener los datos de la oportunidad
  const getOportunity = async () => {
    let params = {
      where: { id: oportunityId },
      keys: "id,paymentperiodicity,payments,comissiontype",
    };
    let response = await api.get(`oportunities`, { params });
    let opo = response.data.results[0];
    //Guarda los datos de la oportunidad
    setOportunity(opo);
    //Guarda los datos del dialog
    setPaymentData({
      periodicity: opo.paymentperiodicity,
      paymentamount: opo.payments,
      periodicitycomission: opo.comissiontype,
    });
    //Periocidad actual (en base)
    setPeriodicityOfPayments(opo.paymentperiodicity);
    setCommissionPeriod(opo.comissiontype);
  };

  //Obtener los periodos de los pagos
  const getPaymentPeriods = async () => {
    const response = await api.get(`paymentperiods`);
    const paymentPeriods = response.data.results.filter(item => item.name !== "rango");
    setPaymentPeriods(paymentPeriods);
  };

  const formatearFecha = fecha => {
    const fechaObjeto = dayjs(fecha);
    const fechaFormateada = fechaObjeto.format("YYYY-MM-DD");
    return fechaFormateada;
  };

  const resetModifiedPayments = () => {
    setModifiedPayments(dataPayments);
  };

  const addModifiedPayment = () => {
    setModifiedPayments(prevData => {
      const newPayment = {
        /* nuevo objeto */
        payment: 0,
        comission: 0,
        date: dayjs().format("YYYY-MM-DD"),
        observations: "",
        ispaid: false,
        downpayment: false,
        ejecutiveId: id_user,
        oportunityId: oportunityId,
        paymentiva: 0,
        //paymentperiodId se manda con el put
      };
      return [...prevData, newPayment];
    });
  };

  const openDialogReset = () => {
    setCRUD("reset");
    setHeaderDialog(`Modificacion Automatica`);
    setPaymentsData({});
    setOpen(true);
  };

  const calculateTotalModifiedPayments = () => {
    let totalPayment = 0;
    modifiedPayments.forEach(payment => {
      totalPayment += Number(payment.payment);
    });
    return totalPayment;
  };

  const calculateTotalComissionModifiedPayments = () => {
    let totalComission = 0;
    modifiedPayments.forEach(payment => {
      totalComission += Number(payment.comission);
    });
    return totalComission;
  };

  const peso = amount => {
    if (!amount) {
      amount = 0;
    }
    return amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
  };

  const savePayments = () => {
    const objPayments = {};

    modifiedPayments.forEach((item, index) => {
      const dateObj = new Date();

      objPayments[index] = {
        payment: item.payment,
        comission: item.comission,
        date: dateObj.toISOString(),
        observations: item.observations,
        ispaid: item.ispaid,
        oportunityId: item.oportunityId,
        downpayment: Boolean(item.downpayment),
      };
    });

    //Verifica que totales sean los mismos
    if (
      calculateTotalModifiedPayments(modifiedPayments) == dataPayments[0]?.oportunity?.amount &&
      calculateTotalComissionModifiedPayments(modifiedPayments) == dataPayments[0]?.oportunity?.comission
    ) {
      setCRUD("update");
      setHeaderDialog(`¿Está seguro de realizar los cambios? Los pagos serán actualizados.`);
      setPaymentsData({});
      setOpen(true);
    } else {
      handleGlobalAlert("warning", "El total y el total esperado no son iguales!", "basic", dispatch);
    }
  };

  return (
    <>
      <ContainerStyle>
        <BarButtons addModifiedPayment={addModifiedPayment} openDialogReset={openDialogReset} />
        <Table
          dataPayments={dataPayments}
          modifiedPayments={modifiedPayments}
          setModifiedPayments={setModifiedPayments}
          calculateTotalModifiedPayments={calculateTotalModifiedPayments}
          calculateTotalComissionModifiedPayments={calculateTotalComissionModifiedPayments}
          peso={peso}
        />
        <div className="buttons">
          <button onClick={() => resetModifiedPayments()}>Reiniciar</button>
          <button className="save" onClick={() => savePayments()}>
            Guardar
          </button>
        </div>
      </ContainerStyle>
      <PaymentDialog
        open={open}
        setOpen={setOpen}
        paymentsData={paymentsData}
        formatearFecha={formatearFecha}
        isRefetch={isRefetch}
        setIsRefetch={setIsRefetch}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        headerDialog={headerDialog}
        CRUD={CRUD}
        dataPayments={dataPayments}
        setModifiedPayments={setModifiedPayments}
        modifiedPayments={modifiedPayments}
        paymentData={paymentData}
        setPaymentData={setPaymentData}
        setCommissionPeriod={setCommissionPeriod}
        commissionPeriod={commissionPeriod}
        setPeriodicityOfPayments={setPeriodicityOfPayments}
        periodicityOfPayments={periodicityOfPayments}
        oportunity={oportunity}
        paymentPeriods={paymentPeriods}
      />
    </>
  );
}

const BarButtons = ({ addModifiedPayment, openDialogReset }) => {
  return (
    <div className="bar_buttons">
      <p>Calendario de Pagos</p>
      <Tooltip title="Añadir pago">
        <button onClick={() => addModifiedPayment()}>
          <AddCircleIcon />
        </button>
      </Tooltip>
      <Tooltip title="Forma Automática">
        <button onClick={() => openDialogReset()}>
          <ListAltIcon />
        </button>
      </Tooltip>
    </div>
  );
};

function Table({
  dataPayments,
  modifiedPayments,
  setModifiedPayments,
  peso,
  calculateTotalModifiedPayments,
  calculateTotalComissionModifiedPayments,
}) {
  //Updata de modifiedPayments
  const dispatch = useDispatch();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = e => {
    setIsMouseDown(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = e => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 3; // ajusta la sensibilidad del scroll
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleChangeModifiedPayments = (e, index) => {
    const { name, value } = e.target;
    setModifiedPayments(prevData => {
      const updatedPayments = [...prevData];
      const updatedPayment = { ...updatedPayments[index] };

      if (name === "comission" || name === "payment") {
        updatedPayment[name] = Number(value); // Convertir a número
      } else {
        updatedPayment[name] = value;
      }

      updatedPayments[index] = updatedPayment;
      return updatedPayments;
    });
  };

  //Revisar que solo sea un enganche
  const justAHitch = (e, index) => {
    let modify = false;
    const { name, value } = e.target;
    const count = modifiedPayments.map(item => item.downpayment.toString() === "true").filter(Boolean).length;

    if (value == "true") {
      if (count < 1) {
        modify = true;
      }
    } else {
      modify = true;
    }

    if (modify) {
      setModifiedPayments(prevData => {
        const updatedPayments = [...prevData];
        const updatedPayment = { ...updatedPayments[index] };
        updatedPayment[name] = value;
        updatedPayments[index] = updatedPayment;
        return updatedPayments;
      });
    } else {
      handleGlobalAlert("warning", "Sólo se permite un enganche!", "basic", dispatch);
    }
  };

  const deleteModifiedPayment = index => {
    setModifiedPayments(prevData => {
      const updatedPayments = [...prevData];
      updatedPayments.splice(index, 1); // Eliminar el objeto en la posición indicada
      return updatedPayments;
    });
  };

  const colorCheck = (value1, value2) => {
    if (value1 == value2) {
      return "data green";
    } else {
      return "data red";
    }
  };

  const colorCheckChange = (value1, value2) => {
    return value1?.toString() == value2?.toString() ? "data" : "modified";
  };

  const formatDate = dateString => {
    var utc = require("dayjs/plugin/utc");
    dayjs.extend(utc);
    const date = dayjs.utc(dateString).format("YYYY-MM-DD");
    return date;
  };

  return (
    <div
      className="tabla-responsive"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <table>
        <thead>
          <tr>
            <th>Num.</th>
            <th>Pago</th>
            <th>Comisión</th>
            <th>Fecha</th>
            <th>Comentario</th>
            <th>Estado</th>
            <th>Enganche</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {modifiedPayments &&
            modifiedPayments?.map((pay, i) => (
              <Grow in={true} key={i}>
                <tr key={i}>
                  <td>
                    <div className={"data"}>{i + 1}</div>
                  </td>
                  <td>
                    <input
                      className={colorCheckChange(pay.payment, dataPayments[i]?.payment)}
                      type="number"
                      name="payment"
                      value={pay.payment}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                    />
                  </td>
                  <td>
                    <input
                      className={colorCheckChange(pay.comission, dataPayments[i]?.comission)}
                      type="number"
                      name="comission"
                      value={pay.comission}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                    />
                  </td>
                  <td>
                    <input
                      className={colorCheckChange(pay.date, dataPayments[i]?.date)}
                      type="date"
                      name="date"
                      value={formatDate(pay.date)}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                    />
                  </td>
                  <td>
                    <input
                      className={colorCheckChange(pay.observations, dataPayments[i]?.observations)}
                      name="observations"
                      value={pay.observations}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                    />
                  </td>
                  <td>
                    <select
                      className={colorCheckChange(pay.ispaid, dataPayments[i]?.ispaid)}
                      name="ispaid"
                      value={pay.ispaid}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                    >
                      <option value="false">Pendiente</option>
                      <option value="true">Pagado</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className={colorCheckChange(pay.downpayment, dataPayments[i]?.downpayment)}
                      name="downpayment"
                      value={pay.downpayment}
                      onChange={e => justAHitch(e, i)}
                    >
                      <option value="false">No</option>
                      <option value="true">Si</option>
                    </select>
                  </td>
                  <td>
                    <Tooltip title="Borrar el pago" aria-label="add">
                      <button className="button_delete" onClick={() => deleteModifiedPayment(i)}>
                        <DeleteIcon />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              </Grow>
            ))}
          <tr>
            <td>
              <p className="total">Total:</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div
                className={colorCheck(
                  calculateTotalModifiedPayments(modifiedPayments),
                  dataPayments[0]?.oportunity?.amount
                )}
              >
                <p>{calculateTotalModifiedPayments(modifiedPayments)}</p>
              </div>
            </td>
            <td>
              <div
                className={colorCheck(
                  calculateTotalComissionModifiedPayments(modifiedPayments),
                  dataPayments[0]?.oportunity?.comission
                )}
              >
                <p>{calculateTotalComissionModifiedPayments(modifiedPayments)}</p>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <p className="total">Total Esperado:</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="data">{peso(dataPayments[0]?.oportunity?.amount)}</div>
            </td>
            <td>
              <div className="data">{peso(dataPayments[0]?.oportunity?.comission)}</div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const PaymentDialog = ({
  open,
  setOpen,
  paymentsData,
  isRefetch,
  setIsRefetch,
  isLoading,
  setIsLoading,
  headerDialog,
  CRUD,
  dataPayments,
  setModifiedPayments,
  modifiedPayments,
  paymentData,
  setPaymentData,
  setPeriodicityOfPayments,
  periodicityOfPayments,
  setCommissionPeriod,
  commissionPeriod,
  oportunity,
  paymentPeriods,
}) => {
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;

    if (value == "pago único") {
      setPaymentData(prevData => ({
        ...prevData,
        [name]: value,
        paymentamount: 1,
        periodicitycomission: "Primer Pago",
      }));
    } else {
      setPaymentData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const close = () => {
    setOpen(false);
  };

  //Obten los datos del enganche actual en el calendario y retorna los datos normalizados, si no existe solo manda false
  const obtainDownPaymentData = () => {
    let downPaymentData = {};
    //Si existe un enganche
    dataPayments.forEach(item => {
      if (item.downpayment) {
        downPaymentData = {
          payment: item.payment,
          comission: item.comission,
          date: item.date, //Falta mandar la fecha corta (Revisar))
          observations: item.observations,
          ispaid: item.ispaid,
          oportunityId: item.oportunityId,
          downpayment: true,
        };
      }
    });

    if (Object.keys(downPaymentData).length === 0) {
      return false;
    }
    return downPaymentData;
  };

  const resetPayments = async () => {
    setIsLoading(true);

    //Datos del formulario norm Original
    let newPayments = {
      //Si exite el engache resta 1 a la periocidad
      paymentamount: obtainDownPaymentData().downpayment ? paymentData.paymentamount - 1 : paymentData.paymentamount,
      periodicity: paymentData.periodicity,
      periodicitycomission: paymentData.periodicitycomission,
      hitch: obtainDownPaymentData().downpayment,
    };

    //Revisa que los datos del formulario no esten vacios
    if (Object.values(newPayments).every(value => value !== "")) {
      //Guardara los objetos de los pagos
      let resultado = obtainDownPaymentData().downpayment ? [obtainDownPaymentData()] : [];

      //Calcula la periocidad y regresa un arreglo de fechas
      let arrayDates = generateDates(newPayments.periodicity, newPayments.paymentamount, paymentData.date);

      //Arreglo de pagos y su monto
      let total = obtainDownPaymentData().downpayment
        ? dataPayments[0].oportunity.amount - obtainDownPaymentData().payment
        : dataPayments[0].oportunity.amount;
      let divTotalPayment = total / newPayments.paymentamount;
      let divTotalPaymentArray = Array.from({ length: newPayments.paymentamount }, () => divTotalPayment);

      //Arreglo con las comisiones y su monto
      let comissionTotal = obtainDownPaymentData().downpayment
        ? dataPayments[0].oportunity.comission - obtainDownPaymentData().comission
        : dataPayments[0].oportunity.comission;
      let numberOfComission = obtainDownPaymentData().downpayment
        ? paymentData.paymentamount - 1
        : paymentData.paymentamount;
      let arrayComission = createCommissionArray(comissionTotal, paymentData.periodicitycomission, numberOfComission);

      //Guarda los objetos de los pagos
      for (let i = 0; i < newPayments.paymentamount; i++) {
        let obj = {
          payment: divTotalPaymentArray[i],
          comission: arrayComission[i],
          date: arrayDates[i],
          observations: "",
          ispaid: "false",
          oportunityId: dataPayments[0].oportunityId,
          downpayment: "false",
        };
        resultado.push(obj);
      }

      close();
      setModifiedPayments(resultado);

      //Actualiza las periocidades
      setPeriodicityOfPayments(newPayments.periodicity);
      setCommissionPeriod(newPayments.periodicitycomission);

      handleGlobalAlert("success", "Pagos creados correctamente!", "basic", dispatch);
    } else {
      handleGlobalAlert("warning", "Selecciona todos los campos ", "basic", dispatch);
    }
    setIsLoading(false);
  };

  const createPayments = async () => {
    setIsLoading(true);

    const payment = parseFloat(paymentData.payment);
    const comission = parseFloat(paymentData.comission);
    const date = formatDateToISO(paymentData.date);
    const observations = paymentData.observations;
    const ispaid = paymentData.ispaid == "true" ? true : false;

    const data = {
      payments: [
        {
          payment: payment ? payment : 0,
          comission: comission ? comission : 0,
          date: date,
          observations: observations ? observations : "",
          ispaid: ispaid ? ispaid : false,
          oportunityId: dataPayments[0].oportunityId,
        },
      ],
    };

    let res = await api.post("salespayments", data);

    if (res.status == 200) {
      close();
      setIsRefetch(!isRefetch);
      setIsLoading(false);
      return handleGlobalAlert("success", "Se creó el pago correctamente!", "basic", dispatch);
    } else {
      setIsLoading(false);
      return handleGlobalAlert("warning", "Llena todos los campos ", "basic", dispatch);
    }
  };

  //Regresa el id de un arreglo de objetos al ingresar el name
  const getIdFromName = (data, name) => {
    const obj = data.find(item => item.name === name);
    return obj ? obj.id : null;
  };

  //FUNCION PARA REVISAR SI TIENEN ID
  const checkIdExists = arr => {
    let check = true;
    arr.forEach(item => {
      if (!item.id) {
        check = false;
      }
    });
    return check;
  };

  //Guarda los datos en la base
  const updatePayment = async () => {
    setIsLoading(true);

    let objPayments = modifiedPayments.map(item => ({
      id: item.id ? item.id : false,
      payment: item.payment,
      comission: item.comission,
      date: formatDateToISO(item.date),
      observations: item.observations,
      ispaid: item.ispaid,
      paymentiva: item.paymentiva,
      downpayment: item.downpayment,
      oportunityId: item.oportunityId,
      ejecutiveId: item.ejecutiveId,
      paymentperiodId: getIdFromName(paymentPeriods, periodicityOfPayments),
    }));

    //Cuando todos tengan id enviar los datos a allpayments para que se actualicen
    console.log(
      "**Numero de pagos actuales",
      paymentData.paymentamount,
      "Numero de pagos nuevos: ",
      objPayments.length
    );
    if (checkIdExists(objPayments) && paymentData.paymentamount == objPayments.length) {
      console.log("OK !!! NEW OBJ PAYMENTS: ", { payments: objPayments });
      try {
        await api.put(`/salespayments/allpayments`, { payments: objPayments });
        handleGlobalAlert("success", "Los pagos se actualizaron correctamente!", "basic", dispatch);
      } catch (error) {
        handleGlobalAlert("error", "Error al actualizar!", "basic", dispatch);
      }
    } else {
      let newObjPayments = objPayments.map(({ id, ...resto }) => resto);
      let objPaymentsNoID = {
        allpayments: true,
        oportunity: {
          id: oportunity.id,
          comissiontype: commissionPeriod,
          payments: objPayments.length,
          paymentperiodicity: periodicityOfPayments,
        },
        payments: newObjPayments,
      };
      console.log("UN CAMPO NO TIENE ID !!!", objPaymentsNoID);
      try {
        await api.put(`/salespayments`, objPaymentsNoID);
        handleGlobalAlert("success", "Los pagos se actualizaron correctamente!", "basic", dispatch);
      } catch (error) {
        handleGlobalAlert("error", "Error al actualizar!", "basic", dispatch);
      }
    }

    close();
    setIsLoading(false);
    setIsRefetch(!isRefetch);
  };

  const deletePayment = async () => {
    setIsLoading(true);

    const current = await api.get(`salespayments/${paymentsData.id}`);
    let currentData = current.data;

    const payment = parseFloat(paymentData.payment);
    const comission = parseFloat(paymentData.comission);
    const date = formatDateToISO(paymentData.date);
    const observations = paymentData.observations;
    const ispaid = paymentData.ispaid == "true" ? true : false;

    if (
      currentData.payment == payment ||
      currentData.comission == comission ||
      currentData.date == date ||
      currentData.observations == observations ||
      currentData.ispaid == ispaid
    ) {
      const data = {
        payments: [
          {
            downpayment: false,
            paymentId: currentData.id,
            payment: currentData.payment,
            comission: currentData.comission,
            date: currentData.date,
            observations: currentData.observations,
            ispaid: currentData.ispaid,
            oportunityId: currentData.oportunityId,
          },
        ],
      };

      await api.put("salespayments", data);
      close();
      setIsRefetch(!isRefetch);
      setIsLoading(false);
      return handleGlobalAlert("success", "Se borro el pago correctamente!", "basic", dispatch);
    } else {
      setIsLoading(false);
      return handleGlobalAlert("warning", "No se borro correctamente!", "basic", dispatch);
    }
  };

  const confirmChanges = () => {
    switch (CRUD) {
      case "reset":
        resetPayments();
        break;
      case "create":
        createPayments();
        break;
      case "update":
        updatePayment();
        break;
      case "delete":
        deletePayment();
        break;
      default:
        break;
    }
  };

  const generateDates = (periodicity, numDates, startDate) => {
    const today = dayjs(startDate); // obtener la fecha actual

    if (periodicity === "pago único") {
      return [today.format("YYYY-MM-DD")];
    }

    let interval;
    switch (periodicity) {
      case "semanal":
        interval = "week";
        break;
      case "mensual":
        interval = "month";
        break;
      case "bimestral":
        interval = "month";
        break;
      case "trimestral":
        interval = "month";
        break;
      case "semestral":
        interval = "month";
        break;
      case "anual":
        interval = "year";
        break;
      default:
        return [];
    }

    const dates = [today.format("YYYY-MM-DD")];
    for (let i = 1; i < numDates; i++) {
      if (periodicity === "bimestral") {
        dates.push(today.add(2 * i, interval).format("YYYY-MM-DD"));
      } else if (periodicity === "trimestral") {
        dates.push(today.add(3 * i, interval).format("YYYY-MM-DD"));
      } else if (periodicity === "semestral") {
        dates.push(today.add(6 * i, interval).format("YYYY-MM-DD"));
      } else {
        dates.push(today.add(i, interval).format("YYYY-MM-DD"));
      }
    }

    return dates;
  };

  const createCommissionArray = (commission, periodType, periodCount) => {
    const commissionArray = [];

    for (let index = 0; index < periodCount; index++) {
      commissionArray.push(0);
    }

    switch (periodType) {
      case "Primer Pago":
        if (!obtainDownPaymentData().downpayment) {
          commissionArray[0] = commission;
        }
        break;
      case "Segundo Pago":
        if (!obtainDownPaymentData().downpayment) {
          commissionArray[0] = 0;
          commissionArray[1] = commission;
        } else {
          commissionArray[0] = commission;
        }
        break;
      case "Prorrateadas":
        const dividedCommission = commission / periodCount;
        for (let i = 0; i < periodCount; i++) {
          commissionArray[i] = dividedCommission;
        }
        break;
      default:
        break;
    }

    return commissionArray;
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <PaymentDialogStyleContainer>
        <div className={`header_${CRUD}`} onClick={() => console.log(paymentData)}>
          <p>{headerDialog}</p>
        </div>
        <div className="body_paymetdialog">
          {CRUD == "reset" && (
            <div className="edit_paymetdialog">
              <p>Fecha de inicio:</p>
              <input value={paymentData?.date} name="date" onChange={handleChange} type="date" />

              <p>Periocidad De Pago:</p>
              <select name="periodicity" onChange={handleChange} value={paymentData?.periodicity}>
                {paymentPeriods.map(item => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <p>Número De Pagos:</p>
              <input
                value={paymentData.periodicity == "pago único" ? 1 : paymentData.paymentamount}
                name="paymentamount"
                onChange={e => {
                  if (paymentData.periodicity !== "pago único") {
                    handleChange(e);
                  }
                }}
                type="number"
                min="1"
                onWheel={e => e.stopPropagation()}
              />

              <p>Periodicidad De Comisión:</p>
              <select
                name="periodicitycomission"
                onChange={e => {
                  if (paymentData.periodicity !== "pago único") {
                    handleChange(e);
                  }
                }}
                defaultValue={
                  commissionPeriod
                    ? commissionPeriod
                    : paymentData.periodicity == "pago único"
                    ? "Primer Pago"
                    : paymentData.periodicitycomission
                }
              >
                <option value="" disabled selected hidden>
                  Selecciona un periodo
                </option>
                <option value="Primer Pago">Primer Pago</option>
                {paymentData.periodicity != "pago único" && <option value="Segundo Pago">Segundo Pago</option>}
                {paymentData.periodicity != "pago único" && <option value="Prorrateadas">Prorrateadas</option>}
              </select>
            </div>
          )}

          <div className="buttons_paymentdialog">
            <button className="cancel" onClick={() => close()}>
              Cancelar
            </button>

            {isLoading ? (
              <button className="save">
                <CircularProgress size={24} color="inherit" />
              </button>
            ) : (
              <button className={`confirm_${CRUD}`} onClick={() => confirmChanges()}>
                Confirmar
              </button>
            )}
          </div>
        </div>
      </PaymentDialogStyleContainer>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const PaymentDialogStyleContainer = styled.div`
  width: 500px;
  height: auto;

  button {
    cursor: pointer;
  }

  input {
    width: 100%;
    height: 42px;
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
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  select {
    width: 100%;
    height: 42px;
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
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .header_reset {
    padding: 10px;
    background-color: #405189;
    font-weight: 500;
    color: #fff;
  }

  .header_create {
    padding: 10px;
    background-color: #008000;
    font-weight: 500;
    color: #fff;
  }

  .header_update {
    padding: 15px;
    background-color: #fff;
    font-weight: 500;
    color: #000;
  }
  .header_delete {
    padding: 10px;
    background-color: #f00c0c;
    font-weight: 500;
    color: #fff;
  }
  .body_paymetdialog {
    padding: 10px;
    .edit_paymetdialog {
      display: grid;
      grid-template-columns: auto auto;
      p {
        width: 100%;
        height: 42px;
        margin-top: 10px;
        background-clip: padding-box;
        border-radius: 0.25rem;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 10px 23px 9px 11px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }
    }
    .buttons_paymentdialog {
      display: flex;
      margin-top: 10px;
      justify-content: right;
      align-items: center;

      button {
        height: 35px;
        margin-top: 5px;
        text-transform: capitalize;
        color: #fff;
        background-color: #103c82;
        transition: background-color 0.3s ease-in-out;
        margin-left: 2px;
        border-radius: 8px;
        padding: 6px 8px;
        border: 0px;
        :hover {
          background-color: #0c203b;
        }
      }

      .cancel {
        text-transform: capitalize;
        color: #fff;
        background-color: #0c203b;
        border-radius: 8px;
        margin-left: 5px;
      }

      .confirm_reset {
        text-transform: capitalize;
        color: #fff;
        background-color: #103c82;
        margin-left: 5px;
        border-radius: 8px;
      }

      .confirm_create {
        text-transform: capitalize;
        color: #fff;
        background-color: #008000;
        margin-left: 5px;
        border-radius: 8px;
        :hover {
          background-color: #006d00;
        }
      }

      .confirm_update {
        text-transform: capitalize;
        color: #fff;
        background-color: #103c82;
        margin-left: 5px;
        border-radius: 8px;
      }

      .confirm_delete {
        text-transform: capitalize;
        color: #fff;
        background-color: #f00c0c;
        margin-left: 5px;
        border-radius: 8px;
        :hover {
          background-color: #a30000;
        }
      }
    }
  }
`;

export const MenuStyle = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  font-weight: 500;

  div {
    //background-color: grey;
    padding: 10px;
    margin: 1px;
  }

  .off {
    border-radius: 2px 2px 0 0;
    background-color: #7ca6ff;
    color: gray;
    cursor: pointer;
    :hover {
      //transition-duration: 1s;
      color: #fff;
    }
  }

  .on {
    border-radius: 2px 2px 0 0;
    background-color: #407aff;
    color: #fff;
    cursor: pointer;
  }
`;

export const ContainerStyle = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);

  table {
    padding-bottom: 10px;
  }

  .tabla-responsive {
    overflow-x: auto;
    padding-bottom: 10px;
    margin-bottom: 20px;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    :hover{
      cursor: grab;
    }
  }

  .tabla-responsive table {
    width: 100%;
    border-collapse: collapse;
  }

  .tabla-responsive th,
  .tabla-responsive td {
    padding: 1px;
    text-align: left;
    white-space: nowrap;
    min-width: 100px;
  }

  .tabla-responsive::-webkit-scrollbar {
    height: 3px;
  }

  .tabla-responsive::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color del fondo de la barra de desplazamiento */
  }

  .tabla-responsive::-webkit-scrollbar-thumb {
    background-color: #888; /* Color del "pulgar" de la barra de desplazamiento */
    border-radius: 1px; /* Radio de borde del "pulgar" */
  }

  .tabla-responsive::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color del "pulgar" de la barra de desplazamiento en estado hover */
  }

  @media (max-width: 600px) {
    .tabla-responsive th,
    .tabla-responsive td {
      display: block;
      width: 100%;
    }
  }

  select {
    width: 100%;
    height: 42px;
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
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
  .data {
    width: 100%;
    height: 42px;
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
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .modified {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-clip: padding-box;
    background-color: #90caf9;
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
    grid-gap: 10px;

    .save {
      background-color: #405189;
      color: #fff;
      :hover {
        background-color: #3f51b5;
      }
    }
  }

  .button_reset {
    width: 100%;
    height: 42px;
    text-transform: capitalize;
    color: #6b34bc;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #9c72db;
    }
  }
  .button_add {
    width: 100%;
    height: 42px;
    text-transform: capitalize;
    color: green;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #88c82d;
    }
  }
  .button_edit {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    text-transform: capitalize;
    color: #407aff;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #7ca6ff;
    }
  }
  .button_delete {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    text-transform: capitalize;
    color: #f00c0c;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
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

  .bar_buttons {
    display: grid;
    grid-template-columns: auto 100px 100px;
    grid-gap: 10px;
    margin-bottom: 10px;
    background-color: #405189;
    color: #fff;
    border-radius: 6px;
    padding: 6px 8px;
    border: 0px;
    p {
      font-weight: bold;
      padding: 5px;
    }
  }

  button {
    width: 100px;
    height: 42px;
    text-transform: capitalize;
    color: #424242;
    background-color: #cfd8dc;
    -webkit-transition: background-color 0.3s ease-in-out;
    transition: background-color 0.3s ease-in-out;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #90a4ae;
    }
  }
`;
