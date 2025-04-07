export const filtersOrders = [
  {
    label: "Fecha de aprobacion",
    value: "dates",
    valuedb: "createdAt",
    custom: true,
    customOptions: [
      {
        id: "day",
        name: "Hoy",
        toChip: "Hoy",
      },
      {
        id: "week",
        name: "Semanal",
        toChip: "Semanal",
      },
      {
        id: "month",
        name: "Mensual",
        toChip: "Mensual",
      },
      {
        id: "range",
        name: "Rango de Fechas",
        toChip: "Rango de Fechas",
      },
    ],
  },
  {
    label: "Estatus",
    value: "warehouses",
    custom: true,
    customOptions: [
      {
        id: "today",
        name: "Por Surtir",
      },
      {
        id: "pedidonuevo",
        name: "Pedido Nuevo",
      },
      {
        id: "week",
        name: "Incompleto",
      },
      {
        id: "month",
        name: "Completo",
      },
      {
        id: "month",
        name: "Revision",
      },
    ],
  },
  {
    label: "Grupo",
    value: "groups",
    valuedb: "createdbyid.groupId",
  },
  {
    label: "Factura",
    value: "billing",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "Sin Factura",
        name: "Sin Factura",
      },
      {
        id: "Con Factura",
        name: "Con Factura",
      },
    ],
  },

  {
    label: "Ejecutivo",
    value: "users",
  },
  {
    label: "Estado",
  },
  {
    label: "Cuenta de Pago",
    value: "paymentsacount",
    valuedb: "paymentaccountId",
  },
];
