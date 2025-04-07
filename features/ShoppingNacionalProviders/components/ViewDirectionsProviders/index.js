import React from "react";

import { Delete, FiberManualRecord } from "@material-ui/icons";
import { AddressContainer } from "../../../ShoppingProviderNew/styled";

export default function ViewDirectionsProviders({ storedAddresses, isfetching }) {
  const validator = data => {
    if (data != null && data != "null null" && data != "") {
      return data.trim();
    } else {
      return "N/A";
    }
  };
  return (
    <div className="cardsDirection">
      {isfetching && <p>Cargando</p>}
      {!isfetching && storedAddresses.length === 0 && <p className="notFound">No hay direcciones.</p>}
      {!isfetching &&
        storedAddresses.map((address, index) => (
          <AddressContainer key={index}>
            <div className="directionIndex">
              <div className="titleDirectionCount">
                <FiberManualRecord className="fire" />
                <p>{`Dirección: ${index + 1}`}</p>
              </div>
            </div>

            <p className="data">
              Calle: <strong>{validator(address?.street)}</strong>
            </p>
            <p className="data">
              Numero interior: <strong>{validator(address?.int_number)}</strong>
            </p>
            <p className="data">
              Numero exterior: <strong>{validator(address?.ext_number)}</strong>
            </p>
            <p className="data">
              Código Postal: <strong>{validator(address?.postalcode)}</strong>
            </p>
            <p className="data">
              Estado: <strong>{validator(address?.entity?.name)}</strong>
            </p>
            <p className="data">
              Municipio: <strong>{validator(address?.city?.name)}</strong>
            </p>
          </AddressContainer>
        ))}
    </div>
  );
}
