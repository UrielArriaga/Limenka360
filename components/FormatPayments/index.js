import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Tooltip } from "@material-ui/core";
import "moment/locale/es";
import {
  CalendarToday,
  Router,
  ErrorOutline,
  CheckCircleOutline,
  NotInterested,
  MoneyOff,
  Add,
  PictureAsPdf,
  Image,
  FileCopy,
  Delete,
  Visibility,
} from "@material-ui/icons";
import { motion } from "framer-motion";
// import { commisionsDb, periodicityes } from "../../BD/databd";
import dayjs from "dayjs";
import { CardDefault, PaymentsStyled } from "./styles.styled";
import { useDispatch, useSelector } from "react-redux";
import { handleGlobalAlert } from "../../utils";
import { userSelector } from "../../redux/slices/userSlice";
import Select from "react-select";
import useFetchData from "../../hooks/useFetchData";
import useAlertToast from "../../hooks/useAlertToast";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";

const FormatPayments = ({
  totals,
  setTotals,
  showAll,
  amountTotal,
  comisionTotal,
  isOkPayments,
  setIsOkPayments,
  oportunitiId,
  defaultCommision,
  setDisableButton,
  disableButton,
  isEditing,
  setPeriodicityOfPayments,
  renderFileIntoDrawer,
}) => {
  const initalPayment = {
    payment: 0,
    comission: 0,
    reference: "",
    ispaid: false,
  };

  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { filetypes } = useSelector(commonSelector);
  const { showAlertWarning } = useAlertToast();
  const [countPayments, setCountPayments] = useState(1);
  const [payments, setPayments] = useState([initalPayment]);
  const [typeCommision, setTypeCommision] = useState("Prorrateadas");
  const [typeDownPayment, setTypeDownPayment] = useState("withoutDownPayment");
  const { id_user } = useSelector(userSelector);
  const [period, setPeriod] = useState("mensual");

  const [sumPayments, setSumPayments] = useState(0);
  const [sumCommisions, setSumCommisions] = useState(0);

  const [periodicities, setPeriodicities] = useState(paymentsPeriods);

  const [manualChanges, setManualChanges] = useState(true);
  const [edited, setEdited] = useState(false);

  const normalizeDataSelect = data => {
    return data.map(item => ({
      value: item.id,
      label: item.name,
    }));
  };

  const processResponseArray = response => response.data.results;
  const { data: paymentways } = useFetchData("paymentways", processResponseArray, { all: true }, normalizeDataSelect);
  const { data: paymentsacounts } = useFetchData(
    "paymentsacounts",
    processResponseArray,
    { all: true },
    normalizeDataSelect
  );

  useEffect(() => {
    if (isEditing) {
      setEdited(true);
      setCountPayments(totals.length);
      const formatedDates = totals.map(obj => {
        obj.date = dayjs(obj.date).format("YYYY-MM-DD");
        if (obj.paymentperiodId) {
          setPeriod(periodicities.find(per => per.id === obj.paymentperiodId));
        }
        return obj;
      });

      setPayments(formatedDates);
      setTotals(formatedDates);
    }
  }, [totals, isEditing]);

  useEffect(() => {
    getCatalogBy("filetypes");
  }, []);

  useEffect(() => {
    if (!edited) generateInputs(countPayments);
  }, [typeDownPayment, countPayments, manualChanges, amountTotal]);

  useEffect(() => {
    checkPayments();
    checkSums();
  }, [payments, totals]);

  const checkPayments = () => {
    let paymentsSuccess = payments.filter((item, index) => item.ispaid);
    if (payments.length === paymentsSuccess.length) {
      setIsOkPayments(true);
    }
  };

  const checkSums = () => {
    let localSumPayments = 0;
    let localSumCommisions = 0;

    let anyNegative = false;

    totals.forEach(element => {
      localSumPayments += Number(element.payment);
      localSumCommisions += Number(element.comission);
      if (element.payment < 0 || element.comission < 0) {
        anyNegative = true;
      }
    });

    setSumPayments(localSumPayments.toFixed(2));
    setSumCommisions(localSumCommisions.toFixed(2));
    if (
      Number(localSumPayments).toFixed(2) === Number(amountTotal).toFixed(2) &&
      Number(localSumCommisions).toFixed(2) === Number(comisionTotal).toFixed(2) &&
      !anyNegative
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const numberWithCommas = x => {
    if (!x) return "";
    if (typeof x === "number") return `${x}`;
    return x.replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const generateInputs = totalPayments => {
    const items = [];
    let auxSumPayments = 0;
    let auxSumCommissions = 0;
    const currentDate = dayjs().format("YYYY-MM-DD");
    const periodId = periodicities.find(p => p.name === period).id;

    for (let i = 0; i < totalPayments; i++) {
      const item = {};
      const isLast = i === totalPayments - 1;
      const paymentAmount = isLast
        ? Number(amountTotal - auxSumPayments).toFixed(2)
        : Number(amountTotal / totalPayments).toFixed(2);
      const commissionAmount = isLast
        ? Number(comisionTotal - auxSumCommissions).toFixed(2)
        : Number(comisionTotal / totalPayments).toFixed(2);

      auxSumPayments += isLast ? 0 : +paymentAmount;
      auxSumCommissions += isLast ? 0 : +commissionAmount;

      const nextDate =
        i === 0
          ? currentDate
          : dayjs(currentDate)
              .add(dateAddByPeriod[period]?.lapse * i, dateAddByPeriod[period]?.period)
              .format("YYYY-MM-DD");

      Object.assign(item, {
        date: nextDate,
        payment: paymentAmount,
        comission: commissionAmount,
        observations: "",
        ispaid: false,
        oportunityId: oportunitiId,
        ejecutiveId: id_user,
        downpayment: i === 0 && typeDownPayment === "withdownPayment",
        period: periodId,
        paymentwayId: payments[i]?.paymentwayId,
        paymentaccountId: payments[i]?.paymentaccountId,
      });

      items.push(item);
    }

    setPayments(items);
    setTotals(items);
  };

  // * Handlers events

  const handleOnChangeTotalPayments = e => {
    let value;
    if (e.target.value > 80) {
      value = 80;
    } else {
      value = e.target.value.replace(/\D/g, "");
    }

    setCountPayments(Number(value));
    const updatedPayments = payments.map(item => ({
      ...item,
      paymentaccountId: "",
      paymentwayId: "",
    }));

    setPayments(updatedPayments);
  };

  const handleOnChangePeriod = e => {
    let period = e.target.value;
    setPeriodicityOfPayments(period); //Guardamos el periodo
    setPeriod(e.target.value);

    let filterPeriod = periodicities.filter(p => p.name === period);
    // console.log(filterPeriod.id);

    if (e.target.value === "1") {
      setCountPayments(Number("1"));
    }

    // console.log(dateAddByPeriod[period]);
    for (let i = 0; i < payments.length; i++) {
      if (i == 0) {
        modifyPropertyPayment(i, "period", filterPeriod[0].id);
      }
      let currentDate = dayjs().format("YYYY-MM-DD");

      let nextDate = dayjs(currentDate)
        .add(i * dateAddByPeriod[period].lapse, dateAddByPeriod[period].period)
        .format("YYYY-MM-DD");
      modifyPropertyPayment(i, "date", nextDate);
      modifyPropertyPayment(i, "period", filterPeriod[0].id);
    }
  };

  const handleOnChangeTypeComission = e => {
    let value = e.target.value;
    setTypeCommision(value);
    if (value === "Primer Pago") {
      let paymentsToUpdate = [...payments];
      for (let i = 0; i < payments.length; i++) {
        if (i === 0) {
          paymentsToUpdate[0].comission = comisionTotal;
          // paymentsToUpdate[0].payment = comisionTotal / 0.03;
        } else {
          paymentsToUpdate[i].comission = 0;
        }
      }
      return;
    } else if (value === "Segundo Pago") {
      let paymentsToUpdate = [...payments];
      for (let i = 0; i < payments.length; i++) {
        if (i === 1) {
          paymentsToUpdate[1].comission = comisionTotal;
          // paymentsToUpdate[0].payment = comisionTotal / 0.03;
        } else {
          paymentsToUpdate[i].comission = 0;
        }
      }
      return;
    }

    let paymentsToUpdate = [...payments];
    for (let i = 0; i < payments.length; i++) {
      paymentsToUpdate[i].comission = comisionTotal / countPayments;
    }
  };

  const handleSelectDownPayment = e => {
    setTypeDownPayment(e.target.value);
    setTypeCommision("Prorrateadas");

    if (e.target.value === "withdownPayment") {
      setCountPayments(countPayments + 1);
    } else {
      setCountPayments(countPayments - 1);
    }
  };

  function validate(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx)[0];
  }

  const handleOnChangeAmount = (newAmount, position, isComission) => {
    let paymentsToUpdate = [...payments];
    newAmount = newAmount.replace(",", "");
    paymentsToUpdate[position].payment = newAmount;

    let difference = paymentsToUpdate[position].payment - newAmount;
    let differenceC = paymentsToUpdate[position].comission - newAmount * 0.03;

    if (isComission) {
      let amountAux = (amountTotal - newAmount) / (countPayments - 1);
      let comisionAux = (comisionTotal - newAmount * 0.03) / (countPayments - 1);
      paymentsToUpdate[position].comission = newAmount * 0.03;

      for (let index = 1; index < payments.length; index++) {
        paymentsToUpdate[index].payment = amountAux;
        paymentsToUpdate[index].comission = comisionAux;
      }
    } else if (manualChanges) {
      paymentsToUpdate[position].comission = newAmount * 0.03;

      if (position === paymentsToUpdate.length - 1) {
        paymentsToUpdate[0].payment = Number(totals[0].payment + difference).toFixed(2);

        paymentsToUpdate[0].comission = Number(totals[0].comission + differenceC).toFixed(2);
      } else {
        paymentsToUpdate[paymentsToUpdate.length - 1].payment = Number(
          Number(totals[paymentsToUpdate.length - 1].payment) + difference
        );

        paymentsToUpdate[paymentsToUpdate.length - 1].comission = Number(
          Number(totals[paymentsToUpdate.length - 1].comission) + differenceC
        );
      }
    }

    setPayments(paymentsToUpdate);
    setTotals(paymentsToUpdate);
  };

  const handleOnChangeComission = (newComission, position) => {
    let paymentsToUpdate = [...payments];
    let difference = paymentsToUpdate[position].comission - newComission;
    paymentsToUpdate[position].comission = newComission;

    if (manualChanges) {
      if (position === paymentsToUpdate.length - 1) {
        paymentsToUpdate[0].comission = Number(totals[0].comission + difference).toFixed(2);
      } else {
        paymentsToUpdate[paymentsToUpdate.length - 1].comission = Number(
          Number(totals[paymentsToUpdate.length - 1].comission) + difference
        ).toFixed(2);
      }
    }

    setPayments(paymentsToUpdate);
    setTotals(paymentsToUpdate);
  };

  const handleOnChangeDate = (newDate, position) => {
    let paymentsToUpdate = [...payments];

    if (position === 0 && typeDownPayment === "withdownPayment") {
      paymentsToUpdate[0].date = newDate;
    } else {
      let i = 0;
      if (typeDownPayment === "withdownPayment") {
        i++;
      }
      for (i = position; i < payments.length; i++) {
        // let nextDate = dayjs(newDate)
        //   .add(dateAddByPeriod[period]?.lapse * i, dateAddByPeriod[period]?.period)
        //   .format("YYYY-MM-DD");

        let nextDate = dayjs(newDate)
          .add(i * dateAddByPeriod[period].lapse, dateAddByPeriod[period].period)
          .format("YYYY-MM-DD");

        paymentsToUpdate[i].date = nextDate;
      }
    }

    setPayments(paymentsToUpdate);
    setTotals(paymentsToUpdate);
  };

  const handleOnChangeStatusPaymet = (index, property, value) => {
    const booleanValue = value === "true" ? true : value === "false" ? false : Boolean(value);

    // Actualizar el estado de pago
    modifyPropertyPayment(index, property, booleanValue);

    // Si el estado de pago es 'false', establecer paymentwayId y paymentaccountId como undefined
    if (booleanValue === false) {
      modifyPropertyPayment(index, "paymentwayId", undefined);
      modifyPropertyPayment(index, "paymentaccountId", undefined);
    }
  };
  const modifyPropertyPayment = (position, property, value) => {
    let paymentsToUpdate = [...payments];
    paymentsToUpdate[position][property] = value;

    setPayments(paymentsToUpdate);
    setTotals(paymentsToUpdate); // Asegúrate de que `totals` se actualiza correctamente
  };

  const handleShowAlert = type => {
    switch (type) {
      case "amounts":
        let value = payments.some((item, index) => item.total < 0);
        if (value) {
          handleGlobalAlert(
            "error",
            "Los pagos no pueden ser negativos, reduce los pagos o colocalos en 0",
            "basic",
            dispatch,
            6000
          );
        }
        break;
      default:
        break;
    }
  };

  const handleChange = e => {
    setManualChanges(e.target.checked);
  };

  const handleOnChangeFilePayment = (position, e) => {
    if (e.target.files[0] === undefined) return;

    let typeFileId = filetypes?.results?.filter(item => item?.name == "Confirmacion de Pago")[0];
    // console.log(typeFileId, "tippo");

    let typeFile = e.target.files[0].name.split(".").pop();
    let acceptFile = ["jpg", "png", "jpeg", "pdf"];
    let validateFile = acceptFile.filter(item => item === typeFile);
    if (validateFile.length === 0) return showAlertWarning("El tipo de archivo no es admitido");

    const url = URL.createObjectURL(e.target.files[0]);
    const files = e.target.files[0];
    modifyPropertyPayment(position, "payFile", files);
  };

  const returnStyleTypeFile = type => {
    switch (type) {
      case "application/pdf":
        return <PictureAsPdf />;
      case "jpeg":
        return <Image />;
      case "jpg":
        return <Image />;
      case "png":
        return <Image />;
      default:
        return <FileCopy />;
    }
  };

  const validateURL = urlfile => {
    if (!urlfile) return "";
    let file = URL.createObjectURL(urlfile);
    return file;
  };

  const handleClickDeleteFilePayment = position => {
    modifyPropertyPayment(position, "payFile", "");
  };

  return (
    <PaymentsStyled>
      <div className="headform">
        <div className="row">
          <CalendarToday />
          <h3>Calendario de pagos</h3>
        </div>

        <Grid container spacing={4}>
          <Grid item md={3}>
            <div className="item">
              <div className="label-box row">
                <label className="item">#Pagos</label>
                <strong>*</strong>
              </div>
              <input
                type="number"
                onChange={e => handleOnChangeTotalPayments(e)}
                value={countPayments}
                disabled={period === "1"}
              />
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="item">
              <div className="label-box row">
                <label className="item">Periodicidad</label>
                <strong>*</strong>
              </div>
              <select
                defaultValue={"mensual"}
                value={period}
                type="texto"
                placeholder="periodicidad"
                className="input"
                onChange={e => handleOnChangePeriod(e)}
              >
                <option disabled hidden defaultValue>
                  Selecciona un periodo
                </option>

                {periodicities.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name[0].toUpperCase() + item.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="item">
              <div className="label-box row">
                <label className="item">Comisión</label>
                <strong>*</strong>
              </div>
              <select
                value={typeCommision}
                onChange={e => handleOnChangeTypeComission(e)}
                name="comisions"
                id="comisions"
                type="texto"
                placeholder="periodicidad"
                className="input"
                disabled={period === "1"}
              >
                <option value="Primer Pago">Primer Pago</option>
                <option value="Segundo Pago">Segundo Pago</option>
                <option value="Prorrateadas">Prorrateadas</option>
              </select>
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="item">
              <div className="label-box row">
                <label className="item downpayment">Enganche</label>
              </div>
              <select
                value={typeDownPayment}
                onChange={e => handleSelectDownPayment(e)}
                name="downPayment"
                id="downPayment"
                type="texto"
                className="input"
                disabled={period === "1" && manualChanges}
              >
                <option value="withoutDownPayment">Sin enganche</option>
                <option value="withdownPayment">Con enganche</option>
              </select>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="payments">
        <div className="title" style={{ marginBottom: 20, marginTop: 20 }}>
          <b>Mis Pagos</b> (<span>Calcular automáticamente</span>
          <Tooltip title="Controla los pagos de manera manual">
            <input type="checkbox" defaultChecked={manualChanges} onChange={e => handleChange(e)} />
          </Tooltip>
          )
        </div>

        {payments?.map((item, index) => {
          return (
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Divider />
              <Grid container spacing={1} style={{ marginBottom: "2%", paddingTop: "7px" }}>
                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment && "downpayment"}`}>
                        {item.downpayment ? "Enganche" : `Pago ${index + 1}`}
                      </label>
                      <strong>*</strong>
                    </div>
                    <input
                      className={`input ${item.payment < 0 ? "error" : ""}`}
                      value={numberWithCommas(item.payment)}
                      onChange={e => handleOnChangeAmount(e.target.value, index, item.downpayment)}
                      disabled={(period === "1" || manualChanges) && !item.downpayment}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment && "downpayment"}`}>Comisión</label>
                      <strong>*</strong>
                    </div>
                    <input
                      className={`input ${item.comission < 0 ? "error" : ""}`}
                      value={item.comission}
                      onChange={e => handleOnChangeComission(e.target.value, index)}
                      disabled={(period === "1" || manualChanges) && !item.downpayment}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment && "downpayment"}`}>Fecha</label>
                      <strong>*</strong>
                    </div>
                    <input
                      className="input"
                      type="date"
                      value={item.date}
                      onChange={e => handleOnChangeDate(e.target.value, index)}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment ? "downpayment" : ""}`}>Tipo de pago</label>
                      {item.ispaid && <strong>*</strong>}
                    </div>

                    <select
                      disabled={item.ispaid === false} // Desactiva si está pendiente
                      value={item.paymentwayId || ""} // Asegura que esté vacío si es pendiente
                      onChange={e => modifyPropertyPayment(index, "paymentwayId", e.target.value)}
                    >
                      <option hidden value="">
                        Seleccione Tipo de pago
                      </option>
                      {paymentways?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment ? "downpayment" : ""}`}>Cuenta de pago</label>
                      {item.ispaid && <strong>*</strong>}
                    </div>

                    <select
                      disabled={item.ispaid === false}
                      value={item.paymentaccountId || ""}
                      onChange={e => modifyPropertyPayment(index, "paymentaccountId", e.target.value)}
                    >
                      <option value="" disabled>
                        Seleccione Cuenta de pago
                      </option>{" "}
                      {paymentsacounts?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment && "downpayment"}`}>Estado</label>
                      <strong>*</strong>
                    </div>
                    <select
                      name="isPaid"
                      type="texto"
                      value={item.ispaid.toString()}
                      className={`inputPaid ${item.ispaid === true ? "ispaid" : "notpaid"}`} // Aplica la clase condicional directamente
                      onChange={e => handleOnChangeStatusPaymet(index, "ispaid", e.target.value)}
                    >
                      <option value={"false"}>Pendiente</option>
                      <option value={"true"}>Pagado</option>
                    </select>
                  </div>
                </Grid>

                {item?.ispaid && (
                  <>
                    <Grid item xs={12} md={6}>
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="itemComment">
                          <div className="label-box row">
                            <label className={`item ${item.observations && "observations"}`}>
                              Comentarios de pago {index}
                            </label>
                            <strong>*</strong>
                          </div>
                          <input
                            className="input"
                            type="text"
                            placeholder="Ingresa comentarios"
                            value={item.observations}
                            onChange={e => modifyPropertyPayment(index, "observations", e.target.value)}
                          />
                        </div>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="itemFile">
                          <div className="label-box row">
                            <label className={`item ${item.downpayment ? "none" : ""}`}>Comporbante de pago</label>
                            {item.ispaid && <strong>*</strong>}
                          </div>
                          {item?.payFile?.name ? (
                            <div className="uploadFile">
                              {returnStyleTypeFile(item?.payFile?.type)}
                              <div className="content_file">
                                <Tooltip title={"Visualizar " + item?.payFile?.name}>
                                  <p
                                    onClick={() => window.open(`${validateURL(item?.payFile)}`, "_blank")}
                                    className="title_file"
                                  >
                                    {item?.payFile?.name}
                                  </p>
                                </Tooltip>
                              </div>
                              <div className="content_btns">
                                <Tooltip title="Eliminar Archivo">
                                  <Delete className="iconDelete" onClick={() => handleClickDeleteFilePayment(index)} />
                                </Tooltip>
                                <Tooltip title="Ver Archivo">
                                  <Visibility className="iconView" onClick={() => renderFileIntoDrawer(item)} />
                                </Tooltip>
                              </div>
                            </div>
                          ) : (
                            <CardDefault>
                              <label className="label">
                                <span>
                                  <Add className="default_icon" /> Agregar Archivo
                                </span>
                                <input
                                  className="input"
                                  type="file"
                                  accept="image/*,.pdf"
                                  disabled={item.ispaid === false}
                                  onChange={e => handleOnChangeFilePayment(index, e)}
                                />
                              </label>
                            </CardDefault>
                          )}
                        </div>
                      </motion.div>
                    </Grid>
                  </>
                )}

                {/* <Grid item xs={12} md={1}>
                  <div className="item">
                    <div className="label-box row">
                      <label className={`item ${item.downpayment && "downpayment"}`}>Estatus</label>
                      <strong>*</strong>
                    </div>

                    <div className="icon">
                      {item.ispaid ? (
                        <Tooltip title="Pagado">
                          <CheckCircleOutline className="success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="No pagado">
                          <MoneyOff />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </Grid> */}
              </Grid>
            </motion.div>
          );
        })}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="label-box row">
                  <label className={`item checker`}>Total</label>
                </div>
                <input
                  className={`input ${
                    Number(sumPayments).toFixed(2) !== Number(amountTotal).toFixed(2) ? "error" : ""
                  }`}
                  value={`${numberWithCommas(Number(sumPayments).toFixed(2))} / ${numberWithCommas(
                    Number(amountTotal).toFixed(2)
                  )}`}
                  disabled
                />
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className="item">
                <div className="label-box row">
                  <label className={`item checker `}>Comisión</label>
                </div>
                <input
                  className={`input ${
                    Number(sumCommisions).toFixed(2) !== Number(comisionTotal).toFixed(2) ? "error" : ""
                  }`}
                  value={`${numberWithCommas(Number(sumCommisions).toFixed(2))} / ${numberWithCommas(
                    Number(comisionTotal).toFixed(2)
                  )}`}
                  disabled
                />
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="label-box row">
                  <label className={`item checker`}>Periodicidad</label>
                </div>
                <input className="input" value={period} disabled />
              </div>
            </Grid>

            {/* <Grid item xs={12} md={3}></Grid> */}

            <Grid item xs={12} md={1}>
              <div className="item">
                <div className="label-box row">
                  <label className={`item `}>Datos {disableButton ? "incorrectos" : "correctos"}</label>
                </div>

                <div className="icon">
                  {disableButton ? (
                    <Tooltip title="La suma de pagos, comisiones no cohincide o hay valores negativos">
                      <NotInterested className="error" />
                    </Tooltip>
                  ) : (
                    <CheckCircleOutline className="success" />
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </PaymentsStyled>
  );
};
export default FormatPayments;

// * UTILS

const dateAddByPeriod = {
  "pago único": { lapse: 1, period: "day" },
  semanal: { lapse: 1, period: "week" },
  mensual: { lapse: 1, period: "month" },
  bimestral: { lapse: 2, period: "month" },
  trimestral: { lapse: 3, period: "month" },
  semestral: { lapse: 6, period: "month" },
  anual: { lapse: 1, period: "year" },
};

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
