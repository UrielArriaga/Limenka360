import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, toUpperCaseChart } from "../../../utils";

export class ProductsServices {
  async getProducts(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "provider",
      join: "pro",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("products", {
      params,
    });
  }

  normalizeDataOrders(item) {
    return {
      id: item.id,
      code: item?.code,
      folio: item?.code,
      name: `${toUpperCaseChart(item?.name)} `,
      stock: item?.stock,
      providerId: `${toUpperCaseChart(item?.provider?.companyname)}`,
      amount: `${formatNumber(item?.amount)}`,
      storeamount: `${formatNumber(item?.storeamount)}`,
      callamount: `${formatNumber(item?.callamount)}`,
      import: item?.import ? "Si" : "No",
      description: item?.description,
      data:item,
      isactive: item?.isactive
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }

  async getTypeProducts() {
    return await api.get(`productstypes?order=name&all=1`);
  };
  async getCategories() {
    return await api.get(`categories?all=1&order=name`);
  };
  async getBrands() {
    return await api.get(`brands?all=1&order=name`);
  };
  async getProviders() {
    return await api.get(`providers?all=1&order=name`);
  };
}
