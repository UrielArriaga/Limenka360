import { useState } from "react";

export default function useProductControl() {
  const [products, setProducts] = useState([]);

  const handleOnChangeProperty = (value, property, index) => {
    const updatedProducts = [...products];
    updatedProducts[index][property] = value;
    if (property === "quantity" || property === "unitprice") {
      updatedProducts[index].amount = updatedProducts[index].quantity * updatedProducts[index].unitprice;
      updatedProducts[index].totalIva = updatedProducts[index].iva ? updatedProducts[index].amount * 0.16 : 0;
    }
    setProducts(updatedProducts);
  };

  const handleCheckboxChange = (event, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].iva = event.target.checked;
    updatedProducts[index].totalIva = event.target.checked ? updatedProducts[index].amount * 0.16 : 0;
    setProducts(updatedProducts);
  };

  const handleOnClickDeleteProduct = index => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleOnClickOpenAddSerials = index => {
    // Lógica para abrir modal de agregar seriales
  };

  return {
    products,
    handleOnChangeProperty,
    handleOnClickDeleteProduct,
    handleOnClickOpenAddSerials,
    handleCheckboxChange,
  };
}
