import dayjs from "dayjs";

export const validateOrderData = (orderData, showAlertError) => {
  let errors = [];

  if (!orderData.provideraddressId) {
    errors.push("Debe seleccionar una dirección de proveedor");
  }
  if (!orderData.paymentcondition) {
    errors.push("Debe seleccionar una condición de pago");
  }
  if (!orderData.phone) {
    errors.push("Debe ingresar un número de teléfono");
  }
  if (!orderData.methoddelivery) {
    errors.push("Debe seleccionar un método de entrega");
  }
  if (!orderData.providerId) {
    errors.push("Debe seleccionar un proveedor");
  }
  if (!orderData.taxinformationId) {
    errors.push("Debe seleccionar una información fiscal");
  }
  if (!orderData.companyId) {
    errors.push("Debe seleccionar una compañía");
  }
  if (orderData.national === undefined) {
    errors.push("Debe especificar si es nacional o no");
  }
  if (!orderData.createdbyId) {
    errors.push("Debe especificar el creador de la orden");
  }
  if (!orderData.estimateddeliverydate || !dayjs(orderData.estimateddeliverydate).isValid()) {
    errors.push("Debe ingresar una fecha de entrega estimada válida");
  }

  orderData.supplies.forEach((supply, index) => {
    if (!supply.quantity) {
      errors.push(`Debe ingresar la cantidad para el Producto ${index + 1}`);
    }
    if (!supply.unitprice) {
      errors.push(`Debe ingresar el precio unitario para el Producto ${index + 1}`);
    }
    if (!supply.productId) {
      errors.push(`Debe seleccionar un producto para el Producto ${index + 1}`);
    }
  });

  orderData.payments.forEach((payment, index) => {
    if (!payment.date || !dayjs(payment.date).isValid()) {
      errors.push(`Debe ingresar una fecha válida para el pago ${index + 1}`);
    }
    if (!payment.conceptimportId) {
      errors.push(`Debe seleccionar un Destino para el pago ${index + 1}`);
    }
  });

  // if (!orderDataPut.order.paymentaccountId) {
  //   errors.push(orderNames.paymentaccount.messageError);
  // }

  if (errors.length > 0) {
    errors.forEach(error => showAlertError(`${error}`));
  } else {
  }

  return errors.length === 0;
};
