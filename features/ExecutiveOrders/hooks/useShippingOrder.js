import React, { useEffect, useMemo, useState } from "react";
import useModal from "../../../hooks/useModal";

export default function useShippingOrder(productsData, setProductsData) {
  const { open, toggleModal } = useModal();
  const [optionChecked, setOptionChecked] = useState(null);
  const [totalShipping, setTotalShipping] = useState(0);
  // const [totalByProduct, setTotalByProduct] = useState(0);

  const totalByProduct = useMemo(() => {
    let total = 0;
    total = totalShipping / productsData?.products?.length;
    return total;
  }, [totalShipping]);

  useEffect(() => {
    setProductsData({
      ...productsData,
      products: productsData.products.map(product => {
        return {
          ...product,
          totalShipping: totalByProduct || 0,
          totalwithshipping: totalByProduct + product.total,
        };
      }),
    });
  }, [totalByProduct, totalShipping]);
  // const productsFinal = useMemo(() => {
  //   const { products = [] } = productsData;

  //   const productsFinal = products.map(product => {
  //     return {
  //       ...product,
  //       totalShipping: totalByProduct,
  //       totalwithshipping: totalByProduct + product.total,
  //     };
  //   });

  //   return productsFinal;
  // }, [productsData, totalShipping]);

  //

  const handleOnChangeOptionCheck = option => {
    setOptionChecked(option);
  };

  const handleOnChangeTotal = e => {
    setTotalShipping(parseCurrency(e));
    // setTotalShipping(total);
  };

  const handleOnClickAddProduct = () => {
    toggleModal();
  };

  function parseCurrency(value) {
    if (!value) return 0;
    const number = Number(value.replace(/[^0-9.-]+/g, ""));
    return isNaN(number) ? 0 : number;
  }

  return {
    optionChecked,
    totalShipping,
    open,
    handleOnChangeOptionCheck,
    handleOnChangeTotal,
    handleOnClickAddProduct,
  };
}
