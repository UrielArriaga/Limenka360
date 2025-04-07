import { api } from "../../../services/api";
import { formatDate } from "../../../utils";

export class BudgetsServices {
  async getBudgets(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "prospect,ejecutive,createdby",
      //   join: "pro",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("budgets", {
      params,
    });
  }
  async getBudgetId(id) {
    let params = {
      include: "prospect,ejecutive,createdby",
    };

    return await api.get(`budgets/${id}`, {
      params,
    });
  }

  async getProductsbudgets(query) {
    let params = {
      include: "product,product.provider",
      where: JSON.stringify(query),
      count: 1,
    };

    return await api.get(`productsbudgets`, {
      params,
    });
  }

  normalizeBudgets(item) {
    return {
      id: item.id,
      created: formatDate(item?.createdAt),
      folio: item.folio,
      validity: item.validity,
      budgettype: item.budgettype,
      createdby: item.createdby.fullname,
      asigned: item.prospect.fullname,
      data: item,
    };
  }
  async postProduct(body) {
    return await api.post(`productsbudgets`, body);
  }
  async putProduct(body, id) {
    return await api.put(`productsbudgets/${id}`, body);
  }
  async deleteProduct(id) {
    return await api.delete(`productsbudgets/${id}`);
  }
}
