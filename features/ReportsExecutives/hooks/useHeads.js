export const Heads = key => {
    switch (key) {
      case "bycategory":
      case "byentities":
      case "byorigin":
      case "byphase":
      case "bysalesOrigin":
      case "bysalesEntities":
      case "bysalesProducts":
        return ["Nombre", "Monto Total"];
      case "bytotalentities":
      case "bytotalproducts":
        return ["Nombre", "# De cotizaciones"];
      case "byprospectEntities":
      case "byprospectOrigins":
      case "byprospectType":
        return ["Nombre", "# De prospectos"];
      case "bysalespayments":
        return ["Monto de ventas cobradas", "Monto de ventas por cobrar"];
      default:
        break;
    }
  };