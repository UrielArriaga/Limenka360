import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleGlobalAlert } from "../../../utils";
import { api } from "../../../services/api";
import { useDispatch } from "react-redux";
import { getProductsCommon } from "../../../redux/slices/commonSlice";

export default function useNewProduct({ refreshData, close, producSelect, isEditing }) {
  const [loadingCreated, setLoadingCreated] = useState(false);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProducts();

  }, []);

  const getProducts = () => {
    let paramsProducts = {
      include: "category,provider,brand,productstype",
      join: "category,pro,bra,prodTy",
      where: `{"isactive": true}`,
      all: 1,
      order: "-createdAt",
      count: 1,
    };
    dispatch(getProductsCommon({ params: paramsProducts })).then(response => {
      setProducts(response.payload.results);
    });
  };

  const customFilter = keysearch => {
    let allproducts = products;
    let productSearch = [];
    if (keysearch) {
      productSearch = allproducts.filter(
        item =>
          item.name.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.code.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.category?.name.toLowerCase().includes(keysearch.toLowerCase())
      );
    }
    let limitProducts = productSearch.slice(0, 10);
    setProductSearch(limitProducts);
  };

  const handleAddProduct = async formData => {
    setLoadingCreated(true);
    try {
      let newProduct = {};
      newProduct.name = formData.name;
      newProduct.type = formData.type?.value;
      newProduct.description = formData.description,
      newProduct.physicalstock = formData.physicalstock,
      newProduct.productId = formData.productId?.id || null;
      newProduct.warehouseId = "QIszsqsY124SYHz90qHE83nK";
      newProduct.warehouseproductaccessories = [
        {
          serialnumber: formData.serialnumber,
          inventoryentryId: "Hg19awgOvGNlhryq3nTSOxgs",
          status: formData.status?.value,
          observations: formData.observations,
          available: formData.available?.value,
        },
      ];
      console.log(newProduct);
      let addProductAccesories = await api.post(`productaccessories`, newProduct);
      if (addProductAccesories.status === 201) {
        handleGlobalAlert("success", "Producto Agregado Correctamente!", "basic", dispatch, 6000);
        resetForm();
        refreshData();
        close();
      }
      setLoadingCreated(false);
    } catch (error) {
      handleGlobalAlert("error", "No se pudo agregar, intentalo más tarde!", "basic", dispatch, 6000);
      setLoadingCreated(false);
      console.log(error);
    }
  };

  const handleEditProduct = async formData => {
    try {
      setLoadingCreated(true);

      let editProduct = {};
      editProduct.name = formData.name;
      editProduct.type = formData.type?.value;
      editProduct.description = formData.description,
      editProduct.physicalstock = formData.physicalstock
      editProduct.warehouseproductaccessories = [
        { 
          id: producSelect.warehouseproductaccessoriesId,
          serialnumber: formData.serialnumber,
          inventoryentryId: "Hg19awgOvGNlhryq3nTSOxgs",
          status: formData.status?.value,
          observations: formData.observations,
          available: formData.available?.value,
          warehouseId : "QIszsqsY124SYHz90qHE83nK"
        },
      ];

      let editProducts = await api.put(`productaccessories/${producSelect.id}`, editProduct);
      if (editProducts.status === 200) {
        handleGlobalAlert("success", "Producto Editado correctamente!", "basic", dispatch, 6000);
        resetForm();
        refreshData();
        close();
      }
    } catch (error) {
      console.log(error);
      setLoadingCreated(false);
    }
  }
  if (isEditing && producSelect) {
    setValue("name", producSelect.name);
    setValue("type", producSelect.type);
    setValue("description", producSelect.description);
    setValue("physicalstock", producSelect.physicalstock);
    setValue("serialnumber", producSelect.serialnumber);
    setValue("status", { label: producSelect.status, value: producSelect.status });
    setValue("observations", producSelect.observations);
    setValue("type", { label: producSelect.type, value: producSelect.type });
    setValue("available", producSelect.available ? { label: "Disponible", value: true } : { label: "No Disponible", value: false });
    
  }

  const resetForm = () => {
    setValue("name", "");
    setValue("type", "");
    setValue("description", "");
    setValue("physicalstock");
    setValue("productId");
    setValue("serialnumber");
    setValue("status");
    setValue("observations");
  };

  return {
    optionsType,
    optionsstatus,
    optionsavailable,
    errors,
    control,
    productSearch,
    resetForm,
    customFilter,
    register,
    handleSubmit,
    handleAddProduct,
    handleEditProduct,
    formatOptionLabel
  };
}

const formatOptionLabel = ({ name, code }) => (
  <>
    <div className="product">
      <p className="title">{name}</p>
      <p className="subtitle">
        código: <span className="code">{code}</span>
      </p>
    </div>
  </>
);
const optionsType = [
  { value: "Material", label: "Material" },
  { value: "Refacción", label: "Refacción" },
  { value: "Consumibles", label: "Consumibles" },
  { value: "Equipo de protección", label: "Equipo de protección" },
  { value: "Equipo", label: "Equipo" },
];


const optionsavailable = [
  { value: "true", label: "Disponible" },
  { value: "false", label: "No disponible" },
];
const optionsstatus = [
  { value: "Nuevo", label: "Nuevo" },
  { value: "Usado", label: "Usado" },
];
