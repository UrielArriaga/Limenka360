import { ORDERSTATUSADMINALMACEN } from "../../constants";

export const getColor = status => {
  switch (status) {
    case ORDERSTATUSADMINALMACEN.pedidonuevo:
      return {
        bgColor: "#f0f7fa",
        color: "#09a6ed",
      };

    case ORDERSTATUSADMINALMACEN.revisado:
      return {
        bgColor: "rgba(103, 58, 183, 0.3)",
        color: "#673ab7",
      };

    case ORDERSTATUSADMINALMACEN.surtir:
      return {
        bgColor: "rgba(0, 151, 167, 0.2)",
        color: "#0097a7",
      };

    case ORDERSTATUSADMINALMACEN.surtido:
      return {
        bgColor: "#00e676",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.incompleto:
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

export const getColorStatusOrder = status => {
  switch (status) {
    case ORDERSTATUSADMINALMACEN.aprobado:
      return {
        bgColor: "#097a09",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.pendiente:
      return {
        bgColor: "#e5ca0a",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.rechazado:
      return {
        bgColor: "#bf1818",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.surtir:
      return {
        bgColor: "rgba(255, 109, 0, 0.7)",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.surtido:
      return {
        bgColor: "#5d4037",
        color: "#fff",
      };

    default:
      return {
        bgColor: "#ffff",
        color: "#000",
      };
  }
};
