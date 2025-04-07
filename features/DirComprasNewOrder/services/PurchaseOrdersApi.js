import dayjs from "dayjs";
import { api } from "../../../services/api";

export class PurchaseOrdersApi {
  constructor() {
    this.baseUrl = "https://api.compras.com";
  }

  async createOrder(data) {
    return await api.post(`purchaseorders`, data);
  }
  async getAddressById(id) {
    let params = {
      include: "city,entity,postal",
      join: "c,e,p",
      where: {
        providerId: id,
      },
    };
    return await api.get(`provideraddresses`, { params });
  }

  async getConceptImports() {
    let params = {
      order: "name",
    };
    return await api.get("conceptimport", {
      params,
    });
  }

  async getPurcharseOrdersByUser(id_user) {
    let params = {
      count: 1,
      limit: 0,
      where: JSON.stringify({
        createdbyId: id_user,
      }),
    };
    return await api.get(`purchaseorders`, { params });
  }

  async normalizeOrderData(object) {
    let { form, products, payments, id_user, addressSelected, userData } = object;

    let responseTotalPurchase = await this.getPurcharseOrdersByUser(id_user);
    let count = responseTotalPurchase?.data?.count || 0;
    let responseCount = count < 9 ? "0" + (count + 1) : count + 1;

    return {
      folio: `${userData?.username}${"OR"}-${responseCount}`,
      provideraddressId: addressSelected?.id,
      paymentcondition: form?.payment_condition?.id,
      phone: form?.phone,
      draft: false,
      observations: form?.observations || "",
      methoddelivery: form?.delivery?.id,
      providerId: form?.provider?.id,
      taxinformationId: form?.tax?.id,
      companyId: form?.provider?.companyId,
      national: form?.national?.id === "NACIONAL" ? true : false,
      createdbyId: id_user,
      arrivesin: form?.arrivesin?.id,
      estimateddeliverydate: dayjs(form?.estimateddeliverydate).format(""),
      supplies: products.map(product => {
        console.log(product);
        return {
          quantity: product?.quantity,
          unit: "pzas",
          unitprice: product?.unitprice,
          amount: product?.quantity * product?.unitprice,
          productId: product?.productId,
        };
      }),
      url: "",
      payments: payments.map(payment => {
        // delte conteptimport and currency from payment
        const { conceptimport, currency, ...rest } = payment;
        return {
          ...rest,
          createdbyId: id_user,
          date: dayjs(payment?.date).format(""),
          conceptimportId: payment?.conceptimport?.id,
        };
      }),
    };
  }

  async postCreatePDF(form) {
    return await api.post(`convert/pdf`, form);
  }
}

// [
//   {
//     "quantity": 1,
//     "unit": "pzas",
//     "unitprice": "50",
//     "amount": 50,
//     "productId": "vZsqVSTvtFvptVUay9fFDcrp",
//     "name": "CARPETA PORTA EXPEDIENTE"
//   },
//   {
//     "quantity": 1,
//     "unit": "pzas",
//     "unitprice": "51",
//     "amount": 51,
//     "productId": "62d09Tuuhp22mowzna3P0240",
//     "name": "ANAQUEL GUARDA 3 COMODOS"
//   }
// ]
