import { useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { InventoryEntriesService } from "../services";

export default function useDirLogEntradas() {
  const intentoryService = new InventoryEntriesService();
  const [data, setData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [totalResults, setTotalResults] = useState(0);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [entrySelected, setEntrySelected] = useState(null);

  useEffect(() => {
    fetchInventoryEntries();
  }, []);

  const handleOnClickRow = item => {
    setEntrySelected(item);
    setIsOpenPreview(true);
  };

  const closePreview = item => {
    setIsOpenPreview(false);
  };

  const fetchInventoryEntries = async () => {
    try {
      setIsFetchingData(true);
      const resData = await intentoryService.getInventoryEntries(limit, page, orderBy);
      const data = resData.data.results || [];
      const total = resData.data.count || 0;
      const normalizedData = data.map(intentoryService.normalizeInventoryEntries);
      setData(normalizedData);
      setTotalResults(total);
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
      console.error(error);
    }
  };

  return {
    closePreview,
    entrySelected,
    isOpenPreview,
    handleOnClickRow,
    tableData: {
      heads,
      data,
    },
  };
}

let heads = [
  {
    headText: "Fecha",
    headNormalize: "deliverydate",
    orderby: "-createdAt",
  },
  {
    headText: "Cantidad",
    headNormalize: "quantiy",
    orderby: "name",
  },
  {
    headText: "Orden de compra",
    headNormalize: "quantiy",
    orderby: "name",
  },
];
