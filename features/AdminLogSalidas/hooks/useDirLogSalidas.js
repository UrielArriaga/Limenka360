import { useState,useEffect } from "react";
import { ExitsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { getColor } from "../utils";
import { useRouter } from "next/router";

export default function useDirLogSalidas() {
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
  let actions = [
    {
      name: "Ver",
      action: (e) => {
        setexitSelected(e);
        setIsOpenPreview(true);
      },
    },
  ];

  useEffect(() => {

    getData();
  },[page, orderBy,keyword, folioParamUrl]);

  const getData = async(removeKeyword) => {
    try {
      setIsFetchingData(true);
      
      let query = {};

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
      const response = await exitsService.getExits(limit,page,orderBy,query);
      let res = response.data.results;
      let normalizeData = res.map(item => exitsService.normalizeDataExits(item));
      setData(normalizeData);
      setTotalExits(response.data.count);
      setIsFetchingData(false);
      if(folioParamUrl){
        let exit = normalizeData?.find( item=> item?.folio === folioParamUrl);
        if(exit) handleOnClickRow(exit);
      }
    } catch (error) {
      console.log(error);
      setIsFetchingData(false);
    }
  }
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
    if(folioParamUrl) router.push("/administracionlogistica/salidas");
  };
  const refetchData = () => getData();
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
      customColumns
    },
    refetchData
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
    headText: "Cantidad",
    headNormalize: "quatity",
    orderby: null,
  },
];
