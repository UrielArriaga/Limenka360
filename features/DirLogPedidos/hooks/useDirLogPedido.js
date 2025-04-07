import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { SocketContext } from "../../../context/socketContext";

export default function useDirLogPedido(orderSelected) {
  const ordersService = new OrdersServices();
  const { id_user } = useSelector(userSelector);
  const { socket, online } = useContext(SocketContext);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [productOportunitySelected, setProductOportunitySelected] = useState(null);
  const [wereHouseSelected, setWereHouseSelected] = useState(null);
  const [allProductsHaveWereHouse, setAllProductsHaveWereHouse] = useState(false);
  const [ShippingsData, setShippingsData] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });
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

  const [statusPoo, setStatusPoo] = useState([]);

  const getShippingsOrder = async () => {
    try {
      setShippingsData(prev => ({ ...prev, isFetching: true }));
      const shipping = (await ordersService.getShippings(orderSelectedData.id)).data?.results || [];
      const normalizedShipping = shipping.map(item => item.shippingtype?.name || "No especificado");
      setShippingsData(prev => ({ ...prev, results: normalizedShipping, isFetching: false }));
    } catch (error) {
      setShippingsData(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
    }
  };
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);

  useEffect(() => {
    if (orderSelected) {
      getDataOrder();
      getStatuspoo();
    }
  }, [orderSelected]);

  const getStatuspoo = async () => {
    try {
      let response = await ordersService.getStatusPoo();
      if (response.status == 200) {
        setStatusPoo(response?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProductsOrder = async () => {
      try {
        setProducts(prev => ({ ...prev, isFetching: true }));
        const resProducts = (await ordersService.getProductsOrder(orderSelectedData.oportunityId)).data?.results || [];
        setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      }
    };

    if (orderSelectedData) {
      getProductsOrder();
      getShippingsOrder();
    }
  }, [orderSelected, orderSelectedData]);

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

        socket?.emit("neworderapprovedbylogistic", {
          idOrder: orderSelectedData?.id,
          type: "neworderapprovedbylogistic",
          message: "A notificado por el pedido",
        });
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
    ShippingsData,
    refetchPedido,
    handleOnClickApprovedOrder,
    statusPoo,
    getProductsSerial,
    serialProducts
  };
}
