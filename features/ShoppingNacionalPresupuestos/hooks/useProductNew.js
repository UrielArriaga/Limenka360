import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAlertToast from "../../../hooks/useAlertToast";
import { useForm } from "react-hook-form";
import { BudgetsServices } from "../services";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { importOptions, statusOptions } from "../bd";
import useModal from "../../../hooks/useModal";

export default function useProductNew(budgetsSelected, refetchData) {
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { open: openProduct, toggleModal: toggleProducts } = useModal();
  const { getCatalogBy } = useGlobalCommons();
  const { typeProducts, brands, categories, providers } = useSelector(commonSelector);
  const { showAlertSucces, showAlertError, showAlertWarning } = useAlertToast();
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();
  const request = new BudgetsServices();
  const [providerValue, setProviderValue] = useState("");
  const [providerId, setProviderId] = useState("");

  useEffect(() => {
    getCatalogBy("categories");
    getCatalogBy("brands");
    getCatalogBy("providers");
    getCatalogBy("typeProducts");
  }, []);

  const normalizeProduct = formData => {
    let newProduct = {
      code: formData?.code,
      name: formData?.name,
      categoryId: formData?.category?.id,
      brandId: formData?.brand?.id,
      producttypeId: formData.productstype?.id,
      amount: formData?.amount,
      storeamount: formData?.storeamount,
      callamount: formData?.callamount,
      import: formData?.import?.value,
      isactive: formData?.isactive?.value,
    };

    if (providerId) {
      newProduct.providerId = providerId;
    } else if (providerValue) {
      newProduct.providerName = providerValue;
    }

    return [
      {
        quantity: 0,
        discount: 0,
        dispercentage: 0,
        iva: 0,
        total: 0,
        newprice: 0,
        note: "",
        budgetId: budgetsSelected?.id,
        product: newProduct,
      },
    ];
  };

  const handleAddTProduct = async item => {
    if (!providerValue && !providerId) {
      showAlertWarning("Ingresar el nombre del proveedor o seleccionar uno.");
      return;
    }
    try {
      setIsCreated(true);
      let newProduct = normalizeProduct(item);
      let ProductNew = await request.postProduct(newProduct);
      if (ProductNew.status === 201) {
        showAlertSucces("Producto Agregado Correctamente");
        toggleProducts();
        reset();
        refetchData();
        setProviderValue("");
        setProviderId(null);
      }
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrió un error al agregar el producto");
    } finally {
      setIsCreated(false);
    }
  };

  const InputsRegister = [
    {
      inputType: "Input",
      label: "Código",
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
      label: "Categoría",
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
      inputType: "SelectProvider",
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
      inputType: "Select",
      label: "Producto Importado",
      name: "import",
      placeholder: "Selecciona una Opción",
      options: importOptions,
      getLabel: "label",
      getValue: "value",
      defaultValue: importOptions[0],
      required: true,
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
      required: true,
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
    InputsRegister,
    toggleProducts,
    openProduct,
    reset,
    providerValue,
    setProviderValue,
    setProviderId,
    setValue,
  };
}
