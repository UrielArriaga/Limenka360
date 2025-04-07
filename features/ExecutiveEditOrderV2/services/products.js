import { api } from "../../../services/api";

export class ProductService {
  async getProductsByOportunity(oportunityId) {
    let params = {
      count: 1,
      all: 1,
      include: "product,product.category,product.brand",
      join: "product,product.categor,product.bran",
      where: {
        oportunityId: oportunityId,
      },
    };
    return await api.get("productsoportunities", { params });
  }

  async getProducts(inputValue) {
    let params = {
      //   count: 1,
      include: "category,provider,brand",
      join: "category,pro,bra",
      where: { isactive: true },
      all: 1,
      order: "-createdAt",
      count: 1,
      where: {
        $or: [
          {
            code: {
              iRegexp: inputValue.trim(),
            },
          },
          {
            name: {
              iRegexp: inputValue.trim(),
            },
          },
        ],
      },
    };

    return api.get("products", { params });
  }

  normalizeNewProducts = (productOportunities = []) =>
    productOportunities.map(productOportunity =>
      productOportunity?.product?.ispackage ? { ...productOportunity, productslocal: [] } : productOportunity
    );

  //   normalizeNewProducts = productOportunities => {
  //     let finalProducts = [];
  //     for (let i = 0; i < productOportunities.length; i++) {
  //       const productOportunity = productOportunities[i];

  //       if (productOportunity?.product?.ispackage) {
  //         productOportunity.products = [];
  //         finalProducts.push(productOportunity);
  //         continue;
  //       }

  //       finalProducts.push(productOportunity);
  //     }

  //     return finalProducts;
  //   };
}
