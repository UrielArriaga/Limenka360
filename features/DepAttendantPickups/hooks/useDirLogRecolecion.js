import React, { useEffect } from "react";
import { useState } from "react";
import DirLogRecolecionApi from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";
import { templateOuts } from "../../../templates/templatesHtml";
import { api } from "../../../services/api";
import { saveAs } from "file-saver";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";

export default function useDirLogRecolecion(activeFilters,combinedData) {
  const { userData } = useSelector(userSelector);
  const DirLogService = new DirLogRecolecionApi();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [data, setData] = useState(initialData);
  const [totalResults, setTotalResults] = useState(0);
  const { page, limit,companyname, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [pickupsSelect, setPickupsSelected] = useState(null);
  const [lastFetchDate, setLastFetchDate] = useState(null);
  const [documenNormalize, setDocumentNormalize] = useState();
  
  useEffect(() => {
    if (pickupsSelect && combinedData) {
      const normalizeDocument = DirLogService.normalizeDocument(pickupsSelect, combinedData);
      setDocumentNormalize(normalizeDocument);
    }
  }, [combinedData, pickupsSelect]);
  
  const handleOnClickRow = item => {
    setPickupsSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };
  const handleOnClose = () => {
    setOpenDrawer(false);
  };
  const handleDrawerPrevieOuts = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {}, [open]);

  useEffect(() => {
    fetchpickuppurchaseorder();
  }, [orderBy, page, limit, keyword, activeFilters]);

  const fetchpickuppurchaseorder = async () => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword,
        };
      }
      const resData = (await DirLogService.getpickuppurchaseorder(limit, page, orderBy,companyname,  query)).data;
      let pickuppurchaseorder = resData.results || [];
      let total = resData.count || 0;
      const normalizedPickuppurchaseorder = pickuppurchaseorder.map(DirLogService.normalizepickuppurchaseorders);
   
      setTotalResults(total);
      setData(normalizedPickuppurchaseorder);
      setIsFetchingData(false);
      setLastFetchDate(dayjs().format("DD/MM/YYYY"));
    } catch (error) {
      setIsFetchingData(false);
      console.error(error);
    }
  };
  const handleCrated = async () => {
    let response = templateOuts(documenNormalize);
    try {
      let form = new FormData();
      form.append("name", "oportunidad de prueba");
      form.append("data", response);
      form.append("company", "Meison");
      form.append("group", "yT3L1A9xZr8V3hgUOSJSqOqX");
      form.append("ejecutive", "YNQHRt32OCbt0shXa0yOa51t");
      let dataresults = await api.post("convert/pdf", form);
      let { url } = dataresults.data;
      console.log("URL:: ", url);
      saveInDocuments(documenNormalize, dataresults);
      handleDownloadFile(dataresults.data);
    } catch (error) {
      console.log(error, "ERROR TEMPLATE");
    }
  };
  const saveInDocuments = async (responseData, dataresults) => {
    try {
      let body = {
        url: dataresults.data.url,
        fileextension: "application/pdf",
        orderId: responseData.orderId,
        uploadbyId: userData.id,
        filestypeId: "aAxqY77DbamWtWQ8Am9xbYde",
        size: responseData?.data?.size,
        name: `Salida`,
      };

      let resp = await api.post("documents", body);
    } catch (error) {
      console.log(error);
    }

    handleOnClose();
  };
  const handleDownloadFile = async item => {
    try {
      let typeFile = item?.url.split(".").pop();
      let typeFileName = item?.url.split("/").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: item?.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${typeFileName}`);
    } catch (error) {
      console.log(error);
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
    openDrawer,
    handleOnClose,
    handleDrawerPrevieOuts,
    documenNormalize,
    handleCrated,
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
  model: {
    columname: "Unidad",
    component: item => {
      return (
        <div className="TableName">
          <Tooltip title={item.model}>
            <p
              style={{
                textTransform: "uppercase",
              }}
            >
              {item.model} ({item.tuition})
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
    orderby: "-createdAt",
  },
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: "-folio",
  },
  {
    headText: "Chofer",
    headNormalize: "driver",
    orderby: null,
  },
  {
    headText: "Unidad",
    headNormalize: "model",
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
