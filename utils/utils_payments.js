import dayjs from "dayjs";
import { formatNumber } from ".";

export const normalizePayments = (values, entities, ejecutives) => {
  return values.map(pay => {
    let opo = pay.oportunity;

    let objEntities = entities.find(elemento => elemento.id === opo.prospect.entityId);
    let objEjecutives = ejecutives.find(elemento => elemento.id === opo.prospect.ejecutiveId);

    return {
      id: pay.id,
      nombre: opo?.prospect.name,
      comisión: formatNumber(pay.comission),
      monto: formatNumber(pay.payment),
      pagado: pay.ispaid ? "Pagado" : "Pendiente",
      createdAt: pay.createdAt,
      lastTrackingDate: opo?.lastTrackingcreatedAt,
      expirado: checkIfItExpired(pay.date),
      "fecha limite": formatDateNew(pay.date),
      "se vendió en": formatDateNew(opo?.soldat),
      itemBD: pay,
      drawer: { entity: objEntities, ejecutive: objEjecutives },
    };
  });
};

const checkIfItExpired = dateString => {
  const paymentDate = new Date(dateString);
  const today = new Date();

  if (paymentDate < today) {
    return "Expirado";
  } else {
    return "-";
  }
};

const formatDateNew = fecha => {
  const fechaObjeto = dayjs(fecha);
  const fechaFormateada = fechaObjeto.format("MMMM D, YYYY");
  return fechaFormateada;
};

export const truncateDecimalsWithTargetSum = (arr, targetSum) => {
  const truncatedArr = arr.map((num, index) => {
    if (typeof num === "number") {
      return Number(num.toFixed(2));
    }
    return num;
  });

  const sum = truncatedArr.reduce((acc, num) => {
    if (typeof num === "number") {
      return acc + num;
    }
    return acc;
  }, 0);

  if (sum !== targetSum) {
    const lastIndex = truncatedArr.length - 1;
    const diff = targetSum - sum;
    truncatedArr[lastIndex] = Number((truncatedArr[lastIndex] + diff).toFixed(2));
  }

  return truncatedArr;
};
