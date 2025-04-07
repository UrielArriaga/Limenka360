export const ordersEntries = [
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
    label: "Por Fecha",
    value: "dates",
    valuedb: "createdAt",
    custom: true,
    customOptions: [
      { id: "day", name: "Hoy", toChip: "Hoy" },
      { id: "week", name: "Semanal", toChip: "Semanal" },
      { id: "month", name: "Mensual", toChip: "Mensual" },
      { id: "range", name: "Rango de Fechas", toChip: "Rango de Fechas" },
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
        id: "completado",
        name: "Completado",
      },
      {
        id: "revisado",
        name: "Revisado",
      },
      {
        id: "surtido",
        name: "Surtido",
      },
      {
        id: "en piso",
        name: "En piso",
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
      // {
      //   id: "sin status",
      //   name: "Sin estatus",
      // },
    ],
  },
];
