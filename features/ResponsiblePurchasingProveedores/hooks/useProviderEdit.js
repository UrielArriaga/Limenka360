import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { useForm } from "react-hook-form";
import { ProvidersServices } from "../services";

function useProviderEdit() {
  const { open: openEdit, toggleModal: toggleModaEdit } = useModal();
  const [providerEdit, setProviderEdit] = useState(null);
  const handleCloseEdit = () => toggleModaEdit();
  const request = new ProvidersServices();
  const [dataAddress, setDataAddress] = useState({
    data: [],
    isFetching: false,
    count: 0,
    isError: false,
    errorMessage: "",
  });
  const [storedAddresses, setStoredAddresses] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [suppliersToSave, setSuppliersToSave] = useState({
    add: [],
    remove: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();

  const closeDrawer = () => {
    handleCloseEdit();
  };

  useEffect(() => {
    if (openEdit) {
      SetValues(providerEdit);
      getAddress();
    }
  }, [openEdit]);

  const getAddress = async () => {
    try {
      setDataAddress({ ...dataAddress, isFetching: true });
      let query = {
        providerId: providerEdit?.id,
      };
      let response = await request.getAddressOfProvider(query);
      if (response.status == 200) {
        setDataAddress({ ...dataAddress, isFetching: false, data: response?.data?.results });
      }
    } catch (error) {
      setDataAddress({ ...dataAddress, isFetching: false, isError: true, errorMessage: error });
      console.log("error");
    }
  };

  function SetValues(provider) {
    setValue("name", provider?.item?.name);
    setValue("lastname", provider?.item?.lastname);
    setValue("email", provider?.email);
    setValue("phone", provider?.phone);
    if (provider?.item?.optionalphone) {
      setValue("phoneOptional", provider?.item?.optionalphone);
    }
    setValue("entity", provider?.item?.entityId);
    setValue("companyname", provider?.item?.companyname);
    setValue("type", provider?.item?.type);
    setValue("rfc", provider?.item?.rfc);
    setValue("identifier", provider?.item?.identifier);
    setValue("observations", provider?.item?.observations);
    setValue("nifcif", provider?.item?.nifcif);
    if (provider?.item?.commercialbussinessId) {
      setValue("commercialbussinessId", provider?.item?.commercialbussinessId);
    }
  }

  const handleUploadProspect = async formData => {
    if (dataAddress?.data?.length == 0) {
      showAlertWarning("Es necesario agregar una direccion de proveedor.");
      return;
    }
    const addresses = dataAddress?.data?.map(address => {
      const baseAddress = {
        street: address.street || "",
        ext_number: address.ext_number || "",
        int_number: address.int_number || "",
        references: address.references || "",
        settlement: address.settlement || "",
        companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        entityId: address.entity?.id || "",
      };
      if (address?.postalId) {
        baseAddress.postalId = address?.postalId;
      }

      if (address?.city?.id) {
        baseAddress.cityId = address?.city?.id;
      }
      if (address?.id) {
        baseAddress.id = address?.id;
      }

      return baseAddress;
    });

    let addressCreated = [];
    let addressNew = [];
    addressCreated = addresses?.filter(item => item.id);
    addressNew = addresses?.filter(item => !item.id);

    try {
      let putProvider = {};
      putProvider.name = formData?.name?.toLowerCase();
      putProvider.lastname = formData?.lastname?.toLowerCase();
      putProvider.email = formData.email;
      putProvider.phone = formData.phone;
      putProvider.optionalphone = formData.phoneOptional;
      putProvider.companyname = formData.companyname.toLowerCase();
      putProvider.type = formData.type ? formData.type : "";
      putProvider.rfc = formData.rfc;
      putProvider.identifier = formData.identifier ? formData.identifier.toLowerCase() : "";
      putProvider.nifcif = formData.nifcif ? formData.nifcif : "";
      putProvider.observations = formData.observations.toLowerCase();
      putProvider.street = formData.street;
      if (addressCreated.length > 0) {
        putProvider.putaddresses = addressCreated;
      }
      if (addressNew.length > 0) {
        putProvider.addaddresses = addressNew;
      }
      if (storedAddresses.length > 0) {
        putProvider.deladdresses = storedAddresses;
      }
      let providerNew = await api.put(`providers/${providerEdit?.id}`, putProvider);

      if (providerNew.status == 200) {
        putSupplierProvider();
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al editar proveedor");
    }
  };

  const putSupplierProvider = async () => {
    let suppliersToSaveLocal = suppliersToSave?.add?.filter(item=> !item.id );
    let supplierAgregateProviderID = suppliersToSaveLocal?.map(item=> {
      return {
        ...item,
        providerId:providerEdit?.id
      }
    })
    
    if(supplierAgregateProviderID?.length > 0){
      try {
        for(let i = 0; i<supplierAgregateProviderID.length; i++){
          await api.post(`suppliercontacts`, supplierAgregateProviderID[i]);
        }
      } catch (error) {
        console.log(error, " error al crear contactos");  
      }
    }
    if(suppliersToSave?.remove.length > 0){
      try {
        for(let i=0; i < suppliersToSave?.remove.length; i++){
          await api.delete(`suppliercontacts/${suppliersToSave?.remove[i]}`);
        }
      } catch (error) {
        console.log(error, " error al eliminar contactos");
      }
    }
    showAlertSucces("Proveedor Actualizado correctamente");
    closeDrawer();
  };

  const removeAddress = index => {
    if (dataAddress?.data[index].id) setStoredAddresses([...storedAddresses, dataAddress?.data[index].id]);
    const updatedAddresses = dataAddress?.data?.filter((_, i) => i !== index);
    setDataAddress({ ...dataAddress, data: updatedAddresses });
  };

  const addDirection = direction => setDataAddress({ ...dataAddress, data: direction });


  return {
    openEdit,
    toggleModaEdit,
    setProviderEdit,
    providerEdit,
    closeDrawer,
    errors,
    register,
    handleSubmit,
    handleUploadProspect,
    dataAddress,
    removeAddress,
    setPostalCode,
    postalCode,
    addDirection,
    setSuppliersToSave,
    suppliersToSave,
  };
}

export default useProviderEdit;
