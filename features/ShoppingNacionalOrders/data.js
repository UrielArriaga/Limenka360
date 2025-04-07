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
    value: "exitstatus",
    valuedb: "exitstatus",
    custom: true,
    customOptions: [
      {
        id: "por surtir",
        name: "Por Surtir",
      },
      {
        id: "pedido nuevo",
        name: "Pedido Nuevo",
      },
      {
        id: "incompleto",
        name: "Incompleto",
      },
      {
        id: "completo",
        name: "Completo",
      },
      {
        id: "revisado",
        name: "Revisado",
      },
      {
        id: "entregado",
        name: "Entregado",
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
    label: "Cuenta de Pago",
    value: "paymentsacount",
    valuedb: "paymentaccountId",
  },
];
