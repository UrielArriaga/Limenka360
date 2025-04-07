export const filtersExits = [
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
];

export const initialData = [
  {
    folio: "CMMMAY246",
    createdAt: "03 jun 2024",
    createdBy: "Juan Perez",
    quantity: "Aprobado",
    classname: "tableRow--highlighted",
  },
  {
    folio: "CMMMAY246",
    createdAt: "03 jun 2024",
    createdBy: "Juan Perez",
    quantity: "Aprobado",
    classname: "tableRow--highlighted",
  },
];

export let heads = [
  {
    headText: "Folio",
    headNormalize: "Folio",
    orderby: "-folio",
  },
  {
    headText: "Folio de pedido",
    headNormalize: "orderFolio",
    orderby: null,
  },
  {
    headText: "Fecha de salida",
    headNormalize: "createdAt",
    orderby: "-createdAt",
  },
  {
    headText: "Estado de pedido",
    headNormalize: "status",
    orderby: "-exitstatus",
  },

  {
    headText: "Descripción",
    headNormalize: "description",
    orderby: null,
  },
  {
    headText:"Creado Por",
    headNormalize: "ejecutive",
    orderby:null,
  }
];
