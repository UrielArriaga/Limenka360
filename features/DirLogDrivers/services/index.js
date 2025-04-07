import {api} from "../../../services/api";
import dayjs from "dayjs";

export class DriversServices{
    async getDrivers(limit = 20, page = 1,query){
        let params = {
            limit:limit,
            skip: page,
            count: 1,
            where: JSON.stringify(query),  
        }
        return await api.get("drivers", {params})
    }

    async deleteDrivers(id){
        if (id == null) {
            throw new Error("id and data are required");
          }
          return await api.delete(`/drivers/${id}`);
    }
    normalizeDrivers(item){
        return{
            id: item.id,
            name: item.name,
            rfc: item.RFC,
            license: item.license,
            expiration_date: dayjs(item.expiration_date).format("D MMMM  YYYY "),
        }
    }
}
