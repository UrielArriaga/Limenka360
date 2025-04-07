import React, { useContext, useEffect, useState } from "react";
import { getColor } from "../utils";
import { api } from "../../../services/api";
import { FiberManualRecord } from "@material-ui/icons";
import { OrdersServices } from "../services";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { ORDERSTATUS } from "../../../constants";
import { SocketContext } from "../../../context/socketContext";
import { formatNumber, formatNumberAbrv } from "../../../utils";
import { getColorStatusOrder } from "../../../utils/DirLog";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { set } from "date-fns";
import { useRouter } from "next/router";

export default function useDirLogPedidos(activeFilters, setActiveFilters) {
  const ordersService = new OrdersServices();
  const router = useRouter();
  const folioOrderParam = router?.query?.folio;

  const { getCatalogBy } = useGlobalCommons();
  const { open: openModalDelivery, toggleModal: toggleModalDelivery } = useModal();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { socket, online } = useContext(SocketContext);
  const [lastFetchDate, setLastFetchDate] = useState(null);
  const [isLocalStorageReady, setIsLocalStorageReady] = useState(false);

  // const [activeFilters, setActiveFilters] = useState([]);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("additionalinformation.-approvedlogisticsdate");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState(initialData);
  const [orderSelected, setOrderSelected] = useState(null);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [productsModal, setProductsModal] = useState({
    results: [],
    isFetching: false,
    isError: false,
  });
  let actions = [
    {
      name: "Ver",
      action: e => handleOnClickRow(e),
    },
  ];
  useEffect(() => {
    if (folioOrderParam) {
      setKeyword(folioOrderParam);
    } else {
      setKeyword("");
    }
  }, [folioOrderParam]);

  useEffect(() => {
    if (!isLocalStorageReady) return;
    getData();
  }, [page, orderBy, activeFilters, isLocalStorageReady, folioOrderParam, keyword]);

  useEffect(() => {
    retriveLocalFilters();
  }, []);

  const retriveLocalFilters = () => {
    setIsLocalStorageReady(false);
    let dataToLocalStorage = localStorage.getItem("testcompraslocal001");

    if (dataToLocalStorage) {
      let dataToLocalStorageParsed = JSON.parse(dataToLocalStorage);
      setActiveFilters(dataToLocalStorageParsed.activeFilters);
      setKeyword(dataToLocalStorageParsed.keyword);
      setOrderBy(dataToLocalStorageParsed.orderBy);
    }

    setIsLocalStorageReady(true);
  };

  const buildQuery = () => {
    let query = {};
    query.orderstatusId = {
      $in: ["9eQCIBnRvc990VlJfgswanCh", "ZSNWIj2RxW6FDR9v4WiwD1V1"],
    };
    // if (isAdmin) query.exitstatus = "revisado";

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

  const getData = async removeKeyword => {
    try {
      setIsFetchingData(true);

      let query = {};

      query = buildQuery();

      let orderByOrders = orderBy;

      if (orderBy === "-approvedlogisticsdate") {
        orderByOrders = "additionalinformation.-approvedlogisticsdate";
      }

      if (orderBy === "approvedlogisticsdate") {
        orderByOrders = "additionalinformation.approvedlogisticsdate";
      }
      if (!removeKeyword && folioOrderParam) {
        query.folio = {
          $iRegexp: folioOrderParam?.trim(),
        };
        setKeyword(folioOrderParam);
      }
      if (!removeKeyword && keyword.length > 2) {
        query.folio = {
          $iRegexp: keyword?.trim(),
        };
      }

      let dataToLocalStorage = {
        activeFilters,
        keyword: removeKeyword ? "" : keyword,
        orderBy: orderByOrders,
      };

      localStorage.setItem("testcompraslocal001", JSON.stringify(dataToLocalStorage));

      const response = await ordersService.getOrders(limit, page, orderByOrders, query);

      let results = response.data.results;
      setTotalOrders(response.data.count);

      let normalizeData = results.map(item => ordersService.normalizeDataOrders(item));

      setData(normalizeData);

      setIsFetchingData(false);

      setLastFetchDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));

      if (folioOrderParam) {
        let order = normalizeData.find(item => item.folio === folioOrderParam);
        if (order) {
          handleOnClickRow(order);
        }
      }

      // setData(response.data);
    } catch (error) {
      showAlertError("Ocurrio un error al obtener los pedidos");
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
  const handleOnKeyEnter = e => {
    if (e.key === "Enter") {
      getData();
    }
  };

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleClickFillOrder = async () => {
    let isOk = window.confirm("¿Estás seguro de marcar como revisado este pedido?");
    if (!isOk) return;

    try {
      let resUpdate = await ordersService.updateOrderStatus(orderSelected.id, ORDERSTATUS.revisado);

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
    } catch (error) {
      showAlertError("Ocurrió un error al surtir el pedido con folio " + orderSelected?.folio);
    }
  };

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
    } catch (error) {}
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {
    setKeyword("");
    getData(true);
    delete router?.query;
    if (folioOrderParam) router.push("/directorcompras/pedidos");
  };

  const refetchData = () => getData();

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
    handleOnKeyEnter,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    setIsOpenPreview,
    orderSelected,
    totalOrders,
    setIsFetchingData,
    isFetchingData,
    refetchData,
    lastFetchDate,
    GetSuplaceProducts,
    productsModal,
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
    openModalDelivery,
    toggleModalDelivery,
    markedDeliveryProduct,
    // * Dialog Trackings
    // openTrackings,
    // toggleTrackingsModal,
  };
}

let heads = [
  {
    headText: "Fecha Aprob Logistica",
    headNormalize: "aprovedLogisticAt",
    orderby: "-approvedlogisticsdate",
  },
  {
    headText: "Fecha Aprob Administracion",
    headNormalize: "approvedAt",
    orderby: "-approvedAt",
  },
  {
    headText: "Fecha Edición",
    headNormalize: "updatedAt",
    orderby: "-updatedAt",
  },
  {
    headText: "Ultimo comentario",
    headNormalize: "lastcommentAt",
    orderby: "-lastcommentAt",
  },
  {
    headText: "Folio",
    headNormalize: "Folio",
    orderby: "-folio",
  },
  // {
  //   headText: "Estado de pedido",
  //   headNormalize: "status",
  //   orderby: null,
  // },

  {
    headText: "Estatus logistica",
    headNormalize: "exitstatus",
    orderby: "-exitstatus",
  },
  {
    headText: "*Estatus Compras",
    headNormalize: "statuspoo",
    orderby: null,
  },
  {
    headText: "Tipo de venta",
    headNormalize: "typesale",
    orderby: null,
  },
  {
    headText: "Monto Total",
    headNormalize: "amount",
    orderby: "-total",
  },
];

const initialData = [];

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
  status: {
    columname: "Estatus",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getColor(item.status).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColor(item.status).color,
            }}
            onClick={() => {}}
          >
            {item.status}
          </p>
        </div>
      );
    },
  },

  exitstatus: {
    columname: "Estatus",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getColorStatusOrder(item.exitstatus).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColorStatusOrder(item.exitstatus).color,
            }}
            onClick={() => {}}
          >
            {item.exitstatus}
          </p>
        </div>
      );
    },
  },
  amount: {
    columname: "Monto",
    component: item => {
      return (
        <div className="TableName">
          <p style={{ fontWeight: "bold" }}>{formatNumber(item.amount)}</p>
        </div>
      );
    },
  },
};
