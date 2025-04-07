import { formatDateZone } from "../utils";

class RequestOrders {
  constructor(idUser, order, userData, prospectId, oportunityId, oportunity) {
    this.idUser = idUser;
    this.prospectId = prospectId;
    this.oportunity = oportunity;
    this.oportunityId = oportunityId;
    this.order = order;
    this.userData = userData;

    console.log(idUser);
    console.log(userData);
  }

  getOportunityById() {}

  getProductsByOportunity() {}

  createTracking() {}

  createOrder() {}

  normalizeProduct(item) {
    return {
      prodId: item.id,
      quantity: item.quantity,
      discount: item.discount,
      iva: item.singleiva,
      total: item.total,
      note: item.info,
      newprice: item.callamount,
      customproduct: item.customproduct ? item?.customproduct : false,
      shownote: false,
      ejecutiveId: this.idUser,
      dispercentage: item.discountp,
    };
  }

  normalizeTracking() {
    return {
      orderId: this.order.id,
      prospectId: prospectId,
      status: "5",
      actionId: ACTIONIDPRODUCTIONMODE,
      oportunityId: oportunityId,
      reason: "Seguimiento automático",
      observations: `Pedido: ${order.folio}, creado con éxito el dia ${formatDate(today)}`,
      createdbyId: id_user,
      phaseId: PHASEIDPRODUCTIONMODE,
    };
  }

  // * Orders
  normalizeAdress(formData) {
    return {
      entityId: formData.entity,
      cityId: formData.city,
      postalId: postalCode,
      street: formData.street,
      int_number: formData.int_number,
      ext_number: formData.ext_number,
      references: formData.references,
      settlement: formData.cologne,
    };
  }

  normalizeAdressBilling(formData, postal) {
    return {
      entityId: formData.entityOrder,
      cityId: formData.cityOrder,
      postalId: postal,
      street: formData.streetInvoice,
      int_number: formData.int_numberInvoice,
      ext_number: formData.ext_numberInvoice,
      settlement: formData.cologneInvoice,
    };
  }

  normalizeBilling() {
    return {
      billing: true,
      billingbusiness: formData.businessName,
      rfc: formData.rfc,
      billingphone: formData.phoneInvoice,
      cfdiId: formData.cfdi.id,
      paymentmethodId: formData.paymentMethod.id,
      paymentwayId: formData.waytoPay.id,
      taxregimeId: formData.taxregime.id,
    };
  }

  normalizeOrder(formData) {
    return {
      isshipped: true,
      companyId: this.userData?.companyId,
      oportunityId: this.oportunityId,
      orderstatusId: "YDBO8hIj4LPZzGvgzSeyhhOs",
      receive: formData.receive,
      phone: formData.phone,
      total: this.oportunity?.amount,
      paymentaccountId: formData.paymentAccount.id,
      gmtminutes: formatDateZone(),
      // address: // * This is the other normalize
      shippingtype: formData.shippingtype.id,
      observations: formData.observations,
    };
  }
}

export default RequestOrders;
