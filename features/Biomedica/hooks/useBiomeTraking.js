import React, { useEffect, useState } from "react";
import { BiomedicServices } from "../services";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import { renderIcon, getFileExtension } from "../utils";

export default function useBiomeTranking(productSelect) {
  const trackingInventary = new BiomedicServices();
  const [dataTracking, setDataTracking] = useState(null);
  const { open: openTraking, toggleModal: handleToggleTraking } = useModal();
  const [isFetchingTraking, setIsFetchingTraking] = useState(false);
  const [totalTrakigs, setTotalTrakigns] = useState();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [openPreview, setOpenPreview] = useState(false);
  const [trakingSelect, setTrakingSelect] = useState(null);

  useEffect(() => {
    getTrankings();
  }, [productSelect]);

  const handleOnClickTraking = () => {
    handleToggleTraking();
  };

  const handleOnClickRowTraking = item => {
    if (!item.url) {
      return;
    }
    setOpenPreview(true);
    setTrakingSelect(item);
  };
  const refreshDataTrackings = () => {
    getTrankings();
  };

  const handleDrawerClose = () => {
    setOpenPreview(false);
  };

  const getTrankings = async () => {
    try {
      setIsFetchingTraking(true);
      let query = {};
      query.warehouseproductId = productSelect?.id;
      const response = (await trackingInventary.getInventorytrackings(query, limit, page)).data;
      let res = response.results;
      let normalizeData = res.map(item => trackingInventary.normalizeTrakings(item));
      setDataTracking(normalizeData);
      setTotalTrakigns(response.count);
      setIsFetchingTraking(false);
    } catch (error) {
      console.log(error);
      setIsFetchingTraking(false);
    }
  };

  return {
    openTraking,
    openPreview,
    isFetchingTraking,
    totalTrakigs,
    trakingSelect,
    tableDataTrakings: {
      heads,
      dataTracking,
      customColumns,
    },
    paginationDataTrackigs: {
      handlePage,
      page,
      limit,
    },
    getTrankings,
    handleDrawerClose,
    handleOnClickRowTraking,
    handleToggleTraking,
    handleOnClickTraking,
    refreshDataTrackings,
  };
}

const customColumns = {
  url: {
    columnname: "Evidencias",
    component: item => {
      const extension = getFileExtension(item.url);
      return (
        <div className="TableName">
          <p className="name" style={{ cursor: "pointer" }}>
            {renderIcon(extension)}
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
    headText: "Acción",
    headNormalize: "reason",
    orderby: null,
  },
  {
    headText: "Asunto / Observaciones",
    headNormalize: "observations",
    orderby: null,
  },
  {
    headText: "Tipo de seguimiento",
    headNormalize: "status",
    orderby: null,
  },
  {
    headText: "Creado Por",
    headNormalize: "createdby",
    orderby: null,
  },
  {
    headText: "Evidencias",
    headNormalize: "url",
    orderby: null,
  },
];
