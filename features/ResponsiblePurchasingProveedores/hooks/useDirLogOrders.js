import React, { useContext, useEffect, useState } from "react";
import { ProvidersServices } from "../services";
import usePagination from "../../../hooks/usePagination";

export default function useDirLogOrders(orderSelectedData) {
  const providersServicess = new ProvidersServices();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [dataOrders, setDataOrders] = useState({ isFeching: false, data: [], count: 0 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [optionsFilterSelected, setOptionsFilterSelected] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [deleveryMethod] = useState([
    { id: "recoleccion", name: "Recoleccion" },
    { id: "proveedor envia", name: "Proveedor Envia" },
  ]);
  const [payMethod] = useState([
    { id: "pago de contado", name: "Pago de Contado" },
    { id: "credito interno", name: "Credito Interno" },
    { id: "credito externo", name: "Credito Externo" },
    { id: "especie", name: "Especie" },
    { id: "efectivo-contraentrega", name: "Efectivo - Contra Entrega" },
  ]);
  const filtersPurchaseOrders = [
    {
      label: "Metodo de Entrega",
      value: "methoddelivery",
      valuedb: "methoddelivery",
      custom: true,
      customOptions: deleveryMethod,
      getLabel: "name",
      getValue: "id",
    },
    {
      label: "Condicion de Pago",
      value: "paymentcondition",
      valuedb: "paymentcondition",
      custom: true,
      customOptions: payMethod,
      getLabel: "name",
      getValue: "id",
    },
  ];

  useEffect(() => {
    if (orderSelectedData) {
      getData();
    }
  }, [orderSelectedData, keyWord, optionsFilterSelected]);

  const buildQuery = () => {
    let query = {};
    query.providerId = orderSelectedData?.id;
    for (let i = 0; i < optionsFilterSelected.length; i++) {
      if (optionsFilterSelected[i].parent) query[optionsFilterSelected[i].valuedb] = optionsFilterSelected[i].value;
    }
    return query;
  };

  const getData = async () => {
    try {
      setDataOrders({ ...dataOrders, isFeching: true });
      let query = {};
      query = buildQuery();
      if (keyWord.length > 3) {
        query.folio = {
          $iRegexp: keyWord.trim(),
        };
      }

      const response = await providersServicess.getShippingsOrders(limit, page, orderBy, query);
      let results = response.data.results;
      let count = response.data.count;
      let normalizeData = results.map(item => providersServicess.normalizeDataOrdersProviders(item));
      setDataOrders({ ...dataOrders, isFeching: false, data: normalizeData, count: count });
    } catch (error) {
      console.log(error);
      setDataOrders({ ...dataOrders, isFeching: true });
    }
  };

  const handleOnChangeFilter = (option, typeFilter) => {
    let newfilter = {
      name: option[typeFilter.getLabel],
      parent: typeFilter.value,
      value: option[typeFilter.getValue],
      option: option,
      finalValueName: option[typeFilter.getLabel],
      valuedb: typeFilter.valuedb,
      label: typeFilter.label,
    };
    setOptionsFilterSelected([...optionsFilterSelected?.filter(item => item.parent != typeFilter.value), newfilter]);
  };
  const handleDeleteFilter = filter => {
    setOptionsFilterSelected([...optionsFilterSelected?.filter(item => item.parent != filter.parent)]);
  };

  return {
    tableDataOrders: {
      dataOrders,
    },
    setKeyWord,
    keyWord,
    filtersOption:{
      handleOnChangeFilter,
      handleDeleteFilter,
      optionsFilterSelected,
      filtersPurchaseOrders
    }
  };
}
