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
    label: "Proveedor",
    value: "providers",
    valuedb:"providerId",
    // type: "boolean",
    custom: false,
    customOptions: [],
  },
  {
    label: "Nacionales / Internacionales",
    value: "national",
    type: "boolean",
    custom: true,
    customOptions: [
      {
        id: "national",
        name: "Nacionales",
        value: true,
      },
      {
        id: "international",
        name: "Internacionales",
        value: false,
      },
    ],
  },
];
