import { useSelector } from "react-redux";
import { formatDateZone } from "../../../utils";
import { userSelector } from "../../../redux/slices/userSlice";

export const dataOrderToSave = (data, form) => {
  let newOrder = {};
  newOrder.isshipped = true;
  newOrder.folio = "";
  newOrder.companyId = data.companyId;
  newOrder.oportunityId = data.oportunityId;
  newOrder.orderstatusId = "YDBO8hIj4LPZzGvgzSeyhhOs";
  newOrder.receive = form.mailing?.receive;
  newOrder.phone = form.mailing?.phoneInvoice;
  newOrder.total = data.amount;
  newOrder.paymentaccountId = form.order?.paymentaccountId?.id;
  newOrder.gmtminutes = formatDateZone();
  let adress = {
    entityId: form.mailing?.entity?.id,
    cityId: form.mailing?.city?.id,
    postalId: form.mailing?.postalId,
    street: form.mailing?.street,
    int_number: form.mailing?.int_number || "",
    ext_number: form.mailing?.ext_number,
    references: form.mailing?.references,
    settlement: form.mailing?.cologneInvoice,
  };
  newOrder.address = adress;
  newOrder.shippingtype = form.mailing?.shippingtype?.id;
  newOrder.observations = form.order?.observations;
  if (form.billing.isBilling == false) {
    newOrder.billing = false;
  } else {
    newOrder.billing = true;
    newOrder.billingbusiness = form.billing?.businessName;
    newOrder.rfc = form.billing?.rfc;
    newOrder.billingphone = form.billing?.phoneInvoice;
    newOrder.cfdiId = form.billing?.cfdiId?.id;
    newOrder.paymentmethodId = form.billing?.paymentMethod.id;
    newOrder.paymentwayId = form.billing?.waytoPay.id;
    newOrder.taxregimeId = form.billing?.taxregime.id;
    let adressBilling = {
      entityId: form.billing?.entity.id,
      cityId: form.billing?.city.id,
      postalId: form.billing?.postalId,
      street: form.billing?.street,
      int_number: form.billing?.int_number || "",
      ext_number: form.billing?.ext_number,
      settlement: form.billing?.cologneInvoice,
    };
    newOrder.billingaddress = adressBilling;
  }
  return newOrder;
};

export const normalizeNewProducts = (product, id_user, idPackage) => {
  let newprod = {
    prodId: product.product.id,
    quantity: product.quantity,
    discount: 0,
    iva: 0,
    total: product.total,
    note: product.observations,
    newprice: product.total,
    customproduct: product.customproduct ? product?.customproduct : false,
    shownote: false,
    ejecutiveId: id_user,
    productpackageId: idPackage,
    dispercentage: 0,
  };
  return newprod;
};

export const productsPDF = products => {
  let normalizeProducts = products.map(item => ({
    quantity: item.quantity,
    product: {
      code: item.product.code,
      brand: {
        name: item.product.brand.name,
      },
      name: item.product.name,
      note: item.note,
    },
    inPackage: item.inPackage,
    iva: item.iva,
    newprice: item.newprice,
    total: item.total,
    note: item.note,
  }));
  return normalizeProducts;
};

export const normalizeProductsPackage = products => {
  let newProducts = products.map(item => {
    let prod = { ...item };
    if (item.product.ispackage) {
      prod.inPackage = [];
      prod.showProducts = false;
    }
    return prod;
  });

  return newProducts;
};

export const headersTableProductsForm = ["Nombre del Producto", "Código", "Cantidad", "Precio Unitario", "Total"];

export const headersTableAddProducts = ["Código", "Producto", "Marca", "Stock", "Categoría"];
