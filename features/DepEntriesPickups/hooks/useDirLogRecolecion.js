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
  const [pickuppurchaseorderData, setPickuppurchaseorderData] = useState([]);
  const [suppliesData, setSuppliesData] = useState([]);
  const [pickupsSelect, setPickupsSelected] = useState(null);
  const [lastFetchDate, setLastFetchDate] = useState(null);
  const [suppliesWarehouseProducts, setSuppliesWarehouseProducts] = useState({
    data: [],
    total: 0,
    isFetching: false,
  });
  const router = useRouter();
  const folioParamUrl = router?.query?.folio;

  const handleOnClickRow = item => {
    setPickupsSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  useEffect(() => {
    fetchpickups();
  }, [orderBy, page, limit, keyword, activeFilters, folioParamUrl]);

  useEffect(() => {
    if (pickupsSelect?.id) {
      fetchPickupPurchaseOrder(pickupsSelect.id);
    }
  }, [pickupsSelect]);

  useEffect(() => {
    if (pickuppurchaseorderData?.purchaseorderId) {
      fetchSupplies(pickuppurchaseorderData?.purchaseorderId);
      fetchSuppliesWareHouseProducts(pickuppurchaseorderData?.purchaseorderId);
    }
  }, [pickuppurchaseorderData?.purchaseorderId]);

  const fetchPickupPurchaseOrder = async pickupId => {
    try {
      const res = (await DirLogService.getpickuppurchaseorder(pickupId)).data;
      const pickUpData = res.results?.[0] || {};
      const normalized = DirLogService.normalizepickuppurchaseorders(pickUpData);
      console.log("normalizedPickupPurchaseOrder:", normalized);
      setPickuppurchaseorderData(normalized);
      if (folioParamUrl) {
        handleOnClickRow(normalized);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSuppliesWareHouseProducts = async id => {
    try {
      setSuppliesWarehouseProducts(prevState => ({ ...prevState, isFetching: true }));
      let response = await DirLogService.suppliesWarehouseProducts(id);
      if (response.status === 200 || response.status === 201) {
        setSuppliesWarehouseProducts({
          data: response?.data?.results,
          total: response?.data?.count,
          isFetching: false,
        });
      }
    } catch (error) {
      setSuppliesWarehouseProducts(prevState => ({ ...prevState, isFetching: false }));
      console.log(error);
    }
  };

  const fetchSupplies = async purchaseorderId => {
    try {
      console.log("purchaseorderId:", purchaseorderId);
      const res = (await DirLogService.getsupplies(purchaseorderId)).data;
      console.log("API Supplies:", res);
      let results = res.results;
      const normalized = results.map(DirLogService.normalizesupplies);
      setSuppliesData(normalized);
    } catch (error) {
      console.error("Error supplies:", error);
      setSuppliesData([]);
    }
  };

  const fetchpickups = async removeKeyword => {
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
      const resData = (await DirLogService.getpickups(limit, page, orderBy, query)).data;

      let pickups = resData.results || [];
      let total = resData.count || 0;
      const normalizedPickups = pickups.map(DirLogService.normalizepickups);

      setTotalResults(total);
      setData(normalizedPickups);
      setIsFetchingData(false);
      setLastFetchDate(dayjs().format("DD/MM/YYYY"));
      if (folioParamUrl) {
        let pickup = normalizedPickups?.find(item => item.folio == folioParamUrl);
        fetchPickupPurchaseOrder(pickup?.id);
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
    fetchpickups();
  };
  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };
  const deleteKeyWord = () => {
    setKeyword("");
    delete router?.query;
    fetchpickups(true);
    if (folioParamUrl) router?.push("/encargadoentradas/recolecciones");
  };

  return {
    handleOnClickRow,
    handleOnClickClosePreview,
    isOpenPreview,
    pickupsSelect,
    pickuppurchaseorderData,
    suppliesData,
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
    suppliesWarehouseProducts
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
    headNormalize: "folioOrder",
    orderby: null,
  },
  {
    headText: "Chofer",
    headNormalize: "driver",
    orderby: null,
  },
  {
    headText: "Unidad",
    headNormalize: "transportunit",
    orderby: null,
  },
  {
    headText: "Status",
    headNormalize: "statuswho",
    orderby: null,
  },
  ,
];

const initialData = [];
