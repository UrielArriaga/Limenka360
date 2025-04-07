import React from "react";
import { toUpperCaseChart } from "../../../utils";

export default function useTemplateOrder() {
  const formatEjecutive = (roleId, userData, infoOrders) => {
    const isExecutive = roleId === "ejecutivo";
    return {
      name: isExecutive
        ? `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`
        : toUpperCaseChart(infoOrders?.createdbyid?.name),
      lastname: isExecutive
        ? toUpperCaseChart(userData?.lastname)
        : toUpperCaseChart(infoOrders?.createdbyid?.lastname),
      phone: isExecutive ? userData?.phone : infoOrders?.createdbyid.phone,
    };
  };

  const formatAdressPdf = infoOrders => ({
    receive: infoOrders.receive,
    entity: infoOrders?.address?.entity?.name,
    city: infoOrders?.address?.city?.name,
    postal: infoOrders?.address?.postal?.postal_code,
    street: infoOrders?.address?.street,
    int_number: infoOrders?.address?.int_number,
    ext_number: infoOrders?.address?.ext_number,
    settlement: infoOrders?.address?.settlement,
    phone: infoOrders?.phone,
    references: infoOrders?.address?.references,
  });

  const formatAdressBilling = infoOrders => {
    if (infoOrders?.billing) {
      return {
        billingbusiness: infoOrders?.bill?.businessname,
        rfc: infoOrders?.bill?.rfc,
        phone: infoOrders?.bill?.phone,
        street: infoOrders?.bill?.address?.street,
        int_number: infoOrders?.bill?.address?.int_number,
        ext_number: infoOrders?.bill?.address?.ext_number,
        settlement: infoOrders?.bill?.address?.settlement,
        postal: infoOrders?.bill?.address?.postal?.postal_code,
        entity: infoOrders?.bill?.address?.entity?.name,
        city: infoOrders?.bill?.address?.city?.name,
      };
    } else {
      return {
        billingbusiness: "",
        rfc: "",
        phone: "",
        street: "",
        int_number: "",
        ext_number: "",
        settlement: "",
        postal: "",
        entity: "",
        city: "",
      };
    }
  };

  const prepareData = (today, company, ejecutive, infoOrders, userData, productsCotization) => ({
    concept: infoOrders?.folio,
    groupLogo: userData?.grouplogo || undefined,
    dateOrder: today,
    observations: infoOrders?.observations || "",
    companyId: userData.companyId,
    companys: { id: company },
    ejecutive,
    adressPdf: formatAdressPdf(infoOrders),
    paymentaccount: infoOrders?.paymentaccount?.name,
    adressBilling: formatAdressBilling(infoOrders),
    cfdi: infoOrders?.billing ? infoOrders?.bill?.cfdi?.name : "",
    methodPayment: infoOrders?.billing ? infoOrders?.bill?.paymentmethod?.name : "",
    wayPayment: infoOrders?.billing ? infoOrders?.bill?.paymentway?.name : "",
    taxregime: infoOrders?.billing ? infoOrders?.bill?.taxregime?.name : "",
    products: productsCotization,
    iva: formatNumber(infoOrders?.oportunity?.totaliva),
    discount: formatNumber(infoOrders?.oportunity?.discount),
    total: formatNumber(infoOrders?.oportunity?.amount),
    subtotal: formatNumber(infoOrders?.oportunity?.subtotal),
  });

  return { prepareData, formatAdressBilling, formatAdressPdf, formatEjecutive };
}
