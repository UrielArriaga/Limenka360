import React, { useEffect } from "react";
import { useState } from "react";
import DirLogInventarioService from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";

export default function useDirLogInventario(activeFilters) {
  const DirLogService = new DirLogInventarioService();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [data, setData] = useState(initialData);
  const [totalResults, setTotalResults] = useState(0);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [productInventorySelected, setProductInventorySelected] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");

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

  const fetchProductsInventory = async () => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      if (keyword.length > 3) {
        query.or = [
          {
            code: {
              iRegexp: `${keyword.trim().toLocaleLowerCase()}`,
            },
          },
          {
            name: {
              iRegexp: `${keyword.trim().toLocaleLowerCase()}`,
            },
          },
        ];
      }
      const resData = (await DirLogService.getProductsInventory(limit, page, orderBy, query)).data;

      console.log(resData);
      let products = resData.results || [];
      let total = resData.count || 0;
      const normalizedProducts = products.map(DirLogService.normalizeProductsInventory);

      console.log(normalizedProducts);
      setTotalResults(total);
      setData(normalizedProducts);
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
      console.error(error);
    }
  };

  const buildQuery = () => {
    let query = {};
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "categories":
              query[element.valuedb] = element.value;

              break;
          }
        }
      });
    }

    return query;
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
    },
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,
  };
}

let customColumns = {
  stock: {
    columname: "Folio",
    component: item => {
      return (
        <div className="TableName">
          <Tooltip title={item.folio}>
            <p
              style={{
                textTransform: "uppercase",
              }}
            >
              {item.stock}
            </p>
          </Tooltip>
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
              textTransform: "uppercase",
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
};

let heads = [
  {
    headText: "Codigo",
    headNormalize: "code",
    orderby: null,
  },
  {
    headText: "Producto",
    headNormalize: "name",
    orderby: "-name",
    width: 300,
  },
  {
    headText: "Categoria",
    headNormalize: "category",
    orderby: null,
  },

  {
    headText: "Stock",
    headNormalize: "stock",
    orderby: "-stock",
  },

  {
    headText: "Stock Apartado",
    headNormalize: "stockapart",
    orderby: null,
  },

  {
    headText: "Stock en reparaciones",
    headNormalize: "stockrepair",
    orderby: null,
  },
];

const initialData = [];
