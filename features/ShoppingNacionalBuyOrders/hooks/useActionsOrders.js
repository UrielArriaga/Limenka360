import { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import { api } from "../../../services/api";
import dayjs from "dayjs";
import { statuspoo } from "../../../constants";

export const useActionsOrders = (orderSelected, getDataOrder, refetchData) => {
  const [orderFa, setOrderFa] = useState(null);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setOrderFa(orderSelected);
  }, [orderSelected]);

  useEffect(() => {
    const getData = async () => {
      try {
        let resp = await api.get("statuspoo", {
          params: {
            where: JSON.stringify({
              status: 1,
              type: "Compras",
            }),
          },
        });

        setOptions(prev => [
          ...resp?.data?.results?.map(e => ({
            label: e.name,
            value: e.id,
            action: () => handleOnClickOption(e, orderFa),
          })),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [orderFa]);

  const handleOnClickOption = async (e, orderData) => {
    try {
      if (e.name === statuspoo?.listopararecolecion?.label) {
        const confirm = window.confirm(
          "¿Estás seguro de cambiar el estado a listo para recolección? Una vez hecho, no podrás modificarlo y será notificado logística."
        );
        if (!confirm) return;
      }

      const respUpdate = await api.put(`purchaseorders/${orderData.id}`, {
        statuspooId: e.id,
        deliveryDate: dayjs().format(),
        delivered: true,
      });

      getDataOrder();
      refetchData();
      showAlertSucces("Se actualizó correctamente");
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrió un error");
    }
  };

  return {
    options,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
  };
};
