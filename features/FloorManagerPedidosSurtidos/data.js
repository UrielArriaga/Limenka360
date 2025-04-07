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
        id: "Completado",
        name: "Completado",
      },
      {
        id: "revisado",
        name: "Revisado",
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
        id: "surtido",
        name: "Surtido",
      },
    ],
  },
];
