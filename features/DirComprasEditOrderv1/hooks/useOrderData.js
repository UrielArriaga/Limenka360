import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import dayjs from "dayjs";
import { ListArrives } from "../constants";

const deliveryOptions = [
  { id: "recoleccion", name: "Recoleccion" },
  { id: "proveedor envia", name: "Proveedor Envia" },
  { id: "aerea", name: "Aérea" },
  { id: "marina", name: "Marina" },
];

const paymentConditionOptions = [
  { id: "pago de contado", name: "Pago de Contado" },
  { id: "credito interno", name: "Credito Interno" },
  { id: "credito externo", name: "Credito Externo" },
  { id: "especie", name: "Especie" },
  { id: "efectivo-contraentrega", name: "Efectivo - Contra Entrega" },
];

const destinationOptions = [
  { id: "envio1", name: "Envio 1" },
  { id: "envio2", name: "Envio 2" },
];

const types = [
  { name: "Internacional", id: "INTERNACIONAL" },
  { name: "Nacional", id: "NACIONAL" },
];

export default function useOrderData({ paymentsControl, productControl, setStates, formControls, viewControl }) {
  const [orderData, setOrderData] = useState(null);
  const { setValue, setAddressSelected } = formControls;

  const { getCatalogBy } = useGlobalCommons();

  useEffect(() => {
    getCatalogBy("taxinformations");
    getCatalogBy("providers");
  }, []);

  //   const [paymentsData, setPaymentsData] = useState([]);

  const { query } = useRouter();

  let orderId = query.o;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {
          include: "taxinformation,provider,provideraddress,provideraddress.city,provideraddress.entity",
        };
        let resp = await api.get(`purchaseorders/${orderId}`, {
          params,
        });

        setValue("provider", resp.data.provider);

        setValue("tax", resp.data.taxinformation);
        setValue("date", dayjs(resp.data.date).format("YYYY-MM-DD"));
        setValue(
          "delivery",
          deliveryOptions.find(item => item.id === resp.data.methoddelivery)
        );

        setValue(
          "payment_condition",
          paymentConditionOptions.find(item => item.id === resp.data.paymentcondition)
        );

        setAddressSelected(resp.data.provideraddress);

        setValue("phone", resp.data.phone);

        setValue(
          "national",
          resp?.data?.national ? { name: "Nacional", id: "NACIONAL" } : { name: "Internacional", id: "INTERNACIONAL" }
        );

        viewControl.setType(resp?.data?.national ? "NACIONAL" : "INTERNACIONAL");
        formControls.handleOnChangeSelect(resp.data.provider, { name: "provider" });

        setValue("address", resp.data.provideraddress);

        setValue(
          "arrivesin",
          ListArrives.find(item => item.id === resp.data.arrivesin)
        );

        console.log(resp?.data);

        setValue("observations", resp.data.observations);
      } catch (error) {}
    };

    const fecthProducts = async () => {
      try {
        let params = {
          where: {
            purchaseorderId: orderId,
          },
          include: "product",
        };
        let resp = await api.get("supplies", {
          params,
        });

        let normalizeProducts = resp.data.results.map(item => {
          return {
            ...item,
            model: item.product.code,
            name: item.product.name,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
            isnew: false,
            isedited: false,
            isdeleted: false,
            hasiva: item.iva > 0 ? true : false,
            serialnumbers: [],
          };
        });

        productControl.setProducts(normalizeProducts);
      } catch (error) {}
    };

    const fetchPayments = async () => {
      try {
        let params = {
          where: {
            purchaseorderId: orderId,
          },
          include: "conceptimport",
        };

        let resp = await api.get("paymentspurchaseorder", {
          params,
        });

        let normalizePayments = resp.data.results.map(item => {
          return {
            payment: item.payment,
            date: dayjs(item.date).format("YYYY-MM-DD"),
            total: item.total,
            paymentDate: item.paymentDate,
            paymentMethod: item.paymentMethod,
            paymentType: item.paymentType,
            status: item.status,
            ispaid: item.ispaid,
            id: item.id,
            isnew: false,
            isediting: false,
            isdeleted: false,
            exchangerate: item.exchangerate,
            conceptimport: item.conceptimport,
          };
        });

        paymentsControl.setPayments(normalizePayments);
      } catch (error) {}
    };

    if (orderId) {
      fetchData();
      fecthProducts();
      fetchPayments();
    }
  }, []);

  return {
    orderData,
  };
}
