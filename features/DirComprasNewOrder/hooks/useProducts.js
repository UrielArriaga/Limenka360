import React, { useState } from "react";
import useModal from "../../../hooks/useModal";

export default function useProducts({ viewControl }) {
  const [products, setProducts] = useState([]);

  const [serialNumbersbyProduct, setserialNumbersbyProduct] = useState([]);

  const [productSelected, setProductSelected] = useState(null);

  const { open: isOpenSerialNumbers, toggleModal: toggleModalNumers } = useModal();

  const handleOnClickAddProduct = product => {
    setProducts([...products, product]);
  };

  const handleOnChangeProperty = (index, property, value) => {
    const newProducts = [...products];

    newProducts[index][property] = value;

    if (property === "quantity") {
      newProducts[index].amount = Number(value) * Number(newProducts[index].unitprice);
      newProducts[index].subtotal = Number(value) * Number(newProducts[index].unitprice);
    }
    setProducts(newProducts);
  };

  const handleOnClickDeleteProduct = index => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleOnClickOpenAddSerials = product => {
    setProductSelected(product);
    toggleModalNumers();
  };
  return {
    productControl: {
      serialNumbersbyProduct,
      products,
      isOpenSerialNumbers,
      handleOnClickAddProduct,
      handleOnChangeProperty,
      handleOnClickDeleteProduct,
      handleOnClickOpenAddSerials,
      setProducts,
      toggleModalNumers,
    },
  };
}
