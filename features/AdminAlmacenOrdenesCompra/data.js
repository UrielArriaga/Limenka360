export const filtersOrders = [
  {
    label: "Borradores",
    value: "draft",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "Mostrar Borradores",
        name: "Mostrar Borradores",
      },
    ],
  },
  {
    label: "Fecha de creación",
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
];
