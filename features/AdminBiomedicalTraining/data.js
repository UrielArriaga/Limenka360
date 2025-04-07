
export const filtersOptions = [
  {
    label: "Por Fecha de Capacitacion",
    value: "dates",
    valuedb: "trainingdate",
    custom: true,
    customOptions: [
      { id: "day", name: "Hoy", toChip: "Hoy" },
      { id: "week", name: "Semanal", toChip: "Semanal" },
      { id: "month", name: "Mensual", toChip: "Mensual" },
      { id: "range", name: "Rango de Fechas", toChip: "Rango de Fechas" },
    ],
  },
  {
    label:"Por Responsable",
    value:"executives",
    valuedb:"responsibleId",
    custom:false,
    customOptions:[]
  }
];
