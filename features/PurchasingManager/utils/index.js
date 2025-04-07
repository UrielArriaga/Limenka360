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