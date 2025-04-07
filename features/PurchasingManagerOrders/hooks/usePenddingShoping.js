import { useState,useEffect } from "react";
import { ShippingsOrdersServices } from "../services";
import usePagination from "../../../hooks/usePagination";
export default function usePenddingShoping (orderSelected){
    const [isFetchingPendings, setIsFetchingPendings] = useState(false);
    const [dataPendings, setDataPendings] = useState();
    const ordersService = new ShippingsOrdersServices();
    const [totalPendings, setTotalPendings]= useState(0);
    const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
    
    useEffect(() => {
        if (orderSelected) {
        getPendingOrders();  
        }
      }, [orderSelected]);
    let  getPendingOrders   = async () => {
        setIsFetchingPendings(true);
        try {
            let query = {
                purchaseorderId : orderSelected?.orderSelected?.id,
        
            }
            
          const response = await ordersService.getPendingsShoping(query);
          let results = response.data.results;
          let normalizeData = results.map(item => ordersService.normalizePendings(item));
          setDataPendings(normalizeData);
          setTotalPendings(response.data.count);
          setIsFetchingPendings(false);
        } catch (error) {
          console.log(error);
          setIsFetchingPendings(false);
        }
      };
      let heads = [
        {
            headText: "Nombre evento",
            headNormalize: "subject",
            orderby: null,
          },
          {
            headText: "tipo de pendiente",
            headNormalize: "typeevent",
            orderby: null,
          },
       
          {
            headText: "Creado por",
            headNormalize: "createdby",
            orderby: null,
          },
          {
            headText: "Fecha de inicio",
            headNormalize: "date_from",
            orderby: null,
          },
          {
            headText: "Fecha de termino",
            headNormalize: "date_to",
            orderby: null,
          },
          {
            headText: "Comentarios",
            headNormalize: "description",
            orderby: null,
          },
      ]

      return {
        isFetchingPendings,
        totalPendings,
        tableData: {
            heads,
            dataPendings,
          },
          paginationData: {
            handlePage,
            page,
            limit,
          },
      }
     
}