import React, { useEffect, useState } from "react";
import ApiRequestBudgets from "../services";
import { normalizeTableDataBudgets } from "../utils/tools";

function useBudgets() {
  const [budgets, setBudgets] = useState({
    isfetching: false,
    total: 0,
    data: [],
  });
  const [page, setPage] = useState(1);
  const limit = 6;
  const [keySearch, setKeySearch] = useState("");
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(false);
  const heads = ["id", "FOLIO", "FECHA DE CREACION", "EJECUTIVO", "TIPO DE PRESUPUESTO", "ASIGNADO A"];
  const request = new ApiRequestBudgets();

  useEffect(() => {
    getBudgets();
  }, [page,keySearch, orderby, ASC]);

  const getBudgets = async () => {
    try {
       let query = {}
       if(keySearch.length >= 2){
        query.folio =  {
            $iRegexp: keySearch.trim()
        }
        setPage(1);
       }
      setBudgets({ ...budgets, isfetching: true });
      let response = await request.getBudgets(limit,page,query,orderby,ASC);
      if (response.status == 200) {
        let data = normalizeTableDataBudgets(response?.data?.results)
        setBudgets({ data, total: response?.data?.count, isfetching: false });
      }
    } catch (error) {
      console.log(error, "ERROR");
      setBudgets({ ...budgets, isfetching: false });
    }
  };

  const handleOnChangePage = (event, value) => {
    setPage(value);
  };

  return {
    budgets,
    paginationData:{
        page,
        setPage,
        limit,
        handleOnChangePage
    },
    keySearch,
    setKeySearch,
    filterOrder:{
        orderby,
        setOrderby,
        ASC,
        setASC
    },
    heads
  };
}

export default useBudgets;
