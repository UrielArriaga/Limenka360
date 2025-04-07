import { useState, useEffect } from "react";
import { ExitsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { getColor } from "../utils";

export default function useFloorManagerSalidas() {
  const exitsService = new ExitsServices();
  const [data, setData] = useState();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [exitSelected, setexitSelected] = useState(null);
  const [totalExits, setTotalExits] = useState();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");

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
  }, [page, orderBy, keyword]);

  const getData = async () => {
    try {
      setIsFetchingData(true);

      let query = {};

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
          >
            {item.folio}
          </p>
        </div>
      );
    },
  },
  createdby: {
    columname: "Creado por",
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
            {item.createdby}
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
    headText: "Descripción",
    headNormalize: "description",
    orderby: null,
  },
  {
    headText: "Tipo de entrada",
    headNormalize: "typesentry",
    orderby: null,
  },
  {
    headText: "Creado por",
    headNormalize: "createdby",
    orderby: null,
  },
];
