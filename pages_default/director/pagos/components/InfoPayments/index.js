import { Collapse } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../../../../../services/api";
import InfoPay  from "../InfoPay";

export default function InfoPayments({ info, setDataOportunity, toggleModal, setOptionSelected, setDrawerHead }) {
  const opo = info?.[0]?.itemBD?.oportunity;
  const [allPayments, setAllPayments] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [paymentsCount, setPaymentsCount] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
  });

  useEffect(() => {
    if (info?.length > 0) {
      getPaymentsCount();
    }
  }, [info]);

  const getPaymentsCount = async () => {
    let params = {
      where: { oportunityId: opo?.id },
      count: "1",
      keys: "oportunityId,payment,ispaid",
    };

    const [paymentsTotal, paymentsPaid] = await Promise.all([
      api.get("/salespayments", { params }),
      api.get("/salespayments", { params: { ...params, where: { ...params.where, ispaid: true } } }),
    ]);

    let paymentsCount = {
      total: paymentsTotal.data.count,
      paid: paymentsPaid.data.count,
      unpaid: paymentsTotal.data.count - paymentsPaid.data.count,
    };

    console.log("All pay:", paymentsTotal.data.results);
    setAllPayments(paymentsTotal.data.results);
    setPaymentsCount(paymentsCount);
    setShowInfo(true);
  };

  const getPaymentTotals = payments => {
    let total = 0;
    let paidTotal = 0;
    let unpaidTotal = 0;

    for (let payment of payments) {
      total += payment.payment;

      if (payment.ispaid) {
        paidTotal += payment.payment;
      } else {
        unpaidTotal += payment.payment;
      }
    }

    return {
      total: pesoMXN(total),
      paidTotal: pesoMXN(paidTotal),
      unpaidTotal: pesoMXN(unpaidTotal),
    };
  };

  const pesoMXN = amount => {
    return amount?.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
  };

  const viewProducts = async itemData => {
    setDataOportunity(() => ({
      itemBD: {
        ...itemData.itemBD.oportunity.prospect,
        entity: itemData.drawer.entity,
        ejecutive: itemData.drawer.ejecutive,
      },
      id: itemData.itemBD.oportunityId,
    }));
    setDrawerHead("Prospecto");
    setOptionSelected("products");
    toggleModal();
  };

  const infoPayProps = [
    { label: "Folio", value: opo?.concept },
    { label: "No. de Pagos Totales", value: paymentsCount.total },
    { label: "No. de Pagos Realizados", value: paymentsCount.paid },
    { label: "No. de Pagos Pendientes", value: paymentsCount.unpaid },
    { label: "Monto Oportunidad", value: pesoMXN(opo?.amount) },
    { label: "Monto Total De Los Pagos", value: allPayments ? getPaymentTotals(allPayments).total : "-" },
    { label: "Monto Total Pagado", value: allPayments ? getPaymentTotals(allPayments).paidTotal : "-" },
    {
      label: "Monto Total Pendiente",
      value: allPayments ? getPaymentTotals(allPayments).unpaidTotal : "-",
    },
    { label: "Nombre del Cliente", value: opo?.prospect?.fullname },
    { label: "Periocidad", value: opo?.paymentperiodicity },
    { label: "Comisión", value: opo?.comissiontype },
    { label: "Observaciones de la Venta", value: opo?.generalobservations ? opo?.generalobservations : "-" },
    { label: "Productos", value: <button onClick={() => viewProducts(info?.[0])}>Ver Productos</button> },
  ];

  return (
    <div className="payment_information_container">
      <div className="payment_information_header" onClick={() => setShowInfo(!showInfo)}>
        <p>Información De Los Pagos</p>
        {showInfo ? <ArrowDropUp /> : <ArrowDropDown />}
      </div>
      <Collapse in={showInfo}>
        <div className="payment_information">
          {infoPayProps.map((prop, index) => (
            <InfoPay key={index} label={prop.label} value={prop.value} />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
