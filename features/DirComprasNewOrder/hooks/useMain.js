import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PurchaseOrdersApi } from "../services/PurchaseOrdersApi";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { validateOrderData } from "../helpers";
import useAlertToast from "../../../hooks/useAlertToast";
import { makeTemplateOrder } from "../../../templates/makeTemplateAlmacen";
import { useRouter } from "next/router";
import useSaveError from "../../../hooks/useSaveError";

let initialData = {
  provider: {
    companyname: "",
    name: "",
    fullname: "",
    phone: "",
    email: "",
  },
  buyer: {
    name: "",
    tax: "",
    contact: "",
    address: "Dr. J. Jiménez Cantú 34-Local B, Centro Urbano, 54700 Cuautitlán Izcalli, Méx.",
    address2: "Calzada de las bombas #35 DEP. Local 4 y 5, Col. El parque de coyoacán, Coyoacán, Ciudad de México, C.P. 04899",
    phone: "",
    email: "",
  },
  address: {
    street: "",
    int_number: "",
    ext_number: "",
    postal: { postal_code: "" },
    city: { name: "" },
    entity: { name: "" },
  },
  folio: "ORD-20240217",
  products: [],
};

export default function useMain({ productControl, paymentsControl }) {
  const purhcaseOrdersApi = new PurchaseOrdersApi();
  const router = useRouter();
  const { roleId, userData } = useSelector(userSelector);
  const { saveError, generateIdError } = useSaveError();

  const { showAlertError, showAlertWarning, showAlertSucces, showAlertStart, showAlertFinish } = useAlertToast();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    getValues,
    control,
    reset,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm();

  const [isCreating, setIsCreating] = useState(false);
  const [view, setView] = useState("buyerData");
  const [type, setType] = useState("INTERNACIONAL");
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [previewData, setPreviewData] = useState(initialData);
  const [provider, setProvider] = useState(null);
  const [addressesData, setAddresses] = useState({
    isFetching: false,
    results: [],
  });
  const [addressSelected, setAddressSelected] = useState(null);

  const [arrivesIn, setArrivesIn] = useState(null);
  const [conceptImports, setConceptImports] = useState({
    isFetching: false,
    results: [],
  });

  useEffect(() => {
    fetchConceptImports();

  }, []);

  useEffect(() => {
    setValue("name", userData?.groupName);

    setValue("contact", userData?.name);

    setValue("email", userData?.email);

    setValue("phonebuyer", userData?.phone);

    setPreviewData({
      ...previewData,
      buyer: {
        ...previewData.buyer,
        name: userData?.name + " " + userData?.lastname,
        email: userData?.email,
        phone: userData?.phone,
        contact: userData?.name + " " + userData?.lastname,
      },
      arrivesIn: arrivesIn
    });
  }, [userData]);

  useEffect(() => {
    if (productControl.products.length > 0) {
      let total = productControl.products.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

      setPreviewData({
        ...previewData,
        products: productControl.products,
        total,
      });
    }
  }, [productControl.products]);

  useEffect(() => {
    if (provider) {
      setPreviewData({
        ...previewData,
        provider: {
          companyname: provider?.companyname,
          name: provider?.name,
          fullname: provider?.fullname,
          phone: provider?.phone,
          email: provider?.email,
        },
      });
    }
  }, [provider]);

  useEffect(() => {
    if (arrivesIn) {
      setPreviewData({
        ...previewData,
        arrivesIn: arrivesIn,
      });
    }
  }, [arrivesIn]);
  const fetchAddresses = async id => {
    try {
      setAddresses({ ...addressesData, isFetching: true });
      const response = await purhcaseOrdersApi.getAddressById(id);

      setAddresses({
        isFetching: false,
        results: response.data?.results.map((item, index) => {
          return {
            // ...item,
            ...item,
            id: item.id,
            label: `
             ${item?.entity?.name},${item?.city?.name},${item?.postal?.postal_code},${item?.settlement}
      ${item?.ext_number} ${item?.int_number} ${item?.street}
      `,
            name: `
             ${item?.entity?.name},${item?.city?.name},${item?.postal?.postal_code},${item?.settlement}
      ${item?.ext_number} ${item?.int_number} ${item?.street}
      `,
          };
        }),
      });
    } catch (error) {
      setAddresses({ ...addressesData, isFetching: false });
    }
  };

  const fetchConceptImports = async () => {
    try {
      setConceptImports({
        ...conceptImports,
        isFetching: true,
      });

      const response = await purhcaseOrdersApi.getConceptImports();
      setConceptImports({
        results: response?.data.results,
        isFetching: false,
      });
    } catch (error) {
      setConceptImports({
        results: [],
        isFetching: false,
      });
    }
  };

  const handleToogleAddProduct = () => {
    setOpenAddProduct(!openAddProduct);
  };

  const handleOnChangeSelect = (option, action) => {
    const { name } = action;

    switch (name) {
      case "provider":
        setValue("provider", option);
        setProvider(option);
        fetchAddresses(option.id);

        // if (provider === null) {
        //   setValue("provider", option);
        //   setProvider(option);
        //   fetchAddresses(option.id);
        //   productControl.setProducts([]);
        //   return;
        // }

        // if (option.id !== provider?.id) {
        //   let isconfirm = window.confirm("¿Estas seguro de cambiar de proveedor?");
        //   if (!isconfirm) {
        //     return;
        //   }

        //   setValue("provider", option);
        // }

        break;

      case "delivery":
        setValue("delivery", option);

        break;

      case "national":
        setValue("national", option);
        setType(option.id);
        break;

      case "tax":
        setValue("tax", option);

        setPreviewData({
          ...previewData,
          buyer: {
            ...previewData.buyer,
            tax: option.name,
          },
        });
        break;

      case "payment_condition":
        setValue("payment_condition", option);
        break;

      case "address":
        setValue("address", option);

        let addressSelected = addressesData.results.find(item => item.id === option.id);
        setAddressSelected(addressSelected);

        setPreviewData({
          ...previewData,
          address: {
            street: addressSelected.street,
            int_number: addressSelected.int_number,
            ext_number: addressSelected.ext_number,
            postal: { postal_code: addressSelected.postal.postal_code },
            city: { name: addressSelected.city.name },
            entity: { name: addressSelected.entity.name },
          },
        });

        break;

      case "arrivesin":
        setValue("arrivesin", option);
        setArrivesIn(option?.id);
        break;
      default:
        break;
    }
  };

  const returnTypeOrders = () => {
    let values = [];
    if (roleId == "director_compras") {
      values = [
        { name: "Internacional", id: "INTERNACIONAL" },
        { name: "Nacional", id: "NACIONAL" },
      ];
    }

    if (roleId == "gerente_compras") {
      values = [
        {
          name: "Internacional",
          id: "INTERNACIONAL",
        },
      ];
    }

    return values;
  };

  const onSubmit = isDraft => async data => {
    try {
      setIsCreating(true);
      const formData = getValues();

      let normalizeForm = await purhcaseOrdersApi.normalizeOrderData({
        form: formData,
        products: productControl.products,
        payments: paymentsControl.payments,
        id_user: userData?.id,
        addressSelected: addressSelected,
        userData,
      });

      normalizeForm.draft = isDraft ? true : false;

      let isValid = validateOrderData(normalizeForm, showAlertWarning);

      if (isValid === false || isValid === undefined) {
        let idError = generateIdError();

        saveError(normalizeForm, idError, "neworder");
        setIsCreating(false);
        return;
      }

      let data = {
        provider: provider,
        products: productControl.products,
        folio: normalizeForm?.folio,
        buyer: previewData?.buyer,
        address: previewData?.address,
      };
      let templateSelec = formData?.national === "NACIONAL" ? 2 : 1;

      let templateResponse = makeTemplateOrder(templateSelec, data);
      const form = new FormData();
      form.append("name", provider?.companyname || "nombre proveedor");
      form.append("data", templateResponse);
      form.append("company", "xxx");
      form.append("group", "xxxx");
      form.append("ejecutive", userData?.id);

      let responsePDFURL = await purhcaseOrdersApi.postCreatePDF(form);

      normalizeForm.url = responsePDFURL.data.url;

      if (isValid) {
        let response = await purhcaseOrdersApi.createOrder(normalizeForm);
        router.push("/directorcompras/ordenes");
        showAlertSucces("Orden creada correctamente");
      }

      setIsCreating(false);
    } catch (error) {
      let idError = generateIdError();
      showAlertError(`Error al enviar la orden ${idError}`);

      saveError(error, idError, "neworder");
      showAlertFinish();
      setIsCreating(false);
    }
  };

  const handleSaveChangesOrder = async data => {
    try {
      handleSubmit(onSubmit)();

      // const response = await purhcaseOrdersApi.createOrder(data);
    } catch (error) {}
  };

  const handleBack = () => {
    router.back();
  };
  return {
    handleBack,
    provider,
    viewControl: {
      isCreating,
      view,
      type,
      setView,
      setType,
      previewData,
      setPreviewData,
    },

    catalogs: {
      addressesData,
      conceptImports,
      fetchConceptImports,
      typesorder: returnTypeOrders(),
    },

    formControls: {
      // handleOnClickSaveOrder,
      // handleOnChangeSelect,
      // handleOnChangePostalCode,
      // handleOnChangePostalCodeBilling,
      // handleSelectEntity,
      arrivesIn,
      register,
      handleSubmit,
      setValue,
      setError,
      watch,
      getValues,
      control,
      reset,
      clearErrors,
      trigger,
      onSubmit,
      handleOnChangeSelect,
      //   options,
      errors,
      // rules,
      // citiesBilling,
      // setRequireBilling,
      // requireBilling,
      // shippingOrder,
      // handleToggleBilling,
    },

    modalControl: {
      handleToogleAddProduct,
      openAddProduct,
    },
  };
}
