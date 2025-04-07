import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import usePagination from "../../../hooks/usePagination";

import dayjs from "dayjs";

export default function useDirLogProducts(productSelected) {
  const DirLogService = new DirLogInventaryUnitService();


  const [keyword, setKeyword] = useState("");
  const { page, limit, handlePage, handlePagination} = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState()

  const [allSeries, SetAllSeries] = useState({
    products: [],
    isFetchingData: false,
    totalProducts: 0,
  })

  // console.log(allSeries.products[0].id,"xxxx");
  const [wareHouseproductsData, setProductsData] = useState({
    products: [],
    isFetchingData: false,
    totalProducts: 0,
  });


  useEffect(() => {
    setKeyword(productSelected?.product?.code || "");
  }, [productSelected]);

  useEffect(() => {
    fetchProducts();
  }, [keyword, page, limit, orderBy]);
  
  const fetchProducts = async () => {
    try {
      setProductsData(prev => ({ ...prev, isFetchingData: true }));
      let query = {};

      if (keyword.length > 3) {
        query = {
          ...query,
          code: keyword.trim().toLocaleUpperCase()
          // product: {
          //   $or: [
          //     {
          //       code: {
          //         "iRegexp": `${keyword.trim().toLocaleLowerCase()}`,
          //       },
          //     },
          //     {
          //       "name": {
          //         iRegexp: `${keyword.trim().toLocaleLowerCase()}`,
          //       },
          //     },
          //   ],

          //   // name: {
          //   //   iRegexp: `${keyword.trim().toLocaleLowerCase()}`,
          //   // },
          //   // code: {
          //   //   iRegexp: `${keyword.trim().toLocaleLowerCase()}`,
          //   // },
          // },
        };
      }

      const resData = (await DirLogService.getProductsInventory(limit, page, orderBy, query)).data;
      let products = resData.results || [];
      const normalizedProducts = products.map(DirLogService.normalizeProductsInventory);
      const dt = normalizedProducts.find((select) => select.code === keyword)
      setTotal(resData.count || 0) 

      setProductsData({
        products: dt ? [dt] : normalizedProducts,
        isFetchingData: false,
        totalProducts: total,
      });
      } catch (error) {
      setProductsData(prev => ({ ...prev, isFetchingData: false }));

      //   setIsFetchingData(false);
      console.error(error);
    }
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const deleteKeyWord = () => {
    setKeyword("");
  };

  return {
    wareHouseproductsData,
    keyword,
    setKeyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    selectedRows,
    setSelectedRows,
    allSeries,
    page,
    total,
    handlePage,
    handlePagination,
    tableData: {
      heads,
      data: wareHouseproductsData.products,

      // actions,
      // data,
      // customColumns,
    },

    paginationData: {
      handlePage,
      page,
      limit,
    },
  };
}

let heads = [
  // {
  //   headText: "Numero de Serie",
  //   headNormalize: "serialnumber",
  //   orderby: null,
  // },
  {
    headText: "Codigo",
    headNormalize: "code",
    orderby: null,
  },
  {
    headText: "Producto",
    headNormalize: "name",
    orderby: "-name",
  },
  {
    headText: "Categoria",
    headNormalize: "category",
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

// * Join this with page
class DirLogInventaryUnitService {
  async getProductsInventory(limit = 20, page = 1, orderBy, query) {
    let params = {
      // include: "product,product.category",
      // include:
      //   "address,address.entity.city.postal,warehousesstatus,oportunity,oportunity.prospect,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
      limit: limit,
      skip: page,
      count: 1,
      // order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("products", { params });
  }

  normalizeProductsInventory(productIntentory) {
    // console.log(productIntentory,"productIntentory");
    return {
      serialnumber: productIntentory.serialnumber,
      code: productIntentory?.code || "Sin codigo",
      name: productIntentory?.name || "Sin nombre",
      category: productIntentory.product?.category?.name || "Sin categoria",
      stock: productIntentory.stock || Math.floor(Math.random() * 1000),
      stockfinal: productIntentory.stockfinal || Math.floor(Math.random() * 1000),
      unidad: productIntentory.unit || "Pza",
      entrydate: productIntentory.entrydate || dayjs().format("DD/MM/YYYY"),
      outputdate: productIntentory.outputdate || "No aplica",
      warehouse: productIntentory.warehouse || "No aplica",
      id: productIntentory.id,
    };
  }
}



