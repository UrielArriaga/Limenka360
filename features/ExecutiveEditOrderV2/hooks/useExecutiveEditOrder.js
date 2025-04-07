import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useOptions from "./useOptions";
import { namesForm } from "../../ExecutiveEditOrder/data";
import { useDispatch } from "react-redux";
import { getCities } from "../../../redux/slices/commonSlice";
import { api } from "../../../services/api";

const rules = {
  all: {
    required: "*Requerido",
  },

  phone: {
    required: "*Requerido",
    minLength: { value: 10, message: "El número de teléfono debe tener 10 dígitos" },
    maxLength: { value: 10, message: "El número de teléfono debe tener 10 dígitos" },
  },
};

export default function useExecutiveEditOrder(oportunity, orderData) {
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
  const [view, setView] = useState("orderFormEdit");

  const { options, setOptions } = useOptions();
  const dispatch = useDispatch();

  const [citiesBilling, setCitiesBilling] = useState([]);
  const [shippingOrder, setShippingOrder] = useState(null);
  const [requireBilling, setRequireBilling] = useState(false);
  const [typeSaleSelected, setTypeSaleSelected] = useState(null);

  const { orderNames, addressShipping, billing } = namesForm;
  useEffect(() => {
    initData();
  }, [orderData]);

  const initData = async () => {
    try {
      if (!orderData) return;

      const { address, bill } = orderData;

      const addressBilling = bill?.address;
      setValue(orderNames.paymentaccount.name, orderData?.paymentaccount);
      setValue(orderNames.typesale.name, orderData?.oportunity?.typesale);
      setTypeSaleSelected(orderData?.oportunity?.typesale);
      setValue(orderNames.observations.name, orderData?.observations);

      // * Address Shipping

      setValue(addressShipping.receive.name, orderData?.receive);
      setValue(addressShipping.street.name, address?.street);
      setValue(addressShipping.number_int.name, address?.int_number);

      setValue(addressShipping.number_ext.name, address?.ext_number);
      setValue(addressShipping.settlement.name, address?.settlement);
      setValue(orderNames.phone.name, orderData?.phone);
      setValue(addressShipping.postalCode.name, address?.postal.postal_code);
      setValue(addressShipping.postal.name, address?.postal);
      setValue(addressShipping.city.name, address?.city);
      setValue(addressShipping.entity.name, address?.entity);
      setValue(addressShipping.reference.name, address?.references);

      setRequireBilling(orderData?.billing && orderData?.bill ? true : false);

      // * Billing
      // setValue(billing.id, bill?.id);
      // setValue(billing.addressbillingId, bill?.address?.id);
      if (orderData?.billing && orderData?.bill) {
        setValue(billing.businessName.name, bill?.businessname);
        setValue(billing.rfc.name, bill?.rfc);
        setValue(billing.cfdi.name, bill?.cfdi);
        setValue(billing.paymentMethod.name, bill?.paymentmethod);
        setValue(billing.waytoPay.name, bill?.paymentway);
        setValue(billing.taxregime.name, bill?.taxregime);
        setValue(billing.phone.name, bill?.phone);
        setValue(billing.street.name, addressBilling?.street);
        setValue(billing.number_int.name, addressBilling?.int_number);
        setValue(billing.number_ext.name, addressBilling?.ext_number);
        setValue(billing.settlement.name, addressBilling?.settlement);
        setValue(billing.postalCode.name, addressBilling?.postal.postal_code);
        setValue(billing.postal.name, addressBilling?.postal);
        setValue(billing.entity.name, addressBilling?.entity);
        setValue(billing.city.name, addressBilling?.city);
      }
      //workstation
      setValue(orderNames.workstation.name, orderData?.workstation);

      let shippingTypeOrder = await fetchShippingTypeByOrder();

      // initShippingData();

      setOptions(prev => {
        return {
          ...prev,
          paymentaccounts: [orderData?.paymentaccount],
          typesales: [orderData?.oportunity?.typesale],
          shippingtypes: [shippingTypeOrder],
          // * Billing
          cfdidef: orderData?.billing && orderData.bill ? [bill?.cfdi] : [],
          paymentmethods: orderData?.billing && orderData.bill ? [bill?.paymentmethod] : [],
          paymentwaydef: orderData?.billing && orderData.bill ? [bill?.paymentway] : [],
          taxregimes: orderData?.billing && orderData.bill ? [bill?.taxregime] : [],
          typesales: orderData?.oportunity?.typesale ? [orderData?.oportunity?.typesale] : [],
        };
      });
    } catch (error) {
      alert("Error al cargar los datos del pedido");
    }
  };

  useEffect(() => {
    if (orderData) {
      let params = {
        order: "name",
        all: 1,
        where: {
          entityId: orderData?.address?.entity?.id,
        },
      };
      dispatch(getCities({ params }));
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData?.billing) {
      fetchCitiesToBilling(orderData?.bill?.address?.entityId);
    }
  }, [orderData]);

  const fetchPostalCodeData = async postalCode => {
    let params = {
      include: "city,city.entity",
      where: {
        postal_code: postalCode,
      },
    };
    try {
      return await api.get("/postals", { params });
    } catch (error) {}
  };

  const fetchCities = async entityId => {
    let params = {
      order: "name",
      all: 1,
      where: {
        entityId: entityId,
      },
    };
    dispatch(getCities({ params }));
  };

  const fetchCitiesToBilling = async entityId => {
    try {
      let resp = await api.get("cities", {
        params: {
          order: "name",
          all: 1,
          where: {
            entityId: entityId,
          },
        },
      });

      setCitiesBilling(resp.data.results);
    } catch (error) {}
  };

  const fetchShippingTypeByOrder = async () => {
    try {
      let params = {
        include: "shippingtype",
        keys: "shippingtypeId,id",
        // keys: "shippingtype,shippingtypeId",
        where: {
          orderId: orderData.id,
        },
      };
      let response = await api.get(`shippings`, { params });

      setValue(addressShipping.shippingtype.name, response.data?.results[0]?.shippingtype);
      setShippingOrder(response.data?.results[0]);

      return response?.data?.results[0]?.shippingtype;

      // setOptions(prev => {
      //   return {
      //     ...prev,
      //     shippingtypes: [response.data?.results[0]?.shippingtype],
      //   };
      // });
    } catch (error) {}
  };
  //   setValue(addressShipping.receive, orderData?.receive);
  // };

  const handleOnChangePostalCode = async e => {
    if (e.target.value.length < 5) return;

    try {
      let response = await fetchPostalCodeData(e.target.value);
      if (response.data?.results.length === 0) {
        alert("Código Postal no encontrado");
        // showAlertWarning("Código Postal no encontrado");
      }

      setValue(addressShipping.postalCode.name, e.target.value);
      setValue(addressShipping.postal.name, response.data?.results[0]);
      setValue(addressShipping.entity.name, response.data?.results[0]?.city?.entity);
      setValue(addressShipping.city.name, response.data?.results[0]?.city);
      fetchCities(response.data?.results[0]?.city?.entity?.id);
    } catch (error) {
      showAlertError("Error al obtener los datos del código postal");
    }
  };

  const handleOnChangePostalCodeBilling = async e => {
    if (e.target.value.length < 5) return;

    try {
      let response = await fetchPostalCodeData(e.target.value);
      if (response.data?.results.length === 0) {
        alert("Código Postal no encontrado");
        // showAlertWarning("Código Postal no encontrado");
      }

      setValue(billing.postalCode.name, e.target.value);
      setValue(billing.postal.name, response.data?.results[0]);
      setValue(billing.entity.name, response.data?.results[0]?.city?.entity);
      setValue(billing.city.name, response.data?.results[0]?.city);
      fetchCitiesToBilling(response.data?.results[0]?.city?.entity?.id);
    } catch (error) {
      showAlertError("Error al obtener los datos del código postal");
    }
  };

  const handleSelectEntity = async entity => {};

  const handleOnChangeSelect = (option, action) => {
    const { name } = action;
    switch (name) {
      case orderNames.paymentaccount.name:
        setValue(orderNames.paymentaccount.name, option);
        break;
      case orderNames.typesale.name:
        setValue(orderNames.typesale.name, option);
        setTypeSaleSelected(option);

        break;
      case orderNames.observations.name:
        setValue(orderNames.observations.name, option);
        break;
      case addressShipping.entity.name:
        setValue(addressShipping.entity.name, option);
        let params = {
          order: "name",
          all: 1,
          where: {
            entityId: option.id,
          },
        };
        dispatch(getCities({ params }));
        break;
      case addressShipping.city.name:
        setValue(addressShipping.city.name, option);
        break;

      case addressShipping.shippingtype.name:
        setValue(addressShipping.shippingtype.name, option);
        break;

      // BILLING
      case billing.cfdi.name:
        setValue(billing.cfdi.name, option);
        break;

      case billing.paymentMethod.name:
        setValue(billing.paymentMethod.name, option);
        break;

      case billing.waytoPay.name:
        setValue(billing.waytoPay.name, option);
        break;

      case billing.taxregime.name:
        setValue(billing.taxregime.name, option);
        break;

      case billing.entity.name:
        setValue(billing.entity.name, option);
        fetchCitiesToBilling(option.id);
        break;

      case billing.city.name:
        setValue(billing.city.name, option);
        break;

      default:
        break;
    }

    // switch (name) {
    //   case "taxregime":
    //     setValueBilling("taxregime", option);
    //     break;
    //   case "cfdi":
    //     setValueBilling("cfdi", option);
    //     break;
    //   case "paymentmethod":
    //     setValueBilling("paymentmethod", option);
    //     break;
    //   case "paymentway":
    //     setValueBilling("paymentway", option);
    //     break;

    //   case "entity":
    //     handleSelectEntity(option);
    //     break;
    //   case "city":
    //     handleSelectCity(option);
    //     break;

    //   default:
    //     break;
    // }
  };
  const handleOnChangeTab = () => {
    setView(item.view);
    trigger();
  };

  //

  const handleSubmitOrder = c => {
    //
    // );
  };

  const handleOnClickSaveOrder = () => {
    handleSubmit(data => {});
  };

  return {
    viewControl: {
      view,
      setView,
      handleOnChangeTab,
    },
    formControls: {
      handleOnClickSaveOrder,
      handleOnChangeSelect,
      handleOnChangePostalCode,
      handleOnChangePostalCodeBilling,
      handleSelectEntity,
      register,
      handleSubmit,
      errors,
      setValue,
      setError,
      watch,
      getValues,
      control,
      reset,
      clearErrors,
      trigger,
      options,
      citiesBilling,
      rules,
      setRequireBilling,
      requireBilling,
      shippingOrder,
    },
  };
}
