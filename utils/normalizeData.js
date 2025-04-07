import dayjs from "dayjs";
import {
  formatDate,
  formatHour,
  formatNumber,
  formatNumberNoSymbol,
  toUpperCaseChart,
  formatLink,
  formatDatecomplete,
  formatDateToISO,
} from "../utils/index";

export const normalizeTableDataGroupsSells = data => {
  let viewGroupSell = {};
  viewGroupSell["id"] = data.id;
  viewGroupSell["ejecutivo"] = `${toUpperCaseChart(data?.prospect?.ejecutive?.name)} ${
    data?.prospect?.ejecutive?.lastname && toUpperCaseChart(data?.prospect?.ejecutive?.lastname)
  } `;
  viewGroupSell["monto total"] = formatNumber(data?.amount);
  viewGroupSell["total de ventas"] = formatNumberNoSymbol(data.prospect?.totalsales);
  viewGroupSell["prospecto"] = data?.prospectId;
  return viewGroupSell;
};

export const normalizeOpportunity = data => ({
  amount: parseFloat(data.amount.replace(/,/g, "")),
  discount: Number(0),
  certainty: Number(data.certainty),
  concept: data.concept,
  phaseId: data.phase,
  estimatedclossing: formatDateToISO(data.estimatedclosing),
  comission: data.commission,
  iscloseout: false,
  quantity: data.quantity,
  observations: data.observations,
  prospectId: data.p,
  clientTypeId: data.clienttype ? data.clienttype : "",
});

export const normalizeQuote = data => ({
  amount: data.amount, //1225523,
  quantity: data?.quantity, //10,
  discount: data?.discount,
  oportunityId: data?.oportunityId,
});

export const normalizeTableGoals = data => ({
  ejecutive: data.ejecutive?.name + " " + data.ejecutive?.lastname,
  progress: data.progress,
  period: `${formatDate(data.initialperiodate)} - ${formatDate(data.finalperiodate)}`,
  finalgoal: data.finalgoal,
});

export const normalizeProductToQuote = item => ({
  name: item.product.name,
  quantity: item.quantity,
  discount: 0,
  amountu: item.product.callamount,
  amount: item.product.callamount * item.quantity,
});

export const normalizeTableOportunity = data => ({
  id: data?.id,
  prospectId: data?.prospectId,
  name: `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname ? toUpperCaseChart(data?.prospect?.lastname) : ""
  }`,
  concept: data?.concept,
  correo: data?.prospect.email,
  certeza: data?.certainty + "%",
  phone: data?.prospect.phone,
  gender: data?.prospect.gender,
  job: data?.prospect.job,
  // 21/10/2022 se añadio categoria de interes
  category: toUpperCaseChart(data?.prospect?.category?.name),
  origin: replaceNull(data?.prospect?.origin?.name),
  company: data?.prospect?.clientcompany?.companyname,
  label: data?.prospect.prospectslabels.map(item => toUpperCaseChart(item.label.label)).join(", "),
  phase: toUpperCaseChart(replaceNull(data?.prospect?.phase?.name)),
  amount: formatNumber(data.amount),
  estimatedclossing: formatDate(data.estimatedclossing),
  createdAt: formatDate(data.createdAt),
});

export const normalizeTableDataOpotunity = data => {
  let ViewOportunity = {};
  ViewOportunity["id"] = data?.id;
  ViewOportunity["nombre"] = `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname && toUpperCaseChart(data?.prospect?.lastname)
  } `;
  ViewOportunity["correo"] = data?.prospect.email;
  ViewOportunity["télefono"] = data?.prospect.phone;
  ViewOportunity["monto"] = formatNumber(data.amount);
  ViewOportunity["certeza"] = data?.certainty + "%";
  ViewOportunity["categoría de interes"] = toUpperCaseChart(data?.prospect?.category?.name);
  ViewOportunity["concepto"] = data?.concept;
  ViewOportunity["tipo de cliente"] = toUpperCaseChart(data?.prospect?.clienttype?.name);
  ViewOportunity["fase"] = data?.phase;
  ViewOportunity["origen"] = replaceNull(data?.prospect?.origin?.name);
  ViewOportunity["género"] = data?.prospect.gender;
  ViewOportunity["puesto"] = data?.prospect.job;
  ViewOportunity["canal"] = data?.prospect?.channel?.name;
  // ViewOportunity["ejecutivo"] = data?.prospect?.ejecutive?.fullname;
  ViewOportunity["Empresa"] = data?.prospect?.clientcompany?.companyname;
  ViewOportunity["etiquetas"] = data?.prospect.prospectslabels
    ?.map(item => toUpperCaseChart(item.labelname))
    .join(", ");
  ViewOportunity["ultimo Seguimiento"] = data?.lastTracking?.observations;
  ViewOportunity["fecha de cierre"] = formatDate(data.estimatedclossing);
  ViewOportunity["fecha de creacion"] = formatDate(data.createdAt);
  ViewOportunity["prospectId"] = data?.prospectId;
  ViewOportunity.lastTrackingDate = data?.lastTrackingcreatedAt;
  ViewOportunity.itemBD = data?.prospect;
  ViewOportunity.itemBD.prospectId = data?.prospectId;
  ViewOportunity.rejected = data?.rejected;
  ViewOportunity.isimportant = data?.isimportant;
  ViewOportunity.isclient = data.prospect.isclient;
  ViewOportunity.isclientpotencial = data?.prospect?.isclientpotencial;
  ViewOportunity.phase = data?.phase;
  ViewOportunity.oportunityData = data;
  return ViewOportunity;
};
export const normalizeTableDataOpotunityAdmin = data => {
  let ViewOportunity = {};
  ViewOportunity["id"] = data?.id;
  ViewOportunity["nombre"] = `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname && toUpperCaseChart(data?.prospect?.lastname)
  } `;
  ViewOportunity["correo"] = data?.prospect.email;
  ViewOportunity["télefono"] = data?.prospect.phone;
  ViewOportunity["monto"] = formatNumber(data.amount);
  ViewOportunity["certeza"] = data?.certainty + "%";
  ViewOportunity["categoría de interes"] = toUpperCaseChart(data?.prospect?.category?.name);
  ViewOportunity["concepto"] = data?.concept;
  ViewOportunity["fase"] = data?.prospect?.phase;
  ViewOportunity["origen"] = replaceNull(data?.prospect?.origin?.name);
  ViewOportunity["género"] = data?.prospect.gender;
  ViewOportunity["puesto"] = data?.prospect.job;
  // ViewOportunity["ejecutivo"] = data?.prospect?.ejecutive?.fullname;
  ViewOportunity["Empresa"] = data?.prospect?.clientcompany?.companyname;
  // ViewOportunity["etiquetas"] = data?.prospect.prospectslabels
  //   .map((item) => toUpperCaseChart(item.label.label))
  //   .join(", ");
  ViewOportunity["web"] = data?.prospect?.url.slice(0, 40) + "...";
  ViewOportunity["facebook"] = data?.prospect?.facebook.slice(0, 40) + "...";
  ViewOportunity["google maps"] = data?.prospect?.location.slice(0, 40) + "...";
  ViewOportunity["fecha de cierre"] = formatDate(data.estimatedclossing);
  ViewOportunity["fecha de creacion"] = formatDate(data.createdAt);
  ViewOportunity["prospectId"] = data?.prospectId;
  ViewOportunity.lastTrackingDate = data?.lastTrackingcreatedAt;
  ViewOportunity.itemBD = data?.prospect;
  ViewOportunity.rejected = data?.rejected;
  ViewOportunity.isimportant = data?.isimportant;
  ViewOportunity.isclient = data.prospect.isclient;
  ViewOportunity.phase = data?.phase;
  return ViewOportunity;
};
export const normalizeTableDataOpotunityDiscarted = data => {
  let ViewOportunity = {};
  ViewOportunity["id"] = data?.id;
  ViewOportunity["nombre"] = `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname && toUpperCaseChart(data?.prospect?.lastname)
  } `;
  ViewOportunity["concepto"] = data?.concept;
  ViewOportunity["correo"] = data?.prospect.email;
  ViewOportunity["certeza"] = data?.certainty + "%";
  ViewOportunity["télefono"] = data?.prospect.phone;
  ViewOportunity["fecha de cierre"] = formatDate(data.estimatedclossing);
  ViewOportunity["fecha de creacion"] = formatDate(data.createdAt);
  ViewOportunity["prospectId"] = data?.prospectId;
  ViewOportunity.lastTrackingDate = data?.prospect?.lastTrackingcreatedAt;
  ViewOportunity.isclientpotencial = data?.prospect?.isclientpotencial;
  ViewOportunity.itemBD = data?.prospect;
  return ViewOportunity;
};

export const normalizeTableDataOpotunityDrDiscarted = data => {
  let ViewOportunity = {};
  ViewOportunity["id"] = data?.id;
  ViewOportunity["nombre"] = `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname && toUpperCaseChart(data?.prospect?.lastname)
  } `;
  ViewOportunity["correo"] = data?.prospect.email;
  ViewOportunity["télefono"] = data?.prospect.phone;
  ViewOportunity["monto"] = formatNumber(data.amount);
  ViewOportunity["certeza"] = data?.certainty + "%";
  ViewOportunity["categoría de interes"] = toUpperCaseChart(data?.prospect?.category?.name);
  ViewOportunity["concepto"] = data?.concept;
  ViewOportunity["fase"] = data?.prospect?.phase;
  ViewOportunity["ejecutivo"] = data?.prospect?.ejecutive?.fullname;
  ViewOportunity["ultimo Seguimiento"] = data?.lastTracking?.observations;
  ViewOportunity["razon de descarte"] = data?.discartedreason;
  ViewOportunity["fecha de descartado"] = `${formatDate(data?.deletedAt)}, ${formatHour(data?.deletedAt)}`;
  ViewOportunity.lastTrackingDate = data?.lastTrackingcreatedAt;
  ViewOportunity.itemBD = data?.prospect;
  ViewOportunity.rejected = data?.rejected;
  ViewOportunity.discarted = data?.discarted;
  ViewOportunity.isimportant = data?.isimportant;
  ViewOportunity.isclient = data.prospect.isclient;
  ViewOportunity.oportunityData = data;
  return ViewOportunity;
};
const replaceNull = value => {
  if (value === null || value === undefined) return "N/A";

  return value;
};

const replaceNullOrUndefinedWithZero = value => {
  return value == null ? "0" : value.toString();
};
export const normalizeLabels = data => {
  let labels = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let normalize = {};
    normalize.value = element?.id;
    normalize.label = element?.label;
    labels.push(normalize);
  }
  return labels;
};

export const normalizeAddProspect = formData => {
  let newProspect = {};
  newProspect.name = formData?.name?.toLowerCase();
  newProspect.lastname = formData?.lastName?.toLowerCase();
  newProspect.email = formData.email;
  newProspect.bidder = formData.bidder;
  newProspect.phone = formData.phone;
  newProspect.optionalphone = formData.phoneOptional;
  newProspect.street = formData?.street?.toLowerCase();
  newProspect.job = formData.job;
  newProspect.status = 1;
  newProspect.observations = formData.comment;
  newProspect.entityId = formData.entity;
  newProspect.ejecutiveId = formData.id_user;
  newProspect.url = formData.web;
  newProspect.location = formData.location;
  newProspect.facebook = formData.facebook;
  newProspect.title = formData.titulo;
  newProspect.product = formData.productCode;
  newProspect.postalId = formData.postalId;
  newProspect.phaseId = formData.phase.id;
  newProspect.originId = formData.origin.id;
  newProspect.clientTypeId = formData.client.id;
  if (formData.city !== null) {
    newProspect.cityId = formData.city;
  }
  if (formData.gender !== null) {
    newProspect.gender = formData.gender.label;
  }
  if (formData.categoryId !== null) {
    newProspect.categoryId = formData.categoryId.id;
  }
  if (formData.specialty !== null) {
    newProspect.specialtyId = formData.specialty?.id;
  }
  if (formData.channel !== null) {
    newProspect.channelId = formData.channel?.id;
  }

  if (formData.label.length >= 1) {
    newProspect.labels = formData.label;
  }
  if (formData.shared.length >= 1) {
    newProspect.sharedto = formData.shared;
  }
  // se agrego company 27/10/2022
  if (formData.company !== null) {
    newProspect.clientCompanyId = formData.clientCompanyId;
  }
  ///////////////

  return newProspect;
};

export const normalizeTableProspect = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];
    let normalize = {};
    normalize.id = element?.id;
    normalize.name = element?.name.slice(0, 1);
    normalize.name = `${toUpperCaseChart(element?.name)} ${element.lastname && toUpperCaseChart(element.lastname)} `;
    normalize.email = element?.email;
    normalize.movil = element?.phone;
    normalize.telefono = element?.optionalphone;
    // 21/10/2022 se añadio categoria de interes
    normalize.category = toUpperCaseChart(element?.category?.name);
    normalize.product = element?.product.slice(0, 40);
    normalize.genero = element?.gender;
    normalize.job = element?.job;
    // 27/10/2022 se agrego company
    normalize.company = toUpperCaseChart(element?.clientcompany?.companyname);
    normalize.observations = element?.observations.slice(0, 40);
    normalize.codepostal = element?.postal?.postal_code;
    normalize.entity = element?.entity?.name;
    normalize.city = element?.city?.name;
    normalize.settlement = element?.postal?.settlement;
    normalize.street = element?.street;
    normalize.ejecutivo = element?.ejecutive?.name;
    normalize.clienttype = element?.clienttype?.name;
    normalize.phase = toUpperCaseChart(element?.phase?.name);
    normalize.origin = element?.origin?.name;
    normalize.label = element?.prospectslabels.map(item => toUpperCaseChart(item.label.label)).join();
    normalize.title = element?.title;
    normalize.specialty = element?.specialty?.name;
    normalize.web = element?.url.slice(0, 40) + "...";
    normalize.facebook = element?.facebook.slice(0, 40) + "...";
    normalize.location = element?.location.slice(0, 40) + "...";
    normalize.created = formatDate(element?.createdAt);
    normalize.updated = formatDate(element?.updatedAt);
    normalize.viewed = element?.viewed;
    // se agregan estos datos para crear pendientes 31/10/2022
    normalize.status = element?.status;
    normalize.lastTrackingcreatedAt = formatDate(element?.lastTrackingcreatedAt);
    normalize.phaseId = element?.phase?.id;
    //
    newProspect.push(normalize);
  }
  return newProspect;
};

export const normalizeTableDataProspect = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];

    let normalize = {};
    normalize["id"] = element?.id;
    normalize.nombre = element?.name.slice(0, 1);
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    } `;
    normalize["correo"] = element?.email;
    normalize["movil"] = element?.phone;
    normalize["teléfono"] = element?.optionalphone;
    normalize["especialidad"] = element?.specialty?.name;
    normalize["categoria de interés"] = toUpperCaseChart(element?.category?.name);
    normalize["código de producto"] = element?.product.slice(0, 40);
    normalize["tipo de cliente"] = toUpperCaseChart(element?.clienttype?.name);
    normalize["género"] = element?.gender;
    normalize["puesto"] = element?.job;
    normalize["estado"] = element?.entity;
    normalize["comentarios"] = element?.observations.slice(0, 40);
    normalize["colonia"] = element?.postal?.settlement;
    normalize["calle"] = element?.street;
    normalize["ejecutivo"] = element?.ejecutive?.fullname;
    normalize["título"] = element?.title;
    normalize["canal"] = element?.channel?.name;
    normalize["web"] = element?.url.slice(0, 40) + "...";
    normalize["facebook"] = element?.facebook.slice(0, 40) + "...";
    normalize["google maps"] = element?.location.slice(0, 40) + "...";
    normalize["fecha de creación"] = formatDate(element?.createdAt);
    normalize["ultima actualización"] = formatDate(element?.updatedAt);
    normalize["codigo postal"] = element?.postal?.postal_code;
    normalize.lastTrackingDate = element.lastTrackingcreatedAt;
    normalize.createdAt = element.createdAt;
    normalize.viewed = element?.viewed;
    normalize.phase = element?.phase;
    normalize.itemBD = element;
    newProspect.push(normalize);
  }
  return newProspect;
};

export const normalizeTableRecepcion = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize.nombre = element?.name.slice(0, 1);
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    } `;
    normalize["correo"] = element?.email;
    normalize["movil"] = element?.phone;
    newProspect.push(normalize);
    normalize["ejecutivo"] = toUpperCaseChart(element?.ejecutive?.fullname);
    normalize["categoria de interés"] = toUpperCaseChart(element?.category?.name);
    normalize["tipo de cliente"] = toUpperCaseChart(element?.clienttype?.name);
    normalize["origen"] = toUpperCaseChart(element?.origin?.name);
    normalize["estado"] = toUpperCaseChart(element?.entity?.name);
    normalize["comentarios"] = element?.observations.slice(0, 40);
    normalize["canal"] = element?.channel?.name;
    normalize["fecha de creación"] = formatDate(element?.createdAt);
    normalize.itemBD = element;
  }
  return newProspect;
};
export const normalizeTableDataProspectDr = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize.nombre = element?.name.slice(0, 1);
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    } `;
    normalize["correo"] = element?.email;
    normalize["movil"] = element?.phone;
    normalize["teléfono"] = element?.optionalphone;
    normalize["categoria de interés"] = toUpperCaseChart(element?.category?.name);
    normalize["código de producto"] = element?.product.slice(0, 40);
    normalize["género"] = element?.gender;
    normalize["puesto"] = element?.job;
    normalize["ejecutivo"] = element?.ejecutive?.name;
    normalize["estado"] = element?.entity;
    normalize["codigo postal"] = element?.postal?.postal_code;
    normalize["colonia"] = element?.postal?.settlement;
    normalize["calle"] = element?.street;
    normalize["comentarios"] = element?.observations.slice(0, 40);
    normalize["título"] = element?.title;
    normalize["canal"] = element?.channel?.name;
    normalize["web"] = element?.url.slice(0, 40) + "...";
    normalize["facebook"] = element?.facebook.slice(0, 40) + "...";
    normalize["google maps"] = element?.location.slice(0, 40) + "...";
    normalize["ultimo seguimiento"] = element?.lastTracking?.observations;
    normalize["fecha de creación"] = formatDate(element?.createdAt);
    normalize["ultima actualización"] = formatDate(element?.updatedAt);
    normalize.lastTrackingDate = element.lastTrackingcreatedAt;
    normalize.createdAt = element.createdAt;
    normalize.viewed = element?.viewed;
    normalize.itemBD = element;
    normalize.itemBD.prospectId = element?.id;
    normalize.phase = element?.phase;
    newProspect.push(normalize);
  }
  return newProspect;
};

export const normalizeTableDataProspectDrDiscarted = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];

    let normalize = {};
    normalize["id"] = element?.id;
    normalize.nombre = element?.name.slice(0, 1);
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    } `;
    normalize["correo"] = element?.email;
    normalize["movil"] = element?.phone;
    normalize["teléfono"] = element?.optionalphone;
    normalize["ejecutivo"] = element?.ejecutive?.name;
    normalize["ultimo seguimiento"] = element?.lastTracking?.observations;
    normalize["razon de descarte"] = element?.discartedreason;
    normalize["fecha de descartado"] = `${formatDate(element?.deletedAt)}, ${formatHour(element?.deletedAt)}`;
    normalize.lastTrackingDate = element.lastTrackingcreatedAt;
    normalize.createdAt = element.createdAt;
    normalize.viewed = element?.viewed;
    normalize.itemBD = element;
    newProspect.push(normalize);
  }
  return newProspect;
};
export const normalizeTableDataProspectDiscarted = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    }`;
    normalize["correo"] = element?.email;
    normalize["motivo de descarte"] = element?.discartedreason;
    normalize["movil"] = element?.phone;
    // 21/10/2022 se añadio categoria de interes
    // normalize["Etiquetas"] = element?.prospectslabels.map(item => toUpperCaseChart(item.labelname)).join();
    normalize["categoría de interés"] = toUpperCaseChart(element?.category?.name);
    normalize["código de producto"] = element?.product.slice(0, 40);
    normalize["fecha de descartado"] = `${formatDate(element?.deletedAt)}, ${formatHour(element?.deletedAt)}`;
    normalize.viewed = element?.viewed;
    normalize.lastTrackingDate = element.lastTrackingcreatedAt;
    newProspect.push(normalize);
  }
  return newProspect;
};
export const normalizeProspectEdit = (formData, prospectEdit) => {
  //edicion de normalize 21/10/2022 erik
  let putProspect = {};
  putProspect.name = formData?.name?.toLowerCase();
  putProspect.lastname = formData?.lastname?.toLowerCase();
  putProspect.email = formData.email;
  putProspect.phone = formData.phone;
  putProspect.street = formData?.street?.toLowerCase();
  putProspect.job = formData.job;
  putProspect.observations = formData.comment;
  putProspect.entityId = formData.entity;
  putProspect.clientTypeId = formData.client;
  putProspect.url = formData.web;
  putProspect.facebook = formData.facebook;
  putProspect.location = formData.location;
  putProspect.title = formData.title;
  putProspect.product = formData.productCode;
  putProspect.optionalphone = formData.phoneOptional;
  putProspect.originId = formData.origin;
  putProspect.phaseId = formData.phase;
  putProspect.cityId = formData.city;
  putProspect.specialtyId = formData.specialty;
  putProspect.gender = formData.gende;
  putProspect.sharedto = formData.sharedto;
  putProspect.ejecutiveId = formData.ejecutiveId;
  putProspect.fullname = `${formData?.name.toLowerCase()} ${formData.lastname.toLowerCase()}`;
  putProspect.channelId = formData.channelId;
  if (formData.categoryId !== null) {
    putProspect.categoryId = formData.categoryId;
  } else {
    putProspect.categoryId = "";
  }
  // se agrego company 27/10/2022
  if (formData.clientCompanyId !== null) {
    putProspect.clientCompanyId = formData.clientCompanyId;
  }
  return putProspect;
};

export const normalizeTableProspectDiscarted = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];
    let normalize = {};
    normalize.id = element?.id;
    normalize.name = `${toUpperCaseChart(element?.name)} ${element.lastname && toUpperCaseChart(element.lastname)}`;
    normalize.email = element?.email;
    normalize.movil = element?.phone;
    // 21/10/2022 se añadio categoria de interes
    normalize.category = toUpperCaseChart(element?.category?.name);
    normalize.product = element?.product.slice(0, 40);
    normalize.discarted = `${formatDate(element?.deletedAt)}, ${formatHour(element?.deletedAt)}`;
    normalize.viewed = element?.viewed;
    newProspect.push(normalize);
  }
  return newProspect;
};

export const normalizeTableOportunityClient = data => ({
  id: data?.id,
  name: `${toUpperCaseChart(data?.name)} ${data?.lastname ? toUpperCaseChart(data?.lastname) : ""}`,
  correo: data?.email,
  phone: data?.phone,
  gender: data?.gender,
  job: data?.job,
  company: data?.company,
  observations: data?.observations,
  codepostal: data?.postal.postal_code,
  entity: data?.entity?.name,
  city: data?.city?.name,
  settlement: data?.postal?.settlement,
  street: data?.street,
  Fase: data?.phase?.name,
  labels: data?.prospectslabels.map(item => toUpperCaseChart(item.label.label)).join(", "),
  origen: data?.origin?.name,
  titulo: data?.title,
  specialty: data?.specialty?.name,
  createdAt: `${formatDate(data?.createdAt)}`,
});

export const normalizeTableClientSales = data => ({
  id: data?.id,
  prospectId: data?.prospectId,
  name: `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname ? toUpperCaseChart(data?.prospect?.lastname) : ""
  }`,
  correo: data?.prospect.email,
  amount: formatNumber(data?.amount),
  comission: formatNumber(data?.comission),
  certeza: data?.certainty + "%",
  phone: data?.prospect.phone,
  gender: data?.prospect.gender,
  job: data?.prospect.job,
  // 21/10/2022 se añadio categoria de interes
  category: toUpperCaseChart(data?.prospect?.category?.name),
  origin: data?.prospect.origin?.name,
  company: data?.prospect?.clientcompany?.companyname,
  labels: data?.prospect.prospectslabels.map(item => toUpperCaseChart(item.label.label)).join(", "),
  Fase: data?.prospect.phase?.name,
  estimatedclossing: formatDate(data?.estimatedclossing),
  soldat: formatDate(data?.soldat),
});
export const normalizeTableClients = element => {
  let ViewClient = {};
  ViewClient["id"] = element?.id;
  ViewClient["nombre"] = `${toUpperCaseChart(element?.name)} ${
    element?.lastname && toUpperCaseChart(element?.lastname)
  } `;
  ViewClient["correo"] = element?.email;
  ViewClient["movil"] = element?.phone;
  ViewClient["télefono"] = element?.optionalphone;
  ViewClient["categoría de interes"] = toUpperCaseChart(element?.category?.name);
  ViewClient["género"] = element?.gender;
  ViewClient["puesto"] = element?.job;
  ViewClient["empresa"] = element?.clientcompany?.companyname;
  ViewClient["comentarios"] = element?.observations.slice(0, 40);
  ViewClient["codigo postal"] = element?.postal?.postal_code;
  ViewClient["estado"] = element?.entity;
  ViewClient["ciudad"] = element?.city?.name;
  ViewClient["colonia"] = element?.postal?.settlement;
  ViewClient["calle"] = element?.street;
  ViewClient["ejecutivo"] = element?.ejecutive?.name;
  ViewClient["tipo de cliente"] = element?.clienttype?.name;
  ViewClient["fase"] = element?.phase;
  ViewClient["origen"] = element?.origin?.name;
  ViewClient["título"] = element?.title;
  ViewClient["canal"] = element?.channel?.name;
  ViewClient["especialidad"] = element?.specialty?.name;
  ViewClient["web"] = element?.url.slice(0, 40) + "...";
  ViewClient["facebook"] = element?.facebook.slice(0, 40) + "...";
  ViewClient["google maps"] = element?.location.slice(0, 40) + "...";
  ViewClient["fecha de creación"] = formatDate(element?.createdAt);
  ViewClient["fecha de descarte"] = formatDate(element?.deletedAt);
  ViewClient["ultima actualización"] = formatDate(element?.updatedAt);
  ViewClient["fecha Conversión cliente"] = formatDate(element?.clientat);
  ViewClient["código de producto"] = element?.product?.slice(0, 40);
  ViewClient.lastTrackingDate = element?.lastTrackingcreatedAt;
  ViewClient.phase = element?.phase;
  ViewClient.itemBD = element;
  return ViewClient;
};
export const normalizeTableClientsDiscarted = element => {
  let ViewClient = {};
  ViewClient["id"] = element?.id;
  ViewClient["nombre"] = `${toUpperCaseChart(element?.name)} ${
    element?.lastname && toUpperCaseChart(element?.lastname)
  } `;
  ViewClient["correo"] = element?.email;
  ViewClient["télefono"] = element?.phone;
  ViewClient["categoría de interes"] = toUpperCaseChart(element?.category?.name);
  ViewClient["ejecutivo"] = element?.ejecutive?.name;
  ViewClient["razon de descarte"] = element?.discartedreason;
  ViewClient["fecha de descarte"] = formatDate(element?.deletedAt);
  ViewClient.lastTrackingDate = element.lastTrackingcreatedAt;
  ViewClient.phase = element?.phase;
  ViewClient.itemBD = element;
  return ViewClient;
};
export const normalizeTableClientsAdminSale = element => {
  let ViewClient = {};
  ViewClient["id"] = element?.id;
  ViewClient["nombre"] = `${toUpperCaseChart(element?.name)} ${
    element?.lastname && toUpperCaseChart(element?.lastname)
  } `;
  ViewClient["correo"] = element?.email;
  ViewClient["télefono"] = element?.phone;
  ViewClient["categoría de interes"] = toUpperCaseChart(element?.category?.name);
  ViewClient["género"] = element?.gender;
  ViewClient["puesto"] = element?.job;
  ViewClient["empresa"] = element?.clientcompany?.companyname;
  ViewClient["comentarios"] = element?.observations.slice(0, 40);
  ViewClient["codigo postal"] = element?.postal?.postal_code;
  ViewClient["estado"] = element?.entity;
  ViewClient["ciudad"] = element?.city?.name;
  ViewClient["colonia"] = element?.postal?.settlement;
  ViewClient["calle"] = element?.street;
  ViewClient["ejecutivo"] = element?.ejecutive?.name;
  ViewClient["tipo de cliente"] = element?.clienttype?.name;
  ViewClient["fase"] = element?.phase;
  ViewClient["origen"] = element?.origin?.name;
  ViewClient["título"] = element?.title;
  ViewClient["especialidad"] = element?.specialty?.name;
  ViewClient["web"] = element?.url.slice(0, 40) + "...";
  ViewClient["facebook"] = element?.facebook.slice(0, 40) + "...";
  ViewClient["google maps"] = element?.location.slice(0, 40) + "...";
  ViewClient["fecha de creación"] = formatDate(element?.createdAt);
  ViewClient["fecha de descarte"] = formatDate(element?.deletedAt);
  ViewClient["ultima actualización"] = formatDate(element?.updatedAt);
  ViewClient.lastTrackingDate = element.lastTrackingcreatedAt;
  ViewClient.phase = element?.phase;
  ViewClient.itemBD = element;
  return ViewClient;
};
export const normalizeTableDataSales = data => {
  let ViewSales = {};
  ViewSales["id"] = data?.id;
  ViewSales["nombre"] = `${toUpperCaseChart(data?.prospect?.name)} ${
    data?.prospect?.lastname && toUpperCaseChart(data?.prospect?.lastname)
  } `;
  ViewSales["concepto"] = data?.concept;
  ViewSales["motivo de descarte"] = data?.discartedreason;
  ViewSales["correo"] = data?.prospect?.email;
  ViewSales["monto total"] = formatNumber(data?.amount);
  ViewSales["comisión total"] = formatNumber(data?.comission);
  ViewSales["certeza"] = data?.certainty + "%";
  ViewSales["télefono"] = data?.prospect?.phone;
  ViewSales["género"] = data?.prospect?.gender;
  ViewSales["puesto"] = data?.prospect?.job;
  ViewSales["categoría de interés"] = toUpperCaseChart(data?.prospect?.category?.name);
  ViewSales["origen"] = data?.prospect?.origin?.name;
  ViewSales["empresa"] = data?.prospect?.clientcompany?.companyname;
  ViewSales["fase"] = data?.phase;
  ViewSales["ultimo seguimiento"] = data?.lastTracking?.observations;
  ViewSales["fecha de descarte"] = formatDate(data?.deletedAt);
  ViewSales["fecha de cierre"] = formatDate(data?.estimatedclossing);
  ViewSales["fecha de venta"] = formatDate(data?.soldat);
  ViewSales["prospectId"] = data?.prospectId;
  ViewSales.isorder = data?.isorder;
  ViewSales.lastTrackingDate = data?.lastTrackingcreatedAt;
  ViewSales.itemBD = data?.prospect;
  ViewSales.phase = data?.phase;
  ViewSales.saleData = data;
  return ViewSales;
};

export const normalizeTableDataOrders = data => {
  let newProspect = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    let ViewOrder = {};
    ViewOrder["id"] = element?.id;
    ViewOrder["nombre"] = `${toUpperCaseChart(element?.oportunity?.prospect?.name)} ${
      element?.oportunity?.prospect?.lastname && toUpperCaseChart(element?.oportunity?.prospect?.lastname)
    }`;
    ViewOrder["folio"] = element?.folio;
    ViewOrder["total"] = formatNumber(element?.total);
    ViewOrder["estado"] = element?.orderstatus;
    ViewOrder["télefono Envio"] = element?.phone;
    ViewOrder["Estado Envio"] = element?.address?.entity?.name;
    ViewOrder["Municipio Envio"] = element?.address?.city?.name;
    ViewOrder["factura"] = element?.billing ? "con factura" : "sin factura";
    ViewOrder["Cuenta de pago"] = element?.paymentaccount?.name;
    ViewOrder["uso de CFDI"] = element?.bill?.cfdi?.name;
    ViewOrder["Metodo de Pago"] = element?.bill?.paymentmethod?.name;
    ViewOrder["Forma de Pago"] = element?.bill?.paymentway?.name;
    ViewOrder["observaciones Generales"] = toUpperCaseChart(element?.observations);
    ViewOrder["Fecha De Creación"] = formatDate(element?.createdAt);
    ViewOrder["Fecha De Actualización"] = formatDate(element?.updatedAt);
    ViewOrder["prospectId"] = element?.oportunity?.prospect?.id;
    ViewOrder["orderId"] = element?.id;
    ViewOrder["phase"] = element?.oportunity?.phase;
    ViewOrder.createdAt = element.createdAt;
    ViewOrder.lastTrackingDate = element?.oportunity?.prospect?.lastTrackingcreatedAt;
    ViewOrder.data = element;
    ViewOrder.oportunityData = element?.oportunity;
    ViewOrder.itemBD = element?.oportunity?.prospect;

    newProspect.push(ViewOrder);
  }
  return newProspect;
};
export const normalizeTableDataOrdersDiscarted = data => {
  let newProspect = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let ViewOrder = {};
    ViewOrder["id"] = element?.id;
    ViewOrder["nombre"] = `${toUpperCaseChart(element?.oportunity?.prospect?.name)} ${
      element?.oportunity?.prospect?.lastname && toUpperCaseChart(element?.oportunity?.prospect?.lastname)
    } `;
    ViewOrder["folio"] = element?.folio;
    ViewOrder["total"] = formatNumber(element?.total);
    ViewOrder["estado"] = element?.orderstatus;
    ViewOrder["télefono envio"] = element?.phone;
    ViewOrder["Estado Envio"] = element?.address?.entity?.name;
    ViewOrder["Municipio Envio"] = element?.address?.city?.name;
    ViewOrder["Codigo Postal Envio"] = element?.address?.postal?.postal_code;
    ViewOrder["factura"] = element?.billing ? "con factura" : "sin factura";
    ViewOrder["uso de CFDI"] = element?.cfdi?.name;
    ViewOrder["Metodo de Pago"] = element?.paymentmethod?.name;
    ViewOrder["Forma de Pago"] = element?.paymentway?.name;
    ViewOrder["observaciones Generales"] = toUpperCaseChart(element?.observations);
    ViewOrder["Fecha De Descartado"] = formatDate(element?.deletedAt);
    ViewOrder["Fecha De Actualización"] = formatDate(element?.updatedAt);
    ViewOrder.lastTrackingDate = element?.oportunity?.prospect?.lastTrackingcreatedAt;
    ViewOrder.data = element;
    ViewOrder.createdAt = element.createdAt;
    newProspect.push(ViewOrder);
  }
  return newProspect;
};

export const normalizeTableProduct = products => {
  let newProduct = [];
  for (let i = 0; i < products.length; i++) {
    const element = products[i];

    let normalize = {};
    normalize.id = element?.id;
    normalize.code = element?.code;
    normalize.name = `${toUpperCaseChart(element?.name)} `;
    normalize.category = `${toUpperCaseChart(element?.category?.name)}`;
    normalize.brand = `${toUpperCaseChart(element?.brand?.name)}`;
    normalize.providerId = `${toUpperCaseChart(element?.provider?.companyname)}`;
    normalize.amount = `${formatNumber(element?.amount)}`;
    normalize.storeamount = `${formatNumber(element?.storeamount)}`;
    normalize.callamount = `${formatNumber(element?.callamount)}`;
    normalize.import = element?.import ? "Si" : "No";
    normalize.description = element?.description;
    newProduct.push(normalize);
  }
  return newProduct;
};

export const normalizeAddProduct = formData => {
  let newProduct = {};
  newProduct.code = formData?.code;
  newProduct.name = formData?.name;
  newProduct.categoryId = formData?.category;
  newProduct.brandId = formData?.brand;
  newProduct.providerId = formData?.provider;
  newProduct.producttypeId = formData?.productstype;
  newProduct.amount = formData?.amount;
  newProduct.storeamount = formData?.storeamount;
  newProduct.callamount = formData?.callamount;
  newProduct.description = formData?.description;
  newProduct.import = formData?.import;
  newProduct.isactive = formData?.isactive;
  newProduct.ispackage = formData?.ispackage;
  return newProduct;
};

export const normalizePutProduct = formData => {
  let putProduct = {};
  putProduct.code = formData.code;
  putProduct.name = formData.name;
  putProduct.categoryId = formData.category;
  putProduct.brandId = formData.brand;
  putProduct.providerId = formData.provider;
  putProduct.producttypeId = formData.productstype;
  putProduct.amount = formData.amount;
  putProduct.storeamount = formData.storeamount;
  putProduct.callamount = formData.callamount;
  putProduct.description = formData.description;
  putProduct.import = formData.import;
  putProduct.isactive = formData?.isactive;
  putProduct.ispackage = formData?.ispackage;
  return putProduct;
};

export const normalizeNewUser = user => {
  let dataUser = {};
  dataUser.name = user.name.toLowerCase();
  dataUser.lastname = user.lastname.toLowerCase();
  dataUser.username = user.username;
  dataUser.phone = user.phone;
  dataUser.optionalphone = user.opphone;
  dataUser.email = user.email;
  dataUser.password = user.password;
  dataUser.groupId = user.group;
  dataUser.roleId = user.rol;
  dataUser.warehouseId = user.warehouse;
  dataUser.companyId = user.companyId;
  dataUser.title = user.title.toLowerCase();
  dataUser.permissions = {
    Empresa: user.company,
    Crearetiquetas: user.label,
    Plantillas: user.templates,
    Campanasdecomunicacion: user.companyComunications,
    Documentos: user.documents,
    Mantenimiento: user.maintenance,
    Descuentos: user.discounts,
    ModificarPrecio: user.editPrice,
    Etiquetar: user.tagging,
    Importar: user.import,
    Exportar: user.export,
    Reasignar: user.reasign,
    CompartirContactos: user.shareContacts,
    Facturar: user.checkin,
    Cancelarfactura: user.checkinCancel,
  };
  return dataUser;
};
export const normalizeEditUser = user => {
  let userData = {};
  userData.name = user.name.toLowerCase();
  userData.lastname = user.lastname.toLowerCase();
  userData.username = user.username;
  userData.phone = user.phone;
  userData.email = user.email;
  userData.optionalphone = user.optionalphone;
  userData.groupId = user.group;
  userData.roleId = user.role;
  userData.title = user.title.toLowerCase();
  userData.warehouseId = user.warehouse;
  return userData;
};
// export const normalizeEditProspect = (prospect) => {
//   let prospect = {};

//   return prospect;
// };
export const normalizeEditUserPermissions = user => {
  let userPermissions = {};
  userPermissions.ejecutiveId = user.idUser;
  userPermissions.permissions = {
    Empresa: user.company,
    Crearetiquetas: user.label,
    Plantillas: user.templates,
    Campanasdecomunicacion: user.companyComunications,
    Documentos: user.documents,
    Mantenimiento: user.maintenance,
    Descuentos: user.discounts,
    ModificarPrecio: user.editPrice,
    Etiquetar: user.tagging,
    Importar: user.import,
    Exportar: user.export,
    Reasignar: user.reasign,
    CompartirContactos: user.shareContacts,
    Facturar: user.checkin,
    Cancelarfactura: user.checkinCancel,
  };
  return userPermissions;
};
export const normalizeDataCalendaryEjecutive = pendigns => {
  let events = [];
  for (let i = 0; i < pendigns.length; i++) {
    let event = {};
    const element = pendigns[i];
    event.id = element.id;
    event.title = element.subject;
    event.start = new Date(element.date_from);
    event.event = element;
    if (element.date_to) {
      event.end = new Date(element.date_to);
    } else {
      event.end = new Date(element.date_from);
    }
    events.push(event);
  }
  return events;
};
export const normalizesalesEjecutive = data => ({
  name: `${toUpperCaseChart(data.name + " " + data.lastname)}`,
  totalAmount: `${formatNumber(data.totalAmount)}`,
});
export const normalizeTableDataProspectReportst = element => {
  let normalize = {};
  normalize["id"] = element?.id;
  normalize.nombre = element?.name.slice(0, 1);
  normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${element.lastname && toUpperCaseChart(element.lastname)} `;
  normalize["correo"] = element?.email;
  normalize["movil"] = element?.phone;
  normalize["teléfono"] = element?.optionalphone;
  normalize["categoria de interés"] = toUpperCaseChart(element?.category?.name);
  normalize["código de producto"] = element?.product.slice(0, 40);
  normalize["género"] = element?.gender;
  normalize["puesto"] = element?.job;
  normalize["empresa"] = element?.clientcompany?.company;
  normalize["comentarios"] = element?.observations.slice(0, 40);
  normalize["codigo postal"] = element?.postal?.postal_code;
  normalize["estado"] = element?.entity;
  normalize["ciudad"] = element?.city?.name;
  normalize["colonia"] = element?.postal?.settlement;
  normalize["calle"] = element?.street;
  normalize["tipo de cliente"] = element?.clienttype?.name;
  normalize["fase"] = element?.phase;
  normalize["origen"] = element?.origin?.name;

  normalize["título"] = element?.title;
  normalize["especialidad"] = element?.specialty?.name;
  normalize["web"] = element?.url.slice(0, 40) + "...";
  normalize["facebook"] = element?.facebook.slice(0, 40) + "...";
  normalize["google maps"] = element?.location.slice(0, 40) + "...";
  normalize["fecha de creación"] = formatDate(element?.createdAt);
  normalize["ultima actualización"] = formatDate(element?.updatedAt);
  normalize.lastTrackingDate = element.lastTrackingcreatedAt;
  normalize.createdAt = element.createdAt;
  normalize.viewed = element?.viewed;
  normalize.itemBD = element;

  return normalize;
};

export const normalizeActivities = activities => {
  let newActivities = [];
  for (let i = 0; i < activities?.length; i++) {
    const element = activities[i];
    let normalize = {};
    normalize.fecha = `${formatDatecomplete(element?.createdAt)}`;
    normalize.nameprospect = `${toUpperCaseChart(element?.prospect?.name)} ${
      element.prospect?.lastname && toUpperCaseChart(element.prospect?.lastname)
    }`;
    normalize.ejecutive = `${toUpperCaseChart(element?.ejecutive?.name)} ${
      element.ejecutive?.lastname && toUpperCaseChart(element.ejecutive?.lastname)
    }`;
    normalize.typetracking = element?.action?.name;
    normalize.observations = element?.observations;
    normalize.prospect = element?.prospect;
    newActivities.push(normalize);
  }
  return newActivities;
};

export const normalizeExecutives = executives => {
  let newActivities = [];
  let totalLeads = 0;
  let totalCotizado = 0;
  let totalVentas = 0;
  let LeadsAnteriores = 0;
  let LeadsMensual = 0;

  // Estructura de normalizacion
  //   {
  //     "id": "mqrXbWGqIKbgvB3emabOjuCs",
  //     "fullname": "ademo2 demo2",
  //     "email": "demo2@gmail.com",
  //     "Total Leads": "1",
  //     "Lead Anteriores": "1",
  //     "Lead Mensual": "0",
  //     "Total Oportunidades": "1",
  //     "Oportunidades Anteriores": "1",
  //     "Oportunidades Mensual": "0",
  //     "Clientes": "0"
  // }
  for (let i = 0; i < executives?.length; i++) {
    const element = executives[i];

    console.log(element);
    let normalize = {};
    normalize.nombre = `${i + 1}- ${toUpperCaseChart(element?.fullname)}`;
    normalize.LeadsAnteriores = element?.["Lead Anteriores"];
    normalize.LeadsMensual = element?.["Lead Mensual"];
    normalize.TotalLeads = element?.["Total Leads"];

    normalize.OportunidadesAnteriores = element?.["Oportunidades Anteriores"];
    normalize.OportunidadesMensual = element?.["Oportunidades Mensual"];
    normalize.Oportunidades = element?.["Total Oportunidades"];
    normalize.Clientes = element?.["Clientes"];

    totalLeads += +element?.["Total Leads"];
    totalCotizado += +element?.["Total Oportunidades"];
    totalVentas += +element?.["Clientes"];
    // normalize.Cotizado = element?.Oportunidades;
    // normalize.Ventas = element?.Ventas;
    LeadsAnteriores += +Number(element?.["Lead Anteriores"]);
    LeadsMensual = +Number(element?.["Lead Mensual"]);
    totalCotizado += +element?.Oportunidades;
    newActivities.push(normalize);
  }

  return newActivities;
};

export const normalizeEjecutives = (normalizeby, results) => {
  switch (normalizeby) {
    case "Monto Vendido":
      let dataTable = [];
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};

        dataNormalized["nombre"] = ejecutive.fullname;
        dataNormalized["Monto Vendido"] = formatNumber(ejecutive.totalAmount);
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }

      return dataTable;

    default:
      break;
  }
};

// * ------------------ DIRECTOR
export const normalizeGroupsDR = values => {
  let newGroups = [];
  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["nombre"] = element?.name;
    normalize["Monto Vendido"] = formatNumber(element?.totalAmount);
    normalize["Total Prospectos"] = element?.totalProspects;
    normalize["Total Oportunidades"] = element?.totalQuotes;
    normalize["Total Clientes"] = element?.totalClients;
    normalize.itemBD = element;
    newGroups.push(normalize);
  }
  return newGroups;
};

export const normalizeExecutivesDR = values => {
  let newGroups = [];
  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["ejecutivo"] = element?.name;
    normalize["cotizado"] = `${formatNumber(element?.totalAmount)} | %${element?.totalAmount}`;
    normalize["esperando aprobacion"] = element?.totalProspects;
    normalize["pospuesta"] = element?.totalQuotes;
    normalize["total"] = element?.totalClients;
    normalize.itemBD = element;
    newGroups.push(normalize);
  }
  return newGroups;
};

export const normalizeExecutivesPhases = values => {
  let newGroups = [];
  for (let i = 0; i < values.length; i++) {
    const element = values[i];

    let normalize = {};

    normalize["id"] = element?.id;
    normalize["ejecutivo"] = element?.fullname;
    normalize["cotizado"] = element?.phases[2]?.totalProspects;
    normalize["esperando aprobacion"] = element?.phases[5]?.totalProspects;
    normalize["pospuesto"] = element?.phases[8]?.totalProspects;

    normalize["total"] =
      Number(element?.phases[2]?.totalProspects) +
      Number(element?.phases[5]?.totalProspects) +
      Number(element?.phases[8]?.totalProspects);

    normalize.itemBD = element;
    newGroups.push(normalize);
  }
  return newGroups;
};

const validateClientsGender = (genderFilter, clients) => {
  if (clients.length > 0) {
    let filterByGender = clients.filter(item => item.gender === genderFilter);
    if (filterByGender.length > 0) {
      let formatTotal = filterByGender[0].totalClients;
      return formatTotal;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export const normalizeExportExecutives = (normalizeby, data) => {
  let dataTable = [];
  switch (normalizeby) {
    case "bysales":
      data.forEach((item, index) => {
        let value = {};

        value.NOMBRE = data[index]?.fullname;
        value.CORREO = data[index]?.email;
        value.GRUPO = data[index]?.group?.name;
        value.MONTO = formatNumber(data[index]?.totalAmount);

        dataTable.push(value);
      });
      return dataTable;
    case "byoportunities":
      data.forEach((item, index) => {
        let value = {};

        value.NOMBRE = data[index]?.fullname;
        value.CORREO = data[index]?.email;
        value.USUARIO = data[index]?.username;
        value.MONTO = formatNumber(data[index]?.totalAmount);

        value.OPORTUNIDADES = data[index]?.totalOportunities;

        dataTable.push(value);
      });
      return dataTable;

    case "byprospects":
      data.forEach((item, index) => {
        let value = {};

        value.NOMBRE = data[index]?.fullname;
        value.CORREO = data[index]?.email;
        value.USUARIO = data[index]?.username;

        value.PROSPECTOS = data[index]?.totalProspects;

        dataTable.push(value);
      });
      return dataTable;

    case "byprospectsnotviewed":
      data.forEach((item, index) => {
        let value = {};

        value.NOMBRE = data[index]?.fullname;
        value.CORREO = data[index]?.email;
        value.USUARIO = data[index]?.username;

        value.NOVISTOS = data[index]?.totalProspects;

        dataTable.push(value);
      });
      return dataTable;

    case "bypending":
      data.forEach((item, index) => {
        let value = {};

        value.NOMBRE = data[index]?.fullname;
        value.CORREO = data[index]?.email;
        value.TELEFONO = data[index]?.phone;
        value.USUARIO = data[index]?.username;
        value["Pendientes Incompletos"] = data[index]?.totalPendings;
        value["Pendientes Completados"] = data[index]?.totalPendingsCustom;
        value["Total de Pendientes"] =
          parseInt(data[index]?.totalPendings) + parseInt(data[index]?.totalPendingsCustom);

        dataTable.push(value);
      });
      return dataTable;

    default:
      data.forEach((item, index) => {
        let value = {};

        value.NOMBRE = data[index]?.fullname;
        value.CORREO = data[index]?.email;
        value.TELEFONO = data[index]?.phone;
        value.USUARIO = data[index]?.username;
        value.GRUPO = data[index]?.group?.name;

        dataTable.push(value);
      });
      return dataTable;
  }
};

export const normalizeEjecutivesDir = (normalizeby, results) => {
  let dataTable = [];
  switch (normalizeby) {
    case "byoportunities":
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};
        dataNormalized["Nombre"] = ejecutive.fullname;
        dataNormalized["Monto Cotizado"] = formatNumber(ejecutive.totalAmount);
        dataNormalized["Total de Oportunidades"] = Number(ejecutive.totalOportunities);
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }
      return dataTable;
    case "bysales":
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};
        dataNormalized["Nombre"] = ejecutive.fullname;
        dataNormalized["Monto Vendido"] = formatNumber(ejecutive.totalAmount);
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }
      return dataTable;
    case "byprospects":
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};
        dataNormalized["Nombre"] = ejecutive.fullname;
        dataNormalized["Prospectos"] = Number(ejecutive.totalProspects);
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }
      return dataTable;
    case "byprospectsnotviewed":
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};
        dataNormalized["Nombre"] = ejecutive.fullname;
        dataNormalized["Prospectos Sin Visualizar"] = Number(ejecutive.totalProspects);
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }
      return dataTable;
    case "bypending":
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};
        dataNormalized["Nombre"] = ejecutive.fullname;
        dataNormalized["Pendientes Incompletos"] = ejecutive.totalPendings;
        dataNormalized["Pendientes Completados"] = ejecutive.totalPendingsCustom;
        dataNormalized["Total de Pendientes"] =
          parseInt(ejecutive.totalPendings) + parseInt(ejecutive.totalPendingsCustom);
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }
      return dataTable;
    default:
      for (let i = 0; i < results.length; i++) {
        const ejecutive = results[i];
        let dataNormalized = {};
        dataNormalized["Nombre"] = ejecutive.fullname;
        dataNormalized["Correo"] = ejecutive.email;
        dataNormalized["Teléfono"] = ejecutive.phone;
        dataNormalized["Iniciales"] = ejecutive.username;
        dataNormalized["Grupo"] = ejecutive.group.name;
        dataNormalized.itemBD = ejecutive;
        dataNormalized.viewed = true;
        dataTable.push(dataNormalized);
      }
      return dataTable;
  }
};
export const normalizeGroups = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];

    let normalize = {};
    normalize["id"] = element?.id;
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    } `;
    normalize["Telefono"] = element?.phone;
    normalize["Correo"] = element?.email;
    normalize["Estado"] = element?.entity.name;
    normalize["Ejecutivo"] = element?.ejecutive?.name;
    normalize["Creado Por"] = element?.createdby?.fullname;
    normalize.itemBD = element;
    newProspect.push(normalize);
  }
  return newProspect;
};
// * ------------------ compras
export const normalizeTableDataOrdersShopping = data => {
  let newProspect = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    let ViewOrder = {};
    ViewOrder["id"] = element?.id;
    ViewOrder["nombre"] = `${toUpperCaseChart(element?.oportunity?.soldby?.fullname)}
     `;
    ViewOrder["correo"] = element?.oportunity?.soldby?.email;
    ViewOrder["teléfono"] = element?.oportunity?.soldby?.phone;
    ViewOrder["folio"] = element?.folio;
    ViewOrder["total"] = element?.total;
    ViewOrder["estado"] = element?.orderstatus?.name;
    ViewOrder["receive"] = element?.receive;
    ViewOrder["phone"] = element.phone;
    ViewOrder["rfc"] = element.rfc;
    ViewOrder["observations"] = element.observations;
    ViewOrder["billing"] = element.billing;
    ViewOrder["billingphone"] = element.billingphone;
    ViewOrder["billingbusiness"] = element.billingbusiness;
    ViewOrder["discarted"] = element.discarted;
    ViewOrder["discartedreason"] = element.discartedreason;
    ViewOrder["isshipped"] = element?.isshipped;
    ViewOrder["productos"] = element?.oportunity?.productsoportunities;
    ViewOrder["calle"] = element?.address?.street;
    ViewOrder["numext"] = element?.address?.ext_number;
    ViewOrder["numint"] = element?.address?.int_number;
    ViewOrder["referencias"] = element?.address?.references;
    ViewOrder["asentamiento"] = element?.address?.settlement;
    ViewOrder["prospectId"] = element?.oportunity?.prospectId;
    ViewOrder["factura"] = element?.billing;
    ViewOrder["regimen fiscal"] = element?.bill?.taxregime?.name;
    ViewOrder["cfdi"] = element?.bill?.cfdi?.name;
    ViewOrder["Metodo de Pago"] = element?.bill?.paymentmethod?.name;
    ViewOrder["forma de pago"] = element?.bill?.paymentway?.name;
    ViewOrder["cuenta de pago"] = element?.paymentaccount?.name;
    ViewOrder["fecha de creación"] = formatDate(element?.createdAt);
    ViewOrder["updatedAt"] = element?.updatedAt;
    ViewOrder["oportunity"] = element?.oportunity;
    ViewOrder.createdAt = element?.createdAt;
    ViewOrder.lastTrackingDate = element?.oportunity?.prospect?.lastTrackingcreatedAt;
    ViewOrder.data = element;
    ViewOrder.oportunity = element.oportunity;
    ViewOrder.orderstatus = element?.orderstatus;
    newProspect.push(ViewOrder);
  }
  return newProspect;
};

export const normalizeShippings = element => {
  let normalize = {};

  normalize["id"] = element?.id;
  normalize["nombre"] = toUpperCaseChart(element?.order?.createdbyid?.fullname);
  normalize["correo"] = element?.order?.createdbyid?.email;
  normalize["folio"] = element?.order?.folio;
  normalize["Producto"] = element?.productsoportunity?.product?.name;
  normalize["teléfono"] = element?.phone;
  normalize["calle"] = toUpperCaseChart(element?.address?.street);
  normalize["Numero Interior"] = element?.address?.int_number;
  normalize["Numero Exterior"] = element?.address?.ext_number;
  normalize["Colonia"] = toUpperCaseChart(element?.address?.settlement);
  normalize["codigo postal"] = toUpperCaseChart(element?.address?.postal?.postal_code);
  normalize["estado"] = toUpperCaseChart(element?.address?.entity?.name);
  normalize["Municipio"] = element?.address?.city?.name;
  normalize["Referencias"] = element?.address?.references;
  normalize["fecha de creación"] = formatDate(element?.createdAt);
  normalize.itemBD = element;

  return normalize;
};

export const normalizeShippingsPurchases = element => {
  let normalize = {};
  normalize["id"] = element?.id;
  normalize["folio"] = element?.order?.folio;
  normalize["Producto"] = element?.productsoportunity?.product?.name;
  normalize["Codigo Producto"] = element?.productsoportunity?.product?.code;
  normalize["Fecha de creación"] = formatDate(element?.createdAt);
  normalize["Fecha de actualización"] = formatDate(element?.updatedAt);
  normalize.itemBD = element;

  return normalize;
};

export const normalizeTableDataProductShipping = shipping => {
  let newProductShipping = [];
  for (let i = 0; i < shipping.length; i++) {
    const element = shipping[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["codigo"] = element?.productsoportunity?.product?.code;
    normalize["producto"] = element?.productsoportunity?.product?.name;
    normalize["monto"] =
      element?.productsoportunity?.newprice === 0
        ? formatNumber(element?.productsoportunity?.product?.callamount)
        : formatNumber(element?.productsoportunity?.newprice);
    normalize["cantidad"] = element?.productsoportunity?.quantity;
    normalize["fase de producto"] = element?.productphase?.name;
    normalize.itemBD = element;
    newProductShipping.push(normalize);
  }
  return newProductShipping;
};

export const normalizeTableDataProductShippingLogistic = shipping => {
  let newProductShipping = [];
  for (let i = 0; i < shipping.length; i++) {
    const element = shipping[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["codigo"] = element?.productsoportunity?.product?.code;
    normalize["producto"] = element?.productsoportunity?.product?.name;
    normalize["monto"] =
      element?.productsoportunity?.newprice === 0
        ? formatNumber(element?.productsoportunity?.product?.callamount)
        : formatNumber(element?.productsoportunity?.newprice);
    normalize["cantidad"] = element?.productsoportunity?.quantity;
    normalize["fase de producto"] = element?.productphase?.name;
    normalize["fase de envio"] = element?.shippingphase?.name;
    normalize.itemBD = element;
    newProductShipping.push(normalize);
  }
  return newProductShipping;
};

export const normalizeTableInventary = products => {
  let newProduct = [];
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    let normalize = {};
    normalize.id = element?.id;
    normalize.code = element?.code;
    normalize.name = `${toUpperCaseChart(element?.name)} `;
    normalize.brand = `${toUpperCaseChart(element?.brand?.name)}`;
    normalize.category = `${toUpperCaseChart(element?.category?.name)}`;
    normalize.amount = `${formatNumber(element?.callamount)}`;
    normalize.stocks = replaceNullOrUndefinedWithZero(element?.stocks?.total);
    newProduct.push(normalize);
  }
  return newProduct;
};
export const normalizeTableDataOrdesAdmin = data => {
  let dataOrder = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let normalize = {};

    normalize["id"] = item.id;
    normalize["nombre"] = item.oportunity.soldby.fullname;
    normalize["correo"] = item.oportunity.soldby.email;
    normalize["teléfono"] = item.oportunity.soldby.phone;
    normalize["folio"] = item.folio;
    normalize["tipo de venta"] = item.oportunity?.typesale?.name;
    normalize["total"] = formatNumber(item.total);
    normalize["estado"] = item.orderstatus?.name;
    normalize["estado logistica"] = item.exitstatus;
    normalize["receive"] = item.receive;
    normalize["phone"] = item.phone;
    normalize["rfc"] = item.rfc;
    normalize["observations"] = item.observations;
    normalize["billing"] = item.billing;
    normalize["billingphone"] = item.billingphone;
    normalize["billingbusiness"] = item.billingbusiness;
    normalize["discarted"] = item.discarted;
    normalize["discartedreason"] = item.discartedreason;
    normalize["billingat"] = formatDate(item.billingat);
    normalize["fecha de creación"] = formatDate(item.createdAt);
    normalize["prospectId"] = item.oportunity.prospectId;
    normalize["factura"] = item.billing;
    normalize["regimen fiscal"] = item?.bill?.taxregime?.name;
    normalize["cfdi"] = item?.bill?.cfdi?.name;
    normalize["Metodo de Pago"] = item?.bill?.paymentmethod?.name;
    normalize["forma de pago"] = item?.bill?.paymentway?.name;
    normalize["cuenta de pago"] = item.paymentaccount?.name;
    normalize["createdAt"] = item.createdAt;
    normalize["updatedAt"] = item.updatedAt;
    normalize["oportunity"] = item.oportunity;
    normalize["orderstatus"] = item.orderstatus;
    normalize["Estatus Logistica"] = item?.exitstatus
      ? item?.exitstatus === "pedido nuevo"
        ? "proceso aún no iniado"
        : item?.exitstatus
      : "Sin Estatus";
    normalize["data"] = item;
    dataOrder.push(normalize);
  }
  return dataOrder;
};
export const normalizeTableClientsManager = element => {
  let ViewClient = {};
  ViewClient["id"] = element?.id;
  ViewClient["nombre"] = `${toUpperCaseChart(element?.name)} ${
    element?.lastname && toUpperCaseChart(element?.lastname)
  } `;
  ViewClient["correo"] = element?.email;
  ViewClient["movil"] = element?.phone;
  ViewClient["télefono"] = element?.optionalphone;
  ViewClient["categoría de interes"] = toUpperCaseChart(element?.category?.name);
  ViewClient["género"] = element?.gender;
  ViewClient["puesto"] = element?.job;
  ViewClient["empresa"] = element?.clientcompany?.companyname;
  ViewClient["comentarios"] = element?.observations.slice(0, 40);
  ViewClient["codigo postal"] = element?.postal?.postal_code;
  ViewClient["estado"] = element?.entity;
  ViewClient["ciudad"] = element?.city?.name;
  ViewClient["colonia"] = element?.postal?.settlement;
  ViewClient["calle"] = element?.street;
  ViewClient["ejecutivo"] = element?.ejecutive?.name;
  ViewClient["tipo de cliente"] = element?.clienttype?.name;
  ViewClient["fase"] = element?.phase;
  ViewClient["origen"] = element?.origin?.name;
  ViewClient["título"] = element?.title;
  ViewClient["canal"] = element?.channel?.name;
  ViewClient["especialidad"] = element?.specialty?.name;
  ViewClient["web"] = element?.url.slice(0, 40) + "...";
  ViewClient["facebook"] = element?.facebook.slice(0, 40) + "...";
  ViewClient["google maps"] = element?.location.slice(0, 40) + "...";
  ViewClient["fecha de creación"] = formatDate(element?.createdAt);
  ViewClient["fecha de descarte"] = formatDate(element?.deletedAt);
  ViewClient["ultima actualización"] = formatDate(element?.updatedAt);
  ViewClient["fecha Conversión cliente"] = formatDate(element?.clientat);
  ViewClient["código de producto"] = element?.product?.slice(0, 40);
  ViewClient.lastTrackingDate = element?.lastTrackingcreatedAt;
  ViewClient.phase = element?.phase;
  ViewClient.itemBD = element;
  return ViewClient;
};

export const normalizeTableDemos = demos => {
  let newDemo = [];
  for (let i = 0; i < demos.length; i++) {
    const element = demos[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["instructor"] = element?.assignedinstructor;
    normalize["viaticos"] = formatNumber(element?.expensebudget);
    normalize["fecha estimada"] = formatDate(element?.date);
    normalize["unidad asignada"] = element?.dessignatedunit;
    normalize["estado"] = element?.address.entity.name;
    normalize["ciudad"] = element?.address.city.name;
    normalize["asentamiento"] = element?.address.settlement;
    normalize["calle"] = element?.address.street;
    normalize["fecha de creacion"] = formatDate(element.createdAt);
    normalize.itemBD = element;
    newDemo.push(normalize);
  }
  return newDemo;
};

export const normalizeTablePushOrders = order => {
  let newOrder = [];
  for (let i = 0; i < order.length; i++) {
    const element = order[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize["proveedor"] = element?.provider?.companyname;
    normalize["condicion"] = element?.paymentcondition;
    normalize["telefono"] = element?.phone;
    normalize["observaciones"] = element?.observations;
    normalize["metodo de entrega"] = element?.methoddelivery;
    normalize["fecha de creacion"] = formatDate(element?.createdAt);

    normalize.itemBD = element;
    newOrder.push(normalize);
  }
  return newOrder;
};
