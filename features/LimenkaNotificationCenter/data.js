export const filterSkeleton = [
  {
    label: "Fecha de Creacion",
    value: "dates",
    valuedb: "createdAt",
    custom: true,
    customOptions: [
      {
        id: "today",
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

export const initialData = [
  {
    name: "CMMMAY246",
    createdAt: "03 jun 2024",
    prospectname: "Juan Perez",
    status: "Aprobado",
    classname: "tableRow--highlighted",
  },
];

export let heads = [
  {
    headText: "Fecha",
    headNormalize: "createdAt",
    orderby: "-createdAt",
  },
  {
    headText: "Folio",
    headNormalize: "Folio",
    orderby: "name",
  },
];
