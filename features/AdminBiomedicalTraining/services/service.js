import dayjs from "dayjs";
import { api } from "../../../services/api";

export default class ApiRuequestFormation {
  async getFormation(page, limit, query) {
    let params = {
      count: 1,
      skip:page,
      limit,
      include: "responsible,createdby,address",
      where: JSON.stringify(query)
    };
    return await api.get(`trainings`, { params });
  }

  async getTrainingSelected(query){
    let params = {
      count:1,
      where:JSON.stringify(query),
      include:"product,product.brand,product.category,product.provider,product.company"
    }
    return await api.get(`trainingproducts`, {params});
  }

  async putTraining(body, id){
    return await api.put(`trainings/${id}`, body);
  }

  normalizeData(data) {
    return {
        id:data?.id,
        folio:data?.folio || "N/A",
        title:data?.title || "N/A",
        responsable: data?.responsibleId ? data?.responsible?.fullname:"N/A",
        creadorBy:data?.createdby?.fullname,
        date: dayjs(data?.trainingdate).format("DD MMMM YYYY"),
        item:data
    };
  }
}
