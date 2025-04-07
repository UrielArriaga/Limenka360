import dayjs from "dayjs";
import { api } from "../../../services/api";

class DirLogInventarioService {
  async getProductsInventory(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "category",
      // include: "product",
      // include:
      //   "address,address.entity.city.postal,warehousesstatus,oportunity,oportunity.prospect,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("products", { params });
  }

  normalizeProductsInventory(productIntentory) {
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
      id: productIntentory?.id || "Sin id",
      name: productIntentory?.name || "Sin nombre",
      code: productIntentory?.code || "Sin codigo",
      category: productIntentory.category?.name || "Sin categoria",
      stock: validate(productIntentory.stock),
      // serialnumber: productIntentory.serialnumber,
      // name: productIntentory?.product?.name || "Sin nombre",
      // category: productIntentory.category?.name || "Sin categoria",
      // stock: productIntentory.stock || Math.floor(Math.random() * 1000),
      // stockfinal: productIntentory.stockfinal || Math.floor(Math.random() * 1000),
      // unidad: productIntentory.unit || "Pza",
      // entrydate: productIntentory.entrydate || dayjs().format("DD/MM/YYYY"),
      // outputdate: productIntentory.outputdate || "No aplica",
      // warehouse: productIntentory.warehouse || "No aplica",
    };
  }
}

export default DirLogInventarioService;
