import { useEffect } from "react";
import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import DirLogInventaryUnitService from "../services";

export default function useDirBiomedic(productInventorySelected, tabSeletect) {
  const [isFetchingBiomedical, setIsFetchingBiomedical] = useState(false);
  const [dataBiomedical, setDataBiomedical] = useState();
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalExit, setTotalExit] = useState(0);
  const DirLogInventaryUnitEntrance = new DirLogInventaryUnitService();

  useEffect(() => {
    const getProductsInventoryExit = async () => {
      try {
        let query = {};
        query.id = productInventorySelected?.id;
        // query.productId = "62d09Tuuhp22mowzna3P0129"; //con vista previa
        setIsFetchingBiomedical(true);
        const resData = (await DirLogInventaryUnitEntrance.getProductsBiome(query)).data;
        console.log("bio", resData);
        setDataBiomedical(resData.results);
        setTotalExit(resData.count);
        setIsFetchingBiomedical(false);
      } catch (error) {
        console.log(error);
        setIsFetchingBiomedical(false);
      }
    };

    if (productInventorySelected && tabSeletect === "biomedical") {
      getProductsInventoryExit();
    }
  }, [productInventorySelected, tabSeletect]);

  useEffect(() => {
    if (productInventorySelected && tabSeletect === "outputs") {
      restorePage();
    }
  }, [productInventorySelected, tabSeletect]);

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return {
    isFetchingBiomedical,
    dataBiomedical,
    paginationDataExit: {
      handlePage,
      page,
      limit,
    },
    totalExit,
  };
}
