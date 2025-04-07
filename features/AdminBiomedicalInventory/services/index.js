import { Description } from "@material-ui/icons";
import { api } from "../../../services/api";

export class BiomedicaInventoryServices{
   async getInventoryBiomedica(limit, page, query){
    let params = {
        limit:limit,
        skip: page,
        count: 1,
        include:"warehouse,inventoryentry,productaccessory",
        where: JSON.stringify(query), 
    }
    return await api.get("warehouseproductaccessories", {params})
   } 

   async deleteProductInventory(id){
    if (id == null) {
        throw new Error("id and data are required");
      }
      return await api.delete(`/warehouseproductaccessories/${id}`);
}
   normalizeproducts(item){
    return{
    warehouseproductaccessoriesId: item.id,
     id: item.productaccessory.id,
     name: item.productaccessory?.name,
     type: item.productaccessory.type,
     stock: item.productaccessory?.physicalstock,
     serialnumber:item.serialnumber,
     status: item.status,
     available:item.available,
     observations:item.observations,
     warehouse:item.warehouse?.name,
     description:item.productaccessory?.description
    }
   }
}