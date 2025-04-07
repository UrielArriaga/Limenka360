import { ORDERSTATUSSHOPPING, SHOPPINGSTATUS } from "../../../constants";

export const getColor = status => {
  switch (status) {
    case ORDERSTATUSSHOPPING.aprobado:
      return {
        bgColor: "#097a09",
        color: "#fff",
      };
    case ORDERSTATUSSHOPPING.pendiente:
      return {
        bgColor: "rgba(229, 202, 10, 0.9)",
        color: "#ffff00",
      };
    case ORDERSTATUSSHOPPING.rechazado:
      return {
        bgColor: "rgba(229, 57, 53, 0.5) ",
        color: "#e53935",
      };
    default:
      return {
        bgColor: "#FFF4E5",
        color: "orange",
      };
  }
};

export const getColorStatusSHOPPINGORDER = status => {
  switch (status) {
    case SHOPPINGSTATUS.procesodecompra:
      return {
        bgColor: "rgba(48, 79, 254, 0.7)",
        color: "#fff",
      };

    case SHOPPINGSTATUS.listopararecolecion:
      return {
        bgColor: "#e5ca0a",
        color: "#fff",
      };
    default:
      return {
        bgColor: "#ffff",
        color: "#000",
      };
  }
};
