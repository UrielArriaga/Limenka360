import { AttachFile } from "@material-ui/icons";
import { ORDERSTATUS, ORDERSTATUSADMINALMACEN, SHOPPINGSTATUS } from "../../constants";

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

    case ORDERSTATUSADMINALMACEN.edicion:
      return {
        bgColor: "#407aff",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.rechazado:
      return {
        bgColor: "#bf1818",
        color: "#fff",
      };

    case ORDERSTATUSADMINALMACEN.cancelado:
      return {
          bgColor: "#bf1919",
          color: "#fff",
      };

    case ORDERSTATUS.pedidonuevo:
      return {
        bgColor: "rgba(48, 79, 254, 0.7)",
        color: "#fff",
      };

    case ORDERSTATUS.pedidorecibido:
      return {
        bgColor: "rgba(48, 79, 254, 0.7)",
        color: "#fff",
      };

    case ORDERSTATUS.revisado:
      return {
        bgColor: "rgba(103, 58, 183, 0.7)",
        color: "#fff",
      };
      case ORDERSTATUS.parcialmente:
        return {
          bgColor: "rgba(103, 58, 183, 0.7)",
          color: "#fff",
        };
    case ORDERSTATUS.surtir:
      return {
        bgColor: "rgba(255, 109, 0, 0.7)",
        color: "#fff",
      };

    case ORDERSTATUS.surtido:
      return {
        bgColor: "#5d4037",
        color: "#fff",
      };

    case ORDERSTATUS.completado:
      return {
        bgColor: "#28a745",
        color: "#fff",
      };
      case ORDERSTATUS.entregado:
        return {
          bgColor: "#0e71b4",
          color: "#fff",
        };

    case ORDERSTATUS.incompleto:
      return {
        bgColor: "#6c757d",
        color: "#fff",
      };
    case ORDERSTATUS.proceso:
      return {
        bgColor: "#d9c622",
        color: "#fff",
      };

    case ORDERSTATUS.enpiso:
      return {
        bgColor: "#17a2b8", // Un tono azul verdoso, que evoca movimiento y actividad.
        color: "#fff",
      };

    case ORDERSTATUS.enruta:
      return {
        bgColor: "#6c757d",
        color: "#fff",
      };

    case ORDERSTATUS.asignado:
      return {
        bgColor: "rgba(48, 79, 254, 0.7)",
        color: "#fff",
      };
    case ORDERSTATUS.procesocompra:
      return {
        bgColor: "#e75233",
        color: "#fff",
      };
    case ORDERSTATUS.Na:
      return {
        bgColor: "#cdcdcd",
        color: "#fff",
      };
    case ORDERSTATUS.procesocompra:
      return {
        bgColor: "#f89aed",
        color: "#fff",
      };

    default:
      return {
        bgColor: "#ffff",
        color: "#000",
      };
  }
};

export const getColorStatusSHOPPINGORDER = status => {
  switch (status) {
    case SHOPPINGSTATUS.procesodecompra:
      return {
        bgColor: "rgba(48, 79, 254, 0.7)",
        color: "#fff",
      };

    case SHOPPINGSTATUS.listopararecolecion:
      return {
        // bgColor: "rgba(48, 79, 254, 0.7)",

        // VERDE RGBA

        bgColor: "#28a745",
        color: "#fff",
      };

    // case "Aprobado":
    //   return "#EDF7ED";
    // case "Rechazado":
    //   return "red";
    default:
      return {
        bgColor: "#ffff",
        color: "#000",
      };
  }
};

export const renderTypeFile = type => {
  switch (type) {
    case "application/pdf":
      return <img className="iconpng" src="/pdficon.png" alt="pdf" />;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <img className="iconpng" src="/docicon.png" alt="word" />;
    case "image/jpeg":
    case "image/png":
    case "image/webp":
      return <img className="iconpng" src="/imageicon.png" alt="image" />;
    default:
      return <AttachFile style={{ color: "#034D6F" }} />;
  }
};
