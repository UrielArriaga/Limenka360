import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { normalizeProductsPackage } from "../utils/normalizeOrder";
import { EditOrderService } from "../services";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

export default function useOrder() {
  const orderService = new EditOrderService();
  const { getCatalogBy } = useGlobalCommons();
  const [oportunity, setOportunity] = useState({});
  const [orderData, setOrderData] = useState(null);

  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [productsData, setProductsData] = useState({
    products: [],
    count: 0,
    isFetching: true,
  });

  const router = useRouter();

  useEffect(() => {
    getCatalogBy("filetypes");
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && router.query.op && router.query.pe) {
      fetchOrderData();
      fetchInitialData();
    }
    return () => (mounted = false);
  }, [router.query.op, router.query.pe]);

  useEffect(() => {
    if (oportunity && oportunity.id) {
      fetchProductsOportunity();
    }
  }, [oportunity]);

  const fetchInitialData = async () => {
    try {
      let params = {
        where: JSON.stringify({
          id: router.query.op,
        }),
        include: "prospect,typesale",
        join: "prospect,typesal",
      };

      let responseOportunity = await api.get(`oportunities`, { params });
      setOportunity(responseOportunity.data.results[0]);
    } catch (error) {}
  };

  const fetchProductsOportunity = async () => {
    let params = {
      where: JSON.stringify({
        oportunityId: oportunity.id,
      }),
      include: "product,product.brand,product.category",
      count: 1,
      all: 1,
    };
    try {
      let responseProducts = await api.get("productsoportunities", { params });

      setProductsData({
        products: normalizeProductsPackage(responseProducts.data.results),
        count: responseProducts.data.count,
        isFetching: false,
      });
    } catch (error) {}
  };

  const fetchOrderData = async () => {
    try {
      setIsFetchingOrder(true);
      let responseOrder = await orderService.getDataOrder(router.query.pe);
      setOrderData(responseOrder.data);
      setIsFetchingOrder(false);
    } catch (error) {
      alert("Error al obtener la orden");
      setIsFetchingOrder(false);
    }
  };

  return {
    oportunity,
    orderData,
    productsData,
    setProductsData,
    isFetchingOrder,
  };
}
