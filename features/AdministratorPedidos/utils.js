import { ORDERSTATUSSHOPPING } from "../../constants";

export const getColorOrder = status => {
  switch (status) {
    case ORDERSTATUSSHOPPING.aprobado:
      return {
        bgColor: "rgb(9, 122, 9)",
        color: "#fff",
      };

    case ORDERSTATUSSHOPPING.pendiente:
      return {
        bgColor: "#F1C40F",
        color: "#fff",
      };

    case ORDERSTATUSSHOPPING.rechazado:
      return {
        bgColor: "rgb(191, 24, 24)",
        color: "#fff",
      };
  }
};
