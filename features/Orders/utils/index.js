export const selectPeriodicityComission = (periodicity, periodicityComission, commissionPeriod) => {
  if (periodicity === "pago único") return "Primer Pago";
  return periodicityComission || commissionPeriod || undefined;
};

export const colorCheckChange = (value1, value2) => {
  return value1?.toString() == value2?.toString() ? "data" : "modified";
};

export const colorCheck = (value1, value2) => {
  if (value1.toString() == value2.toString()) {
    return "data green";
  } else {
    return "data red";
  }
};

export const peso = amount => {
  if (!amount) {
    amount = 0;
  }
  return amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
};

//Regresa ture si el objeto tiene datos no definidos
export const hasUndefinedValues = objeto => objeto == null || Object.values(objeto).some(value => value === undefined);

export const checkIdExists = arr => {
  let check = true;
  arr.forEach(item => {
    if (!item.id) {
      check = false;
    }
  });
  return check;
};

export const getIdFromName = (data, name) => {
  const obj = data.find(item => item.name === name);
  return obj ? obj.id : null;
};