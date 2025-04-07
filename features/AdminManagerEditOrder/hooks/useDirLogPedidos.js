import React, { useContext, useEffect, useState } from "react";
import { getColor } from "../utils";
import { api } from "../../../services/api";
import { CheckBox, CheckCircle, FiberManualRecord, Visibility } from "@material-ui/icons";
import { OrdersAdminServices, OrdersServices } from "../services";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { ORDERSTATUS } from "../../../constants";
import { SocketContext } from "../../../context/socketContext";
import { getColorStatusOrder } from "../../../utils/DirLog";

export default function useDirLogPedidos(
  activeFilters,
  isAdmin = false,
  status,
  setActiveFilters,
  setproductoportunityorder
) {
  const ordersService = new OrdersAdminServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { socket, online } = useContext(SocketContext);
  const { open: openModalDelivery, toggleModal: toggleModalDelivery } = useModal();
  const [lastFetchDate, setLastFetchDate] = useState(null);

  // const [activeFilters, setActiveFilters] = useState([]);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-approvedAt");
  const [productsModal, setProductsModal] = useState({
    results: [],
    isFetching: false,
    isError: false,
  });
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState(initialData);
  const [orderSelected, setOrderSelected] = useState(null);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters, keyword]);

  const buildQuery = () => {
    let query = {};

    switch (status) {
      case "completado":
        query = {
          exitstatus: "completo",
        };
        break;
      case "cancelado":
        query = {
          exitstatus: "cancelado",
        };
        break;
      default:
        query = {
          // exitstatus: {
          //   $notIn: [ORDERSTATUS.completado, ORDERSTATUS.enruta, ORDERSTATUS.entregado],
          // },
          // orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
        };
        break;
    }

    if (isAdmin) query.exitstatus = "revisado";

    console.log(activeFilters);

    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "billing":
              query[element.parent] = element.value === "Con Factura" ? true : false;
              break;

            case "paymentsacount":
              query[element.valuedb] = element.value;

              break;

            case "warehouses":
              query[element.valuedb] = element.value;
              break;

            case "exitstatus":
              query[element.valuedb] = element.value;
              break;

            case "groups":
              query["createdbyid"] = {
                groupId: element.value,
              };
              break;

            case "dates":
              if (element.option.id === "range") {
                query[element.valuedb] = {
                  $gte: element.option?.value?.startDate,
                  $lt: element.option?.value?.endDate,
                };
                return;
              }

              query[element.valuedb] = {
                $gte: dayjs().startOf(element?.option?.id).format(),
                $lt: dayjs().endOf(element?.option?.id).format(),
              };

              break;
          }
        }
      });
    }

    return query;
  };

  const getData = async () => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword,
        };
      }

      const response = await ordersService.getOrders(limit, page, orderBy, query);

      let results = response.data.results;
      setTotalOrders(response.data.count);
      let normalizeData = results.map(item => ordersService.normalizeDataOrders(item));
      setData(normalizeData);
      setIsFetchingData(false);
      setLastFetchDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      // setData(response.data);
    } catch (error) {
      console.log(error);
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    let getDataOrder = async () => {
      try {
        const response = await api.get(`orders/${orderSelected.id}`);

        setOrderSelectedData(response.data);
      } catch (error) {}
    };

    if (orderSelected) {
      getDataOrder();
    }
  }, [orderSelected]);

  const handleOnChangeFilter = (e, typeFilter) => {};

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickRow = item => {
    // setproductoportunityorder(null);
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleClickFillOrder = async callbackRefetchPedido => {
    let isOk = window.confirm("¿Estás seguro de marcar como revisado este pedido?");
    if (!isOk) return;

    try {
      let resUpdate = await ordersService.updateOrderStatus(orderSelected.id, ORDERSTATUS.revisado);
      console.log(resUpdate);
      showAlertSucces(`Pedido con folio: ${orderSelected?.folio} marcado como revisado con éxito`);
      let newData = data.map(item => {
        if (item.id === orderSelected.id) {
          item.status = ORDERSTATUS.revisado;
        }
        return item;
      });
      setData(newData);

      socket?.emit("newnotification", {
        orderId: orderSelected?.id,
        message: "Pedido Nuevo aprobado por administraciòn",
        notificationtype: "revisado",
      });

      callbackRefetchPedido();
    } catch (error) {
      showAlertError("Ocurrió un error al surtir el pedido con folio " + orderSelected?.folio);
    }
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => setKeyword("");

  const refetchData = () => getData();

  let actions = [
    {
      name: "Ver detalles",
      icon: <Visibility />,
      action: e => {
        setOrderSelected(e);
        handleOnClickRow(e);
      },
    },
    {
      name: "Marcar como revisado",
      icon: <CheckCircle style={{ fontSize: 20 }} />,
      action: e => {
        setOrderSelected(e);
        handleClickFillOrder();
      },
    },
  ];

  const GetSuplaceProducts = async itemProduct => {
    try {
      // if (itemOrder?.results?.length === 0) return;
      setProductsModal({ results: [], isFetching: true, isError: false });
      let respProduct = await Suplace(itemProduct.purchaseO);
      let products = respProduct.results || [];
      let normalizeProducts = products?.map(item => {
        let { product } = item;

        return {
          Cant: item?.quantity || "N/A",
          code: product.code || "N/A",
          name: product.name || "N/A",
          marca: product.brand.name || "N/A",
          unidad: item.unit || "N/A",
          descripcion: `${product.description == "" ? "N/A" : product.description}`,
        };
      });

      itemProduct.products = normalizeProducts;
      setProductsModal({ results: itemProduct, isFetching: false, isError: false });
    } catch (error) {}
  };

  const Suplace = async id => {
    try {
      let params = {
        include: "product,product.brand,product.category",
        // join: "product,product.brand,product.category",
        where: {
          purchaseorderId: id,
        },
      };
      let resp = await api.get(`/supplies`, { params });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  const markedDeliveryProduct = () => {
    toggleModalDelivery();
  };

  return {
    handleOnChangeKeyWord,
    handleOnChangeFilter,
    deleteKeyWord,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleClickFillOrder,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    orderSelected,
    totalOrders,
    setIsFetchingData,
    isFetchingData,
    refetchData,
    lastFetchDate,
    // setActiveFilters,
    // activeFilters,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data,
      customColumns,
    },
    setIsOpenPreview,
    openModalDelivery,
    toggleModalDelivery,
    markedDeliveryProduct,
    GetSuplaceProducts,
    productsModal,
    // * Dialog Trackings
    // openTrackings,
    // toggleTrackingsModal,
  };
}

let heads = [
  {
    headText: "Fecha",
    headNormalize: "approvedAt",
    orderby: "-approvedAt",
  },
  {
    headText: "Folio",
    headNormalize: "Folio",
    orderby: "-folio",
  },
  {
    headText: "Tipo de venta",
    headNormalize: "typesale",
    orderby: "-typesale",
  },
  {
    headText: "Estado de pedido",
    headNormalize: "orderstatus",
    orderby: "-orderstatusId",
  },

  {
    headText: "Cuenta de pago",
    headNormalize: "paymentaccount",
    orderby: "-paymentaccountId",
  },

  {
    headText: "Total",
    headNormalize: "total",
    orderby: "-total",
  },
  // {
  //   headText: "Factura",
  //   headNormalize: "billing",
  //   orderby: "-billing",
  // },
];

const initialData = [
  {
    name: "CMMMAY246",
    createdAt: "03 jun 2024",
    prospectname: "Juan Perez",
    status: "Aprobado",
    classname: "tableRow--highlighted",

    // classname: "tableRow--highlighted",
  },
  {
    name: "EJEC5MAY2417",
    createdAt: "03 jun 2024",
    status: "Aprobado",
    prospectname: "Juan Perez",

    // isviewed: false,
  },
  {
    name: "ZJEC5MAY2417",
    createdAt: "03 jun 2024",
    status: "Pendiente",
    prospectname: "Juan Perez",
    // isviewed: false,
  },
];

const customColumns = {
  Folio: {
    columname: "Folio",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            style={{
              color: "#034D6F",
              fontWeight: "bold",
            }}
            onClick={() => {}}
          >
            {item.folio}
          </p>
        </div>
      );
    },
  },
  orderstatus: {
    columname: "Estatus",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 4,
            width: "80%",

            background: getColorStatusOrder(item.orderstatus).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColorStatusOrder(item.orderstatus).color,
              padding: 1,
            }}
            onClick={() => {}}
          >
            {item.orderstatus}
          </p>
        </div>
      );
    },
  },
  total: {
    columname: "Total",
    component: item => {
      return (
        <div className="TableName">
          <p className="name">{item.total}</p>
        </div>
      );
    },
  },
  billing: {
    columname: "Factura",
    component: item => {
      return (
        <div className="TableName">
          <FiberManualRecord
            style={{
              fontSize: 10,
              color: item.billing ? "green" : "#e0e0e0",
            }}
          />
        </div>
      );
    },
  },
};
