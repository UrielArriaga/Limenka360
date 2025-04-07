export const entriesFilters = [
  {
    label: "Tipo de Entrada",
    value: "typesentries",
    valuedb: "typesentriesId",
    // custom: true,
    // customOptions: [
    //   { id: "5CeOjHHlId6zcJSz143pL2nA", name: "Traspaso de sucursales" },
    //   { id: "5CeOjHHlId6zcJSz90zpL2nA", name: "Producto Nuevo Nacional" },
    //   { id: "5CeOjHHlId6zcJSz923pL2nA", name:"Devolución de Paquetería"},
    //   { id: "5CeOjHHlId6zcJSzfrzpL2nA", name:"Devolucion de ruta"},
    //   { id: "AE6dWLmNMwXYsMN240im0ymp", name: "Garantía" },
    //   { id: "aIkyikt25h3STmxDK5H3V9uF", name:"Cambio de equipo"},
    //   { id: "bVyigBXNTsB0IkHLZSpK8KrS", name:"Orden de compra"},
    //   { id: "bZHuWHeNerrRUs7NRO5nInpy", name: "Mantenimiento Correctivo" },
    //   { id: "do4Uwq6omsOr0vTvXpvFSDrd", name: "Devolucion" },
    //   { id: "HASVNLYhIsZKANUoRALRbrqJ", name: "Mantenimiento Preventivo" },
    //   { id: "Jmd34sVZgAHdXqKdOee0e2oj", name: "Equipo tomado a cuenta" },
    //   { id: "LKJVNLYhIsZKANUoRALRbrqJ", name: "Producto Nuevo Importacion" },
    //   { id: "S6lK8y1qrsloIeYjDphDBbUj", name: "Revisión" },
    //   { id: "StYgELSjSOCkb2H0S7KdYDK8", name: "Prueba"},
    // ]
  },
  {
    label: "Por Fecha",
    value: "dates",
    valuedb: "createdAt",
    custom: true,
    customOptions: [
      { id: "day", name: "Hoy", toChip: "Hoy" },
      { id: "week", name: "Semanal", toChip: "Semanal" },
      { id: "month", name: "Mensual", toChip: "Mensual" },
      { id: "range", name: "Rango de Fechas", toChip: "Rango de Fechas" },
    ],
  },
];
