import React, { useEffect, useState } from "react";
import { BiomedicServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { getColor, getSemaforo, getStatusIcon} from "../utils";


export default function useBiome(type) {
  const biomedicService = new BiomedicServices(); 
  const [products, setProducts] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [keyword, setKeyword] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [totalProducts, setTotalProducs] = useState();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [productSelect, setProductSelect] = useState(null);
  
  useEffect(() => {
    getProductsInventory();
  }, [page, limit,keyword,activeFilters,]);

  const updateProductIndicator = async (id, newIndicator) => {
    try {
      setIsFetchingData(true);
      await biomedicService.changeIndicator(id, newIndicator);
      setProducts(prevProducts => 
        prevProducts.map(product =>
          product.id === id ? { ...product, indicator: newIndicator } : product
        )
      );
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
      console.error("Error al actualizar el indicador:", error);
    }
  };

  const getProductsInventory = async () => {
    try {
      setIsFetchingData(true);
      let query = {};
         query = buildQuery();
         if (keyword.length > 3) {
          query.serialnumber  = {
            $iRegexp: keyword,
          };
        }
      const response = (await biomedicService.getProducts(limit, page, query)).data;
         let res = response.results;
        let normalizeData = res.map(item => biomedicService.normalizeDataProducts(item));
        setProducts(normalizeData); 
        setTotalProducs(response.count);
        setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
      console.log('Error:', error);
    }
  };

  const buildQuery = () => {
    let query = {};
    if(type?.type === "reparación"){
      query = {
        statusrepair: true
      };
    } 

    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "categories":
              query.product = {categoryId: element.value,
              };
              break;
              case "brands":
                query.product = {brandId: element.value,
                };
              break;
              case "statusrepair": 
               query.statusrepair = element.value;
               break;
              case "reviewed": 
               query.reviewed = element.value;
               break;
               case "indicator": 
               query.indicator = element.value;
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

  const handleOnClickRow = item => {
    
    setIsOpenPreview(true);
    setProductSelect(item);
  };
  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);

  };
  const refreshData = () => {
    getProductsInventory();
  }


  const filtersBiomedica = [
    {
      label: "Categoria",
      value: "categories",
      valuedb: "categoryId",
    },
    {
      label: "Marcas",
      value: "brands",
      valuedb: "brandId",
    },
    {
    label: "Estatus de reparación ",
    value: "statusrepair",
    valuedb: "statusrepair",
    custom: true,
    customOptions: [
      {
        id: "1",
        name: "En reparacion",
      },
      {
        id: "0",
        name: "En buen estado",
      },
    ],
    },
{
    label: "Estatus de revisión ",
    value: "reviewed",
    valuedb: "reviewed",
    custom: true,
    customOptions: [
      {
        id: "1",
        name: "Revisado",
      },
      {
        id: "0",
        name: "No revisado",
      },
    ],
    
    },
    {
      label: "Semaforo Biomedycal ",
      value: "indicator",
      valuedb: "indicator",
      custom: true,
      customOptions: [
        {
          id: "1",
          name: "Revisado",
        },
        {
          id: "0",
          name: "No revisado",
        },
      ],
      }
  ];
  return {
    products,
    totalProducts,
    isFetchingData,
    refreshData,
    keyword,
    setIsFetchingData,
    setIsFetchingData,
    handleOnClickRow,
    handleOnChangeKeyWord,
    handleOnClickClosePreview,
    getProductsInventory,
    isOpenPreview,
    setIsOpenPreview,
    setProductSelect,
    productSelect,
    filtersBiomedica,
    deleteKeyWord,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      products,
      actions,
      customColumns,
    },
    updateProductIndicator,
  };
}


const heads = [
  {
    headText: "Codigo",
    headNormalize: "code",
    orderby: null,
  },
  {
    headText: "Numero de serie",
    headNormalize: "serialnumber",
    orderby: null,
  },
  {
    headText: "Producto",
    headNormalize: "product",
    orderby: null,
  },
  {
    headText: "Marca",
    headNormalize: "brand",
    orderby: null,
  },
  {
    headText: "Categoria",
    headNormalize: "category",
    orderby: null,
  },
  {
    headText: "Estado Biomedica",
    headNormalize: "reviewed",
    orderby: null,
  },
  {
    headText: "Estado del Producto",
    headNormalize: "statusrepair",
    orderby: null,
  },
  {
    headText: "Semaforo Biomedical",
    headNormalize: "indicator",
    orderby: null,
  },
  {
    headText: "Fecha Entrada",
    headNormalize: "updatedAt",
    orderby: null,
  },
];
let actions = [
  {
    name: "Editar",
    action: e => {},
  },
];
const customColumns = {
  statusrepair: {
    columname: "Estado del Producto",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getColor(item.statusrepair).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColor(item.statusrepair).color,
            }}
            onClick={() => {}}
          >
            {item.statusrepair}
          </p>
          
        </div>
   
      );
    },
  },
  reviewed : {
    columname: "Estado Biomedica",
    component: item => {
      return(
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getStatusIcon(item.reviewed).bgColor,
          }}
        >
       <p
            className="name"
            style={{
              color: getStatusIcon(item.reviewed).color,
            }}>
            {item.reviewed}
            </p>
        </div>
      )
  
    }
  },

  indicator : {
    columname: "Semaforo Biomedical",
    component: item => {
      const semaforoStyle = getSemaforo(item.indicator); 
      return(
        <div
          className="TableName"
          style={{
            position: "relative",
            width: "19px", 
            height: "19px", 
            justifyContent: "center",  
            alignItems: "center",
            borderRadius: "50%", 
            background: semaforoStyle.bgColor, 
            margin: "0 auto",   
          }}
        />
      )
    }
  },
  


  url:{
    columname: "Evidencias",
    component: item => {
      <div>
       {item.url} 
      </div>
    }
  }
}