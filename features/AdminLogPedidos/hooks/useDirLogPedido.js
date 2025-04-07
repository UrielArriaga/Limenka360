import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { SocketContext } from "../../../context/socketContext";

export default function useDirLogPedido(orderSelected, statusPoo) {
  const ordersService = new OrdersServices();

  const { showAlertSucces, showAlertError } = useAlertToast();
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const { id_user } = useSelector(userSelector);
  const [productOportunitySelected, setProductOportunitySelected] = useState(null);
  const [wereHouseSelected, setWereHouseSelected] = useState(null);
  const [allProductsHaveWereHouse, setAllProductsHaveWereHouse] = useState(false);
  const { socket, online } = useContext(SocketContext);
  const [productsData, setProducts] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });
  const [serialProducts, setSerialProducts] = useState({
    data:[],
    isFetching:false,
    total:0
  })

  const [isFetchingOrder, setIsFetchingOrder] = useState(false);

  useEffect(() => {
    if (orderSelected) {
      getDataOrder();
    }
  }, [orderSelected]);

  useEffect(() => {
    if (orderSelectedData) {
      getProductsOrder();
    }
  }, [orderSelected, orderSelectedData]);

  const getProductsOrder = async () => {
    try {
      setProducts(prev => ({ ...prev, isFetching: true }));
      const resProducts = (await ordersService.getProductsOrder(orderSelectedData.oportunityId)).data?.results || [];

      setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
    } catch (error) {
      setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
    }
  };

  let getDataOrder = async () => {
    try {
      setIsFetchingOrder(true);
      const response = await ordersService.getOrder(orderSelected.id);
      setOrderSelectedData(response.data);
      setIsFetchingOrder(false);
    } catch (error) {
      setIsFetchingOrder(false);
    }
  };

  const getProductsSerial = async(id) => {
    try {
      setSerialProducts( prevState => ({...prevState, isFetching:true}))
      let response = await ordersService.getSerialProducts(id);
      if(response.status == 200 || response.status == 201){
        setSerialProducts({isFetching:false, data: response.data.results, total:response.data.count });
      }
    } catch (error) {
      console.log(error, " ERROR");
      setSerialProducts( prevState => ({...prevState, isFetching:false}))
    }
  }

  const refetchPedido = async () => {
    getDataOrder();
  };

  const handleOnClickwerehouse = async (product, werehouse) => {
    setWereHouseSelected(werehouse);
  };

  const handleOnClickSave = (productOportunitySelected, wereHouseSelected, quantity) => {
    let wereHouseProducts = {
      total: quantity,
      productId: productOportunitySelected.product.id,
      werehouseId: wereHouseSelected.warehouseId,
      orderId: orderSelectedData.id,
    };

    // update productsData results with the new quantity
    let products = productsData.results;

    products = products.map(product => {
      if (product.id === productOportunitySelected.id) {
        product.x = [wereHouseProducts];
        // product.x = products?.x ? [...products.x, wereHouseProducts] : [wereHouseProducts];
        product.totalAssined = product.totalAssined ? product.totalAssined + quantity : quantity;
      }
      return product;
    });

    setProducts({ ...productsData, results: products });

    console.log(products);
  };

  const handleOnClickSaveOrder = async () => {
    let arrayOfAssings = [];

    productsData.results.forEach(product => {
      if (product.x) {
        product.x.forEach(assig => {
          arrayOfAssings.push(assig);
        });
      }
    });

    try {
      for (let i = 0; i < arrayOfAssings.length; i++) {
        const element = arrayOfAssings[i];

        let res = await api.post("/warehouseorders", element);

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(arrayOfAssings);
  };

  useEffect(() => {
    if (productsData?.results) {
      let allProductsHaveWereHouse = true;
      productsData.results.forEach(product => {
        if (!product.x) {
          allProductsHaveWereHouse = false;
        }
      });

      setAllProductsHaveWereHouse(allProductsHaveWereHouse);
    }
  }, [productsData?.results]);

  const handleOnSendNotification = async product => {
    let isConfirm = window.confirm("¿Estas seguro de enviar la notificación a compras?");
    if (!isConfirm) return;
    showAlertSucces("Se notifico a compras del stock faltante");
  };
  const handleSaveStatusPooToOrder = async () => {
    try {
      let body = {
        statuspooId: statusPoo,
        exitstatus: "Proceso de compra",
      };
      let res = await ordersService.updateStatusOrderById(orderSelectedData?.id, body);

      if (res.status == 200 || res.status == 201) {
        showAlertSucces("estatus del pedido actualizado");
        saveStatusOportunity();
      }

      socket?.emit("neworderapprovedbylogistic", {
        idOrder: orderSelectedData?.id,
        type: "neworderapprovedbylogistic",
        message: "A notificado por el pedido",
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const saveStatusOportunity = async () => {
    try {
      let body = {
        statuspooId: statusPoo,
      };
      let res = await ordersService.updateStatusProductOportunity(productOportunitySelected?.id, body);
      if (res.status == 200 || res.status == 201) {
        showAlertSucces("estatus del producto actualizado");
        updateToApprovedOrder();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateToApprovedOrder = async () => {
    try {
      let body = {
        approvedlogistics: true,
        approvedlogisticsbyId: id_user,
        approvedlogisticsdate: dayjs(new Date()).format(""),
      };
      let response = await api.put(`/additionalinformation/${orderSelectedData?.id}`, body);

      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Aprobado, esta información la vera compras");
        refetchPedido();
      }

      socket?.emit("neworderapprovedbylogistic", {
        idOrder: orderSelectedData?.id,
        type: "neworderapprovedbylogistic",
        message: "A notificado por el pedido",
      });
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const handleOnClickApprovedOrder = async () => {
    let isUpdate = confirm("Estas seguro, esta informacion la podra ver compras");
    if (isUpdate) {
      try {
        let body = {
          approvedlogistics: true,
          approvedlogisticsbyId: id_user,
          approvedlogisticsdate: dayjs(new Date()).format(""),
        };
        let response = await ordersService.updateAditionalDataOrder(orderSelectedData?.additionalinformationId, body);
        if (response.status == 201 || response.status == 200) {
          showAlertSucces("Aprobado, esta información la vera compras");
          normalizeDataAfterUpdate(body);
        }
      } catch (error) {
        console.log(error, " ERROR");
        showAlertError("Error al aprobar el pedido");
      }
    }
  };

  const normalizeDataAfterUpdate = body => {
    let data = { ...orderSelectedData };
    data["additionalinformation"] = body;
    setOrderSelectedData(data);
  };

  return {
    actionsPedido: {
      handleOnClickwerehouse,
      setProductOportunitySelected,
      setWereHouseSelected,
      handleOnClickSave,
      handleOnClickSaveOrder,
      handleOnSendNotification,
    },

    statesPedido: {
      productOportunitySelected,
      wereHouseSelected,
      allProductsHaveWereHouse,
    },
    orderSelectedData,
    isFetchingOrder,
    productsData,
    refetchPedido,
    handleSaveStatusPooToOrder,
    handleOnClickApprovedOrder,
    getProductsSerial,
    serialProducts
  };
}
