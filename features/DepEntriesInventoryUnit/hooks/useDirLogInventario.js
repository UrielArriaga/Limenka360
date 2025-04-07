import React, { useEffect } from "react";
import { useState } from "react";

import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";
import DirLogInventaryUnitService from "../services";

export default function useDirLogInventario(activeFilters) {
  const DirLogService = new DirLogInventaryUnitService();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [data, setData] = useState(initialData);
  const [totalResults, setTotalResults] = useState(0);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [productInventorySelected, setProductInventorySelected] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [refetch, setRefetch] = useState(false);
  const handleOnClickRow = item => {
    setProductInventorySelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  useEffect(() => {
    fetchProductsInventory();
  }, [orderBy, page, limit, keyword, activeFilters]);

  const buildQuery = () => {
    let query = {};

    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        console.log("elemen", element);
        if (element.parent) {
          switch (element.parent) {
            case "statusrepair":
              query[element.parent] = element.value === "Mostrar En Reparacion" ? true : false;
              break;
            case "isapart":
              query[element.parent] = element.value === "Mostrar Apartados" ? true : false;
              break;
            case "providers":
              query["product"] = { [element.valuedb]: element.value };
              break;
            case "dates":
                if (element.option.id === "range") {
                  query[element.valuedb] = {
                    $gte: element.option?.value?.startDate,
                    $lt: element.option?.value?.endDate,
                  };
                  return;
                }
  
                query[element.valuedb] = {
                  $gte: dayjs().startOf(element?.option?.id).format(),
                  $lt: dayjs().endOf(element?.option?.id).format(),
                };
  
                break;
          }
        }
      });
    }
    return query;
  };
  const fetchProductsInventory = async () => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (keyword.length > 3) {
        query.serialnumber = {
          $iRegexp: keyword,
        };
      }
      const resData = (await DirLogService.getProductsInventory(limit, page, orderBy, query)).data;

      let products = resData.results || [];
      let total = resData.count || 0;
      const normalizedProducts = products.map(DirLogService.normalizeProductsInventory);

      setTotalResults(total);
      setData(normalizedProducts);
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
      console.error(error);
    }
  };

  const refetchData = () => {
    fetchProductsInventory();
  };
  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };
  const deleteKeyWord = () => {
    setKeyword("");
  };

  return {
    handleOnClickRow,
    handleOnClickClosePreview,
    isOpenPreview,
    productInventorySelected,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    isFetchingData,
    setOrderBy,
    refetchData,
    orderBy,
    totalResults,
    tableData: {
      heads,
      data,
      customColumns,
      // actions,
      // data,
      // customColumns,
    },
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,
    setProductInventorySelected,
  };
}

let customColumns = {
  serialnumber: {
    columname: "Folio",
    component: item => {
      return (
        <div className="TableName">
          <p
            style={{
              // textTransform: "uppercase",
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.serialnumber}
          </p>
        </div>
      );
    },
  },
  
  code: {
    columname: "code",
    component: item => {
      return (
        <div className="TableName">
          <p
            style={{
              // textTransform: "uppercase",
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.code}
          </p>
        </div>
      );
    },
  },

  totalProductos: {
    columname: "Folio",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            onClick={() => {
              console.log(item);
            }}
          >
            {item.totalProductos}

            <span
              style={
                {
                  // color: item.totalProductos < 10 ? "red" : "#034D6F",
                  // fontWeight: "bold",
                }
              }
            >
              Productos
            </span>
          </p>
        </div>
      );
    },
  },
  repair: {
    columname: "En Reparacion",
    component: item => {
      if (item.repair == "Si") {
        return (
          <div className="TableName">
            <Tooltip title="Producto en reparacion">
              <p
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  backgroundColor: "red",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  height: "20px",
                  width: "20px",
                  textAlign: "center",
                  fontSize: "10px",
                  paddingTop: "3px",
                }}
              >
                {item.repair}
              </p>
            </Tooltip>
          </div>
        );
      } else {
        return (
          <div className="TableName">
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              {item.repair}
            </p>
          </div>
        );
      }
    },
  },
  apart: {
    columname: "Apartado",
    component: item => {
      if (item.apart == "Si") {
        return (
          <div className="TableName">
            <Tooltip title="Producto apartado">
              <p
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  backgroundColor: "#0dd665",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  height: "20px",
                  width: "20px",
                  textAlign: "center",
                  fontSize: "10px",
                  paddingTop: "3px",
                }}
              >
                {item.apart}
              </p>
            </Tooltip>
          </div>
        );
      } else {
        return (
          <div className="TableName">
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              {item.apart}
            </p>
          </div>
        );
      }
    },
  },
};

let heads = [
  {
    headText: "Numero de Serie",
    headNormalize: "serialnumber",
    orderby: null,
  },
  {
    headText: "Código",
    headNormalize: "code",
    orderby: null,
  },
  {
    headText: "Producto",
    headNormalize: "name",
    orderby: null,
  },
  {
    headText: "Almacen",
    headNormalize: "warehouse",
    orderby: null,
  },
  {
    headText: "En Reparacion",
    headNormalize: "repair",
    orderby: null,
  },
  {
    headText: "Apartado",
    headNormalize: "apart",
    orderby: null,
  },
  {
    headText: "Proveedor",
    headNormalize: "provider",
    orderby: null,
  },
  {
    headText: "Fecha De Entrada",
    headNormalize: "createdAt",
    orderby: null,
  },
  {
    headText: "Fecha De Salida",
    headNormalize: "outputdate",
    orderby: null,
  },
];

const initialData = [
  {
    createdAt: "03 jun 2024",
    serie: "123456",
    product: "COLDSCULPTING / CRIOLIPOLISIS",
    almacen: "Almacen 1",
    totalProductos: 5,
    levelReposition: "Bajo",
  },
  {
    createdAt: "03 jun 2024",
    serie: "123456",
    product: "COLDSCULPTING / CRIOLIPOLISIS",
    almacen: "Almacen 1",
    totalProductos: 5,
    levelReposition: "Bajo",
  },
  {
    createdAt: "03 jun 2024",
    serie: "123456",
    product: "COLDSCULPTING / CRIOLIPOLISIS",
    almacen: "Almacen 1",
    totalProductos: 5,
    levelReposition: "Bajo",
  },
  {
    createdAt: "03 jun 2024",
    serie: "123456",
    product: "COLDSCULPTING / CRIOLIPOLISIS",
    almacen: "Almacen 1",
    totalProductos: 5,
    levelReposition: "Bajo",
  },
  {
    createdAt: "03 jun 2024",
    serie: "1234526",
    product: "BAUMANOMETRO DE MUÑECA",
    almacen: "Almacen 2",
    totalProductos: 5,
    levelReposition: "Bajo",
  },
];
