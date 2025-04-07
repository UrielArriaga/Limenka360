export const getColor = status => {
  switch (status) {
    case "in":
      return {
        bgColor: "#FAD7A0",
        color: "#ef6c00",
      };

    case "en ruta":
      return {
        bgColor: "#00e676",
        color: "#fff",
      };

    case "incompleto":
      return {
        bgColor: "#E6B0AA ",
        color: "#e53935",
      };
      
    default:
      return {
        bgColor: "#FFF4E5",
        color: "orange",
      };
  }
};
