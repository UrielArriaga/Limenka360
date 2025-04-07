import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

function useEditProduct() {
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const { open, toggleModal } = useModal();
  const { getCatalogBy } = useGlobalCommons();
  const [selectItemProduct, setSelectItemProduct] = useState({});
  const handleCloseEdit = () => toggleModal();
  const [isfetching, setIsFetching] = useState(false);

  useEffect(() => {
    getCatalogBy("typeProducts");
    getCatalogBy("categories");
    getCatalogBy("brands");
    getCatalogBy("providers");
  }, []);

  const handleUploadProduct = async formData => {
    let resultNormalize = normalizePutProduct(formData);
    try {
      setIsFetching(true);
      let productNew = await api.put(`products/${selectItemProduct?.id}`, resultNormalize);
      
      if (productNew.status == 200 || productNew.status == 201) {
        showAlertSucces("Producto - Editado correctamente!");
        setTimeout(() => {
          toggleModal();
          setIsFetching(false);
        }, 500);
      } else {
        showAlertWarning("Producto - problema al editar!, verifique los campos");
      }
    } catch (error) {
      showAlertError("Producto - Ocurrio un problema!");
      console.log("Error put product: ", error);
    }
  };

  const normalizePutProduct = formData => {
    let putProduct = {};
    putProduct.code = formData?.code;
    putProduct.name = formData?.name;
    putProduct.categoryId = formData?.category?.id ? formData?.category?.id : formData?.category;
    putProduct.brandId = formData?.brand?.id ? formData?.brand?.id : formData?.brand;
    putProduct.providerId = formData?.provider?.id ? formData?.provider?.id : formData?.provider;
    putProduct.producttypeId = formData?.productstype?.id ? formData?.productstype?.id: formData?.productstype;
    putProduct.amount = formData?.amount;
    putProduct.storeamount = formData?.storeamount;
    putProduct.callamount = formData?.callamount;
    putProduct.description = formData?.description;
    putProduct.import = formData?.import
    putProduct.isactive = formData?.isactive;
    putProduct.length = formData?.length;
    putProduct.width = formData?.width;
    putProduct.weight = formData?.weight;
    putProduct.height = formData?.height;
    return putProduct;
  };

  return {
    openDrawer: {
      open,
      toggleModal
    },
    selectedProduct: {
      setSelectItemProduct,
      selectItemProduct,
    },
    handleCloseEdit,
    handleUploadProduct,
    isfetching
  };
}

export default useEditProduct;
