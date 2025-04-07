import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { generateTemporalId, handleGlobalAlert } from "../../../utils";
export default function useEditPackage(props) {
  const { packageSelected, functionsProducts, close, open } = props;
  const productsBackup = packageSelected?.inPackage;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { productsData, setProductsData } = functionsProducts;

  useEffect(() => {
    if (productsBackup || open) {
      let copyProducts = [...productsBackup];
      let normalize = normalizeToEditProduct(copyProducts);
      setProducts(normalize);
    }
  }, [productsBackup, open]);

  const handleEditTable = (index, id, data) => {
    let copyProducts = products.map(item => item);
    let value = data.floatValue || 0;
    copyProducts[index][id] = value;
    setProducts(copyProducts);
  };

  const handleDeleteProduct = id => {
    let deleteProduct = products.filter(item => item.local_id !== id);
    setProducts(deleteProduct);
  };

  const handleSaveChangesPackage = () => {
    let copyProductsData = { ...productsData };
    let copyProducts = [...copyProductsData.products];
    copyProducts[packageSelected.index].inPackage = normalizeAddNewValues(products);
    copyProductsData.products = copyProducts;
    setProductsData(copyProductsData);
    handleGlobalAlert("success", "Paquete Actualizado", "basic", dispatch, 6000);
    close();
  };

  const normalizeToEditProduct = products => {
    let newproducts = products.map(item => {
      let prod = { ...item };
      prod.cantidad = item.quantity;
      prod.precio = item.callamount;
      prod.local_id = generateTemporalId(7);
      prod.total_product = item.total;
      return prod;
    });
    return newproducts;
  };

  const normalizeAddNewValues = products => {
    let newproducts = products.map(item => {
      let prod = { ...item };
      prod.quantity = item.cantidad;
      prod.callamount = item.precio;
      prod.total = item.total_product;

      return prod;
    });
    return newproducts;
  };

  return {
    states: {
      products,
    },
    functions: {
      handleEditTable,
      handleSaveChangesPackage,
      handleDeleteProduct,
    },
  };
}
