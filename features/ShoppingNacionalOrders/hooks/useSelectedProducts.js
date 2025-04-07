import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

export default function useSelectedProducts(productsData) {
  const { roleId } = useSelector(userSelector);
  const [purcharseOrdersToPickups, setPurcharseOrdersToPickups] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openProviderWarningModal, setOpenProviderWarningModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const getSortedProductsByRole = (products, roleId) => {
    if (!products) return [];

    const filteredProducts = products.filter(({ product }) => product.name !== "Envio");
    const nationalProducts = filteredProducts.filter(product => !product.product.import);
    const importedProducts = filteredProducts.filter(product => product.product.import);

    const sortByStockAndName = (a, b) => {
      const aHasStock = a.existStock ? 1 : 0;
      const bHasStock = b.existStock ? 1 : 0;

      if (aHasStock !== bHasStock) {
        return bHasStock - aHasStock;
      }

      return a.product.name.localeCompare(b.product.name);
    };

    if (roleId === "compras") {
      return [...nationalProducts.sort(sortByStockAndName), ...importedProducts.sort(sortByStockAndName)];
    } else if (roleId === "compras_internacional") {
      return [...importedProducts.sort(sortByStockAndName), ...nationalProducts.sort(sortByStockAndName)];
    }

    return products.sort(sortByStockAndName);
  };

  const canSelectProduct = product => {
    return (
      !product?.existStock &&
      !(
        (roleId === "compras" && product.product.import) ||
        (roleId === "compras_internacional" && !product.product.import)
      )
    );
  };

  const getAvailableProviders = () => {
    const providers = new Set();

    productsData.results.forEach(product => {
      const canSelect = canSelectProduct(product);
      if (!product?.existStock && canSelect) {
        providers.add(product.product.provider.companyname);
      }
    });

    return Array.from(providers);
  };

  const handleAccept = () => {
    if (!selectedProvider) {
      return alert("Por favor, selecciona un proveedor.");
    } else {
      handleSelectByProvider(selectedProvider);
      setOpenWarningModal(false);
    }
  };

  const handleSelectByProvider = selectedProvider => {
    const productsToSelect = productsData.results.filter(product => {
      return product.product.provider.companyname === selectedProvider && canSelectProduct(product);
    });

    setPurcharseOrdersToPickups(productsToSelect);
  };

  const handleSelectAll = isChecked => {
    if (isChecked) {
      const productsToSelect = productsData.results.filter(product => {
        return canSelectProduct(product);
      });

      const uniqueProviders = new Set(productsToSelect.map(product => product.product.provider.companyname));

      if (uniqueProviders.size > 1) {
        setOpenWarningModal(true);
        setSelectAll(false);
      } else {
        setPurcharseOrdersToPickups(productsToSelect);
        setSelectAll(true);
      }
    } else {
      setPurcharseOrdersToPickups([]);
      setSelectAll(false);
    }
  };

  const handleAddPurcharseOrder = (isChecked, product) => {
    if (isChecked) {
      if (!product.existStock) {
        if (selectedProvider && selectedProvider !== product.product.provider.companyname) {
          setCurrentProduct(product);
          setOpenProviderWarningModal(true);
        } else {
          setPurcharseOrdersToPickups(prev => [...prev, product]);
          setSelectedProvider(product.product.provider.companyname);
        }
      }
    } else {
      setPurcharseOrdersToPickups(prev => prev.filter(item => item.id !== product.id));

      if (purcharseOrdersToPickups.length === 1) {
        setSelectedProvider(null);
      }
    }
  };

  const handleCloseWarningModal = () => {
    setPurcharseOrdersToPickups([]);
    setSelectAll(false);
    setOpenWarningModal(false);
    setSelectedProvider(null);
  };
  return {
    purcharseOrdersToPickups,
    setPurcharseOrdersToPickups,
    selectedProvider,
    setSelectedProvider,
    selectAll,
    setSelectAll,
    openWarningModal,
    openProviderWarningModal,
    setOpenProviderWarningModal,
    currentProduct,
    getSortedProductsByRole,
    canSelectProduct,
    getAvailableProviders,
    handleAccept,
    handleSelectAll,
    handleAddPurcharseOrder,
    handleCloseWarningModal,
  };
}
