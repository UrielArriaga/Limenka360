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


export const MoreDaysHavePassed = (fechaInicialString, diasLimite) => {
  const fechaInicial = new Date(fechaInicialString);
  const fechaActual = new Date();
  const diferenciaTiempo = fechaActual - fechaInicial;
  const diasPasados = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
  return diasPasados > diasLimite;
};

export const getLargestNumber = (str)  => {
  const numeros = str.match(/\d+/g);
  if (!numeros) return null;
  const enteros = numeros.map(num => parseInt(num, 10));
  const numeroMayor = Math.max(...enteros);
  return numeroMayor;
}