import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Checkbox, Grid } from "@material-ui/core";
import NumberFormat from "react-number-format";
import Select from "react-select";
import { CheckCircle, CheckCircleOutline, Visibility } from "@material-ui/icons";
import { PreviewTabulator, Quote, TabulatorStyle } from "./style";
import MainLayout from "../../../MainLayout";
import dayjs from "dayjs";
import TabulatorPreview from "../../../Templates/Tabulator";
export default function QuotesTabulator() {
  const [cotization, setCotization] = useState({
    amount: 6101519.96,
    // amount: 20,
    initialpayment: 0,
    commission: 0,
    downpayment: 0,
    credit: 0,
  });
  const [quotes, setQuotes] = useState(quotesData);
  const [planQuotes, setPlanQuotes] = useState({});
  const [typeCommission, setTypeCommission] = useState({});
  const [startDate, setStartDate] = useState("");
  const [payments, setPayments] = useState([]);
  const [openVisualize, setOpenVisualize] = useState(false);
  useEffect(() => {
    calculateTotals(0);
    renderDateToday();
  }, []);
  useEffect(() => {
    calculatePayments();
  }, [planQuotes, startDate, typeCommission, cotization, quotes]);

  const calculateTotals = value => {
    let initialPayment = Number(value);
    let commissionRate = 0.02;
    let percentageValidate = 0.1;
    if (initialPayment >= cotization.amount * percentageValidate || initialPayment === 0) {
      //pasos
      let firstValue = Math.round(cotization.amount - initialPayment);
      let secondValue = Math.round(firstValue * 0.02);
      let secondValue2 = Math.round(initialPayment - secondValue);
      let thirdValue = Math.round(cotization.amount - secondValue2);
      let comissionInitialPayment = Math.round(thirdValue * commissionRate * 1.16);
      let downPaymentInitialPayment = Math.round(initialPayment - comissionInitialPayment);
      //

      let commissionCalculate = cotization.amount * commissionRate * 1.16;
      let downPayment = initialPayment > 0 ? initialPayment - commissionCalculate : 0;
      let creditC = initialPayment > 0 ? Math.round(cotization.amount - downPaymentInitialPayment) : cotization.amount;
      let updatedCotization = {
        ...cotization,
        initialpayment: Math.round(initialPayment),
        commission: Math.round(commissionCalculate),
        downpayment: initialPayment > 0 ? downPaymentInitialPayment : downPayment,
        credit: creditC,
      };
      let updatedQuotes = quotes.map(quote => {
        let quoteInitialPayment =
          initialPayment > 0
            ? initialPayment
            : searchPercentageQuote(quote.lapse, cotization.amount, initialPayment) + commissionCalculate;
        //pasos
        let fourthyValue = searchPercentageQuote(quote.lapse, thirdValue, initialPayment);
        //
        let quoteFirstMonth =
          initialPayment > 0 ? 0 : searchPercentageQuote(quote.lapse, cotization.amount, initialPayment);
        let quoteAmount =
          initialPayment > 0 ? fourthyValue : searchPercentageQuote(quote.lapse, cotization.amount, initialPayment);
        let quotePendingPayments = initialPayment > 0 ? quote.lapse : quote.lapsependingpayments;
        return {
          ...quote,
          initialpayment: Math.round(quoteInitialPayment),
          commision: initialPayment > 0 ? Math.round(comissionInitialPayment) : Math.round(commissionCalculate),
          downpayment: initialPayment > 0 ? downPaymentInitialPayment : downPayment,
          firstmonth: Math.round(quoteFirstMonth),
          amount: Math.round(quoteAmount),
          pendingpayments: quotePendingPayments,
        };
      });
      setCotization(updatedCotization);
      setQuotes(updatedQuotes);
      validatePlanQuote(updatedQuotes);
    }
  };
  const handleSelectQuotes = index => {
    let quot = [...quotes];
    for (let i = 0; i < quot.length; i++) quot[i].selected = index === i ? true : false;
    setPlanQuotes(quot[index]);
    setQuotes(quot);
  };
  const searchPercentageQuote = (lapse, totalAmount, initialPayment) => {
    let search = quotesPercentage.find(item => item.lapse === lapse);
    let percentage = initialPayment > 0 ? search.percent : search.zeroPercent;
    let calculatePercentage = Math.round(totalAmount * (percentage / 100));
    return calculatePercentage;
  };
  const calculatePayments = () => {
    let amountPayment = planQuotes.firstmonth > 0 ? planQuotes.initialpayment : planQuotes.amount;
    let downPayment = planQuotes.downpayment > 0 ? true : false;
    let payments = [
      {
        date: dayjs(startDate).startOf("day").format(),
        payment: amountPayment,
        comission: 0,
        observations: "",
        ispaid: false,
        oportunityId: "eAy1i2oiINaYvN5pHrngzAzd",
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
        downpayment: downPayment,
        period: "62dAupLsSFICWWTU3F1y64Mj",
        paymentperiodId: "62dAupLsSFICWWTU3F1y64Mj",
      },
    ];
    for (let i = 0; i < planQuotes.pendingpayments; i++) {
      payments.push({
        date: dayjs(startDate)
          .add(i + 1, "month")
          .format(),
        payment: planQuotes.amount,
        comission: 0,
        observations: "",
        ispaid: false,
        oportunityId: "eAy1i2oiINaYvN5pHrngzAzd",
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
        downpayment: false,
        period: "62dAupLsSFICWWTU3F1y64Mj",
        paymentperiodId: "62dAupLsSFICWWTU3F1y64Mj",
      });
    }
    calculateCommissionPayments(payments);
  };
  const calculateCommissionPayments = allpayments => {
    let payments = [...allpayments];
    let comissionSingle = cotization.credit * 0.03;
    let comissionProrr = comissionSingle / allpayments.length;
    if (typeCommission.identifier !== null) {
      for (let i = 0; i < payments.length; i++) {
        payments[i].comission = i === typeCommission.identifier ? comissionSingle : 0;
      }
    } else {
      for (let i = 0; i < payments.length; i++) {
        payments[i].comission = comissionProrr;
      }
    }
    setPayments(payments);
  };
  const validatePlanQuote = allquotes => {
    let optionSelected = allquotes.find(item => item.selected === true);
    if (optionSelected) setPlanQuotes(optionSelected);
  };
  const showTotals = allpayments => {
    let total = 0;
    let comission = 0;
    for (let i = 0; i < allpayments.length; i++) {
      total = allpayments[i].payment + total;
      comission = allpayments[i].comission + comission;
    }
    return (
      <div className="totals">
        <p className="total_value">
          Total
          <NumberFormat
            className="value"
            value={total}
            displayType="text"
            prefix="$"
            thousandSeparator=","
            decimalScale={0}
          />
        </p>
        <p className="total_value">
          Comisión
          <NumberFormat
            className="value"
            value={comission}
            displayType="text"
            prefix="$"
            thousandSeparator=","
            decimalScale={0}
          />
        </p>
      </div>
    );
  };
  const handleCloseVisualize = () => setOpenVisualize(false);

  const renderDateToday = () => {
    let day = dayjs().format("DD");
    let month = dayjs().format("MMMM");
    let year = dayjs().format("YYYY");
    let fullDate = day + " de " + month + " de " + year;
    setCotization({ ...cotization, date: fullDate });
  };
  return (
    <MainLayout>
      <TabulatorStyle>
        <Head>
          <title>CRM JOBS - Tabulador</title>
        </Head>
        <div className="main">
          <div className="quotes_content">
            <div className="quotes_content__header">
              <p className="title">Tabulador Financial</p>
            </div>
            <div className="quotes_content__body">
              <Grid className="info_tabulator" container={true} spacing={2}>
                <Grid className="item" item={true} md={3}>
                  <p className="title">Monto Cotizado</p>
                  <NumberFormat
                    className="data"
                    prefix="$"
                    thousandSeparator=","
                    decimalScale={2}
                    displayType="input"
                    value={cotization.amount}
                    defaultValue={0}
                    disabled
                  />
                </Grid>
                <Grid className="item" item={true} md={3}>
                  <p className="title">Pago Inicial</p>
                  <NumberFormat
                    className="data"
                    prefix="$"
                    thousandSeparator=","
                    decimalScale={2}
                    displayType="input"
                    value={cotization.initialpayment}
                    defaultValue={0}
                    onValueChange={e => calculateTotals(e.floatValue)}
                  />
                </Grid>

                <Grid className="item" item={true} md={3}>
                  <p className="title">Monto A Financiar</p>
                  <NumberFormat
                    className="data"
                    prefix="$"
                    thousandSeparator=","
                    decimalScale={2}
                    displayType="input"
                    value={cotization.credit}
                    defaultValue={0}
                    disabled
                  />
                </Grid>
              </Grid>
              <div className="quotes_info">
                <div className="quotes_container">
                  {quotes.map((item, index) => (
                    <Quote key={index} elevation={2} onClick={() => handleSelectQuotes(index)}>
                      <div className={`content_quote ${item.selected && "selected"}`}>
                        <div className="content_quote__head">
                          <Checkbox
                            className="check"
                            color="primary"
                            checked={item.selected}
                            icon={<CheckCircleOutline />}
                            checkedIcon={<CheckCircle />}
                            name="checkedH"
                            size="small"
                          />
                        </div>
                        <div className="content_quote__body">
                          <p className="title">
                            Plazo <span className="data">{item.lapse} meses</span>
                          </p>
                          <p className="title">
                            Pago Inicial
                            <NumberFormat
                              className="data"
                              value={item.initialpayment}
                              prefix="$"
                              displayType="text"
                              thousandSeparator=","
                            />
                          </p>
                          <p className="title">
                            Comisión por Apertura
                            <NumberFormat
                              className="data"
                              value={item.commision}
                              prefix="$"
                              displayType="text"
                              thousandSeparator=","
                            />
                          </p>
                          <p className="title">
                            Enganche
                            <NumberFormat
                              className="data"
                              value={item.downpayment}
                              prefix="$"
                              displayType="text"
                              thousandSeparator=","
                            />
                          </p>
                          <p className="title">
                            1ra Mensualidad
                            <NumberFormat
                              className="data"
                              value={item.firstmonth}
                              prefix="$"
                              displayType="text"
                              thousandSeparator=","
                            />
                          </p>
                          <p className="title">
                            Mensualidades Restantes
                            <span className="data">{item.pendingpayments}</span>
                          </p>
                          <p className="title">
                            Mensualidad
                            <NumberFormat
                              className="data"
                              value={item.amount}
                              prefix="$"
                              displayType="text"
                              thousandSeparator=","
                            />
                          </p>
                        </div>
                      </div>
                    </Quote>
                  ))}
                </div>
              </div>
              <Grid className="plan_quotes" container={true} spacing={2}>
                <Grid item={true} md={3}>
                  <p className="title">No. de Pagos</p>
                  <p className="data">{planQuotes?.lapse}</p>
                </Grid>
                <Grid item={true} md={3}>
                  <p className="title">Periodicidad</p>
                  <p className="data">Mensual</p>
                </Grid>
                <Grid item={true} md={3}>
                  <p className="title">Fecha de Inicio</p>
                  <input type="date" className="data calendar" onChange={e => setStartDate(e.target.value)} />
                </Grid>
                <Grid item={true} md={3}>
                  <p className="title">Comisión</p>
                  <Select
                    className="data"
                    options={typeCommissions}
                    placeholder="Selecciona una Opción"
                    onChange={e => setTypeCommission(e)}
                  />
                </Grid>
              </Grid>
              <div className="calendar_payments">
                <p className="calendar_title" onClick={() => console.log("cuota", payments)}>
                  Calendario de Pagos
                </p>
                <table className="calendar_table">
                  <thead className="calendar_table__head">
                    <tr className="tr_head">
                      <th className="th_head">No. de Pago</th>
                      <th className="th_head">Monto</th>
                      <th className="th_head">Comisión</th>
                      <th className="th_head">Fecha de Pago</th>
                    </tr>
                  </thead>
                  <tbody className="calendar_table__body">
                    {payments.slice(0, 5).map((item, index) => (
                      <tr className="tr_body" key={index}>
                        <td className="td_body">{index + 1}</td>
                        <td className="td_body">
                          <NumberFormat
                            displayType="text"
                            value={item.payment}
                            thousandSeparator=","
                            prefix="$"
                            decimalScale={0}
                          />
                        </td>
                        <td className="td_body">
                          <NumberFormat
                            displayType="text"
                            value={item.comission}
                            thousandSeparator=","
                            prefix="$"
                            decimalScale={0}
                          />
                        </td>
                        <td className="td_body">{dayjs(item.date).format("DD/MM/YYYY")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showTotals(payments)}
              </div>
              <div className="buttons">
                <Button className="bt_visualize" startIcon={<Visibility />} onClick={() => setOpenVisualize(true)}>
                  Visualizar Cotización
                </Button>
              </div>
            </div>
            <div className="quotes_content__footer"></div>
          </div>
        </div>
      </TabulatorStyle>
      <PreviewTabulator open={openVisualize} onClose={handleCloseVisualize} anchor="right">
        <div className="container_preview">
          <TabulatorPreview
            quotes={quotes}
            planQuotes={planQuotes}
            cotization={cotization}
            close={handleCloseVisualize}
          />
        </div>
      </PreviewTabulator>
    </MainLayout>
  );
}

const quotesData = [
  {
    lapse: 12,
    initialpayment: 0,
    downpayment: 0,
    commision: 0,
    firstmonth: 0,
    pendingpayments: 0,
    lapsependingpayments: 11,
    amount: 0,
    selected: false,
  },
  {
    lapse: 18,
    initialpayment: 0,
    downpayment: 0,
    commision: 0,
    firstmonth: 0,
    pendingpayments: 0,
    lapsependingpayments: 17,
    amount: 0,
    selected: false,
  },
  {
    lapse: 24,
    initialpayment: 0,
    downpayment: 0,
    commision: 0,
    firstmonth: 0,
    pendingpayments: 0,
    lapsependingpayments: 23,
    amount: 0,
    selected: false,
  },
  {
    lapse: 36,
    initialpayment: 0,
    downpayment: 0,
    commision: 0,
    firstmonth: 0,
    pendingpayments: 0,
    lapsependingpayments: 35,
    amount: 0,
    selected: false,
  },
  {
    lapse: 48,
    initialpayment: 0,
    downpayment: 0,
    commision: 0,
    firstmonth: 0,
    pendingpayments: 0,
    lapsependingpayments: 47,
    amount: 0,
    selected: false,
  },
];
const quotesPercentage = [
  {
    lapse: 12,
    zeroPercent: 10.02,
    percent: 10.2433,
  },
  {
    lapse: 18,
    zeroPercent: 7.26,
    percent: 7.43,
  },
  {
    lapse: 24,
    zeroPercent: 5.9,
    percent: 6.011,
  },
  {
    lapse: 36,
    zeroPercent: 4.59,
    percent: 4.57,
  },
  {
    lapse: 48,
    zeroPercent: 3.7912,
    percent: 3.9,
  },
];
const typeCommissions = [
  {
    identifier: 0,
    value: "firstmonth",
    label: "Primer Mes",
  },
  {
    identifier: 1,
    value: "secondmonth",
    label: "Segundo Mes",
  },
  {
    identifier: null,
    value: "all",
    label: "Prorrateadas",
  },
];
