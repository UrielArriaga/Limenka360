import { api } from "../../../services/api";

class InventaryService {
  async getBrands() {
    try {
      const response = await api.get('brands?count=1&limit=170');
      return response.data.results;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }

  async getCategory() {
    try {
      const response = await api.get('categories?count=1&limit=170');
      return response.data.results;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async getProducts(queryParams) {
    try {
      const { page, limit, searchKey, selectCategory, selectBrand, orderBy } = queryParams;
      let query = {};

      if (searchKey) {
        query.or = [
          { name: { iRegexp: searchKey.toLowerCase() } },
          { code: { iRegexp: searchKey.toLowerCase() } }
        ];
      }
      if (selectCategory) {
        query.categoryId = selectCategory.id;
      }
      if (selectBrand) {
        query.brandId = selectBrand.id;
      }

      let params = {
        include: "category,brand",
        limit: limit,
        skip: page,
        count: 1,
        order: orderBy,
        where: JSON.stringify(query),
      };

      const response = await api.get("/products/", { params });
      return { data: response.data.results, count: response.data.count };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  normalizeProductsInventory(productInventory) {
    function validate(valor) {
      if (valor) {
        if (valor < 0) {
          return 0;
        } else {
          return valor;
        }
      } else {
        return 0;
      }
    }
    return {
      id: productInventory?.id || "Sin id",
      name: productInventory?.name || "Sin nombre",
      code: productInventory?.code || "Sin codigo",
      category: productInventory.category?.name || "Sin categoria",
      stock: validate(productInventory.stock),
    };
  }
}

export default new InventaryService();
