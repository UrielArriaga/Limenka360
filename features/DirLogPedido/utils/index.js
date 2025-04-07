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
        bgColor: "rgba(103, 58, 183, 0.3)",
        color: "#673ab7",
      };

    case ORDERSTATUS.surtir:
      return {
        bgColor: "rgba(0, 151, 167, 0.2)",
        color: "#0097a7",
      };

    case ORDERSTATUS.surtido:
      return {
        bgColor: "#00e676",
        color: "#fff",
      };

    case ORDERSTATUS.incompleto:
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
        bgColor: "#ffff",
        color: "#000",
      };
  }
};
