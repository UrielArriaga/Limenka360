import dayjs from "dayjs";
import {api} from "../../../services/api";

export class BiomedicServices{
    async getProducts(limit = 20, page = 1,query){
        let params = {
            limit:limit,
            skip: page,
            count: 1,
            include:"product,product.brand,product.category",
            where: JSON.stringify(query),  
        }
        return await api.get("/warehouseproducts", {params})
    }

    async getInventorytrackings(query, limit, page) {
        let params = {
          where: JSON.stringify(query),
          count: 1,
          order: "-createdAt",
          limit: limit,
          page: page,
          include:"ejecutive"
        };
        return await api.get(`inventorytrackings`, { params });
      }

      async changeStatusRepairs(id, status) {
        if (id == null || status == null) {
          throw new Error("id and data are required");
        }
        return await api.put(`/warehouseproducts/${id}`, {
          statusrepair: status,
        });
      }    

      async changeReviewed(id, reviewedproduct) {
        if (id == null || reviewedproduct == null) {
          throw new Error("id and data are required");
        }
        return await api.put(`/warehouseproducts/${id}`, {
          reviewed : reviewedproduct,
        });
      }  

      normalizeTrakings(item){
        return{
          id: item.id,
          createdAt: dayjs(item.createdAt).format("D MMMM  YYYY HH:MM"),
          reason: item.reason,
          observations: item.observations,
          status: item?.status === 4 ? "Seguimiento de reparacion" : item?.status === 3 ? "Seguimiento de traspaso": item?.status === 2 ? "Seguimiento de salida": item?.status === 1 ? "Seguimiento de entrada" : "Seguimiento Automatico",
          createdby:item.ejecutive?.name,
          url:item.url
        }
      }
    normalizeDataProducts(item){
        return{
         id: item.id,
         code: item?.product?.code,
         serialnumber: item?.serialnumber ? item.serialnumber : "Sin Numero de serie",
         product:item?.product?.name,
         category: item?.product?.category?.name,
         brand: item?.product?.brand?.name,
         reviewed: item?.reviewed === false ? "No revisado" : item?.reviewed === true ? "Revisado" : "Estado desconocido",
         reviewformatURL: item?.reviewformatURL,
         statusrepair: item?.statusrepair === true? "En reparación" : item?.statusrepair === false ? "En buen estado" : "Estado desconocido",
        }
    }
}
