import { ORDERSTATUSSHOPPING } from "../../../constants";

export const getColor = status => {
  switch (status) {
    case ORDERSTATUSSHOPPING.pedidonuevo:
      return {
        bgColor: "#f0f7fa",
        color: "#09a6ed",
      };

    case ORDERSTATUSSHOPPING.pedidonuevo:
      return {
        bgColor: "#f0f7fa",
        color: "#09a6ed",
      };

    case ORDERSTATUSSHOPPING.pendiente:
      return {
        bgColor: "rgba(229, 202, 10, 0.9)",
        color: "#ffff00",
      };

    case "completo":
      return {
        bgColor: "#00e676",
        color: "#fff",
      };

    case ORDERSTATUSSHOPPING.rechazado:
      return {
        bgColor: "rgba(229, 57, 53, 0.5) ",
        color: "#e53935",
      };

    //   case "Aprobado":
    //     return "#EDF7ED";
    //   case "Rechazado":
    //     return "red";
    default:
      return {
        bgColor: "#FFF4E5",
        color: "orange",
      };
  }
};
