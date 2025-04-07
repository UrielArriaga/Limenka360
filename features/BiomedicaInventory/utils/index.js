export const getColor = available => {
  switch (available) {
    case true:
      return {
        bgColor: "#017e03",
        color: "#fff",
      };

    case false:
      return {
        bgColor: "#ff0101",
        color: "#fff",
      };

    default:
      return {
        bgColor: "#FFF4E5",
        color: "orange",
      };
  }
};

export const getColorType = type => {
  switch (type) {
    case "Material":
      return {
        bgColor: "#017e03",
        color: "#fff",
      };

    case "Refacción":
      return {
        bgColor: "#548cd4",
        color: "#fff",
      };
    case "Consumibles":
      return {
        bgColor: "#6f30a0",
        color: "#fff",
      };
    case "Equipo de protección":
      return {
        bgColor: "#f89646",
        color: "#fff",
      };
    case "Equipo":
      return {
        bgColor: "#f89646",
        color: "#fff",
      };

    default:
      return {
        bgColor: "#FFF4E5",
        color: "orange",
      };
  }
};
