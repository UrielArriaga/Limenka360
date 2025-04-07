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

export default function useDirLogPedidos(activeFilters, isAdmin = false, folio="") {
  const ordersService = new OrdersServices();
  const router = useRouter();
  const { getCatalogBy } = useGlobalCommons();
  const { open: openModalDelivery, toggleModal: toggleModalDelivery } = useModal();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { socket, online } = useContext(SocketContext);
  const [lastFetchDate, setLastFetchDate] = useState(null);
  // const [activeFilters, setActiveFilters] = useState([]);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-approvedAt");
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
  if(folio){
    setKeyword(folio)
  }else{
    setKeyword("")
  }
  },[folio]);

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters, keyword]);

  const buildQuery = () => {
    let query = {};
    // query.orderstatusId = "9eQCIBnRvc990VlJfgswanCh";
    if (isAdmin) query.exitstatus = "revisado";

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

      console.log(query);

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

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleClickFillOrder = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {setKeyword(""), router.replace(router.pathname, undefined, { shallow: true }); };

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
    headText: "Fecha",
    headNormalize: "approvedAt",
    orderby: "-createdAt",
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
    headText: "Cantidad de productos",
    headNormalize: "quantity",
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
