// export const optionsFiltersProspects = {
//   optionsToFind: [
//     {
//       label: "Estado",
//       value: "entity",
//       getNameChip: "name",
//       getValue: "id",
//       identifier: "entityId",
//       type: "inQuery",
//       filter: true,
//     },
//   ],
//   options: [
//     {
//       id: "entity",
//       options: entities.results,
//     },
//   ],
// };
import {
  Alarm,
  AssignmentTurnedIn,
  CalendarToday,
  Call,
  Email as EmailIcon,
  Event,
  Place,
  WhatsApp,
} from "@material-ui/icons";
//catalogo para seguimientos
export const Catalogo = [
  {
    id: "62dfWiKfmbarQj5gLuRw60GY",
    name: "Cita",
    icon: <CalendarToday />,
    createdAt: "2022-08-24T16:16:29.092Z",
    updatedAt: "2022-08-24T16:16:29.092Z",
  },
  {
    id: "62dbU8uvA9hkoY4lWlBP714P",
    name: "Email",
    icon: <EmailIcon />,
    createdAt: "2022-08-24T16:16:33.791Z",
    updatedAt: "2022-08-24T16:16:33.791Z",
  },
  {
    id: "62dbU8uvA9hkoY4lWlBP714M",
    name: "Llamada",
    icon: <Call />,
    createdAt: "2022-08-24T16:16:33.791Z",
    updatedAt: "2022-08-24T16:16:33.791Z",
  },
  {
    id: "62dPbnNsTpSyCpqGHQjQoY4w",
    name: "Pendiente",
    icon: <AssignmentTurnedIn />,
    createdAt: "2022-08-24T16:16:42.664Z",
    updatedAt: "2022-08-24T16:16:42.664Z",
  },
  {
    id: "62dEUlcqck7L1f8JvFtRSeoX",
    name: "Recordatorio",
    icon: <Alarm />,
    createdAt: "2022-08-24T16:16:21.187Z",
    updatedAt: "2022-08-24T16:16:21.187Z",
  },
  {
    id: "62dHzqoSCj0ktjoy1sUAEzba",
    name: "Seguimiento",
    icon: <Event />,
    createdAt: "2022-09-14T15:11:59.556Z",
    updatedAt: "2022-09-14T15:11:59.556Z",
  },
  {
    id: "62hHzqoSCj0452fT1sUAEzba",
    name: "Seguimiento Automatico",
    icon: <Event />,
    createdAt: "2022-09-14T15:11:59.556Z",
    updatedAt: "2022-09-14T15:11:59.556Z",
  },
  {
    id: "Yofh1IVXauu7kNJfsRcNXL9J",
    name: "Tarea",
    icon: <AssignmentTurnedIn />,
    createdAt: "2022-10-26T19:15:11.982Z",
    updatedAt: "2022-10-26T19:15:11.982Z",
  },
  {
    id: "62dFVS7MPmD9sEQKe39E5dJg",
    name: "Visita",
    icon: <Place />,
    createdAt: "2022-08-24T16:16:37.023Z",
    updatedAt: "2022-08-24T16:16:37.023Z",
  },
  {
    id: "62dbU8uvA9hkoY4lWlBP714n",
    name: "Whatsapp",
    icon: <WhatsApp />,
    createdAt: "2022-08-24T16:16:33.791Z",
    updatedAt: "2022-08-24T16:16:33.791Z",
  },
];
//catalogo para pendientes
export const CatalogoPendings = [
  {
    id: "62dp9dPnCtgdfTodXAUuzr1N",
    name: "Cita",
    icon: <CalendarToday />,
    createdAt: "2022-09-06T14:59:54.303Z",
    updatedAt: "2022-09-06T14:59:54.303Z",
  },
  {
    id: "62dlUPgKjOpCoDH6wU0sG9rp",
    name: "Recordatorio",
    icon: <Alarm />,
    createdAt: "2022-09-06T15:00:07.411Z",
    updatedAt: "2022-09-06T15:00:07.411Z",
  },
  {
    id: "62dN6LUisuI0rTZm1p5l5Lcp",
    name: "Visita",
    icon: <Place />,
    createdAt: "2022-09-06T15:00:19.601Z",
    updatedAt: "2022-09-06T15:00:19.601Z",
  },
  {
    id: "62dQiGAWr0P53bbpmnYtXmd5",
    name: "Llamada",
    icon: <Call />,
    createdAt: "2022-09-06T14:59:58.639Z",
    updatedAt: "2022-09-06T14:59:58.639Z",
  },
  {
    id: "62dUf2tKTw0k9q0WrC5uvf8m",
    name: "Tarea",
    icon: <AssignmentTurnedIn />,
    createdAt: "2022-09-06T15:00:13.694Z",
    updatedAt: "2022-09-06T15:00:13.694Z",
  },
  {
    id: "62dUf2tKTw0k9q0WrC5uv3e3",
    name: "Automatizatcion",
    icon: <Event />,
    createdAt: "2022-09-06T15:00:13.694Z",
    updatedAt: "2022-09-06T15:00:13.694Z",
  },
  {
    id: "62dUf2tKTw0k9q0WrC5uv45e",
    name: "Whatsapp",
    icon: <WhatsApp />,
    createdAt: "2025-05-19T22:40:51.936Z",
    updatedAt: "2025-05-19T22:40:58.151Z",
  },
];
export const headsProspectDR = [
  "id",
  "nombre",
  "correo",
  "movil",
  "teléfono",
  "categoria de interés",
  "código de producto",
  "género",
  "puesto",
  "ejecutivo",
  "estado",
  "codigo postal",
  "colonia",
  "calle",
  "comentarios",
  "título",
  "canal",
  "web",
  "facebook",
  "google maps",
  "fecha de creación",
  "ultima actualización",
];

export const ORDERSTATUS = {
  pedidonuevo: "pedido nuevo",
  enpiso: "en piso",
  enruta: "en ruta",
  surtir: "por surtir",
  surtido: "surtido",
  revisado: "revisado",
  incompleto: "incompleto",
  proceso: "En proceso",
  entregado: "entregado",
  Na: "",
  completado: "completado",
  asignado: "asignado",
  pedidorecibido: "pedido recibido",
  procesocompra: "Proceso de compra",
  parcialmente: "parcialmente surtido",
  entregado: "entregado",
};

export const SHOPPINGSTATUS = {
  fabricacion: "fabricacion",
  procesodecompra: "proceso de compra",
  listopararecolecion: "listo para recoleccion",
  surtir: "por surtir",
  surtido: "surtido",
  revisado: "revisado",
  incompleto: "incompleto",
  proceso: "En proceso",
  Na: "",
  completado: "completado",
  asignado: "asignado",
  pedidorecibido: "pedido recibido",
};

// h73zyYs7A22jGMHwl6zE37tT	sin pago
// j2X4ymXhGETzOGAbVCNcqUTl	sin existencia
// h73zyYs7A22jGMHwl6zE3UTB	utilidad baja
// h73zyYs7A22jGMHwl6zE3DES	desconocido
// k73zyYs7A22jGMHwl6zE3DES	proceso de compra
// "h13zyYs7A22jGMHwl6zE3DES	fabricacion	white	Compras	2024-08-30 16:50:55.922 -0500	2024-09-02 12:03:02.589 -0500	1"	listo para recoleccion
// "h17zyYs7A22jGMHwl6zE3DES	fabricacion	white	Compras	2024-08-30 16:50:55.922 -0500	2024-09-02 12:03:02.589 -0500	1"	fabricacion
// h14zyYs7A22jGMHwl6zE3DES	comprado
// h15zyYs7A22jGMHwl6zE3DES	entregado
// h16zyYs7A22jGMHwl6zE3DES	proveedor envia

export const ORDERSTATUSADMINALMACEN = {
  pendiente: "Pendiente de aprobación",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
  edicion: "Edicion de datos",
  cancelado: "Cancelado",
};

export const statuspoo = {
  listopararecolecion: {
    value: "h13zyYs7A22jGMHwl6zE3DES1",
    label: "listo para recoleccion",
  },
};

// Pendiente de aprobación
// Aprobado
// Rechazado
export const ORDERSTATUSSHOPPING = {
  pendiente: "Pendiente de aprobación",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

export const ORDERSTATUS_ALMACEN = {
  pedidonuevo: "pedido nuevo",
  revisado: "revisado",
  porsurtir: "por surtir",
  completo: "completo",
  incompleto: "incompleto",
};

export const GLOBALSTATUSPOO = [
  {
    id: "h73zyYs7A22jGMHwl6zE37tT",
    name: "sin pago",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 0,
  },
  {
    id: "j2X4ymXhGETzOGAbVCNcqUTl",
    name: "sin existencia",
    color: "blue",
    type: "Compras",
    createdAt: "2024-09-02T17:03:58.778Z",
    updatedAt: "2024-09-02T17:03:58.778Z",
    status: 0,
  },
  {
    id: "h73zyYs7A22jGMHwl6zE3UTB",
    name: "utilidad baja",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 0,
  },
  {
    id: "h73zyYs7A22jGMHwl6zE3DES",
    name: "desconocido",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 0,
  },
  {
    id: "k73zyYs7A22jGMHwl6zE3DES",
    name: "proceso de compra",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
  {
    id: "h14zyYs7A22jGMHwl6zE3DES",
    name: "comprado",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
  {
    id: "h15zyYs7A22jGMHwl6zE3DES",
    name: "entregado",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
  {
    id: "h16zyYs7A22jGMHwl6zE3DES",
    name: "proveedor envia",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
  {
    id: "h17zyYs7A22jGMHwl6zE3DES",
    name: "fabricacion",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
  {
    id: "h13zyYs7A22jGMHwl6zE3DES",
    name: "listo para recoleccion",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
  {
    id: "h13zyYs7A22j00Hwl6zE3DES",
    name: "stock insuficiente",
    color: "white",
    type: "Compras",
    createdAt: "2024-08-30T21:50:55.922Z",
    updatedAt: "2024-09-02T17:03:02.589Z",
    status: 1,
  },
];

export const STATUSPOO = {
  // sinPago: "h73zyYs7A22jGMHwl6zE37tT",
  // sinExistencia: "j2X4ymXhGETzOGAbVCNcqUTl",
  // utilidadBaja: "h73zyYs7A22jGMHwl6zE3UTB",
  // desconocido: "h73zyYs7A22jGMHwl6zE3DES",
  // procesoCompra: "k73zyYs7A22jGMHwl6zE3DES",
  // comprado: "h14zyYs7A22jGMHwl6zE3DES",
  // entregado: "h15zyYs7A22jGMHwl6zE3DES",
  // proveedorEnvia: "h16zyYs7A22jGMHwl6zE3DES",
  // fabricacion: "h17zyYs7A22jGMHwl6zE3DES",
  // listoParaRecoleccion: "h13zyYs7A22jGMHwl6zE3DES",
  // stockInsuficiente: "h13zyYs7A22j00Hwl6zE3DES",
};

export const DELIVERYMETHODS = [
  { id: "recoleccion", name: "recoleccion" },
  { id: "proveedor envia", name: "proveedor envia" },
];

export const typeSockets = {
  new_order: {
    value: "new_order",
    redirects: {
      administracion: "/administracion/pedidos",
      admin_gerente: "/administraciongerente/pedidos",

      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
    },
  },
  new_order_edit: {
    value: "new_order_edit",
    redirects: {
      administracion: "/administracion/pedidos",
      admin_gerente: "/administraciongerente/pedidos",

      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
    },
  },

  request_stock_shopping: {
    value: "request_stock_shopping",
    redirects: {
      director_compras: "/directorcompras/pedidos",
      compras: "comprasv2/pedidos",
    },
  },
  new_comment_order: {
    value: "new_comment_order",
    redirects: {
      director_compras: "/directorcompras/pedidos",
      director_de_logistica: "/directorlogistica/",
      administracion: "/administracion/pedidos",

      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
    },
  },
  new_inventorytransfer: {
    value: "new_inventorytransfer",
    redirects: {
      director_compras: "/directorcompras/pedidos",
      // director_de_logistica: "/director_de_logistica",
      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
    },
  },

  ready_to_collect: {
    value: "ready_to_collect",
    redirects: {
      director_de_logistica: "/directorlogistica/ordenes",
      director_compras: "/directorcompras/pedidos",
      encargado_de_egresos: "/encargadosalidas/ordenes",
      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
      // encargado_de_egresos: "/encargadosalidas/ordenes",
    },
  },

  new_order_approved: {
    value: "new_order_approved",
    redirects: {
      director_de_logistica: "/directorlogistica",
      director_compras: "/directorcompras/pedidos",
      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
    },
  },

  rejected_order: {
    value: "rejected_order",
    redirects: {
      director_de_logistica: null,
      director_compras: "/directorcompras/pedidos",
      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
    },
  },

  new_order_warehouse: {
    value: "new_order_warehouse",
    redirects: {
      administrador_de_almacen: "/administracionalmacen",

      // admin_gerente: "/admin_gerente",
      // administrador_logistica: "/administrador_logistica",
      // encargado_de_egresos: "/encargadosalidas/ordenes",
    },
  },

  new_warehouse_tosupply: {
    value: "new_warehouse_tosupply",
    redirects: {
      jefe_de_piso_almacen: "/jefedepiso/pedidos",
    },
  },

  new_warehouse_infloor: {
    value: "new_warehouse_infloor",
    redirects: {
      encargado_de_egresos: "/encargadosalidas",
    },
  },
  new_order_delivery: {
    value: "new_order_delivery",
    redirects: {
      director_de_logistica: "/directorlogistica/rutas",
    },
  },
  new_inventorytransfer: {
    value: "new_inventorytransfer",
    redirects: {
      encargado_de_egresos: "/encargadosalidas/traspasos",
      administrador_de_almacen: "/administracionalmacen/traspasos",
      director_de_logistica: "/directorlogistica/traspasos",
      master_almacen: "/almacenesforaneos/traspasos",
    },
  },
  new_inventorytransfer_exit: {
    value: "new_inventorytransfer_exit",
    redirects: {
      encargado_de_ingresos: "/encargadoentradas/traspasos",
      administrador_de_almacen: "/administracionalmacen/traspasos",
      director_de_logistica: "/directorlogistica/traspasos",
      master_almacen: "/almacenesforaneos/traspasos",
    },
  },
  new_inventorytransfer_entry: {
    value: "new_inventorytransfer_entry",
    redirects: {
      director_de_logistica: "/directorlogistica/traspasos",
      director_de_logistica: "/directorlogistica/traspasos",
      master_almacen: "/almacenesforaneos/traspasos",
    },
  },
};

// {
//   "type":"ready_to_collect",
//   "purchaseorderId":"2ODsVDWMl8cIOkJpZWFUZZLd",
//   "metadata":{
//       "folio":""
//   }

// //   // "type":"new_pending_shopping",

// //   // "type":"new_comment_order"

// //   // "type":"new_inventorytransfer",
// //   // "warehouseexitId": "QIszsqsY124SYHz90qHE83nK",
// //   // "warehouseentryId":"QIszsqsY124SYHz90qee83jJ",
// //   // "warehouseproducts":[],
// //   // "metadata":{
// //   //     "warehouseexitname":"Almacen HUEHUETOCA",
// //   //     "warehouseentryname":"Almacen REFORMA",
// //   //     "warehouseproducts":[]
// //   // }

// //   // "type": "request_stock_shopping",
// //   // "orderId":"",
// //   // "metadata":{
// //   //     "folio":"XAXAS",
// //   //     "orderId":"XXX",
// //   //     "productcodes":[{
// //   //         "code":"XASXAS",
// //   //         "quantity":1
// //   //     }]

// //   // }

// //   // Administracion to ->
// //   // "type":"new_comment_order",
// //   // "orderId":"5Z868o4zAT1fKEnungqtNkPZ",
// //   // "message":"hola",
// //   // "metadata":{
// //   //     "folio":""
// //   // }
// // }
