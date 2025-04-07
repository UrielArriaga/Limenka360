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
        name: "Pedido Recibido",
      },
      {
        id: "completado",
        name: "Completado",
      },
      {
        id: "revisado",
        name: "Revisado",
      },
      {
        id: "en ruta",
        name: "En ruta",
      },
      {
        id: "entregado",
        name: "Entregado",
      },
      {
        id: "parcialmente surtido",
        name: "Parcialmente Surtido",
      },
      {
        id: "Proceso de compra",
        name: "Proceso de Compra",
      },
      {
        id: "surtido",
        name: "Surtido",
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
