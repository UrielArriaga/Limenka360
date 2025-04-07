import React, { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import usePagination from "../../../hooks/usePagination";
import { BudgetsServices } from "../services";
import dayjs from "dayjs";

export default function useShippingBudgets(setSelectItemProduct, optionsFilterSelected) {
  let heads = [
    {
      headText: "folio",
      headNormalize: "folio",
      orderby: "-folio",
    },
    // {
    //   headText: "Vigencia",
    //   headNormalize: "validity",
    //   orderby: null,
    // },
    {
      headText: "Tipo de presupuesto",
      headNormalize: "budgettype",
      orderby: null,
    },
    {
      headText: "Creado por",
      headNormalize: "createdby",
      orderby: null,
    },
    {
      headText: "Asignado A",
      headNormalize: "asigned",
      orderby: null,
    },
    {
      headText: "Fecha de Creación",
      headNormalize: "created",
      orderby: null,
    },
  ];

  const customColumns = {
    folio: {
      columname: "folio",
      component: item => {
        return (
          <div className="TableName">
            <p
              className="name"
              style={{
                color: "#034D6F",
                fontWeight: "bold",
              }}
              onClick={() => {}}
            >
              {item.folio}
            </p>
          </div>
        );
      },
    },
  };

  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [orderBy, setOrderBy] = useState("id");
  const BubgetsService = new BudgetsServices();
  const [keyword, setKeyword] = useState("");
  const { page, limit, handlePage } = usePagination({ defaultLimit: 60, defaultPage: 1 });
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [budgetsSelected, setBudgetsSelected] = useState(null);
  const [dataAllProducts, setDataAllProducts] = useState({
    data: [],
    fetching: false,
    count: 0,
  });

  useEffect(() => {
    getData();
  }, [page, orderBy, keyword]);

  const getData = async () => {
    try {
      setDataAllProducts({ ...dataAllProducts, fetching: true });
      let query = {};

      if (keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }

      const response = await BubgetsService.getBudgets(limit, page, orderBy, query);
      let { results, count } = response?.data;
      let normalizeData = results?.map(item => BubgetsService.normalizeBudgets(item));
      setDataAllProducts({ data: normalizeData, fetching: false, count });
    } catch (error) {
      showAlertError("Ocurrio un error al obtener presupuestos");
    }
  };

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setBudgetsSelected(item);
  };

  const refetchData = () => getData();

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };
  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };
  const deleteKeyWord = () => setKeyword("");

  return {
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      orderBy,
      setOrderBy,
      heads,
      keyword,
      // actions,
      data: dataAllProducts,
      customColumns,
    },
    isOpenPreview,
    setIsOpenPreview,
    refetchData,
    handleOnClickClosePreview,
    handleOnClickRow,
    budgetsSelected,
    handleOnChangeKeyWord,
    deleteKeyWord,
  };
}
