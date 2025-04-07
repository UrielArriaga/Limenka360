import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";

export default function useDirLogPedido(orderSelected) {
  const ordersService = new OrdersServices();

  const [orderSelectedData, setOrderSelectedData] = useState(null);

  const [productOportunitySelected, setProductOportunitySelected] = useState(null);
  const [wereHouseSelected, setWereHouseSelected] = useState(null);
  const [allProductsHaveWereHouse, setAllProductsHaveWereHouse] = useState(false);

  const [productsData, setProducts] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });

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

        setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
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

  return {
    actionsPedido: {
      handleOnClickwerehouse,
      setProductOportunitySelected,
      setWereHouseSelected,
      handleOnClickSave,
      handleOnClickSaveOrder,
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
  };
}
