import { useEffect, useState } from "react";
import { api } from "../../../services/api";

export default function useListProvidersDirections(isOpenPreview, selectedData) {
  const [dataAddress, setDataAddress] = useState([]);
  const [isfetching, setIsFetching] = useState(false);
  const [dataContacts, setDataContacts] = useState({
    data:[],
    isfetching:false
  });
  const providerId = selectedData?.id;
  console.log("providerSelected", selectedData);
  useEffect(() => {
    if (isOpenPreview) {
      getDataInitial();
      getDataContacts();
    }
  }, [isOpenPreview, selectedData]);

  const getDataInitial = async () => {
    try {
      setIsFetching(true);
      let query = {
        providerId: providerId,
      };
      let params = {
        where: JSON.stringify(query),
        include: `city,entity,postal`,
        join: `c,entity,p`,
      };
      let ProviderDirections = await api.get(`provideraddresses`, { params });
      setDataAddress(ProviderDirections?.data?.results || []);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const getDataContacts = async() => {
    try {
      setDataContacts({...dataContacts, isfetching:true});
      let query = {
        providerId:providerId
      }
      let params = {
        where:JSON.stringify(query)
      }
      let response = await api.get(`suppliercontacts`,{params});
      if(response.status == 200 || response.status == 201){
        setDataContacts({data:response?.data?.results, isfetching:false})
      }
    } catch (error) {
      setDataContacts({...dataContacts, isfetching:false})
      console.log(error, " error get contacts");
    }
  }

  return { dataAddress, isfetching, dataContacts };
}
