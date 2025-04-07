import { BusinessCenter, MonetizationOn, Payment, PeopleAlt } from "@material-ui/icons";
import dayjs from "dayjs";
import { months } from "../BD/databd";
import { handleOpenGlobalAlert } from "../redux/slices/alertSlice";
import { api, URL_SPACE, url_files } from "../services/api";

export const RedirectPage = (role, router) => {
  console.log(role, " pagfina");
  switch (role) {
    case "Admin_compania":
      router.push("/director");
      break;

    case "ejecutivo":
      router.push("/ejecutivo");
      break;
    case "gerente_biomedico":
      router.push("/gerentebiomedica");
      break;

    case "director":
      router.push("/director");
      break;

    case "inteligencia_comercial":
      router.push("/herramientas/importacion");
      break;
    case "gerente":
      router.push("/gerente");
      break;
    case "compras":
      router.push("/comprasv2");
      break;

    case "compras_internacional":
      router.push("/comprasinternacional");
      break;
    case "director_compras":
      router.push("/directorcompras");
      break;
    case "administrador_de_ventas":
      router.push("/administracionventas/actividades");
      break;
    case "administracion":
      router.push("/administracion/pedidos");
      break;

    case "admin_gerente":
      router.push("/administraciongerente");
      break;

    case "logistica":
      router.push("/logistica/pedidos");
      break;
    case "recepcion":
      router.push("/recepcion");
      break;

    case "encargado_de_ingresos":
      router.push("/encargadoentradas/pedidos");
      break;

    case "encargado_de_egresos":
      router.push("/encargadosalidas");
      break;

    case "jefe_de_piso_almacen":
      router.push("/jefedepiso/pedidos");
      break;

    case "director_de_logistica":
      router.push("/directorlogistica");
      break;

    case "administrador_de_almacen":
      router.push("/administracionalmacen");
      break;

    case "administrador_logistica":
      router.push("/administracionlogistica");
      break;

    case "coordinador_compras":
      router.push("/coordinadorcompras");
      break;

    case "gestor_compras":
      router.push("/gestorcompras/proveedores");
      break;

    case "responsable_compras":
      router.push("/responsablecompras");
      break;

    case "gerente_compras":
      router.push("/gerentecompras");
      break;

    case "master_almacen":
      router.push("/almacenesforaneos");
      break;

      case "biomedica":
        router.push("/biomedica/productos");
        break;

    case "jefe_de_flotilla":
      router.push("/jefedeflotilla/salidas");
      break;

    case "gestor_de_compras_int":
      router.push("/gestorcomprasint");
      break;
      
    case "administrador_biomedico":
      router.push("/administradorbiomedica");
      break;
  }
};

export const getDialogName = route => {
  switch (route) {
    case "NUEVO GRUPO":
      return "newgroup";

    case "USUARIOS":
      return "users";

    case "IMPORTACIONES":
      return "imports";

    default:
      break;
  }
};

export function colorLog(message, color) {
  color = color || "black";

  switch (color) {
    case "blue":
      color = "DodgerBlue";
      break;
    case "success":
      color = "Green";
      break;
    case "info":
      color = "DodgerBlue";
      break;
    case "error":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    default:
      color = color;
  }

  if (typeof message === "object") {
    return;
  }
}

export const handleGlobalAlert = (severity, message, type, dispatch, time = 3000) => {
  dispatch(
    handleOpenGlobalAlert({
      show: true,
      severity,
      message,
      type,
    })
  );
  setTimeout(() => {
    dispatch(
      handleOpenGlobalAlert({
        show: false,
        severity: null,
        message: null,
        type: null,
      })
    );
  }, time);
};

export const handleAlert = (severity, message, type, setState) => {
  setState({ severity: severity, show: true, message: message, type: type });
  setTimeout(() => {
    setState({ severity: severity, show: false, message: message, type: null });
  }, 3000);
};

export const toUpperCaseChart = phrase => {
  if (phrase === "" || phrase === undefined || phrase === null) {
    return "";
  } else {
    if (phrase) {
      return phrase
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  }
};

export const formatDate = date => {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();
  const month = months[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  return `${month} ${day}, ${year}`;
};
export const formatHour = str => {
  let time = dayjs(str);
  let hour = time.hour().toString();
  let minutes = time.minute().toString();
  let newminute = minutes.length == 1 ? `0${minutes}` : minutes;
  return `${hour}:${newminute}`;
};
export const formatDatecomplete = str => {
  let datecomplete = dayjs(str);
  let month = months.filter((i, ix) => ix == datecomplete.month());
  let day = datecomplete.format("D");
  let year = datecomplete.year();
  let hour = datecomplete.hour().toString();
  let minutes = datecomplete.minute().toString();
  let newminute = minutes.length == 1 ? `0${minutes}` : minutes;

  return `${month[0]} ${day}, ${year} ${hour}:${newminute}`;
};

export const formatDateToISO = date => {
  let newDate = dayjs(date).startOf("day").add(1, "second").toISOString();
  return newDate;
};

export function capitalizeString(text) {
  return text[0].toUpperCase() + text.slice(1);
}

export const formatNumber = number => {
  let options = { style: "currency", currency: "MXN" };
  let numberFormat = new Intl.NumberFormat("es-MX", options);

  if (number !== NaN) {
    return numberFormat.format(number);
  } else {
    return 0;
  }
};

export const formatNumberAbrv = number => {
  let options = { style: "currency", currency: "MXN" };
  let numberFormat = new Intl.NumberFormat("es-MX", options);

  if (!isNaN(number)) {
    if (number >= 1000000000) {
      const billions = (number / 1000000000).toFixed(2);
      return billions.endsWith(".00") ? billions.replace(/\.00$/, "") + "B" : billions + "B";
    } else if (number >= 1000000) {
      const millions = (number / 1000000).toFixed(2);
      return millions.endsWith(".00") ? millions.replace(/\.00$/, "") + "M" : millions + "M";
    } else if (number >= 1000) {
      const thousands = (number / 1000).toFixed(2);
      return thousands.endsWith(".00") ? thousands.replace(/\.00$/, "") + "k" : thousands + "k";
    } else {
      return numberFormat.format(number);
    }
  } else {
    return numberFormat.format(0);
  }
};

export const formatNumberNoSymbol = number => {
  return new Intl.NumberFormat("es-MX").format(number);
};

export const returnFomatTime = item => {
  if (item === undefined || item === null) {
    return "";
  } else {
    let date = new Date(item);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let newHour = 0;
    let newMinutes = 0;
    if (hour > 12) {
      newHour = hour - 12;
      if (minutes <= 9) {
        newMinutes = "0" + minutes + " p.m";
      } else {
        newMinutes = minutes + " p.m";
      }
    } else {
      if (minutes <= 9) {
        newMinutes = "0" + minutes + " a.m";
      } else {
        newMinutes = minutes + " a.m";
      }
      if (hour == 0) {
        newHour = 12;
      } else {
        newHour = hour;
      }
    }
    return newHour + ":" + newMinutes;
  }
};

export const formatLink = link => {
  return (
    <a
      target={"_blank"}
      without="true"
      rel="noreferrer"
      href={validateURL(link)}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "inline-block",
        width: "100%",
      }}
    >
      {link}
    </a>
  );
};

export const isEmptyArray = array => (array?.length <= 0 ? true : false);

export const calculatePercentaje = (percent, total) => ((percent / 100) * total).toFixed(2);

export const getDataDay = dates => {
  let date = new Date(dates.toISOString().slice(0, 10));
  let today = new Date(date);
  let tomorrow = new Date(date.setDate(date.getDate() + 1));
  return [today.toISOString(), tomorrow.toISOString()];
};

export const getDataDaysWeek = dates => {
  let date = new Date(dates.toISOString().slice(0, 10));
  let monday = new Date(date.setDate(date.getDate() - date.getDay()));
  let lastDayWeek = new Date(monday.toISOString().slice(0, 10));
  let sunday = new Date(lastDayWeek.setDate(lastDayWeek.getDate() + 7));
  return [monday.toISOString(), sunday.toISOString()];
};

export const getDataDaysMonth = dates => {
  let date = new Date(dates.toISOString().slice(0, 10));
  let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
  let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return [
    new Date(primerDia.setDate(primerDia.getDate() - 6)).toISOString(),
    new Date(ultimoDia.setDate(ultimoDia.getDate() + 6)).toISOString(),
  ];
};

export const currentMonth = () => {
  let date = new Date();
  let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
  let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return [primerDia.toISOString(), ultimoDia.toISOString()];
};

export const checkIfItExpired = dateString => {
  const paymentDate = new Date(dateString);
  const today = new Date();

  if (paymentDate < today) {
    return "Expirado";
  } else {
    return "-";
  }
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const validateIncludes = type => {
  let includes;
  if (type === "Grupal" || type === "Individual" || type === "Empresarial") {
    includes = "ejecutive,group,company,goal,goal.goaltype,goal.goalname";
  } else {
    includes = "ejecutive,group,company,goal,goal.goaltype,goal.goalname";
  }
  return includes;
};

export const validateJoins = type => {
  let joins;
  if (type === "Grupal" || type === "Individual" || type === "Empresarial") {
    joins = "1,2,3,goal,goal.goaltype,goal.goalname";
  } else {
    joins = "1,2,3,goal,goal.goaltype,goal.goalname";
  }
  return joins;
};

export const validNullData = (data, toChange) => {
  let value = data;
  if (data === null || data === undefined) value = toChange;

  return value;
};

export const generateTemporalId = length => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const abbreviationNumber = num => {
  if (!num) return 0;
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

let dataCardExecutives = [
  {
    index: 0,
    title: "Prospectos",
    colorbar: "#44cbe4",
    icon: <PeopleAlt className="icon icon_prospect" />,
  },
  {
    index: 1,
    title: "Oportunidades",
    colorbar: "#88c82d",
    icon: <MonetizationOn className="icon icon_oportunities" />,
  },
  {
    index: 2,
    title: "Cuentas por cobrar",
    colorbar: "#f77132",
    icon: <BusinessCenter className="icon icon_payments" />,
  },
  {
    index: 3,
    title: "Clientes",
    colorbar: "#6b34bc",
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 4,
    title: "Monto Vendido",
    colorbar: "#616161",
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 5,
    title: "Monto a cobrar",
    colorbar: "#f50057",
    icon: <Payment className="icon icon_discarted" />,
  },
];
export { dataCardExecutives };

export const normalizeTableData = data => {
  let normalizeData = [];
  data.map(item =>
    normalizeData.push({
      ["id"]: item.id,
      ["nombre"]: item.oportunity.soldby.name,
      ["correo"]: item.oportunity.soldby.email,
      ["teléfono"]: item.oportunity.soldby.phone,
      ["folio"]: item.folio,
      ["total"]: item.total,
      ["estado"]: item.orderstatus?.name,
      ["receive"]: item.receive,
      ["phone"]: item.phone,
      ["rfc"]: item.rfc,
      ["observations"]: item.observations,
      ["billing"]: item.billing,
      ["billingphone"]: item.billingphone,
      ["billingbusiness"]: item.billingbusiness,
      ["discarted"]: item.discarted,
      ["discartedreason"]: item.discartedreason,
      ["billingat"]: formatDate(item.billingat),
      ["isshipped"]: item.isshipped,
      ["productos"]: item.oportunity.productsoportunities,
      ["calle"]: item.address.street,
      ["numext"]: item.address.ext_number,
      ["numint"]: item.address.int_number,
      ["referencias"]: item.address.references,
      ["asentamiento"]: item.address.settlement,
      ["fecha de creación"]: formatDate(item.createdAt),
      ["prospectId"]: item.oportunity.prospectId,
      ["factura"]: item.billing,
      ["cfdi"]: item.cfdi?.name,
      ["Metodo de Pago"]: item.paymentmethod?.name,
      ["forma de pago"]: item.paymentway?.name,
      ["descartado"]: item.discarted,
      ["createdAt"]: item.createdAt,
      ["updatedAt"]: item.updatedAt,
    })
  );
  return normalizeData;
};

export const consoleColor = (message, color) => {
  color = color || "black";

  switch (color) {
    case "success":
      color = "Green";
      break;
    case "info":
      color = "DodgerBlue";
      break;
    case "error":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    default:
      color = color;
  }
};

export const validateURL = url => {
  if (!url) return "";
  try {
    let validate = new URL(url);
    return url;
  } catch (error) {
    return URL_SPACE + url;
  }
};

export const DatePickerEsFormat = () => {
  const monthsBG = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const daysBG = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
  let formatDatePicker = {
    localize: {
      month: n => monthsBG[n],
      day: n => daysBG[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };
  return formatDatePicker;
};
export const formatDateZone = () => {
  let offsetMinutesDates = new Date().getTimezoneOffset();
  let hours = Math.floor(offsetMinutesDates / 60);
  let minutes = offsetMinutesDates % 60;
  let offsetStr = `${hours > 0 ? "-" : "+"}${Math.abs(hours).toString().padStart(2, "0")}:${Math.abs(minutes)
    .toString()
    .padStart(2, "0")}`;
  let h12 = offsetStr.split(":");
  let horas = h12[0];
  let minutosPorHora = 60;
  let segundosPorMinuto = 60;
  let milisegundosPorSegundo = 1000;
  let milisegundosTotal = horas * minutosPorHora * segundosPorMinuto * milisegundosPorSegundo;
  return `${hours > 0 ? "" : "+"}${milisegundosTotal}`;
};

export const getColorByLetter = letter => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFF5",
    "#FFAA33",
    "#A1FF33",
    "#FF33F5",
    "#33FFAA",
    "#5733FF",
    "#FF5733",
    "#33FF57",
    "#33A1FF",
    "#A133FF",
    "#FF5733",
    "#FF33AA",
    "#33FFAA",
    "#3357FF",
    "#33FFA1",
    "#FF3357",
    "#A1FF57",
    "#33FF33",
    "#5733A1",
    "#A1A1FF",
    "#FF57A1",
  ];

  const normalizedLetter = letter.toUpperCase();

  const index = normalizedLetter.charCodeAt(0) - "A".charCodeAt(0);

  if (index < 0 || index >= colors.length) {
    return "#000000";
  }

  return colors[index];
};
