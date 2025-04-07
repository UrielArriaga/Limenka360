import { join } from "path";
import {api} from "../../../services/api";
import dayjs from "dayjs";
export class ActividadesComprasServices{
    async getProducts(limit = 20, page = 1, query) {
      let params = {
        include: "createdby",
        limit: limit,
        skip: page,
        count: 1,
        where: JSON.stringify(query),
      };
        return await api.get(`trackingsshoppings`, { params });
      }
      
   normalizeDataActividadesCompras(item){
    return{ 
        fecha: dayjs(item.createdAt).format("D MMMM  YYYY	"),
        fullname: item?.createdby?.fullname, 
        reason: item?.reason, 
        observaciones: item?.observations
    }
        
   }
}