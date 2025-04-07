import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useModal from "../../../hooks/useModal";
import useAlertToast from "../../../hooks/useAlertToast";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";

export default function useProductForm(selectedProduct, productEdit, idEdit, ) {
  useEffect(() => {
    getCatalogBy("typeProducts");
    getCatalogBy("categories");
    getCatalogBy("brands");
    getCatalogBy("providers");
  },[]);

  const { open, toggleModal } = useModal();
  const handleCloseEdit = () => toggleModal();

  const handleUploadProduct = async formData => {
    let resultNormalize = normalizePutProduct(formData);
    try {
      setIsFetching(true);      
      let productNew = await api.put(`products/${idEdit}`, resultNormalize); 
      console.log('producto EDITADO YEAAAHHHH!!!!!!:', productNew);
           
      if (productNew.status == 200 || productNew.status == 201) {
        showAlertSucces("Producto - Editado correctamente!");
        setIsFetching(false);
      } else {
        showAlertWarning("Producto - problema al editar!, verifique los campos");
      }
    } catch (error) {
      showAlertError("Producto - Ocurrió un problema!");
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

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { categories, providers, brands, typeProducts, filterStatusProduct, filterImportProduct,  } = useSelector(commonSelector);

  const NameInputs = [
  "name",
  "code",
  "productstype",
  "category",
  "brand",
  "provider",
  "amount",
  "storeamount",
  "callamount",
  "import",
  "isactive",
  "description",
  "length",
  "width",
  "weight",
  "height",
];
  
  const [typeProduct, setTypeProduct] = useState({});
  const [typeCategory, setTypeCategory] = useState({});
  const [typeBrand, setTypeBrand] = useState({});
  const [typeProvider, setTypeProvider] = useState({});
  const [typeImport, setTypeImport] = useState({});
  const [isActive, setIsActive] = useState({});

  const { showAlertError, showAlertSucces, showAlertWarning} = useAlertToast();
  const { getCatalogBy } = useGlobalCommons();
  const [ selectItemProduct, setSelectItemProduct ] = useState({});
 
  const [isfetching, setIsFetching] = useState(false);

  function renderData() {
       let type = typeProducts?.results?.filter(item => item.id == selectedProduct?.data?.producttypeId);
       let category = categories?.results?.filter(item => item.id == selectedProduct?.data?.categoryId);
       let brand = brands?.results?.filter(item => item.id == selectedProduct?.data?.brandId);
       let provider = providers?.results?.filter(item => item.id == selectedProduct?.data?.providerId);
    
        let importValues = selectedProduct?.import;
        let importsValue = filterImportProduct?.filter(item => item.name == importValues);
        let isactive = selectedProduct?.data?.isactive;
        let typeActive = filterStatusProduct?.filter(item => item.id == isactive);
    
        for (let i = 0; i < NameInputs.length; i++) {
          switch (NameInputs[i]) {
            case "productstype": setValue(NameInputs[i], type[0]); break;
            case "category": setValue(NameInputs[i], category[0]);
              break;
            case "brand": setValue(NameInputs[i], brand[0]);
              break;
            case "provider": setValue(NameInputs[i], provider[0]); break;
            case "import": setValue(NameInputs[i], importsValue[0]?.id); break;
            case "isactive": setValue(NameInputs[i], typeActive[0]?.id); break;
            case "amount": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            case "callamount": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            case "storeamount": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            case "length": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            case "width": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            case "weight": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            case "height": setValue(NameInputs[i], selectedProduct?.data?.[NameInputs[i]]); break;
            default: setValue(NameInputs[i], selectedProduct?.[NameInputs[i]]); break;
          }
        }
    
        setTypeProduct(type[0]);
        setTypeCategory(category[0]);
        setTypeBrand(brand[0]);
        setTypeProvider(provider[0]);
        setTypeImport(importsValue[0]);
        setIsActive(typeActive[0]);
      };

  const handleChangeValue = (value, field) => {
    setValue(field, value.id);
    switch (field) {
      case "productstype": setTypeProduct(value); break;
      case "category": setTypeCategory(value); break;
      case "brand": setTypeBrand(value); break;
      case "provider": setTypeProvider(value); break;
      case "import": setTypeImport(value); break;
      case "isactive": setIsActive(value); break;
      default: break;
    }
  };

  const resetInputs = () => {
    NameInputs.forEach(input => setValue(input, ""));
    setTypeProduct({});
    setTypeCategory({});
    setTypeBrand({});
    setTypeProvider({});
    setTypeImport({});
    setIsActive({});
  };

  const closeDrawer = () => {
    resetInputs(); // Limpia los campos del formulario
    handleCloseEdit(); // Cambia el estado del modal a cerrado
  };

  return {
    register,
    handleSubmit,
    errors,
    openDrawer: {
      open,
      toggleModal
    },
    
    productEdit,
    idEdit,
    handleUploadProduct,
    handleChangeValue,

    renderData,
    resetInputs,

    handleCloseEdit,
    closeDrawer,

    typeProduct,
    typeProducts,
    typeCategory,
    typeBrand,
    typeProvider,
    typeImport,
    isActive,
    isfetching,
    
    selectedProduct:{
        setSelectItemProduct,
        selectItemProduct,
    },
  };
};



