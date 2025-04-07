export const filtersOrders = [
  {
    label: "Fecha de aprobacion",
    value: "dates",
    valuedb: "approvedAt",
    custom: true,
    customOptions: [
      {
        id: "day",
        name: "Hoy",
        toChip: "Hoy",
      },
      {
        id: "week",
        name: "Semanal",
        toChip: "Semanal",
      },
      {
        id: "month",
        name: "Mensual",
        toChip: "Mensual",
      },
      {
        id: "range",
        name: "Rango de Fechas",
        toChip: "Rango de Fechas",
      },
    ],
  },
  {
    label: "Estatus",
    value: "exitstatus",
    valuedb: "exitstatus",
    custom: true,
    customOptions: [
      {
        id: "por surtir",
        name: "Por Surtir",
      },
      {
        id: "entregado",
        name: "Entregado",
      },
      {
        id: "parcialmente surtido",
        name: "Parcialmente Surtido",
      },
      {
        id: "pedido nuevo",
        name: "Pedido Nuevo",
      },
      {
        id: "en piso",
        name: "En piso",
      },
      {
        id: "incompleto",
        name: "Incompleto",
      },
      {
        id: "completo",
        name: "Completo",
      },
      {
        id: "revisado",
        name: "Revisado",
      },
      {
        id: "surtido",
        name: "Surtido",
      },
      {
        id: "en ruta",
        name: "En ruta",
      },
    ],
  },

];
