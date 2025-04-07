import { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import { api } from "../../../services/api";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { replaceSpacesWithHyphens } from "../../../componentx/common/DirLog/FilesUpload/utils";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getCities, getshippingtypes } from "../../../redux/slices/commonSlice";

export default function useEditOrderData(orderSelectedData, refetchPedido) {
  const { open: openEditOrdeData, toggleModal: handleToggleEditOrderData } = useModal();
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { showAlertWarning, showAlertError, showAlertSucces } = useAlertToast();
  const [shippingOrder, setShippingOrder] = useState(null);

  const {
    register: registerOrderData,
    handleSubmit: handleSubmitOrderData,
    setValue: setValueOrderData,
    watch,
    control: controlOrderData,
    formState: { errors: errorsOrderData },
  } = useForm();

  // useEffect(() => {
  //   setValueShipping("receive", orderSelectedData?.receive);
  //   setValueShipping("phoneInvoice", orderSelectedData?.phone);
  //   setValueShipping("streetInvoice", orderSelectedData?.address?.street);
  //   setValueShipping("int_numberInvoice", orderSelectedData?.address?.int_number);
  //   setValueShipping("ext_numberInvoice", orderSelectedData?.address?.ext_number);
  //   setValueShipping("cologneInvoice", orderSelectedData?.address?.settlement);
  //   setValueShipping("postalCodeInvoice", orderSelectedData?.address?.postal?.postal_code);
  //   setValueShipping("entity", orderSelectedData?.address?.entity);
  //   setValueShipping("city", orderSelectedData?.address?.city);
  //   setValueShipping("observations", orderSelectedData?.observations);

  //   // setValue("entity", order?.address?.entityId);
  // }, [orderSelectedData, openEditOrderShipping]);

  // useEffect(() => {
  //   if (orderSelectedData && openEditOrderShipping && orderSelectedData?.address?.entity) {
  //     let params = {
  //       order: "name",
  //       all: 1,
  //       where: {
  //         entityId: orderSelectedData?.address?.entity?.id,
  //       },
  //     };
  //     dispatch(getCities({ params }));
  //   }
  // }, [orderSelectedData, openEditOrderShipping]);

  // useEffect(() => {
  //   if (orderSelectedData && openEditOrderShipping) {
  //     fetchShippingTypeByOrder();
  //   }
  // }, [orderSelectedData, openEditOrderShipping]);

  // useEffect(() => {
  //   if (orderSelectedData && openEditOrderShipping && orderSelectedData?.address?.entity) {
  //     let params = {
  //       order: "name",
  //       all: 1,
  //     };
  //     dispatch(getshippingtypes({ params }));
  //   }
  // }, [orderSelectedData, openEditOrderShipping]);

  // const handleOnChangePostalCode = async e => {
  //   if (e.target.value.length < 5) return;

  //   try {
  //     let response = await fetchPostalCodeData(e.target.value);
  //     if (response.data?.results.length === 0) {
  //       showAlertWarning("Código Postal no encontrado");
  //     }
  //     setValueShipping("postalCodeInvoice", e.target.value);
  //     setValueShipping("postal", response.data?.results[0]);
  //     setValueShipping("entity", response.data?.results[0]?.city?.entity);
  //     setValueShipping("city", response.data?.results[0]?.city);
  //     fetchCities(response.data?.results[0]?.city?.entity?.id);
  //   } catch (error) {
  //     alert("errror");
  //   }
  // };

  // const fetchPostalCodeData = async postalCode => {
  //   let params = {
  //     include: "city,city.entity",
  //     where: {
  //       postal_code: postalCode,
  //     },
  //     limit: 1,
  //   };
  //   try {
  //     return await api.get("/postals", { params });
  //   } catch (error) {}
  // };

  // const fetchCities = async entityId => {
  //   let params = {
  //     order: "name",
  //     all: 1,
  //     where: {
  //       entityId: entityId,
  //     },
  //   };
  //   dispatch(getCities({ params }));
  // };

  // const fetchShippingTypeByOrder = async () => {
  //   try {
  //     let params = {
  //       include: "shippingtype",
  //       keys: "shippingtypeId,id",
  //       // keys: "shippingtype,shippingtypeId",
  //       where: {
  //         orderId: orderSelectedData.id,
  //       },
  //     };
  //     let response = await api.get(`shippings`, { params });

  //     console.log(response);
  //     setValueShipping("shippingtype", response.data?.results[0]?.shippingtype);
  //     setShippingOrder(response.data?.results[0]);

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error?.response);
  //   }
  // };

  // const handleSelectEntity = async option => {
  //   setValueShipping("entity", option);

  //   let params = {
  //     order: "name",
  //     all: 1,
  //     where: {
  //       entityId: option.id,
  //     },
  //   };
  //   dispatch(getCities({ params }));
  // };

  // const handleSelectCity = async option => {
  //   setValueShipping("city", option);
  // };

  // const handleOnClickUpdateShipping = async formdata => {
  //   try {
  //     let normalizeAddresId = {
  //       street: formdata.streetInvoice,
  //       ext_number: formdata.ext_numberInvoice,
  //       int_number: formdata.int_numberInvoice,
  //       references: formdata.observations,
  //       settlement: formdata.cologneInvoice,
  //       postalId: formdata.postal?.id,
  //       cityId: formdata.city?.id,
  //       entityId: formdata.entity?.id,
  //     };

  //     await api.put(`/addresses/${orderSelectedData.address.id}`, normalizeAddresId);

  //     if (orderSelectedData.receive !== formdata.receive || orderSelectedData.phone !== formdata.phoneInvoice) {
  //       await api.put(`/orders/${orderSelectedData.id}`, { receive: formdata.receive, phone: formdata.phoneInvoice });
  //     }

  //     if (shippingOrder?.shippingtype?.id !== formdata.shippingtype.id) {
  //       await api.put(`/shippings/${shippingOrder.id}`, { shippingtypeId: formdata.shippingtype.id });
  //     }

  //     handleToggleEditShipping();
  //     refetchPedido();
  //     showAlertSucces("Dirección actualizada correctamente");
  //     console.log(normalizeAddresId);
  //   } catch (error) {
  //     console.log(error);
  //     showAlertError("Error al actualizar la dirección");
  //   }
  // };

  // const handleOnChangeSelect = (option, field) => {
  //   if (field.name === "shippingtype") {
  //     setValueShipping("shippingtype", option);
  //   }
  // };

  const handleOnClickUpdateOrderData = async formdata => {};
  return {
    openEditOrdeData,
    handleToggleEditOrderData,
    handleOnClickUpdateOrderData,
    registerOrderData,
    handleSubmitOrderData,
    setValueOrderData,
    errorsOrderData,
    controlOrderData,

    // openEditOrderShipping,
    // handleToggleEditShipping,
    // registerShipping,
    // handleSubmitShipping,
    // setValueShipping,
    // errorsShipping,
    // controlShipping,
    // handleOnChangePostalCode,
    // handleSelectEntity,
    // handleSelectCity,
    // handleOnClickUpdateShipping,
    // handleOnChangeSelect,
  };
}

{
  /* <Select
  onMenuOpen={() => getCatalogBy("categories")}
  loadingMessage={() => "Cargando Opciones..."}
  isLoading={categories.isFetching}
  placeholder="Buscar Nombre de categoria de Producto..."
  options={cat}
  isClearable={false}
  noOptionsMessage={() => "Ingrese el Nombre"}
  onInputChange={customFilterCategorys}
  formatOptionLabel={formatOptionLabelCategory}
  getOptionLabel={option => {
    option.name;
  }}
  getOptionValue={option => option.id}
  onChange={handleSelectCategory}
  filterOption={customFilterSelectCategory}
/>; */
}
