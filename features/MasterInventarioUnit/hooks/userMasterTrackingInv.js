import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import DirLogInventaryUnitService from "../services";

export default function userMasterTrackingInv(productInventorySelected) {
  const { open: openTrackings, toggleModal: toggleTrackingsModal } = useModal();
  const trackingInventary = new DirLogInventaryUnitService();
  const [dataTracking, setDataTracking] = useState(null);
  const [dataTrackingTotal, setDataTrackingTotal] = useState(null);
  const [isInventoryTracking, setIsInventoryTracking] = useState(false);
  const limit = 20;
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (openTrackings) {
      getTrackings();
    }
  }, [productInventorySelected, openTrackings, page, flag]);

  const getTrackings = async () => {
    setIsInventoryTracking(true);
    try {
      let query = {};
      query.warehouseproductId = productInventorySelected?.id;
      const resData = (await trackingInventary.getInventorytrackings(query, limit, page)).data;
      setDataTracking(resData.results);
      setDataTrackingTotal(resData.count);
      setIsInventoryTracking(false);
    } catch (error) {
      console.log(error);
      setIsInventoryTracking(false);
    }
  };

  const reloadTrackings = () => {
    setFlag(!flag);
  };

  return {
    openTrackings,
    toggleTrackingsModal,
    dataTracking,
    dataTrackingTotal,
    page,
    setPage,
    limit,
    isInventoryTracking,
    reloadTrackings,
  };
}
