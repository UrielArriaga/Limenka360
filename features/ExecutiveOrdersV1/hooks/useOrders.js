import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { ApiServiceExOr } from "../service";
import { formatNumber, toUpperCaseChart, formatDate } from "../../../utils";
import { getColorStatusOrder } from "../../../utils/DirLog";
import usePagination from "../../../hooks/usePagination";

export default function useOrders({
  viewType = "table",
  orderBy,
  orderDirection,
}) {
  const request = new ApiServiceExOr();
  const { id_user } = useSelector(userSelector);
  const [modalViews, setModalViews] = useState({
    preview: false,
    limiBotChat: false,
  });
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const { page, limit, handlePage } = usePagination({
    defaultLimit: 30,
    defaultPage: 1,
  });

  const handleToggleModal = (modalName) => {
    setModalViews((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const [data, setData] = useState({
    columns: {},
    columnOrder: [],
    isFetching: false,
  });

  const [ordersData, setOrdersData] = useState({
    results: [],
    count: 0,
    isFetching: false,
  });

  const fetchOrdersTable = async () => {
    try {
      setOrdersData((prev) => ({
        ...prev,
        isFetching: true,
      }));
      let query = { bill: {}, discarted: false, createdbyId: id_user };
      let orderParam = "";
      if (orderBy) {
        orderParam = `${orderDirection === "desc" ? "-" : ""}${orderBy}`;
      } else {
        orderParam = "-createdAt";
      }
      const reponse = await request.getOrders(limit, page, query, orderParam);
      setOrdersData((prev) => ({
        ...prev,
        results: reponse.data?.results?.map((item, index) => {
          return {
            id: item?.id,
            prospectId: item?.oportunity?.prospect?.id,
            oportunityId: item?.oportunity?.id,
            fullname:
              toUpperCaseChart(item?.oportunity?.prospect?.fullname) || "N/A",
            folio: item?.folio || "N/A",
            total: formatNumber(item?.total) || "N/A",
            estado: item?.orderstatus?.name || "N/A",
            status: item?.orderstatus?.status || "N/A",
            telEnvio: item?.phone || "N/A",
            estadoEnv: item?.address?.entity?.name || "N/A",
            municipioEnv: item?.address?.city?.name || "N/A",
            cuentaPago: item?.paymentaccount?.name || "N/A",
            metodoPago: item?.bill?.paymentmethod?.name || "N/A",
            formatoPago: item?.bill?.paymentway?.name || "N/A",
            obsGenerales: item?.observations || "N/A",
            fechaCreacion: formatDate(item?.createdAt) || "N/A",
            fechaUpdate: formatDate(item?.updatedAt) || "N/A",
          };
        }),
        count: reponse.data?.count,
        isFetching: false,
      }));
      setCount(reponse.data.count);
    } catch (error) {
      setOrdersData((prev) => ({
        ...prev,
        isFetching: false,
      }));
    }
  };

  useEffect(() => {
    console.log(viewType);
    if (viewType === "table") {
      fetchOrdersTable();
    }
  }, [viewType, page, orderBy, orderDirection]);

  const refetchData = () => {
    fetchOrdersTable();
  };

  let heads = [
    {
      headText: "Nombre",
      headNormalize: "fullname",
      orderby: null,
    },
    {
      headText: "Folio",
      headNormalize: "folio",
      orderby: null,
    },
    {
      headText: "Total",
      headNormalize: "total",
      orderby: null,
    },
    {
      headText: "Estatus",
      headNormalize: "estado",
      orderby: null,
    },
    {
      headText: "Teléfono envío",
      headNormalize: "telEnvio",
      orderby: null,
    },
    {
      headText: "Estado envío",
      headNormalize: "estadoEnv",
      orderby: null,
    },
    {
      headText: "Municipio envío",
      headNormalize: "municipioEnv",
      orderby: null,
    },
    {
      headText: "Cuenta pago",
      headNormalize: "cuentaPago",
      orderby: null,
    },
    {
      headText: "Método pago",
      headNormalize: "metodoPago",
      orderby: null,
    },
    {
      headText: "Formato pago",
      headNormalize: "formatoPago",
      orderby: null,
    },
    {
      headText: "Observaciones generales",
      headNormalize: "obsGenerales",
      orderby: null,
    },
    {
      headText: "Fecha creación",
      headNormalize: "fechaCreacion",
      orderby: null,
    },
    {
      headText: "Fecha actualización",
      headNormalize: "fechaUpdate",
      orderby: null,
    },
  ];

  const customColumns = {
    fullname: {
      columname: "Nombre",
      component: (item) => {
        return (
          <div className="TableName">
            <p
              className="name"
              style={{
                color: "#000A64",
                fontWeight: "bold",
                fontSize: "13px",
              }}
              onClick={() => {}}
            >
              {item.fullname}
            </p>
          </div>
        );
      },
    },
    estado: {
      columname: "Estado",
      component: (item) => {
        return (
          <div
            className="TableName"
            style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: 15,
              background: getColorStatusOrder(item.estado).bgColor,
            }}
          >
            <p
              className="name"
              style={{
                color: getColorStatusOrder(item.estado).color,
              }}
              onClick={() => {}}
            >
              {item.estado}
            </p>
          </div>
        );
      },
    },
    estadoEnv: {
      columname: "Estado envío",
      component: (item) => {
        return (
          <div className="TableName">
            <p
              className="name"
              style={{
                color: "#890003",
                fontSize: "13px",
              }}
              onClick={() => {}}
            >
              {item.estadoEnv}
            </p>
          </div>
        );
      },
    },
    municipioEnv: {
      columname: "Municipio envío",
      component: (item) => {
        return (
          <div className="TableName">
            <p
              className="name"
              style={{
                color: "#000089",
                fontSize: "13px",
              }}
              onClick={() => {}}
            >
              {item.municipioEnv}
            </p>
          </div>
        );
      },
    },
    fechaCreacion: {
      columname: "Fecha creación",
      component: (item) => {
        return (
          <div className="TableName">
            <p
              className="name"
              style={{
                color: "#5C007C",
                fontSize: "13px",
              }}
              onClick={() => {}}
            >
              {item.fechaCreacion}
            </p>
          </div>
        );
      },
    },
  };

  return {
    data,
    ordersData,
    events,
    heads,
    customColumns,
    count,
    refetchData,
    modalActions: {
      modalViews,
      handleToggleModal,
    },
    paginationData: {
      handlePage,
      page,
      limit,
    },
  };
}
