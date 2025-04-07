export const filtersOrders = [
  {
    label: "Fecha de Salida",
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
    label: "Almacen de Entrada",
    value: "warehouse",
    valuedb: "entrywarehouseId",
    custom: false,
    customOptions: [],
  },
  {
    label: "Almacen de Salida",
    value: "warehouse",
    valuedb: "exitwarehouseId",
    custom: false,
    customOptions: [],
  },
  {
    label: "Creado Por",
    value: "users",
    valuedb:"createdbyId",
    custom: false,
    customOptions: [],
  },
];
