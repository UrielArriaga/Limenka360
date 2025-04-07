import { ORDERSTATUS } from "../../../constants";

export const getColor = status => {
  switch (status) {
    case ORDERSTATUS.pedidonuevo:
      return {
        bgColor: "#f0f7fa",
        color: "#09a6ed",
      };

    case ORDERSTATUS.revisado:
      return {
        bgColor: "#FFF4E5",
        color: "#FFA000",
      };

    case "completo":
      return {
        bgColor: "#00e676",
        color: "#fff",
      };

    case "incompleto":
      return {
        bgColor: "#E6B0AA ",
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
