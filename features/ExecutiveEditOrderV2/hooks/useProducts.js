import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { formatNumber, generateTemporalId } from "../../../utils";
import useModal from "../../../hooks/useModal";
import { ProductService } from "../services/products";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

export default function useProducts(oportunity, orderData) {
  const productsService = new ProductService();
  const { company } = useSelector(userSelector);
  const { toggleModal: toggleDrawerProducts, open: openDrawerProducts } = useModal();
  const { open: openConfirm, toggleModal: toggleModalConfirm } = useModal();
  const [productPackage, setProductPackage] = useState(null);
  const [productPackageToEdit, setProductPackageToEdit] = useState(null);
  const [isEditProduct, setIsEditProduct] = useState(false);

  const [productSelected, setProductSelected] = useState(null);
  const [quantityProductSelect, setQuantityProductSelect] = useState(1);

  const [productsData, setProductsData] = useState({
    results: [],
    count: 1,
    isFetching: false,
  });

  useEffect(() => {
    if (orderData) {
      fetchProducts();
    }
  }, [orderData]);

  const fetchProducts = async () => {
    try {
      let respProducts = await productsService.getProductsByOportunity(orderData?.oportunityId);

      let results = respProducts.data?.results || [];

      // let hasPackages = results.some(prdOportunity => prdOportunity.product?.ispackage);
      //

      let parentProducts = results.filter(prdOportunity => !prdOportunity.productpackageId);
      let childProducts = results.filter(prdOportunity => prdOportunity.productpackageId);

      let finalProducts = [];

      parentProducts.forEach(prdOportunity => {
        let productslocal = childProducts.filter(child => child.productpackageId === prdOportunity.id);
        prdOportunity.productslocal = productslocal;
        finalProducts.push(prdOportunity);
      });

      // let finalProducts = productsService.normalizeNewProducts(respProducts.data.results);
      setProductsData({
        results: finalProducts,
        count: respProducts.data.count,
        isFetching: false,
      });
    } catch (error) {
      alert("Error al cargar los productos", error);
    }
  };

  const hancleOnClickActionPackage = productOportunity => {
    setProductPackage(productOportunity);
    toggleDrawerProducts();
  };

  const handleProductSelected = product => {
    setProductSelected(product);
    toggleModalConfirm();
  };

  const handleOnClickAddProduct = () => {
    let newProductChild = {
      productpackageId: productPackage?.id,
      product: productSelected,
      productId: productSelected?.id,
      quantity: quantityProductSelect,
      newprice: 0,
      total: 0,
      id: "TEMPORALPRD" + generateTemporalId(12),
      isNew: true,
      note: "",
      iva: 0,
      oportunityId: orderData?.oportunityId,
      companyId: company,
    };

    let newProducts = productsData.results.map(prdOportunity => {
      if (prdOportunity.id === productPackage.id) {
        prdOportunity.productslocal.push(newProductChild);
        return prdOportunity;
      }
      return prdOportunity;
    });

    setQuantityProductSelect(1);
    toggleModalConfirm();
    setProductsData({
      ...productsData,
      results: newProducts,
    });
  };

  const handleOnClickActionEdit = (productOportunity, childproductOportunity) => {
    setProductPackage(productOportunity);
    setProductSelected(childproductOportunity?.product);
    setQuantityProductSelect(childproductOportunity?.quantity);
    setProductPackageToEdit(childproductOportunity);
    setIsEditProduct(true);
    toggleModalConfirm();
  };

  const handleOnClidkDeleteProduct = productOportunity => {
    let newProducts = [];

    if (productOportunity.id.startsWith("TEMPORALPRD")) {
      newProducts = productsData?.results.map(prdOportunity => {
        if (prdOportunity.id === productOportunity.productpackageId) {
          prdOportunity.productslocal = prdOportunity.productslocal.filter(
            product => product.id !== productOportunity.id
          );
          return prdOportunity;
        }
        return prdOportunity;
      });
    } else {
      newProducts = productsData?.results.map(prdOportunity => {
        if (prdOportunity.id === productOportunity.productpackageId) {
          prdOportunity.productslocal = prdOportunity.productslocal.map(product => {
            if (product.id === productOportunity.id) {
              product.isDeleted = true;
              return product;
            }
            return product;
          });
          return prdOportunity;
        }
        return prdOportunity;
      });
    }

    setProductsData({
      ...productsData,
      results: newProducts,
    });

    // put a flag isDeleted = true

    // let newProducts = productsData?.results.map(prdOportunity => {
    //   if (prdOportunity.id === productOportunity.productpackageId) {
    //     prdOportunity.productslocal = prdOportunity.productslocal.map(product => {
    //       if (product.id === productOportunity.id) {
    //         product.isDeleted = true;
    //         return product;
    //       }
    //       return product;
    //     });
    //     return prdOportunity;
    //   }
    //   return prdOportunity;
    // });

    //

    // setProductsData({
    //   ...productsData,
    //   results: newProducts,
    // });

    // let newProducts = productsData?.results.map(prdOportunity => {
    //   if (prdOportunity.id === productPackage.id) {
    //     prdOportunity.productslocal = prdOportunity.productslocal.filter(
    //       product => product.id !== productOportunity.id
    //     );
    //     return prdOportunity;
    //   }
    //   return prdOportunity;
    // });

    // setProductsData({
    //   ...productsData,
    //   results: newProducts,
    // });
  };

  const handleOnClickUpdateProduct = () => {
    // if (productOportunity.id.startsWith("TEMPORALPRD")) {

    // TODO update productoportunities when is temporal and is not temporal

    let newProducts = [];

    if (productPackageToEdit.id.startsWith("TEMPORALPRD")) {
      newProducts = productsData?.results.map(prdOportunity => {
        if (prdOportunity.id === productPackage.id) {
          prdOportunity.productslocal = prdOportunity.productslocal.map(product => {
            if (product.id === productPackageToEdit.id) {
              product.quantity = quantityProductSelect;

              return product;
            }
            return product;
          });
          return prdOportunity;
        }
        return prdOportunity;
      });
    } else {
      newProducts = productsData?.results.map(prdOportunity => {
        if (prdOportunity.id === productPackage.id) {
          prdOportunity.productslocal = prdOportunity.productslocal.map(product => {
            if (product.id === productPackageToEdit.id) {
              product.quantity = quantityProductSelect;
              product.isChanged = true;
              return product;
            }
            return product;
          });
          return prdOportunity;
        }
        return prdOportunity;
      });
    }

    setProductsData({
      ...productsData,
      results: newProducts,
    });
    onCloseConfirmModal();
  };

  const onCloseConfirmModal = () => {
    setIsEditProduct(false);
    setProductSelected(null);
    setQuantityProductSelect(1);
    toggleModalConfirm();
  };

  const handleChangeStatusProduct = (newValue, position, product, property, childrenProduct, curentChildren) => {
    let dataTemporal = productsData?.results;

    if(childrenProduct){
      dataTemporal[position].productslocal[curentChildren][property] = newValue;

      if (property === "installationrequest") dataTemporal[position].productslocal[curentChildren]["trainingrequest"] = false;
      if (property === "trainingrequest") dataTemporal[position].productslocal[curentChildren]["installationrequest"] = false;
      
    } else {
      dataTemporal[position][property] = newValue;
      if (property === "installationrequest") dataTemporal[position]["trainingrequest"] = false;
      if (property === "trainingrequest") dataTemporal[position]["installationrequest"] = false;
    }
    setProductsData({
      ...productsData,
      results: dataTemporal,
    });
  };

  return {
    productsData,
    fetchProducts,
    openDrawerProducts,
    toggleDrawerProducts,

    productsControl: {
      handleProductSelected,
      handleOnClickAddProduct,
      handleOnClidkDeleteProduct,
      handleOnClickActionEdit,
      handleOnClickUpdateProduct,
      hancleOnClickActionPackage,
      openDrawerProducts,
      toggleDrawerProducts,
      openConfirm,
      toggleModalConfirm,
      onCloseConfirmModal,
      productSelected,
      quantityProductSelect,
      setQuantityProductSelect,
      setIsEditProduct,
      isEditProduct,
      handleChangeStatusProduct,
    },
  };
}
