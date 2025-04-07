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
    name: "Juanito",
    email: "adasda@gmail.com",
  },
  {
    name: "Juanito",
    email: "adasda@gmail.com",
  },
];

export let heads = [
  {
    headText: "Nombre",
    headNormalize: "name",
    orderby: "-name",
  },
  {
    headText: "Correo",
    headNormalize: "email",
    orderby: null,
  },
  {
    headText: "Movil",
    headNormalize: "phone",
    orderby: null,
  },
  {
    headText: "Telefono",
    headNormalize: "phone",
    orderby: null,
  },
  {
    headText: "Categoria de interes",
    headNormalize: "createdAt",
    orderby: null,
  },
];
