import { formatDate, toUpperCaseChart } from "../../../utils";

export const normalizeTableDataBudgets = budget => {
    let newBudget = [];
    for (let i = 0; i < budget.length; i++) {
      const element = budget[i];
  
      let normalize = {};
      normalize["id"] = element?.id;
      normalize["FOLIO"] = element?.folio;
      normalize["FECHA DE CREACION"] = formatDate(element?.createdAt);
      normalize["EJECUTIVO"] = toUpperCaseChart(element?.ejecutive?.fullname);
      normalize["TIPO DE PRESUPUESTO"] = element?.budgettype;
      normalize["ASIGNADO A"] = toUpperCaseChart(element?.prospect?.fullname);
      normalize.itemBD = element;
      newBudget.push(normalize);
    }
    return newBudget;
  };
  