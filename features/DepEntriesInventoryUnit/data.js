export const filtersProducts = [
  {
    label: "En Reparacion",
    value: "statusrepair",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "Mostrar En Reparacion",
        name: "Mostrar En Reparacion",
      },
    ],
  },
  {
    label: "Apartados",
    value: "isapart",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "Mostrar Apartados",
        name: "Mostrar Apartados",
      },
    ],
  },

  {
    label: "Proveedor",
    value: "providers",
    valuedb: "providerId",
    type: "inquery",
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
];