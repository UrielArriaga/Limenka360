import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commonSelector,
  getActionsCommon,
  getBrandsCommon,
  getCategoriesCommon,
  getCfdisCommon,
  getChannelsCommon,
  getClientTypesCommon,
  getClientsCompany,
  getDiscardReasons,
  getImportantResasonCommon,
  getOriginsCommon,
  getPendingsTypes,
  getPhasesCommon,
  getRejectedReasonsCommon,
  getSpecialtiesCommon,
  getTemplatesWp,
  getTypeProductsCommon,
  getUsersCommon,
  getfileTypes,
  getpaymentAccount,
  getpaymentmethods,
  getpaymentways,
  gettaxregimens,
  getDiscardReasonsOrders,
  getshippingtypes,
  getOrdersStatus,
  getGoalTypes,
  getGoalNames,
  getpaymentperiods,
  getEntities,
  getGroupsCommon,
  getWarehousesStatus,
  getWareHouses,
  getTaxInformations,
  getProviders,
  getTypeSales,
  getStatuspoo,
  getDrivers,
  getTransportunits,
  getOrderRejectedReasons,
  getDeliveryTimes,
  getTypesEntries,
  getOrderReturn,
  getReasonWarranties
} from "../redux/slices/commonSlice";
import { createNewTracking } from "../redux/slices/trackingSlice";

export default function useGlobalCommons() {
  const {
    entities,
    actions,
    categories,
    cfdi,
    origins,
    phases,
    brands,
    discardreasons,
    rejectedreasons,
    importantresons,
    clientTypes,
    templateswp,
    specialties,
    channels,
    taxregime,
    clientsCompanies,
    users,
    paymentsacount,
    paymentway,
    paymentmethod,
    paymentperiods,
    pendingstypes,
    filetypes,
    typeProducts,
    discardreasonsOrders,
    shippingtype,
    orderstatus,
    goaltypes,
    goalnames,
    groups,
    warehouses,
    warehouse,
    taxinformations,
    providers,
    typesSales,
    statusOrders,
    transportunits,
    drivers,
    orderrejected,
    deliverytimes,
    typesentries,
    typereturns,
    reasonwarranties
  } = useSelector(commonSelector);
  const dispatch = useDispatch();

  async function getCatalogBy(typeCatalog, paramsCutom = undefined) {
    const catalogOptions = {
      entities: { results: entities.results, action: getEntities },
      actions: { results: actions.results, action: getActionsCommon },
      brands: { results: brands.results, action: getBrandsCommon },
      categories: { results: categories.results, action: getCategoriesCommon },
      cfdis: { results: cfdi.results, action: getCfdisCommon },
      filetypes: {
        results: filetypes.results,
        action: getfileTypes,
      },
      origins: { results: origins.results, action: getOriginsCommon },
      phases: { results: phases.results, action: getPhasesCommon },
      clientTypes: { results: clientTypes.results, action: getClientTypesCommon },
      specialties: { results: specialties.results, action: getSpecialtiesCommon },
      channels: { results: channels.results, action: getChannelsCommon },
      clientsCompanies: { results: clientsCompanies.results, action: getClientsCompany },
      executives: { results: users.results, action: getUsersCommon },
      users: { results: users.results, action: getUsersCommon },
      paymentways: { results: paymentway.results, action: getpaymentways },
      paymentmethods: { results: paymentmethod.results, action: getpaymentmethods },
      paymentperiods: { results: paymentperiods.results, action: getpaymentperiods },
      taxregimes: { results: taxregime.results, action: gettaxregimens },
      groups: { results: groups.results, action: getGroupsCommon },
      paymentsacount: {
        results: paymentsacount.results,
        action: getpaymentAccount,
      },
      pendingstypes: {
        results: pendingstypes.results,
        action: getPendingsTypes,
      },
      typeProducts: {
        results: typeProducts.results,
        action: getTypeProductsCommon,
      },
      importantresons: {
        results: importantresons.results,
        action: getImportantResasonCommon,
      },
      discardreasons: {
        results: discardreasons.results,
        action: getDiscardReasons,
      },
      rejectedreasons: {
        results: rejectedreasons.results,
        action: getRejectedReasonsCommon,
      },
      templateswp: {
        results: templateswp.results,
        action: getTemplatesWp,
      },
      discardreasonsOrders: {
        results: discardreasonsOrders.results,
        action: getDiscardReasonsOrders,
      },
      shippingtype: {
        results: shippingtype.results,
        action: getshippingtypes,
      },
      orderstatus: {
        results: orderstatus.results,
        action: getOrdersStatus,
      },
      goaltypes: {
        results: goaltypes.results,
        action: getGoalTypes,
      },
      goalnames: {
        results: goalnames.results,
        action: getGoalNames,
      },
      warehouses: {
        results: warehouses.results,
        action: getWarehousesStatus,
      },
      warehouse: {
        results: warehouse.results,
        action: getWareHouses,
      },
      taxinformations: {
        results: taxinformations.results,
        action: getTaxInformations,
      },
      providers: {
        results: providers.results,
        action: getProviders,
      },
      typesSales: {
        results: typesSales.results,
        action: getTypeSales,
      },
      statusOrders: { results: statusOrders.results, action: getStatuspoo },
      drivers: { results: drivers.results, action: getDrivers },
      transportunits: { results: transportunits.results, action: getTransportunits },
      orderrejected: { results: orderrejected.results, action: getOrderRejectedReasons },

      deliverytimes: { results: deliverytimes.results, action: getDeliveryTimes },
      typesentries: { results: typesentries.results, action: getTypesEntries },
      typereturns: { results: typereturns.results, action: getOrderReturn },

      reasonwarranties: { results: reasonwarranties.results, action:getReasonWarranties },
    };

    const currentCatalog = catalogOptions[typeCatalog];
    if (currentCatalog && currentCatalog.results <= 0) {
      let params = {
        all: 1,
        order: "name",
      };

      if (typeCatalog === "clientsCompanies") {
        params = {
          all: 1,
          order: "companyname",
        };
      }
      if (typeCatalog === "discardreasons") {
        params = {
          all: 1,
          order: "reason",
        };
      }

      if (typeCatalog === "importantresons") {
        params = {
          all: 1,
          order: "reason",
        };
      }
      if (typeCatalog === "rejectedreasons") {
        params = {
          all: 1,
          order: "reason",
        };
      }

      if (typeCatalog === "discardreasonsOrders") {
        params = {
          all: 1,
          order: "reason",
        };
      }
      if (typeCatalog === "orderrejected") {
        params = {
          all: 1,
          order: "reason",
        };
      }
      if (typeCatalog === "providers") {
        params = {
          all: 1,
          order: "companyname",
        };
      }
      if (typeCatalog === "transportunits") {
        {
          params = {};
        }
      }
      if (typeCatalog === "deliverytimes") {
        params = {};
      }
      if (typeCatalog === "typesentries") {
        params = {
          all: 1,
        };
      }      if (typeCatalog === "taxinformations") {
        params = {};
      }

      if (paramsCutom) {
        params = paramsCutom;
      }

      dispatch(currentCatalog.action({ params }));
    }
  }

  const addTracking = data => {
    dispatch(
      createNewTracking({
        data,
      })
    );
  };

  return {
    getCatalogBy,
    addTracking,
  };
}
