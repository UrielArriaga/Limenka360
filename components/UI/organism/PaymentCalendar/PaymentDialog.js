import React, { useContext } from "react";
import styled from "styled-components";
import { CircularProgress, Dialog } from "@material-ui/core";
import { formatDateToISO, handleGlobalAlert } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { truncateDecimalsWithTargetSum } from "../../../../utils/utils_payments";
import { api } from "../../../../services/api";
import { userSelector } from "../../../../redux/slices/userSlice";
import { companySelector } from "../../../../redux/slices/companySlice";
import { SocketContext } from "../../../../context/socketContext";

export default function PaymentDialog({
  open,
  handleClose,
  paymentData,
  isLoading,
  setIsLoading,
  dataPayments,
  setModifiedPayments,
  setPaymentData,
  setPeriodicityOfPayments,
  periodicityOfPayments,
  setCommissionPeriod,
  commissionPeriod,
  paymentPeriods,
  dialogConfirm,
  modifiedPayments,
  oportunity,
  oportunityId,
  setIsRefetch,
  isRefetch,
}) {
  const dispatch = useDispatch();
  const ejecutiveId = dataPayments[0].ejecutiveId;
  const oportunityAmount = dataPayments[0].oportunity.amount;
  const oportunityComission = dataPayments[0].oportunity.comission;
  const { id_user, name, groupId } = useSelector(userSelector);
  const { id_company } = useSelector(companySelector);
  const { socket } = useContext(SocketContext);

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

  //Regresa ture si el objeto tiene datos no definidos
  function hasUndefinedValues(objeto) {
    // Obtener las claves del objeto
    var claves = Object.keys(objeto);

    // Iterar sobre las claves y verificar si alguna tiene un valor indefinido
    for (var i = 0; i < claves.length; i++) {
      if (typeof objeto[claves[i]] === "undefined") {
        return true; // Se encontró un valor indefinido
      }
    }

    return false; // No se encontraron valores indefinidos
  }

  //Re inicia los pagos
  const resetPayments = async () => {
    //Si existe un enganche y solo es 1 pago la forma automatica no se crea correctamente
    if (obtainDownPaymentData().downpayment && paymentData.paymentamount == 1) {
      return handleGlobalAlert(
        "warning",
        "El número de pagos no puede ser 1 si existe un enganche.",
        "basic",
        dispatch
      );
    }

    // return console.log("Ok:", hasUndefinedValues(paymentData), "Hola", paymentData);

    //Revisa que todos los contengan datos
    if (hasUndefinedValues(paymentData)) {
      return handleGlobalAlert("warning", "Selecciona todos los campos ", "basic", dispatch);
    }

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
        ? oportunityAmount - obtainDownPaymentData().payment
        : oportunityAmount;
      let divTotalPayment = total / newPayments.paymentamount;
      let divTotalPaymentArray = Array.from({ length: newPayments.paymentamount }, () => divTotalPayment);
      let newDivTotalPaymentArray = truncateDecimalsWithTargetSum(divTotalPaymentArray, total);

      //Arreglo con las comisiones y su monto
      let comissionTotal = obtainDownPaymentData().downpayment
        ? oportunityComission - obtainDownPaymentData().comission
        : oportunityComission;
      let numberOfComission = obtainDownPaymentData().downpayment
        ? paymentData.paymentamount - 1
        : paymentData.paymentamount;
      let arrayComission = createCommissionArray(comissionTotal, paymentData.periodicitycomission, numberOfComission);
      let newArrayComission = truncateDecimalsWithTargetSum(arrayComission, comissionTotal);

      //Guarda los objetos de los pagos
      for (let i = 0; i < newPayments.paymentamount; i++) {
        let obj = {
          payment: newDivTotalPaymentArray[i],
          comission: newArrayComission[i],
          date: arrayDates[i],
          observations: "",
          ispaid: "false",
          oportunityId: dataPayments[0].oportunityId,
          downpayment: "false",
        };
        resultado.push(obj);
      }

      handleClose();
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
      ejecutiveId: ejecutiveId,
      paymentperiodId: getIdFromName(paymentPeriods, periodicityOfPayments),
      paymentaccountId: item.ispaid === false || item.ispaid === "false" ? null : item.paymentaccountId,
      paymentwayId: item.ispaid === false || item.ispaid === "false" ? null : item.paymentwayId,
    }));
    //Cuando todos tengan id enviar los datos a allpayments para que se actualicen
    if (checkIdExists(objPayments) && paymentData.paymentamount == objPayments.length) {
      //Manual way
      try {
        await api.put(`/salespayments/allpayments`, { payments: objPayments });

        socket?.emit("send_notify_activity", {
          activity: {
            type: "update",
            from: "payments",
            message: `${name} modifico los pagos`,
            data: { oportunityId: oportunityId, comission: oportunityComission, amount: oportunityAmount },
            ejecutiveId: id_user,
            groupId: groupId,
            companyId: id_company,
          },
        });

        handleGlobalAlert("success", "Los pagos se actualizaron correctamente!", "basic", dispatch);
      } catch (error) {
        handleGlobalAlert("error", "Error al actualizar!", "basic", dispatch);
        console.log("error:", error);
      }
    } else {
      //Automatic way
      let newObjPayments = objPayments.map(({ id, ...resto }) => resto);
      let objPaymentsNoID = {
        allpayments: true,
        oportunity: {
          id: oportunityId,
          comissiontype: commissionPeriod,
          payments: objPayments.length,
          paymentperiodicity: periodicityOfPayments,
        },
        payments: newObjPayments,
      };
      console.log("UN CAMPO NO TIENE ID !!!", objPaymentsNoID);
      try {
        await api.put(`/salespayments`, objPaymentsNoID);

        socket?.emit("send_notify_activity", {
          activity: {
            type: "update",
            from: "payments",
            message: `${name} modifico los pagos`,
            data: { oportunityId: oportunityId, comission: oportunityComission, amount: oportunityAmount },
            ejecutiveId: id_user,
            groupId: groupId,
            companyId: id_company,
          },
        });

        handleGlobalAlert("success", "Los pagos se actualizaron correctamente!", "basic", dispatch);
      } catch (error) {
        handleGlobalAlert("error", "Error al actualizar!", "basic", dispatch);
      }
    }
    handleClose();
    setIsLoading(false);
    setIsRefetch(!isRefetch);
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

  const selectPeriodicityComission = select => {
    if (paymentData?.periodicity === "pago único") {
      return "Primer Pago";
    }
    if (paymentData?.periodicitycomission) {
      return paymentData?.periodicitycomission;
    }
    if (commissionPeriod) {
      console.log(commissionPeriod);
      return commissionPeriod;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {dialogConfirm ? (
        <PaymentDialogStyleContainer>
          <div className="header" onClick={() => console.log(paymentData)}>
            <p>Guardar cambios</p>
          </div>
          <div className="body_paymetdialog">
            <p>¿Está seguro de realizar los cambios? Los pagos serán actualizados.</p>
            <div className="buttons_paymentdialog">
              <button className="cancel" onClick={() => handleClose()}>
                Cancelar
              </button>

              {isLoading ? (
                <button className="save">
                  <CircularProgress size={24} color="inherit" />
                </button>
              ) : (
                <button className="confirm" onClick={() => updatePayment()}>
                  Confirmar
                </button>
              )}
            </div>
          </div>
        </PaymentDialogStyleContainer>
      ) : (
        <PaymentDialogStyleContainer>
          <div className="header" onClick={() => console.log(paymentData)}>
            <p>Editar Pagos</p>
          </div>
          <div className="body_paymetdialog">
            <div className="edit_paymetdialog">
              <p>Fecha de inicio:</p>
              <input value={paymentData?.date} name="date" onChange={handleChange} type="date" />

              <p>Periocidad De Pago:</p>
              <select name="periodicity" onChange={handleChange} value={paymentData?.periodicity}>
                <option value="" disabled selected hidden>
                  Selecciona un periodo
                </option>
                <option key={""} value={""} disabled>
                  ...
                </option>
                <option key={"Otro"} value={"Otro"} disabled>
                  otro
                </option>
                {paymentPeriods.map(item => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <p>Número De Pagos:</p>
              <input
                value={paymentData?.periodicity == "pago único" ? 1 : paymentData?.paymentamount}
                name="paymentamount"
                onChange={e => {
                  if (paymentData?.periodicity !== "pago único") {
                    handleChange(e);
                  }
                }}
                type="number"
                min="1"
                onWheel={e => e.stopPropagation()}
              />

              <p onClick={() => console.log(paymentData?.periodicitycomission)}>Periocidad De Comisión:</p>
              <select
                name="periodicitycomission"
                onChange={e => {
                  if (paymentData?.periodicity !== "pago único") {
                    handleChange(e);
                  }
                }}
                value={selectPeriodicityComission()}
              >
                <option value="" disabled selected hidden>
                  Selecciona un periodo
                </option>
                <option value="Primer Pago">Primer Pago</option>
                {paymentData?.periodicity != "pago único" && <option value="Segundo Pago">Segundo Pago</option>}
                {paymentData?.periodicity != "pago único" && <option value="Prorrateadas">Prorrateadas</option>}
              </select>
            </div>

            <div className="buttons_paymentdialog">
              <button className="cancel" onClick={() => handleClose()}>
                Cancelar
              </button>

              {isLoading ? (
                <button className="save">
                  <CircularProgress size={24} color="inherit" />
                </button>
              ) : (
                <button className="confirm" onClick={() => resetPayments()}>
                  Confirmar
                </button>
              )}
            </div>
          </div>
        </PaymentDialogStyleContainer>
      )}
    </Dialog>
  );
}

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

  .header {
    padding: 10px;
    background-color: #405189;
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

      .confirm {
        text-transform: capitalize;
        color: #fff;
        background-color: #103c82;
        margin-left: 5px;
        border-radius: 8px;
      }
    }
  }
`;
