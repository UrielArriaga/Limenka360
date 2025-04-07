import { useState, useEffect } from "react";
import { ExitsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { getColor } from "../utils";
import dayjs from "dayjs";
export default function useAdmAlmacenSalidas(activeFilters) {
  const exitsService = new ExitsServices();
  const [data, setData] = useState();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [exitSelected, setexitSelected] = useState(null);
  const [totalExits, setTotalExits] = useState();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");

  const [productSelect, setProductSelect] = useState(null);

  let actions = [
    {
      name: "Ver",
      action: e => {
        setexitSelected(e);
        setIsOpenPreview(true);
      },
    },
  ];
  useEffect(() => {
    getData();
  
  }, [page, orderBy, keyword,activeFilters]);

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
       
      
      const response = await exitsService.getEntries(limit, page, orderBy, query);
      let res = response.data.results;
      let normalizeData = res.map(item => exitsService.normalizeDataExits(item));
      setData(normalizeData);
      setTotalExits(response.data.count);
      setIsFetchingData(false);
    } catch (error) {
      console.log(error);
      setIsFetchingData(false);
    }
  };
  const handleOnClickRow = item => {
    setProductSelect(item)
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
  };
  const buildQuery = () => {
      let query = {};
      if (activeFilters.length > 0) {
        activeFilters.forEach(element => {
          if (element.parent) {
            switch (element.parent) {
              case "typesentries":
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
  const refetchData = () => {
    getData();
  };
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
    productSelect,
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
    refetchData,
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
    orderby: "-createdAt",
  },
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: null,
  },
  {
    headText: "Tipo de entrada",
    headNormalize: "typesentries",
    orderby: null,
  },
  {
    headText: "Descripción",
    headNormalize: "description",
    orderby: null,
  },

  {
    headText: "Creado por",
    headNormalize: "createdby",
    orderby: null,
  },
];
