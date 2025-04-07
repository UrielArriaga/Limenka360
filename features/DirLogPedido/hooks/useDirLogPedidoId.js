import React, { useEffect, useState, useContext } from 'react'
import { OrdersApi } from '../services';
import { ORDERSTATUS } from '../../../constants';
import { SocketContext } from '../../../context/socketContext';
import useAlertToast from '../../../hooks/useAlertToast';

function useDirLogPedidoId(pedido) {
  const { socket, online } = useContext(SocketContext);
  const { showAlertError,showAlertSucces, showAlertWarning } = useAlertToast();
  const [dataOrders, setDataOrders] = useState({
    data:[],
    isFetching:false,
  });
  const request = new OrdersApi();

  useEffect(()=>{
    getDataOrder();
  },[pedido])

  const getDataOrder = async() => {
    try {
       setDataOrders({...dataOrders, isFetching:true});
       let response = await request.getOrder(pedido);
       setDataOrders({isFetching:false, data:response.data});
    } catch (error) {
        setDataOrders({...dataOrders, isFetching:false});
        console.log("Error getOrders",error);
    }
  }

  const handleClickFillOrder = async callbackRefetchPedido => {
    let isOk = window.confirm("¿Estás seguro de marcar como revisado este pedido?");
    if (!isOk) return;

    try {
      let resUpdate = await request.updateOrderStatus(pedido, ORDERSTATUS.revisado);
      console.log(resUpdate);
      showAlertSucces(`Pedido con folio: ${dataOrders?.data?.folio} marcado como revisado con éxito`);
      let newData = data.map(item => {
        if (item.id === pedido) {
          item.status = ORDERSTATUS.revisado;
        }
        return item;
      });
      setData(newData);

      socket?.emit("newnotification", {
        orderId: pedido,
        message: "Pedido Nuevo aprobado por administraciòn",
        notificationtype: "revisado",
      });

      callbackRefetchPedido();
    } catch (error) {
      showAlertError("Ocurrió un error al surtir el pedido con folio " + dataOrders?.data?.folio);
    }
  };

  return {
    dataOrders,
    handleClickFillOrder
  }
}

export default useDirLogPedidoId
