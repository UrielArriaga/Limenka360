import React, { useEffect } from "react";
import { useState } from "react";
import DirLogRecolecionApi from "../services";
import {getColorStatus} from "../utils"
import usePagination from "../../../hooks/usePagination";
import { Visibility } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function useDirLogRecolecion(activeFilters) {
  const DirLogService = new DirLogRecolecionApi();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [data, setData] = useState(initialData);
  const [totalResults, setTotalResults] = useState(0);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const folioParamUrl = router?.query?.folio;
  const [pickupsSelect, setPickupsSelected] = useState(null);
  const [lastFetchDate, setLastFetchDate] = useState(null);

  const handleOnClickRow = item => {
    setPickupsSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  useEffect(() => {
    fetchpickuppurchaseorder();
  }, [orderBy, page, limit, keyword, activeFilters, folioParamUrl]);

  const fetchpickuppurchaseorder = async (removeKeyword) => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (!removeKeyword && keyword?.length > 3) {
        query.purchaseorder = {
          folio:{ $iRegexp: keyword.trim()},
        };
      }
      if(!removeKeyword && folioParamUrl){
        query.purchaseorder = {
          folio:{ $iRegexp: folioParamUrl?.trim()},
        };
        setKeyword(folioParamUrl);
      }

      const resData = (await DirLogService.getpickuppurchaseorder(limit, page, orderBy, query)).data;
      let pickuppurchaseorder = resData.results || [];
      let total = resData.count || 0;
      const normalizedPickuppurchaseorder = pickuppurchaseorder.map(DirLogService.normalizepickuppurchaseorders);

      setTotalResults(total);
      setData(normalizedPickuppurchaseorder);
      setIsFetchingData(false);
      setLastFetchDate(dayjs().format("DD/MM/YYYY"));
      if(folioParamUrl){
        let pickup = normalizedPickuppurchaseorder?.map( item=> {
          let purchase = item?.purchaseorder;
          if(purchase?.folio === folioParamUrl) return item;
        })

        if(typeof(pickup) == "object"){
          handleOnClickRow(pickup);
        } else {
          handleOnClickRow(pickup[0])
        }
      }
    } catch (error) {
      setIsFetchingData(false);
      console.error(error);
    }
  };

  const buildQuery = () => {
    let query = {};
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "categories":
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
            case "status":
              query[element.valuedb] = element.value;
              break;
          }
        }
      });
    }

    return query;
  };

  const refetchData = () => {
    fetchpickuppurchaseorder();
  };
  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };
  const deleteKeyWord = () => {
    setKeyword("");
    fetchpickuppurchaseorder(true);
    delete router?.query;
    if(folioParamUrl) router.push("/directorlogistica/recolecciones");
  };
  let actions=[
    {
      icon: <Visibility/>,
      name: "Ver detalles",
      action: e => {
        handleOnClickRow(e);
      },
    },
  ];
  return {
    handleOnClickRow,
    handleOnClickClosePreview,
    isOpenPreview,
    pickupsSelect,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    isFetchingData,
    setOrderBy,
    refetchData,
    orderBy,
    totalResults,
    lastFetchDate,
    tableData: {
      heads,
      data,
      customColumns,
      actions
    },
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,
  };
}

let customColumns = {
  folio: {
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
          >
            {item.folio}
          </p>
        </div>
      );
    },
  },
  statuswho: {
    columname: "Estatus",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getColorStatus(item.statuswho).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColorStatus(item.statuswho).color,
            }}
            onClick={() => {}}
          >
            {item.statuswho}
          </p>
        </div>
      );
    },
  },
}



let heads = [
  {
    headText: "Fecha",
    headNormalize: "createdAt",
    orderby: null,
  },
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: null,
  },
  {
    headText: "Proveedor",
    headNormalize: "providerId",
    orderby: null,
  },
  {
    headText: "Observaciones",
    headNormalize: "observations",
    orderby: null,
  },
  {
    headText: "Cantidad",
    headNormalize: "quantity",
    orderby: null,
  },
  {
    headText: "Status",
    headNormalize: "statuswho",
    orderby: null,
  },
  ,
];

const initialData = [
  // {
  //   createdAt: "03 jun 2024",
  //   serie: "123456",
  //   product: "COLDSCULPTING / CRIOLIPOLISIS",
  //   almacen: "Almacen 1",
  //   totalProductos: 5,
  //   levelReposition: "Bajo",
  // },
  // {
  //   createdAt: "03 jun 2024",
  //   serie: "123456",
  //   product: "COLDSCULPTING / CRIOLIPOLISIS",
  //   almacen: "Almacen 1",
  //   totalProductos: 5,
  //   levelReposition: "Bajo",
  // },
  // {
  //   createdAt: "03 jun 2024",
  //   serie: "123456",
  //   product: "COLDSCULPTING / CRIOLIPOLISIS",
  //   almacen: "Almacen 1",
  //   totalProductos: 5,
  //   levelReposition: "Bajo",
  // },
  // {
  //   createdAt: "03 jun 2024",
  //   serie: "123456",
  //   product: "COLDSCULPTING / CRIOLIPOLISIS",
  //   almacen: "Almacen 1",
  //   totalProductos: 5,
  //   levelReposition: "Bajo",
  // },
  // {
  //   createdAt: "03 jun 2024",
  //   serie: "1234526",
  //   product: "BAUMANOMETRO DE MUÑECA",
  //   almacen: "Almacen 2",
  //   totalProductos: 5,
  //   levelReposition: "Bajo",
  // },
];
