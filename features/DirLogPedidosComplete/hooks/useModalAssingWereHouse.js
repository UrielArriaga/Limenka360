import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useModalAssingWereHouse(
  open,
  warehousesData,
  productsData,
  selectedWarehouse,
  handleAssing,
  setRefetch,
  refetch
) {
  const [error, setError] = useState("");
  const { showAlertError } = useAlertToast();
  const [selectedWarehousePerProduct, setSelectedWarehousePerProduct] = useState({});
  const [warehouseToApply, setWarehouseToApply] = useState(null);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [dataWharehouseproducts, SetDataWharehouseProducts] = useState([]);
  const dataProducts = productsData?.results;
  const productIds = dataProducts?.map(product => product?.productId);

  useEffect(() => {
    if (open) {
      fetchWarehouseOptions();
      initializeWarehouseSelections();
      warehouseOptionss();
    }
  }, [open, dataProducts, selectedWarehouse]);

  const fetchWarehouseOptions = async () => {
    try {
      const query = { productIds: productIds };
      const params = { where: JSON.stringify(query) };
      const response = await api.get("warehouseproducts/availability", { params });
      const dataResults = response?.data?.results;
      SetDataWharehouseProducts(dataResults);
    } catch (error) {
      console.error(error);
    }
  };

  const warehouseOptionss = () => {
    const options = warehousesData.map(warehouse => ({
      value: warehouse.id,
      label: warehouse.name,
    }));
    setWarehouseOptions(options);
  };

  const initializeWarehouseSelections = () => {
    if (dataProducts.length) {
      const initialWarehouseSelection = dataProducts.reduce((acc, product) => {
        acc[product.productId] = selectedWarehouse;
        return acc;
      }, {});
      setSelectedWarehousePerProduct(initialWarehouseSelection);
    }
  };

  const handleWarehouseChange = (productId, warehouseId) => {
    setSelectedWarehousePerProduct(prevState => ({
      ...prevState,
      [productId]: warehouseId,
    }));
  };

  const applyWarehouseToAll = warehouseId => {
    setSelectedWarehousePerProduct(
      dataProducts.reduce((acc, product) => {
        acc[product.productId] = warehouseId;
        return acc;
      }, {})
    );
    setWarehouseToApply(warehouseId);
  };

  const handleWarehouseSelectChange = selectedWarehouseId => {
    setWarehouseToApply(selectedWarehouseId);
    applyWarehouseToAll(selectedWarehouseId);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (Object.values(selectedWarehousePerProduct).some(wh => !wh)) {
      showAlertError("Todos los productos tienen que tener un almacen asignado");
      return;
    }
    setError("");
    handleAssing(selectedWarehousePerProduct);
  };

  return {
    error,
    selectedWarehousePerProduct,
    warehouseToApply,
    warehouseOptions,
    handleWarehouseChange,
    handleWarehouseSelectChange,
    handleSubmit,
  };
}
