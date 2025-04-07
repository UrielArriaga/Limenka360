import { getColorOrder } from "./utils";

export const filterSkeleton = [
  {
    label: "Fecha de Creacion",
    value: "dates",
    valuedb: "createdAt",
    custom: true,
    customOptions: [
      {
        id: "today",
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
];

export const initialData = [];

export let heads = [
  {
    headText: "Fecha de Creacion",
    headNormalize: "createdAt",
    orderby: "-createdAt",
  },
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: "-folio",
  },
  {
    headText: "Estatus de Pedido",
    headNormalize: "status",
    orderby: null,
  },
  {
    headText: "Estatus Almacen",
    headNormalize: "exitstatus",
    orderby: null,
  },
  {
    headText: "Cuenta de Pago",
    headNormalize: "paymentaccountname",
    orderby: null,
  },

  // {
  //   headText: "Folio",
  //   headNormalize: "Folio",
  //   orderby: "name",
  // },
];

export const customColumns = {
  status: {
    columname: "Folio",
    component: item => {
      return (
        <div className="TableName">
          <div
            className="s"
            style={{
              display: "inline-block",
              background: getColorOrder(item.status).bgColor,
              color: getColorOrder(item.status).color,
              padding: 4,
              borderRadius: 8,
              width: "80%",
            }}
          >
            <p
              className="name"
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {item.status}
            </p>
          </div>
        </div>
      );
    },
  },
};

// nombre
// correo
// teléfono
// estado
// folio
// cuenta de pago
// total
// fecha de creación
