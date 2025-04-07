import { api } from "../../../services/api"

export class RequestDataCategories {

   async getCategories(params){
    return await api.get("categories", {params});
   }

   async putCategories(id, body){
    return await api.put(`categories/${id}`, body);
   }

   async deleteCategories(id){
    return await api.delete(`categories/${id}`);
   }
   
   async postCategory(body){
      return await api.post(`categories`, body);
  }
}