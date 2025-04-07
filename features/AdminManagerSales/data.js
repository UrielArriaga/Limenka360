export const filtersSales = [
  {
    label: "Grupo",
    value: "groups",
    valuedb: "ejecutive",
  },

  {
    label: "Ejecutivo",
    value: "users",
    valuedb: "ejecutiveId",
    params: {
      all: 1,
      order: "name",
    },
  },
  {
    label: "Fecha de Venta",
    value: "dates",
    valuedb: "soldat",
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
