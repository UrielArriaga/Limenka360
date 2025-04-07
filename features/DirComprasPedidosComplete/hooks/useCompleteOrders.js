import React, { useContext, useEffect, useState } from "react";
import { OrdersServices } from "../services";
import { getColorStatusOrder } from "../../../utils/DirLog";
import usePagination from "../../../hooks/usePagination";
import { useRouter } from "next/router";

export default function useCompleteOrders(activeFilters) {
  const ordersService = new OrdersServices();
  const router = useRouter();
  const folioParamUrl = router?.query?.folio;
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-approvedAt");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState(initialData);
  const [orderSelected, setOrderSelected] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters, keyword]);

  const buildQuery = () => {
    let query = {};
    query = {
      ...query,
      orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
      exitstatus: "completado",
    };
    return query;
  };

  const getData = async (removeKeyword) => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (!removeKeyword && keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }
      if(!removeKeyword && folioParamUrl){
        query.folio = {
          $iRegexp: folioParamUrl,
        };
        setKeyword(folioParamUrl);
      }

      const response = await ordersService.getOrders(limit, page, orderBy, query);

      let results = response.data.results;
      setTotalOrders(response.data.count);
      let normalizeData = results.map(item => ordersService.normalizeDataOrders(item));
      setData(normalizeData);
      setIsFetchingData(false);
      if(folioParamUrl){
        let order = normalizeData?.find( item=> item?.folio == folioParamUrl);
        if(order) handleOnClickRow(order);
      }
    } catch (error) {
      console.log(error);
      setIsFetchingData(false);
    }
  };

  const handleOnChangeFilter = (e, typeFilter) => {};

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {
    setKeyword("");
    getData(true);
    delete router?.query;
    if(folioParamUrl) router.push("/directorcompras/pedidoscompletos");
  }

  const refetchData = () => getData();

  let actions = [];

  return {
    isOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    orderBy,
    tableData: {
      heads,
      actions,
      data,
      customColumns,
    },

    paginationData: {
      handlePage,
      page,
      limit,
    },
    totalOrders,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
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
    headText: "Total",
    headNormalize: "total",
    orderby: "-total",
  },
];

const initialData = [
  {
    name: "CMMMAY246",
    createdAt: "03 jun 2024",
    prospectname: "Juan Perez",
    status: "Aprobado",
    classname: "tableRow--highlighted",
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
};
