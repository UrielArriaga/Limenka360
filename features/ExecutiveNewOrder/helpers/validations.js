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
  if (!orderDataPut.order.phone) {
    errors.push("El teléfono es requerido.");
  } else if (orderDataPut.order.phone.length !== 10) {
    errors.push("El teléfono debe tener exactamente 10 dígitos.");
  }

  // Validar Opportunity
  if (!orderDataPut.oportunity.typesalesId) {
    errors.push("Oportunity: 'typesalesId' es requerido.");
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
  if (!orderDataPut.address.int_number) {
    errors.push(addressShipping.number_int.messageError);
  }

  if (!orderDataPut.address.references) {
    errors.push(addressShipping.reference.messageError);
  }

  if (!orderDataPut.shippingtype.shippingtypeId) {
    errors.push(addressShipping.shippingtype.messageError);
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

    if (!orderDataPut.bill.businessname) {
      errors.push(billing.businessName.messageError);
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

export const validateChildProducts = (products, showAlertError) => {
  let isValid = true;

  let resp = products.filter(p => p.product.ispackage) || [];

  resp.forEach(product => {
    if (product.productslocal.length === 0) {
      showAlertError(`El paquete ${product.product.name} no tiene desglose de productos`);
      isValid = false;
    }
  });

  return isValid;
};

// export const validateFiles = (files = [], showAlertError) => {
//   let isValid = true;

//   const validFiles = files?.filter(file => file?.name && file?.file && file?.filestypeId);
//   console.log("validFiles", validFiles);

//   if (validFiles?.length < 3) {
//     showAlertError("Cargar al menos 3 archivos con nombre, archivo y tipo de archivo.");
//     return false;
//   }

//   files.forEach((file, index) => {
//     const missingFields = [];

//     if (file.name && !file.file) {
//       missingFields.push("Agregar Archivo");
//       isValid = false;
//     }
//     if (!file.name && file.file) {
//       missingFields.push("nombre");
//       isValid = false;
//     }
//     if (file.file && !file.filestypeId) {
//       missingFields.push("tipo de archivo");
//       isValid = false;
//     }

//     // Si falta algún campo, mostrar el error correspondiente
//     if (missingFields.length > 0) {
//       showAlertError(`El archivo número ${index + 1} le falta ${missingFields.join(" y ")}.`);
//     }
//   });

//   return isValid;
// };

export const validateFiles = (files = [], showAlertError) => {
  let isValid = true;
  let validFilesCount = 0;

  files.forEach((file, index) => {
    const missingFields = [];

    if (file.name && !file.file) {
      missingFields.push("Agregar Archivo");
      isValid = false;
    }
    if (!file.name && file.file) {
      missingFields.push("nombre");
      isValid = false;
    }
    if (file.file && !file.filestypeId) {
      missingFields.push("tipo de archivo");
      isValid = false;
    }

    if (file.name && file.file && file.filestypeId) {
      validFilesCount++;
    }

    // Mostrar alertas si faltan campos
    if (missingFields.length > 0) {
      showAlertError(`El archivo número ${index + 1} le falta ${missingFields.join(" y ")}.`);
    }
  });

  // Si no hay al menos 3 archivos válidos, mostrar la alerta correspondiente
  if (validFilesCount < 3) {
    const filesNeeded = 3 - validFilesCount;
    if (filesNeeded === 1) {
      showAlertError("Falta 1 archivo para generar el pedido");
    } else if (filesNeeded === 2) {
      showAlertError("Faltan 2 archivos para generar el pedido");
    } else {
      showAlertError("Faltan 3 archivos para generar el pedido");
    }
    return false;
  }

  return isValid;
};
