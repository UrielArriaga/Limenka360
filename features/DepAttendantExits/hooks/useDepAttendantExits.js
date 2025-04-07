import React, { useEffect, useState } from "react";
import { heads, initialData } from "../data";
import DepAttendantExitsService from "../services";
import { CheckCircle, FiberManualRecord, Visibility } from "@material-ui/icons";
import { getColorStatusOrder } from "../../../utils/DirLog";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { colorLog } from "../../../utils";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function useDepAttendantExits(activeFilters) {
  const instance = new DepAttendantExitsService();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [inventoryExitSelected, setInventoryExitSelected] = useState(null);  
  const [infOrder, setInfOrder] = useState();
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [selectOrder, setSelectorder] = useState();
  const router = useRouter()
  const folioParamUrl = router?.query?.folio;
  const buildQuery = () => {
    let query = {
      isfinish: true,
    };

    if (activeFilters?.length > 0) {
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
              };
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
  }, [page, activeFilters, keyword, folioParamUrl]);

  const getData = async (removeKeyword) => {
    try {
      let query = {};
      query = buildQuery();
      if (!removeKeyword && keyword?.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }
      if (!removeKeyword && folioParamUrl) {
        query.folio = {
          $iRegexp: folioParamUrl
        };
        setKeyword(folioParamUrl)
      }
      let resp = (await instance.getDataExits(limit, page, "-createdAt", query)).data;
      colorLog(resp, "blues");
      let normalizeData = resp.results?.map(item => instance.normalizeDataExits(item));
      setData(normalizeData);
      setCount(resp.count);
      if(folioParamUrl){
        let exits = normalizeData?.find( item => item.folio == folioParamUrl);
        if(exits) handleOnClickRow(exits);
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al obtener los datos");
    }
  };

  const getwharehouseProductsorderId = async id => {
    setIsFetchingOrder(true);
    try {
      let respaticles = (await instance.wareHouseArticles(id)).data;
      setSelectorder(respaticles.results);
      getOrderSelected(id);
      setIsFetchingOrder(false);
    } catch (error) {
      console.log("error", error);
    }

    return;
  };

  const getOrderSelected = async id => {
    try {
      let resp = (await instance.getOrder(id)).data;
      setInfOrder(resp);
      setIsFetchingOrder(false);
    } catch (error) {}
  };

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setInventoryExitSelected(item);
    getwharehouseProductsorderId(item.orderId);
    
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);

  const handleClickDeleteKeyWord = () => {
    setKeyword("");
    delete router?.query;
    getData(true);
    if(folioParamUrl) router.push("/encargadosalidas/salidas");
  }

  const handleClickRefetchData = () => getData();

  const handleClickFillOrder = async () => window.confirm("¿Estás seguro de marcar como revisado este pedido?");

  const updateStateData = (id, state = {}) => {
    let newData = data.map(itemTable => {
      if (itemTable.id === id) {
        return { ...itemTable, ...state };
      }
      return itemTable;
    });
    setData(newData);
  };

  const updateStateProducts = (id, state) => {
    let newProducts = selectOrder.map(product => {
      if (product.id === id) {
        return { ...product, state };
      }
      return product;
    });

    setSelectorder(newProducts);
  };

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
              {item.status == "" ? "N/A" : item.status}
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
    inroute: {
      columname: "Factura",
      component: item => {
        return (
          <div className="TableName">
            <FiberManualRecord
              style={{
                fontSize: 10,
                color: item.inroute ? "green" : "#e0e0e0",
              }}
            />
          </div>
        );
      },
    },
  };
  let actions = [
    {
      name: "Ver detalles",
      icon: <Visibility />,
      action: e => {
        setInventoryExitSelected(e);
        handleOnClickRow(e);
      },
    },
    {
      name: "Marcar como revisado",
      icon: <CheckCircle style={{ fontSize: 20 }} />,
      action: e => {
        setInventoryExitSelected(e);
        handleClickFillOrder();

        console.log(e);
      },
    },
  ];

  return {
    results,
    count,
    inventoryExitSelected,
    handleClickFillOrder,
    isFetchingOrder,
    selectOrder,
    infOrder,
    tableData: {
      heads,
      data,
      customColumns,
      actions,
    },
    paginationData: {
      handlePage,
      page,
      limit,
    },
    keyword,
    setKeyword,
    isOpenPreview,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    handleClickDeleteKeyWord,
    handleClickRefetchData,
    updateStateData,
    updateStateProducts,
  };
}
