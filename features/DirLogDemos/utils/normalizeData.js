import { formatDate, formatNumber } from "../../../utils";

export default function normalizeTableDemos(demos) {
    let newDemo = [];
    for (let i = 0; i < demos.length; i++) {
      const element = demos[i];
      let normalize = {};
      normalize["id"] = element?.id;
      normalize["instructor"] = element?.assignedinstructor;
      normalize["estatus"] = element?.orderstatus?.name || "N/A";
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