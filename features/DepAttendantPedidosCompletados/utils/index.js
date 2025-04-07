export const getColor = status => {
  switch (status) {
    case "revisión":
      return {
        bgColor: "#FAD7A0",
        color: "#ef6c00",
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
