import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { normalizeProductsPackage } from "../utils/normalizeOrder";

export default function useOrder(steps) {
  const [oportunity, setOportunity] = useState({});
  const [productsData, setProductsData] = useState({
    products: [],
    count: 0,
    isFetching: true,
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchInitialData();
      //   getQuotesByOportunity();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    //
    // if (steps > 0 && oportunity.id) {
    //   fetchProductsOportunity();
    // }

    if (oportunity && oportunity.id) {
      fetchProductsOportunity();
    }
  }, [oportunity]);

  const fetchInitialData = async () => {
    // let param = {
    //   id: router.query.o,
    // };

    try {
      let params = {
        where: JSON.stringify({
          id: router.query.o,
        }),
        include: "prospect,typesale",
        join: "prospect,typesal",
        // keys: "id,paymentperiodicity,payments,comissiontype,typesaleId",
      };
      // let responseOportunity = await api.get(`oportunities?&include=prospect&where=${JSON.stringify(param)}`);
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

  return {
    oportunity,
    productsData,
    setProductsData,
    register,
    errors,
  };
}
