import { api } from "../../../services/api"
import dayjs from "dayjs";

export default class ApiRequestWarranties{

    async getWarranties(query = {}){
        let params = {
            count:1,
            where:JSON.stringify(query),
            include:"reasonwarranty,purchaseorder,warehouseproduct,createdby,warehouseproduct.product,warehouseproduct.warehouse"
        }
        return await api.get(`warrantywarehouseproduct`, {params});
    }

    NormalizeData(data){
        return {
            folio:data?.folio || "Sin Folio",
            createdAt: dayjs(data?.createdAt).format("DD/MM/YYYY") || "Sin Fecha",
            productname: data?.warehouseproduct?.product?.name || "N/A",
            srialnumber:data?.warehouseproduct?.serialnumber || "N/A",
            statuswarranty: data?.status || "N/A",
            reasonwarranty: data?.reasonwarranty?.name || "N/A",
            warehousename: data?.warehouseproduct?.warehouse?.name || "N/A",
            createdBy: data?.createdby?.name || "N/A",
            dataItem:data
        }
    }
    
}