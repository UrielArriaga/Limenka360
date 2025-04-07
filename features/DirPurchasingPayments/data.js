export const commonCustomValues = [
  { id: "day", name: "Hoy", toChip: "Hoy" },
  { id: "week", name: "Semanal", toChip: "Semanal" },
  { id: "month", name: "Mensual", toChip: "Mensual" },
  { id: "range", name: "Rango de Fechas", toChip: "Rango de Fechas" },
];
export const optionsFilters = [
  {
    label: "Fecha Limite",
    value: "dates",
    valuedb: "date",
    custom: true,
    customOptions: commonCustomValues
  },
  {
    label: "Se Vendio En",
    value: "datesSale",
    valuedb: "createdAt",
    custom: true,
    customOptions: commonCustomValues
  },
  {
    label:"Estatus de Pagado",
    value:"ispaid",
    valuedb:"ispaid",
    custom:true,
    customOptions:[
        {id:true, name:"Pagado"},
        {id:false, name:"Sin Pagar"}
    ]
  }
];

