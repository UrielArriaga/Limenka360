import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Tooltip, Grow, LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import { api } from "../../../../services/api";
import { handleGlobalAlert } from "../../../../utils";
import { userSelector } from "../../../../redux/slices/userSlice";
import BarButtons from "./BarButtons";
import PaymentDialog from "./PaymentDialog";
import Decimal from "decimal.js";
import { ContainerStyle } from "./PaymentCalendar.styles";
import useFetchData, { normalizeDataSelect, processResponseArray } from "../../../../hooks/useFetchData";

export default function PaymentCalendar({ dataPayments, isRefetch, setIsRefetch }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const oportunityId = router.query.o;
  const { id_user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [modifiedPayments, setModifiedPayments] = useState(dataPayments);
  const [periodicityOfPayments, setPeriodicityOfPayments] = useState("");
  const [commissionPeriod, setCommissionPeriod] = useState("");
  const [paymentData, setPaymentData] = useState();
  const [oportunity, setOportunity] = useState();
  const [paymentPeriods, setPaymentPeriods] = useState([]);
  const [dialogConfirm, setDialogConfirm] = useState(false);

  //Obtener los datos para el dialogo iniciales
  useEffect(() => {
    getOportunity();
    getPaymentPeriods();
  }, [isRefetch, oportunityId]);

  useEffect(() => {
    resetModifiedPayments();
  }, [dataPayments]);

  const handleClose = () => {
    setOpen(false);
  };

  //Obtener los datos de la oportunidad
  const getOportunity = async () => {
    let params = {
      where: { id: oportunityId },
      keys: "id,paymentperiodicity,payments,comissiontype",
    };
    let response = await api.get(`oportunities`, { params });
    let opo = response.data.results[0];
    setOportunity(opo);
    //Guarda los datos del dialog
    setPaymentData({
      date: formatDate(dataPayments[0]?.date),
      periodicity: opo?.paymentperiodicity,
      paymentamount: opo?.payments,
      periodicitycomission: opo?.comissiontype,
    });
    //Periocidad actual (en base)
    setPeriodicityOfPayments(opo?.paymentperiodicity);
    setCommissionPeriod(opo?.comissiontype);
  };

  //Obtener los periodos de los pagos
  const getPaymentPeriods = async () => {
    const response = await api.get(`paymentperiods`);
    const paymentPeriods = response.data.results.filter(item => item.name !== "rango");
    setPaymentPeriods(paymentPeriods);
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
    setDialogConfirm(false);
    setOpen(true);
  };

  const calculateTotalModifiedPayments = () => {
    let totalPayment = new Decimal(0);
    modifiedPayments.forEach(payment => {
      totalPayment = totalPayment.plus(new Decimal(payment.payment));
    });
    return totalPayment.toString();
  };

  const calculateTotalComissionModifiedPayments = () => {
    let totalComission = new Decimal(0);

    modifiedPayments.forEach(payment => {
      const comission = new Decimal(payment.comission);
      totalComission = totalComission.plus(comission);
    });

    return totalComission.toString();
  };

  const peso = amount => {
    if (!amount) {
      amount = 0;
    }
    return amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
  };

  const validatePayments = payments => {
    return payments.every(payment => {
      if (payment.ispaid === true || payment.ispaid == "true") {
        return payment.paymentwayId !== null && payment.paymentaccountId !== null;
      }
      return true;
    });
  };

  //Abir modal para guardar
  const savePayments = () => {
    if (!validatePayments(modifiedPayments)) {
      handleGlobalAlert("warning", "Forma y cuenta de pago son requeridas, en estado pagado", "basic", dispatch);
      return;
    }

    const totalPayments = calculateTotalModifiedPayments(modifiedPayments).toString();
    const expectedAmount = dataPayments[0]?.oportunity?.amount.toString();
    const totalComissions = calculateTotalComissionModifiedPayments(modifiedPayments).toString();
    const expectedComission = dataPayments[0]?.oportunity?.comission.toString();

    if (totalPayments === expectedAmount && totalComissions === expectedComission) {
      setDialogConfirm(true);
      setOpen(true);
    } else {
      handleGlobalAlert("warning", "El total y el total esperado no son iguales!", "basic", dispatch);
    }
  };

  const formatDate = dateString => {
    var utc = require("dayjs/plugin/utc");
    dayjs.extend(utc);
    const date = dayjs.utc(dateString).format("YYYY-MM-DD");
    return date;
  };

  return (
    <>
      <ContainerStyle>
        {paymentData ? (
          <div>
            <BarButtons addModifiedPayment={addModifiedPayment} openDialogReset={openDialogReset} />
            <Table
              dataPayments={dataPayments}
              modifiedPayments={modifiedPayments}
              setModifiedPayments={setModifiedPayments}
              calculateTotalModifiedPayments={calculateTotalModifiedPayments}
              calculateTotalComissionModifiedPayments={calculateTotalComissionModifiedPayments}
              formatDate={formatDate}
              peso={peso}
            />
            <div className="buttons">
              <button type="button" onClick={() => resetModifiedPayments()}>
                Reiniciar
              </button>
              <button className="save" type="button" onClick={() => savePayments()}>
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <LinearProgress />
        )}
      </ContainerStyle>

      <PaymentDialog
        open={open}
        handleClose={handleClose}
        paymentData={paymentData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        dataPayments={dataPayments}
        setModifiedPayments={setModifiedPayments}
        setPaymentData={setPaymentData}
        setPeriodicityOfPayments={setPeriodicityOfPayments}
        periodicityOfPayments={periodicityOfPayments}
        setCommissionPeriod={setCommissionPeriod}
        commissionPeriod={commissionPeriod}
        paymentPeriods={paymentPeriods}
        dialogConfirm={dialogConfirm}
        setDialogConfirm={setDialogConfirm}
        modifiedPayments={modifiedPayments}
        oportunity={oportunity}
        oportunityId={oportunityId}
        setIsRefetch={setIsRefetch}
        isRefetch={isRefetch}
      />
    </>
  );
}

function Table({
  dataPayments,
  modifiedPayments,
  setModifiedPayments,
  peso,
  calculateTotalModifiedPayments,
  calculateTotalComissionModifiedPayments,
  formatDate,
}) {
  //Updata de modifiedPayments
  const dispatch = useDispatch();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  //Valor de los select
  const { data: paymentways } = useFetchData("paymentways", processResponseArray, { all: true }, normalizeDataSelect);
  const { data: paymentsacounts } = useFetchData(
    "paymentsacounts",
    processResponseArray,
    { all: true },
    normalizeDataSelect
  );

  const handleMouseDown = e => {
    const isInput = e.target.tagName.toLowerCase() === "input";
    if (isInput) return;

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
    const parsedValue = value === "null" ? null : value;

    setModifiedPayments(prevData => {
      const updatedPayments = [...prevData];
      const updatedPayment = { ...updatedPayments[index] };

      if (name === "comission" || name === "payment") {
        updatedPayment[name] = Number(parsedValue); // Convertir a número
      } else {
        updatedPayment[name] = parsedValue;
      }

      if (name === "ispaid" && value == "false") {
        updatedPayment["paymentaccountId"] = null;
        updatedPayment["paymentwayId"] = null;
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
    if (value1.toString() == value2.toString()) {
      return "data green";
    } else {
      return "data red";
    }
  };

  const colorCheckChange = (value1, value2) => {
    return value1?.toString() == value2?.toString() ? "data" : "modified";
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
            <th>Forma de pago</th>
            <th>Cuenta de Pago</th>
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
                      className={colorCheckChange(pay.paymentwayId, dataPayments[i]?.paymentwayId)}
                      name="paymentwayId"
                      value={pay.paymentwayId || ""}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                      disabled={pay.ispaid == "false" || pay.ispaid == false}
                    >
                      <option key={0} value="null">
                        -
                      </option>
                      {paymentways?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className={colorCheckChange(pay.paymentaccountId, dataPayments[i]?.paymentaccountId)}
                      name="paymentaccountId"
                      value={pay.paymentaccountId || ""}
                      onChange={e => handleChangeModifiedPayments(e, i)}
                      disabled={pay.ispaid == "false" || pay.ispaid == false}
                    >
                      <option key={0} value="null">
                        -
                      </option>
                      {paymentsacounts?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
