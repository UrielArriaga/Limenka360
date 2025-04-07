import { Assignment, AttachFile, Description, LocalGroceryStore, LocalShipping, Receipt } from "@material-ui/icons";

export const tabsNewOrder = [
  {
    step: 1,
    name: "Datos de Pedido",
    icon: <Assignment />,
  },
  {
    step: 2,
    name: "Dirección de Envió",
    icon: <LocalShipping />,
  },
  {
    step: 3,
    name: "Datos de Facturación",
    icon: <Receipt />,
  },
  {
    step: 4,
    name: "Archivos de Pedido",
    icon: <AttachFile />,
  },
  {
    step: 5,
    name: "Productos",
    icon: <LocalGroceryStore />,
  },
  {
    step: 6,
    name: "Resumen de Pedido",
    icon: <Description />,
  },
];

export const filesRequiredOrder = [
  {
    name: "Formato de Demostración de Equipo",
    data: null,
  },
  {
    name: "Cotización Firmada por el Cliente",
    data: null,
  },
  {
    name: "Solicitud o Rechazo de Factura",
    data: null,
  },
  {
    name: "Pago de Viáticos si es Fuera de la Zona",
    data: null,
  },
  {
    name: "Captura de Pantalla de Cotización de Viáticos",
    data: null,
  },
  {
    name: "Autorización de Dirección General",
    data: null,
  },
  {
    name: "Comprobante de Domicilio",
    data: null,
  },
  {
    name: "INE del Titular",
    data: null,
  },
  {
    name: "Cédula Profesional",
    data: null,
  },
  {
    name: "Otros Archivos",
    data: null,
  },
];

export const namesForm = {
  orderNames: {
    paymentaccount: {
      label: "Cuenta de Pago",
      name: "order.paymentaccount",
      messageError: "Campo faltante en seccion Datos de pedido: Cuenta de pago",
    },
    typesale: {
      label: "Tipo de Venta",
      name: "order.typesale",
      messageError: "Campo faltante en seccion Datos de pedido: Tipo de Venta",
    },
    observations: {
      label: "Observaciones",
      name: "order.observations",
      messageError: "Campo faltante en seccion Datos de pedido: Observaciones",
    },
    workstation: {
      label: "Puesto de Trabajo",
      name: "order.workstation",
      messageError: "Campo faltante en seccion Direcion de envio: Puesto de Trabajo",
    },
    phone: {
      label: "Teléfono",
      name: "phone",
      messageError: "Campo faltante en seccion Direcion de envio: Telefono",
      messageErrorMin: "El campo debe tener al menos 10 caracteres",
    },
  },

  addressShipping: {
    id: {
      label: "ID",
      name: "address.id",
    },
    receive: {
      label: "Recibe",
      name: "address.receive",
      messageError: "Campo faltante en seccion Direcion de envio: Recibe",
    },
    street: {
      label: "Calle",
      name: "address.street",
      messageError: "Campo faltante en seccion Direcion de envio: Calle",
    },
    number_int: {
      label: "Número Interior",
      name: "address.int_number",
      messageError: "Campo faltante en seccion Direcion de envio: Número Interior",
    },
    number_ext: {
      label: "Número Exterior",
      name: "address.ext_number",
      messageError: "Campo faltante en seccion Direcion de envio: Número Exterior",
    },
    settlement: {
      label: "Colonia",
      name: "address.settlement",
      messageError: "Campo faltante en seccion Direcion de envio: Colonia",
    },

    postal: {
      label: "Código Postal",
      name: "address.postal",
      messageError: "Campo faltante en seccion Direcion de envio: Código Postal",
    },
    postalCode: {
      label: "Código Postal",
      name: "address.postalCode",
      messageError: "Campo faltante en seccion Direcion de envio: Código Postal",
    },
    entity: {
      label: "Estado",
      name: "address.entity",
      messageError: "Campo faltante en seccion Direcion de envio: Estado",
    },
    city: {
      label: "Ciudad",
      name: "address.city",
      messageError: "Campo faltante en seccion Direcion de envio: Ciudad",
    },
    shippingtype: {
      label: "Tipo de envío",
      name: "address.shippingtype",
      messageError: "Campo faltante en seccion Direcion de envio: Tipo de envío",
    },
    reference: {
      label: "Referencias",
      name: "address.references",
      messageError: "Campo faltante en seccion Direcion de envio: Referencias",
    },

    // state: {
    //   label: "Estado",
    //   name: "address.state",
    // },
    // country: {
    //   label: "País",
    //   name: "address.country",
    // },
  },
  billing: {
    id: {
      label: "ID",
      name: "billing.id",
      messageError: "Campo faltante en seccion Datos de Facturación: ID",
    },
    addressbillingId: {
      label: "ID",
      name: "billing.addressbillingId",
      messageError: "Campo faltante en seccion Datos de Facturación: ID",
    },
    businessName: {
      label: "Razón Social",
      name: "billing.businessName",
      messageError: "Campo faltante en seccion Datos de Facturación: Razón Social",
    },

    phone: {
      label: "Teléfono",
      name: "billing.phone",
      messageError: "Campo faltante en seccion Datos de Facturación: Teléfono",
    },

    rfc: {
      label: "RFC",
      name: "billing.rfc",
      messageError: "Campo con la nomeclatura incorrecta en seccion Datos de Facturación: RFC",
    },
    cfdi: {
      label: "Uso de CFDI",
      name: "billing.cfdi",
      messageError: "Campo faltante en seccion Datos de Facturación: Uso de CFDI",
    },
    paymentMethod: {
      label: "Método de Pago",
      name: "billing.paymentMethod",
      messageError: "Campo faltante en seccion Datos de Facturación: Método de Pago",
    },
    waytoPay: {
      label: "Forma de Pago",
      name: "billing.waytoPay",
      messageError: "Campo faltante en seccion Datos de Facturación: Forma de Pago",
    },

    taxregime: {
      label: "Regimen Fiscal",
      name: "billing.taxregime",
      messageError: "Campo faltante en seccion Datos de Facturación: Regimen Fiscal",
    },
    street: {
      label: "Calle",
      name: "billing.address.street",
      messageError: "Campo faltante en seccion Datos de Facturación: Calle",
    },
    number_int: {
      label: "Número Interior",
      name: "billing.address.int_number",
      messageError: "Campo faltante en seccion Datos de Facturación: Número Interior",
    },
    number_ext: {
      label: "Número Exterior",
      name: "billing.address.ext_number",
      messageError: "Campo faltante en seccion Datos de Facturación: Número Exterior",
    },
    settlement: {
      label: "Colonia",
      name: "billing.address.settlement",
      messageError: "Campo faltante en seccion Datos de Facturación: Colonia",
    },

    postalCode: {
      label: "Código Postal",
      name: "billing.address.postalCode",
      messageError: "Campo faltante en seccion Datos de Facturación: Código Postal",
    },
    postal: {
      label: "Código Postal",
      name: "billing.address.postal",
      messageError: "Campo faltante en seccion Datos de Facturación: Código Postal",
    },
    entity: {
      label: "Estado",
      name: "billing.address.entity",
      messageError: "Campo faltante en seccion Datos de Facturación: Estado",
    },
    city: {
      label: "Ciudad",
      name: "billing.address.city",
      messageError: "Campo faltante en seccion Datos de Facturación: Ciudad",
    },

    // street: {
    //   label: "Calle",
    //   name: "billing.street",
    // },
    // number: {
    //   label: "Número",
    //   name: "billing.number",
    // },
    // colony: {
    //   label: "Colonia",
    //   name: "billing.colony",
    // },
    // postalCode: {
    //   label: "Código Postal",
    //   name: "billing.postalCode",
    // },
    // postal: {
    //   label: "Código Postal",
    //   name: "billing.postal",
    // },
    // city: {
    //   label: "Ciudad",
    //   name: "billing.city",
    // },
    // entity: {
    //   label: "Estado",
    //   name: "billing.entity",
    // },
    // country: {
    //   label: "País",
    //   name: "billing.country",
    // },
    // email: {
    //   label: "Correo Electrónico",
    //   name: "billing.email",
    // },
    // phone: {
    //   label: "Teléfono",
    //   name: "billing.phone",
    // },
  },
};
// order: {
//   paymentaccount: "order.paymentaccount",
//   typesale: "order.typesale",
//   observations: "order.observations",
// },
// addressShipping: {
//   street: "addressShipping.street",
//   number: "addressShipping.number",
//   colony: "addressShipping.colony",
//   postalCode: "addressShipping.postalCode",
//   city: "addressShipping.city",
//   state: "addressShipping.state",
//   country: "addressShipping.country",
//   reference: "addressShipping.reference",
// },
// billingData: {
//   rfc: "billingData.rfc",
//   businessName: "billingData.businessName",
//   street: "billingData.street",
//   number: "billingData.number",
//   colony: "billingData.colony",
//   postalCode: "billingData.postalCode",
//   city: "billingData.city",
//   state: "billingData.state",
//   country: "billingData.country",
//   email: "billingData.email",
//   phone: "billingData.phone",
// },
