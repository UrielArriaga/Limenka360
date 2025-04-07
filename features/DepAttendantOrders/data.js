import { DELIVERYMETHODS } from "../../constants";

export const filtersOrders = [
  // {
  //   label: "Borradores",
  //   value: "draft",
  //   type: "boolean",
  //   custom: true,
  //   customOptions: [
  //     {
  //       id: "Mostrar Borradores",
  //       name: "Mostrar Borradores",
  //     },
  //   ],
  // },
  {
    label: "Proveedor",
    value: "providers",
    valuedb: "providerId",
    custom:false,
    customOptions:[]
  },
  {
    label: "Metodo de Entrega",
    value: "methoddelivery",
    valuedb: "methoddelivery",
    custom:true,
    customOptions: DELIVERYMETHODS
  }
];
