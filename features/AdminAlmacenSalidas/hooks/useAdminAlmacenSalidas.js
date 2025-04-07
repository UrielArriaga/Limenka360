import { useState, useEffect } from "react";
import { ExitsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { getColor } from "../utils";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function useAdminAlmacenSalidas(activeFilters) {
  const exitsService = new ExitsServices();
  const [data, setData] = useState();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [exitSelected, setexitSelected] = useState(null);
  const [totalExits, setTotalExits] = useState();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const folioParamUrl = router?.query?.folio;

  const buildQuery = () => {
    let query = {};
    if(activeFilters.length > 0) {
      for (let i = 0; i <= activeFilters?.length; i++) {
        if (activeFilters[i]?.parent) {
          if (activeFilters[i]?.parent === "dates") {
            if (activeFilters[i]?.option.id == "range") {
              query[activeFilters[i]?.valuedb] = {
                $gte: activeFilters[i]?.option?.value?.startDate,
                $lte: activeFilters[i]?.option?.value?.endDate,
              };
              
            } else {
              query[activeFilters[i].valuedb] = {
                $gte: dayjs().startOf(activeFilters[i]?.option?.id).format(),
                $lte: dayjs().endOf(activeFilters[i]?.option?.id).format(),
              }
            }
  
          } else {
            query[activeFilters[i]?.valuedb] = activeFilters[i]?.value;
          }
        }
      }
    }

    return query;
  };

  useEffect(() => {
    getData();
  }, [page, orderBy, keyword, activeFilters, folioParamUrl]);

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
      if (!removeKeyword && folioParamUrl) {
        query.folio = {
          $iRegexp: folioParamUrl,
        };
        setKeyword(folioParamUrl)
      }
      const response = await exitsService.getExits(limit, page, orderBy, query);
      let res = response.data.results;
      let normalizeData = res.map(item => exitsService.normalizeDataExits(item));
      setData(normalizeData);
      setTotalExits(response.data.count);
      setIsFetchingData(false);
      if(folioParamUrl){
        let exit = normalizeData?.find( item=> item.folio == folioParamUrl);
        if(exit) handleOnClickRow(folioParamUrl)
      }
    } catch (error) {
      console.log(error);
      setIsFetchingData(false);
    }
  };
  const handleOnClickRow = item => {
    setexitSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const deleteKeyWord = () => {
    setKeyword("");
    delete router?.query;
    getData(true);
    if(folioParamUrl) router.push("/administracionalmacen/salidas");
  };

  const refetch = () => getData()

  let actions = [
    {
      name: "Ver",
      action: e => {
        setexitSelected(e);
        setIsOpenPreview(true);
      },
    },
  ];
  return {
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    setIsFetchingData,
    setexitSelected,
    keyword,
    orderBy,
    setOrderBy,
    exitSelected,
    totalExits,
    isFetchingData,
    isOpenPreview,
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
    refetch
  };
}

const customColumns = {
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
};

let heads = [
  {
    headText: "Fecha de salida",
    headNormalize: "createdAt",
    orderby: null,
  },
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: null,
  },
  {
    headText: "Folio de pedido",
    headNormalize: "folioorder",
    orderby: null,
  },
  {
    headText: "Estatus",
    headNormalize: "status",
    orderby: null,
  },
  {
    headText: "Descripción",
    headNormalize: "description",
    orderby: null,
  },
  {
    headText: "Creado Por",
    headNormalize: "ejecutive",
    orderby: null,
  },
];
