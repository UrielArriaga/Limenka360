import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersAdminServices, OrdersAdminServicesz } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";

export default function useDirLogPedido(orderSelected) {
  const ordersService = new OrdersAdminServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const {open, closeModal, toggleModal } = useModal()
  const [productOportunitySelected, setProductOportunitySelected] = useState(null);
  const [wereHouseSelected, setWereHouseSelected] = useState(null);
  const [allProductsHaveWereHouse, setAllProductsHaveWereHouse] = useState(false);

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
    const getProductsOrder = async () => {
      try {
        setProducts(prev => ({ ...prev, isFetching: true }));
        const resProducts = (await ordersService.getProductsOrder(orderSelectedData.oportunityId)).data?.results || [];

        let parentProducts = resProducts.filter(prdOportunity => !prdOportunity.productpackageId);
        let childProducts = resProducts.filter(prdOportunity => prdOportunity.productpackageId);

        let finalProducts = [];

        parentProducts.forEach(prdOportunity => {
          let productslocal = childProducts.filter(child => child.productpackageId === prdOportunity.id);
          prdOportunity.productslocal = productslocal;
          finalProducts.push(prdOportunity);
        });

        setProducts(prev => ({ ...prev, results: finalProducts, isFetching: false }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      }
    };

    if (orderSelectedData) {
      getProductsOrder();
    }
  }, [orderSelected, orderSelectedData]);

  let getDataOrder = async () => {
    try {
      console.log("kakakak");
      setIsFetchingOrder(true);
      const response = await ordersService.getOrder(orderSelected.id);
      let params = {
        include: "shippingtype",
        keys: "shippingtypeId,id",
        // keys: "shippingtype,shippingtypeId",
        where: {
          orderId: orderSelected.id,
        },
      };

      let responseShipping = await api.get(`shippings`, { params });

      console.log(responseShipping);

      setOrderSelectedData({
        ...response.data,
        shipping: responseShipping.data?.results[0]?.shippingtype,
      });

      // setOrderSelectedData(response.data);
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

  const updatePropertyLocal = (property, value) => {
    setOrderSelectedData({ ...orderSelectedData, [property]: value });
  };

  const updateAccountOfOrder = async(account) => {
    try {
      let body = {
        paymentaccountId:account?.id
      }
      let response = await ordersService.putAccountToOrder(orderSelected.id, body);
      if(response.status == 201 || response.status == 200){
        showAlertSucces("Se actualizo correctamente");
        toggleModal();
        getDataOrder()
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al actualizar la cuenta de pago");
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
    refetchPedido,
    updatePropertyLocal,
    getProductsSerial,
    serialProducts,
    open,
    toggleModal,
    closeModal,
    updateAccountOfOrder
  };
}
