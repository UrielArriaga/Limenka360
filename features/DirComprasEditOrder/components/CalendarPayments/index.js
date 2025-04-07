import React from "react";
import { CalendarPaymentsStyles } from "./styles";
import { CalendarToday, Check, Close, Edit } from "@material-ui/icons";
import { Button, Divider } from "@material-ui/core";
import useCalendaryPayments from "../../hooks/useCalendaryPayments";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

function CalendarPayments({ setDataPaymentsPurchase, products }) {
  const router = useRouter();

  const {
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
  } = useCalendaryPayments(router?.query?.o, setDataPaymentsPurchase, products);

  const numberWithCommas = x => {
    if (!x) return "";
    if (typeof x === "number") return `${x}`;
    return x.replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const isValid = () => {
    let dataIsPaid = [...payments?.data];
    let flag = false;
    dataIsPaid?.map(item => {
      if (item.ispaid == true) flag = true;
    });
    return flag;
  };

  return (
    <CalendarPaymentsStyles>
      <div className="sectionBtnShow">
        <Button
          onClick={() => setShowCalendary(!showCalendary)}
          startIcon={<CalendarToday />}
          variant="contained"
          className="sectionBtnShow__btnshow"
        >
          {showCalendary ? "Ocultar Calendario de Pagos" : "Ver Calendario de Pagos"}
        </Button>
      </div>

      {showCalendary && (
        <div className="sectionOptionsPayments">
          <div className="item">
            <div className="label-box row">
              <label className="item">#Pagos *</label>
            </div>
            <input
              disabled={isValid()}
              type="number"
              value={payments?.total}
              onChange={e => handleChangeQuantity(e.target.value)}
            />{" "}
          </div>
          <div className="item">
            <div className="label-box row">
              <label className="item">Periodicidad *</label>
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

              {paymentsPeriods.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name[0].toUpperCase() + item.name.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {showCalendary && (
        <div className="sectionPayments">
          {payments?.data?.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="itemsPayments"
              >
                <div className="item">
                  <div className="label-box row">
                    <label className={`item`}>Pago #{index + 1} *</label>
                  </div>
                  <input
                    disabled={edit ? false : true}
                    className={`input ${item.payment < 0 ? "error" : ""}`}
                    value={numberWithCommas(item.payment)}
                    onChange={e => handleOnChangeAmount(e.target.value, index)}
                  />
                </div>

                <div className="item">
                  <div className="label-box row">
                    <label className={`item downpayment`}>Fecha *</label>
                  </div>
                  <input
                    disabled={edit ? false : true}
                    className="input"
                    type="date"
                    value={item.date}
                    onChange={e => handleOnChangeDate(e.target.value, index)}
                  />
                </div>

                <div className="item">
                  <div className="label-box row">
                    <label className={`item downpayment`}>Estatus *</label>
                  </div>
                  <select
                    disabled={edit ? false : true}
                    name="isPaid"
                    type="texto"
                    value={item.ispaid.toString()}
                    className={`inputPaid ${item.ispaid === true ? "ispaid" : "notpaid"}`} // Aplica la clase condicional directamente
                    onChange={e => handleOnChangeStatusPaymet(index, "ispaid", e.target.value)}
                  >
                    <option value={"false"}>Pendiente</option>
                    <option value={"true"}>Completado</option>
                  </select>
                </div>
              </motion.div>
            );
          })}

          {payments?.data?.length > 0 && (
            <div className={`error ${messageError == "Datos Incorrectos" ? "errorActive" : "notError"}`}>
              {messageError == "Datos Incorrectos" ? <Close className="iconError" /> : <Check className="iconOk" />}
              <h3 className="smsError"> {messageError}</h3>
              <Button className="btnEdit" startIcon={<Edit />} onClick={() => editData()}>
                {edit ? "Listo" : "Editar"}
              </Button>
            </div>
          )}
        </div>
      )}
    </CalendarPaymentsStyles>
  );
}

export default CalendarPayments;
