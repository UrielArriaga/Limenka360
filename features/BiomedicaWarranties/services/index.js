import { api } from "../../../services/api"
import dayjs from "dayjs";

export default class ApiBioWarranties {

    async getWarranties(query = {}) {
        let params = {
            count: 1,
            where: JSON.stringify(query),
            include: "reasonwarranty,purchaseorder,order,warehouseproduct,createdby,warehouseproduct.product,warehouseproduct.warehouse"
        }
        return await api.get(`warrantywarehouseproduct`, { params });
    }

    NormalizeData(data) {
        return {
            folio: data?.order?.folio || "N/A",
            productname: data?.warehouseproduct?.product?.name || "N/A",
            srialnumber: data?.warehouseproduct?.serialnumber || "N/A",
            statuswarranty: data?.status || "N/A",
            reasonwarranty: data?.reasonwarranty?.name || "N/A",
            warehousename: data?.warehouseproduct?.warehouse?.name || "N/A",
            createdBy: data?.createdby?.fullname || "N/A",
            createdAt: dayjs(data?.createdAt).format("DD/MM/YYYY"),
            dataItem: data
        }
    }
}