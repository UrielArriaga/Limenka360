import {api} from "../../../services/api";
import dayjs from "dayjs";

export class TransporUnitsServices{
    async getUnit(limit = 20, page = 1,query){
        let params = {
            limit:limit,
            skip: page,
            count: 1,
            where: JSON.stringify(query),  
        }
        return await api.get("transportunits", {params})
    }

    async deleteUnits(id){
        if (id == null) {
            throw new Error("id and data are required");
          }
          return await api.delete(`/transportunits/${id}`);
    }
    normalizeUnits(item){
        return{
            id: item.id,
            brand: item.brand,
            model: item.model,
            mileage: item.mileage,
            tuition: item.tuition,
            //engine_number: item.engine_number,
            vehicle_series: item.vehicle_series,
            //circulation_card: item.circulation_card,
            insurance_policy: item.insurance_policy,
        }
    }
}