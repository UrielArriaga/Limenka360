import React, { useEffect } from "react";
import { useState } from "react";
import DirLogRecolecionApi from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";
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

  const fetchpickuppurchaseorder = async removeKeyword => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (!removeKeyword && keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }
      if (!removeKeyword && folioParamUrl) {
        query.folio = {
          $iRegexp: folioParamUrl,
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
      if (folioParamUrl) {
        let pickup = normalizedPickuppurchaseorder?.find(item => item.folio == folioParamUrl);
        if (pickup) handleOnClickRow(pickup);
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
    delete router?.query;
    fetchpickuppurchaseorder(true);
    if (folioParamUrl) router.push("/administracionalmacen/recolecciones");
  };

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
    },
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,
  };
}

let customColumns = {
  stock: {
    columname: "Folio",
    component: item => {
      return (
        <div className="TableName">
          <Tooltip title={item.folio}>
            <p
              style={{
                textTransform: "uppercase",
              }}
            >
              {item.stock}
            </p>
          </Tooltip>
        </div>
      );
    },
  },

  code: {
    columname: "code",
    component: item => {
      return (
        <div className="TableName">
          <p
            style={{
              textTransform: "uppercase",
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.code}
          </p>
        </div>
      );
    },
  },
};


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
    headText: "Chofer",
    headNormalize: "receive",
    orderby: null,
  },
  {
    headText: "Unidad",
    headNormalize: "unit",
    orderby: null,
  },
  {
    headText: "Ruta creada por",
    headNormalize: "driver",
    orderby: null,
  },
  // {
  //   headText: "Estatus",
  //   headNormalize: "status",
  //   orderby: null,
  // },
  // {
  //   headText: "Cantidad",
  //   headNormalize: "quantity",
  //   orderby: null,
  // },
  // {
  //   headText: "Entregado",
  //   headNormalize: "delivered",
  //   orderby: null,
  // },

  // {
  //   headText: "Folio",
  //   headNormalize: "folio",
  //   orderby: null,
  // },
  // {
  //   headText: "Descripción",
  //   headNormalize: "description",
  //   orderby: null,
  // },
  // {
  //   headText: "Cantidad",
  //   headNormalize: "quantity",
  //   orderby: null,
  // },
  // {
  //   headText: "Status",
  //   headNormalize: "statuswho",
  //   orderby: null,
  // },
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
