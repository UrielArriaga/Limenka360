import React, { useEffect, useState } from "react";
import { getColor } from "../utils";
import { api } from "../../../services/api";
import { FiberManualRecord } from "@material-ui/icons";
import { OrdersServices } from "../services";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import dayjs from "dayjs";

export default function useDirLogPedidos(activeFilters) {
  const ordersService = new OrdersServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  // const [activeFilters, setActiveFilters] = useState([]);

  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState(initialData);
  const [orderSelected, setOrderSelected] = useState(null);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [productSelected, setProductSelected] = useState(null);
  const { open: isOpenModalExit, toggleModal: openModalExit } = useModal();

  const handleClickProduct = product => {
    setProductSelected(product);
    openModalExit();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetchingData(true);

        let query = {
          exitstatus: "por surtir",
        };

        if (activeFilters.length > 0) {
          activeFilters.forEach(element => {
            if (element.parent) {
              switch (element.parent) {
                case "billing":
                  console.log("xxx");
                  query[element.parent] = element.value === "Con Factura" ? true : false;
                  break;

                case "paymentsacount":
                  query[element.valuedb] = element.value;

                  break;

                case "warehouses":
                  query[element.valuedb] = element.value;
                  break;

                case "groups":
                  query["createdbyid"] = {
                    groupId: element.value,
                  };

                  break;
              }
            }
          });
        }

        if (keyword.length > 3) {
          query.folio = {
            $iRegexp: keyword,
          };
        }

        console.log(query);

        console.log(activeFilters);
        const response = await ordersService.getOrders(limit, page, orderBy, query);

        let results = response.data.results;
        setTotalOrders(response.data.count);

        console.log(results);

        let normalizeData = results.map(item => ordersService.normalizeDataOrders(item));

        setData(normalizeData);
        setIsFetchingData(false);

        // setData(response.data);
      } catch (error) {
        console.log(error);
        setIsFetchingData(false);
      }
    };

    getData();
  }, [page, orderBy, activeFilters, keyword]);

  useEffect(() => {
    let getDataOrder = async () => {
      try {
        const response = await api.get(`orders/${orderSelected.id}`);
        console.log(response.data);
        setOrderSelectedData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (orderSelected) {
      getDataOrder();
    }
  }, [orderSelected]);

  const handleOnChangeFilter = (e, typeFilter) => {
    console.log(e, typeFilter);
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickRow = item => {
    console.log(item);
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  const handleOnClickNewExit = async products => {
    let bodyCreateExit = {
      folio: "AIZU98",
      description: "PRIMER SALIDA",
      status: "",
      deliveryAt: dayjs().format("YYYY-MM-DD"),
      warehouseproducts: products.map(item => item.id),
      orderId: orderSelected.id,
    };
    console.log(bodyCreateExit);

    try {
      const response = await ordersService.createInventoryExit(bodyCreateExit);
      console.log(response);
      showAlertSucces("Salida creada correctamente");
    } catch (error) {
      console.log(error);
      showAlertError("Error al crear la salida");
    }
  };

  const deleteKeyWord = () => {
    setKeyword("");
  };

  const refetchData = () => {
    setIsFetchingData(true);
  };

  return {
    handleOnChangeKeyWord,
    handleOnChangeFilter,
    deleteKeyWord,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnClickNewExit,
    refetchData,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    orderSelected,
    totalOrders,
    setIsFetchingData,
    isFetchingData,
    isOpenModalExit,
    openModalExit,
    handleClickProduct,
    productSelected,
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
    headNormalize: "createdAt",
    orderby: "-createdAt",
  },
  {
    headText: "Folio",
    headNormalize: "Folio",
    orderby: "name",
  },

  {
    headText: "Nombre del cliente ",
    headNormalize: "prospectname",
    orderby: null,
  },
  {
    headText: "Estado de pedido",
    headNormalize: "status",
    orderby: "-warehousesstatusId",
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
    action: e => {
      console.log(e);
    },
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
            onClick={() => {
              console.log(item);
            }}
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
            onClick={() => {
              console.log(item);
            }}
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
