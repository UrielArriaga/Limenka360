import { api } from "../../../services/api";

export default class ApiRequestBudgets {
  async getBudgets(limit,page,query,orderby,ASC) {
    let params = {
        count:1,
        include:"prospect,ejecutive",
        limit,
        skip:page,
        where:JSON.stringify(query),
        order: ASC ? `-${orderby}`: orderby
    }
    
    return await api.get(`budgets`, {params});
  }
}
