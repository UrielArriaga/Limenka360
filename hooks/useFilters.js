import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { commonSelector } from "../redux/slices/commonSlice";
import useGlobalCommons from "./useGlobalCommons";

export default function useFilters() {
  const {
    entities,
    phases,
    cities,
    categories,
    origins,
    clientTypes,
    users,
    groups,
    paymentsacount,
    cfdi,
    paymentmethod,
    paymentway,
    taxregime,
    filetypes,
  } = useSelector(commonSelector);
  const optionsCatalog = {
    entities: { options: entities.results },
    cities: { options: cities.results },
    categories: { options: categories.results },
    origins: { options: origins.results },
    phases: { options: phases.results },
    clientTypes: { options: clientTypes.results },
    executives: { options: users.results },
    groups: { options: groups.results },
    paymentsacount: { options: paymentsacount.results },
    cfdis: { options: cfdi.results },
    paymentmethods: { options: paymentmethod.results },
    paymentways: { options: paymentway.results },
    taxregimes: { options: taxregime.results },
    filetypes: { options: filetypes.results },
  };

  const handleValidateCatalog = catalogName => {
    let options = optionsCatalog[catalogName].options;
    return options || [];
  };
  return {
    handleValidateCatalog,
  };
}
