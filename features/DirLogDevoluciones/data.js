export const filterRoutes = [
    // {
    //   label: "Seleccione Chofer",
    //   value: "drivers",
    //   valuedb: "driverId",
    //   custom: false,
    //   customOptions: [],
    // },
    // {
    //   label: "Selecciona la Unidad",
    //   value: "transportunits",
    //   valuedb: "transportunitId",
    //   custom: false,
    //   customOptions: [],
    // },
    {
      label: "Fecha de Devolucion",
      value: "dates",
      valuedb: "createdAt",
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
      label: "Almacen",
      value: "warehouse",
      valuedb: "warehouseId",
      custom: false,
      customOptions: [],
    },
    {
      label: "Creado por ",
      value: "users",
      valuedb: "createdbyId",
      custom: false,
      customOptions: [],
    }
  ]