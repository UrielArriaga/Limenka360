import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { ShippingsOrdersServices } from "../services";

function useWarrantyArticles(articleSelected) {
  const request = new ShippingsOrdersServices();
  const { open: isModalOpen, toggleModal: toggleModalArticle } = useModal();
  const [url, setUrl] = useState("");
  const [quantityExist, setQuantityExist] = useState(0);

  useEffect(() => {
    if (isModalOpen == true) {
      getWarrantiesOfArticles();
    }
  }, [articleSelected, isModalOpen]);

  const getWarrantiesOfArticles = async () => {
    try {
      let query = {
        warehouseproduct: {
          productId: articleSelected,
        },
      };
      const response = await request.getWarrantiesArticles(query);
      if (response.status == 200 || response.status == 201) {
        console.log("respuesta con la url de la garantia", response.data);
        let existWarranty = response?.data?.results;
        let urlFile = response?.data?.results[0]?.warehouseproduct?.reviewformatURL;
        setUrl(urlFile);
        setQuantityExist(existWarranty?.length);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return {
    isModalOpen,
    toggleModalArticle,
    url,
    quantityExist
  };
}

export default useWarrantyArticles;
