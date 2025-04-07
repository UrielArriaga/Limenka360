import React, { useEffect, useState } from "react";
import { BiomedicaInventoryServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { getColor, getColorType } from "../utils";
export default function useInvetory(activeFilters,type){
 const inventoryService = new BiomedicaInventoryServices();
 const [data, setData] = useState([]);
 const [isFetchingData, setIsFetchingData] = useState(true);
 const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
 const [keyword, setKeyword] = useState("");
 const [totalproduct, setTotalProducts] = useState();
 const [producSelect, setProductSelect] = useState(null);
 const [isEditing, setisEditing] = useState(false);
 const [openNew, setOpenNew] = useState(false);

 useEffect(() => {
    getProductInventory();
  }, [page, limit,keyword,activeFilters]);

 const getProductInventory = async () => {
    try {
        setIsFetchingData(true);
        let query = {};
        query = buildQuery();
        if (keyword.length > 3) {
         query.serialnumber  = {
           $iRegexp: keyword,
         };
       }
        const response = (await inventoryService.getInventoryBiomedica(limit, page, query)).data;
        let res = response.results;
        let normalizeData = res.map(item => inventoryService.normalizeproducts(item));
        setData(normalizeData);
        setTotalProducts(response.count);
        setIsFetchingData(false);
    } catch (error) {
        setIsFetchingData(false);
        console.log('Error:', error);
    }
 }

 const buildQuery = () => {
  let query = {};
  if(type === "reparación"){
    query = {
      statusrepair: true
    };
  } 

  if (activeFilters.length > 0) {
    activeFilters.forEach(element => {
      if (element.parent) {
        switch (element.parent) {
            case "available": 
             query.available = element.value;
             break;
            case "type": 
            //  query.type = element.value;
            query[element.valuedb] = element.value;
             break;
        }
      }
    });
  }
  return query;
};

 const deleteKeyWord = () => setKeyword("");

 const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };
  const handleOnClickProduct = () => {
    setOpenNew(true);
  };
  const handleDrawerClose = () => {
    setOpenNew(false);
    setisEditing(false); 
  };
  const handleOnClickEdit = item => {
    setOpenNew(true);
    setisEditing(true); 
    setProductSelect(item);
  }

  const refreshData = () => {
    getProductInventory();
  }
  return {
    totalproduct,
    keyword,
    isFetchingData,
    isEditing,
    openNew,
    producSelect,
        tableData: {
        heads,
        data,
        customColumns,
         },
         paginationData: {
            handlePage,
            page,
            limit,
          },
    refreshData,
    setProductSelect,
    handleDrawerClose,
    handleOnClickEdit,
    handleOnClickProduct,
    handleOnChangeKeyWord,
    deleteKeyWord
  }
}
const customColumns = {
  available:{
    columname: "Disponible",
    component : item => {
      return(
        <div 
        style={{
          display: "inline-block",
          padding: "2px 10px",
          borderRadius: 15,
          background: getColor(item.available).bgColor,
        }}
      >
        <p
          className="name"
          style={{
            color: getColor(item.available).color,
          }}
        >
       {item.available ? "Disponible" : "No Disponible"}
        </p>
        </div>
      )
    }
  },
  type:{
    columname: "Tipo",
    component : item => {
      return(
        <div 
        style={{
          display: "inline-block",
          padding: "2px 10px",
          borderRadius: 15,
          background: getColorType(item.type).bgColor,
        }}
      >
        <p
          className="name"
          style={{
            color: getColorType(item.type).color,
          }}
        >
          {item.type}
        </p>
        </div>
      )
    }
  }
}
const heads = [
    {
        headText: "Nombre de accesorio",
        headNormalize: "name",
        orderby: null, 
    },
    {
      headText: "Numero de Serie",
      headNormalize: "serialnumber",
      orderby: null,
  },
    {
        headText: "Tipo",
        headNormalize: "type",
        orderby: null,
    },
    {
      headText: "Observaciones",
      headNormalize: "observations",
      orderby: null,
  },
    {
        headText: "Stock",
        headNormalize: "stock",
        orderby: null,
    },
 
  {
    headText: "Disponible",
    headNormalize: "available",
    orderby: null,
},
]