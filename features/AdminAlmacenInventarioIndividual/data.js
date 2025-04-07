export const filtersProducts = [
  {
    label: "En Reparacion",
    value: "statusrepair",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "Mostrar En Reparacion",
        name: "En Reparacion",
      },
      {
        id: "Mostrar Ya Reparados",
        name: "Ya Reparado",
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
    label: "Revisados por biomedica",
    value: "reviewed",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "Revisados por biomedica",
        name: "Revisados por biomedica",
      },
      {
        id: "Sin revisar por biomedica",
        name: "Sin revisar por biomedica",
      },
    ],
  },
];
