import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { FiberManualRecord } from "@material-ui/icons";
import { OrdersServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { ORDERSTATUS, ORDERSTATUS_ALMACEN } from "../../../constants";
import { SocketContext } from "../../../context/socketContext";
import { getColorStatusOrder } from "../../../utils/DirLog";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import useModal from "../../../hooks/useModal";
import { useRouter } from "next/router";

export default function useFloorManagerPedidos(activeFilters, isAdmin = false) {
  const { userData } = useSelector(userSelector);
  const router = useRouter();
  const folioOrderParam = router.query.folio;
  const ordersService = new OrdersServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { socket, online } = useContext(SocketContext);
  const [lastFetchDate, setLastFetchDate] = useState(null);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-approvedAt");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { open: isOpenModalExit, toggleModal: openModalExit } = useModal();
  const [searchProduct, setSearchProduct] = useState(null);
  const [productSelected, setProductSelected] = useState(null);

  const handleClickProduct = product => {
    setSearchProduct(searchProduct?.product?.id);
    setProductSelected(product);
    if (searchProduct) {
      getArticle();
    }
    openModalExit();
  };

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters, keyword, folioOrderParam]);

  const buildQuery = () => {
    let query = {
      exitstatus: {
        $notIn: [ORDERSTATUS.surtir, ORDERSTATUS.surtido, ORDERSTATUS.enpiso]
    }

    };

    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "billing":
              query[element.parent] = element.value === "Con Factura" ? true : false;
              break;
            case "exitstatus":
              query[element.parent] = element.value;
              break;

            case "paymentsacount":
              query[element.valuedb] = element.value;

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
      let inquery = buildQuery();
      let query = {
        warehouseId: userData?.warehouse?.id,
        order: inquery,
      };

      if (keyword && keyword.length > 3) {
        inquery.folio = `${keyword}`;
      }
      if (!removeKeyword && folioOrderParam) {
        query.folio = {
          $iRegexp: folioOrderParam?.trim(),
        };
        setKeyword(folioOrderParam);
      }

      const response = await ordersService.getOrders(limit, page, orderBy, query);
      let results = response.data.results;
      let count = response.data.count;
      setTotalOrders(count);

      let normalizeData = results.map(item => ordersService.normalizeDataOrders(item));
      setData(normalizeData);
      setIsFetchingData(false);
      setLastFetchDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    } catch (error) {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    let getDataOrder = async () => {
      try {
        const response = await api.get(`orders/${orderSelected.orderId}`);

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
    let isOk = window.confirm("¿Estás seguro de enviar a surtir el pedido?");
    if (!isOk) return;

    try {
      let resUpdate = await ordersService.updateOrderStatus(orderSelected.id, ORDERSTATUS_ALMACEN.porsurtir);

      showAlertSucces(`Pedido con folio: ${orderSelected?.folio} marcado enviado a surtir con éxito`);
      let newData = data.map(item => {
        if (item.id === orderSelected.id) {
          item.status = ORDERSTATUS.revisado;
        }
        return item;
      });
      setData(newData);

      // socket?.emit("newnotification", {
      //   orderId: orderSelected?.id,
      //   message: "Pedido Nuevo aprobado por administraciòn",
      //   notificationtype: "revisado",
      // });
    } catch (error) {
      showAlertError("Ocurrió un error al surtir el pedido con folio " + orderSelected?.folio);
    }
  };

  const handleOnClickNewExit = async () => {
    try {
      // alert(JSON.stringify(orderSelected, null, 2));
      console.log(orderSelected);
      let resp = await ordersService.updateOrderStatus(orderSelected.orderId, "en piso");

      // let resUpdate = await ordersService.updateOrderStatusWarehouse(orderSelected.id, ORDERSTATUS.surtido);

      showAlertSucces("Pedido marcado como surtido por jefe de piso");

      socket?.emit("newnotification", {
        orderId: orderSelected?.id,
        message: "Pedido surtido por jefe de piso",
        notificationtype: "surtido",
      });

      getData();
    } catch (error) {
      showAlertError("Ocurrió un error al marcar el pedido ");
    }
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {
    setKeyword("");
    if (folioOrderParam) router.push("/jefedepiso");
    setKeyword("");
    getData(true);
  };

  const refetchData = () => getData();

  return {
    handleOnChangeKeyWord,
    handleOnChangeFilter,
    deleteKeyWord,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleClickFillOrder,
    handleOnClickNewExit,
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
    handleClickProduct,
    searchProduct,

    // handleClickDeleteProduct,
    openModalExit,
    isOpenModalExit,
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
    headText: "Estado de pedido",
    headNormalize: "status",
    orderby: "-exitstatus",
  },
  {
    headText: "Cantidad de productos",
    headNormalize: "quantity",
    orderby: null,
  },
  {
    headText: "Factura",
    headNormalize: "billing",
    orderby: "-billing",
  },
];

let actions = [
  {
    name: "Ver",
    action: e => {},
  },
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
            background: getColorStatusOrder(item.status).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColorStatusOrder(item.status).color,
            }}
            onClick={() => {}}
          >
            {item.status}
          </p>
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
