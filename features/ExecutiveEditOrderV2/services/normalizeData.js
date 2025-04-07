import { formatNumber, toUpperCaseChart } from "../../../utils";

export class NormalizeDataOrder {
  formatEjecutive = (roleId, userData, infoOrders) => {
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

  formatAdressPdf = formData => ({
    receive: formData?.address?.receive,
    entity: formData?.address?.entity?.name,
    city: formData?.address?.city?.name,
    postal: formData?.address?.postal?.postal_code,
    street: formData?.address?.street,
    int_number: formData?.address?.int_number,
    ext_number: formData?.address?.ext_number,
    settlement: formData?.address?.settlement,
    phone: formData?.phone,
    references: formData?.address?.references,
  });

  formatAdressBilling = (requireBilling, formData) => {
    const { billing } = formData;
    if (requireBilling) {
      return {
        billingbusiness: billing?.businessName,
        rfc: billing?.rfc,
        phone: billing?.phone,
        street: billing?.address?.street,
        int_number: billing?.address?.int_number,
        ext_number: billing?.address?.ext_number,
        settlement: billing?.address?.settlement,
        postal: billing?.address?.postal?.postal_code,
        entity: billing?.address?.entity?.name,
        city: billing?.address?.city?.name,
      };
    }
    // if (formData?.billing) {
    //   return {
    //     billingbusiness: infoOrders?.bill?.businessname,
    //     rfc: infoOrders?.bill?.rfc,
    //     phone: infoOrders?.bill?.phone,
    //     street: infoOrders?.bill?.address?.street,
    //     int_number: infoOrders?.bill?.address?.int_number,
    //     ext_number: infoOrders?.bill?.address?.ext_number,
    //     settlement: infoOrders?.bill?.address?.settlement,
    //     postal: infoOrders?.bill?.address?.postal?.postal_code,
    //     entity: infoOrders?.bill?.address?.entity?.name,
    //     city: infoOrders?.bill?.address?.city?.name,
    //   };
    // } else {
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
    // }
  };

  prepareData = (today, company, ejecutive, formData, orderData, requireBilling, userData, productsCotization) => {
    return {
      concept: orderData?.folio,
      groupLogo: userData?.grouplogo || undefined,
      dateOrder: today,
      observations: formData?.order?.observations || "",
      companyId: userData.companyId,
      companys: { id: company },
      ejecutive,
      paymentaccount: formData?.order?.paymentaccount?.name,
      cfdi: formData?.billing ? formData?.billing?.cfdi?.name : "",
      methodPayment: formData?.billing ? formData?.billing?.paymentMethod?.name : "",
      wayPayment: formData?.billing ? formData?.billing?.waytoPay?.name : "",
      taxregime: formData?.billing ? formData?.billing?.taxregime?.name : "",
      products: productsCotization,

      iva: formatNumber(orderData?.oportunity?.totaliva),
      discount: formatNumber(orderData?.oportunity?.discount),
      total: formatNumber(orderData?.oportunity?.amount),
      subtotal: formatNumber(orderData?.oportunity?.subtotal),

      adressPdf: this.formatAdressPdf(formData),
      adressBilling: this.formatAdressBilling(requireBilling, formData),
    };
  };

  normalizeOrderPut(order, address, billing, shippinOrder, products, orderData, formData, requireBilling) {
    return {
      order: {
        paymentaccountId: order.paymentaccount.id,
        receive: address.receive,
        workstation: order.workstation,
        observations: order?.observations || "",
        phone: formData.phone,
        billing: requireBilling,
      },
      oportunity: {
        typesalesId: order?.typesale?.id,
      },
      address: {
        id: orderData?.address?.id,
        entityId: address.entity.id,
        cityId: address.city.id,
        postalId: address.postal.id,
        settlement: address.settlement,
        street: address.street,
        ext_number: address.ext_number,
        int_number: address.int_number,
        references: address.references,
      },
      hasBill: requireBilling,
      bill: {
        businessname: billing?.businessName,
        rfc: billing?.rfc,
        phone: billing?.phone,
        paymentmethodId: billing?.paymentMethod?.id,
        paymentwayId: billing?.waytoPay?.id,
        taxregimeId: billing?.taxregime?.id,
        cfdiId: billing?.cfdi?.id,
        address: {
          id: orderData?.bill?.address?.id,
          entityId: billing?.address?.entity?.id,
          cityId: billing?.address?.city?.id,
          postalId: billing?.address?.postal?.id,
          settlement: billing?.address?.settlement,
          street: billing?.address.street,
          ext_number: billing?.address?.ext_number,
          int_number: billing?.address?.int_number,
          references: billing?.address?.references,
        },
      },
      shippingtype: {
        id: shippinOrder.id,
        shippingtypeId: address.shippingtype.id,
        // id:orderData
      },
      productsOportunities: products,
    };
  }
}
