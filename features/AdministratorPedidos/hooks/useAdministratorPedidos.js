import { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import AdministratorPedidosService from "../services";
import { heads, customColumns } from "../data";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";

export default function useAdministratorPedidos() {
  const administratorService = new AdministratorPedidosService();
  const { showAlertError } = useAlertToast();

  const { open, toggleModal } = useModal();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [countOrders, setCountOrders] = useState(0);

  const [orders, setOders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      let responseData = (await administratorService.getOrders()).data;
      let orders = responseData?.results.map(order => administratorService.normalizeOrders(order));
      setCountOrders(responseData.count);
      setOders(orders);
    } catch (error) {
      console.log(error);
      showAlertError("Error al obtener los pedidos");
    }
  };

  const handleOnChangeInput = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickRow = order => {
    setOrderSelected(order);
    toggleModal();
  };

  const handleOnCloseModal = () => {
    setOrderSelected(null);
    toggleModal();
  };
  const actions = [
    {
      icon: "edit",
      action: () => {},
    },
    {
      icon: "delete",
      action: () => {},
    },
  ];

  return {
    orders,
    handleOnCloseModal,
    keyword,
    open,
    tableData: {
      heads,
      data: orders,
      customColumns,
      actions,
    },
    paginationData: {
      total: countOrders,
      limit,
      page,
      handlePage,
    },
    orderSelected,
    handleOnChangeInput,
    handleOnClickRow,
  };
}
