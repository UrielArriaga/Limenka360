import { Visibility } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ORDERSTATUS } from "../../../constants";
import useAlertToast from "../../../hooks/useAlertToast";
import usePagination from "../../../hooks/usePagination";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";
import { useRouter } from "next/router";

export default function useDirLogTransfers(
  activeFilters,
  isAdmin = false,
  status,
  setActiveFilters,
  setproductoportunityorder
) {
  const router = useRouter();
  const folioOrderParam = router?.query?.folio;
  const ordersService = new OrdersServices();
  const [lastFetchDate, setLastFetchDate] = useState(null);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [orderSelected, setOrderSelected] = useState(null);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [isLocalStorageReady, setIsLocalStorageReady] = useState(false);

  const [allInventoryTransfers, setAllInventoryTransfers] = useState({
    data: [],
    isFetchingData: false,
    total: 0,
  });
  const [selectedTransfer, setSelectedTransfer] = useState({});

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters, isLocalStorageReady, folioOrderParam, keyword]);

  const buildQuery = () => {
    let query = {};
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "warehouse":
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
            case "users":
              query[element.valuedb] = element.value;
              break;
          }
        }
      });
    }

    return query;
  };

  const getData = async (removeKeyword) => {
    try {
      setAllInventoryTransfers(prevState => ({ ...prevState, isFetchingData: true }));
      let query = {};
      query = buildQuery();
      if (!removeKeyword && keyword.length > 2) {
        query.folio = {
          $iRegexp: keyword?.trim(),
        };
      }
      if(!removeKeyword && folioOrderParam){
        query.folio = {
          $iRegexp: folioOrderParam?.trim(),
        };
        setKeyword(folioOrderParam);  
      }
      
      const response = await ordersService.getInventoryTransfers(limit, page, orderBy, query);
      let { results, count } = response?.data;
      let normalizeData = results?.map(item => ordersService.normalizeDataTransfers(item));
      setAllInventoryTransfers({ isFetchingData: false, total: count, data: normalizeData });
      if(folioOrderParam){
        let transfer = normalizeData?.find( item=> item?.folio == folioOrderParam);
        if(transfer) handleOnClickRow(transfer)
      }
    } catch (error) {
      console.log(error);
      setAllInventoryTransfers(prevState => ({ ...prevState, isFetchingData: false }));
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
      setKeyword(e.target.value);
      getData();
    }
  };

  const handleOnClickRow = item => {
    setproductoportunityorder(null);
    setIsOpenPreview(true);
    setSelectedTransfer(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {
    setKeyword("");
    getData(true);
    delete router?.query;
    if (folioOrderParam) router.push("/directorlogistica/traspasos");
  };

  const refetchData = () => getData();

  let actions = [
    {
      name: "Ver detalles",
      icon: <Visibility />,
      action: e => {
        setSelectedTransfer(e);
        handleOnClickRow(e);
      },
    },
  ];

  return {
    handleOnChangeKeyWord,
    handleOnKeyEnter,
    handleOnChangeFilter,
    deleteKeyWord,
    handleOnClickRow,
    handleOnClickClosePreview,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    orderSelected,
    refetchData,
    lastFetchDate,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data: allInventoryTransfers,
      customColumns,
    },
    selectedTransfer,
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
    headNormalize: "folio",
    orderby: "-folio",
  },
  {
    headText: "Almacen de Salida",
    headNormalize: "exitwarehouse",
    orderby: null,
  },
  {
    headText: "Almacen de Entrada",
    headNormalize: "entrywarehouse",
    orderby: null,
  },
  {
    headText: "Creado Por",
    headNormalize: "createdBy",
    orderby: null,
  },

  {
    headText: "Fecha de Entrada",
    headNormalize: "entrydate",
    orderby: null,
  },
  {
    headText: "Fecha de Salida",
    headNormalize: "exitdate",
    orderby: null,
  },
];

const customColumns = {
  folio: {
    columname: "folio",
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
};
