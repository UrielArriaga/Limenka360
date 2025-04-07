
export const getColorStatus = status => {
    switch (status) {
      case "listo para recoleccion":
        return {
          bgColor: "#28a745",
          color: "#ffffff",
        };
    
    default:
        return {
            bgColor: "#f0f7fa",
            color: "#09a6ed",
        };
    }
  };