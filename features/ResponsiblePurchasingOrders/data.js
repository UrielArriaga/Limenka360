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
];
