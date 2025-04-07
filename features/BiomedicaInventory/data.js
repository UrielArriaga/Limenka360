export const filtersInventario = [
  {
    label: "Disponible",
    value: "available",
    valuedb: "available",
    custom: true,
    customOptions: [
      {
        id: "1",
        name: "Disponible",
      },
      {
        id: "0",
        name: "No Disponible",
      },
    ],
    },
      {
        label: "Tipo",
        value: "type",
        valuedb: "productaccessoryId",
        custom:true,
        customOptions: [
              {
                id: "Material",
                name: "Material",
              },
              {
                id: "Refacción",
                name: "Refacción",
              },
              {
                id: "Consumibles",
                name: "Consumibles",
              },
              {
                id: "Equipo de protección",
                name: "Equipo de protección",
              },
              {
                id: "Equipo",
                name: "Equipo",
              },
            ],
      }
];
