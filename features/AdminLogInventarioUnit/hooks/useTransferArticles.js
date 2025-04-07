import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";
import dayjs from "dayjs";
import pushNotification from "../../../hooks/notifications";

export default function useTransferArticles(rowsSelected, setRowsSelected, refetchData) {
  const { open: openModalTransfer, toggleModal: toggleModalTransfer } = useModal();
  const [wareHouseSelected, setWareHouseSelected] = useState();

  const [observations, setObservations] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [isUploading, setisUploading] = useState(false);
  const { showAlertSucces, showAlertError, showAlertWarning } = useAlertToast();

  // * SINGLE ARTICLE TO TRANSFER
  const [articleSelected, setArticleSelected] = useState([]);
  console.log("seleccion de alamcen", articleSelected);
  const fetchWarehouses = async () => {
    try {
      if (warehouses.length > 0) return;

      const responseApi = await api.get("/warehouses");
      setWarehouses(responseApi.data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSaveTransfer = async () => {
    try {
      if (rowsSelected.length === 0 && !articleSelected) {
        showAlertWarning("Selecciona al menos un articulo", 5000);
        return;
      }

      if (!wareHouseSelected) {
        showAlertWarning("Selecciona un almacen", 5000);
        return;
      }

      setisUploading(true);

      let data = {
        warehousesproducts: rowsSelected?.length === 0 ? articleSelected : rowsSelected,
        description: observations || "",
        entrydate: dayjs().format(),
        exitdate: dayjs().format(),
        exitwarehouseId: rowsSelected[0]?.warehouseId || articleSelected[0]?.warehouseId,
        entrywarehouseId: wareHouseSelected?.id,
        iscomplete: false,
      };

      let response = await api.post("inventorytransfers/flow", data);
      console.log("el respose de la perticion", response);

      setRowsSelected([]);
      setObservations("");
      toggleModalTransfer();
      refetchData();
      showAlertSucces("Articulos transferidos correctamente");

      setisUploading(false);

      pushNotification(typeSockets.new_inventorytransfer.value, {
        warehouseexitId: rowsSelected[0]?.warehouseId || articleSelected[0]?.warehouseId,
        warehouseentryId: wareHouseSelected?.id,
        warehouseproducts:
          rowsSelected?.length === 0
            ? [{ serialnumber: articleSelected?.serialnumber }]
            : rowsSelected?.map(item => ({ serialnumber: item?.serialnumber })),
        description: observations || "",
      });
    } catch (error) {
      console.log("el error de la peticion---;", error);

      setisUploading(false);
    }

    // try {
    //   const responseApi = await api.post("/articles/transfer", data);
    //
    //   setRowsSelected([]);
    //   toggleModalTransfer();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleOnChangeObservations = e => {
    setObservations(e.target.value);
  };

  const handleOnChangeWareHouse = e => {
    setWareHouseSelected(e);
  };

  const handleOpenModalTransfer = articles => {
    const warehouses = articles.reduce((group, item) => {
      const warehouse = item.warehouse;
      if (!group[warehouse]) {
        group[warehouse] = [];
      }
      group[warehouse].push(item);
      return group;
    }, {});

    const warehouseKeys = Object.keys(warehouses);

    if (warehouseKeys.length > 1) {
      showAlertWarning(
        "No puedes transferir articulos de diferentes almacenes,selecciona articulos de un solo almacen",
        5000
      );
      return;
    }

    toggleModalTransfer();
  };

  const handleCloseTransferModal = () => {
    toggleModalTransfer();
    setArticleSelected([]);
  };

  const handleOnClickSelectArticle = article => {
    setArticleSelected([article]);

    toggleModalTransfer();
  };

  return {
    handlersTransfers: {
      handleOpenModalTransfer,
      handleCloseTransferModal,
      handleOnChangeWareHouse,
      handleOnChangeObservations,
      handleOnSaveTransfer,
      handleOnClickSelectArticle,
      fetchWarehouses,
    },
    statesTransfers: {
      openModalTransfer,
      warehouses,
      articleSelected,
      wareHouseSelected,
      observations,
      isUploading,
    },

    openModalTransfer,
    warehouses,
    wareHouseSelected,
    observations,
    toggleModalTransfer,
    handleOpenModalTransfer,
    handleCloseTransferModal,
    handleOnChangeWareHouse,
    handleOnChangeObservations,
  };
}
