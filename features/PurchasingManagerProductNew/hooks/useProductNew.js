import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import useAlertToast from "../../../hooks/useAlertToast";
import { useForm } from "react-hook-form";
import { importOptions, statusOptions } from "../bd";
import { RequestNewProduct } from "../services";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../redux/slices/commonSlice";

export default function useProductNew() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const { getCatalogBy } = useGlobalCommons()
  const { typeProducts, brands, categories, providers } = useSelector(commonSelector);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [isCreated, setIsCrested] = useState(false);
  const router = useRouter();
  const request = new RequestNewProduct();

  useEffect(() => {
    getCatalogBy("categories");
    getCatalogBy("brands");
    getCatalogBy("providers");
    getCatalogBy("typeProducts");
  }, []);

  const normalizeProduct = formData => {
    let newProduct = {};
    newProduct.code = formData?.code;
    newProduct.name = formData?.name;
    newProduct.categoryId = formData?.category?.id;
    newProduct.brandId = formData?.brand?.id;
    newProduct.providerId = formData?.provider?.id;
    newProduct.producttypeId = formData?.productstype?.id;
    newProduct.amount = formData?.amount;
    newProduct.storeamount = formData?.storeamount;
    newProduct.callamount = formData?.callamount;
    newProduct.description = formData?.description;
    newProduct.import = formData?.import?.value;
    newProduct.isactive = formData?.isactive?.value;
    newProduct.width = formData?.width
    newProduct.height = formData?.height
    newProduct.weight = formData?.weight
    newProduct.length = formData?.length
    return newProduct;
  };

  const handleAddTProduct = async item => {
    try {
      setIsCrested(true);
      let newProduct = normalizeProduct(item);
      let ProductNew = await request.postProduct(newProduct);
      
      if (ProductNew.status == 201) {
        setIsCrested(false);
        showAlertSucces("Se agrego el producto correctamente");
        router.back();
      }
    } catch (error) {
      setIsCrested(false);
      showAlertError("Ocurrio un error agregar producto");
    }
  };

  const InputsRegister = [
    {
      inputType: "Input",
      label: "Codigo",
      name: "code",
      placeholder: "Ingresa Código Producto",
      type: "string",
      required: true,
    },
    {
      inputType: "Input",
      label: "Nombre",
      name: "name",
      placeholder: "Ingresa Nombre",
      type: "string",
      required: true,
    },
    {
      inputType: "Select",
      label: "Tipo de Producto",
      name: "productstype",
      placeholder: "Selecciona una Opción",
      options: typeProducts?.results,
      getLabel: "name",
      getValue: "id",
      required: true,
    },
    {
      inputType: "Select",
      label: "Categoria",
      name: "category",
      placeholder: "Selecciona una Opción",
      options: categories?.results,
      getLabel: "name",
      getValue: "id",
      required: true,
    },
    {
      inputType: "Select",
      label: "Marca",
      name: "brand",
      placeholder: "Selecciona una Opción",
      options: brands?.results,
      getLabel: "name",
      getValue: "id",
      required: true,
    },
    {
      inputType: "Select",
      label: "Proveedor",
      name: "provider",
      placeholder: "Selecciona una Opción",
      options: providers?.results,
      getLabel: "companyname",
      getValue: "id",
      required: true,
    },
    {
      inputType: "Input",
      label: "Precio Unitario",
      name: "amount",
      placeholder: "Ingresa Precio Unitario",
      type: "number",
      required: true,
    },
    {
      inputType: "Input",
      label: "Precio Tienda",
      name: "storeamount",
      placeholder: "Ingresa Precio Tienda",
      type: "number",
      required: true,
    },
    {
      inputType: "Input",
      label: "Precio Call Center",
      name: "callamount",
      placeholder: "Ingresa Precio Call Center",
      type: "number",
      required: true,
    },
    {
      inputType: "Input",
      label: "Peso",
      name: "weight",
      placeholder: "Ingresa el peso",
      type: "string",
      required: true,
    },
    {
      inputType: "Input",
      label: "Altura",
      name: "height",
      placeholder: "Ingresa la altura",
      type: "string",
      required: true,
    },
    {
      inputType: "Input",
      label: "Ancho",
      name: "width",
      placeholder: "Ingresa el ancho",
      type: "string",
      required: true,
    },
    {
      inputType: "Input",
      label: "Longitud",
      name: "length",
      placeholder: "Ingresa la longitud",
      type: "string",
      required: true,
    },
    {
      inputType: "Select",
      label: "Producto Importado",
      name: "import",
      placeholder: "Selecciona una Opción",
      options: importOptions,
      getLabel: "label",
      getValue: "value",
      defaultValue: importOptions[1],
      required: false,
    },
    {
      inputType: "Select",
      label: "Estado del producto",
      name: "isactive",
      placeholder: "Selecciona una Opción",
      options: statusOptions,
      getLabel: "label",
      getValue: "value",
      defaultValue: statusOptions[0],
      required: false,
    },
    {
      inputType: "Textarea",
      label: "Descripción",
      name: "description",
      placeholder: "Ingresa Breve Descripción",
      required: false,
    },
  ];
  return {
    handleSubmit,
    control,
    handleAddTProduct,
    register,
    errors,
    statusOptions,
    importOptions,
    isCreated,
    router,
    InputsRegister
  };
}
