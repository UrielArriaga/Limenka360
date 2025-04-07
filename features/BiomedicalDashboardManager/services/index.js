import { api } from "../../../services/api";

export default class ApiRequest{
    async getDataProducts(){
        let params = {
            count:1,
            include:"warehouseorder,product",
            join:"warehouseorder,product",
            limit:10000
        }
        return await api.get(`/warehouseproducts`, {params});
    }
}