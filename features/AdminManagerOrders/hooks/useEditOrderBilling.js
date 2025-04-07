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
import { getCities, getshippingtypes, gettaxregimens } from "../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

export default function useEditOrderBilling(orderSelectedData, refetchPedido) {
  const { open: openEditOrderBill, toggleModal: closeBilling } = useModal();
  const dispatch = useDispatch();
  const { showAlertWarning, showAlertError, showAlertSucces } = useAlertToast();
  const [hasBilling, setHasBilling] = useState(false);

  const [optionsSelectBilling, setOptionsSelectBilling] = useState({
    taxregimendef: [],
    cfdidef: [],
    paymentwaydef: [],
    paymentmethod: [],
  });

  const {
    register: registerBilling,
    handleSubmit: handleSubmitBilling,
    setValue: setValueBilling,
    watch: watchBilling,
    control: controlBilling,
    formState: { errors: errorsBilling },
    reset: resetBilling,
  } = useForm();

  useEffect(() => {
    const bill = orderSelectedData?.bill;

    if (bill && orderSelectedData?.billing) {
      setValueBilling("businessName", orderSelectedData?.bill?.businessname);
      setValueBilling("rfc", orderSelectedData?.bill?.rfc);
      setValueBilling("taxregime", orderSelectedData?.bill?.taxregime);
      // paymentmethod
      setValueBilling("cfdi", orderSelectedData?.bill?.cfdi);
      setValueBilling("paymentmethod", orderSelectedData?.bill?.paymentmethod);
      setValueBilling("paymentway", orderSelectedData?.bill?.paymentway);
      setValueBilling("phoneInvoice", orderSelectedData?.bill?.phone);
      setValueBilling("streetInvoice", orderSelectedData?.bill?.address?.street);
      setValueBilling("int_numberInvoice", orderSelectedData?.bill?.address?.int_number);
      setValueBilling("ext_numberInvoice", orderSelectedData?.bill?.address?.ext_number);
      setValueBilling("cologneInvoice", orderSelectedData?.bill?.address?.settlement);
      setValueBilling("postalCodeInvoice", orderSelectedData?.bill?.address?.postal?.postal_code);
      setValueBilling("postal", orderSelectedData?.bill?.address?.postal);
      setValueBilling("entity", orderSelectedData?.bill?.address?.entity);
      setValueBilling("city", orderSelectedData?.bill?.address?.city);

      setHasBilling(orderSelectedData?.billing);

      setOptionsSelectBilling(prev => ({
        ...prev,
        taxregimendef: [bill?.taxregime],
        cfdidef: [bill?.cfdi],
        paymentmethoddef: [bill?.paymentmethod],
        paymentwaydef: [bill?.paymentway],
      }));
    }
  }, [orderSelectedData, openEditOrderBill]);

  useEffect(() => {
    if (orderSelectedData && openEditOrderBill && orderSelectedData?.bill?.address?.entity) {
      let params = {
        order: "name",
        all: 1,
        where: {
          entityId: orderSelectedData?.bill?.address?.entity?.id,
        },
      };
      dispatch(getCities({ params }));
    }
  }, [orderSelectedData, openEditOrderBill]);

  useEffect(() => {
    if (orderSelectedData && openEditOrderBill && orderSelectedData?.address?.entity) {
      let params = {
        order: "name",
        all: 1,
      };
      dispatch(getshippingtypes({ params }));
    }
  }, [orderSelectedData, openEditOrderBill]);

  useEffect(() => {}, []);

  const handleToggleEditBill = () => {
    closeBilling();
    resetBilling();
  };

  const handleOnChangePostalCodeBill = async e => {
    if (e.target.value.length < 5) return;

    try {
      let response = await fetchPostalCodeData(e.target.value);
      if (response.data?.results.length === 0) {
        showAlertWarning("Código Postal no encontrado");
      }

      setValueBilling("postalCodeInvoice", e.target.value);
      setValueBilling("postal", response.data?.results[0]);
      setValueBilling("entity", response.data?.results[0]?.city?.entity);
      setValueBilling("city", response.data?.results[0]?.city);
      fetchCities(response.data?.results[0]?.city?.entity?.id);
    } catch (error) {
      showAlertError("Error al obtener los datos del código postal");
    }
  };

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

  const handleSelectEntity = async option => {
    setValueBilling("entity", option);

    let params = {
      order: "name",
      all: 1,
      where: {
        entityId: option.id,
      },
    };
    dispatch(getCities({ params }));
  };

  const handleSelectCity = async option => {
    setValueBilling("city", option);
  };

  const handleOnClickUpdateBilling = async formdata => {
    try {
      if (hasBilling && orderSelectedData?.billing === false) {
        let normalizeAddressBilling = {
          street: formdata.streetInvoice,
          ext_number: formdata.ext_numberInvoice,
          int_number: formdata.int_numberInvoice,
          settlement: formdata.cologneInvoice,
          postalId: formdata.postal?.id,
          cityId: formdata.city?.id,
          entityId: formdata.entity?.id,
        };
        let dataToPut = {
          billingaddress: normalizeAddressBilling,
          billingbusiness: formdata.businessName,
          billingphone: formdata.phoneInvoice,
          rfc: formdata.rfc,
          taxregimeId: formdata.taxregime.id,
          cfdiId: formdata.cfdi.id,
          paymentmethodId: formdata.paymentmethod.id,
          paymentwayId: formdata.paymentway.id,
          billing: true,
        };
        await api.put(`orders/${orderSelectedData.id}`, dataToPut);
        refetchPedido();
        handleToggleEditBill();
        showAlertSucces("Datos de facturación actualizados correctamente");
        return;
      }

      if (!hasBilling) {
        await api.put(`orders/${orderSelectedData.id}`, {
          billing: false,
        });

        refetchPedido();
        handleToggleEditBill();
        showAlertSucces("Datos de facturación eliminados correctamente");
        return;
      }

      let normalizeBilling = {
        businessname: formdata.businessName,
        rfc: formdata.rfc,
        taxregimeId: formdata.taxregime.id,
        cfdiId: formdata.cfdi.id,
        paymentmethodId: formdata.paymentmethod.id,
        paymentwayId: formdata.paymentway.id,
        phone: formdata.phoneInvoice,
      };

      let normalizeAddres = {
        street: formdata.streetInvoice,
        ext_number: formdata.ext_numberInvoice,
        int_number: formdata.int_numberInvoice,
        settlement: formdata.cologneInvoice,
        postalId: formdata.postal?.id,
        cityId: formdata.city?.id,
        entityId: formdata.entity?.id,
      };

      await api.put(`bills/${orderSelectedData.bill.id}`, normalizeBilling);
      await api.put(`addresses/${orderSelectedData.bill.address.id}`, normalizeAddres);

      refetchPedido();
      handleToggleEditBill();
      showAlertSucces("Datos de facturación actualizados correctamente");
    } catch (error) {
      showAlertError("Error al actualizar los datos de facturación");
    }
  };

  const handleOnChangeSelectBilling = (option, action) => {
    const { name } = action;

    switch (name) {
      case "taxregime":
        setValueBilling("taxregime", option);
        break;
      case "cfdi":
        setValueBilling("cfdi", option);
        break;
      case "paymentmethod":
        setValueBilling("paymentmethod", option);
        break;
      case "paymentway":
        setValueBilling("paymentway", option);
        break;

      case "entity":
        handleSelectEntity(option);
        break;
      case "city":
        handleSelectCity(option);
        break;

      default:
        break;
    }
  };
  //

  return {
    openEditOrderBill,
    handleToggleEditBill,
    registerBilling,
    handleSubmitBilling,
    controlBilling,
    setValueBilling,
    watchBilling,
    errorsBilling,
    optionsSelectBilling,
    // registerShipping,
    // handleSubmitShipping,
    // setValueShipping,
    // controlShipping,
    handleOnChangePostalCodeBill,
    handleSelectCity,
    handleOnClickUpdateBilling,
    handleOnChangeSelectBilling,
    hasBilling,
    setHasBilling,
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
