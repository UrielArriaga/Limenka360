import React from "react";
import { CalendarPaymentsStyles } from "./styles";
import { Button } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { motion } from "framer-motion";

function CalendarPayments({
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
}) {
  const numberWithCommas = x => {
    if (!x) return "";
    if (typeof x === "number") return `${x}`;
    return x.replace(/\d(?=(\d{3})+\.)/g, "$&,");
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
            <input type="number" value={payments?.length} onChange={e => handleChangeQuantity(e.target.value)} />{" "}
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
          {payments?.map((item, index) => {
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
                    placeholder="Ingrese una cantidad"
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
        </div>
      )}
    </CalendarPaymentsStyles>
  );
}

export default CalendarPayments;
