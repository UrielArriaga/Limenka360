import { namesForm } from "../../ExecutiveEditOrder/data";

const { orderNames, addressShipping, billing } = namesForm;

const rfcPatterns = {
  moral: /^[A-ZÑ&]{3}(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))[A-Z\d]{3}$/,
  fisica: /^[A-Z]{4}(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))[A-Z\d]{3}$/,
};

function validateRFC(rfc) {
  console.log(rfc);
  if (rfcPatterns.moral.test(rfc)) {
    return { valid: true, type: "Moral" };
  }
  if (rfcPatterns.fisica.test(rfc)) {
    return { valid: true, type: "Física" };
  }
  return { valid: false, type: null };
}

export const validateOrderData = (orderDataPut, requireBilling, showAlertError) => {
  let errors = [];

  // Validar Order
  if (!orderDataPut.order.paymentaccountId) {
    errors.push(orderNames.paymentaccount.messageError);
  }
  if (!orderDataPut.order.receive) {
    errors.push(addressShipping.receive.messageError);
    // errors.push("Order: 'receive' es requerido.");
  }
  if (!orderDataPut.order.workstation) {
    errors.push("Campo faltante en seccion Direccion de envio: Puesto de trabajo");
  }

  // Validar Opportunity
  if (!orderDataPut.oportunity.typesalesId) {
    errors.push("Campo faltante en seccion Datos de pedido: Tipo de venta");
  }

  // Validar Address
  // if (!orderDataPut.address.id) {

  // }
  if (!orderDataPut.address.entityId) {
    errors.push(addressShipping.entity.messageError);
  }
  if (!orderDataPut.address.cityId) {
    errors.push(addressShipping.city.messageError);
  }
  if (!orderDataPut.address.postalId) {
    errors.push(addressShipping.postal.messageError);
  }
  if (!orderDataPut.address.settlement) {
    errors.push(addressShipping.settlement.messageError);
  }
  if (!orderDataPut.address.street) {
    errors.push(addressShipping.street.messageError);
  }
  if (!orderDataPut.address.ext_number) {
    errors.push(addressShipping.number_ext.messageError);
  }

  // Validar Bill (si hasBill es true)
  if (requireBilling) {
    if (!orderDataPut.bill.paymentmethodId) {
      errors.push(billing.paymentMethod.messageError);
    }
    if (!orderDataPut.bill.paymentwayId) {
      errors.push(billing.waytoPay.messageError);
    }
    if (!orderDataPut.bill.taxregimeId) {
      errors.push(billing.taxregime.messageError);
    }
    if (!orderDataPut.bill.cfdiId) {
      errors.push(billing.cfdi.messageError);
    }

    // const rfcPattern =
    // /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

    // if (!rfcPattern.test(orderDataPut.bill.rfc)) {
    //   errors.push(billing.rfc.messageError);
    // }

    const validationResult = validateRFC(orderDataPut.bill.rfc);

    if (!validationResult.valid) {
      errors.push(billing.rfc.messageError);
    }

    // Validar Dirección dentro de Bill
    const billAddress = orderDataPut.bill.address;
    if (!billAddress.id) {
    }
    if (!billAddress.entityId) {
      errors.push(billing.entity.messageError);
    }
    if (!billAddress.cityId) {
      errors.push(billing.city.messageError);
    }
    if (!billAddress.postalId) {
      errors.push(billing.postal.messageError);
    }
    if (!billAddress.settlement) {
      errors.push(billing.settlement.messageError);
    }
    if (!billAddress.street) {
      errors.push(billing.street.messageError);
    }
    if (!billAddress.ext_number) {
      errors.push(billing.number_ext.messageError);
    }
    if (!billAddress.int_number) {
      errors.push(billing.number_int.messageError);
    }
  }
  if (errors.length > 0) {
    errors.forEach(error => showAlertError(`${error}`));
  } else {
  }

  return errors.length === 0;
};

export const validateFiles = (files = [], showAlertError) => {
  let isValid = true;
  files.forEach((file, index) => {
    if (!file.name) {
      showAlertError(`El archivo numero  ${index + 1} no tiene un archivo definido.`);
      isValid = false;
    }
    if (!file.filestypeId) {
      showAlertError(`El archivo numero ${index + 1} no tiene un tipo de archivo definido.`);
      isValid = false;
    }
  });

  return isValid;
};
